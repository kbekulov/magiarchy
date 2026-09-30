import assert from 'node:assert/strict';

export async function testFirstPersonProse(page, origin, engine) {
  const visit = async route => {
    await page.goto(origin + '/' + route);
    await page.waitForLoadState('networkidle');
  };
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    await visit('docs.html?doc=first-person-prose');
    assert.equal(await page.locator('#document-reader h3').filter({ hasText: /^FP\d{2} / }).count(), 16);
    const text = await page.locator('#document-reader').innerText();
    assert.ok(text.includes('five complete accounts'));
    assert.ok(text.includes('Mandatory audit procedure'));
    assert.ok(text.includes('not editorial sign-off') || text.includes('not an editorial sign-off'));
    assert.ok(await page.locator('#document-error').isHidden());
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: 'test-results/' + engine + '-first-person-' + width + '.png' });
    await visit('docs.html?doc=prose-style');
    assert.ok((await page.locator('#document-reader').innerText()).includes('Mandatory first person standard'));
    await page.locator('#document-reader a[href*="doc=first-person-prose"]').first().click();
    await page.waitForLoadState('networkidle');
    assert.ok(page.url().includes('doc=first-person-prose'));
  }
  await visit('docs.html?doc=prose-style&version=v14');
  assert.ok(!(await page.locator('#document-reader').innerText()).includes('Mandatory first person standard'));
  assert.ok((await page.locator('#document-reader').innerText()).includes('No samples were present'));
  await visit('index.html');
  assert.ok(await page.locator('#update-first-person-prose-standard').isVisible());
  console.log(engine + ': first-person standard, 16 rules, house-style links, historical isolation and three reader widths passed.');
}
