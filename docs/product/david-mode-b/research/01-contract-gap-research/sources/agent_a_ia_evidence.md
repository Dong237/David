# Agent A — IA & UX Foundations Evidence

> 角色：A — IA & UX Foundations  
> 研究类型：Desktop research；不包含真实用户研究结果  
> 访问日期：2026-07-10  
> 规范优先级：`01_ia_reasoning_and_agent_autonomy_contract.md` > `00_david_mode_b_positioning_and_principles.md` > 其他资料

## 1. Scope 与证据边界

本文件覆盖 IA、Mental Model、Taxonomy、Labeling、Navigation、Card Sorting、Tree Testing、User Flow 与 Wireflow。方法来源能支持专业规则、方法选择和反模式，但不能证明 David 的目标用户采用某个具体分组、标签、导航或流程。所有 AI 生成案例仅是 `synthetic evaluation case`，不得标记为用户证据。

## 2. Queries 与检索记录

### 2.1 Seed Queries

1. `site:nngroup.com information architecture mental models card sorting tree testing taxonomy information scent labels`
2. `site:nngroup.com user flows wireflows story mapping navigation local navigation information architecture`
3. `site:gov.uk/service-manual user needs navigation labels card sorting tree testing information architecture`
4. `site:christenseninstitute.org jobs to be done theory circumstance progress user intent`
5. `information architecture taxonomy card sorting tree testing authoritative UX case study`
6. `site:nngroup.com flat deep hierarchy polyhierarchy 3 click rule progressive disclosure`
7. `site:nngroup.com better link labels information scent common IA mistakes`
8. `site:nngroup.com user journeys vs user flows wireflows user story mapping`

### 2.2 Route 与失败限制

| 步骤 | 结果 | 限制与处理 |
|---|---|---|
| `agent-reach doctor --json` | 失败：`agent-reach: command not found` | 无法取得 channel/backend 体检信息；记录为环境限制，不假设后端可用 |
| Agent Reach / Exa：`mcporter call 'exa.web_search_exa(...)'` | 失败：`Unknown MCP server 'exa'` | Exa 未配置；未使用搜索摘要作为证据 |
| Jina Reader：`r.jina.ai/<official URL>` | 多页超时，未得到可核验正文 | 不据此下结论，转读官方网页 |
| 官方/权威网页直接读取 | 成功 | 下表仅记录实际读到正文、日期和方法边界的来源 |
| Practitioner platforms | 未纳入关键 Claim | 本角色研究稳定 IA 方法；真实行为、频率与偏好留给角色 D 和真实用户研究，不以单帖推导普遍规律 |

## 3. Source Registry

