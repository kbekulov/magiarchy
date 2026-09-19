import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function validatePanels(root, records, { built = true } = {}) {
  assert.ok(Array.isArray(records), 'Panel sets must be an array');
  const ids = new Set();
  const characters = fs.readFileSync(path.join(root, 'character.js'), 'utf8');
  const indexes = Object.fromEntries(['moment', 'chapter'].map(kind => [kind, JSON.parse(fs.readFileSync(path.join(root, kind === 'moment' ? 'moments/index.json' : 'story/index.json'), 'utf8'))]));
  const localFile = (value, prefix) => {
    assert.ok(typeof value === 'string' && value.startsWith(prefix) && !/[\\?#%:]/.test(value) && !value.split('/').includes('..'), `Unsafe panel path: ${value}`);
    assert.match(path.basename(value), /^[a-z0-9]+(?:-[a-z0-9]+)*\.(png|jpe?g|webp)$/);
    const file = path.resolve(root, value);
    assert.ok(fs.existsSync(file) && fs.statSync(file).isFile() && fs.statSync(file).size > 0, `Missing panel image: ${value}`);
    return file;
  };
  for (const record of records) {
    assert.ok(typeof record.id === 'string' && slug.test(record.id) && !ids.has(record.id), `Invalid or duplicate panel set: ${record.id}`);
    ids.add(record.id);
    if (record.revision !== undefined) assert.match(record.revision, /^r[1-9]\d*$/, `${record.id}: invalid artwork revision`);
    for (const key of ['title', 'summary', 'medium']) assert.ok(typeof record[key] === 'string' && record[key].trim(), `${record.id}: missing ${key}`);
    assert.ok(Array.isArray(record.characters), `${record.id}: characters required`);
    for (const name of record.characters) assert.ok(characters.includes(`slug: '${name}'`), `${record.id}: unknown character ${name}`);
    assert.ok(record.moment || record.chapter, `${record.id}: a scene connection is required`);
    for (const kind of ['moment', 'chapter']) {
      if (!record[kind]) continue;
      const scene = indexes[kind].find(item => item.slug === record[kind].slug);
      assert.ok(scene, `${record.id}: unknown ${kind}`);
      assert.ok((scene.versions || [{ id: 'v1' }]).some(v => v.id === record[kind].version), `${record.id}: unknown ${kind} version`);
    }
    if (record.moment && record.chapter) {
      const moment = indexes.moment.find(item => item.slug === record.moment.slug);
      const selected = { ...moment, ...moment.versions?.find(v => v.id === record.moment.version) };
      assert.equal(selected.chapterSlug, record.chapter.slug, `${record.id}: scene links disagree`);
      if (selected.chapterVersion) assert.equal(selected.chapterVersion, record.chapter.version, `${record.id}: scene revision links disagree`);
    }
    assert.ok(Array.isArray(record.panels) && record.panels.length, `${record.id}: images required`);
    assert.ok(Array.isArray(record.beats) && record.beats.length, `${record.id}: ordered beats required`);
    const beats = new Set();
    for (const beat of record.beats) {
      assert.ok(typeof beat.id === 'string' && slug.test(beat.id) && !beats.has(beat.id) && typeof beat.title === 'string' && beat.title.trim(), `${record.id}: invalid beat`);
      beats.add(beat.id);
      const images = record.panels.filter(panel => panel.beat === beat.id);
      assert.ok(images.length, `${record.id}: empty beat`);
      if (images.length > 1) {
        const compositions = images.map(panel => panel.composition);
        assert.ok(compositions.every(value => typeof value === 'string' && value.trim()) && new Set(compositions).size === images.length, `${record.id}: alternative compositions need distinct labels`);
      }
    }
    const views = new Set(), sources = new Set();
    for (const panel of record.panels) {
      assert.ok(typeof panel.id === 'string' && slug.test(panel.id) && !views.has(panel.id), `${record.id}: duplicate or invalid panel id`);
      views.add(panel.id);
      assert.ok(beats.has(panel.beat), `${record.id}: panel has no valid beat`);
      for (const key of ['label', 'title', 'alt']) assert.ok(typeof panel[key] === 'string' && panel[key].trim(), `${record.id}: missing ${key}`);
      const file = localFile(panel.src, `media/gallery/panels/${record.id}/`);
      assert.ok(!sources.has(panel.src), `${record.id}: repeated original`); sources.add(panel.src);
      if (built) {
        assert.equal(panel.bytes, fs.statSync(file).size, `${record.id}: stale original size`);
        assert.ok(panel.width > 0 && panel.height > 0, `${record.id}: image dimensions required`);
        localFile(panel.display, 'media/gallery/previews/panels/');
        localFile(panel.thumbnail, 'media/gallery/previews/panels/');
        if (record.revision) {
          assert.ok(path.basename(panel.src, path.extname(panel.src)).endsWith(`-${record.revision}`), `${record.id}: original needs the artwork revision suffix`);
          for (const key of ['display', 'thumbnail']) assert.equal(panel[key], `media/gallery/previews/panels/${record.id}-${record.revision}-${panel.id}-${key}.webp`, `${record.id}: stale ${key} revision`);
        }
      }
    }
    assert.ok(views.has(record.cover), `${record.id}: cover must be a registered panel`);
    assert.ok(!JSON.stringify(record).includes('\u2014'), `${record.id}: em dash regression`);
  }
}
