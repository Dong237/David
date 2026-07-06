# David Mode B Batch 1 吸收结论与下一步计划

> 本文档用于记录 Batch 1 deep research（Prompt 01–04）被吸收后的产品判断、收缩决策与下一步执行计划。  
> 目标：让后续 coding agents 明确：我们现在不是在做 AI UI generator、PRD bot、chat app 或通用 whiteboard，而是在做 **Bet-to-Blueprint 的结构化产品蓝图生成器**。

---

## 0. Batch 1 文件映射

| Prompt 编号 | 文件 | 主题 | 在本轮决策中的作用 |
|---|---|---|---|
| Prompt 01 | `deep-research-report.md` | 竞品深度调研与差异化定位 | 判断 David Mode B 在市场中的空位，不做什么，和竞品的差异化 wedge。 |
| Prompt 02 | `deep-research-report (1).md` | 目标用户与场景调研 | 确认 ICP、真实痛点、用户如何跳过 IA、为什么需要 blueprint。 |
| Prompt 03 | `deep-research-report (2).md` | 产品形态与信息架构 | 确认 David 自身产品形态、主布局、一级 IA、canvas-first 原则。 |
| Prompt 04 | `deep-research-report (3).md` | 从 Bet 推导 IA 的方法论 | 确认生成 pipeline、IA 节点 schema、页面存在规则、质量评估 checklist。 |

---

## 1. TL;DR 最终吸收结论

| 项 | Batch 1 后的判断 |
|---|---|
| 产品定位是否成立 | **成立，而且更清晰。** David Mode B 应该是面向 AI indie builder 的 **structure-first product blueprint generator**。 |
| 核心用户是否成立 | **成立。** 最值得服务的人不是专业 PM，而是会用 AI coding 工具、能很快 build，但在产品结构化、页面流程、scope 与 handoff 上失速的 beginner builder。 |
| 市场是否已有同类产品 | **有相邻产品，但没有同一条完整链路。** 市场有 AI UI、wireframe、whiteboard、PRD、coding agent，但缺少从 Bet 到 IA / Flow / Wireframe / Scope / Handoff 的连续、可解释、低保真、agent-ready 结构层。 |
| 产品形态 | **Desktop-first web app。** 不做 iOS 主端、不做 desktop pet、不做 Figma plugin 作为主形态。 |
| 核心界面 | **Canvas-first Blueprint Editor。** 中心是 Blueprint Canvas，左侧只做导航/outline，右侧 Inspector 跟随选中节点，底部 dock 承接 Scope/Handoff/长内容。 |
| 核心方法 | **不是自动 sitemap，而是结构化推导演算器。** Bet → persona/core job → activities/steps/details → modules → IA nodes → flows/states → low-fi wireframes → scope → handoff spec。 |
| 最大差异化 | **每个页面都能解释自己为什么存在。** 页面不是 UI card，而是 Product Decision Object：有 reason_to_exist、user_task、flow、state_model、scope_status、ready_for_dev_criteria。 |
| MVP 不做 | 不做 Mode A 深度验证；不做完整 evidence graph；不做高保真 UI generator；不做 full-stack app builder；不做企业白板/PRD OS。 |

---

## 2. 我们应该立刻锁定的核心产品句

### 对外定位

> **David 把 AI 独立开发者的模糊产品 Bet，推导成可解释、可点击、可交付给 coding agent 的产品蓝图。**

### 更锋利版本

> **David 不是 another AI mockup tool，而是 coding agent 前面的产品结构编译器。**

### 用户能懂的版本

> **先把想法整理成页面结构、点击路径、低保真草图、MVP 范围和开工包，再交给 Cursor / Codex / Claude Code。**

---

## 3. Batch 1 对我们原计划的关键校正

| 原先想法 | Batch 1 后的校正 | 原因 |
|---|---|---|
| 2.5D Spatial Canvas 是主卖点 | **2.5D 作为表达层，不是产品本体。** | 真正价值是结构化推导与可追溯，而不是视觉炫技。 |
| Information Layers 很多，包括 Evidence/Risk/Backend/Specs | **MVP layers 收缩为 Pages / Flows / Wireframes / Scope / Handoff。** | Mode B 不深入 Mode A 的 evidence validation；Evidence/Risk 只作为轻量备注或 backlog。 |
| Sidebar web app 可能是主形态 | **Sidebar 只是导航/outline，主形态是 Canvas-first editor。** | 左侧不做编辑，不做长文档，不抢 Canvas 主舞台。 |
| Chat 可能是主要入口 | **Chat 只是生成/修改动作入口，不能成为产品主体。** | AI 应该作用于对象：生成子树、扩写 flow、解释节点、输出 handoff，而不是变成长聊天线程。 |
| IA 是树状图 + 可展开 wireframe | **IA 必须加入页面存在理由和任务链路。** | 只有树会退化成 sitemap；每个节点必须可回溯到 user task / core job / flow / scope。 |
| Handoff 是最后导出 prompt | **Handoff 应该是结构包。** | 交给 coding agent 的不应只是文字 prompt，而是页面 graph、flow JSON、scope rules、state model、acceptance criteria。 |

