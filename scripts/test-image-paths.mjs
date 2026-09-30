import fs from 'node:fs';
const registry = JSON.parse(fs.readFileSync(new URL('../gallery/image-identities.json', import.meta.url), 'utf8'));
const paths = new Map();
for (const record of registry.images) for (const current of [record.source, ...record.derivatives]) {
  paths.set(current.replace(/\/(FULL|PREV)-/, '/').replace(/-img-\d{6}(?=\.)/, ''), current);
}
export const publishedImagePath = legacy => paths.get(legacy) || legacy;
