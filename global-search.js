(() => {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!navbar || document.querySelector('.global-search-trigger')) return;

  const searchIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4 4"></path></svg>';
  const trigger = document.createElement('button');
  trigger.className = 'global-search-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-label', 'Search archive');
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.innerHTML = `${searchIcon}<span>Search archive</span><kbd>Ctrl K</kbd>`;
  navbar.insertBefore(trigger, navToggle ?? navLinks);

  const layer = document.createElement('div');
  layer.className = 'global-search-layer';
  layer.hidden = true;
  layer.innerHTML = `
    <button class="global-search-backdrop" type="button" aria-label="Close global search"></button>
    <section class="global-search-dialog" role="dialog" aria-modal="true" aria-labelledby="global-search-label">
      <h2 class="sr-only" id="global-search-label">Search the Magiarchy archive</h2>
      <div class="global-search-field">
        ${searchIcon}
        <input type="search" autocomplete="off" spellcheck="false" placeholder="Search characters, scenes, Holumns, weapons..." aria-describedby="global-search-status">
        <kbd>Esc</kbd>
      </div>
      <div class="global-search-body">
        <p class="global-search-status" id="global-search-status" aria-live="polite">Start typing to search the complete archive.</p>
        <div class="global-search-results" role="listbox" aria-label="Global search results"></div>
        <div class="global-search-empty" hidden>
          <span aria-hidden="true">?</span>
          <strong>No matching archive entries</strong>
          <p>Try a character, place, weapon, incident, faction, or phrase from a scene.</p>
        </div>
      </div>
      <footer class="global-search-help"><span><kbd>↑</kbd><kbd>↓</kbd> Move</span><span><kbd>Enter</kbd> Open</span><span><kbd>Esc</kbd> Close</span></footer>
    </section>`;
  document.body.append(layer);

  const input = layer.querySelector('input');
  const resultsHost = layer.querySelector('.global-search-results');
  const status = layer.querySelector('.global-search-status');
  const emptyState = layer.querySelector('.global-search-empty');
  const dialog = layer.querySelector('.global-search-dialog');
  let indexPromise;
  let archiveEntries = [];
  let activeResult = -1;
  let previousFocus = null;

  const normalize = (value) => String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const escapePattern = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch('search-index.json')
        .then((response) => {
          if (!response.ok) throw new Error('Search index unavailable');
          return response.json();
        })
        .then((payload) => {
          archiveEntries = payload.entries ?? [];
          return archiveEntries;
        });
    }
    return indexPromise;
  }

  function scoreEntry(entry, phrase, tokens) {
    const title = normalize(entry.title);
    const subtitle = normalize(entry.subtitle);
    const text = normalize(entry.text);
    if (!tokens.every((token) => title.includes(token) || subtitle.includes(token) || text.includes(token))) return 0;

    let score = 0;
    if (title === phrase) score += 300;
    else if (title.startsWith(phrase)) score += 220;
    else if (title.includes(phrase)) score += 160;
    if (subtitle.includes(phrase)) score += 90;
    if (text.includes(phrase)) score += 70;

    tokens.forEach((token) => {
      if (title.split(/\s+/).some((word) => word === token)) score += 70;
      else if (title.includes(token)) score += 45;
      if (subtitle.includes(token)) score += 20;
      const occurrences = text.split(token).length - 1;
      score += Math.min(occurrences, 8) * 4;
    });

    if (entry.type === 'Character' || entry.type === 'Chapter' || entry.type === 'Moment' || entry.type === 'Weapon' || entry.type === 'Holumn incident') score += 12;
    if (entry.type === 'Character section') score += 8;
    if (entry.type === 'Update') score -= 35;
    if (entry.type === 'Archive page') score -= 45;
    return score;
  }

  function excerptFor(entry, phrase, tokens) {
    const source = entry.text ?? '';
    const lower = normalize(source);
    let position = lower.indexOf(phrase);
    if (position < 0) position = tokens.map((token) => lower.indexOf(token)).filter((value) => value >= 0).sort((a, b) => a - b)[0] ?? 0;
    let start = Math.max(0, position - 88);
    let end = Math.min(source.length, position + Math.max(phrase.length, 24) + 148);
    if (start > 0) start = source.indexOf(' ', start) + 1 || start;
    if (end < source.length) end = source.lastIndexOf(' ', end);
    return `${start > 0 ? '…' : ''}${source.slice(start, end).trim()}${end < source.length ? '…' : ''}`;
  }

  function appendHighlightedText(host, text, tokens) {
    if (!tokens.length) {
      host.textContent = text;
      return;
    }
    const pattern = new RegExp(`(${tokens.map(escapePattern).join('|')})`, 'gi');
    text.split(pattern).forEach((part) => {
      if (!part) return;
      if (tokens.some((token) => normalize(part) === token)) {
        const mark = document.createElement('mark');
        mark.textContent = part;
        host.append(mark);
      } else {
        host.append(document.createTextNode(part));
      }
    });
  }

  function setActiveResult(index) {
    const resultLinks = Array.from(resultsHost.querySelectorAll('.global-search-result'));
    if (!resultLinks.length) {
      activeResult = -1;
      input.removeAttribute('aria-activedescendant');
      return;
    }
    activeResult = (index + resultLinks.length) % resultLinks.length;
    resultLinks.forEach((link, resultIndex) => {
      const isActive = resultIndex === activeResult;
      link.classList.toggle('is-active', isActive);
      link.setAttribute('aria-selected', String(isActive));
    });
    input.setAttribute('aria-activedescendant', resultLinks[activeResult].id);
    resultLinks[activeResult].scrollIntoView({ block: 'nearest' });
  }

  function renderResults() {
    const rawQuery = input.value.trim();
    const phrase = normalize(rawQuery);
    const tokens = [...new Set(phrase.split(/\s+/).filter((token) => token.length > 1))];
    resultsHost.replaceChildren();
    activeResult = -1;

    if (!tokens.length) {
      status.textContent = 'Start typing to search the complete archive.';
      emptyState.hidden = true;
      return;
    }

    const matches = archiveEntries
      .map((entry) => ({ entry, score: scoreEntry(entry, phrase, tokens) }))
      .filter((match) => match.score > 0)
      .sort((left, right) => right.score - left.score || left.entry.title.localeCompare(right.entry.title))
      .slice(0, 40);

    status.textContent = matches.length
      ? `${matches.length}${matches.length === 40 ? '+' : ''} archive ${matches.length === 1 ? 'entry' : 'entries'} found for “${rawQuery}”.`
      : `No archive entries found for “${rawQuery}”.`;
    emptyState.hidden = matches.length !== 0;

    matches.forEach(({ entry }, index) => {
      const link = document.createElement('a');
      link.className = 'global-search-result';
      link.id = `global-search-result-${index}`;
      link.href = entry.url;
      link.setAttribute('role', 'option');
      link.setAttribute('aria-selected', 'false');

      const marker = document.createElement('span');
      marker.className = 'global-search-result-marker';
      marker.textContent = entry.type.split(/\s+/).map((word) => word[0]).join('').slice(0, 2).toUpperCase();

      const copy = document.createElement('span');
      copy.className = 'global-search-result-copy';
      const heading = document.createElement('span');
      heading.className = 'global-search-result-heading';
      const title = document.createElement('strong');
      appendHighlightedText(title, entry.title, tokens);
      const type = document.createElement('small');
      type.textContent = entry.type;
      heading.append(title, type);
      const subtitle = document.createElement('span');
      subtitle.className = 'global-search-result-subtitle';
      subtitle.textContent = entry.subtitle;
      const excerpt = document.createElement('span');
      excerpt.className = 'global-search-result-excerpt';
      appendHighlightedText(excerpt, excerptFor(entry, phrase, tokens), tokens);
      copy.append(heading);
      if (entry.subtitle) copy.append(subtitle);
      copy.append(excerpt);
      link.append(marker, copy);
      link.addEventListener('pointerenter', () => setActiveResult(index));
      resultsHost.append(link);
    });

    if (matches.length) setActiveResult(0);
  }

  async function openSearch() {
    if (!layer.hidden) return;
    previousFocus = document.activeElement;
    layer.hidden = false;
    document.body.classList.add('global-search-open');
    trigger.setAttribute('aria-expanded', 'true');
    navLinks?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    status.textContent = 'Loading the archive index...';
    input.focus();
    try {
      await loadIndex();
      renderResults();
    } catch {
      status.textContent = 'The archive index could not be loaded.';
      emptyState.hidden = false;
      emptyState.querySelector('strong').textContent = 'Search is temporarily unavailable';
      emptyState.querySelector('p').textContent = 'Reload the page and try again.';
    }
  }

  function closeSearch() {
    if (layer.hidden) return;
    layer.hidden = true;
    document.body.classList.remove('global-search-open');
    trigger.setAttribute('aria-expanded', 'false');
    previousFocus?.focus?.();
  }

  trigger.addEventListener('click', openSearch);
  document.querySelectorAll('[data-open-global-search]').forEach((button) => button.addEventListener('click', openSearch));
  layer.querySelector('.global-search-backdrop').addEventListener('click', closeSearch);
  input.addEventListener('input', renderResults);

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      layer.hidden ? openSearch() : closeSearch();
      return;
    }
    if (layer.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSearch();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveResult(activeResult + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveResult(activeResult - 1);
    } else if (event.key === 'Enter' && activeResult >= 0 && document.activeElement === input) {
      event.preventDefault();
      resultsHost.querySelectorAll('.global-search-result')[activeResult]?.click();
    } else if (event.key === 'Tab') {
      const focusable = Array.from(dialog.querySelectorAll('input, a[href], button:not([disabled])')).filter((node) => !node.hidden);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
