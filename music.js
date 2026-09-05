const musicPlayers = Array.from(document.querySelectorAll('.music-player'));
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
