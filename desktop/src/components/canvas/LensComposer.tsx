import { Boxes, GitBranch, LayoutTemplate, ScanSearch, Tags } from "lucide-react";
import type { Dispatch } from "react";
import type { DemoAction, DemoState } from "../../app/demoReducer";

interface LensComposerProps {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
}

const toggleLenses = [
  { key: "flow", label: "Flow", icon: GitBranch },
  { key: "wireframe", label: "Wireframe", icon: LayoutTemplate },
  { key: "scope", label: "Scope", icon: Tags },
  { key: "validation", label: "Validation", icon: ScanSearch }
] as const;

export function LensComposer({ state, dispatch }: LensComposerProps) {
  return (
    <div className="lens-composer" aria-label="Blueprint lenses">
      <span className="lens-title">Lens Composer</span>
      <button
        type="button"
        className="lens-toggle is-on is-locked"
        aria-label="IA base lens, always on"
        aria-pressed="true"
        disabled
      >
        <Boxes size={13} /> IA <small>Base</small>
      </button>
      {toggleLenses.map(({ key, label, icon: Icon }) => (
        <button
          type="button"
          className={`lens-toggle ${state.lenses[key] ? "is-on" : ""}`}
          aria-pressed={state.lenses[key]}
          aria-label={`Toggle ${label}`}
          disabled={key === "validation" && Boolean(state.pendingChangeSet)}
          title={
            key === "validation" && state.pendingChangeSet
              ? "Validation stays visible while approval is required"
              : undefined
          }
          key={key}
          onClick={() => dispatch({ type: "TOGGLE_LENS", lens: key })}
        >
          <Icon size={13} /> {label}
        </button>
      ))}
    </div>
  );
}
