# Soham Jindal — Software Engineering Portfolio

[![Portfolio checks](https://github.com/brohum10/soham-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/brohum10/soham-portfolio/actions/workflows/ci.yml)
[![Live site](https://img.shields.io/badge/live-GitHub%20Pages-111827)](https://brohum10.github.io/soham-portfolio/)

A responsive portfolio for Soham Jindal’s software engineering work. The site foregrounds architecture, failure-aware design, automated verification, and reproducible project results rather than generic technology lists.

## What is included

- Experience across ADT, L3Harris, and Alpha Net
- Seven selected builds spanning safe LLM systems, distributed systems, retrieval, developer tooling, on-device AI, and frontend engineering
- Accessible project filters, mobile navigation, keyboard focus states, skip navigation, and reduced-motion behavior
- Direct links to source repositories, résumé, LinkedIn, GitHub, and email
- Search and social metadata plus Person structured data
- Component tests for the primary navigation and project-discovery flow

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

Project, experience, link, and skill content lives in `src/data.js`. Presentation and interactions live in `src/App.jsx`; the responsive visual system is in `src/index.css`. Keeping verified facts in one data module makes updates easier to review and reduces copy drift between sections.

When changing a benchmark claim, update it only after rerunning the benchmark in the linked project and recording the workload and environment there.

## Deployment

```bash
npm run deploy
```

The deployment script runs the complete verification suite before publishing `dist/` to GitHub Pages.
