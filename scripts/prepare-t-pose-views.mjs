import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { correctArms, verifyVisibleReach } from './t-pose-arm-corrections.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'gallery/t-pose-extractions.json'), 'utf8'));
const corrections = JSON.parse(fs.readFileSync(path.join(root, 'gallery/t-pose-arm-corrections.json'), 'utf8'));
const check = process.argv.includes('--check');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const template = await sharp(path.join(root, manifest.template)).metadata();
assert.equal(manifest.canvas.width, template.width);
assert.equal(manifest.canvas.height, template.height);

// These measured regions contain sheet lettering only, never character pixels.
// Keep this explicit recipe instead of detecting subjects or regenerating artwork.
for (const sheet of manifest.sheets) {
  const pairedReaches = [];
  const source = fs.readFileSync(path.join(root, sheet.source));
  assert.equal(hash(source), sheet.sha256, `${sheet.id}: original sheet changed`);
  const { data: original, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.width, 1536);
  assert.equal(info.height, 1024);
  const raw = { width: info.width, height: info.height, channels: info.channels };
  const patches = await Promise.all(sheet.lettering.map(async box => ({
    input: await sharp(source).extract({ left: box.sampleLeft, top: box.sampleTop, width: box.width, height: box.height }).png().toBuffer(),
    left: box.left, top: box.top
  })));
  const cleaned = await sharp(source).composite(patches).removeAlpha().raw().toBuffer();
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    if (sheet.lettering.some(b => x >= b.left && x < b.left + b.width && y >= b.top && y < b.top + b.height)) continue;
    const offset = (y * info.width + x) * info.channels;
    for (let c = 0; c < info.channels; c++) assert.equal(cleaned[offset + c], original[offset + c], `${sheet.id}: change outside lettering at ${x},${y}`);
  }
  for (const [view, left, width] of [['front', 0, sheet.split], ['back', sheet.split, info.width - sheet.split]]) {
    const height = manifest.workingCanvas.height;
    const padLeft = Math.floor((manifest.workingCanvas.width - width) / 2);
    const padRight = manifest.workingCanvas.width - width - padLeft;
    assert.ok(padLeft >= 0 && padRight >= 0);
    const crop = await sharp(cleaned, { raw }).extract({ left, top: 0, width, height }).png().toBuffer();
    // Sample background at the sheet's outer edge, not an inner fingertip.
    const edge = await sharp(source).extract({ left: view === 'front' ? 0 : info.width - 1, top: 0, width: 1, height }).png().toBuffer();
    const strips = await Promise.all([padLeft, padRight].map(w => sharp(edge).resize(w, height, { kernel: 'nearest' }).png().toBuffer()));
    const padded = await sharp({ create: { width: manifest.workingCanvas.width, height, channels: 3, background: '#808080' } })
      .composite([{ input: strips[0], left: 0, top: 0 }, { input: crop, left: padLeft, top: 0 }, { input: strips[1], left: padLeft + width, top: 0 }]).png().toBuffer();
    // Uniform scaling with contain preserves anatomy; exact template canvas handles rounding.
    const output = await sharp(padded).resize(manifest.canvas.width, manifest.canvas.height, { fit: 'contain', background: '#808080' }).png().toBuffer();
    const target = path.join(root, sheet.source.replace('-sheet.png', `-${view}.png`));
    assert.notEqual(target, path.join(root, sheet.source));
    if (check) {
      const actual = await sharp(target).metadata();
      assert.equal(actual.width, manifest.canvas.width);
      assert.equal(actual.height, manifest.canvas.height);
      assert.deepEqual(await sharp(target).removeAlpha().raw().toBuffer(), await sharp(output).removeAlpha().raw().toBuffer(), `${sheet.id}/${view}: derivative differs from the approved extraction recipe`);
    } else fs.writeFileSync(target, output);
    console.log(`${check ? 'Verified' : 'Prepared'} ${sheet.id}/${view}: ${manifest.canvas.width} x ${manifest.canvas.height}`);
    const correction = corrections.sets.find(record => record.id === sheet.id);
    if (correction) {
      const corrected = await correctArms(padded, correction, view, left, padLeft, width);
      const correctedOutput = await sharp(corrected).resize(manifest.canvas.width, manifest.canvas.height, { fit: 'contain', background: '#808080' }).png().toBuffer();
      pairedReaches.push(await verifyVisibleReach(correctedOutput, correction));
      const correctedTarget = path.join(root, sheet.source.replace('-sheet.png', `-arm-corrected-${view}.png`));
      if (check) {
        const actual = await sharp(correctedTarget).metadata();
        assert.equal(actual.width, manifest.canvas.width);
        assert.equal(actual.height, manifest.canvas.height);
        assert.deepEqual(await sharp(correctedTarget).removeAlpha().raw().toBuffer(), await sharp(correctedOutput).removeAlpha().raw().toBuffer(), `${sheet.id}/${view}: arm correction differs from measured recipe`);
      } else fs.writeFileSync(correctedTarget, correctedOutput);
    }
  }
  if (pairedReaches.length) {
    assert.equal(pairedReaches.length, 2, 'Correct matching front/back views together');
    for (const side of [0, 1]) assert.ok(Math.abs(pairedReaches[0][side] - pairedReaches[1][side]) <= 6, `${sheet.id}: front/back reach mismatch`);
  }
}
