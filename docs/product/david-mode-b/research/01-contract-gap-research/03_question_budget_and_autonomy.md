# 03 — Question Budget & Agent Autonomy Research

> 结论状态：Desktop research + policy design，非用户研究结果。  
> 权威输入：`01_ia_reasoning_and_agent_autonomy_contract.md` > `00_david_mode_b_positioning_and_principles.md`。  
> 证据详表：[agent_c_autonomy_evidence.md](sources/agent_c_autonomy_evidence.md)。

## 1. Executive Conclusion

David 的 question budget 不应是“还能问几题”的计数器，而应是一个 **expected decision value gate**：只有回答会显著改变下一决策、信息无法从当前 state/evidence 获得、没有安全可逆 fallback，且延迟会产生明显风险或返工时才提问。[AUT-C01][AUT-C04][AUT-C12]

六种 action 的核心边界是：

```text
低影响 + 易恢复 + 证据足 + 无风险边界       → AUTO_APPLY
低/中影响 + 易恢复 + 可完整 Undo           → APPLY_WITH_UNDO
高影响 / 难恢复 / 高返工 / 跨边界          → PROPOSE_FOR_APPROVAL
只有用户知道 + 阻塞 + 无安全 fallback       → ASK_USER
未知但非阻塞 + 有安全 fallback              → DEFER_AS_ASSUMPTION
真伪依赖外部证据而非用户偏好                → RESEARCH_OR_TEST
```

这不是单一 confidence threshold。Impact、reversibility、authority、evidence、locked constraints、downstream rework 和 security/privacy/legal 必须分别判断。[AUT-C09][AUT-C14][AUT-C15]

## 2. Question Budget

### 2.1 Evidence-backed rules

| Rule ID | Evidence-backed rule | Product implication | Agent behavior | Data / schema | Validation |
|---|---|---|---|---|---|
| QB-E01 | 只为会改变当前决策的关键不确定性提问；比较提问、行动、等待和降级方案的成本/收益。[AUT-C01][AUT-C12] | “不确定”不是充分提问条件。 | 先计算 `decision_changed`、错误成本和 safe fallback。 | `decision_id`, `question_expected_value`, `fallback_quality`, `blocking_reason`。 | 对每个问题回放：回答不同是否真的改变 action/patch。 |
| QB-E02 | Engagement request 应 strategic、minimal、可 dismiss，并说明用户价值。[AUT-C04] | 不把访谈负担转给用户。 | 问题必须说明 why、影响的决策与 fallback；允许“不知道/先假设”。 | `why_now`, `decision_changed`, `decline_option`。 | 无 why/decision/fallback 的问题判失败。 |
| QB-E03 | 不确定时可降低服务精度、做更小可修正的工作，而非阻塞所有进展。[AUT-C02][AUT-C03] | 先产出 provisional Product Context / IA 局部结构。 | 可逆未知用标注假设的草案；核心目标/硬约束未知仍询问。 | `assumption_id`, `scope_of_assumption`, `fallback_if_wrong`。 | 检查 provisional 内容未标 confirmed/evidence-backed。 |
| QB-E04 | 系统应记住近期交互，并支持自然引用，避免要求用户重复信息。[AUT-C03] | Question dedupe 是 runtime invariant。 | 提问前查 confirmed state、memory、declined questions、evidence。 | `question_fingerprint`, `answered_at`, `declined_at`, `review_trigger`。 | Duplicate-question seed 必须不触发 `ASK_USER`。 |
| QB-E05 | 用户拒答或 dismiss 后，非阻塞问题不应立即重问。[AUT-C03][AUT-C04] | 尊重用户控制，防止 coercive interview。 | 写入 question debt；采用安全 fallback 或暂停相关分支。 | `declined_by_user`, `next_eligible_review_trigger`。 | 相同 fingerprint 在 trigger 未发生前再次出现即失败。 |
| QB-E06 | 问题/反馈请求应说明如何改变系统或何时生效。[AUT-C03][AUT-C04] | 用户能判断回答成本是否值得。 | 回答后展示 state patch 与影响，不只说“谢谢”。 | `answer_effect`, `affected_ids`。 | 回答后 patch 可追踪到 question ID。 |
| QB-E07 | 提问时机应结合用户当前任务与注意力，低价值打断应延迟。[AUT-C01][AUT-C03] | 非阻塞问题可在 review gate 汇总。 | 核心操作中不弹出无关 intake；在自然 checkpoint 问。 | `interaction_context`, `defer_until`。 | Prototype test 测被打断率和任务恢复。 |

