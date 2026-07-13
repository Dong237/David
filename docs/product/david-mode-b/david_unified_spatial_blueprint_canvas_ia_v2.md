# David Mode B — Unified Spatial Blueprint Canvas IA v2

> 本文件是 `david_unified_blueprint_canvas_ia.md` 的修订版。  
> 修订重点：  
> 1. **Bet Intake 不再是填表，而是 agentic conversation + live Bet Brief。**  
> 2. **IA / Flow / Wireframe / Scope / Handoff 不再被实现成彼此分离的主体验页面。**  
> 3. **主体验改为 Unified Spatial Blueprint Canvas：同一张蓝图，通过 Lens Composer、Semantic Zoom、Node Expansion 和 Constraint Validation 组合查看。**

---

## 0. 这次修订解决了什么问题

| 问题 | 旧理解 | 新定稿 |
|---|---|---|
| Bet Intake | 像表单一样让用户填写 target user / platform / appetite | **Agentic intake chat**：David 通过对话理解用户处境，同时生成 live Bet Brief |
| IA / Flow / Wireframe | 容易被拆成多个 tab 或多个页面 | **同一张 Blueprint Canvas 的不同投影 / lens** |
| Wireframe | 作为独立 Wireframe 页面或预览面板 | **节点展开后的内部剖面**，嵌在 IA 节点里 |
| Flow | 独立 flowchart | **覆盖在 IA spine 上的 path overlay** |
| Scope | 独立三列 scope board | **节点 / 边 / block 上的决策 overlay + 底部集中审阅 dock** |
| Handoff | 最后单独导出页 | **Handoff readiness overlay + Handoff Center** |
| 2.5D | 可能被误解为真实 3D | **语义层级和节点展开的空间表达，不做真 3D 主工作流** |

---

## 1. 最终一句话定义

**David 是一个 constraint-aware product blueprint canvas。它把 IA、Flow、Wireframe、Scope 和 Handoff 作为同一个产品对象图的不同 lens，让 AI indie builders 在一个屏幕里快速探索、约束、验证和交付产品结构。**

中文表达：

> **David 不是把 IA、Flow、Wireframe、Scope、Handoff 拆成五个工具。David 是一张统一的产品蓝图：IA 是骨架，Flow 是路径，Wireframe 是节点剖面，Scope 是范围判断，Handoff 是交付出口。**

---

## 2. 生成链路 vs 用户体验

David 的线性链路仍然保留：

```text
Bet → IA → Flow → Low-fi Wireframe → Scope → Handoff
```

但这条线性链路只表示：

```text
AI pipeline
Data pipeline
Export pipeline
```

它**不表示 UI 必须拆成六个独立页面**。

用户真正看到的是：

```text
Unified Spatial Blueprint Canvas
├── IA Spine
├── Flow Overlay
├── Node Wireframe Expansion
├── Scope Overlay
├── Handoff Readiness Overlay
└── Lens Composer
```

---

## 3. IA、Flow、Wireframe、Scope、Handoff 的真实关系

| 层 | 它回答的问题 | 它依附在哪里 | 前端表达 |
|---|---|---|---|
| **IA** | What exists? 产品有哪些页面、模块、状态？ | `IANode` | 默认骨架 / graph / tree |
| **Flow** | How does the user move? 用户怎么走？ | `FlowEdge` 连接 `IANode` | 覆盖在 IA 上的 path overlay |
| **Wireframe** | What happens inside a node? 节点内部如何承载任务？ | `Wireframe.nodeId = IANode.id` | 节点展开 / inspector preview |
| **Scope** | What is included now? 当前 MVP 包含什么？ | `ScopeItem.targetId` 指向 node / edge / block | badge / cut line / bottom dock |
| **Handoff** | What is ready to build? 哪些对象可交付？ | `HandoffArtifact.sourceNodeId` | readiness chips / export package |

核心逻辑：

```text
IA Node 是主对象。
Flow 是节点之间的边。
Wireframe 是节点内部的结构。
Scope 是节点 / 边 / block 的范围决策。
Handoff 是从这些对象编译出来的交付包。
```

---

## 4. 产品级 IA

