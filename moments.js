const momentsCatalogView = document.querySelector('#moments-catalog-view');
const momentReader = document.querySelector('#moment-reader');
const momentError = document.querySelector('#moment-error');
const momentCardGrid = document.querySelector('#moment-card-grid');
const momentEmpty = document.querySelector('#moment-empty');
const momentResultCount = document.querySelector('#moment-result-count');
const momentSearch = document.querySelector('#moment-search');
const momentPhaseFilter = document.querySelector('#moment-phase-filter');
const momentCharacterFilter = document.querySelector('#moment-character-filter');
const momentTypeFilter = document.querySelector('#moment-type-filter');
const momentPhaseTrack = document.querySelector('#moment-phase-track');
const momentVersionSwitcher = document.querySelector('#moment-version-switcher');
const momentVersionCurrent = document.querySelector('#moment-version-current');
const momentVersionOptions = document.querySelector('#moment-version-options');
const storyPhases = window.MAGIARCHY_STORY_PHASES ?? [];

function momentElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function initializeMomentTrackDrag() {
  if (!momentPhaseTrack) return;
  let pointerId = null;
  let pointerStartX = 0;
  let scrollStartX = 0;
  let moved = false;

  function finish(event) {
    if (event.pointerId !== pointerId) return;
    if (momentPhaseTrack.hasPointerCapture(event.pointerId)) momentPhaseTrack.releasePointerCapture(event.pointerId);
    momentPhaseTrack.classList.remove('is-dragging');
    pointerId = null;
  }

  momentPhaseTrack.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    pointerId = event.pointerId;
    pointerStartX = event.clientX;
    scrollStartX = momentPhaseTrack.scrollLeft;
    moved = false;
    momentPhaseTrack.setPointerCapture(event.pointerId);
  });

  momentPhaseTrack.addEventListener('pointermove', (event) => {
    if (event.pointerId !== pointerId) return;
    const distance = event.clientX - pointerStartX;
    if (Math.abs(distance) > 4) {
      moved = true;
      momentPhaseTrack.classList.add('is-dragging');
    }
    if (!moved) return;
    event.preventDefault();
    momentPhaseTrack.scrollLeft = scrollStartX - distance;
  });

  momentPhaseTrack.addEventListener('click', (event) => {
    if (moved) {
      event.preventDefault();
      moved = false;
    }
  }, true);
  momentPhaseTrack.addEventListener('pointerup', finish);
  momentPhaseTrack.addEventListener('pointercancel', finish);
  momentPhaseTrack.addEventListener('lostpointercapture', () => {
    momentPhaseTrack.classList.remove('is-dragging');
    pointerId = null;
  });
}

function characterNames(entry) {
  return entry.characters.map((character) => character.name);
}

function momentVersions(entry) {
  if (Array.isArray(entry.versions) && entry.versions.length) {
    return entry.versions.map((version, index) => ({
      id: version.id || `v${index + 1}`,
      label: version.label || `Version ${index + 1}`,
      ...version
    }));
  }
  return [{ id: 'v1', label: 'Version 1' }];
}

function resolveMomentVersion(entry, requestedVersion) {
  const versions = momentVersions(entry);
  const fallbackId = entry.defaultVersion || versions[0].id;
  const selected = versions.find((version) => version.id === requestedVersion)
    || versions.find((version) => version.id === fallbackId)
    || versions[0];
  return {
    ...entry,
    ...selected,
    versionId: selected.id,
    versionLabel: selected.label,
    versionCount: versions.length,
    versionRecords: versions
  };
}

function renderMomentVersionSwitcher(entry, selected) {
  if (!momentVersionSwitcher || !momentVersionOptions || !momentVersionCurrent) return;
  const versions = momentVersions(entry);
  momentVersionSwitcher.hidden = versions.length < 2;
  momentVersionCurrent.textContent = `${selected.versionId}${selected.versionId === entry.defaultVersion ? ' · Canon' : ''}`;
  momentVersionOptions.replaceChildren(...versions.map((version) => {
    const link = momentElement('a', version.id === selected.versionId ? 'is-active' : '', version.id);
    link.title = version.label;
    link.href = `moments.html?moment=${encodeURIComponent(entry.slug)}&version=${encodeURIComponent(version.id)}`;
    if (version.id === selected.versionId) link.setAttribute('aria-current', 'page');
    return link;
  }));
}

