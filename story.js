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
const timelineTrack = document.querySelector('.timeline-track');

function initializeTimelineDrag() {
  if (!timelineTrack) return;

  let activePointerId = null;
  let pointerStartX = 0;
  let scrollStartX = 0;

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
    timelineTrack.setPointerCapture(event.pointerId);
    timelineTrack.classList.add('is-dragging');
  });

  timelineTrack.addEventListener('pointermove', (event) => {
    if (event.pointerId !== activePointerId) return;
    event.preventDefault();
    timelineTrack.scrollLeft = scrollStartX - (event.clientX - pointerStartX);
  });

  timelineTrack.addEventListener('pointerup', finishDrag);
  timelineTrack.addEventListener('pointercancel', finishDrag);
  timelineTrack.addEventListener('lostpointercapture', () => {
    timelineTrack.classList.remove('is-dragging');
    activePointerId = null;
  });
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

function createChapterCard(entry) {
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
  status.textContent = entry.status;
  top.append(number, status);

  const title = document.createElement('h2');
  title.textContent = entry.title;

  const description = document.createElement('p');
  description.textContent = entry.description;

  const timelinePosition = document.createElement('div');
  timelinePosition.className = 'chapter-card-timeline';
  const timelineDot = document.createElement('span');
  timelineDot.setAttribute('aria-hidden', 'true');
  const timelineText = document.createElement('span');
  timelineText.textContent = `Story phase · ${entry.timelineLabel ?? 'Unassigned'}`;
  timelinePosition.append(timelineDot, timelineText);

  const characters = document.createElement('div');
  characters.className = 'chapter-character-list';
  characters.setAttribute('role', 'group');
  characters.setAttribute('aria-label', 'Characters involved');
  characters.append(...createCharacterLabels(entry.characters));

  const footer = document.createElement('div');
  footer.className = 'document-card-footer';
  const date = document.createElement('span');
  date.textContent = `Updated ${entry.updated}`;
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
  setActiveTimelinePhase();
  chapterReaderView.hidden = true;
  chapterLibrary.hidden = false;
  storyHeading.hidden = false;
  chapterCardGrid.replaceChildren(...entries.map(createChapterCard));
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

async function loadChapter(entry) {
  chapterLibrary.hidden = true;
  storyHeading.hidden = true;
  chapterReaderView.hidden = false;
  chapterReader.replaceChildren();
  chapterError.hidden = true;
  chapterMeta.textContent = 'Loading chapter…';
  chapterCrumb.textContent = `${entry.number}: ${entry.title}`;
  chapterStatus.textContent = entry.status;
  chapterSummary.textContent = entry.description;
  chapterReaderCharacters.replaceChildren(...createCharacterLabels(entry.characters));
  chapterEventList.replaceChildren(...(entry.events ?? []).map((event, index) => {
    const row = document.createElement('tr');
    const number = document.createElement('th');
    number.scope = 'row';
    number.textContent = String(index + 1).padStart(2, '0');
    const description = document.createElement('td');
    description.textContent = event;
    row.append(number, description);
    return row;
  }));
  chapterSourceLink.href = `story/${entry.file}`;
  setActiveTimelinePhase(entry);

  try {
    const response = await fetch(`story/${entry.file}`);
    if (!response.ok) throw new Error(`Chapter request failed: ${response.status}`);
    const markdown = await response.text();
    chapterReader.append(renderChapterMarkdown(markdown));
    chapterMeta.textContent = `${entry.number} · ${entry.characters.join(' / ')} · Updated ${entry.updated}`;
    document.title = `${entry.title} - Story - Magiarchy`;
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

    const requestedSlug = new URLSearchParams(window.location.search).get('chapter');
    const selectedEntry = entries.find((entry) => entry.slug === requestedSlug);
    if (selectedEntry) await loadChapter(selectedEntry);
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

initializeTimelineDrag();
initializeStory();