```text
David
├── Workbench
│   ├── Agentic Bet Intake
│   ├── Live Bet Brief
│   └── Generate Blueprint
│
├── Unified Blueprint Canvas   ← 主工作区
│   ├── IA Spine
│   ├── Flow Overlay
│   ├── Wireframe Node Expansion
│   ├── Scope Overlay
│   ├── Handoff Readiness Overlay
│   ├── Lens Composer
│   ├── Constraint Panel
│   ├── Node Inspector
│   └── Bottom Dock
│
├── Scope Review
│   ├── Cut Line
│   ├── In MVP
│   ├── Later
│   ├── Excluded
│   ├── No-gos
│   ├── Rabbit Holes
│   ├── Dependencies
│   └── Acceptance Coverage
│
├── Handoff Center
│   ├── Handoff Package
│   ├── Package Readiness
│   ├── Markdown Export
│   ├── JSON Export
│   ├── Agent-specific Prompts
│   └── Download Package
│
├── Export History
│   ├── Snapshots
│   ├── Past Packages
│   └── Restore / Re-export
│
└── Settings
    ├── Project Settings
    ├── Model Settings
    ├── Export Settings
    └── Integrations
```

---

## 5. Sidebar 定稿

Sidebar 应保持稳定、克制、跨页面一致。  
它不是 PM OS 菜单，也不是大 dashboard 导航。

```text
David
├── Current Project
│   └── AI Study Coach
│
├── Main
│   ├── Workbench
│   ├── Blueprint Canvas
│   ├── Scope Review
│   ├── Handoff Center
│   └── Export History
│
├── Project
│   ├── Outline
│   ├── Templates
│   └── Docs
│
└── Settings
    ├── Project Settings
    └── Export Settings
```

Sidebar 规则：

| 规则 | 说明 |
|---|---|
| 只做导航 | 不放长表单、不放主聊天、不放导出正文 |
| 当前项目永远可见 | 用户始终知道正在编辑哪个 Blueprint |
| 主模块高亮 | Workbench / Canvas / Scope / Handoff |
| Outline 可做二级面板 | Canvas 内可打开 IA outline，但不强行常驻 |
| 不做复杂 PM OS | 不加入 roadmap、issue、team board、OKR 等 |

---

## 6. Bet Intake 修订：从表单改为 Agentic Conversation

### 6.1 旧方案为什么不对

不应让用户一上来填写：

```text
Target user
Platform
Core task
Appetite
Constraints
```

这会让 David 像表单工具，而不是 agentic product architect。

### 6.2 新方案

Bet Intake 应是：

```text
Agentic conversation
+ Live Bet Brief
+ Generate Blueprint readiness
```

推荐布局：

```text
┌───────────────────────────────┬───────────────────────────────┐
│ Agentic Intake Chat            │ Live Bet Brief                 │
│                               │                               │
│ David 追问：                   │ Target User                    │
│ - 你现在卡在哪里？              │ Core Problem                   │
│ - 你想验证什么？                │ Core Task                      │
│ - 第一版给谁用？                │ Platform                       │
│ - 这次 appetite 是多少？         │ Appetite                       │
│                               │ Constraints                    │
│ 用户用自然语言回答              │ Unknowns / Risks               │
│                               │                               │
│ [Type your response...]         │ [Generate Blueprint]           │
└───────────────────────────────┴───────────────────────────────┘
```

### 6.3 Intake 对话目标

David 应通过对话生成：

```text
BetBrief {
  rawIdea
  targetUser
  coreProblem
  coreJob
  desiredOutcome
  platform
  appetite
  constraints
  noGos
  unknowns
}
```

### 6.4 Intake 交互规则

| 规则 | 说明 |
|---|---|
| 对话是主输入 | 用户自然语言描述处境 |
| Bet Brief 是 live structure | 右侧结构卡实时更新 |
| 不强制填表 | 字段可编辑，但不是主输入方式 |
| David 主动追问 | 不足信息由 agent 追问 |
| 生成前显示 readiness | 信息不足时提示缺什么 |
| 用户可 override | 用户可手动改 Bet Brief 字段 |

---

## 7. Unified Blueprint Canvas 主界面

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Top Bar                                                                    │
│ Project / Current Bet / Readiness / Search / Ask David / Export             │
├───────────────┬────────────────────────────────────────────┬───────────────┤
│ Sidebar       │ Lens Composer                              │ Inspector     │
│               ├────────────────────────────────────────────┤               │
│ Navigation    │                                            │ Selected Node │
│ Project       │      Unified Spatial Blueprint Canvas       │ Detail        │
│ Outline       │                                            │               │
│               │ IA nodes + flow overlay + wireframe         │ Purpose       │
│               │ expansions + scope badges + warnings        │ CTA           │
│               │                                            │ IO            │
│               │                                            │ Wireframe     │
│               │                                            │ Scope         │
├───────────────┴────────────────────────────────────────────┴───────────────┤
│ Bottom Dock: Scope / Dependencies / Acceptance / Handoff / Critic           │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Lens Composer