### 2.2 Provisional heuristics

下列规则可作为 MVP guardrail，但不能标为实证事实：

| Rule ID | Provisional heuristic | Reasonable basis | Known limitation |
|---|---|---|---|
| QB-P01 | 正常 turn 默认最多一个 decision-changing question。 | 减少中断并保持单一决策上下文。[AUT-C04] | 没有 David 用户的 one-vs-batch 实验。 |
| QB-P02 | 首个结构提案前默认最多 `3–5` 个问题。 | 保护 time-to-first-value，与“做少一点但正确”一致。[AUT-C02] | `3–5` 没有直接来源支持。 |
| QB-P03 | 批量问题默认最多三个，且必须 tightly coupled。 | 减少来回轮次，但限制认知切换。 | `3` 是产品阈值，不是研究结论。 |
| QB-P04 | 候选 IA review 优先让用户改图/diff，再问一个 discriminating question。 | Direct manipulation + mixed initiative 可降低回溯成本。[AUT-C01][AUT-C02] | “图优于文字”必须做 David prototype test。 |
| QB-P05 | 用户显式选择 interview mode 时放宽 count，但显示进度和退出方式。 | 用户控制与 easy dismissal。[AUT-C03][AUT-C04] | 可接受时长未知。 |
| QB-P06 | `interaction_cost=high` 可把非阻塞 `ASK_USER` 降为 `DEFER_AS_ASSUMPTION`。 | 问题有成本，非阻塞未知可延迟。[AUT-C01][AUT-C13] | 不能覆盖 locked/risk hard gate。 |

### 2.3 Needs user research

1. AI indie builders 在放弃或要求“直接给方案”前能接受多少前置问题。
2. `1 question/turn` 与 `2–3 tightly coupled questions` 对完成率、回答质量、主观负担和总轮次的影响。
3. `ask-first`、`propose-first`、`hybrid` 对 IA 修正时间和最终结构质量的影响；现有研究不支持普适顺序。[AUT-C13]
4. 用户是否理解 `why this matters / decision changed / fallback`，还是认为说明本身增加负担。
5. 视觉 diff 是否比自然语言问题更快暴露误解。
6. Fast/Balanced/Controlled 模式如何改变可接受问题频率，而不降低安全性。
7. 不同经验水平、语言和无障碍需求下的 question burden 差异。

### 2.4 One question vs batch decision

| Condition | One question | Compact batch | Do not ask now |
|---|---:|---:|---:|
| 一个答案即可改变下一结构决策 | Yes | No | No |
| 2–3 个答案共同定义同一 user-owned constraint bundle | Maybe | Yes, if user can answer naturally once | No |
| 任一答案都不阻塞首个 proposal | No | No | Yes，转 assumption |
| 用户要求 structured intake | Maybe | Yes | No |
| 用户刚拒绝访谈/显示低耐心 | No | No | Yes |
| Security/privacy/legal 的多个独立承诺 | Yes，逐项确保 informed decision | No | 仅在不阻塞且可安全 defer 时 |
| 已有 confirmed answer | No | No | Reuse state |
| 需要观察真实用户行为才能回答 | No | No | `RESEARCH_OR_TEST` |

## 3. Programmatic Autonomy Decision Table

### 3.1 Required factor model

