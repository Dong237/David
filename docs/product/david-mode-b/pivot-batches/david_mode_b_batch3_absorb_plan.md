# David Mode B Batch 3 吸收结论与下一步计划

> Batch 3 输入：Prompt 09 Scope / Feature Cut 深度研究；Prompt 10 Handoff Export 深度研究。  
> 本文用于把 Batch 3 的 deep research 结果转化为 David Mode B 的产品决策、MVP scope、数据模型、UI 结构和 coding-agent 实施指令。

---

## 1. TL;DR

Batch 3 的核心结论是：

**David Mode B 的商业闭环不是“生成一张蓝图”，而是“把蓝图砍成可执行 MVP，并编译成 coding agent 能稳定执行的 handoff package”。**

因此，David 的最终主链路应收敛为：

```text
Bet
→ Blueprint Canvas
→ IA / Flow / Wireframe
→ Scope Cut
→ Handoff Package
→ Coding Agent
```

其中：

- **Scope** 回答：这次 MVP 到底做什么、不做什么、为什么。
- **Handoff** 回答：如何把这个范围交给 Cursor / Codex / Claude Code / Lovable / Bolt / v0 稳定执行。
- **Acceptance Criteria / No-gos / Dependencies** 不能放到最后才补，而应从 Scope 阶段就开始生成和绑定。
- **Handoff 不是一个 prompt，而是一个 package。**

---

## 2. Batch 3 关键决策

| 决策 | 结论 |
|---|---|
| Scope 的产品定义 | 受 appetite 约束的范围决策器，不是 roadmap，不是普通 feature list。 |
| Scope 的主状态 | `In MVP / Later / Excluded`。 |
| Scope 的叠加标签 | `test-first / rabbit-hole / warning / dependency-blocked`。 |
| Scope 的 UI 形态 | 同时是 Canvas layer/tag，也是独立 Scope 工作台。 |
| Scope 的方法论 | Shape Up Lite + MoSCoW 判断题 + Impact/Effort 粗排序。 |
| Handoff 的产品定义 | 三层导出包：人读 Markdown、机器读 JSON、agent-specific prompt。 |
| Handoff 的必需文件 | `spec.md`、`blueprint.json`、`acceptance-criteria.md`、`no-gos.md`、`prompts/*.md`。 |
| Handoff 的底层原则 | Markdown 负责语义，JSON 负责 ID，agent prompt 负责执行口径。 |
| MVP 的商业价值 | 减少 AI builder / coding agent 的漂移、返工、scope creep 和重复解释。 |

---

## 3. Scope 功能吸收结论

### 3.1 Scope 不是什么

David 的 Scope 不应该做成：

- 复杂 roadmap
- Jira / Linear 替代品
- 普通 Kanban
- RICE 打分表
- 未来功能 wishlist
- 完整项目管理系统

它应该是：

> **帮助 AI 独立开发者把当前蓝图切成“这次 MVP 做什么、不做什么”的范围决策器。**

### 3.2 Scope 的核心判断问题

每个页面、功能、后端依赖都要问三个问题：

```text
1. 没有它，核心用户回路会不会断？
2. 没有它，是否有可接受 workaround？
3. 加入它，会不会打开 rabbit hole？
```

这三个问题比“这个功能重不重要”更适合切 MVP。

### 3.3 Scope 状态定义

| 状态 | 含义 | 例子 |
|---|---|---|
| `In MVP` | 本次 MVP 必须做，否则核心闭环断裂 | 上传资料、生成学习计划、开始一次学习 session |
| `Later` | 有价值，但当前核心闭环没有它也能成立 | 日历同步、多课程 dashboard、间隔重复算法 |
| `Excluded` | 当前问题定义下明确不做，防止范围膨胀 | 社交排行榜、家长端、语音 tutor |
| `Test-first` | 不确定性高，不能直接进入实现 | OCR、复杂公式解析、多模态输入 |
| `Rabbit-hole` | 高未知、高耦合、高技术风险 | 实时语音、复杂权限、自动同步多平台 |
| `Warning` | 需要用户注意的 scope 风险 | In MVP 超 appetite、Must 依赖 Later、AC 缺失 |

### 3.4 Scope UI 建议

Scope 应该有两种形态。

#### A. Canvas 上的 Scope Layer

在 Blueprint Canvas 中，每个节点显示：

- Scope 状态：In MVP / Later / Excluded
- Warning 标签
- Rabbit-hole 标签
- Dependency 标签
- AC coverage 状态

作用：用户在看 IA / Flow / Wireframe 时，随时知道这个节点是否属于 MVP。

