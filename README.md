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
