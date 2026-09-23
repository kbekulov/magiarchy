import assert from 'node:assert/strict';

export async function testMusicMovements(page, origin, engine) {
  for (const width of [320, 390, 820, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(origin + '/music.html');
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => Boolean(window.archiveMusic));
    const audio = page.locator('#site-music-audio');
    const dock = page.locator('#site-music-player');
    assert.ok(await dock.isHidden());
    assert.ok(await audio.evaluate(a => a.paused && a.preload === 'none' && a.loop));
    assert.equal(await dock.locator('option').count(), 4);
    await audio.evaluate(a => { a.volume = 0; window.testAudioOwner = a; });
    for (const [id, duration] of [['passacaglia-movement-i', 208.8], ['passacaglia-movement-ii', 214.4], ['passacaglia-movement-iii', 155.94], ['theme-1-stem', 113.476]]) {
      const card = page.locator('#' + id);
      assert.equal(await card.locator('.music-downloads a[download]').count(), 2);
      for (const link of await card.locator('.music-downloads a[download]').all()) {
        assert.equal((await page.request.head(new URL(await link.getAttribute('href'), origin + '/').href)).status(), 200);
      }
      await card.locator('.music-banner-toggle').click();
      await page.waitForFunction(() => !archiveMusic.audio.paused && archiveMusic.audio.currentTime > .05 && Number.isFinite(archiveMusic.audio.duration));
      assert.ok(Math.abs(await audio.evaluate(a => a.duration) - duration) < 1);
      assert.ok(await card.locator('.music-seek').isEnabled());
      assert.ok(await dock.isVisible());
      assert.equal(await page.locator('.music-card.is-playing').count(), 1);
      if (engine === 'chromium') {
        await audio.evaluate(a => { a.currentTime = a.duration - .5; });
        await page.waitForFunction(() => !archiveMusic.audio.paused && !archiveMusic.audio.seeking && archiveMusic.audio.currentTime > .05 && archiveMusic.audio.currentTime < 2);
      }
    }
    await page.getByRole('searchbox', { name: 'Search music' }).fill('no-such-track');
    const repeat = dock.locator('[data-action="repeat"]');
    assert.ok((await repeat.getAttribute('aria-label')).startsWith('Repeat track.'));
    await repeat.click();
    assert.ok((await repeat.getAttribute('aria-label')).startsWith('Repeat playlist.'));
    assert.ok(await audio.evaluate(a => !a.loop));
    if (engine === 'chromium') {
      await audio.evaluate(a => { a.currentTime = a.duration - .25; });
      await page.waitForFunction(() => archiveMusic.state().current.id === 'passacaglia-movement-i' && !archiveMusic.audio.paused);
      await dock.locator('select').selectOption('theme-1-stem');
      await page.waitForFunction(() => archiveMusic.audio.currentTime > .05 && !archiveMusic.audio.paused);
    }
    await repeat.click();
    assert.ok((await repeat.getAttribute('aria-label')).startsWith('Repeat off.'));
    assert.equal(await repeat.getAttribute('aria-pressed'), 'false');
    if (engine === 'chromium') {
      await audio.evaluate(a => { a.currentTime = a.duration - .25; });
      await page.waitForFunction(() => archiveMusic.audio.ended && archiveMusic.audio.paused);
      await dock.getByRole('button', { name: 'Play', exact: true }).click();
    }
    await repeat.click();
    assert.ok(await audio.evaluate(a => a.loop));
    assert.ok(await audio.evaluate(a => !a.paused), 'Filtering must not stop music');
    await dock.getByRole('button', { name: 'Pause', exact: true }).click();
    assert.ok(await audio.evaluate(a => a.paused));
    await dock.getByRole('button', { name: 'Play', exact: true }).click();
    await dock.getByRole('button', { name: 'Next track', exact: true }).click();
    assert.equal(await dock.locator('select').inputValue(), 'passacaglia-movement-i');
    await dock.getByRole('button', { name: 'Previous track', exact: true }).click();
    assert.equal(await dock.locator('select').inputValue(), 'theme-1-stem');
    await dock.locator('select').selectOption('passacaglia-movement-ii');
    await page.waitForFunction(() => !archiveMusic.audio.paused && archiveMusic.audio.currentTime > .05);
    await dock.getByRole('button', { name: 'Mute', exact: true }).click();
    assert.ok(await audio.evaluate(a => a.muted));
    await dock.getByRole('button', { name: 'Unmute', exact: true }).click();
    await dock.locator('input').focus();
    await page.keyboard.press('ArrowRight');
    assert.ok(Number(await dock.locator('input').inputValue()) > 0);
    const follow = async (context, route) => {
      await context.locator('body').evaluate((body, href) => {
        const a = document.createElement('a'); a.id = 'music-test-navigation'; a.href = href; a.textContent = 'Navigate'; body.prepend(a);
      }, route);
      await context.locator('#music-test-navigation').click();
      await page.waitForURL(origin + '/' + route);
      await page.waitForFunction(() => {
        const f = document.querySelector('#music-reading-frame');
        return f.contentWindow.location.href === location.href && f.contentDocument.readyState === 'complete' && f.contentWindow.archiveMusic;
      });
    };
    await follow(page, 'characters.html');
    const reader = page.frameLocator('#music-reading-frame');
    const before = await audio.evaluate(a => a.currentTime);
    await follow(reader, 'character.html?character=lynleit');
    assert.ok(await audio.evaluate((a, position) => !a.paused && a.currentTime >= position, before));
    await page.goBack();
    await page.waitForURL('**/characters.html');
    await page.goForward();
    await page.waitForURL('**/character.html?character=lynleit');
    await page.waitForFunction(() => {
      const f = document.querySelector('#music-reading-frame');
      return f.contentWindow.location.href === location.href && f.contentDocument.readyState === 'complete' && f.contentWindow.archiveMusic;
    });
    for (const route of ['story.html', 'moments.html', 'gallery.html?collection=production', 'docs.html?doc=prose-style', 'world.html', 'weapons.html', 'items.html', 'music.html']) {
      await follow(reader, route);
      assert.ok(await page.evaluate(() => testAudioOwner === archiveMusic.audio && !archiveMusic.audio.paused), route);
      assert.ok(await reader.locator('body').evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), route);
      if (route.startsWith('docs.html')) {
        const versions = reader.getByRole('combobox', { name: 'Choose version' });
        await versions.selectOption('v1');
        await page.waitForURL('**/docs.html?doc=prose-style&version=v1');
        await page.waitForFunction(() => {
          const f = document.querySelector('#music-reading-frame');
          return f.contentWindow.location.href === location.href && f.contentDocument.readyState === 'complete' && f.contentWindow.archiveMusic;
        });
        await reader.locator('#document-reader h1').waitFor();
        assert.ok(await page.evaluate(() => testAudioOwner === archiveMusic.audio && !archiveMusic.audio.paused));
      }
    }
    await reader.locator('#passacaglia-movement-i .music-banner-toggle').click();
    assert.equal(await dock.locator('select').inputValue(), 'passacaglia-movement-i');
    await page.waitForFunction(() => !archiveMusic.state().pending && !archiveMusic.audio.paused);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: 'test-results/' + engine + '-persistent-music-' + width + '.png' });
    await dock.getByRole('button', { name: 'Stop music and close player' }).click();
    assert.ok(await dock.isHidden());
    assert.ok(await audio.evaluate(a => a.paused && !a.hasAttribute('src')));
    await reader.locator('#passacaglia-movement-i .music-banner-toggle').click();
    await page.waitForFunction(() => !archiveMusic.audio.paused);
    await page.reload();
    await page.waitForLoadState('networkidle');
    assert.ok(await page.locator('#site-music-player').isHidden(), 'Reload must not autoplay');
  }
  console.log(engine + ': persistent player, playlist, controls and navigation passed at phone, tablet and desktop widths');
  if (engine !== 'firefox') {
    const touch = await page.context().browser().newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    try {
      await touch.route('https://**/*', route => route.abort());
      await touch.goto(origin + '/music.html');
      await touch.locator('#passacaglia-movement-i .music-banner-toggle').tap();
      await touch.waitForFunction(() => !archiveMusic.audio.paused && archiveMusic.audio.currentTime > .05);
      await touch.locator('.nav-toggle').tap();
      await touch.locator('.nav-links a[href="characters.html"]').tap();
      await touch.waitForURL('**/characters.html');
      await touch.frameLocator('#music-reading-frame').locator('.nav-toggle').waitFor();
      assert.ok(await touch.locator('#site-music-audio').evaluate(a => !a.paused));
      await touch.locator('#site-music-player [data-action="next"]').tap();
      await touch.waitForFunction(() => archiveMusic.state().current.id === 'passacaglia-movement-ii' && !archiveMusic.audio.paused);
      const nextStyle = await touch.locator('#site-music-player [data-action="next"]').evaluate(button => ({ background: getComputedStyle(button).backgroundColor, opacity: getComputedStyle(button).opacity }));
      assert.equal(nextStyle.background, 'rgba(0, 0, 0, 0)', 'Touch hover must not stick');
      assert.equal(nextStyle.opacity, '1', 'Pressed styling must clear after touch');
      await touch.evaluate(() => document.documentElement.style.setProperty('--music-safe-bottom', '34px'));
      const padding = await touch.locator('#site-music-player').evaluate(dock => parseFloat(getComputedStyle(dock).paddingBottom));
      assert.ok(padding >= 42, 'Home-indicator safe area must be reserved');
      await touch.locator('#site-music-player [data-action="repeat"]').tap();
      assert.equal(await touch.evaluate(() => archiveMusic.state().repeat), 'all');
      await touch.screenshot({ path: 'test-results/' + engine + '-music-safe-area.png' });
      await touch.setViewportSize({ width: 844, height: 390 });
      assert.ok(await touch.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await touch.locator('#site-music-player [data-action="close"]').tap();
      assert.ok(await touch.locator('#site-music-player').isHidden());
      console.log(engine + ': touch-emulated playback and navigation passed');
    } finally { await touch.close(); }
  }
}
