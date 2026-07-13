# Skill: `manage_agent_autonomy`

> 类型：System policy skill；不由普通用户 prompt 绕过。  
> 证据状态：核心 control/correction/risk 原则 evidence-backed；具体阈值与 question counts provisional。  
> 详细来源：[Agent C Autonomy Evidence](../sources/agent_c_autonomy_evidence.md)。

## Purpose

为每一个 PM/IA decision 选择恰当的自主行为，既避免把 routine 专业工作推回用户，也避免未经授权修改高影响、locked 或高风险状态。

输出六种 action 之一：

```text
AUTO_APPLY
APPLY_WITH_UNDO
PROPOSE_FOR_APPROVAL
ASK_USER
DEFER_AS_ASSUMPTION
RESEARCH_OR_TEST
```

## Trigger

- 任一 PM Skill 产生 state patch 或 structural ChangeSet；
- Question Planner 准备向用户提问；
- 变更 target user、core outcome、top-level IA、required flow 或 MVP scope；
- 变更 auth、payment、permissions、privacy 或 external API；
- patch 与 locked constraint、已批准 decision 或外部 evidence 冲突；
- Agent confidence 低、工具失败或用户拒绝回答；
- undo、stop、reject、error recovery 或 stage regression；
- Autonomy mode 切换。

## Inputs

### Required

| Input | Type | Description |
|---|---|---|
| `decision_id` | string | 待判定的单一 decision。 |
| `proposed_decision` | object | before/after、rationale、affected IDs。 |
| `current_state` | object | confirmed、assumed、locked、rejected、stale state。 |
| `impact` | low/medium/high | 对 user/core path/top-level IA/scope 的影响。 |
| `uncertainty` | low/medium/high | 对意图、状态和后果的不确定性。 |
| `reversibility` | easy/moderate/hard | 完整 rollback 难度。 |
| `user_exclusive_knowledge` | boolean | 是否只有用户/授权人知道。 |
| `evidence_dependent_truth` | boolean | 是否必须通过研究、analytics、法务/安全或技术验证回答。 |
| `evidence_strength` | none/weak/medium/strong | 直接相关证据强度。 |
| `locked_constraint_conflict` | boolean | 是否触及 lock。 |
| `downstream_rework` | low/medium/high | 对 flow/wireframe/scope/AC/handoff/code 的返工。 |
| `risk_flags` | object | security/privacy/legal 各自等级。 |
| `interaction_cost` | low/medium/high | Ask/Approve 的注意力成本。 |
| `fallback_quality` | none/weak/safe | 不问或不执行时的安全 fallback。 |
| `blocking` | boolean | 是否阻塞有用且诚实的下一步。 |

### Optional

- `autonomy_mode: Fast | Balanced | Controlled`；
- `question_history` 与 `question_fingerprint`；
- `evidence_ids`、`conflicting_source_ids`；
- `undo_capability` 与 rollback validation；
- `user_attention_context`；
- `policy_version`、`domain_owner`、`approval_owner`；
- `tool_failure`、`research_availability`；
- `explicit_user_instruction_scope`。

## Method

1. **Validate proposal**：schema、IDs、required constraints、cascade completeness。
2. **Apply hard gates**：locked → risk → user-exclusive blocking fact → evidence-dependent truth。
3. **Assess consequence**：impact、reversibility、downstream rework。
4. **Assess control path**：Undo 是否真实完整；approval 是否给足上下文；fallback 是否安全。
5. **Assess interaction cost**：只可优化非阻塞分支，不可放松 hard gate。
6. **Select one action**：记录 triggered gates，不输出模糊 blended action。
7. **Build user-visible control**：summary/Undo/diff/question/assumption/test plan。
8. **Validate recovery**：approve、reject、edit、stop、tool failure 后 state 均可解释且一致。

本 Method 基于 mixed-initiative expected utility、Microsoft HAI correction/control、Google PAIR feedback/control/error recovery、风险分层审批与 NIST risk management。[AUT-C01][AUT-C03–C07][AUT-C14–C16]

## Professional Rules

### Evidence-backed rules

