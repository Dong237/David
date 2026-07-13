# David Mode B — Batch 2 吸收结论与实施计划

> 本文档吸收 Batch 2 的四份 deep research 结果，覆盖：2.5D Canvas 技术实现、核心数据模型 / JSON Schema、AI Generation Pipeline、低保真 Wireframe 渲染方案。
>
> 当前产品最终定位仍保持：
>
> **David 是面向 AI 独立开发者的产品蓝图生成器，把模糊产品 Bet 推导成可解释、可点击、可交付给 Coding Agent 的 IA、用户流程、低保真线框和功能边界。**

---

## 1. TL;DR：Batch 2 后的最终技术判断

| 主题 | 最终判断 | 对 MVP 的影响 |
|---|---|---|
| Canvas 技术 | **React Flow + ELKJS + Framer Motion + DOM/CSS 2.5D** | 不用 tldraw / Three.js / PixiJS 做首版主画布。 |
| 2.5D 定义 | **2.5D 是视觉和信息层表达，不是真 3D 渲染** | 用 stacked card、shadow、z-index、layer opacity、contextual zoom 实现。 |
| 数据模型 | **单数据库、规范化 head、不可变 BlueprintVersion snapshot** | 编辑期用表，发布/导出期用 snapshot。 |
| IA 表达 | **IANode[] + parentId + order** | 不把 IA 存成嵌套 JSON 树，便于拖拽、编辑、版本化。 |
| Flow 表达 | **FlowEdge[] 独立于 IA 树** | IA 是层级关系，Flow 是横切路径，二者不能混。 |
| Wireframe 表达 | **JSON layout blocks 是 source of truth** | 不存图片，不做 Figma 式自由画布，React 渲染低保真 HTML/CSS。 |
| AI Pipeline | **八步 prompt chaining + validator + critic + repair** | 不做一个巨大的 prompt；每步只生成一个主 artifact。 |
| Agent 架构 | **单 Generator + 单 Critic + 程序化 Validator** | 不做复杂 multi-agent 角色秀。 |
| Handoff | **由 Blueprint JSON 程序化编译为结构包** | LLM 只润色，不重新发明 spec。 |
| MVP 实现顺序 | **先 mock JSON → UI → export，再接 AI** | 避免 coding agent 一上来陷入 AI 不稳定问题。 |

---

## 2. 本批报告各自贡献

| 报告 | 主要贡献 | 应采纳内容 |
|---|---|---|
| 核心数据模型与 JSON Schema | 定义 Project、Bet、Blueprint、IANode、FlowEdge、Wireframe、ScopeItem、Handoff 等核心对象 | 采用规范化实体 + snapshot，使用 TypeScript types + JSON Schema 2020-12 + Ajv。 |
| AI 生成 Pipeline | 定义八步生成链路、用户确认点、schema validation、critic、repair loop | 采用固定 pipeline，不做自由 agent；Solution outline 后做唯一硬确认。 |
| 低保真 Wireframe 研究 | 明确 wireframe 应是结构化页面骨架，不是图片或高保真 UI | 用 JSON block tree + React semantic HTML/CSS 渲染；支持 default/empty/loading/error/success 状态。 |
| 2.5D Canvas 技术调研 | 明确 React Flow 是最佳 MVP 栈，2.5D 用 DOM/CSS 实现 | React Flow 为主画布，ELKJS 自动布局，Motion 微动效，Three.js 只进 backlog。 |

---

## 3. 对上一阶段计划的关键更新

