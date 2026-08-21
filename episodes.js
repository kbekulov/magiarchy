const episodeLibrary = document.querySelector('#episode-library');
const episodeCardGrid = document.querySelector('#episode-card-grid');
const episodeReaderView = document.querySelector('#episode-reader-view');
const episodesHeading = document.querySelector('#episodes-heading');
const episodeReader = document.querySelector('#episode-reader');
const episodeMeta = document.querySelector('#episode-meta');
const episodeSummary = document.querySelector('#episode-summary');
const episodeStatus = document.querySelector('#episode-status');
const episodeSourceLink = document.querySelector('#episode-source-link');
const episodeError = document.querySelector('#episode-error');
const episodeCrumb = document.querySelector('#episode-crumb');
const episodeReaderCharacters = document.querySelector('#episode-reader-characters');
const episodeEventList = document.querySelector('#episode-event-list');

function appendEpisodeInline(text, parent) {
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

function renderEpisodeMarkdown(markdown) {
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
      appendEpisodeInline(headingMatch[2], heading);
      fragment.append(heading);
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      const quote = document.createElement('blockquote');
      appendEpisodeInline(line.slice(2), quote);
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
    appendEpisodeInline(paragraphLines.join(' '), paragraph);
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

function createEpisodeCard(entry) {
  const card = document.createElement('article');
  card.className = 'document-card episode-card reveal is-visible';

  const link = document.createElement('a');
  link.className = 'document-card-link';
  link.href = `episodes.html?episode=${encodeURIComponent(entry.slug)}`;
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

  const characters = document.createElement('div');
  characters.className = 'episode-character-list';
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

  link.append(top, title, description, characters, footer);
  card.append(link);
  return card;
}

function showEpisodeLibrary(entries) {
  episodeReaderView.hidden = true;
  episodeLibrary.hidden = false;
  episodesHeading.hidden = false;
  episodeCardGrid.replaceChildren(...entries.map(createEpisodeCard));
}

async function loadEpisode(entry) {
  episodeLibrary.hidden = true;
  episodesHeading.hidden = true;
  episodeReaderView.hidden = false;
  episodeReader.replaceChildren();
  episodeError.hidden = true;
  episodeMeta.textContent = 'Loading episode…';
  episodeCrumb.textContent = `${entry.number}: ${entry.title}`;
  episodeStatus.textContent = entry.status;
  episodeSummary.textContent = entry.description;
  episodeReaderCharacters.replaceChildren(...createCharacterLabels(entry.characters));
  episodeEventList.replaceChildren(...(entry.events ?? []).map((event, index) => {
    const row = document.createElement('tr');
    const number = document.createElement('th');
    number.scope = 'row';
    number.textContent = String(index + 1).padStart(2, '0');
    const description = document.createElement('td');
    description.textContent = event;
    row.append(number, description);
    return row;
  }));
  episodeSourceLink.href = `episodes/${entry.file}`;

  try {
    const response = await fetch(`episodes/${entry.file}`);
    if (!response.ok) throw new Error(`Episode request failed: ${response.status}`);
    const markdown = await response.text();
    episodeReader.append(renderEpisodeMarkdown(markdown));
    episodeMeta.textContent = `${entry.number} · ${entry.characters.join(' / ')} · Updated ${entry.updated}`;
    document.title = `${entry.title} - Episodes - Magiarchy`;
  } catch (error) {
    episodeMeta.textContent = 'Episode unavailable';
    episodeError.hidden = false;
    console.error(error);
  }
}

async function initializeEpisodes() {
  if (!episodeCardGrid || !episodeLibrary || !episodeReaderView) return;

  try {
    const response = await fetch('episodes/index.json');
    if (!response.ok) throw new Error(`Episode catalog request failed: ${response.status}`);
    const entries = await response.json();
    if (!Array.isArray(entries) || entries.length === 0) throw new Error('Episode catalog is empty');

    const requestedSlug = new URLSearchParams(window.location.search).get('episode');
    const selectedEntry = entries.find((entry) => entry.slug === requestedSlug);
    if (selectedEntry) await loadEpisode(selectedEntry);
    else showEpisodeLibrary(entries);
  } catch (error) {
    episodeCardGrid.replaceChildren();
    const message = document.createElement('div');
    message.className = 'document-error';
    const title = document.createElement('h2');
    title.textContent = 'Episode library unavailable';
    const description = document.createElement('p');
    description.textContent = 'The episode catalog could not be loaded.';
    message.append(title, description);
    episodeCardGrid.append(message);
    console.error(error);
  }
}

initializeEpisodes();
