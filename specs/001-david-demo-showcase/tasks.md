# Tasks: David Demo Showcase

**Input**: Design documents from `specs/001-david-demo-showcase/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/interaction-contract.md`, `quickstart.md`

**Tests**: Required by the Demo constitution. Test tasks precede implementation tasks.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Safe to run in parallel because it owns a distinct file and has no incomplete dependency.
- **[Story]**: User story from `spec.md`.

## Phase 1: Setup

**Purpose**: Make the Vite demo the single verified runtime and install only required tooling.

- [x] T001 Update dependencies and root Vite-oriented scripts in `package.json` and `package-lock.json`
- [x] T002 [P] Configure strict application typechecking in `tsconfig.json` and `tsconfig.desktop.json`
- [x] T003 [P] Configure lint rules in `eslint.config.js`
- [x] T004 [P] Configure unit tests in `vitest.config.ts`
- [x] T005 [P] Configure two recording viewports and artifact paths in `playwright.config.ts`
- [x] T006 [P] Replace placeholder HTML metadata in `desktop/index.html`

**Checkpoint**: Install, typecheck, lint, unit-test discovery, and Playwright discovery run.

---

## Phase 2: Foundational Contracts

**Purpose**: Freeze one canonical model, deterministic state, and test oracle before UI.

**CRITICAL**: No user-story UI starts until these contracts pass unit tests.

- [x] T007 [P] Write fixture/schema failure cases in `tests/unit/fixture.test.ts`
- [x] T008 [P] Write dependency aggregation and readiness cases in `tests/unit/validator.test.ts`
- [x] T009 [P] Write transition, repair cascade, and reset cases in `tests/unit/reducer.test.ts`
- [x] T010 [P] Write derived Handoff manifest cases in `tests/unit/handoff.test.ts`
- [x] T011 Define canonical domain types and IDs in `desktop/src/domain/blueprint.ts`
- [x] T012 Define Zod runtime schemas in `desktop/src/domain/blueprint.schema.ts`
- [x] T013 Extract and extend the source fixture into `desktop/src/fixtures/ai-study-coach.blueprint.ts`
- [x] T014 Implement legacy-to-canonical normalization and action bindings in `desktop/src/domain/fixtureNormalizer.ts`
- [x] T015 Implement referential, Wireframe, dependency, path, and issue aggregation rules in `desktop/src/domain/validators.ts`
- [x] T016 Implement validator-derived Handoff readiness in `desktop/src/domain/readiness.ts`
- [x] T017 Implement 11-file snapshot-derived Handoff compilation in `desktop/src/domain/handoff.ts`
- [x] T018 Implement deterministic app state and reducer in `desktop/src/app/demoReducer.ts`
- [x] T019 Run and fix foundational unit suites in `tests/unit/*.test.ts`

**Checkpoint**: All fixture references resolve; Diagnostic Later creates one Blocker;
lightweight repair updates the 3-question Wireframe and clears readiness blockers.

---

## Phase 3: User Story 1 - Agentic Intake (Priority: P1)

**Goal**: One decision-changing question turns a fuzzy idea into Live Product Context.

**Independent Test**: Reset, submit idea, choose daily outcome, confirm context and generation gate.

### Tests

- [x] T020 [P] [US1] Add intake Playwright journey and stable role locators in `tests/e2e/happy-path.spec.ts`

### Implementation

- [x] T021 [P] [US1] Implement application shell, top bar, and fixed Reset control in `desktop/src/components/shell/AppShell.tsx`
- [x] T022 [US1] Implement conversation, rationale, answer choices, and Live Context in `desktop/src/components/intake/IntakeWorkspace.tsx`
- [x] T023 [US1] Wire reducer state and route transitions in `desktop/src/app/App.tsx`
- [x] T024 [US1] Mount the application and global styles in `desktop/src/main.tsx`
- [x] T025 [US1] Run the intake unit and Playwright slice in `tests/e2e/happy-path.spec.ts`

**Checkpoint**: Generate Blueprint is enabled only after the one-question answer.

---

## Phase 4: User Story 2 - Unified IA, Flow, and Wireframe (Priority: P1)

**Goal**: One graph keeps canonical identity while Flow toggles and Daily Session expands.

**Independent Test**: Open Blueprint, toggle Flow, select Daily Session, inspect its
expanded Wireframe and synchronized Inspector.

### Tests

- [x] T026 [P] [US2] Extend happy-path Canvas assertions in `tests/e2e/happy-path.spec.ts`
- [x] T027 [P] [US2] Add lens invariance and data-attribute assertions in `tests/e2e/lenses.spec.ts`

### Implementation

- [x] T028 [P] [US2] Implement region and product node projections in `desktop/src/components/canvas/BlueprintNode.tsx`
- [x] T029 [P] [US2] Implement canonical edge states and labels in `desktop/src/components/canvas/BlueprintEdge.tsx`
- [x] T030 [P] [US2] Implement node-owned low-fi block renderer in `desktop/src/components/canvas/ExpandedWireframe.tsx`
- [x] T031 [P] [US2] Implement IA-locked lens controls in `desktop/src/components/canvas/LensComposer.tsx`
- [x] T032 [P] [US2] Implement selected-node canonical details in `desktop/src/components/canvas/NodeInspector.tsx`
- [x] T033 [US2] Assemble React Flow, fit view, focus/context, and expansion in `desktop/src/components/canvas/BlueprintCanvas.tsx`
- [x] T034 [US2] Assemble Outline, Canvas, lenses, and Inspector in `desktop/src/components/canvas/BlueprintWorkspace.tsx`
- [x] T035 [US2] Run and fix happy-path and lens suites in `tests/e2e/happy-path.spec.ts` and `tests/e2e/lenses.spec.ts`

