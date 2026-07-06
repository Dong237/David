# David Mode B Batch 6 最终吸收结论与下一步计划

> Batch 6 输入：Prompt 15 Post-MVP 扩展路线研究；Prompt 16 David Mode B MVP PRD 草案。  
> 本文用于把最后一批 deep research 结果转化为最终产品收敛、MVP PRD 确认、Post-MVP 路线约束，以及下一阶段 coding-agent 实施计划。

---

## 1. TL;DR

最后一批已经把 David Mode B 收敛成最终可执行版本：

> **David Mode B 是面向 AI 独立开发者的产品蓝图生成器。它把一句模糊 Bet 推导成可解释的 IA、可点击的 Flow、可展开的 Low-fi Wireframe、清晰的 Scope，以及适合交给 coding agent 的 Handoff Package。**

最终主链路固定为：

```text
Bet
→ IA
→ Flow
→ Wireframe
→ Scope
→ Handoff
```

这条链路既是：

1. 用户旅程；
2. 产品 IA；
3. AI generation pipeline；
4. 数据模型组织方式；
5. Demo 叙事；
6. coding-agent 实施边界。

---

## 2. 最终产品定位

| 项 | 最终版本 |
|---|---|
| 产品名称 | David Mode B |
| 产品定位 | 面向 AI 独立开发者的产品蓝图生成器 |
| 核心用户 | AI-enabled indie builder、solo founder、PM-engineer、会用 Cursor/Codex/Claude Code/Lovable/Bolt/v0 的个人开发者 |
| 核心问题 | 用户脑子里有产品想法，但不知道第一版应该如何组织成页面、流程、低保真界面、功能边界和 coding-agent spec |
| 核心输出 | IA、Flow、Low-fi Wireframe、Scope、Handoff Package |
| 核心界面 | Blueprint Canvas |
| 核心交互 | 点击任意 IA 节点，看到它为什么存在、长什么样、点完去哪、是否进 MVP、如何交付给 coding agent |
| 最小闭环 | 输入一个 Bet，生成可点击蓝图，每个核心节点有低保真 wireframe 和跳转逻辑，最后导出 coding-agent handoff |

---

## 3. 最终不做什么

MVP 必须明确排除以下内容：

| 不做项 | 原因 |
|---|---|
| Mode A 深度验证 | 会把产品拉回 Should I build this，偏离 Mode B |
| Evidence Graph | 是后续 sidecar，不进 MVP |
| 高保真 UI 生成器 | 会正面撞 Figma Make / Stitch / Uizard / v0 / Lovable |
| 完整 PM OS | 会撞 Notion / Linear / Productboard / Jira |
| Chat-first 交互 | Chat 只能是入口，不能成为主工作台 |
| 内置代码执行平台 | David 只做 handoff，不接管 repo / CI / PR |
| 通用 whiteboard | David 是结构化蓝图，不是自由白板 |
| 真 3D Spatial mode | 成本高、收益不确定，暂不做 |
| 多人协作 | Post-MVP 轻协作可以做，MVP 不做 |
| Auth / 权限 / 团队空间 | Demo 和 10 天 MVP 不需要 |

---

## 4. 最终 MVP Scope

### 4.1 P0 必须实现

```text
1. Bet Intake
2. Blueprint Canvas
3. IA Node generation
4. Flow Edge generation
5. Node Detail Drawer
6. Low-fi Wireframe Preview
7. Blueprint Layers / Lens
8. Scope Marking
9. Scope Cut / Scope Sheet
10. Handoff Center
11. Export Markdown
12. Export JSON
13. Local persistence
14. Basic Blueprint Validator
15. Demo fixture: AI Study Coach
```

### 4.2 P1 推荐实现

```text
1. Node-level regeneration
2. Scope AI enhancement
3. Agent-specific prompt presets
4. Version diff
5. Export history
6. Lock node / lock scope
7. Claude Code / Lovable / Bolt / v0 prompt templates
8. More wireframe block templates
9. Critic dimension scores
```

### 4.3 P2 / Backlog

```text
1. Reverse Blueprint Ingest
2. Light collaboration and decision memory
3. Figma Bridge
4. Agent-ready Handoff to Linear / Cursor / Codex
5. Evidence Graph sidecar
6. Mode A Preflight
7. GitHub issue export
8. Figma plugin
9. Real 3D / Spatial mode
10. Full PM OS capabilities
```

---

## 5. 最终产品 IA

