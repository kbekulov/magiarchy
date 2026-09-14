(() => {
  const params = new URLSearchParams(location.search);
  const collections = document.querySelector('#gallery-collections');
  if (params.has('image')) { collections.hidden = true; return; }
  if (params.get('collection') !== 'production' && !params.has('resource')) return;

  const $ = selector => document.querySelector(selector);
  const kinds = { 'reference-sheet': 'Reference sheet', 't-pose': 'T-pose / turnaround', sketch: 'Development sketch', '3d-model': '3D model' };
  const characterNames = new Map([...$('#gallery-character-filter').options].map(option => [option.value, option.textContent]));
  const nameFor = slug => characterNames.get(slug) || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const node = (tag, text, className) => {
    const element = document.createElement(tag);
    if (text != null) element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const link = (text, href, className) => {
    const element = node('a', text, className); element.href = href; return element;
  };
  const bytes = value => value < 1024 ? `${value} B` : value < 1048576 ? `${(value / 1024).toFixed(1)} KB` : `${(value / 1048576).toFixed(1)} MB`;
  const collection = $('#production-collection');
  const reader = $('#resource-reader');
  const empty = $('#resource-empty');
  const results = $('#resource-results');
  const search = $('#resource-search');
  const kind = $('#resource-kind');
  const character = $('#resource-character');
  $('#gallery-toolbar').hidden = true;
  $('#gallery-content').hidden = true;
  $('#gallery-intro').textContent = 'Reference sheets, poses, sketches, and downloadable files for animation and 3D work.';
  collections.querySelector('[aria-current]').removeAttribute('aria-current');
  collections.querySelector('a:last-child').setAttribute('aria-current', 'page');
  collection.hidden = false;
  document.title = 'Production resources - Gallery - Magiarchy';
  $('.production-filters').addEventListener('submit', event => event.preventDefault());

  function showResource(record) {
    reader.toggleAttribute('data-no-entity-links', record.nonCanon === true);
    collection.hidden = true;
    collections.hidden = true;
    $('#gallery-heading').hidden = true;
    reader.hidden = false;
    $('#resource-crumb').textContent = record.title;
    $('#resource-title').textContent = record.title;
    $('#resource-type').textContent = [record.template ? 'Template' : null, kinds[record.kind], record.modelVersion, record.era].filter(Boolean).join(' · ');
    $('#resource-summary').textContent = record.summary;
    $('#resource-characters').replaceChildren(...record.characters.map(slug => link(nameFor(slug), `character.html?character=${encodeURIComponent(slug)}`, 'tag')));
    const back = new URLSearchParams(params);
    back.delete('resource'); back.delete('view'); back.set('collection', 'production');
    $('#resource-back').href = `gallery.html?${back}`;
    document.title = `${record.title} - Production resources - Magiarchy`;

    const previewImage = $('#resource-image');
    const thumbnails = $('#resource-thumbnails');
    function selectPreview(index) {
      const preview = record.previews[index];
      previewImage.src = preview.src; previewImage.alt = preview.alt;
      previewImage.width = preview.width; previewImage.height = preview.height;
      previewImage.hidden = false; $('#resource-no-preview').hidden = true;
      $('#resource-caption').textContent = preview.caption || '';
      $('#resource-original').href = preview.src; $('#resource-original').hidden = false;
      $('#resource-image-download').href = preview.src;
      $('#resource-image-download').download = preview.src.split('/').pop();
      $('#resource-image-download').hidden = false;
      $('#resource-view-status').textContent = preview.caption || preview.alt;
      [...thumbnails.children].forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      const url = new URL(location.href); url.searchParams.set('view', preview.id);
      history.replaceState(null, '', url);
    }
    record.previews.forEach((preview, index) => {
      const button = node('button'); button.type = 'button';
      button.setAttribute('aria-label', preview.caption || preview.alt);
      button.setAttribute('aria-controls', 'resource-image');
      const image = node('img'); image.src = preview.thumbnail; image.alt = ''; image.loading = 'lazy';
      button.append(image); button.addEventListener('click', () => selectPreview(index));
      thumbnails.append(button);
    });
    thumbnails.hidden = record.previews.length < 2;
    if (record.previews.length) selectPreview(Math.max(0, record.previews.findIndex(preview => preview.id === params.get('view'))));

    $('#resource-file-count').textContent = `${record.files.length} ${record.files.length === 1 ? 'file' : 'files'}`;
    $('#resource-no-files').hidden = record.files.length > 0;
    record.files.forEach(file => {
      const item = node('li');
      const download = link(null, file.path);
      download.download = file.path.split('/').pop();
      download.setAttribute('aria-label', `Download ${file.label}, ${file.format}, ${bytes(file.bytes)}`);
      download.append(node('strong', file.label), node('span', `${file.format} · ${bytes(file.bytes)} ↓`));
      item.append(download, node('small', download.download));
      if (file.notes) item.append(node('p', file.notes));
      $('#resource-downloads').append(item);
    });
    if (record.technical?.length) {
      $('#resource-specs').hidden = false;
      record.technical.forEach(fact => $('#resource-details').append(node('dt', fact.label), node('dd', fact.value)));
    }
    if (record.usage) { $('#resource-usage').hidden = false; $('#resource-usage p').textContent = record.usage; }
    for (const id of record.artwork || []) {
      const art = [...document.querySelectorAll('.gallery-card')].find(card => card.dataset.image === id);
      if (!art) continue;
      $('#resource-related').hidden = false;
      $('#resource-related').append(link(art.querySelector('strong').textContent, `gallery.html?image=${encodeURIComponent(id)}`, 'source-link'));
    }
  }

  fetch('gallery/resources.json').then(response => {
    if (!response.ok) throw new Error('Resource catalog unavailable');
    return response.json();
  }).then(records => {
    const requested = params.get('resource');
    if (requested) {
      const record = records.find(record => record.id === requested);
      if (record) { showResource(record); return; }
      results.textContent = 'This production resource could not be found.';
      empty.hidden = false; empty.querySelector('h2').textContent = 'Resource not found';
      empty.querySelector('p').textContent = 'Return to the collection to browse available resources.';
      empty.querySelector('a').href = 'gallery.html?collection=production';
      empty.querySelector('a').textContent = 'Browse production resources →';
      $('.production-filters').hidden = true;
      return;
    }
    for (const slug of [...new Set(records.flatMap(record => record.characters))].sort()) {
      const option = node('option', nameFor(slug)); option.value = slug; character.append(option);
    }
    search.value = params.get('q') || '';
    kind.value = kinds[params.get('kind')] ? params.get('kind') : 'all';
    character.value = [...character.options].some(option => option.value === params.get('character')) ? params.get('character') : 'all';
    const cards = records.map(record => {
      const card = node('article', null, 'production-card');
      card.dataset.resource = record.id;
      const open = link(null, `gallery.html?resource=${encodeURIComponent(record.id)}`);
      open.setAttribute('aria-label', `View ${record.title}${record.modelVersion ? `, ${record.modelVersion}` : ''}`);
      if (record.previews.length) {
        const image = node('img'); image.src = record.previews[0].thumbnail;
        image.alt = record.previews[0].alt; image.loading = 'lazy';
        image.width = record.previews[0].width; image.height = record.previews[0].height;
        open.append(image);
      } else open.append(node('div', 'No preview image', 'resource-no-preview'));
      const copy = node('div', null, 'production-card-copy');
      const badges = node('div', null, 'resource-badges');
      if (record.template) badges.append(node('span', 'Template', 'resource-template-badge'));
      badges.append(node('span', kinds[record.kind], 'doc-topic'));
      copy.append(badges, node('h2', record.title), node('p', record.summary));
      const metadata = [record.modelVersion, record.era, ...record.characters.map(nameFor), ...new Set(record.files.map(file => file.format))].filter(Boolean);
      copy.append(node('small', metadata.join(' · ')), node('span', record.files.length ? `${record.files.length} downloadable ${record.files.length === 1 ? 'file' : 'files'}` : 'Preview only', 'resource-file-label'));
      open.append(copy); card.append(open); $('#resource-grid').append(card);
      return { record, card, open, text: [record.title, record.summary, ...metadata, ...record.files.map(file => file.label)].join(' ').toLowerCase() };
    });
    function filter() {
      const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      const query = new URLSearchParams({ collection: 'production' });
      for (const [key, value] of [['q', search.value.trim()], ['kind', kind.value], ['character', character.value]]) {
        if (value && value !== 'all') query.set(key, value);
      }
      history.replaceState(null, '', `gallery.html?${query}`);
      let count = 0;
      cards.forEach(item => {
        item.card.hidden = !((kind.value === 'all' || item.record.kind === kind.value) && (character.value === 'all' || item.record.characters.includes(character.value)) && terms.every(term => item.text.includes(term)));
        if (!item.card.hidden) count++;
        const detail = new URLSearchParams(query); detail.set('resource', item.record.id);
        item.open.href = `gallery.html?${detail}`;
      });
      results.textContent = `${count} of ${records.length} resources`;
      empty.hidden = count !== 0;
      empty.querySelector('h2').textContent = records.length ? 'No matching resources' : 'No production resources yet';
      empty.querySelector('p').textContent = records.length ? 'Try another name, resource type, or character.' : 'Reference sheets, T-poses, development sketches, and 3D models will appear here with their related downloads.';
      $('#resource-reset').hidden = !records.length;
    }
    $('#resource-reset').addEventListener('click', () => { search.value = ''; kind.value = character.value = 'all'; filter(); search.focus(); });
    search.addEventListener('input', filter); kind.addEventListener('change', filter); character.addEventListener('change', filter);
    filter();
  }).catch(error => {
    console.warn(error);
    results.textContent = 'Production resources could not be loaded. Please reload to try again.';
    $('.production-filters').hidden = true;
  });
})();
