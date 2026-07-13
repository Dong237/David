# David Demo Implementation Preflight

**Date**: 2026-07-12
**Status**: Ready to plan

## Source Precedence

For this competition vertical slice, the Demo Showcase Spec, script, fixture, and
acceptance checklist define implementation scope. `00` and `01` remain product and
agent-policy guardrails. Research briefs inform safer implementation but do not add
new P0 scope.

## Reuse

- Use the existing `desktop/` Vite client shell as the single recorded Web App.
- Preserve React, strict TypeScript, one npm lockfile, Vite config, Tauri packaging,
  base reset/tokens, and the David icon.
- Extract the AI Study Coach fixture content: 4 regions, 9 nodes, 9 flows, stable
  positions, Wireframe blocks, constraints, repairs, and handoff copy.
- Reuse the shared vocabulary and validator research as normalization guidance.

## Blockers Resolved in Planning

| Finding | Resolution |
|---|---|
| Root scripts validate Next while recording uses Vite | Make root `dev` and `build` target the Vite demo; retain explicit legacy Next scripts only if useful. |
| Fixture uses mixed provenance and lowercase severity | Normalize legacy input into orthogonal runtime provenance and Title Case severity. |
| Flow triggers lack canonical action/state IDs | Add explicit action records and bind every Flow to a source-node action or state transition. |
| Scope change would mutate before validation | Store it as a pending ChangeSet and render a projected state; canonical state changes only after repair approval. |
| Two constraints would create duplicate blockers | Aggregate dependency and required-path failures by the same removed node into one root-cause issue with both rule IDs. |
| Lightweight repair leaves “1 of 10” | Repair cascade updates the Diagnostic Wireframe to three questions and records affected references. |
| Handoff readiness is hardcoded | Derive readiness from blocker count, referential integrity, P0 Wireframe coverage, and acceptance-criteria coverage. |
| Handoff tree differs from fixture | Keep the 8 fixture entries and derive 3 node Wireframe files from canonical nodes, producing the 11-item showcase tree. |

## Canvas Interaction Decisions

- IA remains the stable base graph.
- Flow is the only strong analytical overlay; Scope and Validation use quiet badges.
- Wireframe thumbnails are optional; one selected node expands in place.
- Selection lift is subtle CSS depth only and never encodes truth or severity.
- Clicking Daily Session selects and expands it for the deterministic demo.
- Scope conflict uses a static diff, broken-edge state, reason, impact, and repair
  approval; color is always paired with text/icon labels.
- At 1280x720, Outline is compact, Inspector is width-bounded, and the Canvas uses
  fit-to-view plus local node expansion without page-level horizontal scrolling.

## QA Contract

- Stable accessible controls plus `data-node-id`, `data-flow-id`, `data-region-id`,
  `data-repair-id`, `data-file-path`, `data-app-state`, `data-expanded`,
  `data-scope-status`, `data-scope-variant`, and `data-edge-state`.
- No assertions against React Flow class names, SVG order, animation delays, or
  unscoped repeated text.
- Required suites: happy path, scope/repair, lenses, handoff/copy/reset, both
  viewports, reduced motion, console/network failure collection, and five serial
  repetitions from Reset.

## Remaining Planning Work

- Freeze runtime types and fixture normalization.
- Define derived validation/readiness functions and acceptance criteria.
- Generate exact file-level implementation tasks and test commands.