---

## 4. 市场与竞品吸收结论

| 竞品类别 | 代表产品 | 它们强在哪里 | David 不应硬刚 | David 应该占的位置 |
|---|---|---|---|---|
| AI UI / screen generator | Figma Make, Stitch, Uizard, UXPilot | 快速生成 screens、prototype、code。 | 不要比谁更会画漂亮 UI。 | 在 screen 之前决定：哪些页面该存在、为什么存在。 |
| Whiteboard / canvas | Miro, FigJam, Whimsical | 团队协作、画图、白板、diagram。 | 不要做通用白板或团队协作 OS。 | 做专门面向 AI builder 的 product blueprint canvas。 |
| Website IA / sitemap | Relume, FlowMapp | sitemap、wireframe、网站结构规划。 | 不要只做营销站 sitemap。 | 做 App/product IA、flow、state、scope、agent handoff。 |
| PRD / spec tools | ChatPRD, MakePRD | 文档、stories、acceptance criteria、ticket。 | 不要做 context-free PRD generator。 | 生成 evidence/context-aware、IA-linked、flow-linked handoff package。 |
| AI builders | v0, Lovable, Bolt, Replit Agent | 从 prompt 到 app/code/deploy。 | 不要变成 full-stack app builder。 | 做这些 builder 之前的结构编译器。 |

### 最重要市场空白

> **没有一个主流工具把 Bet / product judgment → IA → flow → low-fi wireframe → scope boundary → engineering handoff 做成连续、可解释、默认低保真的单线程产物。**

David 的 wedge 就是填这个中间层。

---

## 5. 目标用户吸收结论

| 用户 | 他们真实痛点 | David 应该如何说人话 |
|---|---|---|
| AI-enabled beginner indie builder | 会用 Cursor / Claude Code / Lovable / Bolt / v0，但不知道如何把 idea 变成稳定产品结构。 | “先把想法整理成产品蓝图，再开工。” |
| 半成品变乱的 builder | 页面越来越多，prompt 越修越歪，不知道如何整理现有结构。 | “把已有页面重组为 IA、flow、scope 和 handoff。” |
| 不懂 PM/UX 术语的人 | 不知道 IA、flow、acceptance criteria 怎么做。 | 用“页面地图”“点击路径”“完成标准”“开工包”替代术语。 |
| 已经为 AI builder 付费的人 | 愿意为更快、更稳、更少返工付费。 | “少浪费 credits/token，少让 AI 做错方向。” |

### 前台术语建议

| 避免说 | 前台推荐说 |
|---|---|
| IA | 页面结构 / 页面地图 / 导航结构 |
| User flow | 点击路径 / 使用步骤 |
| PRD | 开工说明 / 产品说明 / 开发说明 |
| Acceptance criteria | 完成标准 |
| Scope | 先做什么 / 这版包含什么 |
| Artifact | 输出 / 蓝图 / 开工包 |
| Service blueprint | 前台后台流程 |

---

## 6. David 产品 IA v0

### 产品级 IA

```text
David
├─ Workbench
├─ Blueprint Canvas
├─ Scope
├─ Handoff
├─ History
└─ Settings
```

### 单个 Blueprint 文件内 IA

```text
Blueprint Document
├─ Lens: Bet
├─ Lens: IA
├─ Lens: Flow
├─ Lens: Wireframe
├─ Outline
├─ Inspector
└─ Detail Dock
```

### 设计原则

| 原则 | 决策 |
|---|---|
| 一级导航少 | 只保留 Workbench / Blueprint Canvas / Scope / Handoff / History / Settings。 |
| Bet/IA/Flow/Wireframe 不做独立页面 | 它们是同一份 Blueprint 的不同 lens。 |
| Scope 与 Handoff 可做一级入口 | 因为它们是执行与交付场景，适合作为独立 route 或 bottom dock。 |
| Node Detail 不做一级页面 | 它是右侧 Inspector / drawer / detail dock 中的上下文对象。 |
| 默认打开 Canvas | 不要默认进入 dashboard。 |

---

## 7. 推荐主布局

