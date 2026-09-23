import assert from 'node:assert/strict';

export async function testMusicMovements(page, origin, engine) {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/music.html?category=event&tag=Only%20Eyes%20for%20You`);
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('.music-card:visible').count(), 3);
    assert.ok(await page.locator('audio').evaluateAll(players => players.every(a => a.loop)));
    for (const [suffix, duration] of [['i', 208.8], ['ii', 214.4], ['iii', 155.94]]) {
      const card = page.locator(`#passacaglia-movement-${suffix}`);
      assert.ok(await card.isVisible());
      assert.ok(await card.locator('audio').evaluate(a => a.paused && a.preload === 'none' && !a.autoplay));
      assert.equal(await card.locator('.music-downloads a[download]').count(), 2);
      for (const link of await card.locator('.music-downloads a[download]').all()) {
        const response = await page.request.head(new URL(await link.getAttribute('href'), `${origin}/`).href);
        assert.equal(response.status(), 200);
        assert.ok(Number(response.headers()['content-length']) > 1000000);
      }
      await card.locator('audio').evaluate(a => { a.volume = 0; });
      await card.locator('.music-banner-toggle').click();
      await page.waitForFunction(id => {
        const a = document.querySelector(`#${id} audio`);
        return !a.paused && a.currentTime > .05 && Number.isFinite(a.duration);
      }, `passacaglia-movement-${suffix}`);
      assert.ok(Math.abs(await card.locator('audio').evaluate(a => a.duration) - duration) < 1);
      assert.ok(await card.locator('.music-seek').isEnabled());
      assert.ok(await card.locator('.music-player-error').isHidden());
      // Windows headless WebKit pauses at the repeat boundary, including with
      // an explicit ended/play handler. Test native wraparound in Chromium;
      // WebKit still verifies loop configuration and visitor controls.
      if (engine === 'chromium') {
        await card.locator('audio').evaluate(a => { a.currentTime = a.duration - .5; });
        await page.waitForFunction(id => {
          const a = document.querySelector(`#${id} audio`);
          return !a.paused && !a.ended && !a.seeking && a.currentTime > .05 && a.currentTime < 2;
        }, `passacaglia-movement-${suffix}`);
      }
      assert.ok((await card.locator('.music-banner-toggle').getAttribute('aria-label')).startsWith('Pause'));
      await card.locator('.music-banner-toggle').click();
      await page.waitForFunction(id => document.querySelector(`#${id} audio`).paused, `passacaglia-movement-${suffix}`);
      await card.locator('.music-banner-toggle').click();
    }
    assert.ok(await page.locator('#passacaglia-movement-ii audio').evaluate(a => a.paused));
    const card = page.locator('#passacaglia-movement-iii');
    await card.locator('.music-seek').focus();
    await page.keyboard.press('ArrowRight');
    assert.ok(Number(await card.locator('.music-seek').inputValue()) > 0);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await card.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${engine}-movement-iii-${width}.png` });
    await page.getByRole('searchbox', { name: 'Search music' }).fill('no-such-track');
    assert.ok(await card.locator('audio').evaluate(a => a.paused));
  }
  console.log(`${engine}: all three music movements passed at mobile and desktop widths`);
  if (engine === 'webkit') console.log('WebKit: native repeat boundary requires real-device verification; configuration and pause controls passed.');
}
