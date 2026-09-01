(() => {
  const registryUrl = 'docs/sexual-tension-notes.json';
  let registryPromise;

  function load() {
    if (!registryPromise) {
      registryPromise = fetch(registryUrl).then((response) => {
        if (!response.ok) throw new Error(`Sexual tension registry request failed: ${response.status}`);
        return response.json();
      });
    }
    return registryPromise;
  }

  function entriesFor(registry, slug) {
    return registry.pairs.flatMap((pair) => {
      const participant = pair.participants.find((candidate) => candidate.slug === slug);
      if (!participant) return [];
      const other = pair.participants.find((candidate) => candidate.slug !== slug);
      return [{ ...pair, participant, other }];
    });
  }

  function unresolvedFor(registry, slug) {
    return registry.unresolved.find((entry) => entry.slug === slug);
  }

  function createEntry(entry, detailed) {
    const card = document.createElement('article');
    card.className = 'sexual-tension-entry';

    const metadata = document.createElement('div');
    const status = document.createElement('span');
    status.textContent = entry.status;
    const direction = document.createElement('span');
    direction.textContent = entry.direction;
    metadata.append(status, direction);

    const name = document.createElement('h4');
    const nameLink = document.createElement('a');
    nameLink.href = `character.html?character=${encodeURIComponent(entry.other.slug)}#connections-title`;
    nameLink.textContent = entry.other.name;
    name.append(nameLink);
    const reading = document.createElement('p');
    reading.textContent = entry.participant.reading;
    card.append(metadata, name, reading);

    if (detailed) {
      const dynamic = document.createElement('small');
      dynamic.textContent = entry.dynamic;
      card.append(dynamic);
    }
    return card;
  }

  function createModule(registry, slug, { detailed = false, headingLevel = 3 } = {}) {
    const entries = entriesFor(registry, slug);
    const unresolved = unresolvedFor(registry, slug);
    if (!entries.length && !unresolved) return null;

    const section = document.createElement('section');
    section.className = `sexual-tension-module${detailed ? ' is-detailed' : ''}`;
    const header = document.createElement('header');
    const eyebrow = document.createElement('span');
    eyebrow.textContent = 'Writer lens';
    const title = document.createElement(`h${headingLevel}`);
    title.textContent = 'Potential sexual tension';
    const description = document.createElement('p');
    description.textContent = 'Chemistry the current material can support, whether or not it becomes mutual, conscious, or resolved.';
    header.append(eyebrow, title, description);

    const grid = document.createElement('div');
    if (entries.length) grid.append(...entries.map((entry) => createEntry(entry, detailed)));
    else {
      const empty = document.createElement('article');
      empty.className = 'sexual-tension-empty';
      empty.append(Object.assign(document.createElement('strong'), { textContent: 'No supported pairing yet' }), Object.assign(document.createElement('p'), { textContent: unresolved.note }));
      grid.append(empty);
    }
    section.append(header, grid);
    return section;
  }

  window.MAGIARCHY_SEXUAL_TENSION = {
    load,
    entriesFor,
    unresolvedFor,
    createModule
  };
})();
