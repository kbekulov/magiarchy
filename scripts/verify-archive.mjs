import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { documentSearchUrl } from './search-urls.mjs';
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
// Keep confirmed author answers distinct from working type readings and training proposals.
for (const [slug, type] of [['lynleit', 'INFJ'], ['kyrien', 'ISTP'], ['felix', 'ENFP']]) {
  const profile = profiles.find(record => record.slug === slug);
  assert.equal(profile.mbti.type, type);
  assert.equal(profile.mbti.status, 'Suspected', `${slug}: interpretation promoted to confirmed type`);
}
assert.equal(profiles.find(record => record.slug === 'sherie').mbti.type, 'ENFJ');
assert.ok(profiles.find(record => record.slug === 'lynleit').tradecraft.some(entry => entry.title === 'Agility'));
assert.ok(profiles.find(record => record.slug === 'kyrien').tradecraft.some(entry => entry.title === 'Endurance and precision'));
assert.ok(profiles.find(record => record.slug === 'felix').tradecraft.some(entry => entry.title === 'Field training'));
assert.ok(read('docs/character-cognition-and-physical-competence.md').includes('The exact steps he takes to investigate that error remain undecided.'));
assert.ok(!read('docs/character-behavior-notes-v7.json').includes('Suspected INFJ'), 'New type reading leaked into historical guidance');
assert.ok(!read('docs/sexual-tension-notes-v9.json').includes('stunned recognition'), 'New answer leaked into historical tension guidance');
// A confirmed relationship direction must not leak into earlier document snapshots.
const intimacy = json('docs/index.json').find(doc => doc.slug === 'character-intimacy-and-sexuality');
const currentTension = json(`docs/${selected(intimacy).tensionFile}`);
const sherieFelix = currentTension.pairs.find(pair => pair.id === 'sherie-felix');
assert.equal(sherieFelix.status, 'Author-confirmed direction');
assert.ok(sherieFelix.dynamic.includes('no meaningful personal relationship'), 'Sherie and Felix must not begin already close');
assert.ok(sherieFelix.participants.find(person => person.slug === 'felix').reading.includes('internally fixated on Lynleit'), 'Felix must retain his unresolved attachment');
for (const [slug, other] of [['sherie', 'Felix'], ['felix', 'Sherie']]) {
  assert.ok(profiles.find(profile => profile.slug === slug).connections.some(link => link.name === other), `${slug}: missing reciprocal relationship-map record`);
}
const oldIntimacy = intimacy.versions.find(version => version.id === 'v8');
assert.notEqual(oldIntimacy.file, selected(intimacy).file);
assert.notEqual(oldIntimacy.tensionFile, selected(intimacy).tensionFile);
assert.ok(!read(`docs/${oldIntimacy.file}`).includes('12 September 2026'), 'New relationship direction leaked into v8');
// Author-confirmed boundaries must survive later continuity edits.
const holumnCanon = json('holumns/index.json');
assert.ok(holumnCanon.principles.some(text => text.includes('no universal destination')), 'Holumn taking must not imply a universal destination');
assert.ok(holumnCanon.principles.some(text => text.includes('A taken person can return')), 'Holumn-specific return is possible');
assert.ok(holumnCanon.principles.some(text => text.includes('separate Holumns')), 'The two river Holumns must remain distinct');
for (const slug of ['lynleit', 'kyrien']) {
  const profile = profiles.find(record => record.slug === slug);
  assert.ok(profile.connections.some(link => link.name === 'Their son'), `${slug}: missing first child`);
  assert.ok(profile.connections.some(link => link.name === 'Their daughter'), `${slug}: missing second child`);
}
const lester = profiles.find(record => record.slug === 'lester');
assert.ok(lester.origin.includes('contradict continuity itself'), 'Lester: intrinsic chronological contradiction lost');
assert.ok(lester.origin.includes('Neither he nor Natalia knows'), 'Lester: origin must remain unknown to both');
assert.ok(lester.future.includes('intrinsic feature of nature'), 'Natalia: contradiction is natural, not merely an error');
const familyContinuity = selected(moments.find(record => record.slug === 'the-end-of-the-first-arc')).continuityAfter;
assert.ok(familyContinuity.includes('only after Arc 2'), 'Daughter: preserve post-Arc 2 reveal');
assert.ok(familyContinuity.includes('no fixed timing'), 'Son: do not fix Kyrien\'s discovery');
assert.ok(read('holumns.html').includes('id="taken-and-returned"'), 'Holumn states must have a World surface');
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
const sleepers = moments.find(moment => moment.slug === 'sleepers-above-the-river');
assert.equal(sleepers.timelinePhase, null, 'Sleepers must remain unplaced');
assert.equal(sleepers.characterAnchors.length, 0, 'Sleepers must not acquire invented chronology');
assert.ok(sleepers.prose.length > 20 && !sleepers.chapterSlug, 'Sleepers: standalone prose missing');
assert.ok(sleepers.prose.at(-1).includes('came into view'), 'Sleepers: preserve the incomplete downstream ending');
assert.ok(!/\bomen\b/i.test(sleepers.prose.join(' ')), 'Sleepers: editorial meaning leaked into narration');
assert.ok(json('holumns/index.json').incidents.some(incident => incident.id === 'HI-007' && incident.storyLink.includes(sleepers.slug)), 'Sleepers: incident link missing');
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
      const match = note.momentProseMatch?.[slug];
      if (match) {
        assert.equal(version.prose?.filter(paragraph => paragraph.includes(match)).length, 1, `${note.id}: standalone paragraph must match exactly once in ${slug}/${version.id}`);
        checkedAnchors += 1;
      }
    }
  }
}

