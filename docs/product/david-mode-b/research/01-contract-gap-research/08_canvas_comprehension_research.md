# 08 — Canvas Comprehension Research

> 角色：F — Canvas Comprehension & Visual Interaction  
> 状态：Research input for future `02_canvas_interaction_spec.md`  
> 日期：2026-07-10  
> 证据明细：[`sources/agent_f_canvas_evidence.md`](sources/agent_f_canvas_evidence.md)  
> 边界：本文件不是完整 UI Spec；不定义精确布局、尺寸、zoom thresholds、gestures、motion timing、视觉样式或实现 tickets。

## 0. 结论标签

| 标签 | 定义 |
|---|---|
| **Evidence-backed** | 有直接 primary/authoritative evidence 支持的一般原则；不等于已在 David 用户上验证 |
| **Provisional** | 与 `00/01` 一致且有相邻证据支撑的 David-specific heuristic，但默认方式或阈值未验证 |
| **Prototype/User Test Required** | 效果取决于 David 目标用户、任务、图规模、术语理解或 interaction trade-off，必须原型/用户测试 |

## 1. Executive Answer

1. **Evidence-backed：** Canvas 应从可理解的 overview 开始，并提供 filter、details-on-demand、history；但这只是能力集合，不应变成强制线性 wizard。[Shneiderman, 1996](https://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf)（F-E02）
2. **Evidence-backed：** Progressive disclosure 支持“先核心、后细节”，但 primary/secondary split 必须由 task analysis 和 usability testing 校准。[NN/g, 2006-12-03](https://www.nngroup.com/articles/progressive-disclosure/)（F-E01）
3. **Provisional：** David 的统一 Canvas 应维持一份 canonical blueprint，通过不同 projection 渐进演化；旧阶段不消失，而是被后续结构引用、折叠或作为 provenance/history 保留。
4. **Evidence-backed：** 结构、层级、路径、对应关系和变化适合图形；精确 rationale、assumption、limitation、evidence 和 acceptance criteria 适合文字。表征必须与任务匹配，而非“图优于文”。[Larkin & Simon, 1987](https://doi.org/10.1111/j.1551-6708.1987.tb00863.x)（F-E06）
5. **Provisional：** Chat 负责自然输入和澄清，Canvas 负责 current canonical structure，Decision Panel 负责 active decision、diff、impact 与 approval。三者是职责分工，不是已验证的固定三栏布局。
6. **Prototype/User Test Required：** Semantic Zoom 是合格候选，但没有证据证明它适合 David。其定义必须是“对象随尺度切换抽象层级”，且应与 explicit expand、普通 pan+zoom 对照。[Bederson & Hollan, 1995](https://hci.ucsd.edu/hollan/Pubs/JH1995-1.pdf)（F-E03）
7. **Evidence-backed：** Focus+Context 没有普适最优解；特定受控研究中普通 pan+zoom 反而更快。**Provisional implication：** fisheye/distortion 或 2.5D 不作为未经测试的默认。[Cockburn et al., 2008](https://www.microsoft.com/en-us/research/publication/a-review-of-overviewdetail-zooming-and-focuscontext-interfaces/)；[Yang et al., 2022-04-27](https://vtechworks.lib.vt.edu/items/7e113598-2f28-4398-ac4d-e09b72a98391)（F-E04/F-E05）
8. **Evidence-backed：** `Confirmed / Inferred / Unknown` 不得仅靠颜色，应至少有文字/非颜色冗余编码；provenance 需要可追溯的 source/actor/derivation。**Contract invariant：** provenance 与 confidence 分离。[WCAG 2.2, 2024-12-12](https://www.w3.org/TR/WCAG22/)；[W3C PROV, 2013-04-30](https://www.w3.org/TR/prov-overview/)（F-E15/F-E18）
9. **Evidence-backed：** Structure Diff 应显式编码 operation 并保留原结构上下文；动画不能替代可停留、可检查的 before/after 和 change summary。[Gleicher et al., 2011](https://graphics.cs.wisc.edu/Papers/2011/GAWJHR11/paper.pdf)；[Archambault et al., 2010](https://doi.org/10.1109/TVCG.2010.78)（F-E11/F-E13）
10. **Prototype/User Test Required：** 用户能否理解 `Context → Intent → Objects → IA → Flow → Wireframe`、是否把 provenance 当作 truth、何时 graph 过载、IA+Wireframe 是否可读，都无法由 desktop research 结案。

## 2. Canvas 演化模型

### 2.1 不是九张互不相干的图

`00` 要求 one canonical blueprint，`01 §13.2` 要求 progressive visual evolution。未来 `02` 应把演化理解为同一对象的渐进投影：

```text
Product Context
→ Intent Map
→ Object / Capability Cards
→ Candidate Groupings
→ Proposed IA
→ Navigation
→ Flow Overlay
→ Expanded Wireframe Node
→ Scope / Validation
```

每一步都应满足：

```text
新增可纠正的语义
+ 保留 upstream references
+ 标明 maturity / provenance
+ 可回到相关 decision/history
```

不应满足：

```text
切换阶段
→ 清空上一阶段
→ 生成一张无法追溯的新图
```

**状态：Provisional。** Progressive partial-result literature 支持“尽早显示有意义、可 steer 的中间结果”，但其研究对象是 long-running analytics，不是 PM pipeline。[Stolper et al., 2014](https://faculty.cc.gatech.edu/~stasko/papers/vast14-progress.pdf)（F-E23）

### 2.2 每个演化阶段应回答的用户问题

| Projection | 用户应能回答 | 默认图形任务 | 后续关系 | 结论状态 |
|---|---|---|---|---|
| Product Context | 我们在为谁、什么情境、什么 outcome 做产品？ | compact context summary | 约束所有后续结构 | Provisional |
| Intent Map | 用户为何来、要做出什么进展？ | trigger → need → action → success | 约束 objects、flow、scope | Provisional |
| Object / Capability Cards | 产品有哪些原料，而非有哪些页面？ | inventory、分类、缺口 | 输入 candidate grouping | Provisional |
| Candidate Groupings | 有哪些 plausible organization schemes？ | 并列比较、trade-off | 选择或保留默认 IA | Evidence-backed comparison principle；具体形式 Provisional |
| Proposed IA | 什么存在、归到哪里、为何？ | hierarchy/topology/labels | 输入 nav 与 flow | Evidence-backed representation-task fit |
| Navigation | 用户从哪里进入和定位？ | entry points、global/local/context reachability | 约束 flow | Provisional overlay |
| Flow Overlay | 核心任务如何完成与恢复？ | path、decision、state | 约束 node mini-IA | Evidence-backed graph/path fit |
| Expanded Wireframe Node | 这个 IA node 内部如何承载信息和操作？ | local screen context | 引用 node/flow/state | Evidence-backed wireflow principle；具体交互 Provisional |
| Scope / Validation | 什么现在做、什么不做、结构哪里仍有风险？ | status/filter/warning | handoff gate | Provisional overlay |

### 2.3 防止“阶段误读”的约束

- 后一 projection **不得**暗示前一 projection 已被真实用户验证。
- `Intent Map`、`Candidate Groupings` 与 `Proposed IA` 应有明确对象类型，不能全都画成相同 card graph。
- 用户应能看出当前看到的是 **current proposal**、**selected decision** 还是 **historical alternative**。
- 阶段进度只表示 reasoning coverage/maturity，不表示线性完成度或质量总分。
- 用户可以非线性选择 node、回看 rationale、修改 upstream assumption；系统负责 cascade revalidation。

这些约束与 `01` 一致，但具体 orientation mechanism 属于 **Prototype/User Test Required**。

## 3. Prompt 7.9 逐项回答

### 3.1 什么应该始终可见

“始终可见”指在相关工作状态下持续可达、无需在 Chat 历史中搜索；不要求所有内容永久占据 Canvas。

| 信息 | 为什么 | 最低要求 | 状态 |
|---|---|---|---|
| 当前 Product Bet / target user / core outcome 的短摘要 | 防止局部 IA 优化脱离 Bet | 可一跳查看；关键变化需要显著提示 | Provisional |
| 当前 projection / reasoning maturity | 让用户知道在看 Context、IA、Flow 还是 Wireframe | 非线性导航，不做完成度总分 | Provisional；需测试术语 |
| 当前 selection 与其 canonical ID | 让 Chat、Canvas、Decision state 指向同一对象 | selection 在三种 surface 同步 | Evidence-backed context/correction principle；具体形式 Provisional |
| 当前 selection 的 parent/ancestor 或 core-path context | 防止 focus 后迷失 | 展开细节时仍可回到结构位置 | Evidence-backed overview/focus principle |
| 可见对象的 provenance 基线 | 避免把 inference 冒充 confirmed fact | 至少区分 Confirmed / Inferred / Unknown | `01` normative + accessibility evidence |
| active consequential decision / approval state | 防止用户不知系统正在等待什么 | diff、影响和 action 同时可达 | `01` normative + HAI evidence |
| locked constraint、blocker、core-flow break | 防止视觉简化隐藏高风险条件 | 不得因 zoom/filter 完全消失；可显示聚合 warning | `01` normative；呈现方式需测试 |
| 最近一次 reversible change / Undo availability | 支持 efficient correction | Undo 与 change summary 可达 | Evidence-backed history/correction principle |

**不建议始终展开：** 完整来源列表、完整 rationale、全部 alternatives、所有 edge labels、所有 error states、完整 wireframe、全部 acceptance criteria、全部历史版本。它们应可追溯，但默认展开会制造 clutter。

### 3.2 什么应该渐进披露

| 层级 | 内容候选 | 触发候选 | 状态 |
|---|---|---|---|
| Overview | group、top-level IA、core path、critical warning、maturity | 打开 blueprint / reset view | Evidence-backed capability；具体内容 Provisional |
| Structure | node labels/types、selected relations、scope/status markers | 普通工作尺度或选择 group | Provisional |
| Decision detail | rationale summary、alternatives、confidence、impact、diff | 选择 decision/change | HAI / diff evidence-backed；字段组合 Provisional |
| Node detail | mini-IA、states、CTA、inputs/outputs、local flow | 选择/expand node | `01` normative + wireflow evidence |
| Evidence detail | source、date、supported point、limitation、validation plan | 查看 provenance/evidence | Provenance evidence-backed；交互 Provisional |
| History detail | before/after versions、rejected/superseded decisions | 查看 history / Undo / audit | History evidence-backed；交互 Provisional |

**关键冲突：** Progressive disclosure 要隐藏次要内容，但 split-attention evidence 反对把相互依赖的信息拆得太远。结论不是“尽量折叠”，而是：

```text
低频完整细节可折叠；
active task 所需的 target + why + impact + action 必须同时可关联。
```

### 3.3 Chat、Canvas、Decision Panel 如何分工

| Surface | Primary responsibility | 应包含 | 不应成为 |
|---|---|---|---|
| Chat | 自然语言输入、澄清、解释和纠错入口 | 用户原话、David 的简短 interpretation、一个 decision-changing question、指向 canvas object/change 的引用 | canonical state 的唯一存放处；重复粘贴整个 Blueprint；长 interview form |
| Canvas | Living Blueprint 的空间/结构投影 | current structure、selection、relations、flow、scope/status、local expansion、change location | 长篇 rationale 文档；每个事件的日志；无限自由白板 |
| Decision Panel | 当前需要理解或处理的 decision | recommendation、alternative、rationale、assumption、confidence、Structure Diff、cascade impact、Approve/Edit/Reject/Undo/Test | 第二份 Canvas；所有历史 decision 的常驻列表；无 target 的解释栏 |

**Evidence-backed 部分：** HAI 需要 contextually relevant information、efficient correction、why、consequence 与 cautious update；相互引用文本/图形需降低 split-attention。[Microsoft, 2019](https://www.microsoft.com/en-us/research/wp-content/uploads/2019/01/Guidelines-for-Human-AI-Interaction-camera-ready.pdf)（F-E17）；[Chandler & Sweller, 1992](https://doi.org/10.1111/j.2044-8279.1992.tb01017.x)（F-E07）

**Provisional 部分：** 上述三项职责。**Prototype/User Test Required：** 固定三栏、drawer、popover 或其他布局；Panel 何时出现/收起；窄屏降级。

**跨 Surface contract 候选：**

1. Chat message、Canvas selection、Decision target 共享 canonical ID。
2. 从 Chat 点 change reference，应定位并高亮 Canvas target。
3. 从 Canvas 选 node，应显示该 node 的 active decision，而非最后一条无关消息。
4. Approve/Edit/Reject 后，Chat 只总结结果；canonical mutation 仍由 StateReducer 负责。
5. 所有 surface 使用同一 provenance/status vocabulary。

### 3.4 哪些信息适合图形，哪些适合文字

| 内容 | 首选表征 | 理由 | 状态 |
|---|---|---|---|
| hierarchy、grouping、parent/child | graph/tree/structured cards | 空间位置使关系显式 | Evidence-backed |
| core flow、alternate/error path | path overlay / wireflow | node-link 适合 path finding；page context 可减少 flow ambiguity | Evidence-backed |
| candidate comparison | juxtaposition + aligned highlights + concise comparison text | 并列提供上下文，explicit encoding 指向差异 | Evidence-backed design space；具体格式 Provisional |
| scope distribution / blockers | visual markers + filter + summary list | 支持 overview 和 exception finding | Provisional |
| structure change location | canvas highlight / explicit diff encoding | 减少纯心智 before/after 比较 | Evidence-backed |
| rationale、assumption、trade-off | concise text linked to target | 需要精确命题和限制，长文不适合 node | Evidence-backed representation-task fit |
| provenance source、date、supported point、limitation | structured text with optional graph trace | 需审计和精确语义 | Evidence-backed provenance principle |
| confidence | text category/value + explanation，不与 provenance status 合并 | confidence 不等于 source status | `01` semantic requirement；presentation Provisional |
| acceptance criteria / no-go | structured text/checklist | 必须可复制、可验证、可供 handoff | `01` normative |

每个图形关系都应有可程序识别或文字等价形式；颜色不得是 status/relationship 的唯一载体。[WCAG 2.2, 2024-12-12](https://www.w3.org/TR/WCAG22/)（F-E18）

### 3.5 Semantic Zoom 是否适合

**结论：适合作为候选 interaction model，不足以成为默认。状态：Prototype/User Test Required。**

Semantic Zoom 只有在“同一 canonical object 随尺度改变 semantic representation”时有价值。未来 `02` 可测试以下三层语义，而不是在本研究中冻结：

| Candidate level | 保留 | 隐藏/聚合 | 风险 |
|---|---|---|---|
| Blueprint overview | group、top-level nodes、core path、critical warning、selection location | node body、secondary edges、rationale | status 被过度聚合；用户不知如何展开 |
| Structure working view | labels、node type、parent/child、selected relations、provenance marker | full evidence、wireframe detail | edge clutter；标记过多 |
| Node detail | mini-IA、wireframe block、local state/flow、decision context | unrelated subgraphs | focus 后失去 global orientation |

**未来 spec 输入：**

- critical lock/blocker/unknown 不得因 zoom level 彻底不可发现；overview 至少显示 aggregate warning。
- 同一 object 的 identity 与 canonical ID 不随 representation 改变。
- 必须有可预测的 explicit expand/collapse、zoom-to-selection、zoom-to-fit/reset；不能只靠 pinch/scroll 发现语义层。
- semantic transition 不得直接改变 canonical state。
- 语义层切换应保持 text alternative 和 keyboard reachability。
- 2.5D 不是 Semantic Zoom 的必要条件；现有比较可视化综述反而指出 2.5D 有 perceptual concerns（F-E11）。

**必须测试：** 用户是否注意到 representation change、能否预测 zoom 后出现什么、能否从 detail 回到 overview、是否误以为隐藏内容不存在、与 explicit expand 相比是否更快/更准。

### 3.6 Focus + Context 如何使用

**推荐方向：轻量、非失真、selection-driven；状态：Provisional。**

候选 focus context：

- 选中 node 时保留 ancestors、children、core-flow predecessor/successor 与 affected diff targets。
- 无关节点可降低强调或折叠，但 locked/blocker/affected-by-change 不得被静默隐藏。
- 在 node wireframe expansion 时，保留 node 在 IA 中的位置提示和 local flow edges。
- 在 candidate/diff comparison 时，通过 aligned position 或 cross-highlight 建立 correspondence。
- 提供 overview recovery，而不是依赖用户记住 pan/zoom path。

不建议未经测试默认：

- fisheye geometric distortion；
- 3D/2.5D perspective；
- 自动大幅重排整个 graph；
- 只靠 opacity 使 context 难以读取；
- focus 后完全移除 upstream/downstream context。

**Evidence-backed：** Focus+Context 是一种机制类别，不是 universal winner；2022 task-specific study 中 pan+zoom 更快（F-E04/F-E05）。**必须测试：** selection focus vs overview+detail vs普通 pan/zoom；测试 orientation、search、error、reset 和 subjective workload。

### 3.7 如何显示 Confirmed / Inferred / Unknown

#### Baseline semantics

| Status | 用户必须理解的含义 | 视觉要求候选 | Action affordance 候选 |
|---|---|---|---|
| Confirmed | 用户明确提供或批准；不是“真实用户研究证明” | text label + distinct icon/shape + optional color | 查看确认来源/decision |
| Inferred | David 从当前 context 推导；可能需要纠正 | text label + distinct icon/shape + optional color | Correct / confirm / inspect rationale |
| Unknown | material information 缺失；可能 blocking 或 nonblocking | text label + distinct icon/shape + optional color | Answer / defer / test |

#### 不能混合的维度

```text
Provenance status ≠ Confidence
Provenance status ≠ Validation state
Provenance status ≠ Scope state
Provenance status ≠ Change state
```

例如：

```text
status: inferred
confidence: high
validation: needs user test
scope: in_mvp
change: unchanged
```

这四项不能压成一个“绿色/黄色/红色”点。

#### Disclosure candidate

- Visible baseline：在可见 object/decision 上显示 Confirmed / Inferred / Unknown。
- High-salience exceptions：`Conflicting`、`Locked`、blocking `Unknown` 应突出且在 overview 有 aggregate warning。
- Detail：`Pattern-based`、`Evidence-backed` 展开 source/evidence；`Rejected`、`Stale` 主要进入 history，除非影响当前 decision。
- Evidence trace：按需显示 source、actor、time、derivation、last reviewed；W3C PROV 支持这些 provenance facets 的建模方向（F-E15/F-E24）。

**Evidence-backed：** 不能只用颜色；provenance 应支持质量/可靠性判断。**Provisional：** status 的 visible subset 与 disclosure。**必须测试：** 术语释义、分类准确率、用户是否把 Confirmed 误解为 validated fact、是否把 Inferred 等同低 confidence、Unknown 是否造成不必要焦虑。

### 3.8 Structure Diff 如何减少理解成本

#### Candidate composition

```text
Compact operation summary
+ Contextual canvas highlight
+ Before / after on demand
+ Cascade impact
+ Why / confidence / approval state
```

每个 consequential change 最少应可取得：

| Field | 作用 | 状态 |
|---|---|---|
| operation: add/move/rename/reorder/merge/split/archive | 直接说明变化类型 | `01` normative |
| target label + canonical ID | 建立 correspondence | `01` normative + Provisional display |
| before / after parent, label, scope or path | 避免只看结果猜变化 | Evidence-backed comparison principle |
| reason | 解释 why | HAI evidence-backed |
| affected flow/scope/wireframe/constraint | 显示 cascade consequence | `01` normative |
| confidence / provenance | 防止过度确定 | `01` normative |
| approval state / available action | 说明下一步 | `01` normative |

#### Presentation rules as future input

- `+ / ~ / -` 文字 operation 必须存在；颜色/边框只做冗余强调。
- changed target 与 affected-but-unchanged references 应视觉区分。
- ancestor path 或 parent context 应保留，避免只见孤立 changed node。
- 默认先给可停留的 static diff；动画可辅助 correspondence，但不能成为唯一载体。
- candidate A/B 与 before/after 不应在同一 overlay 中混成四个状态。
- high-impact diff 继续遵守 `PROPOSE_FOR_APPROVAL`，视觉呈现不改变 autonomy rule。

Visual comparison research支持 juxtaposition、superposition、explicit encoding 的组合，并指出 explicit diff 会失去原对象 context；TreeVersity 小样本也显示 color/glyph 与 legend 容易被误读（F-E11/F-E12）。因此 **default composition 为 Provisional，必须对照测试：**

1. operation list + in-place highlight；
2. side-by-side before/after + linked highlight；
3. overlay/animation + static summary。

主要指标：changed operation recall、affected path识别、错误批准、review time、edit/reject success、恢复原状态能力。

### 3.9 如何避免 Canvas 信息过载

#### Evidence-backed constraints

- Node-link graph 在规模/密度上会出现 cognitive-load cliff，具体阈值不可迁移（F-E08）。
- Node-link 并非 inventory、attribute comparison 等所有任务的最佳表征（F-E09）。
- Progressive disclosure 的 primary/secondary split 需 task/user evidence（F-E01）。
- Wireflow 的 full desktop screens 可能吞掉 process context（F-E10）。

#### Candidate controls

| Control | 意图 | 状态 |
|---|---|---|
| Task-specific projection | 一次回答一种主要问题，不让 IA/Flow/Wireframe/Scope 全部同强度显示 | Provisional |
| One primary analytical overlay | Flow、Scope、Validation、Diff 中一次只突出一个，critical warning 例外 | Provisional；需测试 |
| Aggregate + drill-down | overview 显示 group/count/warning，detail 显示 node | Evidence-backed pattern；聚合规则需测试 |
| Selection-based edge reveal | 默认隐藏 secondary/cross edges，选择后显示相关 edge | Provisional |
| Filter by path/status/scope | 让用户围绕当前任务缩小图 | Evidence-backed capability |
| Candidate separation | A/B 默认并列而非完全 superimpose | Evidence-backed comparison trade-off；形式需测试 |
| Linked text outside graph | 长 rationale/evidence 不占 node body，但与 node 直接链接 | Evidence-backed representation fit + split-attention constraint |
| Overview/reset | 在 pan/zoom/focus 后恢复定位 | Evidence-backed orientation capability |
| Stable notation | node type、edge type、status 在 projection 间语义一致 | Provisional；必须验证 learnability |

**不要制定未经测试的数量阈值：** node limit、edge limit、overlay limit、zoom breakpoint、label truncation length。应使用真实 David gold cases 建立 small/medium/large/stress blueprints，再测 task success 和 lostness。

### 3.10 IA 与 Wireframe 组合是否会损害可读性

**回答：会，在“全图常驻完整 Wireframe”时很可能损害；不会，在“选中节点的局部 expansion + 保留 IA/Flow context”时有专业依据，但仍需测试。**

候选规则：

1. Wireframe 只从满足 readiness gate 的 node mini-IA 生成。
2. 默认 IA node 保持抽象；只有 selected/active node 展开 mini-IA 或 wireframe。
3. 展开后保留 parent/ancestor、incoming/outgoing core flow 和 scope/provenance。
4. Desktop wireflow 只需展示变化区域或 interaction hotspot，不重复整张 screen。
5. Flow edge 必须指向 triggering action/state，避免箭头只连 screen 边框。
6. Wireframe expansion 可 collapse；collapse 不删除 canonical wireframe data。
7. 不把多个 high-detail wireframes 与全量 IA/Flow edges 同时作为默认状态。

依据来自 NN/g Wireflows：wireflow 弥补 flowchart 缺少 page context，但 full desktop wireframe 可能使流程 context 消失（F-E10）。具体 expansion 方式、最大并列节点数和 transition 必须 prototype/user test。

## 4. Evidence / Provisional / Test Matrix

| Topic | Evidence-backed | Provisional for David | 必须 Prototype/User Test |
|---|---|---|---|
| Progressive visualization | 显示 meaningful partial artifacts，允许 correction/steering | 以九类 artifact boundary 更新同一 Canvas | 用户是否理解阶段演化，而非把中间态当 final |
| Always visible | context、correction、history、critical state 应可达 | Bet、projection、selection、provenance、decision、Undo 的 persistent set | 哪些元素真正常看；窄屏如何降级 |
| Disclosure | 核心先行，细节按需；active references 不应 split attention | 六层 disclosure candidate | 展开路径、术语、发现率、lostness |
| Chat/Canvas/Panel | context、why、correction、consequence 应协同 | 三种职责与 shared selection | 固定 layout、出现时机、跨 surface switching cost |
| Graphic vs text | topology/path 用图；精确命题用文；表征与 task 匹配 | 具体 artifact mapping | target users 的自然理解与偏好 |
| Semantic Zoom | 定义与 multiscale potential | overview/structure/node-detail 三层 | 对 explicit expand 的 task outcome、误解和 accessibility |
| Focus+Context | 多种机制有 trade-off，无 universal winner | 非失真 selection focus | 与 pan+zoom/overview+detail 的对照 |
| Provenance | source/derivation/history 有价值；不能 color-only | 三状态 baseline + exceptions on demand | status comprehension 与 appropriate reliance |
| Structure Diff | explicit encoding + context；static history/Undo | operation list + canvas highlight + impact | diff mode、moved/renamed/cascade 识别 |
| Overload | graph scale/density、multiple representations 有认知成本 | one primary overlay、aggregation、edge reveal | David blueprint breakpoints |
| IA + Wireframe | wireflow 补充 page context，但 full desktop screens 占空间 | active-node local expansion | readability、flow trace、return-to-IA |
| Animation / layout stability | 动画与 small multiples 有 trade-off；mental-map benefit 非普适 | 保持 identity、尽量少扰动 | 何时动画提高 correspondence，何时拖慢 review |
| 2.5D | 没有 David 直接支持；比较综述提示 perceptual concerns | 不进入 P0 candidate | 只有明确 2D failure 后才值得测试 |

## 5. 给未来 `02_canvas_interaction_spec.md` 的输入

以下是 **candidate requirements**，不是已冻结规范。

| Input ID | Candidate requirement | Maturity | 未来验收问题 |
|---|---|---|---|
| CANVAS-IN-01 | 所有 projection 必须读取同一 canonical IDs，不复制独立 artifact state | `00/01` invariant | 同一 node 在 IA、Flow、Wireframe、Diff 中是否可追踪？ |
| CANVAS-IN-02 | 每次 visual update 应对应 semantic artifact/change boundary，而非 token-level reasoning stream | Evidence-backed + `01` | 用户能否解释这次更新改变了什么？ |
| CANVAS-IN-03 | 用户必须能识别 current projection、selection、active decision 和 critical blocker | Provisional | 未提示时是否能正确说出当前位置与下一步？ |
| CANVAS-IN-04 | Chat、Canvas、Decision surface 必须共享 selection 和 canonical references | Provisional | 跨 surface 导航是否无需重新搜索 target？ |
| CANVAS-IN-05 | `Confirmed / Inferred / Unknown` 必须使用 text/非颜色冗余编码；confidence 单独表达 | Evidence-backed | 用户是否正确分类，且无 color vision 依赖？ |
| CANVAS-IN-06 | 关键 provenance detail 必须可追踪到 source/actor/time/derivation/version | Evidence-backed model；display Provisional | 用户能否回答“这个结论从哪里来”？ |
| CANVAS-IN-07 | Consequential change 必须同时提供 explicit operation summary、context、cascade impact 和 approval action | `01` invariant + evidence-backed | 用户能否识别 change、影响与待执行 action？ |
| CANVAS-IN-08 | Animation 不得是唯一 diff/history 表示；static state 必须可停留和复查 | Evidence-backed | 关闭/错过动画后是否仍可完成 review？ |
| CANVAS-IN-09 | Canvas 必须支持 task-specific layer/filter 和 overview recovery | Evidence-backed capability | focus/zoom 后能否无外援返回正确位置？ |
| CANVAS-IN-10 | Flow、Scope、Validation、Diff 的同时强调应受控制 | Provisional | 多 overlay 是否显著降低 path/diff comprehension？ |
| CANVAS-IN-11 | Wireframe 默认作为 active IA node 的 local expansion，而非全图替换 | Evidence-backed boundary + Provisional interaction | 展开后能否仍回答 node 在 IA/Flow 中的位置？ |
| CANVAS-IN-12 | Semantic Zoom 若采用，必须有定义清楚的 semantic levels 和 explicit alternative controls | Prototype gate | 相比 explicit expand 是否提高 task success 且不增加误解？ |
| CANVAS-IN-13 | Focus+Context 默认候选应避免几何失真；fisheye/2.5D 需单独实验 | Provisional | 是否比普通 pan+zoom/overview+detail更好？ |
| CANVAS-IN-14 | 图形信息应有 text/programmatic alternative，status 不得 color-only | Accessibility invariant | keyboard/screen-reader path 是否可完成等价任务？ |
| CANVAS-IN-15 | History/Undo 必须可达但默认压缩到 relevant summary | Evidence-backed + Provisional disclosure | 用户能否恢复最近变更并找到 superseded decision？ |
| CANVAS-IN-16 | 不设未经真实 cases 校准的 node/edge/zoom/overlay 硬阈值 | Research constraint | 阈值是否来自 target task data 而非文献误用？ |

### 5.1 Future `02` 需要消费的事件/状态，不在本轮定义 schema

- current projection / maturity；
- current selection canonical ID；
- provenance facets 与 confidence；
- ChangeSet operations、before/after、cascade impacts、approval state；
- visible layer/filter/focus state；
- viewport semantic level（若测试 Semantic Zoom）；
- node mini-IA / wireframe readiness；
- locked/blocker/validation summary；
- latest reversible change 与 version/history reference。

这些字段的正式 domain schema 属于未来 `03_blueprint_domain_schema.md`，本文件只说明 Canvas 消费需求。

## 6. 必须执行的 Prototype / User Tests

### 6.1 Participants

目标参与者必须满足 David Mode B 核心 segment：

```text
会使用 Cursor / Claude Code / Codex 等 Coding Agent
+ 有模糊 Idea 或需求描述
+ 非系统 PM/IA 专家，或自认在产品结构判断上缺口明显
```

可增加 PM/UX expert 作为 diagnostic comparison，但不能用专家替代目标用户。

### 6.2 Test Modules

| Test ID | 核心问题 | Prototype variants | Tasks | 主要 measures |
|---|---|---|---|---|
| PT-F01 Evolution comprehension | 用户是否理解九阶段是同一 Blueprint 的演化？ | unified progressive canvas vs separated stage artifacts | unprompted teach-back；指出 upstream assumption 如何影响 IA | comprehension coding、错误因果、回溯行为 |
| PT-F02 Surface coordination | Chat/Canvas/Decision 分工是否降低查找成本？ | shared selection/cross-highlight vs weak linking | 从 Chat correction 定位 node；review active decision | target locate time、wrong-target action、surface switches |
| PT-F03 Semantic Zoom | Semantic Zoom 是否优于 explicit expand？ | semantic levels vs geometric zoom + explicit expand | 从 overview 找 node、查 provenance、回到 overview | success/error、lostness、reset、representation-change awareness |
| PT-F04 Focus+Context | 哪种机制支持 orientation？ | selection focus + dim；overview+detail；plain pan/zoom；可选 fisheye | trace core path、查 sibling、返回 root | path accuracy、navigation operations、workload |
| PT-F05 Provenance | status 是否被正确理解？ | text+icon+color；text+pattern；不同 disclosure | 分类 Confirmed/Inferred/Unknown；指出 source；决定 confirm/correct/test | classification、appropriate action、confidence calibration |
| PT-F06 Structure Diff | 哪种 diff 最少误批/漏看？ | list+in-place；side-by-side；overlay/animation+static | 找 add/move/rename/remove；识别 cascade；Approve/Edit/Reject | precision/recall、review time、wrong approval、rationale recall |
| PT-F07 IA + Wireframe | local expansion 是否保留结构理解？ | active-node expansion；separate wireframe view；multiple inline wireframes | trace entry→action→next state；回到 IA parent | path accuracy、orientation、clutter rating、return success |
| PT-F08 Overload | 何时 graph/overlay 失效？ | real small/medium/large/stress gold cases；不同 layer controls | find node、compare candidate、trace flow、find blocker | accuracy/time、abandonment、filters used、subjective workload |
| PT-F09 Progressive correction | visual proposal 是否比再问一题更易纠正？ | visual hypothesis + one question vs text-only clarification | 发现并修正错误 intent/grouping | correction completeness、turns、downstream rework |
| PT-F10 Accessibility | 非颜色/keyboard alternatives 是否等价 | keyboard + screen reader path；color vision simulation | status identification、node navigation、diff review | task success、focus order、announcements、error recovery |

### 6.3 不应只测 task time

CHI 2024 的 high-level comprehension 研究说明，cued task performance 不足以代表用户自然形成的理解（F-E21）。因此每个关键 test 至少同时收集：

- **Unprompted comprehension：** “请用自己的话说这张 Canvas 在表达什么。”
- **Cued task success：** 找 node、trace path、识别 change、判断 provenance。
- **Correction behavior：** 用户是否能在不重述全部上下文的情况下修正 Blueprint。
- **Decision quality：** 是否批准正确 change、发现 core-flow break、选择合理下一步。
- **Orientation/lostness：** 是否频繁 reset、来回 pan、打开错误 surface 或放弃。
- **Subjective workload：** 只作为一维，不替代行为数据。
- **Terminology interpretation：** 对 Intent、Object、IA、Flow、Confirmed、Inferred、Unknown 的自然解释。
- **Delayed recall：** 短暂离开后能否找回 current decision 与 change context。

本研究不提供虚构 pass rate。未来团队应在 prototype 前定义 baseline、错误严重度与“何种差异会改变 spec”，再根据结果冻结规则。

## 7. 可桌面研究定稿与不可定稿的边界

### 7.1 可作为 future spec 原则

- 一个 canonical blueprint、多 projection；
- 图形/文字按任务分工；
- overview/filter/details/history 能力；
- active decision 的 context、why、impact、correction 可达；
- provenance 可追溯且不与 confidence 混同；
- status 不得 color-only；
- diff 不能只靠动画或纯 before/after 心智比较；
- graph 必须有 aggregation/filter/focus 策略；
- wireframe 不应全图常驻。

### 7.2 只能保持 Provisional

- 始终可见信息的具体集合与优先级；
- Chat/Canvas/Decision 的固定形态；
- one primary overlay；
- active-node expansion 的交互；
- layout stability；
- default diff composition；
- provenance status 的 visible subset；
- auto-layout、grouping 与 overview recovery 方式。

### 7.3 必须 Prototype/User Test

- 用户是否理解完整演化链；
- Semantic Zoom 与 explicit expand 的取舍；
- Focus+Context variant；
- provenance vocabulary 与 appropriate reliance；
- Structure Diff 的模式与 cascade comprehension；
- Canvas overload breakpoint；
- IA + Wireframe 的可读性；
- 2.5D 是否有任何净收益；
- 窄屏、keyboard、screen reader 与 reduced motion 行为。

## 8. 与 `01` 的冲突和 Patch 输入

| `01` 位置 | 当前方向 | Research finding | 给 Coordinator 的输入 |
|---|---|---|---|
| §13.2 Progressive visual evolution | 九阶段投影 | 方向成立，但效果未在 David 用户验证 | 保留 SHOULD；补“semantic artifact boundary、非线性、maturity/provenance” |
| §13.3 Recommended workbench | Conversation / Canvas / Decision Panel | 职责分工合理，固定 layout 未验证 | 标记为 provisional workbench，不作为实现 invariant |
| §13.4 Visual status language | 9+ statuses | 全量常驻会过载，且不能 color-only | 规定 semantic vocabulary；visible subset 留给 `02` 测试 |
| §13.5 Structure Diff | `+ / ~ / -` + reason/impact | 有 comparison evidence；具体模式未定 | 增加 static inspectability、before/after、canonical ID、non-color encoding |
| §4.10 Wireframe rule | selected node expansion + Flow overlay | 与 wireflow evidence一致 | 保留方向；补“不默认同时展开多个 full desktop wireframes” |
| Appendix B Canvas comprehension | Semantic Zoom / 2.5D | Semantic Zoom 仅候选；2.5D 有 perceptual concern | 2.5D 不进入 P0 default；必须 prototype gate |

本角色不直接修改 `01`；上表仅供 Coordinator 的 Patch Proposal。

## 9. Limitations

1. 没有直接研究覆盖 David 的完整九阶段演化或目标用户。
2. 多数证据来自 information visualization、dynamic graphs、教学材料和 data analysis，外推必须保守。
3. Semantic Zoom 只有定义和相邻机制研究，缺少 David task outcome evidence。
4. Provenance/uncertainty 文献多研究 data lineage、interaction history 或 AI prediction confidence，不等同 David 的事实来源状态。
5. 近 24 个月的直接 Canvas evidence 主要是小样本 preprint；产品官网多为 capability/marketing，未用于 outcome Claim。
6. Graph node-count、density、overlay-count、disclosure-depth 和 zoom threshold 没有可迁移阈值。
7. 本轮未执行 prototype、accessibility audit、target-user session 或真实 builder workflow observation。
8. agent-reach CLI/Exa backend 不可用；已记录失败并改用 web search，可能存在覆盖缺口。

## 10. Final Input to `02`

未来 `02_canvas_interaction_spec.md` 应先冻结 **information responsibilities、cross-surface contract、status semantics、diff inspectability、accessibility 与 prototype gates**，再决定 exact layout、zoom behavior 和 motion。当前最不应提前冻结的是 Semantic Zoom thresholds、fisheye/2.5D、固定三栏、全量 status 常驻和同时叠加 IA/Flow/Wireframe/Scope 的“总览图”。
