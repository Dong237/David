# David Mode B Batch 4 吸收结论与下一步计划

> Batch 4 输入：Prompt 11 视觉设计系统 / 2.5D 表现 / UI 风格；Prompt 12 比赛 Demo 叙事 / 5 分钟展示流程。  
> 本文用于把 Batch 4 的 deep research 结果转化为 David Mode B 的视觉决策、Demo 叙事、前端实现约束和下一步计划。

---

## 1. TL;DR

Batch 4 的核心结论是：

**David 的视觉方向应该是“静默蓝图 Quiet Blueprint + 克制的分层演示画布”。**

它应该看起来像一个专业、冷静、精确的产品蓝图工作台，而不是：

- AI 玩具
- 通用白板
- 普通 dashboard
- 普通 wireframe 工具
- 高保真 UI generator
- 花哨 3D 展示工具

Demo 的核心叙事应该是：

> **AI 让 build 变快了，但没有让 product definition 变清楚。David 把模糊 Bet 变成 AI coding agent 可以执行的产品 blueprint。**

最终比赛 Demo 主链路：

```text
模糊 Bet
→ 生成 2.5D Blueprint Canvas
→ 展示 IA / Flow / Wireframe layers
→ Scope Cut：收缩成 10 天 MVP
→ Handoff Package：交给 Cursor / Codex / Claude Code / Lovable / Bolt / v0
```

---

## 2. Batch 4 关键决策

| 决策 | 结论 |
|---|---|
| 视觉气质 | 冷静、精确、可推演的产品蓝图工作台 |
| 推荐视觉方向 | 静默蓝图 Quiet Blueprint |
| Demo 增强层 | 分层演示画布 Layered Presentation Canvas |
| 不推荐方向 | AI 魔法感、玻璃拟态、强 3D、彩色白板、KPI dashboard |
| 主色基调 | Light-first，中性浅底 + 少量语义色 |
| 字体 | Geist Sans + Geist Mono |
| Canvas 原则 | 工作物居中，不让工具居中 |
| 2.5D 原则 | 层级提示，不是炫技 |
| Demo 主叙事 | Build 变快，Blueprint 成为新瓶颈 |
| 推荐 Demo 示例 | AI Study Coach |
| Demo 核心证明 | David 不是生成更多页面，而是先决定该生成什么，并把它交付给 coding agent |

---

## 3. 视觉方向最终选择

### 3.1 最推荐方向：静默蓝图 Quiet Blueprint

**定义：**

> 一张专业、克制、结构清晰的产品蓝图画布，用中性底色、语义色、轻微层次和精准信息结构，让用户看清 Bet、IA、Flow、Wireframe、Scope、Handoff 之间的关系。

### 3.2 为什么选它

| 原因 | 说明 |
|---|---|
| 最符合产品定位 | David 不是 AI 玩具，而是 AI 独立开发者的产品蓝图生成器 |
| 最不容易跑偏 | 不会变成 Miro、Figma、v0、Relume 的复制品 |
| 最适合长时间工作 | 专业工具需要低噪音、固定面板、清晰层级 |
| 最适合 coding agents 实现 | React Flow + CSS tokens + shadcn/ui 可以快速落地 |
| 最适合比赛展示 | 可以叠加少量 presentation motion，既有 wow factor 又不牺牲清晰度 |

### 3.3 应避免的视觉方向

| 方向 | 为什么不适合 |
|---|---|
| AI 魔法渐变 | 会显得像玩具，削弱专业 PM 工具感 |
| 普通 dashboard | 会让用户以为这是项目管理/数据看板 |
| 普通 wireframe 工具 | 会被误解为另一个 Uizard / Balsamiq / Figma-lite |
| 真 3D 空间 | MVP 成本高，认知负担大，也容易显得炫技 |
| 满屏彩色便签 | 会像 Miro / FigJam，而不是 David 的结构推导系统 |
| 高保真 UI generator | 会正面撞上 Figma Make / Stitch / Uizard / v0 / Lovable |

---

## 4. 视觉设计系统建议

### 4.1 色彩系统

David 应采用：

```text
Light-first
Neutral canvas
Semantic accent colors
Minimal saturated color area
```

#### 基础颜色