1. **Uncertainty alone never selects `ASK_USER`.** 先判断答案是否改变 decision，是否只能由用户提供，以及 fallback 是否安全。[AUT-C01][AUT-C12]
2. **Correction, dismissal and recovery are mandatory controls.** 自动行为必须可被用户纠正、停止或接管。[AUT-C03][AUT-C06]
3. **Easy reversibility enables post-action control.** 低/中影响、真实可逆 patch 可 `APPLY_WITH_UNDO`；事后审查动作必须比需预批动作更可逆。[AUT-C08][AUT-C14]
4. **Approval is for consequence, not ceremony.** 高 impact、hard reversal、高 rework、locked 或 risk boundary 先展示 diff；approval 必须支持理解后果。[AUT-C11][AUT-C14]
5. **Risk flags are independent gates.** Security/privacy/legal 不能被模型 confidence 或 interaction cost 抵消。[AUT-C15][AUT-C16]
6. **Evidence-dependent truth routes to research/test.** 用户偏好不能证明真实 mental model、findability 或合规事实。[AUT-C07][AUT-C12][AUT-C15]
7. **Memory prevents repeated questioning.** 使用 confirmed state 与 declined history；review trigger 未改变不得重问。[AUT-C03][AUT-C04]
8. **Explanation is decision-focused.** 展示 concise rationale、evidence、assumptions 和 diff，不暴露 private chain-of-thought，也不把事后自述当 faithful causal trace。[AUT-C07][AUT-C14]
9. **Autonomy is not capability.** Agent 会生成 patch，不代表有权 apply；逐 decision 判定。[AUT-C09][AUT-C17]
10. **Fast/Controlled mode does not change truth or safety.** 只调整中低风险控制频率。[AUT-C10][AUT-C17]

### Provisional heuristics

1. 正常 turn 最多一个 decision-changing question；
2. 首个结构 proposal 前默认最多 `3–5` 个问题；
3. 批量问题最多三个且 tightly coupled；
4. medium impact + easy reversal 默认 `APPLY_WITH_UNDO`；
5. `interaction_cost=high` 且 nonblocking 时优先 defer。

这些规则需 David 目标用户研究，不得写成普适科学事实。[AUT-C13]

## Decision Rules

```text
if schema_or_constraint_invalid:
  REJECT_PATCH_WITH_VALIDATION_FAILURE
else if locked_constraint_conflict:
  PROPOSE_FOR_APPROVAL
else if max(security, privacy, legal) == high:
  ASK_USER if user-owned commitment else PROPOSE_FOR_APPROVAL/RESEARCH_OR_TEST
else if user_exclusive_knowledge and blocking and fallback_quality != safe:
  ASK_USER
else if evidence_dependent_truth and material:
  RESEARCH_OR_TEST
else if impact == high or reversibility == hard or downstream_rework == high:
  PROPOSE_FOR_APPROVAL
else if uncertainty == high and not blocking and fallback_quality == safe:
  DEFER_AS_ASSUMPTION
else if impact == low and uncertainty == low and evidence_strength == strong
        and no_lock_or_risk and downstream_rework == low:
  AUTO_APPLY
else if impact <= medium and reversibility == easy and max_risk <= low
        and undo_available and undo_complete
        and undo_scope != none and undo_persistence != not_applicable:
  APPLY_WITH_UNDO
else:
  PROPOSE_FOR_APPROVAL or DEFER_AS_ASSUMPTION, with explicit policy reason
```

## Structured Output

```json
{
  "decision_id": "DEC-123",
  "policy_version": "autonomy-v1-provisional",
  "selected_action": "APPLY_WITH_UNDO",
  "triggered_gates": ["G8_REVERSIBLE_JUDGMENT"],
  "factors": {
    "impact": "medium",
    "uncertainty": "low",
    "reversibility": "easy",
    "undo_available": true,
    "undo_complete": true,
    "undo_scope": "cascade_atomic",
    "undo_persistence": "versioned",
    "user_exclusive_knowledge": false,
    "evidence_dependent_truth": false,
    "evidence_strength": "medium",
    "locked_constraint_conflict": false,
    "downstream_rework": "low",
    "security_risk": "none",
    "privacy_risk": "none",
    "legal_risk": "none",
    "interaction_cost": "low",
    "fallback_quality": "safe",
    "blocking": false
  },
  "evidence_ids": ["AUT-C03", "AUT-C08"],
  "concise_rationale": "Secondary label change is reversible and does not affect a locked or core path.",
  "user_visible": {
    "summary": "Renamed a vague secondary label.",
    "diff": [{"operation": "rename", "target_id": "IA-22", "before": "Management", "after": "Account & Billing"}],
    "controls": ["UNDO"]
  },
  "recovery_plan": "Restore the label and all generated references atomically.",
  "state_effect": "APPLY_REVERSIBLE_PATCH"
}
```

