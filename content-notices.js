/* Shared H Scene classifications. Canon, relevance and depiction are independent. */
(() => {
  const records = [
    { paths: ['story.html?chapter=the-shared-night'], depiction: 'explicit', detail: 'Explicit sexual language; sexual acts off-page; compromised volition', relevance: 'story', canon: 'canon' },
    { paths: ['moments.html?moment=the-shared-night', 'docs.html?doc=oneiric-confluence', 'docs.html?doc=holumn-incidents-and-testimonies#the-oneiric-confluence'], depiction: 'implied', detail: 'Intimate dreams and compromised volition', relevance: 'story', canon: 'canon' },
    { paths: ['story.html?chapter=doom-has-an-address', 'moments.html?moment=doom-has-an-address', 'docs.html?doc=holumn-incidents-and-testimonies#doom-has-an-address'], depiction: 'implied', detail: 'Attempted intimacy under a life-threatening curse', relevance: 'story', canon: 'canon' },
    { paths: ['story.html?chapter=the-bench-under-the-lamp', 'moments.html?moment=the-bench-under-the-lamp'], depiction: 'implied', detail: 'Intimacy off-page; current Chapter contains a writer gap', relevance: 'story', canon: 'canon' },
    { paths: ['docs.html?doc=character-intimacy-and-sexuality'], depiction: 'implied', detail: 'Sexuality reference; established events and advisory material labelled separately', relevance: 'story', canon: 'mixed' },
    { paths: ['gallery.html?panels=darkness'], depiction: 'implied', detail: 'Intimate imagery', relevance: 'exploratory', canon: 'unassigned' }
  ];
  const forURL = value => {
    const target = new URL(value, 'https://magiarchy.bekulov.com/');
    return records.find(record => record.paths.some(path => {
      const expected = new URL(path, target.origin);
      return target.pathname === expected.pathname && (!expected.hash || target.hash === expected.hash)
        && [...expected.searchParams].every(([key, value]) => target.searchParams.get(key) === value);
    }));
  };
  function badge(value, expanded = false) {
    const record = typeof value === 'string' ? forURL(value) : value;
    if (!record) return null;
    const element = document.createElement(expanded ? 'aside' : 'span');
    element.className = `content-notice${expanded ? ' content-notice-full' : ''}`;
    const label = record.depiction === 'explicit' ? 'Explicit' : 'Implied';
    const relevance = record.relevance === 'story' ? 'Story-relevant' : 'Exploratory';
    element.textContent = `⚠ H Scene · ${label} · ${relevance}`;
    element.title = record.detail;
    if (expanded) {
      const detail = document.createElement('span');
      detail.className = 'content-notice-detail';
      const canon = {canon:'Canon events', 'side-content':'Side-content · Outside canon', mixed:'Mixed canon and writer guidance', unassigned:'Canon status not assigned'}[record.canon];
      detail.textContent = `${record.detail}. ${canon}.`;
      element.append(detail);
      element.setAttribute('aria-label', 'Content notice');
    }
    return element;
  }
  function annotate(host, url, expanded = false) {
    const notice = badge(url, expanded);
    if (notice) host.prepend(notice);
    return notice;
  }
  function controls(host, update, label = 'H Scene visibility') {
    const group = document.createElement('div');
    group.className = 'content-filter-group';
    group.setAttribute('role', 'group'); group.setAttribute('aria-label', label);
    const inputs = ['Include H Scenes', 'H Scenes only'].map(text => {
      const wrapper = document.createElement('label');
      wrapper.className = 'content-filter-toggle';
      const input = document.createElement('input'); input.type = 'checkbox';
      input.setAttribute('role', 'switch');
      wrapper.append(input, document.createTextNode(text)); group.append(wrapper);
      return input;
    });
    const [include, only] = inputs;
    for (const input of inputs) input.addEventListener('change', () => {
      if (input.checked) inputs.find(other => other !== input).checked = false;
      update();
    });
    host.append(group);
    return { matches: value => only.checked ? Boolean(forURL(value)) : include.checked || !forURL(value), reset: () => { include.checked = only.checked = false; update(); } };
  }
  window.MAGIARCHY_CONTENT = {records, forURL, badge, annotate, controls};
  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.holumn-incident-grid');
    if (!grid) return;
    const toolbar = document.createElement('div'); toolbar.className = 'content-filter-toolbar';
    const status = document.createElement('p'); status.className = 'content-filter-status'; status.setAttribute('aria-live','polite');
    grid.before(toolbar, status);
    const cards = [...grid.children];
    const filter = controls(toolbar, apply);
    function apply() {
      let count = 0;
      cards.forEach(card => { card.hidden = !filter.matches(card.href); if (!card.hidden) count++; });
      status.textContent = `${count} of ${cards.length} incidents · H Scenes hidden unless selected`;
    }
    cards.forEach(card => annotate(card, card.href)); apply();
  });
})();
