// One registry and copy control for all published image surfaces, including dynamic readers.
const registryUrl = new URL('gallery/image-identities.json', import.meta.url);
const base = new URL('.', import.meta.url);
const byPath = new Map();
const records = new WeakMap();
const overlays = new Set();
const resizeObserver = new ResizeObserver(() => placeOverlays());
let toast, toastTimer;

function placeOverlays() {
  for (const state of overlays) {
    const { image, host, row } = state;
    if (!image.isConnected || !row.isConnected) { row.remove(); resizeObserver.unobserve(image); overlays.delete(state); continue; }
    const art = image.getBoundingClientRect(), frame = host.getBoundingClientRect();
    row.hidden = !art.width || !art.height || image.hidden;
    row.style.left = `${art.right - frame.left - host.clientLeft + host.scrollLeft - 8}px`;
    row.style.top = `${art.top - frame.top - host.clientTop + host.scrollTop + 8}px`;
  }
}
window.addEventListener('resize', placeOverlays);

function lookup(value) {
  if (!value) return null;
  const url = new URL(value, document.baseURI);
  if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return null;
  return byPath.get(decodeURIComponent(url.pathname.slice(base.pathname.length))) || null;
}
function notify(message) {
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'image-id-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('aria-atomic', 'true');
    document.body.append(toast);
  }
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; toast.textContent = ''; }, 3000);
}
async function copyId(id) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
    await navigator.clipboard.writeText(id);
  } catch {
    const focus = document.activeElement;
    const selection = getSelection();
    const ranges = selection ? [...Array(selection.rangeCount)].map((_, i) => selection.getRangeAt(i).cloneRange()) : [];
    const field = document.createElement('textarea');
    field.value = id; field.readOnly = true; field.className = 'image-id-copy-buffer';
    document.body.append(field);
    field.select(); field.setSelectionRange(0, id.length);
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { /* Report failure, never a false success. */ }
    field.remove(); focus?.focus({ preventScroll: true });
    if (selection) { selection.removeAllRanges(); ranges.forEach(range => selection.addRange(range)); }
    if (!copied) { notify(`Could not copy ID: ${id}`); return; }
  }
  notify(`Copied ID: ${id}`);
}
function metadata(record) {
  const row = document.createElement('div'); row.className = 'published-image-meta';
  row.setAttribute('data-no-entity-links', '');
  const filename = document.createElement('span'); filename.className = 'published-image-filename';
  const button = document.createElement('button'); button.type = 'button'; button.className = 'image-id-copy';
  button.addEventListener('click', event => {
    event.preventDefault(); event.stopPropagation();
    copyId(button.dataset.imageId);
  });
  row.append(filename, button);
  update(row, record);
  return row;
}
function update(row, record) {
  const filename = record.source.split('/').pop();
  const label = row.querySelector('.published-image-filename');
  const button = row.querySelector('button');
  if (button.dataset.imageId === record.id && label.textContent === filename) return;
  label.textContent = filename; label.title = filename;
  button.textContent = record.id; button.dataset.imageId = record.id;
  button.title = `${filename}\nCopy image ID: ${record.id}`;
  button.setAttribute('aria-label', `Copy image ID ${record.id}, ${filename}`);
}
function decorate(image) {
  const record = lookup(image.getAttribute('src')) || lookup(image.currentSrc);
  if (!record) return;
  image.dataset.publicImageId = record.id;
  // Thumbnail links select the same image in an identified main reader. Do not put buttons inside links/buttons.
  if (image.matches('[aria-hidden="true"]')) return;
  if (image.closest('.profile-art-thumbnails, .gallery-image-versions, .gallery-siblings, #resource-thumbnails, #panel-jump-links, .relationship-node-avatar, .relationship-map-detail-avatar, .music-dock-track')) {
    const target = image.closest('a, button') || image;
    target.title = `${record.source.split('/').pop()} · ${record.id}`;
    return;
  }
  let state = records.get(image);
  if (state && state.row.isConnected) { update(state.row, record); return; }
  const host = image.closest('.gallery-card, .scene-panel, .gallery-detail-image-wrap, .character-card, .character-profile-portrait, .panel-card, .production-card, .music-card, .weapon-figure, .duchy-map-figure') || (image.closest('a, button') || image).parentElement;
  if (getComputedStyle(host).position === 'static') host.classList.add('image-id-host');
  const row = metadata(record);
  host.append(row);
  state = { row, host, image };
  records.set(image, state);
  overlays.add(state);
  resizeObserver.observe(image);
  image.addEventListener('load', placeOverlays);
}
let scheduled = false;
function scan() {
  scheduled = false;
  document.querySelectorAll('img').forEach(decorate);
  // Resource downloads include image files which may not have a dedicated preview.
  document.querySelectorAll('#resource-downloads a[download]').forEach(anchor => {
    const record = lookup(anchor.href);
    if (!record || anchor.parentElement.querySelector('.published-image-meta')) return;
    const row = metadata(record);
    row.classList.add('image-id-download');
    const existingFilename = anchor.parentElement.querySelector('small');
    if (existingFilename) existingFilename.replaceWith(row);
    else anchor.parentElement.append(row);
  });
  placeOverlays();
}
function schedule() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(scan); }
}
fetch(registryUrl).then(response => {
  if (!response.ok) throw new Error('Image identifiers unavailable');
  return response.json();
}).then(registry => {
  for (const record of registry.images.filter(record => record.active)) {
    for (const file of [record.source, ...record.derivatives]) byPath.set(file, record);
  }
  scan();
  const observer = new MutationObserver(changes => {
    if (changes.some(change => change.type === 'attributes' || [...change.addedNodes].some(node => node.nodeType === 1 && !node.matches('.published-image-meta, .image-id-toast') && (node.matches('img') || node.querySelector('img'))))) schedule();
  });
  observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'srcset'] });
}).catch(error => console.warn(error.message));
