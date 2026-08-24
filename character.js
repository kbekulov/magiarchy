const profileSeeds = [
  {
    slug: 'lynleit', name: 'Lynleit', code: 'MSF · 001', role: 'Fionn\'s biological daughter and displaced heir', factions: ['MSF', 'Magiarchy'], accent: 'blue', materialStatus: 'Canon traits + mock details',
    summary: 'Fionn\'s biological daughter and Helena\'s stepdaughter, Lynleit is an ENFJ (strong Ni) leader whose people-first instinct is sharpened by unusually strong long-range intuition.',
    visual: 'Long dark hair, a blue coat or jacket carrying MSF command meaning, controlled magical light, and a composed warmth held deliberately in reserve', palette: 'Midnight blue, black, silver, cold cyan', appearanceNote: 'Her blue outerwear is an encrypted MSF authority signal devised by Fionn and understood by top officers. It identifies her as genuine command in a crowd without requiring an overt exchange.',
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
    origin: 'Lynleit is Fionn\'s biological daughter and intended heir. Helena is her stepmother, not her biological mother. Raised close to MSF leadership, Lynleit inherits Fionn\'s blue-flame magecraft, while a childhood fear of drowning independently manifests as the forbidden ability to walk on water.', rupture: 'Fionn is assassinated by an actor or coalition concealed beneath manufactured political strife. His wife Helena takes control, frames her stepdaughter Lynleit for his death, and drives her into exile. Under pressure, Lynleit turns outward to protect shared morale and accept responsibility for consequences larger than herself.', focus: 'Clearing her name requires separating Helena\'s visible seizure of MSF from the unresolved authorship of Fionn\'s assassination. Criminal Magi, foreign Magiarchates, church actors, or a coalition remain plausible. Her blue flame answers boldness more easily than restraint, while her secret water-walking practice leaves her carrying a truth she believes the Church must never discover.', future: 'After restoring MSF, she disappears and later returns as an elusive outsider. Solitude has made her wiser and more precise, but she still refuses to explain herself, rejoin the agency, or share the secret she has protected.',
    ally: 'Kyrien', allyNote: 'Their connection begins as coercion. Lynleit keeps him out of prison in exchange for secret service, intending to use him as an unregistered trump card against Helena. Only later can that arrangement develop into genuine strategic trust.', rival: 'Helena', rivalNote: 'Lynleit already suspects her stepmother, Fionn\'s wife, of being an enemy before Helena openly takes MSF and makes Lynleit the target.', goal: 'Keep Kyrien hidden as leverage against Helena, then restore legitimate leadership and unravel the magical conspiracy without reducing every person to a strategic piece.',
    beats: ['The Heir Apparent', 'The Accusation', 'A War from Exile', 'The Unexplained Return']
  },
  {
    slug: 'kyrien', name: 'Kyrien', code: 'MSF · 002', role: 'Independent operator and reluctant director', factions: ['Independent'], accent: 'amber', materialStatus: 'Canon traits + mock details',
    summary: 'An INTJ (strong Te) non-Magus who survives deeper contact with magic by mastering the intelligence-operative disciplines that Magi are most likely to underestimate.',
    visual: 'Practical layers, concealed tools, and a silhouette built for movement', palette: 'Charcoal, muted amber, worn steel, off-white',
    personalitySummary: 'Kyrien processes danger by building a working model of it. At Sherie\'s covert meeting, he does not join Felix\'s protest because his attention has already turned inward, linking Drake\'s suspected conspiracy to unresolved grievances from his own past.',
    traits: [
      { label: 'Intelligence tradecraft', score: 97, note: 'He turns surveillance, deception, logistics, human behavior, and escape planning into a substitute for magical perception.' },
      { label: 'Strategic adaptation', score: 94, note: 'His strong Te converts unfamiliar threats into usable procedures, leverage, and decisions that survive contact with reality.' },
      { label: 'Survival discipline', score: 92, note: 'He does not try to overpower Magi. He stays difficult to locate, corner, deceive, or kill.' }
    ],
    tradecraft: [
      { label: 'Concealment', title: 'Subterfuge', detail: 'Controls what others can infer about his intent, identity, loyalties, and next movement. He survives by giving opponents a convincing answer that is not the true one.' },
      { label: 'Escape discipline', title: 'Evasion', detail: 'Breaks surveillance, avoids magical attention, plans exits before entry, and refuses confrontations whose terms were chosen by somebody else.' },
      { label: 'Misdirection', title: 'Trickery', detail: 'Uses false patterns, staged weaknesses, timing, and selective truth to make stronger opponents commit to the wrong interpretation.' },
      { label: 'Force equalizer', title: 'Firearms', detail: 'Treats firearms as precise operational tools rather than proof of parity with Magi. Their purpose is to create distance, interruption, or an escape window.' },
      { label: 'Last resort', title: 'Survival combat', detail: 'Fights to remain mobile and alive, combining practical close combat with terrain awareness instead of pursuing elegant or decisive victories.' },
      { label: 'Leadership peak', title: 'Intelligence operations', detail: 'His unofficial MSF association gives him access to surveillance, counterintelligence, field planning, and institutional command. By Lynleit\'s disappearance, this becomes the side of MSF he has mastered completely.' }
    ],
    origin: 'Kyrien develops his value outside formal institutions by finding failure points, concealing intent, and surviving situations that trained specialists approach too directly. His failed attempt to assassinate a politician ends with Lynleit interrogating him at a police office.', rupture: 'Kyrien faces prison until Lynleit offers conditional freedom: become her secret helper and remain confined to her demands. He has no practical choice. She pulls him into an unofficial MSF association because she wants a deniable trump card against Helena, whom she already suspects despite Helena being her stepmother and Fionn\'s wife.', focus: 'The coerced arrangement drags him deeper into the world of Magi. Because he cannot rely on magic, every exposure becomes pressure to master subterfuge, evasion, trickery, firearms, survival combat, and the intelligence structure MSF makes available to him.', future: 'When Lynleit disappears and leaves him directing MSF, Kyrien survives the role by reaching the peak of the intelligence-operative side of the agency. He cannot perceive magic as its Magi do, but he can organize information, people, deception, and contingencies better than anyone expected.',
    ally: 'Lynleit', allyNote: 'She begins as his handler rather than a willing partner, exchanging freedom from prison for secret obedience. The relationship only becomes an alliance after he has been forced deep into her conflict with Helena.', rival: 'Tien', rivalNote: 'A shadow operator whose methods mirror Kyrien\'s skills without his restraint, forcing him to sharpen every discipline that keeps him alive.', goal: 'Survive Lynleit\'s control, master the intelligence side of MSF, and eventually make choices inside the hidden world on terms that are genuinely his own.',
    beats: ['Outside the System', 'Alliance under Pressure', 'The Director without Magic', 'The Secret Kept from Him']
  },
  {
    slug: 'helena', name: 'Helena', code: 'MSF · 003', role: 'Political usurper', factions: ['MSF'], accent: 'red', materialStatus: 'Canon actions + mock details',
    summary: 'Fionn\'s wife and Lynleit\'s stepmother, Helena converts the vacuum after his elimination into control of MSF, then frames his biological daughter for his death.',
    visual: 'Severe tailoring, immaculate posture, and an intentionally unreadable expression', palette: 'Oxblood, black, ivory, muted gold', traits: ['Composed', 'Possessive', 'Calculating'],
    origin: 'Helena learns to read MSF as a hierarchy of loyalties rather than a simple intelligence service, but she never learns every protocol embedded by its founder.', rupture: 'Fionn\'s elimination creates the opening she needs to seize control and make Lynleit the official enemy.', focus: 'Her authority depends on keeping the accusation intact while the investigation exposes layers of conspiracy that may extend far beyond her own seizure of MSF. She does not know that blue clothing functions as a command-authentication signal among top officers, and that blind spot becomes one of her greatest mistakes.', future: 'Every measure used to secure her position narrows the number of people she can still trust. The exact consequence of missing Fionn\'s blue protocol remains unresolved.',
    ally: 'Tien', allyNote: 'Her covert instrument when official authority is too visible or too slow.', rival: 'Lynleit', rivalNote: 'Her stepdaughter, Fionn\'s biological daughter, and the displaced heir whose survival threatens Helena\'s entire political structure.', goal: 'Hold MSF long enough to make her version of events irreversible.',
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
    summary: 'Lynleit\'s biological father, publicly the director of MSF and secretly the country\'s Magiarch, Fionn faces a foreign magical conflict disguised as political chaos inside Narvea.',
    visual: 'Formal authority softened by practical details and an old ceremonial restraint', palette: 'Stone, black, muted blue, antique brass', traits: ['Measured', 'Secretive', 'Responsible'],
    magecraft: [
      { label: 'Hereditary magecraft', title: 'Blue flame', detail: 'Fionn carries the same lineage-bound blue flame later inherited by Lynleit. The flame is a family discipline with a broad range of applications.' },
      { label: 'Practiced method', title: 'Precision before volume', detail: 'His distinction is virtuosity. Fionn can shape the flame through subtle, controlled applications that Lynleit has not learned to reproduce.' },
      { label: 'Generational contrast', title: 'Control and force', detail: 'Fionn represents the refined expression of the lineage. Lynleit possesses less finesse, but a greater willingness to manifest the flame at an unsafe scale.' }
    ],
    origin: 'Fionn creates MSF with a public intelligence purpose and a hidden structure prepared for magical crisis. He also embeds cryptology into ordinary behavior, including a blue-clothing protocol through which informed officers recognize genuine command authority. Within his family, he is the virtuoso of a hereditary blue-flame magecraft defined by control and subtle application.', rupture: 'Foreign Magiarchates, church actors, and criminal Magi all remain plausible participants in the pressure built around Fionn. The manufactured strife occupies both of his offices when the Spill requires him most.', focus: 'The conspiracy remains difficult to confront because Magi shape its layers, false causes, and mortal intermediaries. The secrecy protecting Fionn\'s offices and protocols also prevents either institution from understanding the conflict carried between them.', future: 'His assassination turns unfinished plans, concealed MSF signals, and an obscured enemy network into an inheritance Lynleit and Kyrien must interpret without him. The exact author remains unresolved: criminal Magi, a foreign Magiarchate, a church faction, or some combination of them.',
    ally: 'Lynleit', allyNote: 'His biological daughter and intended successor, though much of what she inherits was never fully explained.', rival: 'Unresolved conspiracy', rivalNote: 'Criminal Magi, rival Magiarchates, church actors, or a mixed coalition may have planned, enabled, or carried out his assassination.', goal: 'Protect Narvea from a magical conflict whose participants can manufacture ordinary political reality as cover.',
    beats: ['Two Offices', 'The Hidden Purpose of MSF', 'Conflict behind the Mask', 'The Inheritance after Death']
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
    slug: 'sherie', name: 'Sherie', code: 'FLD · 007', role: 'Diplomat in training and covert negotiator', factions: ['Government'], accent: 'blue', materialStatus: 'Canon traits + mock details',
    summary: 'Drake\'s niece and diplomatic apprentice, Sherie combines his strategic instruction with the charm and quick judgment he cannot easily bring into a room himself.',
    visual: 'Compact support gear, visible communications equipment, and a clean operational silhouette', palette: 'Navy, slate, white, emergency blue', traits: ['Charming', 'Quick-minded', 'Politically curious'],
    personalitySummary: 'Sherie reads people quickly and adjusts without making the adjustment visible. Drake teaches her how institutions, leverage, and long strategy operate, while she compensates for his poor social instincts by turning difficult positions into conversations other people are willing to continue.',
    origin: 'Sherie trains under her uncle Drake to become a successful diplomat. Their age gap matters less than the complement between his strategic mind and her instinctive command of social atmosphere.', rupture: 'Drake\'s peers ridicule his warning and the Duke remains skeptical. Sherie believes her uncle, but rejects his decision to remain inside official limits and begins designing her own approach to Lynleit.', focus: 'The illegal MSF partnership is entirely Sherie\'s idea and strategy. She develops it against Drake\'s wishes, persuades him to attend, and takes command of the negotiations. In this specific diplomatic test, the student surpasses her teacher. Once it succeeds, she asks Drake to praise and pamper her for her first achievement.', future: 'The failed boat infiltration proves that the suspected coup cannot be understood as a purely political operation and gives her diplomatic training a conflict no normal protocol anticipated.',
    ally: 'Drake', allyNote: 'Her uncle, mentor, and strategic counterpart. He trains her for diplomacy, while her charm and quick mind carry them through situations his social skills cannot.', rival: 'Official oversight', rivalNote: 'The government and Ducal Court would end the partnership if either discovered it.', goal: 'Become a diplomat capable of turning Drake\'s strategic understanding into alliances, while tracing the suspected coup without exposing MSF cooperation.',
    beats: ['Diplomatic Apprenticeship', 'The Secret Proposal', 'Leading the Meeting', 'What the Boat Reveals']
  },
  {
    slug: 'drake', name: 'Drake', code: 'FLD · 008', role: 'State Councillor and suspected-coup investigator', factions: ['Government'], accent: 'amber', materialStatus: 'Canon traits + mock details',
    summary: 'The story\'s primary strategic mind, a State Councillor whose close friendship with the Duke grants rare access and occasional forgiveness while leaving him shunned at Court as the Duke\'s favorite boy.',
    visual: 'Formal field attire, restrained insignia, and an immaculate profile under pressure', palette: 'Black, burgundy, silver, muted amber', traits: ['Commanding', 'Disciplined', 'Skeptical'],
    personalitySummary: 'Drake remains the story\'s main strategic thinker before and after Sherie\'s successful negotiation. His weakness is social execution, not strategic capacity. His niece can outperform him inside a room without replacing the larger intelligence, patience, and pattern recognition that make him central to the conspiracy investigation.',
    origin: 'Drake reaches the rank of State Councillor while developing an unusually direct relationship with the Duke. He also begins training his niece Sherie for diplomacy, passing on institutional strategy while relying on her to understand the social terrain he routinely mishandles.', rupture: 'He reads the park disappearances as cover for illegal material movement, but his peers ridicule the theory and the Duke remains skeptical. The Court\'s existing resentment makes his warning easier to dismiss as another indulgence granted to a favorite.', focus: 'Drake opposes Sherie\'s illegal approach to Lynleit and does not design its strategy. His apprentice develops the plan, overcomes his resistance, and leads the negotiations herself. Even after it succeeds and Sherie demands praise and pampering, Drake still cannot decide whether the new alliance is an advantage or a serious mistake.', future: 'The failed boat infiltration opens his investigation toward a hidden force that political analysis alone cannot contain. Sherie\'s achievement expands his available options without displacing him as the story\'s primary strategic mind.',
    ally: 'Sherie', allyNote: 'His niece, diplomatic apprentice, first believer, and social counterpart. Her charm gives his strategic thinking a form other people can trust.', rival: 'The Ducal Court', rivalNote: 'Courtiers shun him as the Duke\'s favorite boy, convinced that friendship protects him from consequences they would be forced to bear.', goal: 'Locate the coup network, prepare Sherie for state diplomacy, and justify the Duke\'s trust without allowing friendship to become cover for his mistakes.',
    beats: ['A Coup without a Source', 'The Favorite Boy', 'The Illegal Partnership', 'The Boat below the Bridge']
  },
  {
    slug: 'felix', name: 'Felix', code: 'ARC · 009', role: 'MSF specialist', factions: ['MSF'], accent: 'neutral',
    summary: 'A provisional MSF specialist whose ordinary assignment becomes a test of what loyalty means after the agency fractures.',
    visual: 'Loose fieldwear, fast movement, and one bright accent against neutral equipment', palette: 'Grey, black, bright blue, rust orange', traits: ['Energetic', 'Direct', 'Loyal'],
    origin: 'Felix joins MSF expecting clear missions, internal competence, and leaders who understand the full picture.', rupture: 'Fionn\'s death and Lynleit\'s accusation divide the agency before Felix can decide which version of MSF is real.', focus: 'He openly protests the illegal partnership designed by Sherie despite Drake\'s own objections, yet follows Lynleit into an intelligence raid whose political premise collapses into supernatural danger.', future: 'The smaller post-Spill agency offers him a chance to choose its purpose instead of merely inheriting it.',
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

const skillAxes = [
  { key: 'analysis', label: 'Analysis' },
  { key: 'influence', label: 'Influence' },
  { key: 'awareness', label: 'Awareness' },
  { key: 'fieldcraft', label: 'Fieldcraft' },
  { key: 'combat', label: 'Combat' },
  { key: 'magic', label: 'Magic' }
];

const skillProfiles = {
  lynleit: { analysis: 92, influence: 94, awareness: 88, fieldcraft: 65, combat: 76, magic: 82 },
  kyrien: { analysis: 95, influence: 48, awareness: 91, fieldcraft: 98, combat: 87, magic: 0 },
  helena: { analysis: 88, influence: 92, awareness: 84, fieldcraft: 45, combat: 38, magic: 0 },
  tien: { analysis: 82, influence: 36, awareness: 90, fieldcraft: 96, combat: 94, magic: 0 },
  fionn: { analysis: 98, influence: 80, awareness: 96, fieldcraft: 72, combat: 85, magic: 98 },
  heyk: { analysis: 72, influence: 55, awareness: 82, fieldcraft: 90, combat: 88, magic: 0 },
  sherie: { analysis: 82, influence: 96, awareness: 88, fieldcraft: 54, combat: 35, magic: 0 },
  drake: { analysis: 98, influence: 42, awareness: 91, fieldcraft: 62, combat: 55, magic: 0 },
  felix: { analysis: 65, influence: 78, awareness: 72, fieldcraft: 82, combat: 84, magic: 0 },
  reiner: { analysis: 94, influence: 55, awareness: 92, fieldcraft: 58, combat: 40, magic: 0 },
  yulia: { analysis: 62, influence: 80, awareness: 72, fieldcraft: 35, combat: 28, magic: 0 },
  hiyu: { analysis: 90, influence: 65, awareness: 92, fieldcraft: 52, combat: 30, magic: 0 },
  natalia: { analysis: 90, influence: 78, awareness: 94, fieldcraft: 86, combat: 68, magic: 68 },
  lester: { analysis: 80, influence: 70, awareness: 84, fieldcraft: 68, combat: 55, magic: 0 },
  myka: { analysis: 75, influence: 70, awareness: 76, fieldcraft: 40, combat: 35, magic: 90 },
  'inspector-leo': { analysis: 84, influence: 65, awareness: 90, fieldcraft: 76, combat: 70, magic: 0 },
  'father-mikhail': { analysis: 86, influence: 82, awareness: 84, fieldcraft: 52, combat: 45, magic: 0 }
};

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createSvgElement(tagName, attributes = {}) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return element;
}

function radarPoint(index, value, radius = 100) {
  const angle = (-90 + (index * 60)) * (Math.PI / 180);
  const scaledRadius = radius * (value / 100);
  return {
    x: 180 + (Math.cos(angle) * scaledRadius),
    y: 145 + (Math.sin(angle) * scaledRadius)
  };
}

function radarPoints(values, radius = 100) {
  return values.map((value, index) => {
    const point = radarPoint(index, value, radius);
    return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
  }).join(' ');
}

function renderSkillGraph(profile, container) {
  const scoreMap = skillProfiles[profile.slug] ?? Object.fromEntries(skillAxes.map((axis) => [axis.key, 50]));
  const values = skillAxes.map((axis) => scoreMap[axis.key]);
  const ranked = skillAxes.map((axis, index) => ({ ...axis, value: values[index] })).sort((a, b) => b.value - a.value);
  const strongest = ranked[0];
  const weakest = ranked[ranked.length - 1];

  const layout = createElement('div', `skill-graph-layout skill-accent-${profile.accent}`);
  const figure = createElement('figure', 'skill-radar-figure');
  const svg = createSvgElement('svg', {
    class: 'skill-radar',
    viewBox: '0 0 360 300',
    role: 'img',
    'aria-label': `${profile.name} capability graph. Strongest: ${strongest.label}, ${strongest.value} out of 100. Weakest: ${weakest.label}, ${weakest.value} out of 100.`
  });
  const title = createSvgElement('title');
  title.textContent = `${profile.name} strengths and weaknesses`;
  svg.append(title);

  [25, 50, 75, 100].forEach((level) => {
    svg.append(createSvgElement('polygon', { class: 'skill-radar-grid', points: radarPoints(skillAxes.map(() => level)) }));
  });

  skillAxes.forEach((axis, index) => {
    const outer = radarPoint(index, 100);
    const labelPoint = radarPoint(index, 126);
    svg.append(createSvgElement('line', { class: 'skill-radar-axis', x1: 180, y1: 145, x2: outer.x, y2: outer.y }));
    const label = createSvgElement('text', {
      class: 'skill-radar-label',
      x: labelPoint.x,
      y: labelPoint.y,
      'text-anchor': labelPoint.x < 170 ? 'end' : labelPoint.x > 190 ? 'start' : 'middle',
      'dominant-baseline': 'middle'
    });
    label.textContent = axis.label;
    svg.append(label);
  });

  svg.append(createSvgElement('polygon', { class: 'skill-radar-shape', points: radarPoints(values) }));
  values.forEach((value, index) => {
    const point = radarPoint(index, value);
    svg.append(createSvgElement('circle', { class: 'skill-radar-point', cx: point.x, cy: point.y, r: 3.5 }));
  });

  const caption = createElement('figcaption', '', 'Every profile uses the same axes and 0 to 100 scale. Values remain provisional until confirmed.');
  figure.append(svg, caption);

  const ledger = createElement('div', 'skill-graph-ledger');
  const comparison = createElement('div', 'skill-graph-extremes');
  const strength = createElement('article', 'skill-extreme skill-extreme-strong');
  strength.append(createElement('small', '', 'Strongest axis'), createElement('strong', '', strongest.label), createElement('span', '', `${strongest.value} / 100`));
  const weakness = createElement('article', 'skill-extreme skill-extreme-weak');
  weakness.append(createElement('small', '', 'Weakest axis'), createElement('strong', '', weakest.label), createElement('span', '', `${weakest.value} / 100`));
  comparison.append(strength, weakness);

  const valuesList = createElement('dl', 'skill-value-list');
  skillAxes.forEach((axis, index) => {
    valuesList.append(createElement('dt', '', axis.label), createElement('dd', '', `${values[index]} / 100`));
  });
  ledger.append(comparison, valuesList);
  layout.append(figure, ledger);
  container.append(layout);
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
  const appearanceDetails = [
    ['Visual direction', profile.visual],
    ['Palette', profile.palette]
  ];
  if (profile.appearanceNote) appearanceDetails.push(['Operational meaning', profile.appearanceNote]);
  appearanceDetails.push(
    ['Silhouette', `Mock design language shaped around ${profile.role.toLowerCase()}.`],
    ['Status', 'Provisional until final appearance notes are supplied.']
  );
  appearanceDetails.forEach(([term, detail]) => {
    appearance.append(createElement('dt', '', term), createElement('dd', '', detail));
  });

  const personality = document.querySelector('#character-personality');
  if (profile.personalitySummary) personality.append(createElement('p', 'personality-summary', profile.personalitySummary));
  renderSkillGraph(profile, personality);
  const traitNotes = createElement('div', 'personality-notes');
  traitNotes.append(createElement('strong', '', 'Character-specific notes'));
  const notesGrid = createElement('div');
  profile.traits.forEach((trait) => {
    const traitData = typeof trait === 'string' ? { label: trait } : trait;
    const note = createElement('article');
    note.append(createElement('h3', '', traitData.label));
    if (traitData.note) note.append(createElement('p', '', traitData.note));
    notesGrid.append(note);
  });
  traitNotes.append(notesGrid);
  personality.append(traitNotes);

  const tradecraftSection = document.querySelector('#character-tradecraft-section');
  const tradecraft = document.querySelector('#character-tradecraft');
  if (profile.tradecraft?.length) {
    profile.tradecraft.forEach((entry, index) => {
      const card = createElement('article', 'tradecraft-card');
      card.append(createElement('span', 'tradecraft-index', String(index + 1).padStart(2, '0')));
      const copy = createElement('div');
      copy.append(createElement('small', '', entry.label), createElement('h3', '', entry.title), createElement('p', '', entry.detail));
      card.append(copy);
      tradecraft.append(card);
    });
    tradecraftSection.hidden = false;
  }

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

  document.querySelectorAll('.character-profile-sections .profile-section:not([hidden])').forEach((section, index) => {
    const number = section.querySelector(':scope > header > span');
    if (number) number.textContent = String(index + 1).padStart(2, '0');
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
