// Keep the audio document alive. Once listening, in-site pages load in a
// same-origin reading frame, with their own scripts, styles and page lifecycle.
// Normal navigation and no-JavaScript audio remain unchanged before listening.
const rootURL = new URL('./', import.meta.url);
const time = value => {
  const seconds = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};
const icon = name => {
  const paths = {
    play: '<path d="m9 5 11 7-11 7z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    previous: '<path d="M5 5v14m14-14L8 12l11 7z"/>',
    next: '<path d="M19 5v14M5 5l11 7-11 7z"/>',
    repeat: '<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    sound: '<path d="M11 4 6 9H3v6h3l5 5zM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
    muted: '<path d="M11 4 6 9H3v6h3l5 5zM16 9l6 6m0-6-6 6"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
};

function createPlayer() {
  const audio = document.createElement('audio');
  audio.id = 'site-music-audio';
  audio.preload = 'none';
  audio.loop = true;
  document.body.append(audio);
  const dock = document.createElement('section');
  dock.id = 'site-music-player';
  dock.className = 'music-dock';
  dock.setAttribute('aria-label', 'Site music player');
  dock.hidden = true;
  dock.innerHTML = `
    <div class="music-dock-track"><img alt="" hidden><div><span class="music-dock-kicker">Now playing</span><strong class="music-dock-title sr-only" aria-live="polite" aria-atomic="true"></strong><label class="music-dock-queue"><span class="sr-only">Choose playlist track</span><select aria-label="Choose playlist track"></select></label></div></div>
    <div class="music-dock-buttons">
      <button type="button" data-action="previous" aria-label="Previous track">${icon('previous')}</button>
      <button type="button" data-action="toggle" aria-label="Play" class="music-dock-play">${icon('play')}</button>
      <button type="button" data-action="next" aria-label="Next track">${icon('next')}</button>
    </div>
    <div class="music-dock-progress"><span class="music-dock-elapsed">0:00</span><input type="range" min="0" max="1" step="0.1" value="0" aria-label="Seek track" disabled><span class="music-dock-duration">0:00</span></div>
    <div class="music-dock-options">
      <button type="button" data-action="repeat" aria-label="Repeat track. Change to repeat playlist" title="Repeat track" aria-pressed="true">${icon('repeat')}<span class="music-repeat-mark" aria-hidden="true">1</span></button>
      <button type="button" data-action="mute" aria-label="Mute" aria-pressed="false">${icon('sound')}</button>
      <button type="button" data-action="close" aria-label="Stop music and close player">${icon('close')}</button>
    </div>
    <p class="music-dock-error" role="status" hidden></p>`;
  document.body.append(dock);
  const toggle = dock.querySelector('[data-action="toggle"]');
  const select = dock.querySelector('select');
  const seek = dock.querySelector('input');
  const error = dock.querySelector('.music-dock-error');
  const listeners = new Set();
  let tracks = [], current = null, open = false, pending = false, request = 0;
  let repeat = 'one';
  let frame = null;
  let originFocus = null;
  const originalTitle = document.title;
  const state = () => ({ audio, tracks, current, open, pending, repeat, error: error.hidden ? '' : error.textContent });
  const sizeDock = () => document.documentElement.style.setProperty('--music-dock-space', `${open ? dock.getBoundingClientRect().height : 0}px`);
  new ResizeObserver(sizeDock).observe(dock);

  function sync() {
    dock.hidden = !open;
    document.documentElement.classList.toggle('music-dock-open', open);
    if (current) {
      const title = dock.querySelector('.music-dock-title');
      if (title.textContent !== current.title) title.textContent = current.title;
      const art = dock.querySelector('img');
      art.hidden = !current.art;
      if (current.art && art.src !== current.art) art.src = current.art;
      select.value = current.id;
    }
    const playing = pending || !audio.paused;
    toggle.innerHTML = icon(playing ? 'pause' : 'play');
    toggle.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    dock.querySelector('.music-dock-kicker').textContent = pending ? 'Loading' : playing ? 'Playing' : 'Paused';
    const repeatButton = dock.querySelector('[data-action="repeat"]');
    const repeatName = { one: 'Repeat track', all: 'Repeat playlist', off: 'Repeat off' }[repeat];
    repeatButton.setAttribute('aria-label', `${repeatName}. Change to ${ { one: 'repeat playlist', all: 'repeat off', off: 'repeat track' }[repeat] }`);
    repeatButton.title = repeatName;
    repeatButton.setAttribute('aria-pressed', String(repeat !== 'off'));
    repeatButton.querySelector('.music-repeat-mark').textContent = repeat === 'one' ? '1' : repeat === 'off' ? '−' : '';
    const mute = dock.querySelector('[data-action="mute"]');
    mute.innerHTML = icon(audio.muted ? 'muted' : 'sound');
    mute.setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute');
    mute.setAttribute('aria-pressed', String(audio.muted));
    const duration = Number.isFinite(audio.duration) ? audio.duration : current?.duration || 0;
    seek.disabled = !Number.isFinite(audio.duration);
    seek.max = duration || 1;
    seek.value = audio.currentTime;
    seek.setAttribute('aria-valuetext', `${time(audio.currentTime)} of ${time(duration)}`);
    dock.querySelector('.music-dock-elapsed').textContent = time(audio.currentTime);
    dock.querySelector('.music-dock-duration').textContent = time(duration);
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = !open ? 'none' : audio.paused ? 'paused' : 'playing';
    }
    sizeDock();
    listeners.forEach(listener => listener(state()));
  }
  function showError(message) { pending = false; error.textContent = message; error.hidden = false; sync(); }
  function pause() { request++; pending = false; audio.pause(); sync(); }
  function play(id = current?.id) {
    const track = tracks.find(item => item.id === id);
    if (!track) return;
    const token = ++request;
    if (!open) originFocus = frame?.contentDocument?.activeElement || document.activeElement;
    open = true;
    error.hidden = true;
    if (current?.id !== id) {
      current = track;
      audio.src = track.src;
      if ('mediaSession' in navigator && 'MediaMetadata' in window) {
        navigator.mediaSession.metadata = new MediaMetadata({ title: track.title, album: 'MAGIARCHY', artwork: track.art ? [{ src: track.art }] : [] });
      }
    } else if (audio.error) audio.load();
    pending = true;
    // Do not await a fetch here: play must remain inside the visitor's gesture.
    const attempt = audio.play();
    sync();
    attempt.then(() => { if (token === request) { pending = false; sync(); } }).catch(failure => {
      if (token !== request) return;
      pending = false;
      if (failure.name !== 'AbortError') showError('Playback paused by your browser. Press Play to resume, or choose another track.');
      else sync();
    });
  }
  function step(delta) {
    if (tracks.length) play(tracks[(tracks.findIndex(track => track.id === current?.id) + delta + tracks.length) % tracks.length].id);
  }
  function close() {
    pause(); open = false; current = null;
    audio.removeAttribute('src'); audio.load(); error.hidden = true;
    if ('mediaSession' in navigator) navigator.mediaSession.metadata = null;
    sync();
    if (originFocus?.isConnected && !originFocus.closest('[inert]')) originFocus.focus();
    else frame?.contentWindow?.focus();
  }
  dock.addEventListener('click', event => {
    const action = event.target.closest('button')?.dataset.action;
    if (action === 'toggle') pending || !audio.paused ? pause() : play();
    if (action === 'previous') step(-1);
    if (action === 'next') step(1);
    if (action === 'mute') audio.muted = !audio.muted;
    if (action === 'repeat') {
      repeat = { one: 'all', all: 'off', off: 'one' }[repeat];
      audio.loop = repeat === 'one';
      sync();
    }
    if (action === 'close') close();
  });
  select.addEventListener('change', () => play(select.value));
  seek.addEventListener('input', () => { if (Number.isFinite(audio.duration)) audio.currentTime = Number(seek.value); sync(); });
  for (const name of ['playing', 'pause', 'timeupdate', 'durationchange', 'volumechange', 'seeked', 'ended']) audio.addEventListener(name, sync);
  audio.addEventListener('ended', () => {
    if (!open || repeat === 'one') return;
    const index = tracks.findIndex(track => track.id === current?.id);
    if (index < tracks.length - 1 || repeat === 'all') step(1);
  });
  audio.addEventListener('error', () => { if (open && audio.hasAttribute('src')) showError('This track could not load. Try Play again or choose another track.'); });
  if ('mediaSession' in navigator) {
    for (const [action, handler] of Object.entries({ play: () => play(), pause, stop: close, previoustrack: () => step(-1), nexttrack: () => step(1), seekto: event => { if (Number.isFinite(audio.duration)) audio.currentTime = Math.min(audio.duration, Math.max(0, event.seekTime)); } })) {
      try { navigator.mediaSession.setActionHandler(action, handler); } catch { /* Optional on older browsers. */ }
    }
  }

  function syncURL(url, replace = true) {
    if (url === location.href) return;
    history[replace ? 'replaceState' : 'pushState']({ musicShell: true }, '', url);
  }
  function navigate(href) {
    const url = new URL(href, location.href);
    if (!isPageURL(url)) { location.href = url.href; return; }
    if (!frame) {
      frame = document.createElement('iframe');
      frame.id = 'music-reading-frame';
      frame.title = 'MAGIARCHY page';
      frame.setAttribute('allow', 'autoplay; fullscreen');
      frame.addEventListener('load', () => {
        try {
          syncURL(frame.contentWindow.location.href);
          document.title = frame.contentDocument.title || originalTitle;
          frame.title = document.title;
          frame.contentWindow.focus();
        } catch { /* External destinations must use the top-level window. */ }
      });
      for (const child of document.body.children) {
        if (child !== audio && child !== dock) { child.classList.add('music-shell-original'); child.inert = true; }
      }
      document.documentElement.classList.add('music-shell-active');
      frame.src = url.href;
      document.body.append(frame);
    } else frame.contentWindow.location.replace(url.href);
    syncURL(url.href, false);
  }
  window.addEventListener('popstate', () => {
    if (frame && frame.contentWindow.location.href !== location.href) frame.contentWindow.location.replace(location.href);
  });
  return {
    audio, play, pause, close, step, state, navigate, syncURL,
    get routesInternally() { return open || Boolean(frame); },
    register(list) {
      tracks = list;
      select.replaceChildren(...tracks.map(track => {
        const option = document.createElement('option'); option.value = track.id; option.textContent = track.title; return option;
      }));
      sync();
    },
    subscribe(listener) { listeners.add(listener); listener(state()); return () => listeners.delete(listener); }
  };
}

