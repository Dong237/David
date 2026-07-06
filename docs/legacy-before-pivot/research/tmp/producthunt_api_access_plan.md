# Product Hunt API Access Plan

Temporary note for future evidence mining. Do not commit secrets here.

Date: 2026-06-21

Source docs:

- API docs: https://api.producthunt.com/v2/docs
- GraphQL reference: https://api-v2-docs.producthunt.com/
- Product Hunt API starter repo: https://github.com/producthunt/producthunt-api

## Current Status

We have enough to use Product Hunt for official research evidence collection.

| Item | Status |
|---|---|
| Developer token | User has obtained one. Do not store it in Markdown. |
| Auth | `Authorization: Bearer <token>` |
| Endpoint | `https://api.producthunt.com/v2/api/graphql` |
| API style | GraphQL only. |
| Official skill/MCP | Not shown in Product Hunt's official API docs. |
| Third-party MCP/skills | Exist, but should be evaluated separately before installing. |

Docs say a developer token is provided for simple scripts and does not expire. Public API use is still subject to non-commercial/fair-use limits.

## Secret Handling

Use local environment variable:

```bash
PRODUCTHUNT_DEVELOPER_TOKEN=...
```

Do not store the token in Markdown, source files, screenshots, or logs.

## What Product Hunt Can Give Us

Useful evidence fields:

| Object | Useful Fields |
|---|---|
| `Post` | `id`, `name`, `tagline`, `description`, `url`, `website`, `createdAt`, `featuredAt`, `votesCount`, `commentsCount`, `reviewsCount`, `reviewsRating`, ranks |
| `comments` connection | `body`, `createdAt`, `votesCount`, `url`, `user` |
| `topics` connection | topic labels for product category clustering |
| `posts` query | posts by date/topic/featured/order |
| `post` query | post by `id` or `slug` |

Important limitation: Product Hunt API is good for product-launch evidence and community feedback, but not full free-text web search. For search-like workflows, use topic/date slices or known slugs/URLs.

## Minimal GraphQL Query

Fetch recent featured launches:

```graphql
query RecentPosts($first: Int!, $after: String) {
  posts(first: $first, after: $after, featured: true) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      name
      slug
      tagline
      description
      url
      website
      createdAt
      featuredAt
      votesCount
      commentsCount
      reviewsCount
      reviewsRating
      dailyRank
      weeklyRank
      topics(first: 5) {
        nodes {
          name
          slug
        }
      }
    }
  }
}
```

Fetch one post and comments:

```graphql
query PostWithComments($slug: String!) {
  post(slug: $slug) {
    id
    name
    tagline
    description
    url
    website
    votesCount
    commentsCount
    reviewsCount
    reviewsRating
    comments(first: 50) {
      nodes {
        id
        body
        createdAt
        votesCount
        url
        user {
          name
          username
        }
      }
    }
  }
}
```

## Minimal Curl Template

```bash
curl 'https://api.producthunt.com/v2/api/graphql' \
  -H "Authorization: Bearer $PRODUCTHUNT_DEVELOPER_TOKEN" \
  -H 'Content-Type: application/json' \
  --data '{"query":"query { posts(first: 5, featured: true) { nodes { id name tagline url votesCount commentsCount } } }"}'
```

## Research Collector Strategy

Goal: strengthen Product Hunt evidence for user scenarios.

Start with:

1. Recent AI/devtool/productivity launches by date/topic.
2. Known validation/PM/landing-page tools by slug.
3. Posts with high comment counts and low or mixed review signals.
4. Comments where makers/users discuss:
   - validation
   - no users
   - GTM
   - pricing
   - landing page clarity
   - pivot
   - vibe coding / no-code / AI builder failure

Convert results to Evidence Cards:

| Field | Source |
|---|---|
| source_type | `review`, `complaint`, `competitor`, or `waitlist_or_like` |
| source_name | Product Hunt |
| source_url | post/comment URL |
| observed_at | `createdAt` / `featuredAt` |
| extracted_claim | narrow PM claim supported by product/comment |
| pain_phrase | comment body if complaint-like |
| wtp_hint | paid plan, pricing page, paid product, review, or none |
| confidence | based on relevance, recency, comment depth, and contradiction |

## Skill/MCP Notes

Product Hunt official docs mention GraphQL, OAuth, API explorer, and third-party APIs/SDKs, but do not provide an official MCP server or Codex-style Skill.

Public third-party options found:

- `jaipandya/producthunt-mcp-server`
- Product Hunt Claude Code skill listings in external marketplaces

Recommendation:

- Use direct GraphQL first.
- Only install third-party MCP after reviewing code and token handling.
- Do not put the developer token into unreviewed third-party MCP configs.

## What This Does Not Give Us

- Not full Product Hunt text search.
- Not X/Twitter, XHS, Jike, or Zhihu evidence.
- Not payment proof for our AI PM product.
- Not commercial reuse permission.

It is enough for structured Product Hunt launch/comment/review evidence mining.
