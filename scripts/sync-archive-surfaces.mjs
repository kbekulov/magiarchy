import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const check = process.argv.includes('--check');
const save = (file, before, after) => {
  if (check) assert.equal(before, after, `${file}: generated surfaces are stale; run node scripts/build-search-index.mjs`);
  else if (before !== after) fs.writeFileSync(path.join(root, file), after);
};

const characterSource = read('character.js');
const profiles = vm.runInNewContext(`${characterSource.slice(0, characterSource.indexOf('const profilesBySlug'))}; profileSeeds`);
const originalCatalog = read('characters.html');
const seen = new Set();
const catalog = originalCatalog.replace(/<article\b[^>]*class="character-card[^>]*>[\s\S]*?<\/article>/g, card => {
  const name = card.match(/data-name="([^"]+)"/)?.[1];
  const profile = profiles.find(candidate => candidate.name === name);
  assert.ok(profile, `Unknown catalog character: ${name}`);
  seen.add(profile.slug);
  const heading = /(<div class="character-heading"><div><p>)[\s\S]*?(<\/p>)/;
  const summary = /(<\/div><\/div>\s*<p>)[\s\S]*?(<\/p>)/;
  assert.ok(heading.test(card) && summary.test(card), `${name}: unsupported card structure`);
  return card.replace(heading, (_, start, end) => start + escape(profile.catalogRole || profile.role) + end)
    .replace(summary, (_, start, end) => start + escape(profile.summary) + end);
});
assert.equal(seen.size, profiles.length, 'Every profile needs a catalog card');
save('characters.html', originalCatalog, catalog);

const archive = JSON.parse(read('holumns/index.json'));
const incidentById = new Map(archive.incidents.map(incident => [incident.id, incident]));
const evidenceLink = incident => `docs.html?doc=holumn-incidents-and-testimonies#${incident.slug}`;
const forms = archive.types.map((type, index) => {
  const evidence = type.evidence.map(id => {
    const incident = incidentById.get(id);
    assert.ok(incident, `Missing Holumn evidence: ${id}`);
    return `<a href="${evidenceLink(incident)}" aria-label="${escape(incident.title)}">${id}</a>`;
  }).join(' · ');
  return `<article data-holumn-type="${type.id}"><span>${String(index + 1).padStart(2, '0')} · ${escape(type.name.toUpperCase())}</span><div class="holumn-form-mark" aria-hidden="true"><i></i></div><h3>${escape(type.name)}</h3><p>${escape(type.summary)}</p><p class="holumn-source-links">Incident evidence: ${evidence}</p></article>`;
}).join('\n                ');
const incidents = [...archive.incidents].sort((a, b) => a.id.localeCompare(b.id)).map(incident => {
  const typeNames = incident.types.map(id => archive.types.find(type => type.id === id)?.name || id);
  return `<a data-incident="${incident.id}" href="${evidenceLink(incident)}"><span>${incident.id} · ${escape(typeNames.join(' / ') || 'Unclassified form')}</span><h3>${escape(incident.title)}</h3><p>${escape(incident.summary || incident.observedEffect)}</p><p class="holumn-incident-limit">${escape(incident.knownWeakness)}</p><small>Read the incident record →</small></a>`;
}).join('\n                ');
const originalHolumns = read('holumns.html');
let holumns = originalHolumns;
for (const [className, content] of [['holumn-form-grid', forms], ['holumn-incident-grid', incidents]]) {
  // Both owned grids are bounded by the end of their parent section or its evidence aside.
  const pattern = new RegExp(`(<div class="${className}">)[\\s\\S]*?(\\n              </div>)`);
  assert.ok(pattern.test(holumns), `Missing ${className}`);
  holumns = holumns.replace(pattern, (_, start, end) => `${start}\n                ${content}${end}`);
}
save('holumns.html', originalHolumns, holumns);
const testimony = read('docs/holumn-incidents-and-testimonies.md');
for (const incident of archive.incidents) {
  assert.ok(testimony.includes(`## ${incident.title}`) && testimony.includes(incident.id), `${incident.id}: missing testimony record`);
}
console.log(`${check ? 'Verified' : 'Synchronized'} ${profiles.length} character previews and ${archive.incidents.length} Holumn records.`);
