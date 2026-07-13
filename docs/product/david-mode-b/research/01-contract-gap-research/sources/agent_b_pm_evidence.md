# Agent B — PM Methods Evidence

> 角色：B — PM Skill Methods  
> 日期：2026-07-10  
> 状态：Desktop research only；不包含真实用户研究、实验结果或 benchmark 成绩。

## 1. Query 与访问记录

### 1.1 实际 Query

- `site:christenseninstitute.org/theory/jobs-to-be-done Jobs to Be Done progress circumstance`
- `site:gov.uk/service-manual start by learning user needs discovery constraints`
- `site:designcouncil.org.uk Framework for Innovation Double Diamond discover define`
- `site:producttalk.org/opportunity-solution-trees outcome opportunities solutions assumption tests`
- `site:nngroup.com user story mapping backbone release slice`
- `site:basecamp.com/shapeup appetite fixed time variable scope rabbit holes no-gos`
- `site:intercom.com/blog RICE reach impact confidence effort`
- `site:agilebusiness.org MoSCoW prioritisation Minimum Usable SubseT contingency`
- `site:strategyzer.com assumption mapping importance evidence experiments`
- `site:producttalk.org assumption testing specific assumptions not whole ideas`
- `site:svpg.com four big risks value usability feasibility viability`
- `site:svpg.com purpose of prototypes fidelity product risks AI`
- `site:nngroup.com service blueprint frontstage backstage support process`
- `Service blueprinting practical technique for service innovation Bitner Ostrom Morgan 2008 DOI`
- `site:nngroup.com wireflows wireframe flow dynamic apps`
- `acceptance criteria official agile testable observable outcome`
- `site:cucumber.io/docs/gherkin/reference Given When Then observable outcome`
- `site:producttalk.org outcomes outputs product outcome customer behavior opportunity solution tree`
- `site:gov.uk/service-manual measuring success performance metrics user needs service`
- `site:producttalk.org opportunity space customer needs pain points desires do not make up opportunities`

### 1.2 工具限制

- `agent-reach doctor --json`：失败，当前环境没有 `agent-reach` wrapper（`command not found`）。
- `agent-reach check-update`：同因失败，无法检查 Agent Reach 新版本。
- `mcporter call exa.web_search_exa(...)`：失败，当前 `mcporter` 没有配置 `exa` server（`Unknown MCP server 'exa'`）。
- Jina Reader：对第一批官方 URL 连续超时，已停止，避免把空响应当证据。
- 降级路径：使用网页检索定位并直接打开方法作者、官方机构、原始论文页面；未使用 SEO 聚合文作为证据。
- Practitioner evidence：本角色的方法定义不需要社区帖子；为避免把单个帖子外推为规律，本轮未把 Reddit/HN 当 claim 支撑。

## 2. Claim–Evidence

### PM-01 — Orient 必须先理解问题、用户情境和约束，而不是接受预设 solution

- **Claim：** `orient_product_situation` 应把 solution request 重新定位为 user/context/problem/constraint/outcome；但在没有真实研究时只能形成 hypothesis。
- **Source title：** *How the discovery phase works*
- **Source type：** Authoritative government service manual
- **URL：** https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works
- **Publication / update date：** 2016-08-04 / 2021-06-21
- **Exact supported point：** 在承诺 build 前应理解用户试图完成什么、技术/法律/流程约束；遇到预设 solution 要重构为 problem，并明确不在问题范围内的内容。
- **Limitations：** 面向 UK government service，团队角色和 discovery 周期不能直接照搬到 AI indie builder。
- **David implication：** Orient 输出必须含 `requestedSolution`、`problemHypothesis`、`userContext`、`hardConstraints`、`softConstraints`、`unknowns`；不得把 feature request 标成 confirmed need。
- **Agent behavior rule：** 先生成可撤销 Product Context，再只问 blocking user-exclusive fact。
- **Data / schema implication：** 所有 context 字段带 provenance；constraint 带 `hard|soft` 与 owner。
- **Validation / evaluation：** 当输入是“做一个 dashboard”时，能分离 requested solution 与 desired progress。
- **Confidence：** High（方法定义直接；对 David 的交互阈值仍需用户研究）。

### PM-02 — JTBD 关注特定情境中的 progress，并包含 functional/social/emotional dimensions