| Factor | Values | Operational definition | Evidence status |
|---|---|---|---|
| `impact` | low / medium / high | 对 target user、value proposition、top-level IA、core path、MVP commitment 的改变幅度。 | Evidence-backed direction；具体 labels provisional。[AUT-C05][AUT-C09] |
| `uncertainty` | low / medium / high | 对用户意图、状态与后果的剩余不确定性；与 evidence strength 分开。 | Evidence-backed。[AUT-C01][AUT-C12] |
| `reversibility` | easy / moderate / hard | 是否能完整恢复 canonical state、引用、下游产物与用户预期。 | Evidence-backed direction。[AUT-C08][AUT-C14] |
| `undo_available` | boolean | 是否存在用户可触发的实际 rollback mechanism；无 mutation 的 action 为 false。 | Contract policy。 |
| `undo_complete` | boolean | rollback 是否原子恢复本次 mutation 及全部 cascade refs，而非只恢复可见字段。 | Evidence-backed direction。[AUT-C08][AUT-C14] |
| `undo_scope` | none / local_patch / cascade_atomic | Undo 覆盖单一 patch 还是 Flow/Scope/Wireframe/Handoff 的级联影响。 | Contract policy。 |
| `undo_persistence` | not_applicable / session / versioned | Undo 只在当前 session 有效，还是有可恢复 version。 | Provisional implementation requirement。 |
| `user_exclusive_knowledge` | boolean | 事实或承诺是否只有用户/授权人知道，如 target user、hard no-go、商业承诺。 | Contract policy；需真实用户校准问法。 |
| `evidence_dependent_truth` | boolean | material decision 是否必须由用户研究、analytics、法务/安全或技术验证回答，而不能由 founder 偏好替代。 | Contract policy；由 method/evidence requirement 决定。 |
| `evidence_strength` | none / weak / medium / strong | 直接相关证据的质量与适用性；pattern 不等于用户证据。 | Evidence-backed provenance discipline。[AUT-C07][AUT-C15] |
| `locked_constraint_conflict` | boolean | patch 是否触碰 explicit locked node/decision/no-go。 | Product safety invariant。 |
| `downstream_rework` | low / medium / high | 对已批准 flow、wireframe、scope、AC、handoff、代码工作的连锁返工。 | Evidence-backed direction；阈值 provisional。[AUT-C14] |
| `security_risk` | none / low / medium / high | 认证、权限、secret、外部写入或攻击面变化。 | Authoritative risk requirement。[AUT-C15][AUT-C16] |
| `privacy_risk` | none / low / medium / high | 新数据采集、共享、保留、撤回/删除边界。 | Authoritative risk requirement。[AUT-C07][AUT-C15] |
| `legal_risk` | none / low / medium / high | 可能改变合规、责任、合同或法定解释义务；David 不作法律结论。 | Authoritative risk requirement。[AUT-C07][AUT-C15] |
| `interaction_cost` | low / medium / high | 用户理解、回答、审批所需注意力和上下文切换。 | Evidence-backed factor；量表需研究。[AUT-C01][AUT-C13][AUT-C14] |
| `fallback_quality` | none / weak / safe | 不回答/不审批时是否存在不破坏核心结果的可逆默认。 | Evidence-backed direction。[AUT-C02][AUT-C06] |
| `blocking` | boolean | 不处理该未知是否无法继续产生有用且不误导的工作。 | Contract policy。 |

`uncertainty` 与 `evidence_strength` 必须分开：Agent 可能对错误推断“很确定”，也可能在证据强但来源冲突时仍有高 uncertainty。

### 3.2 Ordered policy gates

按顺序执行；前面的 hard gate 不能被后面的 interaction-cost 优化覆盖。

| Gate | Deterministic condition | Selected action | Notes |
|---:|---|---|---|
| G0 | Patch 违反 schema、canonical ID 或不可满足的硬约束 | 不 apply；返回 validator failure | 不进入六 action 的正常执行分支。 |
| G1 | `locked_constraint_conflict=true` | `PROPOSE_FOR_APPROVAL` | 展示冲突与替代方案；若 lock owner/含义未知则 `ASK_USER`。绝不 auto/undo。 |
| G2 | 任一 security/privacy/legal=`high` | `ASK_USER` 或 `PROPOSE_FOR_APPROVAL` | 用户独有承诺/法律事实用 Ask；已有可评审方案用 Propose；需外部事实用 Research。 |
| G3 | `user_exclusive_knowledge=true && blocking=true && fallback_quality!=safe` | `ASK_USER` | 只问最小充分信息。 |
| G4 | `evidence_dependent_truth=true` 且决策 material | `RESEARCH_OR_TEST` | 不让用户用偏好替代证据。 |
| G5 | `impact=high` OR `reversibility=hard` OR `downstream_rework=high` | `PROPOSE_FOR_APPROVAL` | diff 必须含 cascade 与 recovery。 |
| G6 | `uncertainty=high && blocking=false && fallback_quality=safe` | `DEFER_AS_ASSUMPTION` | 写入 review trigger；不伪装 confirmed。 |
| G7 | `impact=low && uncertainty=low && reversibility=easy && evidence_strength=strong && noRisk/noLock && rework=low` | `AUTO_APPLY` | 典型为 deterministic PM hygiene；命中后无需用 Undo availability 把它降为 L1。 |
| G8 | `impact<=medium && reversibility=easy && maxRisk<=low && downstream_rework<=medium && undo_available=true && undo_complete=true && undo_scope!=none && undo_persistence!=not_applicable` | `APPLY_WITH_UNDO` | medium impact 时要求 evidence>=medium 或稳定 pattern；Undo 必须覆盖全部 cascade。 |
| G9 | 其余 | `PROPOSE_FOR_APPROVAL` 或 `DEFER_AS_ASSUMPTION` | 选择更保守且不阻塞的分支，并记录 policy reason。 |

