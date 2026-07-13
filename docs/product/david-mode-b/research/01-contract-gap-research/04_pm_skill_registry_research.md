# 04 — PM Skill Registry Research（角色 B）

> 状态：Research only；用于 `01_ia_reasoning_and_agent_autonomy_contract.md` 的 Patch Proposal，不直接修改 `00`/`01`。  
> 研究日期：2026-07-10  
> 证据边界：本文把 authoritative method definition 与 David 的产品规则分开。任何 synthetic example 仅是 evaluation case，不是用户证据。

## 1. 结论摘要

1. PM Skill 应围绕“当前要做的决定”路由方法，而不是把 JTBD、Opportunity Mapping、Story Mapping、Shape Up、RICE、MoSCoW、Assumption Testing、Four Risks 和 Service Blueprint 叠成固定流水线。
2. `orient_product_situation` 只建立可继续推理的 Product Context；没有研究时，JTBD、opportunity 和 mental model 都必须标为 hypothesis。
3. `shape_mvp_scope` 决定“在给定 appetite 内，哪条端到端结果可以成立”；`prioritize_features` 决定“可比候选之间先做什么”。二者不可由同一个分数替代。
4. Story Mapping 适合检查用户活动、步骤和 release slice 是否连贯，不等于 IA，也不覆盖 backstage dependency。
5. RICE 只适合目标、时间窗和粒度可比，且 Reach/Impact/Effort 至少有可解释估计的 initiative；不得为缺数据的 feature 生成伪精确分数。
6. MoSCoW 适合固定时间窗内的 requirement commitment；`Must` 是“缺失则本次可用结果不成立、违法或不安全”，不是“很重要”。
7. Assumption Mapping 决定先验证哪个 belief；Assumption Testing 为该 belief 选择最小、可判定的证据动作。测试整个 solution 通常过慢且难以诊断。
8. Four Risks 是覆盖检查和证据缺口分类，不是四项相加的总分；每个风险必须有 owner、evidence、next test 和 decision。
9. Service Blueprint 只在体验依赖 AI、API、人工运营、support、policy 或跨渠道流程时启用；简单单机 UI 不应被强制扩展成完整 blueprint。
10. Acceptance Criteria 应引用 canonical IDs、描述可观察行为并覆盖关键规则/状态；`Given/When/Then` 是表达复杂行为示例的可选格式，不应强制应用于每条静态约束。
11. `frame_outcome` 必须把 shipping output、product outcome 与 business outcome 分离；没有 baseline/measurement 时可以输出 directional/learning outcome，但不得发明数值 target。
12. `map_opportunities` 的硬边界是 evidence honesty：只有真实且相关的 discovery source 才能支持 evidence-informed opportunity；Founder/AI/synthetic 输入只能生成 hypothesis。

## 2. 方法路由：先识别决定，再选方法

