import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

// Audit publishable media only. Backlog sources and local generation drafts are not public assets.
export function verifyMediaVisibility(root, search) {
  const read = file => fs.readFileSync(path.join(root, file), 'utf8');
  const sources = fs.readdirSync(root).filter(file => /\.(html|js|css)$/.test(file));
  sources.push('gallery/resources.json', 'gallery/panels.json', 'weapons/index.json', 'items/index.json');
  const references = new Set();
  for (const file of sources) {
    const source = read(file);
    assert.ok(!/["'(]output\//.test(source), `${file}: private output must not be published`);
    for (const match of source.matchAll(/media\/[a-zA-Z0-9_./ -]+\.(?:png|jpe?g|webp|gif|svg)/g)) references.add(match[0]);
  }
  const images = [];
  const walk = folder => {
    for (const entry of fs.readdirSync(path.join(root, folder), { withFileTypes: true })) {
      const file = `${folder}/${entry.name}`;
      if (entry.isDirectory()) walk(file);
      else if (/\.(png|jpe?g|webp|gif|svg)$/i.test(file)) images.push(file);
    }
  };
  walk('media');
  assert.deepEqual(images.filter(file => !references.has(file)), [], 'Images in public media need a Gallery or other site destination');
  const cards = [...read('gallery.html').matchAll(/<figure\b([^>]*\bclass="gallery-card[^"]*"[^>]*)>([\s\S]*?)<\/figure>/g)];
  for (const [, attrs, body] of cards) {
    const source = body.match(/\bsrc="([^"]+)"/)?.[1];
    const id = attrs.match(/\bdata-image="([^"]+)"/)?.[1] || path.basename(source, path.extname(source));
    assert.ok(search.entries.some(entry => entry.id === `artwork-${id}` && entry.url === `gallery.html?image=${encodeURIComponent(id)}`), `${id}: artwork missing from search`);
    assert.ok(/data-art-finish="(?:pencil|colored)"/.test(attrs), `${id}: artwork finish missing`);
  }
  console.log(`Verified public references for ${images.length} images and individual search entries for ${cards.length} artworks.`);
}
