import assert from 'node:assert/strict';
import test from 'node:test';
import { isRecentUpdate, updateExpiry } from '../home-updates.js';
import { pruneHomeUpdates, readHomeUpdates } from './home-updates.mjs';

const article = (id, date, explicit = '') => `<article class="dispatch reveal" id="${id}"${explicit ? ` data-published="${explicit}"` : ''}><div class="dispatch-author"><strong>Site Update</strong><span>${date} · Test</span></div><p>Keep this text exactly.</p></article>`;
const page = (...articles) => `<section class="welcome-card">Welcome</section><section id="home-updates"><!-- Home updates: start -->${articles.join('\n')}<!-- Home updates: end --><p class="home-updates-empty" hidden>Empty</p></section><aside>Notes</aside>`;

test('31-day inclusive boundary expires at the following UTC midnight', () => {
  assert.equal(isRecentUpdate('2026-08-26', new Date('2026-09-26T23:59:59.999Z')), true);
  assert.equal(isRecentUpdate('2026-08-26', new Date('2026-09-27T00:00:00Z')), false);
  assert.equal(isRecentUpdate('2026-08-25', new Date('2026-09-26T00:00:00Z')), false);
  assert.equal(isRecentUpdate('2026-12-31', new Date('2027-01-31T23:59:59Z')), true);
  assert.equal(isRecentUpdate('2026-12-31', new Date('2027-02-01T00:00:00Z')), false);
  assert.equal(isRecentUpdate('2028-02-29', new Date('2028-03-31T23:59:59Z')), true);
  assert.equal(isRecentUpdate('2028-02-29', new Date('2028-04-01T00:00:00Z')), false);
  // Client clocks behind publication must not discard recent published work.
  assert.equal(isRecentUpdate('2026-09-26', new Date('2026-09-25T20:00:00Z')), true);
});

test('invalid or missing calendar dates never count as recent', () => {
  for (const value of [undefined, '', 'yesterday', '2026-02-29', '2026-02-30', '2026-13-01', '2026-9-01']) {
    assert.ok(Number.isNaN(updateExpiry(value)));
    assert.equal(isRecentUpdate(value), false);
  }
});

test('pruning groups dates, preserves prose and removes expired news only', () => {
  const input = page(article('old', '25 Aug 2026'), article('edge', '26 Aug 2026'), article('today-a', '26 Sep 2026'), article('today-b', '26 Sep 2026'));
  const now = new Date('2026-09-26T12:00:00Z');
  const result = pruneHomeUpdates(input, now);
  assert.equal(result.removed, 1);
  assert.deepEqual(result.retained.map(record => record.id), ['today-a', 'today-b', 'edge']);
  assert.equal((result.html.match(/class="date-divider"/g) || []).length, 2);
  assert.ok(result.html.includes('data-published="2026-08-26"'));
  assert.ok(result.html.includes('data-updates-as-of="2026-09-26"'));
  assert.ok(result.html.startsWith('<section class="welcome-card">Welcome</section>'));
  assert.ok(result.html.endsWith('<aside>Notes</aside>'));
  assert.equal((result.html.match(/Keep this text exactly./g) || []).length, 3);
  assert.equal(pruneHomeUpdates(result.html, now).html, result.html, 'Build must be idempotent');
  assert.equal(pruneHomeUpdates(result.html.replace(/\n/g, '\r\n'), now).html, result.html, 'Windows checkout must produce the same feed');
});

test('empty feeds have no orphan divider and a visible empty state', () => {
  const result = pruneHomeUpdates(page(article('old', '25 Aug 2026')), new Date('2026-09-26T00:00:00Z'));
  assert.equal(result.retained.length, 0);
  assert.ok(!result.html.includes('class="date-divider"'));
  assert.ok(result.html.includes('<p class="home-updates-empty">'));
  assert.equal(readHomeUpdates(result.html).length, 0);
});

test('bad metadata cannot silently delete a new announcement', () => {
  for (const input of [page(article('bad', '29 Feb 2026')), page(article('bad', '26 Sep 2026', '2026-08-01')), page(article('bad', 'no date'))]) {
    assert.throws(() => readHomeUpdates(input));
  }
  assert.throws(() => readHomeUpdates('<p>Missing boundaries</p>'));
});
