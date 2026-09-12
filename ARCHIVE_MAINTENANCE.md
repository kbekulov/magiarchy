# MAGIARCHY Archive Maintenance Charter

This file is the concise operating map for future agents and maintainers. `AGENTS.md` remains the controlling instruction set. Read both before changing archive content or structure. When a new recurring workflow, record type, or design rule is introduced, update this charter in the same commit.

## Authority and record states

Shared UI invariants: Music uses the Characters archive toolbar with category and tag chips. Track assignments are editable catalog metadata, not new canon. Character cards randomize registered chibis with visible era labels; profile artwork uses image-half navigation, swipes, and thumbnails, without arrow buttons. Timeline counts may expand anywhere: retain IDs, derive numbers from order, and use the shared labelled Arc bands in Story, Moments, and profile timelines. Never infer an unplaced event's Arc merely to color it.

1. The author is the only final authority over canon.
2. Established canon is written as fact on public wiki surfaces.
3. Questions, contradictions, mock structures, audit proposals, and working interpretations remain in writer-facing Docs or private page notes.
4. The Nasu audit is advisory. Notify the author whenever it materially shapes work. Never present it as literal participation by Kinoko Nasu, and never convert its proposal into canon without approval.
5. A user-supplied answer overrides an audit preference. Improve setup, consequence, and presentation without changing the answer.

## Backlog intake

Inspect only the pending `backlog/*.txt` queue. Process exactly one file per response, in filename order unless the author selects another, before ordinary requested work. Workflow changes apply immediately. Both author-drafted and assistant-drafted sources can carry author-approved direction. Preserve specific details, dialogue, and consequences across the relevant sources, ledgers, links, and public surfaces.

After verification, move the unchanged source into `backlog/archive/original-name__YYYY-MM-DDTHH-mm-ssZ.txt` using a UTC timestamp. Never overwrite or delete archived originals, and never treat that subfolder as a pending queue. A concise non-graphic `> [WRITER: ...]` placeholder marks any undrafted passage in Chapters or Docs, with a shared amber callout and visible Writer notice label. Preserve permissible surrounding material without inventing replacement actions. Such a gap is not completed prose or a reader inference. Contradictions that block integration still require author direction; keep that source pending.

## Source and surface map

| Content | Shared source | Required public or writer surfaces |
| --- | --- | --- |
| Characters | `character.js` | Character catalog, profile, timeline, connections, global search |
| Character artwork | `media/gallery/images/` plus Gallery metadata | Gallery, character card or portrait where approved, with explicit Arc metadata for era-specific art |
| Chapters | `story/*.md` and `story/index.json` | Story catalog, chapter reader, version switcher, preface table, Story phase, involved profiles, global search |
| Moments | `moments/index.json` | Moment catalog and reader, version switcher, Story phase, involved profiles, assigned Chapter, global search |
| Story arcs and phases | `story-phases.js` | Story timeline, Moments timeline, Chapter placement and reveal timing |
| World institutions and places | Dedicated page and owning data file where present | World index and submenu, entity links, global search |
| Holumn evidence | `holumns/index.json` | Holumns World synthesis and `docs/holumn-incidents-and-testimonies.md` |
| Weapons | `weapons/index.json` | Weapons World record, character Equipment links, global search |
| Items and artefacts | `items/index.json` | Items & Artefacts World catalog and detail records, character Equipment links, Moments, Chapters, entity links, global search |
| Character behavior guidance | `docs/character-behavior-notes.json` | Full Character Behaviour Audit plus F, M, or S paragraph tooltips in every relevant Chapter and Moment |
| Sexual tension guidance | `docs/sexual-tension-notes.json` | Character profile tension module and Character Intimacy and Sexuality Reference |
| Editorial uncertainty | `docs/questions-to-be-answered.md` | Questions document only |
| Genuine conflict | `docs/contradictions-to-resolve.md` | Contradictions document only |
| Capability balance | `docs/character-capability-balance.md` and `skillProfiles` in `character.js` | Capability ledger and profile graph |
| Prose style | `docs/prose-style.md` | Read alongside each Chapter or Moment draft; record accepted style choices, working implementations, source-version provenance, and verified quotation sources |
| Documents | Markdown in `docs/` plus `docs/index.json`, with `defaultVersion` and ordered `versions` | Docs catalog, versioned reader, matching Markdown link, global search for every version |
| Music | `music.html` and author-supplied audio in `media/music/` | Music cards, MP3 playback, separate MP3 and WAV downloads, global search |