David 的信息架构以 **Blueprint** 作为顶级对象，而不是以 chat session 作为顶级对象。

```text
Workspace
└── Blueprint Project
    ├── Bet Brief
    ├── Blueprint Canvas
    │   ├── IA Layer
    │   ├── Flow Layer
    │   ├── Wireframe Layer
    │   ├── Scope Layer
    │   └── Handoff Layer
    ├── Node Detail Drawer
    │   ├── Why exists
    │   ├── User goal
    │   ├── Inputs / outputs
    │   ├── Low-fi wireframe
    │   ├── Jump logic
    │   ├── Scope status
    │   └── Acceptance criteria
    ├── Scope Sheet
    ├── Handoff Center
    └── Export History
```

### 页面 / 视图列表

| 页面 / 视图 | 核心目的 | MVP |
|---|---|---:|
| Workspace Home | 创建或打开 Blueprint | P1，可用 Demo fixture 代替 |
| New Blueprint | 输入 Bet | P0 |
| Blueprint Canvas | 主工作台 | P0 |
| Node Detail Drawer | 单节点解释与编辑 | P0 |
| Wireframe Preview | 低保真结构预览 | P0 |
| Scope Sheet | 收敛 MVP 边界 | P0 |
| Handoff Center | 导出 coding-agent 开工包 | P0 |
| Export History | 查看历史导出 | P1 |

---

## 6. 最终核心用户旅程

```text
1. 用户输入一句产品 Bet
2. David 标准化 Bet Brief
3. David 生成 IA 节点树
4. David 生成 Flow edges
5. David 为核心节点生成 Low-fi Wireframe
6. 用户在 Blueprint Canvas 中查看结构
7. 用户点击节点，打开 Node Detail
8. 用户校正节点目的、输入、输出、CTA、跳转
9. 用户进入 Scope Sheet
10. David 标记 In MVP / Later / Excluded
11. 用户确认 no-gos、dependencies、acceptance criteria
12. David 生成 Handoff Package
13. 用户导出 Markdown + JSON + agent prompt
14. 用户交给 Cursor / Codex / Claude Code / Lovable / Bolt / v0
```

---

## 7. 最终数据模型

### 7.1 MVP Canonical Entities

| 实体 | 职责 |
|---|---|
| Project | 一个产品项目 |
| BetBrief | 标准化后的产品意图 |
| Blueprint | 当前蓝图对象 |
| BlueprintVersion | 导出/回滚用快照 |
| IANode | IA 树节点 |
| FlowEdge | 跨节点路径 |
| Wireframe | 节点对应的线框容器 |
| WireframeBlock | 线框里的结构块 |
| ScopeItem | 范围决策项 |
| Dependency | 实现依赖 |
| AcceptanceCriteria | 验收标准 |
| HandoffArtifact | 导出物 |
| AgentRun | 一次 AI 生成过程 |
| GenerationStep | 生成过程中的一个阶段 |

### 7.2 MVP 数据关系

```text
Project
└── BetBrief
    └── Blueprint
        ├── IANode[]
        ├── FlowEdge[]
        ├── Wireframe[]
        │   └── WireframeBlock[]
        ├── ScopeItem[]
        ├── Dependency[]
        ├── AcceptanceCriteria[]
        └── HandoffArtifact[]
```

---

## 8. 最终 AI Generation Pipeline

不要 one-shot 生成全部内容。

最终 pipeline：

```text
Step 1. Bet Normalize
Step 2. IA Generate
Step 3. Flow Generate
Step 4. Wireframe Generate
Step 5. Scope Extract
Step 6. Handoff Compile
Step 7. Validate
Step 8. Repair / Regenerate if needed
```

### 每步输入输出

| 阶段 | 输入 | 输出 | 校验 |
|---|---|---|---|
| Bet Normalize | 原始 Bet | BetBrief | 目标用户、平台、问题、约束是否完整 |
| IA Generate | BetBrief | IANode[] | 是否有 root、是否有孤儿节点 |
| Flow Generate | IANode[] | FlowEdge[] | 主路径是否可达、是否有死路 |
| Wireframe Generate | Nodes + Flow | Wireframe + Blocks | 每个核心节点是否有 CTA 和状态槽 |
| Scope Extract | Full Blueprint | ScopeItem[] | P0 是否过大、是否有未分级节点 |
| Handoff Compile | Blueprint + Scope | Handoff package | Markdown/JSON 是否通过 schema |
| Validate | 全量输出 | Report | Node completeness、edge validity、handoff sufficiency |
| Repair | Validation errors | 修复后的 artifact | 不得新增无来源功能 |

