import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testGalleryStacks(page, origin, engine) {
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({width, height: 900});
    await page.goto(`${origin}/gallery.html`);
    await page.waitForLoadState('networkidle');
    const stack = page.locator('[data-artwork-stack="sherie-red-sofa"]:not([hidden])');
    assert.equal(await stack.count(), 1);
    await stack.locator(':scope > a').click();
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('#gallery-image-versions a').count(), 15);
    assert.deepEqual(await page.locator('.gallery-variant-category').allTextContents(), ['Without cards', 'With cards']);
    await page.locator('#gallery-image-versions a').last().click();
    await page.waitForLoadState('networkidle');
    assert.ok((await page.locator('#gallery-detail-source').getAttribute('href')).includes('char-sherie-ivory-sofa-card-game'));
    assert.equal(await page.locator('#gallery-detail-title').textContent(), 'Sherie on the sofa');
    for (const id of ['char-sherie-red-sofa-with-cards-08', 'char-sherie-red-sofa-with-cards-09', 'char-sherie-ivory-sofa-card-game']) {
      await page.locator(`#gallery-image-versions a[href="gallery.html?image=${id}"]`).click();
      await page.waitForLoadState('networkidle');
      await page.locator('#gallery-detail-image').evaluate(image => image.decode());
      assert.equal(await page.locator('#gallery-image-versions a').count(), 15);
      const source = await page.locator('#gallery-detail-source').getAttribute('href');
      assert.equal(source, `media/gallery/images/characters/${id}.png`);
      const response = await page.request.get(`${origin}/${source}`);
      assert.ok(response.ok());
      assert.deepEqual(await response.body(), fs.readFileSync(source));
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({path:`test-results/${engine}-sofa-stack-${width}.png`});
    await page.goto(`${origin}/gallery.html?collection=panels`);
    await page.waitForLoadState('networkidle');
    const darkness = page.locator('.panel-card a[href="gallery.html?panels=darkness"]');
    const include = page.locator('#panel-include-h'), only = page.locator('#panel-only-h');
    const toggles = page.locator('.panel-scene-toggles');
    assert.equal(await toggles.getAttribute('aria-label'), 'H Scene visibility');
    const boxes = await toggles.locator('.chibi-toggle').evaluateAll(elements => elements.map(element => {
      const {x,y,width,height} = element.getBoundingClientRect(); return {x,y,width,height};
    }));
    assert.ok(boxes.every(box => box.height >= 44));
    if (width >= 820) {
      assert.ok(Math.abs(boxes[0].y - boxes[1].y) < 1, 'Desktop toggles share one row');
      assert.ok(boxes[1].x - boxes[0].x - boxes[0].width <= 32, 'Toggles stay grouped rather than spreading across the page');
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({path:`test-results/${engine}-panel-filter-group-${width}.png`});
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
  console.log(`${engine}: 15-image sofa stack, direct variants, original downloads, and compact H Scene controls passed.`);
}