## Mandatory follow-up for every content change

1. Update the owning source instead of copying the fact into unrelated records. For narrative work, first read `docs/prose-style.md` and keep it alongside the draft; use its revision protocol and record only reusable findings afterward.
2. Check every affected surface in the source and surface map.
3. Add or update entity links for every character, place, faction, institution, weapon, and defined term that already has a destination.
4. Check chronology, Story phase placement, character timelines, Moment links, and Chapter assignment.
5. Check the Questions ledger for newly exposed uncertainty and the Contradictions ledger for statements that cannot both remain true.
6. Check character capability balance when a skill, power, resource, status, or operational role changes.
7. Check sexual tension records whenever a Chapter, Moment, or relationship changes contact, attraction, avoidance, rivalry, physical awareness, status, or emotional access.
8. Check character behavior notes whenever a Chapter or Moment creates a reaction where embodiment, sex, social experience, MBTI, or story pressure may matter. Place any F, M, or S marker on the exact paragraph or fact it concerns.
9. Rebuild `search-index.json` with `node scripts/build-search-index.mjs`.
   Run `node scripts/verify-archive.mjs` to check timelines, version isolation, behavior-note anchors, and search coverage. This does not replace reading the revised scenes and evaluating their implications.
10. Add the newest Home update entry first in `index.html`.
11. Verify the ownership footer, breadcrumbs, Page notes sidebar, and responsive layout on every new page.
12. Run syntax, content, link, no-gradient, desktop, and mobile checks. Commit task-only changes, push to `origin`, wait for GitHub Pages, and verify the live custom domain.

## Chapter and Moment completion

Every Chapter must have:

- Markdown text in `story/`;
- a `story/index.json` record;
- a Story phase;
- involved-character labels;
- a preface table whose rows are marked as shown or stated, or left for the reader to infer;
- links to assigned Moments and involved character timelines;
- F, M, or S paragraph markers where the behavior registry contains relevant guidance.

Alternate Chapters and Moments use ordered `versions` records with one explicit `defaultVersion`. Each Chapter version has its own Markdown file, and each versioned Moment points to the matching Chapter version. Reader switchers and global search expose direct version links. Shared character, Holumn, intimacy, and chronology records continue to follow the default version until the author selects another. Differences that cannot coexist belong in the contradictions ledger and must name every shared record that currently follows one outcome.

Every Moment must have:

- one record in `moments/index.json`;
- Story phase, placement status, scene function, location, involved characters, known facts, open questions, continuity before and after, and optional Chapter assignment;
- character-timeline anchors for every involved profile;
- fact rows marked as shown or stated, or left for the reader to infer;
- F, M, or S markers on the exact fact rows named by the behavior registry.

Inference means the scene supplies enough evidence for the reader to reach a conclusion without openly explaining it. Public labels never mention the Nasu audit or internal drafting language.

Arcs are life periods that may span several years and contain several Story phases. Arc 1 is the main story. Later arcs may function as sequels or prequels. Phase placement must never flatten an arc boundary or expose a reveal earlier than the narrative does. Lynleit's coat is discovered in the middle of Arc 1. Her pregnancy begins near the transition into Arc 2, remains unshown and unexplained, and becomes understandable through inference at the opening of Arc 2.

Concurrent side stories share a Story phase and carry reciprocal Moment links until individual Chapters establish their precise alternation. Each branch keeps its own objective, cast, location, and consequences while recording the event that makes one character delegate responsibility into the other branch.

## Character completion

Every character profile includes:

- hero portrait or an honest unavailable-art placeholder;
- confirmed age band where known;
- MBTI metadata and function emphasis with confirmed or provisional status;
- appearance, visible wardrobe, and physical description;
- strengths and weaknesses with a comparative graph;
- Equipment, Nature, Tradecraft, or Magecraft only when those sections apply;
- biography and character-centered timeline;
- interactive character relationship map;
- lower connection records only for information the map cannot display;
- potential sexual tension sourced from `docs/sexual-tension-notes.json` when supported, or a concise unresolved record where the archive is deliberately watching the question;
- conflicts and motivations.