- **Claim：** JTBD 可用于 frame job hypothesis，不可由 demographic 或 feature list 直接推出 validated job。
- **Source title：** *Jobs to Be Done Theory*
- **Source type：** Primary method institute / authoritative
- **URL：** https://www.christenseninstitute.org/theory/jobs-to-be-done/
- **Publication / update date：** 页面无明确日期；访问 2026-07-10
- **Exact supported point：** JTBD 关注推动决策的 circumstances/forces 和人们寻求的 progress；job 含 functional、social、emotional 维度，并通过故事发现共同情境。
- **Limitations：** 页面是方法介绍和案例，不证明将 JTBD 自动化后能提高 IA 质量。
- **David implication：** 只生成 `jobHypothesis {circumstance, desiredProgress, dimensions, cues, evidenceIds}`；没有 interview evidence 时 provenance 为 `inferred`。
- **Agent behavior rule：** 不问“想要哪些功能”来代替 job framing；不把 persona 属性写成 job。
- **Data / schema implication：** `jobHypothesis` 与 `validatedJob` 状态分离。
- **Validation / evaluation：** synthetic cases 检查 job 是否含 circumstance + progress，而非产品动作。
- **Confidence：** High（定义）；Medium（对 David 的自动提取质量）。

### PM-03 — Opportunity Solution Tree 需要真实 discovery inputs，不能凭 AI 编造 opportunity

- **Claim：** David 在没有 customer interviews/evidence 时不得生成声称真实的 OST；最多输出 `opportunity_hypothesis`。
- **Source title：** *Opportunity Solution Trees: Visualize Your Discovery to Stay Aligned and Drive Outcomes*
- **Source type：** Primary method-author source
- **URL：** https://www.producttalk.org/opportunity-solution-trees/
- **Publication / update date：** 2023-12-06
- **Exact supported point：** OST 结构是 desired outcome → opportunity space（customer needs/pain/desires）→ solutions → assumption tests；作者列出 target/value proposition、clear outcome、3–4 次 story-based interviews 为 prerequisites，并明确不要从零编造 opportunities。
- **Limitations：** “3–4 interviews”是作者方法建议，不是适用于所有领域的统计阈值；David Mode B 当前不承诺真实证据系统。
- **David implication：** 未满足 prerequisites 时，method router 禁止 `validated_opportunity_map`，只允许 founder-stated/inferred hypothesis 并建议研究。
- **Agent behavior rule：** 若用户给的是 solution idea，先保留 solution，再生成小范围 need hypothesis；不铺满一棵假树。
- **Data / schema implication：** opportunity node 必须带 `sourceType`、`evidenceIds`、`status`。
- **Validation / evaluation：** deterministic rule 拒绝 `evidence_backed` opportunity 缺 evidence ID。
- **Confidence：** High。

### PM-04 — Story Mapping 用用户活动骨架和纵向细节保持整体上下文，并支持端到端 release slicing

- **Claim：** Scope cut 应先依据 Story Map 检查 core journey，而不是按孤立 feature 排名逐项删除。
- **Source A：** NN/g, *Mapping User Stories in Agile*；Professional authoritative；https://www.nngroup.com/articles/user-story-mapping/；2021-01-24。
- **Source B：** Atlassian, *Know thy customer: agile’s essential guide to user story maps*；High-quality professional/official；https://www.atlassian.com/blog/2016/05/guide-to-agile-user-story-maps；2016-05-23。
- **Exact supported point：** Story map 以 activities/steps/details 表达预期用户行为，细节在步骤下按优先级排列；release 通过横向切片表达，保留客户 flow 和整体视角。
- **Limitations：** 两者是实践指导，不是比较实验；Story Map 表达 expected flow，不证明真实行为，也不定义 IA 或 backstage process。
- **David implication：** `shape_mvp_scope` 在每次 cut 后检查 backbone 每个必要活动是否仍有可交付 step。
- **Agent behavior rule：** 如果 cut 破坏 core outcome，阻断直接应用并提出最小 repair options。
- **Data / schema implication：** scope item 引用 activity/step/flow IDs；slice 有 `coreOutcome`。
- **Validation / evaluation：** 图验证 P0 flow 无跨越 Later/Excluded 的 required edge。
- **Confidence：** High（方法结构）；Medium（具体 David slice 质量需 benchmark）。

### PM-05 — Shape Up 以 appetite 作为 creative constraint，采用 fixed time / variable scope

