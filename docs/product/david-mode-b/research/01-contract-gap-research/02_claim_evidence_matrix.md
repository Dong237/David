# Claim–Evidence Matrix

> 本矩阵以 `01` 的主要 Section 为覆盖单位。`SRC-*` 的标题、URL、日期、支持点和完整限制见 `sources/sources.md`；细粒度专业证据见 `sources/agent_*_evidence.md`。`Provisional` 表示可保留为产品假设，但不得宣称已被科学验证。

## A. Purpose, Definitions, Responsibility, State

| Claim ID | `01` Section | Claim | Evidence | Source quality | Limitation / conflict | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| IA-001 | 0.2 | 少问 user-exclusive truth、由 AI 承担专业判断、对高影响变更提供控制，是合理方向 | SRC-AUT-01、03、04 支持相关性、纠正、控制和失败恢复 | A/B | 没有来源直接验证这句四分法或 David 的阈值 | 保留为 core thesis；具体行为由 case library 校准 | Medium |
| IA-002 | 0.3–0.4 | IA 推理需覆盖 intent、inventory、mental-model hypotheses、organization、labels、navigation、flow、wireframe 与 validation | SRC-IA-01–11；SRC-PM-01–04 | B / method-owner | 这是专业责任覆盖，不证明固定线性顺序最优 | 保留 stage responsibilities；允许压缩与回退 | Medium-High |
| IA-003 | 1.1–1.8 | IA 不等于 sitemap、navigation、flow 或 wireframe，但需要与它们连接 | SRC-IA-01、02、08、09、11 | B | 方法边界稳定；David 的统一 Canvas 仍需测试 | 维持 canonical blueprint + projections | High |
| IA-004 | 1.9 | AI 生成的 mental model 必须称 hypothesis，除非有真实研究 | SRC-IA-03–06；SRC-AUT-05 | B | 来源证明用户模型需研究，不给出 provenance enum | 禁止把 model inference 标为 validated | High |
| IA-005 | 2.1–2.2 | AI 应负责 routine IA hygiene 与专业方案，不应把 UI pattern 选择全部反问用户 | SRC-AUT-01、03；SRC-IA-02、07、10 | A/B | “routine”边界需 autonomy cases；用户偏好可能改变控制需求 | L0/L1 可执行但需 Undo/inspectability | Medium |
| IA-006 | 2.3 | 支付意愿、真实 mental model、findability、task success 不能由模型推断冒充事实 | SRC-IA-03–06；SRC-PM-02、04 | B | 证据类型强弱依任务变化 | 强制 assumption/evidence separation | High |
| IA-007 | 3.1–3.3 | Canonical state 和 provenance 能提升审计、纠错与不确定性管理 | SRC-AUT-01、03–05 间接支持 context/correction/control | A/B indirect | 具体 state domains 与九态枚举是 David 架构设计，不是外部研究结论 | 保留 schema 输入；通过 usability 与 reducer tests 验证 | Medium-Low / Provisional |
| IA-008 | 3.4–3.5 | Meaningful decision 记录 option、rationale、assumption、evidence、confidence 和 autonomy 可支持审计 | SRC-AUT-01、03 间接支持 explanation/control | A/B indirect | 字段集合与 context precedence 没有直接实证；“locked”与 current correction 的优先级是产品政策 | 作为可测试 contract，不写成 UX 定律 | Medium-Low / Provisional |

## B. Reasoning Pipeline and PM Methods

