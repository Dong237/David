# Shared Vocabulary Resolution

> 状态：Critic P1-03 修订输入；Research-only。未来 `03_blueprint_domain_schema.md` 应将本文件和 `datasets/shared_contract_vocabulary.schema.json` 变为正式 Zod/TypeScript contract。

## Canonical dimensions

| Dimension | Canonical values | Meaning |
|---|---|---|
| `KnowledgeStatus` | `confirmed / inferred / unknown / conflicting` | 当前 claim 的认知状态 |
| `BasisType` | `user_input / source_evidence / pattern / model_inference / synthetic_evaluation` | claim 的依据来源 |
| `LifecycleStatus` | `active / rejected / locked / stale / superseded` | claim/decision 的生命周期和控制状态 |
| `Confidence` | `low / medium / high` | 当前判断置信，不替代 evidence |
| `Severity` | `Blocker / Warning / Recommendation` | Validator issue 对当前 gate 的影响 |
| `AutonomyDecision` | 六种 uppercase actions | Policy 决定 state proposal 如何处理 |
| `ExecutionPermission` | `automatic / approval_required / manual_only / prohibited` | 下游 task/command 的执行授权；不是第七种 autonomy action |

## Required separation

```text
ProvenanceCore {
  knowledgeStatus
  basisType
  lifecycleStatus
  sourceIds[]
}

confidence: Confidence
severity: Severity               // only validation/diagnostic issues
autonomyDecision: AutonomyDecision
executionPermission: ExecutionPermission
```

`evidence_backed`、`pattern_based`、`confirmed_user_input` 不再是混合 provenance enum：

| Legacy alias | Canonical mapping |
|---|---|
| `confirmed` | `knowledgeStatus=confirmed`；basis 由 source 决定 |
| `inferred` | `knowledgeStatus=inferred` |
| `unknown` | `knowledgeStatus=unknown` |
| `conflicting` | `knowledgeStatus=conflicting` |
| `evidence_backed` | `basisType=source_evidence`；knowledge 仍可 confirmed/inferred/conflicting |
| `pattern_based` | `basisType=pattern` + `knowledgeStatus=inferred` |
| `confirmed_user_input` | `knowledgeStatus=confirmed` + `basisType=user_input` |

## Enforcement

1. 新 production schema MUST 只引用 versioned shared definitions；
2. Skill Card 的 standalone schema 必须复刻同一 shape，不得引入新 enum；
3. `MANUAL_ONLY` 不属于 `AutonomyDecision`，统一写成 `executionPermission=manual_only`；
4. validator、Gold wrong-answer 与 Handoff diagnostics 统一使用 Title Case `Severity`；
5. migration adapter 可读取 legacy research alias，但输出必须 canonical，并记录原字段；
6. shared vocabulary 版本变化必须触发 Skill/Validator/Handoff schema regression。

Research-stage logical schema ID 冻结为 `https://david.local/schemas/v1/shared_contract_vocabulary.schema.json`，`x-version=1.0.0`。破坏性 enum/shape 变更必须使用新的 URI version；兼容性说明由未来 domain-schema manifest 维护。
