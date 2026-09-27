import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

export const plain = (text = '') => String(text).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').trim();
export const headingId = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
export const ledgerId = (kind, text) => `${kind}-${headingId(text).slice(0, 96)}`;
export function current(record) {
  const versions = record.versions?.length ? record.versions : [{ id: 'v1' }];
  const version = versions.find(v => v.id === record.defaultVersion) || versions[0];
  return { ...record, ...version, versionId: version.id };
}

export function ledgerRows(markdown, kind = 'question') {
  const lines = markdown.split(/\r?\n/);
  let headers = [], section = '';
  const rows = [];
  for (const line of lines) {
    if (line.startsWith('## ')) { section = line.slice(3); headers = []; }
    if (!line.startsWith('|')) continue;
    const cells = line.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
    if (cells.some(c => c.toLowerCase() === kind)) { headers = cells.map(c => c.toLowerCase()); continue; }
    const index = headers.indexOf(kind);
    const progress = headers.indexOf(kind === 'question' ? 'confidence' : 'resolution');
    if (index < 0 || progress < 0 || cells.length !== headers.length) continue;
    if (kind === 'contradiction' && section !== 'Contradiction ledger') continue;
    const confidence = Number.parseInt(cells[progress], 10);
    if (!Number.isFinite(confidence) || confidence >= 100) continue;
    rows.push({ id: ledgerId(kind, cells[index]), title: plain(cells[0]), text: plain(cells[index]), confidence,
      meta: `${confidence}% ${kind === 'question' ? 'answered' : 'resolved'}`, section,
      href: `docs.html?doc=${kind === 'question' ? 'questions-to-be-answered' : 'contradictions-to-resolve'}#${ledgerId(kind, cells[index])}` });
  }
  if (new Set(rows.map(row => row.id)).size !== rows.length) throw new Error('Duplicate dashboard ledger anchors');
  return rows;
}

