const documentSelect = document.querySelector('#document-select');
const documentReader = document.querySelector('#document-reader');
const documentMeta = document.querySelector('#document-meta');
const documentSummary = document.querySelector('#document-summary');
const documentSourceLink = document.querySelector('#document-source-link');
const documentError = document.querySelector('#document-error');

function appendInlineMarkdown(text, parent) {
  const tokenPattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;

  for (const match of text.matchAll(tokenPattern)) {
    if (match.index > cursor) parent.append(document.createTextNode(text.slice(cursor, match.index)));

    const token = match[0];
    let element;

    if (token.startsWith('**')) {
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

async function loadDocument(entry, updateAddress = true) {
  if (!documentReader || !documentMeta || !documentError) return;

  documentReader.replaceChildren();
  documentError.hidden = true;
  documentMeta.textContent = 'Loading document…';

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

    if (updateAddress) {
      const url = new URL(window.location.href);
      url.searchParams.set('doc', entry.slug);
      window.history.replaceState({}, '', url);
    }
  } catch (error) {
    documentMeta.textContent = 'Document unavailable';
    documentError.hidden = false;
    console.error(error);
  }
}

async function initializeDocumentLibrary() {
  if (!documentSelect) return;

  try {
    const response = await fetch('docs/index.json');
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);

    const entries = await response.json();
    if (!Array.isArray(entries) || entries.length === 0) throw new Error('Document catalog is empty');

    documentSelect.replaceChildren();
    entries.forEach((entry) => {
      const option = document.createElement('option');
      option.value = entry.slug;
      option.textContent = entry.title;
      documentSelect.append(option);
    });

    const requestedSlug = new URLSearchParams(window.location.search).get('doc');
    const initialEntry = entries.find((entry) => entry.slug === requestedSlug) ?? entries[0];
    documentSelect.value = initialEntry.slug;
    documentSelect.disabled = false;
    await loadDocument(initialEntry, requestedSlug !== initialEntry.slug);

    documentSelect.addEventListener('change', () => {
      const selectedEntry = entries.find((entry) => entry.slug === documentSelect.value);
      if (selectedEntry) loadDocument(selectedEntry);
    });
  } catch (error) {
    if (documentMeta) documentMeta.textContent = 'Library unavailable';
    if (documentError) documentError.hidden = false;
    console.error(error);
  }
}

initializeDocumentLibrary();