不要把 IA / Flow / Wireframe / Scope / Handoff 做成简单 tab。  
它们应该是可组合 lens。

### 8.1 View Lenses

控制用户当前看什么层。

```text
[✓ IA] [✓ Flow] [✓ Wireframe] [✓ Scope] [ ] Handoff [ ] Dependencies [ ] Critic]
```

| Lens | 含义 |
|---|---|
| IA | 显示节点结构 |
| Flow | 显示路径边 |
| Wireframe | 显示节点内部缩略或展开 wireframe |
| Scope | 显示 In MVP / Later / Excluded |
| Handoff | 显示 ready / missing AC / missing wireframe |
| Dependencies | 显示技术或数据依赖 |
| Critic | 显示 blocker / warning / readiness |

### 8.2 Scenario Variables

控制从哪个场景看蓝图。

```text
Role: Student / Admin / Guest
Path: Happy / Alternate / Error
State: Default / Loading / Empty / Error / Success
Platform: Desktop / Mobile
Scope: MVP only / Full vision
```

### 8.3 Product Constraints

控制设计必须满足什么。

```text
Appetite: 3 days / 10 days / 2 weeks
Required path: Diagnostic must happen before Plan
Locked node: Daily Session must stay in MVP
No-go: No community in MVP
Dependency rule: No external calendar API
Component rule: Progress summary must stay on Dashboard
```

### 8.4 Lens Composer 的本质

```text
不是切换页面。
而是在同一张蓝图上组合视角。
```

内部可命名为：

```text
Blueprint Lens Composer
```

---

## 9. Spatial Canvas 结构

### 9.1 Base Layer：IA Spine

IA 是默认基础骨架。

```text
AI Study Coach
├── Home
├── Onboarding
├── Diagnostic Quiz
├── Plan Builder
├── Daily Session
├── Progress
└── Review
```

### 9.2 Overlay Layer：Flow

Flow 叠在 IA 上。

```text
Home
→ Onboarding
→ Diagnostic Quiz
→ Plan Builder
→ Daily Session
→ Review
→ Progress
```

Flow edge 类型：

| 类型 | 视觉 |
|---|---|
| Happy path | 蓝色实线 |
| Alternate path | 灰色虚线 |
| Error path | 红色虚线 |
| Return path | 灰蓝虚线 |
| Dependency | 琥珀线 |

### 9.3 Inline Layer：Wireframe Expansion

Wireframe 不单独成页，而是节点展开后的内部剖面。

Collapsed：

```text
┌────────────────────────────┐
│ Daily Session               │
│ Focused study loop          │
│ In MVP · 3 flows · Ready    │
└────────────────────────────┘
```

Expanded：

```text
┌──────────────────────────────────────────┐
│ Daily Session                             │
│ Why: Complete focused study session       │
│ CTA: Start Session                        │
├──────────────────────────────────────────┤
│ Wireframe Preview                         │
│ ┌──────────┬───────────────────┬────────┐│
│ │ Setup    │ Question Area     │ Stats  ││
│ │ Topic    │ Answer Input      │ Score  ││
│ │ Level    │ Submit Answer     │ Time   ││
│ └──────────┴───────────────────┴────────┘│
├──────────────────────────────────────────┤
│ Next: Session Complete                    │
│ Error: Session Interrupted                │
└──────────────────────────────────────────┘
```

### 9.4 Overlay Layer：Scope

Scope 显示在节点和边上。

```text
In MVP
Later
Excluded
Test-first
Rabbit-hole
Missing AC
Dependency-blocked
```

### 9.5 Overlay Layer：Handoff

Handoff 显示节点是否 ready for dev。

```text
Ready
Needs AC
Missing wireframe
Missing flow
Blocked
```

---

## 10. Semantic Zoom

Semantic Zoom 是这个产品的重要体验。

| Zoom Level | 用户看到什么 |
|---|---|
| L0 — Map | 只看到产品区块和主路径 |
| L1 — IA | 看到节点标题、类型、scope badge |
| L2 — Flow | 看到节点摘要、flow count、active path |
| L3 — Wireframe thumbnail | 核心节点显示 mini wireframe |
| L4 — Expanded node | 展开节点完整显示目的、CTA、IO、wireframe、next/error state |

规则：

```text
放大不是简单放大像素。
放大意味着出现更多产品语义。
```

---

## 11. Focus + Context

David 的主画布应支持 Focus + Context。

