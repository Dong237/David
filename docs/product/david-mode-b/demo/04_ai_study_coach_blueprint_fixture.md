# 04 — AI Study Coach Blueprint Fixture

> 本文件中的 JSON 是 Demo 的 canonical fixture。Codex 实现时应将 JSON code block 提取为：  
> `src/fixtures/ai-study-coach.blueprint.json`  
> 或生成等价的严格类型 TypeScript fixture。  
> 不要从 UI 文案反向推断节点关系。

```json
{
  "schemaVersion": "demo-1.0",
  "project": {
    "id": "project_ai_study_coach",
    "name": "AI Study Coach",
    "description": "A mobile-first learning companion that helps exam-prep students complete one focused daily study loop.",
    "platform": "mobile_first",
    "demoMode": true
  },
  "bet": {
    "rawIdea": "I want to build an AI study coach for exam preparation, but I’m not sure what the first version should contain.",
    "targetUser": "Exam-prep student",
    "situation": "Has a deadline but struggles to decide what to study and maintain daily consistency.",
    "coreJob": "Know what to study next and complete a focused study session.",
    "primaryOutcome": "Complete one useful daily study loop.",
    "appetite": "competition_demo_mvp",
    "constraints": [
      "One learner role only",
      "No social or community features",
      "No tutor marketplace",
      "No payment",
      "No production authentication",
      "No external calendar integration"
    ],
    "assumptions": [
      {
        "id": "assumption_single_role",
        "statement": "V1 supports one learner role.",
        "status": "pattern_based",
        "confidence": "high"
      },
      {
        "id": "assumption_mobile_first",
        "statement": "The end product is mobile-first, while David is demonstrated as a desktop web app.",
        "status": "confirmed",
        "confidence": "high"
      }
    ]
  },
  "regions": [
    {
      "id": "region_setup",
      "title": "SET UP",
      "description": "Turn the learner's exam goal and current level into usable context.",
      "position": {
        "x": 80,
        "y": 120,
        "width": 760,
        "height": 250
      }
    },
    {
      "id": "region_learn",
      "title": "LEARN",
      "description": "Plan and complete the daily learning loop.",
      "position": {
        "x": 80,
        "y": 430,
        "width": 980,
        "height": 300
      }
    },
    {
      "id": "region_reflect",
      "title": "REFLECT",
      "description": "Make progress visible and decide what to do next.",
      "position": {
        "x": 1100,
        "y": 430,
        "width": 620,
        "height": 300
      }
    },
    {
      "id": "region_system",
      "title": "SYSTEM",
      "description": "Low-frequency product controls.",
      "position": {
        "x": 1100,
        "y": 120,
        "width": 360,
        "height": 250
      }
    }
  ],
  "nodes": [
    {
      "id": "node_welcome",
      "regionId": "region_setup",
      "type": "page",
      "title": "Welcome",
      "userFacingLabel": "Get started",
      "purpose": "Explain the product promise and start goal setup.",
      "userIntent": "Understand what the product will help me do.",
      "primaryCTA": "Set my exam goal",
      "scopeStatus": "in_mvp",
      "provenance": "pattern_based",
      "states": [
        "default"
      ],
      "position": {
        "x": 120,
        "y": 180
      },
      "wireframe": {
        "kind": "mobile",
        "summary": "Promise, short explanation, primary CTA",
        "blocks": [
          {
            "id": "wf_welcome_value",
            "type": "hero",
            "label": "Study the right thing every day"
          },
          {
            "id": "wf_welcome_explain",
            "type": "text",
            "label": "Adaptive daily plan"
          },
          {
            "id": "wf_welcome_cta",
            "type": "button",
            "label": "Set my exam goal"
          }
        ]
      }
    },
    {
      "id": "node_goal_setup",
      "regionId": "region_setup",
      "type": "page",
      "title": "Goal Setup",
      "userFacingLabel": "Exam goal",
      "purpose": "Capture the exam, deadline, available time, and target outcome.",
      "userIntent": "Tell the coach what I am preparing for.",
      "primaryCTA": "Continue",
      "scopeStatus": "in_mvp",
      "provenance": "confirmed",
      "states": [
        "default",
        "validation_error"
      ],
      "position": {
        "x": 350,
        "y": 180
      },
      "wireframe": {
        "kind": "mobile",
        "summary": "Exam, date, target, daily time",
        "blocks": [
          {
            "id": "wf_goal_exam",
            "type": "select",
            "label": "Exam"
          },
          {
            "id": "wf_goal_date",
            "type": "date",
            "label": "Exam date"
          },
          {
            "id": "wf_goal_target",
            "type": "select",
            "label": "Target score"
          },
          {
            "id": "wf_goal_time",
            "type": "select",
            "label": "Daily study time"
          },
          {
            "id": "wf_goal_cta",
            "type": "button",
            "label": "Continue"
          }
        ]
      }
    },
    {
      "id": "node_diagnostic",
      "regionId": "region_setup",
      "type": "page",
      "title": "Diagnostic Quiz",
      "userFacingLabel": "Quick diagnostic",
      "purpose": "Estimate current level so the initial plan can be personalized.",
      "userIntent": "Help the coach understand where I should begin.",
      "primaryCTA": "Finish diagnostic",
      "scopeStatus": "in_mvp",
      "scopeVariant": "full",
      "provenance": "pattern_based",
      "states": [
        "default",
        "in_progress",
        "complete"
      ],
      "position": {
        "x": 600,
        "y": 180
      },
      "wireframe": {
        "kind": "mobile",
        "summary": "Question, answer, progress",
        "blocks": [
          {
            "id": "wf_diag_progress",
            "type": "progress",
            "label": "Question 1 of 10"
          },
          {
            "id": "wf_diag_question",
            "type": "content",
            "label": "Diagnostic question"
          },
          {
            "id": "wf_diag_answer",
            "type": "choice_group",
            "label": "Answer choices"
          },
          {
            "id": "wf_diag_cta",
            "type": "button",
            "label": "Next"
          }
        ]
      }
    },
    {
      "id": "node_study_plan",
      "regionId": "region_learn",
      "type": "page",
      "title": "Study Plan",
      "userFacingLabel": "My plan",
      "purpose": "Translate the exam goal and diagnostic result into a bounded study plan.",
      "userIntent": "See what I should focus on and why.",
      "primaryCTA": "Start today",
      "scopeStatus": "in_mvp",
      "provenance": "inferred",
      "states": [
        "generating",
        "default",
        "error"
      ],
      "position": {
        "x": 160,
        "y": 510
      },
      "wireframe": {
        "kind": "mobile",
        "summary": "Plan summary, topic priorities, first action",
        "blocks": [
          {
            "id": "wf_plan_summary",
            "type": "summary",
            "label": "4-week study plan"
          },
          {
            "id": "wf_plan_priority",
            "type": "list",
            "label": "Priority topics"
          },
          {
            "id": "wf_plan_reason",
            "type": "text",
            "label": "Why these topics"
          },
          {
            "id": "wf_plan_cta",
            "type": "button",
            "label": "Start today"
          }
        ]
      }
    },
    {
      "id": "node_today",
      "regionId": "region_learn",
      "type": "page",
      "title": "Today",
      "userFacingLabel": "Today",
      "purpose": "Provide the shortest route to the current daily study task.",
      "userIntent": "Know exactly what to do now.",
      "primaryCTA": "Start session",
      "scopeStatus": "in_mvp",
      "provenance": "confirmed",
      "states": [
        "default",
        "completed_today",
        "no_plan"
      ],
      "position": {
        "x": 430,
        "y": 510
      },
      "wireframe": {
        "kind": "mobile",
        "summary": "Today's task, time estimate, progress",
        "blocks": [
          {
            "id": "wf_today_task",
            "type": "card",
            "label": "Today's focus"
          },
          {
            "id": "wf_today_time",
            "type": "metadata",
            "label": "20 minutes"
          },
          {
            "id": "wf_today_progress",
            "type": "progress",
            "label": "Day 3 of 28"
          },
          {
            "id": "wf_today_cta",
            "type": "button",
            "label": "Start session"
          }
        ]
      }
    },
    {
      "id": "node_daily_session",
      "regionId": "region_learn",
      "type": "page",
      "title": "Daily Session",
      "userFacingLabel": "Study session",
      "purpose": "Help the learner complete one focused learning loop.",
      "userIntent": "Practice without deciding what to do next.",
      "primaryCTA": "Submit answer",
      "scopeStatus": "in_mvp",
      "provenance": "confirmed",
      "states": [
        "default",
        "answering",
        "feedback",
        "loading",
        "error",
        "complete"
      ],
      "position": {
        "x": 700,
        "y": 500
      },
      "wireframe": {
        "kind": "mobile",
        "summary": "Topic context, question, answer, progress, feedback",
        "blocks": [
          {
            "id": "wf_session_topic",
            "type": "context",
            "label": "Topic and difficulty"
          },
          {
            "id": "wf_session_progress",
            "type": "progress",
            "label": "3 of 10"
          },
          {
            "id": "wf_session_question",
            "type": "content",
            "label": "Question"
          },
          {
            "id": "wf_session_answer",
            "type": "input",
            "label": "Answer input"
          },
          {
            "id": "wf_session_cta",
            "type": "button",
            "label": "Submit answer"
          },
          {
            "id": "wf_session_feedback",
            "type": "feedback",
            "label": "Explanation"
          }
        ]
      }
    },
    {
      "id": "node_session_recap",
      "regionId": "region_reflect",
      "type": "page",
      "title": "Session Recap",
      "userFacingLabel": "Session recap",
      "purpose": "Close the learning loop and show what to retain or review.",
      "userIntent": "Know whether the session was useful and what happens next.",
      "primaryCTA": "Finish for today",
      "scopeStatus": "in_mvp",
      "provenance": "inferred",
      "states": [
        "default"
      ],
      "position": {
        "x": 1140,
        "y": 510
      },
      "wireframe": {
        "kind": "mobile",
        "summary": "Completion, mistakes, next recommendation",
        "blocks": [
          {
            "id": "wf_recap_complete",
            "type": "status",
            "label": "Session complete"
          },
          {
            "id": "wf_recap_stats",
            "type": "summary",
            "label": "Accuracy and time"
          },
          {
            "id": "wf_recap_mistakes",
            "type": "list",
            "label": "Review these mistakes"
          },
          {
            "id": "wf_recap_next",
            "type": "recommendation",
            "label": "Next focus"
          },
          {
            "id": "wf_recap_cta",
            "type": "button",
            "label": "Finish for today"
          }
        ]
      }
    },
    {
      "id": "node_progress",
      "regionId": "region_reflect",
      "type": "page",
      "title": "Progress",
      "userFacingLabel": "Progress",
      "purpose": "Help learners understand improvement and weak topics over time.",
      "userIntent": "See whether the plan is working.",
      "primaryCTA": "Review weak topics",
      "scopeStatus": "in_mvp",
      "provenance": "pattern_based",
      "states": [
        "default",
        "empty"
      ],
      "position": {
        "x": 1420,
        "y": 510
      },
      "wireframe": {
        "kind": "mobile",
        "summary": "Trend, weak topics, completion",
        "blocks": [
          {
            "id": "wf_progress_trend",
            "type": "chart",
            "label": "Accuracy trend"
          },
          {
            "id": "wf_progress_topics",
            "type": "list",
            "label": "Weak topics"
          },
          {
            "id": "wf_progress_completion",
            "type": "summary",
            "label": "Plan completion"
          },
          {
            "id": "wf_progress_cta",
            "type": "button",
            "label": "Review weak topics"
          }
        ]
      }
    },
    {
      "id": "node_settings",
      "regionId": "region_system",
      "type": "page",
      "title": "Settings",
      "userFacingLabel": "Settings",
      "purpose": "Provide low-frequency preferences without competing with the core task.",
      "userIntent": "Change reminders and study preferences.",
      "primaryCTA": "Save changes",
      "scopeStatus": "later",
      "provenance": "pattern_based",
      "states": [
        "default",
        "saved"
      ],
      "position": {
        "x": 1160,
        "y": 180
      },
      "wireframe": {
        "kind": "mobile",
        "summary": "Reminder and study preferences",
        "blocks": [
          {
            "id": "wf_settings_reminder",
            "type": "toggle",
            "label": "Daily reminder"
          },
          {
            "id": "wf_settings_time",
            "type": "time",
            "label": "Preferred study time"
          },
          {
            "id": "wf_settings_cta",
            "type": "button",
            "label": "Save changes"
          }
        ]
      }
    }
  ],
  "flows": [
    {
      "id": "flow_welcome_goal",
      "source": "node_welcome",
      "target": "node_goal_setup",
      "type": "happy",
      "trigger": "Set my exam goal"
    },
    {
      "id": "flow_goal_diagnostic",
      "source": "node_goal_setup",
      "target": "node_diagnostic",
      "type": "happy",
      "trigger": "Continue"
    },
    {
      "id": "flow_diagnostic_plan",
      "source": "node_diagnostic",
      "target": "node_study_plan",
      "type": "required",
      "trigger": "Finish diagnostic"
    },
    {
      "id": "flow_plan_today",
      "source": "node_study_plan",
      "target": "node_today",
      "type": "happy",
      "trigger": "Start today"
    },
    {
      "id": "flow_today_session",
      "source": "node_today",
      "target": "node_daily_session",
      "type": "happy",
      "trigger": "Start session"
    },
    {
      "id": "flow_session_recap",
      "source": "node_daily_session",
      "target": "node_session_recap",
      "type": "happy",
      "trigger": "Complete session"
    },
    {
      "id": "flow_recap_progress",
      "source": "node_session_recap",
      "target": "node_progress",
      "type": "alternate",
      "trigger": "View progress"
    },
    {
      "id": "flow_recap_today",
      "source": "node_session_recap",
      "target": "node_today",
      "type": "return",
      "trigger": "Finish for today"
    },
    {
      "id": "flow_session_error",
      "source": "node_daily_session",
      "target": "node_daily_session",
      "type": "error",
      "trigger": "Retry failed answer submission"
    }
  ],
  "constraints": [
    {
      "id": "constraint_diagnostic_required_for_plan",
      "type": "required_dependency",
      "sourceNodeId": "node_diagnostic",
      "targetNodeId": "node_study_plan",
      "severity": "blocker",
      "rule": "Personalized Study Plan requires learner-level input from Diagnostic Quiz."
    },
    {
      "id": "constraint_core_loop_complete",
      "type": "required_path",
      "pathNodeIds": [
        "node_goal_setup",
        "node_diagnostic",
        "node_study_plan",
        "node_today",
        "node_daily_session",
        "node_session_recap"
      ],
      "severity": "blocker",
      "rule": "MVP must preserve one complete path from goal setup to session completion."
    },
    {
      "id": "constraint_p0_node_wireframe",
      "type": "wireframe_required",
      "severity": "warning",
      "rule": "Every In MVP page must have a node-level wireframe."
    }
  ],
  "scopeRepairOptions": [
    {
      "id": "repair_lightweight_diagnostic",
      "title": "Keep a lightweight 3-question diagnostic",
      "description": "Preserves personalization with lower effort.",
      "recommended": true,
      "patch": {
        "nodeId": "node_diagnostic",
        "title": "Quick Diagnostic",
        "scopeStatus": "in_mvp",
        "scopeVariant": "lightweight",
        "purpose": "Capture a rough starting level with three high-signal questions."
      }
    },
    {
      "id": "repair_manual_level",
      "title": "Replace diagnostic with manual goal and level setup",
      "description": "Faster, but less adaptive.",
      "recommended": false
    },
    {
      "id": "repair_remove_personalization",
      "title": "Remove personalized plan generation from MVP",
      "description": "Simplest build, but weakens the core promise.",
      "recommended": false
    }
  ],
  "handoff": {
    "status": "ready_after_repair",
    "files": [
      {
        "path": "handoff/START_HERE.md",
        "title": "Start Here",
        "preview": "Read blueprint.json first. Respect scope and no-gos. Implement one slice at a time and validate acceptance criteria before continuing."
      },
      {
        "path": "handoff/blueprint.json",
        "title": "Canonical Blueprint",
        "preview": "Canonical nodes, flows, wireframes, scope, constraints, and IDs."
      },
      {
        "path": "handoff/ia.md",
        "title": "Information Architecture",
        "preview": "User intent, organization scheme, labels, hierarchy, navigation, and rationale."
      },
      {
        "path": "handoff/flows.md",
        "title": "User Flows",
        "preview": "Happy, required, return, and error paths linked to canonical node IDs."
      },
      {
        "path": "handoff/scope.md",
        "title": "MVP Scope",
        "preview": "In MVP, Later, Excluded, constraints, rabbit holes, and accepted tradeoffs."
      },
      {
        "path": "handoff/acceptance-criteria.md",
        "title": "Acceptance Criteria",
        "preview": "Verifiable completion rules for each P0 node and critical flow."
      },
      {
        "path": "handoff/no-gos.md",
        "title": "No-Gos",
        "preview": "No social features, tutor marketplace, production auth, payment, or calendar integration."
      },
      {
        "path": "handoff/prompts/build-agent-skill.md",
        "title": "Build Agent Skill",
        "preview": "Ordered instructions telling a coding agent what to read, implement, verify, and when to stop."
      }
    ],
    "starterPrompt": "Read handoff/START_HERE.md and execute the build-agent workflow. Preserve canonical IDs, scope, required paths, and no-gos. Implement one vertical slice at a time, run the listed checks, and stop to report any contradiction instead of inventing new product scope."
  },
  "defaultLensState": {
    "ia": true,
    "flow": true,
    "wireframe": true,
    "scope": true,
    "validation": false,
    "dependencies": false,
    "handoff": false
  },
  "demo": {
    "initialSelectedNodeId": "node_daily_session",
    "scopeConflictNodeId": "node_diagnostic",
    "defaultRepairOptionId": "repair_lightweight_diagnostic",
    "recordingViewport": {
      "width": 1440,
      "height": 900
    }
  }
}
```

---

## Fixture Validation Requirements

Codex 必须增加程序化验证：

1. 所有 `regionId` 存在；
2. 所有 Flow source/target node 存在；
3. 所有 `wireframe.blocks[].id` 唯一；
4. 所有 `In MVP` 页面有 Wireframe；
5. required dependency 两端节点存在；
6. `node_diagnostic` 改为 `Later` 时必须触发 blocker；
7. 应用 recommended repair 后 blocker 必须清除；
8. Handoff 文件树至少 8 项；
9. starter prompt 非空；
10. Reset Demo 能恢复 fixture 初始状态。