const churchInterlude = moments.find(moment => moment.slug === 'only-eyes-for-you');
assert.equal(churchInterlude.timelinePhase, null, 'Church interlude: do not invent placement');
assert.equal(churchInterlude.characterAnchors.length, 0);
for (const line of ['"Flirt with nuns one more time!"', '"I only have eyes for you."']) assert.ok(churchInterlude.prose.includes(line), 'Church interlude: preserve illustrated dialogue');
assert.ok(!churchInterlude.prose.some(paragraph => /Inanna|jealous/i.test(paragraph)), 'Church interlude: do not explain the allusion or assign jealousy');
assert.ok(churchInterlude.known.filter(fact => fact.status === 'inferred').length);
assert.ok(read('gallery.html').includes('data-moment="only-eyes-for-you"'));
assert.ok(read('gallery.html').includes(`${churchInterlude.artwork.id}.png`));
for (const slug of ['lynleit', 'felix']) assert.ok(churchInterlude.characters.some(character => character.slug === slug));
assert.ok(!read('docs/character-intimacy-and-sexuality-v10.md').includes('Only Eyes for You'));
assert.ok(!read('docs/sexual-tension-notes-v10.json').includes('Only Eyes for You'));
assert.ok(!read('docs/character-behavior-notes-v8.json').includes('church-lynleit-public-irritation'));
assert.ok(!read('docs/prose-style-v8.md').includes('Pragmatic misinterpretation'));

