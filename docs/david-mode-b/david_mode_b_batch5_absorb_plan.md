# David Mode B Batch 5 吸收结论与下一步计划

> Batch 5 输入：Prompt 13 十天 MVP 实现计划；Prompt 14 Blueprint Critic / 蓝图质量评估体系。  
> 本文用于把 Batch 5 的 deep research 结果转化为 David Mode B 的开发执行计划、质量闸门、coding agent 分工、验收标准和下一步收敛动作。

---

## 1. TL;DR

Batch 5 的核心结论是：

**David Mode B 必须按 walking skeleton 来实现，而不是按完整产品来实现。**

10 天内必须打通这条最小闭环：

```text
Bet 输入
→ Blueprint Canvas
→ Node Detail
→ Wireframe Preview
→ Scope Cut
→ Handoff Export
```

所有不服务这条链路的功能都应该暂时砍掉，包括：

- Auth
- 多项目复杂管理
- 协作
- 评论
- 复杂版本历史
- 移动端适配
- full dashboard
- full chat history
- full design editor
- full 3D canvas
- 多 provider 并行联调

Batch 5 同时确认：  
**Blueprint Critic 必须成为质量闸门，而不是装饰性评分。**  
它要判断 David 生成的 IA / Flow / Wireframe / Scope / Handoff 是否真的可以进入开发。

---

## 2. Batch 5 关键决策

| 决策 | 结论 |
|---|---|
| 10 天目标 | 做 walking skeleton，不做完整产品 |
| 最小 Demo 闭环 | Bet → Canvas → Node Detail → Wireframe → Scope → Handoff |
| 开发顺序 | Contract first、mock first、single provider later |
| 数据库 | P0 先不用 Supabase，先做 LocalProjectRepo / localStorage |
| AI 接入 | 前 6 天 mock，Day 7 接一个 live provider |
| Provider | OpenAI-first；Anthropic stub 保留接口但不优先联调 |
| Canvas | React Flow，但右侧 Detail 不能直接订阅整个 nodes/edges |
| Wireframe | deterministic renderer，不接 AI，不做自由画板 |
| Scope | 规则版先够用，AI 增强可 P1 |
| Handoff | deterministic export，Markdown + JSON 必须真实可下载 |
| Blueprint Critic | 双层评审：程序化 validator + LLM critic |
| Readiness Score | 可以内部使用，但对用户优先展示状态、blockers、repairs |
| 质量闸门 | 没有 AC / Done-when / 主路径断边 / 节点缺 purpose 就不能进入 build |

---

## 3. 10 天实现策略

### 3.1 核心原则

```text
Contract first
Mock first
Canvas first
Export always real
AI late integration
Quality gate before polish
```

解释：

| 原则 | 含义 |
|---|---|
| Contract first | 先冻结 TypeScript / Zod schema，否则 UI、AI、Export 都会返工 |
| Mock first | 先用 fixture 打通全链路，再接 AI |
| Canvas first | David 的核心是 Blueprint Canvas，不是 chat 或 dashboard |
| Export always real | 用户买的是可交付的 handoff，导出必须真实 |
| AI late integration | 前半程不要被 provider 调试拖慢 |
| Quality gate before polish | 先保证蓝图能进入开发，再做视觉 polish |

---

## 4. 10 天开发计划

| Day | 目标 | 主要任务 | 验收标准 |
|---:|---|---|---|
| Day 1 | 仓库骨架与领域契约 | Next.js + TS + Tailwind + shadcn/ui；定义 Bet / Blueprint / Node / Wireframe / Scope / Handoff schemas；生成 fixtures | `pnpm lint && pnpm typecheck && pnpm build` 通过；fixtures 可被 schema parse |
| Day 2 | Workspace Shell 与本地状态 | 三栏布局：BetPanel / Canvas / Inspector；Zustand store；localStorage autosave | 刷新后项目、选中节点、面板状态能恢复 |
| Day 3 | Bet 输入到 Mock Blueprint | Bet 输入表单；mock `/api/blueprint/generate`；fixture 映射 React Flow nodes/edges | 输入 Bet 后出现 4–8 个节点的 Canvas |
| Day 4 | Canvas 与 Node Detail 联动 | Custom nodes；selection sync；Node Detail 表单；保存回写节点 | 点击节点右侧打开 detail；编辑后节点同步 |
| Day 5 | Wireframe Preview | deterministic wireframe renderer；form/list/detail 三种模板 | 每个核心节点都有低保真 preview；只读 |
| Day 6 | Scope Cut 与 Export | 规则版 Keep/Cut/Later；Markdown/JSON export；下载 | Scope 分组可见；`handoff.md` 和 `project.json` 可下载 |
| Day 7 | 接入 live AI provider | AIProvider interface；OpenAI adapter；mock fallback；Zod parse | 有 key 时 live 生成；无 key 时走 mock |
| Day 8 | Node Detail AI / Scope AI 增强 | Node enrich；Scope AI 可选增强；1 次 repair/retry | 选中节点可 AI enrich；失败不崩溃 |
| Day 9 | QA / Demo Path 固化 | Playwright happy path；loading/empty/error；demo fixtures；reset demo | 从空项目到导出全链路自动化通过 |
| Day 10 | Demo freeze | 只修 P0 bug；冻结 schema/prompts；准备截图、导出样例、讲稿 | 5 分钟 Demo 稳定复现，不新增功能 |

