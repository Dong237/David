<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Added principles: Demo Reliability; Canonical Blueprint; Unified Canvas Semantics;
  Conversation-First Intake; Deterministic Validation; Reversible Consequential
  Decisions; Clickable P0; Strict Accessible Frontend; Required Verification;
  Recording-First Layout; Scope Discipline; Completion by Evidence
- Added sections: Competition Demo Constraints; Development and Review Workflow
- Removed sections: none; template placeholders replaced
- Templates: plan-template.md (compatible); spec-template.md (compatible);
  tasks-template.md (updated to make required tests explicit)
- Deferred items: none
-->
# David Demo Constitution

## Core Principles

### I. Demo Reliability Over Backend Realism
The competition build MUST be deterministic, local, fast to reset, and independent
of network services. Fixture-driven behavior is preferred to simulated production
infrastructure because the demo must repeat reliably during recording.

### II. One Canonical Blueprint
Nodes, flows, wireframes, scope, constraints, decisions, and handoff references MUST
derive from one canonical Blueprint fixture and shared IDs. Render projections MUST
NOT maintain contradictory copies of product state.

### III. Unified Canvas Semantics
IA MUST remain the base structure. Flow MUST be an overlay on that graph, Wireframe
MUST be an expansion of an IA node, and Scope and Validation MUST be overlays. These
layers MUST NOT become disconnected editors or routes with separate identities.

### IV. Conversation-First Intake
Bet Intake MUST behave as a short agentic conversation with a live Product Context.
It MUST ask one decision-changing question for the reference case and MUST NOT become
a rigid multi-field form.

### V. Deterministic Constraint Validation
Scope mutations MUST run deterministic validation against canonical dependencies and
required paths. Moving Diagnostic Quiz out of MVP MUST create a real blocker, and the
approved lightweight repair MUST clear that blocker.

### VI. Reversible Consequential Decisions
Routine visual and reversible state changes MAY apply directly. Consequential product
changes MUST expose reason, impact, alternatives, and approval state. Reset MUST restore
the complete initial fixture without stale derived state.

### VII. Every P0 Interaction Is Real
Every P0 control shown in the demo MUST be clickable, produce the specified state
transition, and work repeatedly. Placeholder controls, false export claims, and dead
navigation are prohibited.

### VIII. Strict and Accessible Frontend
TypeScript strict mode is mandatory. Controls MUST have visible labels and focus states;
critical status MUST NOT rely on color alone; reduced motion MUST be respected; and the
browser console MUST remain free of uncaught errors.

### IX. Verification Is Required
Fixture validation and reducer behavior MUST have unit tests. Happy path, scope conflict
and repair, lenses, handoff, copy, and reset MUST have Playwright coverage. Typecheck,
lint, unit tests, production build, and required browser tests MUST pass.

### X. Recording-First Layout
The application MUST be usable at 1280x720 and optimized for 1440x900. Critical controls
and content MUST remain visible without horizontal scrolling, clipped labels, or loading
delays that disrupt a 90-120 second recording.

### XI. Scope Discipline
The build MUST NOT add auth, backend, database, collaboration, external LLM calls,
high-fidelity UI generation, a freeform wireframe editor, WebGL, or unrelated dashboard
features. New complexity requires a direct P0 acceptance requirement.

### XII. Completion by Evidence
Work is complete only when the execution acceptance checklist is fully evidenced, the
required screenshots exist, the full demo succeeds five times from Reset, and no P0 or
blocker remains. Documentation completion alone is not completion.

## Competition Demo Constraints

- The reference case is AI Study Coach and the UI language is English.
- The preferred stack is Vite, React, strict TypeScript, `@xyflow/react`, Vitest,
  Playwright, restrained CSS, and Lucide icons.
- CSS-based semantic depth is allowed; true 3D and WebGL are prohibited.
- The fixture, reducer, validator, and handoff preview must work offline.
- The demo must expose the canonical IA-to-Flow-to-Wireframe relationship and the
  Diagnostic Quiz scope conflict without hidden debug controls.

## Development and Review Workflow

1. Read the product contract, research findings, demo spec, fixture, and checklist.
2. Create specification, clarification, quality checklist, plan, and executable tasks.
3. Implement in dependency order and run relevant tests after every user-story slice.
4. Inspect the running application at both recording viewports and capture evidence.
5. Run a convergence audit, append only remaining P0 work, and repeat until clear.
6. Record commands, results, screenshots, known limitations, and checklist evidence in
   `artifacts/demo-showcase/`.

## Governance

This constitution governs the David competition demo and overrides generic scaffolding
defaults. Amendments require a documented reason, an impact note, and a semantic version
bump. MAJOR changes redefine product or safety boundaries; MINOR changes add material
principles or gates; PATCH changes clarify wording without changing obligations. Every
plan, task list, implementation review, and final sign-off MUST verify compliance. A
violation may be accepted only when explicitly documented and when it does not weaken a
P0 interaction, deterministic validation, accessibility, or repeatability requirement.

**Version**: 1.0.0 | **Ratified**: 2026-07-12 | **Last Amended**: 2026-07-12
