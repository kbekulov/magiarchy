const musicPlayers = Array.from(document.querySelectorAll('.music-player'));

musicPlayers.forEach((player) => {
  const error = document.getElementById(player.getAttribute('aria-describedby'));
  const showError = () => { if (error) error.hidden = false; };
  player.addEventListener('error', showError);
  player.querySelectorAll('source').forEach((source) => source.addEventListener('error', showError));
  player.addEventListener('playing', () => {
    if (error) error.hidden = true;
    musicPlayers.forEach((other) => { if (other !== player) other.pause(); });
  });
});
