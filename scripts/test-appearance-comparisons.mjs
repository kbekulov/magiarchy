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
      const table = page.getByRole('table', { name: 'Relative proportions' });
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
        'Natalia > Lynleit > Helena > Yulia ≈ Sherie ≈ Myka',
        'Natalia > Helena = Sherie = Lynleit ≥ Yulia = Myka',
        'Natalia > Helena = Sherie ≥ Lynleit = Yulia = Myka'
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
    }
  }
  await visit('character.html?character=kyrien#appearance-title');
  assert.equal(await page.locator('.appearance-comparison-table').count(), 0);
  await visit('docs.html?doc=character-image-production#comparative-female-builds');
  assert.equal(await page.getByRole('heading', { name: 'Comparative female builds', exact: true }).count(), 1);
  assert.equal(await page.getByRole('combobox', { name: 'Choose version' }).inputValue(), 'v19');
  await page.getByRole('combobox', { name: 'Choose version' }).selectOption('v18');
  await page.waitForURL(url => url.searchParams.get('version') === 'v18');
  await page.waitForLoadState('networkidle');
  assert.equal(await page.getByRole('heading', { name: 'Comparative female builds', exact: true }).count(), 0);
  await visit('index.html');
  await page.locator('#update-character-build-comparisons').getByRole('link', { name: 'Compare appearances' }).click();
  await page.waitForLoadState('networkidle');
  assert.ok(page.url().endsWith('character=lynleit#appearance-title'));
  assert.equal(await page.locator('.appearance-comparison-table mark[data-character="lynleit"]').count(), 3);
  console.log(`${engine}: six profile highlights, comparison order, four viewport sizes, unrelated-profile isolation, document history and Home link passed.`);
}
