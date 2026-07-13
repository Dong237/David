# David Agent Guidance

David Mode B is a deterministic competition demo in this branch. Read the product and
demo source files before changing runtime behavior. Do not add backend, auth, database,
collaboration, live LLM, WebGL, or freeform editor scope.

<!-- SPECKIT START -->
Active implementation plan: `specs/001-david-demo-showcase/plan.md`
<!-- SPECKIT END -->

The runtime invariant is: one canonical Blueprint, Flow as an IA overlay, Wireframe as
node-owned expansion, Scope changes through validated ChangeSets, and readiness derived
from validation coverage.
