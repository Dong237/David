# Skill: select_navigation_pattern

## Purpose

把 Selected/Recommended IA 映射为可到达、可定位、可扩展的 navigation 与 entry-point model：global、local、contextual、utility、search、home/dashboard、recents/favorites、notifications、deep links 和 external entry。该 Skill 选择 access mechanisms，不重写 IA 来迎合视觉 pattern。

## Trigger

- Candidate IA 已选定或有明确 provisional default；
- platform、scale、task frequency、roles 与 growth assumptions 足以判断；
- top-level IA、entry points 或 task frequency 变化；
- 用户找不到当前位置、附近内容或常用动作；
- 新增 search、deep link、notification、recents 或多入口需求；
- 当前 UI pattern 与 IA depth/volume 冲突。

## Inputs

**Required**

- `selected_or_recommended_ia_id`、top-level nodes 与 hierarchy；
- `critical_task_ids`、entry contexts、platform/device；
- frequency/priority hypotheses、scope、roles/permissions；
- constraints、locked navigation decisions。

**Optional**

- current navigation、analytics/path data、search logs；
- user experience level、expected growth、cross-project retrieval；
- deep links、notifications、external/referral entry points；
- accessibility、keyboard、responsive constraints；
- Tree Testing/Usability evidence。

## Method

1. 将 IA nodes 分成 stable spaces、local subspaces、contextual actions、utility destinations、cross-cutting retrieval。
2. 列出入口场景：home、direct link、notification、search result、recent/favorite、external referral；为每个入口定义 orientation need。
3. 比较可行 patterns：sidebar、top tabs、bottom navigation、local tabs/subnav、context menu/action、search、dashboard/launcher 的组合。
4. 按 platform、stable-space count/complexity、switching frequency、depth、role variation、growth 和 accessibility 做 trade-off；数字阈值仅作 heuristic，不是研究事实。
5. 检查 global nav 只承载稳定高价值 spaces；低频/context-specific action 不占 top level。
6. 检查 local navigation 是否表达 current location 与 nearby destinations；search 只补充结构，不掩盖弱 IA。
7. 检查 role-based navigation：角色不互斥或跨角色任务多时，优先 task/topic/object alternatives。
8. 输出推荐、被拒方案、entry coverage、orientation cues、responsive behavior 与 validation plan。

## Rules

1. 先有 IA first pass，再选 navigation；不得因为喜欢某 pattern 反压 IA。
2. Global navigation 是 stable spaces，不是 capabilities/actions 清单。
3. Local navigation 必须帮助用户知道 `where am I / what is nearby`。
4. Contextual action 应靠近对象/状态；utility navigation 用于 account/help/settings 等横切目的地。
5. Search 补充 browse/navigation，不能作为分类含混的免责项。
6. Home/dashboard 只有在提供 orientation、resume 或 cross-space prioritization 时成立；不是默认 feature mosaic。
7. Deep link/notification/external entry 必须提供位置、权限、stale/deleted target 和 recovery。
8. Audience/role-based primary nav 只在角色稳定、互斥、任务/内容真正分离时采用。
9. Progressive disclosure 仅后置低频/高级 controls；rare-but-critical 和 recovery 不得隐藏。
10. `Desktop + 6–10 spaces → sidebar` 等数字是 pattern hypothesis；必须输出 why、alternative 与 what-would-change。
11. Navigation change 不得静默移动 canonical node；只更新 placement，除非另开 IA ChangeSet。

## Anti-patterns

- 在 Inventory 未完成前先画 sidebar；
- 每个 capability 都放 global nav；
- 用 search 掩盖弱 labels/categories；
- 按 audience 分组但用户兼任多个角色；
- deep link 落地无 orientation 或 permission recovery；
- 为减少 visible items 把 critical task 藏进 `More`。

## Structured Output

```yaml
skill_id: select_navigation_pattern
navigation_model_id: NAV-001
ia_id: IA-SELECTED-001
platform: desktop|mobile|responsive|multi_surface
destinations:
  - node_id: IA-NODE-001
    role: global|local|contextual|utility|search_only
    placement: sidebar|top_tab|bottom_nav|local_tab|menu|inline|launcher
    rationale: ""
entry_points:
  - entry_id: ENTRY-001
    type: home|deep_link|notification|search|recent|favorite|external
    target_node_id: IA-NODE-001
    orientation_cues: []
    permission_check: ""
    recovery: ""
orientation:
  current_location_cues: []
  nearby_destination_cues: []
  back_or_return_behavior: ""
search:
  enabled: true
  scope: ""
  taxonomy_refs: []
  empty_and_recovery: ""
responsive_behavior: []
role_variants: []
alternatives_considered:
  - pattern: ""
    rejected_because: ""
recommendation:
  rationale: ""
  assumptions: []
  confidence: low|medium|high
  what_would_change: ""
  autonomy_action: APPLY_WITH_UNDO|PROPOSE_FOR_APPROVAL|RESEARCH_OR_TEST
validation_plan: []
```

