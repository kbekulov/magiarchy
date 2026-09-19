import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

export const resourceKinds = ['reference-sheet', 't-pose', 'sketch', '3d-model'];
export function resourcePath(root, value, preview = false) {
  assert.equal(typeof value, 'string', 'Resource file path must be a string');
  assert.ok(!/[\\?#%:]/.test(value) && !value.split('/').includes('..'), `Unsafe resource path: ${value}`);
  assert.ok(value.startsWith('media/gallery/resources/') || (preview && value.startsWith('media/gallery/images/')), `Resource must use a local Gallery path: ${value}`);
  const file = path.resolve(root, value);
  assert.ok(file.startsWith(path.resolve(root) + path.sep) && fs.existsSync(file) && fs.statSync(file).isFile(), `Missing resource file: ${value}`);
  assert.ok(fs.statSync(file).size > 0, `Empty resource file: ${value}`);
  return file;
}

export function validateResources(root, records, { built = true } = {}) {
  assert.ok(Array.isArray(records), 'Gallery resources must be an array');
  const ids = new Set();
  const gallery = fs.readFileSync(path.join(root, 'gallery.html'), 'utf8');
  const characterSource = fs.readFileSync(path.join(root, 'character.js'), 'utf8');
  for (const record of records) {
    assert.ok(typeof record.id === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id) && !ids.has(record.id), `Invalid or duplicate resource id: ${record.id}`);
    ids.add(record.id);
    if (record.nonCanon != null) assert.equal(typeof record.nonCanon, 'boolean', `${record.id}: nonCanon must be boolean`);
    if (record.template != null) assert.equal(typeof record.template, 'boolean', `${record.id}: template must be boolean`);
    for (const key of ['title', 'summary']) assert.ok(typeof record[key] === 'string' && record[key].trim(), `${record.id}: missing ${key}`);
    assert.ok(resourceKinds.includes(record.kind), `${record.id}: unknown resource type`);
    assert.ok(Array.isArray(record.characters) && Array.isArray(record.previews) && Array.isArray(record.files), `${record.id}: characters, previews, and files must be arrays`);
    assert.ok(record.previews.length || record.files.length, `${record.id}: requires a preview or downloadable file`);
    for (const slug of record.characters) assert.ok(characterSource.includes(`slug: '${slug}'`), `${record.id}: unknown character ${slug}`);
    for (const key of ['era', 'modelVersion', 'usage']) if (record[key] != null) assert.equal(typeof record[key], 'string', `${record.id}: invalid ${key}`);
    const sources = new Set();
    const views = new Set();
    for (const preview of record.previews) {
      if (preview.revision !== undefined) assert.match(preview.revision, /^r[1-9]\d*$/, `${record.id}: invalid preview revision`);
      assert.ok(typeof preview.id === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(preview.id) && !views.has(preview.id), `${record.id}: unique preview id required`);
      views.add(preview.id);
      const source = resourcePath(root, preview.src, true);
      assert.ok(/\.(png|jpe?g|webp)$/i.test(source), `${record.id}: use a raster preview, not a model or document`);
      assert.ok(!sources.has(source), `${record.id}: repeated preview`); sources.add(source);
      assert.ok(typeof preview.alt === 'string' && preview.alt.trim(), `${record.id}: preview alt text required`);
      if (built) {
        assert.ok(preview.width > 0 && preview.height > 0, `${record.id}: missing preview dimensions`);
        assert.ok(preview.thumbnail?.startsWith('media/gallery/previews/resources/') && fs.existsSync(path.join(root, preview.thumbnail)), `${record.id}: missing lightweight preview`);
        if (preview.revision) assert.ok(preview.thumbnail.endsWith(`-${preview.revision}.webp`), `${record.id}: stale preview revision`);
      }
    }
    const files = new Set();
    for (const file of record.files) {
      const absolute = resourcePath(root, file.path);
      assert.ok(!files.has(absolute), `${record.id}: repeated download`); files.add(absolute);
      assert.ok(typeof file.label === 'string' && file.label.trim(), `${record.id}: download label required`);
      assert.ok(!/\.(exe|msi|bat|cmd|ps1|js|html|svg)$/i.test(file.path), `${record.id}: publish source assets or archives, not executable downloads`);
      if (built) {
        assert.equal(file.bytes, fs.statSync(absolute).size, `${record.id}: stale download size`);
        assert.equal(file.format, path.extname(file.path).slice(1).toUpperCase(), `${record.id}: stale download format`);
      }
    }
    for (const fact of record.technical || []) assert.ok(typeof fact.label === 'string' && typeof fact.value === 'string', `${record.id}: invalid technical note`);
    for (const id of record.artwork || []) assert.ok(gallery.includes(`/${id}.`), `${record.id}: unknown related artwork ${id}`);
    assert.ok(!JSON.stringify(record).includes('\u2014'), `${record.id}: em dash regression`);
  }
}
