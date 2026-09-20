import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const records = JSON.parse(fs.readFileSync(path.join(root, 'gallery/t-pose-approved.json'), 'utf8'));
const resources = JSON.parse(fs.readFileSync(path.join(root, 'gallery/resources.json'), 'utf8'));
const expected = resources.filter(r => r.kind === 't-pose').flatMap(r => r.previews.map(v => `${r.id}/${v.id}`));
assert.deepEqual(records.map(r => `${r.resource}/${r.view}`).sort(), expected.sort(), 'Approved baseline must cover every registered T-pose view exactly once');
for (const record of records) {
  assert.ok(record.path.startsWith('media/gallery/resources/') && !record.path.split('/').includes('..') && !/[\\:]/.test(record.path));
  const view = resources.find(r => r.id === record.resource).previews.find(v => v.id === record.view);
  assert.equal(view.src, record.path);
  const file = path.join(root, record.path);
  const hash = createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  assert.equal(hash, record.sha256, `${record.resource}/${record.view}: inspect changed artwork before updating its approved baseline`);
  const meta = await sharp(file).metadata();
  assert.equal(meta.width, record.width);
  assert.equal(meta.height, record.height);
  assert.equal(view.width, meta.width);
  assert.equal(view.height, meta.height);
}
console.log(`Verified ${records.length} approved T-pose assets without archived source dependencies.`);
