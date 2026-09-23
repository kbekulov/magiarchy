import assert from 'node:assert/strict';

export async function testArtworkVersions(page, origin, engine) {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/gallery.html`);
    await page.waitForLoadState('networkidle');
    assert.ok(await page.locator('[data-image-version-group="sherie-study-01"][data-image-version="v1"]').isHidden());
    assert.ok(await page.locator('[data-image-version-group="sherie-study-01"][data-image-version="v2"]').isVisible());
    await page.goto(`${origin}/gallery.html?image=char-sherie-1`);
    await page.waitForLoadState('networkidle');
    const nav = page.locator('#gallery-image-versions');
    assert.equal(await nav.locator('a').count(), 2);
    assert.ok((await nav.locator('[aria-current]').innerText()).includes('v1'));
    await nav.getByRole('link', { name: 'v2 · Ankle boots · Default', exact: true }).click();
    await page.waitForURL('**/gallery.html?image=char-sherie-1-v2-ankle-boots');
    await page.waitForLoadState('networkidle');
    assert.ok((await nav.locator('[aria-current]').innerText()).includes('v2'));
    assert.equal(await page.locator('#gallery-detail-source').getAttribute('href'), 'media/gallery/images/characters/char-sherie-1-v2-ankle-boots.png');
    assert.ok(await page.locator('#gallery-siblings').isHidden());
    await nav.scrollIntoViewIfNeeded();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `test-results/${engine}-artwork-versions-${width}.png` });
    await nav.getByRole('link', { name: 'v1 · Original heels', exact: true }).focus();
    await page.keyboard.press('Enter');
    await page.waitForURL('**/gallery.html?image=char-sherie-1');
    assert.equal(await page.locator('#gallery-detail-source').getAttribute('href'), 'media/gallery/images/characters/char-sherie-1.png');
    await page.goto(`${origin}/gallery.html?image=char-sherie_drake-1`);
    await page.waitForLoadState('networkidle');
    assert.ok(await nav.isHidden());
  }
  console.log(`${engine}: artwork versions, source links, keyboard switching and responsive layouts passed`);
}
