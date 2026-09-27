import { snapshot, castRows, castDetail } from './home-dashboard-view.js';

const root = document.querySelector('#writer-dashboard');
if (root) initialize().catch(() => {
  // Complete build-time content remains usable even if refresh data is unavailable.
  root.querySelector('#desk-feedback').textContent = 'Showing the saved dashboard. Snapshot refresh is unavailable.';
});
async function initialize() {
  const response = await fetch('home-dashboard.json');
  if (!response.ok) throw new Error('Dashboard unavailable');
  const data = await response.json();
  if (data.schema !== 1) throw new Error('Unsupported dashboard data');
  let mode = 'presence', selected = data.cast[0].slug;
  const feedback = text => { root.querySelector('#desk-feedback').textContent = text; };
  function pick(kind, announce = true) {
    const slot = root.querySelector(`[data-snapshot="${kind}"]`);
    const pool = data[kind];
    if (!pool.length) return;
    let previous = slot.dataset.selected;
    if (!announce) { try { previous = sessionStorage.getItem(`desk-${kind}`) || previous; } catch {} }
    const choices = pool.filter(row => row.id !== previous);
    const choice = (choices.length ? choices : pool)[Math.floor(Math.random() * (choices.length || pool.length))];
    slot.innerHTML = snapshot(choice, kind);
    slot.dataset.selected = choice.id;
    try { sessionStorage.setItem(`desk-${kind}`, choice.id); } catch {}
    if (announce) feedback(`Showing ${choice.title}.`);
  }
  root.querySelectorAll('[data-shuffle]').forEach(button => {
    const kind = button.dataset.shuffle;
    button.hidden = data[kind].length < 2;
    button.addEventListener('click', () => pick(kind));
    pick(kind, false);
  });
  function renderCast() {
    const order = root.querySelector('#desk-cast-order').value;
    const cast = [...data.cast].sort((a, b) => (order === 'name' ? 0 : (order === 'least' ? a.total - b.total : b.total - a.total)) || a.name.localeCompare(b.name));
    root.querySelector('#desk-cast-list').innerHTML = castRows(cast, mode, selected);
    root.querySelector('#desk-chart-key').hidden = mode !== 'presence';
  }
  root.querySelector('.desk-segments').hidden = false;
  root.querySelector('.desk-sort').hidden = false;
  root.querySelectorAll('[data-cast-mode]').forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.castMode;
    root.querySelectorAll('[data-cast-mode]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    renderCast();
  }));
  root.querySelector('#desk-cast-order').addEventListener('change', renderCast);
  root.querySelector('#desk-cast-list').addEventListener('click', event => {
    const button = event.target.closest('[data-character-choice]');
    if (!button) return;
    selected = button.dataset.characterChoice;
    root.querySelectorAll('[data-character-choice]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const character = data.cast.find(c => c.slug === selected);
    root.querySelector('#desk-character-detail').innerHTML = castDetail(character);
    feedback(`Selected ${character.name}. Profile details updated below the chart.`);
  });
}
