# Interaction and Test Contract

## Accessible Controls

Primary actions use visible labels and semantic roles:

```text
Send idea
Choose daily session outcome
Generate Blueprint
Toggle Flow
Toggle Wireframe
Toggle Scope
Fit view
Change Diagnostic scope
Apply lightweight repair
Open Handoff
Copy starter prompt
Back to Blueprint
Reset Demo
```

Keyboard focus must remain visible. Status is always encoded by text and icon in addition
to color. No primary journey depends on hover.

## Stable Canonical Attributes

| Attribute | Owner | Example |
|---|---|---|
| `data-app-state` | app root | `SCOPE_CONFLICT` |
| `data-region-id` | region | `region_learn` |
| `data-node-id` | node | `node_daily_session` |
| `data-expanded` | node | `true` |
| `data-scope-status` | node | `in_mvp` |
| `data-scope-variant` | node | `lightweight` |
| `data-flow-id` | edge group | `flow_diagnostic_plan` |
| `data-edge-state` | edge group | `broken` |
| `data-repair-id` | repair option | `repair_lightweight_diagnostic` |
| `data-file-path` | handoff item | `handoff/START_HERE.md` |

React Flow class names, SVG order, nth-child, animation delays, or unscoped repeated text
must not be used as semantic test contracts.

## Journey Contracts

### Happy path

```text
idea -> one question -> daily outcome -> context ready -> Blueprint
-> select Daily Session -> expanded Wireframe -> toggle Flow -> Handoff
```

### Scope conflict

```text
select Diagnostic -> propose Later -> projected broken path + one Blocker
-> three alternatives -> apply lightweight repair -> Quick Diagnostic
-> three-question Wireframe -> zero Blockers -> user-approved Decision Record
```

### Handoff and reset

```text
START_HERE selected -> preview 4+ files -> copy/fallback toast
-> back preserves state -> Reset restores fixture and intake
```

## Viewport Contract

- 1440x900: preferred recording view, all primary panels visible.
- 1280x720: all primary actions reachable, no page horizontal scroll, no clipped labels.
- Canvas may pan/zoom internally; page layout may not overflow horizontally.
- Fit View restores all four regions and nine nodes.

## Failure Collection

Every Playwright test collects and fails on:

- `console.error`;
- uncaught `pageerror`;
- unhandled rejection;
- failed same-origin resource request.

Clipboard denial is an expected recoverable case and must not emit an uncaught error.