### 3.3 Action-specific requirements

| Action | Required conditions | Must emit | Forbidden shortcuts | Evidence status |
|---|---|---|---|---|
| `AUTO_APPLY` | Low impact；easy reversal；low uncertainty；strong/deterministic evidence；无 locked/risk；low rework。 | concise change summary + provenance。 | 不能因“模型很自信”自动改 core path。 | Evidence-backed direction；阈值 provisional。 |
| `APPLY_WITH_UNDO` | Low/medium impact；真实可逆；影响可枚举；无 risk/lock hard gate。 | before/after、Undo token、affected IDs、expiry/persistence。 | “重新生成”不等于 Undo；不能丢失用户编辑。 | Evidence-backed。[AUT-C03][AUT-C08][AUT-C14] |
| `PROPOSE_FOR_APPROVAL` | High structural impact、hard/moderate reversal、high rework、外部依赖或风险边界。 | diff、why、evidence、assumptions、cascade、alternatives、recovery。 | 空泛“同意吗？”；默认选中 approve；先 apply 后通知。 | Evidence-backed direction。[AUT-C11][AUT-C14] |
| `ASK_USER` | User-exclusive + blocking + no safe fallback，或授权/责任 owner 必须作承诺。 | 一个最小问题、why、decision changed、safe fallback（若有）。 | 把 routine IA judgment 交回用户；重复问已答内容。 | Evidence-backed direction + contract policy。 |
| `DEFER_AS_ASSUMPTION` | Unknown nonblocking；存在 safe reversible fallback；interaction cost 相对高。 | assumption、confidence、fallback-if-wrong、review trigger。 | 默默猜测；把 assumption 标 confirmed。 | Evidence-backed direction。[AUT-C02] |
| `RESEARCH_OR_TEST` | 真值 evidence-dependent；错误成本 material；可定义验证方法。 | research question、method、evidence gap、decision threshold。 | 让 founder preference 冒充用户证据；用 synthetic users 验证。 | Evidence-backed。[AUT-C07][AUT-C12][AUT-C15] |

### 3.4 Factor-to-action examples

| Impact | Uncertainty | Reversibility | User-exclusive | Evidence | Locked | Rework | Risk | Interaction cost | Action |
|---|---|---|---:|---|---:|---|---|---|---|
| low | low | easy | false | strong | false | low | none | low | `AUTO_APPLY` |
| medium | low/medium | easy | false | medium+ | false | low | low | low | `APPLY_WITH_UNDO` |
| high | any | any | false | any | false | any | any | any | `PROPOSE_FOR_APPROVAL` |
| any | any | any | false | any | true | any | any | any | `PROPOSE_FOR_APPROVAL` |
| any | high | any | true | any | false | high/blocking | any | low/medium | `ASK_USER` |
| low/medium | high | easy | true/false | none/weak | false | low | none | high | `DEFER_AS_ASSUMPTION` |
| medium/high | high | any | false | none/weak | false | any | any | any | `RESEARCH_OR_TEST` |
| medium/high | medium | moderate/hard | false | strong | false | high | none | high | `PROPOSE_FOR_APPROVAL` |
| any | any | any | true | any | false | any | high legal/privacy | any | `ASK_USER`（或授权专家） |

## 4. Special Policies

### 4.1 Locked constraints

