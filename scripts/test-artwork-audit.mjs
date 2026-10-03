import assert from 'node:assert/strict';
import fs from 'node:fs';

// Revision-aware checks complement historical intake tests without replacing their old URLs.
export async function testArtworkAudit(page, origin, engine) {
  const registry = JSON.parse(fs.readFileSync('gallery/image-identities.json', 'utf8')).images;
  const panels = JSON.parse(fs.readFileSync('gallery/panels.json', 'utf8'));
  const resources = JSON.parse(fs.readFileSync('gallery/resources.json', 'utf8'));
  const search = JSON.parse(fs.readFileSync('search-index.json', 'utf8')).entries;
  const visit = async route => { await page.goto(`${origin}/${route}`); await page.waitForLoadState('networkidle'); };
  const overflow = async () => assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${engine}: ${page.url()} overflow`);
  await visit('gallery.html');
  const cards = await page.locator('.gallery-card').evaluateAll(nodes => nodes.map(card => ({
    ...card.dataset, source: card.querySelector('img').getAttribute('src'), preview: card.querySelector('img').dataset.preview
  })));
  const revisions = cards.filter(card => card.revisionOf);
  assert.ok(revisions.length > 0);
  for (const card of revisions) {
    const original = cards.find(item => item.image === card.revisionOf);
    assert.equal(original?.imageRevisionSuperseded, 'true');
    assert.equal(original.imageVersionGroup, card.imageVersionGroup);
    assert.notEqual(original.source, card.source);
    for (const key of ['character', 'chibi', 'fanService', 'season', 'storyArc', 'artworkStack', 'profilePortrait']) assert.equal(card[key], original[key], `${card.image}: preserve ${key}`);
    for (const src of [original.source, card.source]) assert.ok(registry.some(item => item.source === src), `Registered source ${src}`);
    assert.equal(search.find(item => item.url === `gallery.html?image=${original.image}`)?.current, false);
    assert.equal(search.find(item => item.url === `gallery.html?image=${card.image}`)?.current, Boolean(card.season) || !card.imageVersionGroup || card.imageVersionDefault === 'true');
  }
  const samples = [revisions.find(card => card.chibi === 'true'), revisions.find(card => card.season), revisions.find(card => card.fanService === 'true'), revisions.find(card => !card.artworkStack && card.chibi === 'false')].filter(Boolean);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('gallery.html');
    assert.equal(await page.locator('.gallery-card[data-image-revision-superseded="true"]:not([hidden])').count(), 0);
    await overflow();
    for (const card of samples) {
      for (const selected of [card, cards.find(item => item.image === card.revisionOf)]) {
        await visit(`gallery.html?image=${selected.image}`);
        await page.locator('#gallery-detail-image').evaluate(img => img.decode());
        assert.equal(await page.locator('#gallery-detail-source').getAttribute('href'), selected.source);
        assert.ok(await page.locator(`#gallery-image-versions a[href="gallery.html?image=${card.image}"]`).count());
        assert.ok(await page.locator(`#gallery-image-versions a[href="gallery.html?image=${card.revisionOf}"]`).count());
        const id = registry.find(item => item.source === selected.source).id;
        assert.equal(await page.locator('#gallery-reader-view .image-id-copy:visible').getAttribute('data-image-id'), id);
        const response = await page.request.get(`${origin}/${selected.source}`);
        assert.deepEqual(await response.body(), fs.readFileSync(selected.source));
        await overflow();
      }
    }
    await visit('characters.html');
    for (const slug of ['lynleit', 'sherie', 'yulia', 'myka']) {
      const name = slug[0].toUpperCase() + slug.slice(1), art = page.locator(`[data-name="${name}"] .character-chibi`);
      await art.scrollIntoViewIfNeeded();
      const pool = cards.filter(card => card.chibi === 'true' && card.imageRevisionSuperseded !== 'true' && (card.character || '').split(' ').includes(slug)).flatMap(card => [card.source, card.preview]);
      await page.waitForFunction(({ name, pool }) => { const img = document.querySelector(`[data-name="${name}"] .character-chibi`); return img?.complete && img.naturalWidth > 0 && pool.includes(img.getAttribute('src')); }, { name, pool });
      const source = await art.getAttribute('src');
      assert.ok(cards.some(card => card.chibi === 'true' && (card.character || '').split(' ').includes(slug) && card.imageRevisionSuperseded !== 'true' && [card.source, card.preview].includes(source)), `${slug}: current chibi pool`);
      await visit(`character.html?character=${slug}`);
      const sources = await page.locator('.profile-art-thumbnails img').evaluateAll(images => images.map(img => img.getAttribute('src')));
      if (cards.some(card => card.chibi === 'false' && card.profilePortrait !== 'false' && card.imageRevisionSuperseded !== 'true' && (card.character || '').split(' ').includes(slug))) assert.ok(sources.length > 0, `${slug}: portrait thumbnails`);
      for (const source of sources) assert.ok(!cards.some(card => card.imageRevisionSuperseded === 'true' && [card.source, card.preview].includes(source)), `${slug}: superseded portrait`);
      await overflow();
      await visit('characters.html');
    }
    for (const record of panels.filter(record => record.panels.some(panel => panel.revisionOf))) {
      await visit(`gallery.html?panels=${record.id}`);
      const current = record.panels.filter(panel => !panel.supersededBy);
      assert.equal(await page.locator('.panel-beat-artwork > .scene-panel').count(), current.length);
      assert.equal(await page.locator('.panel-image-history').count(), record.panels.length - current.length);
      assert.equal(await page.locator('.panel-image-history[open]').count(), 0);
      const before = await page.locator('#panel-slideshow-stage img').first().getAttribute('src');
      assert.ok(current.some(panel => [panel.src, panel.display].includes(before)));
      await page.locator('#panel-slide-next').click();
      const after = await page.locator('#panel-slideshow-stage img').evaluateAll(images => images.map(img => img.getAttribute('src')));
      for (const source of after) assert.ok(current.some(panel => [panel.src, panel.display].includes(source)));
      const original = record.panels.find(panel => panel.supersededBy);
      await page.locator('#panel-index summary').click();
      await page.locator(`#panel-jump-links a[href="#${original.id}"]`).click();
      assert.ok(await page.locator(`#${original.id}`).isVisible());
      assert.ok(await page.locator(`#${original.id}`).evaluate(el => el.closest('details').open));
      await page.reload(); await page.waitForLoadState('networkidle');
      assert.ok(await page.locator(`#${original.id}`).isVisible(), 'Legacy hash reveals retained original after reload');
      await overflow();
    }
    for (const record of resources.filter(record => record.previews.some(view => view.src.includes('face-hair-v2')))) {
      for (const view of record.previews) {
        await visit(`gallery.html?resource=${record.id}&view=${view.id}`);
        await page.locator('#resource-image').evaluate(img => img.decode());
        assert.equal(await page.locator('#resource-image').getAttribute('src'), view.src);
        assert.ok((await page.request.get(`${origin}/${view.thumbnail}`)).ok());
        assert.equal(await page.locator('#resource-downloads a[download]').count(), record.files.length);
        await overflow();
      }
    }
    await visit('docs.html?doc=site-audit-2026-10-03');
    assert.ok((await page.locator('main').innerText()).includes('Water walking is not secret from everyone'));
    await overflow();
    await page.screenshot({ path: `test-results/${engine}-site-audit-${width}.png`, fullPage: false });
  }
  console.log(`${engine}: artwork revisions, preserved sources, current discovery, panel history, resource versions and audit readers passed`);
}
