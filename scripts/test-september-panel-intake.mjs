import { publishedImagePath } from './test-image-paths.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testSeptemberPanelIntake(page, origin, engine) {
  const visit = async route => { await page.goto(`${origin}/${route}`); await page.waitForLoadState('networkidle'); };
  const records = JSON.parse(fs.readFileSync('gallery/panels.json', 'utf8'));
  const sets = [['sherie-felix-unresolved-tension', 7], ['hiyu-yulia-university-days', 7], ['after-the-river', 4]];
  for (const [id, count] of sets) {
    const record = records.find(item => item.id === id);
    const order = id === 'sherie-felix-unresolved-tension' ? [1, 2, 5, 3, 4, 6, 7] : Array.from({ length: count }, (_, i) => i + 1);
    assert.deepEqual(record.panels.map(p => p.id), order.map(number => `panel-${number}`));
    assert.deepEqual(record.panels.map(p => p.label), Array.from({ length: count }, (_, i) => `Panel ${i + 1}`));
    if (id === 'sherie-felix-unresolved-tension') {
      assert.equal(record.revision, 'r2');
      assert.deepEqual(record.panels.map(p => p.src), Array.from({length: 7}, (_, i) => publishedImagePath(`media/gallery/panels/${id}/${id}-panel-${i + 1}-r2.png`)));
    }
    assert.equal(new Set(record.panels.map(p => p.beat)).size, count);
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await visit(`gallery.html?panels=${id}`);
      assert.equal(await page.locator('.scene-panel').count(), count);
      assert.equal(await page.locator('#panel-count').textContent(), `${count} beats · ${count} images`);
      assert.ok(await page.locator(`#panel-context a[href="moments.html?moment=${record.moment.slug}&version=${record.moment.version}"]`).isVisible());
      await page.locator('#panel-slide-next').click();
      await page.waitForFunction(() => document.querySelector('#panel-slideshow').dataset.index === '1');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.screenshot({ path: `test-results/${engine}-${id}-${width}.png` });
    }
    for (const panel of record.panels) {
      const response = await page.request.get(`${origin}/${panel.src}`);
      assert.ok(response.ok());
      assert.deepEqual(await response.body(), fs.readFileSync(panel.src));
    }
    await visit(`moments.html?moment=${record.moment.slug}&version=${record.moment.version}`);
    assert.ok(await page.locator(`#moment-connection-grid a[href="gallery.html?panels=${id}"]`).isVisible());
  }
  await visit('moments.html?moment=university-days-before-the-spill');
  assert.equal(await page.locator('#moment-known-title').textContent(), 'Recorded scene facts');
  assert.ok(await page.locator('.moment-fact-legend').isHidden());
  for (const name of ['hiyu', 'yulia']) {
    await visit(`character.html?character=${name}`);
    assert.ok(await page.locator('#character-moment-grid a[href="moments.html?moment=university-days-before-the-spill"]').isVisible());
    assert.equal(await page.locator('#character-profile-portrait img[src*="/resources/"]').count(), 0, 'T-poses must not enter the portrait pool');
  }
  assert.match(await page.locator('#character-equipment').textContent(), /birthday gift.*does not know who sent it/s);
  assert.match(await page.locator('#character-equipment').textContent(), /no crime has occurred/);
  await visit('story.html');
  assert.equal(await page.locator('.timeline-panel-link[href="gallery.html?panels=hiyu-yulia-university-days"]').count(), 0);
  assert.equal(await page.locator('.timeline-panel-link[href="gallery.html?panels=sherie-felix-unresolved-tension"]').count(), 0);
  assert.equal(await page.locator('#phase-unknowing-convergence .timeline-panel-link[href="gallery.html?panels=after-the-river"]').count(), 1);
  await visit('moments.html?moment=the-boat-beneath-the-bridge&version=v1');
  assert.equal(await page.locator('a[href="gallery.html?panels=after-the-river"]').count(), 0);
  await visit('story.html?chapter=the-wrong-bank&version=v1');
  assert.ok(await page.locator('#chapter-panel-links a[href="gallery.html?panels=after-the-river"]').isVisible());
  const resource = JSON.parse(fs.readFileSync('gallery/resources.json', 'utf8')).find(r => r.id === 'yulia-white-sweater');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('gallery.html?resource=yulia-white-sweater');
    assert.equal(await page.locator('#resource-thumbnails button').count(), 2);
    assert.equal(await page.locator('#resource-downloads a[download]').count(), 2);
    assert.ok(await page.locator('#resource-related a[href="gallery.html?image=char-yulia-white-sweater"]').isVisible());
    await page.locator('#resource-thumbnails button').nth(1).click();
    await page.waitForURL('**/gallery.html?resource=yulia-white-sweater&view=back');
    assert.equal(await page.locator('#resource-image').getAttribute('src'), resource.previews[1].src);
    await page.locator('#resource-image').evaluate(img => img.decode());
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `test-results/${engine}-yulia-t-pose-${width}.png` });
  }
  for (const file of resource.files) {
    const response = await page.request.get(`${origin}/${file.path}`);
    assert.deepEqual(await response.body(), fs.readFileSync(file.path));
  }
  await visit('gallery.html?image=char-yulia-white-sweater');
  assert.equal(await page.locator('#gallery-detail-resource').getAttribute('href'), 'gallery.html?resource=yulia-white-sweater');
  const search = JSON.parse(fs.readFileSync('search-index.json', 'utf8'));
  const serialized = JSON.stringify(search);
  for (const [id] of sets) assert.ok(serialized.includes(`gallery.html?panels=${id}`));
  assert.ok(serialized.includes('crime mystery'));
  console.log(`${engine}: September panel intake, Yulia references, necklace, scene links and original downloads passed.`);
}