- **Claim：** `shape_mvp_scope` 必须由 explicit appetite 驱动；appetite 是愿意投入的边界，不是对既定方案的 estimate。
- **Source title：** Basecamp, *Shape Up — Set Boundaries*
- **Source type：** Primary method book
- **URL：** https://basecamp.com/shapeup/1.2-chapter-03
- **Publication / update date：** 2019 online book；章节无独立日期；访问 2026-07-10
- **Exact supported point：** appetite 是标准团队的 time budget；“fixed time, variable scope”；appetite 从时间边界推导设计，而 estimate 从设计推导数字；大问题应收窄或切出 meaningful part。
- **Limitations：** Basecamp 的 1–2/6-week batch 与团队结构是组织特定实践，不可当 David 默认。
- **David implication：** schema 区分 `appetite` 与 `effortEstimate`；缺 appetite 时只能输出 scope options，不得声称 shaped-to-fit。
- **Agent behavior rule：** 不复制 6-week cadence；问用户或从明确约束读取 appetite。
- **Data / schema implication：** `appetite {value, unit, teamContext, source, confirmed}`。
- **Validation / evaluation：** 若 appetite 未确认，`shapeStatus` 不得为 `bounded_confirmed`。
- **Confidence：** High。

### PM-06 — Rabbit holes 与 no-gos 必须在 commitment 前显式化

- **Claim：** MVP shape 必须记录潜在技术/设计/依赖 rabbit holes、patch/test/cut 以及 out-of-bounds/no-gos。
- **Source A：** Basecamp, *Risks and Rabbit Holes*；Primary method book；https://basecamp.com/shapeup/1.4-chapter-05；2019 online book。
- **Source B：** Basecamp, *Write the Pitch*；Primary method book；https://basecamp.com/shapeup/1.5-chapter-06；2019 online book。
- **Exact supported point：** 未解决的技术未知、设计问题和 interdependency 会放大交付尾部风险；应慢速走查 use case、明确 out-of-bounds，并在 pitch 写入 rabbit holes/no-gos。
- **Limitations：** 风险分布描述为实践模型，来源未提供普适量化数据。
- **David implication：** 每个 rabbit hole 带 `impact`、`evidenceGap`、`response=patch|test|cut|accept`；no-go 进入 locked constraint。
- **Agent behavior rule：** 不把“工程师之后解决”当风险处理。
- **Data / schema implication：** scope output 中必须有 `rabbitHoles[]`、`noGos[]`。
- **Validation / evaluation：** 重大外部依赖无 response 时 handoff warning/blocker。
- **Confidence：** High（方法规则）；Medium（severity 需校准）。

### PM-07 — RICE 是可比 project ideas 的相对排序工具，输入必须有共同时间窗和证据诚实度

- **Claim：** RICE 只应用于同目标、同时间窗、相近粒度的候选 initiative；不得用伪造数字制造精确排名。
- **Source title：** Intercom, *RICE: Simple prioritization for product managers*
- **Source type：** Primary method-origin source
- **URL：** https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/
- **Publication / update date：** 2018-01-05
- **Exact supported point：** RICE 由 Reach、Impact、Confidence、Effort 构成；Reach 需指定时间窗且尽量使用 product metrics；Confidence 用于压低缺证据估计；Effort 计算跨团队 person-months，结果比较 impact per time worked。
- **Limitations：** Impact/Confidence scales 是 Intercom 的经验性标尺，文章本身承认 Impact 难以精确；未证明分数跨公司可比较。
- **David implication：** 先做 eligibility check；每个因子保留 unit/source/rationale；缺失值为 `unknown`，不得填 0 或 model guess。
- **Agent behavior rule：** mandatory dependency/core-path item 不参加普通 RICE 排名；先做 constraint gate。
- **Data / schema implication：** `riceInputs` 每项含 `value, unit, timeHorizon, sourceIds, confidence`。
- **Validation / evaluation：** score 可重算；不同 time horizon/granularity 输入触发 fail。
- **Confidence：** High（方法定义）；Medium（排序效果需真实决策回顾）。

### PM-08 — MoSCoW 的 Must 是最低可用结果的必要条件，Won't 是“本次不做”