| Token | Light | 用途 |
|---|---:|---|
| `bg.canvas` | `#F6F7F9` | 画布底色 |
| `bg.panel` | `#FFFFFF` | 侧栏、检查面板 |
| `bg.subtle` | `#FBFCFD` | 次级面板 |
| `line.soft` | `#E5E7EB` | 分割线、网格线 |
| `line.strong` | `#CBD5E1` | 选中边界 |
| `text.primary` | `#0F172A` | 主文本 |
| `text.secondary` | `#475569` | 次文本 |
| `text.tertiary` | `#64748B` | 元信息 |

#### 业务语义色

| 语义 | 主色 | 柔和底色 | 用途 |
|---|---:|---:|---|
| Primary action | `#2563EB` | `#DBEAFE` | 生成、保存、确认、导出 |
| Pages | `#64748B` | `#E2E8F0` | 页面节点、IA 节点 |
| Flows | `#2563EB` | `#DBEAFE` | 用户路径、主流程 |
| Scope | `#7C3AED` | `#EDE9FE` | In MVP / Later / Excluded |
| Dependencies | `#D97706` | `#FEF3C7` | 依赖、阻塞 |
| Warnings | `#DC2626` | `#FEE2E2` | 风险、缺失、冲突 |
| Handoff | `#0F766E` | `#CCFBF1` | 可交付、导出、ready |

### 4.2 字体

推荐：

```text
Geist Sans + Geist Mono
```

| Token | 建议值 | 用途 |
|---|---|---|
| `font.sans` | Geist / Inter / system-ui | 全局 UI |
| `font.mono` | Geist Mono / SFMono | ID、路径、API、快捷键 |
| `text.h1` | 24/32 600 | 页面标题 |
| `text.h2` | 18/28 600 | 分区标题 |
| `text.node.title` | 14/20 600 | 节点标题 |
| `text.body` | 14/22 400 | 正文 |
| `text.meta` | 13/18 500 | 元信息 |
| `text.caption` | 12/16 500 | 标签、说明 |
| `text.code` | 12/18 500 | route、ID、API |

### 4.3 间距、圆角、阴影

#### 间距

```text
8px 主节奏 + 4px 微调
```

| Token | 值 |
|---|---:|
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 12px |
| `space.4` | 16px |
| `space.6` | 24px |
| `space.8` | 32px |

#### 圆角

| Token | 值 | 用途 |
|---|---:|---|
| `radius.xs` | 4px | tag / small button |
| `radius.sm` | 8px | input / sidebar item |
| `radius.md` | 12px | node card |
| `radius.lg` | 16px | inspector / preview shell |

#### 阴影

| Token | 用途 |
|---|---|
| `elevation.0` | 默认卡片 |
| `elevation.1` | hover |
| `elevation.2` | selected node |
| `elevation.3` | inspector / command overlay |

---

## 5. 关键 UI 组件视觉规范

### 5.1 App Shell

推荐结构：

```text
Top Command Bar
Left Sidebar / Outline
Center Blueprint Canvas
Right Inspector
Bottom Dock
```

视觉原则：

- Top bar 轻，不抢焦点
- Sidebar 只做导航和 outline
- Canvas 占最大空间
- Inspector 按需打开
- Bottom Dock 承接 Scope / Handoff / AC / Dependencies

### 5.2 Blueprint Node Card

Node 是 David 的核心视觉组件。

#### Node Anatomy

```text
Top semantic rail
Type icon + node type
Title
2-line summary
Status badge
Meta row
Primary action / peek
Handles only on hover/selected
```

#### Node 视觉规则

| 状态 | 视觉 |
|---|---|
| Default | 1px border + 中性底 |
| Hover | 边框增强 + 轻微上浮 |
| Selected | 2px focus ring + elevation.2 |
| Active path | 边缘色 + 相关 edge 高亮 |
| Blocked | dependency amber |
| Invalid | warning red，只在关键错误时出现 |

### 5.3 Canvas

Canvas 规则：

- 极浅点阵或 16px grid
- Frame / lane 边界轻，不做重容器
- 连接线默认中性，仅当前路径高亮
- Minimap 节点多时再出现
- Zoom controls 右下角小胶囊
- 工具条只保留最小操作
- 其他都进 Command Menu

### 5.4 2.5D 表现

2.5D 只用于：

1. 当前选中 node
2. Wireframe preview
3. Presentation frame cover
4. Handoff summary card

#### 2.5D Token

| 规则 | 建议 |
|---|---|
| Perspective | `700px` |
| Tilt max | `1.5deg` 内 |
| Hover lift | `translateY(-2px)` |
| Select lift | `translateY(-4px)` |
| Plate count | 最多 2 层 |
| Shadow | 只用 elevation.2–3 |
| Edge highlight | 顶边 1px 半透明高光 |

