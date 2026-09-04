# MAGIARCHY Archive Maintenance Charter

This file is the concise operating map for future agents and maintainers. `AGENTS.md` remains the controlling instruction set. Read both before changing archive content or structure. When a new recurring workflow, record type, or design rule is introduced, update this charter in the same commit.

## Authority and record states

1. The author is the only final authority over canon.
2. Established canon is written as fact on public wiki surfaces.
3. Questions, contradictions, mock structures, audit proposals, and working interpretations remain in writer-facing Docs or private page notes.
4. The Nasu audit is advisory. Notify the author whenever it materially shapes work. Never present it as literal participation by Kinoko Nasu, and never convert its proposal into canon without approval.
5. A user-supplied answer overrides an audit preference. Improve setup, consequence, and presentation without changing the answer.

## Backlog intake

Before beginning ordinary work, inspect `backlog/` for author-supplied `*.txt` files. Each file takes priority over the incoming request and must be integrated through every affected source, public surface, editorial ledger, entity link, search record, and update-feed entry. Delete a backlog file only after its contents have been fully integrated and verified. If its meaning is ambiguous or conflicts with established canon, preserve the file and stop for author direction.

## Source and surface map

| Content | Shared source | Required public or writer surfaces |
| --- | --- | --- |
| Characters | `character.js` | Character catalog, profile, timeline, connections, global search |
| Character artwork | `media/gallery/images/` plus Gallery metadata | Gallery, character card or portrait where approved, with explicit Arc metadata for era-specific art |
| Chapters | `story/*.md` and `story/index.json` | Story catalog, chapter reader, preface table, Story phase, involved profiles, global search |
| Moments | `moments/index.json` | Moment catalog and reader, Story phase, involved profiles, assigned Chapter, global search |
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
| Documents | Markdown in `docs/` plus `docs/index.json` | Docs catalog, document reader, global search |

## Mandatory follow-up for every content change

1. Update the owning source instead of copying the fact into unrelated records.
2. Check every affected surface in the source and surface map.
3. Add or update entity links for every character, place, faction, institution, weapon, and defined term that already has a destination.
4. Check chronology, Story phase placement, character timelines, Moment links, and Chapter assignment.
5. Check the Questions ledger for newly exposed uncertainty and the Contradictions ledger for statements that cannot both remain true.
6. Check character capability balance when a skill, power, resource, status, or operational role changes.
7. Check sexual tension records whenever a Chapter, Moment, or relationship changes contact, attraction, avoidance, rivalry, physical awareness, status, or emotional access.
8. Check character behavior notes whenever a Chapter or Moment creates a reaction where embodiment, sex, social experience, MBTI, or story pressure may matter. Place any F, M, or S marker on the exact paragraph or fact it concerns.
9. Rebuild `search-index.json` with `node scripts/build-search-index.mjs`.
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

When artwork depicts a specific Arc or life period, preserve that period in the filename, Gallery metadata, caption, alt text, and profile portrait label. Generic catalog cards and relationship maps keep the character's baseline-period chibi unless the interface is explicitly presenting another Arc.

Sexual tension is not a relationship forecast. It may be mutual, asymmetric, subconscious, antagonistic, situational, or permanently unresolved. Each proposed pairing needs character-specific contact and a reason for repeated attention. Do not pair characters merely because they are attractive, available, or of opposite sexes.

Construct tension from an established character priority rather than replacing it. Identify what each person normally controls, then use a repeatable ordinary interaction to let the other disrupt that control. Add restrained bodily tells, allow the reader to notice the pattern before the characters name it, and let crisis intensify tension that already exists instead of using rescue or trauma as its sole source. If authority, coercion, or dependency begins the relationship, a later voluntary choice to remain or return is required before compliance can be read as desire. Lynleit's MSF duty and personal missions remain primary, while her attraction to Kyrien is an involuntary complication.

Describe intimacy through initiative, hesitation, attention, speech, silence, trust, conflict, and change. Do not prescribe sexual positions unless the author establishes exact scene choreography as canon.

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

## Design and delivery invariants

- The design is dark, flat, compact, and original to MAGIARCHY.
- Gradients are never allowed. Use solid fills, borders, opacity, spacing, and layered panels.
- Entity links look like ordinary prose until hover or keyboard focus.
- Interfaces must work with mouse, keyboard, and touch, with restrained motion and reduced-motion support.
- Masonry catalogs use the shared measured CSS Grid layout in `script.js`, never CSS multi-column layout. Direct masonry items remain transform-free while hover feedback may use stable borders, shadows, colors, media scale, and nested controls. This avoids Safari column-fragment repaint failures and keeps card placement consistent across browsers.
- Primary navigation remains in the top bar. Every detailed view has breadcrumbs. Every page has the ownership footer and Page notes sidebar.
- The site remains static, uses relative paths, preserves `CNAME`, and deploys through GitHub Pages at `magiarchy.bekulov.com`.
- No em dash may appear in repository-managed site content.
