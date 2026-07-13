# 02 — David Mode B Demo Showcase Spec

> **状态：** Competition Vertical Slice — Implementation Ready  
> **目标：** 在两天内实现一个可点击、可录屏的 Web App，证明 David Mode B 的核心产品主张，而不是实现完整生产系统。  
> **Demo Case：** AI Study Coach  
> **默认语言：** UI 使用英文；产品文档和代码注释可使用英文；演示者可用中文或英文讲解。  
> **目标录屏画幅：** Desktop 16:9，优先 1440×900；最低保证 1280×720。

---

## 1. Demo 要证明的产品主张

Demo 必须让观众在 90–120 秒内理解：

1. AI coding 已经让实现变快，但产品结构判断仍然是瓶颈；
2. David 不是表单、PRD 生成器或 Wireframe 生成器；
3. David 会像专业 PM 一样，从模糊 Idea 中提取用户目标、产品对象和结构约束；
4. David 用尽量少的问题推进，并自主完成低风险 PM 判断；
5. IA、Flow、Wireframe 和 Scope 是同一个 Product Blueprint 的不同层，而不是四个脱节工具；
6. 当 Scope 改动破坏关键路径时，David 能立即识别并提出可解释的修复方案；
7. 最终蓝图可以输出为一个类似 Agent Skill 的 Coding-Agent Handoff Package。

核心表达：

```text
Context before code.
Blueprint before build.
Structure before screen generation.
Scope before implementation.
```

---

## 2. Demo 边界

### 2.1 P0：必须真实可交互

| 能力 | 最低实现 |
|---|---|
| Idea 输入 | 用户可编辑输入框并提交 |
| Agentic Intake | 显示一轮 David 的关键提问和用户选择 |
| Live Product Context | 根据回答更新结构化 Context Card |
| Generate Blueprint | 按钮可点击并进入 Canvas |
| IA Canvas | 至少 8 个真实节点，可选择 |
| IA + Wireframe | 选中关键节点后，在节点内部展开 mini wireframe |
| Flow Overlay | 可显示/隐藏主路径 |
| Scope Overlay | 可显示/隐藏 Scope badges |
| Node Inspector | 显示 purpose、intent、CTA、states、scope、rationale |
| Scope change | 用户可把 `Diagnostic Quiz` 从 `In MVP` 改为 `Later` |
| Constraint detection | 改动后真实触发 “core path broken” |
| Repair selection | 用户可选择 `Keep lightweight diagnostic` |
| Handoff Center | 可进入并浏览输出文件树 |
| File preview | 可点击至少 4 个文件并预览内容 |
| Copy starter prompt | 点击后写入 Clipboard 或显示成功 toast |
| Demo reset | 一键恢复预置初始状态，便于重复录屏 |

### 2.2 P1：时间允许再做

- 简单拖拽改变画布布局；
- 局部 regenerate 的视觉演示；
- Canvas minimap；
- 键盘快捷键；
- dark mode；
- 真正导出 ZIP；
- URL 分享；
- 多种 Demo case。

### 2.3 明确不做

- 真实登录、数据库、云同步、协作；
- 任意产品 Idea 的全自动生成；
- 多模型路由；
- 完整 PM Skill Registry 运行时；
- 真实 Card Sorting / Tree Testing；
- Figma 级自由 Wireframe 编辑器；
- WebGL 或可旋转 3D；
- 完整生产级 Handoff 编译器；
- 支付、权限、团队管理。

---

## 3. Demo 形态：一个 Web App，三个主状态

Demo 应实现为一个统一的 Desktop Web App，而不是三张静态图片。

```text
State 1 — Agentic Intake
State 2 — Unified Blueprint Canvas
State 3 — Constraint Repair + Handoff
```

可以使用 routes，也可以使用应用内状态切换：

```text
/                    Intake
/blueprint           Canvas
/handoff             Handoff Center
```

---

## 4. Screen 1 — Agentic Intake

### 4.1 布局

