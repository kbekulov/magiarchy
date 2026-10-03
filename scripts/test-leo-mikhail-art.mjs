import { publishedImagePath } from './test-image-paths.mjs';
import assert from 'node:assert/strict';
import { openGalleryFilters } from './test-gallery-controls.mjs';

export async function testLeoMikhailArt(page, origin, engine) {
  const cast = [
    ['father-mikhail', 'Father Mikhail', 'autumn-night', ['reading', 'dry-remark', 'folded-arms']],
    ['inspector-leo', 'Inspector Leo', 'autumn-street', ['taking-notes', 'skeptical', 'looking-back']]
  ];
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [slug, name, portrait, poses] of cast) {
      await page.goto(`${origin}/gallery.html`);
      await page.waitForLoadState('networkidle');
      await openGalleryFilters(page);
      await page.locator('#gallery-character-filter').selectOption(slug);
      assert.equal(await page.locator('.gallery-card:not([hidden])').count(), 3);
      await page.goto(`${origin}/gallery.html?image=char-${slug}-${portrait}`);
      await page.waitForLoadState('networkidle');
      await page.locator('#gallery-detail-image').evaluate(image => image.decode());
      assert.equal(await page.locator('#gallery-detail-source').getAttribute('href'), publishedImagePath(`media/gallery/images/characters/char-${slug}-${portrait}.png`));
      for (const pose of poses) {
        const id = `char-${slug}-chibi-${pose}`;
        await page.goto(`${origin}/gallery.html?image=${id}`);
        await page.waitForLoadState('networkidle');
        await page.locator('#gallery-detail-image').evaluate(image => image.decode());
        assert.equal(await page.locator('#gallery-image-versions a').count(), 3);
        assert.equal(await page.locator('#gallery-detail-source').getAttribute('href'), publishedImagePath(`media/gallery/images/chibis/${id}.png`));
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      }
      await page.goto(`${origin}/character.html?character=${slug}`);
      await page.waitForLoadState('networkidle');
      await page.locator(`.profile-art-thumbnails button:has(img[src*="char-${slug}-${portrait}"])`).click();
      const hero = page.locator('.profile-portrait-strip img').nth(1);
      await hero.evaluate(image => image.decode());
      assert.ok((await hero.getAttribute('src')).includes(`char-${slug}-${portrait}`));
      await page.screenshot({ path: `test-results/${engine}-${slug}-official-portrait-${width}.png` });
      await page.goto(`${origin}/characters.html`);
      await page.waitForLoadState('networkidle');
      const card = page.locator(`[data-name="${name}"]`);
      await card.scrollIntoViewIfNeeded();
      const chibi = card.locator('.character-chibi');
      await chibi.evaluate(image => image.decode());
      const src = await chibi.getAttribute('src');
      assert.ok(poses.some(pose => src.includes(`char-${slug}-chibi-${pose}`)));
      await card.screenshot({ path: `test-results/${engine}-${slug}-chibi-card-${width}.png` });
    }
  }
  console.log(`${engine}: Leo and Mikhail portraits, six chibis, filters, stacks and phone/desktop cards passed`);
}
