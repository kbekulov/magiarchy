import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testImageIdentities(page, origin, engine) {
  const registry = JSON.parse(fs.readFileSync('gallery/image-identities.json', 'utf8'));
  const idFor = source => registry.images.find(record => record.source === source || record.derivatives.includes(source))?.id;
  await page.addInitScript(() => {
    window.copiedImageIds = [];
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => window.copiedImageIds.push(value) } });
  });
  const visit = async route => { await page.goto(`${origin}/${route}`); await page.waitForLoadState('networkidle'); };
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['gallery.html', 'gallery.html?image=chibi_yulia_1', 'gallery.html?panels=river-incident', 'gallery.html?resource=yulia-white-sweater', 'characters.html', 'character.html?character=lynleit', 'duchy.html', 'weapons.html', 'music.html']) {
      await visit(route);
      const button = page.locator('.image-id-copy:visible').first();
      await button.waitFor();
      const id = await button.getAttribute('data-image-id');
      assert.ok(registry.images.some(record => record.id === id));
      const overlay = await button.evaluate(button => {
        const row = button.parentElement;
        const image = [...row.parentElement.querySelectorAll('img')].find(image => image.dataset.publicImageId === button.dataset.imageId && image.getAttribute('aria-hidden') !== 'true');
        const art = image.getBoundingClientRect(), badge = button.getBoundingClientRect();
        return { right: art.right - badge.right, bottom: art.bottom - badge.bottom, width: badge.width, position: getComputedStyle(row).position, filenameHidden: getComputedStyle(row.querySelector('.published-image-filename')).display === 'none' };
      });
      assert.equal(overlay.position, 'absolute', `${route}: ID must not take up a section in the layout`);
      assert.ok(overlay.right >= 6 && overlay.right <= 10 && overlay.bottom >= 6 && overlay.bottom <= 10, `${route}: badge must follow the image bottom-right: ${JSON.stringify(overlay)}`);
      assert.ok(overlay.width < 65 && overlay.filenameHidden, `${route}: badge must remain compact`);
      const url = page.url();
      await button.click();
      assert.equal(page.url(), url, 'Copy must not navigate');
      assert.equal(await page.evaluate(() => window.copiedImageIds.at(-1)), id);
      assert.equal(await page.locator('.image-id-toast').textContent(), `Copied ID: ${id}`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route}: overflow at ${width}`);
      if (route.includes('character.html?')) {
        const image = page.locator('.profile-portrait-strip img:not([aria-hidden])');
        assert.equal(await button.getAttribute('data-image-id'), idFor(await image.getAttribute('src')));
        await page.locator('.profile-art-thumbnails button').last().click();
        await page.waitForTimeout(100);
        assert.equal(await button.getAttribute('data-image-id'), idFor(await image.getAttribute('src')), 'Portrait copy ID follows selection');
      }
      if (['gallery.html', 'gallery.html?panels=river-incident', 'character.html?character=lynleit'].includes(route)) await page.screenshot({ path: `test-results/${engine}-image-ids-${route.includes('panels') ? 'panels' : route.startsWith('character') ? 'profile' : 'gallery'}-${width}.png` });
    }
  }
  await visit('gallery.html?image=chibi_yulia_1');
  const button = page.locator('.image-id-copy:visible');
  await button.focus(); await page.keyboard.press('Enter');
  await page.waitForTimeout(3150);
  assert.ok(await page.locator('.image-id-toast').isHidden(), 'Notification expires after three seconds');
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => { throw new Error('denied'); };
    document.execCommand = () => false;
  });
  await button.click();
  assert.match(await page.locator('.image-id-toast').textContent(), /^Could not copy ID:/);
  await page.evaluate(() => { document.execCommand = () => true; });
  await button.focus();
  await page.keyboard.press('Enter');
  assert.match(await page.locator('.image-id-toast').textContent(), /^Copied ID:/);
  assert.ok(await button.evaluate(element => element === document.activeElement), 'Fallback restores keyboard focus');
  const touch = await page.context().browser().newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await touch.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: async value => { window.touchCopied = value; } } }));
  const phone = await touch.newPage();
  await phone.goto(`${origin}/gallery.html?image=chibi_yulia_1`);
  const phoneButton = phone.locator('.image-id-copy:visible');
  await phoneButton.tap();
  assert.equal(await phone.evaluate(() => window.touchCopied), await phoneButton.getAttribute('data-image-id'));
  assert.ok((await phoneButton.boundingBox()).height >= 44);
  await touch.close();
  console.log(`${engine}: image IDs, dynamic readers, filenames, clipboard, expiry, failure and touch passed`);
}
