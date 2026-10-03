import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validatePanels } from './gallery-panels.mjs';

export async function testSeptember28Backlog(page, origin, engine) {
  const records = JSON.parse(fs.readFileSync('gallery/panels.json'));
  const dream = records.find(r => r.id === 'anima-meets-female-cast');
  assert.ok(dream.nonCanon && !dream.moment && !dream.chapter);
  assert.equal(dream.panels.length, 13);
  assert.equal(dream.beats.length, 10, 'New art versions do not add dream events');
  for (const originalId of ['panel-4', 'panel-6', 'panel-10']) {
    const original = dream.panels.find(panel => panel.id === originalId);
    const version = dream.panels.find(panel => panel.id === `${originalId}-magazine-v2`);
    assert.equal(version.beat, original.beat, 'Keep each magazine version beside its original study');
    assert.equal(original.composition, 'v1');
    assert.equal(version.composition, 'v2');
    assert.notEqual(version.src, original.src, 'Preserve distinct original downloads');
  }
  assert.deepEqual(dream.characters, ['lynleit', 'sherie', 'yulia']);
  const invalid = structuredClone(records);
  invalid.find(r => r.id === dream.id).moment = { slug: 'unresolved-tension', version: 'v1' };
  assert.throws(() => validatePanels(process.cwd(), invalid), /non-canon studies cannot attach/);
  const visit = async route => { await page.goto(`${origin}/${route}`); await page.waitForLoadState('networkidle'); };
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({width, height:900});
    await visit(`gallery.html?panels=${dream.id}`);
    assert.match(await page.locator('#panel-medium').textContent(), /Non-canon/);
    assert.equal(await page.locator('.scene-panel').count(), 13);
    assert.equal(await page.locator('#panel-count').textContent(), '10 studies · 13 images');
    assert.equal(await page.locator('#panel-context a[href^="story.html"], #panel-context a[href^="moments.html"]').count(), 0);
    assert.equal(await page.locator('#panel-characters a[href="character.html?character=anima"]').count(), 0);
    assert.equal(await page.locator('#panel-reader a[href*="cult-of-inanna"]').count(), 0);
    assert.ok(await page.locator('#panel-characters a[href="gallery.html?character=anima"]').isVisible());
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({path:`test-results/${engine}-anima-dream-${width}.png`});
    for (const id of ['panel-4-magazine-v2', 'panel-6-magazine-v2', 'panel-10-magazine-v2']) {
      await visit(`gallery.html?panels=${dream.id}#${id}`);
      const figure = page.locator(`#${id}`);
      await figure.scrollIntoViewIfNeeded();
      await figure.locator('img').evaluate(img => img.decode());
      assert.ok(await figure.isVisible(), 'Direct version fragments show the requested art');
      assert.ok(await figure.locator('.image-id-copy').count() || await figure.locator('[data-image-id]').count(), 'Each new original has its image ID');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await figure.screenshot({path:`test-results/${engine}-${id}-${width}.png`});
    }
    await visit('music.html?category=character&tag=Sherie');
    assert.ok(await page.locator('#kyrie-eleison-movement-i').isVisible());
    assert.equal(await page.locator('#kyrie-eleison-movement-i').getAttribute('data-arc'), '');
    await page.locator('#kyrie-eleison-movement-i').scrollIntoViewIfNeeded();
    await page.screenshot({path:`test-results/${engine}-kyrie-eleison-${width}.png`});
  }
  await visit('gallery.html?collection=panels&character=anima');
  assert.equal(await page.locator('.panel-card').count(), 1);
  assert.match(await page.locator('.panel-card').textContent(), /Non-canon/);
  for (const panel of dream.panels) {
    assert.deepEqual(await (await page.request.get(`${origin}/${panel.src}`)).body(), fs.readFileSync(panel.src));
  }
  await visit('docs.html?doc=sherie-kyrie-eleison');
  assert.ok((await page.locator('#document-reader').textContent()).includes('She remains a sympathetic protagonist') || (await page.locator('#document-reader').textContent()).includes('sympathetic side protagonist'));
  await visit('docs.html?doc=character-intimacy-and-sexuality');
  assert.ok((await page.locator('#document-reader').textContent()).includes("Sherie's personal reckoning"));
  await visit('docs.html?doc=character-intimacy-and-sexuality&version=v19');
  assert.ok(!(await page.locator('#document-reader').textContent()).includes("Sherie's personal reckoning"));
  assert.ok(!JSON.parse(fs.readFileSync('home-dashboard.json')).panels.some(p => p.set === dream.id));
  console.log(`${engine}: Kyrie Eleison, Sherie direction, non-canon panels and version isolation passed.`);
}
