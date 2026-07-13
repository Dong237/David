# Demo Requirements Checklist: David Demo Showcase

**Purpose**: Validate that competition-demo requirements are complete, precise,
consistent, and measurable before implementation planning.
**Created**: 2026-07-12
**Feature**: [spec.md](../spec.md)

**Note**: This checklist evaluates the written requirements, not the implementation.

## Core Narrative and Scope

- [x] CHK001 Is the audience, reference case, and product claim explicitly defined?
  [Completeness, Spec User Stories 1-3]
- [x] CHK002 Are the 90-120 second narrative and measurable completion outcome defined?
  [Clarity, Spec SC-001]
- [x] CHK003 Are all prohibited production features and false capability claims bounded?
  [Coverage, Spec FR-022-FR-023]
- [x] CHK004 Is the deterministic reference-case assumption distinguished from a
  general product-generation claim? [Assumption, Spec Assumptions]

## Canonical Blueprint and Layer Semantics

- [x] CHK005 Is canonical identity required across IA, Flow, Wireframe, Scope,
  Validation, Inspector, and Handoff? [Consistency, Spec FR-006]
- [x] CHK006 Is IA defined as the base projection and Flow as a non-mutating overlay?
  [Clarity, Spec User Story 2]
- [x] CHK007 Is Wireframe ownership and in-place node expansion unambiguous?
  [Clarity, Spec FR-010 and Key Entities]
- [x] CHK008 Are lens visibility changes distinguished from canonical data changes?
  [Consistency, Spec FR-007-FR-009]
- [x] CHK009 Are minimum graph coverage and shared-selection outcomes measurable?
  [Measurability, Spec SC-003 and FR-005-FR-006]

## Intake Requirements

- [x] CHK010 Is the exact number and decision role of intake questions specified?
  [Clarity, Spec FR-002 and SC-002]
- [x] CHK011 Are answer choices, Live Product Context fields, and Blueprint readiness
  behavior all defined? [Completeness, Spec FR-003-FR-004]
- [x] CHK012 Is non-reference input fallback behavior explicit and truthful?
  [Edge Case, Spec User Story 1 and Edge Cases]
- [x] CHK013 Is the empty-input behavior addressed without adding an unrelated form?
  [Coverage, Spec Edge Cases]

## Scope Conflict and Repair

- [x] CHK014 Is the exact scope mutation, broken dependency, and expected blocker count
  specified? [Clarity, Spec FR-012-FR-013 and SC-005]
- [x] CHK015 Are all three repair choices and their product tradeoffs required?
  [Completeness, Spec FR-014]
- [x] CHK016 Is the approved repair's effect on node variant, path, blocker, and decision
  record defined? [Consistency, Spec FR-015]
- [x] CHK017 Is consequential approval distinguished from routine reversible lens changes?
  [Coverage, Spec User Story 3]

## Handoff and Recovery

- [x] CHK018 Are minimum artifact count, default file, preview coverage, and truthful
  capability boundaries specified? [Completeness, Spec FR-016 and FR-023]
- [x] CHK019 Is clipboard denial covered by a truthful non-blocking fallback?
  [Exception Flow, Spec FR-017 and Edge Cases]
- [x] CHK020 Is state preservation on return from Handoff explicitly required?
  [Recovery, Spec FR-018]
- [x] CHK021 Does Reset cover canonical, derived, lens, route, and transient state?
  [Recovery, Spec FR-019 and User Story 5]
- [x] CHK022 Is repeatability measured across five complete Reset cycles?
  [Measurability, Spec SC-006]

## Accessibility and Recording Quality

- [x] CHK023 Are non-color status, keyboard focus, reduced-motion, and no-hover
  requirements documented? [Coverage, Spec FR-020-FR-021]
- [x] CHK024 Are both recording viewport sizes and no-horizontal-scroll behavior
  measurable? [Clarity, Spec SC-007]
- [x] CHK025 Is the maximum unexplained interaction delay quantified?
  [Measurability, Spec SC-004]
- [x] CHK026 Are screenshot quantity and target evidence outcomes specified?
  [Completeness, Spec SC-010]

## Automated Acceptance and Scope Guard

- [x] CHK027 Are primary, alternate, exception, recovery, and non-functional scenarios
  represented in requirements? [Scenario Coverage, Spec User Stories and Edge Cases]
- [x] CHK028 Is zero uncaught console error an explicit outcome rather than an implicit
  quality preference? [Clarity, Spec SC-009]
- [x] CHK029 Are offline and external-dependency exclusions stated as acceptance
  boundaries? [Dependency, Spec FR-022]
- [x] CHK030 Can every functional requirement be traced to at least one user scenario,
  edge case, or measurable success criterion? [Traceability, Spec FR-001-FR-023]

## Notes

- The demo source files resolve all material decisions, so no checklist-specific
  clarification question was necessary.
- The technical plan still needs to define exact source paths, test files, viewport
  commands, and evidence artifact locations.
