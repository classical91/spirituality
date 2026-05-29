# Sacred Pathways

**Spirituality, psychology & symbolic frameworks toolkit.**

Sacred Pathways is an interactive, browser-based reflection toolkit built with Vite, React, and Tailwind CSS v4. It bundles a set of self-contained portals into one explorable app — chakra work, natal astrology, biblical and moral atlases, psychology frameworks, whole-system well-being, and a wisdom atlas of spiritual teachers and inner-work traditions.

## Portals

| Path | Portal | What it covers |
|------|--------|----------------|
| `/chakra` | **Chakra Visualizer** | Seven energy centers across three traditions (Hindu, Ra / Law of One, Alice Bailey), with affirmations, blockage patterns, and stretch references. |
| `/astrology` | **Natal Chart Decoder** | Planets, signs, houses, aspects, and the alchemical metal correspondences. |
| `/biblical` | **Biblical Concepts** | Ten Commandments, seven deadly sins, antidote virtues, Dante's Inferno, and demonology as a study board. |
| `/psychology` | **Psychology Portal** | Ten frameworks for identity, attachment, CBT, stoicism, somatic work, and shadow integration. |
| `/inner-balance` | **InnerBalance Atlas** | Nervous system, neurotransmitters, mood, psychophysiology, and daily well-being. |
| `/wisdom` | **Wisdom Atlas** | Spiritual teachers and inner-work traditions — Neville Goddard, Joseph Murphy, Florence Scovel Shinn, Emmet Fox, Thomas Troward, Ernest Holmes, Abdullah, Carl Jung, Alan Watts, Michael Singer, and Joe Dispenza — each with a core teaching, practice, and reflection. (Legacy `/frameworks` redirects here.) |

Each portal carries its own symbolic / wellness safety note — content is for reflection and study, not for medical, psychiatric, or spiritual diagnosis.

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

`preview` runs `vite preview --host 0.0.0.0` and respects the `PORT` env var via Vite defaults. `start` runs `serve dist -s` and respects `PORT` via the `serve` CLI defaults.

## Linting

```bash
npm run lint
```

## Continuous integration

GitHub Actions runs `npm ci`, `npm run lint`, and `npm run build` on every push to `main` and every pull request — see `.github/workflows/ci.yml`.

## Deployment

This is a fully static SPA. Deploy `/dist` to any static host that supports SPA fallback (so that `/chakra`, `/psychology`, etc. resolve to `index.html`):

- **Railway** — uses the included `railway.json`; `serve -s` already handles SPA fallback.
- **Netlify** — drag-and-drop `/dist`, or connect via Git with build command `npm run build` and publish directory `dist`. Add a `_redirects` file with `/* /index.html 200` if needed.
- **Vercel** — framework preset Vite; SPA rewrites are automatic.
- **GitHub Pages** — push `/dist` contents to a `gh-pages` branch (note: nested routes need a 404 fallback hack).

## Project structure

```
src/
  App.jsx                    # Routing shell — maps URL → portal
  HomePage.jsx               # Landing page with search and recents
  main.jsx
  index.css
  Chakra3DVisualizer.jsx
  NatalChartDecoder.jsx
  BibleConceptAtlas.jsx
  PsychologyPortal.jsx
  InnerBalanceAtlas.jsx
  WisdomAtlas.jsx
  VitaminsMineralsAtlas.jsx
  components/
    PortalCard.jsx           # Home grid card
    GlobalSearch.jsx         # Cross-portal search bar
    SafetyNote.jsx           # Reusable wellness / symbolic disclaimer
    BackButton.jsx
  data/
    portals.js               # Portal catalog (routes, copy, search terms)
    hinduChakras.js
    raChakras.js
    baileyChakras.js
  hooks/
    useRoute.js              # History-API routing hook
  lib/
    storage.js               # localStorage helpers (recents, last portal)
```

## Routing

Each portal has a real URL (`/chakra`, `/astrology`, etc.) backed by `window.history.pushState` — back/forward buttons work, links are shareable, and unknown paths fall back to the home page.

## Persistence

The home page remembers the last few portals visited via `localStorage` (key prefix `sacred-pathways:`). Nothing is sent anywhere — it's local-only progress for a smoother return visit.

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
