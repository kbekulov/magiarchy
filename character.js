const profileSeeds = [
  {
    slug: 'lynleit', name: 'Lynleit', code: 'MSF · 001', role: 'Displaced heir and strategist', factions: ['MSF', 'Magiarchy'], image: 'media/gallery/images/chibis/chibi_lynleit_1.png', accent: 'blue',
    summary: 'An ethical strategist forced to rebuild her authority after being blamed for Fionn\'s murder and driven out of MSF.',
    visual: 'Long dark hair, tailored blue fieldwear, and controlled magical light', palette: 'Midnight blue, black, silver, cold cyan', traits: ['Controlled', 'Protective', 'Strategic'],
    origin: 'Raised close to MSF leadership, Lynleit learns early that trust must be built as carefully as any intelligence network.', rupture: 'Fionn is murdered, Helena takes control, and Lynleit is framed and exiled from the institution she expected to inherit.', focus: 'She must recover her name without becoming as ruthless as the people who took it from her.', future: 'After restoring MSF, she disappears and later returns as an elusive outsider carrying a secret she refuses to share.',
    ally: 'Kyrien', allyNote: 'Her most capable independent ally and the person she eventually trusts with MSF.', rival: 'Helena', rivalNote: 'Her stepmother, political usurper, and the architect of her exile.', goal: 'Reclaim MSF without surrendering the ethics that make it worth saving.',
    beats: ['The Heir Apparent', 'The Accusation', 'A War from Exile', 'The Unexplained Return']
  },
  {
    slug: 'kyrien', name: 'Kyrien', code: 'MSF · 002', role: 'Independent operator and reluctant director', factions: ['Independent'], image: 'media/gallery/images/chibis/chibi_kyrien_1.png', accent: 'amber',
    summary: 'A non-Magus tactician who survives by understanding systems, then inherits responsibility for an agency built to confront magic.',
    visual: 'Practical layers, concealed tools, and a silhouette built for movement', palette: 'Charcoal, muted amber, worn steel, off-white', traits: ['Observant', 'Self-reliant', 'Adaptive'],
    origin: 'Kyrien develops his value outside formal institutions by finding the failure points that trained specialists overlook.', rupture: 'The Spill pulls him into Lynleit\'s struggle and turns a temporary alliance into a lasting responsibility.', focus: 'He must direct Magi without sharing their perception of the world or allowing that difference to weaken his authority.', future: 'He keeps MSF functional while Lynleit remains absent, unaware that she is also hiding their son from him.',
    ally: 'Lynleit', allyNote: 'A strategic partner whose trust changes the direction of his life.', rival: 'Tien', rivalNote: 'A shadow operator whose methods mirror Kyrien\'s skills without his restraint.', goal: 'Prove that judgment and preparation can lead MSF without magical power.',
    beats: ['Outside the System', 'Alliance under Pressure', 'The Director without Magic', 'The Secret Kept from Him']
  },
  {
    slug: 'helena', name: 'Helena', code: 'MSF · 003', role: 'Political usurper', factions: ['MSF'], image: 'media/gallery/images/chibis/chibi_helena_1.png', accent: 'red',
    summary: 'A patient political operator who converts private grief and institutional uncertainty into control of MSF.',
    visual: 'Severe tailoring, immaculate posture, and an intentionally unreadable expression', palette: 'Oxblood, black, ivory, muted gold', traits: ['Composed', 'Possessive', 'Calculating'],
    origin: 'Helena learns to read MSF as a hierarchy of loyalties rather than a simple intelligence service.', rupture: 'Fionn\'s death creates the opening she needs to seize control and make Lynleit the official enemy.', focus: 'Her authority depends on keeping the accusation intact while the Spill exposes everything MSF failed to understand.', future: 'Every measure used to secure her position narrows the number of people she can still trust.',
    ally: 'Tien', allyNote: 'Her covert instrument when official authority is too visible or too slow.', rival: 'Lynleit', rivalNote: 'The displaced heir whose survival threatens Helena\'s entire political structure.', goal: 'Hold MSF long enough to make her version of events irreversible.',
    beats: ['Reading the Institution', 'The Opening', 'Control through Accusation', 'A Throne under Pressure']
  },
  {
    slug: 'tien', name: 'Tien', code: 'MSF · 004', role: 'Covert enforcer', factions: ['Independent'], image: 'media/gallery/images/chibis/chibi_tien_1.png', accent: 'violet',
    summary: 'A concealed force used for pursuit and pressure, defined less by public allegiance than by the precision of assigned work.',
    visual: 'Low-profile fieldwear, obscured identifiers, and a deliberately forgettable outline', palette: 'Deep violet, graphite, smoke grey, black', traits: ['Silent', 'Precise', 'Relentless'],
    origin: 'Tien builds a reputation in work that is most successful when nobody can prove it happened.', rupture: 'Helena deploys Tien against Lynleit and Kyrien as MSF\'s internal conflict leaves official channels behind.', focus: 'Each successful pursuit makes it harder to tell whether Tien controls the mission or the mission controls Tien.', future: 'Kyrien becomes both an operational rival and evidence that similar skills can serve a different code.',
    ally: 'Helena', allyNote: 'The authority who provides direction, access, and political cover.', rival: 'Kyrien', rivalNote: 'A tactical counterpart who chooses independence over obedience.', goal: 'Complete the assignment without becoming disposable once it is done.',
    beats: ['Work without a Record', 'Helena\'s Shadow', 'The Counter-Operator', 'No Safe Exit']
  },
  {
    slug: 'fionn', name: 'Fionn', code: 'ARC · 005', role: 'Magiarch and MSF founder', factions: ['MSF', 'Magiarchy'], image: 'media/gallery/images/chibis/chibi_fionn_1.png', accent: 'neutral',
    summary: 'Publicly the director of MSF and secretly the country\'s Magiarch, Fionn holds two systems together until both demand him at once.',
    visual: 'Formal authority softened by practical details and an old ceremonial restraint', palette: 'Stone, black, muted blue, antique brass', traits: ['Measured', 'Secretive', 'Responsible'],
    origin: 'Fionn creates MSF with a public intelligence purpose and a hidden structure prepared for magical crisis.', rupture: 'Political strife inside MSF distracts him when the Spill requires his duties as Magiarch.', focus: 'The secrecy protecting both offices also prevents either institution from understanding the burden carried between them.', future: 'His murder turns unfinished plans into an inheritance that Lynleit and Kyrien must interpret without him.',
    ally: 'Lynleit', allyNote: 'His intended successor, though much of what she inherits was never fully explained.', rival: 'Internal opposition', rivalNote: 'A network of political pressure that keeps him occupied at the worst possible moment.', goal: 'Build institutions capable of surviving truths the public cannot yet know.',
    beats: ['Two Offices', 'The Hidden Purpose of MSF', 'Distracted during the Spill', 'The Inheritance after Death']
  },
  {
    slug: 'heyk', name: 'Heyk', code: 'FLD · 006', role: 'Government field operative', factions: ['Government'], image: 'media/gallery/images/chibis/chibi_heyk_1.png', accent: 'green',
    summary: 'A government operative sent into a quarantine whose official explanation becomes less credible with every step.',
    visual: 'Field equipment adapted beyond regulation and kept ready for rapid extraction', palette: 'Dark green, utility black, concrete, signal orange', traits: ['Practical', 'Suspicious', 'Decisive'],
    origin: 'Heyk trusts preparation, command structure, and the assumption that every threat has a material explanation.', rupture: 'Deployment into the quarantined park confronts him with disappearances that no conventional briefing can explain.', focus: 'He must complete the mission while deciding how much evidence can be reported without destroying his own credibility.', future: 'The extraction leaves him with a job offer and a place inside a conflict the government still cannot name.',
    ally: 'Drake', allyNote: 'A connection on the extraction line when the operation stops following its plan.', rival: 'The quarantine', rivalNote: 'An environment that refuses every ordinary model of threat and survival.', goal: 'Bring people out alive and understand what the official report cannot contain.',
    beats: ['A Conventional Operative', 'Into the Quarantine', 'The Impossible Extraction', 'The Offer after Survival']
  },
  {
    slug: 'sherie', name: 'Sherie', code: 'FLD · 007', role: 'Government extraction support', factions: ['Government'], image: null, accent: 'blue',
    summary: 'An extraction specialist positioned at the boundary between a government operation and a reality its briefings cannot describe.',
    visual: 'Compact support gear, visible communications equipment, and a clean operational silhouette', palette: 'Navy, slate, white, emergency blue', traits: ['Reliable', 'Methodical', 'Guarded'],
    origin: 'Sherie becomes valuable by keeping unstable field operations connected to the people waiting outside them.', rupture: 'The Spill turns a controlled extraction into a chain of decisions made with incomplete information.', focus: 'She must choose when following protocol protects the team and when it only protects the institution.', future: 'What she records during the operation may become more dangerous than what the public is allowed to see.',
    ally: 'Heyk', allyNote: 'The operative whose survival depends on her reading the extraction correctly.', rival: 'Official protocol', rivalNote: 'A rigid system that cannot adapt quickly enough to an impossible event.', goal: 'Keep the extraction line open when every assumption behind it fails.',
    beats: ['Behind the Field Team', 'Signals from the Park', 'Protocol Breaks', 'The Record Nobody Wants']
  },
  {
    slug: 'drake', name: 'Drake', code: 'FLD · 008', role: 'Government extraction lead', factions: ['Government'], image: 'media/gallery/images/chibis/chibi_drake_1.png', accent: 'amber',
    summary: 'A controlled government figure whose extraction decisions pull him from institutional certainty into the hidden conflict.',
    visual: 'Formal field attire, restrained insignia, and an immaculate profile under pressure', palette: 'Black, burgundy, silver, muted amber', traits: ['Commanding', 'Disciplined', 'Skeptical'],
    origin: 'Drake advances by giving uncertain operations a clear hierarchy and a measurable objective.', rupture: 'Heyk\'s quarantine extraction forces him to authorize choices that have no place in a normal chain of command.', focus: 'Admitting what happened would threaten the institution, but denying it would leave the next team unprepared.', future: 'He becomes a bridge between government authority and the people who understand the Spill better than it does.',
    ally: 'Sherie', allyNote: 'The support specialist who turns his orders into a viable extraction route.', rival: 'Institutional denial', rivalNote: 'The pressure to file a coherent report instead of an honest one.', goal: 'Preserve operational control without burying the truth needed to survive.',
    beats: ['Command by Procedure', 'The Extraction Order', 'An Unreportable Outcome', 'Between Two Systems']
  },
  {
    slug: 'felix', name: 'Felix', code: 'ARC · 009', role: 'MSF specialist', factions: ['MSF'], image: 'media/gallery/images/chibis/chibi_felix_1.png', accent: 'neutral',
    summary: 'A provisional MSF specialist whose ordinary assignment becomes a test of what loyalty means after the agency fractures.',
    visual: 'Loose fieldwear, fast movement, and one bright accent against neutral equipment', palette: 'Grey, black, bright blue, rust orange', traits: ['Energetic', 'Direct', 'Loyal'],
    origin: 'Felix joins MSF expecting clear missions, internal competence, and leaders who understand the full picture.', rupture: 'Fionn\'s death and Lynleit\'s accusation divide the agency before Felix can decide which version of MSF is real.', focus: 'Loyalty to colleagues begins pulling against loyalty to the command structure.', future: 'The smaller post-Spill agency offers him a chance to choose its purpose instead of merely inheriting it.',
    ally: 'Reiner', allyNote: 'A fellow MSF member who provides a second reading of every official order.', rival: 'The fractured chain of command', rivalNote: 'Competing authorities that each demand complete loyalty.', goal: 'Find a version of MSF whose mission deserves the people serving it.',
    beats: ['Joining the Roster', 'Orders after Fionn', 'Choosing Whom to Trust', 'Building the Smaller MSF']
  },
  {
    slug: 'reiner', name: 'Reiner', code: 'ARC · 010', role: 'MSF analyst', factions: ['MSF'], image: 'media/gallery/images/chibis/chibi_reiner_1.png', accent: 'neutral',
    summary: 'A provisional analyst who notices the pattern behind the Spill before he understands the world capable of producing it.',
    visual: 'Layered office-field clothing, annotated tools, and a deliberately understated presence', palette: 'Graphite, ash, muted teal, paper white', traits: ['Analytical', 'Patient', 'Cautious'],
    origin: 'Reiner earns trust by finding relationships inside information that other people dismiss as noise.', rupture: 'The disappearances produce a pattern that is statistically clear and institutionally impossible.', focus: 'He must act on conclusions he cannot yet explain without exposing himself as unreliable.', future: 'Learning that magic exists turns his analytical discipline into one of the rebuilt MSF\'s most useful safeguards.',
    ally: 'Felix', allyNote: 'A field-minded colleague who tests analysis against immediate reality.', rival: 'Incomplete evidence', rivalNote: 'The gap between what the pattern proves and what the institution will accept.', goal: 'Construct an explanation strong enough to survive contact with the impossible.',
    beats: ['The Quiet Analyst', 'A Pattern of Vanishings', 'Evidence without a Theory', 'Learning the Hidden Rules']
  },
  {
    slug: 'yulia', name: 'Yulia', code: 'ARC · 011', role: 'Independent witness', factions: ['Independent'], image: 'media/gallery/images/chibis/chibi_yulia_1.png', accent: 'neutral',
    summary: 'An independent figure whose personal encounter with the Spill makes official silence impossible to accept.',
    visual: 'Civilian layers, a strong color accent, and keepsakes treated as practical equipment', palette: 'Cream, charcoal, muted red, pale gold', traits: ['Empathetic', 'Persistent', 'Defiant'],
    origin: 'Yulia lives outside the institutions that quietly shape the hidden world and expects answers from visible authorities.', rupture: 'A disappearance connected to the park gives her a reason to challenge the quarantine\'s official story.', focus: 'Every useful answer requires trusting people who admit less than they clearly know.', future: 'Her refusal to forget makes her both a liability to secrecy and a potential ally to those resisting it.',
    ally: 'Hiyu', allyNote: 'Another independent voice willing to follow questions beyond official boundaries.', rival: 'The official story', rivalNote: 'A carefully maintained explanation that treats missing people as an administrative problem.', goal: 'Recover the truth that institutions have decided is safer to erase.',
    beats: ['Life outside the Archive', 'Someone Goes Missing', 'Against the Quarantine Story', 'A Witness Who Remembers']
  },
  {
    slug: 'hiyu', name: 'Hiyu', code: 'ARC · 012', role: 'Independent researcher', factions: ['Independent'], image: 'media/gallery/images/chibis/chibi_hiyu_1.png', accent: 'neutral',
    summary: 'A curious independent researcher who approaches the hidden world through fragments, rumors, and details that should not align.',
    visual: 'Soft civilian clothing mixed with portable research tools and improvised storage', palette: 'Black, soft blue, warm grey, white', traits: ['Curious', 'Inventive', 'Restless'],
    origin: 'Hiyu collects discarded explanations and learns that the same impossible details recur in unrelated stories.', rupture: 'The park quarantine brings several of those fragments together in one visible place.', focus: 'Getting close enough to prove the theory also means becoming visible to the organizations maintaining secrecy.', future: 'The rebuilt MSF may need Hiyu\'s questions even when its leaders dislike where those questions lead.',
    ally: 'Yulia', allyNote: 'A grounded witness who gives personal weight to Hiyu\'s scattered evidence.', rival: 'Secrecy doctrine', rivalNote: 'A system designed to isolate exactly the fragments Hiyu keeps connecting.', goal: 'Turn rumor into a map of the hidden structure behind ordinary life.',
    beats: ['Collecting Impossibilities', 'The Park Connects Them', 'Too Close to the Hidden World', 'A Researcher MSF Cannot Ignore']
  },
  {
    slug: 'natalia', name: 'Natalia', code: 'ARC · 013', role: 'Private investigator and hidden Magiarchy contact', factions: ['Private Eye', 'Magiarchy'], image: 'media/gallery/images/chibis/chibi_natalia_1.png', accent: 'neutral',
    summary: 'A private investigator who can cross between ordinary cases and Magiarchy knowledge without fully belonging to either world.',
    visual: 'Professional citywear, compact case tools, and magical details hidden in plain sight', palette: 'Black, wine red, parchment, muted violet', traits: ['Perceptive', 'Dry-witted', 'Private'],
    origin: 'Natalia learns that clients rarely understand the real shape of the problem they are paying her to solve.', rupture: 'A missing-person trail touches the Spill and forces her Magiarchy knowledge into an ordinary investigation.', focus: 'Solving the case requires revealing enough truth to help without exposing the system she is expected to protect.', future: 'Her independence makes her useful to Lynleit, but also difficult for either MSF or the Magiarchy to control.',
    ally: 'Lester', allyNote: 'Her agency connection to the practical details and consequences of each case.', rival: 'Selective truth', rivalNote: 'The habit of every faction to disclose only what serves its immediate need.', goal: 'Deliver an answer that helps the client rather than merely protecting the hidden order.',
    beats: ['Cases with Missing Pieces', 'The Spill Enters the File', 'Two Kinds of Secrecy', 'An Investigator between Factions']
  },
  {
    slug: 'lester', name: 'Lester', code: 'ARC · 014', role: 'Private eye agency partner', factions: ['Private Eye'], image: null, accent: 'neutral',
    summary: 'A grounded investigator who notices the human cost when Natalia\'s cases begin crossing into a world he was never meant to see.',
    visual: 'Weathered professional clothing, paper records, and dependable analogue tools', palette: 'Brown, charcoal, cream, faded green', traits: ['Grounded', 'Patient', 'Protective'],
    origin: 'Lester builds cases from ordinary motives, physical evidence, and the assumption that people remain understandable.', rupture: 'Natalia\'s Spill investigation produces gaps that no ordinary suspect or conspiracy can explain.', focus: 'He must decide whether trusting Natalia means accepting a truth she still refuses to state directly.', future: 'Once he sees enough of the hidden world, returning to ordinary private work may no longer be possible.',
    ally: 'Natalia', allyNote: 'His closest professional connection and the person withholding the case\'s impossible context.', rival: 'The missing context', rivalNote: 'Evidence deliberately stripped of the facts needed to understand it.', goal: 'Protect the people inside the case, even when the institutions only protect the secret.',
    beats: ['Ordinary Cases', 'A Partner with Another Life', 'Evidence That Cannot Fit', 'Past the Point of Ignorance']
  },
  {
    slug: 'myka', name: 'Myka', code: 'ARC · 015', role: 'Magic Academy student', factions: ['Magic Academy', 'Magiarchy'], image: 'media/gallery/images/chibis/chibi_myka_1.png', accent: 'neutral',
    summary: 'A young Magus learning controlled theory while the Spill demonstrates how quickly every lesson can become inadequate.',
    visual: 'Academic uniform elements, experimental accessories, and an expressive magical silhouette', palette: 'Indigo, cream, pale cyan, black', traits: ['Gifted', 'Earnest', 'Impulsive'],
    origin: 'Myka enters the Academy believing disciplined knowledge can make dangerous ability understandable.', rupture: 'The Spill turns distant doctrine into an immediate threat affecting people outside protected magical society.', focus: 'Talent creates pressure to act before training has taught the restraint that action requires.', future: 'Protecting a surviving clue ties Myka to Natalia and a conflict far beyond the Academy\'s controlled exercises.',
    ally: 'Natalia', allyNote: 'An experienced Magiarchy contact who treats theory as something with human consequences.', rival: 'Inexperience', rivalNote: 'The distance between understanding a rule and surviving its failure.', goal: 'Become useful without mistaking raw ability for readiness.',
    beats: ['Learning the Structure', 'Theory Meets the Spill', 'A Clue Worth Protecting', 'Beyond the Academy Walls']
  },
  {
    slug: 'inspector-leo', name: 'Inspector Leo', code: 'PLC · 016', role: 'Police inspector', factions: ['Police'], image: null, accent: 'blue',
    summary: 'A police inspector whose missing-person investigation reaches the edge of a quarantine controlled by authorities above his clearance.',
    visual: 'Practical detective clothing, worn notebook, and restrained police identifiers', palette: 'Navy, grey, white, signal blue', traits: ['Tenacious', 'Procedural', 'Skeptical'],
    origin: 'Leo trusts patient interviews and the belief that every disappearance leaves a human trail.', rupture: 'Searchers vanish after entering the park, then the case is removed from police control under a government quarantine.', focus: 'Following procedure now means abandoning the investigation, while continuing it means challenging his own institution.', future: 'The Church and MSF each know more than they admit, leaving Leo to investigate the people controlling the answers.',
    ally: 'Natalia', allyNote: 'An investigator with access to details that never enter police records.', rival: 'Jurisdiction', rivalNote: 'The official boundary used to separate him from the people he is responsible for finding.', goal: 'Account for every missing person, regardless of who classified the reason.',
    beats: ['The Missing-Person Desk', 'Searchers Vanish Too', 'Locked outside the Quarantine', 'Investigating the Authorities']
  },
  {
    slug: 'father-mikhail', name: 'Father Mikhail', code: 'CHR · 017', role: 'Church representative', factions: ['The Church'], image: null, accent: 'neutral',
    summary: 'A Church representative sent to observe a crisis that doctrine recognizes, authority fears, and public language cannot name.',
    visual: 'Understated clerical dress, old protective symbols, and no ornamental excess', palette: 'Black, stone, dull gold, deep red', traits: ['Disciplined', 'Compassionate', 'Severe'],
    origin: 'Mikhail is taught that the Church survives by knowing which truths can be acknowledged and which must remain contained.', rupture: 'The Spill creates suffering too visible to dismiss and too dangerous to explain openly.', focus: 'Protecting ordinary people may require cooperating with Magi the Church is prepared to condemn.', future: 'His choices place him between doctrine, institutional survival, and the individuals paying the price for both.',
    ally: 'Inspector Leo', allyNote: 'A secular investigator whose questions keep returning to the human cost of secrecy.', rival: 'Church doctrine', rivalNote: 'The authority that gives him purpose while limiting the mercy he can show.', goal: 'Prevent the hidden conflict from turning necessary secrecy into moral surrender.',
    beats: ['A Keeper of Restricted Truth', 'Called to the Spill', 'Cooperation with the Condemned', 'Faith under Institutional Pressure']
  }
];

