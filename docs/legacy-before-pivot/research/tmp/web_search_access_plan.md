# Web Search Access Plan

Date: 2026-06-21

Purpose: create a safe fallback search layer for weak or blocked platforms: Reddit pages while API approval is pending, V2EX pages without token, Indie Hackers, blogs, launch posts, competitor pages, review pages, and public discussions.

## Status

| Item | Status |
|---|---|
| Manual/web search | Ready through browser/search tools |
| Google Programmable Search JSON API | Not recommended for new setup |
| Reason | Official docs say Custom Search JSON API is closed to new customers and existing users must transition by 2027-01-01 |
| Best immediate path | Use targeted web search manually/through existing search tools |
| Best product/API path later | Evaluate Brave Search API, Tavily, Exa, SerpAPI, or Vertex AI Search depending on budget/compliance |

## Official Google Sources

- Custom Search JSON API overview: https://developers.google.com/custom-search/v1/overview
- Custom Search JSON API introduction: https://developers.google.com/custom-search/v1/introduction
- Programmable Search overview: https://developers.google.com/custom-search/docs/overview
- Programmable Search product page: https://programmablesearchengine.google.com/about/

## What Google Says

The Custom Search JSON API:

- lets applications retrieve Programmable Search Engine results programmatically;
- returns JSON;
- requires a configured Programmable Search Engine and API key;
- historically offered 100 free queries/day, then paid usage;
- is now not a good new dependency because official docs say it is closed to new customers and existing customers need to transition by `2027-01-01`.

Decision: do not block on Google Programmable Search API. Use it only if an existing usable key/account is already available.

## Why Web Search Still Matters

Direct platform access is fragmented:

- Reddit approval can be slow.
- V2EX token is blocked by account activation.
- XHS automation is too risky for now.
- Indie Hackers has no reliable public API.
- Review sites often do not provide open APIs.

Web search gives us a cross-platform fallback for scenario discovery.

## Immediate Use: Search Operators

Use targeted queries, not generic search.

### Reddit fallback

```text
site:reddit.com/r/SaaS "built but nobody uses it"
site:reddit.com/r/SideProject "how do I validate"
site:reddit.com/r/startups "no users"
site:reddit.com/r/Entrepreneur "landing page feedback"
site:reddit.com/r/ProductManagement "AI product manager"
```

### V2EX fallback

```text
site:v2ex.com/t "独立开发" "没人用"
site:v2ex.com/t "产品" "验证"
site:v2ex.com/t "AI 工具" "定价"
site:v2ex.com/t "不知道做什么产品"
site:v2ex.com/t "Cursor" "产品"
```

### Indie Hackers / founder stories

```text
site:indiehackers.com "how I validated"
site:indiehackers.com "no users"
site:indiehackers.com "landing page"
site:indiehackers.com "pricing"
site:indiehackers.com "AI tool"
```

### Competitor/review pages

```text
"AI product manager" "pricing"
"PRD generator" "reviews"
"customer feedback" "alternative to"
"roadmap tool" "G2"
"product discovery" "Capterra"
"feature request tool" "reviews"
```

### General problem-language discovery

```text
"I built" "no users" "SaaS"
"how do I validate my startup idea"
"my landing page doesn't convert"
"AI app" "no one pays"
"what should I build" "developer"
"I can code but don't know what to build"
```

## Evidence We Want

| Evidence | Use |
|---|---|
| Public complaints | Scenario source |
| Forum threads | User language and objections |
| Review pages | Competitor weakness |
| Pricing pages | WTP and packaging comparison |
| Launch posts | Positioning and response patterns |
| Blog post retrospectives | Validation tactics and failure modes |
| "Alternative to" pages | Product category map |

## Evidence Strength

| Web result type | Strength |
|---|---|
| First-person failure story with details | Medium |
| Review with specific complaint | Medium |
| Repeated similar complaints across sources | Medium-high |
| Pricing page | Medium for competitor positioning, weak for demand |
| Generic blog advice | Weak |
| AI-generated listicle | Very weak |
| Search volume alone | Weak unless paired with behavior |

## Alternative Search APIs To Evaluate Later

Do not set these up yet; evaluate when we need productized search.

| Provider | Possible use | Risk |
|---|---|---|
| Brave Search API | General web search API | Paid/quotas; result quality must be tested |
| Tavily | LLM-oriented search | Vendor dependency |
| Exa | Semantic web search | Useful for research; paid |
| SerpAPI | Google/Bing-style SERP wrapper | Paid; compliance/vendor risk |
| Vertex AI Search | Google official direction for controlled-domain search | More enterprise/cloud complexity |

## How It Feeds Our Specs

- `02_user_scenarios.md`: broaden scenario evidence from weak platforms.
- `05_evidence_model.md`: web result/source quality rules.
- `06_decision_policy.md`: treat search results as hypothesis evidence unless tied to costly behavior.
- Competitor matrix: discover direct/indirect products.
- Landing page copy: exact pain language and objection language.

## Decision

Use web search as a research fallback now, not as a product dependency. Avoid spending time setting up Google Programmable Search JSON API unless an existing working account/key is already available. For a future production search layer, compare Brave/Tavily/Exa/SerpAPI after we know the exact volume and query types.
