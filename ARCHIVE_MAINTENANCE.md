# MAGIARCHY Archive Maintenance Charter

This file is the concise operating map for future agents and maintainers. `AGENTS.md` remains the controlling instruction set. Read both before changing archive content or structure. When a new recurring workflow, record type, or design rule is introduced, update this charter in the same commit.

## Authority and record states

1. The author is the only final authority over canon.
2. Established canon is written as fact on public wiki surfaces.
3. Questions, contradictions, mock structures, audit proposals, and working interpretations remain in writer-facing Docs or private page notes.
4. The Nasu audit is advisory. Notify the author whenever it materially shapes work. Never present it as literal participation by Kinoko Nasu, and never convert its proposal into canon without approval.
5. A user-supplied answer overrides an audit preference. Improve setup, consequence, and presentation without changing the answer.

## Source and surface map

| Content | Shared source | Required public or writer surfaces |
| --- | --- | --- |
| Characters | `character.js` | Character catalog, profile, timeline, connections, global search |
| Character artwork | `media/gallery/images/` plus Gallery metadata | Gallery, character card or portrait where approved |
| Chapters | `story/*.md` and `story/index.json` | Story catalog, chapter reader, preface table, Story phase, involved profiles, global search |
| Moments | `moments/index.json` | Moment catalog and reader, Story phase, involved profiles, assigned Chapter, global search |
| Story phases | `story-phases.js` | Story timeline, Moments timeline, Chapter placement |
| World institutions and places | Dedicated page and owning data file where present | World index and submenu, entity links, global search |
| Holumn evidence | `holumns/index.json` | Holumns World synthesis and `docs/holumn-incidents-and-testimonies.md` |
| Weapons | `weapons/index.json` | Weapons World record, character Equipment links, global search |
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

Sexual tension is not a relationship forecast. It may be mutual, asymmetric, subconscious, antagonistic, situational, or permanently unresolved. Each proposed pairing needs character-specific contact and a reason for repeated attention. Do not pair characters merely because they are attractive, available, or of opposite sexes.

Construct tension from an established character priority rather than replacing it. Identify what each person normally controls, then use a repeatable ordinary interaction to let the other disrupt that control. Add restrained bodily tells, allow the reader to notice the pattern before the characters name it, and let crisis intensify tension that already exists instead of using rescue or trauma as its sole source. If authority, coercion, or dependency begins the relationship, a later voluntary choice to remain or return is required before compliance can be read as desire. Lynleit's MSF duty and personal missions remain primary, while her attraction to Kyrien is an involuntary complication.

Appearance records contain observable facts only. State physical features, clothing, accessories, grooming, posture, and visible variation without justifying the design, explaining the character's reasons, or assigning personality and capability to the clothing.

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
- Primary navigation remains in the top bar. Every detailed view has breadcrumbs. Every page has the ownership footer and Page notes sidebar.
- The site remains static, uses relative paths, preserves `CNAME`, and deploys through GitHub Pages at `magiarchy.bekulov.com`.
- No em dash may appear in repository-managed site content.