| 之前的想法 | Batch 2 后更新 |
|---|---|
| 2.5D Spatial Canvas 可能是核心创新 | **核心创新不是 2.5D，而是结构化推导链。2.5D 只是让链条更可视化。** |
| Wireframe 可能是节点展开后的图片/草图 | **Wireframe 必须是结构化 JSON block tree，可状态切换、可导出、可交付 coding agent。** |
| IA、Flow、Wireframe 可以先靠 UI mock | **必须先定义统一 domain model，否则后续导出和 AI pipeline 会漂。** |
| Handoff 可以由 LLM 直接写 prompt | **Handoff 应该由 BlueprintDocument 程序化编译，LLM 只做语言润色。** |
| 可以用一个 prompt 从 Bet 生成全部 | **必须拆成八步 pipeline，每步 schema validate + semantic validate + critic。** |

---

## 4. 推荐最终技术架构

```text
Desktop-first Web App
├─ Frontend
│  ├─ Next.js / React / TypeScript
│  ├─ React Flow Canvas
│  ├─ ELKJS Layout Service
│  ├─ Framer Motion micro-interactions
│  ├─ shadcn/ui + Tailwind
│  └─ Zustand / local state for canvas UI
│
├─ Domain Model
│  ├─ Project
│  ├─ Bet
│  ├─ Blueprint
│  ├─ BlueprintVersion
│  ├─ IANode
│  ├─ FlowEdge
│  ├─ Wireframe
│  ├─ WireframeBlock
│  ├─ ScopeItem
│  ├─ Dependency
│  ├─ AcceptanceCriteria
│  ├─ HandoffArtifact
│  ├─ AgentRun
│  └─ GenerationStep
│
├─ AI Pipeline
│  ├─ Bet summary
│  ├─ Solution outline
│  ├─ IA tree
│  ├─ User flows
│  ├─ Low-fi wireframes
│  ├─ Scope cut
│  ├─ Dependencies
│  └─ Handoff package
│
├─ Validation
│  ├─ JSON Schema validation
│  ├─ semantic graph validation
│  ├─ IA / Flow / Wireframe alignment validation
│  ├─ Scope consistency validation
│  └─ AC coverage validation
│
└─ Export
   ├─ Blueprint JSON
   ├─ Markdown Handoff
   ├─ Coding Agent Prompt
   └─ Optional PNG/SVG snapshot
```

---

## 5. 核心数据模型决策

| 决策 | 采用方案 | 原因 |
|---|---|---|
| Blueprint 是否是单文档 | 是 | 用户最终感知的是一份产品蓝图，而不是多个分散对象。 |
| 编辑期如何存储 | 规范化实体表 | 方便局部编辑、拖拽、校验、关系查询。 |
| 发布/导出如何存储 | `BlueprintVersion.snapshot` | 保证导出、回滚、复现一致。 |
| IA 如何存 | `IANode[] + parentId + order` | 比 nested tree 更适合编辑和关系查询。 |
| Flow 如何存 | `FlowEdge[]` | 保持 IA 层级关系和用户路径关系分离。 |
| Wireframe 如何存 | `Wireframe + WireframeBlock[]` | 结构可编辑、可渲染、可交付，不依赖图片。 |
| Scope 如何存 | `ScopeItem.mvpStatus` | 明确区分 In MVP / Later / Excluded。 |
| Acceptance Criteria 如何挂载 | 多态引用目标对象 | 可挂在 node、scope item、wireframe block、artifact 上。 |
| Handoff 如何生成 | 从 snapshot 投影 | 所有导出都来自同一版本，避免漂移。 |

---

## 6. BlueprintDocument 最小 P0 Schema

> 下面是 MVP 必须先实现的最小领域对象。完整 schema 可后续扩展，但 P0 必须稳定。