When artwork depicts a specific Arc or life period, preserve that period in the filename, Gallery metadata, caption, alt text, and profile portrait label. Catalog cards may select any registered chibi, with its explicit era label. Relationship maps keep baseline-period chibis unless explicitly presenting another Arc.

Sexual tension is not a relationship forecast. It may be mutual, asymmetric, subconscious, antagonistic, situational, or permanently unresolved. Each proposed pairing needs character-specific contact and a reason for repeated attention. Do not pair characters merely because they are attractive, available, or of opposite sexes.

Construct tension from an established character priority rather than replacing it. Identify what each person normally controls, then use a repeatable ordinary interaction to let the other disrupt that control. Add restrained bodily tells, allow the reader to notice the pattern before the characters name it, and let crisis intensify tension that already exists instead of using rescue or trauma as its sole source. If authority, coercion, or dependency begins the relationship, a later voluntary choice to remain or return is required before compliance can be read as desire. Lynleit's MSF duty and personal missions remain primary, while her attraction to Kyrien is an involuntary complication.

Describe intimacy through initiative, hesitation, attention, speech, silence, trust, conflict, and change. Do not prescribe sexual positions unless the author establishes exact scene choreography as canon.

Sherie and Felix's author-confirmed direction starts with no meaningful personal relationship. Repeated overlap between diplomacy and MSF work slowly builds familiarity, respect, and private jokes. Felix remains internally fixated on Lynleit while responding to and investing in Sherie; do not make flirtation dissolve that attachment. Preserve Sherie's boundaries, disappointment, and need to be seen clearly, and his eventual desire for her in her own right. Their playful direction, challenge, and reversals allow reciprocal care when performance falters. Lynleit and Kyrien instead grow from deliberate strategic recruitment toward restrained attention and mutually accepted vulnerability. Both remain subplots. The later Sherie-Lynleit boast is not the origin of Sherie and Felix's bond. The shared tension registry and Intimacy Reference own this direction; do not invent meetings, date milestones, or add paragraph-note anchors until an actual scene exists.

When the author supplies a Chapter and identifies its characterization as canon, treat the characters' decisions, speech rhythms, problem-solving habits, and responses under pressure as profile evidence. Reconcile conflicting summaries and guidance with that evidence without turning one exceptional scene into the character's only mode of behavior.

Appearance records contain observable facts only. State physical features, clothing, accessories, grooming, posture, and visible variation without justifying the design, explaining the character's reasons, or assigning personality and capability to the clothing.

## Item and artefact completion

Every Items & Artefacts record includes:

- a stable identifier, slug, name, and classification;
- an image or an honest unavailable-image state;
- known physical forms and visible variation;
- confirmed holder, custody, inheritance, loss, or substitution history;
- properties paired with activation conditions and practical effects;
- limits, blind spots, counterplay, or explicitly unresolved boundaries;
- placement within the correct arc, Story phase, Moment, or Chapter;
- bidirectional links to every affected character Equipment record and story appearance;
- unresolved origin, mechanics, or balance questions kept in the Questions or Capability ledger rather than answered by invention.

An artefact belongs in this archive when its identity, custody, rule, or history changes a character decision or story outcome. Ordinary possessions without such consequence do not need dedicated records. A self-directed item is not automatically classified as a Holumn; that classification remains unresolved until canon establishes it.

## Audit boundaries

- Nasu audit: strengthens pressure, exceptions, costs, partial truths, reveal timing, and character consequence. It remains advisory.
- Continuity audit: finds missing causal links and timeline drift. It does not invent connective canon.
- Contradiction audit: records only mutually incompatible statements. Ordinary uncertainty stays in Questions.
- Capability audit: balances through scope, cost, counterplay, dependencies, and failure. It does not weaken competence arbitrarily.
- Behavior audit: offers character-specific reactions based on history, physical circumstance, MBTI, culture, role, sex, and immediate pressure. It does not claim all men or all women behave alike.
- Sexual tension audit: tracks chemistry supported by contact, friction, attraction, rivalry, status, exposure, ordinary repetition, involuntary bodily awareness, and free choice after coercion. It distinguishes loyalty from desire, compares every pairing against the rest of the cast, and does not turn chemistry into a romance, affair, sexual encounter, or replacement for the main story.
- Public prose audit: removes drafting commentary, AI-like slogans, and process explanations from reader-facing pages.
- Scene prose audit: preserves distinct voices, concrete details, humor, and flawed reactions while removing repeated interpretation. Read `docs/prose-style.md` for narrative voice, focalization, dialogue, comic timing, and line editing. Consult `docs/prose-and-scene-guidance.md` for boundaries. Preserve productive comic repetition and compare against the source before cutting banter. Do not turn every event into an audit demonstration or an unresolved author choice into a reader inference. After Chapter edits, recheck preface facts, Moment continuity, and every `chapterMatch` in the behavior registry. Preserve later consequences in continuity rather than revealing them prematurely in Chapter narration.
- Profile prose: `timelineNotes` maps exact beat titles to concise summaries. Biography owns longer history; `conflicts` contains explicit character-specific pressures. Never attach generic paragraphs by timeline index or generate filler where information is absent. The search builder must index these same fields.

