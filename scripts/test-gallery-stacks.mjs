import assert from 'node:assert/strict';

export async function testGalleryStacks(page, origin, engine) {
  for (const width of [390, 1440]) {
    await page.setViewportSize({width, height: 900});
    await page.goto(`${origin}/gallery.html`);
    await page.waitForLoadState('networkidle');
    const stack = page.locator('[data-artwork-stack="sherie-red-sofa"]:not([hidden])');
    assert.equal(await stack.count(), 1);
    await stack.locator(':scope > a').click();
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('#gallery-image-versions a').count(), 12);
    assert.deepEqual(await page.locator('.gallery-variant-category').allTextContents(), ['Without cards', 'With cards']);
    await page.locator('#gallery-image-versions a').last().click();
    await page.waitForLoadState('networkidle');
    assert.ok((await page.locator('#gallery-detail-source').getAttribute('href')).includes('with-cards-07'));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({path:`test-results/${engine}-sofa-stack-${width}.png`});
    await page.goto(`${origin}/gallery.html?collection=panels`);
    await page.waitForLoadState('networkidle');
    const darkness = page.locator('.panel-card a[href="gallery.html?panels=darkness"]');
    const include = page.locator('#panel-include-h'), only = page.locator('#panel-only-h');
    assert.equal(await darkness.count(), 0);
    await include.check({force:true});
    assert.equal(await darkness.count(), 1);
    await only.check({force:true});
    assert.equal(await include.isChecked(), false);
    assert.equal(await page.locator('.panel-card').count(), 1);
    await include.check({force:true});
    assert.equal(await only.isChecked(), false);
    await darkness.click();
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('#panel-count').textContent(), 'No panel images available');
    assert.ok(await page.locator('#panel-back').isVisible());
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({path:`test-results/${engine}-darkness-${width}.png`});
    await page.locator('#panel-back').click();
    await page.waitForLoadState('networkidle');
    assert.equal(await include.isChecked(), false);
    assert.equal(await only.isChecked(), false);
    assert.equal(await darkness.count(), 0);
  }
}