1. Locked 是权限边界，不只是高 impact label。
2. 冲突 patch 必须停在 proposal，不得先 mutation 再提供 Undo。
3. 用户明确指令只批准其点名操作；新发现的 cascade（例如删除节点会破坏 required flow）必须再次呈现。
4. Unlock 应产生独立 decision record，记录 owner、scope、reason 和时间。

### 4.2 Existing evidence contradicts AI inference

```text
mark inference = contradicted
→ validate evidence relevance/recency
→ recompute affected decision
→ choose action by impact/reversibility
→ preserve superseded history
```

强 evidence 不代表可以越过 high-impact approval；它提高 recommendation 的依据，不改变 decision right。

### 4.3 Security / privacy / legal

- David 可以识别风险和请求授权，不能替代安全评审或法律意见。
- 引入 auth/payment/external API、改变 permissions、采集/共享/保留个人数据，至少 `PROPOSE_FOR_APPROVAL`。
- 若 business/legal commitment 只有用户或授权专家知道，使用 `ASK_USER`。
- 若需确定法规、API 安全性或技术能力，使用 `RESEARCH_OR_TEST`。
- Interaction cost 永远不能把 high-risk action 降为 `AUTO_APPLY` 或 `APPLY_WITH_UNDO`。[AUT-C15][AUT-C16]

### 4.4 Approval quality

有效 approval 必须让用户能判断：

```text
What changes?
Why now?
What evidence and assumptions support it?
What flows/scope/wireframes/handoff are affected?
What happens if approved, rejected, or interrupted?
Can it be undone, and how completely?
```

只增加 approval step 不足以保证有效监督；评测必须加入 planted-error detection 和 correction quality。[AUT-C11][AUT-C14]

### 4.5 Error recovery

每种 action 都必须定义恢复：

| Action | Recovery minimum |
|---|---|
| `AUTO_APPLY` | 变更日志；若实现可恢复则提供版本引用。 |
| `APPLY_WITH_UNDO` | 原子 rollback；恢复引用、flows、scope、wireframes 与 selection state。 |
| `PROPOSE_FOR_APPROVAL` | Reject 不污染 active state；Edit 可生成新 proposal；proposal 可安全过期。 |
| `ASK_USER` | Skip/不知道路径；保存上下文；不要求重述整个任务。 |
| `DEFER_AS_ASSUMPTION` | review trigger 到达时提示；被证伪后标 contradicted 并重算 cascade。 |
| `RESEARCH_OR_TEST` | 工具失败时记录 limitation，返回 current best recommendation，不编造 evidence。 |

中断长 action sequence 时必须展示 partial completion 和恢复计划，不能只提供“停止”按钮。[AUT-C06][AUT-C14]

## 5. Question Planner Pseudocode

```text
for candidate_question in generated_questions:
  if fingerprint matches confirmed answer or active memory:
    reuse answer; discard question
  if fingerprint matches declined question and no review_trigger fired:
    discard question
  if truth requires observation/research rather than user-owned fact:
    route RESEARCH_OR_TEST
  estimate:
    decision_delta
    wrong_assumption_cost
    interaction_cost
    fallback_quality
    blocking
  if decision_delta is immaterial:
    discard question
  if safe fallback exists and not blocking:
    route DEFER_AS_ASSUMPTION
  if user-exclusive and blocking and no safe fallback:
    rank by expected decision value
ask only the highest-ranked question within provisional turn budget
```

不得实现为隐藏的伪精确总分。各 factor 必须保留，以便审计和分维评测。

## 6. Data / Schema Implications

### 6.1 `AutonomyDecision`

```ts
interface AutonomyDecision {
  decisionId: string;
  factors: {
    impact: "low" | "medium" | "high";
    uncertainty: "low" | "medium" | "high";
    reversibility: "easy" | "moderate" | "hard";
    userExclusiveKnowledge: boolean;
    evidenceStrength: "none" | "weak" | "medium" | "strong";
    lockedConstraintConflict: boolean;
    downstreamRework: "low" | "medium" | "high";
    securityRisk: "none" | "low" | "medium" | "high";
    privacyRisk: "none" | "low" | "medium" | "high";
    legalRisk: "none" | "low" | "medium" | "high";
    interactionCost: "low" | "medium" | "high";
    fallbackQuality: "none" | "weak" | "safe";
    blocking: boolean;
  };
  selectedAction: IAAgentAutonomyAction;
  triggeredGates: string[];
  evidenceIds: string[];
  conciseRationale: string;
  recoveryPlan: string;
  evaluatedAt: string;
}
```