## Pagan traditions

Ancient pagan cults and religions, explicitly including the Cult of Inanna, have an important role in magic and belong intrinsically to the Magi world, distinct from official Church doctrine. The concise World record lives at `magiarchy.html#cult-of-inanna`, with links from World and Church. Keep other cults unnamed until the author identifies them. Fionn's Magi lineage is associated with the Cult of Inanna; Lynleit is indirectly associated through her family, not a direct participant. Mikhail knows this and names Inanna in the author-supplied Doom v6 exchange, describing three thousand years of lineage continuity, ancestral covenants, and the political significance of intimacy. This supersedes v5's concealed identification. Mark the named lineage history as spoken information, while Lynleit's private embarrassment remains conveyed through behavior. The mock honorific is not a cult rank or authentic liturgy, and no sexual obligation, cult-derived blue-flame ability, or compulsory practice follows from it. The specific covenants, current obligations, other members, powers, and locations remain unresolved. Doctrinal difference alone does not establish exemption from Church jurisdiction, criminal status, or hostility. Do not import real-world religious history as fictional canon without author direction.

## Selected Chapter canon

The current chronology follows the author's 8 September clarification: Fionn's death precedes the nonsexual hotel refuge, and Doom belongs in the later part of Arc 1's second half. `late-arc-one` is an approximate subplot grouping, not a newly fixed main-plot phase. Months separate Doom from The Bench under the Lamp. The park encounter, later reciprocal exploration, first intercourse, established intimacy, and pregnancy are distinct milestones. The main story does not openly reveal the son; Arc 2 does, and Kyrien does not know at its opening.

Arc 0 remains a tentative prequel outline centered on Fionn, his household, and the becoming of MSF. `docs/arc-zero-development.md` owns its candidate scenes and limits, with a sparse shared phase and Moment. Do not promote its optional teenage meeting, family details, or flask origins into canon. Do not move Lynleit's childhood bereavement into high school or introduce Kyrien to magic early.

The flask is stored in Items & Artefacts and Kyrien's Equipment. Its ordinary use must precede its delayed park payoff. It conveys strain through a measured private ritual, never magical protection, medical efficacy, or compulsory drinking. The park Chapter uses ellipsis; author-confirmed milestone distinctions remain explicit in writer continuity. Keep the main narrative's priorities above intimacy throughout. Item readers use neutral default section headings, optional record-specific `sectionTitles`, and optional associated-character links rather than assuming every item is a garment.

Doom Has an Address uses v7 as its default and shared canon, restoring nine approved comic and behavioral beats from the author's 6 September 2026 Russian exchange into English. Mikhail names Inanna, uses family history to provoke Lynleit, and distinguishes a possible treatment from a guarantee. It retains v4's practical teaching, personal examples, banter, and student-friend dialogue. Natalia introduces the ego hypothesis and quotes Jung; no magic-aware physicians appear. The incomplete attempt and curse outcome remain unchanged. Their first completed sexual encounter occurs later in Arc 1. Versions 1 through 6 remain non-canonical alternates. Version-specific behavior notes stay scoped to the appropriate version. Mikhail's insult belongs to his characterization, not to the narrator's assessment of Lynleit's worth or competence.

Natalia's explanations use worked examples, relevant attempts and failures, and listener participation. Lynleit treats her as a favourite teacher and friend rather than a superior. Keep the expertise difference visible through corrections and reasoning. The prose-style document owns the detailed craft guidance.

