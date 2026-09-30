import { publishedImagePath } from './test-image-paths.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';

export const chibiOutfits = {
  Kyrien: [
    ['char-kyrien-arc-1-chibi-beige-jacket', 'char-kyrien-arc-1-chibi-beige-jacket-r2', 'Arc 1 · Chibi'],
    ['char-kyrien-chibi-blue-shirt-study', 'char-kyrien-chibi-blue-shirt-study', 'Chibi · Costume study'],
    ['char-kyrien-chibi-black-coat-study', 'char-kyrien-chibi-black-coat-study', 'Chibi · Costume study'],
    ['char-kyrien-arc-1-chibi-low-crouch', 'char-kyrien-arc-1-chibi-low-crouch', 'Arc 1 · Chibi']
  ],
  Felix: [
    ['chibi_felix_1', 'char-felix-chibi-suspenders-r2', 'Chibi'],
    ['chibi_felix_2', 'char-felix-chibi-grey-jacket', 'Chibi'],
    ['char-felix-chibi-jacket-over-shoulder', 'char-felix-chibi-jacket-over-shoulder', 'Chibi'],
    ['char-felix-chibi-laughing-bow', 'char-felix-chibi-laughing-bow', 'Chibi']
  ]
};

export async function assertChibiCard(page, name, expectedIndex) {
  const card = page.locator(`[data-name="${name}"]`);
  await card.evaluate(element => element.scrollIntoView({ block: 'center' }));
  await page.waitForFunction(name => {
    const img = document.querySelector(`[data-name="${name}"] .character-chibi`);
    return img?.complete && img.naturalWidth > 0 && img.currentSrc.endsWith('.webp');
  }, name);
  const filename = (await card.locator('.character-chibi').getAttribute('src')).split('/').pop().replace(/^PREV-/, '').replace(/-img-\d{6}\.webp$/, '');
  const chosen = chibiOutfits[name].findIndex(outfit => outfit[1] === filename);
  assert.ok(chosen >= 0, `${name}: unregistered chibi selected`);
  if (expectedIndex !== undefined) assert.equal(chosen, expectedIndex, `${name}: randomization must reach every outfit`);
  assert.equal(await card.locator('.art-note').textContent(), chibiOutfits[name][chosen][2]);
  assert.ok(await card.locator('.art-note').evaluate(note => {
    const bounds = note.getBoundingClientRect(), art = note.parentElement.getBoundingClientRect();
    return bounds.left >= art.left && bounds.right <= art.right && getComputedStyle(note).backgroundColor !== 'rgba(0, 0, 0, 0)';
  }), 'Chibi labels need a legible backing and must stay inside the artwork bay');
  return card;
}

export async function testChibiOutfits(page, origin, engine) {
  // Deterministic samples exercise all choices, without a flaky probabilistic reload test.
  await page.addInitScript(() => {
    const sample = new URL(location.href).searchParams.get('chibi-test');
    if (sample !== null) Math.random = () => (Number(sample) + 0.5) / 4;
  });
  const search = JSON.parse(fs.readFileSync('search-index.json', 'utf8')).entries;
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (let index = 0; index < 4; index++) {
      await page.goto(`${origin}/characters.html?chibi-test=${index}`);
      await page.waitForLoadState('networkidle');
      for (const name of Object.keys(chibiOutfits)) {
        const card = await assertChibiCard(page, name, index);
        await card.screenshot({ path: `test-results/${engine}-${name.toLowerCase()}-outfit-${index}-${width}.png` });
      }
      await page.goto(`${origin}/gallery.html?chibi-test=${index}`);
      await page.waitForLoadState('networkidle');
      await page.locator('#gallery-chibi-filter').check({ force: true });
      for (const [name, outfits] of Object.entries(chibiOutfits)) {
        const cards = page.locator(`.gallery-card[data-artwork-stack="${name.toLowerCase()}-chibis"]`);
        assert.equal(await cards.count(), outfits.length);
        const visible = page.locator(`.gallery-card[data-artwork-stack="${name.toLowerCase()}-chibis"]:not([hidden])`);
        assert.equal(await visible.count(), 1, 'Each outfit stack needs one catalog tile');
        assert.equal(await visible.getAttribute('data-image'), outfits[index][0]);
      }
    }
    for (const [name, outfits] of Object.entries(chibiOutfits)) {
      await page.goto(`${origin}/gallery.html?image=${outfits[0][0]}`);
      await page.waitForLoadState('networkidle');
      for (let index = 0; index < outfits.length; index++) {
        const [id, filename, note] = outfits[index];
        const nav = page.locator('#gallery-image-versions');
        assert.equal(await nav.locator('a').count(), outfits.length);
        if (index) {
          await nav.locator(`a[href="gallery.html?image=${id}"]`).focus();
          await page.keyboard.press('Enter');
          await page.waitForURL(`**/gallery.html?image=${id}`);
          await page.waitForLoadState('networkidle');
        }
        assert.equal(await nav.locator('a[aria-current="page"]').getAttribute('href'), `gallery.html?image=${id}`);
        const image = page.locator('#gallery-detail-image');
        await image.evaluate(img => img.decode());
        assert.deepEqual(await image.evaluate(img => [img.naturalWidth, img.naturalHeight]), [1254, 1254]);
        assert.equal(await page.locator('#gallery-detail-title').textContent(), `${name} - chibis`);
        if (note.includes('Costume study')) assert.ok((await page.locator('#gallery-detail-type').textContent()).includes('Costume study'));
        const source = publishedImagePath(`media/gallery/images/chibis/${filename}.png`);
        assert.equal(await page.locator('#gallery-detail-source').getAttribute('href'), source);
        assert.ok(search.some(entry => entry.url === `gallery.html?image=${id}`));
        const response = await page.request.get(`${origin}/${source}`);
        assert.equal(response.status(), 200);
        assert.deepEqual(await response.body(), fs.readFileSync(source));
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      }
      await page.screenshot({ path: `test-results/${engine}-${name.toLowerCase()}-chibi-stack-${width}.png` });
      await page.goto(`${origin}/character.html?character=${name.toLowerCase()}`);
      await page.waitForLoadState('networkidle');
      assert.ok(await page.locator('.profile-portrait-strip img').count() > 0);
      assert.equal(await page.locator('.profile-portrait-strip img, .profile-art-thumbnails img').evaluateAll(images => images.some(img => img.src.includes('/chibis/'))), false, 'Chibis must stay out of full-size profile portraits');
    }
  }
  console.log(`${engine}: eight Kyrien/Felix chibis, randomized cards/stacks, era/study labels, keyboard selection and original downloads passed`);
}