### Output invariants

- `selected_action` 恰好一个；
- `AUTO_APPLY` 的 deterministic hygiene gate 必须在 reversible-judgment gate 前判定；
- `APPLY_WITH_UNDO` 必须显式满足 `undo_available=true`、`undo_complete=true`，并记录 scope/persistence；
- `triggered_gates` 可审计；
- `concise_rationale` 只解释 factors，不输出隐藏 chain-of-thought；
- `APPLY_WITH_UNDO` 必须有 Undo control 和 atomic recovery；
- `PROPOSE_FOR_APPROVAL` / `ASK_USER` 不得 mutation active state；
- `DEFER_AS_ASSUMPTION` 必须有 review trigger；
- `RESEARCH_OR_TEST` 必须有方法和 decision threshold。

## Default Autonomy

`System policy`。本 skill 本身不采用 L0–L3 默认；它为其他 skills 计算 action。若 runtime 必须映射：

| Action | Legacy level |
|---|---:|
| `AUTO_APPLY` | L0 |
| `APPLY_WITH_UNDO` | L1 |
| `PROPOSE_FOR_APPROVAL` | L2 |
| `ASK_USER` | L3 |
| `DEFER_AS_ASSUMPTION` | L1 policy branch |
| `RESEARCH_OR_TEST` | Evidence branch，不等同 autonomy level |

## Must Ask When

仅当以下条件同时成立：

1. 信息是用户/授权人独有事实或承诺；
2. 它会改变当前 material decision；
3. 当前 state、memory、evidence 无答案；
4. 没有安全、可逆 fallback；
5. 延迟会产生明显风险或返工。

典型情境：目标用户含糊变化、hard no-go、商业模式承诺、数据保留选择、授权 owner、相互冲突的 confirmed constraints。

## Approval Required When

- 修改 target user 或 core outcome；
- 新增/移动/删除 top-level 或 core-path node；
- 删除 MVP 核心节点或改变 required flow；
- 触碰 locked node/decision；
- 引入 auth、payment、external API 或主要权限/数据边界；
- hard-to-reverse 或 high downstream rework；
- 覆盖已批准结构；
- explicit user instruction 出现未预见 cascade。

用户明确且具体的指令可视为对 **点名操作** 的授权；不能自动扩展为对新发现副作用的授权。

## Do Not Use This Skill When

- 只是回答不产生 state、question、test 或权限影响的事实性问题；
- 上游 proposal 未通过 schema/constraint validation；此时先返回 validator failure；
- 需要判断具体法律合规结论；应转适格法律/政策评审，skill 只决定控制路径；
- 需要评估 IA 专业质量本身；先运行相应 PM Skill/validator，再由本 skill 判断如何应用结果；
- 试图用它替代 user research、security review 或 authorization system。

## Anti-patterns

1. **Confidence-only autonomy：** “模型 95% confidence，所以自动改 top-level IA”。
2. **Questionnaire outsourcing：** 让用户选择 sidebar/tabs、loading/error states 等 routine PM judgment。
3. **Undo theater：** 只撤回 UI 文案，未恢复 flow、scope、wireframe 和 handoff references。
4. **Approval theater：** 只显示“Approve?”，没有 diff、风险、evidence 和 cascade。
5. **Evidence laundering：** 问 founder“用户会不会理解 Workspace”，然后标 evidence-backed。
6. **Lock bypass：** 先 apply locked change，再说“可以 Undo”。
7. **Risk averaging：** 用低 interaction cost 抵消 high privacy/legal risk。
8. **Repeated coercion：** 用户拒答后换措辞继续问同一 nonblocking question。
9. **Explanation dumping：** 暴露长 chain-of-thought，未说明实际变更和后果。
10. **Mode escalation：** Fast mode 放松 locked、truthfulness 或 risk gate。

## Validation

### Deterministic

- locked conflict 不得输出 Auto/Undo；
- high risk 不得输出 Auto/Undo；
- duplicate confirmed/declined question 不得输出 Ask；
- Apply-with-Undo 必须有可验证 rollback；
- Approval/Ask 前 active state hash 不变；
- Deferred assumption 必填 provenance、confidence、fallback、review trigger；
- Research/Test 不得写 confirmed user evidence；
- structural change 的 affected IDs 与 cascade checks 齐全。

