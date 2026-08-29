# Magiarchy

The official web home for the Magiarchy story universe, deployed through GitHub Pages at [magiarchy.bekulov.com](https://magiarchy.bekulov.com).

## Pages

- **Home** - an atmospheric introduction to the hidden architecture of the world, followed by a dated feed of site updates.
- **Characters** - a searchable masonry roster of character dossiers with replaceable chibi-art slots.
- **Story** - an overall narrative timeline followed by masonry chapter cards with full readers, breadcrumbs, and involved-character labels.
- **The Duchy** - an intricate country profile for Narvea, with a territory overview, dual capitals, constitutional structure, institutions, ranks, and cultural identity.
- **Music** - an archive for future themes, character motifs, and scene tracks, currently represented by inactive placeholder cards.
- **Gallery** - a masonry artwork archive filterable by character, location, and chibi format.
- **Docs** - a masonry library of Markdown-backed summaries with dedicated full-document reader views.

## Development

The site is intentionally framework-free: HTML, CSS, and a small amount of vanilla JavaScript. Open `index.html` directly for a quick preview, or serve the repository root with any static HTTP server.

Global archive search is backed by the generated `search-index.json` file. After changing site content, rebuild it with `node scripts/build-search-index.mjs` before committing so character sections, Chapters, Moments, Docs, World records, weapons, Holumn incidents, and update entries remain searchable.

Design and workflow rules for future AI development are maintained in [`AGENTS.md`](./AGENTS.md). The site must remain compatible with GitHub Pages, retain the root `CNAME`, use relative links and assets, and must not depend on the Codex Sites extension.

## Ownership

Project MAGIARCHY is the work of Kiril Bekulov & Co. and is owned by Kiril Bekulov. All rights are reserved. Any additional contributors will be credited separately when applicable.

## Page notes

Each page has a visible right-hand **Page notes** panel backed by Supabase. Notes remain publicly readable, while owner authentication enables adding, editing, completing, and deleting notes directly in the sidebar. Static notes in the page HTML remain available as an offline fallback. The browser uses only the project's publishable key, and all write access is protected by Row Level Security.
