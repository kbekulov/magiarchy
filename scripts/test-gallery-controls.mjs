import assert from 'node:assert/strict';

export async function testGalleryControls(page, origin, engine) {
  for (const width of [320, 390, 560, 820, 950, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(origin + '/gallery.html');
    await page.waitForLoadState('networkidle');
    const toolbar = page.locator('#gallery-toolbar');
    const fields = page.locator('#gallery-filter-fields');
    const reset = page.locator('#gallery-filter-reset');
    assert.ok(await fields.isVisible(), 'Filters are always open');
    assert.equal(await page.locator('#gallery-filter-toggle, #gallery-filter-done').count(), 0, 'No collapse or Show artworks controls');
    assert.ok(await page.locator('#gallery-filter-header').isHidden(), 'No summary row without active filters');
    assert.equal(await toolbar.evaluate(node => getComputedStyle(node).position), 'static', 'Filters scroll away instead of covering artwork');
    const layout = await page.locator('#gallery-toolbar .gallery-select select').evaluateAll(nodes => nodes.map(node => {
      const rect = node.getBoundingClientRect();
      return { x: rect.x, bottom: rect.bottom, width: rect.width, height: rect.height };
    }));
    const row = layout.slice(0, width <= 380 ? 1 : width <= 560 ? 2 : 3);
    assert.ok(row.every(rect => Math.abs(rect.bottom - row[0].bottom) < 1 && Math.abs(rect.width - row[0].width) < 1));
    if (width <= 820) assert.ok(layout.every(rect => rect.height >= 44));
    const pairs = await page.locator('.gallery-toggle-pair').evaluateAll(nodes => nodes.map(node => ({ x: node.getBoundingClientRect().x, y: node.getBoundingClientRect().y })));
    if (width > 560) assert.ok(pairs.every((rect, index) => Math.abs(rect.x - layout[index].x) < 1 && Math.abs(rect.y - pairs[0].y) < 1));
    assert.ok((await page.locator('#gallery-toolbar .chibi-toggle').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height))).every(height => height >= 44));
    assert.deepEqual(await page.locator('#gallery-filter-fields label').evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 2).map(node => node.textContent.trim())), []);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await toolbar.screenshot({ path: 'test-results/' + engine + '-gallery-always-open-' + width + '.png' });
    await page.locator('#gallery-character-filter').selectOption('kyrien');
    await page.locator('#gallery-season-filter').selectOption('winter');
    await page.locator('#gallery-colored-filter').focus();
    await page.keyboard.press('Space');
    assert.equal(await page.locator('#gallery-result-count').textContent(), '1', 'Selections apply immediately');
    assert.equal(await page.locator('#gallery-filter-count').textContent(), '3');
    assert.match(await page.locator('#gallery-filter-summary').textContent(), /Kyrien.*Winter.*Colored only/);
    await page.keyboard.press('Escape');
    assert.ok(await fields.isVisible(), 'Escape never collapses the filters');
    await reset.focus();
    await page.keyboard.press('Enter');
    assert.ok(await page.locator('#gallery-character-filter').evaluate(node => node === document.activeElement));
    assert.ok(await page.locator('#gallery-filter-header').isHidden());
    assert.ok(await fields.isVisible());
    assert.equal(new URL(page.url()).searchParams.has('season'), false);
    assert.equal(await page.locator('.gallery-card[data-fan-service="true"]:not([hidden])').count(), 0);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin + '/gallery.html?season=winter&fan-service=include&ref=controls');
  await page.waitForLoadState('networkidle');
  assert.match(await page.locator('#gallery-filter-summary').textContent(), /Winter.*Include Fan Service/);
  await page.locator('#gallery-filter-reset').click();
  assert.equal(new URL(page.url()).search, '?ref=controls');
  await page.locator('#gallery-character-filter').selectOption('sherie');
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    assert.ok(await page.locator('#gallery-filter-fields').isVisible());
    assert.equal(await page.locator('#gallery-character-filter').inputValue(), 'sherie');
  }
  for (const route of ['gallery.html?collection=panels', 'gallery.html?collection=production', 'gallery.html?image=char-kyrien-seasonal-autumn-blue-shirt']) {
    await page.goto(origin + '/' + route);
    await page.waitForLoadState('networkidle');
    assert.ok(await page.locator('#gallery-toolbar').isHidden());
  }
  const browser = page.context().browser();
  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  try {
    const phone = await touch.newPage();
    await phone.goto(origin + '/gallery.html');
    await phone.locator('#gallery-chibi-filter').locator('..').tap();
    await phone.locator('#gallery-exclude-chibi-filter').locator('..').tap();
    assert.equal(await phone.locator('#gallery-chibi-filter').isChecked(), false);
    assert.ok(await phone.locator('#gallery-filter-fields').isVisible());
    await phone.setViewportSize({ width: 844, height: 390 });
    assert.ok(await phone.locator('#gallery-filter-fields').isVisible());
    assert.ok(await phone.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  } finally { await touch.close(); }
  const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const fallback = await noScript.newPage();
    await fallback.goto(origin + '/gallery.html');
    assert.ok(await fallback.locator('#gallery-filter-fields').isVisible());
    assert.ok(await fallback.locator('#gallery-filter-header').isHidden());
  } finally { await noScript.close(); }
  console.log(engine + ': always-open Gallery filters, alignment, immediate results, reset, focus and touch passed.');
}