| 决策问题 | 首选方法 | 必需输入 | 输出 | 不应使用/替代方法 |
|---|---|---|---|---|
| 我们正在解决谁在何种情境下的什么进展？ | JTBD + GOV.UK user-need framing | 用户/情境/触发/期望结果，允许为 hypothesis | `ProductSituation`、`jobHypothesis`、unknowns | 不用 feature list 代替 need；无研究时不生成“validated job” |
| 我们希望工作对用户行为/结果和业务产生什么影响？ | Outcome framing | Product Situation、job/need hypothesis、baseline/business context | primary product outcome、business link hypothesis、guardrails、measurement gaps | 不把 output 或单个 feature traction 当 outcome；不发明 target |
| 当前输入是 need 还是 solution request？ | Opportunity framing | desired outcome、用户表达/证据 | outcome → opportunity hypothesis → solution request | 没有 discovery input 时不构造看似真实的完整 OST |
| 端到端用户行为和 release slice 是否连贯？ | Story Mapping | 用户活动/步骤/细节、core outcome | backbone、steps、slice、gaps | 不拿它代替 IA、service process 或 technical plan |
| 给定时间/团队约束，方案如何收缩？ | Shape Up | explicit appetite、problem、baseline、constraints | bounded slice、rabbit holes、no-gos | 没有 appetite 时不假装执行 Shape Up；不照搬 6-week cadence |
| 多个同粒度 initiative 哪个先做？ | RICE | shared goal/time horizon、reach/impact/confidence/effort estimates | ranking + uncertainty + sensitivity | 不用于 mandatory dependency、core path completeness 或混合粒度列表 |
| 固定 release 中哪些必须交付？ | MoSCoW | timeframe、viable outcome、requirements、decision owner | Must/Should/Could/Won't this time | 不把类别映射为 RICE 分数；不允许所有项都是 Must |
| 最大的不确定性在哪里？ | Assumption Mapping | solution/outcome、beliefs、evidence links | importance × evidence map | 不把 confidence 词语当证据；不把风险登记等同于测试 |
| 最小学习动作是什么？ | Assumption Testing | specific assumption、expected observation、threshold | test plan、result state、decision rule | 不测试完整产品来验证一个局部 belief；不把 synthetic result 当 observation |
| 方案是否同时处理产品成功的关键风险？ | Four Risks | candidate solution、known evidence、owners | value/usability/feasibility/viability records | 不汇总成平均总分；不由 PM 单独判断 feasibility |
| 可见体验依赖哪些不可见工作？ | Service Blueprint | specific journey、touchpoints、actors/systems | customer/frontstage/backstage/support/dependencies | 单一静态节点、无 backstage dependency 时禁用 |
| 下游 Agent 如何知道实现正确？ | Acceptance Criteria + examples | canonical node/flow/rule/state IDs | observable criteria、examples、traceability | 不写实现步骤；不把 AC 与全局 Definition of Done 混为一谈 |

## 3. 组合规则与冲突处理

### 3.1 允许的最小组合

| 组合 | 原因 | 停止条件 |
|---|---|---|
| JTBD hypothesis → Orient | 将 solution request 重写为情境中的 progress hypothesis | Product Context 足以生成第一版结构；其余进入 assumption ledger |
| Orient/JTBD → Frame Outcome → Map Opportunities | 先确定情境/进展，再用 outcome 限定 discovery space，最后组织有来源的 needs/pains/desires | primary outcome 足够清晰；opportunity 节点均有 provenance，未把 hypothesis 当 evidence |
| Story Map → Shape Up | 先看端到端 backbone，再用 appetite 切出 coherent slice | core path 完整且 Later/Excluded 不再是 MVP 的隐藏依赖 |
| RICE **或** MoSCoW | RICE 排 initiative；MoSCoW 管固定 release requirement | 当前决策得到可解释排序/分类，不继续叠加第二套分数 |
| Four Risks → Assumption Mapping → Test | 先识别风险域，再挑高重要/弱证据 belief，最后设计测试 | 得到明确 decision rule；不是把所有风险都测试一遍 |
| Wireflow → Acceptance Criteria | 用节点/状态/触发关系形成可观察行为场景 | P0 flow 的正常、异常和恢复结果可验证 |
| Service Blueprint → Feasibility/Viability review | 可见承诺依赖 AI/API/人工/政策时，暴露 backstage constraints | 关键 handoff、failure、owner、SLA/constraint 已显式化 |

### 3.2 禁止的机械叠加

- 不把 RICE 数值自动映射为 MoSCoW 类别；前者是相对排序，后者是 fixed-time commitment。
- 不用 Shape Up appetite 生成 RICE `effort`；appetite 是愿意投入的上限，不是 estimate。
- 不把 Four Risks 的四项状态平均成“风险分”；任一 Blocker 都可能单独阻断 handoff。
- 不把 Opportunity Solution Tree 的 AI 推断节点标成 customer opportunity。无真实 discovery evidence 时只能是 `opportunity_hypothesis`。
- 不把 JTBD job、product outcome、opportunity 和 solution 合并成同一个“用户需求”字段；四者分别回答 progress、期望影响、problem space 与实现方式。
- 不把 Story Map 的 backbone 当 top-level navigation；行为顺序与信息组织可能不同。
- 不为所有 flow 强制创建 Service Blueprint；只有 backstage coordination 会改变用户承诺或可交付性时才展开。
- 不把每条 AC 都改写成 Gherkin；只有状态、事件和可观察结果明确且示例能消除歧义时使用。

## 4. Skill Registry

### 4.1 `orient_product_situation`

