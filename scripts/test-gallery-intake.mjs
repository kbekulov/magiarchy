import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testGalleryIntake(page, origin, engine) {
  const images = [
    ['char-kyrien-red-sofa-pistol', 'kyrien', 'char-kyrien-red-sofa-pistol', true],
    ['char-sherie-red-sofa', 'sherie', 'char-sherie-red-sofa', true],
    ['char-lynleit-blue-gown-ballroom', 'lynleit', 'char-lynleit-arc-1-prosecutor-dinner', true],
    ['char-lynleit-in-the-park', 'lynleit', 'char-lynleit-in-the-park', false]
  ];
  const visit = async route => {
    await page.goto(`${origin}/${route}`);
    await page.waitForLoadState('networkidle');
  };
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('gallery.html');
    for (const [id] of images) assert.ok(await page.locator(`.gallery-card[data-image="${id}"]`).isVisible(), `${id}: default preview not visible`);
    for (const [id, character, filename, versioned] of images) {
      const source = `media/gallery/images/characters/${filename}.png`;
      await visit(`gallery.html?image=${id}`);
      await page.locator('#gallery-detail-image').evaluate(image => image.decode());
      assert.equal(await page.locator('#gallery-detail-image').getAttribute('src'), source);
      assert.equal(await page.locator('#gallery-detail-source').getAttribute('href'), source);
      if (width === 390) {
        const response = await page.request.get(`${origin}/${source}`);
        assert.equal(response.status(), 200);
        assert.deepEqual(await response.body(), fs.readFileSync(source));
      }
      assert.equal(await page.locator('#gallery-image-versions a').count(), versioned ? 2 : 0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      if (versioned) {
        await page.locator('#gallery-image-versions a').first().click();
        await page.waitForURL(`**/gallery.html?image=${id}-v1`);
        await page.locator('#gallery-detail-image').evaluate(image => image.decode());
        assert.equal(await page.locator('#gallery-detail-source').getAttribute('href'), `media/gallery/images/characters/${filename}-v1.png`);
      }
      await visit(`character.html?character=${character}`);
      const button = page.locator('.profile-art-thumbnails button').filter({ has: page.locator(`img[src$="${filename}.webp"]`) });
      assert.equal(await button.count(), 1, `${id}: missing from profile viewer`);
      await button.click();
      assert.equal(await button.getAttribute('aria-pressed'), 'true');
      if (id === 'char-lynleit-blue-gown-ballroom') assert.equal(await page.locator('.profile-art-era').textContent(), 'Arc 1');
    }
    await visit('gallery.html?image=char-lynleit-blue-gown-ballroom');
    assert.ok((await page.locator('#gallery-detail-type').textContent()).includes('Arc 1'));
    assert.ok((await page.locator('#gallery-detail-context').innerText()).includes('He never learns she was there.'));
    await page.locator('#gallery-detail-context').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${engine}-dinner-artwork-${width}.png` });
    await page.locator('#gallery-detail-moment').click();
    await page.waitForURL('**/moments.html?moment=interrogation-after-the-failed-attempt&version=v3');
    await page.waitForLoadState('networkidle');
    assert.ok(await page.locator('a[href="gallery.html?image=char-lynleit-blue-gown-ballroom"]').isVisible());
    for (const version of ['v1', 'v2']) {
      await visit(`moments.html?moment=interrogation-after-the-failed-attempt&version=${version}`);
      assert.equal(await page.locator('a[href="gallery.html?image=char-lynleit-blue-gown-ballroom"]').count(), 0, 'Artwork association leaked into an earlier Moment');
    }
  }
  console.log(`${engine}: four supplied images, original bytes, profile discovery, and version-specific dinner links passed`);
}
