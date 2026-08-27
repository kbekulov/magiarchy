const weaponsRecordList = document.querySelector('#weapon-record-list');
const weaponsHierarchy = document.querySelector('#weapon-hierarchy');
const weaponsManufacturerPanel = document.querySelector('#manufacturer-panel');
const weaponsFutureGrid = document.querySelector('#weapons-future-grid');
const weaponsFictionCopy = document.querySelector('#weapons-fiction-copy');
const weaponsLoadError = document.querySelector('#weapon-load-error');

function weaponElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderManufacturer(manufacturer) {
  if (!weaponsManufacturerPanel) return;
  const mark = weaponElement('div', 'manufacturer-mark');
  const logo = weaponElement('img', 'manufacturer-logo');
  logo.src = 'media/gallery/images/weapons/ren_arms_logo.png';
  logo.alt = 'Ren Arms mark';
  mark.append(logo, weaponElement('i'));

  const copy = weaponElement('div', 'manufacturer-copy');
  copy.append(
    weaponElement('span', 'manufacturer-location', manufacturer.location.toUpperCase()),
    weaponElement('h3', '', manufacturer.name),
    weaponElement('p', '', manufacturer.description),
    weaponElement('p', 'manufacturer-tradition', manufacturer.namingTradition)
  );

  const status = weaponElement('dl', 'manufacturer-status');
  [['Status', 'Established'], ['Current archive', 'Pistol family'], ['Naming system', 'Bird nicknames']].forEach(([term, value]) => {
    const row = weaponElement('div');
    row.append(weaponElement('dt', '', term), weaponElement('dd', '', value));
    status.append(row);
  });

  weaponsManufacturerPanel.replaceChildren(mark, copy, status);
}

function renderHierarchy(weapons, hierarchy) {
  if (!weaponsHierarchy) return;
  const bySlug = new Map(weapons.map((weapon) => [weapon.slug, weapon]));
  const fragment = document.createDocumentFragment();

  hierarchy.forEach((slug, index) => {
    const weapon = bySlug.get(slug);
    if (!weapon) return;
    const link = weaponElement('a', 'weapon-hierarchy-node');
    link.href = `#${weapon.slug}`;
    link.setAttribute('aria-label', `Jump to ${weapon.model} ${weapon.nickname}`);
    link.append(
      weaponElement('span', 'weapon-hierarchy-index', String(index + 1).padStart(2, '0')),
      weaponElement('strong', '', weapon.nickname),
      weaponElement('small', '', weapon.model),
      weaponElement('p', '', weapon.familyPosition)
    );
    fragment.append(link);
  });

  weaponsHierarchy.replaceChildren(fragment);
}

function makeWeaponVisual(weapon, index) {
  const figure = weaponElement('figure', 'weapon-visual-bay');
  figure.dataset.futureImage = weapon.slug;
  const placeholder = weaponElement('div', 'weapon-image-placeholder');
  placeholder.setAttribute('aria-hidden', 'true');
  placeholder.append(
    weaponElement('span', '', 'VISUAL REFERENCE'),
    weaponElement('b', '', 'Pending'),
    weaponElement('i', 'weapon-placeholder-line weapon-placeholder-line-one'),
    weaponElement('i', 'weapon-placeholder-line weapon-placeholder-line-two'),
    weaponElement('em', '', String(index + 1).padStart(2, '0'))
  );
  const caption = weaponElement('figcaption');
  caption.append(weaponElement('strong', '', weapon.nickname), weaponElement('span', '', 'Approved image to be added'));
  figure.append(placeholder, caption);
  return figure;
}

function makeFact(term, value) {
  const row = weaponElement('div');
  row.append(weaponElement('dt', '', term), weaponElement('dd', '', value));
  return row;
}