```text
┌──────────────────────────────────────────────────────────────────┐
│ David · New Blueprint                                   Demo Case │
├────────────────────────────────────┬─────────────────────────────┤
│ Agent Conversation                 │ Live Product Context        │
│                                    │                             │
│ User idea                          │ Target user                 │
│ David interpretation               │ Core job                   │
│ One decision-changing question     │ Primary outcome             │
│ Two answer choices                 │ Product type                │
│                                    │ Constraints                 │
│ [Input area]                       │ Assumptions                 │
│                                    │                             │
│                         [Generate Blueprint]                     │
└────────────────────────────────────┴─────────────────────────────┘
```

### 4.2 Default idea

```text
I want to build an AI study coach for exam preparation,
but I’m not sure what the first version should contain.
```

用户可修改，但 Demo 的确定性流程基于语义中包含：

```text
AI
study
coach
exam
```

如果输入完全不同，仍然进入同一个预设案例，但显示一条轻提示：

```text
Demo mode uses the AI Study Coach reference case.
```

### 4.3 David 的唯一关键问题

```text
What should V1 prove first?

A. Students can turn an exam goal into a useful study plan.
B. Students return every day and complete a focused study session.
```

默认演示选择 B。

### 4.4 选择 B 后的 Context 更新

```text
Target user      Exam-prep student
Situation        Has a deadline but struggles with daily consistency
Core job         Know what to study and complete a focused session
Primary outcome  Complete one useful daily study loop
Product type     Mobile-first learning companion
Appetite         Demo MVP
Assumptions      One learner role; no social features; no tutor marketplace
```

### 4.5 Visual behavior

- Context Card 的修改项以 300–500ms highlight 动画出现；
- David 显示 “I’ll use that as the organizing principle”；
- `Generate Blueprint` 从 disabled 变 enabled；
- 不模拟长时间思考，不做超过 2 秒的假 loading。

---

## 5. Screen 2 — Unified Blueprint Canvas

### 5.1 主布局

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ AI Study Coach · Blueprint v1 · 1 blocker · Export                       │
├──────────────┬───────────────────────────────────────────┬───────────────┤
│ Outline      │ Lens Composer                             │ Inspector     │
│              ├───────────────────────────────────────────┤               │
│ Product      │ Unified Blueprint Canvas                  │ Selected Node │
│ regions      │                                           │               │
│ Nodes        │ IA regions + nodes                        │ Purpose       │
│              │ Main Flow overlay                         │ User intent   │
│              │ Expanded node wireframe                   │ Primary CTA   │
│              │ Scope badges                              │ States        │
│              │                                           │ Scope         │
├──────────────┴───────────────────────────────────────────┴───────────────┤
│ Bottom status: assumptions · constraints · validation                    │
└──────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Canvas 的 IA

顶层 Product Regions：

```text
SET UP
LEARN
REFLECT
SYSTEM
```

节点：

```text
SET UP
├── Welcome
├── Goal Setup
└── Diagnostic Quiz

LEARN
├── Study Plan
├── Today
└── Daily Session

REFLECT
├── Session Recap
└── Progress

SYSTEM
└── Settings
```

### 5.3 默认主路径

```text
Welcome
→ Goal Setup
→ Diagnostic Quiz
→ Study Plan
→ Today
→ Daily Session
→ Session Recap
→ Progress
```

### 5.4 Lens Composer

不是页面 Tabs，而是同屏组合开关：

```text
[IA ✓] [Flow ✓] [Wireframe ✓] [Scope ✓]
[Validation] [Dependencies] [Handoff]
```

规则：

- `IA` 在 Demo 中不可完全关闭；
- `Flow` 控制路径 Edge；
- `Wireframe` 控制关键节点缩略结构；
- `Scope` 控制 `In MVP / Later / Excluded` badge；
- `Validation` 控制 warning markers；
- `Handoff` 可作为进入 Handoff Center 的入口。

### 5.5 默认可见状态

```text
IA          ON
Flow        ON — only happy path
Wireframe   ON — thumbnails only on Study Plan, Daily Session, Progress
Scope       ON
Validation  Blockers only
```

