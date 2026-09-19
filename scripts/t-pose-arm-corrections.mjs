import assert from 'node:assert/strict';
import sharp from 'sharp';

const smooth = t => { const v = Math.max(0, Math.min(1, t)); return v * v * (3 - 2 * v); };

// Local, horizontal inverse mapping. Nothing is synthesized or mirrored. The
// source center is translated to the canvas center before the arm-only remap.
// All coordinates are measured on the original sheet, before display scaling.
export async function correctArms(padded, correction, view, sheetLeft, padLeft, cropWidth) {
  const { data, info } = await sharp(padded).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const [top, innerTop, innerBottom, bottom] = correction.band;
  // Extend adjacent background, not a differently lit opposite sheet edge.
  // The v2 fingertips touch the split, so sample above/below the arm band
  // there: repeating its edge pixel would draw a finger all the way to the rim.
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    if (x >= padLeft && x < padLeft + cropWidth) continue;
    const edge = x < padLeft ? padLeft : padLeft + cropWidth - 1;
    for (let c = 0; c < channels; c++) {
      const fraction = Math.max(0, Math.min(1, (y - top) / (bottom - top)));
      data[(y * width + x) * channels + c] = y > top && y < bottom
        ? Math.round(data[(top * width + edge) * channels + c] * (1 - fraction) + data[(bottom * width + edge) * channels + c] * fraction)
        : data[(y * width + edge) * channels + c];
    }
  }
  const source = correction.views[view];
  const target = correction.target;
  const nativeX = x => x - sheetLeft + padLeft;
  const offset = nativeX(source.center) - target.center;
  assert.ok(Number.isInteger(offset), 'Centering must preserve native pixels without resampling');
  const names = ['shoulder', 'cuff', 'wrist', 'tip'].filter(name => target[name] !== undefined);
  const points = [
    ...[...names].reverse().map(name => [target.center - target[name], nativeX(source.left[name])]),
    ...names.map(name => [target.center + target[name], nativeX(source.right[name])])
  ];
  // Continue with a rigid offset past each fingertip, preserving the background.
  points.unshift([0, points[0][1] - points[0][0]]);
  points.push([width - 1, points.at(-1)[1] + width - 1 - points.at(-1)[0]]);
  for (let i = 1; i < points.length; i++) {
    assert.ok(points[i][0] > points[i - 1][0] && points[i][1] > points[i - 1][1], `${correction.id}/${view}: folded mapping`);
  }
  assert.equal(nativeX(source.left.shoulder), target.center - target.shoulder + offset);
  assert.equal(nativeX(source.right.shoulder), target.center + target.shoulder + offset);
  const inverse = x => {
    const i = points.findIndex((p, index) => index > 0 && x <= p[0]);
    const [a, b] = [points[i - 1], points[i]];
    return a[1] + (x - a[0]) * (b[1] - a[1]) / (b[0] - a[0]);
  };
  const sample = (x, y, c) => {
    const clamped = Math.max(0, Math.min(width - 1, x));
    const low = Math.floor(clamped), high = Math.min(width - 1, low + 1), fraction = clamped - low;
    return Math.round(data[(y * width + low) * channels + c] * (1 - fraction) + data[(y * width + high) * channels + c] * fraction);
  };
  const result = Buffer.alloc(data.length);
  const baseline = Buffer.alloc(data.length);
  assert.ok(0 <= top && top < innerTop && innerTop < innerBottom && innerBottom < bottom && bottom < height);
  const remapped = Array.from({ length: width }, (_, x) => inverse(x));
  let editedPixels = 0;
  for (let y = 0; y < height; y++) {
    const weight = smooth((y - top) / (innerTop - top)) * smooth((bottom - y) / (bottom - innerBottom));
    for (let x = 0; x < width; x++) {
      const centeredX = x + offset;
      const mappedX = centeredX + (remapped[x] - centeredX) * weight;
      const outsideArms = y <= top || y >= bottom || Math.abs(x - target.center) <= target.shoulder;
      const index = (y * width + x) * channels;
      let differs = false;
      for (let c = 0; c < channels; c++) {
        baseline[index + c] = sample(centeredX, y, c);
        result[index + c] = outsideArms ? baseline[index + c] : sample(mappedX, y, c);
        if (result[index + c] !== baseline[index + c]) differs = true;
        if (outsideArms) assert.equal(result[index + c], baseline[index + c], 'Changed protected artwork');
      }
      if (differs) editedPixels++;
    }
  }
  assert.ok(editedPixels > 0, 'Correction must change the measured arm regions');
  // Same target joint/garment landmarks across front/back; no vertical stretch.
  // Also verify the interpolation actually lands on each measured landmark.
  for (const name of names) for (const [side, sign] of [['left', -1], ['right', 1]]) {
    assert.equal(inverse(target.center + sign * target[name]), nativeX(source[side][name]));
  }
  console.log(`${correction.id}/${view}: centered by ${-offset}px; matched reach ${target.tip}px each side; ${editedPixels} native pixels adjusted inside arm bands only`);
  return sharp(result, { raw: { width, height, channels } }).png().toBuffer();
}

// All six approved views have bare hands against neutral gray. Independently
// inspect their visible reach after final resampling, not just the mapping math.
// The tolerance covers antialiasing and slight differences in finger angles.
export async function verifyVisibleReach(output, correction) {
  const { data, info } = await sharp(output).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const scale = info.height / 1000;
  const bounds = [Infinity, -Infinity];
  for (let y = Math.floor(correction.band[1] * scale); y < Math.ceil(correction.band[2] * scale); y++) {
    for (let x = 0; x < info.width; x++) {
      if (x > 200 && x < info.width - 200) continue;
      const p = (y * info.width + x) * info.channels;
      const [r, g, b] = data.subarray(p, p + 3);
      if (r > 140 && r - g > 12 && r - b > 17) {
        bounds[0] = Math.min(bounds[0], x);
        bounds[1] = Math.max(bounds[1], x);
      }
    }
  }
  assert.ok(bounds.every(Number.isFinite), 'Could not locate visible hands');
  assert.ok(bounds[0] >= 25 && bounds[1] < info.width - 25, 'Fingertips must clear both canvas edges');
  const reaches = [info.width / 2 - bounds[0], bounds[1] - info.width / 2];
  assert.ok(Math.abs(reaches[0] - reaches[1]) <= 4, `Unequal visible reach: ${reaches}`);
  assert.ok(reaches.every(reach => Math.abs(reach - correction.target.tip * scale) <= 6), 'Visible reach differs from measured correction');
  return reaches;
}