```text
┌─────────────────────────────────────────────────────────────────────┐
│ Top Command Bar                                                    │
│ Logo | Project | Lens: Bet / IA / Flow / Wireframe | Cmd+K | Share │
├───────────────┬───────────────────────────────────────┬─────────────┤
│ Left Rail /   │                                       │ Right       │
│ Outline       │         Blueprint Canvas              │ Inspector   │
│               │   sections / nodes / links / frames   │             │
│               │                                       │             │
├───────────────┴───────────────────────────────────────┴─────────────┤
│ Bottom Detail Dock: Scope | Handoff | Acceptance | Dependencies    │
└─────────────────────────────────────────────────────────────────────┘
```

| 区域 | 职责 | 不能做什么 |
|---|---|---|
| Top Command Bar | 项目名、lens 切换、AI action、搜索、分享、版本状态。 | 不要堆复杂菜单。 |
| Left Rail / Outline | 全局导航、文件 outline、saved views。 | 不放长表单、不放主聊天、不放节点属性。 |
| Center Canvas | 主对象编辑区。 | 不能被 dashboard cards 挤占。 |
| Right Inspector | 当前选中节点的解释、属性、AI 局部操作。 | 不做全局设置大杂烩。 |
| Bottom Detail Dock | Scope、Handoff、Acceptance Criteria、Dependencies、Open Questions。 | 不要让长文本挤压右侧 Inspector。 |

---

## 8. Bet → IA → Handoff 生成 Pipeline v0

| 阶段 | 输入 | 输出 | 目的 |
|---|---|---|---|
| A. Bet framing | 原始产品想法 | target user、core job、success criteria、primary scenario、appetite | 先建立设计上下文，不做深度验证。 |
| B. Task decomposition | core job | activities、steps、details | 把用户任务拆成可组织的结构。 |
| C. Module shaping | activities / steps | product modules | 把任务聚成产品模块。 |
| D. IA generation | modules | IA tree、navigation model、taxonomy/facets | 生成页面结构，不只是两级树。 |
| E. Page justification | IA nodes | reason_to_exist、page/modal/section 判断 | 明确每页为什么存在。 |
| F. Flow enrichment | IA nodes | happy path、alternate path、error path | 让结构变成可点击路径。 |
| G. Low-fi translation | nodes + flows | low-fi wireframe blocks / wireflows | 让每个节点可被看见。 |
| H. Scope shaping | nodes + appetite | In MVP / Later / Excluded + no-gos | 控制第一版范围。 |
| I. Delivery packaging | 全部蓝图对象 | handoff spec、annotations、ready-for-dev criteria、agent prompt | 给 coding agent 可执行上下文。 |

### 一句话版

```text
Bet → persona/core job → activities/steps/details → modules → IA nodes → flows/states → low-fi wireframes → MVP scope → handoff spec
```

---

## 9. 核心数据对象 v0

| 对象 | 作用 | 必须字段 |
|---|---|---|
| `BlueprintDocument` | 单一文档模型，承载所有 lens。 | id, projectId, version, bet, nodes, edges, wireframes, scope, handoff |
| `BetSummary` | 设计上下文，不做 Mode A 验证。 | targetUser, problem, solutionGuess, coreJob, successCriteria, appetite |
| `CoreJob` | 用户核心任务。 | actor, situation, desiredProgress, successMoment |
| `ProductModule` | 任务聚合后的模块。 | id, title, jobLink, includedSteps |
| `IANode` | 页面/模块/状态节点。 | id, type, title, parentId, reasonToExist, userTask, primaryCTA |
| `FlowEdge` | 节点之间的路径。 | source, target, pathType, condition, trigger, systemResponse |
| `WireframeSpec` | 节点对应低保真结构。 | nodeId, blocks, hierarchy, states |
| `ScopeDecision` | MVP 边界。 | nodeId, status, reason, cutImpact |
| `Dependency` | 技术/数据/接口依赖。 | nodeId, kind, name, required, note |
| `HandoffSpec` | coding-agent 交付包。 | pages, flows, states, acceptanceCriteria, noGos, prompt, JSON |
| `HistoryEvent` | AI 修改/用户修改/版本回滚。 | id, type, targetId, diff, createdAt |

---

## 10. IA 节点强约束字段

Batch 1 最重要的方法论结论是：David 的节点不能只是页面名。

| 字段 | 为什么必须有 |
|---|---|
| `reason_to_exist` | 防止 AI 凑页面；让每个页面说明为什么不能合并/删除。 |
| `user_task` | 页面必须服务一个明确任务，而不是功能堆砌。 |
| `primary_cta` | 页面必须有主动作，否则 coding agent 容易生成无目的 UI。 |
| `inputs` / `outputs` | 让页面可以转为状态机和接口需求。 |
| `state_before` / `state_after_success` | 让 flow 与页面状态可追踪。 |
| `alternate_paths` / `error_paths` | 防止只生成 happy path。 |
| `wireframe_blocks` | 低保真不是图片，而是结构化布局块。 |
| `ready_for_dev_criteria` | Handoff 必须能让 coding agent 判断做完没。 |
| `analytics_events` | 后续可接 instrumentation，不进 MVP 也要保留字段。 |

