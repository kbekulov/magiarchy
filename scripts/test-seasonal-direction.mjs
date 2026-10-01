import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testSeasonalDirection(page, origin, engine) {
  const records = JSON.parse(fs.readFileSync('docs/index.json', 'utf8'));
  const cases = [
    ['thematic-direction', 'Late summer into golden autumn', 'late-summer-into-golden-autumn', 'v4'],
    ['character-image-production', 'Seasonal setting and colour', 'seasonal-setting-and-colour', 'v11'],
    ['world-foundation', 'The opening season', 'the-opening-season', 'v5']
  ];
  const visit = async route => {
    await page.goto(`${origin}/${route}`);
    await page.waitForLoadState('networkidle');
  };
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [slug, heading, anchor, previous] of cases) {
      const record = records.find(entry => entry.slug === slug);
      await visit(`docs.html?doc=${slug}#${anchor}`);
      const section = page.getByRole('heading', { name: heading, exact: true });
      assert.ok(await section.isVisible(), `${slug}: seasonal section missing`);
      assert.equal(await section.getAttribute('id'), anchor);
      assert.equal(await page.locator('#document-source-link').getAttribute('href'), `docs/${record.file}`);
      assert.equal(await page.getByRole('combobox', { name: 'Choose version' }).inputValue(), record.defaultVersion);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${slug}: overflow`);
      if (slug === 'thematic-direction') await page.screenshot({ path: `test-results/${engine}-golden-autumn-${width}.png` });
      await page.getByRole('combobox', { name: 'Choose version' }).selectOption(previous);
      await page.waitForURL(url => url.searchParams.get('version') === previous);
      await page.waitForLoadState('networkidle');
      assert.equal(await page.getByRole('heading', { name: heading, exact: true }).count(), 0, `${slug}: new direction leaked into history`);
      assert.equal(await page.locator('#document-source-link').getAttribute('href'), `docs/${record.versions.find(version => version.id === previous).file}`);
    }
    await visit('story.html');
    assert.match(await page.locator('#story-heading').textContent(), /last warmth of summer.*golden autumn/s);
    const arc = await page.evaluate(() => window.MAGIARCHY_STORY_ARCS.find(entry => entry.id === 'arc-1'));
    assert.match(arc.description, /very late summer/);
    assert.match(arc.description, /several years/);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await visit('index.html');
    if (await page.locator('[data-news-toggle]').first().getAttribute('aria-expanded') === 'false') {
      await page.locator('[data-news-toggle]').first().click();
    }
    const update = page.locator('#update-golden-autumn-direction');
    assert.ok(await update.isVisible());
    await update.getByRole('link', { name: 'Read the direction' }).click();
    await page.waitForLoadState('networkidle');
    assert.ok(await page.getByRole('heading', { name: 'Late summer into golden autumn', exact: true }).isVisible());
  }
  console.log(`${engine}: seasonal direction, version isolation and phone/desktop readers passed.`);
}
