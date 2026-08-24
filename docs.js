const documentLibrary = document.querySelector('#document-library');
const documentCardGrid = document.querySelector('#document-card-grid');
const documentReaderView = document.querySelector('#document-reader-view');
const docsHeading = document.querySelector('#docs-heading');
const documentReader = document.querySelector('#document-reader');
const documentMeta = document.querySelector('#document-meta');
const documentSummary = document.querySelector('#document-summary');
const documentSourceLink = document.querySelector('#document-source-link');
const documentError = document.querySelector('#document-error');
const documentCrumb = document.querySelector('#document-crumb');

function appendInlineMarkdown(text, parent) {
  const tokenPattern = /(~~[^~]+~~|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;

  for (const match of text.matchAll(tokenPattern)) {
    if (match.index > cursor) parent.append(document.createTextNode(text.slice(cursor, match.index)));

    const token = match[0];
    let element;

    if (token.startsWith('~~')) {
      element = document.createElement('del');
      element.textContent = token.slice(2, -2);
    } else if (token.startsWith('**')) {
      element = document.createElement('strong');
      element.textContent = token.slice(2, -2);
    } else if (token.startsWith('*')) {
      element = document.createElement('em');
      element.textContent = token.slice(1, -1);
    } else if (token.startsWith('`')) {
      element = document.createElement('code');
      element.textContent = token.slice(1, -1);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      element = document.createElement('a');
      element.textContent = linkMatch[1];
      element.href = linkMatch[2];
      if (/^https?:\/\//.test(linkMatch[2])) {
        element.target = '_blank';
        element.rel = 'noopener';
      }
    }

    parent.append(element);
    cursor = match.index + token.length;
  }

  if (cursor < text.length) parent.append(document.createTextNode(text.slice(cursor)));
}

function parseMarkdownTableRow(line) {
  const normalized = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return normalized.split('|').map((cell) => cell.trim());
}

function isMarkdownTableDivider(line) {
  const cells = parseMarkdownTableRow(line);
  return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function createMarkdownTable(lines, startIndex) {
  const headers = parseMarkdownTableRow(lines[startIndex]);
  const normalizedHeaders = headers.map((header) => header.toLowerCase());
  const questionIndex = normalizedHeaders.indexOf('question');
  const confidenceIndex = normalizedHeaders.indexOf('confidence');
  const isQuestionLedger = questionIndex !== -1 && confidenceIndex !== -1;
  const table = document.createElement('table');
  const head = document.createElement('thead');
  const headRow = document.createElement('tr');

  headers.forEach((header, headerIndex) => {
    const cell = document.createElement('th');
    cell.scope = 'col';
    cell.className = `table-cell-${normalizedHeaders[headerIndex].replace(/[^a-z0-9]+/g, '-')}`;
    appendInlineMarkdown(header, cell);
    headRow.append(cell);
  });
  head.append(headRow);
  table.append(head);

  const body = document.createElement('tbody');
  let index = startIndex + 2;
  while (index < lines.length && lines[index].trim().includes('|')) {
    const values = parseMarkdownTableRow(lines[index]);
    if (values.length !== headers.length) break;

    const row = document.createElement('tr');
    values.forEach((value, cellIndex) => {
      const cell = document.createElement('td');
      cell.dataset.label = headers[cellIndex];
      cell.className = `table-cell-${normalizedHeaders[cellIndex].replace(/[^a-z0-9]+/g, '-')}`;
      appendInlineMarkdown(value, cell);
      row.append(cell);
    });

    const confidence = confidenceIndex === -1 ? null : Number.parseInt(values[confidenceIndex], 10);
    if (Number.isFinite(confidence) && questionIndex !== -1) {
      const normalizedConfidence = Math.max(0, Math.min(100, confidence));
      const questionCell = row.children[questionIndex];
      const progress = document.createElement('span');
      progress.className = 'question-confidence';
      progress.setAttribute('role', 'progressbar');
      progress.setAttribute('aria-label', `${normalizedConfidence}% answered`);
      progress.setAttribute('aria-valuemin', '0');
      progress.setAttribute('aria-valuemax', '100');
      progress.setAttribute('aria-valuenow', String(normalizedConfidence));

      const progressLabel = document.createElement('span');
      progressLabel.className = 'question-confidence-label';
      progressLabel.textContent = `${normalizedConfidence}% answered`;
      const track = document.createElement('span');
      track.className = 'question-confidence-track';
      const fill = document.createElement('i');
      fill.style.width = `${normalizedConfidence}%`;
      track.append(fill);
      progress.append(progressLabel, track);
      questionCell.append(progress);
      row.dataset.confidence = String(normalizedConfidence);
    }
    if (Number.isFinite(confidence) && confidence < 100) row.classList.add('question-row-open');
    if (confidence === 100) row.classList.add('question-row-answered');
    body.append(row);
    index += 1;
  }
  table.append(body);

  const wrapper = document.createElement('div');
  wrapper.className = 'markdown-table-wrap';
  if (isQuestionLedger) {
    wrapper.classList.add('question-ledger-table');
    wrapper.setAttribute('aria-label', 'Open question table');
  } else {
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', 'Scrollable document table');
  }
  wrapper.append(table);
  return { element: wrapper, nextIndex: index };
}

function renderMarkdown(markdown) {
  const fragment = document.createDocumentFragment();
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (index + 1 < lines.length && line.includes('|') && isMarkdownTableDivider(lines[index + 1])) {
      const renderedTable = createMarkdownTable(lines, index);
      fragment.append(renderedTable.element);
      index = renderedTable.nextIndex;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const heading = document.createElement(`h${headingMatch[1].length}`);
      appendInlineMarkdown(headingMatch[2], heading);
      fragment.append(heading);
      index += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line)) {
      fragment.append(document.createElement('hr'));
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      const quote = document.createElement('blockquote');
      appendInlineMarkdown(line.slice(2), quote);
      fragment.append(quote);
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const list = document.createElement('ul');
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        const item = document.createElement('li');
        appendInlineMarkdown(lines[index].trim().replace(/^[-*]\s+/, ''), item);
        list.append(item);
        index += 1;
      }
      fragment.append(list);
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{1,3})\s+|^[-*]\s+|^>\s+|^(-{3,}|\*{3,})$/.test(lines[index].trim())) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    const paragraphText = paragraphLines.join(' ');
    const paragraph = document.createElement('p');
    appendInlineMarkdown(paragraphText, paragraph);

    const speakerMatch = paragraphText.match(/^\*\*(Journalist|Fionn):\*\*/);
    if (speakerMatch) {
      paragraph.classList.add('dialogue-line', `speaker-${speakerMatch[1].toLowerCase()}`);
    }

    fragment.append(paragraph);
  }

  return fragment;
}