| ID | Source title | Source type | URL | Publication / update date | Exact supported point | Limitations | David implication | Confidence |
|---|---|---|---|---|---|---|---|---|
| A-IA-01 | NN/g — Information Architecture vs. Sitemaps: What’s the Difference? | Authoritative professional | https://www.nngroup.com/articles/information-architecture-sitemaps/ | 2023-09-03 | IA 包括组织、结构、关系、命名与导航呈现；sitemap 只是规划用的层级可视化，IA 也是持续维护过程 | 主要讨论网站；不是 David 产出效果研究 | Canonical IA 不得退化为 page tree；sitemap 只能是 projection | High |
| A-IA-02 | NN/g — The Difference Between Information Architecture (IA) and Navigation | Authoritative professional | https://www.nngroup.com/articles/ia-vs-navigation/ | 2014-06-22 | IA 先识别 content/functionality 及其关系；navigation 是让用户到达信息的 UI components；应先理解 IA 规模复杂度再选 navigation | 经典网站语境；不直接给出 sidebar/tabs 阈值 | Inventory、IA、Navigation 分域建模；导航选择必须引用 IA 规模和任务 | High |
| A-IA-03 | NN/g — Mental Models | Authoritative professional | https://www.nngroup.com/articles/mental-models/ | 2024-01-26；更新自 2010 文章 | Mental model 是用户对系统的信念，用于预测系统如何工作并影响交互 | 解释概念与案例，不验证 David 的具体用户模型 | AI 输出必须叫 `mental_model_hypothesis`；真实模型需用户证据 | High |
| A-IA-04 | NN/g — Card Sorting: Uncover Users’ Mental Models for Better Information Architecture | Authoritative professional | https://www.nngroup.com/articles/card-sorting-definition/ | 2024-02-02 | Card sorting 要求参与者按对其有意义的标准分组带标签的卡片，可产生 IA 组织与命名线索 | 结果依赖参与者、卡片、说明和分析；不是唯一正确 IA | 只有实际参与者结果才能标记 `evidence_backed`；AI affinity grouping 不是 card-sort result | High |
| A-IA-05 | NN/g — Card Sorting vs. Tree Testing | Authoritative professional | https://www.nngroup.com/articles/card-sorting-tree-testing-differences/ | 2024-02-23 | Card sorting 用于生成组织思路；Tree Testing 用简化文本树评估已提出的结构、标签和路径清晰度 | 两种方法均不测试完整视觉 UI 或动态交互 | Skill router 必须区分 discovery 与 evaluation，不得混写“已验证” | High |
| A-IA-06 | NN/g — Tree Testing: Fast, Iterative Evaluation of Menu Labels and Categories | Authoritative professional | https://www.nngroup.com/articles/tree-testing/ | 2023-08-06 | 最佳实践无法保证分类和标签对用户成立；应以任务评估 hierarchy、labels 与 findability；任务不可泄漏答案 | 不能评估视觉布局、交互反馈或完整 workflow | Candidate/label/hierarchy 的外部验证字段包含 tree-test tasks、success、directness/path behavior | High |
| A-IA-07 | NN/g — Information Scent: How Users Decide Where to Go Next | Authoritative professional | https://www.nngroup.com/articles/information-scent/ | 2020-02-02 | 用户依据 link label、上下文和既有经验估计目的地价值 | 概念原则不能替代目标用户测试 | Label review 同时评估 label、context、destination fulfillment | High |
| A-IA-08 | NN/g — Better Link Labels: 4Ss for Encouraging Clicks | Authoritative professional | https://www.nngroup.com/articles/better-link-labels/ | 2019-03-24 | 好标签应 Specific、Sincere、Substantial、Succinct，且能独立表达目的地 | 主要针对链接；具体词义仍受产品领域和语言影响 | 形成 label rubric，但核心术语必须通过 label/tree test 验证 | High |
| A-IA-09 | NN/g — 3 Common IA Mistakes (that Are All Due to Low Information Scent) | Authoritative professional | https://www.nngroup.com/articles/3-ia-mistakes/ | 2023-04-16 | 模糊 CTA、强行平行措辞和空泛对话式标签降低 information scent；清晰比表面句式一致更重要 | 专业观察与案例，不是跨产品受控实验 | Validator 可标记 `Explore/Resources/Management` 等风险，但不能自动断言用户不理解 | Medium-High |
| A-IA-10 | NN/g — Taxonomy 101 | Authoritative professional | https://www.nngroup.com/articles/taxonomy-101/ | 2022-07-03 | Taxonomy 是配合 visible navigation 的 backstage structure，以正式 metadata rules 支持一致分类和检索 | 不是每个小型产品都需要正式 taxonomy | 分离 canonical term、synonym、metadata、visible label 与 navigation placement | High |
| A-IA-11 | NN/g — Flat vs. Deep Website Hierarchies | Authoritative professional | https://www.nngroup.com/articles/flat-vs-deep-hierarchy/ | 2013-11-10 | Flat 与 deep 都有优缺点；更深结构更需 orientation aids，不能只按层数判优劣 | 经典网站案例；设备和任务变化需重测 | 不设固定最大深度；检查 sibling overload、路径清晰度与 wayfinding | Medium-High |
| A-IA-12 | NN/g — Polyhierarchies Improve Findability for Ambiguous IA Categories | Authoritative professional | https://www.nngroup.com/articles/polyhierarchy/ | 2018-05-13 | 多父节点可支持多种合理 mental models，但过度 cross-reference 增加认知和 wayfinding 成本；应由 card sort/tree test/usability evidence 触发 | 电商案例较多；polyhierarchy 与 canonical breadcrumb 有冲突 | 保留单一 canonical object ID；只在证据显示多条合理查找路径时增加 placement | Medium-High |
| A-IA-13 | NN/g — Local Navigation Is a Valuable Orientation and Wayfinding Aid | Authoritative professional | https://www.nngroup.com/articles/local-navigation/ | 2021-07-04 | Local navigation 帮助用户知道当前位置及附近内容 | 主要针对层级型内容环境 | NavigationModel 需要 current-location 和 nearby-destination cues，不只列 global nav | High |
| A-IA-14 | NN/g — Audience-Based Navigation: 5 Reasons to Avoid It | Authoritative professional | https://www.nngroup.com/articles/audience-based-navigation/ | 2015-09-07 | 角色分类不互斥或用户需跨角色内容时，audience-based navigation 增加选择负担和焦虑 | 标题是避免建议而非绝对禁令；角色真正隔离时可能合适 | Role-based 只能在角色稳定、互斥且内容差异真实时成为主组织方式 | Medium-High |
| A-IA-15 | NN/g — The 3-Click Rule for Navigation Is False | Authoritative professional | https://www.nngroup.com/articles/3-click-rule/ | 2019-08-11 | 固定三次点击是无数据支撑的任意规则，并会推动过宽导航 | 不表示深层结构无成本 | Validator 不得以点击次数单独判失败；改看 success、directness、orientation 与 time | High |
| A-IA-16 | NN/g — Progressive Disclosure | Authoritative professional | https://www.nngroup.com/articles/progressive-disclosure/ | 2006-12-03 | 延后高级/低频能力可降低初始学习与错误负担 | 经典原则；隐藏位置若信息气味弱会损害发现性 | 仅将次要能力后置，并保留可发现入口；关键任务不得因“简洁”被埋藏 | Medium-High |
| A-IA-17 | NN/g — User Journeys vs. User Flows | Authoritative professional | https://www.nngroup.com/articles/user-journeys-vs-user-flows/ | 2023-04-16 | User flow 是单一产品内完成常见任务的一组具体交互，包含关键用户动作和系统响应；journey 更跨渠道、更长期 | 定义理想/典型流程，不证明固定 path checklist 完整 | Flow 必须绑定 intent、entry、actions、system responses 和 completion；跨渠道问题转 journey/service blueprint | High |
| A-IA-18 | NN/g — Wireflows: A UX Deliverable for Workflows and Apps | Authoritative professional | https://www.nngroup.com/articles/wireflows/ | 2016-12-04 | Wireflow 结合 wireframe 与 flowchart，适合少量页面但动态状态多的 app；大量静态页面会失去流程上下文 | 交付物方法，不证明 Canvas overlay 的可理解性 | Wireflow 仅在需要同时表达 screen context 与 state transition 时生成；明确 trigger hotspot | High |
| A-IA-19 | NN/g — Mapping User Stories in Agile | Authoritative professional | https://www.nngroup.com/articles/user-story-mapping/ | 2021-01-24 | Story map 用 activities、steps、details 呈现用户完成目标的动作层级并帮助团队看见组合关系 | 不是完整交互 flow，也不天然覆盖 error/permission/recovery | 可用作 flow backbone 和 scope coherence 检查，不能替代状态/分支建模 | Medium-High |
| A-IA-20 | NN/g — Affinity Diagramming for Collaboratively Sorting UX Findings and Design Ideas | Authoritative professional | https://www.nngroup.com/articles/affinity-diagram/ | 2024-04-26 | Affinity diagram 可聚类 research findings 或 design ideas；团队协作有助于讨论与判断 | AI 单独聚类不是用户心智证据，也没有团队共识效应 | Inventory 可用 affinity 做工作假设，但 provenance 必须为 `inferred`/`pattern_based` | Medium-High |
| A-PM-01 | Christensen Institute — Jobs to Be Done Theory | Method-owner / authoritative | https://www.christenseninstitute.org/theory/jobs-to-be-done/ | 页面未标日期；访问 2026-07-10 | JTBD 以特定 circumstances 下寻求的 progress 和 functional/social/emotional dimensions 解释选择 | 方法所有者资料；不直接生成 IA，也不证明某个访谈模板效果 | Intent 输出 circumstance、progress、forces；不能从 demographic 或 feature request 直接跳到 IA | High for method definition |
| A-PM-02 | GOV.UK Service Manual — Learning about users and their needs | Government service standard | https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs | 发布 2016-04-04；更新 2017-03-23 | 从用户试图完成的事情、现有做法、问题和目标出发；非用户意见应视为待研究假设；user need 应聚焦问题而非 solution | 公共服务语境；规范措辞不可直接变成商业产品效果结论 | Founder request、AI synthesis、用户研究证据分开；Intent 与 feature 保持 traceability | High |
| A-PM-03 | GOV.UK — Government Design Principles | Government authority | https://www.gov.uk/guidance/government-design-principles | 发布 2012-04-03；更新 2025-04-02 | Start with user needs、design with data、understand context；用户所要求的不总是其需要 | 高层原则，不提供 IA 算法或 David 阈值 | `frame_jtbd_and_user_intent` 必须记录 evidence/assumption，并避免 feature laundering | High for principle |

