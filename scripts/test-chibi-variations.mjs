import { publishedImagePath, currentPublishedImagePath, currentArtworkId } from './test-image-paths.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const variants = [
  ['kyrien', 'arc-1-chibi-low-crouch'], ['ash', 'chibi-playful-stretch'],
  ['sherie', 'chibi-playful-curtsy'], ['drake', 'chibi-cane-disapproval'],
  ['felix', 'chibi-laughing-bow'], ['fionn', 'chibi-adjusting-glove'],
  ['helena', 'chibi-over-shoulder'], ['heyk', 'chibi-seated-watch'],
  ['hiyu', 'chibi-sudden-idea'], ['myka', 'chibi-off-balance'],
  ['natalia', 'chibi-seated-reader'], ['reiner', 'chibi-folded-arms'],
  ['tien', 'chibi-quiet-perch'], ['yulia', 'chibi-exasperated-sigh']
];

export async function testChibiVariations(page, origin, engine) {
  await page.addInitScript(() => {
    if (new URL(location.href).searchParams.has('chibi-variation-test')) Math.random = () => 0.9999;
  });
  const search = JSON.parse(fs.readFileSync('search-index.json', 'utf8')).entries;
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/characters.html?chibi-variation-test=latest`);
    await page.waitForLoadState('networkidle');
    for (const [slug, suffix] of variants) {
      const name = slug[0].toUpperCase() + slug.slice(1);
      const card = page.locator(`[data-name="${name}"]`);
      await card.scrollIntoViewIfNeeded();
      const image = card.locator('.character-chibi');
      await page.waitForFunction(({ name, preview }) => {
        const img = document.querySelector(`[data-name="${name}"] .character-chibi`);
        return img?.complete && img.naturalWidth > 0 && new URL(img.currentSrc).pathname === `/${preview}`;
      }, { name, preview: currentPublishedImagePath(`media/gallery/previews/chibis/char-${slug}-${suffix}.webp`) });
      assert.equal(await image.getAttribute('src'), currentPublishedImagePath(`media/gallery/previews/chibis/char-${slug}-${suffix}.webp`), `${name}: new pose must enter the random card pool`);
      if (slug === 'kyrien') assert.equal(await card.locator('.art-note').textContent(), 'Arc 1 · Chibi');
    }
    await page.screenshot({ path: `test-results/${engine}-chibi-variations-characters-${width}.png` });
    await page.goto(`${origin}/gallery.html?chibi-variation-test=latest`);
    await page.waitForLoadState('networkidle');
    await page.locator('#gallery-chibi-filter').check({ force: true });
    for (const [slug, suffix] of variants) {
      const stack = page.locator(`.gallery-card[data-artwork-stack="${slug}-chibis"]`);
      assert.ok(await stack.count() >= 2);
      const visible = page.locator(`.gallery-card[data-artwork-stack="${slug}-chibis"]:not([hidden])`);
      assert.equal(await visible.count(), 1);
      assert.equal(await visible.getAttribute('data-image'), currentArtworkId(`char-${slug}-${suffix}`));
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `test-results/${engine}-chibi-variations-gallery-${width}.png`, fullPage: true });
    for (const [slug, suffix] of variants) {
      const id = `char-${slug}-${suffix}`;
      await page.goto(`${origin}/gallery.html?image=${id}`);
      await page.waitForLoadState('networkidle');
      const image = page.locator('#gallery-detail-image');
      await image.evaluate(img => img.decode());
      assert.deepEqual(await image.evaluate(img => [img.naturalWidth, img.naturalHeight]), [1254, 1254]);
      const nav = page.locator('#gallery-image-versions');
      const count = await page.locator(`.gallery-card[data-artwork-stack="${slug}-chibis"]`).count();
      assert.equal(await nav.locator('a').count(), count);
      assert.equal(await nav.locator('a[aria-current="page"]').getAttribute('href'), `gallery.html?image=${id}`);
      const source = publishedImagePath(`media/gallery/images/chibis/${id}.png`);
      assert.equal(await page.locator('#gallery-detail-source').getAttribute('href'), source);
      const response = await page.request.get(`${origin}/${source}`);
      assert.deepEqual(await response.body(), fs.readFileSync(source));
      assert.ok(search.some(entry => entry.url === `gallery.html?image=${id}`));
      const original = nav.locator('a').first();
      const originalUrl = await original.getAttribute('href');
      await original.focus();
      await page.keyboard.press('Enter');
      await page.waitForURL(`${origin}/${originalUrl}`);
      await page.locator('#gallery-detail-image').evaluate(img => img.decode());
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    }
  }
  console.log(`${engine}: all 14 new chibi poses, random cards, grouped thumbnails, originals and phone/desktop readers passed`);
}
