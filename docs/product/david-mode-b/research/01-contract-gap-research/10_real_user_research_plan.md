# 10 — Real User Research Plan

> 状态：Research plan only；尚未招募、访谈、测试或获得结果  
> 目标产品：David Mode B  
> 核心对象：会使用 Cursor / Claude Code / Codex 的 AI 独立开发者；相邻观察对象为 PM、Designer 与 downstream Engineer  
> 证据输入：[`sources/agent_d_workflow_evidence.md`](sources/agent_d_workflow_evidence.md)  
> 研究伦理：不把 synthetic case、Wizard 注入错误、标准化 brief 或 AI 推断冒充用户证据

## 0. 本计划要冻结什么、不能冻结什么

本计划用于校准 `01_ia_reasoning_and_agent_autonomy_contract.md` 中仍未获得目标用户证据的规则：

1. 哪些事实只有用户能回答；
2. 哪些 PM / UX 决策用户希望 David 自动完成；
3. `3–5` 个前置问题是否造成负担，visual-first 是否更合适；
4. 用户通过文字、结构图还是 Structure Diff 更容易纠正 David；
5. 用户何时认为 Blueprint 已足够开始 coding；
6. 哪些 Handoff artifacts 会被 Codex、Cursor、Claude Code 实际读取并正确执行。

在研究完成前，不得把以下内容写成用户事实：

- `3–5` 是最佳或可接受的 Question Budget；
- Structure Diff 一定优于完整重绘；
- 用户普遍希望 AI 自动改 label、navigation 或 scope；
- 某种 Canvas progression 已被理解；
- Blueprint package 已被证明提高 code quality 或减少 rework；
- 任何 participant count、task-success rate、满意度或实验差异。

## 1. Research Questions 与决策

| RQ | 研究问题 | 将改变的产品决策 | 主要方法 |
|---|---|---|---|
| RU-D-01 | Builder 在 coding 前实际做哪些规划、找资料、拆任务、写 prompt 和交接？ | Orient / Inventory / Handoff 的必需字段 | Artifact interview |
| RU-D-02 | 用户用什么语言描述结构、范围、偏航、返工和“已经能开发”？ | David 的用户可见术语与 interview probes | Critical-incident interview |
| RU-D-03 | 哪些问题是 user-exclusive；哪些应由 AI 提案或暂存假设？ | Section 6 三类信息与 Ask boundary | Interview + Wizard-of-Oz |
| RU-D-04 | 哪类自动修改让用户不安；影响、可逆性、accountability、专业身份如何作用？ | Section 7 autonomy matrix | Vignette + Wizard-of-Oz |
| RU-D-05 | Interview-first `3–5` questions 与 visual-first `0–1` blocking question 哪个更好？ | Section 8.3 / 8.4 默认预算 | A/B Question Budget pilot |
| RU-D-06 | Chat、Canvas、Decision Panel、Structure Diff 中，哪个更有助于发现和纠正错误？ | Section 12 / 13 与 Canvas spec 输入 | Clickable prototype + Structure Diff test |
| RU-D-07 | 用户能否理解 `Context → Intent → Objects → IA → Flow → Wireframe`？ | Progressive visualization / readiness | Clickable prototype |
| RU-D-08 | 用户如何判断 Blueprint handoff-ready；与 Coding Agent 的判断是否一致？ | Section 16.5 Handoff gate | Interview + downstream execution |
| RU-D-09 | 哪些文件被 Agent 实际读取，哪些被忽略、误解或造成冲突？ | Universal core 与 agent adapter | Instrumented downstream execution |
| RU-D-10 | Blueprint 变更后，用户和 Agent 能否追踪受影响 flow、scope、AC 和 task？ | ChangeSet / stale / traceability | Structure Diff + downstream mutation test |

## 2. User Segments

### 2.1 核心 Segment

| ID | Segment | 定义 | 为什么单独观察 |
|---|---|---|---|
| S1 | Technical AI indie builder | 独立或 2 人以内；能读写代码；近 3 个月每周至少 2 次使用 Cursor / Claude Code / Codex；有真实产品 idea 或 feature | 可能能自己完成 architecture / task decomposition，对问题和 plan 的容忍与低技术用户不同 |
| S2 | Product / Design-led AI indie builder | 独立或 2 人以内；产品、设计或业务背景；能用 Coding Agent 产出，但不把自己视为熟练 Engineer | 更接近 David 要补足 PM / Product Architect 能力的核心价值场景 |

### 2.2 相邻 Segment

| ID | Segment | 定义 | 研究边界 |
|---|---|---|---|
| S3 | PM / Designer sender | 在 3–20 人产品团队中负责需求、prototype、flow 或 handoff；近 3 个月使用过 Coding Agent 或把材料交给使用 Agent 的 Engineer | 只用于理解团队 handoff、decision ownership 与 artifact 需求，不替代核心用户结论 |
| S4 | Downstream Engineer receiver | 接收 PM / Designer / Founder 的需求并用 Cursor / Claude Code / Codex 实现；有 review / QA 责任 | 用于判断 artifact 是否可执行、哪些信息缺失；不代表 founder 的提问偏好 |

### 2.3 分层变量

每位 participant 记录但不预设因果：

- primary agent：Cursor / Claude Code / Codex / mixed；
- AI coding 使用频率与连续使用月数；
- technical self-efficacy；
- product / IA / UX 经验；
- greenfield / existing repo；
- shipped / abandoned / still building；
- solo / paired / cross-functional team；
- 最近项目复杂度、敏感性和付费 / auth / external API 情况；
- autonomy mode 偏好是否来自个人习惯、团队 policy 或 compliance。

