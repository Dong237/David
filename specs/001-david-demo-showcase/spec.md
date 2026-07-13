# Feature Specification: David Demo Showcase

**Feature Branch**: `codex/david-demo-showcase`

**Created**: 2026-07-12

**Status**: Ready for clarification

**Input**: Build a clickable, recordable David Mode B competition showcase using
the deterministic AI Study Coach reference case.

## Clarifications

### Session 2026-07-12

- No user question was required: the demo sources fix the AI Study Coach fixture,
  the one-question intake, the unified Canvas semantics, the scope-conflict repair,
  the recording viewports, and the offline deterministic boundary.
- Routine implementation choices remain reversible and belong in the technical plan.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Turn a Fuzzy Idea into Product Context (Priority: P1)

An AI indie builder enters a rough AI Study Coach idea. David interprets it, asks
one question that changes the organizing principle, and turns the answer into a
live Product Context that is ready to become a Blueprint.

**Why this priority**: The intake proves that David behaves like a PM coworker,
not a form or an instant screen generator.

**Independent Test**: Start from Reset, submit the default idea, choose the daily
session outcome, and verify that the structured context updates and Blueprint
generation becomes available.

**Acceptance Scenarios**:

1. **Given** the initial intake, **When** the builder submits an idea, **Then**
   David shows one decision-changing question and no additional intake form.
2. **Given** the question is visible, **When** the builder selects daily focused
   study, **Then** target user, situation, core job, primary outcome, and constraints
   update visibly and Blueprint generation becomes available.
3. **Given** the submitted idea does not match the reference case, **When** David
   interprets it, **Then** a clear demo-mode notice appears and the deterministic
   reference case remains usable.

---

### User Story 2 - Understand One Unified Product Blueprint (Priority: P1)

The builder opens a single Canvas where IA is the base graph, Flow appears on that
same graph, and selecting Daily Session expands its low-fidelity Wireframe in place
while preserving structural context.

**Why this priority**: This is the primary product claim and the requested proof
that IA, Flow, and Wireframe can cooperate naturally in one view.

**Independent Test**: Open the reference Blueprint directly, toggle Flow, select
Daily Session, and verify that its identity, incoming/outgoing path, internal layout,
scope, and Inspector details stay synchronized.

**Acceptance Scenarios**:

1. **Given** the Blueprint is open, **When** the Canvas settles, **Then** at least
   four regions and eight canonical IA nodes are visible without information overload.
2. **Given** Flow is enabled, **When** the builder disables and re-enables it,
   **Then** edges disappear and return without moving, replacing, or duplicating nodes.
3. **Given** Daily Session is collapsed, **When** the builder selects it, **Then**
   the same node expands to show its mini Wireframe, CTA, and next state while its
   ancestors and adjacent Flow nodes remain visible.
4. **Given** a node is selected, **When** the selection changes, **Then** the Canvas,
   Flow highlights, Scope marker, and Inspector reference the same canonical node.

---

### User Story 3 - Detect and Repair a Broken Product Decision (Priority: P1)

The builder moves Diagnostic Quiz from In MVP to Later. David detects that this
breaks the required personalized-plan path, explains the impact, and offers three
bounded repair options. The builder approves the lightweight diagnostic repair.

**Why this priority**: The interaction proves David evaluates product consequences
instead of acting as a drawing tool.

**Independent Test**: Change only Diagnostic Quiz scope, observe the blocker and
broken edge, choose the recommended repair, and verify that the path and readiness
recover.

**Acceptance Scenarios**:

1. **Given** Diagnostic Quiz is In MVP, **When** its scope changes to Later, **Then**
   the required edge visibly breaks, exactly one blocker appears, and the reason
   names the missing learner-level input.
2. **Given** the blocker is active, **When** the Decision Panel opens, **Then** all
   three repair choices, their tradeoffs, and the recommended option are visible.
3. **Given** the builder approves the lightweight repair, **When** the change applies,
   **Then** Quick Diagnostic returns to In MVP, the required path is restored, the
   blocker clears, and the decision is recorded as user-approved.

---

