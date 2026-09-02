const itemCatalogView = document.querySelector('#items-catalog-view');
const itemDetailView = document.querySelector('#item-detail-view');
const itemRecordGrid = document.querySelector('#item-record-grid');
const itemLoadError = document.querySelector('#item-load-error');

function itemElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function itemLink(href, className, text) {
  const link = itemElement('a', className, text);
  link.href = href;
  return link;
}

function makeItemMark(size = 'catalog') {
  const mark = itemElement('div', `item-object-mark item-object-mark-${size}`);
  mark.setAttribute('aria-hidden', 'true');
  mark.append(itemElement('span'), itemElement('i'), itemElement('b'));
  return mark;
}

function renderItemCard(item) {
  const link = itemLink(`items.html?item=${encodeURIComponent(item.slug)}`, 'item-record-card');
  link.setAttribute('aria-label', `Open ${item.name}`);

  const visual = itemElement('div', 'item-record-visual');
  visual.append(makeItemMark(), itemElement('small', '', item.image ? 'Recorded image' : 'Image unavailable'));

  const body = itemElement('div', 'item-record-copy');
  const top = itemElement('div', 'item-record-top');
  top.append(itemElement('span', '', item.id), itemElement('b', '', item.recordType));
  body.append(top, itemElement('h3', '', item.name), itemElement('p', '', item.summary));

  const meta = itemElement('dl', 'item-card-meta');
  [['Holder', item.holder.name], ['Material', item.material], ['Status', item.status]].forEach(([term, value]) => {
    const row = itemElement('div');
    row.append(itemElement('dt', '', term), itemElement('dd', '', value));
    meta.append(row);
  });
  body.append(meta, itemElement('span', 'item-open-label', 'Open item record →'));
  link.append(visual, body);
  return link;
}

function renderCards(archive) {
  const holders = new Set(archive.items.map((item) => item.holder?.slug).filter(Boolean));
  document.querySelector('#item-record-count').textContent = String(archive.items.length).padStart(2, '0');
  document.querySelector('#items-total-count').textContent = String(archive.items.length).padStart(2, '0');
  document.querySelector('#items-holder-count').textContent = String(holders.size).padStart(2, '0');
  document.querySelector('#items-image-count').textContent = String(archive.items.filter((item) => item.image).length).padStart(2, '0');
  itemRecordGrid.replaceChildren(...archive.items.map(renderItemCard));
}

function makeRecordSection(number, eyebrow, title) {
  const section = itemElement('section', 'item-detail-section');
  const header = itemElement('header', 'items-section-heading');
  const index = itemElement('div');
  index.append(itemElement('span', '', number), itemElement('p', 'eyebrow', eyebrow));
  header.append(index, itemElement('h2', '', title));
  section.append(header);
  return section;
}