const doom = chapters.find((entry) => entry.slug === 'doom-has-an-address');
const phaseContext = { window: {} };
vm.runInNewContext(read('story-phases.js'), phaseContext);
const phaseIds = new Set(phaseContext.window.MAGIARCHY_STORY_PHASES.map(p => p.id));
for (const chapter of chapters) assert.ok(phaseIds.has(chapter.timelinePhase), `${chapter.slug}: unknown Story phase`);
for (const moment of moments) assert.ok((moment.timelinePhase === null && moment.placementStatus === 'Unplaced') || phaseIds.has(moment.timelinePhase), `${moment.slug}: unknown Moment phase`);
assert.ok(phaseContext.window.MAGIARCHY_STORY_ARCS.some(a => a.id === 'arc-0'), 'Missing prequel life period');
const park = chapters.find(c => c.slug === 'the-bench-under-the-lamp');
assert.ok(park && park.timelinePhase === 'late-arc-one', 'Park milestone placement missing');
const parkText = read(`story/${park.file}`);
assert.equal(park.defaultVersion, 'v2', 'Park: source correction is not default');
assert.ok(parkText.includes('> [WRITER:'), 'Park: missing visible writer gap');
assert.ok(!parkText.includes('she kissed him'), 'Park: rejected substitute kiss returned');
assert.ok(read('story/the-bench-under-the-lamp.md').includes('she kissed him'), 'Park: archived v1 was overwritten');
assert.ok(parkText.indexOf('They left the lamp behind.') < parkText.indexOf('Give me your whiskey.'), 'Flask payoff occurs too early');
assert.ok(parkText.indexOf('Kyrien took out his flask.') < parkText.indexOf('Give me your whiskey.'), 'Flask is not established before payoff');
assert.ok(json('items/index.json').items.some(i => i.slug === 'kyriens-whiskey-flask'), 'Missing flask item');
assert.ok(profiles.find(p => p.slug === 'kyrien').equipment.some(e => e.href.includes('kyriens-whiskey-flask')), 'Missing flask equipment link');
assert.equal(chapters.find(c => c.slug === 'doom-has-an-address').timelinePhase, 'late-arc-one');
assert.ok(moments.find(m => m.slug === 'doom-has-an-address').continuityBefore.includes('hotel refuge'), 'Hotel must precede Doom');
assert.ok(moments.find(m => m.slug === 'the-bench-under-the-lamp').continuityAfter.includes('not intercourse'), 'Distinct milestone lost');
const doomMoment = moments.find((entry) => entry.slug === doom.slug);
assert.equal(doom.defaultVersion, 'v7');
assert.equal(doomMoment.defaultVersion, 'v7');
assert.equal(doom.file, 'doom-has-an-address-v7.md');
const doomText = read(`story/${doom.file}`);
assert.ok(doomText.indexOf('O great warrior of the Divine Whore') < doomText.indexOf('Just have sex, loser.'), 'Mock blessing must precede the plain answer');
assert.ok(doomText.includes("Inanna's gates") && doomText.includes('three thousand years'), 'Author-supplied family history missing');
assert.ok(!/Kotomine|Kirei/.test(doomText), 'External fictional character entered the Chapter');
const v6Text = plain(read('story/doom-has-an-address-v6.md'));
assert.equal(plain(doomText).split('### The unrespectable answer')[0], v6Text.split('### The unrespectable answer')[0], 'Natalia teaching changed during the v7 exchange edit');
assert.equal(plain(doomText).split('### An alternative')[1], v6Text.split('### An alternative')[1], 'Outcome or later banter changed during the v7 edit');
for (const beat of ['porcelain is behaving with more dignity', 'canonically permissible', 'A disgrace to the institution.', 'SEX?', 'cannot promise anything']) assert.ok(doomText.includes(beat), 'Protected v7 beat missing: ' + beat);
for (const beat of [
  "particular priestly calm",
  "stop out of common decency.\n\nMikhail continued.",
  "He raised one finger.",
  "Mikhail noticed.\n\n\"...catastrophically unsuited to the position.\"\n\nHer eyes opened.",
  "\"I didn't ask whether you agreed.\"",
  "\"You've just supplied your own defence.\"",
  "She picked up her cup again, but did not drink.",
  "For once, Mikhail did not comment.",
  "a thoroughly present-day problem.",
  "\"Unfortunately,\" she said, very quietly.",
  "\"A virgin.\"\n\nA pause."
]) assert.ok(plain(doomText).includes(beat), 'Approved v7 restoration missing: ' + beat);
assert.equal(doomMoment.known[21].status, 'inferred', 'Restraint should remain a reader interpretation');
assert.equal(typeof doomMoment.known[18], 'string', 'Spoken Inanna history must not be marked inferred');
assert.equal(doomMoment.known[19].status, 'inferred', 'Private embarrassment must remain inferred');
assert.ok(!/physician/i.test(doomText), 'Magic-aware physician returned to Doom');
const nataliaHypothesis = doomText.indexOf('"The ego," Natalia said.');
assert.ok(nataliaHypothesis >= 0 && !/\bego\b/i.test(doomText.slice(0, nataliaHypothesis)), 'Ego hypothesis appears before Natalia introduces it');
assert.ok(doomText.includes("Jung describes it as 'a complex of ideas"), 'Natalia lost the attributed Jung quotation');
for (const exchange of [
  '"Unfortunately, you\'ve always needed both."',
  '"No. Sentimental nonsense is what poets do with it afterward."',
  '"Just have sex, loser."',
  '"Perhaps the porcelain is behaving with more dignity than certain people present."',
  '"It failed."\n\n"It worked."\n\n"By failing."',
  '"Are you disappointed?"'
]) assert.ok(plain(doomText).includes(exchange), 'Protected Doom banter changed: review the source and prose style reference');
assert.deepEqual(doom.events, selected(doom).events, 'Default Chapter facts drifted from canon version');
assert.deepEqual(doomMoment.known, selected(doomMoment).known, 'Default Moment facts drifted from canon version');
assert.equal(selected(doomMoment).chapterVersion, doom.defaultVersion, 'Moment opens the wrong Chapter version');
assert.ok(doomText.includes('Expectation and result.'), 'Natalia lost the worked research example');
assert.ok(doomText.includes('You could have sent it to me. I\'d have approved it.'), 'Lynleit lost her student-friend voice');
assert.notDeepEqual(versions(doom)[0].events, selected(doom).events, 'Alternate version inherited canon events');
assert.ok(!read('story/the-nameless-street.md').includes("when Lynleit looked down the hill at her father's body"), 'Premature Fionn reveal returned');
assert.ok(read('CNAME').trim() === 'magiarchy.bekulov.com');

