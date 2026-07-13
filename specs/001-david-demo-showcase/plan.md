# Implementation Plan: David Demo Showcase

**Branch**: `codex/david-demo-showcase` | **Date**: 2026-07-12 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-david-demo-showcase/spec.md`

## Summary

Build a deterministic desktop-first Web App that demonstrates one complete AI Study
Coach case. A short agentic intake creates Product Context; a unified React Flow Canvas
renders IA as the base, Flow as an overlay, and Wireframe as an in-place node expansion;
a proposed Scope cut triggers one aggregated blocker; an approved lightweight repair
restores readiness; and a local Handoff Center exposes derived artifacts. One normalized
Blueprint fixture, a reducer, deterministic validators, and stable canonical IDs drive
all visible state.

## Technical Context

**Language/Version**: TypeScript 5.8 strict; React 19

**Primary Dependencies**: Vite 8, `@xyflow/react`, Zod, Lucide React

**Storage**: In-memory fixture and reducer state; Clipboard API with truthful fallback;
no persistence required

**Testing**: Vitest for schema/reducer/validator; Playwright Chromium for journeys,
viewports, screenshots, console errors, reduced motion, and repeated reset

**Target Platform**: Current desktop Chromium; record at 1440x900; operate at 1280x720

**Project Type**: Single client-only Web App in the existing `desktop/` Vite entry;
Tauri remains an optional packaging shell and is not a completion dependency

**Performance Goals**: Every deterministic transition responds in under 500 ms;
no unexplained loading over 2 seconds; Canvas interactions remain visually stable

**Constraints**: Offline; deterministic; no backend, auth, database, collaboration,
live LLM, WebGL, high-fidelity editor, or page-level horizontal scrolling

**Scale/Scope**: One reference Blueprint: 4 regions, 9 nodes, 9 flows, one conflict,
one applied repair, 11 derived handoff artifacts, three application surfaces

## Constitution Check

*GATE: Must pass before implementation and after design.*

| Principle | Plan evidence | Status |
|---|---|---|
| Deterministic demo | Local fixture, reducer, no network | PASS |
| One canonical Blueprint | Normalized document plus projections only | PASS |
| Unified Canvas semantics | IA base; Flow overlay; node-owned Wireframe | PASS |
| Conversation-first intake | One question plus live context | PASS |
| Constraint validation | Pending ChangeSet and deterministic validator | PASS |
| Consequential approval | Repair approval precedes canonical mutation | PASS |
| Clickable P0 | No placeholder primary controls | PASS |
| Strict accessible frontend | strict TS, labels, focus, non-color status, reduced motion | PASS |
| Required verification | Vitest, Playwright, build, lint, console gate | PASS |
| Recording layout | Two explicit desktop projects/viewports | PASS |
| Scope discipline | No prohibited infrastructure or editor scope | PASS |
| Completion by evidence | Artifact logs, screenshots, five-reset run, convergence | PASS |

## Architecture Decisions

### Single recorded runtime

Root `dev` and `build` scripts will target the Vite app in `desktop/`, eliminating the
current risk that tests validate Next while recording uses Vite. Legacy Next scripts may
remain explicitly named but are outside acceptance.

### Fixture normalization

The source demo fixture is treated as legacy-shaped input. A one-way normalizer creates
the runtime `BlueprintDocument` by:

- mapping scalar provenance to orthogonal `knowledgeStatus`, `basisType`, and
  `lifecycleStatus`;
- mapping severity to Title Case;
- creating canonical action IDs and binding each Flow to an action or state;
- adding explicit main-path and thumbnail node IDs from the demo specification;
- adding P0 acceptance criteria;
- deriving three Wireframe handoff artifacts from canonical nodes.

The UI never infers relationships from DOM copy.

### Scope proposal and validation

Changing Diagnostic Quiz to Later creates a pending ChangeSet and a projected document.
Validation runs against that projection while the canonical snapshot remains unchanged.
Dependency and required-path failures caused by the same removed node aggregate into one
Blocker with both rule IDs. Applying the recommended repair updates the canonical node,
the three-question Wireframe, the affected path, and a user-approved Decision Record.

### Readiness

Readiness is derived from:

1. zero Blockers;
2. valid canonical references;
3. a Wireframe for every In MVP page;
4. acceptance criteria for every P0 node and required Flow;
5. non-empty Handoff manifest and starter prompt.

Fixture `ready_after_repair` is treated as expected behavior, not a writable readiness flag.

### Canvas layout

React Flow renders stable region group nodes and canonical product nodes. Flow visibility
changes edges only. Scope and Validation are quiet non-color overlays. Selecting Daily
Session expands that same node and keeps ancestor, predecessor, successor, and surrounding
nodes visible. CSS stack plates and selection shadow provide subtle depth without encoding
truth or severity.

## Project Structure

### Documentation and evidence

```text
specs/001-david-demo-showcase/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── interaction-contract.md
├── checklists/
│   ├── requirements.md
│   └── demo-requirements.md
└── tasks.md

