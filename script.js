const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

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

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

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

function updateGalleryResults() {
  if (!galleryItems.length) return;

  const selectedCharacter = galleryCharacterFilter?.value ?? 'all';
  const selectedLocation = galleryLocationFilter?.value ?? 'all';
  const chibiOnly = galleryChibiFilter?.checked ?? false;
  let visibleCount = 0;

  galleryItems.forEach((item) => {
    const matchesCharacter = selectedCharacter === 'all' || item.dataset.character === selectedCharacter;
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