| 字段 | 研究结论 |
|---|---|
| Purpose | 将 idea、feature request 或既有 artifact 定位为当前 product situation、decision、known/assumed/unknown/conflicting state。 |
| Trigger | 新 Bet；target user/core outcome 变化；接收 PRD/repo/prototype；后续 stage 出现根因冲突。 |
| Inputs | 必需：raw input、source provenance；可选：target user、context、platform、constraints、evidence、existing product。 |
| Method | GOV.UK discovery/user needs 为主；JTBD 只生成 circumstance-progress hypothesis；Double Diamond 只用于提醒 problem framing 可回退。 |
| Rules | 区分 need/solution；提取 hard/soft constraints；列出 active decision；缺失信息按 blocking/nonblocking 分类。 |
| Anti-patterns | 把人口属性当 job；把 founder request 当用户证据；把 orient 变成完整访谈；一开始建立完整 OST。 |
| Output schema | `ProductSituation {decision, userHypothesis, context, desiredProgress, baseline, constraints, evidence, unknowns, readiness}`。 |
| Validation | 决策、用户 hypothesis、结果、平台/约束有 provenance；blocking unknown 有 owner/fallback；不得出现 `validated` 无 evidence。 |
| Default autonomy | `APPLY_WITH_UNDO`（L1）。 |
| Ask boundary | blocking user-exclusive fact 且无安全 fallback；例如 hard no-go、首个付费方、受监管范围。 |
| Approval boundary | target user/core outcome/locked constraint 的变更必须 `PROPOSE_FOR_APPROVAL`。 |
| Sources | Christensen Institute JTBD；GOV.UK discovery/user needs；Design Council Double Diamond。 |
| Evaluation cases | 正例/反例见 `skill_cards/orient_product_situation.md` 的 `OPS-P*`/`OPS-N*`。 |

### 4.2 `build_wireflow_and_node_mini_ia`

| 字段 | 研究结论 |
|---|---|
| Purpose | 把已选 IA node 与 core flow 展开成低保真信息层级、状态、触发点和状态转换。 |
| Trigger | node 达到 wireframe gate；flow 需要页面上下文；结构变更影响 P0 node。 |
| Inputs | node/flow canonical IDs、node purpose、entry context、primary info/CTA、states、permissions、scope。 |
| Method | Node mini-IA 先于画面；NN/g wireflow 用 wireframe + flow 表示动态交互；低保真优先。 |
| Rules | 箭头必须绑定 trigger/hotspot；结果可指向同一 node 的新 state；桌面只重复变化区域；异常/反馈显式。 |
| Anti-patterns | 从 feature list 直接画 UI；每步复制全屏；缺 trigger 的箭头；把 wireflow 用于数百个静态页。 |
| Output schema | `NodeWireflow {nodeMiniIA, states[], transitions[], layoutBlocks[], unresolved[], validation}`。 |
| Validation | 所有 transition 的 source/trigger/result 存在；P0 normal/error/recovery 可达；block 引用 canonical ID。 |
| Default autonomy | `APPLY_WITH_UNDO`（L1）；草图可自动生成。 |
| Ask boundary | 业务规则、权限、不可逆动作结果仅用户知道且阻断 flow。 |
| Approval boundary | 新增/删除 required step、改变 primary CTA 或不可逆行为必须批准。 |
| Sources | NN/g Wireflows（2016）；NN/g How to Draw a Wireframe（2021）。 |
| Evaluation cases | `BWF-P*`/`BWF-N*`。 |

### 4.3 `shape_mvp_scope`