```ts
type ID = string;

type NodeType =
  | "page"
  | "modal"
  | "flow"
  | "feature"
  | "backend"
  | "spec"
  | "decision";

type PathType = "happy" | "alternate" | "error";

type ScopeStatus = "in_mvp" | "later" | "excluded";

interface Project {
  id: ID;
  name: string;
  slug: string;
  status: "draft" | "active" | "archived";
}

interface Bet {
  id: ID;
  projectId: ID;
  title: string;
  targetUser: string;
  problem: string;
  solutionGuess: string;
  outcome: string;
  constraints: string[];
  nonGoals: string[];
}

interface Blueprint {
  id: ID;
  projectId: ID;
  betId: ID;
  name: string;
  status: "draft" | "active" | "published";
  headRevision: number;
}

interface IANode {
  id: ID;
  blueprintId: ID;
  nodeType: NodeType;
  name: string;
  parentId: ID | null;
  order: number;
  purpose: string;
  userTask: string;
  primaryCTA?: string;
  route?: string;
  canvas?: {
    x: number;
    y: number;
    width?: number;
    height?: number;
  };
}

interface FlowEdge {
  id: ID;
  blueprintId: ID;
  sourceNodeId: ID;
  targetNodeId: ID;
  edgeType: "navigation" | "trigger" | "branch" | "dependency";
  pathType: PathType;
  pathKey: string;
  label?: string;
  condition?: string;
  sequence?: number;
}

interface Wireframe {
  id: ID;
  blueprintId: ID;
  nodeId: ID;
  title: string;
  viewport: "mobile" | "desktop" | "responsive";
  fidelity: "lofi";
  status: "draft" | "approved";
}

interface WireframeBlock {
  id: ID;
  blueprintId: ID;
  wireframeId: ID;
  blockType:
    | "page_shell"
    | "section"
    | "header"
    | "nav"
    | "card"
    | "list"
    | "form"
    | "input"
    | "button"
    | "empty_state"
    | "loading"
    | "error"
    | "modal"
    | "table"
    | "custom";
  name: string;
  parentBlockId: ID | null;
  order: number;
  text?: string;
  contentGoal?: string;
  props?: Record<string, unknown>;
  interactions?: InteractionSpec[];
}

interface InteractionSpec {
  event: "click" | "submit" | "change" | "open" | "close";
  action: "navigate" | "open_modal" | "submit" | "call_backend";
  targetNodeId?: ID;
  targetEdgeId?: ID;
}

interface ScopeItem {
  id: ID;
  blueprintId: ID;
  targetType: "node" | "flow_edge" | "wireframe" | "wireframe_block" | "feature";
  targetId: ID;
  title: string;
  mvpStatus: ScopeStatus;
  reason: string;
  priority: "must" | "should" | "could" | "wont";
}

interface AcceptanceCriteria {
  id: ID;
  blueprintId: ID;
  targetType: "node" | "flow_edge" | "wireframe" | "scope_item";
  targetId: ID;
  title: string;
  statement: string;
  kind: "functional" | "ux" | "data" | "analytics" | "non_functional";
}

interface BlueprintDocument {
  schemaVersion: string;
  project: Project;
  bet: Bet;
  blueprint: Blueprint;
  nodes: IANode[];
  edges: FlowEdge[];
  wireframes: Wireframe[];
  wireframeBlocks: WireframeBlock[];
  scopeItems: ScopeItem[];
  acceptanceCriteria: AcceptanceCriteria[];
}
```

---

## 7. AI Generation Pipeline 决策

| 阶段 | 输入 | 输出 | 是否需要用户确认 | 是否进入 MVP |
|---|---|---|---:|---:|
| 1. Bet summary | 原始 Bet | `BetSummary` | 否 | P0 |
| 2. Solution outline | Bet summary | `SolutionOutline` / capability inventory / AC | **是，唯一硬确认点** | P0 |
| 3. IA tree | Solution outline | `IATree` | 否 | P0 |
| 4. User flows | IA tree | `UserFlowGraph` | 否 | P0 |
| 5. Low-fi wireframes | IA + Flow | `WireframeSet` | 否 | P0 |
| 6. Scope cut | 全部上游 artifact | `ScopeCut` | 条件确认 | P0 |
| 7. Dependencies | Scope + solution | `DependencyMap` | 否 | P1 |
| 8. Handoff package | 全部已批准 artifact | `HandoffPackage` | 否 | P0 |

