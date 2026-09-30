import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mediaImages, imageRelations, fileImageId, withImageId, validateImageIdentities } from './image-identities.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Cloud-sync clients can briefly lock files during a bulk rename.
function writeText(file, content) {
  for (let attempt = 0; ; attempt++) {
    try { fs.writeFileSync(file, content); return; }
    catch (error) {
      if (attempt >= 9 || !['UNKNOWN', 'EBUSY', 'EPERM', 'EACCES'].includes(error.code)) throw error;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 200);
    }
  }
}
const registryPath = path.join(root, 'gallery/image-identities.json');
const registry = fs.existsSync(registryPath) ? JSON.parse(fs.readFileSync(registryPath, 'utf8')) : { version: 1, nextId: 1, images: [] };
if (process.argv.includes('--check')) {
  validateImageIdentities(root, registry);
  console.log(`Verified ${registry.images.filter(record => record.active).length} published image identities.`);
} else {
  const files = mediaImages(root), relations = imageRelations(root);
  const originals = files.filter(file => !relations.has(file));
  if (originals.some(file => file.startsWith('media/gallery/previews/'))) throw new Error('Unmapped display derivative; register its original before building image IDs');
  const renames = new Map(), claimed = new Set();
  for (const source of originals) {
    let record = registry.images.find(item => item.source === source || (fileImageId(source) && item.id === fileImageId(source)));
    if (record && claimed.has(record.id)) throw new Error(`Two originals claim ${record.id}; assign a new ID to a separate image`);
    if (!record) {
      if (fileImageId(source)) throw new Error(`Unregistered ID in ${source}; do not invent or reuse identifiers`);
      record = { id: `IMG-${String(registry.nextId++).padStart(6, '0')}`, source: '', derivatives: [], previousPaths: [], active: true };
      registry.images.push(record);
    }
    claimed.add(record.id);
    const destination = withImageId(source, record.id);
    if (record.source && record.source !== destination) record.previousPaths.push(record.source);
    record.source = destination;
    record.active = true;
    record.derivatives = [];
    if (source !== destination) { renames.set(source, destination); record.previousPaths.push(source); }
    for (const [preview, original] of relations) if (original === source) {
      const target = withImageId(preview, record.id, true);
      record.derivatives.push(target);
      if (preview !== target) { renames.set(preview, target); record.previousPaths.push(preview); }
    }
    record.previousPaths = [...new Set(record.previousPaths)];
  }
  for (const record of registry.images) if (!claimed.has(record.id)) record.active = false;
  // Validate all destinations before moving any bytes. A rename never modifies the image.
  for (const [source, destination] of renames) {
    if (!fs.existsSync(path.join(root, source))) throw new Error(`Missing source ${source}`);
    if (fs.existsSync(path.join(root, destination))) throw new Error(`Refusing to overwrite ${destination}`);
  }
  const galleryFile = path.join(root, 'gallery.html');
  let gallery = fs.readFileSync(galleryFile, 'utf8');
  gallery = gallery.replace(/<figure\b([^>]*class="gallery-card[^>]*?)>([\s\S]*?)<\/figure>/g, (whole, attrs, body) => {
    if (/\bdata-image=/.test(attrs)) return whole;
    const source = body.match(/\bsrc="([^"]+)"/)?.[1];
    return source ? whole.replace('<figure ', `<figure data-image="${path.basename(source, path.extname(source))}" `) : whole;
  });
  writeText(galleryFile, gallery);
  for (const [source, destination] of renames) fs.renameSync(path.join(root, source), path.join(root, destination));
  // Only published sources and local tooling: never traverse workshop, backlog or output.
  const textFiles = fs.readdirSync(root).filter(file => /\.(html|js|css|md)$/.test(file));
  for (const folder of ['scripts', 'docs', 'story', 'moments', 'holumns', 'items', 'weapons', 'gallery']) {
    for (const file of fs.readdirSync(path.join(root, folder))) {
      if (/\.(mjs|js|md|json)$/.test(file) && `${folder}/${file}` !== 'gallery/image-identities.json') textFiles.push(`${folder}/${file}`);
    }
  }
  const replacements = [...renames].sort((a, b) => b[0].length - a[0].length);
  const basenameCounts = new Map();
  for (const source of files) basenameCounts.set(path.basename(source), (basenameCounts.get(path.basename(source)) || 0) + 1);
  for (const file of textFiles) {
    const absolute = path.join(root, file), before = fs.readFileSync(absolute, 'utf8');
    let after = before;
    for (const [source, destination] of replacements) after = after.split(source).join(destination);
    // Tests and download captions sometimes use a basename without its directory.
    for (const [source, destination] of replacements) if (basenameCounts.get(path.basename(source)) === 1) {
      const old = path.basename(source), replacement = path.basename(destination);
      // Exact filename tokens only; avoid matching an already-renamed path.
      after = after.replace(new RegExp(`(?<![A-Za-z0-9_./-])${old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z0-9_.-])`, 'g'), replacement);
    }
    if (after !== before) writeText(absolute, after);
  }
  writeText(registryPath, JSON.stringify(registry, null, 2) + '\n');
  validateImageIdentities(root, registry);
  console.log(`Registered ${claimed.size} original images; renamed ${renames.size} originals and derivatives without changing their bytes.`);
}
