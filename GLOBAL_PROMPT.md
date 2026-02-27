# Magiarchy Project - Global Prompt

## Purpose
- A static, single-page lore compendium for the "Magiarchy" story universe.
- Designed for worldbuilding review, character doctrine, and section-by-section narrative reference.

## Deployment
- Domain: `magiarchy.bekulov.com`
- Hosting model: static site (GitHub Pages compatible).

## Tech Stack
- Plain HTML/CSS/JavaScript.
- No framework, build system, package manager, or backend.

## Core File Map
- `index.html`: main application page and content structure.
- `styles.css`: full visual system, layout, and responsive behavior.
- `script.js`: tab/menu logic, state switching, content rendering, keyboard navigation.
- `global-prompt.html`: dedicated page showing this prompt in a code block.
- `global-prompt.js`: loads this markdown file and handles clipboard copy action.
- `GLOBAL_PROMPT.md`: source-of-truth summary of the current project state.
- `gallery/characters/*`: character visuals.
- `gallery/locations/*`: location visuals.
- `CNAME`: custom domain mapping.

## Main UX Structure (`index.html`)
- Sticky top menu with sections:
  - Story Universe
  - Magic System
  - Locations
  - Music
  - Organizations
  - Characters
  - Relationships
  - Events & Chapters
  - Global Prompt (separate page link)
- Split layout:
  - Left panel: visual stage (character image + contextual overlays for magic/locations).
  - Right panel: content panel that swaps by active section/tab.

## Interaction Model (`script.js`)
- Menu/state switching:
  - In-page nav links are selected via `.menu a[data-section]`.
  - Section switching toggles visibility via `.view-hidden`.
- Character system:
  - Character data object powers rendered dossier fields.
  - Lynleit and Kyrien are currently authored in depth.
  - Other listed characters are placeholder scaffolds.
- Secondary tab systems:
  - Relationships tabs.
  - Magic tabs (`foundations`, `mechanics`, `governance`).
  - Locations tabs (`country`, `mage-academy`, `lynleit-home`).
  - Organizations tabs (`msf`, `magiarchy`, `aristocracy`, `government`).
- Media switching:
  - Left visual changes with section/tab context using `locationImages` / `relationshipImages`.
- Accessibility:
  - Keyboard navigation for top nav and all chip/tab groups (`Arrow`, `Home`, `End`).
  - Uses ARIA tab semantics on chips.

## Visual System (`styles.css`)
- Dark, cinematic background with layered gradients and glass effects.
- Parchment-like right content panel for lore readability.
- Responsive behavior:
  - Desktop: 2-column split.
  - Tablet/mobile: stacked layout and adapted controls.
- Added prompt-page styles:
  - `prompt-main`, `prompt-panel`, `prompt-code-shell`, `copy-button`.

## Global Prompt Page Behavior
- `global-prompt.html` renders a dedicated prompt page with:
  - Header/menu.
  - Code block display area.
  - "Copy Markdown" button.
- `global-prompt.js`:
  - Loads `GLOBAL_PROMPT.md` using `fetch`.
  - Writes raw markdown into a `<code>` block.
  - Copies full markdown to clipboard with fallback if Clipboard API fails.

## Authoring Protocol (Important)
- Every time site behavior, content, structure, styles, or assets are changed:
  - Update `GLOBAL_PROMPT.md` to reflect the current state.
- This file is intended to remain the highest-level machine/human summary for reuse in prompts.

## Current Content Status
- Richly developed:
  - Lynleit dossier.
  - Kyrien dossier.
  - Core doctrine sections for story, magic, organizations, and locations.
- Placeholder content remains for many characters and some relationship/music entries.