核心原则：

> **2.5D 是信息层级提示，不是视觉炫技。**

---

## 6. Demo 叙事最终方向

### 6.1 核心叙事

Demo 不要讲：

```text
我们可以生成 wireframe
```

要讲：

```text
AI coding 让 build 更快，但 product blueprint 成为新瓶颈。
David 把模糊 Bet 变成 AI coding agent 可以执行的产品 blueprint。
```

### 6.2 推荐 Demo 示例

推荐用：

```text
AI Study Coach
```

具体化为：

```text
面向雅思/SAT 备考生的 AI 学习教练：
完成诊断、生成 7 天学习计划、进入每日学习 session、追踪进度。
```

### 6.3 为什么选 AI Study Coach

| 原因 | 说明 |
|---|---|
| 一听就懂 | 不需要解释行业背景 |
| 产品结构丰富 | 有 onboarding、diagnosis、plan、session、review、progress |
| Scope 容易演示 | 很多功能天然可以 cut：社区、成就、家长端、语音 tutor |
| Handoff 容易展示 | 可以导出 route tree、state model、task list、AC |
| 视觉友好 | 教育产品适合低保真、路径、进度、任务卡 |

不推荐主 Demo 用：

- AI PM coworker 自己：太 meta
- Finance onboarding：合规干扰多
- AI fitness coach：容易跑向健康数据和设备
- 复杂 agent 产品：5 分钟解释成本高

---

## 7. 五分钟 Demo 结构

### 7.1 时间线

| 时间 | 演示动作 | 屏幕内容 | 核心句 |
|---|---|---|---|
| 0:00–0:30 | 问题开场 | AI coding 快速增长 vs 产品定义混乱 | Build 更快了，Blueprint 没有 |
| 0:30–1:00 | 输入 Bet | 输入 AI Study Coach 一句话 | 我们从 Bet 开始，不从 UI 开始 |
| 1:00–1:40 | 生成 Blueprint | 2.5D Canvas 出现 IA / Flow / Wireframe | David 先生成结构，再生成页面 |
| 1:40–2:20 | 点击节点 | 展开 Onboarding / Diagnostic / Daily Loop | 每一页都知道为什么存在 |
| 2:20–3:00 | 解释 Layers | IA / Flow / Wireframe / Scope / Handoff | 每层回答一个产品问题 |
| 3:00–3:40 | Scope Cut | 切换 10 天 MVP，部分节点变灰 | AI 最大风险不是做不出，而是做太多 |
| 3:40–4:30 | Handoff | 导出 route tree / AC / no-gos / prompt | 这不是图，是可执行开工包 |
| 4:30–5:00 | Closing | Canvas + Handoff Summary | David 是 AI coding 前的 blueprint layer |

### 7.2 Demo 必须真的可交互

| 功能 | 是否必须真实 |
|---|---:|
| 输入 Bet 并生成 blueprint | 必须 |
| Canvas pan / zoom / select node | 必须 |
| Node 展开 Wireframe / Flow | 必须 |
| Layer 切换 | 必须 |
| Scope Cut 开关 | 必须 |
| Handoff 面板导出 | 必须 |
| 完整 AI 实时生成 | 可 mock |
| 外部调用 Cursor / Codex / v0 | 可 mock |
| 多人协作 | 不做 |
| 真部署代码 | 不做 |

---

## 8. 评委质疑与回答

| 质疑 | 回答 |
|---|---|
| 这不就是 AI wireframe tool 吗？ | 不是。Wireframe 只是一个 layer。David 从 Bet 开始，先做 IA、Flow、Scope，再落到 Wireframe，最后 Handoff。 |
| 为什么不用 ChatGPT / Claude？ | 大模型能聊，但信息会散。David 把 IA、Flow、Wireframe、Scope、Handoff 放进同一张可追踪蓝图。 |
| 为什么不是 Figma？ | Figma 的前提是设计文件已经存在。David 解决的是设计文件之前：模糊 Bet 到产品蓝图。 |
| 为什么不是 Miro？ | Miro 是通用白板。David 是 opinionated pipeline：Bet → Blueprint → Scope → Handoff。 |
| 为什么不是 Relume？ | Relume 更偏 marketing website sitemap/wireframe。David 偏 app/product blueprint 和 coding-agent handoff。 |
| 为什么不是 v0 / Lovable / Bolt？ | 它们负责 build。David 位于上游，决定应该 build 什么、先 build 什么、如何交付上下文。 |
| 2.5D 是 gimmick 吗？ | 如果为了炫就是 gimmick；David 的 2.5D 是把抽象层级变成空间深度，帮助用户理解 IA/Flow/Wireframe/Scope 的关系。 |
| 10 天能做吗？ | 能。只需证明最小闭环：Bet 输入 → Blueprint → Node Detail → Scope Cut → Handoff Export。 |

