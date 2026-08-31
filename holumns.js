const holumnTypeGrid = document.querySelector('#holumn-type-grid');
const holumnPrinciples = document.querySelector('#holumn-principles');
const holumnEvidenceGrid = document.querySelector('#holumn-evidence-grid');
const holumnIncidentCount = document.querySelector('#holumn-incident-count');
const holumnTypeCount = document.querySelector('#holumn-type-count');

function holumnElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function incidentLink(incident, label) {
  const link = holumnElement('a', '', label || incident.id);
  link.href = `docs.html?doc=holumn-incidents-and-testimonies#${incident.slug}`;
  link.setAttribute('aria-label', `Open ${incident.title} in the testimony archive`);
  return link;
}

function renderPrinciples(principles) {
  holumnPrinciples.replaceChildren(...principles.map((principle, index) => {
    const article = holumnElement('article');
    const copy = holumnElement('div');
    copy.append(holumnElement('strong', '', principle));
    article.append(holumnElement('span', '', String(index + 1).padStart(2, '0')), copy);
    return article;
  }));
}

function renderTypes(types, incidentMap) {
  holumnTypeGrid.replaceChildren(...types.map((type, index) => {
    const card = holumnElement('article');
    const evidence = holumnElement('div', 'holumn-type-evidence');
    evidence.append(holumnElement('small', '', 'Supporting incidents'));
    type.evidence.map((id) => incidentMap.get(id)).filter(Boolean).forEach((incident) => evidence.append(incidentLink(incident)));
    card.append(
      holumnElement('span', '', String(index + 1).padStart(2, '0')),
      holumnElement('h3', '', type.name),
      holumnElement('p', '', type.summary),
      evidence
    );
    return card;
  }));
}

function renderEvidence(incidents) {
  holumnEvidenceGrid.replaceChildren(...incidents.map((incident) => {
    const card = holumnElement('article', 'holumn-evidence-card');
    const header = holumnElement('header');
    header.append(holumnElement('span', '', incident.id), holumnElement('small', '', incident.recordType));
    const types = holumnElement('div', 'holumn-evidence-types');
    incident.types.forEach((type) => types.append(holumnElement('span', '', type)));
    card.append(
      header,
      holumnElement('h3', '', incident.title),
      types,
      holumnElement('p', 'holumn-evidence-contribution', incident.spillContribution),
      incidentLink(incident, 'Read the incident record')
    );
    return card;
  }));
}

async function initializeHolumnArchive() {
  try {
    const response = await fetch('holumns/index.json');
    if (!response.ok) throw new Error(`Holumn archive request failed: ${response.status}`);
    const archive = await response.json();
    const incidentMap = new Map(archive.incidents.map((incident) => [incident.id, incident]));
    holumnIncidentCount.textContent = String(archive.incidents.length).padStart(2, '0');
    holumnTypeCount.textContent = String(archive.types.length).padStart(2, '0');
    renderPrinciples(archive.principles);
    renderTypes(archive.types, incidentMap);
    renderEvidence(archive.incidents);
  } catch (error) {
    holumnEvidenceGrid.replaceChildren(holumnElement('p', 'document-error', 'The Holumn archive could not be loaded.'));
    console.error(error);
  }
}

initializeHolumnArchive();