- **Claim：** `Must` 不等于“很重要”；如存在可用 workaround，通常应是 Should/Could。所有项都是 Must 表明缺少拆分或 contingency。
- **Source title：** Agile Business Consortium, *What is MoSCoW Prioritization?*
- **Source type：** Authoritative method steward
- **URL：** https://www.agilebusiness.org/resource/what-is-moscow-prioritization/
- **Publication / update date：** 2026-05-28
- **Exact supported point：** Must 构成 Minimum Usable SubseT；缺失则交付无意义、不合法、不安全或不可行；有 workaround 则不是 Must；Won't Have this time 用于明确当前范围；Must 依赖不能落在低优先级项上。
- **Limitations：** 60% Must/20% Could 是 DSDM typical-project guideline，不应写成 David 普适科学阈值。
- **David implication：** `Must` 需要 `failureIfAbsent` 与 `dependencyCheck`；百分比只作为可配置 warning，不作硬 invariant。
- **Agent behavior rule：** 用户将所有项标 Must 时，先建议 decomposition 并请求 commitment owner 确认。
- **Data / schema implication：** `moscowClass` 带 timeframe、rationale、workaround、owner。
- **Validation / evaluation：** Must → Should/Could dependency 为 blocker；Won't 文案必须含 `thisTimeframe`。
- **Confidence：** High。

### PM-09 — Assumption Mapping 优先“高重要、弱证据”的 testable hypothesis

- **Claim：** Assumption 需要 precise/discrete/testable，并按 importance 与 evidence 排序，而非按团队声量。
- **Source title：** Strategyzer, *How Assumptions Mapping Can Focus Your Teams On Running Experiments That Matter*
- **Source type：** Primary method-author / authoritative professional
- **URL：** https://www.strategyzer.com/library/how-assumptions-mapping-can-focus-your-teams-on-running-experiments-that-matter
- **Publication / update date：** 2020-08-04
- **Exact supported point：** Assumptions Mapping 显式化 desirability/feasibility/viability/adaptability hypotheses；x 轴为 evidence、y 轴为 importance；优先 critical but weak-evidence quadrant；hypothesis 应 testable、precise、discrete。
- **Limitations：** 2×2 依赖团队判断，未给出跨团队一致性或 outcome effect 数据。
- **David implication：** 不输出伪精确乘法 score；保留 ordinal rank、rationale、evidence links、cost of wrong。
- **Agent behavior rule：** 先检查已有 evidence，再设计新 test。
- **Data / schema implication：** assumption 含 `importance`, `evidenceStrength`, `costOfWrong`, `priorityRationale`。
- **Validation / evaluation：** vague belief 不能进入 `ready_to_test`。
- **Confidence：** High（方法）；Medium（自动排序一致性）。

### PM-10 — Assumption Testing 应测试具体 belief，而不是完整 idea

- **Claim：** 每个 test 应针对 specific assumption，预先声明 expected observation 和 decision rule。
- **Source title：** Product Talk, *Assumption Testing*
- **Source type：** Primary method-author glossary
- **URL：** https://www.producttalk.org/glossary-discovery-assumption-testing/
- **Publication / update date：** Last updated 2025-10-25
- **Exact supported point：** Assumption testing 是评估 underlying assumptions 风险的结构化活动；应测试 specific assumptions 而非完整 idea；类别包括 prototype test、one-question survey、data mining、research spike；越具体越容易测试。
- **Limitations：** 页面没有为不同 assumption 提供统计样本量/阈值；实验选择效果需领域校准。
- **David implication：** `TestPlan` 必须关联一个 primary assumption，并允许 `inconclusive`；测试结果不自动升级所有相关 claim。
- **Agent behavior rule：** 选择最小能改变决定的 test；涉及真实用户/生产流量时需批准。
- **Data / schema implication：** `expectedObservation`, `threshold`, `decisionIfSupported`, `decisionIfContradicted`, `inconclusiveNext`。
- **Validation / evaluation：** test 与 assumption/risk domain 可追溯；阈值在 result 之前创建。
- **Confidence：** High。

### PM-11 — Four Risks 必须分开评估，且由相应专业角色参与

- **Claim：** value、usability、feasibility、viability 任一都可能阻断方案；不可平均；PM 不应独自裁定 feasibility。
- **Source title：** SVPG, *The Four Big Risks*
- **Source type：** Primary framework-author source
- **URL：** https://www.svpg.com/four-big-risks/
- **Publication / update date：** 2017-12-04
- **Exact supported point：** 明确定义四类风险；viability 包含 GTM、partner contract、legal、acquisition cost、monetization、brand；Product、Design、Engineering 分别承担相应责任，并强调尽早、协作处理风险。
- **Limitations：** SVPG 是专业方法来源，不是随机对照研究；角色分工不完全适配 solo builder。
- **David implication：** solo builder 场景仍保留 `ownerRole`，可由同一人承担但不能省略所需证据类型。
- **Agent behavior rule：** 不因 prototype 可用就判 value true，不因能 build 就判 viability true。
- **Data / schema implication：** 四个独立 risk record，允许任一 `blocker`。
- **Validation / evaluation：** overall decision 必须由最严重 unresolved risk 约束，禁止平均分。
- **Confidence：** High。

