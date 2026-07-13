import {
  ArrowLeft,
  Braces,
  CheckCircle2,
  Clipboard,
  FileCode2,
  FileText,
  FolderOpen,
  PackageCheck,
  ShieldCheck
} from "lucide-react";
import type { Dispatch } from "react";
import type { DemoAction, DemoState } from "../../app/demoReducer";
import { compileHandoff } from "../../domain/handoff";

interface HandoffCenterProps {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
}

function iconForPath(path: string) {
  if (path.endsWith(".json")) return Braces;
  if (path.includes("prompts/") || path.includes("wireframes/")) return FileCode2;
  return FileText;
}

export function HandoffCenter({ state, dispatch }: HandoffCenterProps) {
  const handoff = compileHandoff(
    state.blueprint,
    state.decisionRecords,
    state.changeSetHistory
  );
  const selectedFile =
    handoff.files.find((file) => file.path === state.selectedHandoffPath) ?? handoff.files[0];

  const copyStarterPrompt = async () => {
    try {
      await navigator.clipboard.writeText(handoff.starterPrompt);
      dispatch({ type: "SHOW_TOAST", message: "Starter prompt copied" });
    } catch {
      dispatch({
        type: "SHOW_TOAST",
        message: "Clipboard unavailable. Select the starter prompt manually."
      });
    }
  };

  return (
    <section className="handoff-workspace" aria-label="Handoff Center">
      <aside className="handoff-files">
        <header>
          <span className="section-kicker">Handoff Center</span>
          <h1>Build package</h1>
          <p>Compiled from the current Blueprint snapshot.</p>
        </header>
        <div className="handoff-folder-row"><FolderOpen size={14} /> handoff/</div>
        <nav aria-label="Handoff files">
          {handoff.files.map((file) => {
            const Icon = iconForPath(file.path);
            return (
              <button
                type="button"
                key={file.path}
                data-file-path={file.path}
                className={selectedFile?.path === file.path ? "is-active" : ""}
                onClick={() => dispatch({ type: "SELECT_HANDOFF_FILE", path: file.path })}
              >
                <Icon size={14} />
                <span>{file.path.replace("handoff/", "")}</span>
                {file.sourceNodeId && <small>Node</small>}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="handoff-preview">
        <div className="handoff-toolbar">
          <button
            type="button"
            className="icon-text-button quiet-button"
            onClick={() => dispatch({ type: "BACK_TO_BLUEPRINT" })}
          >
            <ArrowLeft size={15} /> Back to Blueprint
          </button>
          <div className="handoff-status">
            <CheckCircle2 size={14} /> Snapshot valid
          </div>
          <button type="button" className="primary-button" onClick={copyStarterPrompt}>
            <Clipboard size={15} /> Copy starter prompt
          </button>
        </div>

        <article className="file-preview-card">
          <header>
            <div>
              <span className="section-kicker">File preview</span>
              <h2>{selectedFile?.title}</h2>
              <code>{selectedFile?.path}</code>
            </div>
            {selectedFile?.sourceNodeId && (
              <span className="source-reference">Source · {selectedFile.sourceNodeId}</span>
            )}
          </header>
          <pre>{selectedFile?.preview}</pre>
        </article>
      </div>

      <aside className="handoff-summary">
        <div className="handoff-ready-icon"><PackageCheck size={22} /></div>
        <span className="section-kicker">Execution contract</span>
        <h2>Ready for a coding agent</h2>
        <p>
          The package preserves product decisions instead of handing downstream agents
          one oversized prompt.
        </p>
        <div className="handoff-metrics">
          <div><strong>{handoff.files.length}</strong><span>Artifacts</span></div>
          <div><strong>{state.blueprint.nodes.length}</strong><span>Canonical nodes</span></div>
          <div>
            <strong>
              {state.validationIssues.filter((issue) => issue.severity === "Blocker").length}
            </strong>
            <span>Blockers</span>
          </div>
        </div>
        <ul>
          <li><ShieldCheck size={14} /> Scope and no-gos first</li>
          <li><ShieldCheck size={14} /> One slice at a time</li>
          <li><ShieldCheck size={14} /> Stop on contradiction</li>
          <li><ShieldCheck size={14} /> Verify acceptance criteria</li>
        </ul>
        <div className="starter-prompt-preview">
          <span>Starter prompt</span>
          <p>{handoff.starterPrompt}</p>
        </div>
      </aside>
    </section>
  );
}
