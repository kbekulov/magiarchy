import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { validateResources } from './gallery-resources.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const index = path.join(root, 'gallery/resources.json');
const records = JSON.parse(fs.readFileSync(index, 'utf8'));
validateResources(root, records, { built: false });
for (const record of records) {
  for (const [i, preview] of record.previews.entries()) {
    preview.thumbnail = `media/gallery/previews/resources/${record.id}-${i + 1}${preview.revision ? `-${preview.revision}` : ''}.webp`;
    const output = path.join(root, preview.thumbnail);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    const source = path.join(root, preview.src);
    const metadata = await sharp(source).metadata();
    preview.width = metadata.width; preview.height = metadata.height;
    await sharp(source).resize({ width: 480, height: 480, fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toFile(output);
  }
  for (const file of record.files) {
    file.bytes = fs.statSync(path.join(root, file.path)).size;
    file.format = path.extname(file.path).slice(1).toUpperCase();
  }
}
validateResources(root, records);
fs.writeFileSync(index, JSON.stringify(records, null, 2) + '\n');
console.log(`Prepared ${records.length} production resources. Original files unchanged.`);