---

## 5. Coding Agent 分工

### 5.1 推荐 Agent 角色

| Agent | 负责目录 | 职责 |
|---|---|---|
| Orchestrator Agent | `/docs/*`, root config | 集成顺序、PR gate、demo fixtures、cut list |
| Contract Agent | `src/lib/contracts/*`, `src/lib/domain/*`, `src/lib/mock/*` | Zod schemas、domain types、fixtures |
| Shell Agent | `app/*`, `src/features/workspace/*`, `src/components/layout/*` | App shell、布局、TopBar、Sidebar、Inspector 容器 |
| Canvas Agent | `src/features/blueprint/*`, `src/components/flow/*` | React Flow canvas、custom nodes/edges、selection |
| Detail Agent | `src/features/node-detail/*`, `src/features/wireframe-preview/*`, `src/features/scope-cut/*` | Node Detail、Wireframe Preview、Scope UI |
| AI Agent | `src/lib/ai/*`, `app/api/*`, `src/lib/prompts/*` | Provider、route handlers、prompt、parse/retry |
| Persistence & QA Agent | `src/lib/repo/*`, `src/features/export/*`, `tests/*` | Local repo、导入导出、Playwright、demo reset |

### 5.2 多 Agent 开发硬规则

```text
1. Contract Agent 拥有 schema；其他 agent 不得私自改 contract。
2. 每个 agent 默认只改自己目录。
3. 新功能必须先有 fixture。
4. AI route 必须有 mock fallback。
5. 新字段进入 project state 时，必须同步进入 export。
6. P0 功能必须不破坏 Playwright happy path。
7. 不允许任何 agent 把产品做成 dashboard/chat/wireframe editor。
```

---

## 6. 技术架构吸收结论

### 6.1 推荐架构

```text
Next.js App Router
→ WorkspaceShell Client Component
→ Zustand store
→ LocalProjectRepo
→ React Flow Canvas
→ Node Detail / Wireframe / Scope Panels
→ API Routes
→ AIProvider
→ Export Builder
```

### 6.2 关键实现原则

| 模块 | 实现原则 |
|---|---|
| Next.js | page/layout 默认 Server Component；交互部分下沉 Client Component |
| Zustand | 只管理客户端 workspace 状态，不做跨请求全局 store |
| React Flow | 只作为渲染/交互层，领域真源是 BlueprintDocument |
| Wireframe | JSON block → deterministic React renderer |
| Export | deterministic builder，不能靠 LLM 自由生成 |
| AI | 只生成结构化 artifact，所有输出过 Zod parse |
| Persistence | P0 LocalProjectRepo，Supabase 后置 |
| Tests | 至少 1 条 Playwright happy path |

---

## 7. P0 / P1 / P2 Scope

### P0 必须做

```text
1. 单项目 workspace
2. Bet 输入
3. Mock + live Bet → Blueprint
4. Blueprint Canvas 渲染 / 选择 / 拖拽
5. Node Detail 手工编辑
6. Deterministic Wireframe Preview
7. Scope Cut：Keep / Cut / Later 或 In MVP / Later / Excluded
8. Handoff Export：Markdown + JSON
9. Local persistence
10. Playwright happy path
```

### P1 推荐做

```text
1. Node Detail AI enrich
2. Scope AI enhance
3. 更多 node actions
4. Import project JSON
5. Prompt 模板管理
6. 更完整错误恢复
7. 快捷键
8. Supabase repo
```

### P2 / Backlog

```text
1. Auth
2. 多项目复杂管理
3. 协作
4. 评论
5. 版本 diff
6. 分享链接
7. 静态图像导出
8. Figma plugin
9. 真 3D Spatial mode
10. 移动端完整适配
```

---

## 8. 最小可演示闭环

Day 10 必须稳定复现：