function renderWeapon(weapon, index) {
  const article = weaponElement('article', 'weapon-record');
  article.id = weapon.slug;

  const visual = makeWeaponVisual(weapon, index);
  const body = weaponElement('div', 'weapon-record-body');
  const header = weaponElement('header', 'weapon-record-header');
  const identity = weaponElement('div');
  identity.append(
    weaponElement('span', 'weapon-model', weapon.model),
    weaponElement('h3', '', weapon.nickname),
    weaponElement('p', '', weapon.familyPosition)
  );
  const caliber = weaponElement('div', 'weapon-caliber');
  caliber.append(weaponElement('span', '', 'CALIBER'), weaponElement('strong', '', weapon.caliber));
  header.append(identity, caliber);

  const facts = weaponElement('dl', 'weapon-primary-facts');
  facts.append(makeFact('Role', weapon.role));
  if (weapon.storyUse) facts.append(makeFact('Story use', weapon.storyUse));

  const design = weaponElement('section', 'weapon-design-copy');
  design.append(weaponElement('span', '', 'DESIGN LANGUAGE'), weaponElement('p', '', weapon.designSummary));

  const characteristics = weaponElement('ul', 'weapon-characteristics');
  weapon.characteristics.forEach((characteristic) => characteristics.append(weaponElement('li', '', characteristic)));

  const footer = weaponElement('div', 'weapon-record-footer');
  const notes = weaponElement('div', 'weapon-character-note');
  notes.append(
    weaponElement('span', '', 'CHARACTER AND POSITION'),
    weaponElement('p', '', weapon.finishNote),
    weaponElement('p', '', `Name logic: ${weapon.nameMeaning}`)
  );
  const references = weaponElement('div', 'weapon-reference-list');
  references.append(weaponElement('span', '', 'REAL-WORLD DESIGN REFERENCES ONLY'));
  const referenceTags = weaponElement('div');
  weapon.references.forEach((reference) => referenceTags.append(weaponElement('small', '', reference)));
  references.append(referenceTags);
  footer.append(notes, references);

  body.append(header, facts, design, characteristics, footer);
  if (weapon.characterLinks?.length) {
    const characterLinks = weaponElement('div', 'weapon-character-links');
    characterLinks.append(weaponElement('span', '', 'CHARACTER RECORDS'));
    const linkList = weaponElement('div');
    weapon.characterLinks.forEach((character) => {
      const link = weaponElement('a');
      link.href = `character.html?character=${encodeURIComponent(character.slug)}`;
      link.append(weaponElement('strong', '', character.name), weaponElement('small', '', character.note));
      linkList.append(link);
    });
    characterLinks.append(linkList);
    body.append(characterLinks);
  }
  article.append(visual, body);
  return article;
}

function renderFutureCategories(categories) {
  if (!weaponsFutureGrid) return;
  const fragment = document.createDocumentFragment();
  categories.forEach((category, index) => {
    const card = weaponElement('article', 'weapon-future-card');
    card.append(
      weaponElement('span', '', String(index + 1).padStart(2, '0')),
      weaponElement('strong', '', category),
      weaponElement('small', '', 'Reserved, no records')
    );
    fragment.append(card);
  });
  weaponsFutureGrid.replaceChildren(fragment);
}

async function initializeWeaponsArchive() {
  if (!weaponsRecordList) return;
  try {
    const response = await fetch('weapons/index.json');
    if (!response.ok) throw new Error(`Archive request failed: ${response.status}`);
    const archive = await response.json();
    weaponsFictionCopy.textContent = archive.fictionNotice;
    document.querySelector('#weapon-record-count').textContent = String(archive.weapons.length).padStart(2, '0');
    renderManufacturer(archive.manufacturer);
    renderHierarchy(archive.weapons, archive.hierarchy);
    const records = archive.hierarchy
      .map((slug) => archive.weapons.find((weapon) => weapon.slug === slug))
      .filter(Boolean)
      .map(renderWeapon);
    weaponsRecordList.replaceChildren(...records);
    renderFutureCategories(archive.futureCategories);
    if (window.location.hash) {
      const linkedRecord = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (linkedRecord) requestAnimationFrame(() => linkedRecord.scrollIntoView({ block: 'start' }));
    }
  } catch (error) {
    weaponsLoadError.hidden = false;
    weaponsRecordList.replaceChildren();
  }
}

initializeWeaponsArchive();