Sexual-topic scenes should preserve character-specific comedy, rawness, irony, and useful lore where appropriate. Mikhail's mock ceremony, unhurried prop handling, and blunt speech contrast with Lynleit's formal objections and sharp replies. Keep useful comic escalation, cut repetition that adds no new pressure, and preserve the practical reason for the conversation. The current Prose Style document owns detailed examples and limits. V7 restores performance beats and a deliberately unpursued reaction; preserve physical prop continuity when inserting material from an earlier source.

## Document revisions

Exception: Questions to Be Answered and Contradictions to Resolve are latest-only ledgers (`latestOnly: true`). Update them in place without snapshots or version records. Old reader version URLs resolve to the latest text and drop the version parameter. Only current ledger content is indexed in search; Git retains edit history.

All other versioned readers use `version-navigation.js`: Previous, a native version selector, Next, and Latest. Controls have bounded width and stack compactly on narrow phones. Disable unavailable directions. Latest targets the final ordered revision; canon/current remains tied to `defaultVersion` and must not silently change.

Before changing a document, preserve its previous published content as a separate version file and register the next revision in `docs/index.json`. Repoint the old version's file to that snapshot before editing the current source; snapshot and repoint any live JSON dependencies as well. Keep the established Markdown filename as the current maintenance source, with `defaultVersion` pointing to its current version record. Never overwrite an archived file. Readers and search must support `docs.html?doc=slug&version=v1`, the selected revision's metadata, and its matching Markdown download. Unversioned legacy documents resolve as v1 until revised.

When a document is augmented from JSON, preserve that data too. Use version-specific `behaviorFile` or `tensionFile` snapshots for old advisory and intimacy documents so new notes cannot leak into their archived views or search entries. Current versions use the live registries. The prose-style and scene-guidance documents must be revised alongside narrative work when a reusable approach changes. Historical guidance remains readable but does not override the current charter or AGENTS.md.

All Chapter, Moment, and Document version links use the compact identifiers v1, v2, and so forth. Show current/canon status separately from the link text.

Physicians have no knowledge of magic unless the author establishes an exception. Do not invent such specialists; an ordinary examination requires concealment to be accounted for. Keep researched quotations distinct from the fictional mechanism a character proposes using them.

## Design and delivery invariants

Portrait swipes translate the current and adjacent images directly with the finger or mouse, without easing during contact. Release slides to the adjacent portrait or snaps back for short/cancelled gestures. Preload adjacent artwork, retain the Safari touch path, and skip release animation when reduced motion is requested. Thumbnails stay stationary over the image.

Portrait touch navigation handles touch completion directly, suppressing duplicate synthesized clicks. Ignore child capture-loss events when handling mouse drags. Preserve vertical scroll and pinch gestures. Thumbnail buttons have no background, padding, or border: display only rounded images, retaining accessible selection state and a keyboard-focus outline.

Moments phase navigation uses compact, equal-height cards with aligned label, title, and count areas. Show one Arc legend and colored card edges, not duplicate Arc headings with an empty label band. Preserve horizontal dragging, filtering, keyboard focus, and full untruncated titles.

The author's playful Inanna backlog note reinforces enjoyment of the already-established uncomfortable lineage connection. It adds no event, obligation, cult mechanism, or relationship fact. Keep this as a tonal preference within existing canon, not permission to invent further consequences.

Profile portraits navigate through thumbnails, left/right image-half taps, horizontal touch swipes, or mouse drags. Do not show arrow buttons. Keep transparent half-image buttons keyboard-accessible, prevent native image dragging and duplicate clicks after a swipe, and preserve vertical page scrolling and pinch zoom. Scrollable thumbnails overlay the image without a panel background, border, or visible image count. Keep era information in image alt text and thumbnail labels, with a screen-reader announcement on selection. Anchor every profile image and thumbnail to the top so tall artwork retains its face.

Standalone Moments may carry a single shared `prose` paragraph array, rendered in their reader and indexed in search. An explicitly unplaced Moment uses `timelinePhase: null`, `placementStatus: Unplaced`, and no fabricated character-timeline anchor. It remains accessible from involved profiles and the Moments catalog. Do not create a numbered phase to accommodate unknown chronology.

