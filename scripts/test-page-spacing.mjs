import assert from 'node:assert/strict';

export async function testPageSpacing(page, origin, engine) {
  const readers = [
    ['gallery.html?panels=darkness', '.panel-reader'],
    ['gallery.html?panels=river-incident', '.panel-reader'],
    ['gallery.html?image=char-lynleit-2', '.gallery-reader-view'],
    ['docs.html?doc=prose-style', '.document-reader-view'],
    ['story.html?chapter=the-shared-night', '.document-reader-view'],
    ['moments.html?moment=the-shared-night', '.moment-reader'],
    ['character.html?character=lynleit', '.character-profile-content'],
    ['church.html', '.institution-scroll'],
    ['duchy.html', '.duchy-scroll'],
  ];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [route, selector] of readers) {
      await page.goto(`${origin}/${route}`);
      await page.waitForLoadState('networkidle');
      const reader = page.locator(selector);
      await reader.waitFor({ state: 'visible' });
      const inset = await reader.evaluate(element => {
        const child = [...element.children].find(el => el.getBoundingClientRect().height > 0);
        return {
          padding: parseFloat(getComputedStyle(element).paddingTop),
          childGap: child.getBoundingClientRect().top - element.getBoundingClientRect().top,
          breadcrumbPadding: child.matches('.document-breadcrumbs') ? parseFloat(getComputedStyle(child).paddingTop) : 0,
        };
      });
      assert.ok(inset.padding >= 16 && inset.padding <= 24, `${route}: shared inset at ${width}: ${JSON.stringify(inset)}`);
      assert.ok(inset.childGap >= inset.padding - 1, `${route}: first child stays inside inset`);
      assert.equal(inset.breadcrumbPadding, 0, `${route}: no doubled breadcrumb inset`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route}: no horizontal overflow`);
      if (route.includes('panels=')) {
        const header = await page.locator('.feed-header').boundingBox();
        const first = await reader.locator(':scope > *').first().boundingBox();
        if (header) assert.ok(first.y - (header.y + header.height) >= inset.padding - 1, `${route}: content clears header`);
        await page.screenshot({ path: `test-results/${engine}-spacing-${route.includes('darkness') ? 'notice' : 'panels'}-${width}.png` });
      }
      // A different first child must not remove the inset, nor gain a second one.
      const probeGap = await reader.evaluate(element => {
        const probe = document.createElement('div');
        probe.textContent = 'New page introduction';
        element.prepend(probe);
        const gap = probe.getBoundingClientRect().top - element.getBoundingClientRect().top;
        probe.remove();
        return gap;
      });
      assert.ok(Math.abs(probeGap - inset.padding) <= 1, `${route}: container-owned spacing survives insertion`);
    }
    for (const route of ['index.html', 'characters.html', 'gallery.html', 'docs.html', 'story.html', 'moments.html', 'music.html', 'world.html', 'weapons.html', 'items.html']) {
      await page.goto(`${origin}/${route}`);
      await page.waitForLoadState('networkidle');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route}: catalog width at ${width}`);
      const header = await page.locator('.feed-header').boundingBox();
      if (header) assert.equal(Math.round(header.height), 48, `${route}: header height unchanged`);
    }
  }
  console.log(`${engine}: shared page insets, insertion safety and catalog layouts passed at desktop/mobile widths.`);
}
