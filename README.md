# Sacred Pathways

**A personal spiritual, psychological, relationship, and self-mastery operating system.**

Sacred Pathways is an interactive, browser-based reflection toolkit built with Vite, React, and Tailwind CSS v4. It is built primarily for personal daily use — not as a generic public product — and bundles self-contained portals for spiritual study, inner work, relationships, self-mastery, daily practice, and symbolic systems into one explorable app. Personal language (affirmations, identity statements, relationship reflections) is intentional and kept throughout; the goal is a clear, well-organized tool for one person's ongoing practice, not a neutral reference site.

## Portals, by purpose

**Daily Practice**
| Path | Portal | What it's for |
|------|--------|----------------|
| `/daily-practice` | **Daily Practice Flow** | The "use this today" hub — morning alignment, midday resets, evening wind-down, and an emergency reset flow, each linking straight into the relevant portal. |

**Self-Mastery**
| Path | Portal | What it's for |
|------|--------|----------------|
| `/neville` | **Neville Alignment Portal** | Living in the End, SATS, revision, mental diet, and the Self-Concept Language Studio for identity/self-talk work. |
| `/sexual-energy` | **Sexual Energy & Self-Mastery** | Desire, fantasy, porn-pattern awareness, masturbation/celibacy discipline, urges, and relapse recovery. |

**Relationships**
| Path | Portal | What it's for |
|------|--------|----------------|
| `/relationship-hub` | **Relationship Hub** | The single source of truth for relationship content — attachment, dating/attraction, mixed signals, boundaries, emotional safety, intimacy, shadow patterns, and relationship practice (marriage, dynamics, scripting). |

**Inner Work**
| Path | Portal | What it's for |
|------|--------|----------------|
| `/inner-atlas` | **InnerAtlas** | Nervous system, neurotransmitters, mood, psychology frameworks (attachment, CBT, stoicism, somatic work, shadow integration), and emotional regulation. |

**Spiritual Study**
| Path | Portal | What it's for |
|------|--------|----------------|
| `/topics` | **Spiritual Topics & Dictionary** | A searchable concept library — definitions, comparisons ("contentment vs fulfillment"), practices, and reflection questions for spiritual, emotional, relationship, and self-concept terms. Acts as an index and navigation layer that links out to the deeper portals rather than duplicating them. |
| `/sacred-moral-atlas` | **Sacred Moral & Mythic Atlas** | Biblical foundations, Ten Commandments, seven deadly sins, antidote virtues, Dante's Inferno, angelology, demonology, and the Infernal & Mythic Codex. (Legacy `/biblical`, `/angelology`, `/demonology`, `/infernal-codex` redirect here.) |
| `/wisdom` | **Wisdom Atlas** | Spiritual teachers and inner-work traditions — Neville Goddard, Joseph Murphy, Florence Scovel Shinn, Emmet Fox, Thomas Troward, Ernest Holmes, Abdullah, Carl Jung, Alan Watts, Michael Singer, Joe Dispenza — plus the esoteric Ascended Masters library. (Legacy `/frameworks` redirects here.) |

**Symbolic Systems**
| Path | Portal | What it's for |
|------|--------|----------------|
| `/chakra` | **Chakra Visualizer** | Seven energy centers across three traditions (Hindu, Ra / Law of One, Alice Bailey), with affirmations, blockage patterns, and stretch references. |
| `/sacred-systems` | **Sacred Systems Atlas** | Crystals, sacred geometry, the pineal gland, Mer-Ka-Ba, prana, dimensions, the full natal chart (planets, signs, houses, aspects), and numerology — as a browsable card library. |

Each portal carries its own symbolic / wellness safety note — content is for personal reflection and study, not for medical, psychiatric, religious, or spiritual authority.

## Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Vite](https://vite.dev/) | 8 | Dev server and build |
| [React](https://react.dev/) | 19 | UI components |
| [Tailwind CSS v4](https://tailwindcss.com/) | 4 | Utility styling via `@tailwindcss/vite` |

No external client routing or state library — routing uses the browser History API and persistence uses `localStorage`.

## Getting started

```bash
npm install
npm run dev        # starts dev server at http://localhost:5173
```

## Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

`preview` runs `vite preview --host 0.0.0.0` and respects the `PORT` env var via Vite defaults. `start` runs `node server.mjs`, which serves `/dist` with SPA fallback and hosts the daily API below. It respects `PORT` and defaults to 3000.

## Linting

```bash
npm run lint
```

## Tests

```bash
npm test           # node's own test runner, no framework
```

The suite is deliberately narrow: this app is mostly data, so the tests pin the
invariants that break navigation silently — daily rotation coverage, portal
paths, and the `?section=` routing contracts the portals depend on. They are
plain Node tests over the data and `src/lib` modules, with no DOM or renderer.

## Continuous integration

GitHub Actions runs `npm ci`, `npm run lint`, `npm test`, and `npm run build` on every push to `main` and every pull request — see `.github/workflows/ci.yml`. A red test fails the build, so a change that breaks a routing or data invariant cannot merge green.

## Deployment

The app itself is a static SPA. `server.mjs` serves it — with the SPA fallback that makes `/chakra`, `/psychology` and friends resolve to `index.html` — and adds the one read-only endpoint under [Daily API](#daily-api). Deploy the repo, not just `/dist`, anywhere that runs Node 22+:

- **Railway** — uses the included `railway.json`, which runs `npm run start`.
- **Netlify** — drag-and-drop `/dist`, or connect via Git with build command `npm run build` and publish directory `dist`. Add a `_redirects` file with `/* /index.html 200` if needed.
- **Vercel** — framework preset Vite; SPA rewrites are automatic.
- **GitHub Pages** — push `/dist` contents to a `gh-pages` branch (note: nested routes need a 404 fallback hack).

The last three serve `/dist` as static files, which is still fine for the app — it only loses `/api/daily`, and nothing in the app itself calls it.

`server.mjs` also owns the caching policy, in `staticHeaders`: fingerprinted files under `/assets` are immutable for a year, and HTML is never cached so a deploy can't leave a visitor pointed at asset URLs that no longer exist. A static host serving `/dist` applies its own defaults instead, so set the equivalent rules there if you deploy that way.

## Daily API

`GET /api/daily?date=YYYY-MM-DD`

Today's prayer and today's reading, the same two the home screen shows.

```json
{
  "date": "2026-09-10",
  "dayOfYear": 253,
  "prayer": { "type": "Virtue", "title": "Faith", "prayer": "…" },
  "reading": {
    "id": "wis-shinn",
    "lens": "Symbolic",
    "title": "Florence Scovel Shinn",
    "summary": "…",
    "path": "/wisdom/teachers?section=shinn"
  }
}
```

`date` is the **caller's** calendar day and defaults to the server's. Main Hub's
Daily Dashboard asks in Vancouver time, so it sends one.

This endpoint exists so the dashboard does not have to run a second rotation of
its own — a copy in another repository would drift from this one the first time
a prayer was added. Both rotations now resolve in `src/lib/daily.js`, which the
home screen and the server both read.

`reading.path` is produced by `src/lib/portalPath.js`, the same resolver
`App.jsx` navigates with, so an "Open Reading →" link lands exactly where
tapping the card here lands — including for the portals that were folded into
other pages.

There is no authentication, because there is nothing personal here: every
visitor to the home screen already sees both of these.

## Project structure

```
src/
  App.jsx                    # Routing shell — maps URL → portal
  HomePage.jsx               # Landing page with search and recents
  main.jsx
  index.css
  Chakra3DVisualizer.jsx
  BibleConceptAtlas.jsx
  PsychologyPortal.jsx
  InnerBalanceAtlas.jsx
  WisdomAtlas.jsx
  VitaminsMineralsAtlas.jsx
  TopicsPortal.jsx           # Spiritual Topics & Dictionary (/topics)
  components/
    PortalCard.jsx           # Home grid card
    GlobalSearch.jsx         # Cross-portal search bar
    TopicCard.jsx            # Topic browse card
    TopicDetail.jsx          # Topic full-page detail view
    SafetyNote.jsx           # Reusable wellness / symbolic disclaimer
    BackButton.jsx
  data/
    portals.js               # Portal catalog (routes, copy, search terms)
    searchIndex.js           # Curated cross-portal Deep Search index
    spiritualTopics.js       # Topics & Dictionary content (pure data module)
    hinduChakras.js
    raChakras.js
    baileyChakras.js
  hooks/
    useRoute.js              # History-API routing hook
  lib/
    storage.js               # localStorage helpers (recents, last portal, recent topics)
```

## Routing

Each portal has a real URL (`/chakra`, `/astrology`, etc.) backed by `window.history.pushState` — back/forward buttons work, links are shareable, and unknown paths fall back to the home page.

## Relationship Hub (`/relationship-hub`)

The Relationship Hub is the **single canonical home** for relationship education. Other portals (Chakra, Sexual Energy, Psychology) and the Topics dictionary link *into* it rather than holding their own copies. Do not create another top-level relationship portal.

### Ownership rules

The Hub has three content tabs, each owned by one component:

| Tab | Owner value | Component | What it holds |
|-----|-------------|-----------|---------------|
| Relationship Clarity | `clarity` | [`src/RelationshipClarityPortal.jsx`](src/RelationshipClarityPortal.jsx) | Understanding what is happening — reflections, red flags, standards, inventories, tools. |
| Relationship Patterns | `patterns` | [`src/RelationshipPatterns.jsx`](src/RelationshipPatterns.jsx) (content in [`src/data/relationshipPatterns.js`](src/data/relationshipPatterns.js)) | Repeating psychological dynamics, one page per pattern. |
| Relationship Practice | `practice` | [`src/RelationshipPractice.jsx`](src/RelationshipPractice.jsx) (+ [`RelationshipFoundations.jsx`](src/RelationshipFoundations.jsx)) | Healthy skills and lived application — foundations, skills, marriage, dynamics, scripts. |

Navigation metadata is centralized in [`src/data/relationshipIndex.js`](src/data/relationshipIndex.js). That module holds **navigation + search metadata only** — the full educational content stays in the components above. It exports:

- `claritySectionIds`, `patternSectionIds`, `practiceSectionIds` — the authoritative routable `?section=` IDs per tab. `resolveOwner(section)` maps a section to its owning tab, and [`src/lib/relationshipRouting.js`](src/lib/relationshipRouting.js) builds on it: `resolveSection(section)` returns the `{ tab, sub }` the hub renders, and `sectionForTab(tab)` is the `?section=` value that opens a tab's own index.
- `relationshipSections` — curated nav entries (`{ id, title, category, owner, section, summary, tags }`) that back the overview chips and global search.
- `relationshipCategories` — the overview categories with their clickable topic chips, derived from `relationshipSections`.
- `relationshipSearchEntries` — generated global-search entries (see below).

Each section id must appear in exactly one owner's `*SectionIds` list so a `?section=` value never routes ambiguously.

**The URL owns the hub's navigation state.** Every screen inside the hub — each tab, each Clarity concept, each pattern, each Practice tab — has its own `?section=` value, and the components derive what they render from it rather than keeping their own copy. Tab switches push a new URL through `onNavigate`, so each step gets a browser history entry and back/forward, refresh, and shared links all land on the screen the visitor was actually looking at. A control that changes what is on screen without publishing a `?section=` breaks that; [`src/lib/__tests__/relationshipRouting.test.js`](src/lib/__tests__/relationshipRouting.test.js) pins the resolve/round-trip contract.

### How to add a Clarity topic

1. Append a concept object to the `concepts` array in [`RelationshipClarityPortal.jsx`](src/RelationshipClarityPortal.jsx). Give it a stable kebab-case `id`, a `group` (one of `CONCEPT_GROUPS`), and the fields for its render type — reflection (`question`/`explanation`/`fear`/`secure`/`practice`), `redflag: true` (`flags`/`green`), or `inventory: true` (`intro`/`items`). Optional `note` renders a grounding/safety callout.
2. Add the same `id` to `claritySectionIds` in [`relationshipIndex.js`](src/data/relationshipIndex.js) so its deep link routes to the Clarity tab.
3. To surface it as an overview chip, add a `relationshipSections` entry with `owner: 'clarity'` and `section: '<id>'`.

### How to add a Pattern

1. Append a pattern object to `relationshipPatterns` in [`src/data/relationshipPatterns.js`](src/data/relationshipPatterns.js). Each pattern is its own page, so it needs a stable kebab-case `id`, `name`, `kicker`, `icon`, `color`, `keyInsight`, `intro`, `items` (`{ label, desc }`), `whyItForms`, `practices`, `reflection`, `related` (`{ id, label }` pointing at other routable sections), and optionally `note` (safety callout) and `sources` (`{ label, url }`). `RelationshipPatterns.jsx` renders the library and the detail page from that data — there is no content to add to the component.
2. Add the `id` to `patternSectionIds` in [`relationshipIndex.js`](src/data/relationshipIndex.js) so `/relationship-hub?section=<id>` opens the page. [`src/data/relationshipPatterns.test.js`](src/data/relationshipPatterns.test.js) fails if you skip this, or if a `related` entry points at a section nothing owns.
3. Optionally add a `relationshipSections` entry with `owner: 'patterns'` for an overview chip.

### How to add a Practice section

1. Add a tab to `PRACTICE_TABS` in [`RelationshipPractice.jsx`](src/RelationshipPractice.jsx) and render it from `renderTab()`. The tab id is the `?section=` value, and switching tabs publishes it.
2. Add the tab `id` to `practiceSectionIds` in [`relationshipIndex.js`](src/data/relationshipIndex.js) so `/relationship-hub?section=<id>` opens that tab.
3. Optionally add a `relationshipSections` entry with `owner: 'practice'`.

### How relationship sections enter global search

`relationshipIndex.js` maps `relationshipSections` to `relationshipSearchEntries` (`{ id, portalId: 'relationshiphub', section, title, summary, tags, lens }`). [`src/data/searchIndex.js`](src/data/searchIndex.js) spreads that array into the global index, so any curated section is searchable automatically. Titles carry a `— relationship lens` suffix so terms shared with the Psychology portal (e.g. *attachment*) stay distinguishable in results.

### How dictionary entries link to canonical Hub content

Short dictionary entries in [`src/data/spiritualTopics.js`](src/data/spiritualTopics.js) (Forms of Love, Compatibility, Consent, Codependency vs Interdependence, Relationship Grief, Closure, Trust Repair, Reconciliation, …) stay concise and point to the canonical section via `portalLinks: [{ portalId: 'relationshiphub', section: '<hub-section-id>', label }]`. Do **not** copy full Hub content into the dictionary — link out instead.

## Spiritual Topics & Dictionary (`/topics`)

The Topics portal is a **data-driven concept library**. It exists to make the app easier to navigate — organizing the ideas that live across Neville, the Relationship Hub, InnerAtlas, the Chakra Visualizer, and other portals into searchable, cross-linked topic pages — *without* re-hosting that content. Deeper dives always link out to the owning portal.

### How topic data is structured

Every topic is one plain object in [`src/data/spiritualTopics.js`](src/data/spiritualTopics.js). That module imports nothing (no components, no portal catalog, no search index), so it stays a pure content module and can be spread into the search index without a circular import. Key fields:

| Field | Purpose |
|-------|---------|
| `id` | kebab-case slug; also the `?section=` deep link (`/topics?section=receptivity`) |
| `title`, `summary`, `category` | card + header copy (`category` is one of `TOPIC_CATEGORIES`) |
| `type` | `'concept'` or `'comparison'` (comparisons render through the same detail view) |
| `definition`, `keyIdea` | 1–2 paragraphs + the single core idea |
| `distinctions` | `[{ label, explanation }]` — carries the "X vs Y" content |
| `signs` | `{ balanced: [...], imbalanced: [...] }` |
| `practices`, `reflectionQuestions` | small concrete exercises + prompts |
| `relatedTopicIds` | ids of other topics (rendered as related-concept links) |
| `portalLinks` | `[{ portalId, section, label }]` — links into existing portals |
| `tags`, `lens` | search keywords + the display lens |
| `note` | optional grounding / safety / interpretation note |

### How to add a topic

Append one object to the `spiritualTopics` array — **that's the whole change.** No routing, component, or search edits are needed: the deep link and the global-search entry are generated automatically.

```js
{
  id: 'example-topic',
  title: 'Example Topic',
  category: 'Inner Foundation',       // one of TOPIC_CATEGORIES
  type: 'concept',                    // or 'comparison'
  summary: 'One sentence shown on the card and in global search.',
  definition: ['A short paragraph.', 'Optionally a second.'],
  keyIdea: 'The single thing to remember.',
  distinctions: [{ label: 'X vs Y', explanation: '…' }],
  signs: { balanced: ['…'], imbalanced: ['…'] },
  practices: ['…'],
  reflectionQuestions: ['…'],
  relatedTopicIds: ['self-trust'],
  portalLinks: [{ portalId: 'inneratlas', section: 'self-trust', label: 'Self-trust' }],
  tags: ['example', 'concept'],
  lens: 'Reflection',
}
```

### How to create an internal portal link

Use a `portalLinks` entry with a **real** `portalId` and `section`. At render time the detail view calls the app's `onNavigate(portalId, { section })` — the same navigation contract every portal uses — so it deep-links correctly and keeps browser history working. Do **not** hardcode a URL. Confirm the `section` value against the target portal's existing section IDs (grep the portal or `src/data/searchIndex.js`) before adding it.

### How search entries are generated

`spiritualTopics.js` exports `spiritualTopicSearchEntries`, one `{ id, portalId: 'topics', section, title, summary, tags, lens }` per topic. `src/data/searchIndex.js` spreads that array into the global index, so searching a term like `receptivity` or `sovereignty` returns the topic page and opens it via `/topics?section=<id>`.

### Topic entry vs full portal section

A **topic entry** is a concise concept guide (definition, comparison, a few practices) that lives entirely in data and links out for depth. A **full portal section** is a rich, interactive experience inside a dedicated React portal (Neville's SATS tool, InnerAtlas's neurotransmitter pages, etc.). When a concept already has a real home, add a *topic* that links to it rather than copying the section.

## Persistence

The home page remembers the last few portals visited via `localStorage` (key prefix `sacred-pathways:`). The Topics portal separately remembers recently viewed topics under `sacred-pathways:recent-topics`. Nothing is sent anywhere — it's local-only progress for a smoother return visit.

## Content safety

Every portal carries a contextual safety note:

- **Chakras / InnerBalance / Psychology** — symbolic wellness framing, not medical or psychiatric advice.
- **Astrology** — symbolic framework for self-reflection, not prophecy or diagnosis.
- **Biblical / Dante / demonology** — historical, literary, and symbolic study material, not religious authority.

If any content raises concerns about your physical or mental health, consult a licensed healthcare professional.

## Known limitations

- Content is English-only
- No user accounts; only local persistence (`localStorage`)
- Stretch image links open Google Images — results are not curated by this app
- No offline service worker yet

## Roadmap ideas

- Favorites / saved reflections per portal
- Journal export (PDF / Markdown)
- More reflection lenses (seasons, doshas, Enneagram)
- Dark/light mode toggle
- i18n support
