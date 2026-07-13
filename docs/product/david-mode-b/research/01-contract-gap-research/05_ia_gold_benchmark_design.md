# 05 — IA Gold Benchmark Design

> 状态：Research design v0.1  
> 适用范围：David Mode B 的 Context → Intent → Inventory → IA → Navigation → Flow → Node Mini-IA → Scope → Handoff 输出  
> 证据边界：本文件没有 benchmark 运行结果、模型排名或通过率。ia_gold_cases_seed.jsonl 全部是 synthetic evaluation case，不是用户证据。

## 1. 评测目标与非目标

Benchmark 要回答的不是“输出是否逐字匹配一个 sitemap”，而是：David 是否形成了一套**覆盖输入、结构一致、可解释、诚实标记假设、支持核心任务且可交付**的 Product Blueprint。

非目标：

- 不用一个模糊总分掩盖某个 blocker；
- 不把 Gold IA 当作唯一正确树；
- 不以 LLM judge 代替用户 findability 或 task success；
- 不以 synthetic case 推断目标用户的真实 mental model；
- 不在未运行评测时填入任何模型得分。

依据：NN/g 明确指出 card sorting 只能提供可能分组，不能产出唯一精确导航；tree testing 才用于评估既有或候选层级，且仍缺少真实界面的视觉上下文。[Card Sorting vs. Tree Testing，2024-02-23](https://www.nngroup.com/articles/card-sorting-tree-testing-differences/)

## 2. Benchmark 单元

一个评测单元包含：

~~~text
Case input
+ locked constraints / artifacts
+ Gold reference envelope（不是 exact answer）
+ candidate output
+ deterministic findings
+ expert ratings
+ calibrated LLM-critic findings
+ human-test results（仅在真实测试后存在）
~~~

Gold reference envelope 由以下内容组成：

1. 必须覆盖的 intent、inventory、constraints、core outcome；
2. 一至三种可辩护 mental-model hypotheses；
3. 两种候选组织及推荐依据；
4. canonical ID、flow、scope 与 handoff 的结构不变量；
5. 可接受替代结构的条件；
6. common wrong answers 与 controlled perturbations；
7. 必须由真实用户或 downstream execution 才能回答的问题。

因此候选输出可与 Gold 的分组或 label 不同，只要它不违反事实与约束，并提供同等完整、可验证的论证。

每个 case 还必须提供两种可执行 traceability：

- `explicit_constraints[]` 使用 typed record（stable ID、status、owner、target refs、prohibited operations），禁止只放自由文本后声称可 deterministic 检查；
- `recommended_ia.realization_mapping[]` 将 selected candidate 的每个 group 映射到至少一个最终 canonical node ID 与 typed navigation placement（placement ID、kind、node ID、projection value）；projection value 必须真实存在于 `navigation_model` 对应集合。任何 refinement 必须写 rationale，避免 candidate 与 Gold output 静默漂移。

## 3. 七类产品覆盖

| Case | 产品类型 | 主要压力点 | Seed 状态 |
|---|---|---|---|
| IA-GOLD-001 | Desktop B2B SaaS | 工作队列、稳定对象、审计、权限 | synthetic |
| IA-GOLD-002 | Mobile consumer app | 高频单任务、移动导航、完成反馈 | synthetic |
| IA-GOLD-003 | AI workflow product | AI 状态、human review gate、provenance、recovery | synthetic |
| IA-GOLD-004 | Marketplace | 双边角色、信任、交易状态、通知 | synthetic |
| IA-GOLD-005 | Content / learning product | 内容分类、今日任务、掌握状态 | synthetic |
| IA-GOLD-006 | Existing-product redesign | 基线、旧深链、能力保留、迁移 | synthetic |
| IA-GOLD-007 | Feature added to an existing repo | locked repo 约束、local IA、migration、tests | synthetic |

正式集不应只保留这 7 条。每一类后续至少应有：vague idea、mature artifact、conflicting evidence、scope pressure、critical missing dependency、plausible alternative IA 六种变体。具体数量与 case 难度分布须经专家试标后确定，不能把任意样本量写成科学阈值。

## 4. Case 字段契约

Schema：datasets/ia_gold_case.schema.json。

每个 case 必须含：

- Raw idea / input、provided artifacts、explicit constraints；
- User and situation、core job、success/failure state；
- Information needs；
- Object/content/capability/action/state/role/permission/dependency/rule/event inventory；
- Mental-model hypotheses、cues、风险、置信度、验证方法；
- 2–3 个 Candidate IAs、recommended IA、trade-offs、change conditions；
- Labels and hierarchy、canonical node IDs；
- Global/local/contextual navigation、search、entry points、wayfinding；
- Core flows、path types、recovery；
- P0 Node Mini-IA；
- MVP scope、Later/Excluded/Test first/Rabbit hole/Dependency blocked；
- Acceptance Criteria 的 precondition、event、observable outcome 与 verification；
- Handoff expectations 的 canonical/file refs、locked constraints、commands、done-when、expected artifacts 与 unresolved；
- Assumptions、fallback、validation plan；
- Common wrong answers；
- deterministic / expert / LLM / human 四类 oracle；
- synthetic、authoring method、limitations。

## 5. 四层评测架构

### 5.1 Layer A — Deterministic checks

只检查无需产品主观判断、相同输入应稳定复现的事实：

- JSON/schema、enum、required field；
- ID 唯一性、引用存在、无非法环和 orphan；
- locked constraint 冲突；
- core flow 是否有 entry、terminal、recovery 和合法 node；
- P0 node 是否有 Mini-IA、wireframe ref、acceptance criteria；
- MVP 是否依赖 later / excluded / unresolved blocker；
- handoff 路径、test command、canonical ID 引用是否可解析。

Deterministic failure 输出 rule ID、证据路径、severity、消息，不输出“IA 好/坏”主观结论。

### 5.2 Layer B — Expert rubric

由 IA/UX/PM 专家按第 6 节逐维评分。专家可以接受 Gold 之外的替代方案，但必须引用 case input 和候选输出中的可核查证据。首轮正式使用前应进行双人独立试标、分歧讨论和 rubric 修订；不预设未经试标支持的一致性阈值。

### 5.3 Layer C — LLM-as-judge candidates

LLM critic 适合：遗漏初筛、内部矛盾、rationale 是否引用输入、assumption 是否被误写为事实、label 是否疑似含内部术语。它不得单独裁决真实 mental model、findability、usability、value 或 viability。

运行要求：

1. 每次只评一个 rubric dimension；
2. 提供 dimension anchor、case input、Gold envelope 与 candidate evidence；
3. 要求返回 rating_candidate、evidence_spans、uncertainty、needs_human_review；
4. pairwise 比较时交换 A/B 顺序并检查 verdict stability；
5. 用专家标注 calibration set 报告逐维 agreement、confusion 与 false-positive/false-negative；
6. 固定并记录 model/version/prompt/temperature/date；
7. 不把 judge 生成的解释当作新的事实来源。

G-Eval 说明 form-filling rubric 的 LLM evaluator 可提高某些 NLG 任务的人类一致性，但论文也报告对 LLM-generated text 的潜在偏好；MT-Bench 研究报告 position、verbosity、self-enhancement 等 bias。因此这里只把 LLM judge 作为需校准的 critic，而非 Gold owner。[G-Eval，EMNLP 2023](https://aclanthology.org/2023.emnlp-main.153/)；[Judging LLM-as-a-Judge，NeurIPS 2023](https://proceedings.neurips.cc/paper_files/paper/2023/file/91f18a1287b398d378ef22505bf41832-Paper-Datasets_and_Benchmarks.pdf)

### 5.4 Layer D — Human user test / downstream execution

只有这一层可以产生以下观测：

- card-sort grouping patterns；
- tree-test task success、directness、first path、time；
- usability task completion、critical error、recovery、理解；
- old/new IA 的相对表现；
- downstream coding agent 是否遵守 canonical IDs、constraints、tests 和 done-when。

Human-test 指标必须同时记录 segment、任务措辞、样本、版本、研究方式和限制。NN/g 指出 quantitative tree testing 可测 success、time、directness，但 qualitative small study 不适合统计推断；任务还必须避免用 label 原词泄露答案。[Tree Testing，2023-08-06](https://www.nngroup.com/articles/tree-testing/)

## 6. 13 维 Rubric

统一使用 0–3 ordinal anchor，不对维度求未经验证的加权总分：

~~~text
0 = 缺失、违背明确输入，或导致该维度不可用
1 = 存在但有关键遗漏/矛盾，需大幅返工
2 = 基本可用，有明确局限且可局部修正
3 = 充分、连贯、可追溯，并对局限与替代方案诚实
N/A = case 不适用；必须解释，不能按满分处理
~~~

| 维度 | 0 的关键表现 | 2 的最低证据 | 3 的附加证据 | 主判方式 | LLM critic? | Human test? |
|---|---|---|---|---|---|---|
| User-intent fit | 复述 feature，未定义 situation/progress/outcome | core job 与核心 flow 对齐 | 显示 anxiety/trust/failure 与 change conditions | Expert | Yes | Usability |
| Inventory coverage | 关键对象/动作/状态/依赖缺失 | 核心 inventory 可支撑 flow | 角色、权限、规则、事件和 provenance 完整 | Deterministic + Expert | Yes | No |
| Mental-model honesty | 把推断称为已验证事实 | hypothesis、confidence、validation 明确 | 区分 user cue、pattern 与 evidence 冲突 | Deterministic + Expert | Yes | Card sort / interview |
| Grouping coherence | 大量 overlap/gap 或混合抽象层级 | 每个核心对象/能力有合理 home | 替代方案和扩展/重复成本可解释 | Expert | Yes | Card sort / tree test |
| Label clarity / information scent | label 与目的地不符或全是内部术语 | 重要 label 具体、可预测 | 与 user vocabulary、context、translation 风险一致 | Expert | Yes | Label test / tree test |
| Hierarchy quality | orphan、非法 parent、核心项被错误埋藏 | parent-child、priority、depth 可解释 | polyhierarchy 保持 canonical object，增长策略清楚 | Deterministic + Expert | Yes | Tree test |
| Navigation fit | 核心 destination 无入口或 pattern 与平台冲突 | global/local/context 分工支持 core flow | deep link、search、orientation、role variant 合理 | Expert | Yes | Usability |
| Flow completeness | core outcome 不可达或无 terminal | happy path + 关键 error/recovery 可达 | permission/cancel/return/repeat 与状态转换完整 | Deterministic + Expert | Yes | Usability |
| Wireframe alignment | wireframe 不引用 node/mini-IA 或缺主动作 | P0 layout blocks 覆盖 primary info/CTA/states | 动态反馈与 flow edge 一致、无功能漂移 | Deterministic + Expert | Yes | Prototype test |
| Scope coherence | MVP 依赖 Excluded/Later 或破坏 core outcome | 端到端 slice 可交付 | appetite、rabbit hole、no-go、test-first 清楚 | Deterministic + Expert | Yes | Downstream test |
| Rationale quality | 只给结论或套用 pattern 名 | 每个核心结构有 input-based reason | trade-off、反例和 change condition 可核查 | Expert | Yes | No |
| Assumption transparency | unsupported claim 未登记或 evidence laundering | material assumptions 有 provenance/fallback | importance、evidence weakness、test priority 连贯 | Deterministic + Expert | Yes | Research execution |
| Agent handoff readiness | 无 canonical refs/AC/tests，或 blocker 未披露 | P0 文件/IDs/commands/done-when 齐全 | no-go、failure recovery、QA、return-to-blueprint 齐全 | Deterministic + Downstream | Yes | Agent execution |

Label 维度只能由 expert 初评，不能据此声称用户理解；information scent 会随用户目标、label、上下文和先验经验变化。[Information Scent，2020-02-02](https://www.nngroup.com/articles/information-scent/)

## 7. Severity 与 Readiness

沿用 01 的语义：

- Blocker：core task 无法完成、结构矛盾、scope 不可行、locked constraint 被违反、handoff 不可执行；
- Warning：明显 usability、comprehension、growth 或 implementation risk，但当前 core path 仍可工作；
- Recommendation：局部优化，不阻止当前范围交付。

Readiness 输出示例：

~~~json
{
  "case_id": "IA-GOLD-007",
  "candidate_id": "run-...",
  "deterministic": { "blockers": [], "warnings": [] },
  "rubric_vector": {
    "user_intent_fit": null,
    "inventory_coverage": null
  },
  "human_test": { "status": "not_run" },
  "downstream_execution": { "status": "not_run" },
  "decision": "not_scored"
}
~~~

null 和 not_run 不得转成 0 或“通过”。没有运行就没有得分。

## 8. Gold Case 制作流程

1. **Author**：依据真实或 synthetic input 写 case，不先看模型输出；
2. **Constraint pass**：按共享词汇分别标注 knowledge status、evidence basis、lifecycle lock 与 source refs；
3. **Independent IA pass**：第二名专家提出替代 IA 和 common wrong answers；
4. **Adjudication**：保留可接受 alternatives，不强行收敛为唯一树；
5. **Validator pass**：运行 schema、ID、flow、scope、handoff checks；
6. **Perturbation pass**：制作已知缺陷版本，例如 orphan node、scope break、evidence laundering；
7. **Pilot**：专家盲评 candidate 与 perturbation，修订 rubric；
8. **Human plan**：对需要行为证据的 case 预注册任务和指标；
9. **Freeze**：版本化 case、schema、rubric、judge prompt 与 source snapshot；
10. **Leakage control**：dev/test/holdout 分离；公开 seed 只用于 harness 开发。

NIST AI RMF 要求记录 test set、metrics、tools、representativeness、deployment-like conditions、uncertainty 和 generalizability limits；也建议引入未参与一线开发的专家或独立评估者。[NIST AI RMF Core，2023-01](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)

## 9. Controlled Perturbation Library

每个 Gold Case 至少生成以下单一缺陷版本，用于测 validator recall；不得把它们冒充真实模型错误率：

| Perturbation | 应命中的层 | 预期 severity |
|---|---|---|
| 删除 target user / core job | deterministic | Blocker |
| 把 `knowledgeStatus=inferred` 的 mental model 改成 `basisType=source_evidence` 且无 source | deterministic | Blocker |
| 让 flow 引用不存在 node | deterministic | Blocker |
| 删除 P0 error/recovery state | deterministic + expert | Warning 或 Blocker，取决于路径 |
| 将上下文 action 提升为 global nav | expert / LLM candidate | Warning |
| 用 vague label 替换关键目的地 | expert / LLM candidate + tree test | Warning |
| 让 MVP 依赖 later capability | deterministic | Blocker |
| 删除 wireframe primary CTA | deterministic + expert | Blocker |
| 删除 acceptance criterion 的 observable outcome | deterministic + expert | Blocker |
| 删除 handoff test command 或使用不存在路径 | deterministic + execution | Blocker |

## 10. 运行与报告协议

每次运行记录：

~~~text
benchmark version
schema version
case IDs and split
candidate model / prompt / tools / autonomy mode
validator version
LLM judge model / prompt / settings / order swaps
expert raters and adjudication status
human-test status and protocol ID
raw findings and artifacts
known exclusions / failures
~~~

报告顺序：

1. Blockers；
2. 13 维 vector 与 N/A 理由；
3. deterministic rule 命中；
4. expert disagreement；
5. LLM critic calibration 状态；
6. human/downstream not_run | planned | completed；
7. case-level error analysis；
8. 不确定性与覆盖缺口。

参考 HELM 的 multi-metric 与透明原始输出原则：多场景、多维度可以暴露 trade-off，避免把表现压成一个 accuracy。[Holistic Evaluation of Language Models，2022-11-17](https://arxiv.org/abs/2211.09110)

## 11. 进入实现前的完成条件

- schema 能验证全部 seed；
- 7 类产品均有至少一个 case；
- 每条 seed 均为 synthetic: true 且 validation_plan.status=not_run；
- 13 维 rubric 有 anchor 和 evaluator ownership；
- deterministic rules 有受控正/反例；
- LLM judge 先通过 expert calibration，不独立发布结论；
- human metrics 的任务、segment 与限制可追溯；
- blocker 不能被其他维度高分抵消；
- 没有 fabricated score、pass rate 或用户研究结果。

## 12. 仍需真实研究/实验

1. 七类 case 是否代表 David 首批用户的真实任务分布；
2. 各维度 anchor 的 expert inter-rater reliability；
3. 哪些 dimension 的 LLM critic 达到可接受的误报/漏报权衡；
4. label、grouping、findability 的 card sort/tree test 表现；
5. wireflow 与 prototype 中的 task completion 和 recovery；
6. downstream agents 对 handoff 的执行成功与 failure mode；
7. Readiness gate 的真实业务成本与 severity 校准。
