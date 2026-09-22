import assert from 'node:assert/strict';

// The dramatized recruitment and the preceding outlines have different evidence.
export async function testKyrienOrigin(page, origin, engine) {
  const visit = async route => {
    await page.goto(`${origin}/${route}`);
    await page.waitForLoadState('networkidle');
  };
  const fits = async label => assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${label}: page overflow`);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('story.html?chapter=after-the-failed-attempt');
    await page.locator('#chapter-reader h1').waitFor();
    assert.equal(await page.locator('#chapter-source-link').getAttribute('href'), 'story/after-the-failed-attempt-v3.md');
    assert.equal(await page.getByRole('combobox', { name: 'Choose version' }).inputValue(), 'v3');
    assert.ok(await page.locator('.chapter-preface-legend').isVisible());
    assert.equal(await page.locator('#chapter-event-list .is-inferred').count(), 1);
    assert.equal(await page.locator('#chapter-reader .behavior-gutter-marker').count(), 3);
    assert.ok((await page.locator('#chapter-reader').innerText()).includes("I'm sorry. I thought I could manage the shopping."));
    const marker = page.locator('#chapter-reader .behavior-gutter-marker').first();
    await marker.click();
    assert.ok(await page.locator('#behavior-note-tooltip').isVisible());
    await page.keyboard.press('Escape');
    assert.ok(await page.locator('#behavior-note-tooltip').isHidden());
    await fits(`Chapter v3/${width}`);
    await page.getByRole('heading', { name: 'The interview', exact: true }).scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${engine}-kyrien-interview-${width}.png` });

    await page.getByRole('combobox', { name: 'Choose version' }).selectOption('v2');
    await page.waitForURL('**/story.html?chapter=after-the-failed-attempt&version=v2');
    await page.waitForLoadState('networkidle');
    await page.locator('#chapter-reader h1').waitFor();
    assert.equal(await page.locator('#chapter-source-link').getAttribute('href'), 'story/after-the-failed-attempt-v2.md');
    assert.ok(await page.locator('.chapter-preface-legend').isHidden());
    assert.equal(await page.locator('#chapter-event-list .is-inferred').count(), 0);
    assert.equal(await page.locator('#chapter-reader .behavior-gutter-marker').count(), 1);

    await visit('moments.html?moment=interrogation-after-the-failed-attempt');
    assert.ok(await page.locator('.moment-fact-legend').isVisible());
    assert.equal(await page.locator('#moment-known .is-inferred').count(), 1);
    assert.equal(await page.locator('#moment-known .behavior-gutter-marker').count(), 3);
    assert.equal(await page.locator('#moment-connection-grid a[href="story.html?chapter=after-the-failed-attempt&version=v3"]').count(), 1);
    await fits(`Interrogation Moment/${width}`);
    await visit('moments.html?moment=interrogation-after-the-failed-attempt&version=v2');
    assert.ok(await page.locator('.moment-fact-legend').isHidden());

    await visit('moments.html?moment=the-prosecutors-return');
    assert.ok(await page.locator('#moment-error').isHidden());
    assert.equal(await page.locator('#moment-phase-name').innerText(), 'Arc unassigned · Unplaced');
    assert.ok(await page.locator('.moment-fact-legend').isHidden());
    assert.equal(await page.locator('#moment-known .is-inferred').count(), 0);
    await fits(`Unplaced prosecutor Moment/${width}`);

    for (const slug of ['lynleit', 'kyrien']) {
      await visit(`character.html?character=${slug}`);
      assert.equal(await page.locator('#character-moment-grid a[href="moments.html?moment=the-prosecutors-return"]').count(), 1);
      await fits(`${slug}/${width}`);
    }
    for (const [file, id] of [['church.html', 'prosecutor-general'], ['msf.html', 'represented-recruitment']]) {
      await visit(`${file}#${id}`);
      assert.ok(await page.locator(`#${id}`).isVisible());
      await fits(`${file}/${width}`);
    }
    for (const slug of ['kyrien-origin-and-recruitment', 'reader-knowledge', 'arc-zero-development', 'character-behavior-audit']) {
      await visit(`docs.html?doc=${slug}`);
      await page.locator('#document-reader h1').waitFor();
      assert.ok(await page.locator('#document-error').isHidden());
      await fits(`${slug}/${width}`);
      if (slug === 'kyrien-origin-and-recruitment') {
        assert.equal(await page.locator('#document-reader a[href$="moments.html?moment=the-prosecutors-return"]').count(), 1);
        await page.locator('#document-reader h1').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `test-results/${engine}-kyrien-origin-${width}.png` });
      }
    }
  }
  console.log(`${engine}: Kyrien recruitment, historical outlines, paragraph notes, and unplaced revenge links passed.`);
}
