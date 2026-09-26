import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testSherieFelixBanter(page, origin, engine) {
  const visit = async route => {
    await page.goto(`${origin}/${route}`);
    await page.waitForLoadState('networkidle');
  };
  const moment = JSON.parse(fs.readFileSync('moments/index.json', 'utf8')).find(record => record.slug === 'unresolved-tension');
  const panels = JSON.parse(fs.readFileSync('gallery/panels.json', 'utf8'));
  const imageIds = ['sherie', 'felix'].map(viewpoint => `char-sherie-felix-card-game-${viewpoint}-view`);
  assert.equal(moment.timelinePhase, null);
  assert.deepEqual(moment.characterAnchors, []);
  assert.deepEqual(moment.characters.map(character => character.slug), ['sherie', 'felix']);
  assert.ok(!panels.some(record => record.id === 'sherie-felix-banter'));
  assert.equal(moment.artwork.id, imageIds[0]);

  // A legacy redirect must not interrupt the site-wide player's module import.
  await page.route('**/persistent-music.js', async route => {
    await new Promise(resolve => setTimeout(resolve, 120));
    await route.continue();
  }, { times: 1 });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('gallery.html?panels=sherie-felix-banter');
    await page.waitForURL(`**/gallery.html?image=${imageIds[0]}`);
    await page.locator('#gallery-detail-image').evaluate(image => image.decode());
    assert.equal(await page.locator('#gallery-detail-moment').getAttribute('href'), `${origin}/moments.html?moment=unresolved-tension&version=v1`);
    assert.equal(await page.locator('#gallery-siblings a').count(), 2);
    assert.ok(await page.locator('#gallery-image-versions').isHidden());
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.locator('#gallery-siblings').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${engine}-banter-artwork-${width}.png` });
    await page.locator('#gallery-siblings a').last().focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(`**/gallery.html?image=${imageIds[1]}`);
    await page.locator('#gallery-detail-image').evaluate(image => image.decode());
    assert.equal(await page.locator('#gallery-detail-source').getAttribute('href'), `media/gallery/images/characters/${imageIds[1]}.png`);
    await visit('gallery.html?panels=sherie-felix-banter#panel-2');
    await page.waitForURL(`**/gallery.html?image=${imageIds[1]}`);

    await visit('moments.html?moment=unresolved-tension&version=v1');
    assert.equal(await page.locator('#moment-reader-title').textContent(), 'Unresolved Tension');
    assert.equal(await page.locator('#moment-placement-status').textContent(), 'Unplaced');
    assert.equal(await page.locator('#moment-scene-prose > p').count(), moment.prose.length);
    assert.equal(await page.locator('#moment-known > .is-inferred').count(), 2);
    assert.equal(await page.locator('#moment-scene-prose .behavior-gutter-marker').count(), 3);
    assert.ok(await page.locator(`#moment-connection-grid a[href="gallery.html?image=${imageIds[0]}"]`).isVisible());
    assert.equal(await page.locator('#moment-connection-grid a[href="gallery.html?panels=sherie-felix-banter"]').count(), 0);
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
  for (const imageId of imageIds) {
    const source = `media/gallery/images/characters/${imageId}.png`;
    const response = await page.request.get(`${origin}/${source}`);
    assert.equal(response.status(), 200);
    assert.deepEqual(await response.body(), fs.readFileSync(source));
  }
  for (const character of ['sherie', 'felix']) {
    await visit(`character.html?character=${character}`);
    assert.equal(await page.locator('.character-moment-card[href="moments.html?moment=unresolved-tension"]').count(), 1);
    assert.equal(await page.locator('.profile-art-thumbnails img[src*="card-game"]').count(), 0, 'Scene illustrations should not become profile portraits');
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
  for (const imageId of imageIds) assert.ok(search.some(record => record.url === `gallery.html?image=${imageId}` && record.current));
  assert.ok(!search.some(record => record.url === 'gallery.html?panels=sherie-felix-banter'));
  console.log(`${engine}: paired card-game artwork, legacy links, Moment, unplaced chronology, and document history passed.`);
}
