const profileSeeds = [
  {
    slug: 'lynleit', name: 'Lynleit', code: 'MSF · 001', role: 'Fionn\'s biological daughter and displaced heir', ageBand: 'Late twenties', factions: ['MSF', 'Magiarchy'], mbti: { type: 'ENFJ', detail: 'strong Ni', status: 'Confirmed' }, accent: 'blue', materialStatus: 'Canon traits + mock details',
    summary: 'Fionn\'s daughter, an MSF officer and Magus who becomes a fugitive after Helena accuses her of his murder.',
    visual: 'A long tailored blue coat over a pale high-collared blouse with a narrow black ribbon, fitted high-waisted black shorts, dark tights, and black over-the-knee lace-up boots. Her wardrobe is formal and fashion-conscious.', palette: 'Midnight blue, black, white, cold cyan',
    physical: [
      ['Hair', 'Very long, wavy ash-black hair with a side-parted fringe, most often worn loose.'],
      ['Eyes', 'Bright cyan-blue.'],
      ['Height and build', '169 cm with a slender build.'],
      ['Distinguishing features', 'Pale complexion, refined angular features, expressive eyes, and a composed, quietly sensual gaze.']
    ],
    residenceNote: 'After her mother\'s death, Lynleit resisted the family\'s move from Turon to Vilen and accepted it only on the condition that her study-bedroom occupy the third floor. The hillside site places thick trees close to the house and overlooks a river flowing toward the city center. Rustling leaves inspire her. She regards flowing water as life energy and seeks its emotional grounding despite her childhood fear of drowning.',
    appearanceDetails: [
      ['Hair variation', 'She occasionally wears her hair in a ponytail or bun. The bun becomes her usual working hairstyle in Arc 2 and is also worn during long report sessions and before sleep.'],
      ['Arc 2 elusive appearance', 'After her absence and the years spent raising Kyrien\'s son, Lynleit returns with her ash-black hair secured in a compact bun. She wears a high-necked black top beneath a short cape-like mantle, fitted black shorts, dark tights, gloves, over-the-knee lace-up boots, and a vivid blue sash at the waist.']
    ],
    equipment: [
      { label: 'Issued sidearm', title: 'Ren L17 "Sparrow"', meta: ['9×17 mm', 'Leather OWB holster', 'Right-handed draw'], detail: 'Lynleit carries the compact Sparrow in a snug leather outside-the-waistband holster centered just above her tailbone. A rightward cant lets her draw with her right hand. The pistol\'s small proportions and the long jackets or coats central to her wardrobe keep it concealed without disturbing her usual silhouette.', href: 'weapons.html#ren-l17-sparrow' },
      { label: 'Later loan', title: 'Ren L21 "Rook"', meta: ['9×19 mm', 'Borrowed from Felix', 'Micro-compact'], detail: 'Felix later lends Lynleit his personal L21 after her continued preference for the weaker 9×17 Sparrow becomes a cause of concern for him. The Rook gives her a lighter polymer-frame pistol in the more common 9×19 mm cartridge.', href: 'weapons.html#ren-l21-rook' },
      { label: 'Inherited protection', title: 'Leviathan-hide coat', meta: ['Autonomous form', 'Minor magical protection', 'Active coverage required'], detail: 'Midway through Arc 1, after Fionn\'s death, Lynleit discovers that he had discreetly replaced her blue coat with a garment sewn from material called the hide of leviathan. The coat chooses whether to appear as a coat, scarf, an imitation of her lost suede jacket, or another piece of clothing. Its protection does not activate merely because she wears it. She must cover the threatened part of her body or place the garment over someone else.', href: 'items.html?item=leviathan-hide-coat' }
    ],
    personalitySummary: 'Lynleit puts MSF and her personal missions first. She plans ahead, notices shifts in people\'s loyalties, and usually shares enough of her thinking for others to act with her. In private she is reserved and reflective. Personal embarrassment can make her evasive or irritable, especially when Kyrien notices more than she meant to reveal.',
    traits: [
      { label: 'Relational leadership', score: 95, note: 'Her first instinct in crisis is to read trust, morale, legitimacy, shared burden, and the emotional field around her. She treats candid communication as a practical source of trust and coordinated action.' },
      { label: 'Strategic foresight', score: 92, note: 'Her unusually strong intuition identifies long-range patterns and what events are becoming before most people can name the change.' },
      { label: 'Private introspection', score: 86, note: 'In private she is comfortable disappearing into solitude, following symbolic threads, and processing difficult emotion internally.' }
    ],
    magecraft: [
      { label: 'Hereditary magecraft', title: 'Blue flame', detail: 'Lynleit inherited her family\'s ability to manifest blue flame. It can be directed into many applications, but her control is less subtle than Fionn\'s.' },
      { label: 'Natural tendency', title: 'Unsafe volume', detail: 'Where Fionn relies on virtuosity and precision, Lynleit has the nerve to call forth far more flame than is safe. Force comes more readily to her than finesse.' },
      { label: 'Irreplaceable force', title: 'Beyond ordinary weapons', detail: 'Blue flame becomes indispensable when normal firearms cannot finish the threat: an immortal or rapidly regenerating Holumn, a body that moves without being alive, or a barrier that conventional force cannot breach.' },
      { label: 'Accidental miracle-making', title: 'Walking on water', detail: 'This ability appeared independently of her inherited magecraft. It manifested from her childhood fear of drowning and allows her to cross the surface of water on foot. Its resemblance to a sacred miracle places it outside tolerated magecraft.' },
      { label: 'Strictly concealed', title: 'Night practice', detail: 'Lynleit keeps the talent secret from everyone because the Church strongly punishes miracle-making that imitates acts associated with Jesus, saints, saviours, and other sacred figures, even when the effect seems harmless. She practices alone at night on secluded stretches of local lakes and rivers.' }
    ],
    origin: 'Lynleit grew up close to MSF leadership. Felix and Reiner became her friends and the bodyguards Fionn trusted with her safety. At the Magi Academy, Natalia was her favourite teacher. She distrusted Helena before any open conspiracy, noticing her stepmother\'s questions about Fionn\'s schedules, visitors, trusted officers, and Lynleit\'s travel. During Kyrien\'s failed attack on an MSF-protected politician, Lynleit was nearly harmed. He never learns that she was there. She later questions him and uses an extraordinary transfer clause in MSF\'s government contract to recruit him secretly, telling only Felix and Reiner.', rupture: 'Days before Fionn\'s death, the Nameless Street leaves Lynleit with the memory of a dead boy below a broken fence. Seeing her father\'s body below the hill at the family house brings the memory back. Helena uses her stunned reaction to support the accusation that Lynleit killed him. Hunted and out of resources, Lynleit reaches Kyrien\'s hotel-room hideout. He helps her reconnect with Felix and Reiner. Fionn\'s old officers begin questioning Helena when Lynleit can answer his private recognition challenge and Helena cannot.', focus: 'During the river operation, the Drowned Choir drags Lynleit underwater and tears away her blue suede jacket. She burns the hands with blue flame, breaks the surface, and stands on the water. Kyrien sees her from the park bank and keeps her secret. Father Mikhail later discovers that Kyrien, Felix, and Reiner know about magic. Lynleit insists on handling the breach herself. When the Church and Magiarchy send her to assist Mikhail in Cardiff, she sends Kyrien to help Myka at the Academy. She underestimates the danger there. In Cardiff, she and Mikhail protect one another despite their incompatible methods.', future: 'Midway through Arc 1, after Fionn\'s death, Lynleit discovers that he replaced her coat with a leviathan-hide garment. Near the end of the arc, she and Kyrien survive a shared curse after an incomplete attempt at intimacy. She refuses to discuss it with him even after the curse is gone. Their sexual relationship begins later. Near the Arc 2 transition she disappears, remaining away to raise their son, recover, and seek answers about the Spill. Years later she begins appearing around MSF missions without explaining her return.',
    connections: [
      { name: 'Natalia', relation: 'Former favourite teacher', detail: 'Natalia taught Lynleit at the Magi Academy, later asks her to help Myka, and identifies ego transformation as the survivable answer to the curse Lynleit shares with Kyrien.' },
      { name: 'Father Mikhail', relation: 'Cardiff counterpart and theological adviser', detail: 'The Magiarchy and Church send Lynleit to assist Mikhail abroad. They protect one another despite a moral rift, and he later confirms through Church records that the shared curse can be broken through genuine identity transformation.' }
    ],
    ally: 'Kyrien', allyNote: 'Kyrien\'s failed attack nearly harms her, but she never tells him. Their coerced alliance acquires a private familiarity through card games and shared work. He keeps her water-walking secret, shelters her after Fionn\'s murder, and chooses to stay when he could leave. An incomplete attempt at intimacy ends their shared curse; her embarrassment and his unanswered questions outlast it.', rival: 'Helena', rivalNote: 'Lynleit distrusts her stepmother before the takeover, then learns Helena played a major role in Fionn\'s assassination even though the full conspiracy remains unclear.', goal: 'Reclaim MSF from Helena, protect the people in her care, and investigate the Spill. During her later absence, she also keeps her son outside the conflict.',
    timelineNotes: {"The Heir Apparent":"Grows up as Fionn's daughter and studies magecraft under Natalia.","The River Secret":"Survives the Drowned Choir; Kyrien witnesses her walking on water.","Cardiff with Father Mikhail":"Assists Mikhail abroad without MSF's conventional resources.","Academy Intervention":"Sends Kyrien to help Myka while she is away.","The Accusation":"Helena blames her for Fionn's death.","Fugitive Counteroffensive":"Escapes to Kyrien and reconnects with Felix and Reiner.","The Battle as Reward":"Asks Kyrien why he keeps accepting danger without a promised reward.","Doom Has an Address":"Survives a shared curse after an incomplete attempt at intimacy.","Protected Absence and Inquiry":"Leaves near the Arc 2 transition to raise her son and investigate the Spill.","Seen at the Mission Edge":"Reappears around MSF operations without announcing her return."},
    conflicts: [["Helena's accusation","She must recover allies inside the agency now hunting her."],["Forbidden witnesses","Mikhail knows she disclosed magic to Kyrien, Felix, and Reiner. She insists on handling the breach herself."]],
    beats: ['The Heir Apparent', 'The River Secret', 'Cardiff with Father Mikhail', 'Academy Intervention', 'The Accusation', 'Fugitive Counteroffensive', 'The Battle as Reward', 'Doom Has an Address', 'Protected Absence and Inquiry', 'Seen at the Mission Edge']
  },
  {
    slug: 'kyrien', name: 'Kyrien', code: 'IND · 002', role: 'Independent operator and later MSF director', ageBand: 'Late twenties', factions: ['Independent', 'MSF'], affiliationTimeline: [{ name: 'Independent', stage: 'Opening' }, { name: 'MSF', stage: 'Later director' }], mbti: { type: 'ISTP / INTJ', detail: 'Ti or Ni; ISTP lean', status: 'Provisional' }, accent: 'amber', materialStatus: 'Canon traits + mock details',
    summary: 'A non-Magus who begins as Lynleit\'s secret recruit and later becomes director of MSF.',
    visual: 'A burgundy formal shirt with the collar open and sleeves rolled, dark tailored trousers, dark leather shoes, and a fitted leather jacket.', palette: 'Burgundy, charcoal, black, dark brown leather',
    physical: [
      ['Hair', 'Short, tousled charcoal-black hair with a heavy forward fringe.'],
      ['Eyes', 'Golden brown.'],
      ['Height and build', '180 cm with a slender, lightly built frame.'],
      ['Distinguishing features', 'Fair complexion, refined angular features, deep-set expressive eyes, and a composed, slightly aloof gaze with a sharp, elegant edge.']
    ],
    personalitySummary: 'Kyrien speaks little, rarely smiles, and wants to win. Cards, chess, and a gunfight can all provoke the same stubbornness. He reacts quickly to cheating, sometimes at the expense of the safer objective. He watches people\'s habits closely and asks blunt questions when they change.',
    traits: [
      { label: 'Intelligence tradecraft', score: 97, note: 'He turns surveillance, deception, logistics, human behavior, and escape planning into a substitute for magical perception.' },
      { label: 'Strategic adaptation', score: 94, note: 'His practical reasoning converts unfamiliar threats into usable procedures, leverage, and decisions that survive contact with reality.' },
      { label: 'Survival discipline', score: 92, note: 'He does not try to overpower Magi. He stays difficult to locate, corner, deceive, or kill.' }
    ],
    tradecraft: [
      { label: 'Concealment', title: 'Subterfuge', detail: 'Controls what others can infer about his intent, identity, loyalties, and next movement. He survives by giving opponents a convincing answer that is not the true one.' },
      { label: 'Escape discipline', title: 'Evasion', detail: 'Breaks surveillance, avoids magical attention, plans exits before entry, and refuses confrontations whose terms were chosen by somebody else.' },
      { label: 'Misdirection', title: 'Trickery', detail: 'Uses false patterns, staged weaknesses, timing, and selective truth to make stronger opponents commit to the wrong interpretation.' },
      { label: 'Relative strength', title: 'Obstacle movement', detail: 'His strength is most effective against his own body weight. He may not strike with the greatest force, but he moves quickly through difficult ground, pulls himself over obstacles, and can climb fences or walls when an escape route demands it.' },
      { label: 'Preparedness', title: 'Redundant options', detail: 'Kyrien usually keeps at least two objects available that are weapons or can become weapons. The pair changes with circumstance and may include a knife, keys, a pen, or a pocket pistol. The habit keeps options within reach rather than imposing a fixed loadout.' },
      { label: 'Reciprocal force', title: 'Firearms', detail: 'His father taught him that pointing a weapon creates an obligation. Kyrien keeps the lesson as a personal rule: "You cannot do much in this world without life or death stakes. But if you dare to point a gun at someone, you should be prepared to be shot yourself." He uses firearms to create distance, interrupt an attack, or open an escape route.' },
      { label: 'Mobility', title: 'Motorcycle', detail: 'The only driving licence he ever wanted was for a motorcycle. He values the machine as a narrow, responsive escape tool that is harder to trap than a car, not as a leisure accessory.' },
      { label: 'Last resort', title: 'Survival combat', detail: 'Fights to remain mobile and alive, combining practical close combat with terrain awareness instead of pursuing elegant or decisive victories.' },
      { label: 'Leadership peak', title: 'Intelligence operations', detail: 'His unofficial MSF association gives him access to surveillance, counterintelligence, field planning, and institutional command. By Lynleit\'s disappearance, this becomes the side of MSF he has mastered completely.' }
    ],
    origin: 'Kyrien begins the story as an independent figure and the son of a Narvean military commanding officer. His father introduces him to weapons and officer conduct unusually early. At five, Kyrien is allowed to hold a Sparrow and immediately aims it at a civilian in the street. His father stops and scolds him, making clear that familiarity with a weapon never permits a breach of protocol. The incident leaves Kyrien with a quiet affinity for military practice and the moral burden attached to force. After his father\'s death, he retains that mentality alongside access to surviving contacts, suppliers, knowledge, and tools. The inheritance later enables his attempt on a politician involved in causing his father\'s death. The target is under MSF protection. The attempt fails because the politician belongs to the Magi world, and Kyrien never learns that Lynleit was present and almost harmed by his actions.', rupture: 'After the failed assassination, Lynleit takes over Kyrien\'s interrogation at a police office. An extraordinary transfer clause in MSF\'s government contract lets her offer conditional freedom in exchange for his service. He cannot explain the personal edge in her questions. She keeps his recruitment from Fionn and eventually tells only Felix and Reiner.', focus: 'Felix clashes with Kyrien; Reiner remains watchful but accepts Lynleit\'s decision. During the failed river watches, Kyrien plays cards with her and begins learning her tells. He later witnesses her water walking and keeps it secret. When Mikhail questions her about the breach, however, Kyrien tells him that Felix and Reiner also know. While Lynleit is in Cardiff, Kyrien protects Myka undercover at the Academy, relying on Felix and Reiner until Natalia intervenes. After Fionn\'s death he shelters Lynleit and helps her reconnect with the officers. Asked why he keeps risking his life without a reward, he answers: "Because there\'s a battle to be fought."', future: 'Kyrien stays with Lynleit after she loses the authority to compel him. They survive a shared curse following an incomplete attempt at intimacy, but she will not explain the proposed treatment. Their sexual relationship begins later in Arc 1. When Lynleit inherits the Magiarchate and then disappears, Kyrien becomes director of MSF. He must manage its government contracts, divided loyalties, ordinary intelligence work, and response to the Spill without her magical authority. He does not know that they have a son.',
    connections: [
      { name: 'Lynleit', relation: 'Handler and eventual partner', detail: 'She questions him knowing that his failed attack nearly harmed her, a fact he never learns. Their repeated card games create a voluntary contest inside the coerced arrangement. He later protects her water-walking secret, gives her refuge, and chooses to remain once her authority can no longer compel him. Near the end of Arc 1, one curse binds their identities after they destroy a Holumn together. Lynleit attempts intimacy without revealing the proposed treatment. The incomplete attempt is followed by recovery, leaving Kyrien with questions she will not answer.' },
      { name: 'Kyrien\'s father', relation: 'Formative authority', detail: 'A military commanding officer who introduces Kyrien to weapons, protocol, and officer morality. His correction of Kyrien\'s first reckless act with a Sparrow becomes the foundation of his son\'s belief that using force also means accepting reciprocal danger.' },
      { name: 'Myka', relation: 'Undercover charge', detail: 'Kyrien keeps Myka safe inside the Magi Academy through conventional field skills and contact with Felix and Reiner until Natalia reaches them.' }
    ],
    ally: 'Lynleit', allyNote: 'Lynleit recruits him under threat of imprisonment. He later chooses to stay, keeps her forbidden ability secret, and gives her refuge. After their shared curse ends, she refuses to explain why she tried to sleep with him. He suspects a connection between the attempt and their recovery.', rival: 'Tien', rivalNote: 'Tien serves Helena as a concealed assassin. Kyrien must contend with an opponent who also relies on deception and surprise.', goal: 'Survive Lynleit\'s control, master the intelligence side of MSF, face the Magus politician tied to his father\'s death, and eventually make choices inside the hidden world on terms that are genuinely his own.',
    timelineNotes: {"Outside the System":"Retains his father's military contacts and attempts to kill the politician implicated in his death.","Alliance under Pressure":"Accepts Lynleit's offer of conditional freedom.","The Battle as Reward":"Tells Lynleit that a battle is reason enough to fight.","Undercover at the Academy":"Protects Myka until Natalia can intervene.","One Curse across Two Identities":"Survives the curse but does not learn why Lynleit attempted intimacy.","The Director without Magecraft":"Takes over MSF while Lynleit is absent.","The Secret Kept from Him":"Remains unaware that Lynleit bore his son."},
    conflicts: [["Concealed recruit","Felix distrusts him, and his position initially depends on Lynleit's protection."],["Command without a Magiarch","He later runs MSF's ordinary and supernatural work while Lynleit is absent."]],
    beats: ['Outside the System', 'Alliance under Pressure', 'The Battle as Reward', 'Undercover at the Academy', 'One Curse across Two Identities', 'The Director without Magecraft', 'The Secret Kept from Him']
  },
  {
    slug: 'helena', name: 'Helena', code: 'MSF · 003', role: 'Political usurper', ageBand: 'Early forties', factions: ['MSF'], mbti: { type: 'ENTJ', detail: 'strong Te', status: 'Confirmed' }, accent: 'red', materialStatus: 'Canon actions + mock details',
    summary: 'Fionn\'s wife and Lynleit\'s stepmother. She takes control of MSF after his assassination and accuses Lynleit of the murder.',
    visual: 'Severely tailored clothing, immaculate posture, and a controlled expression', palette: 'Oxblood, black, ivory, muted gold', traits: ['Composed', 'Possessive', 'Calculating'],
    physical: [
      ['Hair', 'Glossy black hair cut into a sleek, side-parted bob.'],
      ['Eyes', 'Amber-brown.'],
      ['Height and build', 'Average height with a slim, softly curved build.'],
      ['Distinguishing features', 'A pale complexion, arched brows, and a controlled smile.']
    ],
    personalitySummary: 'Helena measures people and institutions by what they can be made to accomplish. She searches for weak points, tightens hierarchy, removes obstacles, and acts directly once she decides that a structure has failed.',
    origin: 'Fionn respects Helena\'s intelligence but withholds the deepest parts of his life. He believes he is protecting the family; she experiences the secrecy as exclusion from their marriage. She questions his schedules, visitors, trusted officers, and Lynleit\'s movements, without discovering all of his private protocols.', rupture: 'Helena knowingly assists part of the pressure against Fionn without controlling the whole conspiracy. After his assassination she takes control of MSF, names Lynleit as the suspect, and orders her arrest.', focus: 'Her authority depends on keeping the accusation intact while the investigation exposes layers of conspiracy that extend beyond her own knowledge and seizure of MSF. She knows neither the blue initiation signal nor the conversational challenge-response that authenticates it among Fionn\'s trusted officers.', future: 'Fionn\'s conservative old officers notice that Helena does not know his private recognition protocol. Their loyalty to his instructions begins undermining her command.',
    ally: 'Tien', allyNote: 'Her covert instrument when official authority is too visible or too slow.', rival: 'Lynleit', rivalNote: 'Her stepdaughter, Fionn\'s biological daughter, and the displaced heir whose survival threatens Helena\'s entire political structure.', goal: 'Hold MSF long enough to make her version of events irreversible.',
    timelineNotes: {"Reading the Institution":"Studies Fionn's movements and loyalties.","The Opening":"Assists part of the conspiracy against him.","Control through Accusation":"Seizes MSF and directs the hunt for Lynleit.","A Throne under Pressure":"Fionn's old officers question her ignorance of his private protocol."},
    conflicts: [["An incomplete inheritance","Her formal control of MSF does not give her Fionn's private protocols or his officers' confidence."]],
    beats: ['Reading the Institution', 'The Opening', 'Control through Accusation', 'A Throne under Pressure']
  },
  {
    slug: 'tien', name: 'Tien', code: 'IND · 004', role: 'Mercenary assassin and secret bodyguard', factions: ['Independent'], mbti: { type: 'ISTP', detail: 'strong Se', status: 'Confirmed' }, accent: 'violet', materialStatus: 'Canon role + mock details',
    summary: 'A professional mercenary and assassin concealed by Helena as her private bodyguard, Tien removes her enemies quietly and cleanly.',
    visual: 'Dark low-profile fieldwear with obscured identifiers and no visible ornament', palette: 'Deep violet, graphite, smoke grey, black', traits: ['Silent', 'Precise', 'Relentless'],
    physical: [
      ['Hair', 'Short black hair with an uneven forward fringe.'],
      ['Eyes', 'Crimson red.'],
      ['Height and build', 'Average height with a lean, athletic build.'],
      ['Distinguishing features', 'A pale complexion, narrow eyes, and no conspicuous ornament or identifying feature.']
    ],
    personalitySummary: 'Tien works quietly, acts quickly, and adapts to immediate danger. As Helena\'s concealed bodyguard and assassin, he relies on surprise and precise execution.',
    origin: 'Helena secretly hires Tien, a professional mercenary and assassin, as her bodyguard and to remove her enemies.', rupture: 'Helena deploys Tien against Lynleit and Kyrien as MSF\'s internal conflict leaves official channels behind.', focus: 'Tien and Kyrien become direct operational rivals because both begin as concealed assets serving handlers with opposing interests. Their functions overlap, but Tien exists primarily to remove Helena\'s enemies quietly and cleanly.', future: 'His covert work for Helena puts him in repeated opposition to Kyrien.',
    ally: 'Helena', allyNote: 'Her handler, employer, and protected principal. Helena conceals Tien in much the same way Lynleit conceals Kyrien.', rival: 'Kyrien', rivalNote: 'A directly opposing secret operator whose function resembles Tien\'s without sharing the same purpose or methods.', goal: 'Protect Helena and remove her enemies without exposing either the assignment or the relationship.',
    timelineNotes: {"Work without a Record":"Works as a mercenary and assassin.","Helena's Shadow":"Becomes Helena's concealed bodyguard.","The Counter-Operator":"Opposes Kyrien during the struggle over MSF.","No Safe Exit":"Continues removing threats to Helena."},
    conflicts: [["Opposing asset","Kyrien interferes with his work for Helena."]],
    beats: ['Work without a Record', 'Helena\'s Shadow', 'The Counter-Operator', 'No Safe Exit']
  },
  {
    slug: 'fionn', name: 'Fionn', code: 'ARC · 005', role: 'Magiarch and MSF founder', ageBand: 'Late fifties', factions: ['MSF', 'Magiarchy'], mbti: { type: 'INTJ', detail: 'strong Ni', status: 'Confirmed' }, accent: 'neutral', materialStatus: 'Canon magecraft + mock details',
    summary: 'Lynleit\'s biological father, publicly the director of MSF and secretly the country\'s Magiarch, Fionn faces a foreign magical conflict disguised as political chaos inside Narvea.',
    visual: 'Formal dark clothing with restrained ceremonial details and practical accessories', palette: 'Stone, black, muted blue, antique brass', traits: ['Measured', 'Secretive', 'Responsible'],
    physical: [
      ['Hair', 'Short dark-brown hair swept back from the face.'],
      ['Eyes', 'Clear blue.'],
      ['Height and build', 'Tall, broad-shouldered, and solidly built.'],
      ['Distinguishing features', 'Heavy brows, a trimmed moustache and goatee, and short stubble along the jaw.']
    ],
    personalitySummary: 'Fionn prepares for threats before other people can see their shape. He prefers hidden safeguards, indirect control, long-term containment, and institutions built to survive dangers that have not yet arrived.',
    residenceNote: 'The family house is also a discreet residential node for MSF, with offices and a library supporting selected work without replacing the formal headquarters in Turon.',
    magecraft: [
      { label: 'Hereditary magecraft', title: 'Blue flame', detail: 'Fionn carries the same lineage-bound blue flame later inherited by Lynleit. The flame is a family discipline with a broad range of applications.' },
      { label: 'Practiced method', title: 'Precision before volume', detail: 'His distinction is virtuosity. Fionn can shape the flame through subtle, controlled applications that Lynleit has not learned to reproduce.' },
      { label: 'Generational contrast', title: 'Control and force', detail: 'Fionn represents the refined expression of the lineage. Lynleit possesses less finesse, but a greater willingness to manifest the flame at an unsafe scale.' },
      { label: 'Irreplaceable force', title: 'Beyond ordinary weapons', detail: 'The lineage becomes essential against threats that firearms cannot resolve: immortal or rapidly regenerating Holumns, bodies that move without being alive, and barriers that ordinary force cannot break.' }
    ],
    origin: 'Fionn creates MSF with a public intelligence purpose and a hidden structure prepared for magical crisis. He embeds cryptology into ordinary behavior: blue clothing initiates recognition, followed by an innocuous conversational challenge-response known only to top officers he trusts. He refuses to declare one uncontested successor because naming an heir would paint a target on that person. Within his family, he is the virtuoso of a hereditary blue-flame magecraft defined by control and subtle application.', rupture: 'Foreign Magiarchates, church actors, criminal Magi, and Helena pursue incompatible objectives around Fionn. Their pressures converge without one actor commanding the complete assassination. Several individually rational reasons persuade Fionn to delay acting until reasonable caution becomes his fatal mistake.', focus: 'Fionn withholds the deepest parts of his life from Helena. He considers this protection; she considers it exclusion. His secrecy also leaves the people around him unable to compare what they know about the threats he faces.', future: 'After his assassination, Lynleit and Kyrien must interpret his unfinished plans, concealed MSF signals, and the agendas of several enemies. His refusal to name one successor creates the succession crisis he hoped to prevent. Helena knowingly assists part of the plot, but neither she nor any other participant controls the full outcome.',
    ally: 'Lynleit', allyNote: 'His biological daughter and likely heir in practice, though he refuses to make any successor uncontested and leaves much of her inheritance unexplained.', rival: 'Converging agendas', rivalNote: 'Criminal Magi, rival Magiarchates, church actors, and Helena may each enable a different part of the outcome without sharing one command structure or objective.', goal: 'Protect Narvea from a magical conflict whose participants can manufacture ordinary political reality as cover.',
    timelineNotes: {"Two Offices":"Directs MSF publicly and serves as Magiarch in secret.","The Hidden Purpose of MSF":"Prepares the agency for a magical crisis.","Conflict behind the Mask":"Delays acting while several political and supernatural threats converge.","The Inheritance after Death":"Leaves concealed safeguards and no uncontested successor."},
    conflicts: [["Delayed action","Competing pressures keep him from acting as Magiarch in time."],["Succession","Naming an heir would endanger that person; leaving the question open divides MSF after his death."]],
    beats: ['Two Offices', 'The Hidden Purpose of MSF', 'Conflict behind the Mask', 'The Inheritance after Death']
  },
  {
    slug: 'heyk', name: 'Heyk', code: 'FLD · 006', role: 'Ducal Guard field agent and bodyguard', ageBand: 'Mid-thirties', factions: ['Government'], mbti: { type: 'ISTJ', detail: 'balanced Si-Te', status: 'Confirmed' }, accent: 'green', materialStatus: 'Canon role + mock details',
    summary: 'The sole survivor of a paramilitary unit massacred inside Vilen\'s quarantined park, later recruited into the Ducal Guard under Drake and Sherie.',
    visual: 'Non-standard field clothing with compact extraction equipment', palette: 'Dark green, utility black, concrete, signal orange', traits: ['Practical', 'Suspicious', 'Decisive'],
    physical: [
      ['Hair', 'Short white hair over darker clipped sides.'],
      ['Eyes', 'Steel grey.'],
      ['Height and build', 'Average height with a stocky, muscular build.'],
      ['Distinguishing features', 'Heavy brows, a weathered face, and short chin stubble.']
    ],
    personalitySummary: 'Heyk relies on training, professional standards, and procedures proven under pressure. When a system fails, he looks first for the discipline, preparation, or institutional correction that could prevent the same loss from happening again.',
    origin: 'Captain Heyk enters the park at the head of a specially equipped paramilitary unit, expecting a material threat that disciplined preparation can survive.', rupture: 'Forces he cannot understand or explain massacre his squad. Heyk becomes the sole survivor and is briefly evacuated by the Ducal Guard under Drake\'s orders.', focus: 'Grief for the unit he lost becomes his primary motive. His survival also leaves him carrying an account that official language cannot make coherent.', future: 'Heyk is recruited into the Ducal Guard as a field agent and bodyguard, serving Drake and Sherie\'s interests while remaining personally bound to the unanswered deaths inside the park.',
    ally: 'Drake and Sherie', allyNote: 'Drake orders his evacuation, and both later rely on him as bodyguard, confidant, and field agent.', rival: 'The quarantine', rivalNote: 'The place that killed his unit and denied him any explanation adequate to their deaths.', goal: 'Serve Drake and Sherie while learning what massacred his squad and making his survival answer for something.',
    timelineNotes: {"Captain of the Unit":"Leads a specially equipped paramilitary unit.","The Last Man out of the Park":"Survives the massacre of his squad.","Ducal Guard Evacuation":"Is evacuated by the Ducal Guard under Drake's orders.","Field Agent and Bodyguard":"Enters Drake and Sherie's service."},
    conflicts: [["The lost squad","He cannot explain the forces that killed his unit."]],
    beats: ['Captain of the Unit', 'The Last Man out of the Park', 'Ducal Guard Evacuation', 'Field Agent and Bodyguard']
  },
  {
    slug: 'sherie', name: 'Sherie', code: 'FLD · 007', role: 'Diplomat in training and covert negotiator', ageBand: 'Early twenties', factions: ['Government'], mbti: { type: 'ENFJ', detail: 'strong Fe', status: 'Confirmed' }, accent: 'blue', materialStatus: 'Canon traits + mock details',
    summary: 'Drake\'s niece and diplomatic apprentice, Sherie combines his strategic instruction with the charm and quick judgment he cannot easily bring into a room himself.',
    visual: 'Tailored fieldwear with compact support gear and visible communications equipment', palette: 'Navy, slate, white, emergency blue', traits: ['Charming', 'Quick-minded', 'Politically curious'],
    physical: [
      ['Hair', 'Long pale-blonde hair gathered into a high bun, with loose lengths sweeping over one shoulder.'],
      ['Eyes', 'Pale grey-green.'],
      ['Height and build', 'Above-average height, slender and long-legged.'],
      ['Distinguishing features', 'A fine oval face, long lashes, and ornate red-gold drop earrings.']
    ],
    personalitySummary: 'Sherie reads emotional atmosphere, relationships, and social position quickly. She draws information from people without making the extraction feel like an interrogation, then turns difficult positions into conversations they are willing to continue.',
    origin: 'Sherie studies diplomacy under her uncle Drake. She is quicker at reading a room and drawing people into conversation than he is.', rupture: 'Drake\'s peers ridicule his warning and the Duke remains skeptical. Sherie believes her uncle, but rejects his decision to remain inside official limits and begins designing her own approach to Lynleit.', focus: 'Sherie develops the unauthorized approach to Lynleit against Drake\'s wishes, persuades him to attend, and leads the negotiations herself. After it succeeds, she asks him to praise and pamper her.', future: 'Sherie and Drake use the private agreement to ask Lynleit for a loyal team capable of covertly inspecting apparently unmanned night shipments on the Vilen river. The empty boats and the Drowned Choir prove that the suspected coup cannot be understood as a purely political operation.',
    ally: 'Drake', allyNote: 'Her uncle, mentor, and strategic counterpart. He trains her for diplomacy, while her charm and quick mind carry them through situations his social skills cannot.', rival: 'Official oversight', rivalNote: 'The government and Ducal Court would end the partnership if either discovered it.', goal: 'Become a diplomat capable of turning Drake\'s strategic understanding into alliances, while tracing the suspected coup without exposing MSF cooperation.',
    timelineNotes: {"Diplomatic Apprenticeship":"Trains under her uncle Drake.","The Secret Proposal":"Proposes approaching Lynleit outside official channels.","Leading the Meeting":"Conducts the hilltop negotiation despite Drake's reluctance.","What the Boat Reveals":"Requests the river inspection with Drake."},
    conflicts: [["Unauthorized agreement","Her private approach to MSF would be stopped if the Court or government discovered it."]],
    beats: ['Diplomatic Apprenticeship', 'The Secret Proposal', 'Leading the Meeting', 'What the Boat Reveals']
  },
  {
    slug: 'drake', name: 'Drake', code: 'FLD · 008', role: 'Official for Special Assignments', ageBand: 'Late thirties', factions: ['Government'], mbti: { type: 'INTJ', detail: 'strong Ni; notable Fi', status: 'Confirmed' }, accent: 'amber', materialStatus: 'Canon traits + mock details',
    summary: 'State Councillor, the Duke\'s trusted troubleshooter, and Sherie\'s uncle. His warnings about the disappearances are dismissed at Court.',
    visual: 'Formal dark field attire with restrained insignia and immaculate grooming', palette: 'Black, burgundy, silver, muted amber', traits: ['Commanding', 'Disciplined', 'Skeptical'],
    physical: [
      ['Hair', 'Medium-length silver-white hair swept back with loose strands falling over the forehead.'],
      ['Eyes', 'Red.'],
      ['Height and build', 'Tall with a lean, straight-backed build.'],
      ['Distinguishing features', 'A very pale complexion, angular features, and narrow, severe eyes.']
    ],
    personalitySummary: 'Drake is strategic, introspective, patient, and attentive to patterns that others dismiss. His loyalty to duty, legitimacy, and the ducal system is deeply personal. Sherie can outperform him inside a room, but she does not replace the larger strategic judgment that makes him central to the conspiracy investigation.',
    origin: 'Drake reaches the rank of State Councillor and serves as an Official for Special Assignments, an elite executive troubleshooter attached directly to a high-ranking personal office. Free from routine administration, he can carry delegated authority into confidential criminal inquiries, political counter-espionage, emergency audits, and diplomatic errands. His friendship with the Duke begins when Drake is the only official willing to tell him that he is wrong. The refusal to flatter earns a trust that later looks like pampering to hostile courtiers. He also trains his niece Sherie for diplomacy.', rupture: 'He reads the park disappearances as cover for illegal material movement, but his peers ridicule the theory and the Duke remains skeptical. The Court\'s existing resentment makes his warning easier to dismiss as another indulgence granted to a favorite.', focus: 'Drake opposes Sherie\'s illegal approach to Lynleit and does not design its strategy. On a hill overlooking Vilen, his apprentice leads the negotiation while he speaks reluctantly. Drake refuses to hand sensitive evidence outside his circle and instead seeks selected MSF resources in exchange for concessions or favors.', future: 'Drake identifies small boats travelling on the darkest nights without visible operators. He and Sherie arrange a covert inspection through Lynleit. The empty boats and the river attack force him to reconsider his explanation of the traffic.',
    ally: 'Sherie', allyNote: 'His niece, diplomatic apprentice, first believer, and social counterpart. Her charm gives his strategic thinking a form other people can trust.', rival: 'The Ducal Court', rivalNote: 'Courtiers shun him as the Duke\'s pampered favorite, overlooking that he first earned the friendship by refusing to flatter the Duke.', goal: 'Locate the coup network, prepare Sherie for state diplomacy, and justify the Duke\'s trust without allowing friendship to become cover for his mistakes.',
    timelineNotes: {"A Coup without a Source":"Connects disappearances and irregular movements to a suspected coup.","The Favorite Boy":"Faces resentment over his friendship with the Duke.","The Illegal Partnership":"Reluctantly joins Sherie's approach to Lynleit.","The Boat below the Bridge":"Asks MSF to investigate apparently unmanned river traffic."},
    conflicts: [["Official limits","He needs MSF's help but objects to Sherie's unauthorized agreement and will not surrender sensitive evidence."]],
    beats: ['A Coup without a Source', 'The Favorite Boy', 'The Illegal Partnership', 'The Boat below the Bridge']
  },
  {
    slug: 'felix', name: 'Felix', code: 'ARC · 009', role: 'MSF officer, friend, and personal bodyguard', ageBand: 'Late twenties', factions: ['MSF'], mbti: { type: 'ESFP', detail: 'strong Se-Fi', status: 'Confirmed' }, accent: 'neutral', materialStatus: 'Canon relationship + mock details',
    summary: 'Lynleit\'s playful friend and Fionn-trusted bodyguard, Felix specializes in hacking and communications, approaching operations like a knight that reaches its objective through unexpected angles.',
    visual: 'Loose fieldwear with a compact communications kit and one bright accent against neutral equipment', palette: 'Grey, black, bright blue, rust orange',
    physical: [
      ['Hair', 'Vivid orange hair swept back into sharp points and tied into a short tail.'],
      ['Eyes', 'Bright green.'],
      ['Height and build', 'Average height with a lean, wiry build.'],
      ['Distinguishing features', 'Expressive brows, quick facial movement, and a broad mischievous grin.']
    ],
    equipment: [
      { label: 'Personal sidearm', title: 'Ren L21 "Rook"', meta: ['9×19 mm', 'Micro-compact', 'Personal finish'], detail: 'Felix owns a compact L21 with brass-colored controls and the Rook\'s intricate slide serrations. He later lends it to Lynleit because her continued reliance on the weaker 9×17 Sparrow concerns him.', href: 'weapons.html#ren-l21-rook' }
    ],
    personalitySummary: 'Felix is playful, expressive, flirtatious, and quick to improvise. He reacts personally and immediately, then prefers direct relational repair once the conflict has passed. His technical work follows the same oblique pattern, making him the knight to Reiner\'s rook.',
    traits: [
      { label: 'Playful flirt', note: 'He turns tension into teasing, tests reactions openly, and treats charm as both genuine expression and useful disruption.' },
      { label: 'Troublemaker', note: 'Protocol invites experimentation. Felix is the first to lean over a boundary, question an order, or make a formal situation less dignified.' },
      { label: 'Personal loyalty', note: 'He protects Lynleit as a long-standing friend and is openly suspicious of anyone he thinks may hurt her.' }
    ],
    tradecraft: [
      { label: 'Technical access', title: 'Hacking', detail: 'Felix uses technical improvisation to reach protected information and infrastructure from unexpected angles.' },
      { label: 'Signal control', title: 'Communications', detail: 'He handles operational communications, signal access, and the movement of information between people who cannot afford a visible connection.' },
      { label: 'Operational geometry', title: 'Knight pattern', detail: 'His value lies in mobility and oblique approach. Felix bypasses the obvious line, changes direction quickly, and appears where a rigid defense did not expect him.' }
    ],
    origin: 'Felix is Lynleit\'s long-standing friend and one of the MSF officers Fionn trusts as her personal bodyguards. He accompanies her on operations, official journeys, and casual outings.', rupture: 'Lynleit reveals her secret recruitment of Kyrien only to Felix and Reiner. Felix regards Kyrien as a threat whenever the bodyguards are not close enough to protect her. He concedes only because Reiner chooses Lynleit\'s judgment, leaving Felix as the minority opinion.', focus: 'Felix never fully learns to trust Kyrien. Their recurring clashes turn protection into open friction, and Lynleit must reprimand Felix when his hostility interferes with the compartment she created. During an ordinary walk after lunch, he sees Lynleit collapse onto a city bench but never enters the Nameless Street she experiences while unconscious.', future: 'Fionn\'s death, Lynleit\'s accusation, and the hunt for her arrest force Felix to decide whether loyalty means following the formal chain of command or protecting his friend. Kyrien later helps Lynleit contact Felix and Reiner from hiding, drawing them into her slow campaign to reclaim MSF from Helena.',
    ally: 'Lynleit', allyNote: 'Their bond is friendship as well as service. Felix can protect, question, tease, and accompany her with a familiarity that a mere subordinate would not possess, but that closeness also makes her secret trust in Kyrien difficult for him to accept.', rival: 'Kyrien', rivalNote: 'Felix sees Kyrien as an unverified threat inside Lynleit\'s private circle. Being outvoted makes him tolerate the arrangement, not trust the man.', goal: 'Protect Lynleit without allowing either protocol or her intuition to place an untrustworthy person beyond scrutiny.',
    timelineNotes: {"Friend and Bodyguard":"Serves alongside Lynleit as a friend and trusted bodyguard.","The Secret Third Ally":"Learns of Kyrien's secret recruitment.","No Trust for Kyrien":"Accepts the arrangement without trusting Kyrien.","The Stronger Sidearm":"Lends Lynleit his Rook after worrying about her Sparrow.","Loyalty after Fionn":"Helps the hunted Lynleit reconnect with MSF."},
    conflicts: [["Lynleit's judgment","His distrust of Kyrien brings him into conflict with the friend he wants to protect."]],
    beats: ['Friend and Bodyguard', 'The Secret Third Ally', 'No Trust for Kyrien', 'The Stronger Sidearm', 'Loyalty after Fionn']
  },
  {
    slug: 'reiner', name: 'Reiner', code: 'ARC · 010', role: 'MSF officer, friend, and personal bodyguard', factions: ['MSF'], mbti: { type: 'ISTJ', detail: 'strong Si-Te', status: 'Confirmed' }, accent: 'neutral', materialStatus: 'Canon relationship + mock details',
    summary: 'Lynleit\'s stern friend and Fionn-trusted bodyguard, Reiner is a powerfully built brute-force specialist who holds the direct line like a rook.',
    visual: 'Structured field clothing, reinforced equipment, and black sunglasses', palette: 'Graphite, ash, muted teal, paper white',
    physical: [
      ['Hair', 'Clean-shaven scalp.'],
      ['Eyes', 'Usually concealed behind black sunglasses; eye colour is unspecified.'],
      ['Height and build', 'Tall, broad, and heavily muscled.'],
      ['Distinguishing features', 'A squared face, pronounced brows, and a sharply trimmed black goatee.']
    ],
    equipment: [
      { label: 'Preferred sidearm', title: 'Ren L28 "Raven"', meta: ['9×19 mm', 'Advanced service pistol', 'Accuracy and performance'], detail: 'Reiner prefers the full-size Raven over the standard Crow for its better accuracy and performance.', href: 'weapons.html#ren-l28-raven' }
    ],
    personalitySummary: 'Reiner is stern, procedural, controlled, and anchored by role boundaries, chain of command, duty, and legitimate authority. He rarely smiles, which makes every small break in his composure unusually visible. Where Felix works around an obstacle, Reiner commits to the direct line and becomes the rook that holds or breaks it.',
    traits: [
      { label: 'Protocol-focused', note: 'He treats procedure as accumulated operational knowledge and notices quickly when others disregard it.' },
      { label: 'Severe composure', note: 'Reiner is restrained, difficult to fluster, and rarely seen smiling even among people he trusts.' },
      { label: 'Reliable protection', note: 'He expresses friendship through preparation, consistency, and remaining exactly where Lynleit needs him to be.' }
    ],
    tradecraft: [
      { label: 'Direct action', title: 'Brute-force intervention', detail: 'Reiner specializes in situations where an obstacle must be confronted directly, relying on physical power, discipline, and decisive commitment.' },
      { label: 'Physical security', title: 'Close protection', detail: 'His build and composure make him the stable physical barrier in Lynleit\'s security detail, able to hold position when an operation becomes chaotic.' },
      { label: 'Operational geometry', title: 'Rook pattern', detail: 'He controls clear lines, anchors a position, and applies force without unnecessary movement. Reiner is most effective when the threat has nowhere left to hide.' }
    ],
    origin: 'Reiner is Lynleit\'s long-standing friend and one of the MSF officers Fionn trusts as her personal bodyguards. They also spend time together outside assignments.', rupture: 'Lynleit reveals her secret recruitment of Kyrien only to Reiner and Felix, withholding it even from Fionn. Reiner sees the same danger Felix sees, particularly whenever neither bodyguard is near her, but recognizes that rejecting the plan would also mean rejecting Lynleit\'s judgment.', focus: 'Reiner accepts Lynleit\'s decision to recruit Kyrien despite the breach of protocol. His vote leaves Felix in the minority. He continues watching Kyrien.', future: 'Reiner\'s trust does not eliminate scrutiny. After Fionn\'s murder and the hunt for Lynleit\'s arrest, Kyrien helps her contact Reiner and Felix from hiding. Reiner must protect her, preserve the covert link inside Helena\'s MSF, and decide how far disciplined loyalty can support the effort to reclaim the agency.',
    ally: 'Lynleit', allyNote: 'Their friendship allows Reiner to remain close without every interaction feeling like an assignment. Trusting her judgment over protocol is therefore a serious personal choice, not passive obedience.', rival: 'Kyrien', rivalNote: 'Reiner remains suspicious of Kyrien\'s presence near Lynleit, but contains that suspicion after consciously accepting her decision.', goal: 'Protect Lynleit while testing whether disciplined loyalty can accommodate the anti-protocol risk she has chosen.',
    timelineNotes: {"Friend and Bodyguard":"Serves alongside Lynleit as a friend and trusted bodyguard.","The Anti-Protocol Compartment":"Learns she recruited Kyrien without Fionn's knowledge.","Trusting Lynleit":"Supports her decision despite his reservations.","Watching Kyrien":"Keeps Kyrien under scrutiny while helping Lynleit."},
    conflicts: [["Trust and protocol","Supporting Lynleit's secret recruitment means accepting a breach he would ordinarily oppose."]],
    beats: ['Friend and Bodyguard', 'The Anti-Protocol Compartment', 'Trusting Lynleit', 'Watching Kyrien']
  },
  {
    slug: 'yulia', name: 'Yulia', code: 'ARC · 011', role: 'Criminology student and procedural investigator', ageBand: 'Mid-twenties', factions: ['Independent'], mbti: { type: 'ISTJ', detail: 'strong Si', status: 'Confirmed' }, accent: 'neutral', materialStatus: 'Canon personality and relationship + mock visual details',
    summary: 'A top criminology student whose meticulous discipline makes her the evidentiary counterweight to Hiyu\'s wild inference, even when reluctant loyalty follows him into Vilen\'s quarantined park.',
    visual: 'Neatly layered civilian clothing with orderly study materials', palette: 'Cream, charcoal, muted red, pale gold',
    physical: [
      ['Hair', 'Very long dark chestnut-brown hair with a blunt fringe and softly flared ends.'],
      ['Eyes', 'Green.'],
      ['Height and build', 'Average height with a slim, straight build.'],
      ['Distinguishing features', 'A fair complexion, wide observant eyes, and a habitually unsmiling expression.']
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
    timelineNotes: {"Top of the Class":"Excels at criminology through careful method.","Dragged into the Park":"Accompanies Hiyu to challenge his theory and keep him safe.","Proof without Protocol":"Encounters events her training cannot explain.","Addicted to the Contrast":"Becomes increasingly attached to Hiyu despite their disagreements."},
    conflicts: [["Unfamiliar evidence","Her training offers no established procedure for what happens in the park."]],
    beats: ['Top of the Class', 'Dragged into the Park', 'Proof without Protocol', 'Addicted to the Contrast']
  },
  {
    slug: 'hiyu', name: 'Hiyu', code: 'ARC · 012', role: 'Criminology student and intuitive investigator', ageBand: 'Mid-twenties', factions: ['Independent'], mbti: { type: 'ENTP', detail: 'strong Ne', status: 'Confirmed' }, accent: 'neutral', materialStatus: 'Canon personality and relationship + mock visual details',
    summary: 'A criminology student whose restless pattern-making reaches the impossible possibility of magic, then carries him and Yulia into Vilen\'s quarantined park in search of proof.',
    visual: 'Soft civilian clothing with portable research tools tucked into pockets and bags', palette: 'Black, soft blue, warm grey, white',
    physical: [
      ['Hair', 'Short, untidy charcoal hair with a loose forward fringe.'],
      ['Eyes', 'Blue-grey.'],
      ['Height and build', 'Average height with a lean build.'],
      ['Distinguishing features', 'Light chin stubble and an animated, rapidly changing expression.']
    ],
    personalitySummary: 'Hiyu is driven by possibility, contradiction, and the pleasure of making an unlikely pattern click. He constantly experiences eureka moments, builds protocols while using them, and abandons a clean path as soon as a stranger one becomes interesting. He has a reputation for ignoring women because ideas consume his attention so completely. This also leaves him oblivious to the romantic tension slowly forming with Yulia.',
    traits: [
      { label: 'Divergent inference', note: 'He can connect fragments through possibilities other investigators reject too early, which is how a non-Magus with no knowledge of magic nevertheless suspects it.' },
      { label: 'Improvised method', note: 'Hiyu invents investigative procedures in response to the problem in front of him, making him flexible where Yulia is disciplined and unreliable where she is exact.' },
      { label: 'Dangerous conviction', note: 'A brilliant possibility becomes a plan before he has established whether the environment is survivable. Partial success makes him even more reckless.' }
    ],
    tradecraft: [
      { label: 'Investigative strength', title: 'Generative hypothesis', detail: 'Hiyu produces explanations from weak signals and follows intuitive threads far beyond what academic consensus would permit.' },
      { label: 'Independent practice', title: 'Personal investigations', detail: 'His strongest work occurs outside the classroom, where he can pursue an anomaly without waiting for permission or adapting it to an assigned method.' },
      { label: 'Failure condition', title: 'Insight without calibration', detail: 'Correctly suspecting magic does not teach him what magic can do, how to gather evidence safely, or when an unexplained environment has already outmatched him.' }
    ],
    origin: 'Hiyu studies criminology with Yulia, but his reputation comes from personal investigations instead of class rank. She masters the established discipline. He follows loose fragments, invents methods on the spot, and pursues possibilities that initially sound ridiculous. Their constant friction gradually becomes a working dependency.', rupture: 'From the public fragments surrounding the disappearances, Hiyu suspects that magic may be involved. He has no hidden knowledge and does not know magic exists. The hypothesis fits his intuitive pattern strongly enough that he decides to enter the quarantined park for evidence, pulling a reluctant Yulia into the attempt.', focus: 'His hunch is directionally correct, but gives him no practical understanding of Holumns, the Spill, or survival inside the park. The conviction that lets him challenge an accepted explanation also puts both students in physical danger.', future: 'Hiyu and Yulia become increasingly dependent on their different methods. He remains largely unaware that their need for one another is developing romantic weight. Survival must teach him that a correct idea can still be incomplete and dangerous.',
    ally: 'Yulia', allyNote: 'The procedural counterweight he complains around, relies upon constantly, and gradually becomes unable to investigate without. He does not recognize the emotional meaning of that dependence.', rival: 'Calibration', rivalNote: 'His mind is excellent at opening possibilities and poor at deciding how much confidence, danger, or action a partial pattern deserves.', goal: 'Prove that the impossible explanation fits the disappearances, then learn enough restraint to keep the discovery from destroying both investigators.',
    timelineNotes: {"The Impossible Theory":"Suspects magic despite not knowing it exists.","Beyond the Cordon":"Persuades Yulia to enter the quarantined park.","A Correct but Incomplete Hunch":"Finds more danger than his theory prepared him for.","Dependence without Recognition":"Keeps seeking Yulia's criticism without recognizing his attachment."},
    conflicts: [["Confidence before evidence","His excitement over an explanation can commit him and Yulia to danger he has not assessed."]],
    beats: ['The Impossible Theory', 'Beyond the Cordon', 'A Correct but Incomplete Hunch', 'Dependence without Recognition']
  },
  {
    slug: 'natalia', name: 'Natalia', code: 'ARC · 013', role: 'Independent magical examiner and private investigator', ageBand: 'Late thirties', factions: ['Private Eye', 'Magiarchy', 'Magi Academy'], affiliationTimeline: [{ name: 'Magi Academy', stage: 'Former professor' }, { name: 'Private Eye', stage: 'Current sole proprietor' }, { name: 'Magiarchy', stage: 'Magus affiliation' }], mbti: { type: 'INTP', detail: 'strong Ti', status: 'Confirmed' }, accent: 'neutral', materialStatus: 'Canon role + mock visual details',
    summary: 'A former Magi Academy professor who left a restrictive academic career to pursue independent research. Private cases fund that work, turning her one-woman office into a discreet practice for magical deviations, personal afflictions, and edge cases.',
    visual: 'Professional citywear with compact case tools and discreet magecraft accessories', palette: 'Black, wine red, parchment, muted violet',
    physical: [
      ['Hair', 'Deep burgundy hair gathered into a high bun, with long side-parted strands framing the face.'],
      ['Eyes', 'Light hazel.'],
      ['Height and build', 'Average height with a curving figure.'],
      ['Distinguishing features', 'Round gold-rimmed glasses and long gold drop earrings.']
    ],
    personalitySummary: 'Natalia is a researcher first and a private investigator by necessity. She protects her intellectual autonomy, builds her own analytical framework, and studies unusual systems without needing institutional agreement. Under pressure, she moves between ritual history, psychology, folklore, and magecraft until one mechanism accounts for the evidence. In the shared-curse case, she introduces the ego hypothesis and quotes Jung. Her former teaching habits and deliberate teasing turn Lynleit\'s search for an answer into an unwelcome examination.',
    traits: [
      { label: 'Independent scholarship', note: 'She resigned from the Academy when its environment became too restrictive for the questions and methods she wanted to pursue.' },
      { label: 'Magical examination', note: 'She investigates people as readily as incidents, studying unusual magecraft, personal deviations, and conditions with a precision closer to a physician than a conventional detective.' },
      { label: 'Selective casework', note: 'The business has one employee: Natalia. Paid cases finance her research and let her choose which clients, risks, and secrets enter her office.' },
      { label: 'Identity analysis', note: 'When Lynleit and Kyrien inherit a curse across both egos, Natalia connects the mechanism to substitute identities, sympathetic recognition, and changes deep enough to reorganize the conscious self.' }
    ],
    origin: 'Natalia earned a professorship at the Magi Academy as a talented Magus and serious researcher. Lynleit became her favourite student during those years. Natalia eventually found academic life too constraining: the institution could support scholarship, but it also defined which questions were respectable and how far an inquiry was permitted to go. She resigned to continue her work independently.', rupture: 'Natalia opens a private-investigation business to pay for her independent research. Her knowledge of Magi and magecraft attracts clients whose problems ordinary investigators cannot handle.', focus: 'Her one-woman office now sits between a detective agency, consultation room, and private laboratory. Clients bring suspected crimes, unstable talents, personal deviations, and magical problems they cannot safely expose. Natalia examines the person and phenomenon before deciding whether a crime has occurred at all. Lester repeatedly forces her to distinguish professional fascination with his demiholumn condition from personal attention to him. When Myka encounters terrors inside the Academy, Natalia becomes her principal source of advice, rescue, and support beyond the institution. She asks her former student Lynleit for help, then intervenes personally when the danger exceeds the protection Kyrien can provide.', future: 'Natalia\'s work repeatedly brings her into contact with Lester. Her interest in him becomes personal as well as professional. Helping Myka renews her work with Lynleit and introduces her niece to Kyrien and MSF.',
    ally: 'Lester', allyNote: 'Lester is not her employee. He is an outside ally and a demiholumn whose part-Holumn nature sometimes allows him to accomplish what should be impossible for an ordinary investigator. Their repeated work carries sexual tension because her effort to understand him cannot remain entirely separate from personal attention.', connections: [
      { name: 'Lester', relation: 'Outside ally and source of tension', detail: 'Lester remains outside the business, but his demiholumn nature sometimes carries Natalia past barriers that scholarship and ordinary investigation cannot cross. Their attraction develops along the boundary between examination and being personally seen.' },
      { name: 'Myka', relation: 'Niece, student, and friend', detail: 'Natalia keeps constant contact with her niece at the Magi Academy. Myka asks for advice on her studies, Natalia checks on her life, and their bond often resembles mother and daughter as much as aunt and niece.' },
      { name: 'Lynleit', relation: 'Former favourite student', detail: 'Natalia taught Lynleit at the Magi Academy, later asks her to intervene when Myka faces danger, and diagnoses the identity mechanism behind the curse Lynleit shares with Kyrien. Their old teacher-student rhythm survives in Natalia\'s refusal to give Lynleit an answer without making her think through it.' }
    ], rival: 'Institutional capture', rivalNote: 'The Academy, Magiarchy, and Church can each narrow an inquiry by deciding which questions are permissible, which cases belong to them, and which answers must remain hidden.', goal: 'Fund and protect an independent life of magical research while giving clients an answer before hidden authorities reduce their problem to jurisdiction, secrecy, or punishment.',
    timelineNotes: {"Professor at the Academy":"Teaches Lynleit at the Magi Academy.","Scholarship without Permission":"Resigns to pursue research independently.","The Examiner for Hire":"Takes investigative and examination work to fund it.","Myka's Academy Crisis":"Intervenes when Kyrien can no longer contain the danger to Myka.","The Ego as Address":"Identifies transformation as an alternative to the shared curse's fatal solution.","The Demiholumn Ally":"Works with Lester as an independent ally."},
    conflicts: [["Institutional interference","The Academy, Magiarchy, and Church can restrict her inquiries or claim her cases."]],
    beats: ['Professor at the Academy', 'Scholarship without Permission', 'The Examiner for Hire', 'Myka\'s Academy Crisis', 'The Ego as Address', 'The Demiholumn Ally']
  },
  {
    slug: 'lester', name: 'Lester', code: 'ARC · 014', role: 'Demiholumn and Natalia\'s outside ally', factions: ['Independent'], mbti: { type: 'ESTP', detail: 'strong Se', status: 'Confirmed' }, accent: 'neutral', materialStatus: 'Canon nature + mock visual details',
    summary: 'A demiholumn, half human and half Holumn, who remains outside Natalia\'s one-woman business but sometimes does the impossible on her behalf.',
    visual: 'Weathered professional clothing over an outwardly human silhouette', palette: 'Brown, charcoal, cream, faded green',
    physical: [
      ['Hair', 'Unspecified.'],
      ['Eyes', 'Unspecified.'],
      ['Height and build', 'Unspecified.'],
      ['Distinguishing features', 'Unspecified.']
    ],
    personalitySummary: 'Lester seeks stimulation, novelty, conflict, and direct engagement with whatever stands in front of him. His appetite for immediate experience gives Natalia an ally willing to enter situations that scholarship alone cannot reach. His exact capabilities, origin, and inner experience remain unresolved.',
    traits: [
      { label: 'Impossible intervention', note: 'His part-Holumn nature can make an otherwise impossible task achievable for Natalia, although the mechanism and limits remain unknown.' },
      { label: 'Outside ally', note: 'He assists Natalia without joining her business. Natalia remains the sole employee of her office.' },
      { label: 'Unclassified existence', note: 'Neither the human nor Holumn half currently explains the whole person, leaving his place in the hidden world uncertain.' }
    ],
    nature: [
      { label: 'Classification', title: 'Demiholumn', detail: 'Lester is half human and half Holumn. This is an inherent condition, not magecraft, a profession, or membership in Natalia\'s business.' },
      { label: 'Known consequence', title: 'The impossible becomes possible', detail: 'His part-Holumn nature sometimes allows him to accomplish things Natalia could not obtain through ordinary investigation or Magus practice.' },
      { label: 'Unresolved boundary', title: 'Human agency inside a Holumn nature', detail: 'How the two halves coexist, what they permit, and what they cost Lester have not yet been defined.' }
    ],
    origin: 'Lester is a demiholumn, half human and half Holumn. The circumstances of his birth or transformation, and whether either description is fully accurate, remain unknown.', rupture: 'He becomes Natalia\'s ally without becoming her employee. When one of her cases reaches an impossible barrier, his unusual nature can provide an answer that neither ordinary investigation nor conventional magecraft could reach.', focus: 'Lester\'s unusual abilities help Natalia with otherwise impossible cases. He also pushes back against her habit of examining him and notices when her attention becomes personal.', future: 'His working relationship with Natalia develops sexual tension. His origins and the limits of his abilities remain unknown.',
    ally: 'Natalia', allyNote: 'Natalia is his trusted investigator ally, not his employer. She calls on him when a case crosses the boundary between difficult and impossible. Their attraction grows through his refusal to remain only an object of her analysis and her increasing ability to see the man without ignoring the demiholumn condition.', rival: 'Classification', rivalNote: 'Any institution that reduces him to either a human witness or a Holumn threat will misunderstand what he is and may decide that he cannot be allowed to remain free.', goal: 'Help Natalia when ordinary methods fail while preserving the autonomy and secrecy of a life the hidden authorities may refuse to recognize.',
    timelineNotes: {"Between Human and Holumn":"Lives as a demiholumn whose origin is unknown.","Natalia's Outside Ally":"Helps Natalia without joining her business.","The Impossible Favor":"Uses his unusual nature when her casework meets an impossible obstacle.","A Nature without an Explanation":"Remains beyond the classifications used by hidden-world institutions."},
    conflicts: [["Classification","Institutions may treat his demiholumn nature as a threat rather than accept him as a person."]],
    beats: ['Between Human and Holumn', 'Natalia\'s Outside Ally', 'The Impossible Favor', 'A Nature without an Explanation']
  },
  {
    slug: 'myka', name: 'Myka', code: 'ARC · 015', role: 'Magi Academy student', factions: ['Magi Academy', 'Magiarchy'], mbti: { type: 'ISFP?', detail: 'possible strong Fi', status: 'Provisional' }, accent: 'neutral',
    summary: 'A young Magus studying at the Magi Academy who relies on her aunt Natalia for academic advice, personal reassurance, and a view of magical inquiry beyond institutional limits.',
    visual: 'Academic uniform pieces worn with experimental accessories', palette: 'Indigo, cream, pale cyan, black', traits: ['Gifted', 'Earnest', 'Impulsive'],
    physical: [
      ['Hair', 'Long straight black hair with a blunt fringe.'],
      ['Eyes', 'Vivid turquoise.'],
      ['Height and build', 'Short and petite with a slim build.'],
      ['Distinguishing features', 'A youthful round face and unusually bright, expressive eyes.']
    ],
    origin: 'Myka studies at the Magi Academy and keeps in regular contact with her aunt Natalia, a former professor. She asks her for help with studies and personal problems; Natalia checks on her and sometimes treats her like a daughter.', rupture: 'Myka encounters terrors inside the Academy and must rely on Natalia for rescue and support. Natalia asks Lynleit for help, but Lynleit is being sent to Cardiff and dispatches Kyrien as her substitute. The threat turns formal study into a struggle for survival inside an institution meant to train and protect young Magi.', focus: 'Kyrien enters the Academy as a non-Magus undercover helper and keeps Myka safe through conventional field skills and communications with Felix and Reiner. The danger exceeds Lynleit\'s estimate and forces Natalia to intervene personally. This becomes Myka\'s first direct experience with Kyrien and MSF.', future: 'Myka survives the Academy crisis and graduates at the top of her class. Her experience with Kyrien contributes to her later decision to join MSF as a Magus.',
    connections: [
      { name: 'Kyrien', relation: 'First MSF protector', detail: 'Kyrien enters the Academy undercover as Lynleit\'s substitute. Their survival of the crisis gives Myka her first direct knowledge of MSF and contributes to her later decision to join it.' }
    ],
    ally: 'Natalia', allyNote: 'Her aunt, adviser, and friend. Natalia has no children of her own and sometimes treats Myka like a daughter, while Myka trusts her with academic problems and personal concerns that do not fit comfortably inside Academy life.', rival: 'Inexperience', rivalNote: 'The distance between understanding a rule and surviving its failure.', goal: 'Become useful without mistaking raw ability for readiness, while learning which parts of Natalia\'s independence are worth following and which carry risks the Academy was built to contain.',
    timelineNotes: {"Learning the Structure":"Studies at the Academy and seeks advice from Natalia.","Terrors inside the Academy":"Faces dangers she cannot resolve within the institution.","Kyrien Undercover":"Receives help from Kyrien and later Natalia.","Graduation at the Top":"Survives and graduates at the top of her class.","Recruited by MSF":"Joins the agency after her experience with Kyrien."},
    conflicts: [["Danger at the Academy","She needs outside help to survive inside the institution training her."]],
    beats: ['Learning the Structure', 'Terrors inside the Academy', 'Kyrien Undercover', 'Graduation at the Top', 'Recruited by MSF']
  },
  {
    slug: 'inspector-leo', name: 'Inspector Leo', code: 'PLC · 016', role: 'Police inspector', factions: ['Police'], mbti: { type: 'XSTJ?', detail: 'possible Te', status: 'Provisional' }, accent: 'blue',
    summary: 'A police inspector whose missing-person investigation reaches the edge of a quarantine controlled by authorities above his clearance.',
    visual: 'Practical detective clothing with restrained police identifiers and a worn notebook', palette: 'Navy, grey, white, signal blue', traits: ['Tenacious', 'Procedural', 'Skeptical'],
    physical: [
      ['Hair', 'Unspecified.'],
      ['Eyes', 'Unspecified.'],
      ['Height and build', 'Unspecified.'],
      ['Distinguishing features', 'Unspecified.']
    ],
    origin: 'Leo is a married police inspector who trusts patient interviews and the belief that every disappearance leaves a human trail.', rupture: 'Searchers vanish after entering the park, then the case is removed from police control under a government quarantine.', focus: 'Following procedure now means abandoning the investigation, while continuing it means challenging his own institution. He remains outside the hidden world of Magi and interprets the crisis through police evidence.', future: 'The Church and MSF each know more than they admit, leaving Leo to investigate the authorities controlling the answers without understanding the supernatural order behind them.',
    connections: [
      { name: 'Spouse', relation: 'Marriage', detail: 'Leo is married.' }
    ],
    ally: 'Police', allyNote: 'The institution gives him access to witnesses, records, and the public duty attached to the missing-person investigation.', rival: 'Jurisdiction', rivalNote: 'The official boundary used to separate him from the people he is responsible for finding.', goal: 'Account for every missing person, regardless of who classified the reason.',
    timelineNotes: {"The Missing-Person Desk":"Investigates disappearances.","Searchers Vanish Too":"Loses searchers sent into the park.","Locked outside the Quarantine":"Is excluded when the government takes over the quarantine.","Investigating the Authorities":"Questions the authorities withholding information."},
    conflicts: [["Withheld evidence","The quarantine blocks access to the people and places his investigation concerns."]],
    beats: ['The Missing-Person Desk', 'Searchers Vanish Too', 'Locked outside the Quarantine', 'Investigating the Authorities']
  },
  {
    slug: 'father-mikhail', name: 'Father Mikhail', code: 'CHR · 017', role: 'Church special envoy', factions: ['The Church'], mbti: { type: 'XNJ?', detail: 'possible Ni; INFJ lead', status: 'Provisional' }, accent: 'neutral', materialStatus: 'Canon office + mock details',
    summary: 'A Church special envoy and formidable field operative whose mission in Cardiff forces him to survive several Magi threats before Lynleit reaches him.',
    visual: 'Understated clerical dress with old protective symbols and no ornament', palette: 'Black, stone, dull gold, deep red', traits: ['Disciplined', 'Compassionate', 'Severe'],
    physical: [
      ['Hair', 'Unspecified.'],
      ['Eyes', 'Unspecified.'],
      ['Height and build', 'Unspecified.'],
      ['Distinguishing features', 'Unspecified.']
    ],
    personalitySummary: 'Mikhail explains difficult doctrine patiently but can be startlingly blunt about its practical consequences. He lets Lynleit be angry without withdrawing his advice. In the field, he survives confrontations with Magi even when operating alone.',
    tradecraft: [
      { label: 'Church field service', title: 'Counter-Magus survival', detail: 'Mikhail can continue operating alone against several Magi threats and defeat some of them.' },
      { label: 'Special-envoy duty', title: 'Restricted authority', detail: 'Church leadership sends him into exceptional cases under a delegated authority distinct from ordinary priesthood.' },
      { label: 'Operational endurance', title: 'Solitary resistance', detail: 'The Cardiff venture establishes that he can preserve a mission through isolation, injury risk, and repeated supernatural pressure until assistance arrives.' },
      { label: 'Theological diagnosis', title: 'Identity-bound curses', detail: 'Mikhail uses Church records to distinguish attachments to psychic continuity from injuries to flesh or soul. His advice can be patient, exact, and abruptly irreverent once the mechanism is clear.' }
    ],
    origin: 'Mikhail is trained as a priest for public cover, a special envoy for restricted Church operations, and a field operative capable of confronting Magi.', rupture: 'He becomes the first authority to discover that Lynleit has shared forbidden knowledge of magic with Kyrien, Felix, and Reiner. When she promises to contain the breach on her own terms, he warns that he may later be sent to clean up the consequences.', focus: 'During Arc 1, Mikhail travels to Cardiff on special-envoy duty. The assignment becomes a life-and-death ordeal in which he survives several Magi threats alone and defeats some of them. The Magiarchy and Church later send Lynleit to assist him. Their methods are morally incompatible, but they continue the mission and protect one another.', future: 'The disagreement in Cardiff continues to affect Mikhail and Lynleit after they return to Narvea. His discovery of the witness breach also contributes to MSF taking on a Magi role under Church and Magiarchy oversight.',
    connections: [
      { name: 'Lynleit', relation: 'Cardiff counterpart and difficult penitent', detail: 'Lynleit reaches Mikhail after his foreign assignment becomes a life-and-death operation. They protect one another despite lasting moral incompatibility. He later confirms that the curse she shares with Kyrien can be broken through identity transformation and gives the practical answer with a bluntness that leaves her furious.' }
    ],
    ally: 'The Church', allyNote: 'The institution that trains, authorizes, and may later send him to contain the witness breach.', rival: 'Church doctrine', rivalNote: 'The authority that gives him purpose while limiting the mercy he can show.', goal: 'Complete the Cardiff assignment, contain supernatural threats under Church authority, and prevent necessary secrecy from becoming moral surrender.',
    timelineNotes: {"A Keeper of Restricted Truth":"Discovers Lynleit's disclosure to Kyrien, Felix, and Reiner.","The Cardiff Venture":"Travels abroad on special-envoy duty and faces several Magi threats.","Lynleit Arrives":"Receives her assistance at Church and Magiarchy request.","Methods in Conflict":"Cooperates with Lynleit despite moral disagreement.","The Unrespectable Answer":"Consults Church records about Lynleit and Kyrien's shared curse.","Consequences in Narvea":"Returns with a rift that affects his later dealings with Lynleit."},
    conflicts: [["Lynleit's methods","They protect one another in Cardiff without agreeing about how the work should be done."]],
    beats: ['A Keeper of Restricted Truth', 'The Cardiff Venture', 'Lynleit Arrives', 'Methods in Conflict', 'The Unrespectable Answer', 'Consequences in Narvea']
  },
  {
    slug: 'ash', name: 'Ash', code: 'HSE · 018', role: 'Grey cat of the Director\'s House', ageBand: 'Unspecified', factions: ['Household'], mbti: { type: 'XXXX', status: 'Undiscussed' }, accent: 'neutral', materialStatus: 'Canon character',
    summary: 'A grey male cat who enters Lynleit\'s family home uninvited, survives her clumsy attempt to remove him, and decides to remain.',
    visual: 'A grey domestic cat with a compact feline silhouette', palette: 'Ash grey',
    physical: [
      ['Coat', 'Short ash-grey fur.'],
      ['Eyes', 'Amber-gold.'],
      ['Size and build', 'Medium-sized with a lean, long-limbed build.'],
      ['Distinguishing features', 'A dark collar with a round silver tag bearing the letter A.']
    ],
    personalitySummary: 'Ash enters uninvited, repeatedly slips away when Lynleit tries to catch him, and stays once she lets him shelter from the rain.',
    traits: [
      { label: 'Evasion', note: 'He repeatedly slips away during Lynleit\'s pursuit through the house.' },
      { label: 'Persistence', note: 'Being caught does not end his occupation of the house.' },
      { label: 'Domestic presence', note: 'He makes himself at home among the household and its visitors.' }
    ],
    origin: 'Ash enters the Vilen family house during the early chapters.',
    rupture: 'Lynleit chases him through the house. He escapes her several times before she catches him.',
    focus: 'Lynleit cannot bring herself to put him outside in the rain.',
    future: 'Ash remains at the house.',
    connections: [
      { name: 'Lynleit', relation: 'First household bond', detail: 'She chases and catches him, then allows him to remain rather than putting him outside in the rain.' },
      { name: 'The Director\'s House', relation: 'Chosen home', detail: 'Ash enters as a trespasser and establishes himself as a permanent resident.' }
    ],
    rival: 'Expulsion from the house', rivalNote: 'Lynleit catches him, but the rain prevents his removal and gives him the chance to stay.',
    institutionConflict: 'Ash has no institutional role.',
    goal: 'Remain in the Vilen house as shelter and territory.',
    timelineNotes: {"The Trespasser":"Enters the family house.","The Chase":"Evades Lynleit through several rooms.","Shelter from the Rain":"Is caught but spared eviction into the rain.","The Permanent Loiterer":"Stays."},
    conflicts: [["An unwanted guest","Lynleit tries to put him out before deciding to let him stay."]],
    beats: ['The Trespasser', 'The Chase', 'Shelter from the Rain', 'The Permanent Loiterer']
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
  kyrien: { analysis: 95, influence: 44, awareness: 89, fieldcraft: 93, combat: 82, magecraft: 0 },
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
  'father-mikhail': { analysis: 84, influence: 78, awareness: 88, fieldcraft: 82, combat: 89, magecraft: 0 },
  ash: { analysis: 25, influence: 45, awareness: 88, fieldcraft: 75, combat: 18, magecraft: 0 }
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

  const caption = createElement('figcaption', '', 'The profile compares six practical dimensions on a shared 0 to 100 scale.');
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

let galleryCatalogPromise;

function loadGalleryCatalog() {
  if (!galleryCatalogPromise) {
    galleryCatalogPromise = fetch('gallery.html', { cache: 'no-cache' })
      .then((response) => {
        if (!response.ok) throw new Error(`Gallery catalog returned ${response.status}`);
        return response.text();
      })
      .then((markup) => new DOMParser().parseFromString(markup, 'text/html'))
      .catch((error) => {
        galleryCatalogPromise = null;
        throw error;
      });
  }
  return galleryCatalogPromise;
}

async function loadProfilePortrait(profile, portrait, note) {
  const placeholder = createElement('div', 'profile-portrait-placeholder', profile.name.split(' ').map((part) => part[0]).join(''));
  placeholder.setAttribute('role', 'img');
  placeholder.setAttribute('aria-label', `Portrait unavailable for ${profile.name}`);
  portrait.append(placeholder, note);

  try {
    const galleryDocument = await loadGalleryCatalog();
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

    const storyArc = sourceImage.closest('.gallery-card')?.dataset.storyArc;
    const portraitLabel = storyArc ? `${storyArc.replace('-', ' ')} gallery portrait` : 'Gallery portrait';
    note.textContent = artworks.length > 1
      ? `${portraitLabel} ${selectedIndex + 1} of ${artworks.length}`
      : portraitLabel;
    portrait.replaceChildren(image, note);
  } catch (error) {
    console.warn(`Could not load gallery portrait for ${profile.name}.`, error);
  }
}

function relationshipTextMentions(text, name) {
  if (!text || !name) return false;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`, 'i').test(text);
}

function relationshipKind(relation = '') {
  return /rival|friction|enemy|conflict/i.test(relation) ? 'friction' : 'bond';
}

function directRelationshipTargets(profile) {
  const targets = new Map();
  const add = (reference, relation, detail, kind, priority) => {
    profileSeeds.forEach((candidate) => {
      if (candidate.slug === profile.slug || !relationshipTextMentions(reference, candidate.name)) return;
      const previous = targets.get(candidate.slug);
      if (!previous || priority > previous.priority) {
        targets.set(candidate.slug, {
          slug: candidate.slug,
          name: candidate.name,
          relation,
          detail,
          kind,
          priority
        });
      }
    });
  };

  (profile.connections ?? []).forEach(({ name, relation, detail }) => {
    add(name, relation, detail, relationshipKind(relation), 4);
  });
  add(profile.ally, 'Primary connection', profile.allyNote, 'bond', 3);
  add(profile.rival, 'Central friction', profile.rivalNote, 'friction', 3);
  return targets;
}

function collectProfileRelationships(profile) {
  const relationships = directRelationshipTargets(profile);

  profileSeeds.forEach((candidate) => {
    if (candidate.slug === profile.slug) return;
    const incoming = directRelationshipTargets(candidate).get(profile.slug);
    if (!incoming || relationships.has(candidate.slug)) return;
    relationships.set(candidate.slug, {
      slug: candidate.slug,
      name: candidate.name,
      relation: incoming.kind === 'friction' ? 'Recorded friction' : 'Recorded connection',
      detail: incoming.detail,
      kind: incoming.kind,
      priority: 1
    });
  });

  return [...relationships.values()].sort((a, b) => b.priority - a.priority || a.name.localeCompare(b.name));
}

function createSvgElement(name, attributes = {}) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

async function loadRelationshipChibis(nodes) {
  try {
    const galleryDocument = await loadGalleryCatalog();
    const cards = Array.from(galleryDocument.querySelectorAll('.gallery-card[data-chibi="true"]'));
    nodes.forEach(({ record, avatar }) => {
      const card = cards.find((candidate) => (candidate.dataset.character ?? '').split(/\s+/).includes(record.profile.slug));
      const source = card?.querySelector('img')?.getAttribute('src');
      if (!source) return;
      record.chibiSource = source;
      const image = createElement('img');
      image.src = source;
      image.alt = '';
      image.decoding = 'async';
      image.draggable = false;
      avatar.replaceChildren(image);
      avatar.classList.add('has-image');
    });
  } catch (error) {
    console.warn('Relationship-map chibis could not be loaded.', error);
  }
}

function renderRelationshipMap(profile, host) {
  if (!host) return;
  const relationships = collectProfileRelationships(profile);
  if (!relationships.length) {
    host.hidden = true;
    return;
  }

  const map = createElement('div', 'relationship-map');
  const meta = createElement('div', 'relationship-map-meta');
  const metaCopy = createElement('div');
  metaCopy.append(
    createElement('strong', '', 'Known character links'),
    createElement('span', '', `${relationships.length} connected ${relationships.length === 1 ? 'character' : 'characters'}`)
  );
  meta.append(metaCopy, createElement('span', 'relationship-map-instruction', 'Select a portrait to inspect · drag to rearrange'));

  const stage = createElement('div', 'relationship-map-stage');
  stage.setAttribute('aria-label', `Interactive relationship map for ${profile.name}`);
  const lines = createSvgElement('svg', { class: 'relationship-map-lines', 'aria-hidden': 'true' });
  stage.append(lines);

  const detail = createElement('div', 'relationship-map-detail');
  detail.setAttribute('aria-live', 'polite');
  const detailInner = createElement('div', 'relationship-map-detail-inner');
  const detailVisual = createElement('div', 'relationship-map-detail-visual');
  const detailPair = createElement('div', 'relationship-map-detail-pair');
  const detailOriginAvatar = createElement('span', 'relationship-map-detail-avatar is-origin');
  const detailConnector = createElement('span', 'relationship-map-detail-connector');
  detailConnector.setAttribute('aria-hidden', 'true');
  const detailTargetAvatar = createElement('span', 'relationship-map-detail-avatar is-target');
  detailPair.append(detailOriginAvatar, detailConnector, detailTargetAvatar);
  const detailCounter = createElement('span', 'relationship-map-detail-counter');
  const detailPager = createElement('div', 'relationship-map-detail-pager');
  const detailPrevious = createElement('button', '', '←');
  detailPrevious.type = 'button';
  detailPrevious.setAttribute('aria-label', 'Show previous connection');
  const detailBrowseLabel = createElement('span', '', 'Browse');
  const detailNext = createElement('button', '', '→');
  detailNext.type = 'button';
  detailNext.setAttribute('aria-label', 'Show next connection');
  detailPager.append(detailPrevious, detailBrowseLabel, detailNext);
  detailVisual.append(detailPair, detailCounter, detailPager);

  const detailBody = createElement('article', 'relationship-map-detail-body');
  const detailHeader = createElement('header', 'relationship-map-detail-header');
  const detailTitle = createElement('div');
  const detailEyebrow = createElement('small', 'relationship-map-detail-eyebrow', 'Selected relationship');
  const detailName = createElement('h3');
  detailTitle.append(detailEyebrow, detailName);
  const detailLabel = createElement('span', 'relationship-map-detail-kind');
  detailHeader.append(detailTitle, detailLabel);
  const detailCopy = createElement('p');
  const detailActions = createElement('div', 'relationship-map-detail-actions');
  const detailLink = createElement('a', 'relationship-map-detail-link');
  detailActions.append(detailLink);
  detailBody.append(detailHeader, detailCopy, detailActions);
  detailInner.append(detailVisual, detailBody);
  detail.append(detailInner);

  const records = [{
    slug: profile.slug,
    name: profile.name,
    relation: 'Current profile',
    detail: profile.summary,
    kind: 'center',
    profile
  }, ...relationships.map((relationship) => ({
    ...relationship,
    profile: profilesBySlug.get(relationship.slug)
  }))];
  const connectionRecords = records.slice(1);
  const nodeRecords = [];
  const edgeRecords = [];
  let selectedRecord = connectionRecords[0];

  const addEdge = (from, to, kind, secondary = false) => {
    const edge = createSvgElement('line', {
      class: `relationship-map-edge is-${kind}${secondary ? ' is-secondary' : ''}`,
      'data-from': from,
      'data-to': to
    });
    lines.append(edge);
    edgeRecords.push({ from, to, edge });
  };

  relationships.forEach((relationship) => addEdge(profile.slug, relationship.slug, relationship.kind));
  for (let first = 0; first < relationships.length; first += 1) {
    for (let second = first + 1; second < relationships.length; second += 1) {
      const source = profilesBySlug.get(relationships[first].slug);
      const target = relationships[second];
      const targetProfile = profilesBySlug.get(target.slug);
      const connection = directRelationshipTargets(source).get(target.slug)
        ?? directRelationshipTargets(targetProfile).get(source.slug);
      if (connection) addEdge(source.slug, target.slug, connection.kind, true);
    }
  }

  function setDetailAvatar(avatar, record) {
    avatar.classList.toggle('has-image', Boolean(record.chibiSource));
    if (record.chibiSource) {
      const image = createElement('img');
      image.src = record.chibiSource;
      image.alt = '';
      image.decoding = 'async';
      image.draggable = false;
      avatar.replaceChildren(image);
      return;
    }
    avatar.textContent = record.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
  }

  function updateDetail(record) {
    selectedRecord = record;
    const connectionIndex = connectionRecords.findIndex((candidate) => candidate.slug === record.slug);
    const isCurrentProfile = record.slug === profile.slug;
    detailLabel.textContent = record.relation;
    detailName.textContent = record.name;
    detailCopy.textContent = record.detail;
    detailLink.href = `character.html?character=${encodeURIComponent(record.slug)}`;
    detailLink.textContent = `Open ${record.name} profile →`;
    detailLink.hidden = isCurrentProfile;
    detailCounter.textContent = connectionIndex >= 0
      ? `Connection ${connectionIndex + 1} of ${connectionRecords.length}`
      : `${connectionRecords.length} known ${connectionRecords.length === 1 ? 'connection' : 'connections'}`;
    detailPrevious.disabled = connectionRecords.length < 2;
    detailNext.disabled = connectionRecords.length < 2;
    detailPair.classList.toggle('is-current-profile', isCurrentProfile);
    detailPair.setAttribute('aria-label', isCurrentProfile
      ? `${profile.name}, current profile`
      : `${profile.name} connected to ${record.name}`);
    detailConnector.hidden = isCurrentProfile;
    detailTargetAvatar.hidden = isCurrentProfile;
    setDetailAvatar(detailOriginAvatar, records[0]);
    setDetailAvatar(detailTargetAvatar, record);
    nodeRecords.forEach(({ record: candidate, node }) => {
      const active = candidate.slug === record.slug;
      node.classList.toggle('is-selected', active);
      node.setAttribute('aria-pressed', String(active));
    });
    edgeRecords.forEach(({ from, to, edge }) => {
      edge.classList.toggle('is-active', from === record.slug || to === record.slug);
    });
  }

  function moveDetail(direction) {
    const currentIndex = connectionRecords.findIndex((record) => record.slug === selectedRecord?.slug);
    const nextIndex = currentIndex < 0
      ? (direction > 0 ? 0 : connectionRecords.length - 1)
      : (currentIndex + direction + connectionRecords.length) % connectionRecords.length;
    updateDetail(connectionRecords[nextIndex]);
  }

  detailPrevious.addEventListener('click', () => moveDetail(-1));
  detailNext.addEventListener('click', () => moveDetail(1));

  records.forEach((record, index) => {
    const node = createElement('button', `relationship-node${index === 0 ? ' is-center' : ''}`);
    node.type = 'button';
    node.draggable = false;
    node.dataset.slug = record.slug;
    node.setAttribute('aria-label', `${record.name}: ${record.relation}`);
    node.setAttribute('aria-pressed', 'false');
    const avatar = createElement('span', 'relationship-node-avatar', record.name.split(' ').map((part) => part[0]).join('').slice(0, 2));
    avatar.setAttribute('aria-hidden', 'true');
    node.append(avatar, createElement('span', 'relationship-node-name', record.name));
    node.addEventListener('dragstart', (event) => event.preventDefault());

    if (index === 0) {
      node.style.left = '50%';
      node.style.top = '50%';
    } else {
      const angle = -Math.PI / 2 + ((index - 1) * Math.PI * 2) / relationships.length;
      node.style.left = `${50 + Math.cos(angle) * 37}%`;
      node.style.top = `${50 + Math.sin(angle) * 37}%`;
    }
    stage.append(node);
    nodeRecords.push({ record, node, avatar });
  });

  function drawEdges() {
    const stageRect = stage.getBoundingClientRect();
    if (!stageRect.width || !stageRect.height) return;
    const centers = new Map(nodeRecords.map(({ record, node }) => {
      const rect = node.getBoundingClientRect();
      return [record.slug, {
        x: rect.left - stageRect.left + rect.width / 2,
        y: rect.top - stageRect.top + rect.height / 2
      }];
    }));
    edgeRecords.forEach(({ from, to, edge }) => {
      const start = centers.get(from);
      const end = centers.get(to);
      if (!start || !end) return;
      edge.setAttribute('x1', start.x);
      edge.setAttribute('y1', start.y);
      edge.setAttribute('x2', end.x);
      edge.setAttribute('y2', end.y);
    });
  }

  nodeRecords.forEach(({ record, node }, index) => {
    let pointerState = null;
    node.addEventListener('click', () => {
      if (pointerState?.moved) {
        pointerState.moved = false;
        return;
      }
      updateDetail(record);
    });
    if (index === 0) return;

    node.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      const nodeRect = node.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      pointerState = {
        id: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        nodeX: nodeRect.left - stageRect.left + nodeRect.width / 2,
        nodeY: nodeRect.top - stageRect.top + nodeRect.height / 2,
        moved: false
      };
      node.setPointerCapture(event.pointerId);
    });
    node.addEventListener('pointermove', (event) => {
      if (!pointerState || event.pointerId !== pointerState.id) return;
      const deltaX = event.clientX - pointerState.startX;
      const deltaY = event.clientY - pointerState.startY;
      if (Math.hypot(deltaX, deltaY) > 4) pointerState.moved = true;
      if (!pointerState.moved) return;
      const padding = 44;
      const x = Math.max(padding, Math.min(stage.clientWidth - padding, pointerState.nodeX + deltaX));
      const y = Math.max(padding, Math.min(stage.clientHeight - padding, pointerState.nodeY + deltaY));
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.classList.add('is-dragging');
      drawEdges();
    });
    const finishDrag = (event) => {
      if (!pointerState || event.pointerId !== pointerState.id) return;
      const moved = pointerState.moved;
      pointerState = null;
      if (node.hasPointerCapture(event.pointerId)) node.releasePointerCapture(event.pointerId);
      node.classList.remove('is-dragging');
      if (moved) updateDetail(record);
    };
    node.addEventListener('pointerup', finishDrag);
    node.addEventListener('pointercancel', finishDrag);
    window.addEventListener('pointerup', finishDrag);
    window.addEventListener('pointercancel', finishDrag);
    node.addEventListener('lostpointercapture', () => {
      node.classList.remove('is-dragging');
      if (pointerState?.moved) updateDetail(record);
      pointerState = null;
    });
    node.addEventListener('keydown', (event) => {
      const movement = {
        ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12]
      }[event.key];
      if (!movement) return;
      event.preventDefault();
      const nodeRect = node.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const x = Math.max(44, Math.min(stage.clientWidth - 44, nodeRect.left - stageRect.left + nodeRect.width / 2 + movement[0]));
      const y = Math.max(44, Math.min(stage.clientHeight - 44, nodeRect.top - stageRect.top + nodeRect.height / 2 + movement[1]));
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      drawEdges();
    });
  });

  map.append(meta, stage, detail);
  host.replaceChildren(map);
  updateDetail(records[1]);
  requestAnimationFrame(drawEdges);
  if ('ResizeObserver' in window) new ResizeObserver(drawEdges).observe(stage);
  loadRelationshipChibis(nodeRecords).then(() => updateDetail(selectedRecord));
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
      const versionCount = Array.isArray(entry.versions) && entry.versions.length ? entry.versions.length : 1;
      const versionLabel = versionCount > 1 ? ` · ${versionCount} versions` : '';
      const link = createElement('a', 'character-moment-card');
      link.href = `moments.html?moment=${encodeURIComponent(entry.slug)}`;
      const top = createElement('div');
      top.append(createElement('span', '', entry.code), createElement('small', '', `${entry.timelineLabel}${versionLabel}`));
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
      const versionCount = Array.isArray(entry.versions) && entry.versions.length ? entry.versions.length : 1;
      const versionLabel = versionCount > 1 ? ` · ${versionCount} versions` : '';
      const link = createElement('a', '', `${entry.code} · ${entry.title}${versionLabel}`);
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
  profile.beats.forEach((title, index) => {
    const item = createElement('li');
    item.dataset.timelineBeat = title;
    item.append(createElement('span', 'character-timeline-marker', String(index + 1).padStart(2, '0')));
    const copy = createElement('div');
    copy.append(createElement('h3', '', title));
    const detail = profile.timelineNotes?.[title];
    if (detail) copy.append(createElement('p', '', detail));
    item.append(copy);
    timeline.append(item);
  });
  initializeProfileTimelineDrag(timeline);
  loadCharacterMoments(profile, timeline);

  const appearance = document.querySelector('#character-appearance');
  const appearanceDetails = [
    ...(profile.physical ?? []),
    ['Wardrobe and silhouette', profile.visual],
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
      if (entry.href) copy.append(createElement('b', 'equipment-link', 'Open item record →'));
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
    ['Background', biographyOrigin], ['Turning point', profile.rupture], ['During the crisis', profile.focus], ['Later life', profile.future]
  ].forEach(([title, detail], index) => {
    const item = createElement('li');
    item.append(createElement('span', '', String(index + 1).padStart(2, '0')));
    const copy = createElement('div');
    copy.append(createElement('h3', '', title), createElement('p', '', detail));
    item.append(copy);
    biography.append(item);
  });

  const connections = document.querySelector('#character-connections');
  const mappedRelationships = collectProfileRelationships(profile);
  renderRelationshipMap(profile, document.querySelector('#character-relationship-map'));
  const tensionHost = document.querySelector('#character-sexual-tension');
  if (tensionHost && window.MAGIARCHY_SEXUAL_TENSION) {
    window.MAGIARCHY_SEXUAL_TENSION.load().then((registry) => {
      const module = window.MAGIARCHY_SEXUAL_TENSION.createModule(registry, profile.slug);
      tensionHost.replaceChildren();
      tensionHost.hidden = !module;
      if (module) tensionHost.append(module);
    }).catch((error) => {
      tensionHost.hidden = true;
      console.warn(`Sexual tension notes could not be connected to ${profile.name}.`, error);
    });
  }
  const personalConnections = profile.connections
    ? profile.connections.map(({ name, relation, detail }) => [name, relation, detail])
    : [[profile.ally, 'Primary connection', profile.allyNote]];
  [
    ...personalConnections, [profile.rival, 'Central friction', profile.rivalNote]
  ].filter(([name, , detail]) => name && detail && !mappedRelationships.some((mapped) => relationshipTextMentions(name, mapped.name))).forEach(([name, relation, detail]) => {
    const card = createElement('article', 'connection-card');
    card.append(createElement('small', '', relation), createElement('h3', '', name), createElement('p', '', detail));
    connections.append(card);
  });
  connections.hidden = !connections.children.length;

  const conflicts = document.querySelector('#character-conflicts');
  (profile.conflicts ?? []).forEach(([title, detail]) => {
    const card = createElement('article');
    card.append(createElement('span', '', 'Conflict'), createElement('div'));
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