## 3. 招募标准

### 3.1 Inclusion Criteria

核心参与者必须同时满足：

1. 过去 90 天内真实使用 Cursor、Claude Code 或 Codex 完成至少一个非教程 coding task；
2. 至少每周使用 2 次，或过去 30 天累计完成 8 次以上 agent sessions；
3. 拥有一个真实、可讨论的产品 idea、feature 或最近失败/返工任务；
4. 愿意展示至少一种去敏后的真实 artifact：prompt、plan、issue、PRD、Figma、screenshot、diff、commit、review comment 或 handoff message；
5. 对产品方向、设计或实现至少有一项实际 decision responsibility。

相邻参与者必须：

- S3：最近 90 天内实际制作或交付过一个需求 / design / prototype；
- S4：最近 90 天内实际从他人材料开始实现或 review 过一个 Agent-assisted change。

### 3.2 Exclusion Criteria

- 只有观看视频、跑 demo 或复制教程的使用经历；
- 没有真实 idea / task，只能讨论假想工作流；
- 主要销售 AI coding 产品但没有亲自参与规划、实现或 handoff；
- 不能提供任何 recent critical incident，且无法展示去敏 artifact；
- 研究团队成员、David 当前直接设计者，或已熟知测试假设的人；
- 无法安全去除客户 secret、token、个人数据或受 NDA 限制的材料。

### 3.3 招募 Quota

首轮核心样本至少满足：

- S1 与 S2 各半；
- 至少 4 位主用 Cursor、4 位主用 Claude Code、4 位主用 Codex；mixed user 可重叠统计但不能替代主工具 quota；
- 至少 1/3 有 shipped product，至少 1/3 有 recent abandoned / major rework case；
- 至少 1/3 在 existing repo 做 feature work；
- 不让单一产品类型超过核心样本一半；
- 若 David 首发语言 / 地域已确定，再增加对应语言和地区 quota；当前桌面证据以英文社区为主，不能默认覆盖中文用户。

### 3.4 Screener 核心题

1. 过去 30 天分别使用 Cursor / Claude Code / Codex 几次？
2. 最近一次从 idea / requirement 到 code 的任务是什么？何时发生？
3. 该任务最终 shipped、abandoned、still in progress，还是重做？
4. 你负责 product、design、engineering 中哪些 decision？
5. 你在 coding 前产生了哪些 artifact？
6. 你能否展示去敏后的 artifact 或现场复现流程？
7. 最近一次 Agent 理解错方向是什么？你如何发现和修正？
8. 项目是否包含 auth、payment、privacy、external API 或其他高风险边界？

## 4. 样本与轮次设计

### 4.1 建议样本

| Round | 方法 | Segment / 样本 | 主要目的 | 是否可得统计结论 |
|---|---|---|---|---|
| R0 | Artifact-based interview | n=18：S1 6、S2 6、S3 PM 2、S3 Designer 2、S4 Engineer 2 | 真实工作流、语言、handoff 与 critical incidents | 否；qualitative themes |
| R1 | Wizard-of-Oz | n=8：S1 4、S2 4，可从 R0 recontact | 提问、autonomy、纠错和可视化 first proposal | 否；formative behavior |
| R2 | Clickable prototype | 2 轮 × 6 人；每轮 S1 3、S2 3；第二轮使用修订版 | Canvas progression、provenance、readiness | 否；iterative usability |
| R3 | A/B Question Budget pilot | n=24；A/B 各 12，按 segment、tool、experience、task type matched | 估计 effect / variance，筛选默认策略 | 只能 directional pilot |
| R4 | Structure Diff test | n=16；S1 8、S2 8；within-subject counterbalanced | change 识别、影响理解、拒绝与恢复 | 只能 directional pilot |
| R5 | Downstream execution pilot | 6 个去敏真实 briefs × 3 agents × 2 conditions = 36 runs；2 位独立 Engineer judges | Blueprint 是否被不同 Agent 正确执行 | paired task evidence；非人群 prevalence |

### 4.2 样本量理由

- GOV.UK 对 interview / contextual / usability round 的通常建议是 4–8 人；因此 R1 用 8 人，R2 用两轮各 6 人，强调边测边改，而非一次性大样本。
- R0 扩到 18 人，是为了覆盖两类核心用户和 sender / receiver 两个相邻角色，不用于计算“多少用户都这样”。
- R3 的 n=24 是 feasibility / directional pilot，用来估计 variance、dropout、测量敏感度和可能 effect；GOV.UK 明确提醒清晰 A/B / benchmark 通常需要 hundreds。正式阈值须在 pilot 后做 power analysis。
- R4 使用 within-subject 以减少个体差异；n=16 只用于发现较大 comprehension 差异和失败模式，不宣称细小效果。
- R5 的分析单位是 `brief × agent × condition`；36 runs 可检查跨 3 个 Agent 的一致性，但单次随机生成不够估计模型方差。若 pilot 显示结果不稳定，confirmatory round 要按同一版本重复每格至少 2 次，并预先计算预算。
- Qualitative round 的停止条件不是“达到一个神奇人数”，而是高优先 RQ 在相邻两轮不再出现新的决策类别，且关键 segment 均有 recent artifact 支持；若没有，继续补招该 segment。

### 4.3 Participant Reuse

