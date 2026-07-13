# David Demo Showcase Test Log

**Date:** 2026-07-12  
**Branch:** `codex/david-demo-showcase`  
**Runtime:** Node.js `v24.14.0`, npm `10.9.2`

## Final Gates

| Gate | Command | Result |
|---|---|---|
| Dependency install | `npm install --ignore-scripts` | PASS — up to date |
| TypeScript strict | `npm run typecheck` | PASS |
| ESLint | `npm run lint` | PASS |
| Unit contracts | `npm test` | PASS — 4 files, 24 tests |
| Production build | `npm run build` | PASS |
| Browser journeys | `npm run test:e2e` | PASS — 24 tests, 2 viewports |
| Screenshot capture | Playwright visual evidence test | PASS — 10 PNGs after final capture |

The production build emits one non-blocking bundle-size warning: the main JavaScript
chunk is approximately 508 kB minified because React Flow is bundled into the single
offline demo entry. This does not affect correctness or recording reliability.

## Unit Coverage

- canonical fixture parsing and normalization;
- Zod Blueprint contract;
- duplicate and orphan canonical IDs;
- action-to-node and action-to-Wireframe bindings;
- constraint, acceptance criterion, repair, and demo-config references;
- one-root-blocker aggregation;
- ChangeSet projection and approved repair transaction;
- Decision Record / ChangeSet ledger consistency;
- validator-derived readiness;
- complete snapshot-derived Handoff;
- deterministic Reset.

## Browser Coverage

Every Playwright test runs at both `1440x900` and `1280x720` with retries disabled.

- agentic intake, one question, both organizing choices, empty input, and reference fallback;
- canonical 4-region / 9-node Blueprint generation;
- stable IA positions while Flow toggles;
- one-click Daily Session expansion and node-owned low-fi Wireframe;
- connected happy and error Flow visibility;
- Wireframe Lens collapse without data deletion;
- Scope proposal shown as `Proposed: Later`;
- broken required path, one blocker, and three repair alternatives;
- approved lightweight repair and `Question 1 of 3` cascade;
- complete 11-file Handoff with four-file preview;
- clipboard success or truthful manual fallback;
- Back state preservation;
- Reset from conflict, repaired Canvas, and Handoff;
- five complete, no-reload journeys using only Reset between runs;
- console errors, page errors, failed same-origin requests, and page overflow.

## Visual Evidence

Evidence is stored under `artifacts/demo-showcase/screenshots/` for intake, canonical
Canvas, expanded Wireframe, Scope conflict, and Handoff. Screenshots were inspected at
original resolution. React Flow capture waits for `fitView` to settle before sampling.

## Runtime Notes

- The app is deterministic and offline after dependencies are installed.
- Clipboard permission may be denied by automation or browser policy; the UI reports a
  manual selection fallback instead of claiming a successful copy.
- No backend, database, auth, live LLM, or external request is required.
