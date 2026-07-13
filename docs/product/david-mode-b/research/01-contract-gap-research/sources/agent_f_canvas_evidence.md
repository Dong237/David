# Agent F — Canvas Comprehension Evidence

> 角色：F — Canvas Comprehension & Visual Interaction  
> 研究日期：2026-07-10  
> 研究类型：Desktop research；未执行 David 真实用户研究或产品实验  
> 权威输入：`01_ia_reasoning_and_agent_autonomy_contract.md` > `00_david_mode_b_positioning_and_principles.md` > 其他资料  
> 对应主文件：`../08_canvas_comprehension_research.md`

## 1. 证据分级与使用边界

| 标记 | 含义 | 本文件用法 |
|---|---|---|
| A | 原始论文、标准、方法所有者原文或官方文档，且与 Claim 直接相关 | 可支持一般原则；仍不能直接证明 David 具体交互有效 |
| B | 权威专业指南或高质量研究综述 | 可支持设计边界和候选规则 |
| C | 小样本探索性研究、preprint、产品官方实践或 practitioner evidence | 只支持假设和原型方向 |
| D | 营销、二手摘要、单帖或无法核验材料 | 不进入关键 Claim |

`Confidence` 只表示“来源对该 Claim 的支持强度”，不表示该 Claim 对产品的重要程度。凡涉及 David 目标用户、精确交互、阈值或默认方式，均不能仅凭相邻领域研究标为已验证。

## 2. Query Log

### 2.1 Agent Reach 失败链

| ID | 日期 | Query / command | 结果 | 处理 |
|---|---|---|---|---|
| QF-00 | 2026-07-10 | `mcporter call 'exa.web_search_exa(...)'`，分别执行 QF-01 的 4 个 query | `Unknown MCP server 'exa'` | 未使用任何返回摘要；切换到内置 web search |
| QF-00B | 2026-07-10 | `agent-reach doctor --json` | `/bin/bash: agent-reach: command not found` | 记录为环境限制；继续使用 web search + 原文直读 |

### 2.2 实际 Search Queries

| Batch | Query | 主要用途 |
|---|---|---|
| QF-01 | `semantic zoom focus context overview detail visualization empirical study primary paper` | Semantic Zoom、Focus+Context、overview+detail |
| QF-01 | `progressive visualization progressive visual analytics user expectations primary paper` | Progressive visualization |
| QF-01 | `visual comparison change diff trees explicit encoding juxtaposition superposition primary paper` | Structure Diff |
| QF-01 | `uncertainty visualization provenance visualization user comprehension primary paper` | Provenance / uncertainty |
| QF-02 | `site:cs.umd.edu Shneiderman overview first zoom filter details on demand 1996 paper PDF` | Visual Information-Seeking Mantra |
| QF-02 | `Pad++ semantic zoom Bederson Hollan primary paper PDF` | Semantic Zoom 定义 |
| QF-02 | `site:nngroup.com progressive disclosure wireflows information overload` | Progressive disclosure、wireflow |
| QF-02 | `graph visualization edge crossings comprehension empirical study primary paper node-link` | Graph readability |
| QF-03 | `site:nngroup.com/articles/progressive-disclosure Progressive Disclosure` | NN/g 原文定位 |
| QF-03 | `site:nngroup.com/articles/wireflows Wireflows UX deliverable` | NN/g 原文定位 |
| QF-03 | `site:w3.org/TR/prov-overview provenance W3C recommendation` | Provenance 标准 |
| QF-03 | `uncertainty visualization user decision making empirical study CHI primary paper trust confidence` | Uncertainty 与 trust / decision |
| QF-04 | `split attention effect diagrams text cognitive load primary study Sweller Chandler 1992 PDF` | Chat / Canvas / Panel 的信息整合成本 |
| QF-04 | `multiple views visualization cognitive load integration cost split attention empirical primary paper` | 多视图认知成本 |
| QF-04 | `graph visualization scalability cognitive load controlled study shortest path node link primary paper` | Canvas overload |
| QF-04 | `animated transitions graph layout preserve mental map empirical study primary paper` | Dynamic graph / animation |
| QF-05 | `Characterizing provenance in visualization and data analysis Ragan Endert Sanyal Chen primary paper` | Provenance 类型与目的 |
| QF-05 | `Graphical histories for visualization supporting analysis communication evaluation Heer primary paper` | History / Undo |
| QF-05 | `provenance visualization design history uncertainty interface user study primary paper` | Provenance visualization |
| QF-05 | `human AI provenance visualization source status confirmed inferred unknown interface study` | Human-AI provenance；未找到 David-equivalent 直接证据 |
| QF-06 | `Why a diagram is sometimes worth ten thousand words Larkin Simon 1987 primary paper PDF` | 图形与文字分工 |
| QF-06 | `diagrams text problem solving computational efficiency Larkin Simon primary paper` | 图形与文字分工 |
| QF-06 | `diagram versus text cognitive tasks relationships topology empirical HCI primary paper` | 表征与任务匹配 |
| QF-06 | `visualization graphical perception relationships text rationale interface primary study` | 表征与任务匹配 |
| QF-07 | `Miro semantic zoom infinite canvas official` | 当前 Canvas 产品实践 |
| QF-07 | `Figma semantic zoom canvas official documentation` | 当前 Canvas 产品实践 |
| QF-07 | `infinite canvas semantic zoom practitioner case product design` | Practitioner evidence |
| QF-07 | `visual programming canvas semantic zoom user discussion graph wireframe` | Practitioner evidence |
| QF-08 | `Difference Map Readability for Dynamic Graphs Archambault Purchase Pinaud 2010 primary paper` | Difference map |
| QF-08 | `structure diff tree comparison user study graph change comprehension` | Tree diff |
| QF-08 | `dynamic graph difference visualization added removed moved nodes user study primary` | Change comprehension |
| QF-08 | `visual diff interface change detection side by side overlay user study primary` | Diff presentation modes |

