import assert from 'node:assert/strict';

export async function testAppearanceComparisons(page, origin, engine) {
  const names = ['lynleit', 'sherie', 'yulia', 'natalia', 'helena', 'myka'];
  const visit = async route => {
    await page.goto(`${origin}/${route}`);
    await page.waitForLoadState('networkidle');
  };
  for (const width of [320, 390, 820, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    for (const slug of width === 390 ? names : ['lynleit']) {
      await visit(`character.html?character=${slug}#appearance-title`);
      const disclosure = page.locator('.appearance-comparison-disclosure');
      const table = page.locator('.appearance-comparison-table');
      assert.equal(await disclosure.getAttribute('open'), null, `${slug}: must start collapsed`);
      assert.equal(await table.isVisible(), false);
      const toggle = disclosure.locator('summary');
      assert.ok((await toggle.boundingBox()).height >= 44);
      await toggle.click();
      assert.ok(await table.isVisible());
      assert.ok((await table.locator('th').first().boundingBox()).width < (await table.boundingBox()).width * .35, `${engine}: comparison label column grew too wide`);
      if (slug === 'lynleit' && width === 390) {
        await toggle.focus();
        await page.keyboard.press('Enter');
        assert.equal(await table.isVisible(), false);
        await page.keyboard.press('Space');
        assert.ok(await table.isVisible());
      }
      assert.equal(await table.count(), 1);
      assert.equal(await table.locator('tbody tr').count(), 3);
      assert.equal(await table.locator('mark').count(), 3);
      assert.deepEqual(await table.locator('mark').evaluateAll(nodes => nodes.map(node => node.dataset.character)), [slug, slug, slug]);
      for (const row of await table.locator('tbody tr').all()) {
        assert.equal(await row.locator('[data-character]').count(), 6);
        assert.deepEqual((await row.locator('[data-character]').evaluateAll(nodes => nodes.map(node => node.dataset.character))).sort(), [...names].sort());
      }
      const rows = await table.locator('tr').evaluateAll(nodes => nodes.map(row => [...row.querySelectorAll('.appearance-comparison-symbol, .appearance-comparison-name')].map(node => node.textContent).join(' ')));
      assert.deepEqual(rows, [
        'Natalia > Lynleit ≈ Helena > Yulia ≈ Sherie ≈ Myka',
        'Natalia > Helena ≈ Sherie ≈ Lynleit ≥ Yulia ≈ Myka',
        'Natalia > Helena ≈ Sherie ≥ Lynleit ≈ Yulia ≈ Myka'
      ]);
      assert.ok(await table.evaluate(node => node.closest('dd').previousElementSibling.previousElementSibling.previousElementSibling.textContent === 'Height and build'));
      assert.ok(await table.locator('mark').first().evaluate(node => getComputedStyle(node).backgroundColor !== 'rgba(0, 0, 0, 0)'));
      assert.equal(await table.locator('.archive-entity-link').count(), 0);
      assert.equal(await table.getAttribute('aria-describedby'), 'appearance-comparison-key');
      assert.ok(await table.locator('.sr-only').first().textContent());
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${slug}: page overflow at ${width}`);
      assert.ok(await table.evaluate(node => {
        const bounds = node.getBoundingClientRect();
        return [...node.querySelectorAll('.appearance-comparison-step')].every(step => {
          const rect = step.getBoundingClientRect();
          return rect.left >= bounds.left && rect.right <= bounds.right + 1;
        });
      }), `${slug}: clipped comparison at ${width}`);
      await page.locator('.profile-appearance').screenshot({ path: `test-results/${engine}-appearance-${slug}-${width}.png` });
      await toggle.click();
      assert.equal(await table.isVisible(), false);
      if (slug === 'lynleit') await page.locator('.profile-appearance').screenshot({ path: `test-results/${engine}-appearance-collapsed-${width}.png` });
      if (slug === 'lynleit' || slug === 'helena') assert.match(await page.locator('#character-appearance').textContent(), /169 cm, the same height as/);
    }
  }
  const men = ['reiner', 'fionn', 'heyk', 'drake', 'kyrien', 'felix', 'tien', 'hiyu'];
  for (const width of [320, 390, 820, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    for (const slug of width === 390 ? men : ['kyrien']) {
      await visit(`character.html?character=${slug}#appearance-title`);
      const disclosure = page.locator('.appearance-comparison-disclosure');
      const table = page.getByRole('table', { name: 'Relative proportions', includeHidden: true });
      assert.equal(await disclosure.getAttribute('open'), null);
      assert.equal(await table.isVisible(), false);
      await disclosure.locator('summary').click();
      assert.ok(await table.isVisible());
      assert.equal(await table.locator('tr').count(), 4);
      assert.equal(await table.locator('mark').count(), 4);
      assert.deepEqual(await table.locator('mark').evaluateAll(nodes => nodes.map(node => node.dataset.character)), [slug, slug, slug, slug]);
      assert.deepEqual(await table.locator('th').allTextContents(), ['Height', 'Shoulder breadth', 'Body bulk', 'Muscle bulk']);
      const chains = await table.locator('tr').evaluateAll(rows => rows.map(row => [...row.querySelectorAll('.appearance-comparison-symbol, .appearance-comparison-name')].map(node => node.textContent).join(' ')));
      assert.deepEqual(chains, [
        'Reiner ≈ Drake ≈ Hiyu > Fionn ≈ Heyk ≈ Kyrien ≈ Felix ≈ Tien',
        'Reiner > Heyk ≥ Kyrien ≈ Hiyu ≈ Felix ≈ Tien ≥ Fionn > Drake',
        'Reiner > Heyk ≥ Fionn > Felix ≈ Tien ≥ Kyrien ≈ Hiyu > Drake',
        'Reiner > Heyk ≥ Fionn ≥ Felix ≈ Tien > Kyrien ≈ Hiyu ≈ Drake'
      ]);
      for (const row of await table.locator('tr').all()) {
        assert.equal(await row.locator('[data-character]').count(), 8);
        assert.deepEqual((await row.locator('[data-character]').evaluateAll(nodes => nodes.map(node => node.dataset.character))).sort(), [...men].sort());
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      assert.ok(await table.evaluate(node => [...node.querySelectorAll('.appearance-comparison-step')].every(step => step.getBoundingClientRect().right <= node.getBoundingClientRect().right + 1)));
      const description = await page.locator('#character-appearance').textContent();
      if (slug === 'kyrien') assert.match(description, /180 cm.*modelling menswear.*poet.*tactician/s);
      if (slug === 'fionn') assert.match(description, /average shoulder breadth/);
      if (slug === 'heyk') assert.match(description, /stocky, muscular/);
      if (slug === 'hiyu') assert.match(description, /natural skeletal proportions/);
      if (slug === 'drake') assert.match(description, /appear underweight/);
      await page.locator('.profile-appearance').screenshot({ path: `test-results/${engine}-appearance-${slug}-${width}.png` });
      await disclosure.locator('summary').click();
      assert.equal(await table.isVisible(), false);
    }
  }
  await visit('character.html?character=lester#appearance-title');
  assert.equal(await page.locator('.appearance-comparison-table').count(), 0);
  await visit('docs.html?doc=character-image-production#comparative-female-builds');
  assert.equal(await page.getByRole('heading', { name: 'Comparative female builds', exact: true }).count(), 1);
  assert.equal(await page.getByRole('combobox', { name: 'Choose version' }).inputValue(), 'v22');
  assert.equal(await page.getByRole('heading', { name: 'Comparative male builds', exact: true }).count(), 1);
  await page.getByRole('combobox', { name: 'Choose version' }).selectOption('v18');
  await page.waitForURL(url => url.searchParams.get('version') === 'v18');
  await page.waitForLoadState('networkidle');
  assert.equal(await page.getByRole('heading', { name: 'Comparative female builds', exact: true }).count(), 0);
  assert.equal(await page.getByRole('heading', { name: 'Comparative male builds', exact: true }).count(), 0);
  await visit('index.html');
  const updatesToggle = page.locator('[data-news-toggle]').first();
  if (await updatesToggle.getAttribute('aria-expanded') === 'false') await updatesToggle.click();
  await page.locator('#update-character-build-comparisons').getByRole('link', { name: 'Compare appearances' }).click();
  await page.waitForLoadState('networkidle');
  assert.ok(page.url().endsWith('character=lynleit#appearance-title'));
  assert.equal(await page.locator('.appearance-comparison-table mark[data-character="lynleit"]').count(), 3);
  assert.equal(await page.locator('.appearance-comparison-table').isVisible(), false);
  console.log(`${engine}: fourteen profile highlights, collapsed disclosures, mouse/keyboard toggles, male/female comparison order, four viewport sizes, document history and Home link passed.`);
}
