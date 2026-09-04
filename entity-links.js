/* Shared archive vocabulary links. Keep this registry limited to records that have a stable in-site destination. */
const archiveEntityLinks = [
  ['Inspector Leo', 'character.html?character=inspector-leo'],
  ['Father Mikhail', 'character.html?character=father-mikhail'],
  ['Ash the cat', 'character.html?character=ash'],
  ['Director\'s House', 'director-house.html'],
  ['Leviathan-hide coat', 'items.html?item=leviathan-hide-coat'],
  ['leviathan-hide garment', 'items.html?item=leviathan-hide-coat'],
  ['hide of leviathan', 'items.html?item=leviathan-hide-coat'],
  ['Items & Artefacts', 'items.html'],
  ['Magi Academy', 'world.html#planned-records-title'],
  ['The Magiarchy', 'magiarchy.html'],
  ['The Church', 'church.html'],
  ['Suppression doctrine', 'church.html#suppression-doctrine-title'],
  ['The Duchy', 'duchy.html'],
  ['Ren L17 "Sparrow"', 'weapons.html#ren-l17-sparrow'],
  ['Ren L17 Sparrow', 'weapons.html#ren-l17-sparrow'],
  ['Ren L19 "Magpie"', 'weapons.html#ren-l19-magpie'],
  ['Ren L19 Magpie', 'weapons.html#ren-l19-magpie'],
  ['Ren L21 "Rook"', 'weapons.html#ren-l21-rook'],
  ['Ren L21 Rook', 'weapons.html#ren-l21-rook'],
  ['Ren L24 "Crow"', 'weapons.html#ren-l24-crow'],
  ['Ren L24 Crow', 'weapons.html#ren-l24-crow'],
  ['Ren L28 "Raven"', 'weapons.html#ren-l28-raven'],
  ['Ren L28 Raven', 'weapons.html#ren-l28-raven'],
  ['Ren L31 "Swan"', 'weapons.html#ren-l31-swan'],
  ['Ren L31 Swan', 'weapons.html#ren-l31-swan'],
  ['Ren Arms', 'weapons.html'],
  ['Weapons', 'weapons.html'],
  ['Holumn Incidents and Victim Testimonies', 'docs.html?doc=holumn-incidents-and-testimonies'],
  ['The River That Is Too Deep', 'docs.html?doc=holumn-incidents-and-testimonies#the-river-that-is-too-deep'],
  ['The Drowned Choir', 'docs.html?doc=holumn-incidents-and-testimonies#the-drowned-choir'],
  ['The Voice on the Line', 'docs.html?doc=holumn-incidents-and-testimonies#the-voice-on-the-line'],
  ['The Last Piece', 'docs.html?doc=holumn-incidents-and-testimonies#the-last-piece'],
  ['Doom Has an Address', 'story.html?chapter=doom-has-an-address'],
  ['Holumns', 'holumns.html'],
  ['Holumn', 'holumns.html'],
  ['Magiarchy', 'magiarchy.html'],
  ['Magiarch', 'magiarchy.html#office-title'],
  ['MSF', 'msf.html'],
  ['Church', 'church.html'],
  ['Duke', 'duchy.html#government'],
  ['Parliament', 'duchy.html#government'],
  ['Crown', 'duchy.html#government'],
  ['Rennel', 'duchy.html#capitals'],
  ['Vilen', 'duchy.html#capitals'],
  ['Turon', 'duchy.html#capitals'],
  ['Bird\'s Nest', 'duchy.html#territory'],
  ['Port City', 'duchy.html#territory'],
  ['Narvea', 'duchy.html'],
  ['Lynleit', 'character.html?character=lynleit'],
  ['Kyrien', 'character.html?character=kyrien'],
  ['Helena', 'character.html?character=helena'],
  ['Fionn', 'character.html?character=fionn'],
  ['Felix', 'character.html?character=felix'],
  ['Reiner', 'character.html?character=reiner'],
  ['Sherie', 'character.html?character=sherie'],
  ['Drake', 'character.html?character=drake'],
  ['Heyk', 'character.html?character=heyk'],
  ['Tien', 'character.html?character=tien'],
  ['Natalia', 'character.html?character=natalia'],
  ['Lester', 'character.html?character=lester'],
  ['Myka', 'character.html?character=myka'],
  ['Yulia', 'character.html?character=yulia'],
  ['Hiyu', 'character.html?character=hiyu'],
  ['Spill', 'story.html'],
  ['Special envoys', 'church.html#church-envoys-title'],
  ['special envoy', 'church.html#church-envoys-title']
].sort((a, b) => b[0].length - a[0].length);

const archiveEntityTargets = new Map(archiveEntityLinks.map(([label, href]) => [label.toLowerCase(), href]));
const archiveEntityPattern = new RegExp(`(?<![A-Za-z0-9])(${archiveEntityLinks.map(([label]) => label.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')).join('|')})(?![A-Za-z0-9])`, 'gi');

function archiveLinkableTextNode(node) {
  if (!node.nodeValue?.trim() || node.parentElement?.closest('a, button, script, style, textarea, select, option, nav')) return;
  archiveEntityPattern.lastIndex = 0;
  if (!archiveEntityPattern.test(node.nodeValue)) return;
  archiveEntityPattern.lastIndex = 0;

  const fragment = document.createDocumentFragment();
  let cursor = 0;
  let match;
  while ((match = archiveEntityPattern.exec(node.nodeValue))) {
    const label = match[0];
    const href = archiveEntityTargets.get(label.toLowerCase());
    if (!href) continue;
    if (match.index > cursor) fragment.append(document.createTextNode(node.nodeValue.slice(cursor, match.index)));
    const link = document.createElement('a');
    link.href = href;
    link.className = 'archive-entity-link';
    link.textContent = label;
    fragment.append(link);
    cursor = match.index + label.length;
  }
  if (!cursor) return;
  if (cursor < node.nodeValue.length) fragment.append(document.createTextNode(node.nodeValue.slice(cursor)));
  node.replaceWith(fragment);
}

function scanArchiveEntityLinks(root = document.body) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);
  textNodes.forEach(archiveLinkableTextNode);
}

document.addEventListener('DOMContentLoaded', () => {
  scanArchiveEntityLinks();
  const observer = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && !node.closest('a, nav')) scanArchiveEntityLinks(node);
  })));
  observer.observe(document.body, { childList: true, subtree: true });
});