### 2.3 Direct URL Verification

对搜索候选逐一打开原文，重点核对：论文/页面日期、研究对象、样本或方法、实际支持点和作者自述限制。直接打开的权威页面包括 NN/g、Microsoft Research、W3C、University of Maryland、University of Wisconsin、University of Washington、Virginia Tech、Harvard VCG、Frontiers、SAGE/Wiley DOI 页面及论文 PDF。

### 2.4 筛除项

- Miro “Intelligent Canvas” 产品博客只描述厂商定位，缺少可审计的方法与 outcome evidence，未进入关键 Claim。
- Figma / Miro 官方帮助文档只能证明产品提供 `zoom to fit`、`zoom to selection`、layer toggle 等实践，不能证明 Semantic Zoom 对 David 有效。
- Reddit 中关于 infinite canvas、zoom 与 board clutter 的单帖仅作为检索线索，不证明普遍规律。
- Wikipedia、ResearchGate 摘要和搜索引擎摘要只用于定位原始材料；有原文时不作为独立证据。

## 3. Claim–Evidence Records

### F-E01 — Progressive disclosure 应先显示核心、再按需显示次要内容

- **Claim：** Progressive disclosure 可降低初始界面的学习和扫描负担，但“哪些属于核心”必须由任务与用户证据校准。
- **Source title：** *Progressive Disclosure*
- **Source type / quality：** NN/g authoritative professional guidance，B
- **URL：** https://www.nngroup.com/articles/progressive-disclosure/
- **Publication / update date：** 2006-12-03
- **Exact supported point：** 原文建议初始只显示最重要的少量选项，次要和少用功能按需展开；同时明确要求通过 task analysis、field studies、analytics 与 usability testing 决定 primary/secondary split，并警告超过两级披露常使用户迷失。
- **Limitations：** 主要讨论应用功能与网页内容，不是 evolving AI blueprint；“两级”不能直接成为 David 的硬阈值。
- **David implication：** Canvas 初始投影应突出当前结构、核心路径、待决事项；证据、完整 rationale、全部状态与历史按需展开。具体层级必须 prototype/user test。
- **Confidence：** High（仅限一般 progressive disclosure 原则）

### F-E02 — Overview、filter、details-on-demand 是起点，不是固定顺序定律

- **Claim：** 大信息空间需要 overview、filter、details、history 等能力，但不能把“overview first”误写成所有任务都必须线性执行的 UI 流程。
- **Source title：** *The Eyes Have It: A Task by Data Type Taxonomy for Information Visualizations*
- **Source type / quality：** IEEE primary conceptual paper，A
- **URL：** https://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf
- **Publication / update date：** 1996
- **Exact supported point：** 论文提出 “overview first, zoom and filter, then details-on-demand”，并列出 overview、zoom、filter、details-on-demand、relate、history、extract 七类任务；作者也明确称该 mantra 只是起点。
- **Limitations：** 不是 David 用户实验，且不支持固定三栏布局、缩放阈值或 staged wizard。
- **David implication：** 未来 `02` 应保证全局定位、筛选、按需细节和历史可达，但允许用户非线性跳转与回退。
- **Confidence：** High

### F-E03 — Semantic Zoom 的定义是“表征随尺度改变”，并非普通缩放

