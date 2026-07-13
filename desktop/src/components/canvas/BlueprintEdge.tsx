import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type Edge,
  type EdgeProps
} from "@xyflow/react";

export interface BlueprintEdgeData extends Record<string, unknown> {
  label: string;
  state: "normal" | "highlighted" | "broken" | "muted";
}

export type BlueprintFlowEdge = Edge<BlueprintEdgeData, "blueprint">;

export function BlueprintEdge(props: EdgeProps<BlueprintFlowEdge>) {
  const isSelfLoop = props.source === props.target;
  const [edgePath, labelX, labelY] = isSelfLoop
    ? [
        `M ${props.sourceX} ${props.sourceY} C ${props.sourceX + 52} ${props.sourceY - 58}, ${props.targetX - 52} ${props.targetY - 58}, ${props.targetX} ${props.targetY}`,
        (props.sourceX + props.targetX) / 2,
        Math.min(props.sourceY, props.targetY) - 52
      ]
    : getSmoothStepPath({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        sourcePosition: props.sourcePosition,
        targetX: props.targetX,
        targetY: props.targetY,
        targetPosition: props.targetPosition,
        borderRadius: 10,
        offset: 18
      });
  const state = props.data?.state ?? "normal";

  return (
    <g
      className={`blueprint-edge edge-${state}`}
      data-flow-id={props.id}
      data-edge-state={state}
    >
      <BaseEdge id={props.id} path={edgePath} markerEnd={props.markerEnd} />
      <EdgeLabelRenderer>
        <span
          className="edge-label nodrag nopan"
          style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
        >
          {state === "broken" ? "Path broken" : props.data?.label}
        </span>
      </EdgeLabelRenderer>
    </g>
  );
}
