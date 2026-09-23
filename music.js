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

window.archiveMusicReady.then(host => {
  const cards = musicPlayers.map(player => player.closest('.music-card'));
  host.register(cards.map(card => ({
    id: card.id,
    title: card.querySelector('h2').textContent,
    src: card.querySelector('audio source').src,
    art: card.querySelector('.music-card-art img')?.src || '',
    duration: Number(card.querySelector('.music-seek').max)
  })));
  cards.forEach(card => {
    const toggle = card.querySelector('.music-banner-toggle');
    const seek = card.querySelector('.music-seek');
    toggle.addEventListener('click', () => {
      const state = host.state();
      if (state.current?.id === card.id && (state.pending || !state.audio.paused)) host.pause();
      else host.play(card.id);
    });
    seek.addEventListener('input', () => {
      if (host.state().current?.id === card.id && Number.isFinite(host.audio.duration)) host.audio.currentTime = Number(seek.value);
    });
    card.querySelector('.music-mute').addEventListener('click', () => { host.audio.muted = !host.audio.muted; });
    toggle.hidden = false;
    card.querySelector('.music-transport').hidden = false;
    card.classList.add('music-player-ready');
  });
  const unsubscribe = host.subscribe(({ audio, current, open, pending, error }) => {
    cards.forEach(card => {
      const selected = open && current?.id === card.id;
      const active = selected && (pending || !audio.paused);
      const title = card.querySelector('h2').textContent;
      const toggle = card.querySelector('.music-banner-toggle');
      card.classList.toggle('is-playing', active);
      toggle.setAttribute('aria-label', `${active ? 'Pause' : 'Play'} ${title}`);
      card.querySelector('.music-banner-label').textContent = selected && pending ? 'Loading…' : active ? 'Pause track' : 'Play track';
      card.querySelector('.music-status').textContent = selected && error ? 'Unavailable' : selected && pending ? 'Loading' : active ? 'Playing' : selected ? 'Paused' : 'Available';
      const length = selected && Number.isFinite(audio.duration) ? audio.duration : Number(card.querySelector('audio').dataset.duration || card.querySelector('.music-seek').max);
      const position = selected ? audio.currentTime : 0;
      const seek = card.querySelector('.music-seek');
      seek.disabled = !selected || !Number.isFinite(audio.duration);
      seek.max = length; seek.value = position;
      seek.setAttribute('aria-valuetext', `${musicTime(position)} of ${musicTime(length)}`);
      card.querySelector('.music-seek-fill').style.width = `${length ? position / length * 100 : 0}%`;
      card.querySelector('.music-elapsed').textContent = musicTime(position);
      card.querySelector('.music-duration').textContent = musicTime(length);
      card.querySelector('.music-player-error').hidden = !selected || !error;
      const mute = card.querySelector('.music-mute');
      mute.setAttribute('aria-pressed', String(audio.muted));
      mute.setAttribute('aria-label', `${audio.muted ? 'Unmute' : 'Mute'} ${title}`);
    });
  });
  window.addEventListener('pagehide', unsubscribe, { once: true });
});