export function buildDashboard(root) {
  const read = file => fs.readFileSync(path.join(root, file), 'utf8');
  const json = file => JSON.parse(read(file));
  const source = read('character.js');
  const profiles = vm.runInNewContext(`${source.slice(0, source.indexOf('const profilesBySlug'))}; profileSeeds`);
  const chapters = json('story/index.json').map(current);
  const moments = json('moments/index.json').map(current);
  const chapterBySlug = new Map(chapters.map(c => [c.slug, c]));
  const docs = json('docs/index.json');
  const doc = slug => { const record = current(docs.find(d => d.slug === slug)); return read(`docs/${record.file}`); };
  const questions = ledgerRows(doc('questions-to-be-answered'));
  const contradictions = ledgerRows(doc('contradictions-to-resolve'), 'contradiction');
  const url = (kind, record) => `${kind === 'chapter' ? 'story' : 'moments'}.html?${kind}=${record.slug}&version=${record.versionId}`;
  const chapterRows = chapters.map(c => ({ id: c.slug, title: c.title, href: url('chapter', c), kind: c.contentKind }));
  const hasProse = moment => Boolean(moment.prose?.length || ['scene', 'writer-gap'].includes(chapterBySlug.get(moment.chapterSlug)?.contentKind));
  const cast = profiles.map(p => {
    const scenes = moments.filter(m => m.characters.some(c => c.slug === p.slug));
    const prose = scenes.filter(hasProse);
    const named = new Set((p.connections || []).map(c => c.name));
    for (const other of profiles) {
      if ([p.ally, p.rival].some(text => text && new RegExp(`\\b${other.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text))) named.add(other.name);
    }
    const links = profiles.filter(other => other.slug !== p.slug && named.has(other.name)).map(other => ({ name: other.name, href: `character.html?character=${other.slug}` }));
    return { slug: p.slug, name: p.name, role: p.catalogRole || p.role, goal: p.goal || '', conflicts: p.conflicts || [], links,
      href: `character.html?character=${p.slug}`, total: scenes.length, prose: prose.length, outline: scenes.length - prose.length,
      scenes: scenes.map(m => ({ title: m.title, href: url('moment', m), kind: hasProse(m) ? 'Scene prose' : 'Outline / scene seed' })) };
  }).sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));

  // Select current owning fields, never copies of old prose or invented quotations.
  const facts = [];
  const fact = (slug, title, value) => { if (!value) throw new Error(`Missing dashboard fact: ${slug}/${title}`); facts.push({ id: `${slug}-${headingId(title)}`, title, text: plain(value), meta: profiles.find(p => p.slug === slug).name, href: `character.html?character=${slug}` }); };
  const profile = slug => profiles.find(p => p.slug === slug);
  fact('lynleit', 'Walking on water, in secret', profile('lynleit').magecraft.find(m => m.title === 'Night practice').detail);
  fact('kyrien', "Kyrien's whiskey flask", profile('kyrien').equipment.find(e => e.title.includes('flask')).detail);
  fact('yulia', 'A mystery she wears', profile('yulia').equipment.find(e => e.title === 'Pendant necklace').detail);
  fact('ash', 'An uninvited resident', profile('ash').personalitySummary);
  fact('yulia', 'She follows him anyway', profile('yulia').personalitySummary);
  fact('sherie', 'Off duty, with Felix', profile('sherie').personalitySummary.match(/With Felix[^.]+\./)?.[0]);
  let speaker = '', quoteTitle = '';
  for (const line of doc('character-aphorisms').split(/\r?\n/)) {
    if (line.startsWith('## ')) speaker = line.slice(3);
    if (line.startsWith('### ')) quoteTitle = line.slice(4);
    if (line.startsWith('> ') && profiles.some(p => p.name === speaker)) facts.push({ id: `quote-${headingId(quoteTitle)}`, title: speaker, text: line.slice(2), meta: 'Unplaced dialogue', quote: true, href: `docs.html?doc=character-aphorisms#${headingId(quoteTitle)}` });
  }
  const holumns = json('holumns/index.json').incidents.map(h => ({ id: h.id, title: h.title, text: plain(h.summary || h.observedEffect),
    meta: `${h.id} · ${h.recordType}`, detail: plain(h.knownWeakness), detailLabel: 'Known limits and uncertainties', href: `docs.html?doc=holumn-incidents-and-testimonies#${h.slug}` }));
  const snapshots = moments.map(m => ({ id: m.slug, title: m.title, text: plain(m.summary), meta: `${m.versionId} · ${m.status}`,
    detail: plain(m.timelineLabel || m.placementStatus), detailLabel: 'Placement', href: url('moment', m) }));
  // These sizes express the established creative direction, not word frequency or a genre quota.
  const themes = [
    ['Magic', 3, 'thematic-direction'], ['Political intrigue', 3, 'thematic-direction'], ['Horror', 3, 'dread-and-action-direction'],
    ['Espionage', 3, 'thematic-direction'], ['Isolation', 2, 'dread-and-action-direction'], ['Survival', 2, 'dread-and-action-direction'],
    ['Identity', 2, 'thematic-direction'], ['Duty', 2, 'thematic-direction'], ['Trust', 2, 'prose-and-scene-guidance'],
    ['Mystery', 2, 'dread-and-action-direction'], ['Family', 1, 'thematic-direction'], ['Inheritance', 1, 'thematic-direction'],
    ['Humor', 1, 'prose-style'], ['Desire', 1, 'thematic-direction'], ['Ordinary life', 1, 'world-foundation']
  ].map(([name, weight, slug]) => ({ name, weight, href: `docs.html?doc=${slug}` }));
  return { schema: 1, counts: { chapters: chapters.length, moments: moments.length, characters: cast.length, questions: questions.length, contradictions: contradictions.length },
    tasks: [
      { title: 'Writer gaps', hint: 'Passages still to write', rows: chapterRows.filter(c => c.kind === 'writer-gap') },
      { title: 'Chapter outlines', hint: 'Recorded events without scene prose', rows: chapterRows.filter(c => c.kind === 'outline') },
      { title: 'Unplaced Moments', hint: 'No Story phase assigned', rows: moments.filter(m => !m.timelinePhase).map(m => ({ title: m.title, href: url('moment', m) })) }
    ], cast, facts, questions, contradictions, holumns, moments: snapshots, themes };
}
