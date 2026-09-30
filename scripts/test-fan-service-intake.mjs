import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testFanServiceIntake(page, origin, engine) {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(origin + '/gallery.html?fan-service=1');
    await page.waitForLoadState('networkidle');
    const cards = page.locator('.gallery-card[data-fan-service="true"]');
    assert.equal(await cards.count(), 11);
    assert.equal(await page.locator('.gallery-card:not([hidden])').count(), 3);
    assert.equal(await cards.locator('img').count(), 11);
    assert.ok(await cards.evaluateAll(items => items.every(item => item.dataset.profilePortrait === 'false')));
    for (const [character, count] of [['lynleit', 3], ['sherie', 5], ['yulia', 3]]) {
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
    assert.equal(await page.locator('.scene-panel').count(), 10);
    assert.match(await page.locator('#panel-medium').textContent(), /Non-canon/);
    assert.ok(await page.locator('img[src*="panel-10"]').count() > 0);
  }
  console.log(engine + ': eleven Fan Service originals, three stacks and existing Anima panel verified.');
}