```text
1. 打开空白 workspace
2. 输入一个 Bet
3. 生成 Blueprint Canvas
4. 点击任一节点，打开 Node Detail
5. 生成或刷新该节点的低保真 Wireframe Preview
6. 运行 Scope Cut，得到 Keep / Cut / Later
7. 导出 handoff.md 与 project.json
```

这是 David 的 walking skeleton。  
如果这条链路不稳，任何视觉 polish 都没有意义。

---

## 9. Blueprint Critic 核心吸收

### 9.1 Critic 的定位

Blueprint Critic 不是“给蓝图打漂亮分”。

它是：

> **开发前质量闸门：判断 IA / Flow / Wireframe / Scope / Handoff 是否已经足以进入 coding agent 实现。**

它要防止：

- IA 结构混乱
- 页面太多
- 页面目的不清
- Flow 不连贯
- Wireframe 与 IA 不匹配
- Scope 太大
- Handoff 不可执行
- Coding agent prompt 太模糊

### 9.2 双层评审系统

```text
程序化 Validator
→ 字段完整性
→ 图连通性
→ ID 映射
→ Scope 状态
→ Handoff 必填项

LLM Critic
→ 语义质量
→ 页面是否必要
→ flow 是否合理
→ MVP 是否过大
→ handoff 是否清晰
→ prompt 是否可执行
```

### 9.3 Readiness Score

建议内部生成：

```text
Blueprint Readiness Score: 0–100
```

但对用户优先展示：

```text
Ready
Needs revision
Blocked
```

而不是裸分数。

原因：

- 裸分数会制造假精确
- 用户可能为了提分补形式字段
- blocker 比平均分更重要

---

## 10. Blueprint Critic 评分维度

| 维度 | 权重 | 核心问题 |
|---|---:|---|
| 用户需求与目标清晰度 | 8 | 是否围绕真实用户任务 |
| IA 质量 | 16 | 结构、命名、页面经济性是否合理 |
| Flow 质量 | 16 | 路径是否连续、闭环、有异常路径 |
| Wireframe 质量 | 15 | 页面目的、CTA、输入输出、状态是否清楚 |
| 节点完整性与跨产物一致性 | 12 | IA / Flow / Wireframe 是否一一对应 |
| Scope 与 MVP 收敛度 | 12 | 是否只做最小可用、最小可交付 |
| Handoff 质量 | 11 | spec 是否清晰、完整、可验证 |
| Coding agent prompt 可执行性 | 10 | 是否有 Goal / Context / Constraints / Done-when |

---

## 11. 硬门槛规则

即使平均分高，以下情况也必须阻塞：

| 硬门槛 | 处理 |
|---|---|
| 没有明确 user need / outcome | 总分上限 59 |
| 主路径有 invalid edge / dead end | 总分上限 49 |
| 超过 20% 关键节点缺 purpose 或 primary CTA | 总分上限 49 |
| Wireframe 与 IA 主路径严重不匹配 | 总分上限 49 |
| Handoff 缺 acceptance / verification | 总分上限 39 |
| Coding prompt 缺 Goal 或 Done-when | 总分上限 39 |

---

## 12. Validator Checklist

### 12.1 Node Completeness

每个关键节点必须有：

```text
- purpose
- user_task
- primary_cta
- inputs
- outputs
- next_state
- scope_status
```

建议指标：

```text
Node Completeness Rate = 已填写字段数 / 应填写字段数
```

阈值：

| Rate | 处理 |
|---:|---|
| ≥ 0.95 | 通过 |
| 0.85–0.94 | 警告 |
| 0.70–0.84 | 高风险 |
| < 0.70 | 阻塞 |

### 12.2 Flow Edge Validity

自动检查：

```text
- from/to 节点必须存在
- start 可达
- 非终点节点不能死路
- decision 节点至少两条出边
- next_state 与 edge 一致
- MVP 路径不能跳到 excluded 节点
```

### 12.3 MVP Bloat

默认过大信号：

```text
- 主用户目标 > 2
- 关键 happy path 页面数 > 12
- 外部依赖数 > 3
- 支撑型能力 > 4
- later/out_of_scope 比例 < 15% 且总节点 > 12
- 未验证高风险假设却先做优化能力
```

### 12.4 Handoff Prompt Sufficiency

Prompt 必须至少包含：

```text
- Goal
- Context
- Constraints
- Done when
- Verification
- Output contract
```

缺 `Goal` 或 `Done when` 直接 Fail。

---

## 13. Critic UI 展示建议

Critic UI 不应只展示总分。

推荐结构：

```text
Readiness Status
→ Top Blockers
→ Top Repairs
→ Dimension Scores
→ Graph Overlay
→ Mapping Panel
→ Handoff Audit
→ Trend / Version Comparison
```