## 4. Claim–Evidence Matrix

| Claim ID | `01` Section | Claim | Direct evidence | Source title / type / URL / date | Exact supported point | Limitation / conflict | Product implication → Agent behavior → Data/schema → Validation | Confidence |
|---|---|---|---|---|---|---|---|---|
| A-CL-001 | 1.1–1.7, 4.4 | IA 不能退化为 sitemap 或 page inventory；必须先识别 content/functionality、关系、分类与命名 | A-IA-01、A-IA-02 | NN/g authoritative；见 Source Registry；2023 / 2014 | Sitemap 只是 IA 的一类投影；IA 定义包含 content/functionality 和关系 | 网站语境外推到产品对象/能力；“Inventory 一定先于所有页面”无对照实验 | Canonical IA 独立于视图 → 禁止 capability=page → 保存 object/content/capability/relationship → coverage 与 orphan validator | High for boundary；Medium for fixed order |
| A-CL-002 | 4.3 | Intent 应描述 circumstance、desired progress、information/action need，而非复述 feature | A-PM-01、A-PM-02、A-PM-03 | Christensen method owner；GOV.UK government standard；URL/date 见 Registry | JTBD 聚焦特定情境中的 progress；GOV.UK 要求 user need 聚焦问题且用研究验证 | JTBD 不自动给出 taxonomy、flow 或商业价值；真实 intent 仍需研究 | Intent 与 requested solution 分字段 → AI 先提可逆 framing → `source_ids/provenance/confidence` → 访谈、观察、现有行为证据 | High |
| A-CL-003 | 4.4 | Inventory 应分开 objects、content、capabilities、actions、states、roles 与 dependencies，避免把每项能力转成页面 | A-IA-01、A-IA-02、A-IA-10、A-IA-20 | NN/g authoritative；URL/date 见 Registry | IA 活动包括 content inventory、taxonomy、metadata；affinity 可聚类 findings/ideas | 细分字段是 David synthesis；来源不直接规定完整 enum | 分域 inventory → routine extraction 可自动、推断需 provenance → typed items + relations → duplicate/orphan/state/dependency checks | Medium-High |
| A-CL-004 | 1.9, 4.5, 9.4 | AI 只能生成 mental-model hypothesis，不能声称真实用户这样理解 | A-IA-03、A-IA-04、A-PM-02 | NN/g + GOV.UK authoritative；2024 / 2017 | Mental model 是用户信念；Card Sorting 需要参与者；非用户意见是待验证假设 | Card sorting 也只提供线索，不能把群体差异压成一个模型 | Hypothesis honesty → 强制 basis/alternative/risk → provenance 非 `evidence_backed` → card sort/interview/tree test | High |
| A-CL-005 | 4.5, 9.2, 15.3 | Card Sorting 是生成组织线索的方法；Tree Testing 是评估结构、标签与路径的方法 | A-IA-04、A-IA-05、A-IA-06 | NN/g authoritative；2023–2024 | 两种方法用途不同，Tree Testing 用无视觉文本树和任务评估 findability | 两者均不评估完整动态交互；任务设计和样本影响结果 | Skill router 分离 discovery/evaluation → 禁止伪造结果 → `validation_method/task/metric` → success/directness/path + usability test | High |
| A-CL-006 | 4.6, 10 | Candidate IA 应以同一 inventory 和 constraints 比较，以便 trade-off 可归因；候选数量 `2`、默认上限 `3` 只是产品 heuristic | A-IA-01、A-IA-05、A-IA-06 | NN/g authoritative；2023–2024 | IA 是多项组织决策；Card Sorting 生成思路、Tree Testing 比较/评估结构 | 没有来源证明固定 2–3 个候选最优；不同复杂度可能只有一个合理解或需更多探索 | Shared-input comparison → 生成少量可区分方案 → `candidate_set/input_snapshot` → expert rubric + tree test；候选数量做 prototype test | Medium；数量 Low |
| A-CL-007 | 4.7, 11.1 | 标签质量依赖用户词汇、预测性、语境与 destination fulfillment；清晰优先于强行平行或“友好”措辞 | A-IA-07、A-IA-08、A-IA-09 | NN/g authoritative；2019–2023 | Information scent 来自 label/context/experience；4Ss；模糊 CTA 和 forced parallelism 是常见风险 | 专家检查不能证明目标用户理解；多语言含义需另测 | Label review 连接 destination → 可逆次级 rename + Undo → `label/rationale/alternatives/evidence` → label test/tree test/usability | High for rubric；Medium for specific rename |
| A-CL-008 | 1.4, 4.7, 11.2 | Taxonomy 是 backstage 分类与 metadata system，不等于 visible navigation；visible label、canonical term、synonym 应分开 | A-IA-10、A-IA-02 | NN/g authoritative；2022 / 2014 | Taxonomy 支持一致检索；navigation 是 UI components | 小 MVP 可能不需要正式 controlled vocabulary | 仅在检索/多分类/规模需要时建 taxonomy → 不为完整而过度建模 → term/synonym/facet/placement 分字段 → consistency/retrieval test | High |
| A-CL-009 | 4.7, 11.2–11.3 | Hierarchy 没有通用最佳深度；不得使用三次点击规则；polyhierarchy 只应有节制地支持多种合理查找路径 | A-IA-11、A-IA-12、A-IA-15 | NN/g authoritative；2013 / 2018 / 2019 | Flat/deep 各有代价；三次点击无数据支撑；多父节点有 findability 与 wayfinding trade-off | 经典网站证据；David 的图结构仍需实测 | 质量看 path clarity 而非 depth → major move 先 diff/approval → canonical ID + placements → tree test、orientation、backtracking | High for no 3-click；Medium-High for pattern |
| A-CL-010 | 4.8, 11.4 | 应先理解 IA 的规模与关系，再选择 global/local/context/search；Local Navigation 承担 orientation | A-IA-02、A-IA-13 | NN/g authoritative；2014 / 2021 | IA 是 backbone，navigation 是 access UI；local nav 表达 where/nearby | 不给出 sidebar/tabs 的稳定数量阈值 | Pattern recommendation 引用 platform/scale/task → 不让用户替 AI 做 routine pattern choice → nav roles + entry/orientation → tree/usability test | High for boundary；Medium for pattern selection |
| A-CL-011 | 4.8, 10.1 | Role/audience-based navigation 不是默认：仅当角色真正稳定、互斥、内容差异明确时合理 | A-IA-14、A-IA-04 | NN/g authoritative；2015 / 2024 | 非互斥角色增加选择负担；Card Sorting 可观察实际分组 | 不是绝对禁令；权限隔离产品可能必须 role-based | 默认比较 task/object alternative → 角色分组为假设 → `role_overlap/content_overlap` → relevant-user card/tree test | Medium-High |
| A-CL-012 | 1.6, 4.9 | User flow 应围绕一个 product-level task，记录 user actions 与 system responses；journey 与 flow 不得混用 | A-IA-17、A-IA-19 | NN/g authoritative；2023 / 2021 | Flow 是具体交互路径；story map 表达 activities/steps/details | `happy/alternate/error/permission/cancel/retry/return` 全清单是 David completeness heuristic，不是来源规定的每案 P0 | Flow 绑定 intent/completion → 先建 critical path，再按风险加分支 → nodes/edges/state/actor/system response → path reachability + usability test | High for boundary；Medium for checklist |
| A-CL-013 | 1.7, 4.10 | Wireflow 适合同时表达 screen context 与动态 transition，但不适合大量静态页面的全量流程 | A-IA-18、A-IA-17 | NN/g authoritative；2016 / 2023 | Wireflow 结合 wireframe/flowchart；需标明触发 hotspot；静态大站可能丢失整体流程上下文 | 不验证 David 的 Canvas overlay 或语义缩放 | 按表达问题选择 artifact → 非必要不生成 → `screen_ref/trigger/resulting_state` → comprehension + handoff test | High |
| A-CL-014 | 4.7, 4.10 | Progressive Disclosure 可降低初始复杂度，但必须保留次要能力的 information scent，不能埋藏 critical path | A-IA-16、A-IA-07 | NN/g authoritative；2006 / 2020 | 后置低频/高级能力有学习与错误收益；用户依赖 cues 选择路径 | 经典原则；何谓“低频”需真实数据或假设 | Frequency/risk-based disclosure → 关键能力不得自动隐藏 → `priority/frequency/evidence/disclosure` → usability/findability test | Medium-High |
| A-CL-015 | 15, 18 | 方法卡必须区分 expert heuristic 与 user evidence，并为每种输出指定验证方法 | A-IA-04、A-IA-05、A-PM-02 | NN/g + GOV.UK authoritative | 用户研究方法用途不同；非用户意见应视为假设 | Skill Card 字段集合是 David 架构设计，不是外部标准 | Skill 输出携带 provenance/validation → 无证据不得确认 → source/evidence/assumption fields → deterministic + expert + user test 分层 | High for honesty；Medium for schema |