### User Story 4 - Hand a Ready Blueprint to a Coding Agent (Priority: P1)

After repair, the builder opens a Handoff Center, inspects canonical Blueprint,
IA, Flow, Scope, acceptance, no-go, Wireframe, and starter-prompt artifacts, and
copies the starter prompt.

**Why this priority**: The handoff proves the Canvas produces an executable package,
not a dead visual artifact.

**Independent Test**: Enter Handoff from a repaired Blueprint, open at least four
files, copy the starter prompt, and return without losing Blueprint state.

**Acceptance Scenarios**:

1. **Given** the Blueprint has no blockers, **When** the builder opens Handoff,
   **Then** START_HERE is selected and at least eight truthful local artifacts appear.
2. **Given** a file is selected, **When** the builder chooses another file, **Then**
   its preview changes without claiming unsupported cloud or download behavior.
3. **Given** the starter prompt is visible, **When** the builder copies it, **Then**
   the interface confirms success and the text is available to paste when permission
   allows.
4. **Given** Handoff is open, **When** the builder returns to the Blueprint, **Then**
   the repaired state remains intact.

---

### User Story 5 - Reset and Repeat the Recording (Priority: P1)

The presenter can reset the entire app from any demo state and repeat the exact
journey without refresh, stale warnings, or random output.

**Why this priority**: Competition recording requires deterministic recovery more
than production persistence.

**Independent Test**: Reach conflict, repaired Canvas, and Handoff states; Reset
from each; repeat the full journey five times.

**Acceptance Scenarios**:

1. **Given** any application state, **When** Reset Demo is activated, **Then** the
   original intake, fixture, lenses, scope, selection, validation, and handoff state
   are restored.
2. **Given** a full journey has completed, **When** the presenter repeats it five
   times, **Then** every state transition and visible result remains identical.

### Edge Cases

- An empty idea cannot advance and receives a concise inline instruction.
- A non-reference idea remains editable and receives a transparent demo-mode notice.
- Clipboard permission failure still provides a truthful `Starter prompt ready`
  confirmation without blocking the demo.
- Turning off Wireframe collapses details without deleting Wireframe data.
- Turning off Scope hides badges without changing scope values.
- Non-recommended repair options remain visible as bounded alternatives without
  pretending that their unimplemented patches can be applied in the demo.
- Reset while a Decision Panel or toast is open clears all transient state.
- Critical blockers remain understandable without relying on color alone.
- At both recording sizes, controls remain reachable without horizontal scrolling.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide an editable idea input and a visible Send action.
- **FR-002**: The system MUST ask exactly one decision-changing question after idea
  submission for the reference journey.
- **FR-002A**: The question MUST state why it matters, which organizing decision it
  changes, and the safe reference-case fallback.
- **FR-003**: The system MUST provide two answer options and update Live Product
  Context from the selected answer.
- **FR-004**: Blueprint generation MUST remain unavailable until Product Context is ready.
- **FR-005**: The system MUST render the canonical reference fixture with at least
  four Product Regions and eight IA nodes.
- **FR-006**: IA node identity MUST remain stable across Canvas, Flow, Wireframe,
  Scope, Validation, Inspector, and Handoff references.
- **FR-007**: The system MUST let the builder show and hide Flow without changing IA.
- **FR-008**: The system MUST let the builder show and hide Scope markers without
  changing scope state.
- **FR-009**: The system MUST let the builder show and hide Wireframe projections
  without deleting Wireframe data.
- **FR-010**: Selecting Daily Session MUST expand that IA node in place and show its
  low-fidelity internal information hierarchy, primary CTA, and next state.
- **FR-011**: The Inspector MUST show purpose, user intent, primary CTA, states,
  scope, and structural rationale for the selected node.
- **FR-012**: Moving Diagnostic Quiz to Later MUST trigger a deterministic blocker
  because Study Plan depends on its learner-level input.
- **FR-012A**: The scope change MUST remain a pending, inspectable proposal until a
  repair is approved; related dependency and path failures MUST aggregate into one
  root-cause blocker rather than duplicate warnings.
