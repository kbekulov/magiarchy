import fs from 'node:fs';
const registry = JSON.parse(fs.readFileSync(new URL('../gallery/image-identities.json', import.meta.url), 'utf8'));
const paths = new Map();
const legacyPath = file => file.replace(/\/(FULL|PREV)-/, '/').replace(/-img-\d{6}(?=\.)/, '');
for (const record of registry.images) {
  for (const previous of record.previousPaths || []) {
    const current = previous.includes('/previews/')
      ? record.derivatives.find(file => file.split('.').pop() === previous.split('.').pop())
      : previous.includes('/images/') ? record.source : null;
    if (current) paths.set(legacyPath(previous), current);
  }
  for (const current of [record.source, ...record.derivatives]) paths.set(legacyPath(current), current);
}
export const publishedImagePath = legacy => paths.get(legacy) || legacy;
