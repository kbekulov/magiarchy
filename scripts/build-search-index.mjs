import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const entries = [];

const readText = (relativePath) => fs.readFileSync(path.join(repositoryRoot, relativePath), 'utf8');
const readJson = (relativePath) => JSON.parse(readText(relativePath));
const clean = (value = '') => String(value).replace(/\s+/g, ' ').trim();
const flatten = (value) => {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(flatten).join(' ');
  if (typeof value === 'object') return Object.values(value).map(flatten).join(' ');
  return '';
};

const decodeEntities = (value) => value
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&nbsp;/gi, ' ');

const stripHtml = (value) => clean(decodeEntities(value
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')));

const stripMarkdown = (value) => clean(value
  .replace(/^---[\s\S]*?---\s*/u, '')
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/^\s{0,3}#{1,6}\s+/gm, '')
  .replace(/^\s*[-*+]\s+/gm, '')
  .replace(/^\s*>\s?/gm, '')
  .replace(/[|*_`~]/g, ' '));

function addEntry({ id, title, type, url, subtitle = '', text = '', keywords = '' }) {
  const content = clean(`${title} ${subtitle} ${text} ${keywords}`);
  if (!title || !url || content.length < 2) return;
  entries.push({ id, title: clean(title), type, url, subtitle: clean(subtitle), text: content });
}

function resolveVersions(record) {
  const versions = Array.isArray(record.versions) && record.versions.length
    ? record.versions
    : [{ id: 'v1', label: 'Version 1' }];
  return versions.map((version, index) => ({
    ...record,
    ...version,
    versionId: version.id || `v${index + 1}`,
    versionLabel: version.label || `Version ${index + 1}`,
    versionCount: versions.length
  }));
}

function extractArrayLiteral(source, declaration, nextDeclaration) {
  const startMarker = `const ${declaration} = `;
  const start = source.indexOf(startMarker);
  const end = source.indexOf(`const ${nextDeclaration}`, start);
  if (start === -1 || end === -1) throw new Error(`Unable to extract ${declaration}`);
  const literal = source.slice(start + startMarker.length, end).trim().replace(/;$/, '');
  return vm.runInNewContext(`(${literal})`, Object.create(null));
}

const characterSource = readText('character.js');
const characters = extractArrayLiteral(characterSource, 'profileSeeds', 'profilesBySlug');
const sexualTensionNotes = readJson('docs/sexual-tension-notes.json');
const sexualTensionFor = (slug) => [
  ...sexualTensionNotes.pairs.flatMap((pair) => {
    const participant = pair.participants.find((candidate) => candidate.slug === slug);
    if (!participant) return [];
    const other = pair.participants.find((candidate) => candidate.slug !== slug);
    return [{
      label: 'Potential sexual tension',
      counterpart: other?.name,
      status: pair.status,
      direction: pair.direction,
      reading: participant.reading,
      dynamic: pair.dynamic
    }];
  }),
  ...sexualTensionNotes.unresolved
    .filter((entry) => entry.slug === slug)
    .map((entry) => ({ label: 'Potential sexual tension', status: 'Unresolved', note: entry.note }))
];
const characterAnchors = {
  appearance: 'appearance-title',
  personality: 'personality-title',
  equipment: 'equipment-title',
  nature: 'nature-title',
  tradecraft: 'tradecraft-title',
  magecraft: 'magecraft-title',
  biography: 'biography-title',
  connections: 'connections-title',
  conflicts: 'conflicts-title',
  motivations: 'motivations-title'
};

characters.forEach((character) => {
  const baseUrl = `character.html?character=${encodeURIComponent(character.slug)}`;
  addEntry({
    id: `character-${character.slug}`,
    title: character.name,
    type: 'Character',
    url: baseUrl,
    subtitle: `${character.role} · ${(character.factions ?? []).join(' / ')}`,
    text: flatten([character.summary, character.ageBand, character.mbti])
  });

  const sections = [
    ['appearance', 'Appearance', [character.physical, character.visual, character.palette, character.appearanceDetails]],
    ['personality', 'Strengths and weaknesses', [character.personalitySummary, character.traits, character.mbti]],
    ['equipment', 'Equipment', character.equipment],
    ['nature', 'Nature', character.nature],
    ['tradecraft', 'Tradecraft', character.tradecraft],
    ['magecraft', 'Magecraft', character.magecraft],
    ['biography', 'Biography', [character.origin, character.residenceNote, character.rupture, character.focus, character.future, character.timelineNotes]],
    ['connections', 'Connections', [character.connections, character.ally, character.allyNote, character.rival, character.rivalNote, sexualTensionFor(character.slug)]],
    ['conflicts', 'Conflicts', character.conflicts],
    ['motivations', 'Motivations', character.goal]
  ];

  sections.forEach(([section, label, content]) => {
    const sectionText = clean(flatten(content));
    if (!sectionText) return;
    addEntry({
      id: `character-${character.slug}-${section}`,
      title: `${character.name}: ${label}`,
      type: 'Character section',
      url: `${baseUrl}#${characterAnchors[section]}`,
      subtitle: character.role,
      text: sectionText,
      keywords: character.name
    });
  });
});

