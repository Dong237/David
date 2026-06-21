# GitHub Access Plan

Date: 2026-06-21

Purpose: use GitHub as a safe, official evidence source for developer workflow pain, AI coding-agent gaps, spec/PRD friction, issue-level complaints, and competitor/product ecosystem mapping.

## Status

| Item | Status |
|---|---|
| Access | Ready |
| Auth | GitHub CLI authenticated as local user |
| Official APIs | REST + GraphQL |
| Existing Codex connector | Available |
| Best use for us | Developer pain, competitor gaps, coding-agent handoff evidence |

## Official Sources

- REST API docs: https://docs.github.com/rest
- REST Search API: https://docs.github.com/en/rest/search/search
- REST issues API: https://docs.github.com/rest/issues/issues
- REST issue comments API: https://docs.github.com/rest/issues/comments
- GraphQL API docs: https://docs.github.com/en/graphql
- GraphQL Discussions guide: https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions
- REST rate limits: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api

## Local Access

We can use `gh` directly.

Verify:

```bash
gh auth status
gh api rate_limit
```

Current local auth already works.

## Useful Access Methods

### 1. Search repositories

Use for competitor/category mapping.

```bash
gh search repos 'ai coding agent' \
  --limit 20 \
  --json fullName,url,description,stargazersCount,updatedAt
```

Useful categories:

- AI coding agents
- PRD/spec generators
- product management tools
- issue-to-code / spec-to-code tools
- customer feedback tools
- roadmap/feedback/feature-request tools
- founder/indie tools

### 2. Search issues

Use for pain and workflow failure evidence.

```bash
gh search issues '"PRD" "Cursor"' \
  --limit 20 \
  --json title,url,repository,createdAt,commentsCount,state
```

Search supports GitHub search syntax:

```text
is:issue
is:open
comments:>5
created:>2025-01-01
repo:owner/repo
label:bug
label:enhancement
```

### 3. Read issue detail and comments

Use REST once a target issue is found.

```bash
gh issue view <number> --repo <owner/repo> --comments
```

Or:

```bash
gh api repos/<owner>/<repo>/issues/<number>
gh api repos/<owner>/<repo>/issues/<number>/comments
```

### 4. Search discussions

Use GraphQL for repositories with GitHub Discussions enabled.

This is useful for:

- user questions
- feature requests
- roadmap debates
- product confusion
- long-form workflow complaints

GraphQL is more complex, so use it after issue/repo search identifies important repositories.

## Research Queries

### AI coding-agent/spec handoff

```text
"PRD" "Cursor"
"spec" "Cursor"
"product requirements" "AI"
"coding agent" "requirements"
"AI coding agent" "issue"
"vibe coding"
"generate spec"
"implementation plan" "agent"
```

### Developer workflow pain

```text
"unclear requirements"
"missing requirements"
"needs product decision"
"scope unclear"
"what should this do"
"user story"
"acceptance criteria"
"feature request" "pricing"
```

### Competitor/tool discovery

```text
ai product manager
prd generator
spec driven development
customer feedback tool
roadmap feedback
feature request management
AI coding agent memory
```

### Product-management artifacts

```text
"opportunity solution tree"
"assumption test"
"MVP validation"
"customer discovery"
"evidence" "PRD"
"build measure learn"
```

## Evidence We Want

| Evidence | Use |
|---|---|
| Repeated issues about unclear requirements | Confirms spec-to-code failure |
| Feature requests with weak product framing | Shows need for PM judgment before implementation |
| AI coding-agent bugs from bad context | Supports agent-to-build bridge |
| Discussions asking "what should this do?" | Supports hidden PM protocol |
| Popular repos in adjacent categories | Competitor matrix |
| Open issues around onboarding/pricing/docs | Competitor weakness evidence |
| Maintainer comments rejecting scope | Examples of professional prioritization |

## Evidence Strength

GitHub evidence is strong for developer workflow and tool pain, but weak for broad market willingness to pay.

| GitHub signal | Strength |
|---|---|
| Repeated issue pattern across repos | Medium |
| Many comments from real users | Medium |
| Maintainer/product decision discussion | Medium |
| Stars/forks alone | Weak |
| A single open issue | Weak |
| Paid product issue from paying users | Stronger, if buyer context is clear |

## Caveats

- GitHub users are technical and not representative of all indie builders.
- Issues often describe implementation pain, not business pain.
- Stars are attention, not payment.
- Public issues can be noisy, abandoned, or generated.
- GitHub is better for "agent-to-build bridge" evidence than "what should I build" evidence.

## Rate Limits

Authenticated REST core API has higher quota.

Search has a separate stricter quota. Use targeted searches and cache results.

Check anytime:

```bash
gh api rate_limit --jq '{core:.resources.core, search:.resources.search, graphql:.resources.graphql}'
```

## How It Feeds Our Specs

- `02_user_scenarios.md`: coding-agent/spec handoff and developer workflow scenarios.
- `05_evidence_model.md`: issue/discussion evidence card types.
- `06_decision_policy.md`: when implementation evidence should trigger `narrow`, `test`, or `artifact`, not `build`.
- Future `07_agent_workflows.md`: issue-to-spec, spec-to-code, and artifact generation workflows.
- Product matrix: competitor discovery and gap analysis.

## Decision

GitHub is ready and safe. Use it as a core platform for developer-workflow evidence and competitor mapping. Do not use it as the primary source for payment demand.
