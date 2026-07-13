# 03 — AI Study Coach Demo Script

> **推荐录屏长度：** 90–120 秒  
> **录屏目标：** 不解释所有功能，只证明 David 的核心产品逻辑。  
> **UI：** 英文  
> **主讲：** 下方提供中文主讲词，同时给出英文短句参考。  
> **录屏前：** 点击 `Reset Demo`，确保浏览器尺寸 1440×900，关闭通知。

---

## 1. 一句话开场

中文：

> AI coding 已经让实现变得非常快，但很多独立开发者仍然不知道第一版产品应该如何组织。David 是一个带 PM 专业知识的 Co-worker，它在写代码前，先帮用户形成一张可执行的产品蓝图。

English:

> AI made coding faster. Product structure is now the bottleneck. David helps builders turn a fuzzy idea into a build-ready product blueprint.

---

## 2. 录屏时间线

| 时间 | 用户操作 | 屏幕变化 | 中文主讲重点 |
|---:|---|---|---|
| 0–8s | 停留在 Intake | 显示聊天区与空的 Context Card | David 不是表单，而是 Agentic PM conversation |
| 8–18s | 提交预置 Idea | David 复述并问一个问题 | 它只问会改变结构的问题 |
| 18–28s | 选择 “daily session” | Context Card 更新；Generate 可用 | David 把用户回答转成结构化产品上下文 |
| 28–38s | 点击 Generate Blueprint | 进入 Canvas；节点逐步出现 | David 先组织 IA，不直接画漂亮 UI |
| 38–55s | 点击 Daily Session | 节点抬升并展开 Wireframe | IA 和 Wireframe 是同一 Product Decision Object 的两层 |
| 55–66s | 切换 Flow off/on | 主路径消失/出现 | Flow 直接覆盖 IA，而不是另一张脱节的图 |
| 66–82s | 选择 Diagnostic Quiz，把 Scope 改为 Later | Edge 断裂、Blocker 出现 | David 检查产品判断，不只是帮用户绘图 |
| 82–95s | 选择 Repair A | Quick Diagnostic 恢复主路径，Ready | David 自主提出方案，但关键 Scope 决策由用户确认 |
| 95–112s | 打开 Handoff | 文件树和 START_HERE 展示 | 蓝图最终变成 Coding Agent 可执行的 Skill-like Package |
| 112–120s | 点击 Copy starter prompt | Toast；停留在 Handoff | Blueprint before build |

---

## 3. 逐步操作与讲稿

### Scene 1 — 模糊 Idea

操作：

1. 光标点击输入框；
2. 保留或输入：

```text
I want to build an AI study coach for exam preparation,
but I’m not sure what the first version should contain.
```

3. 点击 Send。

中文讲稿：

> 这是很多 AI 独立开发者真实的起点：有一个 Idea，但不知道第一版应该包含什么。David 不会马上生成十几个页面，也不会先要求用户填一张复杂表格。

预期屏幕：

- 用户消息进入聊天；
- David 显示一条简短解释；
- 只出现一个关键问题。

---

### Scene 2 — 一个会改变结构的问题

选择：

```text
Students return every day and complete a focused study session.
```

中文讲稿：

> David 只问会改变产品结构的问题。这里，第一版最重要的不是生成一份漂亮计划，而是让用户每天完成一次有效学习。

预期屏幕：

- Live Context 更新；
- `Primary outcome` 显示 daily loop；
- `Generate Blueprint` 可点击。

---

### Scene 3 — Living Blueprint

点击：

```text
Generate Blueprint
```

中文讲稿：

> David 先从用户意图推导产品结构。这里不是一组孤立的页面，而是一张 Living Blueprint。

预期屏幕：

```text
SET UP → LEARN → REFLECT
```

节点与主路径出现。

---

### Scene 4 — IA 与 Wireframe 合一

点击：

```text
Daily Session
```

中文讲稿：

> IA 回答用户如何理解和找到产品能力。选择一个节点后，它会直接展开自己的内部信息结构和低保真 Wireframe。这个页面为什么存在、主要信息是什么、CTA 是什么，以及用户如何进入和离开，都属于同一个对象。

预期屏幕：

- Daily Session 节点抬升；
- mini wireframe 出现；
- incoming/outgoing flow 高亮；
- Inspector 显示 purpose、intent、CTA、states。

---

### Scene 5 — Flow 是 Overlay

点击 Flow toggle 关闭，再打开。

中文讲稿：

> Flow 不是另一张需要维护的流程图。它直接使用 IA 节点和 CTA，显示用户如何跨越这些结构完成任务。

预期屏幕：

- Flow rails 清晰隐藏/恢复；
- 节点位置不改变；
- 当前主路径高亮。

---

### Scene 6 — Scope 改动触发产品判断

点击：

```text
Diagnostic Quiz
→ Scope
→ Later
```

中文讲稿：

> 现在我把 Diagnostic Quiz 移出 MVP。普通绘图工具只会让这个节点变灰，但 David 会检查这项决定对产品承诺和用户路径的影响。

预期屏幕：

- `Diagnostic Quiz → Study Plan` 断裂；
- `1 blocker`；
- Decision Panel 显示解释。

---

### Scene 7 — 修复并确认

选择：

```text
Keep a lightweight 3-question diagnostic
```

中文讲稿：

> David 自动提出专业修复方案，但不会替用户做高影响的 Scope 决定。用户确认后，它把完整诊断收缩成轻量版本，并恢复主路径。

预期屏幕：

- `Quick Diagnostic`；
- blocker 清零；
- `Ready for handoff`。

---

### Scene 8 — Coding-Agent Handoff

点击：

```text
Open Handoff
```

中文讲稿：

> 最后，David 不只是导出 PRD。它生成一套共享 canonical IDs 的蓝图文件，并提供一个主入口 Prompt，告诉下游 Coding Agent 先读什么、按什么顺序实现、如何验证，以及遇到冲突时何时停止。

点击：

```text
Copy starter prompt
```

结束句：

> David is the product blueprint layer between a fuzzy idea and an AI coding agent.

---

## 4. 录屏时不要展示

- 安装依赖；
- 终端；
- 代码；
- 浏览器开发者工具；
- loading 超过 2 秒；
- 尚未实现的按钮；
- 过长文档正文；
- 复杂 Debug overlays；
- 多个产品案例；
- 真正的随机 LLM 输出。

---

## 5. 备用录屏方案

如果 Scope interaction 临时失败：

1. 使用 Demo Controls 跳到 `SCOPE_CONFLICT`；
2. 继续展示 blocker 和 repair；
3. 不在讲稿中提到跳转。

如果 Clipboard 权限失败：

- toast 显示 `Starter prompt ready`;
- 录屏不需要实际粘贴验证。

如果 Canvas 布局错位：

- 点击 `Fit View`;
- 使用 1440×900；
- 刷新后点击 Reset Demo。

---

## 6. 提交截图建议

准备 5 张截图：

1. Agentic Intake + Live Product Context；
2. Unified Canvas 全景；
3. Daily Session Expanded Wireframe；
4. Scope Conflict + Decision Panel；
5. Handoff Center。

每张图应独立表达一个产品主张。