- **Claim：** 只有当对象在不同尺度呈现不同抽象层级时，才应称 Semantic Zoom；单纯放大/缩小不是 Semantic Zoom。
- **Source title：** *Pad++: A Zoomable Graphical Interface System*
- **Source type / quality：** CHI primary system paper，A
- **URL：** https://hci.ucsd.edu/hollan/Pubs/JH1995-1.pdf
- **Publication / update date：** 1995
- **Exact supported point：** Pad++ 将 semantic zooming 定义为对象随 size、view complexity、task 等改变外观；缩小时显示简化 rendering，放大时显示更多细节。
- **Limitations：** 论文展示系统能力与原型目标，没有证明 David 式 IA→wireframe 语义层切换的效果。
- **David implication：** 若 `02` 使用该术语，必须定义每一语义层保留/省略的信息，并保证用户可预测；否则应使用普通 zoom + explicit expand。
- **Confidence：** High（定义）；Low（David 适用性）

### F-E04 — Focus+Context、overview+detail 与 zoom 各有机制和 trade-off

- **Claim：** 不存在可从文献直接推出的单一最佳 focus/context 机制。
- **Source title：** *A Review of Overview+Detail, Zooming, and Focus+Context Interfaces*
- **Source type / quality：** ACM Computing Surveys review，A
- **URL：** https://www.microsoft.com/en-us/research/publication/a-review-of-overviewdetail-zooming-and-focuscontext-interfaces/
- **Publication / update date：** 2008-01
- **Exact supported point：** 综述将机制分为 overview+detail（空间分离）、zooming（时间分离）、focus+context（焦点嵌于上下文）和 cue-based highlighting/suppression，并总结成功与失败的实证结果。
- **Limitations：** 跨多种数据和任务的综述，不给 David 默认方案；摘要本身不支持具体 performance 数字。
- **David implication：** `02` 应按 orientation、comparison、editing 等任务选择机制，并保留可对照的原型变量。
- **Confidence：** High

### F-E05 — Focus+Context 可能不如普通 pan+zoom

- **Claim：** Focus+Context 不应成为 David 的未经测试默认值。
- **Source title：** *The Pattern is in the Details: An Evaluation of Interaction Techniques for Locating, Searching, and Contextualizing Details in Multivariate Matrix Visualizations*
- **Source type / quality：** ACM peer-reviewed empirical study，A
- **URL：** https://vtechworks.lib.vt.edu/items/7e113598-2f28-4398-ac4d-e09b72a98391
- **Publication / update date：** 2022-04-27
- **Exact supported point：** 两项研究先比较四种 focus+context 技术，再将最佳 fisheye 与 pan+zoom、overview+detail 比较；pan+zoom 在 locating/searching details 上更快，并在 contextualizing details 上不差于 overview+detail。
- **Limitations：** 研究对象是 multivariate matrix，不是 IA graph；不能推出 pan+zoom 对 David 一定更好。
- **David implication：** fisheye/distortion 只能作为实验变体；P0 候选应优先测试较可预测的 selection focus、dim unrelated、pan/zoom 与 overview cue。
- **Confidence：** High（该任务研究结果）；Medium（反对无条件默认的外推）

### F-E06 — 图形擅长空间关系与搜索，文字擅长序列和精确命题

- **Claim：** 图形与文字应按认知任务分工，而不是把所有 rationale 塞入 graph 或把结构全部写成长文。
- **Source title：** *Why a Diagram is (Sometimes) Worth Ten Thousand Words*
- **Source type / quality：** Cognitive Science primary theoretical/computational paper，A
- **URL：** https://doi.org/10.1111/j.1551-6708.1987.tb00863.x
- **Publication / update date：** 1987-01/03
- **Exact supported point：** 论文区分 sequential sentential representation 与 spatially indexed diagram；图形可把关系显式放在同一位置，降低信息搜索与某些推理的计算成本，但效果取决于 representation 与 operator/task 的匹配。
- **Limitations：** 例子来自数学和物理问题，不是产品 IA；不证明“图一定优于文字”。
- **David implication：** Canvas 适合拓扑、分组、层级、路径和变化；rationale、assumption、evidence limitation、AC 等精确内容应以文字表达，并与对应节点直接关联。
- **Confidence：** High

### F-E07 — 分离的相互引用文字与图形会增加 split-attention 成本

- **Claim：** Chat、Canvas、Decision Panel 可以分工，但不能迫使用户在远离的内容间反复搜索和心智配对。
- **Source title：** *The Split-Attention Effect as a Factor in the Design of Instruction*
- **Source type / quality：** British Journal of Educational Psychology empirical paper，A
- **URL：** https://doi.org/10.1111/j.2044-8279.1992.tb01017.x
- **Publication / update date：** 1992-06
- **Exact supported point：** 两项实验发现，需在相互引用的文字与图形之间心智整合会产生额外认知活动；物理整合后的材料减少处理时间并改善测试表现。
- **Limitations：** 教学材料研究，不是交互式 Canvas；“整合”不等于把所有文字覆盖在节点上。
- **David implication：** 选中节点、active diff、rationale 与决策控制必须通过 selection、cross-highlight、anchored reference 或直接邻接保持可追踪；重复全文同样会制造噪声。
- **Confidence：** High（split-attention 原则）；Medium（David UI 外推）

