const lanes = [
  { id: 'ch1', label: 'Chapter 1', title: 'Pressure Builds', type: 'chapter' },
  { id: 'ch2', label: 'Chapter 2', title: 'Accusation Vector', type: 'chapter' },
  { id: 'ev1', label: 'Event', title: "Fionn's Assassination", type: 'event' },
  { id: 'ch3', label: 'Chapter 3', title: 'Exile Opens', type: 'chapter' },
  { id: 'ch4', label: 'Chapter 4', title: 'Hunt Architecture', type: 'chapter' },
  { id: 'ch5', label: 'Chapter 5', title: 'Extraction Lines', type: 'chapter' },
  { id: 'ev2', label: 'Event', title: 'MSF Compression', type: 'event' },
  { id: 'ch6', label: 'Chapter 6', title: 'Countermove', type: 'chapter' },
  { id: 'ch7', label: 'Chapter 7', title: 'Institutional Pressure', type: 'chapter' },
  { id: 'ev3', label: 'Event', title: 'Kyrien - Tien Clash', type: 'event' },
  { id: 'ch8', label: 'Chapter 8', title: 'Visibility Debt', type: 'chapter' },
  { id: 'ch9', label: 'Chapter 9', title: 'Return Window', type: 'chapter' }
];

const rows = [
  {
    name: 'Lynleit',
    group: 'MSF',
    kind: 'character',
    avatar: 'gallery/characters/lynleit_1.png',
    activities: [
      { title: 'Inheritance pressure and visible leadership', start: 1, end: 2, tone: 'gold' },
      { title: 'Framed, displaced, forced into exile', start: 3, end: 5, tone: 'rose' },
      { title: 'Rebuilds leverage and public posture', start: 6, end: 9, tone: 'blue' }
    ]
  },
  {
    name: 'Kyrien',
    group: 'Independent',
    kind: 'character',
    avatar: 'gallery/characters/kyrien_1.png',
    activities: [
      { title: 'Peripheral watch and silent preparation', start: 1, end: 2, tone: 'slate' },
      { title: 'Contingency activation and extraction work', start: 3, end: 6, tone: 'blue' },
      { title: 'Shadow pursuit and anti-Tien counterplay', start: 7, end: 9, tone: 'violet' }
    ]
  },
  {
    name: 'Helena',
    group: 'MSF',
    kind: 'character',
    activities: [
      { title: 'Builds accusation architecture around Lynleit', start: 1, end: 3, tone: 'rose' },
      { title: 'Redirects MSF machinery into the hunt', start: 4, end: 6, tone: 'ember' },
      { title: 'Consolidates control under mounting instability', start: 7, end: 9, tone: 'rose' }
    ]
  },
  {
    name: 'Tien',
    group: 'Helena Asset',
    kind: 'character',
    activities: [
      { title: 'Hidden deployment and selective pressure', start: 2, end: 4, tone: 'slate' },
      { title: 'Pursuit, disruption, covert force projection', start: 5, end: 8, tone: 'violet' }
    ]
  },
  {
    name: 'Fionn',
    group: 'MSF',
    kind: 'character',
    activities: [
      { title: 'High-value target before catalytic removal', start: 1, end: 2, tone: 'gold' }
    ]
  },
  {
    name: 'Felix',
    group: 'MSF',
    kind: 'character',
    activities: [
      { title: 'Support alignment under pressure', start: 2, end: 5, tone: 'teal' },
      { title: 'Operational repositioning after rupture', start: 6, end: 8, tone: 'blue' }
    ]
  },
  {
    name: 'Reiner',
    group: 'MSF',
    kind: 'character',
    activities: [
      { title: 'Internal friction and tactical response', start: 2, end: 5, tone: 'stone' },
      { title: 'Contested loyalties inside mutation phase', start: 6, end: 9, tone: 'ember' }
    ]
  },
  {
    name: 'Drake',
    group: 'Duchy',
    kind: 'character',
    activities: [
      { title: 'Peripheral monitoring of succession fallout', start: 3, end: 6, tone: 'stone' }
    ]
  },
  {
    name: 'Sherie',
    group: 'Duchy',
    kind: 'character',
    activities: [
      { title: 'Duchy-side interpretation and response', start: 4, end: 7, tone: 'gold' }
    ]
  },
  {
    name: 'Heyk',
    group: 'Duchy',
    kind: 'character',
    activities: [
      { title: 'Secondary pressure and alignment testing', start: 5, end: 8, tone: 'slate' }
    ]
  },
  {
    name: 'Hiyu',
    group: 'University',
    kind: 'character',
    activities: [
      { title: 'Academic angle on systemic disruption', start: 6, end: 9, tone: 'teal' }
    ]
  },
  {
    name: 'Yulia',
    group: 'University',
    kind: 'character',
    activities: [
      { title: 'Scholarly interpretation of magical strain', start: 6, end: 9, tone: 'blue' }
    ]
  },
  {
    name: 'Natalia',
    group: 'Magiarchy',
    kind: 'character',
    activities: [
      { title: 'Internal magi governance response', start: 5, end: 9, tone: 'violet' }
    ]
  },
  {
    name: 'Lester',
    group: 'Magiarchy',
    kind: 'character',
    activities: [
      { title: 'Strategic containment and doctrine pressure', start: 6, end: 9, tone: 'slate' }
    ]
  },
  {
    name: 'Myka',
    group: 'Mage Academy',
    kind: 'character',
    activities: [
      { title: 'Institution-adjacent response lane', start: 7, end: 9, tone: 'teal' }
    ]
  },
  {
    name: 'MSF',
    group: 'Faction',
    kind: 'faction',
    activities: [
      { title: 'Internal instability under succession pressure', start: 1, end: 3, tone: 'ember' },
      { title: 'Redirected hunt architecture', start: 4, end: 6, tone: 'rose' },
      { title: 'Compression into guild-like continuity structure', start: 7, end: 9, tone: 'blue' }
    ]
  },
  {
    name: 'Magiarchy',
    group: 'Faction',
    kind: 'faction',
    activities: [
      { title: 'Observation, regulation, delayed intervention', start: 4, end: 9, tone: 'violet' }
    ]
  },
  {
    name: 'Aristocracy',
    group: 'Faction',
    kind: 'faction',
    activities: [
      { title: 'Legacy calculus and opportunistic leverage', start: 3, end: 8, tone: 'gold' }
    ]
  },
  {
    name: 'Government',
    group: 'Faction',
    kind: 'faction',
    activities: [
      { title: 'Public-order narrative and state containment', start: 3, end: 9, tone: 'stone' }
    ]
  },
  {
    name: 'Church',
    group: 'Faction',
    kind: 'faction',
    activities: [
      { title: 'Secrecy maintenance and institutional caution', start: 4, end: 9, tone: 'slate' }
    ]
  }
];

