import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testSherieFelixBanter(page, origin, engine) {
  const visit = async route => {
    await page.goto(`${origin}/${route}`);
    await page.waitForLoadState('networkidle');
  };
  const moment = JSON.parse(fs.readFileSync('moments/index.json', 'utf8')).find(record => record.slug === 'unresolved-tension');
  const panels = JSON.parse(fs.readFileSync('gallery/panels.json', 'utf8')).find(record => record.id === 'sherie-felix-banter');
  assert.equal(moment.timelinePhase, null);
  assert.deepEqual(moment.characterAnchors, []);
  assert.deepEqual(moment.characters.map(character => character.slug), ['sherie', 'felix']);
  assert.deepEqual(panels.panels.map(panel => panel.id), ['panel-1', 'panel-2']);
  assert.ok(panels.panels.every(panel => !panel.composition));

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('gallery.html?panels=sherie-felix-banter');
    assert.equal(await page.locator('#panel-count').textContent(), '2 beats · 2 images');
    assert.equal(await page.locator('#panel-context a').getAttribute('href'), 'moments.html?moment=unresolved-tension&version=v1');
    assert.deepEqual(await page.locator('.scene-panel-art img').evaluateAll(images => images.map(image => image.getAttribute('src'))), panels.panels.map(panel => panel.display));
    await page.locator('#panel-slide-next').click();
    await page.waitForFunction(() => document.querySelector('#panel-slideshow').dataset.index === '1');
    await page.locator('#panel-slide-next').click();
    await page.waitForFunction(() => document.querySelector('#panel-slideshow').dataset.index === '0');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `test-results/${engine}-banter-panels-${width}.png` });
    await page.locator('#panel-index summary').click();
    await page.locator('#panel-jump-links a').last().focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(url => url.hash === '#panel-2');
    assert.ok(await page.locator('#panel-2').evaluate(element => element === document.activeElement));

    await visit('moments.html?moment=unresolved-tension&version=v1');
    assert.equal(await page.locator('#moment-reader-title').textContent(), 'Unresolved Tension');
    assert.equal(await page.locator('#moment-placement-status').textContent(), 'Unplaced');
    assert.equal(await page.locator('#moment-scene-prose > p').count(), moment.prose.length);
    assert.equal(await page.locator('#moment-known > .is-inferred').count(), 2);
    assert.equal(await page.locator('#moment-scene-prose .behavior-gutter-marker').count(), 3);
    assert.ok(await page.locator('#moment-connection-grid a[href="gallery.html?panels=sherie-felix-banter"]').isVisible());
    assert.deepEqual(await page.locator('#moment-reader-characters a').allTextContents(), ['Sherie', 'Felix']);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.locator('#moment-scene-prose').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${engine}-banter-moment-${width}.png` });
    await page.locator('#moment-scene-prose .behavior-gutter-marker.is-female').click();
    assert.equal(await page.locator('#behavior-tooltip-title').textContent(), 'Comfort becomes chosen teasing');
    assert.ok(await page.locator('#behavior-note-tooltip').isVisible());
    await page.keyboard.press('Escape');
    assert.ok(await page.locator('#behavior-note-tooltip').isHidden());
  }
  for (const panel of panels.panels) {
    const response = await page.request.get(`${origin}/${panel.src}`);
    assert.equal(response.status(), 200);
    assert.deepEqual(await response.body(), fs.readFileSync(panel.src));
  }
  for (const character of ['sherie', 'felix']) {
    await visit(`character.html?character=${character}`);
    assert.equal(await page.locator('.character-moment-card[href="moments.html?moment=unresolved-tension"]').count(), 1);
  }
  await visit('story.html');
  assert.equal(await page.locator('.timeline-panel-link[href="gallery.html?panels=sherie-felix-banter"]').count(), 0, 'Unplaced exchange must not gain a numbered phase');

  for (const [slug, historicalVersion, heading] of [
    ['character-intimacy-and-sexuality', 'v15', 'Unresolved Tension: the card-game interlude'],
    ['character-behavior-audit', 'v12', 'Unresolved Tension']
  ]) {
    await visit(`docs.html?doc=${slug}`);
    assert.equal(await page.getByRole('heading', { name: heading, exact: true }).count(), 1);
    const newDetail = slug === 'character-behavior-audit' ? 'Comfort becomes chosen teasing' : 'reclining is initially ordinary to Sherie';
    assert.ok((await page.locator('#document-reader').textContent()).includes(newDetail));
    await page.getByRole('combobox', { name: 'Choose version' }).selectOption(historicalVersion);
    await page.waitForURL(`**/docs.html?doc=${slug}&version=${historicalVersion}`);
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('#document-source-link').getAttribute('href'), `docs/${slug}-${historicalVersion}.md`);
    assert.equal(await page.getByRole('heading', { name: heading, exact: true }).count(), 0, 'New scene must not enter historical guidance');
    assert.ok(!(await page.locator('#document-reader').textContent()).includes(newDetail), 'New live data must not leak into historical guidance');
  }
  const search = JSON.parse(fs.readFileSync('search-index.json', 'utf8')).entries;
  assert.ok(search.some(record => record.url === 'moments.html?moment=unresolved-tension'));
  assert.ok(search.some(record => record.url === 'gallery.html?panels=sherie-felix-banter'));
  console.log(`${engine}: card-game panels, Moment, character links, unplaced chronology, and document history passed.`);
}
