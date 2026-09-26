import fs from 'node:fs';
import { pruneHomeUpdates } from './home-updates.mjs';

const file = new URL('../index.html', import.meta.url);
const before = fs.readFileSync(file, 'utf8');
const result = pruneHomeUpdates(before);
if (result.html !== before) fs.writeFileSync(file, result.html);
console.log(`Home updates: ${result.retained.length} within 31 days; ${result.removed} expired entries removed.`);