| Claim ID | `01` Section | Claim | Evidence | Source quality | Limitation / conflict | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| PM-001 | 4.2 | Orient 应从 user need、当前决策、constraints 与 unknowns 开始 | SRC-PM-02；Design Council 原始 Double Diamond（见 Agent B notes） | A/B | Double Diamond 不规定 agent intake 细节 | `orient_product_situation` 输出 ProductContext | High for principle |
| PM-002 | 4.3 | JTBD 可帮助从 feature request 转向 circumstance、progress 与 information need | SRC-PM-01、02 | Method owner / A-B | JTBD 不是 IA 生成器；需结合 inventory | Intent Skill 不直接决定页面或导航 | High for method |
| IA-009 | 4.4 | 在生成页面前先做 object/content/capability/action/state inventory 可减少 capability=page 的错误 | SRC-IA-02、11；affinity/taxonomy evidence 见 Agent A | B / indirect | 未找到对该固定 agent 顺序的 controlled comparison | 保留为 pipeline responsibility；benchmark 检查 coverage | Medium |
| IA-010 | 4.5 | Card sorting 可为 grouping 提供用户证据，AI grouping 只能是 hypothesis | SRC-IA-03–06 | B | Card sort 受样本、卡片和任务影响 | Hypothesis 必须附 basis、confidence、validation | High |
| IA-011 | 4.6 / 10 | Candidate IA 应共享 inventory/constraints 并显式比较 trade-offs | SRC-IA-01–07；SRC-PM-03 间接支持 option externalization | B / method-owner | 默认 2 个、最多 3 个选项没有直接证据 | 共享输入是 invariant；candidate 数量保留 provisional | Medium |
| IA-012 | 4.7 / 11 | Labels 应使用用户语言、能预测目的地、避免模糊内部术语；三次点击不是质量规则 | SRC-IA-07、12；NN/g Better Link Labels（Agent A） | B | 对具体 label 的理解仍需 label/tree test | Expert rubric + user test；不设 click-count blocker | High |
| IA-013 | 4.8 / 11.4 | IA 与 navigation 不同；global/local/context/search 应按任务、规模和语境选择 | SRC-IA-01、02；NN/g IA vs Navigation / Local Navigation（Agent A） | B | “desktop 6–10 spaces → sidebar”等精确模式是 heuristic | Pattern-based recommendation + rationale + Undo | Medium-High |
| IA-014 | 4.9 | Flow 应检验 IA 能否支持任务完成，并覆盖关键 alternate/error/recovery 状态 | SRC-IA-08、09；story mapping evidence（Agent B） | B | 全部 path type 是否 P0 取决于产品风险 | 核心路径缺失可 blocker；其他按语境 warning | Medium-High |
| IA-015 | 4.10 | Node mini-IA 应先于 low-fi wireframe；wireflow 可连接 screen structure 与 path | SRC-IA-08；wireframe authority（Agent A/B） | B | 先后顺序没有直接 comparative study | 作为生成约束；通过 benchmark/handoff 检验 | Medium |
| PM-003 | 4.11 | Scope 方法应匹配决策，不应混合分数：coherent slice、appetite、RICE、MoSCoW、assumption test 各有边界 | SRC-PM-03–08 | Method-owner / B | 大多是方法定义而非独立效果证据 | Skill router 选择一个主方法并记录禁用条件 | Medium-High |
| PM-004 | 5 | 每 stage 的 I/O 与 exit condition 有助于运行时结构化，但现有 gate 未被外部验证 | 主要来自 internal contract；方法来源仅支持组成部分 | Internal design | “sufficient”“plausible”等词需 schema/rubric 操作化 | 保留职责；未来 schema 与 eval 明确定义 | Low-Medium / Provisional |

## C. Questioning, Autonomy, Evidence

| Claim ID | `01` Section | Claim | Evidence | Source quality | Limitation / conflict | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| AUT-001 | 6.1–6.2 | 只有 user-exclusive 且 decision-blocking 的事实应优先询问；专业判断可提案；evidence-dependent truth 应测试 | SRC-AUT-01、03–05；SRC-IA-03–06 | A/B | 三分类是 David synthesis，不是现成学术 taxonomy | 用 case library 校准边界 | Medium |
| AUT-002 | 6.3 | 问题说明 why/decision/fallback 可提高可理解性与控制感 | SRC-AUT-01、03 间接支持 relevant info 与 explainability | A/B indirect | 未直接比较该四字段 question template | 先作为 UX heuristic，做可用性测试 | Medium-Low / Provisional |
| AUT-003 | 6.4 | normal turn 一次只问一个；特定 intake 最多三问 | 没有找到直接证据 | Missing | 可能受任务复杂度、用户偏好与界面影响 | 不应冻结为科学阈值；A/B + abandonment/quality test | Low / Needs research |
| AUT-004 | 6.5 | 在 state/memory/evidence/fallback/visual proposal 可解决时避免重复提问 | SRC-AUT-01、03–05 | A/B indirect | 具体六步 dedupe gate 是架构规则 | 运行时 deterministic check + case tests | Medium-High |
| AUT-005 | 7.1–7.7 | impact、reversibility、knowledge ownership、evidence、locked constraints 与 risk 应决定 automation/control | SRC-AUT-01、03、04、PAIR Patterns | A/B | 六种 action 与 L0–L3 mapping 是产品 synthesis | 保留 enum，必须用 labeled cases 校准 | Medium |
| AUT-006 | 7.5 | target user、core path、payment/privacy/auth、locked state、high rework 的变更应先确认 | SRC-AUT-03、04 支持高风险控制/manual fallback | B | 不同用户可能选择 Fast/Controlled；仍有安全底线 | 作为默认 policy；安全/法律不可被 mode 降低 | Medium-High |
| AUT-007 | 8.1–8.2 | question value 随 impact/uncertainty/exclusive knowledge 上升，随 fallback/reversibility/evidence 上升而降低 | HAI/control principles 间接支持；无验证公式 | A/B indirect | 不是经验公式，因素权重未知 | 只用于 ranking，不输出伪精确分数 | Medium-Low / Provisional |
| AUT-008 | 8.3–8.4 | vague intake 在 3–5 个问题内给 first proposal | 没有 David 用户证据 | Missing | 可能减少 burden，也可能降低复杂产品质量 | 必须标 provisional；A/B question budget + IA quality | Low / Needs research |
| AUT-009 | 8.5 | Question debt 应记录 blocking、fallback、owner、decline 与 review trigger | SRC-AUT-01、03–05 间接支持 context-aware adaptation | A/B indirect | schema 字段与效果未经验证 | schema input；deterministic duplicate/re-ask tests | Medium-Low |
| IA-016 | 9 | Card/tree/usability/analytics 的 evidence strength 依目标不同；synthetic users 最弱且只用于 ideation | SRC-IA-04–06；SRC-PM-02、04 | B | 当前“High/Medium”标签不是跨任务绝对尺度 | 按 claim type 记录 relevance，不用单一总等级 | High for hierarchy direction |