**Checkpoint**: IA nodes do not move or duplicate when Flow changes; Daily Session is
the same canonical object before and after expansion.

---

## Phase 5: User Story 3 - Scope Conflict and Repair (Priority: P1)

**Goal**: A pending Scope proposal visibly breaks one path, then an approved repair restores it.

**Independent Test**: Propose Diagnostic Later, inspect one Blocker and three alternatives,
apply the lightweight repair, and confirm canonical cascade plus Decision Record.

### Tests

- [x] T036 [P] [US3] Add proposed-change, one-root-blocker, repair, and decision assertions in `tests/e2e/scope-repair.spec.ts`

### Implementation

- [x] T037 [P] [US3] Implement static diff, reason, impact, and repair cards in `desktop/src/components/canvas/DecisionPanel.tsx`
- [x] T038 [US3] Project pending ChangeSet and broken edge in `desktop/src/components/canvas/BlueprintWorkspace.tsx`
- [x] T039 [US3] Apply the repair cascade and derived readiness through `desktop/src/app/demoReducer.ts`
- [x] T040 [US3] Run and fix scope-conflict suite in `tests/e2e/scope-repair.spec.ts`

**Checkpoint**: Canonical state is unchanged during proposal; approved repair changes
Quick Diagnostic, three-question Wireframe, path, readiness, and Decision Record together.

---

## Phase 6: User Story 4 - Handoff Center (Priority: P1)

**Goal**: Browse a truthful snapshot-derived package and copy the starter prompt.

**Independent Test**: Open Handoff, preview four files, copy with success/fallback,
and return without state loss.

### Tests

- [x] T041 [P] [US4] Add Handoff tree, preview, clipboard, back-state, and fallback assertions in `tests/e2e/handoff-reset.spec.ts`

### Implementation

- [x] T042 [US4] Implement file tree, preview, source references, and copy feedback in `desktop/src/components/handoff/HandoffCenter.tsx`
- [x] T043 [US4] Wire Handoff and back transitions in `desktop/src/app/App.tsx`
- [x] T044 [US4] Run and fix Handoff suite in `tests/e2e/handoff-reset.spec.ts`

**Checkpoint**: START_HERE is default, 11 artifacts derive from current Blueprint, and
copy denial remains truthful and error-free.

---

## Phase 7: User Story 5 - Deterministic Reset (Priority: P1)

**Goal**: Reset every canonical and transient field and repeat the entire demo five times.

**Independent Test**: Reset from conflict and Handoff; repeat the whole script five times
in one page with no accumulated state or errors.

### Tests

- [x] T045 [P] [US5] Add Reset-from-every-state assertions in `tests/e2e/handoff-reset.spec.ts`
- [x] T046 [P] [US5] Add five-run, reduced-motion, console, request-failure, and overflow gates in `tests/e2e/visual-repeat.spec.ts`

### Implementation

- [x] T047 [US5] Expose complete reset and transient cleanup in `desktop/src/components/shell/AppShell.tsx` and `desktop/src/app/demoReducer.ts`
- [x] T048 [US5] Run and fix five-repeat and reduced-motion suites in `tests/e2e/visual-repeat.spec.ts`

**Checkpoint**: Five complete journeys pass serially with retries disabled.

---

## Phase 8: Visual Polish and Recording Readiness

**Purpose**: Meet both viewports, accessibility, evidence, and final documentation gates.

- [x] T049 [P] Define restrained Quiet Blueprint tokens in `desktop/src/styles/tokens.css`
- [x] T050 Implement responsive shell, Canvas, depth, focus, diff, toast, and reduced-motion styles in `desktop/src/styles/app.css`
- [x] T051 Audit labels, focus order, non-color status, and overflow against `specs/001-david-demo-showcase/contracts/interaction-contract.md`
- [x] T052 Capture required 1280x720 and 1440x900 screenshots in `artifacts/demo-showcase/screenshots/`
- [x] T053 Record install, typecheck, lint, unit, build, Playwright, and console evidence in `artifacts/demo-showcase/test-log.md`
- [x] T054 Update product positioning, commands, and recording steps in `README.md` and `README.zh-CN.md`
- [x] T055 Complete the evidence-backed checklist in `artifacts/demo-showcase/final-acceptance-checklist.md`
- [x] T056 Run the full 90-120 second journey five times and document results in `artifacts/demo-showcase/final-status.md`
- [x] T057 Run final Spec Kit convergence and append only unresolved P0 tasks to `specs/001-david-demo-showcase/tasks.md`

---

## Dependencies and Execution Order

```text
Setup
-> Foundational contracts
-> US1 Intake
-> US2 Unified Canvas
-> US3 Scope decision
-> US4 Handoff
-> US5 Reset/repeatability
-> Visual and final evidence
```

The competition MVP is the entire vertical slice; no single story alone meets the demo goal.

## Parallel Opportunities

- Setup config files T002-T006 are independent after T001.
- Foundational test files T007-T010 can be authored in parallel before T011-T018.
- US2 node, edge, Wireframe, lens, and Inspector components T028-T032 have disjoint files.
- E2E story files may be authored before their corresponding UI slices.
- Visual tokens T049 can run while Handoff/Reset implementation finishes.

## Implementation Strategy

1. Preserve the runnable result of every completed phase.
2. Run relevant unit and browser tests before moving to the next user story.
3. Do not use parallel write agents on shared reducer, app root, or workspace files.
4. Treat screenshot review as a requirements check, not the sole semantic test.
5. Stop only after convergence reports no P0 and all evidence artifacts exist.
