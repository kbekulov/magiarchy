const chapterLibrary = document.querySelector('#chapter-library');
const chapterCardGrid = document.querySelector('#chapter-card-grid');
const chapterReaderView = document.querySelector('#chapter-reader-view');
const storyHeading = document.querySelector('#story-heading');
const chapterReader = document.querySelector('#chapter-reader');
const chapterMeta = document.querySelector('#chapter-meta');
const chapterSummary = document.querySelector('#chapter-summary');
const chapterStatus = document.querySelector('#chapter-status');
const chapterSourceLink = document.querySelector('#chapter-source-link');
const chapterError = document.querySelector('#chapter-error');
const chapterCrumb = document.querySelector('#chapter-crumb');
const chapterReaderCharacters = document.querySelector('#chapter-reader-characters');
const chapterEventList = document.querySelector('#chapter-event-list');
const chapterVersionSwitcher = document.querySelector('#chapter-version-switcher');
const chapterVersionCurrent = document.querySelector('#chapter-version-current');
const chapterVersionOptions = document.querySelector('#chapter-version-options');
const timelineTrack = document.querySelector('.timeline-track');
const storyPhases = window.MAGIARCHY_STORY_PHASES ?? [];

function renderStoryTimeline() {
  if (!timelineTrack) return;
  timelineTrack.replaceChildren(...storyPhases.map((phase) => {
    const item = document.createElement('li');
    item.id = `phase-${phase.id}`;
    item.dataset.timelinePhase = phase.id;
    item.dataset.storyArc = phase.arc;
    const marker = document.createElement('span');
    marker.className = 'timeline-marker';
    marker.textContent = phase.number;
    const copy = document.createElement('div');
    const label = document.createElement('small');
    label.textContent = `${phase.arcLabel} · ${phase.label}`;
    const title = document.createElement('h3');
    title.textContent = phase.title;
    const description = document.createElement('p');
    description.textContent = phase.description;
    copy.append(label, title, description);
    item.append(marker, copy);
    return item;
  }));
}

function initializeTimelineDrag() {
  if (!timelineTrack) return;

  let activePointerId = null;
  let pointerStartX = 0;
  let scrollStartX = 0;
  let moved = false;

  function finishDrag(event) {
    if (event.pointerId !== activePointerId) return;
    if (timelineTrack.hasPointerCapture(event.pointerId)) timelineTrack.releasePointerCapture(event.pointerId);
    timelineTrack.classList.remove('is-dragging');
    activePointerId = null;
  }

  timelineTrack.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    activePointerId = event.pointerId;
    pointerStartX = event.clientX;
    scrollStartX = timelineTrack.scrollLeft;
    moved = false;
    timelineTrack.setPointerCapture(event.pointerId);
    timelineTrack.classList.add('is-dragging');
  });

  timelineTrack.addEventListener('pointermove', (event) => {
    if (event.pointerId !== activePointerId) return;
    if (Math.abs(event.clientX - pointerStartX) > 4) moved = true;
    event.preventDefault();
    timelineTrack.scrollLeft = scrollStartX - (event.clientX - pointerStartX);
  });

  timelineTrack.addEventListener('pointerup', finishDrag);
  timelineTrack.addEventListener('pointercancel', finishDrag);
  timelineTrack.addEventListener('lostpointercapture', () => {
    timelineTrack.classList.remove('is-dragging');
    activePointerId = null;
  });
  timelineTrack.addEventListener('click', (event) => {
    if (!moved) return;
    event.preventDefault();
    moved = false;
  }, true);
}

function appendChapterInline(text, parent) {
  const tokenPattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let cursor = 0;

  for (const match of text.matchAll(tokenPattern)) {
    if (match.index > cursor) parent.append(document.createTextNode(text.slice(cursor, match.index)));

    const token = match[0];
    const element = document.createElement(token.startsWith('**') ? 'strong' : token.startsWith('*') ? 'em' : 'code');
    element.textContent = token.startsWith('**') ? token.slice(2, -2) : token.slice(1, -1);
    parent.append(element);
    cursor = match.index + token.length;
  }

  if (cursor < text.length) parent.append(document.createTextNode(text.slice(cursor)));
}

function renderChapterMarkdown(markdown) {
  const fragment = document.createDocumentFragment();
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const heading = document.createElement(`h${headingMatch[1].length}`);
      appendChapterInline(headingMatch[2], heading);
      fragment.append(heading);
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      const quote = document.createElement('blockquote');
      appendChapterInline(line.slice(2), quote);
      fragment.append(quote);
      index += 1;
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{1,3})\s+|^>\s+/.test(lines[index].trim())) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    const paragraph = document.createElement('p');
    appendChapterInline(paragraphLines.join(' '), paragraph);
    fragment.append(paragraph);
  }

  return fragment;
}

function createCharacterLabels(characters) {
  return characters.map((character) => {
    const label = document.createElement('span');
    label.textContent = character;
    return label;
  });
}

