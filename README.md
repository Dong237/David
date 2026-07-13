# David

<p align="right">
  <strong>Language:</strong>
  English |
  <a href="./README.zh-CN.md">简体中文</a>
</p>

David is a constraint-aware product blueprint canvas for AI indie builders.

It turns a fuzzy product Bet into one executable product model:

```text
Bet -> IA -> Flow -> Low-fi Wireframe -> Scope -> Handoff
```

David is currently a **desktop-first web app**. The verified showcase runs in Vite;
the Tauri shell is optional packaging infrastructure, not the primary MVP runtime.

## What The Product Is

David is the blueprint layer before Cursor, Codex, Claude Code, Lovable, and other
coding agents. It helps a builder decide what product structure should exist before
asking an agent to implement it.

The core UI is a **Unified Spatial Blueprint Canvas**:

- IA is the stable base graph.
- Flow is an overlay on canonical IA node IDs.
- Wireframes expand inside the selected node.
- Scope changes are projected as reviewable diffs.
- Constraints create visible blockers and repair choices.
- Handoff files compile from the accepted Blueprint snapshot.

Chat is an agentic intake helper, not the primary interface. David is not a PRD bot,
chat-first PM, whiteboard, sitemap tool, flowchart editor, high-fidelity UI generator,
no-code builder, or coding agent.

## Current Showcase

The deterministic AI Study Coach case proves the complete walking skeleton:

1. Submit a fuzzy product idea.
2. Answer one decision-changing question.
3. Generate one canonical Blueprint with 4 regions and 9 nodes.
4. Toggle Flow without moving or duplicating IA nodes.
5. Expand Daily Session into a low-fi Wireframe inside the same graph.
6. Propose moving Diagnostic Quiz to Later.
7. Inspect the resulting broken path and one root blocker.
8. Apply a lightweight three-question diagnostic repair.
9. Open an 11-file, snapshot-derived Handoff package.
10. Reset and repeat deterministically.

The showcase is verified at 1440x900 and 1280x720 with Playwright, including five
complete reset cycles, runtime error collection, and page-overflow gates.

## Source Of Truth

Read these documents in order:

```text
docs/product/david-mode-b/
  00_david_mode_b_positioning_and_principles.md
  01_ia_reasoning_and_agent_autonomy_contract.md
  02A_canvas_decision_brief.md
  02B_unified_canvas_case_validation.md
  david_unified_spatial_blueprint_canvas_ia_v2.md
  demo/
```

The executable feature contract lives in:

```text
specs/001-david-demo-showcase/
```

Legacy Mode A and pre-pivot material under `docs/legacy-before-pivot/` is historical
context only.

## Architecture Invariants

`BlueprintDocument` is the canonical source of truth.

- React Flow nodes and edges are render projections only.
- IA, Flow, Wireframe, Scope, validation, and Handoff share canonical IDs.
- Pending changes remain separate `ChangeSet` projections until approval.
- Readiness derives from validator output; it is never manually toggled.
- Handoff exports compile from the current Blueprint snapshot, not freeform prose.
- LLM inference is not required for the deterministic reference showcase.

## Stack

- React 19 + TypeScript
- Vite
- React Flow
- Zod
- Vitest
- Playwright
- Optional Tauri wrapper

## Development

Use Node.js 24 (`.nvmrc`) or another version allowed by `package.json#engines`.

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:1420](http://127.0.0.1:1420).

Quality gates:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

## Repository Map

```text
desktop/src/
  app/          deterministic demo state and transitions
  components/   intake, unified Canvas, inspector, decisions, Handoff
  domain/       canonical types, Zod schema, validation, readiness, export
  fixtures/     AI Study Coach reference Blueprint
  styles/       Quiet Blueprint tokens and responsive layout
tests/
  unit/         domain and reducer contracts
  e2e/          complete dual-viewport interaction journeys
specs/          executable Spec Kit feature artifacts
artifacts/demo-showcase/
                screenshots, test evidence, and final acceptance records
docs/product/david-mode-b/
                product and interaction source documents
src-tauri/      optional desktop packaging shell
```

## MVP Boundary

The current MVP deliberately excludes backend services, auth, collaboration, a live
LLM, persistence, WebGL, freeform wireframe editing, high-fidelity UI generation,
automatic code generation, and production export integrations.
