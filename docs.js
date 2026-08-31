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
      } else {
        element.className = 'archive-entity-link';
      }
    }

    parent.append(element);
    cursor = match.index + token.length;
  }

  if (cursor < text.length) parent.append(document.createTextNode(text.slice(cursor)));
}

function markdownHeadingId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
  const contradictionIndex = normalizedHeaders.indexOf('contradiction');
  const confidenceIndex = normalizedHeaders.indexOf('confidence');
  const resolutionIndex = normalizedHeaders.indexOf('resolution');
  const isQuestionLedger = questionIndex !== -1 && confidenceIndex !== -1;
  const isContradictionLedger = contradictionIndex !== -1 && resolutionIndex !== -1;
  const isEditorialLedger = isQuestionLedger || isContradictionLedger;
  const contentIndex = isQuestionLedger ? questionIndex : contradictionIndex;
  const progressIndex = isQuestionLedger ? confidenceIndex : resolutionIndex;
  const progressWord = isQuestionLedger ? 'answered' : 'resolved';
  const table = document.createElement('table');
  const head = document.createElement('thead');
  const headRow = document.createElement('tr');

  headers.forEach((header, headerIndex) => {
    const cell = document.createElement('th');
    cell.scope = 'col';
    cell.className = `table-cell-${normalizedHeaders[headerIndex].replace(/[^a-z0-9]+/g, '-')}`;
    if (isEditorialLedger && headerIndex === contentIndex) cell.classList.add('table-cell-question');
    if (isEditorialLedger && headerIndex === progressIndex) cell.classList.add('table-cell-confidence');
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
      if (isEditorialLedger && cellIndex === contentIndex) cell.classList.add('table-cell-question');
      if (isEditorialLedger && cellIndex === progressIndex) cell.classList.add('table-cell-confidence');
      appendInlineMarkdown(value, cell);
      row.append(cell);
    });

    const confidence = progressIndex === -1 ? null : Number.parseInt(values[progressIndex], 10);
    if (Number.isFinite(confidence) && contentIndex !== -1) {
      const normalizedConfidence = Math.max(0, Math.min(100, confidence));
      const questionCell = row.children[contentIndex];
      const progress = document.createElement('span');
      progress.className = 'question-confidence';
      progress.setAttribute('role', 'progressbar');
      progress.setAttribute('aria-label', `${normalizedConfidence}% ${progressWord}`);
      progress.setAttribute('aria-valuemin', '0');
      progress.setAttribute('aria-valuemax', '100');
      progress.setAttribute('aria-valuenow', String(normalizedConfidence));

      const progressLabel = document.createElement('span');
      progressLabel.className = 'question-confidence-label';
      progressLabel.textContent = `${normalizedConfidence}% ${progressWord}`;
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

  if (isEditorialLedger) {
    Array.from(body.rows)
      .sort((first, second) => Number(first.dataset.confidence) - Number(second.dataset.confidence))
      .forEach((row) => body.append(row));
  }

  table.append(body);

  const wrapper = document.createElement('div');
  wrapper.className = 'markdown-table-wrap';
  if (isEditorialLedger) {
    wrapper.classList.add('question-ledger-table');
    if (isContradictionLedger) wrapper.classList.add('contradiction-ledger-table');
    wrapper.setAttribute('aria-label', isQuestionLedger ? 'Open question table' : 'Contradictions to resolve');
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
      heading.id = markdownHeadingId(headingMatch[2]);
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

const intimacyCharacterAccents = {
  Lynleit: '#8790ff',
  Kyrien: '#d4a56c',
  Helena: '#c97786',
  Fionn: '#aeb4c8',
  Yulia: '#c98b9d',
  Hiyu: '#70b7d6',
  Felix: '#df9564',
  Reiner: '#72a79f',
  Sherie: '#8ca6ff',
  Drake: '#c5a169',
  Heyk: '#76a982',
  Natalia: '#b394d5',
  Tien: '#9c7bd1',
  Lester: '#a5aa75',
  'Inspector Leo': '#759bc8',
  'Father Mikhail': '#baa16e',
  Myka: '#8b8ee5'
};

function collectDocumentNodes(startNode, endNode) {
  const nodes = [];
  let current = startNode;
  while (current && current !== endNode) {
    const next = current.nextSibling;
    nodes.push(current);
    current = next;
  }
  return nodes;
}

function intimacyLensClass(heading) {
  const label = heading.textContent.trim().toLowerCase();
  if (label.startsWith('natural approach')) return 'is-natural';
  if (label === 'sexual expression') return 'is-sexual';
  if (label.startsWith('with ')) return 'is-partner';
  if (label === 'writing guardrail') return 'is-guardrail';
  return '';
}

function enhanceCharacterIntimacyDocument(container) {
  const sectionHeadings = Array.from(container.querySelectorAll(':scope > h2'));
  const guideHeading = sectionHeadings.find((heading) => heading.id === 'how-to-read-the-profiles');
  const principlesHeading = sectionHeadings.find((heading) => heading.id === 'archive-wide-writing-principles');
  const characterHeadings = sectionHeadings.filter((heading) => (
    heading !== guideHeading && heading !== principlesHeading
  ));

  const title = container.querySelector(':scope > h1');
  const lede = title?.nextElementSibling;
  if (lede?.tagName === 'P') lede.classList.add('intimacy-lede');

  if (guideHeading && characterHeadings[0]) {
    const guide = document.createElement('section');
    guide.className = 'intimacy-guide';
    guide.setAttribute('aria-labelledby', guideHeading.id);
    container.insertBefore(guide, guideHeading);
    collectDocumentNodes(guideHeading, characterHeadings[0]).forEach((node) => guide.append(node));

    const navigator = document.createElement('nav');
    navigator.className = 'intimacy-character-index';
    navigator.setAttribute('aria-label', 'Character intimacy profiles');

    const navigatorLabel = document.createElement('span');
    navigatorLabel.textContent = 'Character index';

    const navigatorLinks = document.createElement('div');
    characterHeadings.forEach((heading, index) => {
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      const indexLabel = document.createElement('small');
      indexLabel.textContent = String(index + 1).padStart(2, '0');
      const characterLabel = document.createElement('span');
      characterLabel.textContent = heading.textContent.trim();
      link.append(indexLabel, characterLabel);
      navigatorLinks.append(link);
    });

    navigator.append(navigatorLabel, navigatorLinks);
    container.insertBefore(navigator, characterHeadings[0]);
  }

  characterHeadings.forEach((heading, index) => {
    const boundary = characterHeadings[index + 1] || principlesHeading;
    const contentNodes = collectDocumentNodes(heading.nextSibling, boundary);
    const characterName = heading.textContent.trim();
    const card = document.createElement('section');
    card.className = 'intimacy-character';
    card.style.setProperty('--intimacy-accent', intimacyCharacterAccents[characterName] || '#8790ff');
    card.setAttribute('aria-labelledby', heading.id);
    container.insertBefore(card, heading);

    const cardHeader = document.createElement('header');
    cardHeader.className = 'intimacy-character-header';

    const code = document.createElement('span');
    code.className = 'intimacy-character-code';
    code.textContent = String(index + 1).padStart(2, '0');

    const headingGroup = document.createElement('div');
    headingGroup.append(heading);

    const basis = contentNodes[0];
    if (basis?.tagName === 'P') {
      basis.classList.add('intimacy-character-basis');
      headingGroup.append(basis);
      contentNodes.shift();
    }

    cardHeader.append(code, headingGroup);

    const lensGrid = document.createElement('div');
    lensGrid.className = 'intimacy-lens-grid';
    let currentLens = null;
    let lensIndex = 0;

    contentNodes.forEach((node) => {
      if (node.tagName === 'H3') {
        lensIndex += 1;
        currentLens = document.createElement('article');
        currentLens.className = `intimacy-lens ${intimacyLensClass(node)}`.trim();
        currentLens.dataset.lens = String(lensIndex).padStart(2, '0');
        currentLens.append(node);
        lensGrid.append(currentLens);
      } else if (currentLens) {
        currentLens.append(node);
      }
    });

    card.append(cardHeader, lensGrid);
  });

  if (principlesHeading) {
    const principles = document.createElement('section');
    principles.className = 'intimacy-principles';
    principles.setAttribute('aria-labelledby', principlesHeading.id);
    container.insertBefore(principles, principlesHeading);
    collectDocumentNodes(principlesHeading, null).forEach((node) => principles.append(node));
  }
}

function enhanceCharacterBehaviorDocument(container) {
  const title = container.querySelector(':scope > h1');
  const lede = title?.nextElementSibling;
  if (lede?.tagName === 'P') lede.classList.add('behavior-lede');

  const legend = document.createElement('div');
  legend.className = 'behavior-legend';
  legend.setAttribute('aria-label', 'Advisory note key');
  [
    ['♀', 'Female character lens', 'is-female'],
    ['♂', 'Male character lens', 'is-male'],
    ['✦', 'Story-pressure suggestion', 'is-story']
  ].forEach(([iconText, labelText, className]) => {
    const item = document.createElement('span');
    item.className = className;
    const icon = document.createElement('i');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = iconText;
    item.append(icon, document.createTextNode(labelText));
    legend.append(item);
  });
  if (lede) lede.after(legend);
  else if (title) title.after(legend);

  const sectionHeadings = Array.from(container.querySelectorAll(':scope > h2'));
  const methodHeading = sectionHeadings.find((heading) => heading.id === 'how-the-audit-works');
  const followingHeading = methodHeading ? sectionHeadings[sectionHeadings.indexOf(methodHeading) + 1] : null;
  if (methodHeading && followingHeading) {
    const method = document.createElement('section');
    method.className = 'behavior-method';
    method.setAttribute('aria-labelledby', methodHeading.id);
    container.insertBefore(method, methodHeading);
    collectDocumentNodes(methodHeading, followingHeading).forEach((node) => method.append(node));
  }

  Array.from(container.querySelectorAll(':scope > h2')).forEach((heading, index) => {
    heading.classList.add('behavior-section-heading');
    heading.dataset.section = String(index + 1).padStart(2, '0');
  });

  Array.from(container.querySelectorAll(':scope > blockquote')).forEach((note) => {
    const marker = note.textContent.trim().match(/^([♀♂✦])/u)?.[1] || '✦';
    const className = marker === '♀' ? 'is-female' : marker === '♂' ? 'is-male' : 'is-story';
    note.classList.add('behavior-note', className);

    const walker = document.createTreeWalker(note, NodeFilter.SHOW_TEXT);
    const firstText = walker.nextNode();
    if (firstText) firstText.nodeValue = firstText.nodeValue.replace(/^\s*[♀♂✦]\s*/u, '');

    const body = document.createElement('div');
    while (note.firstChild) body.append(note.firstChild);
    const icon = document.createElement('span');
    icon.className = 'behavior-note-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = marker;
    note.append(icon, body);
  });
}

async function loadDocument(entry) {
  if (!documentReader || !documentMeta || !documentError) return;

  documentLibrary.hidden = true;
  docsHeading.hidden = true;
  documentReaderView.hidden = false;
  documentReader.replaceChildren();
  documentReader.classList.toggle('holumn-testimony-document', entry.slug === 'holumn-incidents-and-testimonies');
  documentReader.classList.toggle('character-intimacy-document', entry.slug === 'character-intimacy-and-sexuality');
  documentReader.classList.toggle('character-behavior-document', entry.slug === 'character-behavior-audit');
  documentError.hidden = true;
  documentMeta.textContent = 'Loading document…';

  if (documentCrumb) documentCrumb.textContent = entry.title;

  try {
    const response = await fetch(`docs/${entry.file}`);
    if (!response.ok) throw new Error(`Document request failed: ${response.status}`);

    const markdown = await response.text();
    documentReader.append(renderMarkdown(markdown));
    if (entry.slug === 'character-intimacy-and-sexuality') enhanceCharacterIntimacyDocument(documentReader);
    if (entry.slug === 'character-behavior-audit') enhanceCharacterBehaviorDocument(documentReader);
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

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) window.setTimeout(() => target.scrollIntoView({ block: 'start' }), 250);
    }
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