function chapterVersions(entry) {
  if (Array.isArray(entry.versions) && entry.versions.length) {
    return entry.versions.map((version, index) => ({
      id: version.id || `v${index + 1}`,
      label: version.label || `Version ${index + 1}`,
      ...version
    }));
  }
  return [{ id: 'v1', label: 'Version 1' }];
}

function resolveChapterVersion(entry, requestedVersion) {
  const versions = chapterVersions(entry);
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

function renderChapterVersionSwitcher(entry, selected) {
  if (!chapterVersionSwitcher || !chapterVersionOptions || !chapterVersionCurrent) return;
  const versions = chapterVersions(entry);
  chapterVersionSwitcher.hidden = versions.length < 2;
  chapterVersionCurrent.textContent = `${selected.versionId}${selected.versionId === entry.defaultVersion ? ' · Canon' : ''}`;
  chapterVersionOptions.replaceChildren(...versions.map((version) => {
    const link = document.createElement('a');
    link.href = `story.html?chapter=${encodeURIComponent(entry.slug)}&version=${encodeURIComponent(version.id)}`;
    link.textContent = version.id;
    link.title = version.label;
    link.classList.toggle('is-active', version.id === selected.versionId);
    if (version.id === selected.versionId) link.setAttribute('aria-current', 'page');
    return link;
  }));
}

function createChapterCard(entry) {
  const resolved = resolveChapterVersion(entry);
  const card = document.createElement('article');
  card.className = 'document-card chapter-card reveal is-visible';

  const link = document.createElement('a');
  link.className = 'document-card-link';
  link.href = `story.html?chapter=${encodeURIComponent(entry.slug)}`;
  link.setAttribute('aria-label', `Read ${entry.number}: ${entry.title}`);

  const top = document.createElement('div');
  top.className = 'document-card-top';

  const number = document.createElement('span');
  number.className = 'doc-topic';
  number.textContent = entry.number;

  const status = document.createElement('span');
  status.className = 'document-card-code';
  status.textContent = resolved.versionCount > 1 ? `${resolved.status} · ${resolved.versionCount} versions` : resolved.status;
  top.append(number, status);

  const title = document.createElement('h2');
  title.textContent = entry.title;

  const description = document.createElement('p');
  description.textContent = resolved.description;

  const timelinePosition = document.createElement('div');
  timelinePosition.className = 'chapter-card-timeline';
  const timelineDot = document.createElement('span');
  timelineDot.setAttribute('aria-hidden', 'true');
  const timelineText = document.createElement('span');
  const phase = storyPhases.find((candidate) => candidate.id === entry.timelinePhase);
  timelineText.textContent = `${phase?.arcLabel ?? 'Arc unassigned'} · ${entry.timelineLabel ?? 'Phase unassigned'}`;
  timelinePosition.append(timelineDot, timelineText);

  const characters = document.createElement('div');
  characters.className = 'chapter-character-list';
  characters.setAttribute('role', 'group');
  characters.setAttribute('aria-label', 'Characters involved');
  characters.append(...createCharacterLabels(entry.characters));

  const footer = document.createElement('div');
  footer.className = 'document-card-footer';
  const date = document.createElement('span');
  date.textContent = `Updated ${resolved.updated}`;
  const arrow = document.createElement('span');
  arrow.className = 'document-card-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '→';
  footer.append(date, arrow);

  link.append(top, title, description, timelinePosition, characters, footer);
  card.append(link);
  return card;
}

function showChapterLibrary(entries) {
  document.body.classList.remove('story-reader-open');
  setActiveTimelinePhase();
  setMomentContextPhase(new URLSearchParams(window.location.search).get('phase'));
  chapterReaderView.hidden = true;
  chapterLibrary.hidden = false;
  storyHeading.hidden = false;
  chapterCardGrid.replaceChildren(...entries.map(createChapterCard));
}

function setMomentContextPhase(phaseId) {
  if (!timelineTrack) return;
  const phases = [...timelineTrack.querySelectorAll('[data-timeline-phase]')];
  phases.forEach((phase) => phase.classList.remove('is-moment-context'));
  if (!phaseId) return;
  const activePhase = phases.find((phase) => phase.dataset.timelinePhase === phaseId);
  if (!activePhase) return;
  activePhase.classList.add('is-moment-context');
  activePhase.setAttribute('aria-current', 'step');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(() => {
    const centeredPosition = activePhase.offsetLeft - ((timelineTrack.clientWidth - activePhase.offsetWidth) / 2);
    timelineTrack.scrollTo({ left: Math.max(0, centeredPosition), behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}

async function initializeStoryMoments() {
  if (!timelineTrack) return;
  try {
    const response = await fetch('moments/index.json');
    if (!response.ok) throw new Error(`Moment catalog request failed: ${response.status}`);
    const moments = await response.json();
    timelineTrack.querySelectorAll('[data-timeline-phase]').forEach((phase) => {
      const anchored = moments.filter((moment) => moment.timelinePhase === phase.dataset.timelinePhase);
      if (!anchored.length) return;
      phase.classList.add('has-moments');
      const link = document.createElement('a');
      link.className = 'timeline-moment-anchor';
      link.href = `moments.html?phase=${encodeURIComponent(phase.dataset.timelinePhase)}`;
      link.textContent = `${anchored.length} ${anchored.length === 1 ? 'Moment' : 'Moments'} anchored`;
      phase.querySelector(':scope > div').append(link);
    });
  } catch (error) {
    console.warn('Moment annotations could not be loaded.', error);
  }
}

function setActiveTimelinePhase(entry) {
  if (!timelineTrack) return;
  const phases = [...timelineTrack.querySelectorAll('[data-timeline-phase]')];
  phases.forEach((phase) => {
    phase.classList.remove('is-chapter-active');
    phase.removeAttribute('aria-current');
  });

  if (!entry?.timelinePhase) return;
  const activePhase = phases.find((phase) => phase.dataset.timelinePhase === entry.timelinePhase);
  if (!activePhase) return;

  activePhase.classList.add('is-chapter-active');
  activePhase.setAttribute('aria-current', 'step');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(() => {
    const centeredPosition = activePhase.offsetLeft - ((timelineTrack.clientWidth - activePhase.offsetWidth) / 2);
    timelineTrack.scrollTo({ left: Math.max(0, centeredPosition), behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}

async function loadChapter(entry, requestedVersion) {
  const selected = resolveChapterVersion(entry, requestedVersion);
  document.body.classList.add('story-reader-open');
  chapterLibrary.hidden = true;
  storyHeading.hidden = true;
  chapterReaderView.hidden = false;
  chapterReader.replaceChildren();
  chapterError.hidden = true;
  chapterMeta.textContent = 'Loading chapter…';
  chapterCrumb.textContent = `${entry.number}: ${entry.title}`;
  chapterStatus.textContent = selected.status;
  chapterSummary.textContent = selected.description;
  chapterReaderCharacters.replaceChildren(...createCharacterLabels(entry.characters));
  chapterEventList.replaceChildren(...(selected.events ?? []).map((event, index) => {
    const record = typeof event === 'string' ? { text: event, status: 'reader' } : event;
    const row = document.createElement('tr');
    row.className = record.status === 'inferred' ? 'is-inferred' : 'is-reader';
    const number = document.createElement('th');
    number.scope = 'row';
    number.textContent = String(index + 1).padStart(2, '0');
    const description = document.createElement('td');
    description.textContent = record.text;
    row.append(number, description);
    return row;
  }));
  chapterSourceLink.href = `story/${selected.file}`;
  renderChapterVersionSwitcher(entry, selected);
  setActiveTimelinePhase(selected);

  try {
    const response = await fetch(`story/${selected.file}`);
    if (!response.ok) throw new Error(`Chapter request failed: ${response.status}`);
    const markdown = await response.text();
    chapterReader.append(renderChapterMarkdown(markdown));
    if (window.MAGIARCHY_BEHAVIOR_NOTES) {
      try {
        const registry = await window.MAGIARCHY_BEHAVIOR_NOTES.load();
        const notes = window.MAGIARCHY_BEHAVIOR_NOTES.forChapter(registry, entry.slug, selected.versionId);
        window.MAGIARCHY_BEHAVIOR_NOTES.attachToChapter(chapterReader, notes);
      } catch (error) {
        console.warn('Chapter behaviour guidance could not be loaded.', error);
      }
    }
    chapterMeta.textContent = `${entry.number} · ${selected.versionLabel} · ${entry.characters.join(' / ')} · Updated ${selected.updated}`;
    document.title = `${entry.title} · ${selected.versionLabel} - Story - Magiarchy`;
  } catch (error) {
    chapterMeta.textContent = 'Chapter unavailable';
    chapterError.hidden = false;
    console.error(error);
  }
}

async function initializeStory() {
  if (!chapterCardGrid || !chapterLibrary || !chapterReaderView) return;

  try {
    const response = await fetch('story/index.json');
    if (!response.ok) throw new Error(`Chapter catalog request failed: ${response.status}`);
    const entries = await response.json();
    if (!Array.isArray(entries) || entries.length === 0) throw new Error('Chapter catalog is empty');

    const parameters = new URLSearchParams(window.location.search);
    const requestedSlug = parameters.get('chapter');
    const requestedVersion = parameters.get('version');
    const selectedEntry = entries.find((entry) => entry.slug === requestedSlug);
    if (selectedEntry) await loadChapter(selectedEntry, requestedVersion);
    else showChapterLibrary(entries);
  } catch (error) {
    chapterCardGrid.replaceChildren();
    const message = document.createElement('div');
    message.className = 'document-error';
    const title = document.createElement('h2');
    title.textContent = 'Chapter library unavailable';
    const description = document.createElement('p');
    description.textContent = 'The chapter catalog could not be loaded.';
    message.append(title, description);
    chapterCardGrid.append(message);
    console.error(error);
  }
}

renderStoryTimeline();
initializeTimelineDrag();
initializeStoryMoments();
initializeStory();
