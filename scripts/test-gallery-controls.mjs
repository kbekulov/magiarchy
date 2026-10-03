import assert from 'node:assert/strict';

export async function openGalleryFilters(page) {
  await page.locator('#gallery-filter-header').waitFor({ state: 'visible' });
  const toggle = page.locator('#gallery-filter-toggle');
  if (await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
}

export async function testGalleryControls(page, origin, engine) {
  for (const width of [320, 390, 560, 820, 950, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/gallery.html`);
    await page.waitForLoadState('networkidle');
    const compact = width <= 820;
    const toolbar = page.locator('#gallery-toolbar');
    const toggle = page.locator('#gallery-filter-toggle');
    const fields = page.locator('#gallery-filter-fields');
    const reset = page.locator('#gallery-filter-reset');
    const summary = page.locator('#gallery-filter-summary');
    assert.equal(await fields.isVisible(), !compact);
    assert.equal(await toggle.getAttribute('aria-expanded'), String(!compact));
    assert.ok(await reset.isDisabled());
    assert.equal(await toolbar.evaluate(node => getComputedStyle(node).position), 'static', 'Filters must not cover the artwork while scrolling');
    if (compact) {
      assert.ok((await toolbar.boundingBox()).height <= 60, 'Collapsed filters stay one compact row');
      await toggle.scrollIntoViewIfNeeded();
      await page.screenshot({ path: `test-results/${engine}-gallery-controls-collapsed-${width}.png` });
      await toggle.focus();
      await page.keyboard.press('Enter');
    }
    assert.ok(await fields.isVisible());
    const layout = await page.locator('#gallery-toolbar .gallery-select select').evaluateAll(nodes => nodes.map(node => {
      const rect = node.getBoundingClientRect();
      return { x: rect.x, y: rect.y, bottom: rect.bottom, width: rect.width, height: rect.height, overflow: node.scrollWidth > node.clientWidth + 2 };
    }));
    const row = layout.slice(0, width <= 380 ? 1 : width <= 560 ? 2 : 3);
    assert.ok(row.every(rect => Math.abs(rect.bottom - row[0].bottom) < 1 && Math.abs(rect.width - row[0].width) < 1), 'Fields share columns and bottom alignment');
    if (compact) assert.ok(layout.every(rect => rect.height >= 44));
    const pairs = await page.locator('.gallery-toggle-pair').evaluateAll(nodes => nodes.map(node => ({ x: node.getBoundingClientRect().x, y: node.getBoundingClientRect().y })));
    if (width > 560) assert.ok(pairs.every((rect, index) => Math.abs(rect.x - layout[index].x) < 1 && Math.abs(rect.y - pairs[0].y) < 1), 'Toggle groups line up under the fields');
    assert.ok((await page.locator('#gallery-toolbar .chibi-toggle').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height))).every(height => height >= 44));
    assert.deepEqual(await page.locator('#gallery-filter-fields label').evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 2).map(node => node.textContent.trim())), [], 'No clipped filter labels');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await toolbar.screenshot({ path: `test-results/${engine}-gallery-controls-expanded-${width}.png` });
    await page.locator('#gallery-character-filter').selectOption('kyrien');
    await page.locator('#gallery-season-filter').selectOption('winter');
    await page.locator('#gallery-colored-filter').locator('..').click();
    assert.equal(await page.locator('#gallery-filter-count').textContent(), '3');
    assert.match(await summary.textContent(), /Kyrien.*Winter.*Colored only/);
    assert.equal(await page.locator('#gallery-result-count').textContent(), '1');
    assert.equal(await page.locator('#gallery-filter-done').textContent(), 'Show 1 artwork');
    if (compact) await page.locator('#gallery-filter-done').click();
    else {
      await page.locator('#gallery-colored-filter').focus();
      await page.keyboard.press('Escape');
    }
    assert.ok(await fields.isHidden());
    assert.ok(await toggle.evaluate(node => node === document.activeElement));
    assert.ok(await summary.isVisible());
    // Hidden fields do not participate in keyboard navigation.
    await page.keyboard.press('Tab');
    assert.ok(await reset.evaluate(node => node === document.activeElement));
    await page.keyboard.press('Enter');
    assert.ok(await reset.isDisabled());
    assert.equal(await summary.textContent(), 'No filters selected');
    assert.equal(new URL(page.url()).searchParams.has('season'), false);
    assert.equal(await page.locator('.gallery-card[data-fan-service="true"]:not([hidden])').count(), 0);
    assert.ok(await fields.isHidden(), 'Reset does not reopen the panel');
  }
  // URL selections remain visible in the collapsed summary; reset preserves unrelated query state.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${origin}/gallery.html?season=winter&fan-service=include&ref=controls#gallery-toolbar`);
  await page.waitForLoadState('networkidle');
  assert.match(await page.locator('#gallery-filter-summary').textContent(), /Winter.*Include Fan Service/);
  assert.equal(await page.locator('#gallery-filter-count').textContent(), '2');
  await page.locator('#gallery-filter-reset').click();
  assert.equal(new URL(page.url()).search, '?ref=controls');
  assert.equal(new URL(page.url()).hash, '#gallery-toolbar');
  await openGalleryFilters(page);
  await page.locator('#gallery-character-filter').selectOption('sherie');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator('#gallery-filter-fields').waitFor({ state: 'visible' });
  assert.ok(await page.locator('#gallery-filter-fields').isVisible());
  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(await page.locator('#gallery-filter-fields').isVisible(), 'Resizing preserves an explicitly opened compact panel');
  assert.equal(await page.locator('#gallery-character-filter').inputValue(), 'sherie');
  for (const route of ['gallery.html?collection=panels', 'gallery.html?collection=production', 'gallery.html?image=char-kyrien-seasonal-autumn-blue-shirt']) {
    await page.goto(`${origin}/${route}`);
    await page.waitForLoadState('networkidle');
    assert.ok(await page.locator('#gallery-toolbar').isHidden());
  }
  const browser = page.context().browser();
  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  try {
    const phone = await touch.newPage();
    await phone.goto(`${origin}/gallery.html`);
    await phone.locator('#gallery-filter-toggle').tap();
    await phone.locator('#gallery-chibi-filter').locator('..').tap();
    await phone.locator('#gallery-exclude-chibi-filter').locator('..').tap();
    assert.equal(await phone.locator('#gallery-chibi-filter').isChecked(), false);
    await phone.locator('#gallery-filter-done').tap();
    assert.ok(await phone.locator('#gallery-filter-fields').isHidden());
    await phone.setViewportSize({ width: 844, height: 390 });
    await phone.locator('#gallery-filter-fields').waitFor({ state: 'visible' });
    assert.ok(await phone.locator('#gallery-filter-fields').isVisible());
    assert.ok(await phone.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  } finally { await touch.close(); }
  const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const fallback = await noScript.newPage();
    await fallback.goto(`${origin}/gallery.html`);
    assert.ok(await fallback.locator('#gallery-filter-fields').isVisible());
    assert.ok(await fallback.locator('#gallery-filter-header').isHidden());
    assert.ok(await fallback.locator('#gallery-filter-done').isHidden());
  } finally { await noScript.close(); }
  console.log(`${engine}: Gallery filter disclosure, alignment, reset, focus, responsive and touch checks passed.`);
}
