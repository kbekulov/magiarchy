import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Local editorial aid, not an AI detector. No network, dependencies, or writes.
// Style warnings deliberately do not set a failing exit code.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const units = [];
const files = new Set();
const clean = text => text.replace(/<[^>]+>/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\s+/g, ' ').trim();
function add(file, source, start, text, kind = 'archive') {
  const prose = clean(text);
  if (prose.length < 35) return;
  files.add(file);
  units.push({ file, line: source.slice(0, start).split('\n').length, text: prose, kind });
}

// Keep JSON string locations so warnings point to the owning current record,
// not an identical sentence inside an archived version.
export function jsonTree(source) {
  let at = 0;
  function value() {
    while (/\s/.test(source[at] || '') && at < source.length) at++;
    const start = at;
    const ch = source[at++];
    let children;
    if (ch === '{' || ch === '[') {
      children = new Map();
      let index = 0;
      while (true) {
        while (/\s/.test(source[at] || '') && at < source.length) at++;
        if (source[at] === (ch === '{' ? '}' : ']')) { at++; break; }
        const key = ch === '{' ? value().value : index++;
        if (ch === '{') { while (/\s/.test(source[at] || '')) at++; at++; }
        children.set(key, value());
        while (/\s/.test(source[at] || '') && at < source.length) at++;
        if (source[at] === ',') at++;
      }
    } else if (ch === '"') {
      while (at < source.length) { const c = source[at++]; if (c === '\\') at++; else if (c === '"') break; }
    } else {
      while (at < source.length && !/[\s,}\]]/.test(source[at])) at++;
    }
    return { start, children, value: JSON.parse(source.slice(start, at)) };
  }
  JSON.parse(source); // Fail clearly on invalid input rather than looping.
  return value();
}
export function currentNodes(node) {
  if (!node.children) return [];
  const fields = new Map(node.children);
  const id = fields.get('defaultVersion')?.value;
  const version = [...(fields.get('versions')?.children?.values() || [])].find(v => v.value.id === id);
  if (version) for (const [key, child] of version.children) fields.set(key, child);
  fields.delete('versions');
  return [...fields];
}
function jsonUnits(file) {
  const source = read(file);
  function visit(node, key = '', kind = 'archive') {
    if (typeof node.value === 'string') {
      if (!/^(?:id|slug|file|href|src|url|title|label|name|updated|descriptionFile|chapterMatch|momentProseMatch)$/.test(key)) add(file, source, node.start, node.value, kind);
      return;
    }
    if (!node.children) return;
    for (const [k, child] of currentNodes(node)) visit(child, String(k), key === 'prose' || k === 'prose' ? 'fiction' : kind);
  }
  visit(jsonTree(source));
}
function markdown(file, kind) {
  const source = read(file);
  for (const m of source.matchAll(/[^\r\n]+/g)) {
    if (/^(?:#|\s*```)/.test(m[0])) continue;
    add(file, source, m.index, m[0], kind);
  }
}
function collect() {
  for (const file of fs.readdirSync(root).filter(f => f.endsWith('.html') && f !== 'characters.html')) {
    const source = read(file);
    // Generated Holumn cards repeat owning JSON; do not count them twice.
    if (file === 'holumns.html') continue;
    const end = source.search(/<aside\b[^>]*class="[^"]*\bnotes-sidebar\b/);
    const main = end < 0 ? source : source.slice(0, end);
    for (const m of main.matchAll(/<(p|li|blockquote)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) add(file, source, m.index, m[2], file === 'index.html' ? 'home' : 'archive');
  }
  const profile = read('character.js').split('const profilesBySlug')[0];
  for (const m of profile.matchAll(/(['"])((?:\\.|(?!\1)[^\\\r\n])*)\1/g)) {
    add('character.js', profile, m.index, m[2].replace(/\\(['"])/g, '$1'));
  }
  for (const file of ['holumns/index.json', 'items/index.json', 'weapons/index.json', 'moments/index.json', 'story/index.json', 'gallery/panels.json', 'gallery/resources.json']) jsonUnits(file);
  for (const record of JSON.parse(read('story/index.json'))) {
    const selected = { ...record, ...record.versions?.find(v => v.id === record.defaultVersion) };
    markdown(`story/${selected.file}`, 'fiction');
  }
  for (const record of JSON.parse(read('docs/index.json'))) {
    if (record.slug === 'prose-style-history' || record.slug.startsWith('archive-audit-')) continue;
    const selected = { ...record, ...record.versions?.find(v => v.id === record.defaultVersion) };
    markdown(`docs/${selected.file}`, 'reference');
  }
}

const watch = /\b(?:now|remains?|preserv\w*|retain\w*|establish\w*|clarif\w*|distinguish\w*|align\w*|reflect\w*|support\w*|record\w*|ensur\w*|current|consistent)\b/gi;
export function inspect(group) {
  const findings = [];
  const warn = (u, phrase, reason) => findings.push({ file: u.file, line: u.line, phrase, reason });
  for (const u of group) {
    if (u.text.includes('\u2014')) warn(u, '\u2014', 'Banned punctuation; run npm run check for the enforced invariant.');
    if (u.kind === 'fiction') continue;
    const hits = [...u.text.matchAll(watch)];
    if (hits.length >= 4) warn(u, hits.map(m => m[0]).join(', '), 'Watchword cluster. Check whether the paragraph describes its subject or its maintenance.');
    const disclaimers = [...u.text.matchAll(/\b(?:does not (?:establish|imply|mean)|no .{0,35}? (?:is|has been) (?:established|confirmed)|not automatically)\b/gi)];
    if (disclaimers.length >= 2) warn(u, disclaimers.map(m => m[0]).join('; '), 'Repeated qualification. Can one precise uncertainty carry the necessary limit?');
    if (/\b(?:archive synchronization|records? (?:are|remain) synchronized|shared (?:records?|surfaces?) (?:now )?(?:preserve|reflect|follow))\b/i.test(u.text) && u.kind !== 'reference') warn(u, u.text, 'Archive-process language. Appropriate for a maintenance note, usually not world prose.');
    const contrasts = [...u.text.matchAll(/\b(?:not .{1,65}?,? but|rather than|instead of)\b/gi)];
    if (contrasts.length >= 3) warn(u, contrasts.map(m => m[0]).join('; '), 'Repeated contrast structure. Preserve the distinctions, reconsider the rhythm.');
    const triples = [...u.text.matchAll(/\b[A-Za-z]+, [A-Za-z]+, and [A-Za-z]+\b/g)];
    if (triples.length >= 3) warn(u, triples.map(m => m[0]).join('; '), 'Several three-part lists. Check for habitual symmetry rather than necessary detail.');
  }
  // Review repetition within a surface, never compare a source with its generated copy.
  const byFile = Map.groupBy(group, u => u.file);
  for (const rows of byFile.values()) {
    const now = rows.filter(u => u.kind === 'home' && /\bnow\b/i.test(u.text));
    if (now.length >= 5) for (const u of now) warn(u, u.text.match(/[^.!?]*\bnow\b[^.!?]*/i)[0], `Repeated Home update construction (${now.length} entries use "now"). Read consecutive entries for cadence.`);
    const openings = new Map();
    const stock = new Map();
    for (const u of rows) {
      if (u.kind !== 'fiction') {
        const opening = u.text.match(/^(?:[^.!?;]{0,45}\bremains\b|(?:They|We|These [a-z]+|Those [a-z]+) remain\b|This (?:establishes|clarifies|ensures|preserves)|[^.!?]{0,40}\bnow (?:includes|preserves|supports))/i)?.[0];
        if (opening) { const key = /\bremains?\b/i.test(opening) ? 'remains opening' : opening.replace(/^.*?\bnow\b/i, 'now').toLowerCase(); const list = openings.get(key) || []; list.push([u, opening]); openings.set(key, list); }
      }
      for (const match of u.text.matchAll(/\b(?:the silence (?:deepened|settled|stretched)|the words (?:hung|settled)|nothing would ever be the same)\b/gi)) {
        const list = stock.get(match[0].toLowerCase()) || []; list.push([u, match[0]]); stock.set(match[0].toLowerCase(), list);
      }
    }
    for (const list of [...openings.values(), ...stock.values()]) if (list.length >= 3) for (const [u, phrase] of list) warn(u, phrase, 'Repeated sentence pattern within this source. Check context before changing it.');
  }
  return findings;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  collect();
  const findings = inspect(units);
  console.log(`Prose voice review: ${files.size} current sources, ${units.length} passages. Historical revisions and generated duplicates excluded.`);
  for (const f of findings) console.log(`${f.file}:${f.line} | ${f.phrase.slice(0, 220)} | ${f.reason}`);
  console.log(`${findings.length} review warnings. No authorship score, automatic edits, or style failures. Watchwords are not banned; preserve concrete uses and deliberate repetition.`);
}
