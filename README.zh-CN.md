# David

<p align="right">
  <strong>语言：</strong>
  <a href="./README.md">English</a> |
  简体中文
</p>

David 是面向 AI 独立开发者的 constraint-aware 产品蓝图 Canvas。

它把模糊的产品 Bet 变成同一个可执行产品模型：

```text
Bet -> IA -> Flow -> Low-fi Wireframe -> Scope -> Handoff
```

David 当前是一个 **desktop-first Web App**。已验证的 showcase 运行在 Vite；
Tauri 只是可选封装基础设施，不是 MVP 的主要运行形态。

## 产品是什么

David 是 Cursor、Codex、Claude Code、Lovable 等 coding agent 之前的 blueprint
layer。它先帮助 builder 判断产品结构应该是什么，再把确定后的结构交给 coding
agent 实现。

核心界面是 **Unified Spatial Blueprint Canvas**：

- IA 是稳定的 base graph；
- Flow 叠加在 canonical IA node IDs 上；
- Wireframe 在 selected node 内展开；
- Scope 变更先显示为可审核的结构 diff；
- Constraint 会产生可见 blocker 和修复选项；
- Handoff 文件从已接受的 Blueprint snapshot 编译生成。

Chat 只是 agentic intake 辅助，不是主界面。David 不是 PRD bot、chat-first PM、
whiteboard、sitemap/flowchart editor、高保真 UI 生成器、no-code builder 或 coding agent。

## 当前 Showcase

确定性的 AI Study Coach 案例已经打通完整 walking skeleton：

1. 输入模糊产品想法；
2. 回答一个会改变结构的关键问题；
3. 生成包含 4 个 region、9 个 node 的 canonical Blueprint；
4. 切换 Flow 时 IA node 不移动、不复制；
5. Daily Session 的 low-fi Wireframe 在同一节点内展开；
6. 提议把 Diagnostic Quiz 移到 Later；
7. 查看断裂路径和一个 root blocker；
8. 应用轻量三题诊断修复；
9. 打开由 snapshot 派生的 11 文件 Handoff package；
10. Reset 后可确定性重跑。

Showcase 已在 1440x900 和 1280x720 两个视口通过 Playwright 验证，包含连续五次
完整 Reset 重跑、运行时错误收集和页面 overflow 门禁。

## 当前真源

按以下顺序阅读：

```text
docs/product/david-mode-b/
  00_david_mode_b_positioning_and_principles.md
  01_ia_reasoning_and_agent_autonomy_contract.md
  02A_canvas_decision_brief.md
  02B_unified_canvas_case_validation.md
  david_unified_spatial_blueprint_canvas_ia_v2.md
  demo/
```

可执行 feature contract 位于：

```text
specs/001-david-demo-showcase/
```

`docs/legacy-before-pivot/` 下的 Mode A 与 pre-pivot 材料只作为历史上下文保留。

## 架构不变量

`BlueprintDocument` 是 canonical source of truth。

- React Flow nodes/edges 只能是渲染投影；
- IA、Flow、Wireframe、Scope、validation 与 Handoff 共用 canonical IDs；
- Pending change 在批准前必须保持为独立 `ChangeSet` projection；
- Readiness 只能从 validator 输出派生，不能手工切换；
- Handoff 必须从当前 Blueprint snapshot 编译，不能依赖自由文本；
- 确定性 reference showcase 不依赖 LLM inference。

## 技术栈

- React 19 + TypeScript
- Vite
- React Flow
- Zod
- Vitest
- Playwright
- 可选 Tauri wrapper

## 本地运行

使用 Node.js 24（见 `.nvmrc`），或 `package.json#engines` 允许的其他版本。

```bash
npm install
npm run dev
```

打开 [http://127.0.0.1:1420](http://127.0.0.1:1420)。

质量门禁：

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

## 仓库结构

```text
desktop/src/
  app/          确定性 demo 状态与 transition
  components/   intake、统一 Canvas、inspector、decision、Handoff
  domain/       canonical types、Zod schema、validator、readiness、export
  fixtures/     AI Study Coach reference Blueprint
  styles/       Quiet Blueprint tokens 与响应式布局
tests/
  unit/         domain 与 reducer contract
  e2e/          双视口完整交互旅程
specs/          可执行 Spec Kit feature artifacts
artifacts/demo-showcase/
                截图、测试证据与最终验收记录
docs/product/david-mode-b/
                产品与交互真源
src-tauri/      可选 desktop packaging shell
```

## MVP 边界

当前 MVP 明确不包含 backend、auth、collaboration、live LLM、persistence、WebGL、
freeform wireframe editing、高保真 UI 生成、自动代码生成或生产级 export integration。
