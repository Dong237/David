const block = (id: string, type: string, label: string) => ({ id, type, label });

export const legacyStudyCoachFixture = {
  schemaVersion: "demo-1.0",
  project: {
    id: "project_ai_study_coach",
    name: "AI Study Coach",
    description:
      "A mobile-first learning companion that helps exam-prep students complete one focused daily study loop.",
    platform: "mobile_first" as const,
    demoMode: true as const
  },
  bet: {
    rawIdea:
      "I want to build an AI study coach for exam preparation, but I’m not sure what the first version should contain.",
    targetUser: "Exam-prep student",
    situation: "Has a deadline but struggles to decide what to study and maintain daily consistency.",
    coreJob: "Know what to study next and complete a focused study session.",
    primaryOutcome: "Complete one useful daily study loop.",
    appetite: "competition_demo_mvp",
    constraints: [
      "One learner role only",
      "No social or community features",
      "No tutor marketplace",
      "No payment",
      "No production authentication",
      "No external calendar integration"
    ],
    assumptions: [
      {
        id: "assumption_single_role",
        statement: "V1 supports one learner role.",
        status: "pattern_based",
        confidence: "high"
      },
      {
        id: "assumption_mobile_first",
        statement: "The end product is mobile-first, while David is demonstrated as a desktop web app.",
        status: "confirmed",
        confidence: "high"
      }
    ]
  },
  regions: [
    {
      id: "region_setup",
      title: "SET UP",
      description: "Turn an exam goal and current level into usable context.",
      position: { x: 40, y: 40, width: 520, height: 190 }
    },
    {
      id: "region_system",
      title: "SYSTEM",
      description: "Low-frequency product controls.",
      position: { x: 590, y: 40, width: 200, height: 190 }
    },
    {
      id: "region_learn",
      title: "LEARN",
      description: "Plan and complete the daily learning loop.",
      position: { x: 40, y: 270, width: 650, height: 270 }
    },
    {
      id: "region_reflect",
      title: "REFLECT",
      description: "Make progress visible and decide what comes next.",
      position: { x: 720, y: 270, width: 390, height: 270 }
    }
  ],
  nodes: [
    {
      id: "node_welcome",
      regionId: "region_setup",
      title: "Welcome",
      userFacingLabel: "Get started",
      purpose: "Explain the product promise and start goal setup.",
      userIntent: "Understand what the product will help me do.",
      primaryCTA: "Set my exam goal",
      scopeStatus: "in_mvp",
      provenance: "pattern_based",
      confidence: "medium",
      states: ["default"],
      position: { x: 24, y: 56 },
      wireframe: {
        kind: "mobile" as const,
        summary: "Promise, short explanation, primary CTA",
        blocks: [
          block("wf_welcome_value", "hero", "Study the right thing every day"),
          block("wf_welcome_explain", "text", "Adaptive daily plan"),
          block("wf_welcome_cta", "button", "Set my exam goal")
        ]
      }
    },
    {
      id: "node_goal_setup",
      regionId: "region_setup",
      title: "Goal Setup",
      userFacingLabel: "Exam goal",
      purpose: "Capture the exam, deadline, available time, and target outcome.",
      userIntent: "Tell the coach what I am preparing for.",
      primaryCTA: "Continue",
      scopeStatus: "in_mvp",
      provenance: "confirmed",
      confidence: "high",
      states: ["default", "validation_error"],
      position: { x: 190, y: 56 },
      wireframe: {
        kind: "mobile" as const,
        summary: "Exam, date, target, daily time",
        blocks: [
          block("wf_goal_exam", "select", "Exam"),
          block("wf_goal_date", "date", "Exam date"),
          block("wf_goal_target", "select", "Target score"),
          block("wf_goal_time", "select", "Daily study time"),
          block("wf_goal_cta", "button", "Continue")
        ]
      }
    },
    {
      id: "node_diagnostic",
      regionId: "region_setup",
      title: "Diagnostic Quiz",
      userFacingLabel: "Quick diagnostic",
      purpose: "Estimate current level so the initial plan can be personalized.",
      userIntent: "Help the coach understand where I should begin.",
      primaryCTA: "Finish diagnostic",
      scopeStatus: "in_mvp",
      scopeVariant: "full",
      provenance: "pattern_based",
      confidence: "medium",
      states: ["default", "in_progress", "complete"],
      position: { x: 356, y: 56 },
      wireframe: {
        kind: "mobile" as const,
        summary: "Question, answer, progress",
        blocks: [
          block("wf_diag_progress", "progress", "Question 1 of 10"),
          block("wf_diag_question", "content", "Diagnostic question"),
          block("wf_diag_answer", "choice_group", "Answer choices"),
          block("wf_diag_cta", "button", "Finish diagnostic")
        ]
      }
    },
    {
      id: "node_settings",
      regionId: "region_system",
      title: "Settings",
      userFacingLabel: "Settings",
      purpose: "Provide low-frequency preferences without competing with the core task.",
      userIntent: "Change reminders and study preferences.",
      primaryCTA: "Save changes",
      scopeStatus: "later",
      provenance: "pattern_based",
      confidence: "medium",
      states: ["default", "saved"],
      position: { x: 24, y: 56 },
      wireframe: {
        kind: "mobile" as const,
        summary: "Reminder and study preferences",
        blocks: [
          block("wf_settings_reminder", "toggle", "Daily reminder"),
          block("wf_settings_time", "time", "Preferred study time"),
          block("wf_settings_cta", "button", "Save changes")
        ]
      }
    },
    {
      id: "node_study_plan",
      regionId: "region_learn",
      title: "Study Plan",
      userFacingLabel: "My plan",
      purpose: "Translate the exam goal and diagnostic result into a bounded study plan.",
      userIntent: "See what I should focus on and why.",
      primaryCTA: "Start today",
      scopeStatus: "in_mvp",
      provenance: "inferred",
      confidence: "medium",
      states: ["generating", "default", "error"],
      position: { x: 24, y: 68 },
      wireframe: {
        kind: "mobile" as const,
        summary: "Plan summary, topic priorities, first action",
        blocks: [
          block("wf_plan_summary", "summary", "4-week study plan"),
          block("wf_plan_priority", "list", "Priority topics"),
          block("wf_plan_reason", "text", "Why these topics"),
          block("wf_plan_cta", "button", "Start today")
        ]
      }
    },
    {
      id: "node_today",
      regionId: "region_learn",
      title: "Today",
      userFacingLabel: "Today",
      purpose: "Provide the shortest route to the current daily study task.",
      userIntent: "Know exactly what to do now.",
      primaryCTA: "Start session",
      scopeStatus: "in_mvp",
      provenance: "confirmed",
      confidence: "high",
      states: ["default", "completed_today", "no_plan"],
      position: { x: 190, y: 68 },
      wireframe: {
        kind: "mobile" as const,
        summary: "Today's task, time estimate, progress",
        blocks: [
          block("wf_today_task", "card", "Today's focus"),
          block("wf_today_time", "metadata", "20 minutes"),
          block("wf_today_progress", "progress", "Day 3 of 28"),
          block("wf_today_cta", "button", "Start session")
        ]
      }
    },
    {
      id: "node_daily_session",
      regionId: "region_learn",
      title: "Daily Session",
      userFacingLabel: "Study session",
      purpose: "Help the learner complete one focused learning loop.",
      userIntent: "Practice without deciding what to do next.",
      primaryCTA: "Submit answer",
      scopeStatus: "in_mvp",
      provenance: "confirmed",
      confidence: "high",
      states: ["default", "answering", "feedback", "loading", "error", "complete"],
      position: { x: 356, y: 52 },
      wireframe: {
        kind: "mobile" as const,
        summary: "Topic context, question, answer, progress, feedback",
        blocks: [
          block("wf_session_topic", "context", "Topic and difficulty"),
          block("wf_session_progress", "progress", "3 of 10"),
          block("wf_session_question", "content", "Question"),
          block("wf_session_answer", "input", "Answer input"),
          block("wf_session_cta", "button", "Submit answer"),
          block("wf_session_feedback", "feedback", "Explanation"),
          block("wf_session_complete", "button", "Complete session"),
          block("wf_session_retry", "button", "Retry submission")
        ]
      }
    },
    {
      id: "node_session_recap",
      regionId: "region_reflect",
      title: "Session Recap",
      userFacingLabel: "Session recap",
      purpose: "Close the learning loop and show what to retain or review.",
      userIntent: "Know whether the session was useful and what happens next.",
      primaryCTA: "Finish for today",
      scopeStatus: "in_mvp",
      provenance: "inferred",
      confidence: "medium",
      states: ["default"],
      position: { x: 24, y: 68 },
      wireframe: {
        kind: "mobile" as const,
        summary: "Completion, mistakes, next recommendation",
        blocks: [
          block("wf_recap_complete", "status", "Session complete"),
          block("wf_recap_stats", "summary", "Accuracy and time"),
          block("wf_recap_mistakes", "list", "Review these mistakes"),
          block("wf_recap_next", "recommendation", "Next focus"),
          block("wf_recap_progress", "button", "View progress"),
          block("wf_recap_cta", "button", "Finish for today")
        ]
      }
    },
    {
      id: "node_progress",
      regionId: "region_reflect",
      title: "Progress",
      userFacingLabel: "Progress",
      purpose: "Help learners understand improvement and weak topics over time.",
      userIntent: "See whether the plan is working.",
      primaryCTA: "Review weak topics",
      scopeStatus: "in_mvp",
      provenance: "pattern_based",
      confidence: "medium",
      states: ["default", "empty"],
      position: { x: 204, y: 68 },
      wireframe: {
        kind: "mobile" as const,
        summary: "Trend, weak topics, completion",
        blocks: [
          block("wf_progress_trend", "chart", "Accuracy trend"),
          block("wf_progress_topics", "list", "Weak topics"),
          block("wf_progress_completion", "summary", "Plan completion"),
          block("wf_progress_cta", "button", "Review weak topics")
        ]
      }
    }
  ],
  flows: [
    ["flow_welcome_goal", "node_welcome", "node_goal_setup", "happy", "Set my exam goal", "action_welcome_set_goal"],
    ["flow_goal_diagnostic", "node_goal_setup", "node_diagnostic", "happy", "Continue", "action_goal_continue"],
    ["flow_diagnostic_plan", "node_diagnostic", "node_study_plan", "required", "Finish diagnostic", "action_diagnostic_finish"],
    ["flow_plan_today", "node_study_plan", "node_today", "happy", "Start today", "action_plan_start_today"],
    ["flow_today_session", "node_today", "node_daily_session", "happy", "Start session", "action_today_start_session"],
    ["flow_session_recap", "node_daily_session", "node_session_recap", "happy", "Complete session", "action_session_complete"],
    ["flow_recap_progress", "node_session_recap", "node_progress", "alternate", "View progress", "action_recap_view_progress"],
    ["flow_recap_today", "node_session_recap", "node_today", "return", "Finish for today", "action_recap_finish_today"],
    ["flow_session_error", "node_daily_session", "node_daily_session", "error", "Retry failed answer submission", "action_session_retry"]
  ],
  constraints: [
    {
      id: "constraint_diagnostic_required_for_plan",
      type: "required_dependency" as const,
      sourceNodeId: "node_diagnostic",
      targetNodeId: "node_study_plan",
      severity: "blocker",
      rule: "Personalized Study Plan requires learner-level input from Diagnostic Quiz."
    },
    {
      id: "constraint_core_loop_complete",
      type: "required_path" as const,
      pathNodeIds: [
        "node_goal_setup",
        "node_diagnostic",
        "node_study_plan",
        "node_today",
        "node_daily_session",
        "node_session_recap"
      ],
      severity: "blocker",
      rule: "MVP must preserve one complete path from goal setup to session completion."
    },
    {
      id: "constraint_p0_node_wireframe",
      type: "wireframe_required" as const,
      severity: "warning",
      rule: "Every In MVP page must have a node-level wireframe."
    }
  ],
  repairOptions: [
    {
      id: "repair_lightweight_diagnostic",
      title: "Keep a lightweight 3-question diagnostic",
      description: "Preserves personalization with lower effort.",
      recommended: true,
      patch: {
        nodeId: "node_diagnostic",
        nodePatch: {
          title: "Quick Diagnostic",
          scopeStatus: "in_mvp",
          scopeVariant: "lightweight",
          purpose: "Capture a rough starting level with three high-signal questions."
        },
        wireframeBlockUpdates: [{ id: "wf_diag_progress", label: "Question 1 of 3" }]
      }
    },
    {
      id: "repair_manual_level",
      title: "Replace diagnostic with manual goal and level setup",
      description: "Faster, but less adaptive.",
      recommended: false
    },
    {
      id: "repair_remove_personalization",
      title: "Remove personalized plan generation from MVP",
      description: "Simplest build, but weakens the core promise.",
      recommended: false
    }
  ],
  handoff: {
    expectedStatus: "ready_after_repair" as const,
    files: [
      ["handoff/START_HERE.md", "Start Here", "Read blueprint.json first. Respect scope and no-gos. Implement one slice at a time and validate acceptance criteria before continuing."],
      ["handoff/blueprint.json", "Canonical Blueprint", "Canonical nodes, flows, wireframes, scope, constraints, and IDs."],
      ["handoff/ia.md", "Information Architecture", "User intent, organization scheme, labels, hierarchy, navigation, and rationale."],
      ["handoff/flows.md", "User Flows", "Happy, required, return, and error paths linked to canonical node IDs."],
      ["handoff/scope.md", "MVP Scope", "In MVP, Later, Excluded, constraints, rabbit holes, and accepted tradeoffs."],
      ["handoff/acceptance-criteria.md", "Acceptance Criteria", "Verifiable completion rules for each P0 node and critical flow."],
      ["handoff/no-gos.md", "No-Gos", "No social features, tutor marketplace, production auth, payment, or calendar integration."],
      ["handoff/prompts/build-agent-skill.md", "Build Agent Skill", "Ordered instructions telling a coding agent what to read, implement, verify, and when to stop."]
    ],
    starterPrompt:
      "Read handoff/START_HERE.md and execute the build-agent workflow. Preserve canonical IDs, scope, required paths, and no-gos. Implement one vertical slice at a time, run the listed checks, and stop to report any contradiction instead of inventing new product scope."
  },
  defaultLensState: {
    ia: true as const,
    flow: true,
    wireframe: true,
    scope: true,
    validation: false
  },
  demo: {
    initialSelectedNodeId: "node_daily_session",
    scopeConflictNodeId: "node_diagnostic",
    defaultRepairOptionId: "repair_lightweight_diagnostic",
    mainPathFlowIds: [
      "flow_welcome_goal",
      "flow_goal_diagnostic",
      "flow_diagnostic_plan",
      "flow_plan_today",
      "flow_today_session",
      "flow_session_recap",
      "flow_recap_progress"
    ],
    wireframeThumbnailNodeIds: ["node_study_plan", "node_daily_session", "node_progress"],
    recordingViewport: { width: 1440, height: 900 }
  }
};