避免首次进入时所有细节同时出现。

---

## 6. IA 与 Wireframe 的组合规则

这是 Demo 的视觉核心。

### 6.1 Collapsed node

```text
┌────────────────────────┐
│ Daily Session           │
│ Complete focused study  │
│ In MVP · Ready          │
└────────────────────────┘
```

### 6.2 Selected / expanded node

用户点击 `Daily Session` 后，节点在原位置附近展开：

```text
┌──────────────────────────────────────┐
│ Daily Session                        │
│ Complete a focused learning loop     │
├──────────────────────────────────────┤
│ Mini wireframe                       │
│ ┌────────┬──────────────┬──────────┐ │
│ │ Topic  │ Question     │ Progress │ │
│ │ Level  │ Answer input │ 3 / 10   │ │
│ │ Timer  │ Submit       │ Accuracy │ │
│ └────────┴──────────────┴──────────┘ │
├──────────────────────────────────────┤
│ Primary CTA: Submit answer            │
│ Next: Session Recap                   │
└──────────────────────────────────────┘
```

### 6.3 Focus + Context

选中节点时：

- 当前节点放大约 1.08–1.15 倍；
- 视觉上抬升；
- incoming/outgoing edges 高亮；
- 上下游节点仍然可见；
- 无关节点 opacity 降低，但不能完全消失；
- Inspector 同步展示完整信息。

### 6.4 Semantic Zoom

Demo 只实现三个可感知层级：

| Level | 表达 |
|---|---|
| Map | Region + node title + status |
| Structure | Summary + flow + scope |
| Detail | Expanded mini wireframe + CTA + states |

可通过选择节点触发，不要求实现复杂缩放引擎。

---

## 7. 2.5D Semantic Depth

2.5D 用于表达“同一个节点拥有多层产品语义”，不是装饰。

### 7.1 深度层

| Layer | 内容 | 表达 |
|---|---|---|
| Z0 | Product Regions | 低对比容器 / 泳道 |
| Z1 | IA Nodes | 卡片与 1–2 层轻叠底板 |
| Z2 | Flow | 路径轨道经过节点之间 |
| Z3 | Scope / Validation | Badge、边框、角标 |
| Z4 | Selected Wireframe | 节点抬升并展开内部布局 |

### 7.2 视觉约束

- 不使用明显倾斜透视；
- 不使用 3D 相机；
- 节点叠层偏移 3–6px；
- 选中节点允许更明显阴影；
- 动画 180–320ms；
- 流程路径应清晰但不盖住节点内容；
- Canvas 背景保持安静、专业、低噪声。

---

## 8. Inspector

点击节点后，右侧显示：

```text
Title
Purpose
User intent
Primary information
Primary CTA
Inputs
Outputs
Incoming flow
Outgoing flow
States
Scope status
Rationale
Provenance
```

Demo 必须至少让以下字段可见：

```text
Purpose
User intent
Primary CTA
States
Scope
Why this belongs here
```

---

## 9. Scope Conflict 场景

### 9.1 用户操作

选择 `Diagnostic Quiz`：

```text
Scope: In MVP → Later
```

### 9.2 系统响应

立即产生真实验证结果：

```text
BLOCKER — Core path broken

Study Plan requires learner-level input from Diagnostic Quiz.
Moving this node out of MVP makes personalized plan generation impossible.
```

Canvas 同步：

- `Diagnostic Quiz` 变淡；
- `Diagnostic Quiz → Study Plan` edge 变为红色虚线或断裂；
- 顶栏显示 `1 blocker`；
- Decision Panel 滑出。

### 9.3 修复方案

```text
A. Keep a lightweight 3-question diagnostic
   Preserves personalization with lower effort.

B. Replace diagnostic with manual goal and level setup
   Faster, but less adaptive.

C. Remove personalized plan generation from MVP
   Simplest build, but weakens the core promise.
```

默认演示选择 A。

### 9.4 修复后

- 节点改名或显示 variant：`Quick Diagnostic`；
- Scope 恢复 `In MVP`；
- 右上 `1 blocker` 变 `Ready for handoff`；
- Decision Record 显示：
  - Change；
  - reason；
  - user approval；
  - downstream impact。