function phaseOrder(phaseId) {
  const index = storyPhases.findIndex((phase) => phase.id === phaseId);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function sortMoments(entries) {
  return [...entries].sort((left, right) => {
    const phaseDifference = phaseOrder(left.timelinePhase) - phaseOrder(right.timelinePhase);
    if (phaseDifference !== 0) return phaseDifference;
    return (left.sequence ?? 0) - (right.sequence ?? 0);
  });
}

function renderMomentPhaseTrack(entries) {
  const counts = entries.reduce((map, entry) => {
    map.set(entry.timelinePhase, (map.get(entry.timelinePhase) ?? 0) + 1);
    return map;
  }, new Map());

  const nodes = storyPhases.map((phase) => {
    const item = momentElement('li');
    item.dataset.momentPhase = phase.id;
    item.dataset.storyArc = phase.arc;
    const button = momentElement('button');
    button.type = 'button';
    button.dataset.phase = phase.id;
    button.setAttribute('aria-label', `Filter Moments to ${phase.title}`);
    button.append(momentElement('span', 'moment-phase-number', phase.number));
    const copy = momentElement('div');
    copy.append(momentElement('small', '', `${phase.arcLabel} · ${phase.label}`), momentElement('h3', '', phase.title));
    const count = counts.get(phase.id) ?? 0;
    item.classList.toggle('has-moments', count > 0);
    copy.append(momentElement('p', '', count ? `${count} anchored ${count === 1 ? 'Moment' : 'Moments'}` : 'No scenes anchored yet'));
    button.append(copy);
    item.append(button);
    return item;
  });
  momentPhaseTrack.replaceChildren(...nodes);
}

function appendOptions(select, values, labelForValue = (value) => value) {
  values.forEach((value) => {
    const option = momentElement('option', '', labelForValue(value));
    option.value = value;
    select.append(option);
  });
}

function renderMomentFilters(entries) {
  appendOptions(momentPhaseFilter, storyPhases.map((phase) => phase.id), (id) => {
    const phase = storyPhases.find((candidate) => candidate.id === id);
    return phase ? `${phase.arcLabel} · ${phase.title}` : id;
  });
  const characters = [...new Set(entries.flatMap(characterNames))].sort((a, b) => a.localeCompare(b));
  const sceneTypes = [...new Set(entries.map((entry) => entry.sceneType))].sort((a, b) => a.localeCompare(b));
  appendOptions(momentCharacterFilter, characters);
  appendOptions(momentTypeFilter, sceneTypes);
}

function createMomentCard(entry) {
  entry = resolveMomentVersion(entry);
  const card = momentElement('article', 'moment-card');
  card.dataset.phase = entry.timelinePhase;
  const phase = storyPhases.find((candidate) => candidate.id === entry.timelinePhase);
  card.dataset.characters = characterNames(entry).join('|').toLowerCase();
  card.dataset.type = entry.sceneType;
  card.dataset.search = `${entry.title} ${entry.summary} ${entry.thread} ${entry.location} ${entry.sceneType} ${characterNames(entry).join(' ')}`.toLowerCase();

  const link = momentElement('a', 'moment-card-link');
  link.href = `moments.html?moment=${encodeURIComponent(entry.slug)}`;
  link.setAttribute('aria-label', `Open ${entry.title}`);

  const top = momentElement('div', 'moment-card-top');
  const status = entry.versionCount > 1 ? `${entry.status} · ${entry.versionCount} versions` : entry.status;
  top.append(momentElement('span', 'moment-code', entry.code), momentElement('span', 'moment-status', status));
  link.append(top, momentElement('h3', '', entry.title), momentElement('p', 'moment-card-summary', entry.summary));

  const position = momentElement('div', 'moment-card-position');
  position.append(momentElement('span', '', `${phase?.arcLabel ?? 'Arc unassigned'} · ${entry.timelineLabel}`), momentElement('small', '', entry.placementStatus));
  link.append(position);

  const metadata = momentElement('dl', 'moment-card-meta');
  [['Role', entry.sceneType], ['Thread', entry.thread], ['Place', entry.location]].forEach(([term, value]) => {
    metadata.append(momentElement('dt', '', term), momentElement('dd', '', value));
  });
  link.append(metadata);

  const people = momentElement('div', 'moment-card-people');
  const names = characterNames(entry);
  if (names.length) names.forEach((name) => people.append(momentElement('span', '', name)));
  else people.append(momentElement('span', 'is-civilian', 'Civilian perspective'));
  link.append(people);

  const footer = momentElement('div', 'moment-card-footer');
  footer.append(momentElement('span', '', `${entry.openQuestions.length} open ${entry.openQuestions.length === 1 ? 'question' : 'questions'}`), momentElement('span', '', 'Open →'));
  link.append(footer);
  card.append(link);
  return card;
}

function applyMomentFilters() {
  const query = momentSearch.value.trim().toLowerCase();
  const phase = momentPhaseFilter.value;
  const character = momentCharacterFilter.value.toLowerCase();
  const type = momentTypeFilter.value;
  let visible = 0;

  document.querySelectorAll('.moment-card').forEach((card) => {
    const matches = (!query || card.dataset.search.includes(query))
      && (phase === 'all' || card.dataset.phase === phase)
      && (character === 'all' || card.dataset.characters.split('|').includes(character))
      && (type === 'all' || card.dataset.type === type);
    card.hidden = !matches;
    if (matches) visible += 1;
  });

  document.querySelectorAll('[data-moment-phase]').forEach((item) => {
    const active = phase !== 'all' && item.dataset.momentPhase === phase;
    item.classList.toggle('is-filter-active', active);
    item.querySelector('button').setAttribute('aria-pressed', String(active));
  });
  momentResultCount.textContent = String(visible);
  momentEmpty.hidden = visible !== 0;
}

function renderMomentCatalog(entries) {
  momentCardGrid.replaceChildren(...sortMoments(entries).map(createMomentCard));
  renderMomentPhaseTrack(entries);
  renderMomentFilters(entries);
  const requestedPhase = new URLSearchParams(window.location.search).get('phase');
  if (storyPhases.some((phase) => phase.id === requestedPhase)) momentPhaseFilter.value = requestedPhase;
  applyMomentFilters();

  [momentSearch, momentPhaseFilter, momentCharacterFilter, momentTypeFilter].forEach((control) => {
    control.addEventListener(control === momentSearch ? 'input' : 'change', applyMomentFilters);
  });
  momentPhaseTrack.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    const button = event.target.closest('button[data-phase]');
    if (!button) return;
    momentPhaseFilter.value = momentPhaseFilter.value === button.dataset.phase ? 'all' : button.dataset.phase;
    applyMomentFilters();
    document.querySelector('.moment-library').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
  initializeMomentTrackDrag();
}

function populateList(selector, entries, { factStatus = false } = {}) {
  document.querySelector(selector).replaceChildren(...entries.map((entry, index) => {
    const record = typeof entry === 'string' ? { text: entry, status: 'reader' } : entry;
    const item = momentElement('li');
    const status = record.status === 'inferred' ? 'inferred' : 'reader';
    item.append(momentElement('span', 'moment-fact-number', String(index + 1).padStart(2, '0')), momentElement('p', '', record.text));
    if (factStatus) {
      item.classList.add(`is-${status}`);
    }
    return item;
  }));
}

function createConnectionCard(label, title, detail, href) {
  const element = momentElement(href ? 'a' : 'article', 'moment-connection-card');
  if (href) element.href = href;
  element.append(momentElement('small', '', label), momentElement('strong', '', title), momentElement('p', '', detail));
  if (href) element.append(momentElement('span', '', 'Open record →'));
  return element;
}

async function renderMomentReader(entry, entries, requestedVersion) {
  const selected = resolveMomentVersion(entry, requestedVersion);
  momentsCatalogView.hidden = true;
  momentReader.hidden = false;
  document.querySelector('#moment-crumb').textContent = selected.title;
  document.querySelector('#moment-code').textContent = selected.code;
  document.querySelector('#moment-placement-status').textContent = selected.placementStatus;
  document.querySelector('#moment-scene-type').textContent = selected.sceneType;
  document.querySelector('#moment-reader-title').textContent = selected.title;
  document.querySelector('#moment-reader-summary').textContent = selected.summary;
  document.querySelector('#moment-purpose-label').textContent = selected.sceneType;
  document.querySelector('#moment-thread').textContent = selected.thread;
  document.querySelector('#moment-location').textContent = selected.location;
  document.querySelector('#moment-date').textContent = `Updated ${selected.updated}`;
  const phase = storyPhases.find((candidate) => candidate.id === selected.timelinePhase);
  const phaseLabel = `${phase?.arcLabel ?? 'Arc unassigned'} · ${selected.timelineLabel}`;
  document.querySelector('#moment-phase-name').textContent = phaseLabel;
  document.querySelector('#moment-story-link').href = `story.html?phase=${encodeURIComponent(selected.timelinePhase)}`;
  document.querySelector('#moment-before').textContent = selected.continuityBefore;
  document.querySelector('#moment-purpose').textContent = selected.purpose;
  document.querySelector('#moment-after').textContent = selected.continuityAfter;
  populateList('#moment-known', selected.known, { factStatus: true });
  renderMomentVersionSwitcher(entry, selected);

  const characterLinks = selected.characters.length
    ? selected.characters.map((character) => {
      const link = momentElement('a', '', character.name);
      link.href = `character.html?character=${encodeURIComponent(character.slug)}`;
      return link;
    })
    : [momentElement('span', 'is-civilian', 'Civilian perspective')];
  document.querySelector('#moment-reader-characters').replaceChildren(...characterLinks);

  const connections = [
    createConnectionCard('Overall Story', phaseLabel, selected.placementStatus, `story.html?phase=${encodeURIComponent(selected.timelinePhase)}`),
    ...selected.characters.map((character) => createConnectionCard('Character timeline', character.name, 'This Moment is anchored to the character\'s personal chronology.', `character.html?character=${encodeURIComponent(character.slug)}`))
  ];
  if (selected.chapterSlug) {
    const chapterVersion = selected.chapterVersion ? `&version=${encodeURIComponent(selected.chapterVersion)}` : '';
    connections.push(createConnectionCard('Chapter', `Assigned chapter · ${selected.versionId}`, 'Open the corresponding version of the chapter containing this Moment.', `story.html?chapter=${encodeURIComponent(selected.chapterSlug)}${chapterVersion}`));
  }
  else connections.push(createConnectionCard('Chapter', 'Not assigned yet', 'This scene can remain stable while the chapter around it is still unwritten.'));
  document.querySelector('#moment-connection-grid').replaceChildren(...connections);

  if (window.MAGIARCHY_BEHAVIOR_NOTES) {
    try {
      const registry = await window.MAGIARCHY_BEHAVIOR_NOTES.load();
      const notes = window.MAGIARCHY_BEHAVIOR_NOTES.forMoment(registry, entry.slug, selected.versionId);
      window.MAGIARCHY_BEHAVIOR_NOTES.attachToMoment(document.querySelector('#moment-known'), entry.slug, notes);
    } catch (error) {
      console.warn('Moment behaviour guidance could not be loaded.', error);
    }
  }

  const ordered = sortMoments(entries);
  const currentIndex = ordered.findIndex((candidate) => candidate.slug === entry.slug);
  const neighbors = [];
  if (ordered[currentIndex - 1]) {
    const previous = ordered[currentIndex - 1];
    const link = momentElement('a');
    link.href = `moments.html?moment=${encodeURIComponent(previous.slug)}`;
    link.append(momentElement('small', '', 'Previous Moment'), momentElement('strong', '', `← ${previous.title}`));
    neighbors.push(link);
  }
  if (ordered[currentIndex + 1]) {
    const next = ordered[currentIndex + 1];
    const link = momentElement('a');
    link.href = `moments.html?moment=${encodeURIComponent(next.slug)}`;
    link.append(momentElement('small', '', 'Next Moment'), momentElement('strong', '', `${next.title} →`));
    neighbors.push(link);
  }
  document.querySelector('#moment-neighbors').replaceChildren(...neighbors);
  document.title = `${selected.title} · ${selected.versionLabel} - Moments - Magiarchy`;
}

async function initializeMoments() {
  try {
    const response = await fetch('moments/index.json');
    if (!response.ok) throw new Error(`Moment catalog request failed: ${response.status}`);
    const entries = await response.json();
    if (!Array.isArray(entries) || entries.length === 0) throw new Error('Moment catalog is empty');
    const parameters = new URLSearchParams(window.location.search);
    const requestedMoment = parameters.get('moment');
    const requestedVersion = parameters.get('version');
    if (requestedMoment) {
      const selected = entries.find((entry) => entry.slug === requestedMoment);
      if (!selected) {
        momentsCatalogView.hidden = true;
        momentError.hidden = false;
        return;
      }
      await renderMomentReader(selected, entries, requestedVersion);
      return;
    }
    renderMomentCatalog(entries);
  } catch (error) {
    momentsCatalogView.hidden = true;
    momentError.hidden = false;
    console.error(error);
  }
}

initializeMoments();
