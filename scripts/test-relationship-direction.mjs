import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testRelationshipDirection(page, origin, engine) {
  const visit = async route => {
    await page.goto(`${origin}/${route}`);
    await page.waitForLoadState('networkidle');
  };
  const artwork = 'char-lynleit-kyrien-arc-1-park-bank';
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [slug, phrase] of [['kyrien', 'belonging to God'], ['lynleit', 'Moon lake']]) {
      await visit(`character.html?character=${slug}#name-meaning-title`);
      assert.ok(await page.locator('#character-name-section').isVisible());
      assert.ok((await page.locator('#character-name-meaning').textContent()).includes(phrase));
      assert.equal(await page.locator(`.profile-art-thumbnails img[src*="${artwork}"]`).count(), 0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.locator('#character-name-section').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `test-results/${engine}-${slug}-name-${width}.png` });
    }
    await visit(`gallery.html?image=${artwork}`);
    await page.locator('#gallery-detail-image').evaluate(image => image.decode());
    assert.equal(await page.locator('#gallery-detail-image').evaluate(image => `${image.naturalWidth}x${image.naturalHeight}`), '1448x1584');
    assert.equal(await page.locator('#gallery-detail-moment').getAttribute('href'), `${origin}/moments.html?moment=the-boat-beneath-the-bridge&version=v4`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `test-results/${engine}-park-bank-artwork-${width}.png`, fullPage: true });
  }
  const asset = `media/gallery/images/characters/${artwork}.png`;
  assert.deepEqual(await (await page.request.get(`${origin}/${asset}`)).body(), fs.readFileSync(asset));
  await visit('gallery.html');
  for (const slug of ['lynleit', 'kyrien']) {
    await page.locator('#gallery-character-filter').selectOption(slug);
    assert.ok(await page.locator(`.gallery-card[data-image="${artwork}"]`).isVisible());
  }
  await visit('moments.html?moment=the-boat-beneath-the-bridge&version=v4');
  assert.ok(await page.locator(`#moment-connection-grid a[href="gallery.html?image=${artwork}"]`).isVisible());
  await visit('moments.html?moment=the-boat-beneath-the-bridge&version=v1');
  assert.equal(await page.locator(`#moment-connection-grid a[href="gallery.html?image=${artwork}"]`).count(), 0);
  await visit('docs.html?doc=character-intimacy-and-sexuality');
  assert.equal(await page.getByRole('heading', { name: 'Sherie and Felix: company worth missing', exact: true }).count(), 1);
  assert.ok((await page.locator('#document-reader').textContent()).includes('unresolved harmony'));
  await page.getByRole('combobox', { name: 'Choose version' }).selectOption('v17');
  await page.waitForURL('**/docs.html?doc=character-intimacy-and-sexuality&version=v17');
  await page.waitForLoadState('networkidle');
  assert.equal(await page.getByRole('heading', { name: 'Sherie and Felix: company worth missing', exact: true }).count(), 0);
  assert.ok(!(await page.locator('#document-reader').textContent()).includes('accommodating his hopes'));
  for (const slug of ['sherie', 'felix']) {
    await visit(`character.html?character=${slug}`);
    assert.ok(await page.locator('#character-name-section').isHidden());
    await page.locator(`.relationship-node[data-slug="${slug === 'sherie' ? 'felix' : 'sherie'}"]`).click();
    assert.ok((await page.locator('.relationship-map-detail-body').textContent()).includes(slug === 'sherie' ? 'without an invitation' : 'learning the changes in her voice'));
  }
  const entries = JSON.parse(fs.readFileSync('search-index.json', 'utf8')).entries;
  for (const slug of ['lynleit', 'kyrien']) {
    assert.ok(entries.some(entry => entry.url === `character.html?character=${slug}#name-meaning-title`));
  }
  assert.ok(entries.some(entry => entry.url === `gallery.html?image=${artwork}`));
  const panels = JSON.parse(fs.readFileSync('gallery/panels.json', 'utf8'));
  assert.ok(!JSON.stringify(panels).includes(artwork));
  console.log(`${engine}: name sections, relationship history, park artwork, links, filters, and source download passed.`);
}
