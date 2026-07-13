# Inputs for Future Specs

## 1. Cross-Spec Invariants

后续文档必须共享以下语义，禁止各自重新发明：

1. `BlueprintDocument` 是唯一 canonical state；Canvas、报告与 handoff 都是 projection。
2. `AgentOperation` 表示模型想做什么；`AutonomyDecision` 表示 policy 允许如何做。
3. 状态的 knowledge、basis、lifecycle 与 confidence 必须正交。
4. 所有 structural mutation 先形成 ChangeSet，经 schema/constraint/policy 后才由 reducer 应用。
5. Question Budget 是可配置、待校准的产品参数，不是研究事实。
6. Readiness 由 validator + coverage 派生；模型不能直接写 `ready`。
7. Synthetic benchmark/case 是评测输入，不是用户证据。
8. Universal Handoff Core 与 Agent-specific Adapter 必须分离。
9. 共享可执行词汇以 [`datasets/shared_contract_vocabulary.schema.json`](datasets/shared_contract_vocabulary.schema.json) 为唯一 research-stage 规范源；迁移规则见 [`14_shared_vocabulary_resolution.md`](14_shared_vocabulary_resolution.md)。

## 2. Mapping

| 后续文档 | 必须接收的研究输入 | 必须明确的决策 | 验收证据 |
|---|---|---|---|
| `02_canvas_interaction_spec.md` | `08_canvas_comprehension_research.md`；Question Budget；provenance 最小可见集合；Structure Diff；progressive disclosure；Chat/Canvas/Decision responsibilities | first-proposal shape；始终可见 vs 渐进披露；node expansion；focus/context；diff/undo/approval；unknown/conflict 呈现；不得预先冻结三栏或 semantic zoom | 可点击 prototype；comprehension、correction time、wrong approval、task completion、perceived control |
| `03_blueprint_domain_schema.md` | 正交 provenance；shared contract vocabulary schema；Decision Record；Question Debt；Autonomy Case schema；ChangeSet；Validator Rule；Skill Output；readiness dimensions | Canonical IDs；referential integrity；operation/action enum；override/audit；staleness；locked state；validation result | Zod/JSON schema tests；JSON/JSONL seeds parse；cascade/ref integrity tests |
| `04_handoff_skill_contract.md` | `09_coding_agent_handoff_research.md`；Universal Core/adapter boundary；official instruction file capabilities；downstream test design | entry prompt；artifact manifest；canonical IDs；task slices；AC/done-when；commands；checkpoints；failure recovery；return-to-blueprint；adapter version | 同 task 多 agent execution；build/test pass；constraint violations；clarification count；blueprint traceability |
| `05_mvp_prd.md` | Must-patch policy；P0 Skill subset；provisional question settings；Canvas hypotheses；validator blocker whitelist；research plan | walking skeleton；confirmation points；Undo/versioning；event metrics；research instrumentation；P0/P1 exclusions | acceptance scenarios + autonomy seeds + Gold cases + validator cases；真实 experiment gate |
| Evaluation Harness | `05_ia_gold_benchmark_design.md`、`06_autonomy_case_library_design.md`、`07_validator_catalog.md`、datasets | deterministic checks、expert rubric、LLM critic、human test 分层；judge calibration；adjudication；versioning | repeatability；inter-rater agreement；false positive/negative；regression reports；无单一模糊总分 |

## 3. `02_canvas_interaction_spec.md` Inputs

### Required responsibilities

- Conversation：自然输入、单个高价值问题、rationale 与 research/test request；
- Canvas：canonical Blueprint 的 living projection；直接纠正与选择；
- Decision surface：recommendation、alternative、impact、provenance、diff、approve/edit/reject/undo；
- Progress/event surface：工具调用、validation、failure 与 artifact，不暴露 private chain-of-thought。

### Hypotheses to test, not requirements yet

- staged morph 是否优于 stable base canvas + overlays；
- semantic zoom 是否优于 explicit lens/layer controls；
- status 是否需要 3、5 或 9 个视觉类别；
- first candidate 在 1、3、5 个 decision-changing questions 后出现的质量/负担 trade-off；
- IA + expanded wireframe 同屏是否改善 traceability 或降低 graph readability。