const profilesBySlug = new Map(profileSeeds.map((profile) => [profile.slug, profile]));

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function factionClass(faction) {
  const classes = {
    MSF: 'faction-msf', Magiarchy: 'faction-magiarchy', Independent: 'faction-independent', Government: 'faction-government',
    'Private Eye': 'faction-private-eye', 'Magic Academy': 'faction-academy', Police: 'faction-police', 'The Church': 'faction-church'
  };
  return classes[faction] ?? '';
}

function initializeProfileTimelineDrag(track) {
  let pointerId = null;
  let startX = 0;
  let startScroll = 0;

  function finish(event) {
    if (event.pointerId !== pointerId) return;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    track.classList.remove('is-dragging');
    pointerId = null;
  }

  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
    track.classList.add('is-dragging');
  });
  track.addEventListener('pointermove', (event) => {
    if (event.pointerId !== pointerId) return;
    event.preventDefault();
    track.scrollLeft = startScroll - (event.clientX - startX);
  });
  track.addEventListener('pointerup', finish);
  track.addEventListener('pointercancel', finish);
  track.addEventListener('lostpointercapture', () => {
    track.classList.remove('is-dragging');
    pointerId = null;
  });
}

function renderProfile(profile) {
  document.title = `${profile.name} - Characters - Magiarchy`;
  document.querySelector('#character-crumb').textContent = profile.name;
  document.querySelector('#character-profile-code').textContent = profile.code;
  document.querySelector('#character-profile-role').textContent = profile.role;
  document.querySelector('#character-profile-name').textContent = profile.name;
  document.querySelector('#character-profile-summary').textContent = profile.summary;

  const portrait = document.querySelector('#character-profile-portrait');
  portrait.classList.add(`profile-accent-${profile.accent}`);
  if (profile.image) {
    const image = createElement('img');
    image.src = profile.image;
    image.alt = `Chibi artwork of ${profile.name}`;
    image.width = 1024;
    image.height = 1024;
    portrait.append(image);
  } else {
    const placeholder = createElement('div', 'profile-portrait-placeholder', profile.name.split(' ').map((part) => part[0]).join(''));
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', `Artwork placeholder for ${profile.name}`);
    portrait.append(placeholder);
  }
  portrait.append(createElement('span', 'profile-portrait-note', profile.image ? 'Chibi preview' : 'Chibi pending'));

  const factions = document.querySelector('#character-profile-factions');
  profile.factions.forEach((faction) => factions.append(createElement('span', `profile-badge ${factionClass(faction)}`, faction)));

  const timeline = document.querySelector('#character-timeline');
  const timelineDetails = [profile.origin, profile.rupture, profile.focus, profile.future];
  profile.beats.forEach((title, index) => {
    const item = createElement('li');
    item.append(createElement('span', 'character-timeline-marker', String(index + 1).padStart(2, '0')));
    const copy = createElement('div');
    copy.append(createElement('small', '', ['Foundation', 'Rupture', 'Central struggle', 'Unresolved future'][index]));
    copy.append(createElement('h3', '', title));
    copy.append(createElement('p', '', timelineDetails[index]));
    item.append(copy);
    timeline.append(item);
  });
  initializeProfileTimelineDrag(timeline);

  const appearance = document.querySelector('#character-appearance');
  [
    ['Visual direction', profile.visual], ['Palette', profile.palette], ['Silhouette', `Mock design language shaped around ${profile.role.toLowerCase()}.`], ['Status', 'Provisional until final appearance notes are supplied.']
  ].forEach(([term, detail]) => {
    appearance.append(createElement('dt', '', term), createElement('dd', '', detail));
  });

  const personality = document.querySelector('#character-personality');
  const scores = [84, 72, 78];
  profile.traits.forEach((trait, index) => {
    const row = createElement('div', 'personality-row');
    const label = createElement('div');
    label.append(createElement('strong', '', trait), createElement('span', '', `${scores[index]} / 100`));
    const meter = createElement('span', 'personality-meter');
    const fill = createElement('i');
    fill.style.width = `${scores[index]}%`;
    meter.append(fill);
    row.append(label, meter);
    personality.append(row);
  });

  const biography = document.querySelector('#character-biography');
  [
    ['Before the crisis', profile.origin], ['The defining break', profile.rupture], ['Where the record leads', profile.future]
  ].forEach(([title, detail], index) => {
    const item = createElement('li');
    item.append(createElement('span', '', String(index + 1).padStart(2, '0')));
    const copy = createElement('div');
    copy.append(createElement('h3', '', title), createElement('p', '', detail));
    item.append(copy);
    biography.append(item);
  });

  const connections = document.querySelector('#character-connections');
  [
    [profile.ally, 'Primary connection', profile.allyNote], [profile.rival, 'Central friction', profile.rivalNote], [profile.factions.join(' / '), 'Institutional position', `The factional context that shapes how ${profile.name} is seen and what is expected of them.`]
  ].forEach(([name, relation, detail]) => {
    const card = createElement('article', 'connection-card');
    card.append(createElement('small', '', relation), createElement('h3', '', name), createElement('p', '', detail));
    connections.append(card);
  });

  const conflicts = document.querySelector('#character-conflicts');
  [
    ['External', profile.rival, profile.rivalNote], ['Institutional', profile.factions[0], `The demands of ${profile.factions[0]} do not always align with ${profile.name}'s judgment.`], ['Internal', 'The cost of the role', profile.focus]
  ].forEach(([type, title, detail]) => {
    const card = createElement('article');
    card.append(createElement('span', '', type), createElement('div'));
    card.lastElementChild.append(createElement('h3', '', title), createElement('p', '', detail));
    conflicts.append(card);
  });

  const motivations = document.querySelector('#character-motivations');
  [
    ['Primary objective', profile.goal], [`Protect ${profile.ally}`, profile.allyNote], ['Resolve the central pressure', profile.focus]
  ].forEach(([title, detail], index) => {
    const item = createElement('li');
    item.append(createElement('span', '', String(index + 1).padStart(2, '0')));
    const copy = createElement('div');
    copy.append(createElement('h3', '', title), createElement('p', '', detail));
    item.append(copy);
    motivations.append(item);
  });

  document.querySelector('#character-profile-content').hidden = false;
}

const requestedCharacter = new URLSearchParams(window.location.search).get('character');
const selectedProfile = profilesBySlug.get(requestedCharacter);
if (selectedProfile) renderProfile(selectedProfile);
else document.querySelector('#character-profile-error').hidden = false;