### PM-12 — Prototype fidelity 必须随要验证的风险变化

- **Claim：** `assess_four_product_risks` 不应要求所有风险使用同一高保真 prototype；test artifact 只需达到该风险的 sufficient fidelity。
- **Source title：** SVPG, *The Purpose of Prototypes*
- **Source type：** Authoritative professional; recent AI-product context
- **URL：** https://www.svpg.com/the-purpose-of-prototypes/
- **Publication / update date：** 2025-09-12
- **Exact supported point：** 原型的主要目的为发现值得构建的 solution；visual/behavioral/data fidelity 应随 value/usability/feasibility/viability 和 stakeholder 改变；未经测试的 prototype 只是沟通 artifact，不能证明产品成功。
- **Limitations：** 文章是专家实践观点，未量化“just enough fidelity”；作者也说明 AI 产品有额外测试层次但未在该文展开。
- **David implication：** 每个 `riskTest` 记录 required fidelity dimensions 和为何足够；AI workflow 另加 quality/safety/reliability validators。
- **Agent behavior rule：** 不把生成的 wireframe/prototype 本身计作 evidence。
- **Data / schema implication：** `artifactFidelity {visual, behavioral, data}` + `targetRisk`。
- **Validation / evaluation：** test artifact 与 target risk 的 fidelity 匹配由 expert rubric 校准。
- **Confidence：** Medium-High。

### PM-13 — Service Blueprint 对齐一个具体 journey，并显式区分 customer/frontstage/backstage/support

- **Claim：** 只有当体验依赖不可见流程或多 actor coordination 时才启用 service blueprint；每张图聚焦一个 journey/goal。
- **Source A：** NN/g, *Service Blueprints: Definition*；Authoritative UX professional；https://www.nngroup.com/articles/service-blueprints-definition/；2017-08-27。
- **Source B：** Bitner, Ostrom, Morgan, *Service Blueprinting: A Practical Technique for Service Innovation*；Original peer-reviewed paper；https://doi.org/10.2307/41166446；2008。
- **Exact supported point：** Service Blueprint 以 customer experience 为基准，表示与 touchpoints 相关的人、evidence、process；NN/g 定义 customer actions、frontstage、backstage、support processes、visibility/interaction lines，并说明适用于复杂、omnichannel、crossfunctional service。
- **Limitations：** 经典方法早于现代 AI agent；对 probabilistic AI 的 model evaluation、fallback、human escalation 需扩展。
- **David implication：** AI/API 场景增加 `modelOrService`, `failureDetection`, `fallback`, `humanEscalation`, `dataBoundary`，但保留经典层次。
- **Agent behavior rule：** 没有实际运营证据时，customer/backstage lane 标 hypothesis；不生成虚构 SLA。
- **Data / schema implication：** 每个 frontstage promise 必须有 dependency edge 或明确 `none`。
- **Validation / evaluation：** orphan promise、无 owner failure、跨 visibility line 丢失 handoff 触发 warning/blocker。
- **Confidence：** High（结构）；Medium（AI 扩展需实测）。

### PM-14 — Wireflow 适合动态 app workflow，必须绑定 trigger 与 resulting state

- **Claim：** Node wireflow 应把低保真页面上下文和 transition 合并；箭头必须指明触发 hotspot，结果可以是同一页面的新 state。
- **Source A：** NN/g, *Wireflows: A UX Deliverable for Workflows and Apps*；Authoritative UX professional；https://www.nngroup.com/articles/wireflows/；2016-12-04。
- **Source B：** NN/g, *How to Draw a Wireframe (Even if You Can’t Draw)*；Authoritative UX professional；https://www.nngroup.com/articles/draw-wireframe-even-if-you-cant-draw/；2021-06-20。
- **Exact supported point：** Wireflow 结合 wireframe layout 与 simplified flowchart；特别适合少量页面、动态变化的 mobile/desktop/web app；trigger hotspot 和结果反馈需清晰；wireframe 可表达 layout、information hierarchy、function、interaction/path。
- **Limitations：** 来源是 UX deliverable 指导，未规定 David 的 canonical node schema；对大型静态网站明确适配较差。
- **David implication：** transition 结构必须有 sourceStateId/triggerId/resultStateId；桌面 flow 只呈现变化区域以控制画布密度。
- **Agent behavior rule：** 从 node purpose/mini-IA 生成，不从 vague feature list 直接画 screen。
- **Data / schema implication：** states 和 transitions 独立于 visual coordinates，保持 canonical references。
- **Validation / evaluation：** transition endpoint/hotspot 完整性可 deterministic 检查；layout clarity 用 expert rubric。
- **Confidence：** High。

