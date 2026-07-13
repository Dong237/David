# Research Integrity Manifest

> Scope: Contract-gap Research Pack only. Created retrospectively during critic remediation on 2026-07-10.

## Repository context

| Field | Value |
|---|---|
| Branch | `feat/pm-blueprint` |
| Starting commit observed during final audit | `ed9882e0ef3ef6a58ae2e59e82a1f7450c4640e0` |
| Allowed write scope | `docs/product/david-mode-b/research/01-contract-gap-research/**` |
| Protected source documents | `00_david_mode_b_positioning_and_principles.md`; `01_ia_reasoning_and_agent_autonomy_contract.md` |

## Protected source snapshot

| File | SHA-256 | Filesystem mtime observed |
|---|---|---|
| `00_david_mode_b_positioning_and_principles.md` | `8d53f70dcfe33383af52fc7138c9967add0cdc0a409a80392e2ac841a2ce6dda` | `2026-07-10 20:59:08 +0800` |
| `01_ia_reasoning_and_agent_autonomy_contract.md` | `c49e19625a401d1e0df02cf67bf390ebdb29757f3d12914b25c530a44ac83507` | `2026-07-10 21:41:57 +0800` |

The independent critic independently recomputed the same two hashes during its review window. The files were not written by this Research Pack workflow.

## Limitation

The whole `docs/product/` tree was already untracked when this task began. Therefore Git cannot provide a pre-task blob for the protected source files, and no cryptographic baseline was captured before the first research artifact was created. The hashes above prove stability across the critic/revision window, not across time before the first observation. This limitation cannot be repaired retrospectively; future research runs must create this manifest before their first write.

## Future required procedure

1. Record branch, commit, `git status --short`, protected-file hashes, and mtimes before any research output is written.
2. Restrict writes to the declared research directory.
3. Recompute hashes after each critic iteration and at completion.
4. Fail the integrity check on any protected-file hash change unless the user explicitly authorizes a source-spec patch.
5. Preserve pre-existing worktree changes and report them separately from Research Pack changes.