### F-E08 — Node-link graph 会随规模和密度形成高认知负担

- **Claim：** Canvas 不能把完整 Blueprint 的所有节点、边和 overlay 同时展开。
- **Source title：** *Scalability of Network Visualisation from a Cognitive Load Perspective*
- **Source type / quality：** IEEE TVCG controlled study，A
- **URL：** https://vcg.seas.harvard.edu/publications/20201001-scalability-of-network-visualisation-from-a-cognitive-load-perspective
- **Publication / update date：** 2020-10-01
- **Exact supported point：** 研究以 25–175 nodes、不同 density 的 shortest-path tasks 测量 accuracy、time、subjective 与 physiological workload；高密图超过 50 nodes、低密图超过 100 nodes 时参与者出现显著困难，global graph features 的影响通常大于局部 path features。
- **Limitations：** 阈值仅适用于该图、布局和 shortest-path task；绝不能直接成为 David 节点上限。
- **David implication：** 需要 aggregation、filter、layer control、local focus 和 task-specific subgraph；`02` 必须以 David 真实蓝图规模测试 overload breakpoints。
- **Confidence：** High（研究结果）；Medium（一般 clutter implication）

### F-E09 — Node-link 不是所有 graph task 的最佳表征

- **Claim：** David 不应把所有对象关系、inventory 和 diff 都强制编码为 node-link。
- **Source title：** *On the Readability of Graphs Using Node-Link and Matrix-Based Representations: A Controlled Experiment and Statistical Analysis*
- **Source type / quality：** Information Visualization controlled experiment，A
- **URL：** https://doi.org/10.1057/palgrave.ivs.9500092
- **Publication / update date：** 2005-06
- **Exact supported point：** 七类 graph tasks 的对照实验中，matrix 在研究设置里对大于 20 vertices 的多数任务优于 node-link，而 path finding 一直更有利于 node-link。
- **Limitations：** 具体 20-node 结果高度依赖 graph、task 与 encoding；David 的 IA 多为稀疏有向层级，不能套用阈值。
- **David implication：** topology/path 用 graph；inventory、attribute comparison、validation list 可能更适合 cards/table/list；表示法必须与任务匹配。
- **Confidence：** High

### F-E10 — Wireflow 可把 screen context 与 flow 结合，但 desktop full-screen wireframes 会挤压流程上下文

- **Claim：** IA 与 Wireframe 可以组合，但应局部、按任务展开，而不是全图每个节点都常驻完整 Wireframe。
- **Source title：** *Wireflows: A UX Deliverable for Workflows and Apps*
- **Source type / quality：** NN/g authoritative professional guidance，B
- **URL：** https://www.nngroup.com/articles/wireflows/
- **Publication / update date：** 2016-12-04
- **Exact supported point：** Wireflow 结合 wireframe 与 simplified flowchart，补足普通 flowchart 缺少 page context 的问题；对 desktop 可只显示发生变化的 screen region，完整 desktop wireframe 可能大到让人失去 process context；箭头必须指向明确 hotspot 以减少歧义。
- **Limitations：** 专业指南而非受控实验；主要针对 workflow deliverable，不是 live canonical canvas。
- **David implication：** Wireframe 应作为选中 IA node 的 expanded internal view；Flow 保持为可辨识 overlay，必要时只呈现变化区域和 triggering action。
- **Confidence：** High（方法内容）；Medium（David 交互外推）

### F-E11 — Structure Diff 有三类基础比较机制，且不存在单一正确表示

- **Claim：** David 的 Structure Diff 应结合 explicit encoding 与上下文，而不是只靠 before/after 心智比较或只靠动画。
- **Source title：** *Visual Comparison for Information Visualization*
- **Source type / quality：** Information Visualization survey/taxonomy paper，A
- **URL：** https://graphics.cs.wisc.edu/Papers/2011/GAWJHR11/paper.pdf
- **Publication / update date：** 2011-08-31
- **Exact supported point：** 对 110+ comparative visualization references 的综述归纳出 juxtaposition、superposition、explicit encoding 三类基础机制及其组合；explicit encoding 可聚焦关系但可能失去原对象上下文，juxtaposition + explicit encoding 可相互弥补；作者明确没有单一最佳答案，并指出 2.5D comparison 存在 perceptual concerns。
- **Limitations：** 这是 design-space taxonomy，不评估 David 的 `+ / ~ / -` diff 格式。
- **David implication：** 候选默认应同时提供 compact operation summary 与 canvas context/highlight；2.5D 不应因“更丰富”直接进入 P0。
- **Confidence：** High

