# Machine Audit

> Run: 2026-07-10 after Critic remediation. This is a research-artifact audit, not product-code verification.

## Results

| Check | Result |
|---|---|
| Draft 2020-12 schema validity | Pass for shared vocabulary, Autonomy Case, and IA Gold Case schemas |
| Autonomy seed validation | 24/24 pass |
| Ordered autonomy policy | 24/24 expected actions; 0 mismatch |
| Undo negative fixture | Rejected when `complete=true` but scope/persistence are absent |
| Action reachability | All six canonical `AutonomyDecision` values represented |
| Action distribution | Auto 3; Undo 2; Propose 10; Ask 4; Defer 3; Research/Test 2 |
| IA Gold seed validation | 7/7 pass |
| IA semantic integrity | 7/7 typed candidate-to-realization placements resolve to canonical nodes and actual navigation projections; typed locks and IA-GOLD-007 no-top-level-nav checks pass |
| Validator catalog | 40 rules across 19 areas |
| Skill Cards | 20 files |
| JSON fenced code blocks | 14 parsed successfully |
| JSON/JSONL parsing | Pass for all files |
| Local Markdown links | Pass |
| Protected `00/01` hashes | Match [`15_research_integrity_manifest.md`](15_research_integrity_manifest.md) |
| Legacy mixed executable provenance scan | No matches outside the preserved critic finding and migration mapping |
| Validator canonical provenance | `VAL-MM-001` reads knowledge/basis/lifecycle/source fields; no legacy executable aliases |
| Handoff permission contract | Shared `ExecutionPermission` plus separate `approvalTiming`; invalid manual/timing combination rejected |
| Current Cursor official links | Rules, CLI Using, Agent Overview/Checkpoints, and Reviewing/Testing return HTTP 200 |

## Policy test rule

The table-driven policy test computes action from the case factors only. It does not read `ideal_action` until comparing the result. Gate order is:

```text
locked conflict
→ high security/privacy/legal risk
→ user-exclusive blocking fact without safe fallback
→ evidence-dependent truth
→ high impact / hard reversal / high rework
→ safe nonblocking deferral
→ deterministic low-risk AUTO_APPLY
→ complete reversible APPLY_WITH_UNDO with non-empty scope and persistence
→ conservative fallback
```

This order makes deterministic hygiene eligible for `AUTO_APPLY` before the broader reversible-judgment branch and requires explicit `undo_available`, `undo_complete`, `undo_scope`, and `undo_persistence` for Undo.

## Schema validation method

The audit used `jsonschema` Draft 2020-12. Because the canonical shared vocabulary uses a local logical `$id`, the runner resolved those shared `$ref` values to the checked-in schema before validation; it did not make a network request to `david.local`.

## Residual limitation

The source-integrity limitation remains exactly as recorded in the manifest: no pre-task Git blob existed for an already-untracked `docs/product/` tree. Stability is proven across the critic/revision window, not reconstructed for time before the first observation.
