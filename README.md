# Soham Jindal — Software Engineering Portfolio

[![Portfolio checks](https://github.com/brohum10/soham-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/brohum10/soham-portfolio/actions/workflows/ci.yml)
[![Live site](https://img.shields.io/badge/live-GitHub%20Pages-111827)](https://brohum10.github.io/soham-portfolio/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A responsive portfolio for Soham Jindal’s software engineering work. The site foregrounds architecture, failure-aware design, automated verification, and reproducible project results rather than generic technology lists.

## What is included

- Experience across ADT, L3Harris, and Alpha Net
- Twelve selected builds spanning safe LLM systems, distributed systems, storage engines, local-first collaboration, retrieval, backend automation, a full-stack product, on-device AI, and frontend engineering
- A kinetic opening with an original 3D particle sculpture: drag to rotate, scatter and reassemble it, or morph between four surfaces linked to actual projects
- Four switchable system walkthroughs that let visitors explore the architecture before opening a repository
- Accessible project filters, mobile navigation, keyboard-operable map controls, visible focus states, skip navigation, and reduced-motion behavior
- Direct links to source repositories, résumé, LinkedIn, GitHub, and email
- Search and social metadata plus Person structured data
- Component tests for navigation, project discovery, reduced-motion defaults, and the canvas fallback; renderer tests cover bounded geometry, pausing, viewport suspension, and teardown

## Stack

- React 19 and Vite 7
- Plain CSS with a responsive layout and shared design tokens
- Vitest, Testing Library, and jsdom
- ESLint and GitHub Actions
- GitHub Pages deployment

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Vite prints the local preview address after startup.

## Verification

Run the same checks used by CI:

```bash
npm run check
```

This runs linting, component tests, and the optimized production build. Individual commands are also available:

```bash
npm run lint
npm test
npm run build
```

## Content structure

Project, experience, link, skill, and featured-walkthrough content lives in `src/data.js`. Main presentation lives in `src/App.jsx` and `src/index.css`; `src/LivingSystem.jsx` and `src/living-system.css` own the opening experience. The sculpture and walkthrough share one selection state and ordinary keyboard-operable buttons. Keeping verified facts in one data module makes updates easier to review and reduces copy drift between sections.

## The living system

`src/sculpture.js` projects procedural 3D geometry into a 2D canvas without a graphics dependency, external model, video, or paid API. A shared point grid morphs between a cubic lattice (Systems), sphere (Applied AI), torus (Full stack), and wave (Frontend). These are artistic representations, not live project telemetry. Pointer movement adds perspective, dragging changes orientation, and scattering displaces points before they settle back into the surface.

Animation respects reduced-motion preferences, has an explicit pause button, and stops when the canvas is offscreen or the document is hidden. Small screens use fewer points; pixel density is capped. The renderer releases its frame callbacks, observers, and event listeners on teardown. When canvas is unavailable, a CSS illustration and all project navigation remain usable. There is no loading gate or autoplay audio.

The design research considered the exploratory approach of [Bruno Simon](https://bruno-simon.com/) and the immersive visual storytelling of [Lusion](https://lusion.co/). The sculpture, geometry, interaction code, typography treatment, and layout here are original; no reference-site code or assets are included.

When changing a benchmark claim, update it only after rerunning the benchmark in the linked project and recording the workload and environment there.

## Deployment

Every successful `Portfolio checks` run on `main` automatically builds the same verified commit and publishes `dist/` to the `gh-pages` branch. A failing lint, test, or build run therefore cannot update the public site.

For a manual fallback:

```bash
npm run deploy
```

The deployment script runs the complete verification suite before publishing `dist/` to GitHub Pages.
