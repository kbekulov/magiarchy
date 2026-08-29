const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navDropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));

const globalSearchScript = document.createElement('script');
globalSearchScript.src = 'global-search.js';
document.head.append(globalSearchScript);

document.querySelectorAll('.nav-submenu').forEach((submenu) => {
  if (submenu.querySelector('a[href="holumns.html"]')) return;
  const holumnLink = document.createElement('a');
  holumnLink.href = 'holumns.html';
  holumnLink.innerHTML = '<span>Holumns</span><small>Manifestations and hidden threats</small>';
  const weaponsLink = submenu.querySelector('a[href="weapons.html"]');
  submenu.insertBefore(holumnLink, weaponsLink);
});

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

navDropdowns.forEach((dropdown) => {
  dropdown.addEventListener('toggle', () => {
    if (!dropdown.open) return;
    navDropdowns.forEach((candidate) => {
      if (candidate !== dropdown) candidate.removeAttribute('open');
    });
  });
});

document.addEventListener('click', (event) => {
  navDropdowns.forEach((dropdown) => {
    if (!dropdown.contains(event.target)) dropdown.removeAttribute('open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  navDropdowns.forEach((dropdown) => dropdown.removeAttribute('open'));
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const copyrightHostSelectors = [
  '.feed-scroll',
  '.weapons-scroll',
  '.duchy-scroll',
  '.world-scroll',
  '.character-profile-main-pane',
  '.character-main-pane',
  '.gallery-main-pane',
  '.docs-main-pane'
];
const copyrightHost = copyrightHostSelectors.map((selector) => document.querySelector(selector)).find(Boolean);

if (copyrightHost && !document.querySelector('.site-footer')) {
  const copyrightFooter = document.createElement('footer');
  copyrightFooter.className = 'site-footer shell project-ownership';
  copyrightFooter.setAttribute('aria-label', 'Project ownership');
  copyrightFooter.innerHTML = `<a class="brand brand-small" href="index.html" aria-label="Magiarchy home"><span class="brand-mark" aria-hidden="true"><span></span></span><span>Magiarchy</span></a><p>Project MAGIARCHY is the work of Kiril Bekulov &amp; Co. and is owned by Kiril Bekulov. Additional contributors will be credited separately when applicable.</p><span>&copy; ${new Date().getFullYear()} Kiril Bekulov &amp; Co. All rights reserved.</span>`;
  copyrightHost.append(copyrightFooter);
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const searchInput = document.querySelector('#character-search');
const filterButtons = document.querySelectorAll('[data-filter]');
const characterCards = document.querySelectorAll('.character-card');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
let activeFilter = 'all';

characterCards.forEach((card) => {
  const characterName = card.dataset.name;
  if (!characterName) return;
  const characterSlug = characterName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const profileLink = document.createElement('a');
  profileLink.className = 'character-card-link';
  profileLink.href = `character.html?character=${encodeURIComponent(characterSlug)}`;
  profileLink.setAttribute('aria-label', `Open ${characterName} character profile`);
  card.prepend(profileLink);
});

function updateCharacterResults() {
  const query = searchInput?.value.trim().toLowerCase() ?? '';
  let visibleCount = 0;

  characterCards.forEach((card) => {
    const searchText = `${card.dataset.name} ${card.dataset.tags} ${card.textContent}`.toLowerCase();
    const matchesQuery = searchText.includes(query);
    const matchesFilter = activeFilter === 'all' || card.dataset.tags.split(' ').includes(activeFilter);
    const isVisible = matchesQuery && matchesFilter;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (resultCount) resultCount.textContent = String(visibleCount);
  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

searchInput?.addEventListener('input', updateCharacterResults);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((candidate) => {
      const isActive = candidate === button;
      candidate.classList.toggle('is-active', isActive);
      candidate.setAttribute('aria-pressed', String(isActive));
    });
    updateCharacterResults();
  });
});

const galleryCharacterFilter = document.querySelector('#gallery-character-filter');
const galleryLocationFilter = document.querySelector('#gallery-location-filter');
const galleryChibiFilter = document.querySelector('#gallery-chibi-filter');
const galleryItems = document.querySelectorAll('.gallery-card');
const galleryResultCount = document.querySelector('#gallery-result-count');
const galleryEmptyState = document.querySelector('#gallery-empty-state');
const galleryHeading = document.querySelector('#gallery-heading');
const galleryToolbar = document.querySelector('#gallery-toolbar');
const galleryContent = document.querySelector('#gallery-content');
const galleryReaderView = document.querySelector('#gallery-reader-view');
const galleryDetailCrumb = document.querySelector('#gallery-detail-crumb');
const galleryDetailImage = document.querySelector('#gallery-detail-image');
const galleryDetailType = document.querySelector('#gallery-detail-type');
const galleryDetailTitle = document.querySelector('#gallery-detail-title');
const galleryDetailMeta = document.querySelector('#gallery-detail-meta');
const galleryDetailSource = document.querySelector('#gallery-detail-source');

function initializeGalleryCards() {
  if (!galleryItems.length) return;

  galleryItems.forEach((card) => {
    const image = card.querySelector('img');
    const link = card.querySelector('a');
    if (!image || !link) return;

    const source = image.getAttribute('src');
    const imageId = source.split('/').pop().replace(/\.[^.]+$/, '');
    card.dataset.image = imageId;
    link.href = `gallery.html?image=${encodeURIComponent(imageId)}`;
    link.setAttribute('aria-label', `View ${image.alt} details`);
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });

  const requestedImage = new URLSearchParams(window.location.search).get('image');
  const selectedCard = Array.from(galleryItems).find((card) => card.dataset.image === requestedImage);
  if (!selectedCard || !galleryReaderView) return;

  const image = selectedCard.querySelector('img');
  const title = selectedCard.querySelector('figcaption strong')?.textContent ?? image.alt;
  const type = selectedCard.querySelector('figcaption div span')?.textContent ?? 'Artwork';
  const code = selectedCard.querySelector('.media-code')?.textContent ?? 'Archive record';
  const location = selectedCard.dataset.location === 'unspecified' ? 'Unspecified location' : selectedCard.dataset.location;

  galleryHeading.hidden = true;
  galleryToolbar.hidden = true;
  galleryContent.hidden = true;
  galleryReaderView.hidden = false;

  galleryDetailCrumb.textContent = title;
  galleryDetailImage.src = image.getAttribute('src');
  galleryDetailImage.alt = image.alt;
  galleryDetailImage.width = Number(image.getAttribute('width'));
  galleryDetailImage.height = Number(image.getAttribute('height'));
  galleryDetailType.textContent = type;
  galleryDetailTitle.textContent = title;
  galleryDetailMeta.textContent = `${code} · ${location}`;
  galleryDetailSource.href = image.getAttribute('src');
  document.title = `${title} - Gallery - Magiarchy`;
}

initializeGalleryCards();

function updateGalleryResults() {
  if (!galleryItems.length) return;

  const selectedCharacter = galleryCharacterFilter?.value ?? 'all';
  const selectedLocation = galleryLocationFilter?.value ?? 'all';
  const chibiOnly = galleryChibiFilter?.checked ?? false;
  let visibleCount = 0;

  galleryItems.forEach((item) => {
    const itemCharacters = (item.dataset.character ?? '').split(/\s+/).filter(Boolean);
    const matchesCharacter = selectedCharacter === 'all' || itemCharacters.includes(selectedCharacter);
    const matchesLocation = selectedLocation === 'all' || item.dataset.location === selectedLocation;
    const matchesChibi = !chibiOnly || item.dataset.chibi === 'true';
    const isVisible = matchesCharacter && matchesLocation && matchesChibi;

    item.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (galleryResultCount) galleryResultCount.textContent = String(visibleCount);
  if (galleryEmptyState) galleryEmptyState.hidden = visibleCount !== 0;
}

galleryCharacterFilter?.addEventListener('change', updateGalleryResults);
galleryLocationFilter?.addEventListener('change', updateGalleryResults);
galleryChibiFilter?.addEventListener('change', updateGalleryResults);

const duchyMap = document.querySelector('.duchy-map-figure');
const duchyMapHotspots = Array.from(document.querySelectorAll('.duchy-map-hotspot'));
const duchyMapTooltip = document.querySelector('#duchy-map-tooltip');
let pinnedMapHotspot = null;

function hideMapTooltip() {
  if (!duchyMapTooltip) return;
  duchyMapTooltip.hidden = true;
  duchyMapHotspots.forEach((hotspot) => {
    hotspot.classList.remove('is-active');
    hotspot.setAttribute('aria-expanded', 'false');
  });
}

function showMapTooltip(hotspot) {
  if (!duchyMap || !duchyMapTooltip) return;

  const mapBounds = duchyMap.getBoundingClientRect();
  const hotspotBounds = hotspot.getBoundingClientRect();
  const hotspotX = hotspotBounds.left - mapBounds.left + (hotspotBounds.width / 2);
  const hotspotY = hotspotBounds.top - mapBounds.top + (hotspotBounds.height / 2);
  const tooltipHalfWidth = Math.min(130, Math.max(90, (mapBounds.width - 24) / 2));
  const tooltipX = Math.max(tooltipHalfWidth, Math.min(mapBounds.width - tooltipHalfWidth, hotspotX));

  duchyMapTooltip.querySelector('strong').textContent = hotspot.dataset.city;
  duchyMapTooltip.querySelector('p').textContent = hotspot.dataset.description;
  duchyMapTooltip.classList.remove('is-above');
  duchyMapTooltip.style.left = `${tooltipX}px`;
  duchyMapTooltip.style.top = `${hotspotY + 17}px`;
  duchyMapTooltip.hidden = false;

  if (hotspotY + 17 + duchyMapTooltip.offsetHeight > mapBounds.height - 10) {
    duchyMapTooltip.classList.add('is-above');
    duchyMapTooltip.style.top = `${hotspotY - 17}px`;
  }

  duchyMapHotspots.forEach((candidate) => {
    const isActive = candidate === hotspot;
    candidate.classList.toggle('is-active', isActive);
    candidate.setAttribute('aria-expanded', String(isActive));
  });
}

duchyMapHotspots.forEach((hotspot) => {
  hotspot.addEventListener('pointerenter', () => {
    if (!pinnedMapHotspot) showMapTooltip(hotspot);
  });
  hotspot.addEventListener('pointerleave', () => {
    if (!pinnedMapHotspot) hideMapTooltip();
  });
  hotspot.addEventListener('focus', () => {
    if (!pinnedMapHotspot) showMapTooltip(hotspot);
  });
  hotspot.addEventListener('blur', () => {
    if (!pinnedMapHotspot) hideMapTooltip();
  });
  hotspot.addEventListener('click', (event) => {
    event.stopPropagation();
    if (pinnedMapHotspot === hotspot) {
      pinnedMapHotspot = null;
      hideMapTooltip();
      return;
    }
    pinnedMapHotspot = hotspot;
    showMapTooltip(hotspot);
  });
});

document.addEventListener('click', (event) => {
  if (!pinnedMapHotspot || duchyMap?.contains(event.target)) return;
  pinnedMapHotspot = null;
  hideMapTooltip();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !pinnedMapHotspot) return;
  pinnedMapHotspot.focus();
  pinnedMapHotspot = null;
  hideMapTooltip();
});

window.addEventListener('resize', () => {
  if (pinnedMapHotspot) showMapTooltip(pinnedMapHotspot);
});
