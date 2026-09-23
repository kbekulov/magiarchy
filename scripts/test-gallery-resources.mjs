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
  const kyrien = published.filter(record => record.characters.includes('kyrien'));
  assert.equal(kyrien.length, 1, 'Only the selected Kyrien design should be published');
  assert.deepEqual(kyrien[0].previews.map(view => view.id), ['front', 'back']);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('gallery.html?resource=kyrien-beige-jacket');
    assert.equal(await page.locator('#resource-thumbnails button').count(), 2);
    assert.equal(await page.locator('#resource-downloads a[download]').count(), 2);
    await page.locator('#resource-thumbnails button').nth(1).click();
    assert.equal(await page.locator('#resource-image').getAttribute('src'), kyrien[0].previews[1].src);
    assert.ok(page.url().includes('view=back'));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `test-results/${engine}-kyrien-reference-${width}.png`, fullPage: true });
    await visit('characters.html');
    assert.equal(await page.locator('[data-name="Kyrien"] img').count(), 0, 'Withdrawn chibi still displayed');
    assert.ok(await page.locator('[data-name="Kyrien"] .chibi-placeholder').isVisible());
    await visit('character.html?character=kyrien');
    assert.equal(await page.locator('#character-profile-portrait img').count(), 0, 'Withdrawn portrait still displayed');
    assert.ok(await page.locator('#character-profile-portrait .profile-portrait-placeholder').isVisible());
    const profileText = await page.locator('main').innerText();
    for (const detail of ['clear middle part', 'slightly heavy upper lids', 'restrained shoulder width', 'modestly taller than Lynleit', 'Balanced, relaxed posture']) {
      assert.ok(profileText.includes(detail), `Kyrien profile missing fixed design: ${detail}`);
    }
  }
  await visit('gallery.html');
  assert.equal(await page.locator('.gallery-card[data-character~="kyrien"]').count(), 3);
  assert.equal(await page.locator('.gallery-card[data-character~="kyrien"][data-profile-portrait="false"]').count(), 3, 'Concept sheets and lineup sketches must stay outside the portrait pool');
  const lineupId = 'char-drake-sherie-kyrien-lynleit-felix-lineup-sketch-01';
  for (const slug of ['drake', 'sherie', 'kyrien', 'lynleit', 'felix']) {
    await page.locator('#gallery-character-filter').selectOption(slug);
    assert.ok(await page.locator(`.gallery-card[data-image="${lineupId}"]`).isVisible(), `${slug}: lineup missing from filter`);
  }
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit(`gallery.html?image=${lineupId}`);
    assert.equal(await page.locator('#gallery-detail-title').textContent(), 'Character lineup sketch');
    assert.equal(await page.locator('#gallery-detail-image').getAttribute('src'), `media/gallery/images/characters/${lineupId}.png`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    const response = await page.request.get(new URL(await page.locator('#gallery-detail-source').getAttribute('href'), origin).href);
    assert.deepEqual(await response.body(), fs.readFileSync(`media/gallery/images/characters/${lineupId}.png`));
    await page.screenshot({ path: `test-results/${engine}-character-lineup-${width}.png`, fullPage: true });
  }
  for (const view of ['closeup', 'standing']) {
    const id = `char-kyrien-concept-${view}-three-variants`;
    await visit(`gallery.html?image=${id}`);
    assert.ok((await page.locator('#gallery-detail-type').textContent()).includes('Concept artwork'));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    const response = await page.request.get(`${origin}/media/gallery/images/characters/${id}.png`);
    assert.ok(response.ok());
    assert.deepEqual(await response.body(), fs.readFileSync(`media/gallery/images/characters/${id}.png`));
    await page.screenshot({ path: `test-results/${engine}-kyrien-concept-${view}.png`, fullPage: true });
  }
  await visit('gallery.html');
  await page.locator('#gallery-character-filter').selectOption('anima');
  assert.equal(await page.locator('.gallery-card:visible').count(), 1);
  assert.equal(await page.locator('.gallery-card:visible').getAttribute('data-chibi'), 'false');
  await page.locator('.gallery-card:visible > a').click();
  await page.waitForLoadState('networkidle');
  assert.equal(await page.locator('#gallery-detail-title').textContent(), 'Anima');
  assert.ok((await page.locator('#gallery-detail-type').textContent()).includes('Outside story canon'));
  assert.ok(await page.locator('#gallery-detail-resource').isVisible());
  await page.locator('#gallery-detail-resource').click();
  await page.waitForLoadState('networkidle');
  assert.ok(page.url().includes('resource=author-mascot-red-drapery'));
  assert.ok(await page.locator('#resource-related a[href*="char-anima-red-drapery-artwork-01"]').isVisible());
  assert.ok(!fs.readFileSync('character.js', 'utf8').includes("slug: 'anima'"), 'Mascot must not become a story character');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('gallery.html?collection=production');
    for (const record of published.filter(record => record.template)) {
      const card = page.locator(`[data-resource="${record.id}"]`);
      assert.equal(await card.locator('h2').textContent(), record.title);
      assert.equal(await card.locator('.resource-template-badge').textContent(), 'Template');
    }
    const style = await page.locator('#resource-kind').evaluate(el => { const s = getComputedStyle(el); return { position: s.backgroundPosition, padding: s.paddingRight, appearance: s.appearance }; });
    assert.equal(style.padding, '38px');
    assert.equal(style.appearance, 'none');
    assert.ok(style.position.includes('12px'));
    await page.screenshot({ path: `test-results/${engine}-template-catalog-${width}.png`, fullPage: true });
  }
  for (const record of published.filter(record => record.id.startsWith('author-mascot-'))) {
    assert.deepEqual(record.characters, [], 'Mascot references must not enter story character pools');
    assert.equal(record.nonCanon, true);
    for (const file of record.files) assert.match(file.path.split('/').pop(), /^anima-t-pose-(black-gold|red-drapery)-(front|back)\.png$/);
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await visit(`gallery.html?resource=${record.id}`);
      assert.equal(await page.locator('#resource-thumbnails button').count(), 2);
      assert.equal(await page.locator('#resource-summary a').count(), 0, 'Mascot nickname must not link to story lore');
      assert.ok((await page.locator('#resource-summary').textContent()).includes('Not a character in story canon'));
      assert.equal(await page.locator('#resource-downloads a[download]').count(), 2);
      await page.locator('#resource-thumbnails button').nth(1).click();
      assert.equal(await page.locator('#resource-image').getAttribute('src'), record.previews[1].src);
      assert.ok(page.url().includes('view=back'));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.screenshot({ path: `test-results/${engine}-${record.id}-${width}.png`, fullPage: true });
    }
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#resource-downloads a').first().click()]);
    assert.equal(download.suggestedFilename(), record.files[0].path.split('/').pop());
    assert.deepEqual(fs.readFileSync(await download.path()), fs.readFileSync(record.files[0].path), 'Original PNG downloads must be byte-identical');
  }
  const preview = (id, number) => ({ id, src: `media/gallery/images/characters/char-lynleit-${number}.png`, thumbnail: `media/gallery/previews/characters/char-lynleit-${number}.webp`, alt: `Test ${id} view`, caption: `${id} view`, width: 1024, height: 1024 });
  const referenceIds = ['felix-t-pose-v1', 'lynleit-t-pose-v1', 'lynleit-t-pose-v2'];
  assert.ok(referenceIds.every(id => published.some(record => record.id === id)), 'Missing supplied T-pose set');
  assert.equal(published.find(record => record.id === 'lynleit-t-pose-v1').modelVersion, 'Young / teenager');
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('gallery.html?collection=production');
    await page.locator('#resource-character').selectOption('lynleit');
    assert.equal(await page.locator('.production-card:visible').count(), published.filter(record => record.characters.includes('lynleit')).length);
    await page.locator('#resource-character').selectOption('felix');
    assert.equal(await page.locator('.production-card:visible').count(), 1);
    for (const record of published.filter(record => referenceIds.includes(record.id))) {
      assert.equal(record.era, record.id === 'lynleit-t-pose-v1' ? 'Arc 1' : undefined, 'Design revision must not imply an Arc');
      assert.equal(record.template, undefined, 'Character references must not replace the mascot template');
      assert.deepEqual(record.previews.map(view => [view.width, view.height]), [[1122, 1402], [1122, 1402]]);
      assert.ok(record.previews.find(view => view.id === 'front').src.endsWith('-arm-corrected-front.png'), 'Keep the approved front view');
      assert.ok(record.previews.find(view => view.id === 'back').src.endsWith('-arm-hand-corrected-back.png'), 'Back view must use the corrected hands');
      assert.ok(record.previews.find(view => view.id === 'back').thumbnail.endsWith('-r2.webp'), 'Back thumbnail must not reuse the previous cached revision');
      await visit(`gallery.html?resource=${record.id}&view=front`);
      assert.equal(await page.locator('#resource-title').textContent(), record.title);
      assert.equal(await page.locator('#resource-thumbnails button').count(), 2);
      assert.equal(await page.locator('#resource-downloads a[download]').count(), 2);
      assert.equal(await page.getByText('Original two-view sheet', { exact: true }).count(), 0, 'Source sheets belong in the archive, not public downloads');
      assert.equal(await page.locator('#resource-downloads small a').count(), 0, 'Filename text must not become profile links');
      assert.deepEqual(await page.locator('#resource-downloads small').allTextContents(), record.files.map(file => file.path.split('/').pop()));
      assert.ok(await page.locator(`#resource-characters a[href="character.html?character=${record.characters[0]}"]`).isVisible());
      assert.equal(await page.locator('.gallery-card:visible').count(), 0, 'Production references leaked into artwork');
      await page.locator('#resource-thumbnails button').nth(1).click();
      assert.equal(await page.locator('#resource-image').getAttribute('src'), record.previews[1].src);
      assert.ok(page.url().includes('view=back'));
      await page.reload(); await page.waitForLoadState('networkidle');
      assert.equal(await page.locator('#resource-image').getAttribute('src'), record.previews[1].src);
      assert.equal(await page.locator('#resource-image').evaluate(image => getComputedStyle(image).objectFit), 'contain');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.locator('#resource-image').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `test-results/${engine}-${record.id}-${width}.png`, fullPage: width < 820 });
      if (width === 1440) {
        for (const file of record.files) {
          assert.match(file.path.split('/').pop(), /^char-(felix|lynleit)-(arc-1-)?t-pose-v[12]-(arm-corrected-front|arm-hand-corrected-back)\.png$/);
          const [download] = await Promise.all([page.waitForEvent('download'), page.locator(`#resource-downloads a[href="${file.path}"]`).click()]);
          assert.equal(download.suggestedFilename(), file.path.split('/').pop());
          assert.deepEqual(fs.readFileSync(await download.path()), fs.readFileSync(file.path));
        }
      }
    }
  }
  const arcTwo = published.find(record => record.id === 'lynleit-arc-2-t-pose');
  assert.ok(arcTwo, 'Missing Arc 2 T-pose set');
  assert.equal(arcTwo.era, 'Arc 2');
  assert.deepEqual(arcTwo.characters, ['lynleit']);
  assert.deepEqual(arcTwo.previews.map(view => [view.width, view.height]), [[1122, 1402], [1122, 1402]]);
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit(`gallery.html?resource=${arcTwo.id}&view=back`);
    assert.ok((await page.locator('#resource-type').textContent()).includes('Arc 2'));
    assert.equal(await page.locator('#resource-image').getAttribute('src'), arcTwo.previews[1].src);
    assert.equal(await page.locator('#resource-thumbnails button').count(), 2);
    assert.equal(await page.locator('#resource-downloads a[download]').count(), 2);
    await page.getByRole('button', { name: 'Arc 2 · Front', exact: true }).click();
    assert.equal(await page.locator('#resource-image').getAttribute('src'), arcTwo.previews[0].src);
    assert.ok(page.url().includes('view=front'));
    assert.equal(await page.locator('.gallery-card:visible').count(), 0);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `test-results/${engine}-${arcTwo.id}-${width}.png`, fullPage: true });
  }
  for (const file of arcTwo.files) {
    assert.match(file.path.split('/').pop(), /^char-lynleit-arc-2-t-pose-(front|back)\.png$/);
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator(`#resource-downloads a[href="${file.path}"]`).click()]);
    assert.equal(download.suggestedFilename(), file.path.split('/').pop());
    assert.deepEqual(fs.readFileSync(await download.path()), fs.readFileSync(file.path));
  }
  await visit('docs.html?doc=character-image-production');
  const productionGuide = JSON.parse(fs.readFileSync('docs/index.json', 'utf8')).find(record => record.slug === 'character-image-production');
  assert.equal(await page.getByRole('combobox', { name: 'Choose version' }).inputValue(), productionGuide.defaultVersion);
  assert.ok(await page.getByRole('heading', { name: 'Kyrien: fixed character design', exact: true }).isVisible());
  assert.ok(await page.getByRole('heading', { name: 'Separating supplied T-pose sheets' }).isVisible());
  assert.ok(await page.getByRole('heading', { name: 'Author-approved anatomy corrections' }).isVisible());
  assert.ok(await page.getByRole('heading', { name: 'Rear-view hands' }).isVisible());
  await visit('docs.html?doc=character-image-production&version=v6');
  assert.equal(await page.locator('#document-source-link').getAttribute('href'), 'docs/character-image-production-v6.md');
  assert.equal(await page.getByRole('heading', { name: 'Rear-view hands' }).count(), 0);
  await visit('docs.html?doc=character-image-production&version=v5');
  assert.equal(await page.locator('#document-source-link').getAttribute('href'), 'docs/character-image-production-v5.md');
  assert.equal(await page.getByRole('heading', { name: 'Author-approved anatomy corrections' }).count(), 0);
  await visit('docs.html?doc=character-image-production&version=v4');
  assert.equal(await page.locator('#document-source-link').getAttribute('href'), 'docs/character-image-production-v4.md');
  assert.equal(await page.getByRole('heading', { name: 'Separating supplied T-pose sheets' }).count(), 0);
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
      const id = card.includes('char-lynleit-arc0-1.png') ? '2' : card.match(/char-lynleit-([012])\.png/)?.[1];
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
