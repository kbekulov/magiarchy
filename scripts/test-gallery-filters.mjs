import assert from 'node:assert/strict';

export async function testGalleryFilters(page, origin, engine) {
  for (const width of [360, 820, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/gallery.html`);
    await page.waitForLoadState('networkidle');
    const controls = {
      chibi: page.locator('#gallery-chibi-filter'),
      exclude: page.locator('#gallery-exclude-chibi-filter'),
      pencil: page.locator('#gallery-pencil-filter'),
      colored: page.locator('#gallery-colored-filter')
    };
    const click = async name => controls[name].locator('..').click();
    const cards = await page.locator('.gallery-card').evaluateAll(items => items.map(item => ({
      id: item.dataset.image,
      chibi: item.dataset.chibi === 'true',
      finish: item.dataset.artFinish,
      characters: item.dataset.character.split(/\s+/),
      location: item.dataset.location,
      preview: !item.dataset.imageVersionGroup || item.dataset.imageVersionDefault === 'true'
    })));
    assert.ok(cards.every(card => ['pencil', 'colored'].includes(card.finish)), 'Every artwork needs an explicit finish');
    assert.ok(cards.some(card => card.finish === 'pencil'));
    assert.ok(cards.some(card => card.finish === 'colored'));
    const checkResults = async (format, finish, character = 'all', location = 'all') => {
      const expected = cards.filter(card => card.preview
        && (format === 'all' || (format === 'chibi' ? card.chibi : !card.chibi))
        && (finish === 'all' || card.finish === finish)
        && (character === 'all' || card.characters.includes(character))
        && (location === 'all' || card.location === location));
      assert.deepEqual(await page.locator('.gallery-card:not([hidden])').evaluateAll(items => items.map(item => item.dataset.image)), expected.map(card => card.id));
      assert.equal(await page.locator('#gallery-result-count').textContent(), String(expected.length));
      assert.equal(await page.locator('#gallery-empty-state').isVisible(), expected.length === 0);
    };
    for (const format of ['all', 'chibi', 'exclude']) {
      if (format !== 'all') await click(format);
      assert.equal(await controls.chibi.isChecked(), format === 'chibi');
      assert.equal(await controls.exclude.isChecked(), format === 'exclude');
      for (const finish of ['pencil', 'colored', 'all']) {
        await click(finish === 'all' ? 'colored' : finish);
        assert.equal(await controls.pencil.isChecked(), finish === 'pencil');
        assert.equal(await controls.colored.isChecked(), finish === 'colored');
        await checkResults(format, finish);
      }
    }
    // Switching back also clears the other option, without changing the chibi pair.
    await click('colored');
    await controls.pencil.focus();
    await page.keyboard.press('Space');
    assert.equal(await controls.colored.isChecked(), false);
    assert.equal(await controls.exclude.isChecked(), true);
    await page.locator('#gallery-character-filter').selectOption('sherie');
    await page.locator('#gallery-location-filter').selectOption('unspecified');
    await checkResults('exclude', 'pencil', 'sherie', 'unspecified');
    assert.ok(await page.locator('.gallery-card:not([hidden])').count() > 0);
    await page.locator('#gallery-character-filter').selectOption('all');
    await page.locator('#gallery-location-filter').selectOption('all');
    await click('pencil');
    await click('exclude');
    await checkResults('all', 'all');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.locator('#gallery-toolbar').screenshot({ path: `test-results/${engine}-gallery-filters-${width}.png` });
  }
}