---

## 11. MVP Scope v0

### P0 必须做

| 功能 | 说明 |
|---|---|
| Workbench 新建 Blueprint | 用户输入 brief / Bet，生成第一版蓝图。 |
| Blueprint Canvas | 中心画布展示 IA nodes 和 Flow edges。 |
| Lens 切换 | Bet / IA / Flow / Wireframe 至少能切换视图或显示层。 |
| Node Inspector | 点击节点显示 reason、task、CTA、inputs、outputs、paths、scope。 |
| Low-fi Wireframe Preview | 每个核心 page node 能看到结构化 wireframe blocks。 |
| Scope Marking | In MVP / Later / Excluded。 |
| Handoff Export | Markdown + JSON + coding-agent prompt。 |
| History Lite | 保存当前版本、基础 undo/redo 或重新生成记录。 |

### P1 可做

| 功能 | 说明 |
|---|---|
| Bottom Detail Dock | 承接 Scope/Handoff/Dependencies 长内容。 |
| Node Quick Actions | hover/selection 后快速生成 flow、wireframe、改写 reason。 |
| Blueprint Critic | 检查是否有孤立节点、无 CTA、无 error path、scope 爆炸。 |
| Import Existing Screens | 从截图/草图生成初步节点。 |

### 暂不做

| 不做 | 原因 |
|---|---|
| Mode A 深度验证 | 这会引入市场数据、evidence graph、WTP 等另一套系统。 |
| 高保真 UI 生成 | 会和 Figma Make / Stitch / Uizard 正面竞争。 |
| 全功能 3D canvas | 复杂度高，MVP 不需要。 |
| 企业协作 whiteboard | 会偏离 indie builder。 |
| Full-stack app builder | 会进入 v0 / Lovable / Bolt 战场。 |
| Figma plugin / Cursor extension | 后续分发层，不是主产品形态。 |

---

## 12. Coding Agent 实现硬约束

| 约束 | 具体要求 |
|---|---|
| 单一文档模型 | Bet / IA / Flow / Wireframe / Scope / Handoff 必须共享 `BlueprintDocument`。 |
| One graph, many lenses | Lens 改变显示规则，不复制数据，不产生分叉 ID。 |
| Canvas-first routing | 项目默认进入 `/blueprint/:id`，不是 dashboard。 |
| Sidebar 克制 | 左侧只做导航、outline、saved views。 |
| Inspector selection-driven | 无选择时显示项目摘要；有选择时显示 node detail。 |
| AI action 局部化 | AI 操作必须绑定当前 node/path/section。 |
| 低保真优先 | Wireframe 只做结构，不做高保真视觉编辑。 |
| 可回滚 | 每次 AI apply 都生成 HistoryEvent。 |
| 导出结构化 | Markdown + JSON + prompt，不能只导出图片。 |
| 防止 Mode A 蔓延 | Evidence Graph、market validation 不进当前 MVP。 |

---

## 13. 本轮后我建议的下一批输入

下一批应进入 **技术实现和数据结构**，因为 Batch 1 已经足够确认产品方向、目标用户、形态和生成方法。

请下一步提供：

| Batch | Prompt 编号 | 主题 |
|---|---|---|
| Batch 2 | Prompt 05 | 2.5D Canvas 技术实现研究 |
| Batch 2 | Prompt 06 | 核心数据模型 / JSON Schema |
| Batch 2 | Prompt 07 | AI generation pipeline |
| Batch 2 | Prompt 08 | Low-fi wireframe rendering / node detail 方案 |

我读完 Batch 2 后，应输出：

1. 最终技术架构建议；
2. BlueprintDocument / IANode / FlowEdge / WireframeSpec 等 TypeScript interface；
3. AI 分阶段生成 pipeline；
4. React Flow / tldraw / 2.5D 表现方案；
5. 第一批 coding agents 的任务拆分。

---

## 14. 当前最重要的产品原则

> **David 的核心不是生成图，而是生成一条可追溯的结构链。**

```text
Bet
→ Core Job
→ Activities / Steps
→ Product Modules
→ IA Nodes
→ Flow / States
→ Low-fi Wireframes
→ MVP Scope
→ Handoff Spec
```

只有当每一层都能回溯到上一层时，David 才不是普通 sitemap generator，也不是 AI wireframe tool，而是 **AI coding 时代的产品结构编译器**。