Sleepers (HI-007, MOM-024) remain a passive manifestation encountered by Kyrien, not a professional investigation. Their intended omen of circumstances beyond meaningful control is editorial direction only. Preserve the incomplete downstream stopping point; do not invent other witnesses, institutional readings, an attack, a forecast referent, or a connection to other river Holumns. The behavior audit supports Kyrien's informal observation and curiosity without requiring new gender guidance or a capability change.

Music cards preserve the archive's flat artwork and compact metadata layout. Play only the supplied MP3, load audio on visitor action rather than autoplaying or preloading full tracks, and expose separate same-origin MP3 and WAV download links with file sizes. Keep unrecorded concepts inactive. Author-permitted working category assignments are editable catalog metadata, not confirmed soundtrack or story associations. Preserve the supplied audio bytes and filenames when importing into `media/music/`.

Music search and category/tag filtering use each card's explicit `data-story`, `data-character`, `data-event`, `data-arc`, and `data-misc` pipe-separated metadata. Empty fields mean unassigned. Categories may overlap; do not infer an Arc or character from the sound. Keep counts, empty states, shareable filter URLs, and resets synchronized. Filtering a playing card out pauses it. Preserve the shared Safari-safe masonry layout.

The playable card banner is the primary play/pause button, operable by pointer, touch, Enter, or Space. Use a compact custom seek/time/mute row, synchronized with actual media events, and keep download actions independent. Do not show native browser controls when the custom player is active; retain them as a no-JavaScript fallback. Keep loading, paused, ended, and failed states readable without relying on color alone. Custom seek tracks must use solid fills, never gradients.

- The design is dark, flat, compact, and original to MAGIARCHY.
- Gradients are never allowed. Use solid fills, borders, opacity, spacing, and layered panels.
- Entity links retain ordinary prose color and no underline in every state, including hover, visited links, and Markdown tables. Keyboard focus retains a visible outline.
- Interfaces must work with mouse, keyboard, and touch, with restrained motion and reduced-motion support.
- Filter bars with labeled fields keep a visible label on every field, consistent control heights, and bottom-aligned field groups so label wrapping cannot stagger controls within a row. Verify desktop, intermediate two-column, and stacked mobile layouts; do not compensate with browser-specific offsets.
- In Chapter reader mode, the main pane contains the timeline's top margin even when the feed header and catalog heading are hidden. Do not let the first visible child's margin collapse outside the page background; verify the gap on mobile as well as desktop.
- Weapon fact grids use row-aware dividers: vertical borders separate columns only, horizontal borders separate rows, and an unpaired final fact spans the row. Stacked mobile facts have horizontal separators only.
- Masonry catalogs use the shared measured CSS Grid layout in `script.js`, never CSS multi-column layout. Direct masonry items remain transform-free while hover feedback may use stable borders, shadows, colors, media scale, and nested controls. This avoids Safari column-fragment repaint failures and keeps card placement consistent across browsers.
- Primary navigation remains in the top bar. Every detailed view has breadcrumbs. Every page has the ownership footer and Page notes sidebar.
- The site remains static, uses relative paths, preserves `CNAME`, and deploys through GitHub Pages at `magiarchy.bekulov.com`.
- No em dash may appear in repository-managed site content.

## Build and regression checks

Run `npm ci`, then `npm run build` and `npm run check`. The build synchronizes character card roles and summaries from `character.js`, Holumn forms and incident cards from `holumns/index.json`, artwork previews, and global search. Do not hand-edit generated card copy. `scripts/sync-archive-surfaces.mjs --check` rejects stale surfaces and missing testimony headings. The testimony document retains its fuller editorial accounts and must still be reviewed against changed incidents; a heading check is not a factual audit.

Run `npm run test:ui` after layout or interaction changes. Set `TEST_BROWSERS=chromium,webkit` to cover both engines after installing them with Playwright. Native Safari/iPhone testing remains distinct from WebKit regression coverage. CI runs record, link, design-invariant, and browser checks; GitHub Pages deployment status is verified separately.

Current/default revisions are the search default. An explicit earlier-versions toggle retains access to every indexed historical revision. The search index carries structured current/default metadata rather than inferring authority from version numbers or titles.

An outline-only Moment uses neutral recorded-fact styling, not the shown/inferred key. A Chapter assignment or actual standalone prose supplies the scene against which reader-knowledge labels can be audited. Do not promote future continuity into demonstrated reader knowledge.

