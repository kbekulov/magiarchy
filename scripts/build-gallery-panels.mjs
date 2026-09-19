import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { validatePanels } from './gallery-panels.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'gallery/panels.json');
const records = JSON.parse(fs.readFileSync(file, 'utf8'));
validatePanels(root, records, { built: false });
for (const record of records) {
  for (const panel of record.panels) {
    const source = path.join(root, panel.src);
    const meta = await sharp(source).metadata();
    panel.width = meta.width; panel.height = meta.height;
    panel.bytes = fs.statSync(source).size;
    for (const [key, width, quality] of [['display', 1680, 90], ['thumbnail', 480, 85]]) {
      panel[key] = `media/gallery/previews/panels/${record.id}${record.revision ? `-${record.revision}` : ''}-${panel.id}-${key}.webp`;
      const output = path.join(root, panel[key]);
      fs.mkdirSync(path.dirname(output), { recursive: true });
      await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(output);
    }
  }
}
validatePanels(root, records);
fs.writeFileSync(file, JSON.stringify(records, null, 2) + '\n');
console.log(`Prepared ${records.length} scene panel sets. Original files unchanged.`);