## D. Interaction, Change, Validation, Readiness

| Claim ID | `01` Section | Claim | Evidence | Source quality | Limitation / conflict | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| CAN-001 | 12 | `Interpret → Patch → Validate → Visualize → Explain → Ask` 是可审计 turn protocol | HAI evidence 支持 relevant info、correction、control；具体顺序无直接证据 | A/B indirect | 可能不是每个 turn 都需要全部阶段 | 作为 harness responsibility，不强制冗长 UI 文案 | Medium-Low / Provisional |
| CAN-002 | 13.1 | UI 应显示 useful outputs、assumptions、changes 和 rationale，而非 private chain-of-thought | SRC-AUT-01、03–05 | A/B | 如何显示 confidence/provenance 需 comprehension test | 显示 concise rationale/status/diff；不显示 CoT | High for principle |
| CAN-003 | 13.2–13.3 | Canvas 随 reasoning maturity 渐进呈现 Context→Intent→Objects→IA→Flow→Wireframe | SRC-IA-10 与 visualization literature（Agent F）仅部分支持 | Mixed | 未验证目标用户能否理解该演化；2.5D/semantic zoom 可能增噪 | 作为 prototype hypothesis，不冻结交互 | Low-Medium / Needs prototype test |
| CAN-004 | 13.4 | 显示 Confirmed/Inferred/Unknown 等 provenance 有望支持纠错 | SRC-AUT-01、05 间接支持 expectation/mental model | A/B indirect | 九种 status 的可辨识性、颜色和文案未知 | 先测最小集合与理解准确率 | Medium-Low / Needs research |
| AUT-010 | 13.5 / 14 | Consequential change 用 structure diff；reversible change 提供 Undo；locked state 不得静默覆盖 | SRC-AUT-01、03、04 | A/B | Diff 格式与 cascade UI 需测试 | ChangeSet、impact preview、approve/edit/reject/undo | High for control principle |
| VAL-001 | 14.2 | Structural change 必须重新检查 flow、navigation、wireframe、scope、AC、constraints 和 handoff references | Canonical dependency logic；无外部 user study | Internal correctness | 依赖关系必须由 schema 明确才能 deterministic | 作为 graph referential-integrity invariant | High as engineering invariant |
| VAL-002 | 15 | Validator 应区分 Blocker/Warning/Recommendation，且 deterministic 与 judgment 分离 | Evaluation design principles；SRC-EVAL-01；IA methods | A/B + internal | Severity calibration 和误报率没有数据 | 建 seed rules，后续以 expert review/false positive 调整 | Medium |
| VAL-003 | 15.3 | Card sort、tree test、usability、analytics 回答不同问题，不可互换 | SRC-IA-04–06、SRC-EVAL-02 | B/A | 具体样本量/threshold 需按研究设计 | Validation method 与 claim type 映射 | High |
| VAL-004 | 16 | Readiness 必须多维显示，不能只用一个总分 | 专业评测与风险分解的原则支持；无 David outcome study | Indirect | 维度枚举与 gate threshold 仍需 execution evidence | 保留维度；gate blockers 显式列出 | Medium-High |
| VAL-005 | 16.2–16.5 | Handoff gate 应要求 bounded scope、complete core flow、P0 mini-IA/wireframes、states、constraints、AC 与 valid refs | IA/flow/scope 方法 + coding agent official capabilities | Mixed | 哪些 artifact 真正必要只能 downstream test | 当前作为 conservative readiness hypothesis | Medium / Needs execution test |
| AUT-011 | 17 | 低置信、冲突、拒绝、tool failure 时应 graceful degrade、保留控制和可恢复路径 | SRC-AUT-01、03–05 | A/B | 具体 fallback 的质量需 case testing | Recovery cases 必须进入 autonomy library | High for principle |

