# Patch Proposal for `01`

> 本文件只提出局部 Patch，不直接修改 `01_ia_reasoning_and_agent_autonomy_contract.md`。分类表示修订时机，不表示已经完成用户验证。

Research Pack 已先在 [`14_shared_vocabulary_resolution.md`](14_shared_vocabulary_resolution.md) 和
[`datasets/shared_contract_vocabulary.schema.json`](datasets/shared_contract_vocabulary.schema.json) 中解决跨 Skill 的枚举漂移；`01` 本体仍须在后续批准的 spec patch 中采用该规范源。

## A. Must Patch Before Implementation

| `01` Section | Current rule | Evidence | Proposed change | Reason | Confidence |
|---|---|---|---|---|---|
| 3 / 4.4 / 11.3 Identity | Object、IA node、navigation placement 与 path 的 canonical identity 边界只散落在 prose | Agent A IA evidence；taxonomy/polyhierarchy guidance | 明确 `canonicalObjectId`、`iaNodeId`、`navigationPlacementId` 与 `flowNodeRef` 的关系；polyhierarchy 只增加 placement，不复制 object/state | 避免跨入口出现重复状态、分叉 ID 和错误 handoff reference | High |
| 3.2–3.3 Provenance | 一个 enum 同时包含 `confirmed/inferred/pattern_based/evidence_backed/unknown/conflicting/rejected/locked/stale` | HAI 支持 expectation、correction、control；没有来源要求混合枚举 | 采用 shared vocabulary：`knowledgeStatus`（confirmed/inferred/unknown/conflicting）、`basisType`（user_input/source_evidence/pattern/model_inference/synthetic_evaluation）、`lifecycleStatus`（active/rejected/locked/stale/superseded）；confidence 单独存在 | 当前枚举把来源、认知状态和生命周期混为一体；例如 source-backed 也可能 stale/conflicting/locked | High（架构一致性） |
| 3.4 Decision Record | `auto_apply/apply_with_undo/approval_required/user_answer_required` | Section 7 已定义六种 canonical action | `autonomyMode` 直接复用六种 Action：`AUTO_APPLY/APPLY_WITH_UNDO/PROPOSE_FOR_APPROVAL/ASK_USER/DEFER_AS_ASSUMPTION/RESEARCH_OR_TEST` | 避免 schema、policy 与 evaluation case 出现两套术语 | High |
| 7.1–7.3 Autonomy | 六种 Action 与 L0–L3 同时作为分类，但 mapping 只在 prose 中 | HAI/PAIR 支持按风险与控制分层；具体六类是 David synthesis | 明确：Action 是 runtime decision；Level 只是 impact/control summary。给出一对多 mapping，禁止把 Level 当 action 存储 | 避免实现者在 `L1`、`APPLY_WITH_UNDO`、`DEFER_AS_ASSUMPTION` 之间猜测 | High |
| 7.2 Decision matrix | 条件只在简表中出现 | SRC-AUT-01/03/04；Autonomy research | 加入可程序化字段：impact、uncertainty、reversibility、exclusive knowledge、evidence、locked conflict、downstream rework、security/privacy/legal、interaction cost；先走 hard gates，再用 heuristic ranking | 六种 action 不能只靠 prompt 语感选择 | High |
| 7.2 / 7.5 Risk gates | Security、privacy、legal 目前只作为 impact 项的一部分 | NIST AI RMF GenAI Profile；agent governance evidence（Agent C） | 将 security、privacy、legal 拆为独立 hard gates；interaction cost 与 confidence 不得抵消；记录 authority scope、responsible approver、fallback/rollback | 高风险授权不是普通 UX 偏好，必须有责任与恢复边界 | High |
| 4.6 / 10 Candidate IA | 要求 candidates 使用同一 inventory，但没有 snapshot identity | Agent A IA evidence；比较有效性要求相同输入 | 每个 candidate 强制引用 `inventorySnapshotId`、constraint version 与 unresolved-item set | 否则候选差异可能来自输入遗漏而非 organization scheme | High |
| 4.9 Flow paths | 所有 flow 列出 happy/alternate/error/empty/permission/cancel/retry/return | Flow/wireflow 方法支持任务路径，但不要求所有分支在每个场景均 P0 | 改为 risk-based completeness；每类 path 为 `required / not_applicable / deferred`，后两者必须给 rationale 和 scope impact | 防止形式化补齐无意义分支，也防止静默漏掉关键 recovery | High |
| 4.11 / 18 Method selection | 列出 Shape Up、RICE、MoSCoW、Story Map、Assumption Testing，但 Eligibility 主要在 prose | 方法作者原文与 Agent B evidence | 增加 `MethodEligibilityGate`：decision type、required inputs、comparison eligibility、disqualifiers、selected method、why-not-alternatives；无资格时返回 `method_not_applicable` | 防止为了“专业感”机械叠加框架或用缺失输入伪造分数 | High |
| 4.11 Scope concepts | Appetite、estimate、ranking 与 release commitment 可在同一 scope stage 出现 | Shape Up、RICE、MoSCoW 原始方法边界 | 明确 `appetite != estimate != initiative ranking != release commitment`；RICE 只比较同目标/时间窗/粒度项，MoSCoW Must 需 failure/workaround/dependency test | 不同方法输出不能混为一个 priority score | High |
| 9 / 18 Opportunity evidence | Opportunity mapping 容易被读成真实 discovery | Product Talk + GOV.UK user-needs guidance；Agent B evidence | `Opportunity` 必须记录正交 provenance 与 source IDs；AI synthesis 默认为 `knowledgeStatus=inferred, basisType=model_inference` | 防止把 model synthesis 洗成用户研究 | High |
| 8.3 Question Budget | 表中给出 3–5、1、0–1 等 default budget | 没有 David 用户实证；HAI 只支持 relevant/minimal engagement | 在标题和 schema 标记 `provisional configurable defaults`；所有数值附 `calibrationStatus: unvalidated`；不得成为 hidden scientific claim | 具体耐受度依用户、任务与 UI，必须 A/B + quality/abandonment 测试 | High |
| 9.2 Evidence hierarchy | 用单表给 evidence “typical strength” | Card sort/tree test/usability 各回答不同问题 | 改为 `claimType × evidenceMethod` 矩阵；strength 还需 relevance、recency、sample、method fit、contradiction | Tree test 对 hierarchy 强，但对支付意愿无效；不存在跨 claim 的单一证据梯子 | High |
| 15 Validation | Domain 列表未标 deterministic / expert / LLM critic / human test | IA 方法、OpenAI eval capability；本 research 的 Validator Catalog | 每条 validator 必须引用稳定 ID、required data、detection type、severity、false-positive risk、auto-fix、approval；明确 handoff blocker whitelist | 否则“full validation”不可实现、不可回归 | High |
| 15 Four Risks | Value/Usability/Feasibility/Viability 作为检查域，但未禁止聚合分数 | SVPG Four Risks；Agent B/E evidence | 四项保持独立记录；任何 active blocker 不得被其他维度高分平均掉；无证据时显示 unknown 而非中分 | 一个总分会隐藏致命单项风险 | High |
| 15 / 18 Acceptance Criteria | 定义 AC Skill，但格式与 Definition of Done 边界不够明确 | Cucumber Gherkin reference + observable outcome principles | AC 必须 observable、traceable；Gherkin 只是可选表达，`Then` 不写实现步骤；Definition of Done 属过程质量，不与产品行为 AC 混合 | 避免下游 agent 只满足格式、不满足可观察行为 | Medium-High |
| 16 Readiness | 多维状态与 gate prose 未和 validator IDs 关联 | Evaluation design + downstream execution need | Gate 由 validator results 和 artifact coverage 派生；`not_run` 不得算 pass；禁止 LLM 直接声明 ready；active Blocker 必须阻断，override 记录 user、reason、scope、timestamp | Readiness 必须可审计，且不能把未执行检查或 unresolved blocker 隐藏成 ready | High |
| 18.2 Skill Registry | `01` 有 20 个 initial skills，但只列摘要，没有 contract path、version、promotion state 或 owning future spec | 本研究包已补齐全部 20 张 Skill Card，包括 `frame_outcome`、`map_opportunities`、`compile_handoff_context` | 每个 registry row 增加 `contractPath`、`version`、`researchStatus`、`productionStatus`、`owningSpec`；未通过 Gold/Autonomy/Handoff eval 前不得标 production-ready | 解决 prompt 初始 17 张与 `01` 20 个 Skills 的覆盖差异，并让 runtime 可定位/版本化 | High |
| 19.3 Action enum | `IAAgentAction` 与 Autonomy Action 是两类 enum，但命名容易混淆 | Internal architecture review | 重命名为 `AgentOperation`（answer/run_skill/propose_patch/...）与 `AutonomyDecision`（六种 policy result）；在流程图标明先 operation proposal、后 policy decision | 防止 `ask_user` operation 与 `ASK_USER` decision 重复或错配 | High |
| 16.5 / 19 Handoff | Gate 关注 artifact completeness，但 instruction surface、adapter capability 与 execution evidence 仍较抽象 | Coding-agent official docs + SWE-Bench Pro + AGENTS.md studies（Agent G） | 明确 `UniversalCore` 与 `AgentAdapterManifest`；manifest 记录 surface/version/accessDate/instruction precedence/capabilities/preflight/fallback。Core 内容保持 task-relevant，不因 adapter 复制分叉 | 官方产品加载机制不同；更多 context 或 instruction file 本身不保证成功 | High |
| 16.5 / 19 Handoff evidence | “Agent-ready”容易被理解为文件生成完成 | Agent G official/primary evidence | Readiness 增加 downstream evidence：artifact hash、commands/exit codes、build/test/AC results、constraint checks、review status、return-to-blueprint reason；`rendered` 只是一个 QA 子项 | 完成状态不能由 Agent 自述，preview/build pass 也不等于业务 correctness | High |

