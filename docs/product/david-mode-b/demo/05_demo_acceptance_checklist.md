# 05 — Demo Acceptance Checklist

> **原则：** P0 项全部通过后才允许录屏。  
> **状态标记：** `[ ]` 未验证，`[x]` 通过，`[!]` 已知风险但有备用方案。  
> Codex 在 Goal mode 中必须持续更新此文件或生成等价执行副本。

---

## A. Repository and Build

- [ ] 仓库只保留一种 package manager lockfile
- [ ] 安装依赖无错误
- [ ] `dev` server 可以启动
- [ ] TypeScript strict 检查通过
- [ ] lint 通过
- [ ] unit tests 通过
- [ ] production build 通过
- [ ] 无未处理 Promise rejection
- [ ] 浏览器 Console 无 uncaught error
- [ ] README 包含启动和录屏步骤

推荐验证命令：

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run build
npm run dev
npx playwright test
```

Codex 应根据实际 package scripts 调整，但必须提供等价检查。

---

## B. Intake

- [ ] Idea 输入框可编辑
- [ ] 点击 Send 显示用户消息
- [ ] David 只问一个 decision-changing question
- [ ] 两个回答选项均可点击
- [ ] 选择 daily-session 选项后 Context Card 更新
- [ ] Context 字段至少包含 user、situation、core job、outcome、constraint
- [ ] Generate Blueprint 在 Context ready 前不可用
- [ ] Generate Blueprint 后进入 Canvas
- [ ] 无超过 2 秒的不可解释 loading

---

## C. Unified Blueprint Canvas

- [ ] 至少显示 4 个 Product Regions
- [ ] 至少显示 8 个 IA nodes
- [ ] 所有节点来自 canonical fixture
- [ ] Main Flow 正确连接节点
- [ ] Flow toggle 可隐藏/显示路径
- [ ] Scope toggle 可隐藏/显示 badge
- [ ] Wireframe toggle 可隐藏/显示 node thumbnails
- [ ] 点击节点时 Inspector 同步更新
- [ ] 点击 `Daily Session` 后节点真实展开
- [ ] 展开节点中显示 mini wireframe
- [ ] 上下游 Flow 同步高亮
- [ ] 无关节点保持可见但视觉弱化
- [ ] Canvas 可 fit view
- [ ] 首次进入不出现信息过载

---

## D. 2.5D and Visual Quality

- [ ] Region 层级明确但不过度抢眼
- [ ] Node 有轻叠层或底板
- [ ] Selected node 有可感知抬升
- [ ] Flow 路径不遮挡节点正文
- [ ] Scope / warning 作为 overlay 表达
- [ ] 不使用旋转 3D 或 WebGL
- [ ] 1280×720 可完整操作
- [ ] 1440×900 适合录屏
- [ ] 正文和标签无截断
- [ ] 点击热区清晰
- [ ] 动画不拖慢讲解
- [ ] `prefers-reduced-motion` 被尊重或至少不阻断

---

## E. Scope Conflict

- [ ] 可选中 `Diagnostic Quiz`
- [ ] 可将 Scope 从 `In MVP` 改为 `Later`
- [ ] 改动后立即触发 blocker
- [ ] `Diagnostic → Study Plan` 视觉显示断裂
- [ ] 顶栏显示 `1 blocker`
- [ ] Decision Panel 显示具体原因
- [ ] 三个 repair options 全部可见
- [ ] 推荐项有明确标识
- [ ] 选择 lightweight diagnostic 后节点更新
- [ ] 修复后 blocker 清除
- [ ] 主路径恢复
- [ ] Decision Record 显示 user-approved
- [ ] Reset Demo 可完全重现冲突

---

## F. Handoff Center

- [ ] 从 Canvas 可进入 Handoff
- [ ] 默认选择 `START_HERE.md`
- [ ] 文件树至少包含 8 个文件
- [ ] 至少 4 个文件可点击预览
- [ ] `Copy starter prompt` 可点击
- [ ] 点击后 toast 成功
- [ ] Back to Blueprint 保留状态
- [ ] Reset Demo 可回到初始 Intake
- [ ] 不显示不存在的真实下载或云同步能力

---

## G. Automated Tests

### Unit tests

- [ ] Fixture parser
- [ ] canonical ID validation
- [ ] required dependency validation
- [ ] scope conflict reducer
- [ ] repair reducer
- [ ] reset reducer
- [ ] lens state reducer

### Playwright

- [ ] Happy path：Idea → answer → Canvas → expand node → Handoff
- [ ] Scope conflict：move Diagnostic → blocker → repair → ready
- [ ] Lens toggles
- [ ] Reset Demo
- [ ] 1280×720 screenshot
- [ ] 1440×900 screenshot

---

## H. Demo Recording Readiness

- [ ] 90–120 秒内可完成完整流程
- [ ] 每一步只需一次明确点击
- [ ] 不需要刷新页面
- [ ] 不依赖网络
- [ ] 不依赖实时 LLM
- [ ] 不出现随机输出
- [ ] 所有关键文案适合放大录屏
- [ ] 准备 4–5 张提交截图
- [ ] 准备一份完整录屏
- [ ] 准备一份无旁白备用录屏
- [ ] Demo reset 已测试至少 5 次

---

## I. Scope Guard

- [ ] 未实现登录
- [ ] 未实现数据库
- [ ] 未实现协作
- [ ] 未实现生产 AI pipeline
- [ ] 未实现完整自由 Wireframe editor
- [ ] 未实现真实 3D
- [ ] 未引入与 Demo 无关的 dashboard
- [ ] 未实现多案例生成
- [ ] 没有把 IA、Flow、Wireframe 做成脱节页面

---

## J. Final Sign-off

只有以下全部满足才能标记完成：

```text
Build: PASS
Typecheck: PASS
Lint: PASS
Unit tests: PASS
Playwright: PASS
Visual review 1280×720: PASS
Visual review 1440×900: PASS
Happy path: PASS
Scope conflict path: PASS
Handoff path: PASS
P0 checklist: 100%
```

最终记录：

```text
Commit:
Build command:
Run command:
Test command:
Recording URL/path:
Known limitations:
Fallback controls:
```
