import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const galleryPath = path.join(root, 'gallery.html');
let gallery = fs.readFileSync(galleryPath, 'utf8');
const sources = [...new Set([...gallery.matchAll(/<img\b[^>]*src="(media\/gallery\/images\/[^"]+)"/g)].map(match => match[1]))];
const previews = new Map();
let before = 0, after = 0;
for (const source of sources) {
  const preview = source.replace('media/gallery/images/', 'media/gallery/previews/').replace(/\.[^.]+$/, '.webp');
  const destination = path.join(root, preview);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  await sharp(path.join(root, source)).resize({ width: 480, height: 480, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(destination);
  previews.set(source, preview);
  before += fs.statSync(path.join(root, source)).size;
  after += fs.statSync(destination).size;
}
gallery = gallery.replace(/<img\b[^>]*src="(media\/gallery\/images\/[^"]+)"[^>]*>/g, (tag, source) => {
  const clean = tag.replace(/\sdata-preview="[^"]*"/g, '').replace(/\ssrcset="[^"]*"/g, '');
  // Original src preserves stable reader URLs and full-resolution downloads.
  return clean.replace('<img ', `<img data-preview="${previews.get(source)}" srcset="${previews.get(source)} 1x" `);
});
fs.writeFileSync(galleryPath, gallery);
const catalogPath = path.join(root, 'characters.html');
const catalog = fs.readFileSync(catalogPath, 'utf8').replace(/<img\b[^>]*class="character-chibi"[^>]*>/g, tag => {
  const source = tag.match(/src="([^"]+)"/)?.[1];
  const preview = previews.get(source);
  if (!preview) return tag;
  return tag.replace(/\ssrcset="[^"]*"/g, '').replace('<img ', `<img srcset="${preview} 1x" `);
});
fs.writeFileSync(catalogPath, catalog);
console.log(`${sources.length} artwork previews: ${(before / 1048576).toFixed(1)} MB originals, ${(after / 1048576).toFixed(1)} MB previews. Originals unchanged.`);
