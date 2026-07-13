import { describe, expect, it } from "vitest";
import { compileHandoff } from "../../desktop/src/domain/handoff";
import { createInitialBlueprint } from "../../desktop/src/domain/fixtureNormalizer";
import { deriveReadiness } from "../../desktop/src/domain/readiness";

describe("Handoff compiler", () => {
  it("derives the showcase tree from the current Blueprint", () => {
    const blueprint = createInitialBlueprint();
    const handoff = compileHandoff(blueprint);

    expect(handoff.files).toHaveLength(11);
    expect(handoff.files[0]?.path).toBe("handoff/START_HERE.md");
    expect(handoff.files.filter((file) => file.sourceNodeId)).toHaveLength(3);
    expect(handoff.files.map((file) => file.path)).toContain(
      "handoff/wireframes/diagnostic.md"
    );
    expect(handoff.starterPrompt.length).toBeGreaterThan(80);
  });

  it("reflects the lightweight diagnostic in generated artifacts", async () => {
    const { createInitialDemoState, demoReducer } = await import("../../desktop/src/app/demoReducer");
    let state = createInitialDemoState({ route: "blueprint", phase: "BLUEPRINT_READY" });
    state = demoReducer(state, { type: "PROPOSE_SCOPE_LATER", nodeId: "node_diagnostic" });
    state = demoReducer(state, {
      type: "APPLY_REPAIR",
      repairId: "repair_lightweight_diagnostic"
    });

    const handoff = compileHandoff(
      state.blueprint,
      state.decisionRecords,
      state.changeSetHistory
    );
    const blueprintPreview = handoff.files.find((file) => file.path === "handoff/blueprint.json")?.preview;
    const diagnosticPreview = handoff.files.find(
      (file) => file.path === "handoff/wireframes/diagnostic.md"
    )?.preview;
    const scopePreview = handoff.files.find((file) => file.path === "handoff/scope.md")?.preview;
    const snapshot = JSON.parse(blueprintPreview ?? "{}") as Record<string, unknown>;

    expect(blueprintPreview).toContain("Quick Diagnostic");
    expect(blueprintPreview).toContain("lightweight");
    expect(blueprintPreview).toContain("decision_lightweight_diagnostic");
    expect(snapshot).toHaveProperty("regions");
    expect(snapshot).toHaveProperty("constraints");
    expect(snapshot).toHaveProperty("acceptanceCriteria");
    expect(snapshot).toHaveProperty("changeSetHistory");
    expect(snapshot).toHaveProperty("decisionHistory");
    expect(diagnosticPreview).toContain("Question 1 of 3");
    expect(scopePreview).toContain("node_diagnostic");

    const brokenDecisions = state.decisionRecords.map((decision) => ({
      ...decision,
      changeSetId: "missing_changeset"
    }));
    const readiness = deriveReadiness(
      state.blueprint,
      state.validationIssues,
      brokenDecisions,
      state.changeSetHistory
    );
    expect(readiness.handoffValid).toBe(false);
    expect(readiness.ready).toBe(false);
  });
});