### 为什么只有 Solution outline 需要硬确认？

因为此时已经能看到：

- 产品目标
- 核心 loop
- capability inventory
- acceptance criteria
- out-of-scope 能力

如果这里不确认，后续 IA、Flow、Wireframe 都会建立在可能错误的能力边界上。  
如果这里确认太晚，AI 已经生成大量内容，修改成本会变高。

---

## 8. AI Pipeline 的硬规则

| 规则 | 解释 |
|---|---|
| Capability inventory 是单一事实源 | 只有 Solution outline 可以新增 capability。 |
| 下游 artifact 必须引用 capability IDs | IA、Wireframe、Scope、Handoff 都不能凭空新增功能。 |
| Flow edge 必须连接真实 step/node | 禁止自然语言虚连接。 |
| Wireframe 必须绑定 IA node 和 flow IDs | 保证页面结构、路径、线框对齐。 |
| Scope cut 是减法，不是重新设计 | 被 cut 的 capability 不能残留在 flow/screen/deps/handoff。 |
| Handoff 必须覆盖全部 Acceptance Criteria | coverage_map 不完整则禁止导出。 |
| Repair loop 最多 2–3 次 | 连续失败则回滚上游 checkpoint 或请求用户确认。 |
| Handoff 应编译生成 | 不让 LLM 最后自由写大 prompt。 |

---

## 9. Wireframe 实现决策

| 问题 | 最终方案 | 原因 |
|---|---|---|
| Wireframe 是否存图片 | 不存 | 图片不可编辑、不可校验、不可给 coding agent 消费。 |
| Wireframe 是否用 Canvas 渲染 | 不用 | Canvas 语义弱，不适合作为主 UI。 |
| Wireframe 是否用 SVG 渲染 | 只用于导出 | SVG 适合图形快照，不适合复杂状态和表单语义。 |
| 主渲染方式 | **React + semantic HTML/CSS** | 可访问、可状态切换、可组件化。 |
| Source of truth | **JSON layout blocks** | 可校验、可 diff、可导出。 |
| 编辑方式 | 结构化编辑 | 修改 block、CTA、顺序、state visibility，不做自由像素编辑。 |
| 状态支持 | `default / empty / loading / error / success` | 避免 AI 只生成 happy path。 |
| Viewport | 同一逻辑文档，多 viewport variant | 不复制两份页面，减少漂移。 |

---

## 10. Wireframe Block MVP 类型

| Block 类型 | 是否 P0 | 用途 |
|---|---:|---|
| `page_shell` | P0 | 页面根容器 |
| `header` | P0 | 页头 / 标题 / 返回 |
| `nav` | P0 | 导航 / stepper / tabs |
| `section` | P0 | 页面区块 |
| `card` | P0 | 信息摘要 / 操作容器 |
| `list` | P0 | 项目列表 / 结果列表 |
| `form` | P0 | 表单容器 |
| `input` | P0 | 输入字段 |
| `button` | P0 | CTA / 次级动作 |
| `empty_state` | P0 | 空状态 |
| `loading` | P0 | 加载状态 |
| `error` | P0 | 错误状态 |
| `modal` | P1 | 弹窗 / 确认 |
| `table` | P1 | 数据表格 |
| `chart_placeholder` | P2 | 图表占位 |

---

## 11. Canvas 技术实现决策

| 主题 | 方案 |
|---|---|
| 主画布 | React Flow |
| 自动布局 | ELKJS 默认，Dagre fallback |
| 2.5D 效果 | CSS stacked cards、shadow、z-index、opacity |
| 动效 | Framer Motion 仅做局部动画 |
| MiniMap | React Flow MiniMap |
| Selection | React Flow selection + app store |
| Layer toggle | 业务 store 控制 node/edge hidden |
| Custom node | 自定义 BlueprintNode |
| Custom edge | 自定义 BlueprintEdge |
| Expand detail | 右侧 inspector / node detail panel |
| 真 3D | Backlog，未来用 Three.js / React Three Fiber adapter |
| 性能策略 | memo、hidden、contextual zoom、布局节流、简化阴影 |