- R0 可 recontact 进入 R1，以利用真实 idea 和已知 artifact。
- R2 与 R4 可部分复用，但必须间隔至少 7 天，并 counterbalance scenario，避免记忆答案。
- R3 必须使用未看过 David first-proposal prototype 的新 participant，避免 condition contamination。
- R5 的 brief owner 可来自 R0；Engineer judge 不得知道 condition。

## 5. 数据与伦理

### 5.1 采集内容

- session audio / screen recording，经明确 consent；
- artifact screenshot 或去敏副本；
- timeline events、question / answer、change / correction、approval / reject；
- prototype clickstream、task time、error、backtrack；
- Coding Agent tool trace、file reads、commands、diff、tests、token / runtime；
- post-task ratings 与 interview notes。

### 5.2 不采集或必须去除

- `.env`、API key、access token、客户 secret；
- 未经授权的 source code、customer data、private repo URL；
- 受 NDA 限制的设计和 business metrics；
- 不必要的个人身份、公司名和同事姓名。

### 5.3 Evidence Provenance

每条研究记录必须包含：

```text
evidence_id
participant_id / session_id
segment
method
observed | stated_preference | artifact_observed | test_stimulus_response
source_artifact
timestamp
researcher_interpretation
alternative_interpretation
confidence
contract_sections
```

synthetic stimulus 另加：

```text
synthetic: true
stimulus_purpose
injected_error
```

只有 participant 对刺激的行为和表达可记为 observed user evidence；刺激内容本身不是用户证据。

## 6. R0 — Artifact-Based Interview

### 6.1 任务

参与者选择最近 30 天的一次真实任务，并现场重建：

```text
Idea / request arrives
→ context gathering
→ product / design decisions
→ plan / prompt / artifact creation
→ Coding Agent execution
→ review / correction
→ handoff / merge / abandon
```

必须优先展示实际 artifact；没有 artifact 的环节标记为 memory-based self-report。

### 6.2 60 分钟 Session 结构

| 时间 | 内容 | 输出 |
|---:|---|---|
| 0–5 min | consent、角色与项目边界 | participant context |
| 5–15 min | 最近任务 critical incident | task / outcome / stakes |
| 15–35 min | artifact walkthrough + timeline | workflow map、handoff artifacts |
| 35–45 min | 偏航与纠错 incident | error / detection / repair |
| 45–53 min | delegation / autonomy probes | user-owned vs AI-owned decisions |
| 53–58 min | readiness / downstream probes | handoff-ready criteria |
| 58–60 min | wrap-up、去敏确认 | consent check |

### 6.3 访谈题纲

#### A. 最近真实工作流

1. 请从最近一次非教程任务开始：你当时原始想法或 request 是什么？
2. 你第一次把它交给 Coding Agent 前做了什么？请按时间顺序展示。
3. 哪些信息在文档、Figma、issue、repo 或你脑中？
4. 你为 Agent 特别补了哪些 context？为什么？
5. 哪一步最像 product / architecture work，而不是 coding？
6. 什么时候你认为“可以开始写代码了”？你看到了什么信号？

#### B. 只有用户知道的事实

7. Agent 问过哪些问题？哪些只有你能回答？
8. 哪些问题你觉得 Agent 本应自己判断？
9. 哪个没有被问到的信息后来造成了返工？
10. 如果你拒绝回答或不知道，Agent 怎么处理？

#### C. 规划与 artifact

11. 你是否使用 Plan Mode、PRD、task list、prototype、screenshot、diagram 或 `AGENTS.md` / `CLAUDE.md`？
12. 哪个 artifact 被实际读取？哪个只是你以为会被读取？
13. 你怎样保持 requirement、design、code 和 plan 同步？
14. 发生需求变化时，你更新哪里？什么最容易 stale？

#### D. 偏航与纠错

15. 最近一次 Agent 做了“几乎对但不完全对”的事是什么？
16. 你在何时发现？通过 code、UI、test、diff 还是运行结果？
17. 你用什么话纠正？是否需要重述整个 context？
18. 你希望当时看到 plan、structure diff、rationale 还是可运行 prototype？
19. 哪次自动修改让你最不安？为什么：影响、不可逆、责任、看不懂，还是其他？

#### E. 角色、accountability 与 autonomy

20. 哪些判断你愿意完全交给 AI？哪些你必须保留？
21. 同一个决定如果可 Undo，你的答案会改变吗？
22. 如果改动影响 payment、auth、privacy、core flow 或已写代码，你希望怎样确认？
23. 你最终要向谁解释或负责？这怎样影响 delegation？

#### F. Handoff 与 readiness

24. 假设今天把任务交给另一个 Engineer / Agent，最低需要哪些材料？
25. 对方最常补问什么？
26. 什么证据让你相信它已经实现正确，而不只是“看起来完成”？
27. 如果只保留三份 artifact，你保留哪三份？为什么？

### 6.4 访谈防偏规则

- 不先展示 Contract 的六种 autonomy action；先收集 participant 原词，再映射。
- 不问“你喜欢 Structure Diff 吗”；先让其完成 correction task。
- preference 与 actual behavior 分开编码。
- 一次失败不能推导产品规律；至少保留 alternative explanation。
- 研究者不得把自己的 PM 建议加入 participant transcript。

## 7. R1 — Wizard-of-Oz

### 7.1 目标

在完整 David runtime 尚未实现时，观察 participant 如何：

- 从真实 vague idea 开始；
- 回答或拒绝问题；
- 纠正 intent / object / IA；
- 对不同 impact 的 autonomous change 做反应；
- 判断何时进入 Flow / Wireframe / Scope；
- 建立或失去对 David 的信任。

