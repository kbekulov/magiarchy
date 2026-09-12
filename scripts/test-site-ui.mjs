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
      // Intermediate panes, not only page-wide overflow.
      for (const width of [700, 820, 950, 1024, 1200, 1600]) {
        await page.setViewportSize({ width, height: 900 });
        for (const [route, selector] of [['director-house.html', '.house-hero h1, .house-facts dd'], ['holumns.html', '.anarchy-effects strong, .anarchy-effects p']]) {
          await visit(route);
          const clipped = await page.locator(selector).evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 2).map(node => node.textContent));
          assert.deepEqual(clipped, [], `${engine}/${route}/${width}: internal text clipping`);
        }
      }
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await visit('gallery.html');
        const available = await page.locator('.gallery-card').evaluateAll(cards => ['all', ...new Set(cards.map(card => card.dataset.location))].sort());
        const options = await page.locator('#gallery-location-filter option').evaluateAll(nodes => nodes.map(node => node.value).sort());
        assert.deepEqual(options, available, 'Gallery offers an unpopulated location');
        await visit('music.html');
        const musicCount = await page.locator('.music-card').count();
        const playableCount = await page.locator('.music-card:has(audio)').count();
        assert.equal(await page.locator('.music-card:visible').count(), musicCount);
        await page.getByLabel('Playable only').check();
        assert.equal(await page.locator('.music-card:visible').count(), playableCount);
        assert.ok(page.url().includes('playable=1'));
        await page.reload();
        await page.waitForLoadState('networkidle');
        assert.ok(await page.getByLabel('Playable only').isChecked());
        await page.getByRole('searchbox', { name: 'Search music' }).fill('no-such-track');
        assert.ok(await page.locator('.music-empty').isVisible());
        await page.locator('#music-empty-reset').click();
        assert.equal(await page.locator('.music-card:visible').count(), musicCount);
        await visit('story.html');
        const formats = await page.getByRole('group', { name: 'Chapter formats', exact: true }).boundingBox();
        const chapterGrid = await page.locator('#chapter-card-grid').boundingBox();
        assert.ok(chapterGrid.y - formats.y - formats.height >= 12, 'Chapter filters are glued to the cards');
        assert.ok(Math.abs(chapterGrid.x - formats.x) < 1, 'Chapter filters have inconsistent gutters');
        await page.getByRole('button', { name: 'Scene outline', exact: true }).click();
        assert.equal(await page.locator('.chapter-card:visible').count(), await page.locator('.chapter-card[data-content-kind="outline"]').count());
        await visit('story.html?chapter=after-the-failed-attempt');
        assert.ok(await page.locator('.chapter-preface-legend').isHidden());
        await visit('moments.html?moment=interrogation-after-the-failed-attempt');
        assert.ok(await page.locator('.moment-fact-legend').isHidden(), 'Linked outline promoted to delivered scene');
        await visit('moments.html');
        assert.equal(await page.locator('#moment-phase-track [data-phase="late-arc-one"]').count(), 0);
        await page.locator('.timeline-approximate [data-phase="late-arc-one"]').click();
        assert.equal(await page.locator('#moment-phase-filter').inputValue(), 'late-arc-one');
        assert.ok(await page.locator('.moment-card:visible').count() > 0);
        await page.locator('.timeline-approximate').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `test-results/${engine}-approximate-moments-${width}.png` });
        await visit('story.html?chapter=doom-has-an-address&version=v7');
        assert.equal(await page.locator('.timeline-track [data-timeline-phase="late-arc-one"]').count(), 0);
        assert.equal(await page.locator('.timeline-approximate [aria-current="step"]').count(), 1);
        await page.getByRole('button', { name: 'Collapse timeline' }).click();
        assert.ok(await page.locator('.timeline-content').isHidden());
        assert.ok(await page.locator('.timeline-header-actions .timeline-scroll-cue').isHidden(), 'Collapsed timeline still asks the reader to drag');
        await page.getByRole('button', { name: 'Expand timeline' }).click();
        assert.ok(await page.locator('.timeline-content').isVisible());
        assert.ok(await page.locator('.timeline-header-actions .timeline-scroll-cue').isVisible());
        await page.locator('.timeline-approximate').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `test-results/${engine}-approximate-story-${width}.png` });
        const sections = page.locator('.reader-section-nav select');
        const sectionId = await sections.locator('option').nth(1).getAttribute('value');
        await sections.selectOption(sectionId);
        assert.ok(page.url().includes('version=v7') && page.url().endsWith(`#${sectionId}`));
        const marker = page.locator('.behavior-gutter-marker').first();
        await marker.focus();
        await page.keyboard.press('Enter');
        assert.ok(await page.locator('#behavior-note-tooltip').isVisible());
        assert.ok(await page.locator('.behavior-tooltip-close').evaluate(el => el === document.activeElement));
        await page.keyboard.press('Escape');
        assert.ok(await marker.evaluate(el => el === document.activeElement));
        assert.ok(await page.locator('#behavior-note-tooltip').isHidden());
        await marker.click();
        await page.locator('.behavior-tooltip-close').click();
        assert.ok(await marker.evaluate(el => el === document.activeElement));
        await visit('character.html?character=lynleit');
        const arcThumb = page.locator('.profile-art-thumbnails button[aria-label*="arc 2" i]').first();
        await arcThumb.click();
        assert.equal(await page.locator('.profile-art-era').textContent(), 'Arc 2');
        assert.ok(await page.locator('.profile-art-era').isVisible());
        const node = page.locator('.relationship-node:not(.is-center)').first();
        await node.focus();
        // Compare map-local coordinates: WebKit can finish scrolling the focused
        // node into view between calls without the node moving within its map.
        const mapPosition = () => node.evaluate(el => {
          const bounds = el.getBoundingClientRect();
          const stage = el.parentElement.getBoundingClientRect();
          return { x: bounds.x - stage.x, y: bounds.y - stage.y };
        });
        const beforeMove = await mapPosition();
        await page.keyboard.press('ArrowRight');
        const afterMove = await mapPosition();
        assert.ok(Math.abs(afterMove.x - beforeMove.x - 12) < 1, 'Relationship keyboard movement failed');
        assert.ok(Math.abs(afterMove.y - beforeMove.y) < 1, 'Horizontal map movement drifted vertically');
        await page.screenshot({ path: `test-results/${engine}-reader-controls-${width}.png` });
      }
      for (const width of [320, 390, 820, 1024, 1440, 2560]) {
        await page.setViewportSize({ width, height: 900 });
        await visit('docs.html?doc=prose-style&version=v8');
        const toolbar = page.locator('.document-shell > .reader-toolbar');
        assert.equal(await toolbar.locator('.document-meta').count(), 1, 'Reader metadata left outside its toolbar');
        const sectionNav = toolbar.locator('.reader-section-nav');
        const navBounds = await sectionNav.boundingBox();
        const selectBounds = await sectionNav.locator('select').boundingBox();
        assert.ok(navBounds.height <= 48, `Section navigation became a tall panel at ${width}px`);
        assert.ok(selectBounds.height >= 44 && selectBounds.width <= 331, 'Section selector lost its bounded touch target');
        assert.equal(await sectionNav.evaluate(el => getComputedStyle(el).borderTopWidth), '0px');
        assert.ok((await toolbar.boundingBox()).height <= 140, `Reader toolbar too tall at ${width}px`);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
        await toolbar.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `test-results/${engine}-compact-reader-${width}.png` });
        const sectionId = await sectionNav.locator('option').nth(1).getAttribute('value');
        await sectionNav.locator('select').selectOption(sectionId);
        assert.ok(page.url().includes('version=v8') && page.url().endsWith(`#${sectionId}`));
        assert.equal(await page.evaluate(() => document.activeElement.id), sectionId);
        await visit('world.html');
        const terms = await page.locator('.world-term-guide').boundingBox();
        const records = await page.locator('.world-record-section').first().boundingBox();
        assert.ok(Math.abs(terms.x - records.x) < 1 && Math.abs(terms.width - records.width) < 1, `Glossary gutters differ from World records at ${width}px`);
        assert.ok(await page.locator('.world-term-guide dl').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length <= 3), 'Glossary has a ragged four-column grid');
      }
      await visit('story.html?chapter=doom-has-an-address');
      const proseLink = page.locator('#chapter-reader .archive-entity-link').first();
      const color = await proseLink.evaluate(el => getComputedStyle(el.parentElement).color);
      await proseLink.hover();
      assert.equal(await proseLink.evaluate(el => getComputedStyle(el).color), color, 'Entity link changes prose color on hover');
      await proseLink.focus();
      assert.equal(await proseLink.evaluate(el => getComputedStyle(el).color), color, 'Entity link changes prose color on focus');
      assert.notEqual(await proseLink.evaluate(el => getComputedStyle(el).outlineStyle), 'none', 'Entity keyboard focus is invisible');
      assert.deepEqual(errors, [], `${engine}: browser script errors`);
      console.log(`${engine}: ${pages.length} routes at 3 widths; intermediate panes at 6 widths; reader navigation, filtering, version search, note focus, map movement, entity styling, and portrait eras passed.`);
    } finally { await browser.close(); }
  }
} finally { await new Promise(resolve => server.close(resolve)); }