#### B. 独立 Scope 工作台

独立 Scope 页面或 Bottom Dock 中展示：

```text
Scope Summary
→ MVP Promise
→ Appetite
→ Cut Line Board
→ Keep / Cut / Test / Later Table
→ No-gos
→ Rabbit Holes
→ Warnings
→ Acceptance Criteria Coverage
→ Export to Handoff
```

作用：集中审阅本次版本范围，准备交付给 coding agent。

---

## 4. Scope 数据模型更新

建议在已有 `ScopeItem` 基础上增强字段。

```ts
type ScopeDecision = "in_mvp" | "later" | "excluded";
type ScopeActionTag = "keep" | "cut" | "test" | "later";
type ScopeNodeType = "page" | "feature" | "backend_dependency" | "experiment";
type EffortShape = "layer_cake" | "iceberg" | "unknown";

interface ScopeItem {
  id: string;
  title: string;
  nodeType: ScopeNodeType;
  targetType: "node" | "flow_edge" | "wireframe" | "dependency";
  targetId: string;

  userOutcome: string;
  coreLoopStage: string;
  appetiteBucket: "0.5d" | "2d" | "1w" | "2w" | "6w";
  effortShape: EffortShape;

  decision: ScopeDecision;
  actionTag: ScopeActionTag;
  rank: number;
  aboveCutLine: boolean;

  reason: {
    problemFit: "core" | "supporting" | "edge";
    whyNow: string;
    workaroundExists: boolean;
    workaroundNote?: string;
    userImpact: "high" | "medium" | "low";
    confidence: "high" | "medium" | "low";
  };

  rabbitHole: {
    flagged: boolean;
    note?: string;
    testFirst?: boolean;
  };

  noGo: {
    flagged: boolean;
    note?: string;
  };

  dependencies: Array<{
    itemId: string;
    relation: "finish_to_start" | "start_to_start" | "finish_to_finish";
    blocking: boolean;
    rationale?: string;
  }>;

  acceptanceCriteria: string[];

  agentHandoff: {
    implementationOrder: number;
    filesOrAreas?: string[];
    apiContracts?: string[];
    testCommands?: string[];
    doneDefinition?: string[];
    outOfScope?: string[];
  };
}
```

---

## 5. Scope 规则引擎建议

### 5.1 In MVP 判定规则

一个 item 才能进入 `In MVP`，如果满足：

```text
- 直接支撑核心用户回路
- 没有它 MVP 无法完成主承诺
- 没有可接受 workaround
- effort 在 appetite 内
- 不是明显 rabbit hole
- 有最小 acceptance criteria
```

### 5.2 Later 判定规则

一个 item 应进入 `Later`，如果：

```text
- 对长期体验有价值
- 当前核心回路没有它仍成立
- 有 workaround
- 不在当前 critical path 上
- 会增加 scope，但不解决本次 MVP 的核心问题
```

### 5.3 Excluded 判定规则

一个 item 应进入 `Excluded`，如果：

```text
- 服务的是不同用户/角色
- 会改变产品定义
- 会打开高复杂度 rabbit hole
- 是边缘用例
- 明确不属于本次版本 no-go
```

### 5.4 Warning 规则

| Warning | 触发条件 |
|---|---|
| `Over appetite` | In MVP 项累计复杂度超过 appetite |
| `Hidden rabbit hole` | In MVP 内有 high uncertainty item |
| `Must depends on Later` | In MVP item 依赖 Later/Excluded item |
| `Missing AC` | In MVP item 没有 acceptance criteria |
| `No no-gos` | 当前 scope 很大但 no-go list 为空 |

---

## 6. Handoff 功能吸收结论

### 6.1 Handoff 不应该是什么

Handoff 不应该只是：

- 一段大 prompt
- 一份普通 PRD
- 一张图
- 一个 Markdown 文件
- 一堆页面列表

Handoff 应该是：

> **把 Blueprint + Scope 编译成 coding agent 可执行的结构化开工包。**

### 6.2 三层 Handoff Package

| 层 | 文件 | 用途 |
|---|---|---|
| 人类可读层 | `spec.md` | 解释产品目标、用户、页面、流程、范围、取舍 |
| 机器可读层 | `blueprint.json` | 提供稳定 ID、页面、flow、block、dependency、event、AC |
| Agent 执行层 | `prompts/*.md` | 翻译成 Cursor / Codex / Claude Code / Lovable / Bolt / v0 各自适合的执行口径 |

### 6.3 必需导出文件结构

