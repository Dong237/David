# Technical Research: David Demo Showcase

## Decision 1 - Use the existing Vite client as the sole demo runtime

**Rationale**: It is already a pure client entry with deterministic local hosting and
Tauri compatibility. Making root commands target it prevents testing a different Next
surface from the one being recorded.

**Alternatives considered**:

- Next App Router: rejected for this slice because routing and server output add no P0
  value and currently point to a separate placeholder shell.
- New app directory: rejected because the existing Vite root is sufficient.

## Decision 2 - Normalize the fixture into a stricter runtime contract

**Rationale**: The source fixture has stable content and IDs but legacy provenance,
severity, trigger, readiness, and repair shapes. One-way normalization preserves the
source while preventing legacy semantics from leaking into runtime state.

**Alternatives considered**:

- Edit the product fixture document: rejected because it is source material and current
  user work should not be silently rewritten.
- Use fixture arrays directly in UI components: rejected because that creates hidden
  inference and disconnected state.

## Decision 3 - Add canonical actions and state-bound Flow edges

**Rationale**: IA, Flow, and Wireframe are only one model if each Flow trigger resolves
to an action or state owned by its source node. The normalizer creates stable action IDs,
and the validator rejects unresolved bindings.

**Alternatives considered**:

- Keep free-text triggers: rejected because the Canvas could only look unified.
- Bind edges to Wireframe block labels at render time: rejected because labels are not IDs.

## Decision 4 - Use a pending ChangeSet for Scope preview

**Rationale**: The demo must show a broken projected path while respecting the product
contract that consequential canonical changes require validation and approval.

**Alternatives considered**:

- Mutate immediately then undo: rejected because it temporarily violates locked path
  constraints and makes approval ceremonial.
- Prevent selecting Later: rejected because the conflict is the core demo proof.

## Decision 5 - Aggregate validation issues by root cause

**Rationale**: Removing Diagnostic Quiz violates both dependency and required-path rules,
but both describe one product failure. One Blocker references both rule IDs and preserves
the exact acceptance expectation without hiding rule coverage.

**Alternatives considered**:

- Display two blockers: rejected because it overstates one decision and conflicts with
  the demo script.
- Run only one rule: rejected because it weakens deterministic coverage.

## Decision 6 - Keep visual depth semantic but restrained

**Rationale**: The demo requires visible region, node, edge, overlay, and selected-node
layers. CSS stacking and selected lift express object depth without perspective, 3D,
or using z-position as truth/severity.

**Alternatives considered**:

- Flat cards only: rejected because selection and node-owned Wireframe need stronger
  correspondence during recording.
- WebGL or perspective transforms: prohibited and unnecessary.

## Decision 7 - Derive Handoff from the current Blueprint snapshot

**Rationale**: Eight fixture entries plus three canonical node Wireframe entries satisfy
the showcase tree. Readiness and previews derive from current repaired state, preventing
the Handoff from becoming separate hardcoded product truth.

**Alternatives considered**:

- Static file-tree JSX: rejected because repair state would not propagate.
- Real ZIP generation: deferred; it is P1 and not needed for proof.

## Decision 8 - Use stable semantic and canonical test locators

**Rationale**: Labels repeat across Outline, Canvas, Inspector, Decision Panel, and
Handoff. Accessible roles plus canonical `data-*` attributes make tests resilient and
also expose the shared identity contract.

**Alternatives considered**:

- React Flow class names or SVG order: rejected as implementation details.
- Screenshot-only assertions: rejected because they cannot prove state semantics.
