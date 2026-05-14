# Chakra 3D Visualizer

An interactive seven-chakra wellness and reflection tool built with Vite, React, and Tailwind CSS v4.

## Features

- **3D-style rotating body model** — click any orb to select a chakra
- **Detail panel** — location, element, and balanced-state summary per chakra
- **Affirmation window** — five grounded identity affirmations per chakra (press Esc to close)
- **Expanded explanation page** — overview, balanced/underactive/overactive patterns, body-mind reflection, pros, watch-outs, practices, and journal prompts (press Esc to close)
- **Stretch image references** — Google Images search links for yoga poses and stretches
- **Chakra selector grid** — jump between chakras without using the body model
- **Pause / Rotate 3D toggle** — freeze or resume the sway and aura-ring animations

## Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Vite](https://vite.dev/) | 8 | Dev server and build |
| [React](https://react.dev/) | 19 | UI components |
| [Tailwind CSS v4](https://tailwindcss.com/) | 4 | Utility styling via `@tailwindcss/vite` |

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

## Linting

```bash
npm run lint
```

## Deployment

This is a fully static SPA — no server required. Deploy the `/dist` folder to any static host:

- **Netlify**: drag-and-drop `/dist`, or connect via Git with build command `npm run build` and publish directory `dist`
- **Vercel**: `vercel --prod` or connect repo; framework preset Vite
- **GitHub Pages**: push `/dist` contents to a `gh-pages` branch

## Project structure

```
src/
  data/
    chakras.js          # all chakra content and stretch link data
  Chakra3DVisualizer.jsx  # all UI components (single-file SPA)
  App.jsx
  main.jsx
  index.css             # Tailwind import + global keyframes
```

## Content safety

Chakra language in this app is used as a **symbolic wellness framework for self-reflection only**. It is:

- **Not** medical diagnosis or treatment
- **Not** a replacement for qualified mental health or medical care
- Intended to support self-awareness, journaling, and personal exploration

If any content raises concerns about your physical or mental health, consult a licensed healthcare professional.

## Known limitations

- Content is English-only
- No user accounts, saved state, or progress tracking
- Stretch image links open Google Images — results are not curated by this app
- No offline mode

## Roadmap ideas

- Add affirmation audio playback
- Export journal prompts as PDF
- Add more reflection lenses (astrology, seasons, doshas)
- Dark/light mode toggle
- i18n support