### PM-15 — Acceptance Criteria 必须清晰、可测试、面向期望结果，并与 Definition of Done 分离

- **Claim：** `define_acceptance_criteria` 应描述 item-specific observable result；全局工程质量标准属于 Definition of Done。
- **Source A：** Scrum Alliance, *Agile Glossary — Acceptance criteria*；Authoritative professional body；https://www.scrumalliance.org/glossary；持续更新，访问 2026-07-10。
- **Source B：** Agile Alliance, *Acceptance Testing*；Authoritative professional body；https://agilealliance.org/glossary/acceptance-testing/；页面无明确更新日，访问 2026-07-10。
- **Exact supported point：** Scrum Alliance 将 AC 定义为 clear/concise/testable、聚焦 desired outcome 而非 implementation；Agile Alliance 将 acceptance test 视为以 example/usage scenario 表达行为的 pass/fail contract，并警告 implementation-coupled tests 难以被 domain expert 理解且脆弱。
- **Limitations：** Acceptance criteria 与 acceptance tests 不是完全相同对象；来源提供原则但不保证每条 AC 都应自动化。
- **David implication：** schema 区分 `criterion` 与 `verification`; 允许 manual review、automated test、user test、policy review；DoD 引用外部 handoff policy。
- **Agent behavior rule：** 以 canonical target + context/trigger + observable expected outcome 写 AC，不指定内部 class/table/algorithm。
- **Data / schema implication：** 每条 AC 有 `targetRefs`, `verificationType`, `priority`, `provenance`。
- **Validation / evaluation：** lint vague adjective、缺 expected outcome、implementation-only wording。
- **Confidence：** High。

### PM-16 — Given/When/Then 是复杂行为示例的可执行表达，不是所有 AC 的强制模板

- **Claim：** 对状态/事件/结果型规则可使用 Gherkin；`Then` 应检查用户或外部系统可观察结果。
- **Source title：** Cucumber, *Gherkin Reference*
- **Source type：** Official tool/specification documentation
- **URL：** https://cucumber.io/docs/gherkin/reference/
- **Publication / update date：** 持续更新；访问 2026-07-10
- **Exact supported point：** Example/Scenario 以 Given（初始 context）、When（event/action）、Then（expected outcome）表达；Then 应断言 observable output，而不是数据库内部状态；Rule 聚合说明同一 business rule 的 examples。
- **Limitations：** Gherkin 是 executable specification 语法，不代表任何产品都应采用 Cucumber，也不覆盖视觉质量、探索性测试或非场景型静态约束。
- **David implication：** 仅当 example 能消除歧义时生成 `scenario`; 静态阈值/可访问性约束可用 declarative criterion。
- **Agent behavior rule：** 禁止为了形式把一句简单 criterion 展开成冗长 scenario。
- **Data / schema implication：** `criterion.format = declarative|gherkin`，两者共享 target/provenance/verification。
- **Validation / evaluation：** Gherkin scenario 必须有 observable Then；简单 criterion 不因非 Gherkin 失败。
- **Confidence：** High。

### PM-17 — Product outcome 是 output 对 customer/business 的影响，不是 shipping 或单一 feature traction

- **Claim：** `frame_outcome` 必须区分 requested output、product outcome 与 business outcome；无 measurement capability 时可保留 directional/learning outcome，不得发明 target。
- **Source A：** Product Talk, *Shifting from Outputs to Outcomes: Why It Matters and How to Get Started*；Primary method-author；https://www.producttalk.org/shifting-from-outputs-to-outcomes/；2024-07-17。
- **Source B：** GOV.UK, *Using performance data to improve your service: an introduction*；Authoritative government manual；https://www.gov.uk/service-manual/measuring-success/using-data-to-improve-your-service-an-introduction；2016-03-23，更新 2022-04-06。
- **Exact supported point：** Product Talk 将 output 定义为 build/produce 的东西，将 outcome 定义为对 customer/business 的 impact；product outcome 通常是 customer behavior/sentiment，并警告单 feature traction 可能激励错误行为；GOV.UK 要求从 discovery 开始定义 objectives/metrics/data，并将 performance data 与 user research 结合解释。
- **Limitations：** Product Talk 的“一团队一个 outcome”“持续 2–3 quarters”是作者实践建议，不是 David 固定阈值；GOV.UK 的 mandatory KPIs 只适用于政府服务。
- **David implication：** Schema 分离 `requestedOutputs`、`primaryOutcome`、`outcomeLinks`、`guardrails`、`measurementReadiness`；一个 primary outcome 仅作为 focus heuristic。
- **Agent behavior rule：** 不把“发布 dashboard/AI chat”写成 outcome；没有 baseline 不生成提升百分比；不把相关性写成因果。
- **Data / schema implication：** target/time horizon 必须有 source/approval；product→business link 显式标 hypothesis/evidence-backed。
- **Validation / evaluation：** lint output-like wording；真实用户研究验证 metric 是否代表 success；downstream review 检查 outcome 是否约束 scope。
- **Confidence：** High（定义/边界）；Medium（具体 metric 的有效性）。