| 字段 | 研究结论 |
|---|---|
| Purpose | 在 explicit appetite 内形成可交付、端到端、可验证的 first outcome。 |
| Trigger | Candidate IA/flow 已有骨架；产品过大；用户给出时间/团队限制；scope cut 破坏路径。 |
| Inputs | appetite、team/capability constraints、problem、baseline、story-map backbone、dependencies、risks。 |
| Method | Shape Up 的 fixed time/variable scope + rabbit holes/no-gos；Story Mapping 检查 coherent slice。 |
| Rules | 先锁定 core outcome 再切 scope；每个 cut 做 flow/dependency cascade；appetite 不等于 estimate。 |
| Anti-patterns | 照搬六周；把 MVP 当最小 feature 数；砍掉 required path；用优先级分数替代产品取舍。 |
| Output schema | `MvpShape {appetite, coreOutcome, baseline, inMvp, later, noGos, rabbitHoles, dependencies, cuts, readiness}`。 |
| Validation | core outcome 端到端可达；P0 不依赖 Later/Excluded；每个 rabbit hole 有 patch/test/cut。 |
| Default autonomy | `PROPOSE_FOR_APPROVAL`（L2）。 |
| Ask boundary | appetite/硬 deadline/不可接受质量底线未知且会改变方案；不得由 David 发明承诺。 |
| Approval boundary | 移除 core-path node、改变 outcome、接受重大风险、引入外部依赖。 |
| Sources | Basecamp Shape Up；NN/g/Atlassian Story Mapping。 |
| Evaluation cases | `SMS-P*`/`SMS-N*`。 |

### 4.4 `prioritize_features`

| 字段 | 研究结论 |
|---|---|
| Purpose | 选择与当前决策匹配的排序/分类方法，并保留输入证据和不确定性。 |
| Trigger | 多个同粒度 initiative 竞争；固定 release 需要 requirement commitment；候选项有冲突。 |
| Inputs | decision type、shared objective/time horizon、candidate items、evidence、dependencies、appetite。 |
| Method | RICE 用于可比 initiative；MoSCoW 用于 fixed-time requirement；core path 先过 coherent-slice gate。 |
| Rules | 先做 eligibility check；缺估计则不算 RICE；Must 必须通过 failure test；dependency 先于 score。 |
| Anti-patterns | 混合 feature/bug/project；伪造 reach；所有项 Must；把高分当 commitment。 |
| Output schema | `PrioritizationDecision {method, eligibility, items[], rankingOrClass, sensitivity, dependencyOverrides, approval}`。 |
| Validation | 方法前提成立；输入单位/时间窗一致；score 可重算；override 有理由；未将 unknown 当 0。 |
| Default autonomy | `APPLY_WITH_UNDO`（L1）生成建议；最终 commitment 为 L2。 |
| Ask boundary | 商业目标、timeframe、Must owner、reach 数据只能由用户提供且阻断排序。 |
| Approval boundary | 最终 release commitment、Won't this time、法务/安全 Must 的降级。 |
| Sources | Intercom RICE（2018）；Agile Business Consortium MoSCoW（更新 2026）。 |
| Evaluation cases | `PF-P*`/`PF-N*`。 |

### 4.5 `map_assumptions_and_tests`

| 字段 | 研究结论 |
|---|---|
| Purpose | 把 unsupported belief 变成可测试、离散的 assumption，按重要性和 evidence weakness 排序并定义 decision rule。 |
| Trigger | high-impact inference；Four Risks 缺 evidence；candidate solution 需选择；handoff 前仍有 material unknown。 |
| Inputs | assumptions、risk domain、evidence links、cost of wrong、available test channels、constraints。 |
| Method | Strategyzer Assumption Mapping；Product Talk specific-assumption testing。 |
| Rules | belief 必须可证伪；一个 test 对准一个主要 assumption；先复用现有 evidence；先测重要且证据弱。 |
| Anti-patterns | “用户会喜欢”不可操作；测试完整 solution；把访问量当 value proof；把 AI 模拟当观察。 |
| Output schema | `AssumptionTestMap {assumptions[], priority, testPlans[], expectedObservations, thresholds, decisionRules}`。 |
| Validation | assumption 精确/离散；source/evidence 可追溯；阈值在测试前写入；结果允许 confirmed/contradicted/inconclusive。 |
| Default autonomy | `APPLY_WITH_UNDO` 创建 ledger；需要外部研究时 `RESEARCH_OR_TEST`。 |
| Ask boundary | success threshold 是用户-owned business commitment；测试涉及隐私、真实客户或费用。 |
| Approval boundary | 对外实验、生产流量、付费、用户欺骗风险或高成本 spike。 |
| Sources | Strategyzer（2020）；Product Talk（更新 2025）。 |
| Evaluation cases | `MAT-P*`/`MAT-N*`。 |

### 4.6 `assess_four_product_risks`