### 7.2 Wizard Setup

- Participant 看到统一 Chat + Canvas + Decision Panel shell；不知道具体回复由研究员操作。
- Wizard 只可使用预先批准的 response blocks、PM skill checklist 和 autonomy matrix。
- 每次回复记录使用的 source context、assumption、change set 和延迟。
- Wizard 不可临场把 participant 的建议包装成“AI 已经知道”。
- Session 后必须 debrief，说明哪些部分由人模拟、哪些 error 被有意注入。

### 7.3 真实任务主线

1. Participant 用自己的 idea / requirement 开始。
2. Wizard 只问一个最高价值 blocking question。
3. 展示 provisional `Product Context → Intent → Objects → Candidate IA`。
4. Participant 直接改图、用 chat 纠正或接受 assumption。
5. 展开一个 P0 flow 和 node mini-IA。
6. 给出 scope cut 和 handoff-readiness draft。

### 7.4 Controlled Error / Autonomy Stimuli

每人经历 3 个，使用 Latin-square 分配，避免同一顺序：

| Stimulus | 类型 | Wizard 行为 | 观察 |
|---|---|---|---|
| WZ-01 | 低影响、可逆 | 自动补 missing loading / error state，带 Undo | 是否觉得打扰；是否使用 Undo |
| WZ-02 | 中影响、可逆 | 把次要 label 改为更具体名称，显示 summary | 是否理解理由；是否认为越权 |
| WZ-03 | 高结构影响 | 提议移动 top-level core node，显示 affected flow / scope，等待批准 | 是否看懂 cascade；是否要求更多证据 |
| WZ-04 | User-exclusive fact 错误 | 故意推错 first target user 并标 `inferred` | 是否发现；通过何种介质纠正；信任恢复 |
| WZ-05 | Evidence-dependent truth | 断言一个 label“用户会理解”，随后显示 Needs validation | 是否能区分 hypothesis / evidence |
| WZ-06 | Scope cut | 提议移除会破坏 core flow 的节点，validator 阻断并给修复选项 | 是否理解 blocker；如何做 trade-off |

这些是 `synthetic test stimuli`，不是用户结论。

### 7.5 Wizard Metrics

- first useful proposal time；
- decision-changing question count；
- participant 主动 correction 数；
- injected error detection / miss；
- correction channel：chat / direct graph edit / diff / verbal；
- correction 是否传播到 affected flow / scope；
- trust calibration：发现错误前后 7-point rating + 理由；
- autonomy action 的接受、拒绝、Undo 和 override；
- user-exclusive fact 被错误假设时的 perceived cost；
- participant 自发使用的结构与痛点词汇。

## 8. R2 — 可点击原型测试

### 8.1 原型范围

原型只需完整支持研究路径，不模拟不存在的 production capability：

- Conversation panel；
- Product Context / Intent Map；
- Object / Capability cards；
- Candidate IA A/B；
- Selected IA + Navigation；
- Flow overlay；
- Expanded node mini-IA / low-fi wireframe；
- Confirmed / Inferred / Unknown / Conflicting / Locked；
- Decision Panel、Structure Diff、Approve / Edit / Reject、Undo；
- Scope / readiness / handoff preview。

### 8.2 Tasks

| Task | Participant instruction | 主要测量 |
|---|---|---|
| P-01 | 找出 David 当前认为的 target user、core outcome 和 unknown | provenance comprehension |
| P-02 | 纠正一个错误 Intent，并让更改传播到 IA | correction discoverability / cascade |
| P-03 | 比较两个 Candidate IA，说明差异和 David 推荐理由 | option comprehension |
| P-04 | 找到核心任务从 entry 到 recovery 的路径 | flow readability |
| P-05 | 展开一个 node，判断缺少什么 state / action | mini-IA / wireframe alignment |
| P-06 | 审查一个 high-impact Structure Diff 并拒绝其中一项 | diff comprehension / selective approval |
| P-07 | 恢复到上一 approved version | undo / version recovery |
| P-08 | 判断是否 handoff-ready，并指出 blocker | readiness comprehension |

### 8.3 观察重点

- participant 是否理解 progression，而不是只会点按钮；
- Canvas 与 Chat 是否给出冲突事实；
- provenance status 是否被正确解释；
- IA + Flow + Wireframe 是否造成视觉过载；
- participant 是否能定位“为什么变了”和“影响了什么”；
- participant 是否把 `ready with warnings` 错当成无风险；
- 长词、复杂 label、移动和缩放是否妨碍任务，但具体 UI 数值留给 Canvas spec。

### 8.4 两轮迭代规则

- Round 2A 后只修复 blocker / major usability issue，不加入新概念；
- Round 2B 使用新 participant 验证修复；
- 同一错误若 2A 出现，修复后 2B 不再出现，记为 design iteration evidence，不写成总体成功率；
- 未修复或跨 segment 重复出现的问题进入 Canvas Contract patch candidate。

## 9. R3 — A/B Question Budget Pilot

### 9.1 研究假设

当前 Contract 的 `3–5` 是 provisional heuristic。Pilot 比较：

- **Condition A — Interview-first：** 在 first Blueprint proposal 前问 3–5 个 decision-changing questions；
- **Condition B — Visual-first：** 最多问 1 个 blocking user-exclusive question，然后展示 provisional Intent / Objects / Candidate IA，并把其余 unknown 记为 assumptions。

目标不是证明“越少越好”，而是判断 visual-first 能否在不增加 critical misunderstanding / downstream rework 的情况下减少负担并更早获得有效 correction。

