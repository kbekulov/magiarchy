import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

export function searchSourceDigest(root) {
  const files = fs.readdirSync(root).filter(name => /\.(html|js)$/.test(name));
  for (const folder of ['docs', 'story', 'moments', 'holumns', 'items', 'weapons']) {
    for (const name of fs.readdirSync(path.join(root, folder))) {
      if (/\.(md|json)$/.test(name)) files.push(`${folder}/${name}`);
    }
  }
  files.push('scripts/build-search-index.mjs');
  const hash = createHash('sha256');
  for (const file of files.sort()) hash.update(file).update('\0').update(fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n'));
  return hash.digest('hex');
}
