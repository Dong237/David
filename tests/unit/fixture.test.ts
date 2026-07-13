import { describe, expect, it } from "vitest";
import { BlueprintDocumentSchema } from "../../desktop/src/domain/blueprint.schema";
import { createInitialBlueprint } from "../../desktop/src/domain/fixtureNormalizer";

describe("AI Study Coach canonical fixture", () => {
  it("normalizes into the strict runtime schema", () => {
    const blueprint = createInitialBlueprint();
    expect(BlueprintDocumentSchema.parse(blueprint)).toEqual(blueprint);
    expect(blueprint.regions).toHaveLength(4);
    expect(blueprint.nodes).toHaveLength(9);
    expect(blueprint.flows).toHaveLength(9);
  });

  it("resolves every canonical relationship", () => {
    const blueprint = createInitialBlueprint();
    const regionIds = new Set(blueprint.regions.map((region) => region.id));
    const nodeIds = new Set(blueprint.nodes.map((node) => node.id));
    const actionIds = new Set(blueprint.nodes.flatMap((node) => node.actions.map((action) => action.id)));

    for (const node of blueprint.nodes) {
      expect(regionIds.has(node.regionId)).toBe(true);
    }

    for (const flow of blueprint.flows) {
      expect(nodeIds.has(flow.sourceNodeId)).toBe(true);
      expect(nodeIds.has(flow.targetNodeId)).toBe(true);
      expect(Boolean(flow.sourceActionId || flow.sourceStateId)).toBe(true);
      if (flow.sourceActionId) expect(actionIds.has(flow.sourceActionId)).toBe(true);
    }
  });

  it("has unique wireframe blocks and wireframes for every MVP page", () => {
    const blueprint = createInitialBlueprint();
    const blockIds = blueprint.nodes.flatMap((node) => node.wireframe.blocks.map((block) => block.id));

    expect(new Set(blockIds).size).toBe(blockIds.length);
    expect(blueprint.nodes.filter((node) => node.scopeStatus === "in_mvp").every((node) => node.wireframe.blocks.length > 0)).toBe(true);
  });
});