### 9.2 Design

- Matched between-subject pilot，A/B 各 12 人；S1 / S2 各 6 人。
- 按 primary agent、experience、greenfield / existing、idea maturity、risk level 配对。
- 每人使用自己的真实 idea；Condition A 不能问无关问题凑满 3 个，若已足够必须停止并记录 actual count。
- 两个条件使用同一 Wizard protocol、PM skill checklist、time cap 和 target output schema。
- Researcher 在看 condition 前先对 raw idea 标注 user-exclusive facts 和可安全 fallback 项，供事后审计，不能泄露给 Wizard。

### 9.3 Primary Metrics

| Metric | 定义 | 方向 |
|---|---|---|
| Time to first useful proposal | 从首条输入到 participant 能指出至少一个正确点和一个可操作 correction | 越低越好 |
| Critical decision coverage | target user、core outcome、P0 flow、hard no-go 中已正确确认或明确标 assumption 的比例 | 不可下降 |
| High-impact wrong assumption | 未标明为 assumption 且会改变 core flow / scope 的错误数 | 不可增加 |
| User effort | question answering time + 7-point perceived effort + 中断/重复说明 | 越低越好 |
| Correction efficiency | 首个 proposal 后每个关键误解被发现并修正所需时间 / turns | 越低越好 |
| Blueprint usefulness | participant 对“现在能否继续做结构决策”的判断及具体理由 | 必须有行为证据 |

### 9.4 Secondary Metrics

- question count、question relevance、duplicate rate；
- answer 使哪个 decision 改变；
- fallback assumption 被接受 / 修正的比例；
- abandonment intent 与实际停止；
- trust calibration；
- session 总时长；
- Node / Flow / Scope 的 correction count；
- 最终 handoff-readiness gaps。

### 9.5 Analysis

- Pilot 报 median、IQR、paired matching differences、bootstrap confidence interval 和 effect size；不把 p-value 当唯一门槛。
- 先确认匹配质量；严重不平衡则只做描述性分析。
- 所有 question 由两位 coder 标注 `user-exclusive|PM-judgment|evidence-dependent|duplicate|non-material`；先建立 codebook，再对至少 20% double-code 并讨论分歧。
- Pilot 后基于 primary metric variance、dropout 和最小有意义差异做 confirmatory power analysis。
- 在 confirmatory study 前冻结 hypothesis、non-inferiority margin、exclusion 和 stopping rule。

### 9.6 Provisional Success Gate

此 gate 是产品决策规则，不是已验证阈值：

Condition B 只有在以下均成立时，才可成为 Balanced mode 的默认 candidate：

1. critical decision coverage 对 A 不劣；正式 non-inferiority margin 由 pilot 后、confirmatory 前冻结；
2. high-impact wrong assumptions 不增加；
3. time to first useful proposal 与 perceived effort 至少一个有一致改善，另一个不恶化；
4. S1、S2 方向一致，或能形成明确 segment-specific default；
5. correction 没有被推迟到 downstream execution 才发现。

若只有“用户更喜欢”但 coverage / rework 变差，不通过。

## 10. R4 — Structure Diff Test

### 10.1 Research Question

比较：

- **Diff condition：** `+ Add / ~ Move / ~ Rename / - Remove`，同时显示 reason、affected flow、scope、risk、confidence；
- **Full-state condition：** 只显示更新后的完整 Blueprint 和一句 change summary，不标 before / after。

### 10.2 Design

- n=16 within-subject；每人完成两种 condition；顺序 counterbalanced。
- 使用两个 complexity 匹配的 synthetic change sets；它们仅是测试刺激。
- Change set 同时含一个低影响 rename、一个 high-impact move、一个 scope removal 和一个 unaffected distractor。
- Participant 不先看 change list；需要自行识别发生了什么、影响了什么并决定 approve / reject / edit。

### 10.3 Tasks

1. 列出所有结构变化；
2. 指出哪些会影响 core flow、scope、wireframe 或 acceptance criteria；
3. 选择性拒绝一个 change 并说明原因；
4. 找到一个未受影响的 locked node，确认它没有变化；
5. 在误批准后恢复上一 version；
6. 用自己的话解释 current state 与 previous approved state 的差别。

### 10.4 Metrics

- change identification precision / recall；
- high-impact change miss rate；
- cascade-impact comprehension；
- false alarm on unaffected node；
- time to decision；
- selective reject success；
- restore success / time；
- confidence calibration；
- gaze / navigation path（若工具允许，否则 clickstream + verbal protocol）；
- subjective clarity 只作 secondary evidence。

### 10.5 Provisional Success Gate

Diff 才能进入 L2 默认交互 candidate，当：

- 至少 80% participants 正确发现全部 high-impact changes；
- 相比 Full-state，high-impact miss 不增加且 decision time 不恶化；
- participant 能正确说出至少一个真实 cascade impact，而不是只复述颜色 / 符号；
- S1 与 S2 都能完成 selective reject 和 restore；
- 无 participant 因 diff 隐藏完整 current state 而做出错误批准。

`80%` 是暂定产品 quality gate，不是科学事实；pilot 后可根据 risk 和 task difficulty 调整，并记录理由。

## 11. R5 — Downstream Agent Execution Test

### 11.1 核心问题

David 的 Blueprint / Handoff 是否让 Codex、Cursor、Claude Code：