## 5. 冲突与不应过度推导之处

| Conflict / tension | Evidence | Resolution for David |
|---|---|---|
| “Mental model 可由 AI 推断” vs “mental model 是用户实际信念” | A-IA-03、A-IA-04、A-PM-02 | AI 只能输出 hypothesis；只有真实参与者数据可提升为 `evidence_backed`，用户单次确认也只确认 founder decision，不等于群体模型 |
| “Card Sorting 验证 IA” vs “Card Sorting 生成线索” | A-IA-05 明确区分 | Card Sorting 不写成结构成功证明；结构评估使用 Tree Testing，完整任务用 usability test |
| “标签遵循 4Ss 即可” vs “理解取决于用户词汇与上下文” | A-IA-07、A-IA-08、A-IA-06 | 4Ss 是 expert rubric；核心 label 的最终证据来自 label/tree/usability test |
| “扁平结构更好” vs “深/浅均有代价” | A-IA-11、A-IA-15 | 不设固定深度或三次点击阈值；用 task success、directness、orientation、backtracking 评估 |
| “多入口提高 findability” vs “polyhierarchy 损害 wayfinding” | A-IA-12 | 单一 canonical object + 有节制的 placements；只有证据显示多条合理路径时增加父级 |
| “按角色组织更相关” vs “用户跨角色导致焦虑” | A-IA-14 | 角色稳定、互斥、内容/权限真正分离时才优先；否则 task/topic/object 优先进入候选 |
| “Wireflow 统一表达 Flow + Screen” vs “大型静态层级会丢上下文” | A-IA-18 | 按产品动态性与表达目标启用；不能把所有 IA 节点展开为 wireflow |
| `01` 默认 2 candidates / 不超过 3 | 未找到直接证据 | 保留为 `provisional interaction heuristic`，不是规范事实；测试比较纠错质量、选择负担与时间 |
| `01` 要求固定 8 类 flow path | A-IA-17、A-IA-19 只支持 task/action/system response 与 backbone | 改为 risk-based completeness；critical error/permission/recovery 缺失可 blocker，其他按产品语境 warning |
| JTBD 能定义 intent vs JTBD 能直接生成 IA | A-PM-01 仅支持 circumstance/progress | JTBD 输出只作为 Inventory 与 IA 的输入；不得把 “Job” 直接当 top-level navigation label |