---

## 9. 最终 Canvas 行为

Blueprint Canvas 是主工作区。

### Canvas 必须支持

```text
- pan / zoom
- fit view
- node select
- node drag
- layer toggle
- path highlight
- selected node inspector
- scope status badge
- export entry
```

### Canvas 不做

```text
- 自由白板绘图
- 高保真设计编辑
- 任意图形绘制
- 真 3D navigation
- 复杂多人协作
- 大型 dashboard widgets
```

### Canvas 视觉原则

```text
Quiet Blueprint
Light-first
Canvas-first
低噪音
结构居中
语义色轻量使用
2.5D 仅用于层级提示
```

---

## 10. Node Detail 最终行为

每个节点必须回答：

```text
1. Why exists
2. User goal
3. Entry trigger
4. Primary CTA
5. Inputs
6. Outputs
7. Success path
8. Error path
9. Low-fi wireframe
10. Scope status
11. Acceptance criteria
12. Handoff notes
```

### Node Detail Layout

```text
Node Header
→ Why this exists
→ User task
→ Inputs / Outputs
→ Jump Logic
→ Low-fi Wireframe Preview
→ Scope & AC
→ Local regenerate / Save
```

---

## 11. Scope 最终行为

Scope 负责回答：

```text
这次 MVP 到底做什么、不做什么、为什么？
```

### Scope 状态

```text
In MVP
Later
Excluded
```

### Scope 叠加标签

```text
Rabbit-hole
Test-first
Dependency-blocked
Missing AC
Over appetite
```

### Scope 输出

```text
In Scope
Out of Scope
Deferred
Dependencies
Open Questions
Risks
Assumptions
Acceptance Criteria
```

---

## 12. Handoff 最终行为

Handoff 是闭环，不是附属功能。

### Handoff Package

```text
david-blueprint/
├── README.md
├── blueprint.json
├── ia.json
├── flow.json
├── wireframes.json
├── scope.md
├── acceptance.md
├── handoff.md
├── tasks.json
└── prompts/
    ├── generic.md
    ├── cursor.md
    ├── codex.md
    ├── claude-code.md
    ├── lovable.md
    ├── bolt.md
    └── v0.md
```

### Handoff 必须包含

```text
- Product goal
- Target user
- MVP scope
- No-gos
- IA map
- User flows
- Wireframe blocks
- Dependencies
- Acceptance criteria
- Build order
- Coding-agent prompt
```

---

## 13. 最终状态设计

### 13.1 错误状态

| 场景 | 系统行为 |
|---|---|
| Bet 太短 | 提示补充用户、平台、核心任务 |
| IA 生成失败 | 保留输入，允许重试 |
| Flow 校验失败 | 高亮孤儿节点或死路 |
| Wireframe 部分失败 | 允许逐节点重生 |
| Scope 冲突 | 打开 Scope Sheet 并定位冲突 |
| Export 失败 | 展示失败文件与字段路径 |
| Agent preset 不可用 | 回退 Generic prompt |

### 13.2 空状态

| 场景 | CTA |
|---|---|
| 无 Blueprint | Create first Blueprint |
| Canvas 无节点 | Generate IA |
| 未选节点 | Select a node |
| Node 无 wireframe | Generate wireframe |
| Scope 为空 | Auto classify scope |
| Handoff 为空 | Generate handoff pack |

### 13.3 Loading 状态

| 场景 | 表现 |
|---|---|
| 全局生成 | Stage progress：IA / Flow / Wireframe / Scope |
| 节点重生 | 节点局部 shimmer |
| 导出中 | 文件清单逐项打勾 |
| 校验中 | 非模态状态条 |

---

## 14. Blueprint Critic 最终质量闸门

MVP 至少做程序化 validator。

### P0 Validator

```text
1. Node Completeness
2. Flow Edge Validity
3. Scope Status Completeness
4. Wireframe Coverage
5. Handoff Sufficiency
6. Export Schema Validation
```

### Node 必填字段

```text
- purpose
- user_task
- primary_cta
- inputs
- outputs
- next_state
- scope_status
```

### Handoff Prompt 必填结构

```text
- Goal
- Context
- Constraints
- Done when
- Verification
- Output contract
```

### Readiness 状态

