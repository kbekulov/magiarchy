import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testSeasonalWardrobe(page, origin, engine) {
  const ledger = JSON.parse(fs.readFileSync('gallery/image-identities.json', 'utf8'));
  const images = ledger.images.filter(record => record.active && record.source.includes('/characters/seasonal/'));
  assert.ok(images.length >= 14);
  const search = JSON.parse(fs.readFileSync('search-index.json', 'utf8'));
  const entries = Array.isArray(search) ? search : search.entries;
  const lynleitWinter = images.filter(record => record.source.includes('/seasonal/lynleit/winter/'));
  assert.deepEqual(lynleitWinter.map(record => record.id).sort(), ['IMG-000243', 'IMG-000244']);
  const retiredWinter = ledger.images.find(record => record.id === 'IMG-000237');
  assert.equal(retiredWinter.active, false, 'The withdrawn winter image keeps its reserved identity');
  assert.ok([retiredWinter.source, ...retiredWinter.derivatives].every(file => !fs.existsSync(file)));
  assert.ok(!entries.some(entry => entry.url === 'gallery.html?image=char-lynleit-seasonal-winter-navy-coat'));
  const winterViews = [
    'char-lynleit-seasonal-winter-blue-fur-trimmed-cape-front',
    'char-lynleit-seasonal-winter-blue-fur-trimmed-cape-rear-three-quarter'
  ];
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true, value: { writeText: async value => { window.seasonalCopiedId = value; } }
  }));
  const visit = async route => {
    await page.goto(`${origin}/${route}`);
    await page.waitForLoadState('networkidle');
  };
  const visible = () => page.locator('.gallery-card:not([hidden])');
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await visit('gallery.html?season=seasonal');
    const cards = await page.locator('.gallery-card[data-season]').evaluateAll(nodes => nodes.map(node => ({
      id: node.dataset.image, character: node.dataset.character, season: node.dataset.season,
      stack: node.dataset.artworkStack, source: node.querySelector('img').getAttribute('src'), superseded: node.dataset.imageRevisionSuperseded === 'true'
    })));
    assert.equal(cards.length, images.length);
    assert.equal(await visible().count(), new Set(cards.map(card => card.character)).size);
    assert.equal(await page.locator('#gallery-season-filter').inputValue(), 'seasonal');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.locator('#gallery-toolbar').screenshot({ path: `test-results/${engine}-seasonal-toolbar-${width}.png` });
    for (const season of ['spring', 'summer', 'autumn', 'winter']) {
      await page.locator('#gallery-season-filter').selectOption(season);
      assert.equal(new URL(page.url()).searchParams.get('season'), season);
      const expected = new Set(cards.filter(card => card.season === season).map(card => card.character)).size;
      assert.equal(await visible().count(), expected);
      assert.equal(await page.locator('#gallery-result-count').textContent(), String(expected));
      assert.ok((await visible().evaluateAll(nodes => nodes.map(node => node.dataset.season))).every(value => value === season));
    }
    await page.reload();
    assert.equal(await page.locator('#gallery-season-filter').inputValue(), 'winter');
    await page.locator('#gallery-character-filter').selectOption('kyrien');
    assert.equal(await visible().count(), 1);
    assert.equal(await visible().getAttribute('data-image'), 'char-kyrien-seasonal-winter-charcoal-peacoat');
    await page.locator('#gallery-chibi-filter').check({ force: true });
    assert.equal(await visible().count(), 0);
    assert.ok(await page.locator('#gallery-empty-state').isVisible());
    await page.locator('#gallery-exclude-chibi-filter').check({ force: true });
    assert.equal(await visible().count(), 1);
    await page.locator('#gallery-pencil-filter').check({ force: true });
    assert.equal(await visible().count(), 0);
    await page.locator('#gallery-colored-filter').check({ force: true });
    assert.equal(await visible().count(), 1);
    await page.locator('#gallery-fan-service-filter').check({ force: true });
    assert.equal(await visible().count(), 0, 'Seasonal wardrobe is not classified as Fan Service');
    await page.locator('#gallery-include-fan-service-filter').check({ force: true });
    assert.equal(await visible().count(), 1);
    await visible().locator(':scope > a').click();
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('#gallery-detail-title').textContent(), 'Kyrien - Seasonal wardrobe');
    assert.equal(await page.locator('#gallery-image-versions > .eyebrow').textContent(), 'Seasonal outfits');
    assert.deepEqual(await page.locator('.gallery-variant-category').allTextContents(), ['Autumn', 'Winter']);
    assert.equal(await page.locator('#gallery-image-versions a').count(), 3);
    const autumn = page.locator('#gallery-image-versions a[href$="char-kyrien-seasonal-autumn-blue-shirt"]');
    await autumn.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL('**/gallery.html?image=char-kyrien-seasonal-autumn-blue-shirt');
    await page.waitForLoadState('networkidle');
    assert.match(await page.locator('#gallery-detail-type').textContent(), /Autumn.*Blue shirt/);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.locator('#gallery-reader-view').screenshot({ path: `test-results/${engine}-seasonal-reader-${width}.png` });
    const badge = page.locator('#gallery-reader-view .image-id-copy:visible');
    await badge.focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => window.seasonalCopiedId), await badge.getAttribute('data-image-id'));
    await visit('gallery.html?season=unknown');
    assert.equal(await page.locator('#gallery-season-filter').inputValue(), 'all');
    if (width === 1440) {
      for (const card of cards) {
        const identity = images.find(image => image.source === card.source);
        assert.ok(identity, `${card.id}: original registered`);
        assert.match(identity.source, /\/FULL-char-.+-seasonal-(spring|summer|autumn|winter)-.+-img-\d{6}\.png$/);
        assert.ok(entries.some(entry => entry.url === `gallery.html?image=${card.id}` && (entry.current !== false) === !card.superseded), `${card.id}: search respects current and retained artwork`);
        await visit(`gallery.html?image=${card.id}`);
        await page.locator('#gallery-detail-image').evaluate(image => image.decode());
        assert.equal(await page.locator('#gallery-detail-source').getAttribute('href'), identity.source);
        assert.equal(await page.locator('#gallery-reader-view .image-id-copy:visible').getAttribute('data-image-id'), identity.id);
        const original = await page.request.get(`${origin}/${identity.source}`);
        assert.ok(original.ok());
        assert.deepEqual(await original.body(), fs.readFileSync(identity.source));
        for (const preview of identity.derivatives) assert.ok((await page.request.get(`${origin}/${preview}`)).ok());
      }
    }
    await visit('gallery.html?collection=panels&season=winter');
    assert.ok(await page.locator('#gallery-season-filter').isHidden());
    await visit('gallery.html?collection=production&season=winter');
    assert.ok(await page.locator('#gallery-season-filter').isHidden());
    await visit('gallery.html?season=winter');
    await page.locator('#gallery-character-filter').selectOption('lynleit');
    assert.equal(await visible().count(), 1, 'The two new views share one seasonal card');
    assert.equal(await page.locator('.gallery-card[data-artwork-stack="lynleit-seasonal-wardrobe"]').count(), 2);
    assert.equal(await page.locator('[data-image="char-lynleit-seasonal-winter-navy-coat"]').count(), 0);
    await visible().locator(':scope > a').click();
    await page.waitForLoadState('networkidle');
    assert.deepEqual(await page.locator('.gallery-variant-category').allTextContents(), ['Winter']);
    assert.equal(await page.locator('#gallery-image-versions a').count(), 2);
    for (const id of winterViews) {
      await page.locator(`#gallery-image-versions a[href="gallery.html?image=${id}"]`).click();
      await page.waitForLoadState('networkidle');
      assert.equal(new URL(page.url()).searchParams.get('image'), id);
      assert.match(await page.locator('#gallery-detail-type').textContent(), /Blue fur-trimmed cape/);
    }
    await page.locator('#gallery-reader-view').screenshot({ path: `test-results/${engine}-lynleit-winter-cape-${width}.png` });
    await visit('character.html?character=lynleit');
    assert.equal(await page.locator('.profile-art-thumbnails img[src*="img-000237"]').count(), 0);
    for (const identity of lynleitWinter) {
      const thumb = page.locator(`.profile-art-thumbnails img[src="${identity.derivatives[0]}"]`);
      assert.equal(await thumb.count(), 1);
      await thumb.locator('..').click();
      assert.equal(await page.locator('.profile-portrait-strip img:not([aria-hidden])').getAttribute('src'), identity.source);
    }
  }
  const touch = await page.context().browser().newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  try {
    const phone = await touch.newPage();
    await phone.goto(`${origin}/gallery.html?image=char-drake-seasonal-summer-charcoal-waistcoat`);
    await phone.locator('#gallery-image-versions a[href$="char-drake-seasonal-winter-black-overcoat"]').tap();
    await phone.waitForURL('**/gallery.html?image=char-drake-seasonal-winter-black-overcoat');
    await phone.waitForLoadState('networkidle');
    assert.match(await phone.locator('#gallery-detail-type').textContent(), /Winter/);
  } finally { await touch.close(); }
  console.log(`${engine}: seasonal stacks, filters, all original downloads, IDs, search, responsive readers and touch passed.`);
}