---

## 10. Handoff Center

### 10.1 文件树

```text
handoff/
├── START_HERE.md
├── blueprint.json
├── ia.md
├── flows.md
├── scope.md
├── acceptance-criteria.md
├── no-gos.md
├── wireframes/
│   ├── study-plan.md
│   ├── daily-session.md
│   └── progress.md
└── prompts/
    └── build-agent-skill.md
```

### 10.2 交互

- 点击文件时显示预览；
- `START_HERE.md` 默认选中；
- `Copy starter prompt` 可点击；
- 点击后显示 toast；
- `Back to Blueprint` 返回并保留当前状态；
- `Reset Demo` 恢复初始 Fixture。

### 10.3 START_HERE 预览内容

```text
1. Read blueprint.json for canonical node and flow IDs.
2. Read scope.md and no-gos.md before changing implementation scope.
3. Implement one user-story slice at a time.
4. Match each screen to its wireframe reference.
5. Run the listed acceptance criteria after every slice.
6. Stop and report any conflict instead of inventing new scope.
```

---

## 11. State Machine

```text
INTAKE_DRAFT
→ INTAKE_QUESTION
→ CONTEXT_READY
→ BLUEPRINT_READY
→ NODE_SELECTED
→ NODE_EXPANDED
→ SCOPE_CONFLICT
→ REPAIR_PROPOSED
→ REPAIR_APPROVED
→ HANDOFF_READY
```

所有状态都必须可通过 fixture 和 reducer 重现。

---

## 12. 技术实现建议

为两天 Demo 优先稳定性：

```text
Vite
React
TypeScript strict
@xyflow/react
CSS modules or Tailwind
Framer Motion optional
Lucide icons
Vitest
Playwright
```

要求：

- 无后端；
- 无认证；
- 无外部 LLM 依赖；
- Fixture 本地导入；
- reducer 驱动状态；
- localStorage 可选；
- Chrome 最新版优先；
- npm 或 pnpm 均可，但项目只保留一种 lockfile。

### 12.1 推荐组件

```text
AppShell
├── IntakeWorkspace
│   ├── ConversationPanel
│   └── LiveProductContext
├── BlueprintWorkspace
│   ├── OutlinePanel
│   ├── LensComposer
│   ├── BlueprintCanvas
│   │   ├── RegionContainer
│   │   ├── ProductDecisionNode
│   │   ├── FlowEdge
│   │   └── ExpandedWireframe
│   ├── NodeInspector
│   └── DecisionPanel
├── HandoffCenter
└── DemoControls
```

---

## 13. Demo 数据原则

- 所有 Node、Flow、Wireframe、Scope、Constraint 和 Handoff references 使用 canonical IDs；
- 前端不得维护互相矛盾的独立数组；
- `04_ai_study_coach_blueprint_fixture.md` 中 JSON 是 Fixture 来源；
- Codex 应提取为实际 `.json` 或 TypeScript fixture；
- UI 不应从硬编码 DOM 文案推断关系。

---

## 14. 可访问性与录屏

- 所有按钮有可见 label；
- keyboard focus 可见；
- 不依赖 hover 才能完成主流程；
- 重要状态不只靠颜色表达；
- 1280×720 不出现横向滚动；
- 浏览器缩放 100%；
- 动画不能影响录屏节奏；
- 提供 `Reduce motion` 或尊重系统设置；
- Demo Reset 在固定位置；
- 不显示调试 UI、测试按钮或技术术语。

---

## 15. 完成定义

只有全部满足才算完成：

```text
npm install / pnpm install succeeds
development server starts
production build passes
typecheck passes
lint passes
unit tests pass
Playwright happy-path passes
Playwright scope-conflict path passes
all P0 interactions are clickable
1280×720 and 1440×900 screenshots pass visual review
demo can be reset and repeated without reload errors
no uncaught browser console errors
```

详细验收见 `05_demo_acceptance_checklist.md`。