function createDocumentCard(entry, index) {
  const card = document.createElement('article');
  card.className = 'document-card reveal is-visible';

  const link = document.createElement('a');
  link.className = 'document-card-link';
  link.href = entry.href || `docs.html?doc=${encodeURIComponent(entry.slug)}`;
  link.setAttribute('aria-label', `Read ${entry.title}`);

  const top = document.createElement('div');
  top.className = 'document-card-top';

  const topic = document.createElement('span');
  topic.className = 'doc-topic';
  topic.textContent = entry.topic;

  const code = document.createElement('span');
  code.className = 'document-card-code';
  code.textContent = `DOC · ${String(index + 1).padStart(3, '0')}`;
  top.append(topic, code);

  const title = document.createElement('h2');
  title.textContent = entry.title;

  const description = document.createElement('p');
  description.textContent = entry.description;

  const footer = document.createElement('div');
  footer.className = 'document-card-footer';

  const meta = document.createElement('span');
  meta.textContent = `${entry.speakers.join(' / ')} · ${entry.updated}`;

  const arrow = document.createElement('span');
  arrow.className = 'document-card-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '→';
  footer.append(meta, arrow);

  link.append(top, title, description, footer);
  card.append(link);
  return card;
}

function showDocumentLibrary(entries) {
  documentReaderView.hidden = true;
  documentLibrary.hidden = false;
  docsHeading.hidden = false;
  documentCardGrid.replaceChildren(...entries.map(createDocumentCard));
}

async function loadDocument(entry) {
  if (!documentReader || !documentMeta || !documentError) return;

  documentLibrary.hidden = true;
  docsHeading.hidden = true;
  documentReaderView.hidden = false;
  documentReader.replaceChildren();
  documentError.hidden = true;
  documentMeta.textContent = 'Loading document…';

  if (documentCrumb) documentCrumb.textContent = entry.title;

  try {
    const response = await fetch(`docs/${entry.file}`);
    if (!response.ok) throw new Error(`Document request failed: ${response.status}`);

    const markdown = await response.text();
    documentReader.append(renderMarkdown(markdown));
    documentMeta.textContent = `${entry.topic} · ${entry.speakers.join(' / ')} · Updated ${entry.updated}`;

    if (documentSummary) {
      documentSummary.replaceChildren();
      const topic = document.createElement('span');
      topic.className = 'doc-topic';
      topic.textContent = entry.topic;
      const description = document.createElement('p');
      description.textContent = entry.description;
      documentSummary.append(topic, description);
    }

    if (documentSourceLink) documentSourceLink.href = `docs/${entry.file}`;
  } catch (error) {
    documentMeta.textContent = 'Document unavailable';
    documentError.hidden = false;
    console.error(error);
  }
}

async function initializeDocumentLibrary() {
  if (!documentCardGrid || !documentLibrary || !documentReaderView) return;

  try {
    const response = await fetch('docs/index.json');
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);

    const entries = await response.json();
    if (!Array.isArray(entries) || entries.length === 0) throw new Error('Document catalog is empty');

    const requestedSlug = new URLSearchParams(window.location.search).get('doc');
    const selectedEntry = entries.find((entry) => entry.slug === requestedSlug);

    if (selectedEntry) {
      await loadDocument(selectedEntry);
    } else {
      showDocumentLibrary(entries);
    }
  } catch (error) {
    documentCardGrid.replaceChildren();
    const message = document.createElement('div');
    message.className = 'document-error';
    message.innerHTML = '<div class="empty-pixel" aria-hidden="true">!</div><h2>Library unavailable</h2><p>The document catalog could not be loaded.</p>';
    documentCardGrid.append(message);
    console.error(error);
  }
}

initializeDocumentLibrary();