当用户选择 Daily Session：

```text
Focus:
- Daily Session 放大 / 抬起 / 展开
- 相关 incoming/outgoing flow 高亮
- Wireframe preview 出现
- Inspector 显示完整字段

Context:
- 上游 Plan Builder 保持可见
- 下游 Review / Progress 保持可见
- 无关节点弱化但不消失
```

这让用户同时理解：

```text
这个页面内部是什么
它在整个产品结构中的位置是什么
```

---

## 12. Constraint Validation

David 不是自由画布。它是有 PM 决策约束的产品结构空间。

### 12.1 约束类型

| 约束 | 示例 |
|---|---|
| Path constraint | 用户必须先完成 Diagnostic 才能看到 Plan |
| Scope constraint | Daily Session 必须在 MVP |
| Component constraint | Primary CTA 必须在每个 P0 page 上 |
| Dependency constraint | 不使用 external calendar API |
| State constraint | 每个 async action 必须有 loading/error |
| Handoff constraint | 每个 In MVP node 必须有 AC |
| Wireframe constraint | 每个 P0 node 必须有 low-fi wireframe |

### 12.2 违反约束时

Canvas 应直接显示：

```text
- Broken path
- Missing CTA
- Missing wireframe
- MVP node depends on Later node
- In MVP node missing acceptance criteria
- Required flow not reachable
```

### 12.3 Constraint UI

```text
Constraint Panel
├── Required paths
├── Locked MVP nodes
├── No-gos
├── Required components
├── Forbidden dependencies
└── Validation warnings
```

---

## 13. 数据模型实现规则

### 13.1 Canonical ID 规则

所有 layer 必须共享同一组 IDs。

```text
IANode.id
FlowEdge.sourceNodeId / targetNodeId
Wireframe.nodeId
WireframeBlock.wireframeId
ScopeItem.targetId
AcceptanceCriteria.targetId
HandoffArtifact.sourceNodeId
```

如果这些 ID 不一致，产品会退化成几个脱节工具。

### 13.2 BlueprintDocument

```ts
interface BlueprintDocument {
  id: string;
  projectId: string;
  betBrief: BetBrief;

  nodes: IANode[];
  edges: FlowEdge[];

  wireframes: Wireframe[];
  wireframeBlocks: WireframeBlock[];

  scopeItems: ScopeItem[];
  dependencies: Dependency[];
  acceptanceCriteria: AcceptanceCriteria[];

  handoffArtifacts: HandoffArtifact[];

  variables: BlueprintVariable[];
  constraints: BlueprintConstraint[];

  canvasState: CanvasState;
}
```

### 13.3 Lens State

```ts
interface LensState {
  visibleLenses: {
    ia: boolean;
    flow: boolean;
    wireframe: boolean;
    scope: boolean;
    handoff: boolean;
    dependencies: boolean;
    critic: boolean;
  };

  scenario: {
    role: "student" | "admin" | "guest";
    pathType: "happy" | "alternate" | "error";
    uiState: "default" | "loading" | "empty" | "error" | "success";
    platform: "desktop" | "mobile";
    scopeMode: "mvp_only" | "full_vision";
  };

  constraints: {
    appetite: "3_days" | "10_days" | "2_weeks";
    lockedNodeIds: string[];
    requiredPathIds: string[];
    noGoIds: string[];
    forbiddenDependencyIds: string[];
  };
}
```

### 13.4 Blueprint Constraint

```ts
interface BlueprintConstraint {
  id: string;
  type:
    | "required_path"
    | "locked_scope"
    | "required_component"
    | "forbidden_dependency"
    | "required_state"
    | "handoff_required";

  targetId: string;
  severity: "info" | "warning" | "blocking";
  message: string;
}
```

---

## 14. Frontend Rendering Rule

同一份 `BlueprintDocument` 投影成不同视图。

```ts
renderCanvas({
  document,
  lensState: {
    ia: true,
    flow: true,
    wireframe: true,
    scope: true,
    handoff: false
  },
  scenario: {
    pathType: "happy",
    uiState: "default",
    platform: "desktop",
    scopeMode: "mvp_only"
  }
});
```

不要创建：

```text
SeparateIAEditor
SeparateFlowEditor
SeparateWireframeEditor
SeparateScopeBoard
SeparatePRDEditor
```

要创建：

```text
UnifiedBlueprintCanvas
LensComposer
BlueprintNode
BlueprintEdge
ExpandedNodeWireframe
ScopeOverlay
HandoffReadinessOverlay
ConstraintValidator
```

---

## 15. 用户操作流