| 字段 | 研究结论 |
|---|---|
| Purpose | 对 candidate solution 分别识别 value、usability、feasibility、viability 的 claim、evidence、owner 和 next action。 |
| Trigger | solution candidate、scope proposal、external dependency、handoff readiness、重大变更。 |
| Inputs | solution/scope、users/customers、prototype/evidence、technical context、business/legal/security constraints。 |
| Method | SVPG Four Big Risks；按风险选择相应 fidelity/probe，不使用统一分数。 |
| Rules | 风险分别判定；PM 不替工程判断 feasibility；user adoption 与 usability 不互相证明；viability 包含 legal/security/GTM。 |
| Anti-patterns | 四项全绿但无 evidence；平均分掩盖 blocker；可构建即有价值；prototype 未测试即视为证据。 |
| Output schema | `FourRiskAssessment {solutionId, risks:{value,usability,feasibility,viability}, blockers[], overallDecision}`。 |
| Validation | 四域齐全；每域有 owner/provenance/evidence gap；blocker 不被平均；next test 与风险类型匹配。 |
| Default autonomy | `APPLY_WITH_UNDO`（L1）评估；风险接受为 L2/L3。 |
| Ask boundary | 商业/法务/安全约束、真实技术能力或付款意愿无法推断且会改变决定。 |
| Approval boundary | 接受 high risk、绕过 blocker、改变法律/隐私/支付边界。 |
| Sources | SVPG Four Big Risks（2017）；SVPG Purpose of Prototypes（2025）。 |
| Evaluation cases | `FPR-P*`/`FPR-N*`。 |

### 4.7 `map_frontstage_backstage`

| 字段 | 研究结论 |
|---|---|
| Purpose | 把特定 journey 中的 customer action、frontstage promise、backstage action、support process 和 evidence 对齐。 |
| Trigger | AI/API/人工运营/support/跨渠道依赖；前台状态无法解释；失败恢复涉及其他 actor。 |
| Inputs | specific journey、goal、customer actions、touchpoints、systems/actors、policies、dependencies、failure modes。 |
| Method | NN/g Service Blueprint key elements；Bitner/Ostrom/Morgan 的 customer-grounded dynamic service process。 |
| Rules | 一张图只对应一个 journey/goal；visibility line 明确；每个 frontstage promise 追踪 backstage dependency/failure。 |
| Anti-patterns | 用 org chart 代替 journey；customer actions 由 AI 假装研究得出；只有 lanes 没有关系；简单 UI 强制 blueprint。 |
| Output schema | `ServiceBlueprintSlice {journeyId, steps[], interactions[], dependencies[], momentsOfTruth[], failures[], owners[]}`。 |
| Validation | step 顺序、actor、visibility、dependency 完整；前台承诺无孤儿；failure 有 detection/recovery/owner。 |
| Default autonomy | `APPLY_WITH_UNDO`（L1）；外部依赖变更 L2。 |
| Ask boundary | 实际运营流程、SLA、policy、人工 owner 仅用户知道且无 fallback。 |
| Approval boundary | 新增外部 vendor/人工岗位、改变用户承诺、合规流程或数据边界。 |
| Sources | NN/g Service Blueprints（2017）；Bitner et al., CMR（2008）。 |
| Evaluation cases | `MFB-P*`/`MFB-N*`。 |

### 4.8 `define_acceptance_criteria`

| 字段 | 研究结论 |
|---|---|
| Purpose | 为 P0 node、flow、state、business rule 和 nonfunctional constraint 定义可观察、可追溯、可判定的完成条件。 |
| Trigger | node/flow 进入 handoff；scope 变更；业务规则确认；validator 发现不可验证项。 |
| Inputs | canonical IDs、actor/permission、precondition、trigger、expected outcome、error/recovery、constraints。 |
| Method | outcome-focused AC；复杂规则用 Specification by Example/Gherkin；与 Definition of Done 分离。 |
| Rules | 一条 criterion 一个主要行为/约束；Then 可观察；覆盖 negative/boundary；不绑定内部实现。 |
| Anti-patterns | “页面好看/快速”；复述 feature title；只写 happy path；检查数据库内部字段；把工程 checklist 当 AC。 |
| Output schema | `AcceptanceSet {targetRefs[], businessRules[], criteria[], scenarios[], traceability[], gaps[]}`。 |
| Validation | 每条 criterion 有 target、actor/context、observable expected、priority、verification type；P0 覆盖正常/异常/恢复。 |
| Default autonomy | routine completeness 可 `AUTO_APPLY`，草案 `APPLY_WITH_UNDO`。 |
| Ask boundary | business threshold、legal wording、money/permission rule 只有用户能承诺。 |
| Approval boundary | 用户-owned business rule、合规/支付/权限边界、改变 scope 的 AC。 |
| Sources | Scrum Alliance Acceptance Criteria；Agile Alliance Acceptance Testing；Cucumber Gherkin Reference。 |
| Evaluation cases | `DAC-P*`/`DAC-N*`。 |