for (const doc of json('docs/index.json')) {
  assert.ok(read(`docs/${doc.file}`).trim(), `${doc.slug}: empty document`);
  assert.ok(selected(doc), `${doc.slug}: missing default document version`);
  assert.equal(selected(doc).file, doc.file, `${doc.slug}: default document file drift`);
  assert.equal(new Set(versions(doc).map(v => v.id)).size, versions(doc).length, `${doc.slug}: duplicate document versions`);
  for (const version of versions(doc)) {
    assert.ok(read(`docs/${version.file}`).trim(), `${doc.slug}/${version.id}: empty document revision`);
    for (const key of ['behaviorFile', 'tensionFile']) if (version[key]) json(`docs/${version[key]}`);
  }
}
assert.ok(!json('docs/character-behavior-notes-v1.json').notes.some(n => n.versions?.includes('v4')), 'New notes leaked into archived document');
for (const name of ['holumns/index.json', 'items/index.json', 'weapons/index.json', 'docs/sexual-tension-notes.json']) json(name);
const search = json('search-index.json');
const entries = Array.isArray(search) ? search : search.entries;
assert.ok(entries.some((entry) => entry.url.includes('chapter=doom-has-an-address&version=v7')), 'Canonical chapter missing from search');
assert.ok(entries.some((entry) => entry.url.includes('chapter=doom-has-an-address&version=v6')), 'Archived v6 chapter missing from search');
assert.ok(entries.some((entry) => entry.url.includes('chapter=doom-has-an-address&version=v4')), 'Archived v4 chapter missing from search');
assert.ok(entries.some((entry) => entry.url.includes('chapter=doom-has-an-address&version=v3')), 'Archived v3 chapter missing from search');
assert.ok(entries.some((entry) => entry.url.includes('chapter=doom-has-an-address&version=v2')), 'Superseded chapter missing from search');
assert.ok(entries.some((entry) => entry.url.includes('chapter=doom-has-an-address&version=v1')), 'Alternate chapter missing from search');
assert.ok(entries.some((entry) => entry.url.includes('doc=prose-and-scene-guidance')), 'Editorial guide missing from search');
assert.ok(entries.some((entry) => entry.url.includes('doc=prose-style')), 'Prose style reference missing from search');
for (const doc of json('docs/index.json').filter(d => d.versions?.length)) {
  for (const version of doc.versions) {
    const entry = entries.find(e => e.url.includes(`doc=${doc.slug}&version=${version.id}`));
    assert.ok(entry, `${doc.slug}/${version.id}: document revision missing from search`);
    if (doc.slug === 'character-behavior-audit' && version.id === 'v1') assert.ok(!entry.text.includes('doom-v4'), 'New advisory search text leaked into v1');
  }
}

