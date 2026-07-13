import {
  BarChart3,
  CheckSquare2,
  CircleDot,
  ListChecks,
  MessageSquareText,
  Timer
} from "lucide-react";
import type { BlueprintNode } from "../../domain/blueprint";

interface ExpandedWireframeProps {
  node: BlueprintNode;
}

function iconForBlock(type: string) {
  if (["progress", "metadata", "time"].includes(type)) return Timer;
  if (["chart", "summary"].includes(type)) return BarChart3;
  if (["input", "choice_group", "select", "date", "toggle"].includes(type)) return CheckSquare2;
  if (["feedback", "text", "recommendation"].includes(type)) return MessageSquareText;
  if (["list", "card"].includes(type)) return ListChecks;
  return CircleDot;
}

export function ExpandedWireframe({ node }: ExpandedWireframeProps) {
  return (
    <div className="expanded-wireframe" aria-label={`${node.title} low fidelity wireframe`}>
      <div className="wireframe-chrome">
        <span />
        <span />
        <span />
        <strong>Low-fi · {node.wireframe.kind}</strong>
      </div>
      <div className="wireframe-grid">
        {node.wireframe.blocks.map((wireframeBlock) => {
          const Icon = iconForBlock(wireframeBlock.type);
          const action = node.actions.find(
            (candidate) => candidate.wireframeBlockId === wireframeBlock.id
          );
          return (
            <div
              className={`wireframe-block type-${wireframeBlock.type}`}
              key={wireframeBlock.id}
              data-wireframe-block-id={wireframeBlock.id}
            >
              <Icon size={12} />
              <span>{wireframeBlock.label}</span>
              {action && <small>{action.id}</small>}
            </div>
          );
        })}
      </div>
      <div className="wireframe-footer">
        <span>Primary CTA</span>
        <strong>{node.primaryCTA}</strong>
      </div>
    </div>
  );
}
