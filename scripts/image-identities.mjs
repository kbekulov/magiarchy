import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

export const imageExtension = /\.(png|jpe?g|webp|gif|svg)$/i;
export const imageIdPattern = /(?:^|-)img-(\d{6})(?=[-.]|$)/i;
export const fileImageId = file => {
  const match = path.basename(file).match(imageIdPattern);
  return match ? `IMG-${match[1]}` : null;
};
export const withImageId = (file, id, preview = false) => {
  const name = path.basename(file).replace(/^(?:FULL|PREV)-/i, '');
  const identified = fileImageId(name) ? name : name.replace(/(\.[^.]+)$/, `-${id.toLowerCase()}$1`);
  return `${path.posix.dirname(file)}/${preview ? 'PREV' : 'FULL'}-${identified}`;
};
export function mediaImages(root) {
  const files = [];
  const walk = relative => {
    for (const entry of fs.readdirSync(path.join(root, relative), { withFileTypes: true })) {
      const file = `${relative}/${entry.name}`;
      if (entry.isDirectory()) walk(file);
      else if (imageExtension.test(file)) files.push(file);
    }
  };
  walk('media');
  return files.sort();
}
export function imageRelations(root) {
  const read = file => fs.readFileSync(path.join(root, file), 'utf8');
  const relations = new Map();
  for (const tag of read('gallery.html').matchAll(/<img\b[^>]*>/g)) {
    const source = tag[0].match(/\bsrc="([^"]+)"/)?.[1];
    const preview = tag[0].match(/\bdata-preview="([^"]+)"/)?.[1];
    if (source && preview) relations.set(preview, source);
  }
  for (const record of JSON.parse(read('gallery/resources.json'))) {
    for (const view of record.previews) if (view.thumbnail) relations.set(view.thumbnail, view.src);
  }
  for (const record of JSON.parse(read('gallery/panels.json'))) {
    for (const panel of record.panels) for (const key of ['display', 'thumbnail']) {
      if (panel[key]) relations.set(panel[key], panel.src);
    }
  }
  return relations;
}
export function validateImageIdentities(root, registry) {
  const ids = new Set(), paths = new Set(), activePaths = new Set();
  for (const record of registry.images) {
    assert.match(record.id, /^IMG-\d{6}$/);
    assert.ok(!ids.has(record.id), `Duplicate image ID ${record.id}`);
    ids.add(record.id);
    for (const file of [record.source, ...record.derivatives]) {
      assert.ok(file.startsWith('media/') && !file.includes('..') && !/[\\:]/.test(file), `Non-public image path: ${file}`);
      assert.equal(fileImageId(file), record.id, `${file}: filename ID differs from registry`);
      assert.ok(path.basename(file).startsWith(file === record.source ? 'FULL-' : 'PREV-'), `${file}: expected FULL- original or PREV- derivative prefix`);
      assert.ok(!paths.has(file), `Image path has multiple IDs: ${file}`);
      paths.add(file);
      if (record.active) {
        assert.ok(fs.existsSync(path.join(root, file)), `Missing registered image: ${file}`);
        activePaths.add(file);
      }
    }
  }
  assert.ok(registry.nextId > Math.max(0, ...[...ids].map(id => Number(id.slice(4)))), 'IDs must never be recycled');
  assert.deepEqual(mediaImages(root).filter(file => !activePaths.has(file)), [], 'Published images need persistent IDs');
  const byPath = new Map(registry.images.filter(r => r.active).flatMap(r => [r.source, ...r.derivatives].map(file => [file, r.id])));
  for (const [preview, original] of imageRelations(root)) assert.equal(byPath.get(preview), byPath.get(original), `${preview}: preview must share original ID`);
}