function isPageURL(url) {
  return url.origin === rootURL.origin && url.pathname.startsWith(rootURL.pathname)
    && (/\.html$/.test(url.pathname) || url.pathname === rootURL.pathname);
}

export function connectMusic() {
  let host;
  let child = false;
  try {
    if (window.parent !== window) { host = window.parent.archiveMusic; child = Boolean(host); }
  } catch { /* Not our same-origin frame. */ }
  if (!host) host = createPlayer();
  window.archiveMusic = host;
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!host.routesInternally || !link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (!isPageURL(url)) {
      if (child && /^https?:$/.test(url.protocol) && !link.hasAttribute('download')) { event.preventDefault(); window.top.location.href = url.href; }
      return;
    }
    // Native anchors must scroll in the currently visible document.
    if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
    event.preventDefault();
    window.closeArchiveNavigation?.(false);
    host.navigate(url.href);
  });
  if (child) {
    for (const method of ['pushState', 'replaceState']) {
      const original = history[method].bind(history);
      history[method] = (...args) => { original(...args); host.syncURL(location.href, method === 'replaceState'); };
    }
    window.addEventListener('hashchange', () => host.syncURL(location.href));
  }
  window.archiveNavigate = href => host.routesInternally ? host.navigate(new URL(href, location.href).href) : location.assign(href);
  return host;
}