## 6. 对 `01` Section 的 Patch 建议

> 以下仅是 Patch Proposal；本轮没有修改 `01`。

| Priority | `01` Section | Current issue | Proposed patch | Evidence | Confidence |
|---|---|---|---|---|---|
| Must patch before implementation | 4.5 / 9.2 | “mental-model hypothesis”虽已声明，但状态升级条件不够明确 | 增加：AI synthesis、Founder preference、synthetic persona 永不自动升级为 `evidence_backed`；升级需保存 participant/evidence IDs、method、sample context 与 analysis limitations | A-IA-03–06、A-PM-02 | High |
| Must patch before implementation | 4.6 / 10.2 | Candidate 间可能不共享完整输入快照，比较会混入 coverage 差异 | 要求每个 candidate 引用同一 `inventory_snapshot_id`、constraints、scope assumptions；任何遗漏必须标为 intentional exclusion | A-IA-01、A-IA-02 | Medium-High |
| Must patch before implementation | 4.9 | 固定 path-type 列表容易被实现为所有场景同等 Blocker | 增加 `required_by_risk` 与 severity：core happy path 必须；error/permission/recovery 依能力和风险；不适用路径需显式 `not_applicable_reason` | A-IA-17、A-IA-19；外部来源未规定固定清单 | Medium |
| Must patch before implementation | 11.3 | Polyhierarchy 规则未明确 canonical identity 与 placement 分离 | 增加：一个 canonical node，可有多个 navigation placements；breadcrumb/canonical path 冲突需记录；无用户证据时不为“保险”增加多个父级 | A-IA-12 | High |
| Must patch before implementation | 15.3 | External validation 表未明确方法不能互相替代 | 增加方法适用边界：Card Sort=discovery、Tree Test=structure/labels、Usability Test=interaction task、Analytics=observed production path；每个结果保存 task/sample/context/limitations | A-IA-04–06、A-IA-17 | High |
| Should patch | 4.4 / 3.1 | Inventory item 与 IA node/page 的关系未显式禁止 1:1 自动映射 | 增加 invariant：`capability_id` 不得在无 rationale 时自动创建 `node_id`；capability 可由 contextual action、background process 或多个 nodes 承载 | A-IA-01、A-IA-02 | Medium-High |
| Should patch | 4.7 / 11.1 | Label checklist 未显式检查 destination fulfillment 和 surrounding context | 增加 `destination_summary`、`context_cues`、`promise_fulfilled`；专业检查通过仍只能是 pattern-based | A-IA-07、A-IA-08 | High |
| Should patch | 4.7 / 11.2 | Hierarchy 可被实现成固定最大深度 | 明确禁止固定 depth/click-count blocker；改用 sibling overload、path ambiguity、orientation、priority 与 growth 检查 | A-IA-11、A-IA-15 | High |
| Should patch | 4.8 / 11.4 | 示例 `Desktop + 6–10 work areas → Sidebar` 容易被误当实证阈值 | 将数字示例标为 pattern hypothesis；Navigation Skill 必须输出 rejected alternatives 与 what-would-change | A-IA-02、A-IA-13；无 6–10 阈值证据 | High on caveat |
| Should patch | 10.1 | Role-based scheme 的风险描述偏弱 | 增加角色互斥性、跨角色任务和内容重复检查；不满足时必须比较 task/topic/object candidate | A-IA-14 | Medium-High |
| Keep provisional | 4.6 / 10.3 | 默认 2 candidates、最多 3 | 保留为界面负担控制 heuristic，明确“不是 IA 研究定律”；原型测试后校准 | 无直接证据 | Low / Needs research |
| Keep provisional | 5 | 固定 Stage 顺序与 exit conditions | 保留 responsibilities 与 regression triggers；不要宣称线性顺序已证明更优 | 组成方法有证据，固定 agent 顺序无比较研究 | Medium-Low |
| Should patch | 18 | Skill contract 来源字段过于简略 | 每个重要 rule 输出 `claim_id/source_url/source_date/supported_point/limitation/confidence`；合成案例强制 `synthetic: true` | Prompt 4.2；A-PM-02 | High |

