import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testHomeDashboard(page, origin, engine) {
  const data = JSON.parse(fs.readFileSync(new URL('../home-dashboard.json', import.meta.url)));
  for (const width of [320, 360, 820, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`${origin}/index.html`);
    await page.locator('[data-shuffle="facts"]:visible').waitFor();
    assert.equal(await page.locator('[data-character-choice]').count(), data.cast.length);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width}: dashboard overflow`);
    for (const kind of ['facts', 'questions', 'holumns', 'moments', 'panels']) {
      const slot = page.locator(`[data-snapshot="${kind}"]`);
      const before = await slot.getAttribute('data-selected');
      await page.locator(`[data-shuffle="${kind}"]`).click();
      assert.notEqual(await slot.getAttribute('data-selected'), before);
    }
    await page.waitForFunction(() => document.querySelector('.desk-panel-image img')?.naturalWidth > 0);
    assert.equal(await page.locator('.desk-donut circle').count(), data.genreGroups.length);
    assert.equal(await page.locator('.desk-genre-legend li').count(), data.genreGroups.length);
    assert.equal(await page.locator('.desk-draft-bar span').count(), data.draftStatus.length);
    await page.locator('#desk-cast-order').selectOption('least');
    const ordered = [...data.cast].sort((a, b) => a.total - b.total || a.name.localeCompare(b.name));
    assert.equal(await page.locator('[data-character-choice]').first().getAttribute('data-character-choice'), ordered[0].slug);
    await page.locator(`[data-character-choice="${ordered[0].slug}"]`).click();
    assert.equal(await page.locator('#desk-character-detail h3').innerText(), ordered[0].name);
    await page.locator('[data-cast-mode="development"]').click();
    assert.equal(await page.locator('.desk-bars').count(), 0);
    assert.equal(await page.locator('.desk-coverage').count(), data.cast.length);
    await page.locator('[data-cast-mode="presence"]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('[data-cast-mode="presence"]').getAttribute('aria-pressed'), 'true');
    await page.locator('[data-cast-mode="presence"]').click();
    await page.locator('#desk-cast-order').selectOption('most');
    await page.locator(`[data-character-choice="${data.cast[0].slug}"]`).click();
    await page.locator('#writer-dashboard').scrollIntoViewIfNeeded();
    await page.evaluate(() => { document.querySelector('.feed-scroll').scrollTop = 0; window.scrollTo(0, 0); });
    await page.screenshot({ path: `test-results/${engine}-writer-dashboard-${width}.png` });
    await page.locator('.desk-genres').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${engine}-writer-genres-${width}.png` });
    await page.locator('.desk-cast').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${engine}-writer-cast-${width}.png` });
  }
  // The sampled ledger entry must open the exact row, not just the top of a long document.
  const href = await page.locator('[data-snapshot="questions"] .desk-link').getAttribute('href');
  const panelHref = await page.locator('.desk-panel-image').getAttribute('href');
  await page.goto(`${origin}/${panelHref}`);
  await page.locator(new URL(panelHref, origin).hash).waitFor();
  await page.goto(`${origin}/${href}`);
  const id = new URL(href, origin).hash.slice(1);
  await page.locator(`[id="${id}"]`).waitFor();
  assert.ok((await page.locator(`[id="${id}"]`).innerText()).length > 20);
  // All generated question anchors resolve, including other table sections.
  const ids = new Set(await page.locator('.question-ledger-table tr[id]').evaluateAll(rows => rows.map(row => row.id)));
  for (const question of data.questions) assert.ok(ids.has(question.id), `Missing ledger target: ${question.id}`);
  await page.goto(`${origin}/docs.html?doc=holumn-incidents-and-testimonies`);
  await page.locator('#bone-archive').waitFor();
  for (const incident of data.holumns) assert.equal(await page.locator(new URL(incident.href, origin).hash).count(), 1, `Missing incident target: ${incident.id}`);
  // Failure must not blank the useful build-time dashboard.
  await page.route('**/home-dashboard.json', route => route.abort());
  await page.goto(`${origin}/index.html`);
  assert.equal(await page.locator('.desk-card').count(), 10);
  assert.ok(await page.locator('[data-snapshot="facts"] .desk-link').isVisible());
  await page.unroute('**/home-dashboard.json');
  const noJs = await page.context().browser().newContext({ javaScriptEnabled: false });
  try {
    const staticPage = await noJs.newPage();
    await staticPage.route('https://**/*', route => route.abort());
    await staticPage.goto(`${origin}/index.html`);
    assert.equal(await staticPage.locator('.desk-card').count(), 10);
    assert.ok(await staticPage.locator('#desk-work-title').isVisible());
  } finally { await noJs.close(); }
  console.log(`${engine}: writer dashboard sources, charts, refresh, exact ledger links, 5 widths and fallbacks passed.`);
}