const docs = readJson('docs/index.json');
const behaviorNotes = readJson('docs/character-behavior-notes.json');
docs.forEach((document) => {
  resolveVersions(document).forEach((document) => {
  const markdown = stripMarkdown(readText(path.join('docs', document.file)));
  let contextualText = '';
  if (document.slug === 'character-behavior-audit') {
    contextualText = flatten([
      (document.behaviorFile ? readJson(`docs/${document.behaviorFile}`) : behaviorNotes).sections,
      (document.behaviorFile ? readJson(`docs/${document.behaviorFile}`) : behaviorNotes).notes.map(({ id, section, kind, title, basis, text, chapters, moments, versions }) => ({ id, section, kind, title, basis, text, chapters, moments, versions }))
    ]);
  }
  if (document.slug === 'character-intimacy-and-sexuality') {
    contextualText = flatten([
      (document.tensionFile ? readJson(`docs/${document.tensionFile}`) : sexualTensionNotes).pairs.map(({ status, direction, participants, dynamic }) => ({ status, direction, participants, dynamic })),
      (document.tensionFile ? readJson(`docs/${document.tensionFile}`) : sexualTensionNotes).unresolved
    ]);
  }
  addEntry({
    id: `doc-${document.slug}${document.versionCount > 1 ? `-${document.versionId}` : ''}`,
    title: `${document.title}${document.versionCount > 1 ? ` · ${document.versionId}` : ''}`,
    type: 'Document',
    url: document.href || `docs.html?doc=${encodeURIComponent(document.slug)}${document.versionCount > 1 ? `&version=${encodeURIComponent(document.versionId)}` : ''}`,
    subtitle: document.topic,
    text: `${document.description} ${markdown} ${contextualText}`,
    keywords: document.speakers
  });
  });
});

const chapters = readJson('story/index.json');
chapters.forEach((chapter) => {
  resolveVersions(chapter).forEach((version) => {
    const versionSuffix = version.versionCount > 1 ? `-${version.versionId}` : '';
    const versionTitle = version.versionCount > 1 ? `${chapter.title} · ${version.versionLabel}` : chapter.title;
    const versionQuery = version.versionCount > 1 ? `&version=${encodeURIComponent(version.versionId)}` : '';
    addEntry({
      id: `chapter-${chapter.slug}${versionSuffix}`,
      title: versionTitle,
      type: 'Chapter',
      url: `story.html?chapter=${encodeURIComponent(chapter.slug)}${versionQuery}`,
      subtitle: `${chapter.number} · ${chapter.timelineLabel}`,
      text: `${version.description} ${flatten(version.events)} ${stripMarkdown(readText(path.join('story', version.file)))}`,
      keywords: chapter.characters
    });
  });
});

const moments = readJson('moments/index.json');
moments.forEach((moment) => {
  resolveVersions(moment).forEach((version) => {
    const versionSuffix = version.versionCount > 1 ? `-${version.versionId}` : '';
    const versionTitle = version.versionCount > 1 ? `${moment.title} · ${version.versionLabel}` : moment.title;
    const versionQuery = version.versionCount > 1 ? `&version=${encodeURIComponent(version.versionId)}` : '';
    addEntry({
      id: `moment-${moment.slug}${versionSuffix}`,
      title: versionTitle,
      type: 'Moment',
      url: `moments.html?moment=${encodeURIComponent(moment.slug)}${versionQuery}`,
      subtitle: `${moment.code} · ${moment.timelineLabel}`,
      text: flatten([version.summary, version.purpose, version.location, version.known, version.openQuestions, version.continuityBefore, version.continuityAfter]),
      keywords: flatten(moment.characters)
    });
  });
});