artifacts/demo-showcase/
├── implementation-preflight.md
├── build-log.md
├── test-log.md
├── final-status.md
├── final-acceptance-checklist.md
├── playwright-report/
└── screenshots/
```

### Source code

```text
desktop/
├── index.html
└── src/
    ├── main.tsx
    ├── app/
    │   ├── App.tsx
    │   └── demoReducer.ts
    ├── components/
    │   ├── shell/AppShell.tsx
    │   ├── intake/IntakeWorkspace.tsx
    │   ├── canvas/BlueprintWorkspace.tsx
    │   ├── canvas/BlueprintCanvas.tsx
    │   ├── canvas/BlueprintNode.tsx
    │   ├── canvas/BlueprintEdge.tsx
    │   ├── canvas/ExpandedWireframe.tsx
    │   ├── canvas/LensComposer.tsx
    │   ├── canvas/NodeInspector.tsx
    │   ├── canvas/DecisionPanel.tsx
    │   └── handoff/HandoffCenter.tsx
    ├── domain/
    │   ├── blueprint.ts
    │   ├── blueprint.schema.ts
    │   ├── fixtureNormalizer.ts
    │   ├── validators.ts
    │   ├── readiness.ts
    │   └── handoff.ts
    ├── fixtures/
    │   └── ai-study-coach.blueprint.ts
    └── styles/
        ├── tokens.css
        └── app.css

tests/
├── unit/
│   ├── fixture.test.ts
│   ├── validator.test.ts
│   ├── reducer.test.ts
│   └── handoff.test.ts
└── e2e/
    ├── happy-path.spec.ts
    ├── scope-repair.spec.ts
    ├── lenses.spec.ts
    ├── handoff-reset.spec.ts
    └── visual-repeat.spec.ts

eslint.config.js
playwright.config.ts
vitest.config.ts
vite.desktop.config.ts
```

**Structure Decision**: Rebuild the placeholder Vite client into the demo. Do not
refactor the Next pivot shell into a second equivalent app. Domain functions remain
framework-independent so unit tests validate the same fixture and reducer used by UI.

## Implementation Phases

1. **Contracts and tooling**: dependencies, scripts, strict config, normalized fixture,
   schemas, validators, unit-test harness.
2. **Intake**: conversation, one question, live context, generation transition.
3. **Unified Canvas**: regions, nodes, Flow edge projection, lenses, Inspector, fit view.
4. **Node expansion**: Daily Session local Wireframe, focus/context, synced selection.
5. **Scope decision**: pending ChangeSet, one aggregated blocker, static diff, repair.
6. **Handoff**: 11 derived artifacts, preview, copy fallback, back and reset.
7. **Verification and polish**: both viewports, accessibility, screenshots, console
   capture, five repeats, recording steps.

## Post-Design Constitution Check

The data model, interaction contract, quickstart, and planned tests preserve all twelve
principles. No exception or complexity waiver is required.

## Complexity Tracking

No constitutional violation is planned. React Flow, Zod, and the test tools each map to
a direct acceptance need; no state framework, backend framework, animation library, or
extra runtime abstraction is introduced.
