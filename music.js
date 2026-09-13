const musicPlayers = Array.from(document.querySelectorAll('.music-player'));
const playableCount = document.querySelector('#music-playable-count');
if (playableCount) playableCount.textContent = `${musicPlayers.length} playable ${musicPlayers.length === 1 ? 'track' : 'tracks'}`;

// Metadata is author-assigned. Empty facets do not imply an Arc or character.
const musicFilterForm = document.querySelector('.music-filters');
if (musicFilterForm) {
  const facets = ['story', 'character', 'event', 'arc', 'misc'];
  const cards = [...document.querySelectorAll('.music-card')].map(card => ({
    card,
    tags: Object.fromEntries(facets.map(key => [key, (card.dataset[key] || '').split('|').filter(Boolean)])),
    text: [card.querySelector('h2')?.textContent, card.querySelector('.music-card-body > p')?.textContent, ...facets.map(key => card.dataset[key] || '')].join(' ').toLocaleLowerCase()
  }));
  const search = document.querySelector('#music-search');
  const playableOnly = document.querySelector('#music-playable-only');
  const tagGroup = document.querySelector('#music-tag-chips');
  let selectedTag = 'all';
  const buttons = [...document.querySelectorAll('.music-filters [data-category]')];
  const result = document.querySelector('#music-results');
  const empty = document.querySelector('.music-empty');
  let category = 'all';
  const params = new URLSearchParams(location.search);
  search.value = params.get('q') || '';
  playableOnly.checked = params.get('playable') === '1';
  if (facets.includes(params.get('category'))) category = params.get('category');

  function fillTags(selected = 'all') {
    const keys = category === 'all' ? facets : [category];
    const values = [...new Set(cards.flatMap(item => keys.flatMap(key => item.tags[key])))].sort((a,b) => a.localeCompare(b));
    selectedTag = values.includes(selected) ? selected : 'all';
    tagGroup.replaceChildren(...['all', ...values].map(value => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'filter-chip';
      button.dataset.tag = value; button.textContent = value === 'all' ? 'All tags' : value;
      button.addEventListener('click', () => { selectedTag = value; filterMusic(); });
      return button;
    }));
    tagGroup.hidden = category === 'all' && selectedTag === 'all';
  }

  function filterMusic() {
    const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    let playable = 0;
    cards.forEach(item => {
      const keys = category === 'all' ? facets : [category];
      const scopedTags = keys.flatMap(key => item.tags[key]);
      const visible = (category === 'all' || scopedTags.length > 0)
        && (selectedTag === 'all' || scopedTags.includes(selectedTag))
        && terms.every(term => item.text.includes(term))
        && (!playableOnly.checked || Boolean(item.card.querySelector('audio')));
      item.card.hidden = !visible;
      if (visible) { count++; if (item.card.querySelector('audio')) playable++; }
      else item.card.querySelector('audio')?.pause();
    });
    result.textContent = `${count} of ${cards.length} tracks and concepts · ${playable} playable`;
    empty.hidden = count !== 0;
    [...buttons, ...tagGroup.children].forEach(button => {
      const active = button.dataset.category ? button.dataset.category === category : button.dataset.tag === selectedTag;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const url = new URL(location.href);
    [['q', search.value.trim()], ['category', category === 'all' ? '' : category], ['tag', selectedTag === 'all' ? '' : selectedTag], ['playable', playableOnly.checked ? '1' : '']].forEach(([key,value]) => value ? url.searchParams.set(key,value) : url.searchParams.delete(key));
    history.replaceState(null, '', url);
  }
  function resetMusic() {
    category = 'all'; search.value = ''; playableOnly.checked = false; fillTags(); filterMusic();
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category; fillTags(); filterMusic();
  }));
  document.querySelector('#music-empty-reset').addEventListener('click', () => { resetMusic(); search.focus(); });
  search.addEventListener('input', filterMusic);
  playableOnly.addEventListener('change', filterMusic);

  fillTags(params.get('tag'));
  filterMusic();
  musicFilterForm.hidden = false;
}

const musicTime = (seconds) => {
  const value = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
};

musicPlayers.forEach((player) => {
  const card = player.closest('.music-card');
  const toggle = card.querySelector('.music-banner-toggle');
  const transport = card.querySelector('.music-transport');
  if (!toggle || !transport) return; // Keep native controls as the fallback.
  const title = card.querySelector('h2').textContent;
  const label = card.querySelector('.music-banner-label');
  const status = card.querySelector('.music-status');
  const seek = card.querySelector('.music-seek');
  const fill = card.querySelector('.music-seek-fill');
  const elapsed = card.querySelector('.music-elapsed');
  const duration = card.querySelector('.music-duration');
  const mute = card.querySelector('.music-mute');
  const error = document.getElementById(player.getAttribute('aria-describedby'));
  let pending = false;

  const syncPlayback = () => {
    const active = pending || !player.paused;
    card.classList.toggle('is-playing', active);
    toggle.setAttribute('aria-label', `${active ? 'Pause' : 'Play'} ${title}`);
    label.textContent = pending ? 'Loading…' : active ? 'Pause track' : player.ended ? 'Play again' : 'Play track';
    status.textContent = pending ? 'Loading' : active ? 'Playing' : player.currentTime > 0 && !player.ended ? 'Paused' : 'Available';
  };
  const syncTime = () => {
    const length = player.duration;
    if (!Number.isFinite(length) || length <= 0) return;
    seek.disabled = false;
    seek.max = length;
    seek.value = player.currentTime;
    elapsed.textContent = musicTime(player.currentTime);
    duration.textContent = musicTime(length);
    seek.setAttribute('aria-valuetext', `${musicTime(player.currentTime)} of ${musicTime(length)}`);
    fill.style.width = `${Math.min(100, player.currentTime / length * 100)}%`;
  };
  const showError = () => {
    pending = false;
    player.pause();
    syncPlayback();
    error.hidden = false;
    status.textContent = 'Unavailable';
    label.textContent = 'Try again';
  };
  toggle.addEventListener('click', async () => {
    if (pending || !player.paused) {
      pending = false;
      player.pause();
      syncPlayback();
      return;
    }
    if (!error.hidden) player.load();
    error.hidden = true;
    musicPlayers.forEach((other) => { if (other !== player) other.pause(); });
    pending = true;
    syncPlayback();
    try { await player.play(); }
    catch (failure) { if (failure.name !== 'AbortError') showError(); }
    finally { pending = false; if (error.hidden) syncPlayback(); }
  });
  seek.addEventListener('input', () => {
    if (Number.isFinite(player.duration)) {
      player.currentTime = Number(seek.value);
      syncTime();
    }
  });
  mute.addEventListener('click', () => { player.muted = !player.muted; });
  player.addEventListener('volumechange', () => {
    mute.setAttribute('aria-pressed', String(player.muted));
    mute.setAttribute('aria-label', `${player.muted ? 'Unmute' : 'Mute'} ${title}`);
  });
  player.addEventListener('error', showError);
  player.querySelectorAll('source').forEach((source) => source.addEventListener('error', showError));
  player.addEventListener('playing', () => {
    pending = false;
    error.hidden = true;
    musicPlayers.forEach((other) => { if (other !== player) other.pause(); });
    syncPlayback();
  });
  player.addEventListener('pause', () => { pending = false; if (error.hidden) syncPlayback(); });
  player.addEventListener('ended', syncPlayback);
  ['loadedmetadata', 'durationchange', 'timeupdate', 'seeked'].forEach((event) => player.addEventListener(event, syncTime));
  toggle.hidden = false;
  transport.hidden = false;
  card.classList.add('music-player-ready');
});
