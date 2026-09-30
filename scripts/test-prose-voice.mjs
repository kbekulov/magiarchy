import test from 'node:test';
import assert from 'node:assert/strict';
import { currentNodes, inspect, jsonTree, firstPersonChecklist, reviewFirstPerson } from './audit-prose-voice.mjs';
import fs from 'node:fs';

const passage = (text, kind = 'archive', line = 1) => ({ file: 'sample.md', line, text, kind });

test('first-person review reads every mandatory rule from the current standard', () => {
  const source = fs.readFileSync(new URL('../docs/first-person-prose.md', import.meta.url), 'utf8');
  const checks = firstPersonChecklist(source);
  assert.equal(checks.length, 16);
  assert.deepEqual(checks.map(check => check.id), Array.from({ length: 16 }, (_, i) => 'FP' + String(i + 1).padStart(2, '0')));
  assert.ok(checks.every(check => check.title && check.question));
  assert.throws(() => firstPersonChecklist('### FP01 Missing question\nText.'), /Audit question/);
  assert.throws(() => firstPersonChecklist('### FP01 A\nAudit: One?\n### FP01 B\nAudit: Two?'), /unique/);
});

test('first-person signals preserve ordinary filters, emotion and purposeful repetition', () => {
  assert.deepEqual(reviewFirstPerson('I looked at the latch. I was scared.\n\nI tried again. It still would not lift.', 'scene.md'), []);
  const warnings = reviewFirstPerson('I swear it moved.\nI know what I saw.\nBelieve me, I checked.', 'scene.md');
  assert.deepEqual(warnings.map(warning => warning.line), [1, 2, 3]);
  assert.ok(warnings.every(warning => warning.reason.includes('do not remove by quota')));
  assert.equal(reviewFirstPerson('I swear it moved.', 'scene.md').length, 0);
  const artifact = reviewFirstPerson('A scene.\n\nGo Unlimited at https://turboscribe.ai/', 'scene.md');
  assert.equal(artifact[0].line, 3);
  assert.match(artifact[0].reason, /artifact/);
});

test('selected revision wins, with inherited fields and exact source locations', () => {
  const source = '{\n "title":"Inherited",\n "summary":"old",\n "defaultVersion":"v2",\n "versions":[\n {"id":"v1","summary":"archived"},\n {"id":"v2","summary":"current"},\n {"id":"v3","summary":"newest, not default"}\n ]\n}';
  const fields = new Map(currentNodes(jsonTree(source)));
  assert.equal(fields.get('summary').value, 'current');
  assert.equal(fields.get('title').value, 'Inherited');
  assert.ok(!fields.has('versions'));
  assert.equal(source.slice(0, fields.get('summary').start).split('\n').length, 7);
});

test('JSON location parser handles escapes, containers, and scalar types', () => {
  const value = { description: 'A "quoted" line\\path\nnext', flags: [true, false, null, 1.2, { x: [] }] };
  const parsed = jsonTree(JSON.stringify(value, null, 2));
  assert.deepEqual(parsed.value, value);
  assert.equal(new Map(currentNodes(parsed)).get('description').value, value.description);
  assert.throws(() => jsonTree('{'), SyntaxError);
});

test('isolated watchwords and concrete short declarations are allowed', () => {
  assert.deepEqual(inspect([
    passage('The Archive preserves a conversation he cannot place.'),
    passage('There was no pilot.', 'fiction'),
    passage('The organ had fallen silent. Felix had not.', 'fiction'),
    passage('She has the current report.'),
  ]), []);
});

test('clustered maintenance wording reports a location, phrase, and reason', () => {
  const findings = inspect([passage('The archive now preserves current records and ensures consistent summaries.', 'archive', 28)]);
  assert.equal(findings.length, 1);
  assert.equal(findings[0].line, 28);
  assert.equal(findings[0].file, 'sample.md');
  assert.match(findings[0].phrase, /now/);
  assert.match(findings[0].reason, /cluster/);
});

test('fiction does not receive aggressive archive or rhetorical checks', () => {
  assert.deepEqual(inspect([passage('It now preserves current records and ensures consistent answers. This does not establish a motive. This does not imply a crime.', 'fiction')]), []);
  assert.match(inspect([passage('A phrase\u2014another phrase.', 'fiction')])[0].reason, /punctuation/);
});

test('Home repetition is a pattern warning, not a single-word ban', () => {
  const rows = Array.from({ length: 5 }, (_, index) => passage(`Page ${index} now includes a short scene.`, 'home', index + 1));
  assert.ok(inspect(rows).some(f => f.reason.includes('Home update')));
  assert.ok(!inspect(rows.slice(0, 1)).length);
});

test('stock dramatic repetition is reviewed conservatively', () => {
  const rows = [passage('The silence deepened.', 'fiction', 1), passage('The silence deepened.', 'fiction', 9), passage('The silence deepened.', 'fiction', 19)];
  assert.equal(inspect(rows).length, 3);
  assert.equal(inspect(rows.slice(0, 2)).length, 0);
  assert.equal(inspect(rows.map((u, i) => ({ ...u, file: `chapter-${i}.md` }))).length, 0);
});

test('qualification clusters are warnings, while remaining in a place is not an opening pattern', () => {
  assert.match(inspect([passage('This does not establish a cure. This does not imply immunity.')])[0].reason, /qualification/);
  const rows = ['He decides to remain in the house.', 'She fights to remain free.', 'They must remain unseen.'].map(text => passage(text));
  assert.equal(inspect(rows).length, 0);
});
