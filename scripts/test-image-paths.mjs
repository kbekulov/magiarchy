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

const html = fs.readFileSync(new URL('../gallery.html', import.meta.url), 'utf8');
const cards = [...html.matchAll(/<figure\b[^>]*class="gallery-card[^>]*>[\s\S]*?<\/figure>/g)].map(([text]) => ({
  id: text.match(/data-image="([^"]+)"/)?.[1],
  revisionOf: text.match(/data-revision-of="([^"]+)"/)?.[1],
  src: text.match(/<img\b[^>]*\ssrc="([^"]+)"/)?.[1],
  preview: text.match(/data-preview="([^"]+)"/)?.[1]
}));
export function currentArtworkId(id) { return cards.find(card => card.revisionOf === id)?.id || id; }
export function currentPublishedImagePath(legacy) {
  const source = publishedImagePath(legacy);
  const original = cards.find(card => card.src === source || card.preview === source);
  const current = cards.find(card => card.revisionOf === original?.id);
  return current ? (source === original.preview ? current.preview : current.src) : source;
}
