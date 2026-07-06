# Reddit API Access Plan

Date: 2026-06-21

Purpose: use Reddit as an evidence source for English indie-builder scenarios, especially complaints, failed launches, validation struggles, pricing uncertainty, and "built but nobody uses it" cases.

## Status

| Item | Status |
|---|---|
| Official docs checked | Yes |
| Current access model | OAuth token from a registered/approved Reddit app |
| Existing Codex MCP/skill | None exposed in this session |
| Recommended path | Request official Data API access, then use direct OAuth/API calls |
| Fallback while waiting | Use normal web search over Reddit pages with manual citation |

## Official Sources

- Reddit Data API Wiki: https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki
- Data API access request form: https://support.reddithelp.com/hc/en-us/requests/new?ticket_form_id=14868593862164
- Live API docs: https://www.reddit.com/dev/api/oauth/
- OAuth docs: https://github.com/reddit-archive/reddit/wiki/oauth2
- Data API Terms: https://redditinc.com/policies/data-api-terms

## Important Constraints

- Reddit requires authenticated OAuth access for Data API usage.
- Reddit can throttle or block unidentified clients.
- A unique, descriptive `User-Agent` is required.
- Commercial use or research above permitted rate limits may require a separate agreement.
- Reddit user content must not be used to train an AI/ML model without rights-holder permission.
- For our current use, Reddit data should be treated as cited research evidence, not training data.

## Access Steps For Us

### 1. Request Data API access

Open:

https://support.reddithelp.com/hc/en-us/requests/new?ticket_form_id=14868593862164

Choose:

`What do you need assistance with?` -> `Request Data Access`

Recommended framing:

- Role: developer / individual researcher.
- Company: `n/a` if no company entity.
- Purpose: low-volume market research for product discovery.
- Data needed: public posts and comments from selected subreddits.
- No posting, voting, messaging, automation, scraping, or user profiling.
- No AI model training.
- Output: internal evidence cards with links, short excerpts, and aggregated product insights.
- Distribution: internal research docs and cited summaries only.

Suggested subject:

`Request read-only Reddit Data API access for product discovery research`

Suggested description:

```text
I am requesting read-only Reddit Data API access for low-volume product discovery research.

The project analyzes public posts and comments in selected communities to understand recurring product-building problems among indie builders, technical founders, SaaS makers, and early-stage builders.

Use case:
- Search public posts/comments in selected subreddits.
- Read public discussion threads.
- Extract evidence cards: source URL, claim, pain signal, user segment, date, and short cited excerpt.
- Use aggregated findings to decide whether a product idea should be built, tested, narrowed, or killed.

What the app will NOT do:
- No posting, voting, messaging, moderation, or user automation.
- No spam, growth automation, or subreddit manipulation.
- No resale of raw Reddit data.
- No AI/ML model training on Reddit user content.
- No user profiling or deanonymization.

Expected usage:
- Low-volume research only.
- Selected subreddits such as r/SaaS, r/SideProject, r/indiehackers, r/startups, r/Entrepreneur, r/ProductManagement, r/nocode, r/solopreneur, and r/ArtificialInteligence.
- Results will be used internally as cited market research evidence.
```

### 2. If approved, create/register the app

Go to:

https://www.reddit.com/prefs/apps

Use a script or web app depending on what Reddit approval allows.

Suggested app name:

`AI PM Research`

Suggested redirect URI:

`http://localhost:3000/callback`

For our research scripts, store credentials only in local environment variables:

```bash
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
REDDIT_USERNAME=...
REDDIT_PASSWORD=...
REDDIT_USER_AGENT="script:ai-pm-research:v0.1 (by /u/YOUR_USERNAME)"
```

Do not commit credentials.

### 3. Request token

For script-style local research, the common token request shape is:

```bash
curl -X POST https://www.reddit.com/api/v1/access_token \
  -A "$REDDIT_USER_AGENT" \
  -u "$REDDIT_CLIENT_ID:$REDDIT_CLIENT_SECRET" \
  -d "grant_type=password&username=$REDDIT_USERNAME&password=$REDDIT_PASSWORD"
```

Use returned `access_token` with:

```text
Authorization: Bearer <access_token>
User-Agent: script:ai-pm-research:v0.1 (by /u/YOUR_USERNAME)
```

Base API host:

```text
https://oauth.reddit.com
```

## Useful Endpoints

### Search a subreddit

```text
GET https://oauth.reddit.com/r/{subreddit}/search
```

Params:

```text
q=<query>
restrict_sr=1
sort=relevance|new|top|comments
t=day|week|month|year|all
limit=25
raw_json=1
```

### Read a thread and comments

```text
GET https://oauth.reddit.com/r/{subreddit}/comments/{article_id}
```

Params:

```text
limit=100
depth=4
raw_json=1
```

### Listing pagination

Reddit listing endpoints use:

```text
after, before, limit, count
```

No page numbers.

## Research Queries

Use subreddit-specific searches first.

High-value subreddits:

- `r/SaaS`
- `r/SideProject`
- `r/indiehackers`
- `r/startups`
- `r/Entrepreneur`
- `r/ProductManagement`
- `r/nocode`
- `r/solopreneur`
- `r/microsaas`
- `r/ArtificialInteligence`

Seed queries:

- `"built but nobody uses it"`
- `"no one uses my app"`
- `"how do I validate"`
- `"should I build"`
- `"landing page feedback"`
- `"pricing feedback"`
- `"what should I build"`
- `"idea validation"`
- `"can't find users"`
- `"MVP feedback"`
- `"SaaS idea"`
- `"AI app no users"`
- `"Cursor build product"`
- `"vibe coding startup"`
- `"product manager AI"`

## Evidence We Want

| Signal | Why it matters |
|---|---|
| Repeated complaints | Strong scenario source |
| Failed launches | Shows real workflow breakdown |
| Pricing confusion | WTP/risk signal |
| Manual workaround | Stronger than opinion |
| Paid tool alternatives | Competitor/payment proxy |
| Comments arguing against idea | Contradictory evidence |
| Upvotes/comments | Attention only; weak unless paired with behavior |

## Fallback While Approval Is Pending

Use web search with source filtering:

```text
site:reddit.com/r/SaaS "built but nobody uses it"
site:reddit.com/r/SideProject "how do I validate"
site:reddit.com/r/startups "landing page feedback"
site:reddit.com/r/indiehackers "no users"
```

This is enough for early scenario discovery, but less scalable and less complete than API access.

## How It Feeds Our Specs

- `02_user_scenarios.md`: real scenario clusters and quotes.
- `05_evidence_model.md`: complaint and discussion evidence cards.
- `06_decision_policy.md`: when social complaint evidence is enough for `test`, not `build`.
- Landing page validation: wording pulled from actual posts/comments.

## Decision

Reddit is high-value but not instantly available. Start access request now, and use fallback web search until approval. Do not rely on unofficial scraping or third-party MCP until token handling and Reddit terms are reviewed.
