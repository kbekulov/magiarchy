import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildDashboard, current, ledgerRows } from './home-dashboard.mjs';
import { dashboardHTML, snapshot } from '../home-dashboard-view.js';
const root = fileURLToPath(new URL('../', import.meta.url));
const data = buildDashboard(root);

test('visual overview uses current public panels and traceable theme weights', () => {
  const sets = JSON.parse(fs.readFileSync(new URL('../gallery/panels.json', import.meta.url)));
  assert.equal(data.panels.length, sets.filter(s => !s.hScene && !s.placeholder && !s.nonCanon).reduce((n, s) => n + s.panels.length, 0));
  for (const panel of data.panels) {
    assert.ok(fs.existsSync(new URL(`../${panel.src}`, import.meta.url)));
    const set = sets.find(s => s.id === panel.set);
    assert.ok(!set.hScene && !set.placeholder && !set.nonCanon);
    assert.ok(set.panels.some(p => panel.href.endsWith(`#${p.id}`) && p.display === panel.src));
  }
  assert.deepEqual(data.genreGroups.flatMap(g => g.members).sort(), data.themes.map(t => t.name).sort());
  assert.equal(data.genreGroups.reduce((n, g) => n + g.weight, 0), data.themes.reduce((n, t) => n + t.weight, 0));
  assert.equal(data.draftStatus.reduce((n, s) => n + s.count, 0), data.counts.chapters);
});

test('only the selected default contributes to dashboard data', () => {
  assert.equal(current({ title: 'base', defaultVersion: 'v2', versions: [{ id: 'v1', title: 'old' }, { id: 'v2', title: 'current' }, { id: 'v3', title: 'new alternate' }] }).title, 'current');
  const chapters = JSON.parse(fs.readFileSync(new URL('../story/index.json', import.meta.url))).map(current);
  assert.equal(data.counts.chapters, chapters.length);
  assert.equal(data.tasks[0].rows.length, chapters.filter(c => c.contentKind === 'writer-gap').length);
});
test('cast presence is unique Moment membership, not revisions or doubled Chapters', () => {
  const moments = JSON.parse(fs.readFileSync(new URL('../moments/index.json', import.meta.url))).map(current);
  for (const c of data.cast) {
    assert.equal(c.total, moments.filter(m => m.characters.some(p => p.slug === c.slug)).length);
    assert.equal(c.prose + c.outline, c.total);
    assert.equal(new Set(c.scenes.map(s => s.href)).size, c.total);
    assert.ok(c.links.every(l => data.cast.some(other => other.href === l.href)));
  }
  assert.equal(data.tasks[2].rows.length, moments.filter(m => !m.timelinePhase).length);
});
test('ledgers exclude resolved rows and contradiction history', () => {
  const markdown = '## Contradiction ledger\n| Area | Contradiction | Resolution |\n| --- | --- | --- |\n| A | Current mismatch? | 25% |\n| B | Solved? | 100% |\n## Decision history\n| Area | Contradiction | Resolution |\n| --- | --- | --- |\n| C | Old mismatch? | 0% |';
  const rows = ledgerRows(markdown, 'contradiction');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].confidence, 25);
  assert.equal(rows[0].id, 'contradiction-current-mismatch');
  assert.match(snapshot(null, 'contradictions'), /None recorded/);
});
test('snapshots and actions always have sources and escaped content', () => {
  for (const key of ['facts', 'questions', 'contradictions', 'holumns', 'moments']) {
    for (const record of data[key]) assert.match(record.href, /^(character|docs|moments)\.html\?/);
  }
  assert.ok(data.facts.some(f => f.quote && f.meta === 'Unplaced dialogue'));
  assert.ok(!snapshot({ title: '<script>', text: '<img src=x>', meta: '&', href: 'docs.html?doc=a&b=c' }, 'facts').includes('<script>'));
  assert.match(dashboardHTML(data), /Writer view · includes spoilers/);
});