```text
handoff/
  spec.md
  blueprint.json
  acceptance-criteria.md
  no-gos.md
  maps/
    ia-map.json
    flow-map.json
    wireframe-map.json
    dependency-map.json
  prompts/
    cursor.prompt.md
    codex.prompt.md
    claude-code.prompt.md
    lovable.prompt.md
    bolt.prompt.md
    v0.prompt.md
  assets/
    wireframes/
      page-home.png
      page-dashboard.png
    flows/
      primary-flow.png
  tasks/
    task-list.json
  analytics/
    events.json
  README.md
```

---

## 7. Agent-specific Handoff 策略

| Agent | 最适合的 Handoff |
|---|---|
| Cursor | `spec.md + blueprint.json + cursor.prompt.md + AGENTS.md/RULES 片段` |
| Codex | `spec.md + blueprint.json + AGENTS.md 片段 + Goal/Context/Constraints/Done-when prompt` |
| Claude Code | `spec.md + blueprint.json + CLAUDE.md 片段 + claude-code.prompt.md` |
| Lovable | 精简版 `spec.md` + wireframe screenshot + Project Knowledge |
| Bolt | `spec.md + blueprint.json` 附件 + 强 no-go + 单任务 prompt |
| v0 | `spec.md + blueprint.json + v0.prompt.md + 关键 wireframe 截图` |

核心原则：

```text
Cursor / Codex / Claude Code = repo-first handoff
Lovable / Bolt / v0 = builder-first handoff
```

---

## 8. 从 Blueprint 到 Coding Task 的转换规则

### 8.1 IA Node → Coding Task

| IA 节点类型 | 转换后任务 |
|---|---|
| page | route-shell task |
| section | UI component task |
| feature | behavior task |
| entity | data/schema task |
| integration | adapter/service task |
| policy | guard/auth task |

### 8.2 Wireframe Block → Frontend Requirement

每个 block 必须导出：

```json
{
  "id": "block.plan.hero",
  "pageId": "page.plan",
  "type": "hero",
  "purpose": "展示学习计划标题与今日目标",
  "contentSource": "dynamic",
  "ui": {
    "component": "PlanHero",
    "layout": "stack-mobile / row-desktop",
    "responsive": ["sm", "md", "lg"]
  },
  "states": ["loading", "ready", "empty", "error"],
  "a11y": ["h1 唯一", "CTA 可键盘触达", "颜色对比达标"],
  "requirements": [
    "显示课程名、今日预计时长、完成率",
    "主 CTA 为开始学习",
    "次 CTA 为查看复盘"
  ]
}
```

### 8.3 Flow Edge → Route / Interaction / State Transition

每条 edge 应导出：

```json
{
  "id": "edge.onboarding.submit_to_plan",
  "from": "page.onboarding",
  "to": "page.plan",
  "kind": "submit",
  "trigger": "点击生成学习计划",
  "route": {
    "type": "navigate",
    "to": "/plan",
    "params": []
  },
  "stateTransition": {
    "pre": "idle",
    "pending": "generating_plan",
    "success": "plan_ready",
    "failure": "plan_generation_failed"
  },
  "sideEffects": [
    "call:POST /api/plan",
    "event:plan_generated"
  ]
}
```

---

## 9. Handoff 必须防止的失败模式

| 失败模式 | 防护语句 |
|---|---|
| 范围漂移 | `Do not add any page, feature, role, integration, or dependency not explicitly listed in handoff files.` |
| 整页重做 | `Modify only the page/block/task refs listed for this task. Preserve unrelated structure and copy.` |
| 只交计划不落地 | `Planning is allowed only if it directly leads to implementation in the same run. Do not stop at the plan.` |
| 只做 happy path | `Every user-facing async interaction must define loading, success, empty, and error behavior when applicable.` |
| 改坏共享模块 | `Do not touch shared modules unless an acceptance criterion explicitly requires it.` |
| 发明后端 | `If backend behavior is underspecified, implement the smallest mockable contract and list assumptions instead of inventing extra systems.` |
| 埋点名不一致 | `Use analytics event names exactly as declared in blueprint.json. Do not rename or invent variants.` |
| 实现与蓝图脱钩 | `Keep all route ids, block ids, flow ids, and event ids aligned with blueprint.json.` |
| 上下文污染 | `Treat only handoff files as source of truth for this task.` |
| 过度聪明 | `When multiple implementations are possible, choose the smallest one that satisfies the declared acceptance criteria.` |

---

## 10. 对 MVP Scope 的影响

Batch 3 后，MVP 必须包含这些能力：

