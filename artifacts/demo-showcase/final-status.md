# David Demo Showcase Final Status

## Status

**Engineering acceptance: PASS**

The AI Study Coach reference case demonstrates one constraint-aware canonical Blueprint:

```text
Bet -> IA spine -> Flow overlay -> node-owned Wireframe
-> Scope proposal -> constraint blocker -> approved repair -> Handoff snapshot
```

IA, Flow, and Wireframe do not use disconnected editors or duplicate identities. Scope
and validation affect the same graph, and Handoff compiles from the repaired canonical
snapshot.

## Exact Commands

Prerequisite: Node.js 24 (`.nvmrc`) or another version allowed by `package.json`.

```bash
npm install
npm run dev
```

Open: [http://127.0.0.1:1420](http://127.0.0.1:1420)

Verification:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

## Recording Steps

Use a `1440x900` browser viewport and follow
`docs/product/david-mode-b/demo/03_ai_study_coach_demo_script.md`:

1. Send the default AI Study Coach idea.
2. Choose the daily-session outcome.
3. Generate Blueprint.
4. Toggle Flow off and on.
5. Select Daily Session to expand its Wireframe.
6. Select Diagnostic Quiz and propose Later.
7. Explain the broken required path and three repairs.
8. Apply the lightweight diagnostic repair.
9. Open Handoff, preview files, and copy the starter prompt.
10. Return to Blueprint or Reset Demo.

The scripted narration is designed for 90–120 seconds. Automated interaction completes
well below the limit. The same complete sequence passes five times without reload,
using Reset Demo between runs.

## Evidence

- 24 unit tests pass.
- 24 Playwright tests pass across two desktop viewports.
- Five full no-reload Reset cycles pass at each viewport.
- No uncaught console, page, promise, or same-origin request failures were observed.
- Required screenshots exist for both recording viewports.
- Four independent post-build reviewers were run; all discovered P0 issues were fixed
  before final convergence.

## Known Limitations

- This is one deterministic reference case, not multi-case generation.
- There is no backend, persistence, auth, collaboration, live LLM, or production export.
- Wireframes are low-fi JSON projections, not a freeform design editor.
- Handoff is an in-app compiled preview; it does not write files to another repository.
- The build reports a non-blocking ~508 kB JavaScript chunk warning.
- Engineering tests prove cross-layer coherence, not first-use comprehension by target
  users. A moderated usability test is still required before freezing the final Canvas UX.

## Fallback Controls

- `Fit view` restores spatial context.
- `Back to Blueprint` preserves the accepted decision.
- Clipboard denial produces a manual-selection instruction.
- Non-reference intake is transparently mapped to the reference case.
- `Reset Demo` restores canonical and transient state.