### 15.1 Agentic Intake → Canvas

```text
User talks with David
→ David extracts Bet Brief
→ Bet Brief reaches enough readiness
→ User clicks Generate Blueprint
→ Canvas opens with IA Spine
```

### 15.2 Explore IA + Wireframe

```text
User sees IA spine
→ zooms into Daily Session
→ node shows mini wireframe
→ user expands node
→ node reveals wireframe + CTA + IO + states
```

### 15.3 Explore Flow

```text
User turns on Flow lens
→ happy path appears on top of IA
→ user selects error path
→ error edges and error states appear
→ broken path warnings show if needed
```

### 15.4 Explore Scope

```text
User turns on Scope lens
→ nodes show In MVP / Later / Excluded
→ user toggles MVP only
→ Later and Excluded nodes fade out
→ warnings appear if MVP path is broken
```

### 15.5 Handoff

```text
User turns on Handoff lens
→ nodes show Ready / Needs AC / Missing wireframe
→ user fixes blockers
→ opens Handoff Center
→ exports Markdown + JSON + prompts
```

---

## 16. MVP 实现阶段

| 阶段 | 实现内容 |
|---|---|
| V0 | IA graph + selected node inspector |
| V1 | 节点展开显示 mini wireframe |
| V2 | Flow overlay 高亮路径 |
| V3 | Scope badges overlay |
| V4 | Lens Composer 支持组合 IA/Flow/Wireframe/Scope |
| V5 | Constraint warnings：broken path、missing CTA、scope conflict |
| V6 | Semantic zoom / presentation mode |

---

## 17. UI Components

```text
DavidApp
├── AppShell
│   ├── Sidebar
│   ├── TopBar
│   └── Workspace
│
├── Workbench
│   ├── IntakeChat
│   ├── LiveBetBrief
│   └── GenerateBlueprintButton
│
├── UnifiedBlueprintCanvas
│   ├── LensComposer
│   ├── ScenarioControls
│   ├── ConstraintPanel
│   ├── IAOutlinePanel
│   ├── ReactFlowCanvas
│   │   ├── BlueprintNode
│   │   ├── BlueprintEdge
│   │   ├── ExpandedNodeWireframe
│   │   ├── ScopeBadge
│   │   └── HandoffBadge
│   ├── CanvasControls
│   └── MiniMap
│
├── NodeInspector
│   ├── PurposeSection
│   ├── UserTaskSection
│   ├── PrimaryCTASection
│   ├── InputsOutputsSection
│   ├── JumpLogicSection
│   ├── WireframePreviewSection
│   ├── ScopeDecisionSection
│   └── AcceptanceCriteriaSection
│
└── BottomDock
    ├── ScopeCutPanel
    ├── DependencyPanel
    ├── HandoffPreviewPanel
    └── CriticPanel
```

---

## 18. Anti-patterns

Do not implement:

```text
- IA as a separate static sitemap page
- Flow as a separate flowchart page
- Wireframe as a separate design tool
- Scope as a generic project board
- Handoff as only a PDF / markdown export page
- Bet intake as a rigid form
- Chat as the main app surface
- Dashboard KPI cards as the default workspace
- Any layer with its own disconnected IDs
```

---

## 19. Coding Agent Hard Instruction

```text
The core product is Unified Spatial Blueprint Canvas.

Bet → IA → Flow → Wireframe → Scope → Handoff is a generation pipeline, not a sequence of disconnected UI pages.

Implement IA, Flow, Wireframe, Scope, and Handoff as lenses and projections of the same BlueprintDocument.

IA is the base graph.
Flow is an overlay of edges on the same graph.
Wireframe is shown through node expansion and inspector preview.
Scope is an overlay plus review dock.
Handoff is a readiness overlay plus export center.

Every visual object must map back to canonical IDs:
- IANode.id
- FlowEdge.sourceNodeId / targetNodeId
- Wireframe.nodeId
- ScopeItem.targetId
- AcceptanceCriteria.targetId
- HandoffArtifact.sourceNodeId

If the implementation creates separate data models for IA, Flow, Wireframe, Scope, and Handoff, it is wrong.
```

---

## 20. Final Product Definition

```text
David Mode B is a constraint-aware product blueprint canvas.

It helps AI indie builders turn a fuzzy product Bet into a connected product structure where:

- IA shows what exists
- Flow shows how users move
- Wireframe shows what happens inside each node
- Scope shows what belongs in the MVP
- Handoff shows what is ready for coding agents

All of this happens in one connected spatial workspace.
```
