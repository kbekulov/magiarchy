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
  const sequence = panels.find(record => record.id === 'sherie-felix-unresolved-tension');
  const panelUrl = `gallery.html?panels=${sequence.id}`;
  assert.equal(moment.timelinePhase, null);
  assert.deepEqual(moment.characterAnchors, []);
  assert.deepEqual(moment.characters.map(character => character.slug), ['sherie', 'felix']);
  assert.ok(!panels.some(record => record.id === 'sherie-felix-banter'));
  assert.equal(moment.artwork, undefined, 'The Moment should link to the panel set only');
  assert.equal(sequence.panels.filter(panel => !panel.supersededBy).length, 7);

  // A legacy redirect must not interrupt the site-wide player's module import.
  await page.route('**/persistent-music.js', async route => {
    await new Promise(resolve => setTimeout(resolve, 120));
    await route.continue();
  }, { times: 1 });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [route, panelId] of [
      [`gallery.html?image=${imageIds[0]}`, 'panel-2'],
      [`gallery.html?image=${imageIds[1]}`, 'panel-5'],
      ['gallery.html?panels=sherie-felix-banter', 'panel-2'],
      ['gallery.html?panels=sherie-felix-banter#panel-1', 'panel-2'],
      ['gallery.html?panels=sherie-felix-banter#panel-2', 'panel-5']
    ]) {
      await visit(route);
      await page.waitForURL(`**/${panelUrl}#${panelId}`);
      await page.locator(`#${panelId} img`).evaluate(image => image.decode());
      assert.equal(await page.locator('.scene-panel').count(), sequence.panels.length);
      assert.ok(await page.locator('#panel-context a[href="moments.html?moment=unresolved-tension&version=v1"]').isVisible());
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    }
    await page.screenshot({ path: `test-results/${engine}-banter-panels-${width}.png` });
    await visit('gallery.html');
    for (const imageId of imageIds) {
      assert.equal(await page.locator(`.gallery-card a[href="gallery.html?image=${imageId}"]`).count(), 0, 'Panel duplicates must not appear in Artwork');
    }
    assert.equal(await page.locator('.gallery-card[data-image="char-sherie-ivory-sofa-card-game"]').getAttribute('data-artwork-stack'), 'sherie-red-sofa', 'Ivory sofa remains available in the shared sofa stack');

    await visit('moments.html?moment=unresolved-tension&version=v1');
    assert.equal(await page.locator('#moment-reader-title').textContent(), 'Unresolved Tension');
    assert.equal(await page.locator('#moment-placement-status').textContent(), 'Unplaced');
    assert.equal(await page.locator('#moment-scene-prose > p').count(), moment.prose.length);
    assert.equal(await page.locator('#moment-known > .is-inferred').count(), 2);
    assert.equal(await page.locator('#moment-scene-prose .behavior-gutter-marker').count(), 3);
    assert.equal(await page.locator(`#moment-connection-grid a[href="${panelUrl}"]`).count(), 1);
    assert.equal(await page.locator('#moment-connection-grid a[href*="gallery.html?image="]').count(), 0);
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
  for (const panel of sequence.panels) {
    const source = panel.src;
    const response = await page.request.get(`${origin}/${source}`);
    assert.equal(response.status(), 200);
    assert.deepEqual(await response.body(), fs.readFileSync(source));
  }
  for (const character of ['sherie', 'felix']) {
    await visit(`character.html?character=${character}`);
    assert.equal(await page.locator('.character-moment-card[href="moments.html?moment=unresolved-tension"]').count(), 1);
    for (const imageId of imageIds) {
      assert.equal(await page.locator(`.profile-art-thumbnails img[src*="${imageId}"]`).count(), 0, 'Scene illustrations should not become profile portraits');
    }
    assert.equal(await page.locator('.profile-art-thumbnails img[src*="sherie-felix-unresolved-tension"]').count(), 0, 'Panels must not become profile portraits');
  }
  await visit('story.html');
  assert.equal(await page.locator('.timeline-panel-link[href="gallery.html?panels=sherie-felix-banter"]').count(), 0, 'Unplaced exchange must not gain a numbered phase');
  assert.equal(await page.locator(`.timeline-panel-link[href="${panelUrl}"]`).count(), 0);

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
  for (const imageId of imageIds) assert.ok(!search.some(record => record.url === `gallery.html?image=${imageId}`));
  assert.ok(search.some(record => record.url === panelUrl));
  assert.ok(!search.some(record => record.url === 'gallery.html?panels=sherie-felix-banter'));
  console.log(`${engine}: panel-only card-game images, legacy links, original downloads, Moment, unplaced chronology, and document history passed.`);
}