## E. Skill Runtime and Acceptance Scenarios

| Claim ID | `01` Section | Claim | Evidence | Source quality | Limitation / conflict | David implication | Confidence |
|---|---|---|---|---|---|---|---|
| PM-005 | 18 | PM expertise 应拆为有 trigger/I-O/rules/anti-patterns/validation/boundaries 的 Skills | Agent instruction 官方资料支持 scoped context；PM sources 支持方法边界 | A/B indirect | 没有实验直接比较该 registry 与单一 system prompt | 作为 modularity/evaluation architecture；逐 Skill benchmark | Medium |
| PM-006 | 18.3 | 方法应按 decision 选择，不应因知名而叠加 | SRC-PM-01–09 的适用边界 | Method-owner | 缺少统一比较实验 | 每张 Skill 必须含 `when_not_to_use` | High as method hygiene |
| HO-001 | 16.5 / 19 | Handoff 应把 canonical product facts 放在 Universal Core，只让 Adapter 处理 instruction file、surface、precedence、权限和启动机制 | SRC-HO-01–06；Agent G official evidence | A-OFFICIAL | 各产品 support matrix 快速变化；支持载入不等于严格执行 | Core 只存一份；adapter manifest 记录 surface/version/access date/preflight/fallback | High for architecture/capability |
| HO-002 | 16.5 / 19 | 明确 requirements、interface、AC 和 tests 有助于减少 task ambiguity，但更多 context 或 AGENTS.md 本身不保证成功 | SRC-HO-07、08；Agent G evidence 的冲突研究 | A-PRIMARY | Benchmark/scaffold/model 限制明显；效率与 correctness 研究方向可不同 | Handoff 最小化 task-relevant context；对 adapter 做 ablation/regression，不以文件长度验收 | High in-study / Medium transfer |
| HO-003 | 16.5 / 19 | 人/Blueprint 应拥有 what、done、boundaries，Coding Agent 可拥有低层 how；遇到 product contract ambiguity 应 return-to-blueprint | SRC-HO-09 + official workflow guidance | Vendor telemetry + A-OFFICIAL | Telemetry 相关非因果，且不覆盖所有 surfaces | task packet 冻结 scope/AC/no-go；实现细节默认 agent autonomy；产品歧义升级而非擅改 | Medium-High |
| VAL-006 | 19.1–19.4 | LLM proposes，Harness validates，Policy selects，Reducer mutates，UI renders | HAI control + structured eval/coding-agent instruction evidence；主要是系统架构原则 | Mixed / internal | 未证明此组件划分最优；但可验证 safety/correctness invariants | 实现时 policy/schema/state mutation 必须在模型外 | Medium-High as safety architecture |
| VAL-007 | 19.5 | V1 不应依赖 fine-tuning 执行 policy；先用 state、schemas、retrieval、validators 和 evals | 官方 eval/instruction mechanisms 表明可构建外部控制；无 head-to-head study | A capability + internal | 不表示 fine-tuning 永远无价值 | Fine-tuning 只改 extraction/style/pattern，不替代 gate | Medium |
| AUT-012 | 20 | Scenario A–F 可作为 acceptance seeds，但不是产品效果证据 | 它们来自 `01`，无外部样本 | Synthetic | 覆盖不足且未标全部 decision dimensions | 纳入 case library 并显式 `synthetic: true` | High on classification, not outcome |

## 结论标记

- **充分支持，可保留：** IA/flow/wireframe 的概念边界；mental model honesty；不同用户研究方法的用途；human control、correction、Undo、graceful failure；禁止 evidence laundering。
- **应保留但标 provisional：** stage 顺序与 exit gates；candidate 数量；Question Value 因素权重；turn protocol；provenance enum；readiness 具体字段。
- **必须真实测试：** 3–5 question budget、一次一问、Canvas progression、semantic zoom/2.5D、status 理解、Structure Diff 成本、Autonomy threshold。
- **必须 downstream execution test：** Handoff 最小 artifact、agent adapter、readiness blocker 与 coding-agent 执行成功之间的关系。
