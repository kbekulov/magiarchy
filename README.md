# Magiarchy

The official web home for the Magiarchy story universe, deployed through GitHub Pages at [magiarchy2026.bekulov.com](https://magiarchy2026.bekulov.com).

## Pages

- **Home** — an atmospheric introduction to the hidden architecture of the world.
- **Characters** — a searchable masonry roster of character dossiers with replaceable chibi-art slots.
- **Gallery** — a masonry artwork archive filterable by character, location, and chibi format.

## Development

The site is intentionally framework-free: HTML, CSS, and a small amount of vanilla JavaScript. Open `index.html` directly for a quick preview, or serve the repository root with any static HTTP server.

Design and workflow rules for future AI development are maintained in [`AGENTS.md`](./AGENTS.md). The site must remain compatible with GitHub Pages, retain the root `CNAME`, use relative links and assets, and must not depend on the Codex Sites extension.

## Page notes

Each page has a visible right-hand **Page notes** panel. These notes are intentionally maintained in the page HTML and deployed with the rest of the static site; there is no browser-based editing or persistence layer. Add a `.page-note` article to the relevant page whenever a new user-authored change note needs to be tracked.
