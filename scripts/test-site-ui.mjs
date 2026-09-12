import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { chromium, webkit } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.md': 'text/plain', '.mp3': 'audio/mpeg' };
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const file = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { response.writeHead(404); response.end(); return; }
  response.setHeader('Content-Type', `${mime[path.extname(file)] || 'application/octet-stream'}; charset=utf-8`);
  fs.createReadStream(file).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
fs.mkdirSync(path.join(root, 'test-results'), { recursive: true });
const pages = fs.readdirSync(root).filter(file => file.endsWith('.html')).map(file => file === 'character.html' ? `${file}?character=lynleit` : file);
const characterSource = fs.readFileSync(path.join(root, 'character.js'), 'utf8');
const profiles = vm.runInNewContext(`${characterSource.slice(0, characterSource.indexOf('const profilesBySlug'))}; profileSeeds`);
try {
  for (const engine of (process.env.TEST_BROWSERS || 'chromium').split(',')) {
    const browser = await ({ chromium, webkit }[engine]).launch({ headless: true });
    try {
      const page = await browser.newPage({ reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('https://**/*', route => route.abort());
      const visit = async route => {
        await page.goto(`${origin}/${route}`);
        await page.waitForLoadState('networkidle');
      };
      for (const width of [390, 820, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        for (const route of pages) {
          await visit(route);
          assert.ok(await page.locator('.site-footer').count(), `${route}: ownership footer`);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route}/${width}: page overflow`);
          if (route === 'items.html') {
            const clipped = await page.locator('.item-record-copy h3').evaluateAll(headings => headings.some(h => h.scrollWidth > h.clientWidth + 1));
            assert.ok(!clipped, `Item titles clipped at ${width}px`);
            if (width === 390) assert.equal(await page.locator('.item-record-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length), 1);
            await page.screenshot({ path: `test-results/${engine}-items-${width}.png`, fullPage: true });
          }
        }
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await visit('characters.html');
      for (const profile of profiles) {
        assert.equal(await page.locator(`.character-card[data-name="${profile.name}"] .character-info > p`).textContent(), profile.summary, `${profile.name}: preview drift`);
      }
      const nav = page.locator('.nav-links');
      const toggle = page.getByRole('button', { name: 'Toggle navigation' });
      assert.ok(await nav.evaluate(el => el.inert));
      await toggle.focus();
      await page.keyboard.press('Tab');
      assert.ok(!await nav.evaluate(el => el.contains(document.activeElement)), 'Closed menu receives keyboard focus');
      await toggle.click();
      assert.ok(!await nav.evaluate(el => el.inert));
      await nav.locator('a').first().focus();
      await page.keyboard.press('Escape');
      assert.ok(await toggle.evaluate(el => el === document.activeElement));
      await page.getByRole('button', { name: 'Search archive', exact: true }).click();
      await page.getByPlaceholder('Search characters, scenes, Holumns, weapons...').fill('Doom');
      await page.waitForFunction(() => document.querySelector('.global-search-result'));
      const current = await page.locator('.global-search-result').evaluateAll(links => links.map(link => link.getAttribute('href')));
      assert.ok(current.includes('story.html?chapter=doom-has-an-address&version=v7'), 'Canon chapter missing from search');
      assert.ok(!current.some(url => /(?:chapter|moment)=doom-has-an-address&version=v[1-6](?:$|&)/.test(url)), 'Historical Doom revision shown by default');
      await page.getByLabel('Include earlier versions').check();
      assert.ok(await page.locator('.global-search-result[href*="chapter=doom-has-an-address&version=v4"]').count(), 'History filter lost earlier chapter');
      assert.equal(await page.locator('.sr-only a, .site-footer .archive-entity-link').count(), 0, 'Automatic links entered hidden labels or ownership');
      await visit('holumns.html');
      const holumns = JSON.parse(fs.readFileSync(path.join(root, 'holumns/index.json'), 'utf8'));
      assert.equal(await page.locator('[data-incident]').count(), holumns.incidents.length);
      assert.equal(await page.locator('[data-holumn-type]').count(), holumns.types.length);
      await page.screenshot({ path: `test-results/${engine}-holumns.png`, fullPage: true });
      const moments = JSON.parse(fs.readFileSync(path.join(root, 'moments/index.json'), 'utf8'));
      const outline = moments.find(moment => !moment.chapterSlug && !moment.prose?.length && !moment.versions?.length);
      await visit(`moments.html?moment=${outline.slug}`);
      assert.equal(await page.locator('#moment-known-title').textContent(), 'Recorded scene facts');
      assert.ok(await page.locator('.moment-fact-legend').isHidden());
      assert.equal(await page.locator('#moment-known li.is-reader, #moment-known li.is-inferred').count(), 0);
      await visit('character.html?character=lynleit');
      assert.ok(await page.locator('.profile-art-thumbnails img').count());
      const thumbs = await page.locator('.profile-art-thumbnails img').evaluateAll(images => images.every(image => image.src.endsWith('.webp')));
      assert.ok(thumbs, 'Portrait thumbnails load full-size originals');
      await page.locator('.profile-art-thumbnails button').first().click();
      await page.screenshot({ path: `test-results/${engine}-portrait.png`, fullPage: true });
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        for (const [slug, other] of [['sherie', 'felix'], ['felix', 'sherie']]) {
          await visit(`character.html?character=${slug}`);
          await page.locator(`.relationship-node[data-slug="${other}"]`).click();
          assert.ok((await page.locator('.relationship-map-detail').textContent()).includes('no meaningful personal relationship'), `${slug}: relationship detail is stale`);
          assert.ok((await page.locator('.sexual-tension-module').textContent()).includes('Author-confirmed direction'), `${slug}: tension registry is stale`);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${slug}/${width}: relationship content overflow`);
        }
      }
      await visit('docs.html?doc=character-intimacy-and-sexuality');
      assert.ok((await page.locator('#document-reader').textContent()).includes('Two relationship directions'), 'Current intimacy document is stale');
      await visit('docs.html?doc=character-intimacy-and-sexuality&version=v8');
      assert.ok(!(await page.locator('#document-reader').textContent()).includes('Two relationship directions'), 'New prose leaked into v8');
      assert.ok((await page.locator('#document-reader').textContent()).includes('Mutual play, sincerity unresolved'), 'Archived tension data was not preserved');
      await page.setViewportSize({ width: 1440, height: 900 });
      for (const [route, selector] of [['characters.html', '.character-card'], ['gallery.html', '.gallery-card'], ['music.html', '.music-card'], ['docs.html', '.document-card'], ['moments.html', '.moment-card']]) {
        await visit(route);
        const cards = page.locator(selector);
        assert.ok(await cards.count(), `${route}: no masonry cards`);
        const neighbor = cards.nth(1);
        const relativePosition = el => {
          const box = el.getBoundingClientRect(), grid = el.parentElement.getBoundingClientRect();
          return { x: box.x - grid.x, y: box.y - grid.y };
        };
        const before = await neighbor.evaluate(relativePosition);
        await cards.first().hover();
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const after = await neighbor.evaluate(relativePosition);
        assert.ok(before && after && Math.abs(before.x - after.x) < 1 && Math.abs(before.y - after.y) < 1, `${route}: hovering a card displaced its neighbor`);
      }
      assert.deepEqual(errors, [], `${engine}: browser script errors`);
      console.log(`${engine}: ${pages.length} routes at 3 widths, menu keyboard access, version search, Holumn coverage, outline labels, portrait thumbnails passed.`);
    } finally { await browser.close(); }
  }
} finally { await new Promise(resolve => server.close(resolve)); }
