import assert from 'node:assert/strict';

export async function testNarveanFog(page, origin, engine) {
  const visit = async route => {
    await page.goto(`${origin}/${route}`);
    await page.waitForLoadState('networkidle');
  };
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('duchy.html#fog');
    await page.locator('#fog').scrollIntoViewIfNeeded();
    assert.ok(await page.locator('#fog-title').isVisible());
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `test-results/${engine}-narvean-fog-${width}.png` });
    await visit('docs.html?doc=duchy-of-narvea');
    await page.locator('#document-reader h1').waitFor();
    assert.equal(await page.getByRole('combobox', { name: 'Choose version' }).inputValue(), 'v2');
    assert.ok((await page.locator('#document-reader').innerText()).includes('Narvean fog'));
    await page.getByRole('combobox', { name: 'Choose version' }).selectOption('v1');
    await page.waitForURL('**/docs.html?doc=duchy-of-narvea&version=v1');
    await page.waitForLoadState('networkidle');
    assert.ok(!(await page.locator('#document-reader').innerText()).includes('Narvean fog'));
    await visit('docs.html?doc=dread-and-action-direction');
    await page.locator('#document-reader h1').waitFor();
    assert.ok((await page.locator('#document-reader').innerText()).includes('Fog and visibility'));
    await page.getByRole('combobox', { name: 'Choose version' }).selectOption('v2');
    await page.waitForURL('**/docs.html?doc=dread-and-action-direction&version=v2');
    await page.waitForLoadState('networkidle');
    assert.ok(!(await page.locator('#document-reader').innerText()).includes('Fog and visibility'));
    await visit('story.html?chapter=the-empty-boats-beneath-the-bridge');
    await page.locator('#chapter-reader h1').waitFor();
    assert.equal(await page.locator('#chapter-source-link').getAttribute('href'), 'story/the-empty-boats-beneath-the-bridge-v3.md');
    const river = await page.locator('#chapter-reader').innerText();
    assert.ok(river.includes('The water nearest the bank was visible beneath the branches.'));
    assert.ok(river.includes('From the trees, Kyrien watched without moving.'));
    const notes = await page.locator('#chapter-reader .behavior-gutter-marker').count();
    assert.ok(notes > 0);
    assert.ok(await page.locator('#chapter-panel-links a[href="gallery.html?panels=river-incident"]').isVisible());
    await visit('story.html?chapter=the-empty-boats-beneath-the-bridge&version=v2');
    await page.locator('#chapter-reader h1').waitFor();
    assert.ok(!(await page.locator('#chapter-reader').innerText()).includes('Fog had delayed their drive'));
    assert.equal(await page.locator('#chapter-reader .behavior-gutter-marker').count(), notes);
    await visit('moments.html?moment=the-boat-beneath-the-bridge');
    assert.equal(await page.getByRole('combobox', { name: 'Choose version' }).inputValue(), 'v4');
    assert.ok((await page.locator('#moment-known').innerText()).includes('Unusually heavy mist'));
    assert.equal(await page.locator('#moment-connection-grid a[href="story.html?chapter=the-empty-boats-beneath-the-bridge&version=v3"]').count(), 1);
    await visit('story.html?chapter=ash-under-glass');
    await page.locator('#chapter-reader h1').waitFor();
    assert.equal(await page.locator('#chapter-source-link').getAttribute('href'), 'story/ash-under-glass-v2.md');
    assert.ok(await page.locator('.chapter-preface-legend').isHidden());
    await visit('moments.html?moment=the-park-unit-is-lost');
    assert.equal(await page.getByRole('combobox', { name: 'Choose version' }).inputValue(), 'v2');
    assert.ok(await page.locator('.moment-fact-legend').isHidden());
    assert.equal(await page.locator('#moment-connection-grid a[href="story.html?chapter=ash-under-glass&version=v2"]').count(), 1);
  }
  console.log(`${engine}: Narvean fog, revision isolation, sightlines and outline evidence passed`);
}