### F-E12 — Tree diff 的视觉编码会被误解，文字标签与冗余编码仍需测试

- **Claim：** `Added / Moved / Renamed / Removed` 不应只靠颜色、边框或复杂 glyph 表示。
- **Source title：** *Interactive Visualizations for Comparing Two Trees With Structure and Node Value Changes*
- **Source type / quality：** University of Maryland primary design study，C
- **URL：** https://www.cs.umd.edu/content/interactive-visualizations-comparing-two-trees-structure-and-node-value-changes
- **Publication / update date：** 2012
- **Exact supported point：** 8 名 HCI 硕士新生对 46-node tree 的 think-aloud study 中，参与者能利用 side-by-side trees、DiffTree 与 coordinated highlight 理解多数变化，但常忽略 size encoding，误读 legend，且起初未理解新增/删除的黑白边框；用户建议使用语义更明确的文字标签。作者明确要求进一步研究一次显示多少信息。
- **Limitations：** 小样本、同质参与者、短时学习、不是 David 用户；不能证明其具体 glyph 可复用。
- **David implication：** Diff 应有文字 operation、target label/canonical ID、before/after、impact；颜色只做冗余强调。必须测试 moved/renamed 与 cascade impact 的识别。
- **Confidence：** Medium

### F-E13 — Animation 与 small multiples 存在速度/准确性 trade-off

- **Claim：** Canvas 变化不能仅靠动画传达；用户需要可停留、可复查的静态 diff/history。
- **Source title：** *Animation, Small Multiples, and the Effect of Mental Map Preservation in Dynamic Graphs*
- **Source type / quality：** IEEE TVCG empirical paper，A
- **URL：** https://doi.org/10.1109/TVCG.2010.78
- **Publication / update date：** 2010（issue 2011）
- **Exact supported point：** 五类 graph comprehension tasks 中，small multiples 总体及各任务更快；部分 added node/edge tasks 的 errors 更多，说明 animation 在 accuracy 优先时可能更好；mental-map preservation 对 time/error 影响很小。
- **Limitations：** 动态 graph benchmark，不是审批型 product diff；研究不支持禁用所有动画。
- **David implication：** 动画最多帮助保持 object correspondence，不能替代 operation list、before/after state 和 history；对 consequential diff 优先可复查性。
- **Confidence：** High

### F-E14 — “保持 mental map”不是已证实的普遍收益

- **Claim：** 结构变化时尽量稳定布局是合理候选，但不能写成已证实的 David comprehension rule。
- **Source title：** *The “Map” in the Mental Map: Experimental Results in Dynamic Graph Drawing*
- **Source type / quality：** International Journal of Human-Computer Studies review of experiments，A
- **URL：** https://doi.org/10.1016/j.ijhcs.2013.08.004
- **Publication / update date：** 2013-11
- **Exact supported point：** 综述报告，在 undirected dynamic graphs 的多项实验中，没有找到 mental-map preservation 对 comprehension 的一致正向效果；收益可能依赖 orientation/navigation task 和参与元素数量。
- **Limitations：** 重点是 undirected dynamic graph；David 的 IA 常为有向层级且用户需审查 changes。
- **David implication：** “未变节点保持位置”可作为 prototype variant，但应以 change detection、orientation 和 correction success 测试，而非硬规范。
- **Confidence：** High

### F-E15 — Provenance 至少应区分产物、活动/变换和责任主体

- **Claim：** Provenance 不能退化为单一 confidence 颜色；其目标是支持质量、可靠性与可信度判断。
- **Source title：** *PROV-Overview: An Overview of the PROV Family of Documents*
- **Source type / quality：** W3C Working Group Note linked to PROV Recommendations，A
- **URL：** https://www.w3.org/TR/prov-overview/
- **Publication / update date：** 2013-04-30
- **Exact supported point：** W3C 将 provenance 定义为参与产生数据/事物的 entities、activities、people 的信息，可用于评估质量、可靠性或可信度；PROV 支持 attribution、processing steps、versioning 和 derivation。
- **Limitations：** 数据互操作标准，不规定终端 UI，也不定义 `Confirmed / Inferred / Unknown`。
- **David implication：** 用户应能按需追踪 Blueprint field/decision 的 source、producer、derivation/change 与 version；status 与 confidence 必须是不同维度。
- **Confidence：** High

