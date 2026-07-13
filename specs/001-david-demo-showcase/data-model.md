# Data Model: David Demo Showcase

## Shared Vocabulary

```text
KnowledgeStatus = confirmed | inferred | unknown | conflicting
BasisType = user_input | source_evidence | pattern | model_inference | synthetic_evaluation
LifecycleStatus = active | rejected | locked | stale | superseded
Confidence = low | medium | high
Severity = Blocker | Warning | Recommendation
```

Legacy fixture aliases are accepted only by `normalizeFixture`; all runtime output is
canonical.

## BlueprintDocument

The only product source of truth.

| Field | Type | Rules |
|---|---|---|
| `schemaVersion` | string | `demo-1.1` runtime version |
| `project` | Project | Stable project ID and platform |
| `bet` | ProductBet | Context, constraints, assumptions |
| `regions` | Region[] | Unique IDs and stable layout |
| `nodes` | BlueprintNode[] | Every `regionId` resolves |
| `flows` | FlowEdge[] | Source, target, and source action/state resolve |
| `constraints` | Constraint[] | Typed deterministic rules |
| `acceptanceCriteria` | AcceptanceCriterion[] | Target IDs resolve |
| `repairOptions` | RepairOption[] | One recommended executable repair |
| `handoff` | HandoffManifest | Derived file references and starter prompt |
| `demo` | DemoProjectionConfig | Main path, thumbnails, initial selection, viewport |

## BlueprintNode

```text
id, regionId, type, title, userFacingLabel
purpose, userIntent, primaryCTA
scopeStatus, scopeVariant?
provenance { knowledgeStatus, basisType, lifecycleStatus, sourceIds[] }
confidence
states[]
actions[] { id, label, kind, wireframeBlockId?, stateId? }
position
wireframe { kind, summary, blocks[] }
```

Rules:

- Every action ID is unique within the document.
- A Wireframe block belongs to exactly one node.
- Every In MVP page has a Wireframe.
- The lightweight Diagnostic variant contains three-question copy and actions.

## FlowEdge

```text
id
sourceNodeId
targetNodeId
type = happy | required | alternate | return | error
sourceActionId?      // required unless sourceStateId exists
sourceStateId?
label
```

At least one source action or state must resolve. Canvas edges are projections of these
records and never own product semantics.

## ChangeSet

```text
id
status = pending | approved | rejected
operations[] { operation, targetId, before, after, rationale, impact }
affectedFlowIds[]
affectedWireframeIds[]
affectedConstraintIds[]
validationIssueIds[]
approvalRequired
```

The Diagnostic-to-Later action creates a pending ChangeSet. The projected document may
display its `after` state, but the canonical document remains unchanged.

## ValidationIssue

```text
id
severity
rootCauseTargetId
ruleIds[]
title
message
affectedNodeIds[]
affectedFlowIds[]
repairOptionIds[]
```

Rules sharing one `rootCauseTargetId` aggregate into one visible issue. After the
recommended repair, both underlying constraints pass and the issue disappears.

## DecisionRecord

```text
id
changeSetId
decisionType = scope
selectedOptionId
rationale
affectedIds[]
approvedBy = user
approvedAt
reversible
```

Only an applied repair produces a Decision Record.

## AcceptanceCriterion

```text
id
targetType = node | flow | handoff | demo
targetId
statement
status = defined
```

Readiness requires coverage for every In MVP node and required Flow.

## HandoffManifest

```text
files[] { path, title, sourceNodeId?, sourceFlowIds?, preview }
starterPrompt
```

The manifest contains eight source entries and three derived Wireframe files. Every
derived file points back to a canonical node.

## DemoState

```text
route = intake | blueprint | handoff
phase
canonicalBlueprint
ideaDraft
ideaSubmitted
intakeChoice
selectedNodeId
expandedNodeId
lenses { ia, flow, wireframe, scope, validation }
pendingChangeSet?
validationIssues[]
decisionRecords[]
selectedHandoffPath
toast?
```

## State Transitions

```text
RESET
  -> initial fixture, intake route, default lenses, no transient state

SUBMIT_IDEA
  -> intake question

ANSWER_INTAKE
  -> live context ready

GENERATE_BLUEPRINT
  -> blueprint route

SELECT_NODE(node_daily_session)
  -> selected and expanded same canonical node

PROPOSE_SCOPE_LATER(node_diagnostic)
  -> pending ChangeSet + projected scope + one aggregated Blocker

APPLY_REPAIR(repair_lightweight_diagnostic)
  -> canonical Quick Diagnostic + 3-question Wireframe + Decision Record + zero Blockers

OPEN_HANDOFF
  -> handoff route using derived current snapshot
```

## Derived Readiness

```text
ready =
  blockers.length === 0
  && referencesValid
  && allInMvpNodesHaveWireframes
  && acceptanceCriteriaCoverP0
  && handoffManifestValid
```

No reducer action or model output can set readiness directly.