### 4.9 `frame_outcome`

| 字段 | 研究结论 |
|---|---|
| Purpose | 将 Product Situation/job hypothesis 转成一个 primary product outcome，并连接 business outcome、guardrails 与 measurement readiness。 |
| Trigger | 输入是 output；Bet 有多个 competing outcomes；Opportunity/Scope/RICE 缺共同 outcome；metric 与 user success 脱节。 |
| Inputs | Bet、Orient/JTBD 输出、requested outputs、baseline、business context、measurement capability。 |
| Method | Product Talk output/outcome 与 product/business outcome 区分；GOV.UK 从 discovery 开始定义 success/data，并结合 metrics 与 research。 |
| Rules | Product outcome 表达 customer behavior/sentiment；一个 primary outcome 是 focus heuristic；无数据允许 directional/learning outcome；不发明 target/causality。 |
| Anti-patterns | shipping output 当 outcome；单一 feature usage 当 user success；同时承诺多个 outcome；无 baseline 写精确 target。 |
| Output schema | `OutcomeFrame {primaryOutcome, requestedOutputs, outcomeLinks, guardrails, measurementReadiness}`。 |
| Validation | output/outcome 分离；target/time horizon 有 source/approval；link evidence 状态诚实；measurement gap 可执行。 |
| Default autonomy | `APPLY_WITH_UNDO`（L1）；改变 confirmed primary outcome 为 L2。 |
| Ask boundary | target/time horizon/business commitment/guardrail 是 user-exclusive 且阻断。 |
| Approval boundary | 新建/替换 primary outcome、加入数值承诺、接受 guardrail trade-off。 |
| Sources | Product Talk Outcomes（2024）；GOV.UK performance data（更新 2022）；Product Talk OST（2023）。 |
| Evaluation cases | `skill_cards/frame_outcome.md` 的 `FO-P*`/`FO-N*`。 |

### 4.10 `map_opportunities`

| 字段 | 研究结论 |
|---|---|
| Purpose | 在 desired outcome 下组织有来源的 customer needs/pains/desires，选择 target opportunity，并把 solution/assumption 保持在独立层。 |
| Trigger | 已有 outcome 和 discovery source；solution jumping；新 evidence 改变 problem space；solution 失去 opportunity link。 |
| Inputs | outcome、segment、JTBD/need context、source material/type、solution requests、现有 map。 |
| Method | Product Talk Opportunity Space/OST；GOV.UK evidence-based user needs；JTBD 提供 circumstance/progress context。 |
| Rules | opportunity 不是 solution/segment/metric；每 node 有 source span/provenance；无真实 evidence 只能 `hypothesis_only`；不同 outcome/segment 分图。 |
| Anti-patterns | AI/synthetic needs 标 evidence-backed；feature 列表伪装 opportunity；反向为 solution 编 need；把 map 当 IA/nav。 |
| Output schema | `OpportunityMap {eligibility, mapStatus, opportunities[], solutionLinks[], gaps, nextAction}`。 |
| Validation | evidence-backed node 需真实 discovery source；树无 cycle；solution 与 opportunity 分层；selected target 数量受控。 |
| Default autonomy | `APPLY_WITH_UNDO`（L1）抽取/聚类；target opportunity 选择为 L2；真实 need 验证为 `RESEARCH_OR_TEST`。 |
| Ask boundary | evidence relevance/segment/strategy constraint 只有用户知道或相互冲突。 |
| Approval boundary | 选择/更换 target opportunity、删除强 evidence node、改变 core Bet/scope。 |
| Sources | Product Talk OST（2023）与 Opportunity Space（更新 2025）；GOV.UK user needs（更新 2017）；Christensen Institute JTBD。 |
| Evaluation cases | `skill_cards/map_opportunities.md` 的 `MO-P*`/`MO-N*`。 |