### F-E16 — History 支持 Undo、revisit、branch 与沟通，但历史本身也会膨胀

- **Claim：** 最新自动变更的 Undo 和 consequential decision history 有依据；把完整历史常驻 Canvas 则没有。
- **Source title：** *Graphical Histories for Visualization: Supporting Analysis, Communication, and Evaluation*
- **Source type / quality：** IEEE TVCG design-space analysis and system study，A
- **URL：** https://idl.uw.edu/papers/graphical-histories
- **Publication / update date：** 2008
- **Exact supported point：** 论文研究从 undo/redo 到 branching timelines 的 history mechanisms，展示其对 iterative interaction、analysis、communication 和 evaluation 的作用，并指出 history 需要在数据和视觉层面处理 scalability。
- **Limitations：** Tableau visual analysis，不是 AI 结构审批；不支持某种固定 timeline UI。
- **David implication：** Canvas/Decision surface 应可恢复最近 L1 变更、访问 approved/rejected/superseded version；默认只显示 relevant history summary。
- **Confidence：** High

### F-E17 — Human-AI UI 应支持 context、correction、explanation 与 cautious update

- **Claim：** 当前 selection 的 rationale、可纠正状态和变更通知应可达，不应只留在 Chat 历史里。
- **Source title：** *Guidelines for Human-AI Interaction*
- **Source type / quality：** CHI 2019 primary guideline synthesis + practitioner validation，A
- **URL：** https://www.microsoft.com/en-us/research/wp-content/uploads/2019/01/Guidelines-for-Human-AI-Interaction-camera-ready.pdf
- **Publication / update date：** 2019-05
- **Exact supported point：** 18 guidelines 经多轮评估和 49 名 design practitioners 对 20 个 AI products 的检查；直接相关项包括 show contextually relevant information、support efficient correction、make clear why、update/adapt cautiously、convey consequences、notify changes。
- **Limitations：** 评估的是 guidelines 的 applicability/clarity，不是 David Canvas outcome；不能推出三栏布局。
- **David implication：** Canvas 负责可定位的 active state，Decision surface 负责 why/impact/action，Chat 负责输入与澄清；三者必须共享 selection 和 canonical IDs。
- **Confidence：** High

### F-E18 — Provenance/uncertainty status 不得只用颜色

- **Claim：** `Confirmed / Inferred / Unknown` 至少需要文字或可程序识别的非颜色编码。
- **Source title：** *Web Content Accessibility Guidelines (WCAG) 2.2*
- **Source type / quality：** W3C Recommendation，A
- **URL：** https://www.w3.org/TR/WCAG22/
- **Publication / update date：** 2024-12-12
- **Exact supported point：** SC 1.4.1 要求颜色不能作为传达信息、动作或区分元素的唯一视觉手段；SC 1.3.1 要求 presentation 表达的信息、结构和关系可程序确定或有文字形式；SC 4.1.3 要求 status messages 可由辅助技术识别。
- **Limitations：** Accessibility conformance 不是 comprehension 实验；不决定 icon、pattern 或 label 的最佳组合。
- **David implication：** status 应使用 text label + icon/shape/pattern + optional color，Canvas 关系应有 text/list alternative；`Unknown` 不得仅靠变淡表现。
- **Confidence：** High

### F-E19 — Uncertainty encoding 会影响 trust，且效果受用户与编码影响

- **Claim：** 显示 uncertainty/provenance 是必要透明度输入，但不能假设“显示后一定更信任”或某个 visual channel 普遍最佳。
- **Source title：** *Trusting AI: Does Uncertainty Visualization Affect Decision-Making?*
- **Source type / quality：** Frontiers peer-reviewed original research，A
- **URL：** https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2025.1464348/full
- **Publication / update date：** 2025-02-07
- **Exact supported point：** 147 人 online study 使用静态经典游戏作为 human-AI proxy；uncertainty visualization 对 trust 的影响随既有 AI attitude、gaming experience 和 size/color saturation/transparency encoding 而变化，部分 decision/confidence 关系不显著。
- **Limitations：** 低风险游戏、MTurk、AI prediction confidence，不是 PM inference provenance；外推非常有限。
- **David implication：** `Confirmed / Inferred / Unknown` 的设计目标应是正确理解和校准，而不是提高 trust；必须测 classification accuracy、appropriate reliance 与 correction behavior。
- **Confidence：** Medium

### F-E20 — Canvas 有并列比较与保留迭代的潜力，也会形成混乱布局