```text
Ready
Needs revision
Blocked
```

---

## 15. 最终 10 天实现策略

### 15.1 实施原则

```text
Contract first
Mock first
Canvas first
Export always real
AI late integration
Quality gate before polish
```

### 15.2 10 天计划简版

| Day | 目标 |
|---:|---|
| 1 | Repo setup + Zod schemas + fixtures |
| 2 | Workspace shell + local state |
| 3 | Bet → Mock Blueprint |
| 4 | React Flow Canvas + Node Detail |
| 5 | Deterministic Wireframe Preview |
| 6 | Scope Cut + Markdown/JSON Export |
| 7 | OpenAI live provider |
| 8 | Node AI Enrich + Scope AI Enhance |
| 9 | Playwright happy path + demo fixtures |
| 10 | Demo freeze + bug fix only |

---

## 16. Post-MVP 路线图

### 16.1 战略原则

Post-MVP 不横向扩成 PM OS，不向下卷高保真设计或自动代码生成。  
继续强化 David 作为：

> **从产品意图到可执行蓝图的中间层。**

### 16.2 推荐优先级

| 优先级 | 方向 | 说明 |
|---|---|---|
| P0 | Reverse Blueprint Ingest | 从 URL / 截图 / 现有页面反向生成 Blueprint |
| P0 | 轻协作与决策记忆 | Node-level comments、decision log、approve/resolve |
| P1 | Figma Bridge | 先导出到 Figma，后回读评论，不做全量双向同步 |
| P1 | Agent-ready Handoff | 导出到 Linear / Cursor / Codex |
| P2 | Evidence Graph sidecar | 以 Blueprint Node 为中心挂证据、反证、决策 |
| P2 | Mode A Preflight | 进入 Bet 前做轻量 problem framing |
| 条件触发 | Spatial / 3D schema | 只有 XR/MR 用户明确成立时再做 |

### 16.3 明确不建议做

```text
- 完整 PM OS
- 高保真 UI 生成
- 自动代码生成
- 真 3D / Spatial mode
- Hidden data source mining
- 重型团队协作 suite
```

---

## 17. 下一阶段执行计划

现在 research 阶段已经结束。

下一步应产出：

```text
1. Final MVP PRD
2. Final Technical Spec
3. Final Data Model / Zod Schema
4. Final AI Pipeline Spec
5. Final UI Spec
6. Final Handoff Export Spec
7. Final 10-Day Coding Agent Implementation Plan
8. Agent-specific task prompts
9. Demo fixture: AI Study Coach
10. Demo script
```

推荐下一步顺序：

```text
Step 1. 把所有 batch 合并成最终 PRD
Step 2. 把最终 PRD 拆成 coding-agent tickets
Step 3. 写 schemas / fixtures
Step 4. 写 UI shell prompt
Step 5. 写 Canvas prompt
Step 6. 写 AI pipeline prompt
Step 7. 写 Export prompt
Step 8. 写 Critic validator prompt
Step 9. 开始实施
```

---

## 18. 给 Coding Agents 的最终总指令

```text
你正在实现 David Mode B。
请严格按最终收敛版本开发。

产品定义：
David 是面向 AI 独立开发者的产品蓝图生成器。
它把模糊 Bet 推导成 IA、Flow、Low-fi Wireframe、Scope 和 Handoff Package。

核心链路：
Bet → IA → Flow → Wireframe → Scope → Handoff

核心界面：
Blueprint Canvas

核心交互：
点击任意 IA 节点，看到：
- 为什么存在
- 用户任务
- 输入/输出
- primary CTA
- 下一步/错误路径
- low-fi wireframe
- scope status
- acceptance criteria
- handoff notes

必须做：
- Bet Intake
- Blueprint Canvas
- Node Detail
- Wireframe Preview
- Scope Sheet
- Handoff Export
- Markdown/JSON export
- Basic Validator

不要做：
- Mode A
- Evidence Graph
- High-fidelity UI generator
- Full PM OS
- Chat-first app
- No-code app builder
- Auth/collaboration/versioning in MVP
- True 3D canvas
- Auto code generation

实现原则：
- Contract first
- Mock first
- Canvas first
- Export real
- AI later
- Validator before polish
```

---

## 19. Batch 6 最终一句话

**David Mode B 已经从“AI PM coworker 的大想法”收敛为一个清晰、可开发、可演示的产品蓝图编译器：输入 Bet，输出 agent-ready Blueprint。**
