import { describe, expect, it } from "vitest";
import { createInitialDemoState, demoReducer } from "../../desktop/src/app/demoReducer";

describe("Demo reducer", () => {
  it("moves from idea to context-ready Blueprint", () => {
    let state = createInitialDemoState();
    state = demoReducer(state, { type: "SUBMIT_IDEA" });
    expect(state.phase).toBe("INTAKE_QUESTION");

    state = demoReducer(state, { type: "ANSWER_INTAKE", choice: "daily_session" });
    expect(state.phase).toBe("CONTEXT_READY");
    expect(state.productContext.primaryOutcome).toBe("Complete one useful daily study loop");

    state = demoReducer(state, { type: "GENERATE_BLUEPRINT" });
    expect(state.route).toBe("blueprint");
    expect(state.selectedNodeId).toBe("node_daily_session");
  });

  it("uses plan usefulness as a distinct organizing focus", () => {
    let state = createInitialDemoState();
    state = demoReducer(state, { type: "SUBMIT_IDEA" });
    state = demoReducer(state, { type: "ANSWER_INTAKE", choice: "plan" });
    state = demoReducer(state, { type: "GENERATE_BLUEPRINT" });

    expect(state.blueprint.bet.primaryOutcome).toBe(
      "Turn one exam goal into a useful first study plan."
    );
    expect(state.selectedNodeId).toBe("node_study_plan");
  });

  it("expands Daily Session in one click and collapses it with the Wireframe lens", () => {
    let state = createInitialDemoState({
      route: "blueprint",
      phase: "BLUEPRINT_READY",
      selectedNodeId: "node_today"
    });
    state = demoReducer(state, { type: "SELECT_NODE", nodeId: "node_daily_session" });
    expect(state.expandedNodeId).toBe("node_daily_session");
    expect(state.phase).toBe("NODE_EXPANDED");

    state = demoReducer(state, { type: "TOGGLE_LENS", lens: "wireframe" });
    expect(state.expandedNodeId).toBeUndefined();
    expect(state.phase).toBe("BLUEPRINT_READY");
  });

  it("projects a conflict, then applies a complete lightweight repair", () => {
    let state = createInitialDemoState({ route: "blueprint", phase: "BLUEPRINT_READY" });
    state = demoReducer(state, { type: "PROPOSE_SCOPE_LATER", nodeId: "node_diagnostic" });

    expect(state.phase).toBe("SCOPE_CONFLICT");
    expect(state.pendingChangeSet?.status).toBe("pending");
    expect(state.validationIssues).toHaveLength(1);
    expect(state.blueprint.nodes.find((node) => node.id === "node_diagnostic")?.scopeStatus).toBe("in_mvp");

    state = demoReducer(state, {
      type: "APPLY_REPAIR",
      repairId: "repair_lightweight_diagnostic"
    });

    const diagnostic = state.blueprint.nodes.find((node) => node.id === "node_diagnostic");
    expect(state.phase).toBe("REPAIR_APPROVED");
    expect(diagnostic).toMatchObject({
      title: "Quick Diagnostic",
      scopeStatus: "in_mvp",
      scopeVariant: "lightweight"
    });
    expect(diagnostic?.wireframe.blocks[0]?.label).toBe("Question 1 of 3");
    expect(state.validationIssues).toHaveLength(0);
    expect(state.decisionRecords[0]?.approvedBy).toBe("user");
    expect(state.changeSetHistory.map((changeSet) => changeSet.status)).toEqual([
      "rejected",
      "approved"
    ]);
    expect(state.decisionRecords[0]?.changeSetId).toBe(state.changeSetHistory[1]?.id);
    expect(state.readiness.ready).toBe(true);
  });

  it("keeps the proposal pending when a repair candidate still has a blocker", () => {
    let state = createInitialDemoState({ route: "blueprint", phase: "BLUEPRINT_READY" });
    state = demoReducer(state, { type: "PROPOSE_SCOPE_LATER", nodeId: "node_diagnostic" });
    state = {
      ...state,
      blueprint: {
        ...state.blueprint,
        repairOptions: state.blueprint.repairOptions.map((repair) =>
          repair.id === "repair_lightweight_diagnostic" && repair.patch
            ? {
                ...repair,
                patch: {
                  ...repair.patch,
                  nodePatch: { ...repair.patch.nodePatch, scopeStatus: "later" as const }
                }
              }
            : repair
        )
      }
    };

    const next = demoReducer(state, {
      type: "APPLY_REPAIR",
      repairId: "repair_lightweight_diagnostic"
    });

    expect(next.pendingChangeSet?.status).toBe("pending");
    expect(next.changeSetHistory).toHaveLength(0);
    expect(next.decisionRecords).toHaveLength(0);
    expect(next.blueprint.nodes.find((node) => node.id === "node_diagnostic")?.scopeStatus)
      .toBe("in_mvp");
    expect(next.toast).toContain("still has a blocker");
  });

  it("resets canonical and transient state", () => {
    let state = createInitialDemoState({ route: "blueprint", phase: "BLUEPRINT_READY" });
    state = demoReducer(state, { type: "PROPOSE_SCOPE_LATER", nodeId: "node_diagnostic" });
    state = demoReducer(state, { type: "SHOW_TOAST", message: "Temporary" });
    state = demoReducer(state, { type: "RESET" });

    expect(state).toEqual(createInitialDemoState());
  });
});
