import { useReducer } from "react";
import { AppShell } from "../components/shell/AppShell";
import { IntakeWorkspace } from "../components/intake/IntakeWorkspace";
import { BlueprintWorkspace } from "../components/canvas/BlueprintWorkspace";
import { HandoffCenter } from "../components/handoff/HandoffCenter";
import { createInitialDemoState, demoReducer } from "./demoReducer";

export function App() {
  const [state, dispatch] = useReducer(demoReducer, undefined, () => createInitialDemoState());

  return (
    <AppShell state={state} dispatch={dispatch}>
      {state.route === "intake" && <IntakeWorkspace state={state} dispatch={dispatch} />}
      {state.route === "blueprint" && (
        <BlueprintWorkspace state={state} dispatch={dispatch} />
      )}
      {state.route === "handoff" && <HandoffCenter state={state} dispatch={dispatch} />}
    </AppShell>
  );
}