## B. Should Patch After Prototype / Evaluation Testing

| `01` Section | Current rule | Evidence | Proposed change | Reason | Confidence |
|---|---|---|---|---|---|
| 6.3 Question shape | 每问必须包含 Question/Why/Decision/Fallback | HAI 仅间接支持解释与相关性 | 测试完整显式文案、折叠解释与仅在需要时展开三种方式；按结果决定 UI 必显字段 | 每次展示四段可能本身增加 burden | Medium |
| 6.4 One-question rule | normal turn 最多 1；紧耦合最多 3 | 无直接 evidence | 作为实验变量，而非 frozen MUST/SHOULD；记录 `questions_shown`、`turns_to_first_proposal`、dropout 与 IA quality | 一次一问可能降低单回合负担，也可能造成多轮拖延 | High（需测） |
| 8.4 First proposal | small input 后尽早给 visual hypothesis | Progressive disclosure/HAI 间接支持 | 定义 first proposal 的最低内容与质量门槛，并测试 1/3/5 questions 条件 | “早”必须与错误结构造成的 rework 一起评价 | High（需测） |
| 13.2 Progressive evolution | 固定 Context→Intent→Objects→Candidates→IA→... | Progressive disclosure 与 visualization literature 部分支持 | 原型比较 staged morph、stable canvas + layer reveal、summary-first 三种；以理解、定位、纠错时间评价 | 没有证据证明当前顺序最易懂 | High（需测） |
| 13.3 Workbench | Conversation/Canvas/Decision 三栏 | 没有直接 outcome evidence | 只保留职责分工，不冻结三栏；在 02 spec 用 viewport/task prototype 选择布局 | 架构职责不等于固定 layout | High |
| 13.4 Status language | 九种可视 status | HAI 支持透明和纠错，未验证九态可辨识 | 先测试 3–5 个用户概念，再决定视觉编码；详细状态可在 inspector 渐进披露 | 状态过多可能造成认知负担 | High（需测） |
| 13.5 Structure Diff | 固定 diff 内容与三个按钮 | HAI 支持 preview/control/undo | 用低/中/高 impact case 测理解、批准错误、修改时间；再定默认展开内容 | 高影响 change 需要更多 consequence preview | Medium-High |
| 15.1 Severity | Blocker/Warning/Recommendation 定义宽泛 | Validator research | 用 expert panel + seeded borderline cases 校准；记录 disagreement 与 override | severity 直接影响 handoff gate，误报/漏报成本不同 | High（需测） |