---

## 12. Canvas 实现中的关键边界

| 边界 | 决策 |
|---|---|
| React Flow 是否是领域模型 | 不是。它只是 renderer。 |
| BlueprintDocument 是否是真源 | 是。 |
| React Flow `nodes/edges` | 是渲染投影，不是业务真源。 |
| 2.5D 是否需要 WebGL | 不需要。 |
| 是否需要 tldraw | MVP 不需要。 |
| 是否需要 PixiJS | MVP 不需要。 |
| 是否需要 Three.js | MVP 不需要。 |
| 是否需要保存 viewport | 需要。 |
| 是否需要保存 layer visibility | 需要。 |
| 是否需要保存 expanded/collapsed | 需要。 |

---

## 13. MVP 开发顺序

| 顺序 | 任务 | 目标 |
|---:|---|---|
| 1 | 定义 TypeScript domain types | 锁住 Project / Bet / Blueprint / IANode / FlowEdge / Wireframe / Scope / Handoff |
| 2 | 准备 mock BlueprintDocument fixture | 在没有 AI 的情况下跑通 UI |
| 3 | 搭建 AppShell | desktop-first web app，canvas-first |
| 4 | 接 React Flow Canvas | 展示 nodes / edges / viewport |
| 5 | 实现 BlueprintNode / BlueprintEdge | 展示 IA 与 Flow |
| 6 | 接 ELKJS layout | 自动排布 |
| 7 | 实现 Layer Toggle | Pages / Flows / Wireframes / Scope / Handoff |
| 8 | 实现 Node Inspector | 点击节点看 purpose、task、CTA、flow、scope |
| 9 | 实现 Wireframe Renderer | JSON blocks → low-fi HTML/CSS |
| 10 | 实现 Wireframe State Switcher | default / empty / loading / error / success |
| 11 | 实现 ScopeItem 展示 | In MVP / Later / Excluded |
| 12 | 实现 Handoff Export | JSON / Markdown / coding prompt |
| 13 | 实现 schema validation | Ajv / Zod / JSON Schema |
| 14 | 接 AI Pipeline | 从 mock 变成真实生成 |
| 15 | 接 Critic + Repair | 防止 LLM 输出坏结构 |
| 16 | 加版本 snapshot | 保存 BlueprintVersion |

---

## 14. Coding Agent 分工建议

| Agent | 任务边界 | 输入 | 输出 |
|---|---|---|---|
| Agent A：Domain Model | 定义 types、schema、mock fixture | 本文档 + 数据模型报告 | `types.ts`、`schema.json`、`mockBlueprint.json` |
| Agent B：Canvas Shell | 实现 React Flow 主画布 | mock blueprint | canvas 页面、nodes、edges、layout |
| Agent C：Node Detail + Wireframe | 实现 node inspector 和 low-fi renderer | selected node + wireframe JSON | 节点详情页、状态切换、block renderer |
| Agent D：Scope + Handoff | 实现 scope 视图和 export | blueprint document | Markdown、JSON、coding prompt |
| Agent E：AI Pipeline | 实现 generation pipeline API | raw bet + schema | 8-step generation、validation、repair |
| Agent F：QA / Critic | 实现 semantic validator 和 critic checklist | blueprint output | validation report、repair prompt、test fixtures |

---

## 15. 当前仍需下一批研究补齐的问题

