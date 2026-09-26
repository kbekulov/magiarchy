import fs from 'node:fs';
import assert from 'node:assert/strict';
import { updateExpiry } from '../home-updates.js';
import { readHomeUpdates, pruneHomeUpdates } from './home-updates.mjs';

export async function testHomeFeed(page, origin, engine) {
  const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const built = html.match(/data-updates-as-of="([^"]+)"/)[1];
  await page.clock.setFixedTime(new Date(`${built}T12:00:00Z`));
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/index.html`);
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('#home-updates .dispatch').count(), readHomeUpdates(html).length);
    assert.ok(await page.locator('.welcome-card').isVisible());
    assert.equal(await page.locator('.home-updates-empty').isHidden(), readHomeUpdates(html).length > 0);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Home overflow at ${width}`);
    const dates = await page.locator('#home-updates .date-divider').evaluateAll(nodes => nodes.map(node => node.dataset.published));
    assert.equal(dates.length, new Set(dates).size, 'One divider per date');
    await page.screenshot({ path: `test-results/${engine}-home-updates-${width}.png` });
  }

  // A previously built page must age correctly without a deployment.
  const card = (id, day) => `<article class="dispatch reveal" id="${id}"><div class="dispatch-body"><div class="dispatch-author"><strong>Site Update</strong><span>${day} · Retention test</span></div><p>Retention test announcement.</p></div></article>`;
  const cached = pruneHomeUpdates(html.replace(/<!-- Home updates: start -->[\s\S]*?<!-- Home updates: end -->/, `<!-- Home updates: start -->${card('recent-news', '26 Sep 2026')}${card('boundary-news', '26 Aug 2026')}<!-- Home updates: end -->`), new Date('2026-09-26T12:00:00Z')).html;
  const fixture = async route => route.fulfill({ contentType: 'text/html', body: cached });
  const searchFixture = async route => route.fulfill({ json: { entries: [
    { id: 'expired', title: 'Retention test expired news', type: 'Update', url: 'index.html#boundary-news', text: 'Retention test', current: true, expires: updateExpiry('2026-08-26') },
    { id: 'recent', title: 'Retention test current news', type: 'Update', url: 'index.html#recent-news', text: 'Retention test', current: true, expires: updateExpiry('2026-09-26') },
    { id: 'history', title: 'Retention test document history', type: 'Document', url: 'docs.html?doc=world-foundation&version=v1', text: 'Retention test', current: false }
  ] } });
  await page.route('**/index.html', fixture);
  await page.route('**/search-index.json', searchFixture);
  try {
    await page.clock.setFixedTime(new Date('2026-09-27T00:00:00Z'));
    await page.goto(`${origin}/index.html`);
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('#boundary-news').count(), 0, 'Cached expired announcement survived');
    assert.equal(await page.locator('#recent-news').count(), 1);
    assert.equal(await page.locator('#home-updates .date-divider').count(), 1);
    await page.getByRole('button', { name: 'Search archive', exact: true }).click();
    await page.locator('.global-search-field input').fill('Retention test');
    await page.getByRole('option', { name: /Retention test current news/ }).waitFor();
    assert.equal(await page.getByRole('option', { name: /Retention test expired news/ }).count(), 0);
    await page.getByLabel('Include earlier versions').check();
    await page.getByRole('option', { name: /Retention test document history/ }).waitFor();
    assert.equal(await page.getByRole('option', { name: /Retention test expired news/ }).count(), 0, 'History toggle revived expired news');
    await page.keyboard.press('Escape');

    await page.clock.setFixedTime(new Date('2026-10-28T00:00:00Z'));
    await page.evaluate(() => window.dispatchEvent(new Event('pageshow')));
    assert.equal(await page.locator('#home-updates .dispatch').count(), 0);
    assert.equal(await page.locator('#home-updates .date-divider').count(), 0);
    assert.ok(await page.locator('.home-updates-empty').isVisible());
    assert.ok(await page.locator('.welcome-card').isVisible());
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: `test-results/${engine}-home-updates-empty.png` });

    const clockContext = await page.context().browser().newContext({ reducedMotion: 'reduce' });
    try {
      const clockPage = await clockContext.newPage();
      await clockPage.route('https://**/*', route => route.abort());
      await clockPage.route('**/index.html', fixture);
      await clockPage.clock.install({ time: new Date('2026-09-26T12:00:00Z') });
      await clockPage.goto(`${origin}/index.html`);
      await clockPage.waitForLoadState('networkidle');
      assert.equal(await clockPage.locator('#home-updates .dispatch').count(), 2);
      await clockPage.clock.fastForward(13 * 60 * 60 * 1000);
      assert.equal(await clockPage.locator('#boundary-news').count(), 0, 'Open Home page failed to expire news at midnight');
      assert.equal(await clockPage.locator('#recent-news').count(), 1);
    } finally { await clockContext.close(); }

    // The built output, including the welcome and current announcements, needs no JS.
    const noJs = await page.context().browser().newContext({ javaScriptEnabled: false });
    try {
      const staticPage = await noJs.newPage();
      await staticPage.route('https://**/*', route => route.abort());
      await staticPage.goto(`${origin}/index.html`);
      assert.equal(await staticPage.locator('#home-updates .dispatch').count(), readHomeUpdates(html).length);
      assert.ok(await staticPage.locator('.welcome-card').isVisible());
    } finally { await noJs.close(); }
  } finally {
    await page.unroute('**/index.html', fixture);
    await page.unroute('**/search-index.json', searchFixture);
    await page.clock.setSystemTime(new Date());
  }
  console.log(`${engine}: Home feed at 3 widths, 31-day cached expiry, search history isolation, empty state, and static fallback passed.`);
}
