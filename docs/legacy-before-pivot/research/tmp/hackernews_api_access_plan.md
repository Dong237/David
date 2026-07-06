# Hacker News Access Plan

Date: 2026-06-21

Purpose: use Hacker News as an English technical-founder evidence source for product judgment, launch critique, AI/devtool market reactions, and "what should I build / validate / charge" discussion patterns.

## Status

| Item | Status |
|---|---|
| API access | Ready |
| Auth required | No |
| Official API | Hacker News Firebase API |
| Search API | HN Search powered by Algolia |
| Existing Codex MCP/skill | None exposed; not needed |
| Best use for us | Search + comment mining |

## Sources

- HN Search API: https://hn.algolia.com/api
- HN Search UI: https://hn.algolia.com/
- Official HN Firebase API repo: https://github.com/HackerNews/API
- Firebase announcement: https://firebase.blog/posts/2014/10/hacker-news-now-has-api-its-firebase/

## Which API To Use

### 1. Algolia HN Search

Use for scenario mining and market research.

Base:

```text
https://hn.algolia.com/api/v1/search
https://hn.algolia.com/api/v1/search_by_date
```

Useful params:

```text
query=<keyword>
tags=story|comment|poll|show_hn|ask_hn|front_page
hitsPerPage=20
page=0
numericFilters=created_at_i>UNIX_TIME
```

Example:

```bash
curl 'https://hn.algolia.com/api/v1/search?query=Show%20HN%20AI%20productivity%20tool&tags=story&hitsPerPage=5'
```

### 2. Official HN Firebase API

Use for exact item lookups, live lists, and complete thread traversal when needed.

Base:

```text
https://hacker-news.firebaseio.com/v0/
```

Useful endpoints:

```text
/v0/item/{id}.json
/v0/user/{id}.json
/v0/topstories.json
/v0/newstories.json
/v0/beststories.json
/v0/askstories.json
/v0/showstories.json
/v0/maxitem.json
```

Example:

```bash
curl 'https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty'
```

## Research Strategy

HN is not Reddit. It often does not use direct complaint language. Mine it through:

- `Show HN` launches and comments.
- `Ask HN` founder questions.
- Product critique threads.
- AI/devtool launch reactions.
- Pricing and positioning debates.
- Comments that challenge vague ideas, weak differentiation, or fake validation.

## Seed Queries

Use broad HN-native terms first:

- `Show HN AI productivity tool`
- `Show HN developer tool AI`
- `Show HN product management`
- `Show HN landing page`
- `Ask HN startup idea`
- `Ask HN validate idea`
- `Ask HN MVP`
- `Ask HN pricing SaaS`
- `Ask HN no users`
- `Ask HN solo founder`
- `AI coding agent product`
- `vibe coding`
- `landing page feedback`
- `SaaS pricing`
- `customer discovery`
- `product market fit`
- `build something people want`

## Evidence We Want

| Evidence | Use |
|---|---|
| Launch comments | Market critique and objection language |
| Low-comment/low-point launches | Weak market pull or bad positioning signal |
| High-comment launches | Strong debate, pain, or novelty signal |
| Ask HN founder questions | User-scenario source |
| Comments rejecting assumptions | Critic-agent training material |
| Pricing objections | WTP and value-risk signal |
| Repeated "I built X" patterns | Competitor and category saturation signal |

## How To Convert HN Data Into Evidence Cards

Each useful hit becomes:

```text
source: Hacker News
source_type: show_hn | ask_hn | comment | launch_thread
url: https://news.ycombinator.com/item?id=<id>
date:
actor: technical founder | developer | indie builder | buyer | critic
claim:
observed_behavior:
pain_signal:
objection:
strength: weak | medium | strong
relevance:
contradiction:
```

## Caveats

- HN is not representative of all buyers.
- HN comments can be unusually technical and skeptical.
- Upvotes are attention, not payment evidence.
- Launch success on HN is not business success.
- Lack of HN interest does not kill a non-technical or Chinese-market product.

## How It Feeds Our Specs

- `02_user_scenarios.md`: technical-founder and launch-diagnosis scenarios.
- `05_evidence_model.md`: comments as social/complaint/objection evidence, not payment proof.
- `06_decision_policy.md`: use HN evidence to choose `test`, `narrow`, or `iterate`; rarely `build` by itself.
- Landing page copy: objections and trust language from skeptical technical users.

## Decision

HN is ready now. Use it immediately as a fast English technical-founder research source. It complements Reddit: Reddit is better for raw pain; HN is better for sharp critique, launch feedback, and technical-market skepticism.
