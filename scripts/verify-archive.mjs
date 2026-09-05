import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const json = (file) => JSON.parse(read(file));
const source = read('character.js');
const profiles = vm.runInNewContext(`${source.slice(0, source.indexOf('const profilesBySlug'))}; profileSeeds`);
const chapters = json('story/index.json');
const moments = json('moments/index.json');
const notes = json('docs/character-behavior-notes.json').notes;
const versions = (record) => record.versions?.length
  ? record.versions.map((version) => ({ ...record, ...version }))
  : [{ ...record, id: 'v1' }];
const selected = (record) => versions(record).find((version) => version.id === (record.defaultVersion || 'v1'));
const plain = (text) => text.replace(/\*\*|__/g, '').replace(/\r\n/g, '\n');

for (const profile of profiles) {
  assert.equal(Object.keys(profile.timelineNotes).length, profile.beats.length, `${profile.slug}: timeline coverage`);
  for (const beat of profile.beats) assert.ok(profile.timelineNotes[beat]?.trim(), `${profile.slug}: ${beat}`);
  assert.ok(profile.conflicts?.length, `${profile.slug}: missing explicit conflicts`);
  assert.equal(new Set(profile.beats).size, profile.beats.length, `${profile.slug}: duplicate beats`);
}
assert.ok(!source.includes('const timelineDetails = [profile.origin'), 'Positional timeline prose returned');
assert.ok(!source.includes('The factional context that shapes'), 'Generic connection fallback returned');
assert.ok(!source.includes("do not always align with ${profile.name}"), 'Generic conflict fallback returned');

for (const chapter of chapters) {
  assert.ok(selected(chapter), `${chapter.slug}: missing default version`);
  for (const version of versions(chapter)) {
    assert.ok(read(`story/${version.file}`).trim(), `${chapter.slug}/${version.id}: empty chapter`);
    assert.ok(version.events.length, `${chapter.slug}/${version.id}: missing preface`);
    for (const fact of version.events) if (typeof fact === 'object') {
      assert.equal(fact.status, 'inferred', `${chapter.slug}: unsupported reader label`);
    }
  }
}

for (const moment of moments) {
  assert.ok(selected(moment), `${moment.slug}: missing default version`);
  for (const anchor of moment.characterAnchors) {
    const profile = profiles.find((candidate) => candidate.slug === anchor.slug);
    assert.ok(profile?.beats.includes(anchor.beat), `${moment.slug}: orphaned ${anchor.slug}/${anchor.beat}`);
  }
  if (moment.chapterSlug) assert.ok(chapters.some((chapter) => chapter.slug === moment.chapterSlug), `${moment.slug}: missing chapter`);
}

let checkedAnchors = 0;
for (const note of notes) {
  for (const slug of note.chapters || []) {
    const chapter = chapters.find((entry) => entry.slug === slug);
    assert.ok(chapter, `${note.id}: missing chapter ${slug}`);
    for (const version of versions(chapter).filter((entry) => !note.versions?.length || note.versions.includes(entry.id))) {
      assert.ok(note.chapterMatch && plain(read(`story/${version.file}`)).includes(note.chapterMatch), `${note.id}: missing paragraph in ${slug}/${version.id}`);
      checkedAnchors += 1;
    }
  }
  for (const slug of note.moments || []) {
    const moment = moments.find((entry) => entry.slug === slug);
    assert.ok(moment, `${note.id}: missing Moment ${slug}`);
    for (const version of versions(moment).filter((entry) => !note.versions?.length || note.versions.includes(entry.id))) {
      assert.ok(version.known[note.momentFact[slug]], `${note.id}: missing fact in ${slug}/${version.id}`);
    }
  }
}

const doom = chapters.find((entry) => entry.slug === 'doom-has-an-address');
const doomMoment = moments.find((entry) => entry.slug === doom.slug);
assert.equal(doom.defaultVersion, 'v3');
assert.equal(doomMoment.defaultVersion, 'v3');
assert.equal(doom.file, 'doom-has-an-address-v3.md');
const doomText = read(`story/${doom.file}`);
assert.ok(!/physician/i.test(doomText), 'Magic-aware physician returned to Doom');
const nataliaHypothesis = doomText.indexOf('"The ego," Natalia said.');
assert.ok(nataliaHypothesis >= 0 && !/\bego\b/i.test(doomText.slice(0, nataliaHypothesis)), 'Ego hypothesis appears before Natalia introduces it');
assert.ok(doomText.includes("Jung describes it as 'a complex of ideas"), 'Natalia lost the attributed Jung quotation');
for (const exchange of [
  '"Unfortunately, you\'ve always needed both."',
  '"No. Sentimental nonsense is what poets do with it afterward."',
  '"Just have sex, loser."',
  '"Which is why I recommend choosing your partner carefully."',
  '"It failed."\n\n"It worked."\n\n"By failing."',
  '"Are you disappointed?"'
]) assert.ok(plain(doomText).includes(exchange), 'Protected Doom banter changed: review the source and prose style reference');
assert.deepEqual(doom.events, selected(doom).events, 'Default Chapter facts drifted from canon version');
assert.deepEqual(doomMoment.known, selected(doomMoment).known, 'Default Moment facts drifted from canon version');
assert.notDeepEqual(versions(doom)[0].events, selected(doom).events, 'Alternate version inherited canon events');
assert.ok(!read('story/the-nameless-street.md').includes("when Lynleit looked down the hill at her father's body"), 'Premature Fionn reveal returned');
assert.ok(read('CNAME').trim() === 'magiarchy.bekulov.com');

for (const doc of json('docs/index.json')) assert.ok(read(`docs/${doc.file}`).trim(), `${doc.slug}: empty document`);
for (const name of ['holumns/index.json', 'items/index.json', 'weapons/index.json', 'docs/sexual-tension-notes.json']) json(name);
const search = json('search-index.json');
const entries = Array.isArray(search) ? search : search.entries;
assert.ok(entries.some((entry) => entry.url.includes('chapter=doom-has-an-address&version=v3')), 'Canonical chapter missing from search');
assert.ok(entries.some((entry) => entry.url.includes('chapter=doom-has-an-address&version=v2')), 'Superseded chapter missing from search');
assert.ok(entries.some((entry) => entry.url.includes('chapter=doom-has-an-address&version=v1')), 'Alternate chapter missing from search');
assert.ok(entries.some((entry) => entry.url.includes('doc=prose-and-scene-guidance')), 'Editorial guide missing from search');
assert.ok(entries.some((entry) => entry.url.includes('doc=prose-style')), 'Prose style reference missing from search');

console.log(`Verified ${profiles.length} profiles, ${chapters.length} Chapters, ${moments.length} Moments, ${checkedAnchors} paragraph anchors, version isolation, and search coverage.`);
