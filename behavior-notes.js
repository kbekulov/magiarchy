(() => {
  const registryUrl = 'docs/character-behavior-notes.json';
  const kinds = {
    female: { marker: 'F', label: 'Female lens' },
    male: { marker: 'M', label: 'Male lens' },
    story: { marker: 'S', label: 'Story note' }
  };
  let registryPromise;
  let activeTrigger = null;
  let activeAnchor = null;

  function load() {
    if (!registryPromise) {
      registryPromise = fetch(registryUrl).then((response) => {
        if (!response.ok) throw new Error(`Behaviour note registry request failed: ${response.status}`);
        return response.json();
      });
    }
    return registryPromise;
  }

  function createMarker(kind) {
    const definition = kinds[kind] || kinds.story;
    const marker = document.createElement('span');
    marker.className = 'behavior-marker';
    marker.setAttribute('aria-hidden', 'true');
    marker.textContent = definition.marker;
    return marker;
  }

  function createLegend() {
    const legend = document.createElement('div');
    legend.className = 'behavior-legend';
    legend.setAttribute('aria-label', 'Advisory note key');
    Object.entries(kinds).forEach(([kind, definition]) => {
      const item = document.createElement('span');
      item.className = `is-${kind}`;
      item.append(createMarker(kind), document.createTextNode(definition.label));
      legend.append(item);
    });
    return legend;
  }

  function createNote(note) {
    const article = document.createElement('article');
    article.className = `behavior-note is-${note.kind || 'story'}`;
    article.dataset.behaviorNote = note.id;

    const header = document.createElement('header');
    const identity = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = note.title;
    const basis = document.createElement('span');
    basis.textContent = note.basis;
    identity.append(title, basis);
    header.append(createMarker(note.kind), identity);

    const copy = document.createElement('p');
    copy.textContent = note.text;
    article.append(header, copy);
    return article;
  }

  function renderNotes(container, notes) {
    container.replaceChildren(...notes.map(createNote));
  }

  function notesFor(registry, field, slug, versionId) {
    return registry.notes.filter((note) => {
      const matchesRecord = Array.isArray(note[field]) && note[field].includes(slug);
      const matchesVersion = !Array.isArray(note.versions) || !note.versions.length || note.versions.includes(versionId);
      return matchesRecord && matchesVersion;
    });
  }

  function ensureTooltip() {
    let tooltip = document.querySelector('#behavior-note-tooltip');
    if (tooltip) return tooltip;

    tooltip = document.createElement('aside');
    tooltip.id = 'behavior-note-tooltip';
    tooltip.className = 'behavior-tooltip';
    tooltip.setAttribute('role', 'dialog');
    tooltip.setAttribute('aria-modal', 'false');
    tooltip.setAttribute('aria-labelledby', 'behavior-tooltip-title');
    tooltip.hidden = true;
    tooltip.innerHTML = `
      <header>
        <span class="behavior-tooltip-marker" aria-hidden="true"></span>
        <div>
          <span class="behavior-tooltip-lens"></span>
          <strong id="behavior-tooltip-title"></strong>
          <small class="behavior-tooltip-basis"></small>
        </div>
        <button type="button" class="behavior-tooltip-close" aria-label="Close writer note">×</button>
      </header>
      <p class="behavior-tooltip-copy"></p>
      <a href="docs.html?doc=character-behavior-audit">Open full behaviour audit <span aria-hidden="true">→</span></a>`;
    document.body.append(tooltip);

    tooltip.querySelector('.behavior-tooltip-close').addEventListener('click', () => closeTooltip(true));
    document.addEventListener('pointerdown', (event) => {
      if (!tooltip.hidden && !tooltip.contains(event.target) && !event.target.closest('.behavior-annotated')) closeTooltip(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !tooltip.hidden) closeTooltip(true);
    });
    window.addEventListener('resize', () => {
      if (!tooltip.hidden && activeAnchor) positionTooltip(tooltip, activeAnchor);
    });
    window.addEventListener('scroll', () => closeTooltip(false), { passive: true, capture: true });
    return tooltip;
  }

  function positionTooltip(tooltip, anchor) {
    tooltip.style.removeProperty('top');
    tooltip.style.removeProperty('left');
    if (window.matchMedia('(max-width: 700px)').matches) return;

    const rect = anchor.getBoundingClientRect();
    const gap = 10;
    const edge = 12;
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    const left = Math.min(Math.max(rect.left, edge), window.innerWidth - width - edge);
    const roomBelow = window.innerHeight - rect.bottom;
    const top = roomBelow >= height + gap ? rect.bottom + gap : Math.max(edge, rect.top - height - gap);
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function setExpanded(anchor, value) {
    anchor.setAttribute('aria-expanded', String(value));
    anchor.querySelectorAll('.behavior-gutter-marker').forEach((marker) => marker.setAttribute('aria-expanded', String(value)));
  }

  function closeTooltip(restoreFocus) {
    const tooltip = document.querySelector('#behavior-note-tooltip');
    if (!tooltip || tooltip.hidden) return;
    tooltip.hidden = true;
    tooltip.classList.remove('is-female', 'is-male', 'is-story');
    if (activeAnchor) setExpanded(activeAnchor, false);
    const trigger = activeTrigger;
    activeTrigger = null;
    activeAnchor = null;
    if (restoreFocus && trigger) trigger.focus();
  }

  function openTooltip(note, trigger, anchor) {
    const tooltip = ensureTooltip();
    if (activeAnchor && activeAnchor !== anchor) setExpanded(activeAnchor, false);
    activeTrigger = trigger;
    activeAnchor = anchor;
    const definition = kinds[note.kind] || kinds.story;
    tooltip.classList.remove('is-female', 'is-male', 'is-story');
    tooltip.classList.add(`is-${note.kind || 'story'}`);
    tooltip.querySelector('.behavior-tooltip-marker').textContent = definition.marker;
    tooltip.querySelector('.behavior-tooltip-lens').textContent = definition.label;
    tooltip.querySelector('#behavior-tooltip-title').textContent = note.title;
    tooltip.querySelector('.behavior-tooltip-basis').textContent = note.basis;
    tooltip.querySelector('.behavior-tooltip-copy').textContent = note.text;
    tooltip.hidden = false;
    setExpanded(anchor, true);
    requestAnimationFrame(() => positionTooltip(tooltip, anchor));
  }

  function annotate(target, notes) {
    if (!target || !notes.length || target.classList.contains('behavior-annotated')) return;
    target.classList.add('behavior-annotated');
    target.tabIndex = 0;
    target.setAttribute('aria-haspopup', 'dialog');
    target.setAttribute('aria-expanded', 'false');
    target.setAttribute('aria-label', `${target.textContent.trim()} Writer note available.`);

    const gutter = document.createElement('span');
    gutter.className = 'behavior-gutter';
    gutter.setAttribute('aria-label', `${notes.length} writer ${notes.length === 1 ? 'note' : 'notes'}`);
    notes.forEach((note) => {
      const definition = kinds[note.kind] || kinds.story;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `behavior-gutter-marker is-${note.kind || 'story'}`;
      button.textContent = definition.marker;
      button.setAttribute('aria-label', `Open ${definition.label.toLowerCase()} for ${note.title}`);
      button.setAttribute('aria-haspopup', 'dialog');
      button.setAttribute('aria-expanded', 'false');
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        openTooltip(note, button, target);
      });
      gutter.append(button);
    });

    if (target.matches('p')) {
      const copy = document.createElement('span');
      copy.className = 'behavior-paragraph-copy';
      copy.append(...target.childNodes);
      target.append(gutter, copy);
    } else {
      const number = target.querySelector('.moment-fact-number');
      number?.after(gutter);
    }

    target.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      openTooltip(notes[0], target, target);
    });
    target.addEventListener('keydown', (event) => {
      if (event.target !== target || (event.key !== 'Enter' && event.key !== ' ')) return;
      event.preventDefault();
      openTooltip(notes[0], target, target);
    });
  }

  function attachToChapter(container, notes) {
    const paragraphs = [...container.querySelectorAll('p')];
    const grouped = new Map();
    notes.forEach((note) => {
      if (!note.chapterMatch) return;
      const target = paragraphs.find((paragraph) => paragraph.textContent.includes(note.chapterMatch));
      if (!target) return;
      grouped.set(target, [...(grouped.get(target) || []), note]);
    });
    grouped.forEach((group, target) => annotate(target, group));
  }

  function attachToMoment(list, slug, notes) {
    const rows = [...list.children];
    const grouped = new Map();
    notes.forEach((note) => {
      const index = note.momentFact?.[slug];
      if (!Number.isInteger(index) || !rows[index]) return;
      grouped.set(rows[index], [...(grouped.get(rows[index]) || []), note]);
    });
    grouped.forEach((group, target) => annotate(target, group));
  }

  window.MAGIARCHY_BEHAVIOR_NOTES = {
    load,
    createLegend,
    createNote,
    renderNotes,
    attachToChapter,
    attachToMoment,
    forChapter: (registry, slug, versionId = 'v1') => notesFor(registry, 'chapters', slug, versionId),
    forMoment: (registry, slug, versionId = 'v1') => notesFor(registry, 'moments', slug, versionId)
  };
})();