| 模块 | MVP 是否必须 | 原因 |
|---|---:|---|
| ScopeItem 状态 | 必须 | 没有 In MVP / Later / Excluded，就无法回答 What should I build first |
| Scope cut line | 必须 | 用户要看到“线以上做，线以下不做” |
| No-go list | 必须 | coding agent 最容易自作主张，必须明确禁止项 |
| Rabbit-hole warning | 必须 | AI 独立开发者最容易被复杂依赖拖垮 |
| Acceptance criteria | 必须 | Handoff 没有 AC 就不能稳定执行 |
| Dependency map | P1，但应尽早做 | 防止假 MVP：In MVP 依赖 Later |
| Agent-specific prompt | 必须 | 不同 coding agent 输入偏好不同 |
| Analytics events | P1 | 不影响第一版 UI，但 handoff 质量会明显提高 |
| Issue tracker export | Backlog | 可后续接 GitHub/Linear |
| Full roadmap | 不做 | 会偏离 Mode B MVP |

---

## 11. 更新后的最终 MVP Scope

### P0 必须做

```text
1. Bet 输入
2. Blueprint Canvas
3. IA nodes
4. Flow edges
5. Low-fi wireframe blocks
6. Node Inspector
7. Scope status: In MVP / Later / Excluded
8. Scope cut line
9. No-gos
10. Acceptance criteria
11. Handoff export:
   - spec.md
   - blueprint.json
   - acceptance-criteria.md
   - no-gos.md
   - cursor.prompt.md
   - codex.prompt.md
```

### P1 推荐做

```text
1. Rabbit-hole warnings
2. Dependency map
3. analytics/events.json
4. claude-code.prompt.md
5. lovable.prompt.md
6. bolt.prompt.md
7. v0.prompt.md
8. wireframe screenshot export
```

### P2 / Backlog

```text
1. GitHub issue export
2. Linear issue export
3. Figma plugin
4. Full roadmap
5. Multi-user collaboration
6. Mode A Evidence Graph
```

---

## 12. 更新后的用户旅程

```text
1. 用户输入一个产品 Bet
2. David 生成 Blueprint：IA / Flow / Wireframe
3. 用户点击节点，查看页面目的、低保真 wireframe、路径
4. 用户进入 Scope
5. David 根据 appetite 和 core loop 生成 cut line
6. 用户审阅 In MVP / Later / Excluded
7. David 标出 no-gos、rabbit holes、missing AC、dependencies
8. 用户确认 Scope
9. David 导出 Handoff Package
10. 用户把 package 交给 Cursor / Codex / Claude Code / Lovable / Bolt / v0
```

---

## 13. 对 coding agent 的最新实施指令

```text
你正在实现 David Mode B。
请严格实现最终收缩后的产品：
Bet → IA → Flow → Wireframe → Scope → Handoff。

不要实现：
- Mode A evidence validation
- 通用 PRD OS
- 普通 chat app
- 普通 whiteboard
- AI UI generator
- full roadmap tool
- full project management system

本批次新增强约束：
1. Scope 必须是一等功能。
2. 每个节点必须能被标记为 In MVP / Later / Excluded。
3. Scope 页面必须显示 cut line、no-gos、rabbit holes、warnings。
4. Handoff 必须导出 spec.md、blueprint.json、acceptance-criteria.md、no-gos.md、agent-specific prompt。
5. Handoff 不是单个 prompt，而是 package。
6. Acceptance criteria 必须绑定到 ScopeItem / Node / Flow。
7. No-gos 必须被导出给 coding agent，防止功能漂移。
8. Coding prompt 必须要求 agent 不新增未声明页面、功能、依赖、角色。
```

---

## 14. 下一批建议

Batch 3 已经完成 Mode B 的“商业闭环”设计。

下一批应该进入：

```text
Batch 4：视觉与 Demo
- Prompt 11：视觉设计系统 / 2.5D 表现 / UI 风格
- Prompt 12：比赛 Demo 叙事 / 5 分钟展示流程
```

目标是回答：

```text
1. David 长什么样最有辨识度？
2. 如何展示 2.5D 但不过度炫技？
3. Demo 应该从哪个用户故事开始？
4. 如何让评委 30 秒内看懂 David 不是 Figma / Miro / v0？
5. 5 分钟里如何展示 Bet → Blueprint → Scope → Handoff 的闭环？
```

---

## 15. 本批次最终一句话

**Batch 3 后，David Mode B 的关键价值变得非常清楚：它不是帮用户画更多东西，而是帮用户决定这次只做哪些东西，并把这个决定稳定交给 coding agent 执行。**
