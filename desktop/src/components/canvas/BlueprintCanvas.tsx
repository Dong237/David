import { useEffect, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  MarkerType,
  Panel,
  ReactFlow,
  type Edge,
  type Node,
  type ReactFlowInstance
} from "@xyflow/react";
import { Maximize2 } from "lucide-react";
import type { Dispatch } from "react";
import { getVisibleBlueprint, type DemoAction, type DemoState } from "../../app/demoReducer";
import { BlueprintEdge, type BlueprintEdgeData } from "./BlueprintEdge";
import {
  BlueprintNode,
  RegionNode,
  type ProductNodeData,
  type RegionNodeData
} from "./BlueprintNode";

interface BlueprintCanvasProps {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
}

const nodeTypes = { region: RegionNode, product: BlueprintNode };
const edgeTypes = { blueprint: BlueprintEdge };

export function BlueprintCanvas({ state, dispatch }: BlueprintCanvasProps) {
  const [instance, setInstance] = useState<ReactFlowInstance<Node, Edge> | null>(null);
  const visibleBlueprint = getVisibleBlueprint(state);

  const connectedNodeIds = useMemo(() => {
    if (!state.expandedNodeId) return new Set<string>();
    const ids = new Set<string>([state.expandedNodeId]);
    for (const flow of visibleBlueprint.flows) {
      if (flow.sourceNodeId === state.expandedNodeId) ids.add(flow.targetNodeId);
      if (flow.targetNodeId === state.expandedNodeId) ids.add(flow.sourceNodeId);
    }
    return ids;
  }, [state.expandedNodeId, visibleBlueprint.flows]);

  const graphNodes = useMemo<Node[]>(() => {
    const regions: Node<RegionNodeData, "region">[] = visibleBlueprint.regions.map((region) => ({
      id: region.id,
      type: "region",
      position: { x: region.position.x, y: region.position.y },
      data: { region },
      selectable: false,
      draggable: false,
      focusable: false,
      zIndex: 0,
      style: { width: region.position.width, height: region.position.height }
    }));

    const products: Node<ProductNodeData, "product">[] = visibleBlueprint.nodes.map((node) => {
      const issue = state.lenses.validation
        ? state.validationIssues.find((candidate) => candidate.rootCauseTargetId === node.id)
        : undefined;
      const expanded = state.lenses.wireframe && state.expandedNodeId === node.id;
      const proposedScopeOperation = state.pendingChangeSet?.operations.find(
        (operation) =>
          operation.operation === "change_scope" && operation.targetId === node.id
      );
      const proposedScope =
        proposedScopeOperation?.operation === "change_scope"
          ? proposedScopeOperation.after
          : undefined;
      return {
        id: node.id,
        type: "product",
        parentId: node.regionId,
        position: { ...node.position },
        data: {
          node,
          selected: state.selectedNodeId === node.id,
          expanded,
          dimmed: Boolean(state.expandedNodeId && !connectedNodeIds.has(node.id)),
          connected: connectedNodeIds.has(node.id) && state.expandedNodeId !== node.id,
          showScope: state.lenses.scope,
          showThumbnail:
            state.lenses.wireframe &&
            visibleBlueprint.demo.wireframeThumbnailNodeIds.includes(node.id),
          issue,
          proposedScope
        },
        draggable: false,
        selectable: true,
        focusable: false,
        zIndex: expanded ? 10 : 2,
        style: {
          width: expanded ? 314 : 146,
          height: expanded ? 220 : 112
        }
      };
    });

    return [...regions, ...products];
  }, [
    connectedNodeIds,
    state.expandedNodeId,
    state.lenses.validation,
    state.lenses.scope,
    state.lenses.wireframe,
    state.pendingChangeSet,
    state.selectedNodeId,
    state.validationIssues,
    visibleBlueprint
  ]);

  const graphEdges = useMemo<Edge<BlueprintEdgeData, "blueprint">[]>(() => {
    if (!state.lenses.flow) return [];
    return visibleBlueprint.flows
      .filter(
        (flow) =>
          visibleBlueprint.demo.mainPathFlowIds.includes(flow.id) ||
          Boolean(
            state.expandedNodeId &&
              (flow.sourceNodeId === state.expandedNodeId ||
                flow.targetNodeId === state.expandedNodeId)
          )
      )
      .map((flow) => {
        const broken =
          state.lenses.validation &&
          state.validationIssues.some((issue) => issue.affectedFlowIds.includes(flow.id));
        const highlighted =
          !broken &&
          Boolean(
            state.expandedNodeId &&
              (flow.sourceNodeId === state.expandedNodeId ||
                flow.targetNodeId === state.expandedNodeId)
          );
        const muted = Boolean(state.expandedNodeId && !highlighted && !broken);
        const edgeState: BlueprintEdgeData["state"] = broken
          ? "broken"
          : highlighted
            ? "highlighted"
            : muted
              ? "muted"
              : "normal";
        return {
          id: flow.id,
          source: flow.sourceNodeId,
          target: flow.targetNodeId,
          type: "blueprint",
          data: { label: flow.label, state: edgeState },
          zIndex: broken || highlighted ? 6 : 1,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 14,
            height: 14,
            color: broken ? "#d92d20" : highlighted ? "#155eef" : "#8492a6"
          }
        };
      });
  }, [
    state.expandedNodeId,
    state.lenses.flow,
    state.lenses.validation,
    state.validationIssues,
    visibleBlueprint
  ]);

  useEffect(() => {
    if (!instance) return;
    const timer = window.setTimeout(() => {
      void instance.fitView({ padding: 0.08, duration: 240, maxZoom: 1 });
    }, 30);
    return () => window.clearTimeout(timer);
  }, [instance, state.expandedNodeId, state.pendingChangeSet]);

  return (
    <div className="blueprint-canvas" aria-label="Unified Blueprint Canvas">
      <ReactFlow
        nodes={graphNodes}
        edges={graphEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setInstance}
        onNodeClick={(_event, graphNode) => {
          if (graphNode.type === "product") {
            dispatch({ type: "SELECT_NODE", nodeId: graphNode.id });
          }
        }}
        fitView
        fitViewOptions={{ padding: 0.08, maxZoom: 1 }}
        minZoom={0.48}
        maxZoom={1.3}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="#d8dee8" />
        <Panel position="top-right">
          <button
            type="button"
            className="fit-view-button"
            onClick={() => void instance?.fitView({ padding: 0.08, duration: 240, maxZoom: 1 })}
          >
            <Maximize2 size={13} /> Fit view
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