- **Claim：** 单一 Canvas 适合保留版本和空间并列，但自动布局、组织与聚焦仍是必要问题。
- **Source title：** *Intelligent Canvas: Enabling Design-Like Exploratory Visual Data Analysis with Generative AI through Rapid Prototyping, Iteration and Curation*
- **Source type / quality：** 2024 preprint / exploratory user study，C
- **URL：** https://arxiv.org/abs/2402.08812
- **Publication / update date：** 2024-02-13
- **Exact supported point：** 10 名参与者进行 40 分钟 open-ended analysis 和 20 分钟访谈；参与者重视保留迭代、并列比较和自由组织，但也明确指出 non-linear canvas 可能难以管理、形成 chaotic layout；作者承认单一 task、MVP prototype 和无 performance baseline 等限制。
- **Limitations：** 小样本、visual data analysis、large display、研究者可答疑，不是 AI indie builder 或 IA task。
- **David implication：** 支持 unified living blueprint 的方向，但不能据此证明 infinite/freeform canvas；`02` 必须测试 guided layout、auto-focus 与可恢复 overview。
- **Confidence：** Low–Medium

### F-E21 — 高层 comprehension 不能只靠 cued task time/error 评估

- **Claim：** Canvas 测试必须同时问“用户自然理解了什么”，不能只测能否按提示找到节点。
- **Source title：** *Do You See What I See? A Qualitative Study Eliciting High-Level Visualization Comprehension*
- **Source type / quality：** CHI 2024 primary qualitative study，A
- **URL：** https://arxiv.org/abs/2402.15605
- **Publication / update date：** 2024-05（CHI 2024）
- **Exact supported point：** 对 line/bar/scatterplot 的自然语言描述与 think-aloud 研究发现，设计者意图与参与者高层理解经常不一致；cued low-level tasks 不足以预测用户自然形成的知识，complexity 和个人背景会影响 comprehension。
- **Limitations：** 统计图而非 IA graph；论文是 preliminary qualitative investigation。
- **David implication：** 测试应同时包含 unprompted teach-back（“这张图在表达什么、为什么这样组织、下一步是什么”）与 cued tasks。
- **Confidence：** Medium–High

### F-E22 — Provenance visualization 可能帮助回忆与反思，但 encoding 与心智模型会错配

- **Claim：** Provenance 应可按需探索，且其 encoding 需要单独 comprehension test。
- **Source title：** *Utilizing Provenance as an Attribute for Visual Data Analysis: A Design Probe with ProvenanceLens*
- **Source type / quality：** 2025 preprint, exploratory study，C
- **URL：** https://arxiv.org/abs/2505.11784
- **Publication / update date：** 2025-05-17
- **Exact supported point：** 16 人 exploratory study 将 interaction recency/frequency 映射到 color、size、position 等 channel；参与者能回答 provenance 问题并产生反思，但作者也观察到用户心智模型与 encoding 的错配和 surprise。
- **Limitations：** analytic interaction history，不是 evidence source/status；preprint、小样本、用户可自行配置 encoding。
- **David implication：** provenance detail 可成为 node/decision 的可探索属性，但不能仅靠视觉直觉；需要 legend、文字值、source trace 和 test。
- **Confidence：** Low–Medium

### F-E23 — Progressive partial results 必须“有意义”且不干扰 cognitive workflow

- **Claim：** David 不应把每个 agent intermediate event 都投到 Canvas；只应呈现语义完整、可纠正的 partial artifact。
- **Source title：** *Progressive Visual Analytics: User-Driven Visual Exploration of In-Progress Analytics*
- **Source type / quality：** IEEE TVCG primary system/case study，A
- **URL：** https://faculty.cc.gatech.edu/~stasko/papers/vast14-progress.pdf
- **Publication / update date：** 2014
- **Exact supported point：** PVA 让用户在 analytics 完成前查看 meaningful partial results 并 steering；设计要求 partial results 持续精化、允许 focus/ignore，并避免干扰 cognitive workflow。作者明确说明仅评估一个算法/任务、无 controlled comparison，需更多研究。
- **Limitations：** 长时数据算法，不是 PM reasoning pipeline；不支持实时显示 hidden chain-of-thought。
- **David implication：** 可视化事件应对应 Product Context、Intent、Inventory、Candidate IA、Diff 等稳定 artifact boundary，并带 maturity/provenance；不要流式暴露 token 级推理。
- **Confidence：** Medium

### F-E24 — Provenance 的类型与用途必须先定义，再选择 capture/visualization