- 更准确理解 product intent 和 IA；
- 覆盖 core / alternate / error path；
- 遵守 scope、locked constraints 和 no-gos；
- 正确使用 node / flow / AC canonical IDs；
- 更少补问、偏航和返工；
- 实际读取必要 artifact，而不是仅声称读取。

### 11.2 Inputs

选取 6 个 participant-owned、可去敏的真实 briefs：

- 2 个 greenfield；
- 2 个 existing repo feature；
- 1 个含 auth / permission；
- 1 个含 external API 或后台 dependency；
- 产品类型至少覆盖 desktop SaaS、mobile / consumer、AI workflow 中的两类；
- 每个 brief owner 先确认 source material 完整，不把故意残缺的 prompt 当 baseline。

### 11.3 Conditions

| Condition | 输入 | 公平性规则 |
|---|---|---|
| H0 — Current handoff | brief owner 现实中会给 Agent / Engineer 的原始材料：prompt、PRD、issue、Figma / screenshot、repo instructions | 不人为删减或写差；记录实际缺口 |
| H1 — David Blueprint handoff | 从同一 source material 生成 Product Context、IA、Flow、P0 mini-IA / wireframe refs、Scope、constraints / no-gos、AC、canonical IDs、entry manifest | brief owner 只确认语义与 hard facts，不给实现技巧 |

### 11.4 Agent Matrix

```text
6 briefs
× 3 agents: Codex / Cursor / Claude Code
× 2 conditions: H0 / H1
= 36 isolated pilot runs
```

每次 run 必须记录：

- product / model / version / date；
- permission / plan mode；
- repo commit、branch / worktree、dependency lock；
- system / repository instructions；
- token、runtime、tool calls；
- opened files 和读取顺序；
- questions、assumptions、plan、changes、tests、final report；
- crash、timeout、manual intervention。

### 11.5 Execution Protocol

1. 为同一 brief 创建等价 isolated repo snapshot。
2. 随机化 agent × condition run 顺序，防止 researcher 学习影响输入。
3. 在规定 checkpoint 前不人工纠正；若 Agent 询问 blocking user-exclusive fact，使用预先冻结的 answer key。
4. 非 blocking question 由 protocol 返回“use a stated assumption”，记录为 question / assumption outcome。
5. Agent 完成后运行同一 deterministic test / lint / build / validator。
6. 两位 blind Engineer judges 根据冻结 rubric review，不知道 condition。
7. Brief owner 做 intent review，但不评价 code style。
8. 发现 requirement / implementation 冲突时，记录应回写 Blueprint 的位置。

### 11.6 Outcome Metrics

#### Deterministic

- build / typecheck / lint / test pass；
- P0 acceptance criteria pass；
- core path end-to-end pass；
- required states present；
- canonical ID references valid；
- excluded / locked item violation；
- external dependency / auth / permission declared；
- artifact file reads 与 read order。

#### Expert Rubric

- product-intent fidelity；
- IA / flow alignment；
- scope coherence；
- architecture / repo convention fit；
- maintainability；
- recovery / edge-case completeness；
- change traceability；
- handoff report accuracy。

#### Process

- planning time、implementation time、total runtime；
- clarification questions；
- human interventions；
- repair turns；
- changed files / diff size；
- rollback / retry；
- files read but unused、required files never read；
- token / cost，仅作效率指标，不替代 quality。

### 11.7 Provisional Success Gate

H1 才能被称为 `agent-ready candidate`，当：

1. 相比 H0，P0 AC / core path conformance 在至少 5/6 briefs 上不差，并在其中至少 3 个改善；
2. 改善跨至少 2/3 agents 出现，不由单一 tool 驱动；
3. 不出现 silent locked / no-go violation；该项是 hard gate；
4. critical defect、repair turns、human intervention 三项中至少两项改善，另一项不明显恶化；
5. Blueprint 特有 artifact 被实际读取，且 judge 能追踪至少一个正确实现决定到 canonical source；
6. runtime / token 增加若明显，必须由质量收益证明其合理性，不能只以“更完整”辩护。

这些是 pilot product gates，不是已获得结果。正式发布 gate 需根据重复 runs 的模型方差再冻结。

### 11.8 Artifact Necessity Ablation

36-run pilot 后，针对至少 2 个 representative briefs 做受控 ablation：

- 去掉 wireframe；
- 去掉 flow；
- 去掉 scope / no-gos；
- 去掉 AC；
- 把 indexed package 合并成 monolithic prompt。

每次只移除一个 artifact，观察 conformance / file-read / question / repair 变化。Ablation 用于识别必要与冗余 artifact，不能从“Agent 没打开文件”直接推导文件无价值；还要检查入口是否正确引用。

## 12. 指标字典

