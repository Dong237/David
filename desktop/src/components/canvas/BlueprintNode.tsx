import { AlertTriangle, CheckCircle2, Layers3 } from "lucide-react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { BlueprintNode as BlueprintNodeModel, ProductRegion, ValidationIssue } from "../../domain/blueprint";
import { ExpandedWireframe } from "./ExpandedWireframe";

export interface RegionNodeData extends Record<string, unknown> {
  region: ProductRegion;
}

export type RegionFlowNode = Node<RegionNodeData, "region">;

export function RegionNode({ data }: NodeProps<RegionFlowNode>) {
  return (
    <section className="region-node" data-region-id={data.region.id}>
      <div>
        <span>{data.region.title}</span>
        <p>{data.region.description}</p>
      </div>
    </section>
  );
}

export interface ProductNodeData extends Record<string, unknown> {
  node: BlueprintNodeModel;
  selected: boolean;
  expanded: boolean;
  dimmed: boolean;
  showScope: boolean;
  showThumbnail: boolean;
  issue?: ValidationIssue;
  connected: boolean;
  proposedScope?: BlueprintNodeModel["scopeStatus"];
}

export type ProductFlowNode = Node<ProductNodeData, "product">;

function scopeLabel(scopeStatus: BlueprintNodeModel["scopeStatus"]): string {
  if (scopeStatus === "in_mvp") return "In MVP";
  if (scopeStatus === "later") return "Later";
  return "Excluded";
}

export function BlueprintNode({ data }: NodeProps<ProductFlowNode>) {
  const {
    node,
    expanded,
    selected,
    dimmed,
    showScope,
    showThumbnail,
    issue,
    connected,
    proposedScope
  } = data;
  const provenanceLabel = node.provenance.knowledgeStatus === "confirmed" ? "Confirmed" : "Inferred";

  return (
    <article
      className={[
        "blueprint-node",
        selected ? "is-selected" : "",
        expanded ? "is-expanded" : "",
        dimmed ? "is-dimmed" : "",
        connected ? "is-connected" : "",
        issue ? "has-issue" : "",
        proposedScope ? "has-pending-scope" : ""
      ]
        .filter(Boolean)
        .join(" ")}
      data-node-id={node.id}
      data-expanded={expanded ? "true" : "false"}
      data-scope-status={node.scopeStatus}
      data-scope-variant={node.scopeVariant ?? "default"}
      data-scope-proposal={proposedScope ?? "none"}
    >
      <Handle type="target" position={Position.Left} className="flow-handle" />
      <div className="node-stack-plate" aria-hidden="true" />
      <header className="node-header">
        <div>
          <span className="node-type"><Layers3 size={11} /> Product node</span>
          <h3>{node.title}</h3>
        </div>
        {issue ? (
          <span className="node-alert" aria-label="Blocker">
            <AlertTriangle size={14} />
          </span>
        ) : (
          <span className="node-ready" aria-label="No blocker">
            <CheckCircle2 size={13} />
          </span>
        )}
      </header>

      {!expanded && (
        <>
          <p className="node-purpose">{node.userIntent}</p>
          {showThumbnail && (
            <div className="wireframe-thumbnail" aria-label="Wireframe thumbnail">
              <span />
              <span />
              <span />
            </div>
          )}
          <footer className="node-footer">
            {showScope && (
              <span
                className={`scope-badge ${proposedScope ? "scope-proposed" : `scope-${node.scopeStatus}`}`}
              >
                {proposedScope
                  ? `Proposed: ${scopeLabel(proposedScope)}`
                  : scopeLabel(node.scopeStatus)}
              </span>
            )}
            <span className="provenance-label">{provenanceLabel}</span>
          </footer>
        </>
      )}

      {expanded && <ExpandedWireframe node={node} />}
      <Handle type="source" position={Position.Right} className="flow-handle" />
    </article>
  );
}