- **Claim：** `source provenance`、`decision provenance`、`interaction history` 和 `confidence` 不应混成一个 badge。
- **Source title：** *Characterizing Provenance in Visualization and Data Analysis: An Organizational Framework of Provenance Types and Purposes*
- **Source type / quality：** IEEE TVCG organizational framework，A
- **URL：** https://faculty.cc.gatech.edu/~aendert3/resources/ragan-vast-2015.pdf
- **Publication / update date：** 2015-08-12 online / 2016-01 issue
- **Exact supported point：** 论文整理 visualization/data-analysis provenance 的不同 information types、purposes 与 capture considerations，用于指导设计知识组织和 evaluation method selection。
- **Limitations：** Framework 不指定 David status vocabulary 或视觉编码，也不证明显示越多越好。
- **David implication：** `02` 的视觉层只消费明确的 provenance facets；`03` schema 另行定义 source、derivation、actor、time、decision status 与 confidence。
- **Confidence：** High

## 4. 冲突与综合判断

| 冲突 | 来源 | 综合判断 |
|---|---|---|
| Progressive disclosure 减少初始复杂度 vs split-attention 要求整合相互引用信息 | F-E01 vs F-E07 | 不是简单“隐藏更多”。低频完整证据可折叠，但 active decision 的 rationale、diff 与 target 必须在上下文中直接可达。 |
| Focus+Context 直觉上保留上下文 vs pan+zoom 在特定研究中更快 | F-E04 vs F-E05 | 不指定 fisheye 为默认；用 David tasks 对 selection focus、overview+detail、pan+zoom 做对照。 |
| 稳定布局似乎有助 orientation vs dynamic graph 实验无一致收益 | F-E13/F-E14 | Layout stability 是可测试假设，不是规范事实；静态 diff/history 仍应存在。 |
| Node-link 直观表达 path vs 大/密 graph 形成 hairball，matrix 在部分任务更好 | F-E08/F-E09 | 用 graph 表达 hierarchy/path，用 cards/table/list 表达 inventory、attributes、validator；不要“一图统治全部”。 |
| Uncertainty 透明可能改善校准 vs encoding 也会改变 trust 或被误读 | F-E18/F-E19/F-E22 | 目标设为正确分类、适当依赖和可追溯，不设为“提高信任”；text label 作为稳定基线。 |
| Canvas 便于保留迭代和并列比较 vs 自由布局会混乱 | F-E20 | Unified canonical Canvas 仍可成立，但需要 guided projection、focus、overview recovery；infinite freeform 不是结论。 |
| Wireflow 增加 page context vs full desktop wireframe 吞掉 process context | F-E10 | 只展开 active node 或变化区域，保留 IA/Flow 的局部上下文。 |
| 2.5D 可组合比较方式 vs 存在 perceptual concerns | F-E11 | 2.5D 不进入 evidence-backed P0；只有在 2D prototypes 无法完成明确任务时再测试。 |

## 5. Limitations

1. 未找到直接研究 `Product Context → Intent → Objects → IA → Flow → Wireframe` 这一完整演化链的论文或产品实验。
2. 未找到针对“会使用 Coding Agent、但缺少系统产品设计能力的 AI 独立开发者”的 Canvas comprehension 数据。
3. 经典 visualization 研究多使用统计图、network、matrix 或教学材料；对 David 的外推必须保持 provisional。
4. Semantic Zoom 的经典来源定义清楚，但缺少 David task outcome evidence；主流 Canvas 产品的官方资料主要是 capability/marketing，不能替代实验。
5. `Confirmed / Inferred / Unknown` 是 David domain vocabulary；W3C、HAI 和 uncertainty literature 只能支持 transparency、accessibility 与 calibration 原则，不能验证这三个词的可理解性。
6. TreeVersity、Intelligent Canvas、ProvenanceLens 样本小且任务不同，只能作为 prototype hypothesis。
7. Node count、density、zoom level、overlay count、动画时长和 disclosure depth 均没有可直接迁移的科学阈值。
8. 未执行无障碍技术实测、移动/窄屏测试、多人协作测试或 downstream agent handoff 测试。
9. agent-reach CLI/Exa backend 在当前环境不可用；检索改走 web search，可能降低覆盖率。所有采用来源均已直接打开核对，未把搜索摘要当证据。

## 6. Evidence Status Summary

- **Evidence-backed general principles：** progressive disclosure；overview/filter/details/history；Semantic Zoom 定义；representation-task fit；split-attention；graph clutter；wireflow 边界；visual comparison taxonomy；provenance/undo/correction/accessibility。
- **Provisional David heuristics：** persistent orientation set；Chat/Canvas/Decision responsibilities；active-node wireframe expansion；one primary analytical overlay；semantic zoom layer contents；layout stability；default diff composition。
- **Must prototype/user test：** stage-chain comprehension；provenance vocabulary；Semantic Zoom 是否优于 explicit expand；Focus+Context variant；diff mode；IA+Wireframe readability；overload breakpoints；three-surface coordination；2.5D（若保留候选）。