| Metric ID | 指标 | 操作化定义 | 来源 |
|---|---|---|---|
| M-D-01 | Decision-changing question | 回答后实际改变 target user、outcome、IA、flow、scope 或 high-cost constraint 的问题 | event log + before/after state |
| M-D-02 | Duplicate question rate | approved state / memory 已有答案却再次询问的比例 | transcript audit |
| M-D-03 | Question burden | 回答时间、perceived effort、重复说明、放弃 / 跳过 | logs + post-task |
| M-D-04 | First useful proposal time | participant 首次能确认至少一项并做出可操作 correction 的时间 | video / event log |
| M-D-05 | High-impact wrong assumption | 未标 assumption 且改变 core outcome / path / scope / external risk 的错误 | expert coding |
| M-D-06 | Correction efficiency | 发现到 canonical state 正确更新的 time / turns | event log |
| M-D-07 | Cascade integrity | change 后受影响 flow / scope / wireframe / AC / handoff refs 均更新 | deterministic validator |
| M-D-08 | Provenance comprehension | participant 正确区分 confirmed / inferred / evidence-backed / unknown | task answer |
| M-D-09 | Autonomy calibration | participant 选择的 action 与理由，按 impact / reversibility / accountability / identity 编码 | vignette / WoZ |
| M-D-10 | Handoff readiness judgment | 能指出 ready、warning、blocker 及依据 | task answer |
| M-D-11 | Downstream conformance | 通过的 P0 AC / required behavior 比例 | tests + blind review |
| M-D-12 | Constraint violation | auth、privacy、scope、no-go、locked decision 被违反 | validator + review |
| M-D-13 | Repair turns | 首次完成后为满足冻结 AC 所需的人机修复轮数 | agent trace |
| M-D-14 | Artifact utilization | actual open/read/use、ignored、misread、conflict | tool trace + output traceability |
| M-D-15 | Real language evidence | participant 在 critical incident 中自发使用的词，不含 researcher 引导词 | transcript in-vivo code |

## 13. 分析规则

### 13.1 Qualitative

- 先做 in-vivo coding，保留 participant 原词；再映射 Contract terminology。
- `observed behavior`、`artifact evidence`、`stated preference`、`researcher inference` 分栏。
- Candidate theme 进入跨研究 summary 的最低条件：至少 3 个独立 participants，且跨 2 个 core subsegments 或被真实 artifact 直接支持；这是内部 evidence gate，不是 prevalence claim。
- 单一 critical safety incident 可进入 risk register，但必须标 `single case`，不得改成普遍行为。
- Negative case 必须保留；不得为了形成统一故事而删除冲突工作流。

### 13.2 Quantitative Pilot

- 报原始分布、median / IQR、effect size、confidence interval；不只报平均分。
- 缺失数据、timeout、Agent crash 与 participant dropout 单独报告，不默认删除。
- 多指标先冻结 primary / secondary，避免事后挑选显著项。
- n=24 / n=16 不写“证明”；只写 directional evidence 与 confirmatory requirement。
- Agent runs 的随机性、版本变化和 run order 是显式 confound。

### 13.3 Research-to-Claim 规则

研究结果必须写成：

```text
Observed evidence
→ Segment / context
→ Alternative explanation
→ Product implication
→ Agent behavior candidate
→ Schema / instrumentation need
→ Validation status
→ Confidence
```

不得从 preference 直接跳到 MUST；不得从 task success 直接推导长期 adoption。

## 14. 总体成功标准

### 14.1 Research Quality Gate

- 所有 core RQ 至少有一个 actual / likely user round；
- 核心 workflow claim 有 recent artifact 或直接观察，不只靠回忆；
- S1 / S2 分开分析；S3 / S4 不混入核心用户比例；
- synthetic stimuli 与 observed evidence 完全分栏；
- 每个 important finding 有反例、限制和 confidence；
- A/B / execution pilot 有预注册 primary metrics 与 exclusion；
- 任何 Contract patch 都能追到 evidence IDs 和 session IDs；
- 没有在研究执行前填写结果。

### 14.2 Product Decision Gate

| 决策 | 通过条件 | 未通过处理 |
|---|---|---|
| Balanced mode Question Budget | R3 visual-first 在 coverage / high-impact error 上不劣，并降低 time 或 effort | 保留可配置 heuristic；按 segment / task type 分支 |
| L1 auto + Undo | R1 中低影响 change 不造成系统性不安，且 Undo 可发现、可成功使用 | 降级为 propose / summary，修复 Undo discoverability |
| L2 Structure Diff | R4 达到 high-impact detection、cascade understanding、selective reject gate | 改为 full-state + diff、或 Controlled mode 默认 |
| Progressive Canvas | R2 两轮后核心 progression / provenance tasks 无 blocker pattern | 简化层级、调整 Chat / Canvas / Panel 分工 |
| Handoff ready | R5 H1 满足 conformance、no-go、cross-agent 和 artifact-use gate | 不冻结 Section 16.5；缩减或重构 package |
| Universal core | 至少 2/3 agents 对同一 core package 正确执行，差异可由 adapter 解释 | 把差异移入 agent-specific adapter，或承认无通用字段 |

## 15. 如何回填 Contract

只提交 Patch Proposal，不直接修改 `01`。回填映射：

| Evidence / result | 回填 Section | 可能改动 | 升级为规范的门槛 |
|---|---|---|---|
| User-exclusive question taxonomy | 6.2 / 6.3 | 补问题类别、why / decision / fallback 文案 | 跨 S1/S2 的 artifact-backed cases |
| Duplicate / declined question behavior | 6.5 / 8.5 | 问题去重与 refusal memory | observed repeated burden + recovery success |
| Question Budget A/B | 8.3 / 8.4 | 调整 `3–5`、first-proposal deadline、segment / complexity override | confirmatory study，不只 pilot preference |
| Accountability / identity findings | 7.2 / 7.4 / 7.7 | autonomy decision matrix 增补维度或 mode guidance | 多 segment 重复 + vignette behavior |
| Low-risk Undo test | 7.6 / 14.3 | 哪些 change 可 apply-with-undo | Undo discoverability / recovery 达标 |
| Structure Diff comprehension | 13.5 / 14.1 | diff 内容、impact cascade、full-state fallback | R4 behavior gate |
| Provenance comprehension | 3.2 / 13.4 | status label / display wording | R2 task success，无系统性混淆 |
| Canvas progression | 13.2 / 13.3 | stage projection 与 Chat/Canvas/Panel 分工 | 两轮 prototype 无 blocker pattern |
| Real handoff artifact use | 16.5 / 19 | readiness fields、entry manifest、read order | R5 file-read + conformance evidence |
| Agent-specific difference | Future `04_handoff_skill_contract.md` | Universal core vs adapter | 至少 2 个 briefs 重复观察 |
| Repair / almost-right outcome | 15 / 17 | validator、recovery、ready gate | downstream defect / repair evidence |
| Requirement change propagation | 5.2 / 14.2 | stale、cascade validation、return-to-blueprint | mutation test 通过 |