### Expert rubric

- factor classification 是否符合情境；
- selected action 是否平衡 overreach 与 over-questioning；
- rationale 是否简短、真实、与证据对应；
- approval context 是否足以发现 planted error；
- recovery 是否让用户能继续而非重来。

### User research

- 可接受问题频率/批量大小；
- diff comprehension 与 correction time；
- Undo 信任和验证行为；
- Fast/Balanced/Controlled 的偏好；
- approval fatigue 与 rubber-stamp；
- 不同经验与无障碍需求差异。

## Positive Examples

### Example 1 — Reversible label improvement

`Management` 是未锁定的 secondary label，改为 `Account & Billing`，不影响 core flow，完整 rollback 可用。

- Action：`APPLY_WITH_UNDO`
- Why：medium/easy/no risk；专业 judgment，不需用户替 David 做 IA。
- Response：显示 rename diff、依据与 Undo。

### Example 2 — Blocking user-owned fact

用户说“也许改做企业”，但不明确是 enterprise buyer 还是 end user；该选择会重做 intent、IA 与 scope，无安全 fallback。

- Action：`ASK_USER`
- Why：user-exclusive + blocking + high rework。
- Response：只问目标用户与购买/使用角色，不问 UI pattern。

### Example 3 — Evidence-dependent mental model

David 低 confidence 判断用户更偏 task-based grouping，但没有访谈、card sort 或 tree test。

- Action：`RESEARCH_OR_TEST`
- Why：真实 mental model 不是用户偏好题，也不是 AI 可确认事实。
- Response：保留 provisional recommendation，提出 card sort/tree test 与改变 recommendation 的标准。

## Negative Examples / Failure Modes

### Failure 1 — Auto-applying a locked move

把 locked `Diagnostic` 移到 `Settings` 并提供 Undo。

- Failure：locked 是 permission gate，Undo 不能替代 approval。
- Correct：`PROPOSE_FOR_APPROVAL`，展示 constraint conflict。

### Failure 2 — Asking a duplicate intake question

已确认 `desktop-only V1`，下一 turn 又问平台。

- Failure：未读取 canonical state，增加 question burden。
- Correct：复用 confirmed answer 并继续；通常 `AUTO_APPLY` 到相关约束。

### Failure 3 — Treating approval as quality control

高影响 scope cut 只给“Approve”，不显示它会破坏 plan generation。

- Failure：用户无法 meaningful review，容易 rubber-stamp。[AUT-C11][AUT-C14]
- Correct：`PROPOSE_FOR_APPROVAL` + blocker、三个 repair options、affected flow/scope。

## Evaluation Cases

使用 [`autonomy_case_library.seed.jsonl`](../datasets/autonomy_case_library.seed.jsonl) 的 AUT-001–AUT-024。最低通过要求：

- locked/high-risk/approval-bypass blockers = 0；
- duplicate question rate = 0；
- JSON response 满足 structured output；
- 六 action 均有正例；
- 不把 seed 结果描述成用户研究。

## Sources

1. Horvitz, *Principles of Mixed-Initiative User Interfaces*, CHI 1999 — https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/chi99horvitz.pdf
2. Amershi et al., *Guidelines for Human-AI Interaction*, CHI 2019 — https://www.microsoft.com/en-us/research/wp-content/uploads/2019/01/Guidelines-for-Human-AI-Interaction-camera-ready.pdf
3. Google PAIR, *Feedback + Control* — https://pair.withgoogle.com/guidebook-v2/chapter/feedback-controls/
4. Google PAIR, *Errors + Graceful Failure* — https://pair.withgoogle.com/chapter/errors-failing/
5. Google PAIR, *Explainability + Trust* — https://pair.withgoogle.com/guidebook-v2/chapter/explainability-trust/
6. OpenAI et al., *Practices for Governing Agentic AI Systems*, 2023 — https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf
7. NIST, *AI RMF Generative AI Profile*, 2024 — https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
8. Zhang & Choi, *Clarify When Necessary*, Findings of NAACL 2025 — https://aclanthology.org/2025.findings-naacl.306/

每条来源的直接支持点、日期、限制、David implication 与 confidence 见 [`agent_c_autonomy_evidence.md`](../sources/agent_c_autonomy_evidence.md)。
