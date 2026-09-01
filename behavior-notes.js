(() => {
  const registryUrl = 'docs/character-behavior-notes.json';
  const kinds = {
    female: { marker: 'F', label: 'Female lens' },
    male: { marker: 'M', label: 'Male lens' },
    story: { marker: 'S', label: 'Story note' }
  };
  let registryPromise;

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

    const text = document.createElement('p');
    text.textContent = note.text;
    article.append(header, text);
    return article;
  }

  function renderNotes(container, notes) {
    container.replaceChildren(...notes.map(createNote));
  }

  function notesFor(registry, field, slug) {
    return registry.notes.filter((note) => Array.isArray(note[field]) && note[field].includes(slug));
  }

  window.MAGIARCHY_BEHAVIOR_NOTES = {
    load,
    createLegend,
    createNote,
    renderNotes,
    forChapter: (registry, slug) => notesFor(registry, 'chapters', slug),
    forMoment: (registry, slug) => notesFor(registry, 'moments', slug)
  };
})();