### 15.1 Contract Patch Record Template

```text
Patch ID
01 Section
Current rule
Observed evidence IDs
Segments / sample
Proposed wording
Alternative wording
Known counterexamples
Implementation implication
Schema / validator implication
Confidence
Status: MUST_PATCH | SHOULD_TEST_MORE | PROVISIONAL | REJECTED
```

### 15.2 何时只能保留 Provisional

- 只有 practitioner post 或 vendor case；
- 只有 stated preference，没有 behavior；
- 只有一个 segment；
- 只有 synthetic stimulus，没有真实 idea / artifact；
- A/B pilot 方向不一致或 confidence interval 太宽；
- downstream 改善只出现在一个 Agent；
- 改善生成速度但增加 critical repair / constraint violation。

## 16. 研究产物

研究执行后才创建：

- recruitment screener 与 consent；
- discussion guide v1 / v2；
- Wizard protocol 与 intervention log；
- clickable prototype task script；
- Question Budget preregistration；
- Structure Diff scenario set，标 `synthetic test stimulus`；
- anonymized workflow maps；
- real-language codebook；
- downstream brief manifest、agent run manifest、rubric；
- findings matrix 与 negative cases；
- Patch Proposal for `01`；
- inputs for Canvas spec、Blueprint schema、Handoff contract 与 evaluation harness。

## 17. 执行顺序与停止点

```text
R0 Artifact interviews
→ 更新真实语言 / workflow taxonomy
→ R1 Wizard-of-Oz
→ 冻结 R2 prototype tasks
→ R2A test / revise / R2B verify
→ 冻结 R3 / R4 metrics and stimuli
→ R3 Question Budget pilot + R4 Structure Diff
→ 根据 effect / variance 决定 confirmatory study
→ 仅在 Blueprint package 稳定后执行 R5 downstream test
→ 输出 Contract Patch Proposal
```

不得跳过的停止点：

- R0 若无法获得 recent artifact，不进入“真实工作流”结论；
- R2 若 progression 有 blocker，不进入 Question Budget 比较，避免把 UI confusion 当 question effect；
- R3 / R4 没有冻结 metrics，不执行正式比较；
- H1 package 仍有 schema / canonical ID blocker，不执行 R5；
- Agent 版本在实验中途重大更新时，暂停并重跑 affected cells。

## 18. 已知风险与缓解

| 风险 | 影响 | 缓解 |
|---|---|---|
| 招募到内容创作者而非真实 builder | 夸大成熟流程 | 强制 recent artifact 与 task walkthrough |
| Tool fandom / model comparison主导 | 偏离产品规划问题 | 追问具体 task、artifact、error、repair，不问“谁最好” |
| S1 技术用户压倒 S2 | 错估问题与解释需求 | quota + 分层分析 |
| 企业 PM / Designer 外推到 indie | 错置 team process | S3/S4 独立报告，不混核心结论 |
| Wizard 比真实 AI 更稳定 | 过度乐观 | 受控 realistic errors、延迟、debrief |
| Prototype 过于完整 | 测到视觉偏好而非推理理解 | 低保真、只实现研究路径 |
| 自有 idea 导致 A/B 异质性 | condition effect 被 domain 淹没 | matched pairs、冻结 complexity coding、pilot 后 power analysis |
| Synthetic diff 被当 user evidence | 证据污染 | stimulus / response 分栏，所有 synthetic 标记 |
| Agent non-determinism | downstream 差异不稳定 | isolate、记录版本、confirmatory repeats |
| Judge 知道 condition | bias | blind review、冻结 rubric |
| H1 比 H0 只是更长 | 把 token 量误认为质量 | artifact ablation、file-read trace、quality/cost 联合分析 |
| 敏感 repo / customer data | 伦理和安全风险 | 去敏、local snapshot、最小数据、participant veto |

## 19. Desktop Research 的最终边界

桌面研究目前足以把以下内容列为“强候选”：

- 复杂任务要区分 Explore / Plan / Implement / Verify；
- requirement 需拆为可执行任务并补 design / architecture constraints；
- Handoff 要包含 AC、验证、scope / no-go 和 repo context；
- agent changes 需要 inspectability、recovery 和 traceability；
- PM delegation 还受 accountability / identity / team norms 影响；
- Designer / PM 可用 prototype 暴露 flow / state / edge cases；
- downstream quality 必须测 repair 与 constraint violations。

桌面研究不能替代以下结果：

- David 用户可接受的问题数；
- 何时先问、先画或先假设；
- 不同 segment 的 autonomy 默认；
- Structure Diff 的真实 comprehension；
- Canvas progression 是否可理解；
- 哪些 handoff files 对三类 Agent 是必要的；
- Blueprint 是否真的减少 rework、偏航或漏约束。

这些问题只有完成本计划的真实参与者研究与 downstream execution 才能回填 Contract。
