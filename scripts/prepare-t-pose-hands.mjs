import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { verifyVisibleReach } from './t-pose-arm-corrections.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'gallery/t-pose-hand-corrections.json'), 'utf8'));
const arms = JSON.parse(fs.readFileSync(path.join(root, 'gallery/t-pose-arm-corrections.json'), 'utf8'));
const check = process.argv.includes('--check');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const local = value => {
  assert.ok(value.startsWith('media/gallery/resources/') && !/[\\?#%:]/.test(value) && !value.split('/').includes('..'), 'Unsafe hand correction path');
  return path.join(root, value);
};

for (const record of manifest.records) {
  assert.ok(record.source.endsWith('-arm-corrected-back.png') && record.output.endsWith('-arm-hand-corrected-back.png'), 'Only back-view hands are edited');
  assert.notEqual(record.source, record.output, 'Preserve the previous derivative');
  const source = fs.readFileSync(local(record.source));
  assert.equal(hash(source), record.sourceSha256, `${record.id}: base artwork changed`);
  const { data: before, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.width, 1122); assert.equal(info.height, 1402);
  assert.equal(record.patches.length, 2, 'Review both hands');
  const overlays = [];
  for (const patch of record.patches) {
    assert.ok([patch.left, patch.top, patch.width, patch.height].every(Number.isInteger));
    assert.ok(patch.width > 0 && patch.height > 0 && patch.top >= 260 && patch.top + patch.height <= 350, 'Patch extends beyond the hand band');
    assert.ok((patch.left >= 0 && patch.left + patch.width <= 160) || (patch.left >= 976 && patch.left + patch.width <= info.width), 'Patch overlaps the protected arms or body');
    const input = fs.readFileSync(local(patch.file));
    assert.equal(hash(input), patch.sha256, `${record.id}: reviewed hand patch changed`);
    const meta = await sharp(input).metadata();
    assert.equal(meta.width, patch.width); assert.equal(meta.height, patch.height);
    overlays.push({ input, left: patch.left, top: patch.top });
  }
  const output = await sharp(source).composite(overlays).removeAlpha().png().toBuffer();
  const after = await sharp(output).removeAlpha().raw().toBuffer();
  let changed = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const offset = (y * info.width + x) * 3;
    if (before[offset] === after[offset] && before[offset + 1] === after[offset + 1] && before[offset + 2] === after[offset + 2]) continue;
    assert.ok(record.patches.some(p => x >= p.left && x < p.left + p.width && y >= p.top && y < p.top + p.height), `${record.id}: changed pixel outside a hand at ${x},${y}`);
    changed++;
  }
  assert.ok(changed > 0, `${record.id}: correction missing`);
  const armRecord = arms.sets.find(set => set.id === record.id);
  const reachBefore = await verifyVisibleReach(source, armRecord);
  const reachAfter = await verifyVisibleReach(output, armRecord);
  for (const side of [0, 1]) assert.ok(Math.abs(reachBefore[side] - reachAfter[side]) <= 6, `${record.id}: corrected arm reach changed`);
  if (check) {
    const actual = await sharp(local(record.output)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    assert.equal(actual.info.width, info.width); assert.equal(actual.info.height, info.height);
    assert.deepEqual(actual.data, after, `${record.id}: published hand correction differs from reviewed patches`);
  } else fs.writeFileSync(local(record.output), output);
  console.log(`${check ? 'Verified' : 'Prepared'} ${record.id}: rear-view hands; ${changed} edited pixels, protected artwork unchanged`);
}