## C. Keep as Provisional Heuristic

| `01` Section | Current rule | Evidence | Proposed change | Reason | Confidence |
|---|---|---|---|---|---|
| 4.4 Inventory before pages | 先抽取 object/capability，再形成页面 | IA/taxonomy 方法间接支持 | 保留；标为 generation heuristic，并用 Gold Case 比较 omission/coverage | 专业合理但未做 agent head-to-head | Medium |
| 4.6 Candidate count | 默认两个，最多三个 | 无直接 evidence | 保留为 cognitive-load guardrail；允许“只有一个合理方案”或显式扩展 | 不能写成研究定律 | Low-Medium |
| 4.8 Navigation examples | desktop 规模映射 sidebar/tabs/search | IA/navigation pattern evidence | 保留为 pattern-based examples，不成为 deterministic validator | 产品语境和 growth 影响选择 | Medium |
| 5 Stage compression | 成熟输入可压缩但仍记录 output | 方法和审计需求间接支持 | 保留；用 extraction coverage test 验证 | 有利于减少问题但需防止 silent skip | Medium |
| 8.1 Question Value | 多因素 ranking | HAI/control 原则间接支持 | 保留为非数值 heuristic；不得公开伪精确 score | 权重未知 | Medium-Low |
| 12 Turn protocol | Interpret→Patch→Validate→Visualize→Explain→Ask | HAI 支持各职责，不支持固定顺序 | 保留为 runtime checklist；user response 可压缩 | 不应制造模板化 AI 文风 | Medium |
| 16 Readiness dimensions | 十个独立 readiness dimensions | 多维评测原则支持 | 保留初始 taxonomy，允许 benchmark/validator 合并或细分 | 维度权重不应汇总成一个模糊分 | Medium |
| 19.5 No fine-tuning dependency | V1 通过 harness/policy/schema/evals 控制 | 官方 instruction/eval capability + safety architecture | 保留；说明这不是 fine-tuning 效果比较结论 | policy 不能只靠模型统计倾向 | Medium-High |

