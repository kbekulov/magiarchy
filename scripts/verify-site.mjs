import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { searchSourceDigest } from './search-source-digest.mjs';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const htmlFiles = fs.readdirSync(root).filter(file => file.endsWith('.html'));
const dynamicAnchors = new Set(['docs.html', 'story.html', 'moments.html', 'character.html', 'weapons.html', 'items.html', 'gallery.html']);
const decode = text => text.replaceAll('&amp;', '&');
for (const file of fs.readdirSync(root).filter(file => file.endsWith('.js'))) execFileSync(process.execPath, ['--check', path.join(root, file)]);
for (const file of fs.readdirSync(path.join(root, 'scripts')).filter(file => file.endsWith('.mjs'))) execFileSync(process.execPath, ['--check', path.join(root, 'scripts', file)]);
let linkCount = 0;
function checkUrl(href, source) {
  if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(href)) return;
  const url = new URL(decode(href), `https://archive.local/${source}`);
  const file = decodeURIComponent(url.pathname).slice(1);
  assert.ok(fs.existsSync(path.join(root, file)), `${source}: missing ${href}`);
  if (url.hash && file.endsWith('.html') && !dynamicAnchors.has(file)) {
    assert.ok(read(file).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${source}: missing anchor ${href}`);
  }
  linkCount++;
}
for (const file of htmlFiles) {
  const source = read(file);
  for (const match of source.matchAll(/\b(?:href|src|data-preview)="([^"]+)"/g)) checkUrl(match[1], file);
  assert.ok(source.includes('CNAME') || source.includes('script.js'), `${file}: shared site behavior missing`);
}
for (const file of fs.readdirSync(root).filter(file => /\.(html|css|js)$/.test(file))) {
  const source = read(file);
  assert.ok(!/(?:linear|radial|conic)-gradient\s*\(/i.test(source), `${file}: gradient regression`);
  assert.ok(!source.includes('\u2014'), `${file}: em dash regression`);
}
assert.equal(read('CNAME').trim(), 'magiarchy.bekulov.com');
for (const section of read('docs/questions-to-be-answered.md').split(/^## /m)) {
  const confidence = [...section.matchAll(/^\|.*\| (\d+)% \|$/gm)].map(match => Number(match[1]));
  assert.deepEqual(confidence, [...confidence].sort((a, b) => a - b), 'Question confidence ordering has drifted');
}
const search = json('search-index.json');
assert.equal(search.sourceDigest, searchSourceDigest(root), 'Search content is stale; rebuild it');
for (const entry of search.entries) {
  checkUrl(entry.url, 'index.html');
  assert.equal(typeof entry.current, 'boolean', `${entry.id}: missing current/default metadata`);
}
for (const [folder, prefix] of [['story', 'chapter'], ['moments', 'moment'], ['docs', 'doc']]) {
  for (const record of json(`${folder}/index.json`)) {
    const entries = search.entries.filter(entry => entry.recordId === `${prefix}-${record.slug}`);
    assert.equal(entries.filter(entry => entry.current).length, 1, `${record.slug}: exactly one selected search revision required`);
    if (record.versions?.length) {
      assert.equal(entries.length, record.versions.length, `${record.slug}: historical search coverage`);
      assert.ok(entries.find(entry => entry.current).url.includes(`version=${record.defaultVersion}`));
    }
  }
}
console.log(`Verified ${htmlFiles.length} pages, ${linkCount} local destinations, search freshness, and flat-design invariants.`);
