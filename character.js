const profileSeeds = [
  {
    slug: 'lynleit', name: 'Lynleit', code: 'MSF · 001', role: 'Displaced heir and people-centered strategist', factions: ['MSF', 'Magiarchy'], accent: 'blue', materialStatus: 'Canon traits + mock details',
    summary: 'An ENFJ (strong Ni) leader whose people-first instinct is sharpened by unusually strong long-range intuition. She reads trust, morale, legitimacy, and the direction events are taking as parts of the same structure.',
    visual: 'Long dark hair, tailored blue fieldwear, controlled magical light, and a composed warmth held deliberately in reserve', palette: 'Midnight blue, black, silver, cold cyan',
    personalitySummary: 'Lynleit can read hidden structures with an inward precision that resembles an INFJ, but priority defines her. When pressure becomes real, she moves toward people, assumes responsibility, and measures strategy by its human consequences. Her warmth is deliberate and structurally aware rather than exuberant.',
    traits: [
      { label: 'Relational leadership', score: 95, note: 'Her first instinct in crisis is to read trust, morale, legitimacy, shared burden, and the emotional field around her.' },
      { label: 'Strategic foresight', score: 92, note: 'Her unusually strong intuition identifies long-range patterns and what events are becoming before most people can name the change.' },
      { label: 'Private introspection', score: 86, note: 'In private she is comfortable disappearing into solitude, following symbolic threads, and processing difficult emotion internally.' }
    ],
    magecraft: [
      { label: 'Hereditary magecraft', title: 'Blue flame', detail: 'Lynleit inherited her family\'s ability to manifest blue flame. It can be directed into many applications, but her control is less subtle than Fionn\'s.' },
      { label: 'Natural tendency', title: 'Unsafe volume', detail: 'Where Fionn relies on virtuosity and precision, Lynleit has the nerve to call forth far more flame than is safe. Force comes more readily to her than finesse.' },
      { label: 'Accidental thaumaturgy', title: 'Walking on water', detail: 'This ability was neither inherited nor taught. It manifested from her childhood fear of drowning and allows her to cross the surface of water on foot.' },
      { label: 'Strictly concealed', title: 'Night practice', detail: 'Lynleit keeps the water-walking talent secret from everyone because it crosses a boundary the Church would never accept. She practices alone at night on secluded stretches of local lakes and rivers.' },
      { label: 'First combat test', title: 'The boat beneath the bridge', detail: 'A failed nighttime infiltration forces Lynleit to rely on water walking in combat for the first time. The same calamity reveals that the suspected political plot also involves Magi.' }
    ],
    origin: 'Raised close to MSF leadership, Lynleit learns that trust must be built as carefully as any intelligence network. She inherits Fionn\'s blue-flame magecraft, while a childhood fear of drowning independently manifests as the forbidden ability to walk on water.', rupture: 'Fionn is murdered, Helena takes control, and Lynleit is framed and exiled. Under pressure, her attention turns outward: she reads the emotional field, protects shared morale, and accepts responsibility for consequences that are larger than herself.', focus: 'She can see what events are becoming with unnerving precision, yet still feels responsible for every person caught inside that future. Her blue flame answers boldness more easily than restraint, while her secret water-walking practice leaves her carrying a truth she believes the Church must never discover.', future: 'After restoring MSF, she disappears and later returns as an elusive outsider. Solitude has made her wiser and more precise, but she still refuses to explain herself, rejoin the agency, or share the secret she has protected.',
    ally: 'Kyrien', allyNote: 'Her most capable independent ally. She treats their trust as shared infrastructure, even while processing the most vulnerable parts of their bond in private.', rival: 'Helena', rivalNote: 'Her stepmother, political usurper, and the architect of an exile that attacks both Lynleit\'s identity and her legitimacy.', goal: 'Restore legitimate leadership, rebuild shared trust, and protect morale without reducing people to pieces in a strategic design.',
    beats: ['The Heir Apparent', 'The Accusation', 'A War from Exile', 'The Unexplained Return']
  },
  {
    slug: 'kyrien', name: 'Kyrien', code: 'MSF · 002', role: 'Independent operator and reluctant director', factions: ['Independent'], accent: 'amber', materialStatus: 'Canon traits + mock details',
    summary: 'An INTJ (strong Te) non-Magus tactician who survives by mapping systems, testing claims against evidence, and locating the practical failure points others overlook.',
    visual: 'Practical layers, concealed tools, and a silhouette built for movement', palette: 'Charcoal, muted amber, worn steel, off-white',
    personalitySummary: 'Kyrien processes danger by building a working model of it. At Sherie\'s covert meeting, he does not join Felix\'s protest because his attention has already turned inward, linking Drake\'s suspected conspiracy to unresolved grievances from his own past.',
    traits: [
      { label: 'Structural analysis', score: 94, note: 'He reduces conflicting testimony, motive, and institutional behavior into a system that can be tested.' },
      { label: 'Extraverted thinking', score: 91, note: 'His strong Te favors usable conclusions, operational leverage, and evidence that survives contact with reality.' },
      { label: 'Private grievance', score: 84, note: 'Personal history remains tightly controlled, but it can direct which patterns seize his attention.' }
    ],
    origin: 'Kyrien develops his value outside formal institutions by finding the failure points that trained specialists overlook.', rupture: 'The Spill pulls him into Lynleit\'s struggle. Drake\'s warning about a hidden coup gives Kyrien a possible structure for grievances he has never resolved.', focus: 'He stays silent during the illegal partnership negotiations, testing each claim while Felix protests. The boat infiltration then forces political inference into direct contact with the impossible.', future: 'He keeps MSF functional while Lynleit remains absent, unaware that she is also hiding their son from him.',
    ally: 'Lynleit', allyNote: 'A strategic partner whose trust changes the direction of his life.', rival: 'Tien', rivalNote: 'A shadow operator whose methods mirror Kyrien\'s skills without his restraint.', goal: 'Prove that judgment and preparation can lead MSF without magical power.',
    beats: ['Outside the System', 'Alliance under Pressure', 'The Director without Magic', 'The Secret Kept from Him']
  },
  {
    slug: 'helena', name: 'Helena', code: 'MSF · 003', role: 'Political usurper', factions: ['MSF'], accent: 'red',
    summary: 'A patient political operator who converts private grief and institutional uncertainty into control of MSF.',
    visual: 'Severe tailoring, immaculate posture, and an intentionally unreadable expression', palette: 'Oxblood, black, ivory, muted gold', traits: ['Composed', 'Possessive', 'Calculating'],
    origin: 'Helena learns to read MSF as a hierarchy of loyalties rather than a simple intelligence service.', rupture: 'Fionn\'s death creates the opening she needs to seize control and make Lynleit the official enemy.', focus: 'Her authority depends on keeping the accusation intact while the Spill exposes everything MSF failed to understand.', future: 'Every measure used to secure her position narrows the number of people she can still trust.',
    ally: 'Tien', allyNote: 'Her covert instrument when official authority is too visible or too slow.', rival: 'Lynleit', rivalNote: 'The displaced heir whose survival threatens Helena\'s entire political structure.', goal: 'Hold MSF long enough to make her version of events irreversible.',
    beats: ['Reading the Institution', 'The Opening', 'Control through Accusation', 'A Throne under Pressure']
  },
  {
    slug: 'tien', name: 'Tien', code: 'MSF · 004', role: 'Covert enforcer', factions: ['Independent'], accent: 'violet',
    summary: 'A concealed force used for pursuit and pressure, defined less by public allegiance than by the precision of assigned work.',
    visual: 'Low-profile fieldwear, obscured identifiers, and a deliberately forgettable outline', palette: 'Deep violet, graphite, smoke grey, black', traits: ['Silent', 'Precise', 'Relentless'],
    origin: 'Tien builds a reputation in work that is most successful when nobody can prove it happened.', rupture: 'Helena deploys Tien against Lynleit and Kyrien as MSF\'s internal conflict leaves official channels behind.', focus: 'Each successful pursuit makes it harder to tell whether Tien controls the mission or the mission controls Tien.', future: 'Kyrien becomes both an operational rival and evidence that similar skills can serve a different code.',
    ally: 'Helena', allyNote: 'The authority who provides direction, access, and political cover.', rival: 'Kyrien', rivalNote: 'A tactical counterpart who chooses independence over obedience.', goal: 'Complete the assignment without becoming disposable once it is done.',
    beats: ['Work without a Record', 'Helena\'s Shadow', 'The Counter-Operator', 'No Safe Exit']
  },
  {
    slug: 'fionn', name: 'Fionn', code: 'ARC · 005', role: 'Magiarch and MSF founder', factions: ['MSF', 'Magiarchy'], accent: 'neutral', materialStatus: 'Canon magecraft + mock details',
    summary: 'Publicly the director of MSF and secretly the country\'s Magiarch, Fionn holds two systems together until both demand him at once.',
    visual: 'Formal authority softened by practical details and an old ceremonial restraint', palette: 'Stone, black, muted blue, antique brass', traits: ['Measured', 'Secretive', 'Responsible'],
    magecraft: [
      { label: 'Hereditary magecraft', title: 'Blue flame', detail: 'Fionn carries the same lineage-bound blue flame later inherited by Lynleit. The flame is a family discipline with a broad range of applications.' },
      { label: 'Practiced method', title: 'Precision before volume', detail: 'His distinction is virtuosity. Fionn can shape the flame through subtle, controlled applications that Lynleit has not learned to reproduce.' },
      { label: 'Generational contrast', title: 'Control and force', detail: 'Fionn represents the refined expression of the lineage. Lynleit possesses less finesse, but a greater willingness to manifest the flame at an unsafe scale.' }
    ],
    origin: 'Fionn creates MSF with a public intelligence purpose and a hidden structure prepared for magical crisis. Within his family, he is also the virtuoso of a hereditary blue-flame magecraft defined by control and subtle application.', rupture: 'Political strife inside MSF distracts him when the Spill requires his duties as Magiarch.', focus: 'The secrecy protecting both offices also prevents either institution from understanding the burden carried between them. Even the magecraft Lynleit inherits from him reveals a gap between his mature control and her force-first instinct.', future: 'His murder turns unfinished plans into an inheritance that Lynleit and Kyrien must interpret without him.',
    ally: 'Lynleit', allyNote: 'His intended successor, though much of what she inherits was never fully explained.', rival: 'Internal opposition', rivalNote: 'A network of political pressure that keeps him occupied at the worst possible moment.', goal: 'Build institutions capable of surviving truths the public cannot yet know.',
    beats: ['Two Offices', 'The Hidden Purpose of MSF', 'Distracted during the Spill', 'The Inheritance after Death']
  },
  {
    slug: 'heyk', name: 'Heyk', code: 'FLD · 006', role: 'Government field operative', factions: ['Government'], accent: 'green',
    summary: 'A government operative sent into a quarantine whose official explanation becomes less credible with every step.',
    visual: 'Field equipment adapted beyond regulation and kept ready for rapid extraction', palette: 'Dark green, utility black, concrete, signal orange', traits: ['Practical', 'Suspicious', 'Decisive'],
    origin: 'Heyk trusts preparation, command structure, and the assumption that every threat has a material explanation.', rupture: 'Deployment into the quarantined park confronts him with disappearances that no conventional briefing can explain.', focus: 'He must complete the mission while deciding how much evidence can be reported without destroying his own credibility.', future: 'The extraction leaves him with a job offer and a place inside a conflict the government still cannot name.',
    ally: 'Drake', allyNote: 'A connection on the extraction line when the operation stops following its plan.', rival: 'The quarantine', rivalNote: 'An environment that refuses every ordinary model of threat and survival.', goal: 'Bring people out alive and understand what the official report cannot contain.',
    beats: ['A Conventional Operative', 'Into the Quarantine', 'The Impossible Extraction', 'The Offer after Survival']
  },
  {
    slug: 'sherie', name: 'Sherie', code: 'FLD · 007', role: 'Government operator and covert negotiator', factions: ['Government'], accent: 'blue', materialStatus: 'Canon traits + mock details',
    summary: 'A politically curious government operator who believes her uncle Drake when the Court dismisses him, then creates the illegal partnership that brings his suspicions to MSF.',
    visual: 'Compact support gear, visible communications equipment, and a clean operational silhouette', palette: 'Navy, slate, white, emergency blue', traits: ['Politically curious', 'Persuasive', 'Bold'],
    origin: 'Sherie learns to notice when formal confidence is disguising institutional complacency. Potential political games beneath the surface excite her more than she openly admits.', rupture: 'Drake\'s peers ridicule his warning and the Duke remains skeptical, leaving Sherie to propose an approach that neither government nor Court can supervise.', focus: 'She persuades her reluctant uncle to meet Lynleit and takes charge of the negotiations herself, controlling a room in which every participant understands the danger differently.', future: 'The failed boat infiltration proves that the suspected coup cannot be understood as a purely political operation.',
    ally: 'Drake', allyNote: 'Her uncle. Sherie believes his instincts when his peers do not, then pushes him toward the risk he would not choose alone.', rival: 'Official oversight', rivalNote: 'The government and Ducal Court would end the partnership if either discovered it.', goal: 'Trace the suspected coup through MSF without exposing the alliance that made the investigation possible.',
    beats: ['Her Uncle\'s Warning', 'The Secret Proposal', 'Leading the Meeting', 'What the Boat Reveals']
  },
  {
    slug: 'drake', name: 'Drake', code: 'FLD · 008', role: 'Government official and suspected-coup investigator', factions: ['Government'], accent: 'amber', materialStatus: 'Canon traits + mock details',
    summary: 'A government official convinced that a coup is growing somewhere inside Narvea, even though he cannot yet identify its source or persuade the Court that the pattern is real.',
    visual: 'Formal field attire, restrained insignia, and an immaculate profile under pressure', palette: 'Black, burgundy, silver, muted amber', traits: ['Commanding', 'Disciplined', 'Skeptical'],
    origin: 'Drake advances by treating state stability as a structure that must be actively defended, especially when fragmented evidence suggests coordinated intent.', rupture: 'He reads the park disappearances as cover for illegal material movement, but his peers ridicule the theory and the Duke remains skeptical.', focus: 'After formal authority leaves him isolated, he accepts Sherie\'s proposal for an illegal meeting with Lynleit and requests an MSF investigation outside government and Court supervision.', future: 'The failed boat infiltration opens his investigation toward a hidden force that political analysis alone cannot contain.',
    ally: 'Sherie', allyNote: 'His niece, first believer, and the negotiator who turns his private suspicion into an actionable alliance.', rival: 'Court skepticism', rivalNote: 'Ridicule from his peers and doubt from the Duke leave him choosing between obedience and the threat he believes they cannot see.', goal: 'Locate the coup network and determine whether the disappearances and covert material transfers belong to the same operation.',
    beats: ['A Coup without a Source', 'Ridiculed at Court', 'The Illegal Partnership', 'The Boat below the Bridge']
  },
  {
    slug: 'felix', name: 'Felix', code: 'ARC · 009', role: 'MSF specialist', factions: ['MSF'], accent: 'neutral',
    summary: 'A provisional MSF specialist whose ordinary assignment becomes a test of what loyalty means after the agency fractures.',
    visual: 'Loose fieldwear, fast movement, and one bright accent against neutral equipment', palette: 'Grey, black, bright blue, rust orange', traits: ['Energetic', 'Direct', 'Loyal'],
    origin: 'Felix joins MSF expecting clear missions, internal competence, and leaders who understand the full picture.', rupture: 'Fionn\'s death and Lynleit\'s accusation divide the agency before Felix can decide which version of MSF is real.', focus: 'He openly protests the illegal partnership proposed by Drake and Sherie, yet follows Lynleit into an intelligence raid whose political premise collapses into supernatural danger.', future: 'The smaller post-Spill agency offers him a chance to choose its purpose instead of merely inheriting it.',
    ally: 'Reiner', allyNote: 'A fellow MSF member who provides a second reading of every official order.', rival: 'The fractured chain of command', rivalNote: 'Competing authorities that each demand complete loyalty.', goal: 'Find a version of MSF whose mission deserves the people serving it.',
    beats: ['Joining the Roster', 'Orders after Fionn', 'Choosing Whom to Trust', 'Building the Smaller MSF']
  },
  {
    slug: 'reiner', name: 'Reiner', code: 'ARC · 010', role: 'MSF analyst', factions: ['MSF'], accent: 'neutral',
    summary: 'A provisional analyst who notices the pattern behind the Spill before he understands the world capable of producing it.',
    visual: 'Layered office-field clothing, annotated tools, and a deliberately understated presence', palette: 'Graphite, ash, muted teal, paper white', traits: ['Analytical', 'Patient', 'Cautious'],
    origin: 'Reiner earns trust by finding relationships inside information that other people dismiss as noise.', rupture: 'The disappearances produce a pattern that is statistically clear and institutionally impossible.', focus: 'He must act on conclusions he cannot yet explain without exposing himself as unreliable.', future: 'Learning that magic exists turns his analytical discipline into one of the rebuilt MSF\'s most useful safeguards.',
    ally: 'Felix', allyNote: 'A field-minded colleague who tests analysis against immediate reality.', rival: 'Incomplete evidence', rivalNote: 'The gap between what the pattern proves and what the institution will accept.', goal: 'Construct an explanation strong enough to survive contact with the impossible.',
    beats: ['The Quiet Analyst', 'A Pattern of Vanishings', 'Evidence without a Theory', 'Learning the Hidden Rules']
  },
  {
    slug: 'yulia', name: 'Yulia', code: 'ARC · 011', role: 'Independent witness', factions: ['Independent'], accent: 'neutral',
    summary: 'An independent figure whose personal encounter with the Spill makes official silence impossible to accept.',
    visual: 'Civilian layers, a strong color accent, and keepsakes treated as practical equipment', palette: 'Cream, charcoal, muted red, pale gold', traits: ['Empathetic', 'Persistent', 'Defiant'],
    origin: 'Yulia lives outside the institutions that quietly shape the hidden world and expects answers from visible authorities.', rupture: 'A disappearance connected to the park gives her a reason to challenge the quarantine\'s official story.', focus: 'Every useful answer requires trusting people who admit less than they clearly know.', future: 'Her refusal to forget makes her both a liability to secrecy and a potential ally to those resisting it.',
    ally: 'Hiyu', allyNote: 'Another independent voice willing to follow questions beyond official boundaries.', rival: 'The official story', rivalNote: 'A carefully maintained explanation that treats missing people as an administrative problem.', goal: 'Recover the truth that institutions have decided is safer to erase.',
    beats: ['Life outside the Archive', 'Someone Goes Missing', 'Against the Quarantine Story', 'A Witness Who Remembers']
  },
  {
    slug: 'hiyu', name: 'Hiyu', code: 'ARC · 012', role: 'Independent researcher', factions: ['Independent'], accent: 'neutral',
    summary: 'A curious independent researcher who approaches the hidden world through fragments, rumors, and details that should not align.',
    visual: 'Soft civilian clothing mixed with portable research tools and improvised storage', palette: 'Black, soft blue, warm grey, white', traits: ['Curious', 'Inventive', 'Restless'],
    origin: 'Hiyu collects discarded explanations and learns that the same impossible details recur in unrelated stories.', rupture: 'The park quarantine brings several of those fragments together in one visible place.', focus: 'Getting close enough to prove the theory also means becoming visible to the organizations maintaining secrecy.', future: 'The rebuilt MSF may need Hiyu\'s questions even when its leaders dislike where those questions lead.',
    ally: 'Yulia', allyNote: 'A grounded witness who gives personal weight to Hiyu\'s scattered evidence.', rival: 'Secrecy doctrine', rivalNote: 'A system designed to isolate exactly the fragments Hiyu keeps connecting.', goal: 'Turn rumor into a map of the hidden structure behind ordinary life.',
    beats: ['Collecting Impossibilities', 'The Park Connects Them', 'Too Close to the Hidden World', 'A Researcher MSF Cannot Ignore']
  },
  {
    slug: 'natalia', name: 'Natalia', code: 'ARC · 013', role: 'Private investigator and hidden Magiarchy contact', factions: ['Private Eye', 'Magiarchy'], accent: 'neutral',
    summary: 'A private investigator who can cross between ordinary cases and Magiarchy knowledge without fully belonging to either world.',
    visual: 'Professional citywear, compact case tools, and magical details hidden in plain sight', palette: 'Black, wine red, parchment, muted violet', traits: ['Perceptive', 'Dry-witted', 'Private'],
    origin: 'Natalia learns that clients rarely understand the real shape of the problem they are paying her to solve.', rupture: 'A missing-person trail touches the Spill and forces her Magiarchy knowledge into an ordinary investigation.', focus: 'Solving the case requires revealing enough truth to help without exposing the system she is expected to protect.', future: 'Her independence makes her useful to Lynleit, but also difficult for either MSF or the Magiarchy to control.',
    ally: 'Lester', allyNote: 'Her agency connection to the practical details and consequences of each case.', rival: 'Selective truth', rivalNote: 'The habit of every faction to disclose only what serves its immediate need.', goal: 'Deliver an answer that helps the client rather than merely protecting the hidden order.',
    beats: ['Cases with Missing Pieces', 'The Spill Enters the File', 'Two Kinds of Secrecy', 'An Investigator between Factions']
  },
  {
    slug: 'lester', name: 'Lester', code: 'ARC · 014', role: 'Private eye agency partner', factions: ['Private Eye'], accent: 'neutral',
    summary: 'A grounded investigator who notices the human cost when Natalia\'s cases begin crossing into a world he was never meant to see.',
    visual: 'Weathered professional clothing, paper records, and dependable analogue tools', palette: 'Brown, charcoal, cream, faded green', traits: ['Grounded', 'Patient', 'Protective'],
    origin: 'Lester builds cases from ordinary motives, physical evidence, and the assumption that people remain understandable.', rupture: 'Natalia\'s Spill investigation produces gaps that no ordinary suspect or conspiracy can explain.', focus: 'He must decide whether trusting Natalia means accepting a truth she still refuses to state directly.', future: 'Once he sees enough of the hidden world, returning to ordinary private work may no longer be possible.',
    ally: 'Natalia', allyNote: 'His closest professional connection and the person withholding the case\'s impossible context.', rival: 'The missing context', rivalNote: 'Evidence deliberately stripped of the facts needed to understand it.', goal: 'Protect the people inside the case, even when the institutions only protect the secret.',
    beats: ['Ordinary Cases', 'A Partner with Another Life', 'Evidence That Cannot Fit', 'Past the Point of Ignorance']
  },
  {
    slug: 'myka', name: 'Myka', code: 'ARC · 015', role: 'Magic Academy student', factions: ['Magic Academy', 'Magiarchy'], accent: 'neutral',
    summary: 'A young Magus learning controlled theory while the Spill demonstrates how quickly every lesson can become inadequate.',
    visual: 'Academic uniform elements, experimental accessories, and an expressive magical silhouette', palette: 'Indigo, cream, pale cyan, black', traits: ['Gifted', 'Earnest', 'Impulsive'],
    origin: 'Myka enters the Academy believing disciplined knowledge can make dangerous ability understandable.', rupture: 'The Spill turns distant doctrine into an immediate threat affecting people outside protected magical society.', focus: 'Talent creates pressure to act before training has taught the restraint that action requires.', future: 'Protecting a surviving clue ties Myka to Natalia and a conflict far beyond the Academy\'s controlled exercises.',
    ally: 'Natalia', allyNote: 'An experienced Magiarchy contact who treats theory as something with human consequences.', rival: 'Inexperience', rivalNote: 'The distance between understanding a rule and surviving its failure.', goal: 'Become useful without mistaking raw ability for readiness.',
    beats: ['Learning the Structure', 'Theory Meets the Spill', 'A Clue Worth Protecting', 'Beyond the Academy Walls']
  },
  {
    slug: 'inspector-leo', name: 'Inspector Leo', code: 'PLC · 016', role: 'Police inspector', factions: ['Police'], accent: 'blue',
    summary: 'A police inspector whose missing-person investigation reaches the edge of a quarantine controlled by authorities above his clearance.',
    visual: 'Practical detective clothing, worn notebook, and restrained police identifiers', palette: 'Navy, grey, white, signal blue', traits: ['Tenacious', 'Procedural', 'Skeptical'],
    origin: 'Leo trusts patient interviews and the belief that every disappearance leaves a human trail.', rupture: 'Searchers vanish after entering the park, then the case is removed from police control under a government quarantine.', focus: 'Following procedure now means abandoning the investigation, while continuing it means challenging his own institution.', future: 'The Church and MSF each know more than they admit, leaving Leo to investigate the people controlling the answers.',
    ally: 'Natalia', allyNote: 'An investigator with access to details that never enter police records.', rival: 'Jurisdiction', rivalNote: 'The official boundary used to separate him from the people he is responsible for finding.', goal: 'Account for every missing person, regardless of who classified the reason.',
    beats: ['The Missing-Person Desk', 'Searchers Vanish Too', 'Locked outside the Quarantine', 'Investigating the Authorities']
  },
  {
    slug: 'father-mikhail', name: 'Father Mikhail', code: 'CHR · 017', role: 'Church representative', factions: ['The Church'], accent: 'neutral',
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
  let moved = false;

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
    moved = false;
    track.setPointerCapture(event.pointerId);
    track.classList.add('is-dragging');
  });
  track.addEventListener('pointermove', (event) => {
    if (event.pointerId !== pointerId) return;
    if (Math.abs(event.clientX - startX) > 4) moved = true;
    event.preventDefault();
    track.scrollLeft = startScroll - (event.clientX - startX);
  });
  track.addEventListener('pointerup', finish);
  track.addEventListener('pointercancel', finish);
  track.addEventListener('lostpointercapture', () => {
    track.classList.remove('is-dragging');
    pointerId = null;
  });
  track.addEventListener('click', (event) => {
    if (!moved) return;
    event.preventDefault();
    moved = false;
  }, true);
}