### PM-18 — Opportunity space 只能由有来源的 needs/pains/desires 构成，AI/Founder 输入不能冒充用户证据

- **Claim：** `map_opportunities` 需要 outcome 与相关 discovery sources；没有真实 evidence 时只能返回 `hypothesis_only`。
- **Source A：** Product Talk, *Opportunity Solution Trees*；Primary method-author；https://www.producttalk.org/opportunity-solution-trees/；2023-12-06。
- **Source B：** Product Talk, *Opportunity Space*；Primary method-author glossary；https://www.producttalk.org/glossary-discovery-opportunity-space/；更新 2025-10-25。
- **Source C：** GOV.UK, *Learning about users and their needs*；Authoritative government manual；https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs；2016-04-04，更新 2017-03-23。
- **Exact supported point：** Opportunity space 是能驱动 outcome 的 customer needs/pain points/desires，位于 outcome 与 solution 之间，并随持续访谈演化；Product Talk 要求清晰 outcome、target/value theory 和真实 story interviews，明确不要编造 opportunities；GOV.UK 要求 user need 基于 research、聚焦 problem 而非 solution，非用户意见应作为待验证 assumption。
- **Limitations：** Product Talk 的 3–4 interviews 是方法建议而非统计阈值；两个 Product Talk 页面属于同一方法体系，不是独立效果验证；GOV.UK 为公共服务语境。
- **David implication：** 每个 opportunity node 必须带 source span/type/provenance；Founder/AI/synthetic 只能支持 `inferred/hypothesis`；solution 与 assumption 使用独立关系。
- **Agent behavior rule：** 不把 feature/segment/metric 放进 opportunity lane；不把 map 直接变成 IA/navigation。
- **Data / schema implication：** `mapStatus`, `eligibility.hasRelevantDiscoveryEvidence`, `sourceType`, `solutionLinks`, `targetStatus` 为必需字段。
- **Validation / evaluation：** deterministic rule 阻止 synthetic-only map 标 evidence-informed；expert review 检查 opportunity/solution 边界；真实研究验证存在性/频率/严重度。
- **Confidence：** High。

## 3. 方法冲突与边界

| 冲突/误用 | 研究判断 | David 规则 |
|---|---|---|
| JTBD vs User Story | JTBD 定位 circumstance/progress；User Story 是局部 deliverable 表达 | Orient 保留 job hypothesis；AC/Story 不得反向“证明”job |
| Output vs Outcome | output 是产物；outcome 是对 customer/business 的影响 | `frame_outcome` 分字段保存，不把 shipping/feature traction 当 primary outcome |
| Job vs Outcome vs Opportunity | job 是情境中的 progress；outcome 是 Bet 希望造成的影响；opportunity 是可能驱动 outcome 的 customer problem space | 三类对象使用独立 IDs/provenance，禁止字段漂移 |
| OST vs AI hypothesis | OST 作者明确依赖访谈输入 | 无真实 evidence 时不生成 validated opportunity tree |
| Story Map vs IA | Story Map 按活动/步骤；IA 按信息/对象/能力组织 | backbone 只用于 flow/scope check，不自动变 top-level nav |
| Shape Up vs estimate | appetite 是投入上限，estimate 是方案成本判断 | 两字段分离；不可互相填充 |
| Shape Up vs RICE | 前者塑形单个 bet，后者比较多个 candidate projects | 先决定“比较哪个 bet”或“塑形哪个 bet”，不双重打分 |
| RICE vs MoSCoW | 相对排序 vs fixed-time commitment | 由 decision type 选择其一；不做自动映射 |
| MoSCoW vs core flow | Must 分类仍可能漏掉端到端路径 | 任何分类前先过 dependency/coherent-slice gate |
| Assumption Mapping vs Four Risks | 风险 taxonomy 决定看哪里；mapping 决定先测哪个 belief | Four Risks 不重复生成测试；把 gap 传给 assumption skill |
| Service Blueprint vs Wireflow | backstage service delivery vs onscreen interaction flow | 同一 canonical flow 可有两个 projection，但不合并 lane/state 概念 |
| AC vs DoD | item-specific expected behavior vs shared quality standard | 分开存储和引用；不把 build/lint checklist 复制到每条 AC |