const toneClass = {
  blue: 'timeline-bar-blue',
  rose: 'timeline-bar-rose',
  ember: 'timeline-bar-ember',
  violet: 'timeline-bar-violet',
  gold: 'timeline-bar-gold',
  slate: 'timeline-bar-slate',
  stone: 'timeline-bar-stone',
  teal: 'timeline-bar-teal'
};

const board = document.getElementById('timeline-board');
const frame = document.querySelector('.timeline-frame');
const trackTemplate = lanes.map((lane) => (lane.type === 'event' ? '90px' : 'minmax(148px, 1fr)')).join(' ');

function createCell(className, text) {
  const node = document.createElement('div');
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

function createAvatar(row) {
  const shell = document.createElement('div');
  shell.className = `timeline-avatar-shell ${row.kind === 'faction' ? 'timeline-avatar-shell-faction' : ''}`;

  if (row.avatar) {
    const image = document.createElement('img');
    image.className = 'timeline-avatar-image';
    image.src = row.avatar;
    image.alt = `${row.name} avatar`;
    shell.appendChild(image);
    return shell;
  }

  const fallback = document.createElement('span');
  fallback.className = `timeline-avatar-fallback ${row.kind === 'faction' ? 'timeline-avatar-fallback-faction' : ''}`;
  fallback.textContent = row.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  shell.appendChild(fallback);
  return shell;
}

function buildHeader() {
  board.appendChild(createCell('timeline-cell timeline-sticky timeline-sticky-avatar timeline-header-meta timeline-avatar-header', ''));
  board.appendChild(createCell('timeline-cell timeline-sticky timeline-sticky-name timeline-header-meta', 'Actor'));

  const headerTrack = document.createElement('div');
  headerTrack.className = 'timeline-track timeline-header-track';
  headerTrack.style.gridTemplateColumns = trackTemplate;

  lanes.forEach((lane) => {
    const laneNode = document.createElement('div');
    laneNode.className = `timeline-lane-head timeline-lane-head-${lane.type}`;

    const label = document.createElement('span');
    label.className = 'timeline-lane-label';
    label.textContent = lane.label;

    const title = document.createElement('strong');
    title.className = 'timeline-lane-title';
    title.textContent = lane.title;

    laneNode.append(label, title);
    headerTrack.appendChild(laneNode);
  });

  board.appendChild(headerTrack);
}

function buildRow(row) {
  const avatarCell = createCell('timeline-cell timeline-sticky timeline-sticky-avatar timeline-row-avatar', '');
  const nameCell = createCell('timeline-cell timeline-sticky timeline-sticky-name timeline-row-name', row.name);

  avatarCell.appendChild(createAvatar(row));

  if (row.kind === 'faction') {
    avatarCell.classList.add('timeline-row-faction');
    nameCell.classList.add('timeline-row-faction');
  }

  board.append(avatarCell, nameCell);

  const track = document.createElement('div');
  track.className = 'timeline-track timeline-row-track';
  track.style.gridTemplateColumns = trackTemplate;

  lanes.forEach((lane) => {
    const laneCell = document.createElement('div');
    laneCell.className = `timeline-lane timeline-lane-${lane.type}`;
    track.appendChild(laneCell);
  });

  row.activities.forEach((activity) => {
    const bar = document.createElement('article');
    bar.className = `timeline-bar ${toneClass[activity.tone] || 'timeline-bar-blue'}`;
    bar.style.gridColumn = `${activity.start} / ${activity.end + 1}`;

    const title = document.createElement('strong');
    title.textContent = activity.title;

    const meta = document.createElement('span');
    meta.textContent = `${lanes[activity.start - 1].label} - ${lanes[activity.end - 1].label}`;

    bar.append(title, meta);
    track.appendChild(bar);
  });

  board.appendChild(track);
}

function enableDragPan() {
  if (!frame) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startScrollLeft = 0;
  let startScrollTop = 0;

  frame.addEventListener('mousedown', (event) => {
    if (event.button !== 0) return;

    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startScrollLeft = frame.scrollLeft;
    startScrollTop = frame.scrollTop;
    frame.classList.add('timeline-frame-dragging');
    event.preventDefault();
  });

  window.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    frame.scrollLeft = startScrollLeft - deltaX;
    frame.scrollTop = startScrollTop - deltaY;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;

    isDragging = false;
    frame.classList.remove('timeline-frame-dragging');
  });

  frame.addEventListener('mouseleave', () => {
    if (!isDragging) return;

    isDragging = false;
    frame.classList.remove('timeline-frame-dragging');
  });
}

buildHeader();
rows.forEach(buildRow);
enableDragPan();