function wildcardPattern(pattern) {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(`^${escaped}$`, 'i');
}

async function loadProfilePortrait(profile, portrait, note) {
  const placeholder = createElement('div', 'profile-portrait-placeholder', profile.name.split(' ').map((part) => part[0]).join(''));
  placeholder.setAttribute('role', 'img');
  placeholder.setAttribute('aria-label', `Artwork placeholder for ${profile.name}`);
  portrait.append(placeholder, note);

  try {
    const response = await fetch('gallery.html', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Gallery catalog returned ${response.status}`);

    const galleryDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
    const filePattern = wildcardPattern(`char-*${profile.slug}*-*`);
    const artworks = Array.from(galleryDocument.querySelectorAll('.gallery-card'))
      .filter((card) => (card.dataset.character ?? '').split(/\s+/).includes(profile.slug) && card.dataset.chibi === 'false')
      .map((card) => card.querySelector('img'))
      .filter((image) => {
        const source = image?.getAttribute('src') ?? '';
        const fileName = source.split('/').pop() ?? '';
        return source.includes('/characters/') && filePattern.test(fileName);
      });

    if (!artworks.length) return;

    let selectedIndex = 0;
    if (artworks.length > 1) {
      const rotationKey = `magiarchy-profile-portrait-${profile.slug}`;
      const previousIndex = Number.parseInt(sessionStorage.getItem(rotationKey) ?? '-1', 10);
      selectedIndex = Number.isInteger(previousIndex) ? (previousIndex + 1) % artworks.length : 0;
      sessionStorage.setItem(rotationKey, String(selectedIndex));
    }

    const sourceImage = artworks[selectedIndex];
    const image = createElement('img');
    image.src = sourceImage.getAttribute('src');
    image.alt = `Character artwork of ${profile.name}`;
    image.width = Number(sourceImage.getAttribute('width')) || 1200;
    image.height = Number(sourceImage.getAttribute('height')) || 1200;
    image.decoding = 'async';

    note.textContent = artworks.length > 1
      ? `Gallery portrait ${selectedIndex + 1} of ${artworks.length}`
      : 'Gallery portrait';
    portrait.replaceChildren(image, note);
  } catch (error) {
    console.warn(`Could not load gallery portrait for ${profile.name}.`, error);
  }
}

async function loadCharacterMoments(profile, timeline) {
  try {
    const response = await fetch('moments/index.json');
    if (!response.ok) throw new Error(`Moment catalog request failed: ${response.status}`);
    const entries = await response.json();
    const related = entries.filter((entry) => entry.characterAnchors.some((anchor) => anchor.slug === profile.slug));
    if (!related.length) return;

    const section = document.querySelector('#character-moments-section');
    const grid = document.querySelector('#character-moment-grid');
    const cards = related.map((entry) => {
      const link = createElement('a', 'character-moment-card');
      link.href = `moments.html?moment=${encodeURIComponent(entry.slug)}`;
      const top = createElement('div');
      top.append(createElement('span', '', entry.code), createElement('small', '', entry.timelineLabel));
      link.append(top, createElement('h3', '', entry.title), createElement('p', '', entry.summary), createElement('strong', '', 'Open Moment →'));
      return link;
    });
    grid.replaceChildren(...cards);
    section.hidden = false;

    related.forEach((entry) => {
      const anchor = entry.characterAnchors.find((candidate) => candidate.slug === profile.slug);
      const timelineItem = [...timeline.children].find((item) => item.dataset.timelineBeat === anchor?.beat);
      if (!timelineItem) return;
      let anchorList = timelineItem.querySelector('.character-timeline-moments');
      if (!anchorList) {
        anchorList = createElement('div', 'character-timeline-moments');
        timelineItem.querySelector(':scope > div').append(anchorList);
      }
      const link = createElement('a', '', `${entry.code} · ${entry.title}`);
      link.href = `moments.html?moment=${encodeURIComponent(entry.slug)}`;
      anchorList.append(link);
      timelineItem.classList.add('has-moments');
    });
  } catch (error) {
    console.warn(`Moments could not be connected to ${profile.name}.`, error);
  }
}

function renderProfile(profile) {
  document.title = `${profile.name} - Characters - Magiarchy`;
  document.querySelector('#character-crumb').textContent = profile.name;
  document.querySelector('#character-profile-code').textContent = profile.code;
  document.querySelector('#character-profile-material').textContent = profile.materialStatus ?? 'Mock profile material';
  document.querySelector('#character-profile-role').textContent = profile.role;
  document.querySelector('#character-profile-name').textContent = profile.name;
  document.querySelector('#character-profile-summary').textContent = profile.summary;

  const portrait = document.querySelector('#character-profile-portrait');
  portrait.classList.add(`profile-accent-${profile.accent}`);
  const portraitNote = createElement('span', 'profile-portrait-note', 'Artwork pending');
  loadProfilePortrait(profile, portrait, portraitNote);

  const factions = document.querySelector('#character-profile-factions');
  profile.factions.forEach((faction) => factions.append(createElement('span', `profile-badge ${factionClass(faction)}`, faction)));

  const timeline = document.querySelector('#character-timeline');
  const timelineDetails = [profile.origin, profile.rupture, profile.focus, profile.future];
  profile.beats.forEach((title, index) => {
    const item = createElement('li');
    item.dataset.timelineBeat = title;
    item.append(createElement('span', 'character-timeline-marker', String(index + 1).padStart(2, '0')));
    const copy = createElement('div');
    copy.append(createElement('small', '', ['Foundation', 'Rupture', 'Central struggle', 'Unresolved future'][index]));
    copy.append(createElement('h3', '', title));
    copy.append(createElement('p', '', timelineDetails[index]));
    item.append(copy);
    timeline.append(item);
  });
  initializeProfileTimelineDrag(timeline);
  loadCharacterMoments(profile, timeline);

  const appearance = document.querySelector('#character-appearance');
  [
    ['Visual direction', profile.visual], ['Palette', profile.palette], ['Silhouette', `Mock design language shaped around ${profile.role.toLowerCase()}.`], ['Status', 'Provisional until final appearance notes are supplied.']
  ].forEach(([term, detail]) => {
    appearance.append(createElement('dt', '', term), createElement('dd', '', detail));
  });

  const personality = document.querySelector('#character-personality');
  if (profile.personalitySummary) personality.append(createElement('p', 'personality-summary', profile.personalitySummary));
  const scores = [84, 72, 78];
  profile.traits.forEach((trait, index) => {
    const traitData = typeof trait === 'string' ? { label: trait, score: scores[index] } : trait;
    const row = createElement('div', 'personality-row');
    const label = createElement('div');
    label.append(createElement('strong', '', traitData.label), createElement('span', '', `${traitData.score} / 100`));
    const meter = createElement('span', 'personality-meter');
    const fill = createElement('i');
    fill.style.width = `${traitData.score}%`;
    meter.append(fill);
    row.append(label, meter);
    if (traitData.note) row.append(createElement('p', '', traitData.note));
    personality.append(row);
  });

  const magecraftSection = document.querySelector('#character-magecraft-section');
  const magecraft = document.querySelector('#character-magecraft');
  if (profile.magecraft?.length) {
    profile.magecraft.forEach((entry, index) => {
      const card = createElement('article', 'magecraft-card');
      card.append(createElement('span', 'magecraft-index', String(index + 1).padStart(2, '0')));
      const copy = createElement('div');
      copy.append(createElement('small', '', entry.label), createElement('h3', '', entry.title), createElement('p', '', entry.detail));
      card.append(copy);
      magecraft.append(card);
    });
    magecraftSection.hidden = false;
  }

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