Gallery originals remain untouched. Generate small WebP display derivatives with `scripts/build-image-previews.mjs`; use these for catalog art, thumbnails, and map avatars. Keep original URLs for full portrait viewing and Gallery source downloads. Collapsed mobile navigation must be invisible and inert, with Escape and focus recovery supported.

## Family reveals and Holumn ontology: 11 September 2026

Lynleit bears their son during her disappearance and later keeps him hidden from both Kyrien and the wider world. They restore intimacy during Arc 2 and eventually conceive a second child, a daughter, who is born later. The daughter's conception becomes apparent only after Arc 2, not within it. They have two children by story end. Preserve the separation between reader knowledge and Kyrien's eventual discovery of the son. Do not invent the concealment, reconciliation, or later family circumstances. Profiles and the shared intimacy registry carry the confirmed direction; Moment continuity carries future consequences, not premature reader revelations.

Holumn taking and return are Holumn-specific states, not a universal destination or mechanism; returned identity and reanimation must be evaluated separately. The Drowned Choir and river leviathan are distinct entities. Lester's chronology is intrinsically contradictory, beyond an ordinary human causal account, and must not be repaired into a transformation, experiment, or infection. Natalia recognizes contradiction as natural without comprehending his origin. This grants no unconfirmed powers. Synchronicity remains an analogy until a particular incident is authorized. General author-confirmed category boundaries belong in registry principles and are identified separately from witness testimony in Docs.

## Character evidence and physical competence

The author approved bounded consistency, prose, reading, UI, and test cleanup from `docs/archive-audit-2026-09-12.md` on 12 September 2026. V2 records implemented scope and held author decisions; v1 preserves the original unapproved findings. This is not blanket approval of R01-R24, new scenes, chronology, powers, graph values, or a spoiler-default change. Audit reports follow normal Docs registration and versioning.

`docs/character-cognition-and-physical-competence.md` owns the author’s 12 September behavioral answers and the separate working type interpretations. Keep confirmed behavior in profile Personality or relevant Tradecraft; put physical skill in capability sections, not Appearance. Update current behavior-note bases and affected tension records when interpretation changes, with immutable document and JSON snapshots. Historical Chapter-version guidance retains its original context. Do not derive reflexes, endurance, training, or numerical graph scores from MBTI function order. Hypothetical answers describe a response pattern, not an event to place on a timeline. New type readings remain suspected until the author confirms them; proposed physical explanations remain advisory.

## Reader evidence and shared controls

- `docs/reader-knowledge.md` owns the compact separation of event period, reader revelation, and character knowledge for major secrets. Update it when a relevant Chapter, Moment, or author decision changes that separation; leave unchosen timings open. A public reference can expose a fact before the novel does.
- Chapter `contentKind` is `outline`, `scene`, or `writer-gap` in `story/index.json`, including version overrides. It describes the delivered text, not its canonicity. Chapter filters and linked Moment reader keys follow the selected version. A writer gap is not evidence of its omitted action.
- `story-phases.js` owns approximate placement metadata and separates approximate strands from numbered tracks in Story, Moments, and applicable personal timelines. Keep stable phase IDs and use `placement: approximate`; do not assign an unknown origin an Arc or number.
- `script.js` owns the shared On this page selector and optional reader timeline collapse. Catalog timelines and reader timelines remain expanded by default; preserve breadcrumbs, version queries, keyboard focus, and the visible active phase in the expanded view. No permanent left sidebar or new spoiler default.
- The HTML `hidden` state must override component display rules. Filters, reader switching, and collapsed panels must hide the content itself, not merely change a count. Keep relationship-map position changes immediate under reduced motion and calculate coordinates inside the stage border so keyboard movement does not drift.
- `character.js` owns the compact visible artwork-era badge as well as the accessible status. Keep thumbnails, image-half taps, swipes, and drags; no arrow controls or counter overlay.
- Gallery location options derive from registered image metadata. Music playable-only filtering is optional, URL-addressable, and off by default; categories retain the shared archive toolbar.
- `church.html#suppression-doctrine-title` owns the full suppression response list. Other records use a short contextual account and link back. `world.html` supplies a concise term entry point with owning links rather than another competing ontology.
