const profileSeeds = [
  {
    slug: 'lynleit', name: 'Lynleit', code: 'MSF · 001', role: 'Fionn\'s biological daughter and displaced heir', ageBand: 'Late twenties', factions: ['MSF', 'Magiarchy'], accent: 'blue', materialStatus: 'Canon traits + mock details',
    summary: 'Fionn\'s biological daughter and Helena\'s stepdaughter, Lynleit is an ENFJ (strong Ni) leader whose people-first instinct is sharpened by unusually strong long-range intuition.',
    visual: 'A long tailored blue coat over a pale high-collared blouse with a narrow black ribbon, paired with high-waisted black shorts, dark tights, and tall black lace-up boots', palette: 'Midnight blue, black, white, cold cyan',
    appearanceDetails: [
      ['Signature silhouette', 'Long structured outerwear frames a compact, practical lower silhouette. The contrast between formal tailoring and movement-ready shorts and boots is the recognizable core of her wardrobe.'],
      ['Variation rule', 'Other outfits may change the coat length, layers, or degree of formality, but usually preserve a blue tailored outer layer, a pale blouse, restrained black detailing, and tall practical footwear.']
    ],
    personalitySummary: 'Lynleit can read hidden structures with an inward precision that resembles an INFJ, but priority defines her. When pressure becomes real, she moves toward people, assumes responsibility, and measures strategy by its human consequences. Her warmth is deliberate and structurally aware rather than exuberant.',
    traits: [
      { label: 'Relational leadership', score: 95, note: 'Her first instinct in crisis is to read trust, morale, legitimacy, shared burden, and the emotional field around her.' },
      { label: 'Strategic foresight', score: 92, note: 'Her unusually strong intuition identifies long-range patterns and what events are becoming before most people can name the change.' },
      { label: 'Private introspection', score: 86, note: 'In private she is comfortable disappearing into solitude, following symbolic threads, and processing difficult emotion internally.' }
    ],
    magecraft: [
      { label: 'Hereditary magecraft', title: 'Blue flame', detail: 'Lynleit inherited her family\'s ability to manifest blue flame. It can be directed into many applications, but her control is less subtle than Fionn\'s.' },
      { label: 'Natural tendency', title: 'Unsafe volume', detail: 'Where Fionn relies on virtuosity and precision, Lynleit has the nerve to call forth far more flame than is safe. Force comes more readily to her than finesse.' },
      { label: 'Accidental miracle-making', title: 'Walking on water', detail: 'This ability was neither inherited nor taught. It manifested from her childhood fear of drowning and allows her to cross the surface of water on foot. Its resemblance to a sacred miracle places it outside tolerated magecraft.' },
      { label: 'Strictly concealed', title: 'Night practice', detail: 'Lynleit keeps the talent secret from everyone because the Church strongly punishes miracle-making that imitates acts associated with Jesus, saints, saviours, and other sacred figures, even when the effect seems harmless. She practices alone at night on secluded stretches of local lakes and rivers.' }
    ],
    origin: 'Lynleit is Fionn\'s biological daughter and intended heir. Helena is her stepmother, not her biological mother. Raised close to MSF leadership, Lynleit inherits Fionn\'s blue-flame magecraft, while a childhood fear of drowning independently manifests as the forbidden ability to walk on water. Felix and Reiner are already her close, long-standing friends before the story begins, as well as the personal bodyguards Fionn trusts with her safety. Her relationship with Helena is always tense, and daughterly intuition, suspicious incidents, and the sense that Helena never truly loves Fionn make Lynleit distrust her early. Within the first few chapters, she senses a near-future danger she cannot yet prove and recruits Kyrien as her first deeply anti-protocol MSF decision. She eventually limits the truth to Felix and Reiner without informing even Fionn.', rupture: 'Much later, Fionn is assassinated through a still-unresolved conspiracy in which Helena plays a major role. The event vindicates Lynleit\'s warning without implying that she foresaw its exact form. Helena takes control, frames her stepdaughter Lynleit for his death, and drives her into exile. Lynleit continues wearing Fionn\'s blue authority signal while on the run, allowing informed officers to recognize an unbroken claim Helena does not understand.', focus: 'During the failed river operation, only Kyrien sees her walk on water. They reach the night park drenched and breathless, then sit with their backs pressed together to share body heat. Lynleit indirectly asks whether he saw anything strange, but his careful denial protects her secret and becomes the first trigger in their slowly developing intimacy. Much later, only after Fionn\'s murder, his hotel room becomes a place of non-sexual emotional refuge.', future: 'Their relationship becomes sexual only at the end of the first arc, after intimacy has accumulated slowly through functional care, danger, and trust. Pregnancy and disappearance follow. After restoring a smaller MSF around the unfinished Spill, Lynleit vanishes to protect the pregnancy, deliver the child beyond the conflict\'s reach, recover, and consult wiser people about the Spill\'s origins. Years later she does not announce a return. She appears around MSF missions, sometimes seemingly by accident and sometimes by design, and her unexplained presence can make her look like a culprit.',
    ally: 'Kyrien', allyNote: 'Their connection begins as coercion and a calculated information imbalance against Helena. Only Felix and Reiner know Lynleit has brought him into her circle, while even Fionn remains uninformed. Kyrien\'s silent protection of her water-walking secret and their back-to-back recovery after the river incident create the first intimate threshold. The hotel-room refuge after Fionn\'s murder comes much later, and the relationship remains non-sexual until the end of the first arc.', rival: 'Helena', rivalNote: 'Lynleit distrusts her stepmother before the takeover, then learns Helena played a major role in Fionn\'s assassination even though the full conspiracy remains unclear.', goal: 'Keep Kyrien hidden as leverage against Helena, restore legitimate leadership, protect their child, and investigate the Spill without revealing what her later appearances around MSF missions are meant to accomplish.',
    beats: ['The Heir Apparent', 'The Accusation', 'A War from Exile', 'Hidden Pregnancy and Inquiry', 'Seen at the Mission Edge']
  },
  {
    slug: 'kyrien', name: 'Kyrien', code: 'IND · 002', role: 'Independent operator and reluctant director', ageBand: 'Late twenties', factions: ['Independent', 'MSF'], affiliationTimeline: [{ name: 'Independent', stage: 'Opening' }, { name: 'MSF', stage: 'Later director' }], accent: 'amber', materialStatus: 'Canon traits + mock details',
    summary: 'An INTJ (strong Te) non-Magus who survives deeper contact with magic by mastering the intelligence-operative disciplines that Magi are most likely to underestimate.',
    visual: 'Practical layers, concealed tools, and a silhouette built for movement', palette: 'Charcoal, muted amber, worn steel, off-white',
    personalitySummary: 'Kyrien processes danger by building a working model of it. When evidence is incomplete, he is more likely to test hidden connections in silence than join the room\'s immediate reaction. Personal grievances can sharpen that analysis, but also give it a dangerous point of fixation.',
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
    origin: 'Kyrien begins the story as an independent figure. His father held an important position in Narvea\'s military, and the knowledge and tools Kyrien inherits from that background later enable an attempt on a politician involved in causing his father\'s death. The assassination fails solely because the target belongs to the Magi world, a fact Kyrien could not have planned around.', rupture: 'Within the first few chapters, the failed attempt ends with Lynleit interrogating Kyrien at a police office. He faces prison until she offers conditional freedom: become her secret helper and remain confined to her demands. She wants a deniable trump card against Helena and eventually tells only Felix and Reiner, leaving even Fionn outside the compartment.', focus: 'The coerced arrangement drags him deeper into the world of Magi and gradually into MSF. Reiner remains suspicious but accepts Lynleit\'s judgment. Felix never fully trusts him and repeatedly clashes with him, leaving Kyrien inside a circle whose members protect Lynleit from him as much as they protect him for her.', future: 'When Lynleit disappears to protect her pregnancy and investigate the Spill, Kyrien becomes MSF\'s later director and inherits a smaller agency with a permanent magical mandate. He survives by reaching the peak of MSF\'s intelligence-operative side. Lynleit later begins appearing around missions, while Kyrien remains unaware that they have a son.',
    ally: 'Lynleit', allyNote: 'She begins as his handler rather than a willing partner. After he alone witnesses her walking on water, he denies seeing anything and keeps the forbidden secret. Drenched and breathless, they sit back to back for warmth, creating the first trigger in a bond that grows through functional care rather than overt romance. The hotel-room refuge follows much later after Fionn\'s murder, and they do not have sex until the end of the first arc.', rival: 'Tien', rivalNote: 'A shadow operator whose methods mirror Kyrien\'s skills without his restraint, forcing him to sharpen every discipline that keeps him alive.', goal: 'Survive Lynleit\'s control, master the intelligence side of MSF, face the Magus politician tied to his father\'s death, and eventually make choices inside the hidden world on terms that are genuinely his own.',
    beats: ['Outside the System', 'Alliance under Pressure', 'The Director without Magic', 'The Secret Kept from Him']
  },
  {
    slug: 'helena', name: 'Helena', code: 'MSF · 003', role: 'Political usurper', ageBand: 'Early forties', factions: ['MSF'], accent: 'red', materialStatus: 'Canon actions + mock details',
    summary: 'Fionn\'s wife and Lynleit\'s stepmother, Helena plays a major but still-undefined role in his assassination, converts the resulting vacuum into control of MSF, and frames his biological daughter.',
    visual: 'Severe tailoring, immaculate posture, and an intentionally unreadable expression', palette: 'Oxblood, black, ivory, muted gold', traits: ['Composed', 'Possessive', 'Calculating'],
    origin: 'Helena learns to read MSF as a hierarchy of loyalties rather than a simple intelligence service, but she never learns every protocol embedded by its founder. Lynleit notices suspicious behavior and never believes Helena truly loves Fionn.', rupture: 'Helena plays a major role in Fionn\'s assassination, although her precise actions, partners, and knowledge of the larger plan remain unclear. His death creates the opening she needs to seize control and make Lynleit the official enemy.', focus: 'Her authority depends on keeping the accusation intact while the investigation exposes layers of conspiracy that may extend far beyond her own seizure of MSF. She does not know that blue clothing functions as a command-authentication signal among top officers.', future: 'Influential officers begin to suspect that Fionn never intended Helena to inherit his director seat, because he did not entrust the rule to his wife while Lynleit continues to express it in exile. Helena can occupy the office, but the founder\'s private language quietly weakens her legitimacy.',
    ally: 'Tien', allyNote: 'Her covert instrument when official authority is too visible or too slow.', rival: 'Lynleit', rivalNote: 'Her stepdaughter, Fionn\'s biological daughter, and the displaced heir whose survival threatens Helena\'s entire political structure.', goal: 'Hold MSF long enough to make her version of events irreversible.',
    beats: ['Reading the Institution', 'The Opening', 'Control through Accusation', 'A Throne under Pressure']
  },
  {
    slug: 'tien', name: 'Tien', code: 'IND · 004', role: 'Mercenary assassin and secret bodyguard', factions: ['Independent'], accent: 'violet', materialStatus: 'Canon role + mock details',
    summary: 'A professional mercenary and assassin concealed by Helena as her private bodyguard, Tien removes her enemies quietly and cleanly.',
    visual: 'Low-profile fieldwear, obscured identifiers, and a deliberately forgettable outline', palette: 'Deep violet, graphite, smoke grey, black', traits: ['Silent', 'Precise', 'Relentless'],
    origin: 'Tien works professionally as a mercenary and assassin whose cleanest assignments leave no visible author. Helena hires Tien secretly as her bodyguard and removal specialist, keeping the relationship concealed from the people around her.', rupture: 'Helena deploys Tien against Lynleit and Kyrien as MSF\'s internal conflict leaves official channels behind.', focus: 'Tien and Kyrien become direct operational rivals because both begin as concealed assets serving handlers with opposing interests. Their functions overlap, but Tien exists primarily to remove Helena\'s enemies quietly and cleanly.', future: 'Kyrien becomes evidence that similar methods can serve survival and intelligence rather than assassination, sharpening the personal and professional contrast between them.',
    ally: 'Helena', allyNote: 'Her handler, employer, and protected principal. Helena conceals Tien in much the same way Lynleit conceals Kyrien.', rival: 'Kyrien', rivalNote: 'A directly opposing secret operator whose function resembles Tien\'s without sharing the same purpose or methods.', goal: 'Protect Helena and remove her enemies without exposing either the assignment or the relationship.',
    beats: ['Work without a Record', 'Helena\'s Shadow', 'The Counter-Operator', 'No Safe Exit']
  },
  {
    slug: 'fionn', name: 'Fionn', code: 'ARC · 005', role: 'Magiarch and MSF founder', ageBand: 'Late fifties', factions: ['MSF', 'Magiarchy'], accent: 'neutral', materialStatus: 'Canon magecraft + mock details',
    summary: 'Lynleit\'s biological father, publicly the director of MSF and secretly the country\'s Magiarch, Fionn faces a foreign magical conflict disguised as political chaos inside Narvea.',
    visual: 'Formal authority softened by practical details and an old ceremonial restraint', palette: 'Stone, black, muted blue, antique brass', traits: ['Measured', 'Secretive', 'Responsible'],
    magecraft: [
      { label: 'Hereditary magecraft', title: 'Blue flame', detail: 'Fionn carries the same lineage-bound blue flame later inherited by Lynleit. The flame is a family discipline with a broad range of applications.' },
      { label: 'Practiced method', title: 'Precision before volume', detail: 'His distinction is virtuosity. Fionn can shape the flame through subtle, controlled applications that Lynleit has not learned to reproduce.' },
      { label: 'Generational contrast', title: 'Control and force', detail: 'Fionn represents the refined expression of the lineage. Lynleit possesses less finesse, but a greater willingness to manifest the flame at an unsafe scale.' }
    ],
    origin: 'Fionn creates MSF with a public intelligence purpose and a hidden structure prepared for magical crisis. He also embeds cryptology into ordinary behavior, including a blue-clothing protocol through which informed officers recognize genuine command authority. Within his family, he is the virtuoso of a hereditary blue-flame magecraft defined by control and subtle application.', rupture: 'Foreign Magiarchates, church actors, and criminal Magi all remain plausible participants in the pressure built around Fionn. Helena also plays a major role in the assassination plan. Manufactured strife occupies both of his offices when the Spill requires him most.', focus: 'The conspiracy remains difficult to confront because Magi shape its layers, false causes, and mortal intermediaries. The secrecy protecting Fionn\'s offices and protocols also prevents either institution from understanding the conflict carried between them.', future: 'His assassination turns unfinished plans, concealed MSF signals, and an obscured enemy network into an inheritance Lynleit and Kyrien must interpret without him. Helena\'s importance is clear, but the ultimate author and full participant chain remain unresolved.',
    ally: 'Lynleit', allyNote: 'His biological daughter and intended successor, though much of what she inherits was never fully explained.', rival: 'Unresolved conspiracy', rivalNote: 'Criminal Magi, rival Magiarchates, church actors, or a mixed coalition may have planned, enabled, or carried out his assassination.', goal: 'Protect Narvea from a magical conflict whose participants can manufacture ordinary political reality as cover.',
    beats: ['Two Offices', 'The Hidden Purpose of MSF', 'Conflict behind the Mask', 'The Inheritance after Death']
  },
  {
    slug: 'heyk', name: 'Heyk', code: 'FLD · 006', role: 'Ducal Guard field agent and bodyguard', ageBand: 'Mid-thirties', factions: ['Government'], accent: 'green', materialStatus: 'Canon role + mock details',
    summary: 'The sole survivor of a paramilitary unit massacred inside Vilen\'s quarantined park, later recruited into the Ducal Guard under Drake and Sherie.',
    visual: 'Field equipment adapted beyond regulation and kept ready for rapid extraction', palette: 'Dark green, utility black, concrete, signal orange', traits: ['Practical', 'Suspicious', 'Decisive'],
    origin: 'Captain Heyk enters the park at the head of a specially equipped paramilitary unit, expecting a material threat that disciplined preparation can survive.', rupture: 'Forces he cannot understand or explain massacre his squad. Heyk becomes the sole survivor and is briefly evacuated by the Ducal Guard under Drake\'s orders.', focus: 'Grief for the unit he lost becomes his primary motive. His survival also leaves him carrying an account that official language cannot make coherent.', future: 'Heyk is recruited into the Ducal Guard as a field agent and bodyguard, serving Drake and Sherie\'s interests while remaining personally bound to the unanswered deaths inside the park.',
    ally: 'Drake and Sherie', allyNote: 'Drake orders his evacuation, and both later rely on him as bodyguard, confidant, and field agent.', rival: 'The quarantine', rivalNote: 'The place that killed his unit and denied him any explanation adequate to their deaths.', goal: 'Serve Drake and Sherie while learning what massacred his squad and making his survival answer for something.',
    beats: ['Captain of the Unit', 'The Last Man out of the Park', 'Ducal Guard Evacuation', 'Field Agent and Bodyguard']
  },
  {
    slug: 'sherie', name: 'Sherie', code: 'FLD · 007', role: 'Diplomat in training and covert negotiator', ageBand: 'Early twenties', factions: ['Government'], accent: 'blue', materialStatus: 'Canon traits + mock details',
    summary: 'Drake\'s niece and diplomatic apprentice, Sherie combines his strategic instruction with the charm and quick judgment he cannot easily bring into a room himself.',
    visual: 'Compact support gear, visible communications equipment, and a clean operational silhouette', palette: 'Navy, slate, white, emergency blue', traits: ['Charming', 'Quick-minded', 'Politically curious'],
    personalitySummary: 'Sherie reads people quickly and adjusts without making the adjustment visible. Drake teaches her how institutions, leverage, and long strategy operate, while she compensates for his poor social instincts by turning difficult positions into conversations other people are willing to continue.',
    origin: 'Sherie trains under her uncle Drake to become a successful diplomat. Their age gap matters less than the complement between his strategic mind and her instinctive command of social atmosphere.', rupture: 'Drake\'s peers ridicule his warning and the Duke remains skeptical. Sherie believes her uncle, but rejects his decision to remain inside official limits and begins designing her own approach to Lynleit.', focus: 'The illegal MSF partnership is entirely Sherie\'s idea and strategy. She develops it against Drake\'s wishes, persuades him to attend, and takes command of the negotiations. In this specific diplomatic test, the student surpasses her teacher. Once it succeeds, she asks Drake to praise and pamper her for her first achievement.', future: 'The failed boat infiltration proves that the suspected coup cannot be understood as a purely political operation and gives her diplomatic training a conflict no normal protocol anticipated.',
    ally: 'Drake', allyNote: 'Her uncle, mentor, and strategic counterpart. He trains her for diplomacy, while her charm and quick mind carry them through situations his social skills cannot.', rival: 'Official oversight', rivalNote: 'The government and Ducal Court would end the partnership if either discovered it.', goal: 'Become a diplomat capable of turning Drake\'s strategic understanding into alliances, while tracing the suspected coup without exposing MSF cooperation.',
    beats: ['Diplomatic Apprenticeship', 'The Secret Proposal', 'Leading the Meeting', 'What the Boat Reveals']
  },
  {
    slug: 'drake', name: 'Drake', code: 'FLD · 008', role: 'Official for Special Assignments', ageBand: 'Late thirties', factions: ['Government'], accent: 'amber', materialStatus: 'Canon traits + mock details',
    summary: 'The story\'s primary strategic mind, Drake holds the rank of State Councillor and serves as an Official for Special Assignments with unusual access to the Duke.',
    visual: 'Formal field attire, restrained insignia, and an immaculate profile under pressure', palette: 'Black, burgundy, silver, muted amber', traits: ['Commanding', 'Disciplined', 'Skeptical'],
    personalitySummary: 'Drake remains the story\'s main strategic thinker before and after Sherie\'s successful negotiation. His weakness is social execution, not strategic capacity. His niece can outperform him inside a room without replacing the larger intelligence, patience, and pattern recognition that make him central to the conspiracy investigation.',
    origin: 'Drake reaches the rank of State Councillor and serves as an Official for Special Assignments, an elite executive troubleshooter attached directly to a high-ranking personal office. Free from routine administration, he can carry delegated authority into confidential criminal inquiries, political counter-espionage, emergency audits, and diplomatic errands. His unusually direct relationship with the Duke expands that access and fuels Court resentment. He also trains his niece Sherie for diplomacy.', rupture: 'He reads the park disappearances as cover for illegal material movement, but his peers ridicule the theory and the Duke remains skeptical. The Court\'s existing resentment makes his warning easier to dismiss as another indulgence granted to a favorite.', focus: 'Drake opposes Sherie\'s illegal approach to Lynleit and does not design its strategy. On a hill overlooking Vilen, his apprentice leads the negotiation while he speaks reluctantly. Drake refuses to hand sensitive evidence outside his circle and instead seeks selected MSF resources in exchange for concessions or favors.', future: 'The failed boat infiltration opens his investigation toward a hidden force that political analysis alone cannot contain. Sherie\'s achievement expands his available options without displacing him as the story\'s primary strategic mind.',
    ally: 'Sherie', allyNote: 'His niece, diplomatic apprentice, first believer, and social counterpart. Her charm gives his strategic thinking a form other people can trust.', rival: 'The Ducal Court', rivalNote: 'Courtiers shun him as the Duke\'s favorite boy, convinced that friendship protects him from consequences they would be forced to bear.', goal: 'Locate the coup network, prepare Sherie for state diplomacy, and justify the Duke\'s trust without allowing friendship to become cover for his mistakes.',
    beats: ['A Coup without a Source', 'The Favorite Boy', 'The Illegal Partnership', 'The Boat below the Bridge']
  },
  {
    slug: 'felix', name: 'Felix', code: 'ARC · 009', role: 'MSF officer, friend, and personal bodyguard', ageBand: 'Late twenties', factions: ['MSF'], accent: 'neutral', materialStatus: 'Canon relationship + mock details',
    summary: 'Lynleit\'s playful, flirtatious troublemaker of a friend, and one of the two MSF officers Fionn personally trusts to protect her beyond an ordinary chain of command.',
    visual: 'Loose fieldwear, fast movement, and one bright accent against neutral equipment', palette: 'Grey, black, bright blue, rust orange',
    personalitySummary: 'Felix is clearly xxFP in temperament: playful, improvisational, flirtatious, and willing to test a rule simply to discover whether it deserves obedience. His troublemaking is social and energetic rather than careless about the people he protects.',
    traits: [
      { label: 'Playful flirt', note: 'He turns tension into teasing, tests reactions openly, and treats charm as both genuine expression and useful disruption.' },
      { label: 'Troublemaker', note: 'Protocol invites experimentation. Felix is the first to lean over a boundary, question an order, or make a formal situation less dignified.' },
      { label: 'Personal loyalty', note: 'His casual manner does not weaken his reliability. Friendship makes his protection of Lynleit more personal, not less serious.' }
    ],
    origin: 'Felix serves as an MSF officer, but his place beside Lynleit is already personal long before the story begins. They are close friends, and Fionn regards Felix as one of her reliable bodyguards. This is why he commonly accompanies her on operations, official travel, and casual outings.', rupture: 'Lynleit reveals her secret recruitment of Kyrien only to Felix and Reiner. Felix regards Kyrien as a threat whenever the bodyguards are not close enough to protect her. He concedes only because Reiner chooses Lynleit\'s judgment, leaving Felix as the minority opinion.', focus: 'Felix never fully learns to trust Kyrien. Their recurring clashes turn protection into open friction, and Lynleit must reprimand Felix when his hostility interferes with the compartment she created.', future: 'Fionn\'s death and Lynleit\'s accusation force Felix to decide whether loyalty means following the formal chain of command or protecting the friend whose anti-protocol judgment he already chose to obey.',
    ally: 'Lynleit', allyNote: 'Their bond is friendship as well as service. Felix can protect, question, tease, and accompany her with a familiarity that a mere subordinate would not possess, but that closeness also makes her secret trust in Kyrien difficult for him to accept.', rival: 'Kyrien', rivalNote: 'Felix sees Kyrien as an unverified threat inside Lynleit\'s private circle. Being outvoted makes him tolerate the arrangement, not trust the man.', goal: 'Protect Lynleit without allowing either protocol or her intuition to place an untrustworthy person beyond scrutiny.',
    beats: ['Friend and Bodyguard', 'The Secret Third Ally', 'No Trust for Kyrien', 'Loyalty after Fionn']
  },
  {
    slug: 'reiner', name: 'Reiner', code: 'ARC · 010', role: 'MSF officer, friend, and personal bodyguard', factions: ['MSF'], accent: 'neutral', materialStatus: 'Canon relationship + mock details',
    summary: 'Lynleit\'s stern, protocol-focused friend, and one of the two MSF officers Fionn personally trusts to remain at her side as a reliable bodyguard.',
    visual: 'Layered office-field clothing, annotated tools, and a deliberately understated presence', palette: 'Graphite, ash, muted teal, paper white',
    personalitySummary: 'Reiner is clearly xSTJ in temperament: stern, procedural, controlled, and far more comfortable with a defined responsibility than an improvised excuse. He rarely smiles, which makes every small break in his composure unusually visible.',
    traits: [
      { label: 'Protocol-focused', note: 'He treats procedure as accumulated operational knowledge rather than empty ceremony and notices quickly when others disregard it.' },
      { label: 'Severe composure', note: 'Reiner is restrained, difficult to fluster, and rarely seen smiling even among people he trusts.' },
      { label: 'Reliable protection', note: 'He expresses friendship through preparation, consistency, and remaining exactly where Lynleit needs him to be.' }
    ],
    origin: 'Reiner serves as an MSF officer, but his place beside Lynleit is already personal long before the story begins. They are close friends, and Fionn regards Reiner as one of her reliable bodyguards. He therefore accompanies her on operations, travel, and casual outings where formal protection blends into ordinary company.', rupture: 'Lynleit reveals her secret recruitment of Kyrien only to Reiner and Felix, withholding it even from Fionn. Reiner sees the same danger Felix sees, particularly whenever neither bodyguard is near her, but recognizes that rejecting the plan would also mean rejecting Lynleit\'s judgment.', focus: 'Despite being the more protocol-focused friend, Reiner concedes because he chooses to trust Lynleit\'s intuition. His decision leaves Felix in the minority and makes Reiner the stabilizing vote inside a compartment all three know violates MSF practice.', future: 'Reiner\'s trust does not eliminate scrutiny. He must protect Lynleit while watching whether Kyrien justifies her conviction or proves that protocol existed for a reason.',
    ally: 'Lynleit', allyNote: 'Their friendship allows Reiner to remain close without every interaction feeling like an assignment. Trusting her judgment over protocol is therefore a serious personal choice, not passive obedience.', rival: 'Kyrien', rivalNote: 'Reiner remains suspicious of Kyrien\'s presence near Lynleit, but contains that suspicion after consciously accepting her decision.', goal: 'Protect Lynleit while testing whether disciplined loyalty can accommodate the anti-protocol risk she has chosen.',
    beats: ['Friend and Bodyguard', 'The Anti-Protocol Compartment', 'Trusting Lynleit', 'Watching Kyrien']
  },
  {
    slug: 'yulia', name: 'Yulia', code: 'ARC · 011', role: 'Criminology student', ageBand: 'Mid-twenties', factions: ['Independent'], accent: 'neutral', materialStatus: 'Canon role + mock details',
    summary: 'A criminology student dragged by Hiyu into Vilen\'s quarantined park in pursuit of evidence neither is prepared to interpret.',
    visual: 'Civilian layers, a strong color accent, and keepsakes treated as practical equipment', palette: 'Cream, charcoal, muted red, pale gold', traits: ['Empathetic', 'Persistent', 'Defiant'],
    origin: 'Yulia studies criminology at university with Hiyu and approaches unexplained cases without access to the institutions shaping the hidden world.', rupture: 'Hiyu\'s confidence that he understands the park case draws her beyond the quarantine cordon so he can gather evidence.', focus: 'Inside the park, academic methods meet a threat that refuses the categories they brought with them.', future: 'What Yulia witnesses can turn her into both a liability to secrecy and a grounded counterweight to Hiyu\'s certainty.',
    ally: 'Hiyu', allyNote: 'Her fellow criminology student, whose conviction and appetite for proof bring her into the quarantined park.', rival: 'Hiyu\'s overconfidence', rivalNote: 'The assumption that recognizing a pattern means understanding the danger behind it.', goal: 'Survive the park, determine what Hiyu has involved her in, and preserve the evidence without mistaking theory for certainty.',
    beats: ['Criminology Student', 'Dragged into the Park', 'Evidence without a Category', 'A Witness Who Remembers']
  },
  {
    slug: 'hiyu', name: 'Hiyu', code: 'ARC · 012', role: 'Criminology student', ageBand: 'Mid-twenties', factions: ['Independent'], accent: 'neutral', materialStatus: 'Canon role + mock details',
    summary: 'A criminology student whose confidence in his own theory drives him into Vilen\'s quarantined park and pulls Yulia in after him.',
    visual: 'Soft civilian clothing mixed with portable research tools and improvised storage', palette: 'Black, soft blue, warm grey, white', traits: ['Curious', 'Inventive', 'Restless'],
    origin: 'Hiyu studies criminology with Yulia and builds a theory around the disappearances from public fragments and his own pattern reading.', rupture: 'Convinced that he knows what is happening but lacks proof, he enters the quarantined park and drags Yulia into the operation.', focus: 'His need to validate the theory places both students inside a danger that evidence alone cannot make manageable.', future: 'Surviving the park may force Hiyu to distinguish genuine insight from the self-confidence that made him underestimate the threat.',
    ally: 'Yulia', allyNote: 'His fellow student and unwilling counterweight, pulled into danger by his need for evidence.', rival: 'His own certainty', rivalNote: 'The belief that being directionally correct makes an unknown environment safe to investigate.', goal: 'Gather proof inside the park, then survive what his theory failed to account for.',
    beats: ['Building the Theory', 'Beyond the Cordon', 'Proof Becomes Exposure', 'Certainty after Survival']
  },
  {
    slug: 'natalia', name: 'Natalia', code: 'ARC · 013', role: 'Private investigator and hidden Magiarchy contact', ageBand: 'Late thirties', factions: ['Private Eye', 'Magiarchy'], accent: 'neutral',
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
    origin: 'Myka enters an Academy that functions as a public institution within Magi society. Magi families and lineages fund it so their children can succeed them, while acclaimed Magi who choose research and teaching serve as professors.', rupture: 'The Spill turns distant doctrine into an immediate threat affecting people outside protected magical society.', focus: 'Talent creates pressure to act before training has taught the restraint that action requires. The exact admissions system, curriculum, governance, and relationship with the churches remain undefined.', future: 'Protecting a surviving clue ties Myka to Natalia and a conflict far beyond the Academy\'s controlled exercises.',
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
    slug: 'father-mikhail', name: 'Father Mikhail', code: 'CHR · 017', role: 'Church special envoy', factions: ['The Church'], accent: 'neutral', materialStatus: 'Canon office + mock details',
    summary: 'A confirmed special envoy whose priesthood provides public cover for restricted Church work. His exact specialization and delegated authority remain undefined.',
    visual: 'Understated clerical dress, old protective symbols, and no ornamental excess', palette: 'Black, stone, dull gold, deep red', traits: ['Disciplined', 'Compassionate', 'Severe'],
    origin: 'Mikhail is trained as a priest for public cover and as a special envoy for the restricted operational needs of Church leadership. His specialization and exact authority are not yet known.', rupture: 'The Spill creates suffering too visible to dismiss and too dangerous to explain openly.', focus: 'Protecting ordinary people may require cooperating with Magi the Church is prepared to condemn.', future: 'His choices place him between doctrine, institutional survival, and the individuals paying the price for both.',
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
  const age = document.querySelector('#character-profile-age');
  age.textContent = profile.ageBand ?? '';
  age.hidden = !profile.ageBand;
  document.querySelector('#character-profile-material').textContent = profile.materialStatus ?? 'Mock profile material';
  document.querySelector('#character-profile-role').textContent = profile.role;
  document.querySelector('#character-profile-name').textContent = profile.name;
  document.querySelector('#character-profile-summary').textContent = profile.summary;

  const portrait = document.querySelector('#character-profile-portrait');
  portrait.classList.add(`profile-accent-${profile.accent}`);
  const portraitNote = createElement('span', 'profile-portrait-note', 'Artwork pending');
  loadProfilePortrait(profile, portrait, portraitNote);

  const factions = document.querySelector('#character-profile-factions');
  const affiliationTimeline = profile.affiliationTimeline ?? profile.factions.map((name) => ({ name }));
  affiliationTimeline.forEach(({ name, stage }) => {
    const badge = createElement('span', `profile-badge ${factionClass(name)}${stage ? ' affiliation-badge' : ''}`);
    badge.append(createElement('span', '', name));
    if (stage) badge.append(createElement('small', '', stage));
    factions.append(badge);
  });

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
  if (profile.appearanceDetails?.length) appearanceDetails.push(...profile.appearanceDetails);
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
    [profile.ally, 'Primary connection', profile.allyNote], [profile.rival, 'Central friction', profile.rivalNote], [affiliationTimeline.map(({ name, stage }) => stage ? `${name} (${stage.toLowerCase()})` : name).join(' / '), 'Institutional position', profile.affiliationTimeline ? `${profile.name} begins outside MSF and enters its institutional structure later in the story.` : `The factional context that shapes how ${profile.name} is seen and what is expected of them.`]
  ].forEach(([name, relation, detail]) => {
    const card = createElement('article', 'connection-card');
    card.append(createElement('small', '', relation), createElement('h3', '', name), createElement('p', '', detail));
    connections.append(card);
  });

  const conflicts = document.querySelector('#character-conflicts');
  [
    ['External', profile.rival, profile.rivalNote], ['Institutional', profile.factions[0], `The demands of ${profile.factions[0]} do not always align with ${profile.name}'s judgment.`], ['Narrative', 'Central pressure', profile.focus]
  ].forEach(([type, title, detail]) => {
    const card = createElement('article');
    card.append(createElement('span', '', type), createElement('div'));
    card.lastElementChild.append(createElement('h3', '', title), createElement('p', '', detail));
    conflicts.append(card);
  });

  const motivations = document.querySelector('#character-motivations');
  [
    ['Primary objective', profile.goal]
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