## Validation

**Deterministic**

- 每个 P0 destination 至少有一个 reachable entry/path；
- placement 引用有效 canonical node；
- role/permission 不产生 unauthorized entry；
- deep link/notification 有 missing/stale/denied recovery；
- current-location cue 覆盖 local/deep entries；
- global nav 不含纯 background process；
- navigation change 与 IA move 分为不同 ChangeSet。

**Expert review**

- pattern 与 platform、规模、频率、depth、growth 是否匹配；
- global/local/context/utility responsibilities 是否清晰；
- search/home 是否提供真实价值而非补丁；
- role-based 和 progressive disclosure 风险是否受控。

**External validation**

- Tree Testing 评估结构和 labels；
- Low-fi prototype usability test 评估 visible components、orientation、switching、return、deep-link recovery；
- Analytics 可观察实际 paths/search reliance，但需结合定性研究解释原因；
- Keyboard/screen-reader 与 responsive checks 单独验证可访问导航。

## Default Autonomy

生成 pattern options 和 provisional model 为 `APPLY_WITH_UNDO`（L1）。改变 top-level navigation、primary entry 或 required path 为 `PROPOSE_FOR_APPROVAL`（L2）。Findability/orientation 的真实效果使用 `RESEARCH_OR_TEST`。

## Must Ask

- primary platform/device、hard accessibility/enterprise shell constraint 只有用户知道且会改变 pattern；
- 用户角色/权限边界不明确且影响 visible navigation；
- external/deep-link/notification entry 是产品承诺但来源不明；
- locked IA 与 mandatory host platform navigation 冲突。

## Approval

- 新增/删除 top-level navigation item；
- sidebar/tabs/bottom nav 等 primary pattern 的替换；
- 改变 core entry、required path 或默认 landing；
- 将 P0 destination 仅保留在 search/contextual entry；
- 导航变化触发 major IA move 或高 downstream implementation rework。

## When Not to Use

- IA candidates 尚未选定且 top-level spaces 不稳定；
- 问题是 grouping、canonical parent 或 taxonomy；
- 只需要调整 label；
- 只需要屏幕内部 layout/visual styling；
- 多渠道长期 journey/运营流程为主，应先使用 Journey/Service Blueprint；
- 需要真实效果结论时，应测试，而不是继续 pattern debate。

## Sources

| Evidence | Source / type / URL / date | Supported point | Limitation | David use | Confidence |
|---|---|---|---|---|---|
| A-IA-02 | [NN/g — IA and Navigation](https://www.nngroup.com/articles/ia-vs-navigation/)；authoritative；2014-06-22 | IA 是信息 backbone；navigation 是 access UI；先理解 IA volume/complexity 再选 pattern | 网站经典语境，不给数值阈值 | IA-first、global/local/context 分工 | High |
| A-IA-13 | [NN/g — Local Navigation](https://www.nngroup.com/articles/local-navigation/)；authoritative；2021-07-04 | Local nav 表达当前位置和附近内容 | 层级内容语境 | orientation schema | High |
| A-IA-14 | [NN/g — Audience-Based Navigation](https://www.nngroup.com/articles/audience-based-navigation/)；authoritative；2015-09-07 | 非互斥角色增加 role-based navigation 的选择负担 | 不是绝对禁止 | role overlap gate | Medium-High |
| A-IA-16 | [NN/g — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)；authoritative；2006-12-03 | 后置低频/高级功能可降低初始复杂度 | 何谓低频需证据 | contextual/secondary placement，但保护 critical task | Medium-High |

完整 Claim–Evidence 见 `../sources/agent_a_ia_evidence.md` 的 A-CL-010、A-CL-011、A-CL-014。

## 3 正例

> 以下均为 synthetic evaluation cases，不是用户研究证据。

1. Desktop product 有稳定 Projects/Blueprints/Runs 三个 spaces，审批只在 Blueprint context 出现。输出 global sidebar + local tabs + contextual approve，而不是把 Approve 放顶层。
2. 用户从 notification 深链进入 failed run。模型要求显示 Project/Run 位置、permission check、retry 与返回 Runs 的路径。
3. 多角色用户兼任 owner/editor。模型拒绝以 `For Owners/For Editors` 作 primary nav，比较 task/object structure，并把权限作为 visibility rule。

## 3 反例

> 以下均为 synthetic failure cases。

1. 因“桌面 SaaS 通常用 sidebar”直接决定结构，没有读取 IA scale、tasks 或 growth。
2. 将 Create/Approve/Export/Share 全部放 global nav，混淆 destinations 与 contextual actions。
3. 分类含混后加一个搜索框，并据此声称 findability 已解决。