### 4.11 Orient / JTBD / Outcome / Opportunity / Assumption 边界

```text
orient_product_situation
  回答：当前是谁、在什么情境、要做哪个决定、有哪些约束？

frame_jtbd_and_user_intent
  回答：人在该情境中试图取得什么 progress，需要知道/做什么？

frame_outcome
  回答：这个 Bet 希望改变什么 customer behavior/result，如何与 business outcome 相连？

map_opportunities
  回答：哪些有来源的 customer needs/pains/desires 可能驱动该 outcome？

map_assumptions_and_tests
  回答：选定 opportunity/solution/decision 赖以成立的哪些 belief 最危险，如何验证？
```

禁止的字段漂移：`job != outcome != opportunity != solution != assumption`。没有真实用户研究时，job 与 opportunity 均为 hypothesis；outcome 可以是用户确认的产品 commitment，但它本身不证明 customer need；assumption test 的结果也只更新被测试的 claim。

## 5. 跨 Skill 数据契约建议

```ts
type EvidenceStrength = "none" | "weak" | "medium" | "strong";
type KnowledgeStatus = "confirmed" | "inferred" | "unknown" | "conflicting";
type BasisType =
  | "user_input"
  | "source_evidence"
  | "pattern"
  | "model_inference"
  | "synthetic_evaluation";
type LifecycleStatus = "active" | "rejected" | "locked" | "stale" | "superseded";
type Confidence = "low" | "medium" | "high";

interface ProvenanceCore {
  knowledgeStatus: KnowledgeStatus;
  basisType: BasisType;
  lifecycleStatus: LifecycleStatus;
  sourceIds: string[];
}

interface SkillInvocationRecord<TInput, TOutput> {
  invocationId: string;
  skillId: string;
  trigger: string;
  decisionToChange: string;
  input: TInput;
  methodSelected: string;
  methodEligibility: { eligible: boolean; failedPreconditions: string[] };
  output: TOutput;
  assumptions: string[];
  evidenceIds: string[];
  provenance: ProvenanceCore;
  confidence: Confidence;
  validators: Array<{ ruleId: string; status: "pass" | "warning" | "fail" }>;
  autonomyAction:
    | "AUTO_APPLY"
    | "APPLY_WITH_UNDO"
    | "PROPOSE_FOR_APPROVAL"
    | "ASK_USER"
    | "DEFER_AS_ASSUMPTION"
    | "RESEARCH_OR_TEST";
}
```

以上类型不是本文件的第二套枚举；规范源为
[`datasets/shared_contract_vocabulary.schema.json`](datasets/shared_contract_vocabulary.schema.json)。
Runtime schema/code generation 必须从该 versioned `$defs` 生成或引用类型，不能在 Skill 内重新定义不同取值。

必须由 runtime 校验的共同规则：

- `methodEligibility.eligible=false` 时不得生成该方法特有的 score/classification 作为正式结论。
- `basisType=source_evidence` 必须引用至少一个可访问 `sourceId/evidenceId`；synthetic case 必须保持 `basisType=synthetic_evaluation`，不得升级为用户证据。
- 任何 scope/flow/constraint 变更必须输出 affected canonical IDs 和 cascade validation。
- L2/L3 输出只能形成 proposal；StateReducer 在批准前不得应用。
- 对同一决策不得并列输出多个互不相容的 framework result 而没有 method selection rationale。

## 6. 评测建议

| 维度 | 评测方式 | 通过条件 |
|---|---|---|
| Method selection | synthetic routing cases + expert review | 能拒绝不满足前提的方法，并解释选择 |
| Evidence honesty | deterministic provenance validator | 无 evidence laundering；hypothesis 与 validated state 分离 |
| Scope coherence | flow/dependency graph validator + expert rubric | core outcome 可达，无 P0 → Later/Excluded hidden dependency |
| Prioritization integrity | deterministic recomputation + sensitivity check | RICE 可重算；MoSCoW Must 有 failure-test rationale |
| Test quality | expert rubric | assumption specific；observation/threshold/decision rule 预先定义 |
| Four Risks coverage | deterministic fields + domain-owner review | 四域齐全，blocker 不被总分遮蔽 |
| Service Blueprint usefulness | expert review | frontstage promise 可追踪至 backstage dependency/failure/owner |
| Acceptance Criteria quality | deterministic lint + downstream agent execution | observable、traceable、无 implementation coupling；Agent 能生成对应测试/实现 |