function renderItemDetail(item) {
  itemCatalogView.hidden = true;
  itemDetailView.hidden = false;
  document.title = `${item.name} - Items & Artefacts - Magiarchy`;

  const breadcrumbs = itemElement('nav', 'document-breadcrumbs items-breadcrumbs');
  breadcrumbs.setAttribute('aria-label', 'Breadcrumb');
  breadcrumbs.append(
    itemLink('world.html', '', 'World'),
    itemElement('span', '', '/'),
    itemLink('items.html', '', 'Items & Artefacts'),
    itemElement('span', '', '/'),
    itemElement('span', '', item.name)
  );

  const hero = itemElement('header', 'item-detail-hero');
  const visual = itemElement('div', 'item-detail-visual');
  visual.append(makeItemMark('detail'), itemElement('small', '', item.image ? 'Recorded image' : 'Image unavailable'));
  const copy = itemElement('div', 'item-detail-copy');
  copy.append(itemElement('p', 'eyebrow', `${item.id} · ${item.recordType}`), itemElement('h1', '', item.name), itemElement('p', '', item.summary));
  const facts = itemElement('dl', 'item-detail-facts');
  [['Current holder', item.holder.name], ['Recorded status', item.status], ['Material', item.material], ['Archive update', item.updated]].forEach(([term, value]) => {
    const row = itemElement('div');
    row.append(itemElement('dt', '', term), itemElement('dd', '', value));
    facts.append(row);
  });
  hero.append(visual, copy, facts);

  const identity = makeRecordSection('01', 'Recorded identity', 'Material and custody');
  const identityPanel = itemElement('div', 'item-identity-panel');
  const identityCopy = itemElement('div');
  identityCopy.append(itemElement('span', '', 'MATERIAL RECORD'), itemElement('strong', '', item.material), itemElement('p', '', item.materialNote));
  const identityLinks = itemElement('div', 'item-identity-links');
  identityLinks.append(
    itemLink(`character.html?character=${encodeURIComponent(item.holder.slug)}#equipment-title`, '', item.holder.name),
    itemElement('p', '', 'Current holder and equipment record'),
    itemLink(`character.html?character=${encodeURIComponent(item.associatedCharacter.slug)}`, '', item.associatedCharacter.name),
    itemElement('p', '', item.associatedCharacter.relation)
  );
  identityPanel.append(identityCopy, identityLinks);
  identity.append(identityPanel);

  const forms = makeRecordSection('02', 'Recorded forms', 'The garment chooses its appearance');
  const formGrid = itemElement('div', 'item-form-grid');
  item.forms.forEach((form, index) => {
    const article = itemElement('article');
    article.append(itemElement('span', '', String(index + 1).padStart(2, '0')), itemElement('h3', '', form.name), itemElement('p', '', form.detail));
    formGrid.append(article);
  });
  forms.append(formGrid);

  const operation = makeRecordSection('03', 'Known operation', 'Protection requires action');
  const propertyGrid = itemElement('div', 'item-property-grid');
  item.properties.forEach((property, index) => {
    const article = itemElement('article');
    article.append(itemElement('span', '', String(index + 1).padStart(2, '0')), itemElement('strong', '', property.name), itemElement('p', '', property.detail));
    propertyGrid.append(article);
  });
  operation.append(propertyGrid);

  const limits = makeRecordSection('04', 'Operating limits', 'What the coat does not solve');
  const limitPanel = itemElement('ol', 'item-limit-list');
  item.limits.forEach((limit, index) => {
    const row = itemElement('li');
    row.append(itemElement('span', '', String(index + 1).padStart(2, '0')), itemElement('p', '', limit));
    limitPanel.append(row);
  });
  limits.append(limitPanel);

  const chronology = makeRecordSection('05', 'Arc 1 chronology', 'How the object enters Lynleit’s life');
  const chronologyTrack = itemElement('ol', 'item-chronology');
  item.chronology.forEach((entry) => {
    const row = itemElement('li');
    const marker = itemElement('span', '', entry.arc);
    const body = itemElement('div');
    body.append(itemElement('small', '', entry.phase), itemElement('h3', '', entry.title), itemElement('p', '', entry.detail));
    row.append(marker, body);
    chronologyTrack.append(row);
  });
  chronology.append(chronologyTrack);

  const connections = makeRecordSection('06', 'Archive connections', 'People and scenes');
  const connectionGrid = itemElement('div', 'item-story-links');
  item.storyLinks.forEach((entry) => {
    const link = itemLink(entry.href, 'item-story-link');
    link.append(itemElement('span', '', entry.label), itemElement('strong', '', entry.title), itemElement('p', '', entry.detail), itemElement('small', '', 'Open record →'));
    connectionGrid.append(link);
  });
  connections.append(connectionGrid);

  itemDetailView.replaceChildren(breadcrumbs, hero, identity, forms, operation, limits, chronology, connections);
}

async function initializeItemsArchive() {
  try {
    const response = await fetch('items/index.json');
    if (!response.ok) throw new Error(`Archive request failed: ${response.status}`);
    const archive = await response.json();
    renderCards(archive);

    const requestedSlug = new URLSearchParams(window.location.search).get('item');
    if (!requestedSlug) return;
    const item = archive.items.find((entry) => entry.slug === requestedSlug);
    if (!item) throw new Error(`Unknown item record: ${requestedSlug}`);
    renderItemDetail(item);
  } catch (error) {
    itemLoadError.hidden = false;
    itemRecordGrid?.replaceChildren();
  }
}

initializeItemsArchive();