### 用户默认看到

```text
- 当前状态：Ready / Needs revision / Blocked
- 最需要修的 3 件事
- 缺字段计数
- 主路径断边数
- MVP 过大信号数
- Handoff 缺失项
```

### 内部团队可看到

```text
- 0–100 readiness score
- 分维度得分
- blocker 类型统计
- 修复后预期提升
- 版本趋势
```

---

## 14. 对 MVP 计划的更新

Batch 5 后，MVP 不仅要能生成蓝图，还必须能评估蓝图。

### P0 更新

```text
1. Blueprint validator 必须有基础版本
2. Node completeness check 必须有
3. Flow edge validity check 必须有
4. Handoff sufficiency check 必须有
5. Critic 结果至少显示 Ready / Needs revision / Blocked
```

### P1 更新

```text
1. LLM Critic
2. Dimension scores
3. Top repairs
4. Graph overlay
5. MVP bloat detection
```

### P2 更新

```text
1. Readiness trend
2. Version comparison
3. Critic history
4. Custom rubric
```

---

## 15. 风险与控偏

### 最容易拖慢开发的风险

| 排名 | 风险 | 应对 |
|---:|---|---|
| 1 | Contract churn | Day 1 freeze schema |
| 2 | Wireframe Preview 变成设计器 | Preview 只读，deterministic |
| 3 | 提前做 DB/Auth | P0 local-only |
| 4 | 多 provider 并行 | OpenAI-first |
| 5 | 多 agent 改共同文件 | Directory ownership |
| 6 | 没有 E2E | Day 9 必须 Playwright happy path |
| 7 | Critic 过早做复杂 | P0 先做 validator，LLM critic P1 |

### 永久控偏原则

```text
任何新增功能必须回答：
它服务 Bet → Blueprint → Node Detail → Wireframe → Scope → Handoff 哪一段？
如果回答不上，就不进 10 天 MVP。
```

---

## 16. 最终 Demo Checklist

Day 10 进入比赛前必须全绿：

```text
[ ] 打开 /workspace，无 runtime error
[ ] 输入 demo Bet，触发生成
[ ] Canvas 出现节点图
[ ] 点击节点，右侧 Detail 联动
[ ] 编辑节点，Canvas 同步
[ ] Wireframe Preview 能刷新
[ ] Scope Cut 生成 Keep/Cut/Later
[ ] Export 下载 handoff.md
[ ] Export 下载 project.json
[ ] project.json 可重新导入
[ ] 刷新后最近 project 恢复
[ ] provider 失败时 mock fallback
[ ] Playwright happy path 全绿
[ ] 至少两个 demo fixtures
[ ] Demo script 5 分钟内可讲完
```

---

## 17. 对 Coding Agent 的最新指令

```text
你正在实现 David Mode B 的 10 天 MVP。
请严格按 walking skeleton 实现：

Bet Input
→ Blueprint Canvas
→ Node Detail
→ Wireframe Preview
→ Scope Cut
→ Handoff Export

新增要求：
1. Contract first。先实现 Zod schemas 和 fixtures。
2. 前 6 天 mock first，不要先接 AI。
3. P0 使用 LocalProjectRepo，不接 Auth / Supabase。
4. Wireframe Preview 必须 deterministic，只读，不做自由编辑器。
5. Handoff Export 必须真实下载 Markdown + JSON。
6. Canvas 是核心，不要做 dashboard。
7. Chat 不是核心，不要做聊天历史主界面。
8. Blueprint Critic P0 先做程序化 validator。
9. 最少检查 Node Completeness、Flow Edge Validity、Handoff Sufficiency。
10. Day 9 必须有 Playwright happy path。
11. 不要新增任何不服务 Bet → Blueprint → Node Detail → Wireframe → Scope → Handoff 的功能。
```

---

## 18. 下一批建议

Batch 5 已经完成：

```text
10 天实现计划
coding agent 分工
质量闸门
Blueprint Critic
Demo checklist
```

下一批应该进入最终收敛：

```text
Batch 6：
- Prompt 15：Roadmap / Backlog / 可扩展方向
- Prompt 16：最终 MVP PRD 草案
```

目标是：

```text
1. 把所有前面批次整合成最终 PRD
2. 明确 MVP / P1 / P2 / Backlog
3. 写出 coding agent 最终开发指令
4. 形成比赛前可执行的需求文档
5. 防止最终 PRD 又回到早期大而全想法
```

---

## 19. Batch 5 最终一句话

**David Mode B 的 10 天目标不是做一个完整 AI PM 工具，而是做一个可演示、可导出、可被质量闸门检查的 Bet-to-Handoff walking skeleton。**
