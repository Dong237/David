import { describe, expect, it } from "vitest";
import { createInitialBlueprint } from "../../desktop/src/domain/fixtureNormalizer";
import { deriveReadiness } from "../../desktop/src/domain/readiness";
import {
  createScopeChangeSet,
  projectChangeSet,
  validateBlueprint,
  validateReferences
} from "../../desktop/src/domain/validators";

describe("Blueprint validation", () => {
  it("starts with no blockers and derives readiness", () => {
    const blueprint = createInitialBlueprint();
    const issues = validateBlueprint(blueprint);
    const readiness = deriveReadiness(blueprint, issues);

    expect(issues.filter((issue) => issue.severity === "Blocker")).toHaveLength(0);
    expect(readiness.ready).toBe(true);
  });

  it("aggregates dependency and required-path failures into one root blocker", () => {
    const blueprint = createInitialBlueprint();
    const changeSet = createScopeChangeSet(blueprint, "node_diagnostic", "later");
    const projected = projectChangeSet(blueprint, changeSet);
    const issues = validateBlueprint(projected, changeSet);

    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatchObject({
      id: "issue_scope_node_diagnostic",
      severity: "Blocker",
      rootCauseTargetId: "node_diagnostic",
      affectedFlowIds: ["flow_diagnostic_plan"]
    });
    expect(issues[0].ruleIds).toEqual([
      "constraint_diagnostic_required_for_plan",
      "constraint_core_loop_complete"
    ]);
    expect(deriveReadiness(projected, issues).ready).toBe(false);
  });

  it.each([
    ["duplicate node", (blueprint: ReturnType<typeof createInitialBlueprint>) => {
      blueprint.nodes[1].id = blueprint.nodes[0].id;
    }],
    ["orphan action block", (blueprint: ReturnType<typeof createInitialBlueprint>) => {
      blueprint.nodes[0].actions[0].wireframeBlockId = "missing_block";
    }],
    ["orphan constraint", (blueprint: ReturnType<typeof createInitialBlueprint>) => {
      const constraint = blueprint.constraints.find(
        (candidate) => candidate.type === "required_dependency"
      );
      if (constraint?.type === "required_dependency") constraint.sourceNodeId = "missing_node";
    }],
    ["orphan acceptance criterion", (blueprint: ReturnType<typeof createInitialBlueprint>) => {
      blueprint.acceptanceCriteria[0].targetId = "missing_node";
    }],
    ["orphan repair block", (blueprint: ReturnType<typeof createInitialBlueprint>) => {
      const repair = blueprint.repairOptions.find((candidate) => candidate.patch)?.patch;
      if (repair) repair.wireframeBlockUpdates[0].id = "missing_block";
    }],
    ["orphan demo flow", (blueprint: ReturnType<typeof createInitialBlueprint>) => {
      blueprint.demo.mainPathFlowIds[0] = "missing_flow";
    }],
    ["cross-node duplicate Wireframe block", (blueprint: ReturnType<typeof createInitialBlueprint>) => {
      blueprint.nodes[1].wireframe.blocks[0].id = blueprint.nodes[0].wireframe.blocks[0].id;
    }],
    ["missing required-path segment", (blueprint: ReturnType<typeof createInitialBlueprint>) => {
      const flow = blueprint.flows.find((candidate) => candidate.id === "flow_diagnostic_plan");
      if (flow) flow.targetNodeId = "node_today";
    }],
    ["invalid secondary Flow state binding", (blueprint: ReturnType<typeof createInitialBlueprint>) => {
      const flow = blueprint.flows.find((candidate) => candidate.id === "flow_welcome_goal");
      if (flow) flow.sourceStateId = "missing_state";
    }]
  ])("rejects %s references before Handoff", (_name, mutate) => {
    const blueprint = createInitialBlueprint();
    mutate(blueprint);
    const issues = validateBlueprint(blueprint);

    expect(validateReferences(blueprint)).toBe(false);
    expect(issues.some((issue) => issue.severity === "Blocker")).toBe(true);
    expect(deriveReadiness(blueprint, issues).ready).toBe(false);
  });

  it("blocks readiness when a required Handoff source is missing", () => {
    const blueprint = createInitialBlueprint();
    blueprint.handoff.files = blueprint.handoff.files.filter(
      (file) => file.path !== "handoff/scope.md"
    );
    const issues = validateBlueprint(blueprint);

    expect(deriveReadiness(blueprint, issues).handoffValid).toBe(false);
    expect(deriveReadiness(blueprint, issues).ready).toBe(false);
  });

  it("fails closed when a required Handoff Wireframe node is missing", () => {
    const blueprint = createInitialBlueprint();
    blueprint.nodes = blueprint.nodes.filter((node) => node.id !== "node_diagnostic");
    const issues = validateBlueprint(blueprint);

    expect(() => deriveReadiness(blueprint, issues)).not.toThrow();
    expect(deriveReadiness(blueprint, issues).handoffValid).toBe(false);
    expect(deriveReadiness(blueprint, issues).ready).toBe(false);
  });
});