## 7. 真实用户研究缺口

| Gap ID | Unknown that desktop research cannot answer | Target evidence | Suggested method | Decision changed | Must not claim before evidence |
|---|---|---|---|---|---|
| A-UR-01 | AI 独立开发者如何描述“产品结构”“模块”“工作区”“蓝图”等核心概念 | 自然语言、现有工作流、替代工具用词 | Contextual interview + artifact walkthrough；分析真实输入文本与 search/support logs（若有） | UserVocabulary、Intent、Label candidates | 不得声称 “Blueprint/Workspace” 是用户词汇 |
| A-UR-02 | 目标用户如何自然分组 David 的对象和能力 | 参与者卡片分组、category labels、分歧模式 | Open Card Sorting；按经验水平分层记录，不预设唯一正确组 | Mental-model hypotheses、Candidate IA | 不得把 AI affinity clusters 当 card-sort findings |
| A-UR-03 | 候选 IA 的标签和层级是否可找 | Task success、directness、first path、backtracking、wrong destination | Tree Testing，任务避免复用目标 label | Labels、hierarchy、polyhierarchy placements | 不得仅凭 expert review 说“用户能找到” |
| A-UR-04 | Sidebar、tabs、contextual actions、search 的组合是否支持日常任务和 orientation | 首次定位、返回、切换、当前位置理解、误入与恢复 | Low-fi prototype usability test；同一 IA 比较 navigation variants | NavigationModel | 不得使用 `6–10 items` 作为已验证阈值 |
| A-UR-05 | `Context → Intent → Objects → IA → Flow → Wireframe` 是否被理解为一个演化模型 | 阶段识别、关系解释、纠错成功、认知负担 | Think-aloud prototype test + structure-diff task | Canvas projection 和 progressive disclosure | 不得把 Wireflow 可学习性外推为 David Canvas 已可理解 |
| A-UR-06 | 核心 Flow 的实际入口、alternate/error/permission/recovery 哪些高风险 | 观察到的 task sequence、系统反馈理解、失败恢复 | Scenario usability test；已有产品则结合 analytics/session/support evidence | Flow severity、required branches、scope gate | 不得声称固定 8 类路径对所有产品都必须 |
| A-UR-07 | 用户看到几个 candidate 时最容易比较和纠正 | 决策时间、理解准确率、纠错质量、主观负担 | Prototype comparison：1 + rationale、2、3 candidates；按任务复杂度分析 | Candidate default count | 不得把 “2–3” 写成经验事实 |
| A-UR-08 | 多角色产品是否按 role 组织更自然 | 跨角色任务、角色重叠、内容重复、查找路径 | Interview + card sort + tree test，纳入兼任多角色者 | Role-based vs task/object IA | 不得从权限模型直接推导用户 mental model |
| A-UR-09 | AI 自动补全 inventory、rename、reorder 是否让用户信任且能纠错 | 漏项/误项发现率、Undo 使用、被接受/拒绝原因 | Wizard-of-Oz + diff/Undo tasks | L0/L1 autonomy boundary | 不得把 synthetic acceptance cases 当真实接受度 |
| A-UR-10 | Wireflow 是否比 flowchart + node mini-IA 更利于下游实现与审查 | 理解准确率、遗漏状态、实现返工、引用 canonical IDs 的正确率 | PM/Designer comprehension test + downstream coding-agent execution test | Artifact selection 与 handoff minimum | 不得仅凭专业文章宣称实现结果更好 |

## 8. 角色 A 结论

1. 最强证据支持的是概念和方法边界：IA 不等于 sitemap/navigation；Mental Model 必须有真实用户证据；Card Sorting 与 Tree Testing 不能互换；Flow 与 Wireflow 各有明确适用范围。
2. David 的 fixed candidate count、固定 stage 顺序、navigation 数量阈值和 flow path 全清单，最多是 provisional heuristics，不应伪装成研究结论。
3. Schema 必须把 canonical object 与 navigation placement、canonical term 与 visible label、AI hypothesis 与 user evidence 分开，否则“证据诚实”无法由 runtime 执行。
4. Expert rules 可以触发 `AUTO_APPLY`/`APPLY_WITH_UNDO` 的低风险改进，但核心标签、顶层 IA、关键路径与用户真实 mental model 必须由 approval 或 research/test 管理。