| 问题 | 为什么还缺 | 对应下一批 |
|---|---|---|
| Scope 具体如何裁剪 | Batch 2 只说 ScopeItem 和 ScopeCut，但没定义产品规则 | Prompt 09 |
| Handoff package 最终格式 | Batch 2 说要程序化编译，但具体模板还需细化 | Prompt 10 |
| 比赛 Demo 该展示哪个产品例子 | Batch 2 偏技术实现，不解决叙事 | Prompt 12 |
| 视觉系统如何保持 minimal / accurate | Batch 2 只给技术约束，不给视觉规范 | Prompt 11 |
| 10 天开发计划如何拆给 coding agents | Batch 2 给了技术顺序，但需要完整排期 | Prompt 13 |
| Blueprint Critic 怎么评分 | Batch 2 有 checklist 雏形，但需要产品级 eval | Prompt 14 |

---

## 16. 下一步计划

### 下一批请优先阅读

| 批次 | Prompt | 目的 |
|---|---|---|
| Batch 3 | Prompt 09：Scope / Feature Cut 深度研究 | 决定 Mode B 的“第一版做什么、不做什么”规则。 |
| Batch 3 | Prompt 10：Handoff Export 深度研究 | 决定最终给 Cursor / Codex / Lovable 的交付包格式。 |

### Batch 3 之后应产出

| 产出 | 内容 |
|---|---|
| Scope Policy | `in_mvp / later / excluded` 的判断规则 |
| Feature Cut UI | 如何在 Canvas / Inspector / Scope Panel 表达 cut |
| Handoff Package Spec | Markdown / JSON / coding prompt 的结构 |
| Export Acceptance Criteria | 如何判断导出的 prompt 是否足以让 coding agent 开发 |
| Final MVP PRD Skeleton | 开始进入 PRD 定稿前的骨架 |

---

## 17. 给 Coding Agent 的硬指令

> 请严格按以下约束实现，不要回到早期想法。

1. **不要做 Mode A。**
   - 不做 idea validation。
   - 不做 deep market research。
   - 不做 full evidence graph。
   - 不判断这个 Bet 是否值得做。

2. **不要做普通 AI UI generator。**
   - 不追求高保真。
   - 不生成漂亮 UI 作为核心卖点。
   - 只做低保真结构化 wireframe。

3. **不要做普通 chat app。**
   - Chat 是入口，Canvas 是主界面。
   - AI action 应绑定到当前 Bet、IA node、flow、wireframe、scope 或 handoff。

4. **不要做真 3D。**
   - MVP 的 2.5D 只用 DOM/CSS。
   - Three.js / R3F / PixiJS 不进入首版主流程。

5. **不要让 React Flow 成为领域真源。**
   - `BlueprintDocument` 是 source of truth。
   - React Flow nodes/edges 是渲染投影。

6. **所有 AI 输出必须结构化。**
   - 不能让 LLM 一次性自由生成全部。
   - 必须走 pipeline、schema validation、semantic validation、critic、repair。

7. **每个 IA 节点必须能解释自己。**
   - purpose
   - user task
   - primary CTA
   - input/output
   - next state
   - wireframe
   - scope status
   - handoff info

8. **最终必须能导出给 coding agent。**
   - JSON blueprint
   - Markdown handoff
   - coding-agent prompt
   - acceptance criteria
   - non-goals
   - build order

---

## 18. Batch 2 后的最终一句话

**David Mode B 的技术本质不是“AI 画图”，而是一个有 schema、有状态、有校验、有版本、有导出的产品蓝图编译器。**

它的主链路是：

```text
Raw Bet
→ Bet Summary
→ Solution Outline
→ IA Tree
→ User Flows
→ Low-fi Wireframes
→ Scope Cut
→ Dependencies
→ Handoff Package
→ Coding Agent
```

它的主界面是：

```text
Desktop Web App
→ React Flow 2.5D Blueprint Canvas
→ Node Inspector
→ Structured Low-fi Wireframe
→ Scope & Handoff Panels
```

它的最小演示闭环是：

```text
输入一个 Bet
→ 生成 BlueprintDocument
→ 在 Canvas 上看到 IA / Flow
→ 点击节点看到 wireframe 与状态
→ 标记 MVP scope
→ 导出 coding-agent prompt
```