const weaponArchive = readJson('weapons/index.json');
addEntry({
  id: 'world-ren-arms',
  title: weaponArchive.manufacturer.name,
  type: 'World record',
  url: 'weapons.html#ren-arms',
  subtitle: weaponArchive.manufacturer.location,
  text: flatten(weaponArchive.manufacturer)
});
weaponArchive.weapons.forEach((weapon) => {
  addEntry({
    id: `weapon-${weapon.slug}`,
    title: `${weapon.model} “${weapon.nickname}”`,
    type: 'Weapon',
    url: `weapons.html#${weapon.slug}`,
    subtitle: weapon.role,
    text: flatten([
      weapon.model,
      weapon.nickname,
      weapon.caliber,
      weapon.role,
      weapon.familyPosition,
      weapon.storyUse,
      weapon.designSummary,
      weapon.characteristics,
      weapon.modernizationNote,
      weapon.optionsSummary,
      weapon.options,
      weapon.variantNote,
      weapon.finishNote,
      weapon.nameMeaning,
      weapon.characterLinks,
      weapon.references
    ]),
    keywords: `${weaponArchive.manufacturer.name} ${weaponArchive.manufacturer.location}`
  });
});

const holumnArchive = readJson('holumns/index.json');
addEntry({
  id: 'world-holumns',
  title: 'Holumns',
  type: 'World record',
  url: 'holumns.html',
  subtitle: 'Manifestations, effects, and evidence',
  text: flatten([holumnArchive.principles, holumnArchive.types])
});
holumnArchive.incidents.forEach((incident) => {
  addEntry({
    id: `holumn-${incident.slug}`,
    title: incident.title,
    type: 'Holumn incident',
    url: `docs.html?doc=holumn-incidents-and-testimonies#${incident.slug}`,
    subtitle: `${incident.id} · ${incident.recordType}`,
    text: flatten(incident),
    keywords: incident.types
  });
});

const itemArchive = readJson('items/index.json');
addEntry({
  id: 'world-items-and-artefacts',
  title: itemArchive.title,
  type: 'World record',
  url: 'items.html',
  subtitle: 'Objects, relics, and anomalous holdings',
  text: flatten([itemArchive.description, itemArchive.items])
});
itemArchive.items.forEach((item) => {
  addEntry({
    id: `item-${item.slug}`,
    title: item.name,
    type: 'Item & artefact',
    url: `items.html?item=${encodeURIComponent(item.slug)}`,
    subtitle: `${item.id} · ${item.recordType}`,
    text: flatten([
      item.summary,
      item.status,
      item.holder,
      item.associatedCharacter,
      item.material,
      item.materialNote,
      item.forms,
      item.properties,
      item.limits,
      item.chronology,
      item.storyLinks
    ])
  });
});

const pageDefinitions = [
  ['characters', 'Characters', 'Archive page', 'characters.html'],
  ['story', 'Story', 'Archive page', 'story.html'],
  ['moments', 'Moments', 'Archive page', 'moments.html'],
  ['world', 'World', 'Archive page', 'world.html'],
  ['duchy', 'The Duchy', 'World record', 'duchy.html'],
  ['director-house', "The Director's House", 'World record', 'director-house.html'],
  ['magiarchy', 'The Magiarchy', 'World record', 'magiarchy.html'],
  ['msf', 'MSF', 'World record', 'msf.html'],
  ['church', 'The Church', 'World record', 'church.html'],
  ['items', 'Items & Artefacts', 'World record', 'items.html'],
  ['music', 'Music', 'Archive page', 'music.html'],
  ['gallery', 'Gallery', 'Archive page', 'gallery.html'],
  ['docs', 'Docs', 'Archive page', 'docs.html']
];

pageDefinitions.forEach(([id, title, type, file]) => {
  const html = readText(file);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  addEntry({ id: `page-${id}`, title, type, url: file, text: stripHtml(main) });
});

const homeHtml = readText('index.html');
for (const match of homeHtml.matchAll(/<article\s+class="dispatch[^\"]*"\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/article>/gi)) {
  const content = stripHtml(match[2]);
  const title = stripHtml(match[2].match(/<strong>([\s\S]*?)<\/strong>/i)?.[1] ?? 'Site update');
  addEntry({
    id: `update-${match[1]}`,
    title: `${title}: Site update`,
    type: 'Update',
    url: `index.html#${match[1]}`,
    subtitle: 'Home update feed',
    text: content
  });
}

entries.sort((left, right) => left.type.localeCompare(right.type) || left.title.localeCompare(right.title));

const output = {
  generated: new Date().toISOString(),
  count: entries.length,
  entries
};

fs.writeFileSync(path.join(repositoryRoot, 'search-index.json'), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Built ${entries.length} search entries.`);