## D. Requires Real User or Downstream Evidence

| `01` Section | Unknown | Required study | Contract field to update |
|---|---|---|---|
| 6 / 8 | 用户能接受的问题数量、一次一问还是批量 | A/B Question Budget + Wizard-of-Oz；同时测 abandonment、correction、blueprint quality | budgets、first-proposal gate、fallback policy |
| 7 | 哪类自动结构改动让用户不安或觉得被越权 | Autonomy Case sessions + observed approve/edit/reject/undo | decision thresholds、default mode |
| 13 | 用户能否理解 Context→Intent→Objects→IA→Flow→Wireframe | 可点击原型 think-aloud + comprehension tasks | projection sequence、persistent context、labels |
| 13 | Provenance、confidence、diff 如何显示 | status recognition + change consequence test | visible status subset、diff information hierarchy |
| 13 | Semantic zoom / focus+context 是否帮助 | within-subject prototype comparison | zoom semantics、overview/minimap、node expansion |
| 15 | Validator 误报/漏报与 severity | Expert review + seeded cases + adjudication | blocker whitelist、threshold、auto-fix |
| 16 / 19 | Handoff 最小文件和 agent adapters 是否有效 | 同一任务跨 Codex/Cursor/Claude Code/Copilot execution test | required artifacts、adapter files、QA loop |
| 18 | Skill 输出是否优于 generic prompt | Gold Cases 上的 ablation：skill contract vs baseline | production skill promotion gate |

## Recommended Patch Order

1. 先统一 provenance、action/operation、skill registry 与 readiness/validator schema 语义；
2. 再把 question numbers、candidate count、Canvas progression 明确标为 provisional configuration；
3. 以 Autonomy/Gold/Validator seeds 建 evaluation harness；
4. 完成 prototype 与 downstream execution 后，才冻结 Question Budget、Canvas 和 Handoff gates。