- **FR-013**: The conflict MUST visibly identify the broken required edge and display
  the reason in a Decision Panel.
- **FR-014**: The Decision Panel MUST show three bounded repair choices and identify
  the lightweight diagnostic as recommended.
- **FR-015**: Approving the recommended repair MUST update the canonical node variant,
  its three-question Wireframe, restore the required path, clear the blocker, and
  create a user-approved decision record.
- **FR-016**: Handoff MUST contain at least eight clickable truthful artifact entries,
  default to START_HERE, and preview at least four distinct files.
- **FR-017**: Copy Starter Prompt MUST attempt clipboard copy and provide visible
  success or truthful fallback feedback.
- **FR-018**: Returning from Handoff MUST preserve the current Blueprint state.
- **FR-019**: Reset Demo MUST restore all canonical and transient state to the initial fixture.
- **FR-020**: Important status and controls MUST remain operable by keyboard and MUST
  NOT rely on color alone.
- **FR-021**: The system MUST respect reduced-motion preferences and MUST NOT require hover.
- **FR-022**: The complete demo MUST work without network, authentication, backend,
  database, collaboration, or live model dependencies.
- **FR-023**: The system MUST NOT present unsupported export, download, sync, or
  collaboration capabilities.

### Key Entities

- **Blueprint Document**: Canonical reference case containing Bet, regions, nodes,
  flows, wireframes, scope, constraints, repair choices, and handoff artifacts.
- **Product Region**: A stable IA grouping that contains canonical product nodes.
- **Blueprint Node**: A product destination with purpose, intent, CTA, states, scope,
  provenance, position, canonical actions, and an optional node-level Wireframe.
- **Flow**: A typed directed relationship between two canonical node IDs that binds
  its trigger to a canonical source-node action or state transition.
- **Wireframe**: A low-fidelity block structure owned by exactly one node.
- **Constraint**: A deterministic dependency or required-path rule evaluated after change.
- **Validation Issue**: A blocker, warning, or recommendation derived from constraints.
- **Change Set**: A pending structural or scope proposal with operations, affected
  references, validation results, and approval requirements.
- **Decision Record**: An approved consequential change, rationale, approval state,
  and downstream impact.
- **Handoff Artifact**: A named file preview and starter instructions derived from
  the current Blueprint state.
- **Demo Session**: Current intake, selection, lens, route, validation, transient UI,
  and resettable state.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A presenter can complete the full reference journey in 90-120 seconds.
- **SC-002**: The first Blueprint becomes available after one question and one answer.
- **SC-003**: Viewers can see four regions, at least eight nodes, and the complete
  required path in one Canvas.
- **SC-004**: Flow toggle, node expansion, scope conflict, repair, Handoff, copy, and
  Reset each respond to one clear action without unexplained waits over two seconds.
- **SC-005**: Moving Diagnostic Quiz to Later produces exactly one expected blocker;
  approving the lightweight repair produces zero blockers.
- **SC-006**: The full journey succeeds five consecutive times from Reset without
  refresh, stale state, random output, or uncaught error.
- **SC-007**: All primary interactions remain visible and operable at 1280x720 and
  1440x900 with no horizontal page scrolling or clipped control labels.
- **SC-008**: Every required status has a non-color label, and every primary control
  has a visible keyboard focus state.
- **SC-009**: All acceptance journeys pass automated checks and leave zero uncaught
  browser-console errors.
- **SC-010**: The final evidence package contains five representative 1440x900
  screenshots plus required viewport verification.

## Assumptions

- The competition demonstration uses the deterministic AI Study Coach fixture.
- The presenter uses a current desktop Chromium browser at 100% zoom.
- The product being designed is mobile-first; David itself is a desktop web app.
- The demo supports one learner role and intentionally excludes social features,
  tutor marketplace, payment, production authentication, and calendar integration.
- Local fixture content is sufficient to demonstrate product judgment; no live AI
  generation is required or implied.
- IA is always the base projection; one primary overlay is emphasized at a time.
- Semantic depth is conveyed through stable layering and node expansion, not true 3D.
