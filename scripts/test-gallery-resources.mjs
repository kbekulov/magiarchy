import assert from 'node:assert/strict';
import fs from 'node:fs';

// Check published assets before exercising edge cases with private fixtures.
export async function testGalleryResources(page, origin, engine) {
  const visit = async route => { await page.goto(`${origin}/${route}`); await page.waitForLoadState('networkidle'); };
  await visit('gallery.html?collection=production');
  if (JSON.parse(fs.readFileSync('gallery/resources.json', 'utf8')).length === 0) {
    assert.ok(await page.getByRole('heading', { name: 'No production resources yet' }).isVisible());
    assert.equal(await page.locator('#resource-downloads a').count(), 0);
    await page.screenshot({ path: `test-results/${engine}-production-empty.png` });
  }
  const published = JSON.parse(fs.readFileSync('gallery/resources.json', 'utf8'));
  for (const record of published.filter(record => record.id.startsWith('author-mascot-'))) {
    assert.deepEqual(record.characters, [], 'Mascot references must not enter story character pools');
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await visit(`gallery.html?resource=${record.id}`);
      assert.equal(await page.locator('#resource-thumbnails button').count(), 2);
      assert.ok((await page.locator('#resource-summary').textContent()).includes('Not a character in story canon'));
      assert.equal(await page.locator('#resource-downloads a[download]').count(), 2);
      await page.locator('#resource-thumbnails button').nth(1).click();
      assert.equal(await page.locator('#resource-image').getAttribute('src'), record.previews[1].src);
      assert.ok(page.url().includes('view=back'));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.screenshot({ path: `test-results/${engine}-${record.id}-${width}.png`, fullPage: true });
    }
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#resource-downloads a').first().click()]);
    assert.deepEqual(fs.readFileSync(await download.path()), fs.readFileSync(record.files[0].path), 'Original PNG downloads must be byte-identical');
  }
  const preview = (id, number) => ({ id, src: `media/gallery/images/characters/char-lynleit-${number}.png`, thumbnail: `media/gallery/previews/characters/char-lynleit-${number}.webp`, alt: `Test ${id} view`, caption: `${id} view`, width: 1024, height: 1024 });
  const records = [
    { id: 'test-pose-v1', title: 'Lynleit reference set', kind: 't-pose', modelVersion: 'Model v1', era: 'Arc 2', summary: 'Private UI test fixture for a same-version reference set.', characters: ['lynleit'], previews: [preview('front', 1), preview('back', 2)], files: [{ path: 'media/gallery/resources/test-pose-v1/model source.blend', label: 'Source project with a long descriptive filename', format: 'BLEND', bytes: 12, notes: 'Private test download.' }], technical: [{ label: 'Software', value: 'Test application' }], usage: 'Test fixture only.', artwork: ['char-lynleit-felix-1'] },
    { id: 'test-pose-v2', title: 'Lynleit alternate reference', kind: 'reference-sheet', modelVersion: 'Model v2', summary: 'Private UI test fixture for a separate revision.', characters: ['lynleit'], previews: [preview('side', 0)], files: [] },
    { id: 'test-model', title: 'Felix model', kind: '3d-model', summary: 'Private UI fixture without preview art.', characters: ['felix'], previews: [], files: [{ path: 'media/gallery/resources/test-model/model.zip', label: 'Model bundle', format: 'ZIP', bytes: 12 }] },
    { id: 'test-sketch', title: 'Development sketch', kind: 'sketch', summary: 'Private UI fixture for a preview-only drawing.', characters: [], previews: [preview('drawing', 1)], files: [] }
  ];
  await page.route('**/gallery/resources.json', route => route.fulfill({ json: records }));
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('gallery.html?collection=production');
    assert.equal(await page.locator('.production-card:visible').count(), 4);
    assert.equal(await page.locator('.gallery-card:visible').count(), 0);
    await page.locator('#resource-kind').selectOption('t-pose');
    assert.equal(await page.locator('.production-card:visible').count(), 1);
    await page.locator('#resource-character').selectOption('felix');
    assert.ok(await page.getByRole('heading', { name: 'No matching resources' }).isVisible());
    await page.locator('#resource-reset').click();
    await page.locator('#resource-search').fill('BLEND');
    assert.equal(await page.locator('.production-card:visible').count(), 1);
    await page.reload(); await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('#resource-search').inputValue(), 'BLEND');
    await page.locator('.production-card:visible > a').click();
    await page.waitForSelector('#resource-reader:not([hidden])');
    assert.equal(await page.locator('#resource-thumbnails button').count(), 2);
    assert.ok((await page.locator('#resource-type').textContent()).includes('Model v1'));
    assert.equal(await page.locator('#resource-image').evaluate(image => getComputedStyle(image).objectFit), 'contain');
    await page.locator('#resource-thumbnails button').nth(1).click();
    assert.ok(page.url().includes('view=back'));
    assert.equal(await page.locator('#resource-image').getAttribute('alt'), 'Test back view');
    const front = page.locator('#resource-thumbnails button').first();
    await front.focus(); await page.keyboard.press('Enter');
    assert.equal(await front.getAttribute('aria-pressed'), 'true');
    assert.ok(await page.locator('#resource-downloads a[download]').isVisible());
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#resource-downloads a').click()]);
    assert.equal(download.suggestedFilename(), 'model source.blend');
    assert.equal(fs.readFileSync(await download.path(), 'utf8'), 'test fixture');
    assert.ok(await page.locator('#resource-related a').isVisible());
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Resource overflow/${width}`);
    await page.screenshot({ path: `test-results/${engine}-resource-detail-${width}.png`, fullPage: true });
    await page.locator('#resource-back').click();
    await page.waitForSelector('.production-card');
    assert.equal(await page.locator('#resource-search').inputValue(), 'BLEND');
    await visit('gallery.html?resource=test-pose-v1&view=back');
    assert.equal(await page.locator('#resource-image').getAttribute('alt'), 'Test back view');
    await visit('gallery.html?resource=test-pose-v2');
    assert.equal(await page.locator('#resource-thumbnails button').count(), 1, 'Different model versions must not become siblings');
    assert.ok(await page.locator('#resource-no-files').isVisible());
    await visit('gallery.html?resource=test-model');
    assert.ok(await page.locator('#resource-no-preview').isVisible());
    assert.equal(await page.locator('#resource-image').getAttribute('src'), null);
    assert.ok(await page.locator('#resource-original').isHidden());
    await visit('gallery.html?collection=production');
    await page.screenshot({ path: `test-results/${engine}-production-catalog-${width}.png`, fullPage: true });
  }
  await visit('gallery.html?resource=unknown');
  assert.ok(await page.getByRole('heading', { name: 'Resource not found' }).isVisible());
  await page.unroute('**/gallery/resources.json');
  await page.route('**/gallery/resources.json', route => route.fulfill({ status: 503, body: 'Unavailable' }));
  await visit('gallery.html?collection=production');
  assert.ok((await page.locator('#resource-results').textContent()).includes('could not be loaded'));
  await page.unroute('**/gallery/resources.json');

  await page.route('**/gallery.html?*', async route => {
    const response = await route.fetch();
    const body = (await response.text()).replace(/<figure class="gallery-card[^>]*>[\s\S]*?<\/figure>/g, card => {
      const id = card.match(/char-lynleit-([012])\.png/)?.[1];
      return id == null ? card : card.replace('<figure ', `<figure data-sibling-group="test-group" data-model-version="${id === '0' ? 'v2' : 'v1'}" `);
    });
    await route.fulfill({ response, body });
  });
  await visit('gallery.html?image=char-lynleit-1');
  assert.equal(await page.locator('#gallery-siblings a').count(), 2);
  await page.locator('#gallery-siblings a:not([aria-current])').click();
  await page.waitForLoadState('networkidle');
  assert.ok(page.url().includes('image=char-lynleit-2'));
  assert.equal(await page.locator('#gallery-siblings a[aria-current]').count(), 1);
  await visit('gallery.html?image=char-lynleit-0');
  assert.ok(await page.locator('#gallery-siblings').isHidden(), 'Unrelated model revision leaked into siblings');
  await page.unroute('**/gallery.html?*');
  const touch = await page.context().browser().newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, reducedMotion: 'reduce' });
  try {
    await touch.route('https://**/*', route => route.abort());
    await touch.route('**/gallery/resources.json', route => route.fulfill({ json: records }));
    await touch.goto(`${origin}/gallery.html?resource=test-pose-v1`);
    await touch.locator('#resource-thumbnails button').nth(1).tap();
    assert.equal(await touch.locator('#resource-image').getAttribute('alt'), 'Test back view');
    assert.ok(touch.url().includes('view=back'));
  } finally { await touch.close(); }
  console.log(`${engine}: production filters, sibling version isolation, preview URLs, keyboard controls, downloads, and empty/error states passed.`);
}
