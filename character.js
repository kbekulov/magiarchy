const profileSeeds = [
  {
    slug: 'lynleit', name: 'Lynleit', code: 'MSF · 001', role: 'Fionn\'s biological daughter and displaced heir', ageBand: 'Late twenties', factions: ['MSF', 'Magiarchy'], mbti: { type: 'ENFJ', detail: 'strong Ni', status: 'Confirmed' }, accent: 'blue', materialStatus: 'Canon traits + mock details',
    summary: 'Fionn\'s biological daughter and Helena\'s stepdaughter, Lynleit is a people-first leader whose responsibility is sharpened by unusually strong long-range intuition.',
    visual: 'A long tailored blue coat over a pale high-collared blouse with a narrow black ribbon, paired with high-waisted black shorts, dark tights, and tall black lace-up boots', palette: 'Midnight blue, black, white, cold cyan',
    residenceNote: 'The family home is a three-floor house on a hill above the city river. During her school years, Lynleit requested the third-floor bedroom so she could gaze into the distance while doing homework.',
    appearanceDetails: [
      ['Signature silhouette', 'Long structured outerwear frames a compact, practical lower silhouette. The contrast between formal tailoring and movement-ready shorts and boots is the recognizable core of her wardrobe.'],
      ['Variation rule', 'Other outfits may change the coat length, layers, or degree of formality, but usually preserve a blue tailored outer layer, a pale blouse, restrained black detailing, and tall practical footwear.']
    ],
    equipment: [
      { label: 'Issued sidearm', title: 'Ren L17 "Sparrow"', meta: ['9×17 mm', 'Leather OWB holster', 'Right-handed draw'], detail: 'Lynleit carries the compact Sparrow in a snug leather outside-the-waistband holster centered just above her tailbone. A rightward cant lets her draw with her right hand. The pistol\'s small proportions and the long jackets or coats central to her wardrobe keep it concealed without disturbing her usual silhouette.', href: 'weapons.html#ren-l17-sparrow' }
    ],
    personalitySummary: 'Lynleit reads hidden structures with an inward, private precision, but priority defines her. When pressure becomes real, she moves toward people, assumes responsibility, and measures strategy by its human consequences. Her warmth is deliberate and structurally aware rather than exuberant.',
    traits: [
      { label: 'Relational leadership', score: 95, note: 'Her first instinct in crisis is to read trust, morale, legitimacy, shared burden, and the emotional field around her.' },
      { label: 'Strategic foresight', score: 92, note: 'Her unusually strong intuition identifies long-range patterns and what events are becoming before most people can name the change.' },
      { label: 'Private introspection', score: 86, note: 'In private she is comfortable disappearing into solitude, following symbolic threads, and processing difficult emotion internally.' }
    ],
    magecraft: [
      { label: 'Hereditary magecraft', title: 'Blue flame', detail: 'Lynleit inherited her family\'s ability to manifest blue flame. It can be directed into many applications, but her control is less subtle than Fionn\'s.' },
      { label: 'Natural tendency', title: 'Unsafe volume', detail: 'Where Fionn relies on virtuosity and precision, Lynleit has the nerve to call forth far more flame than is safe. Force comes more readily to her than finesse.' },
      { label: 'Irreplaceable force', title: 'Beyond ordinary weapons', detail: 'Blue flame becomes indispensable when normal firearms cannot finish the threat: an immortal or rapidly regenerating Holumn, a body that moves without being alive, or a barrier that conventional force cannot breach.' },
      { label: 'Accidental miracle-making', title: 'Walking on water', detail: 'This ability was neither inherited nor taught. It manifested from her childhood fear of drowning and allows her to cross the surface of water on foot. Its resemblance to a sacred miracle places it outside tolerated magecraft.' },
      { label: 'Strictly concealed', title: 'Night practice', detail: 'Lynleit keeps the talent secret from everyone because the Church strongly punishes miracle-making that imitates acts associated with Jesus, saints, saviours, and other sacred figures, even when the effect seems harmless. She practices alone at night on secluded stretches of local lakes and rivers.' }
    ],
    origin: 'Lynleit is Fionn\'s biological daughter and intended heir. Helena is her stepmother, not her biological mother. Raised close to MSF leadership, Lynleit inherits Fionn\'s blue-flame magecraft, while a childhood fear of drowning independently manifests as the forbidden ability to walk on water. Felix and Reiner are already her close, long-standing friends before the story begins, as well as the personal bodyguards Fionn trusts with her safety. Her relationship with Helena is always tense. Before any open conspiracy, Lynleit notices Helena repeatedly probing details that seem domestic in isolation: Fionn\'s schedules, visitors to the house, officers he trusts, and Lynleit\'s own travel. She begins to suspect murder because somebody is studying her family too carefully. Within the first few chapters, she senses a near-future danger she cannot yet prove and uses an extraordinary transfer clause in MSF\'s government service contract to recruit Kyrien as her first deeply anti-protocol MSF decision. She eventually limits the truth to Felix and Reiner without informing even Fionn.', rupture: 'Much later, Fionn is assassinated through a still-unresolved conspiracy in which Helena plays a major role. The event vindicates Lynleit\'s warning without implying that she foresaw its exact form. Helena takes control, frames Lynleit for his death, and directs a hunt for her arrest. Lynleit exhausts her available resources to escape and reaches Kyrien\'s hotel-room hideout, where her composure finally breaks. He later helps her establish contact with Felix and Reiner, beginning her slow effort to reclaim MSF while she remains hunted. Lynleit continues initiating Fionn\'s blue recognition sequence on the run. His most conservative old officers recognize the conversational response that Helena cannot give and begin to treat obedience to the founder\'s protocol as a reason to question his official successor.', focus: 'During the failed river operation, only Kyrien sees her walk on water. They reach the night park drenched and breathless, then sit with their backs pressed together to share body heat. Lynleit indirectly asks whether he saw anything strange, but his careful denial protects her secret and becomes the first trigger in their slowly developing intimacy. Much later, only after Fionn\'s murder, his hotel room becomes a place of non-sexual emotional refuge and the first shelter for her fugitive counteroffensive.', future: 'Their relationship becomes sexual only at the end of the first arc, after intimacy has accumulated slowly through functional care, danger, and trust. Pregnancy and disappearance follow. After restoring a smaller MSF around the unfinished Spill, Lynleit vanishes to protect the pregnancy, deliver the child beyond the conflict\'s reach, recover, and consult wiser people about the Spill\'s origins. Years later she does not announce a return. She appears around MSF missions, sometimes seemingly by accident and sometimes by design, and her unexplained presence can make her look like a culprit.',
    ally: 'Kyrien', allyNote: 'Their connection begins as coercion and a calculated information imbalance against Helena. Only Felix and Reiner know Lynleit has brought him into her circle, while even Fionn remains uninformed. Kyrien\'s silent protection of her water-walking secret and their back-to-back recovery after the river incident create the first intimate threshold. The hotel-room refuge after Fionn\'s murder comes much later, and the relationship remains non-sexual until the end of the first arc.', rival: 'Helena', rivalNote: 'Lynleit distrusts her stepmother before the takeover, then learns Helena played a major role in Fionn\'s assassination even though the full conspiracy remains unclear.', goal: 'Keep Kyrien hidden as leverage against Helena, restore legitimate leadership, protect their child, and investigate the Spill without revealing what her later appearances around MSF missions are meant to accomplish.',
    beats: ['The Heir Apparent', 'The Accusation', 'Fugitive Counteroffensive', 'Hidden Pregnancy and Inquiry', 'Seen at the Mission Edge']
  },
  {
    slug: 'kyrien', name: 'Kyrien', code: 'IND · 002', role: 'Independent operator and reluctant director', ageBand: 'Late twenties', factions: ['Independent', 'MSF'], affiliationTimeline: [{ name: 'Independent', stage: 'Opening' }, { name: 'MSF', stage: 'Later director' }], mbti: { type: 'INTJ', detail: 'strong Te', status: 'Confirmed' }, accent: 'amber', materialStatus: 'Canon traits + mock details',
    summary: 'A non-Magus who survives deeper contact with magic by mastering the intelligence-operative disciplines that Magi are most likely to underestimate.',
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
    origin: 'Kyrien begins the story as an independent figure. His father held an important position in Narvea\'s military, and the knowledge and tools Kyrien inherits from that background later enable an attempt on a politician involved in causing his father\'s death. The assassination fails solely because the target belongs to the Magi world, a fact Kyrien could not have planned around.', rupture: 'Within the first few chapters, the failed attempt ends with Lynleit interrogating Kyrien at a police office. She invokes an extraordinary transfer clause in MSF\'s government service contract, drafted under Fionn for extraordinary threats, taking control of the case and offering conditional freedom: become her secret helper and remain confined to her demands. The contract authority shaped under Fionn lets his daughter recruit a man she deliberately hides from him. She wants a deniable trump card against Helena and eventually tells only Felix and Reiner.', focus: 'The coerced arrangement drags him deeper into the world of Magi and gradually into MSF. Reiner remains suspicious but accepts Lynleit\'s judgment. Felix never fully trusts him and repeatedly clashes with him, leaving Kyrien inside a circle whose members protect Lynleit from him as much as they protect him for her. After Helena frames Lynleit and launches the hunt for her arrest, Kyrien gives her refuge and helps her find secure ways to contact Felix and Reiner. His hidden position becomes the first practical base of her campaign to reclaim MSF.', future: 'When Lynleit disappears to protect her pregnancy and investigate the Spill, Kyrien becomes MSF\'s later director and inherits a smaller agency with a permanent magical mandate. He survives by reaching the peak of MSF\'s intelligence-operative side. Lynleit later begins appearing around missions, while Kyrien remains unaware that they have a son.',
    ally: 'Lynleit', allyNote: 'She begins as his handler rather than a willing partner. After he alone witnesses her walking on water, he denies seeing anything and keeps the forbidden secret. Drenched and breathless, they sit back to back for warmth, creating the first trigger in a bond that grows through functional care rather than overt romance. The hotel-room refuge follows much later after Fionn\'s murder, and they do not have sex until the end of the first arc.', rival: 'Tien', rivalNote: 'A shadow operator whose methods mirror Kyrien\'s skills without his restraint, forcing him to sharpen every discipline that keeps him alive.', goal: 'Survive Lynleit\'s control, master the intelligence side of MSF, face the Magus politician tied to his father\'s death, and eventually make choices inside the hidden world on terms that are genuinely his own.',
    beats: ['Outside the System', 'Alliance under Pressure', 'The Director without Magecraft', 'The Secret Kept from Him']
  },
  {
    slug: 'helena', name: 'Helena', code: 'MSF · 003', role: 'Political usurper', ageBand: 'Early forties', factions: ['MSF'], mbti: { type: 'XXTJ', status: 'Suspected' }, accent: 'red', materialStatus: 'Canon actions + mock details',
    summary: 'Fionn\'s wife and Lynleit\'s stepmother, Helena plays a major but still-undefined role in his assassination, converts the resulting vacuum into control of MSF, and frames his biological daughter.',
    visual: 'Severe tailoring, immaculate posture, and an intentionally unreadable expression', palette: 'Oxblood, black, ivory, muted gold', traits: ['Composed', 'Possessive', 'Calculating'],
    origin: 'Fionn genuinely respects Helena\'s intelligence but never trusts her with the deepest layer of his life. He believes compartmentalization protects his family. Helena experiences the same secrecy as proof that she was never truly his wife. Her grievance is legitimate even when the choices it produces become monstrous. She learns to read MSF as a hierarchy of loyalties and quietly probes Fionn\'s schedules, visitors to the family house, trusted officers, and Lynleit\'s travel, but never learns every protocol embedded by its founder.', rupture: 'Helena knowingly opens one door in the pressure against Fionn without understanding or controlling everything that will pass through it. Several incompatible agendas converge into his assassination, and her partial complicity creates the opening she uses to seize control, make Lynleit the official suspect, and direct the hunt for her arrest.', focus: 'Her authority depends on keeping the accusation intact while the investigation exposes layers of conspiracy that extend beyond her own knowledge and seizure of MSF. She knows neither the blue initiation signal nor the conversational challenge-response that authenticates it among Fionn\'s trusted officers.', future: 'Fionn\'s most conservative old officers notice the gap first. Helena can occupy the office, but strict obedience to the founder\'s private protocol gives his least rebellious officers a reason to disobey his official successor.',
    ally: 'Tien', allyNote: 'Her covert instrument when official authority is too visible or too slow.', rival: 'Lynleit', rivalNote: 'Her stepdaughter, Fionn\'s biological daughter, and the displaced heir whose survival threatens Helena\'s entire political structure.', goal: 'Hold MSF long enough to make her version of events irreversible.',
    beats: ['Reading the Institution', 'The Opening', 'Control through Accusation', 'A Throne under Pressure']
  },
  {
    slug: 'tien', name: 'Tien', code: 'IND · 004', role: 'Mercenary assassin and secret bodyguard', factions: ['Independent'], mbti: { type: 'XXXX', status: 'Undiscussed' }, accent: 'violet', materialStatus: 'Canon role + mock details',
    summary: 'A professional mercenary and assassin concealed by Helena as her private bodyguard, Tien removes her enemies quietly and cleanly.',
    visual: 'Low-profile fieldwear, obscured identifiers, and a deliberately forgettable outline', palette: 'Deep violet, graphite, smoke grey, black', traits: ['Silent', 'Precise', 'Relentless'],
    origin: 'Tien works professionally as a mercenary and assassin whose cleanest assignments leave no visible author. Helena hires Tien secretly as her bodyguard and removal specialist, keeping the relationship concealed from the people around her.', rupture: 'Helena deploys Tien against Lynleit and Kyrien as MSF\'s internal conflict leaves official channels behind.', focus: 'Tien and Kyrien become direct operational rivals because both begin as concealed assets serving handlers with opposing interests. Their functions overlap, but Tien exists primarily to remove Helena\'s enemies quietly and cleanly.', future: 'Kyrien becomes evidence that similar methods can serve survival and intelligence rather than assassination, sharpening the personal and professional contrast between them.',
    ally: 'Helena', allyNote: 'Her handler, employer, and protected principal. Helena conceals Tien in much the same way Lynleit conceals Kyrien.', rival: 'Kyrien', rivalNote: 'A directly opposing secret operator whose function resembles Tien\'s without sharing the same purpose or methods.', goal: 'Protect Helena and remove her enemies without exposing either the assignment or the relationship.',
    beats: ['Work without a Record', 'Helena\'s Shadow', 'The Counter-Operator', 'No Safe Exit']
  },
  {
    slug: 'fionn', name: 'Fionn', code: 'ARC · 005', role: 'Magiarch and MSF founder', ageBand: 'Late fifties', factions: ['MSF', 'Magiarchy'], mbti: { type: 'XXXX', status: 'Undiscussed' }, accent: 'neutral', materialStatus: 'Canon magecraft + mock details',
    summary: 'Lynleit\'s biological father, publicly the director of MSF and secretly the country\'s Magiarch, Fionn faces a foreign magical conflict disguised as political chaos inside Narvea.',
    visual: 'Formal authority softened by practical details and an old ceremonial restraint', palette: 'Stone, black, muted blue, antique brass', traits: ['Measured', 'Secretive', 'Responsible'],
    residenceNote: 'The family house is also a discreet residential node for MSF, with offices and a library supporting selected work without replacing the formal headquarters in Turon.',
    magecraft: [
      { label: 'Hereditary magecraft', title: 'Blue flame', detail: 'Fionn carries the same lineage-bound blue flame later inherited by Lynleit. The flame is a family discipline with a broad range of applications.' },
      { label: 'Practiced method', title: 'Precision before volume', detail: 'His distinction is virtuosity. Fionn can shape the flame through subtle, controlled applications that Lynleit has not learned to reproduce.' },
      { label: 'Generational contrast', title: 'Control and force', detail: 'Fionn represents the refined expression of the lineage. Lynleit possesses less finesse, but a greater willingness to manifest the flame at an unsafe scale.' },
      { label: 'Irreplaceable force', title: 'Beyond ordinary weapons', detail: 'The lineage becomes essential against threats that firearms cannot resolve: immortal or rapidly regenerating Holumns, bodies that move without being alive, and barriers that ordinary force cannot break.' }
    ],
    origin: 'Fionn creates MSF with a public intelligence purpose and a hidden structure prepared for magical crisis. He embeds cryptology into ordinary behavior: blue clothing initiates recognition, followed by an innocuous conversational challenge-response known only to top officers he trusts. He refuses to declare one uncontested successor because naming an heir would paint a target on that person. Within his family, he is the virtuoso of a hereditary blue-flame magecraft defined by control and subtle application.', rupture: 'Foreign Magiarchates, church actors, criminal Magi, and Helena pursue incompatible objectives around Fionn. Their pressures converge without one actor commanding the complete assassination. Several individually rational reasons persuade Fionn to delay acting until reasonable caution becomes his fatal mistake.', focus: 'Fionn genuinely respects Helena\'s intelligence but withholds the deepest layer of his life because he believes compartmentalization protects his family. Helena reads the same protection as proof that she was never truly his wife. The secrecy protecting Fionn\'s family, offices, protocols, and possible heirs prevents his enemies from seeing a complete structure, but also prevents his own institutions from understanding the conflict carried between them.', future: 'His assassination turns unfinished plans, concealed MSF signals, and intersecting enemy agendas into an inheritance Lynleit and Kyrien must interpret without him. His refusal to name one successor creates the exact succession crisis he hoped to prevent. Helena knowingly opens one door in the plot, but neither she nor any other participant controls the full outcome.',
    ally: 'Lynleit', allyNote: 'His biological daughter and likely heir in practice, though he refuses to make any successor uncontested and leaves much of her inheritance unexplained.', rival: 'Converging agendas', rivalNote: 'Criminal Magi, rival Magiarchates, church actors, and Helena may each enable a different part of the outcome without sharing one command structure or objective.', goal: 'Protect Narvea from a magical conflict whose participants can manufacture ordinary political reality as cover.',
    beats: ['Two Offices', 'The Hidden Purpose of MSF', 'Conflict behind the Mask', 'The Inheritance after Death']
  },
  {
    slug: 'heyk', name: 'Heyk', code: 'FLD · 006', role: 'Ducal Guard field agent and bodyguard', ageBand: 'Mid-thirties', factions: ['Government'], mbti: { type: 'XSTJ', status: 'Suspected' }, accent: 'green', materialStatus: 'Canon role + mock details',
    summary: 'The sole survivor of a paramilitary unit massacred inside Vilen\'s quarantined park, later recruited into the Ducal Guard under Drake and Sherie.',
    visual: 'Field equipment adapted beyond regulation and kept ready for rapid extraction', palette: 'Dark green, utility black, concrete, signal orange', traits: ['Practical', 'Suspicious', 'Decisive'],
    origin: 'Captain Heyk enters the park at the head of a specially equipped paramilitary unit, expecting a material threat that disciplined preparation can survive.', rupture: 'Forces he cannot understand or explain massacre his squad. Heyk becomes the sole survivor and is briefly evacuated by the Ducal Guard under Drake\'s orders.', focus: 'Grief for the unit he lost becomes his primary motive. His survival also leaves him carrying an account that official language cannot make coherent.', future: 'Heyk is recruited into the Ducal Guard as a field agent and bodyguard, serving Drake and Sherie\'s interests while remaining personally bound to the unanswered deaths inside the park.',
    ally: 'Drake and Sherie', allyNote: 'Drake orders his evacuation, and both later rely on him as bodyguard, confidant, and field agent.', rival: 'The quarantine', rivalNote: 'The place that killed his unit and denied him any explanation adequate to their deaths.', goal: 'Serve Drake and Sherie while learning what massacred his squad and making his survival answer for something.',
    beats: ['Captain of the Unit', 'The Last Man out of the Park', 'Ducal Guard Evacuation', 'Field Agent and Bodyguard']
  },
  {
    slug: 'sherie', name: 'Sherie', code: 'FLD · 007', role: 'Diplomat in training and covert negotiator', ageBand: 'Early twenties', factions: ['Government'], mbti: { type: 'EXFX', status: 'Suspected' }, accent: 'blue', materialStatus: 'Canon traits + mock details',
    summary: 'Drake\'s niece and diplomatic apprentice, Sherie combines his strategic instruction with the charm and quick judgment he cannot easily bring into a room himself.',
    visual: 'Compact support gear, visible communications equipment, and a clean operational silhouette', palette: 'Navy, slate, white, emergency blue', traits: ['Charming', 'Quick-minded', 'Politically curious'],
    personalitySummary: 'Sherie reads people quickly and adjusts without making the adjustment visible. Drake teaches her how institutions, leverage, and long strategy operate, while she compensates for his poor social instincts by turning difficult positions into conversations other people are willing to continue.',
    origin: 'Sherie trains under her uncle Drake to become a successful diplomat. Their age gap matters less than the complement between his strategic mind and her instinctive command of social atmosphere.', rupture: 'Drake\'s peers ridicule his warning and the Duke remains skeptical. Sherie believes her uncle, but rejects his decision to remain inside official limits and begins designing her own approach to Lynleit.', focus: 'The illegal MSF partnership is entirely Sherie\'s idea and strategy. She develops it against Drake\'s wishes, persuades him to attend, and takes command of the negotiations. In this specific diplomatic test, the student surpasses her teacher. Once it succeeds, she asks Drake to praise and pamper her for her first achievement.', future: 'The failed boat infiltration proves that the suspected coup cannot be understood as a purely political operation and gives her diplomatic training a conflict no normal protocol anticipated.',
    ally: 'Drake', allyNote: 'Her uncle, mentor, and strategic counterpart. He trains her for diplomacy, while her charm and quick mind carry them through situations his social skills cannot.', rival: 'Official oversight', rivalNote: 'The government and Ducal Court would end the partnership if either discovered it.', goal: 'Become a diplomat capable of turning Drake\'s strategic understanding into alliances, while tracing the suspected coup without exposing MSF cooperation.',
    beats: ['Diplomatic Apprenticeship', 'The Secret Proposal', 'Leading the Meeting', 'What the Boat Reveals']
  },
  {
    slug: 'drake', name: 'Drake', code: 'FLD · 008', role: 'Official for Special Assignments', ageBand: 'Late thirties', factions: ['Government'], mbti: { type: 'XNTJ', status: 'Suspected' }, accent: 'amber', materialStatus: 'Canon traits + mock details',
    summary: 'The story\'s primary strategic mind, Drake holds the rank of State Councillor and serves as an Official for Special Assignments with unusual access to the Duke.',
    visual: 'Formal field attire, restrained insignia, and an immaculate profile under pressure', palette: 'Black, burgundy, silver, muted amber', traits: ['Commanding', 'Disciplined', 'Skeptical'],
    personalitySummary: 'Drake remains the story\'s main strategic thinker before and after Sherie\'s successful negotiation. His weakness is social execution, not strategic capacity. His niece can outperform him inside a room without replacing the larger intelligence, patience, and pattern recognition that make him central to the conspiracy investigation.',
    origin: 'Drake reaches the rank of State Councillor and serves as an Official for Special Assignments, an elite executive troubleshooter attached directly to a high-ranking personal office. Free from routine administration, he can carry delegated authority into confidential criminal inquiries, political counter-espionage, emergency audits, and diplomatic errands. His friendship with the Duke begins when Drake is the only official willing to tell him that he is wrong. The refusal to flatter earns a trust that later looks like pampering to hostile courtiers. He also trains his niece Sherie for diplomacy.', rupture: 'He reads the park disappearances as cover for illegal material movement, but his peers ridicule the theory and the Duke remains skeptical. The Court\'s existing resentment makes his warning easier to dismiss as another indulgence granted to a favorite.', focus: 'Drake opposes Sherie\'s illegal approach to Lynleit and does not design its strategy. On a hill overlooking Vilen, his apprentice leads the negotiation while he speaks reluctantly. Drake refuses to hand sensitive evidence outside his circle and instead seeks selected MSF resources in exchange for concessions or favors.', future: 'The failed boat infiltration opens his investigation toward a hidden force that political analysis alone cannot contain. Sherie\'s achievement expands his available options without displacing him as the story\'s primary strategic mind.',
    ally: 'Sherie', allyNote: 'His niece, diplomatic apprentice, first believer, and social counterpart. Her charm gives his strategic thinking a form other people can trust.', rival: 'The Ducal Court', rivalNote: 'Courtiers shun him as the Duke\'s pampered favorite, overlooking that he first earned the friendship by refusing to flatter the Duke.', goal: 'Locate the coup network, prepare Sherie for state diplomacy, and justify the Duke\'s trust without allowing friendship to become cover for his mistakes.',
    beats: ['A Coup without a Source', 'The Favorite Boy', 'The Illegal Partnership', 'The Boat below the Bridge']
  },
  {
    slug: 'felix', name: 'Felix', code: 'ARC · 009', role: 'MSF officer, friend, and personal bodyguard', ageBand: 'Late twenties', factions: ['MSF'], mbti: { type: 'XXFP', status: 'Partial' }, accent: 'neutral', materialStatus: 'Canon relationship + mock details',
    summary: 'Lynleit\'s playful friend and Fionn-trusted bodyguard, Felix specializes in hacking and communications, approaching operations like a knight that reaches its objective through unexpected angles.',
    visual: 'Loose fieldwear, fast movement, a compact communications kit, and one bright accent against neutral equipment', palette: 'Grey, black, bright blue, rust orange',
    personalitySummary: 'Felix is playful, improvisational, flirtatious, and willing to test a rule simply to discover whether it deserves obedience. His technical work follows the same pattern. He prefers indirect entry, unusual routes, and sudden changes of angle, making him the knight to Reiner\'s rook.',
    traits: [
      { label: 'Playful flirt', note: 'He turns tension into teasing, tests reactions openly, and treats charm as both genuine expression and useful disruption.' },
      { label: 'Troublemaker', note: 'Protocol invites experimentation. Felix is the first to lean over a boundary, question an order, or make a formal situation less dignified.' },
      { label: 'Personal loyalty', note: 'His casual manner does not weaken his reliability. Friendship makes his protection of Lynleit more personal, not less serious.' }
    ],
    tradecraft: [
      { label: 'Technical access', title: 'Hacking', detail: 'Felix specializes in gaining access through systems rather than doors, using technical improvisation to reach information or infrastructure from an unexpected angle.' },
      { label: 'Signal control', title: 'Communications', detail: 'He handles operational communications, signal access, and the movement of information between people who cannot afford a visible connection.' },
      { label: 'Operational geometry', title: 'Knight pattern', detail: 'His value lies in mobility and oblique approach. Felix bypasses the obvious line, changes direction quickly, and appears where a rigid defense did not expect him.' }
    ],
    origin: 'Felix serves as an MSF officer, but his place beside Lynleit is already personal long before the story begins. They are close friends, and Fionn regards Felix as one of her reliable bodyguards. This is why he commonly accompanies her on operations, official travel, and casual outings.', rupture: 'Lynleit reveals her secret recruitment of Kyrien only to Felix and Reiner. Felix regards Kyrien as a threat whenever the bodyguards are not close enough to protect her. He concedes only because Reiner chooses Lynleit\'s judgment, leaving Felix as the minority opinion.', focus: 'Felix never fully learns to trust Kyrien. Their recurring clashes turn protection into open friction, and Lynleit must reprimand Felix when his hostility interferes with the compartment she created.', future: 'Fionn\'s death, Lynleit\'s accusation, and the hunt for her arrest force Felix to decide whether loyalty means following the formal chain of command or protecting his friend. Kyrien later helps Lynleit contact Felix and Reiner from hiding, drawing them into her slow campaign to reclaim MSF from Helena.',
    ally: 'Lynleit', allyNote: 'Their bond is friendship as well as service. Felix can protect, question, tease, and accompany her with a familiarity that a mere subordinate would not possess, but that closeness also makes her secret trust in Kyrien difficult for him to accept.', rival: 'Kyrien', rivalNote: 'Felix sees Kyrien as an unverified threat inside Lynleit\'s private circle. Being outvoted makes him tolerate the arrangement, not trust the man.', goal: 'Protect Lynleit without allowing either protocol or her intuition to place an untrustworthy person beyond scrutiny.',
    beats: ['Friend and Bodyguard', 'The Secret Third Ally', 'No Trust for Kyrien', 'Loyalty after Fionn']
  },
  {
    slug: 'reiner', name: 'Reiner', code: 'ARC · 010', role: 'MSF officer, friend, and personal bodyguard', factions: ['MSF'], mbti: { type: 'XSTJ', status: 'Partial' }, accent: 'neutral', materialStatus: 'Canon relationship + mock details',
    summary: 'Lynleit\'s stern friend and Fionn-trusted bodyguard, Reiner is a powerfully built brute-force specialist who holds the direct line like a rook.',
    visual: 'A powerful build, structured field clothing, reinforced equipment, and a deliberately immovable presence', palette: 'Graphite, ash, muted teal, paper white',
    personalitySummary: 'Reiner is stern, procedural, controlled, and far more comfortable with a defined responsibility than an improvised excuse. He rarely smiles, which makes every small break in his composure unusually visible. Where Felix works around an obstacle, Reiner commits to the direct line and becomes the rook that holds or breaks it.',
    traits: [
      { label: 'Protocol-focused', note: 'He treats procedure as accumulated operational knowledge rather than empty ceremony and notices quickly when others disregard it.' },
      { label: 'Severe composure', note: 'Reiner is restrained, difficult to fluster, and rarely seen smiling even among people he trusts.' },
      { label: 'Reliable protection', note: 'He expresses friendship through preparation, consistency, and remaining exactly where Lynleit needs him to be.' }
    ],
    tradecraft: [
      { label: 'Direct action', title: 'Brute-force intervention', detail: 'Reiner specializes in situations where an obstacle must be confronted directly, relying on physical power, discipline, and decisive commitment.' },
      { label: 'Physical security', title: 'Close protection', detail: 'His build and composure make him the stable physical barrier in Lynleit\'s security detail, able to hold position when an operation becomes chaotic.' },
      { label: 'Operational geometry', title: 'Rook pattern', detail: 'He controls clear lines, anchors a position, and applies force without unnecessary movement. Reiner is most effective when the threat has nowhere left to hide.' }
    ],
    origin: 'Reiner serves as an MSF officer, but his place beside Lynleit is already personal long before the story begins. They are close friends, and Fionn regards Reiner as one of her reliable bodyguards. He therefore accompanies her on operations, travel, and casual outings where formal protection blends into ordinary company.', rupture: 'Lynleit reveals her secret recruitment of Kyrien only to Reiner and Felix, withholding it even from Fionn. Reiner sees the same danger Felix sees, particularly whenever neither bodyguard is near her, but recognizes that rejecting the plan would also mean rejecting Lynleit\'s judgment.', focus: 'Despite being the more protocol-focused friend, Reiner concedes because he chooses to trust Lynleit\'s intuition. His decision leaves Felix in the minority and makes Reiner the stabilizing vote inside a compartment all three know violates MSF practice.', future: 'Reiner\'s trust does not eliminate scrutiny. After Fionn\'s murder and the hunt for Lynleit\'s arrest, Kyrien helps her contact Reiner and Felix from hiding. Reiner must protect her, preserve the covert link inside Helena\'s MSF, and decide how far disciplined loyalty can support the effort to reclaim the agency.',
    ally: 'Lynleit', allyNote: 'Their friendship allows Reiner to remain close without every interaction feeling like an assignment. Trusting her judgment over protocol is therefore a serious personal choice, not passive obedience.', rival: 'Kyrien', rivalNote: 'Reiner remains suspicious of Kyrien\'s presence near Lynleit, but contains that suspicion after consciously accepting her decision.', goal: 'Protect Lynleit while testing whether disciplined loyalty can accommodate the anti-protocol risk she has chosen.',
    beats: ['Friend and Bodyguard', 'The Anti-Protocol Compartment', 'Trusting Lynleit', 'Watching Kyrien']
  },
  {
    slug: 'yulia', name: 'Yulia', code: 'ARC · 011', role: 'Criminology student and procedural investigator', ageBand: 'Mid-twenties', factions: ['Independent'], mbti: { type: 'ISTJ', status: 'Confirmed' }, accent: 'neutral', materialStatus: 'Canon personality and relationship + mock visual details',
    summary: 'A top criminology student whose meticulous discipline makes her the evidentiary counterweight to Hiyu\'s wild inference, even when reluctant loyalty follows him into Vilen\'s quarantined park.',
    visual: 'Precise civilian layers, neatly organized study materials, and an attractive but severe presence whose expression rarely softens into a smile', palette: 'Cream, charcoal, muted red, pale gold',
    appearanceDetails: [
      ['Expression', 'Yulia is widely regarded as attractive, but her reputation for never smiling gives her a distant and severe first impression.'],
      ['Working habits', 'Her notebooks, evidence materials, and personal effects are kept orderly enough that an interruption is immediately visible.']
    ],
    personalitySummary: 'Yulia is methodical, detail-oriented, reliable, and most comfortable when evidence can be tested against a stable procedure. Hiyu\'s constant eureka moments and improvised logic give her a headache, but she repeatedly follows him anyway. Their opposition works because she checks what he leaps toward, while he forces her to consider possibilities no established protocol would admit.',
    traits: [
      { label: 'Procedural rigor', note: 'She is at the top of her criminology class because she applies method consistently, respects chains of evidence, and notices when a required step has been skipped.' },
      { label: 'Detail verification', note: 'Yulia is strongest when a theory must be tested against the record, an observation must be preserved accurately, or an exciting conclusion must survive patient scrutiny.' },
      { label: 'Reluctant loyalty', note: 'She complains, resists, and wishes she were elsewhere, yet still goes with Hiyu when leaving him alone would place him in greater danger.' }
    ],
    tradecraft: [
      { label: 'Academic strength', title: 'Classical criminological method', detail: 'Yulia follows evidence handling, observation, reconstruction, and procedural discipline with a consistency Hiyu does not naturally possess.' },
      { label: 'Team function', title: 'Verification and correction', detail: 'She tests Hiyu\'s intuitive threads, separates useful anomalies from noise, and gives their investigations a record another person could actually follow.' },
      { label: 'Failure condition', title: 'Procedure without precedent', detail: 'The quarantined park is especially dangerous because its supernatural conditions do not respect the categories or safety assumptions on which her strongest methods depend.' }
    ],
    origin: 'Yulia and Hiyu study criminology at the same university. She stands at the top of the class through discipline, detail, and command of established method, while Hiyu makes his reputation through personal investigations that ignore the path everyone else was taught to follow. Their interaction is often painful to observe: he chases another possibility, she develops another headache, and neither notices how accustomed they are becoming to the other\'s company.', rupture: 'Hiyu concludes that magic may be involved in the park disappearances despite not knowing that magic actually exists. Yulia considers the theory absurd, but joins his attempt to enter the quarantine partly to prove him wrong and partly because she does not trust him to remain safe alone.', focus: 'Inside the park, Yulia\'s meticulous observation remains valuable, but ordinary criminological protocol cannot tell her what rules the environment follows. Her attachment to Hiyu becomes a second vulnerability because protecting him can pull her deeper into a danger neither of them understands.', future: 'Their original aversion gradually becomes dependence and then unacknowledged romantic tension. Yulia refuses to name it, while Hiyu remains so absorbed in ideas that he does not understand why her company has become necessary to him.',
    ally: 'Hiyu', allyNote: 'Her opposite in method and temperament. He generates possibilities she would never entertain, while she gives his ideas evidentiary discipline. Over time, irritation becomes an attachment neither understands clearly.', rival: 'An investigation without rules', rivalNote: 'Yulia can master a known procedure, but the park confronts her with evidence whose governing categories have not yet been admitted to exist.', goal: 'Keep Hiyu alive, test his impossible theory honestly, and preserve enough reliable evidence to understand what ordinary criminology cannot explain.',
    beats: ['Top of the Class', 'Dragged into the Park', 'Proof without Protocol', 'Addicted to the Contrast']
  },
  {
    slug: 'hiyu', name: 'Hiyu', code: 'ARC · 012', role: 'Criminology student and intuitive investigator', ageBand: 'Mid-twenties', factions: ['Independent'], mbti: { type: 'ENTP', status: 'Confirmed' }, accent: 'neutral', materialStatus: 'Canon personality and relationship + mock visual details',
    summary: 'A criminology student whose restless pattern-making reaches the impossible possibility of magic, then carries him and Yulia into Vilen\'s quarantined park in search of proof.',
    visual: 'Soft civilian clothing, portable research tools stored wherever they fit, and the distracted posture of someone following an idea that has already left the room', palette: 'Black, soft blue, warm grey, white',
    appearanceDetails: [
      ['Working habits', 'Notes, clippings, and improvised tools accumulate according to the investigation in his head rather than any system another person could easily reconstruct.'],
      ['Attention', 'His gaze often passes over the social scene around him because several competing explanations are already occupying it.']
    ],
    personalitySummary: 'Hiyu is driven by possibility, contradiction, and the pleasure of making an unlikely pattern click. He constantly experiences eureka moments, builds protocols while using them, and abandons a clean path as soon as a stranger one becomes interesting. He has a reputation for ignoring women because ideas consume his attention so completely. This also leaves him oblivious to the romantic tension slowly forming with Yulia.',
    traits: [
      { label: 'Divergent inference', note: 'He can connect fragments through possibilities other investigators reject too early, which is how a non-Magus with no knowledge of magic nevertheless suspects it.' },
      { label: 'Improvised method', note: 'Hiyu invents investigative procedures in response to the problem in front of him, making him flexible where Yulia is disciplined and unreliable where she is exact.' },
      { label: 'Dangerous conviction', note: 'A brilliant possibility becomes a plan before he has established whether the environment is survivable, and being directionally correct can make him more reckless rather than less.' }
    ],
    tradecraft: [
      { label: 'Investigative strength', title: 'Generative hypothesis', detail: 'Hiyu produces explanations from weak signals and follows intuitive threads far beyond what academic consensus would permit.' },
      { label: 'Independent practice', title: 'Personal investigations', detail: 'His strongest work occurs outside the classroom, where he can pursue an anomaly without waiting for permission or adapting it to an assigned method.' },
      { label: 'Failure condition', title: 'Insight without calibration', detail: 'Correctly suspecting magic does not teach him what magic can do, how to gather evidence safely, or when an unexplained environment has already outmatched him.' }
    ],
    origin: 'Hiyu studies criminology with Yulia, but his real standing comes from personal investigations rather than class rank. Where she masters the established discipline, he follows loose fragments, invents methods on the spot, and finds possibilities that should sound ridiculous until they begin explaining too much. Their constant friction gradually becomes the structure both rely on.', rupture: 'From the public fragments surrounding the disappearances, Hiyu suspects that magic may be involved. He has no hidden knowledge and does not know magic exists. The hypothesis simply fits his intuitive pattern strongly enough that he decides to enter the quarantined park for evidence, pulling a reluctant Yulia into the attempt.', focus: 'His impossible hunch may be directionally correct, but it gives him no practical understanding of Holumns, the Spill, or survival inside the park. The same conviction that lets him cross an intellectual boundary also carries both students across a physical one.', future: 'Hiyu and Yulia become increasingly dependent on the contrast between them. He remains largely unaware that their need for one another is developing romantic weight, while survival must teach him that a true idea is not the same thing as a complete or safe understanding.',
    ally: 'Yulia', allyNote: 'The procedural counterweight he complains around, relies upon constantly, and gradually becomes unable to investigate without. He does not recognize the emotional meaning of that dependence.', rival: 'Calibration', rivalNote: 'His mind is excellent at opening possibilities and poor at deciding how much confidence, danger, or action a partial pattern deserves.', goal: 'Prove that the impossible explanation fits the disappearances, then learn enough restraint to keep the discovery from destroying both investigators.',
    beats: ['The Impossible Theory', 'Beyond the Cordon', 'A Correct but Incomplete Hunch', 'Dependence without Recognition']
  },
  {
    slug: 'natalia', name: 'Natalia', code: 'ARC · 013', role: 'Independent magical examiner and private investigator', ageBand: 'Late thirties', factions: ['Private Eye', 'Magiarchy', 'Magi Academy'], affiliationTimeline: [{ name: 'Magi Academy', stage: 'Former professor' }, { name: 'Private Eye', stage: 'Current sole proprietor' }, { name: 'Magiarchy', stage: 'Magus affiliation' }], mbti: { type: 'XXXX', status: 'Undiscussed' }, accent: 'neutral', materialStatus: 'Canon role + mock visual details',
    summary: 'A former Magi Academy professor who left a restrictive academic career to pursue independent research. Private cases fund that work, turning her one-woman office into a discreet practice for magical deviations, personal afflictions, and edge cases.',
    visual: 'Professional citywear, compact case tools, and magical details hidden in plain sight', palette: 'Black, wine red, parchment, muted violet',
    personalitySummary: 'Natalia is a researcher first and a private investigator by necessity. She values intellectual autonomy more than institutional standing and approaches unusual clients with the attention of an examiner: the apparent crime may be secondary to an unstable talent, personal deviation, or magical condition that nobody else knows how to name.',
    traits: [
      { label: 'Independent scholarship', note: 'She resigned from the Academy when its environment became too restrictive for the questions and methods she wanted to pursue.' },
      { label: 'Magical examination', note: 'She investigates people as readily as incidents, studying unusual magecraft, personal deviations, and conditions with a precision closer to a physician than a conventional detective.' },
      { label: 'Selective casework', note: 'The business has one employee: Natalia. Paid cases finance her research and let her choose which clients, risks, and secrets enter her office.' }
    ],
    origin: 'Natalia earned a professorship at the Magi Academy as a talented Magus and serious researcher. She eventually found academic life too constraining: the institution could support scholarship, but it also defined which questions were respectable and how far an inquiry was permitted to go. She resigned to continue her work independently.', rupture: 'Freedom did not finance itself. Natalia opened a private-investigation business as a practical source of income, then discovered that her immense knowledge of Magi and magecraft made her uniquely valuable to clients with cases no ordinary investigator could understand.', focus: 'Her one-woman office now sits between a detective agency, consultation room, and private laboratory. Clients bring suspected crimes, unstable talents, personal deviations, and magical problems they cannot safely expose. Natalia examines the person and phenomenon before deciding whether a crime has occurred at all.', future: 'Her practice becomes highly sought after in the narrow interval before the Magiarchy or Church learns enough to claim a case. The exact investigation that connects Natalia and Lester to the central crisis remains undefined.',
    ally: 'Lester', allyNote: 'Lester is not her employee. He is an outside ally and a demiholumn whose part-Holumn nature sometimes allows him to accomplish what should be impossible for an ordinary investigator.', connections: [
      { name: 'Lester', relation: 'Outside ally', detail: 'Lester remains outside the business, but his demiholumn nature sometimes carries Natalia past barriers that scholarship and ordinary investigation cannot cross.' },
      { name: 'Myka', relation: 'Niece, student, and friend', detail: 'Natalia keeps constant contact with her niece at the Magi Academy. Myka asks for advice on her studies, Natalia checks on her life, and their bond often resembles mother and daughter as much as aunt and niece.' }
    ], rival: 'Institutional capture', rivalNote: 'The Academy, Magiarchy, and Church can each narrow an inquiry by deciding which questions are permissible, which cases belong to them, and which answers must remain hidden.', goal: 'Fund and protect an independent life of magical research while giving clients an answer before hidden authorities reduce their problem to jurisdiction, secrecy, or punishment.',
    beats: ['Professor at the Academy', 'Scholarship without Permission', 'The Examiner for Hire', 'The Demiholumn Ally']
  },
  {
    slug: 'lester', name: 'Lester', code: 'ARC · 014', role: 'Demiholumn and Natalia\'s outside ally', factions: ['Independent'], mbti: { type: 'XXXX', status: 'Undiscussed' }, accent: 'neutral', materialStatus: 'Canon nature + mock visual details',
    summary: 'A demiholumn, half human and half Holumn, who remains outside Natalia\'s one-woman business but sometimes does the impossible on her behalf.',
    visual: 'Weathered professional clothing, an outwardly human silhouette, and small visual irregularities that remain undefined', palette: 'Brown, charcoal, cream, faded green',
    personalitySummary: 'Lester is an anomaly the hidden order does not yet explain: human enough to act as Natalia\'s trusted ally, Holumn enough to exceed ordinary limits. His exact capabilities, origin, and inner experience remain intentionally unresolved.',
    traits: [
      { label: 'Impossible intervention', note: 'His part-Holumn nature can make an otherwise impossible task achievable for Natalia, although the mechanism and limits remain unknown.' },
      { label: 'Outside ally', note: 'He assists Natalia without joining her business. The distinction preserves the fact that her private office has only one employee.' },
      { label: 'Unclassified existence', note: 'Neither the human nor Holumn half currently explains the whole person, leaving his place in the hidden world uncertain.' }
    ],
    nature: [
      { label: 'Classification', title: 'Demiholumn', detail: 'Lester is half human and half Holumn. This is an inherent condition, not magecraft, a profession, or membership in Natalia\'s business.' },
      { label: 'Known consequence', title: 'The impossible becomes possible', detail: 'His part-Holumn nature sometimes allows him to accomplish things Natalia could not obtain through ordinary investigation or Magus practice.' },
      { label: 'Unresolved boundary', title: 'Human agency inside a Holumn nature', detail: 'How the two halves coexist, what they permit, and what they cost Lester have not yet been defined.' }
    ],
    origin: 'Lester is a demiholumn, half human and half Holumn. The circumstances of his birth or transformation, and whether either description is fully accurate, remain unknown.', rupture: 'He becomes Natalia\'s ally without becoming her employee. When one of her cases reaches an impossible barrier, his unusual nature can provide an answer that neither ordinary investigation nor conventional magecraft could reach.', focus: 'His existence gives Natalia access to possibilities that make her private work uniquely valuable, while also creating a secret that could become more dangerous than the case being investigated.', future: 'The first central case that requires Lester\'s intervention, the limits of his abilities, and the response of the Church or Magiarchy if he is discovered remain unresolved.',
    ally: 'Natalia', allyNote: 'Natalia is his trusted investigator ally, not his employer. She calls on him when a case crosses the boundary between difficult and impossible.', rival: 'Classification', rivalNote: 'Any institution that reduces him to either a human witness or a Holumn threat will misunderstand what he is and may decide that he cannot be allowed to remain free.', goal: 'Help Natalia when ordinary methods fail while preserving the autonomy and secrecy of a life the hidden authorities may refuse to recognize.',
    beats: ['Between Human and Holumn', 'Natalia\'s Outside Ally', 'The Impossible Favor', 'A Nature without an Explanation']
  },
  {
    slug: 'myka', name: 'Myka', code: 'ARC · 015', role: 'Magi Academy student', factions: ['Magi Academy', 'Magiarchy'], mbti: { type: 'XXXX', status: 'Undiscussed' }, accent: 'neutral',
    summary: 'A young Magus studying at the Magi Academy who relies on her aunt Natalia for academic advice, personal reassurance, and a view of magical inquiry beyond institutional limits.',
    visual: 'Academic uniform elements, experimental accessories, and an expressive magical silhouette', palette: 'Indigo, cream, pale cyan, black', traits: ['Gifted', 'Earnest', 'Impulsive'],
    origin: 'Myka enters an Academy that functions as a public institution within Magi society. Magi families and lineages fund it so their children can succeed them, while acclaimed Magi who choose research and teaching serve as professors. Her aunt Natalia, a former professor, remains a constant source of advice and a personal connection to life beyond the institution.', rupture: 'The Spill turns distant doctrine into an immediate threat affecting people outside protected magical society.', focus: 'Talent creates pressure to act before training has taught the restraint that action requires. Myka turns to Natalia with questions about her studies, while Natalia reaches back to make sure the student is coping with more than coursework.', future: 'Protecting a surviving clue draws aunt and niece into a conflict far beyond the Academy\'s controlled exercises, testing whether their familial trust can survive the danger attached to Natalia\'s independent work.',
    ally: 'Natalia', allyNote: 'Her aunt, adviser, and friend. Natalia has no children of her own and sometimes treats Myka like a daughter, while Myka trusts her with academic problems and personal concerns that do not fit comfortably inside Academy life.', rival: 'Inexperience', rivalNote: 'The distance between understanding a rule and surviving its failure.', goal: 'Become useful without mistaking raw ability for readiness, while learning which parts of Natalia\'s independence are worth following and which carry risks the Academy was built to contain.',
    beats: ['Learning the Structure', 'Advice beyond the Academy', 'A Clue Worth Protecting', 'Aunt and Niece in the Crisis']
  },
  {
    slug: 'inspector-leo', name: 'Inspector Leo', code: 'PLC · 016', role: 'Police inspector', factions: ['Police'], mbti: { type: 'XSTJ', status: 'Suspected' }, accent: 'blue',
    summary: 'A police inspector whose missing-person investigation reaches the edge of a quarantine controlled by authorities above his clearance.',
    visual: 'Practical detective clothing, worn notebook, and restrained police identifiers', palette: 'Navy, grey, white, signal blue', traits: ['Tenacious', 'Procedural', 'Skeptical'],
    origin: 'Leo trusts patient interviews and the belief that every disappearance leaves a human trail.', rupture: 'Searchers vanish after entering the park, then the case is removed from police control under a government quarantine.', focus: 'Following procedure now means abandoning the investigation, while continuing it means challenging his own institution.', future: 'The Church and MSF each know more than they admit, leaving Leo to investigate the people controlling the answers.',
    ally: 'Natalia', allyNote: 'An investigator with access to details that never enter police records.', rival: 'Jurisdiction', rivalNote: 'The official boundary used to separate him from the people he is responsible for finding.', goal: 'Account for every missing person, regardless of who classified the reason.',
    beats: ['The Missing-Person Desk', 'Searchers Vanish Too', 'Locked outside the Quarantine', 'Investigating the Authorities']
  },
  {
    slug: 'father-mikhail', name: 'Father Mikhail', code: 'CHR · 017', role: 'Church special envoy', factions: ['The Church'], mbti: { type: 'XXXX', status: 'Undiscussed' }, accent: 'neutral', materialStatus: 'Canon office + mock details',
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
  { key: 'magecraft', label: 'Magecraft' }
];

const skillProfiles = {
  lynleit: { analysis: 92, influence: 94, awareness: 88, fieldcraft: 65, combat: 76, magecraft: 82 },
  kyrien: { analysis: 95, influence: 48, awareness: 91, fieldcraft: 98, combat: 87, magecraft: 0 },
  helena: { analysis: 88, influence: 92, awareness: 84, fieldcraft: 45, combat: 38, magecraft: 0 },
  tien: { analysis: 82, influence: 36, awareness: 90, fieldcraft: 96, combat: 94, magecraft: 0 },
  fionn: { analysis: 98, influence: 80, awareness: 96, fieldcraft: 72, combat: 85, magecraft: 98 },
  heyk: { analysis: 72, influence: 55, awareness: 82, fieldcraft: 90, combat: 88, magecraft: 0 },
  sherie: { analysis: 82, influence: 96, awareness: 88, fieldcraft: 54, combat: 35, magecraft: 0 },
  drake: { analysis: 98, influence: 42, awareness: 91, fieldcraft: 62, combat: 55, magecraft: 0 },
  felix: { analysis: 88, influence: 80, awareness: 86, fieldcraft: 94, combat: 62, magecraft: 0 },
  reiner: { analysis: 70, influence: 48, awareness: 84, fieldcraft: 82, combat: 96, magecraft: 0 },
  yulia: { analysis: 92, influence: 38, awareness: 90, fieldcraft: 46, combat: 24, magecraft: 0 },
  hiyu: { analysis: 93, influence: 56, awareness: 64, fieldcraft: 48, combat: 27, magecraft: 0 },
  natalia: { analysis: 94, influence: 58, awareness: 86, fieldcraft: 62, combat: 38, magecraft: 84 },
  lester: { analysis: 76, influence: 54, awareness: 92, fieldcraft: 84, combat: 72, magecraft: 91 },
  myka: { analysis: 75, influence: 70, awareness: 76, fieldcraft: 40, combat: 35, magecraft: 90 },
  'inspector-leo': { analysis: 84, influence: 65, awareness: 90, fieldcraft: 76, combat: 70, magecraft: 0 },
  'father-mikhail': { analysis: 86, influence: 82, awareness: 84, fieldcraft: 52, combat: 45, magecraft: 0 }
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
  const balanceLink = createElement('a', 'capability-ledger-link');
  balanceLink.href = 'docs.html?doc=character-capability-balance';
  balanceLink.append(createElement('span', '', 'Balance model'), createElement('strong', '', 'Review capability questions and contradictions'), createElement('i', '', '→'));
  container.append(layout, balanceLink);
}

function factionClass(faction) {
  const classes = {
    MSF: 'faction-msf', Magiarchy: 'faction-magiarchy', Independent: 'faction-independent', Government: 'faction-government',
    'Private Eye': 'faction-private-eye', 'Magi Academy': 'faction-academy', Police: 'faction-police', 'The Church': 'faction-church'
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

  const mbti = profile.mbti ?? { type: 'XXXX', status: 'Undiscussed' };
  const mbtiStatus = mbti.status.toLowerCase().replace(/[^a-z]+/g, '-');
  const typeRecord = document.querySelector('#character-profile-type');
  typeRecord.classList.add(`personality-type-${mbtiStatus}`);
  typeRecord.append(
    createElement('strong', '', mbti.type),
    createElement('span', '', ['MBTI', mbti.detail, mbti.status].filter(Boolean).join(' · '))
  );

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

  const equipmentSection = document.querySelector('#character-equipment-section');
  const equipment = document.querySelector('#character-equipment');
  if (profile.equipment?.length) {
    profile.equipment.forEach((entry, index) => {
      const card = createElement(entry.href ? 'a' : 'article', 'equipment-card');
      if (entry.href) card.href = entry.href;
      card.append(createElement('span', 'equipment-index', String(index + 1).padStart(2, '0')));
      const copy = createElement('div', 'equipment-copy');
      copy.append(createElement('small', '', entry.label), createElement('h3', '', entry.title));
      if (entry.meta?.length) {
        const metadata = createElement('div', 'equipment-meta');
        entry.meta.forEach((item) => metadata.append(createElement('span', '', item)));
        copy.append(metadata);
      }
      copy.append(createElement('p', '', entry.detail));
      if (entry.href) copy.append(createElement('b', 'equipment-link', 'Open weapon record →'));
      card.append(copy);
      equipment.append(card);
    });
    equipmentSection.hidden = false;
  }

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

  const natureSection = document.querySelector('#character-nature-section');
  const nature = document.querySelector('#character-nature');
  if (profile.nature?.length) {
    profile.nature.forEach((entry, index) => {
      const card = createElement('article', 'nature-card');
      card.append(createElement('span', 'nature-index', String(index + 1).padStart(2, '0')));
      const copy = createElement('div');
      copy.append(createElement('small', '', entry.label), createElement('h3', '', entry.title), createElement('p', '', entry.detail));
      card.append(copy);
      nature.append(card);
    });
    natureSection.hidden = false;
  }

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
  const biographyOrigin = profile.residenceNote ? `${profile.origin} ${profile.residenceNote}` : profile.origin;
  [
    ['Before the crisis', biographyOrigin], ['The defining break', profile.rupture], ['Where the record leads', profile.future]
  ].forEach(([title, detail], index) => {
    const item = createElement('li');
    item.append(createElement('span', '', String(index + 1).padStart(2, '0')));
    const copy = createElement('div');
    copy.append(createElement('h3', '', title), createElement('p', '', detail));
    item.append(copy);
    biography.append(item);
  });

  const connections = document.querySelector('#character-connections');
  const personalConnections = profile.connections
    ? profile.connections.map(({ name, relation, detail }) => [name, relation, detail])
    : [[profile.ally, 'Primary connection', profile.allyNote]];
  [
    ...personalConnections, [profile.rival, 'Central friction', profile.rivalNote], [affiliationTimeline.map(({ name, stage }) => stage ? `${name} (${stage.toLowerCase()})` : name).join(' / '), 'Institutional position', profile.affiliationTimeline ? `These affiliations and their changing stages shape how ${profile.name} is seen, what access they retain, and what institutions may claim from them.` : `The factional context that shapes how ${profile.name} is seen and what is expected of them.`]
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
