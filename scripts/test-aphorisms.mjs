import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testAphorisms(page, origin, engine) {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/docs.html?doc=character-aphorisms&version=v1`);
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('#document-reader h1').textContent(), 'Character Aphorisms');
    assert.equal(await page.locator('#document-reader blockquote').count(), 2);
    assert.ok((await page.locator('#document-reader').textContent()).includes('no scene or listener has been assigned'));
    assert.ok((await page.locator('#document-reader').textContent()).includes('Schrödinger'));
    assert.ok(await page.locator('#document-reader a[href="character.html?character=sherie"]').count());
    assert.ok(await page.locator('#document-reader a[href="character.html?character=lynleit"]').count());
    assert.equal(await page.locator('#document-source-link').getAttribute('href'), 'docs/character-aphorisms.md');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.locator('#document-reader h1').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${engine}-aphorisms-${width}.png` });
    await page.goto(`${origin}/gallery.html?image=char-yulia-white-sweater`);
    await page.locator('#gallery-detail-image').evaluate(image => image.decode());
    assert.equal(await page.locator('#gallery-detail-image').evaluate(image => `${image.naturalWidth}x${image.naturalHeight}`), '1024x1536');
    await page.screenshot({ path: `test-results/${engine}-yulia-portrait-${width}.png` });
  }
  const records = JSON.parse(fs.readFileSync('docs/index.json', 'utf8'));
  const aphorisms = records.find(record => record.slug === 'character-aphorisms');
  assert.equal(aphorisms.defaultVersion, 'v1');
  assert.equal(aphorisms.latestOnly, undefined);
  const search = JSON.parse(fs.readFileSync('search-index.json', 'utf8')).entries;
  assert.ok(search.some(record => record.current && record.url === 'docs.html?doc=character-aphorisms&version=v1'));
  console.log(`${engine}: aphorism reader, speaker links, source download, search, and Yulia portrait passed.`);
}
