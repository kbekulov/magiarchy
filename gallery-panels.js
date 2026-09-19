(() => {
  const params = new URLSearchParams(location.search);
  if (params.has('image') || params.has('resource') || (params.get('collection') !== 'panels' && !params.has('panels'))) return;
  const $ = selector => document.querySelector(selector);
  const node = (tag, text, className) => {
    const element = document.createElement(tag);
    if (text != null) element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const link = (text, href, className) => {
    const element = node('a', text, className); element.href = href; return element;
  };
  const names = new Map([...$('#gallery-character-filter').options].map(option => [option.value, option.textContent]));
  const collection = $('#panel-collection'), reader = $('#panel-reader'), grid = $('#panel-grid');
  const search = $('#panel-search'), character = $('#panel-character'), empty = $('#panel-empty');
  const collections = $('#gallery-collections');
  $('#gallery-toolbar').hidden = true;
  $('#gallery-content').hidden = true;
  $('#gallery-intro').textContent = 'Read illustrated scenes, explore their sketches, and return to the story behind them.';
  collections.querySelector('[aria-current]')?.removeAttribute('aria-current');
  collections.querySelector('a[href="gallery.html?collection=panels"]').setAttribute('aria-current', 'page');
  collection.hidden = false;
  document.title = 'Panels - Gallery - Magiarchy';
  $('.panel-filters').addEventListener('submit', event => event.preventDefault());

  function image(panel, thumbnail = false) {
    const img = node('img');
    img.src = thumbnail ? panel.thumbnail : panel.display;
    img.alt = thumbnail ? '' : panel.alt;
    img.width = panel.width; img.height = panel.height;
    img.loading = 'lazy'; img.decoding = 'async';
    return img;
  }
  function showRecord(record) {
    collection.hidden = true;
    collections.hidden = true;
    $('#gallery-heading').hidden = true;
    reader.hidden = false;
    document.title = `${record.title} - Panels - Magiarchy`;
    $('#panel-title').textContent = $('#panel-crumb').textContent = record.title;
    $('#panel-summary').textContent = record.summary;
    $('#panel-medium').textContent = `${record.medium} · ${record.beats.length} beats · ${record.panels.length} images`;
    const back = new URLSearchParams(params);
    back.delete('panels'); back.set('collection', 'panels');
    $('#panel-back').href = `gallery.html?${back}`;
    const context = $('#panel-context');
    if (record.moment) context.append(link('Read the Moment', `moments.html?moment=${encodeURIComponent(record.moment.slug)}&version=${record.moment.version}`, 'button button-secondary'));
    if (record.chapter) context.append(link('Read the Chapter', `story.html?chapter=${encodeURIComponent(record.chapter.slug)}&version=${record.chapter.version}`, 'button button-secondary'));
    record.characters.forEach(slug => context.append(link(names.get(slug) || slug, `character.html?character=${encodeURIComponent(slug)}`, 'tag')));
    let imageIndex = 0;
    for (const [beatIndex, beat] of record.beats.entries()) {
      const beatPanels = record.panels.filter(panel => panel.beat === beat.id);
      const jumpGroup = node('div', null, 'panel-jump-group');
      const jumpHeading = node('div', null, 'panel-jump-heading');
      jumpHeading.append(node('span', String(beatIndex + 1).padStart(2, '0')), node('strong', beat.title));
      const jumpViews = node('div', null, 'panel-jump-views');
      jumpGroup.append(jumpHeading, jumpViews);
      $('#panel-jump-links').append(jumpGroup);
      const section = node('section', null, 'panel-beat');
      const heading = node('header', null, 'panel-beat-heading');
      const title = node('h2', beat.title); title.id = `beat-${beat.id}`;
      section.setAttribute('aria-labelledby', title.id);
      heading.append(node('span', String(beatIndex + 1).padStart(2, '0'), 'panel-beat-number'), title);
      if (beatPanels.length > 1) heading.append(node('p', 'Alternative compositions of this beat'));
      section.append(heading);
      $('#panel-sequence').append(section);
      for (const panel of beatPanels) {
        const jump = link(null, `#${panel.id}`);
        jump.setAttribute('aria-label', `${panel.label}: ${panel.title}`);
        const preview = node('span', null, 'panel-jump-preview');
        preview.append(image(panel, true));
        jump.append(preview, node('span', panel.composition ? `Composition ${panel.composition}` : panel.label));
        jumpViews.append(jump);
        const figure = node('figure', null, 'scene-panel');
        figure.id = panel.id;
        figure.tabIndex = -1;
        const original = link(null, panel.src, 'scene-panel-art');
        original.target = '_blank'; original.rel = 'noopener';
        original.setAttribute('aria-label', `Open original ${panel.label.toLowerCase()} in a new tab`);
        const img = image(panel);
        if (imageIndex++ === 0) img.loading = 'eager';
        original.append(img);
        const caption = node('figcaption');
        const heading = node('div');
        heading.append(node('span', panel.composition ? `${panel.label} · Composition ${panel.composition}` : panel.label, 'eyebrow'), node('h3', panel.title));
        const format = panel.src.split('.').pop().toUpperCase();
        const download = link(`${format} ↓ · ${(panel.bytes / 1048576).toFixed(1)} MB`, panel.src, 'source-link');
        download.download = panel.src.split('/').pop();
        download.setAttribute('aria-label', `Download original ${panel.label.toLowerCase()}, ${format}`);
        caption.append(heading, download);
        figure.append(original, caption);
        section.append(figure);
        jump.addEventListener('click', () => { img.loading = 'eager'; figure.focus({ preventScroll: true }); });
      }
    }
    function markSelected() {
      const selectedHash = record.panels.some(panel => `#${panel.id}` === location.hash) ? location.hash : `#${record.panels[0].id}`;
      $('#panel-jump-links').querySelectorAll('a').forEach(anchor => {
        if (anchor.getAttribute('href') === selectedHash) anchor.setAttribute('aria-current', 'location');
        else anchor.removeAttribute('aria-current');
      });
    }
    markSelected();
    window.addEventListener('hashchange', markSelected);
    const selected = record.panels.find(panel => `#${panel.id}` === location.hash);
    if (selected) {
      const figure = document.getElementById(selected.id);
      figure.querySelector('img').loading = 'eager';
      requestAnimationFrame(() => figure.scrollIntoView());
    }
  }

  window.MAGIARCHY_PANELS.load().then(records => {
    if (params.has('panels')) {
      const record = records.find(item => item.id === params.get('panels'));
      if (record) { showRecord(record); return; }
      $('#panel-results').textContent = 'That scene could not be found.';
      $('.panel-filters').hidden = true;
      empty.hidden = false;
      empty.querySelector('h2').textContent = 'Scene unavailable';
      empty.querySelector('p').textContent = 'Return to Panels to choose another scene.';
      $('#panel-reset').hidden = true;
      empty.append(link('Back to Panels', 'gallery.html?collection=panels', 'source-link'));
      return;
    }
    for (const slug of [...new Set(records.flatMap(record => record.characters))].sort()) {
      const option = node('option', names.get(slug) || slug); option.value = slug; character.append(option);
    }
    search.value = params.get('q') || '';
    if ([...character.options].some(option => option.value === params.get('character'))) character.value = params.get('character');
    function filter(updateURL = true) {
      const query = search.value.trim().toLowerCase();
      const shown = records.filter(record => (character.value === 'all' || record.characters.includes(character.value)) && [record.title, record.summary, record.medium, ...record.characters.map(slug => names.get(slug) || slug), ...record.panels.map(panel => panel.title)].join(' ').toLowerCase().includes(query));
      grid.replaceChildren(...shown.map(record => {
        const card = node('article', null, 'panel-card');
        const anchor = link(null, window.MAGIARCHY_PANELS.url(record));
        const cover = record.panels.find(panel => panel.id === record.cover);
        const img = image(cover); img.alt = cover.alt;
        const copy = node('div', null, 'panel-card-copy');
        copy.append(node('span', record.medium, 'doc-topic'), node('h2', record.title), node('p', record.summary), node('span', `${record.beats.length} beats · ${record.panels.length} images · Open scene →`, 'panel-card-count'));
        anchor.append(img, copy); card.append(anchor); return card;
      }));
      $('#panel-results').textContent = `${shown.length} of ${records.length} scenes`;
      empty.hidden = shown.length > 0;
      if (!records.length) {
        empty.querySelector('h2').textContent = 'No scene panels yet';
        empty.querySelector('p').textContent = 'No panel images are available.';
        $('#panel-reset').hidden = true;
      }
      if (updateURL) {
        const url = new URL(location.href);
        url.searchParams.set('collection', 'panels');
        query ? url.searchParams.set('q', search.value.trim()) : url.searchParams.delete('q');
        character.value === 'all' ? url.searchParams.delete('character') : url.searchParams.set('character', character.value);
        history.replaceState(null, '', url);
      }
    }
    search.addEventListener('input', () => filter());
    character.addEventListener('change', () => filter());
    $('#panel-reset').addEventListener('click', () => { search.value = ''; character.value = 'all'; filter(); search.focus(); });
    filter(false);
  }).catch(() => {
    collection.hidden = false;
    $('#panel-results').textContent = 'Panels could not be loaded. Please reload the page to try again.';
    $('.panel-filters').hidden = true;
  });
})();
