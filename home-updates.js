// Publication dates are UTC calendar dates. An update expires at age 32 days.
const DAY = 86400000;
export function updateExpiry(published) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(published || '')) return NaN;
  const date = new Date(`${published}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== published) return NaN;
  return date.getTime() + 32 * DAY;
}

export function isRecentUpdate(published, now = Date.now()) {
  return Number(now) < updateExpiry(published);
}

export function refreshHomeUpdates(root, now = Date.now()) {
  for (const card of root.querySelectorAll('.dispatch')) {
    if (!isRecentUpdate(card.dataset.published, now)) card.remove();
  }
  const cards = [...root.querySelectorAll('.dispatch')];
  const dates = new Set(cards.map(card => card.dataset.published));
  for (const divider of root.querySelectorAll('.date-divider')) {
    if (!dates.has(divider.dataset.published)) divider.remove();
  }
  root.querySelector('.home-updates-empty').hidden = cards.length > 0;
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('home-updates');
  if (root) {
    let timer;
    const refresh = () => {
      clearTimeout(timer);
      refreshHomeUpdates(root);
      // Also expire entries while Home remains open, including across midnight.
      timer = setTimeout(refresh, DAY - (Date.now() % DAY) + 50);
    };
    refresh();
    window.addEventListener('pageshow', refresh);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
    window.addEventListener('pagehide', () => clearTimeout(timer));
  }
}