### 6.2 `QuestionDebt`

```ts
interface QuestionDebt {
  questionId: string;
  fingerprint: string;
  decisionId: string;
  statement: string;
  blocking: boolean;
  fallbackAssumptionId?: string;
  askedAt?: string;
  answeredAt?: string;
  declinedAt?: string;
  nextEligibleReviewTrigger?: string;
  interactionCost: "low" | "medium" | "high";
}
```

## 7. Evaluation Requirements

不得只报一个总分。至少分别报告：

| Metric | Definition | Target type |
|---|---|---|
| Unauthorized action rate | 应 Ask/Approve/Test 却 Auto/Undo 的比例 | Safety critical，越低越好 |
| Unnecessary question rate | 可 Auto/Undo/Defer/Test 却 Ask 的比例 | Burden |
| Duplicate question rate | 已回答/已拒绝且 trigger 未变却再次询问 | Deterministic，应为 0 |
| Approval bypass rate | locked/high-risk/high-impact proposal 被直接 apply | Deterministic，应为 0 |
| Undo integrity | rollback 后 canonical state 与引用是否完整恢复 | Deterministic |
| Evidence routing accuracy | evidence-dependent truth 是否进入 Research/Test | Case rubric |
| Assumption honesty | deferred unknown 是否标 assumption + confidence + trigger | Deterministic + expert |
| Recovery completeness | 是否说明状态、下一步、fallback 和 owner | Expert rubric |
| Time to first useful proposal | 首个可纠正结构出现的 turn/time | User research |
| Question yield | 回答后实际改变决策的问题比例 | Product analytics + study |
| Correction effectiveness | 用户发现并修正 planted error 的比例与时间 | Prototype experiment |

## 8. Real User Research Minimum

在冻结 v1.0 question budget 前，至少执行：

1. **Wizard-of-Oz comparative test：** `ask-first` / `propose-first` / `hybrid`，同一 6–8 个 product ideas。
2. **Question batching test：** one-at-a-time vs 2–3 coupled，测总轮次、完成率、答案质量、NASA-TLX 简版或等价负担量表。
3. **Autonomy scenario interview：** 17 类 seed 情境随机化，收集期望 action 与理由；seed 只作 stimulus。
4. **Structure-diff test：** planted risky change，测是否发现、理解 cascade、拒绝/修改。
5. **Undo recovery test：** 执行真实 rollback，观察用户是否相信且能验证恢复。
6. **Segment slices：** Codex/Cursor/Claude Code 使用经验、PM/UX 经验、产品类型、语言、无障碍需求。

回填字段：`observed_preference_distribution`、`question_abandonment`、`decision_quality_delta`、`correction_time`、`acceptable_actions`、`segment_notes`。研究完成前不得把 synthetic case 的 ideal label 改写成“用户希望”。

## 9. Proposed Contract Calibration

| `01` current rule | Calibration status | Recommendation |
|---|---|---|
| “Ask only for truth the user uniquely knows” | Evidence-backed direction | 保留；补充 evidence-dependent truth → `RESEARCH_OR_TEST`。 |
| Each normal turn = 1 question | Provisional | 保留为 default guardrail，移除实证暗示。 |
| First intake = 3–5 questions | Provisional | 标明需 David user calibration；同时加 time-to-first-proposal metric。 |
| Candidate review at most 1 question | Provisional | 保留；优先 diff/direct manipulation 需原型测试。 |
| L1 changes provide Undo | Evidence-backed | 补充 Undo integrity 与 cascade restoration。 |
| L2 waits for approval | Evidence-backed direction | 补充 approval context、fatigue 与 meaningful review tests。 |
| Security/privacy/legal require confirmation | Authoritative risk policy | 保留；拆成 Ask/Approve/Research 三条路由。 |
| Confidence drives autonomy | Insufficient alone | 明确 confidence 不能覆盖 impact、risk、authority、evidence、lock。 |

## References

引用 ID `AUT-C01`–`AUT-C18` 的完整 title、URL、日期、支持点、限制、David implication 与 confidence 均见 [Agent C Evidence](sources/agent_c_autonomy_evidence.md)。