## 4. `03_blueprint_domain_schema.md` Inputs

### Required types

```text
KnowledgeStatus
BasisType
LifecycleStatus
Confidence
Severity
ExecutionPermission
EvidenceReference
Assumption
DecisionRecord
QuestionDebt
AgentOperation
AutonomyDecision
ChangeSet
ValidationRule / ValidationResult
SkillInvocation / SkillOutput
ReadinessDimension
UserOverride
```

正式 Zod/TypeScript 类型必须由 shared vocabulary 生成或单向映射，不能让 Skill、Validator、Gold Case 和 Handoff 各自维护枚举副本。

### Required invariants

- canonical IDs 跨 IA/Flow/Wireframe/Scope/AC/Handoff；
- locked target 不允许 silent mutation；
- rejected/superseded decision 不进入 active projection；
- flow/scope/wireframe/AC references 在 structural change 后重检；
- question 关联 `decisionId`、fallback 与 asked history；
- readiness 不能在 blocker 存在时产生，除非有 scoped explicit override。

## 5. `04_handoff_skill_contract.md` Inputs

### Universal Core

- product goal、target user、core job、MVP boundary；
- canonical Blueprint JSON 与 artifact manifest；
- node/flow/scope/AC stable IDs；
- constraints、no-gos、dependencies、assumptions；
- ordered task slices；
- per-task inputs/outputs/acceptance/done-when；
- exact build/test/validate commands；
- checkpoint、failure recovery、change log、return-to-blueprint protocol。

### Agent-specific adapter

- instruction filename/location/precedence；
- supported reference syntax；
- permission/sandbox behavior；
- progress and checkpoint mechanism；
- version/access date and fallback when unsupported。

Agent adapter 只适配载入和执行机制，不复制或分叉产品事实。

## 6. `05_mvp_prd.md` Inputs

### Candidate P0

1. Agentic intake + first Product Context/Intent proposal；
2. Object/capability inventory 与 1–2 candidate IA；
3. Canonical Canvas + node selection/mini-IA；
4. Core flow overlay 与 missing state validation；
5. Scope cut preserving end-to-end outcome；
6. Structure Diff、approve/reject/undo；
7. deterministic schema/reference validators；
8. one universal handoff export + at least one adapter；
9. evaluation instrumentation（question、correction、approval、validation、handoff outcome）。

### Do not silently promote to P0

- semantic zoom、2.5D、复杂 graph animation；
- 完整 card sort/tree test 平台；
- 自动证明 mental model；
- 20 Skills 全部 production 化；
- 所有 coding agents 同时支持；
- fine-tuning；
- 一个综合 readiness score。

## 7. Evaluation Harness Inputs

| Layer | Input | Output | Human role |
|---|---|---|---|
| Deterministic | Blueprint + rule seed | pass/fail + locations | review false positives |
| Expert rubric | Gold case + candidate output | dimension scores + rationale | 2+ raters + adjudication |
| LLM critic | rubric + evidence bundle + output | issue candidates, not final truth | calibrate against expert labels |
| Autonomy eval | state + proposed decision | ideal action match + response quality | label and resolve borderline cases |
| Human IA test | tree/prototype + realistic tasks | success/directness/path/time/comprehension | representative participants |
| Downstream execution | handoff package + repo task | build/test/AC/constraint outcomes | review implementation and traceability |

## 8. Promotion Gates

- Skill 从 research 进入 production：schema 可解析、正反例通过、边界清楚、Gold cases 经专家 review；
- Validator 成为 Blocker：可 deterministic 或经高一致性专家标注，误报成本可接受，有 actionable remediation；
- Autonomy default 冻结：case library 表现稳定并经目标用户 session 检验；
- Canvas interaction 冻结：用户能准确解释当前状态、纠正错误且不过度依赖聊天；
- Handoff adapter 宣称 supported：至少一组真实 repo execution 通过 build/test/AC 且没有违反 no-go。