const music = read('music.html');
for (const facet of ['story','character','event','arc','misc']) {
  assert.ok(music.includes(`data-category="${facet}"`), `Music: missing ${facet} category`);
  assert.ok(music.includes(`data-${facet}=`), `Music: missing explicit ${facet} metadata`);
}
assert.ok(music.includes('id="music-search"') && music.includes('id="music-tag-chips"') && music.includes('archive-toolbar music-filters'), 'Music: missing shared search toolbar or tag chips');
assert.ok(/\.story-reader-open \.docs-main-pane\s*\{\s*display: flow-root;/.test(read('styles.css')), 'Chapter reader: collapsed top-margin protection missing');
for (const file of ['story.js', 'docs.js']) assert.ok(read(file).includes("aside.className = 'writer-notice'"), `${file}: writer notices are not highlighted`);
assert.ok(music.includes('class="music-banner-toggle" type="button"'), 'Music: require keyboard-operable banner button');
assert.ok(music.includes('class="music-seek" type="range"'), 'Music: missing accessible custom seek control');
assert.ok(read('music.js').includes("player.addEventListener('ended', syncPlayback)"), 'Music: missing ended-state synchronization');
const audioPlayers = [...music.matchAll(/<audio\b([^>]*)>([\s\S]*?)<\/audio>/g)];
assert.ok(audioPlayers.length, 'Music: missing playable audio');
for (const [, attributes, content] of audioPlayers) {
  assert.ok(attributes.includes('controls') && attributes.includes('preload="none"') && !attributes.includes('autoplay'), 'Music: require visitor-controlled playback');
  const sources = [...content.matchAll(/<source src="([^"]+)" type="([^"]+)"/g)];
  assert.equal(sources.length, 1, 'Music: stream MP3 only');
  const [, mp3, mime] = sources[0];
  assert.equal(mime, 'audio/mpeg');
  for (const file of [mp3, mp3.replace(/\.mp3$/, '.wav')]) {
    assert.ok(fs.statSync(path.join(root, file)).size > 0, `Music: empty file ${file}`);
    assert.ok(music.includes(`href="${file}" download="${path.basename(file)}"`), `Music: missing download ${file}`);
  }
}
assert.ok(entries.some(entry => entry.url.includes('music.html') && entry.text.includes('Theme 1 (stem)')), 'Music: track missing from search');

// Approved consistency boundaries, not invented metaphysical rules or score targets.
assert.ok(read('docs/world-foundation.md').includes('not in a discoverable transformation'), 'Lester: foundation reopened an ordinary transformation');
assert.ok(!read('docs/world-foundation.md').includes('whether he was born this way'), 'Lester: stale origin possibilities');
const choir = json('holumns/index.json').incidents.find(record => record.id === 'HI-003');
assert.ok(choir.knownWeakness.includes('beneath her') && choir.knownWeakness.includes('not a proven restriction'), 'River observation expanded into a universal rule');
assert.ok(!choir.hiddenReading.includes('speak through'), 'Unestablished Choir voice returned');
assert.equal(json('items/index.json').items.find(i => i.slug === 'kyriens-whiskey-flask').chronology[0].arc, 'Unplaced', 'Flask origin assigned an unsupported Arc');
assert.equal(phaseContext.window.MAGIARCHY_STORY_PHASES.find(p => p.id === 'late-arc-one').placement, 'approximate');
for (const chapter of chapters) {
  for (const version of versions(chapter)) {
    assert.ok(['outline', 'scene', 'writer-gap'].includes(version.contentKind), `${chapter.slug}/${version.id}: missing content kind`);
    if (/\[WRITER:/.test(read(`story/${version.file}`))) assert.equal(version.contentKind, 'writer-gap');
  }
}
assert.equal(documentSearchUrl({ slug: 'test', versions: [{ id: 'v1' }], versionId: 'v1' }), 'docs.html?doc=test&version=v1', 'Explicit single-version document lost its version URL');
assert.equal(documentSearchUrl({ slug: 'test', versionId: 'v1' }), 'docs.html?doc=test');
assert.ok(entries.some(e => e.recordId === 'doc-reader-knowledge' && e.current), 'Current reader knowledge record missing from search');
assert.ok(read('story/after-the-failed-attempt-v2.md').includes('transfer clause'), 'Interrogation authority missing');
assert.equal((read('story/after-the-failed-attempt-v2.md').match(/Lynleit enters the interrogation/g) || []).length, 1);

console.log(`Verified ${profiles.length} profiles, ${chapters.length} Chapters, ${moments.length} Moments, ${checkedAnchors} paragraph anchors, version isolation, music assets, and search coverage.`);
