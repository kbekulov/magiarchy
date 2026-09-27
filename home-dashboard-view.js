// Shared static and interactive rendering. All content is escaped before insertion.
export const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const link = (href, label, cls = '') => `<a class="${cls}" href="${escape(href)}">${escape(label)}</a>`;
export function snapshot(record, kind) {
  if (kind === 'panels') return record ? `<a class="desk-panel-image" href="${escape(record.href)}"><img src="${escape(record.src)}" width="${record.width}" height="${record.height}" alt="${escape(record.alt)}" decoding="async"></a><div class="desk-panel-caption"><div><p class="desk-kicker">${escape(record.label)}</p><h3>${link(record.href, record.title)}</h3><p>${escape(record.caption)}</p></div>${link(record.href, 'Read sequence →', 'desk-link')}</div>` : '<p>No panel images available.</p>';
  if (!record) return `<p class="desk-kicker">${kind === 'contradictions' ? 'Contradiction ledger' : 'Ledger'}</p><h3>None recorded</h3><p>No unresolved ${kind === 'contradictions' ? 'contradictions' : 'questions'} are currently listed.</p>${link(`docs.html?doc=${kind === 'contradictions' ? 'contradictions-to-resolve' : 'questions-to-be-answered'}`, 'Review the ledger →', 'desk-link')}`;
  return `<p class="desk-kicker">${escape(record.meta)}</p><h3>${escape(record.title)}</h3>
    <${record.quote ? 'blockquote' : 'p'} class="desk-excerpt">${escape(record.text)}</${record.quote ? 'blockquote' : 'p'}>
    ${record.detail ? `<p class="desk-detail"><strong>${escape(record.detailLabel)}</strong> ${escape(record.detail)}</p>` : ''}
    ${link(record.href, { facts: 'Go to source →', questions: 'Work on this question →', contradictions: 'Review this contradiction →', holumns: 'Read the incident →', moments: 'Open the Moment →' }[kind], 'desk-link')}`;
}
export function castRows(cast, mode = 'presence', selected = cast[0]?.slug) {
  const maximum = Math.max(1, ...cast.map(c => c.total));
  return (mode === 'presence' ? `<div class="desk-axis" aria-hidden="true"><span>0</span><span>${maximum / 2}</span><span>${maximum}</span></div>` : '') + cast.map(c => `<button type="button" class="desk-cast-row" data-character-choice="${escape(c.slug)}" aria-pressed="${c.slug === selected}">
    <span>${escape(c.name)}</span>${mode === 'presence' ? `<span class="desk-bars" aria-hidden="true"><i style="width:${c.prose / maximum * 100}%"></i><b style="width:${c.outline / maximum * 100}%"></b></span><span class="desk-tally">${c.total}<span class="sr-only"> Moments, ${c.prose} with scene prose, ${c.outline} outlines or seeds</span></span>` : `<span class="desk-coverage"><span>${c.goal ? '●' : '○'} <small>Goal</small></span><span>${c.conflicts.length} <small>conflicts</small></span><span>${c.links.length} <small>cast links</small></span></span>`}</button>`).join('');
}
export function castDetail(c) {
  return `<p class="desk-kicker">Character in focus</p><h3>${link(c.href, c.name)}</h3><p class="desk-role">${escape(c.role)}</p><p class="desk-muted">${c.prose} with scene prose · ${c.outline} outlines / seeds</p>
    <p><strong>Wants</strong> ${escape(c.goal || 'No goal recorded.')}</p>
    <details><summary>Conflicts &amp; connections</summary><ul>${c.conflicts.map(([title, text]) => `<li><strong>${escape(title)}</strong> ${escape(text)}</li>`).join('')}</ul><p>${c.links.length ? c.links.map(l => link(l.href, l.name)).join(' · ') : 'No named cast links in the profile fields.'}</p></details>
    <details><summary>${c.total} recorded Moments</summary>${c.scenes.length ? `<ul>${c.scenes.map(s => `<li>${link(s.href, s.title)}<small>${escape(s.kind)}</small></li>`).join('')}</ul>` : '<p>No Moment currently lists this character. Check whether that matches their intended role.</p>'}</details>
    ${link(c.href, 'Review profile →', 'desk-link')}`;
}
const shuffle = (kind, label) => `<button type="button" class="desk-shuffle" data-shuffle="${kind}" aria-label="Another ${label}" hidden><span aria-hidden="true">↻</span></button>`;
const card = (data, kind, title) => `<section class="desk-card" aria-labelledby="desk-${kind}-title"><header class="desk-section-head"><h2 id="desk-${kind}-title">${title}</h2>${shuffle(kind, { facts: 'world snapshot', questions: 'open question', contradictions: 'contradiction', holumns: 'Holumn', moments: 'Moment' }[kind])}</header><div data-snapshot="${kind}" data-selected="${escape(data[kind][0]?.id || '')}">${snapshot(data[kind][0], kind)}</div></section>`;
export function genreChart(groups) {
  const total = groups.reduce((sum, group) => sum + group.weight, 0);
  let offset = 0;
  const rings = groups.map(group => {
    const share = group.weight / total * 100;
    const ring = `<circle cx="100" cy="100" r="76" pathLength="100" fill="none" stroke="${group.color}" stroke-width="26" stroke-dasharray="${share - .8} ${100 - share + .8}" stroke-dashoffset="${-offset}" transform="rotate(-90 100 100)"/>`;
    offset += share;
    return ring;
  }).join('');
  return `<div class="desk-genre-layout"><svg class="desk-donut" viewBox="0 0 200 200" role="img" aria-labelledby="desk-donut-title"><title id="desk-donut-title">Editorial emphasis across six theme groups. Values appear in the adjacent legend, not measured shares of the written story.</title>${rings}<text x="100" y="97" text-anchor="middle" class="desk-donut-number">${groups.length}</text><text x="100" y="119" text-anchor="middle" class="desk-donut-label">theme groups</text></svg><ul class="desk-genre-legend">${groups.map(group => `<li><a href="${escape(group.href)}"><i style="background:${group.color}" aria-hidden="true"></i><span>${escape(group.name)}</span><b>${Math.round(group.weight / total * 100)}%</b></a></li>`).join('')}</ul></div><details class="desk-method"><summary>What these proportions mean</summary><p>This is a working editorial balance, not measured screen time or a prescribed story ratio. It groups the existing theme cloud's emphasis weights: primary 3, supporting 2, quieter 1.</p><ul>${groups.map(group => `<li><strong>${escape(group.name)}:</strong> ${escape(group.members.join(', '))} (${group.weight} points).</li>`).join('')}</ul></details>`;
}
export function dashboardHTML(data) {
  return `<section id="writer-dashboard" class="writer-dashboard" aria-label="Writer's dashboard">
    <div class="desk-overview"><p>${data.counts.chapters} Chapters <span>·</span> ${data.counts.moments} Moments <span>·</span> ${data.counts.characters} characters</p><span>Writer view · includes spoilers</span></div>
    <div class="desk-visuals"><section class="desk-card desk-panel" aria-labelledby="desk-panel-title"><header class="desk-section-head"><h2 id="desk-panel-title">A window into the story</h2>${shuffle('panels', 'panel image')}</header><div data-snapshot="panels" data-selected="${escape(data.panels[0]?.id || '')}">${snapshot(data.panels[0], 'panels')}</div></section><section class="desk-card desk-genres" aria-labelledby="desk-genres-title"><header class="desk-section-head"><div><h2 id="desk-genres-title">Genre &amp; theme balance</h2><p class="desk-muted">Editorial emphasis</p></div></header>${genreChart(data.genreGroups)}</section></div>
    <div class="desk-lead">
      ${card(data, 'facts', 'Back into the world')}
      <section class="desk-card desk-work" aria-labelledby="desk-work-title"><header class="desk-section-head"><h2 id="desk-work-title">Pick up a thread</h2></header><p class="desk-muted">Open work in the current records.</p>
      <div class="desk-draft-bar" aria-hidden="true">${data.draftStatus.map(s => `<span style="flex:${s.count};background:${s.color}"></span>`).join('')}</div><p class="desk-draft-key">${data.draftStatus.map(s => `<span><i style="background:${s.color}" aria-hidden="true"></i><strong>${s.count}</strong> ${s.label}</span>`).join('')}</p>
      ${data.tasks.map(t => `<details class="desk-task"><summary><span><strong>${escape(t.title)}</strong><small>${escape(t.hint)}</small></span><b>${t.rows.length}</b></summary>${t.rows.length ? `<ul>${t.rows.map(r => `<li>${link(r.href, r.title)}</li>`).join('')}</ul>` : '<p>None recorded.</p>'}</details>`).join('')}</section>
    </div>
    <div class="desk-pair desk-decisions">${card(data, 'questions', `Open questions <span class="desk-count">${data.questions.length}</span>`)}${card(data, 'contradictions', `Contradictions <span class="desk-count">${data.contradictions.length}</span>`)}</div>
    <section class="desk-card desk-cast" aria-labelledby="desk-cast-title"><header class="desk-section-head"><div><h2 id="desk-cast-title">Where the cast stands</h2><p class="desk-muted">Who has scenes, and what is driving them?</p></div></header>
      <div class="desk-cast-tools"><div class="desk-segments" role="group" aria-label="Character chart" hidden><button type="button" data-cast-mode="presence" aria-pressed="true">Scene presence</button><button type="button" data-cast-mode="development" aria-pressed="false">Development</button></div><label class="desk-sort" hidden>Order <select id="desk-cast-order"><option value="most">Most scene presence</option><option value="least">Least scene presence</option><option value="name">Name</option></select></label></div>
      <div class="desk-cast-layout"><div><p id="desk-chart-key" class="desk-chart-key"><span><i></i>Scene prose</span><span><b></b>Outline / seed</span><span>Distinct Moments</span></p><div class="desk-cast-list" id="desk-cast-list">${castRows(data.cast)}</div><p class="desk-muted">${data.cast.length} characters · scroll for the full cast</p></div><aside id="desk-character-detail" class="desk-character-detail" aria-label="Selected character">${castDetail(data.cast[0])}</aside></div>
      <details class="desk-method"><summary>How to read this</summary><p>Each current Moment counts once for each listed character. Blue marks a Moment with its own prose or a linked scene Chapter, including incomplete drafts. Grey marks outlines and scene seeds. Linked Chapters are not counted again; standalone Chapters are outside this chart. These are scene-presence counts, not minutes, dialogue shares, or completed-story percentages.</p><p>Development shows a recorded goal, profile conflicts, and named links to other cast members. It helps locate thin coverage; it does not score literary complexity, importance, or character quality. Click a character to inspect the evidence. All Arcs are included. Unplaced scenes stay unplaced.</p></details>
      <noscript><p>Character controls require JavaScript. ${link('characters.html', 'Browse all profiles')} to inspect individual characters.</p></noscript>
    </section>
    <div class="desk-pair">${card(data, 'holumns', 'A Holumn to consider')}${card(data, 'moments', 'A scene to return to')}</div>
    <section class="desk-card desk-themes" aria-labelledby="desk-themes-title"><header class="desk-section-head"><h2 id="desk-themes-title">The story's compass</h2>${link('docs.html?doc=thematic-direction', 'Direction notes →', 'desk-link')}</header><div class="desk-cloud" aria-label="Genres and themes">${data.themes.map(t => link(t.href, t.name, `desk-theme weight-${t.weight}`)).join('')}</div><p class="desk-muted">Size reflects the established creative emphasis, not a word count or a quota. Open a theme to revisit its guidance.</p></section>
    <p id="desk-feedback" class="sr-only" role="status"></p>
  </section>`;
}
