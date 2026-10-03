import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testFanServiceIntake(page, origin, engine) {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(origin + '/gallery.html?fan-service=1');
    await page.waitForLoadState('networkidle');
    const cards = page.locator('.gallery-card[data-fan-service="true"]');
    assert.equal(await cards.count(), 32);
    assert.equal(await page.locator('.gallery-card:not([hidden])').count(), 6);
    assert.equal(await cards.locator('img').count(), 32);
    assert.ok(await cards.evaluateAll(items => items.every(item => item.dataset.profilePortrait === 'false')));
    const shared = cards.filter({ has: page.locator('img[src*="char-lynleit-sherie-"]') });
    assert.equal(await shared.count(), 10);
    assert.ok(await shared.evaluateAll(items => items.every(item => item.dataset.character === 'lynleit sherie')));
    for (const character of ['lynleit', 'sherie']) {
      await page.locator('#gallery-character-filter').selectOption(character);
      assert.equal(await page.locator('[data-artwork-stack="lynleit-sherie-fan-service"]:not([hidden])').count(), 1);
    }
    await page.locator('#gallery-character-filter').selectOption('all');
    for (const [character, count] of [['lynleit', 5], ['sherie', 6], ['yulia', 3], ['lynleit-sherie', 10], ['lynleit-kyrien-sherie-felix', 6], ['sherie-felix', 2]]) {
      const card = page.locator('[data-artwork-stack="' + character + '-fan-service"]:not([hidden])');
      await card.locator(':scope > a').click();
      await page.waitForLoadState('networkidle');
      assert.equal(await page.locator('#gallery-image-versions a').count(), count);
      const links = await page.locator('#gallery-image-versions a').evaluateAll(items => items.map(item => item.getAttribute('href')));
      for (const link of links) {
        await page.goto(origin + '/' + link);
        await page.waitForLoadState('networkidle');
        await page.locator('#gallery-detail-image').evaluate(image => image.decode());
        const source = await page.locator('#gallery-detail-source').getAttribute('href');
        assert.match(source, /FULL-char-.*-fan-service-.*-img-\d{6}\.png$/);
        assert.deepEqual(await (await page.request.get(origin + '/' + source)).body(), fs.readFileSync(source));
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      }
      await page.goto(origin + '/gallery.html?fan-service=1');
      await page.waitForLoadState('networkidle');
    }
    await page.screenshot({ path: 'test-results/' + engine + '-fan-service-intake-' + width + '.png' });
    await page.goto(origin + '/gallery.html?panels=anima-meets-female-cast#panel-10');
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('.scene-panel').count(), 13);
    assert.match(await page.locator('#panel-medium').textContent(), /Non-canon/);
    assert.ok(await page.locator('img[src*="panel-10"]').count() > 0);
  }
  console.log(engine + ': thirty-two Fan Service originals, six stacks and existing Anima panel verified.');
}