---

## 9. 商业化表达

### 9.1 一句话 Pitch

> **David 是 AI 独立开发者的 product blueprint engine：它把一个模糊 Bet 变成 IA、Flow、Wireframe、Scope 和能直接交给 AI coding 工具执行的 Handoff。**

### 9.2 三句话 Pitch

> **AI coding 已经让 build 快了很多，但没有让产品定义更清晰。独立开发者今天真正卡住的，是怎么把一个模糊想法收敛成正确的结构、流程、MVP 边界和交付包。David 把这个上游过程产品化，让 AI builder 不只是更快写代码，而是更快做对的产品。**

### 9.3 30 秒 Pitch

> **今天的 AI builder 已经有很多工具能快速生成页面和代码，但他们仍然要自己解决更难的问题：到底先做哪些页面、用户怎么走、哪些功能现在砍掉、最后怎么交给 AI 去 build。David 解决的正是这层新瓶颈。它把一句模糊想法变成完整 blueprint：IA、Flow、Wireframe、Scope、Handoff。所以它不是 another wireframe tool，而是 AI coding 时代的上游操作层。**

### 9.4 最后收尾句

> **AI 已经把 build 变快了。David 做的，是把 build 之前最混乱的那一层——产品蓝图——变得清晰、可取舍、可交付。**

---

## 10. 对 MVP Scope 的影响

Batch 4 后，MVP 需要新增/强化这些要求：

### P0

```text
1. Canvas-first UI
2. 静默蓝图视觉系统
3. 2.5D node selection / wireframe preview
4. Layer 切换：IA / Flow / Wireframe / Scope / Handoff
5. Scope Cut 视觉演示
6. Handoff 面板
7. AI Study Coach demo seed
8. 5 分钟 Demo 路径可稳定复现
```

### P1

```text
1. Presentation mode
2. Frame-by-frame camera movement
3. Semantic path highlight
4. Demo replay script
5. Visual polish tokens
6. Dark mode
```

### 不做

```text
1. 强 3D
2. AI 魔法渐变
3. 高保真 UI generator
4. full dashboard
5. full design editor
6. freeform whiteboard
```

---

## 11. 对 coding agent 的视觉实现指令

```text
你正在实现 David Mode B 的比赛 MVP。
请遵守以下视觉和交互约束：

1. 产品视觉方向是 Quiet Blueprint，不是 AI toy。
2. 默认主题是 light-first，中性画布，语义色轻量使用。
3. 中心 Canvas 是主工作区，Sidebar 和 Inspector 只是辅助。
4. 不要做 KPI dashboard。
5. 不要做普通 wireframe editor。
6. 不要做强 3D 或复杂 WebGL。
7. 2.5D 只用 stacked cards、shadow、z-index、轻微 lift 表现。
8. Node card 必须是结构化产品对象，不是白板便签。
9. 颜色只表达语义：Pages / Flows / Scope / Dependencies / Warnings / Handoff。
10. Demo 必须围绕 AI Study Coach 的 Bet → Blueprint → Scope → Handoff。
11. 每屏只突出一个主焦点，不要堆满组件。
12. Handoff 面板必须看起来像可交付包，而不是导出按钮集合。
```

---

## 12. 下一批建议

Batch 4 已经完成：

```text
视觉方向
Demo 叙事
比赛表达
评委质疑回答
```

下一批应进入：

```text
Batch 5：开发计划与质量评估
- Prompt 13：10 天 MVP 实现计划 / coding agent 分工
- Prompt 14：Blueprint Critic / 质量评估体系
```

目标是回答：

```text
1. 10 天怎么拆？
2. 哪些 coding agent 负责哪些模块？
3. 什么先 mock，什么接 AI？
4. 如何防止 blueprint 质量差？
5. 如何定义 IA / Flow / Wireframe / Scope / Handoff 的验收标准？
6. 如何让比赛 demo 稳定可演示？
```

---

## 13. Batch 4 最终一句话

**David 的视觉不是为了炫，而是为了让用户一眼看清：一个模糊 Bet 如何被推导、收缩并交付成可执行产品蓝图。**