以上 benchmark case 均应标记 `synthetic evaluation case`，直到由真实 builder conversation、prototype test 或 downstream execution 补充外部效度。

## 7. 直接来源索引

- Christensen Institute, **Jobs to Be Done Theory**（当前页无发布日期）：https://www.christenseninstitute.org/theory/jobs-to-be-done/
- GOV.UK, **Learning about users and their needs**（2016-04-04；更新 2017-03-23）：https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs
- GOV.UK, **How the discovery phase works**（2016-08-04；更新 2021-06-21）：https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works
- Design Council, **Framework for Innovation**（当前页无发布日期；Double Diamond 于 2004 发布）：https://www.designcouncil.org.uk/resources/framework-for-innovation/
- Product Talk, **Opportunity Solution Trees**（2023-12-06）：https://www.producttalk.org/opportunity-solution-trees/
- Product Talk, **Shifting from Outputs to Outcomes**（2024-07-17）：https://www.producttalk.org/shifting-from-outputs-to-outcomes/
- Product Talk, **Opportunity Space**（更新 2025-10-25）：https://www.producttalk.org/glossary-discovery-opportunity-space/
- GOV.UK, **Using performance data to improve your service**（2016-03-23；更新 2022-04-06）：https://www.gov.uk/service-manual/measuring-success/using-data-to-improve-your-service-an-introduction
- NN/g, **Mapping User Stories in Agile**（2021-01-24）：https://www.nngroup.com/articles/user-story-mapping/
- Atlassian, **Know thy customer: agile’s essential guide to user story maps**（2016-05-23）：https://www.atlassian.com/blog/2016/05/guide-to-agile-user-story-maps
- Basecamp, **Shape Up**（2019 online book；chapter 页面无独立日期）：https://basecamp.com/shapeup
- Intercom, **RICE: Simple prioritization for product managers**（2018-01-05）：https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/
- Agile Business Consortium, **What is MoSCoW Prioritization?**（2026-05-28）：https://www.agilebusiness.org/resource/what-is-moscow-prioritization/
- Strategyzer, **How Assumptions Mapping Can Focus Your Teams...**（2020-08-04）：https://www.strategyzer.com/library/how-assumptions-mapping-can-focus-your-teams-on-running-experiments-that-matter
- Product Talk, **Assumption Testing**（更新 2025-10-25）：https://www.producttalk.org/glossary-discovery-assumption-testing/
- SVPG, **The Four Big Risks**（2017-12-04）：https://www.svpg.com/four-big-risks/
- SVPG, **The Purpose of Prototypes**（2025-09-12）：https://www.svpg.com/the-purpose-of-prototypes/
- NN/g, **Service Blueprints: Definition**（2017-08-27）：https://www.nngroup.com/articles/service-blueprints-definition/
- Bitner, Ostrom, Morgan, **Service Blueprinting: A Practical Technique for Service Innovation**（2008）：https://doi.org/10.2307/41166446
- NN/g, **Wireflows**（2016-12-04）：https://www.nngroup.com/articles/wireflows/
- NN/g, **How to Draw a Wireframe**（2021-06-20）：https://www.nngroup.com/articles/draw-wireframe-even-if-you-cant-draw/
- Scrum Alliance, **Agile Glossary: Acceptance criteria**（当前页持续更新）：https://www.scrumalliance.org/glossary
- Agile Alliance, **Acceptance Testing**（页面无明确更新日）：https://agilealliance.org/glossary/acceptance-testing/
- Cucumber, **Gherkin Reference**（持续更新文档；访问 2026-07-10）：https://cucumber.io/docs/gherkin/reference/

详细 Claim–Evidence、限制和 Patch 建议见 `sources/agent_b_pm_evidence.md`。