## 4. 对 `01` 的 Patch 建议

### Must patch before implementation

1. 在 Section 18.3 增加 `Method Eligibility Gate`：方法前提不满足时，skill 必须返回 `not_applicable`/`insufficient_input`，不得硬套框架。
2. 在 Section 18.2 补齐 `frame_outcome` 的完整 contract：分离 output/product outcome/business outcome，允许 directional/learning 状态，数值 target/time horizon 必须有来源与批准。
3. 将 `map_opportunities` 的规则改为：没有真实 discovery evidence 时只允许 `opportunity_hypothesis`；明确引用 Product Talk 的 prerequisites 与 no-made-up-opportunities 限制。
4. 在 `shape_mvp_scope` 区分 `appetite` 与 `effortEstimate`；禁止默认照搬 6-week cycle。
5. 在 `prioritize_features` 增加 RICE eligibility：shared goal、time horizon、granularity、可解释 inputs；mandatory dependencies 先过 constraint gate。
6. MoSCoW `Must` 增加 failure-if-absent 和 dependency validator；60/20 仅为可配置 heuristic，不是 hard invariant。
7. Four Risks 移除任何未来“总分”可能性；四个独立状态中任一 blocker 可阻断 handoff。
8. `map_frontstage_backstage` 增加禁用条件及 AI extension：model/API failure、fallback、human escalation、data boundary。
9. Acceptance Criteria 明确与 Definition of Done 分离；Gherkin 仅为可选 format；Then 必须 external-observable。

### Should patch after prototype / benchmark testing

- `orient_product_situation` 的最小 sufficient context gate；目前只能给字段，不能证明何时“问够了”。
- Scope coherence 的 severity：哪些 missing alternate/error states 是 Blocker，需 Gold Cases 校准。
- RICE sensitivity warning 阈值、MoSCoW Must 比例 warning、assumption priority tie-break 均应先作为 provisional heuristic。
- Service Blueprint 在何种 dependency 数量/复杂度触发，需用 builder case 测试，不能凭桌面研究定阈值。

### Keep as provisional heuristic

- “先输出第一版结构再问”的交互节奏；PM 方法来源支持早期外化，但不支持具体 question count。
- 每张 card 的 default autonomy；需与角色 C 的 Autonomy Case Library 联合校准。
- “至少三个正例/反例”是 benchmark coverage 规则，不是方法效果证据。

## 5. 必须由真实研究/实验回答的部分

1. AI indie builder 是否理解 `appetite`，更偏好时间、天数、token/成本还是“可接受复杂度”表达。
2. 用户是否愿意让 David 自动产生 JTBD/job hypothesis，哪些措辞会被误解为真实 research conclusion。
3. RICE 输入缺失时，用户更信任 qualitative ranking 还是区间/敏感性展示。
4. 用户如何区分 `Must` 与“我很想要”；failure-test prompt 是否降低 everything-is-Must。
5. Four Risks 分栏是否帮助 solo builder 发现 blind spot，还是增加认知负担。
6. AI/API 产品的 Service Blueprint 最小有用层次：只显示 dependency/failure，还是需要完整 frontstage/backstage lanes。
7. Wireflow 的节点密度、异常分支数量和桌面局部截图策略是否可读。
8. 下游 Codex/Cursor/Claude Code 对 declarative AC 与 Gherkin 的理解/执行差异。
9. 自动生成 AC 的误报、漏报和 implementation coupling；需 downstream execution test。
10. 所有 synthetic evaluation case 只验证 contract consistency，不代表真实用户 success 或 adoption。
11. Product outcome metric 是否真是 user success/business result 的 leading indicator，以及 builder 是否理解 directional/learning outcome。
12. Opportunity hypothesis/provenance 的视觉和措辞是否足以阻止用户把 AI 推断误认为真实 customer research。
