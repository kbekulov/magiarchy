import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function testRiverChoir(page, origin, engine) {
  const json = file => JSON.parse(fs.readFileSync(file, 'utf8'));
  const chapters = json('story/index.json'), moments = json('moments/index.json');
  const parts = [
    ['the-empty-boats-beneath-the-bridge', 'v4', 'Kyrien', 'the-boat-beneath-the-bridge', 'v5', null],
    ['the-water-beneath-her-feet', 'v1', 'Lynleit', 'the-water-beneath-her-feet', 'v1', 'river-incident'],
    ['the-wrong-bank', 'v1', 'Kyrien', 'the-wrong-bank', 'v1', 'after-the-river']
  ];
  for (const [slug, version, narrator, momentSlug, momentVersion] of parts) {
    const c = chapters.find(c => c.slug === slug), m = moments.find(m => m.slug === momentSlug);
    assert.equal(c.defaultVersion, version);
    assert.equal(m.defaultVersion, momentVersion);
    assert.equal(m.chapterSlug, slug);
    assert.equal(m.chapterVersion, version);
    assert.equal(c.timelinePhase, 'unknowing-convergence');
    const text = fs.readFileSync(`story/${c.file}`, 'utf8');
    assert.ok(text.split(/\s+/).length >= 3000, `${slug}: retain a full-length chapter`);
    assert.ok(text.includes(`${narrator}.*`));
    assert.ok(!text.includes('—'), 'No em dashes');
  }
  const second = fs.readFileSync('story/the-water-beneath-her-feet.md', 'utf8');
  assert.ok(second.indexOf('black leather gloves') < second.indexOf('Blue flame ran'));
  assert.ok(second.indexOf('other sleeve') < second.indexOf('Blue flame ran'));
  assert.ok(second.includes('where nobody was close enough to see me practising'));
  const third = fs.readFileSync('story/the-wrong-bank.md', 'utf8');
  assert.ok(third.includes("I couldn't see the eyes from where I was."));
  assert.ok(third.includes('She described sewn eyelids'));
  assert.ok(third.includes("The branches didn't move with it."));
  assert.ok(third.includes("I didn't tell anyone about the water."));

  const visit = async route => {
    await page.goto(`${origin}/${route}`);
    await page.waitForLoadState('networkidle');
  };
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [slug, version, narrator, momentSlug, momentVersion, panel] of parts) {
      await visit(`story.html?chapter=${slug}`);
      await page.locator('#chapter-reader h1').waitFor();
      if (chapters.find(c => c.slug === slug).versions.length > 1) {
        assert.equal(await page.getByRole('combobox', { name: 'Choose version' }).inputValue(), version);
      }
      assert.ok((await page.locator('#chapter-reader').innerText()).includes(narrator));
      assert.ok(await page.locator('#chapter-reader .behavior-gutter-marker').count() > 0);
      assert.equal(await page.locator('#chapter-reader-view .content-notice').count(), 0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      if (panel) assert.ok(await page.locator(`#chapter-panel-links a[href="gallery.html?panels=${panel}"]`).isVisible());
      const next = parts[parts.findIndex(p => p[0] === slug) + 1];
      if (next) {
        const link = page.locator(`#chapter-reader a[href="story.html?chapter=${next[0]}"]`);
        assert.equal(await link.count(), 1, 'Reader has a next-part link');
        await link.click();
        await page.waitForURL(`**/story.html?chapter=${next[0]}`);
      }
      await visit(`moments.html?moment=${momentSlug}`);
      if (moments.find(m => m.slug === momentSlug).versions.length > 1) {
        assert.equal(await page.getByRole('combobox', { name: 'Choose version' }).inputValue(), momentVersion);
      }
      assert.equal(await page.locator(`#moment-connection-grid a[href="story.html?chapter=${slug}&version=${version}"]`).count(), 1);
      if (panel) assert.ok(await page.locator(`#moment-connection-grid a[href="gallery.html?panels=${panel}"]`).isVisible());
      await visit(`story.html?chapter=${slug}`);
      await page.locator('#chapter-reader h1').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `test-results/${engine}-river-choir-${slug}-${width}.png` });
    }
    await visit('story.html?chapter=the-empty-boats-beneath-the-bridge&version=v3');
    assert.ok((await page.locator('#chapter-reader').innerText()).includes('From the trees, Kyrien watched without moving.'));
    assert.ok(await page.locator('#chapter-reader .behavior-gutter-marker').count() >= 7, 'Historical notes preserved');
    await visit('moments.html?moment=the-boat-beneath-the-bridge&version=v4');
    assert.ok((await page.locator('#moment-known').innerText()).includes('Only Kyrien witnesses'));
    await visit('character.html?character=kyrien');
    assert.ok((await page.locator('#character-moment-grid').innerText()).includes('The Wrong Bank'));
    await visit('docs.html?doc=prose-style-history');
    assert.ok((await page.locator('#document-reader').innerText()).includes('FP01-FP16 acceptance review'));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  }
  await page.route('**/story/the-wrong-bank.md', route => route.fulfill({ body: '# Link safety\n\n[Local](../story.html?chapter=the-water-beneath-her-feet) [Unsafe](javascript:alert%281%29) [External](https://example.com/)\n\n**Bold** *Emphasis* `code`', contentType: 'text/plain' }));
  await visit('story.html?chapter=the-wrong-bank');
  assert.equal(await page.locator('#chapter-reader a[href^="javascript:"]').count(), 0);
  assert.equal(await page.locator('#chapter-reader a[href="story.html?chapter=the-water-beneath-her-feet"]').count(), 1);
  assert.equal(await page.locator('#chapter-reader a[href="https://example.com/"]').getAttribute('rel'), 'noopener noreferrer');
  assert.equal(await page.locator('#chapter-reader strong').innerText(), 'Bold');
  assert.equal(await page.locator('#chapter-reader em').innerText(), 'Emphasis');
  assert.equal(await page.locator('#chapter-reader code').innerText(), 'code');
  await page.unroute('**/story/the-wrong-bank.md');
  console.log(`${engine}: River Choir length, POV boundaries, history, notes, safe links, panel links and responsive readers passed.`);
}
