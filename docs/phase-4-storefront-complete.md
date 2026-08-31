# Phase 4 — Storefront + Content Distribution (Complete)

**Date:** August 31, 2026  
**Status:** ✅ Complete  
**Build:** `npm run build` passes (176 routes)

---

## Goal

Connect the public storefront to the knowledge database:

```
ADMIN → PUBLISH → DATABASE → API/Adapter → STOREFRONT
```

Published content from admin now renders on blog pages, travel news, trek detail sidebars, and the homepage — with static fallback when `DATABASE_URL` is unset or the DB has no published rows.

---

## What Changed

### 1. Storefront adapter (`src/lib/knowledge/adapter.ts`)

Extended the adapter layer with:

| Function | Purpose |
|----------|---------|
| `fetchPublishedBlogPost(slug)` | Single blog post (DB → static) |
| `fetchPublishedBlogPosts({ limit, offset })` | Paginated blog index |
| `fetchPublishedTravelNewsPost(slug)` | Single travel news item |
| `fetchPublishedTravelNews({ limit, offset })` | Paginated travel news index |
| `fetchAllPublishedBlogSlugs()` | `generateStaticParams` for `/blog/[slug]` |
| `fetchAllPublishedTravelNewsSlugs()` | `generateStaticParams` for `/blog/news/[slug]` |
| `fetchRelatedBlogPosts(subject, count)` | Entity-linked related blogs for trek pages |
| `fetchHomeFeaturedPosts(limit)` | Homepage blog teasers |
| `knowledgePostToBlogPost(post)` | DB → storefront `BlogPost` shape |

**Caching:** List queries use `unstable_cache` with tag `knowledge:posts` (300s revalidate). Admin publish/archive already calls `revalidatePostSurfaces()` from Phase 1.

**Related posts policy:** When DB is configured, trek pages show only entity-linked posts — no unrelated “latest blogs” filler. Static heuristic fallback applies only when DB is unavailable.

---

### 2. Blog pages (server-driven)

| Route | Change |
|-------|--------|
| `/blog` | Async server page; fetches paginated posts; `?page=` pagination |
| `/blog/[slug]` | Fetches post + recent sidebar posts from adapter |
| `/blog/layout.tsx` | Async layout; passes search index to `BlogHeader` |
| `/blog/news` | Fetches travel news + recent blog posts |
| `/blog/news/[slug]` | Fetches news article; supports markdown from DB |

All blog routes export `revalidate = 300` (5-minute ISR).

---

### 3. Components updated to accept server props

| Component | Before | After |
|-----------|--------|-------|
| `BlogPageView` | Read `blogPosts[]` statically | Accepts `posts`, `total`, `page`, `pageSize` |
| `BlogPostPageView` | Sidebar from static `blogPosts` | Accepts `recentPosts` prop |
| `BlogNewsPageView` | Read `travelNewsItems` statically | Accepts `items`, pagination, `recentPosts` |
| `BlogHeader` | Search over static posts | Accepts optional `searchPosts` from layout |
| `Blog` (homepage) | Read `HOME_FEATURED_BLOG_POSTS` | Accepts `posts` from server fetch |

Empty states added for blog index and travel news when no content is available.

---

### 4. Entity placement — trek / trip / yatra pages

| Route | Change |
|-------|--------|
| `/treks/[id]` | Server-fetches `fetchRelatedBlogPosts(trek, 3)` |
| `/trips/[id]` | Same |
| `/yatra/[id]` | Same |

`TrekDetailContent` accepts optional `relatedBlogPosts` prop; falls back to static `getRelatedPosts()` only when DB is unavailable.

---

### 5. Homepage

`src/app/page.tsx` is now async and calls `fetchHomeFeaturedPosts(4)` before rendering the `<Blog />` section.

---

## Data Flow

```
┌─────────────┐     publish      ┌──────────────┐
│ Admin Blog  │ ───────────────► │  PostgreSQL  │
│  (Phase 3)  │                  │   (posts)    │
└─────────────┘                  └──────┬───────┘
                                        │
                              getPublishedPosts*
                                        │
                                        ▼
                              ┌─────────────────┐
                              │    adapter.ts   │
                              │  (cache + map)  │
                              └────────┬────────┘
                                       │
           ┌───────────────────────────┼───────────────────────────┐
           ▼                           ▼                           ▼
      /blog pages              trek detail sidebar            homepage Blog
```

---

## Fallback Behavior

| Condition | Storefront behavior |
|-----------|---------------------|
| `DATABASE_URL` unset | Static content from `blog.ts` + `travel-news.ts` |
| DB configured, 0 published rows | Falls back to static (same as above) |
| DB configured, published rows exist | DB content only (trek related: entity-linked only, may be empty) |

This preserves local dev without a database while ensuring production uses published DB content once seeded.

---

## Files Touched

**Adapter / lib**
- `src/lib/knowledge/adapter.ts`

**Blog routes**
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/blog/layout.tsx`
- `src/app/blog/news/page.tsx`
- `src/app/blog/news/[slug]/page.tsx`

**Storefront components**
- `src/components/blog/BlogPageView.tsx`
- `src/components/blog/BlogNewsPageView.tsx`
- `src/components/blog/BlogHeader.tsx`
- `src/components/BlogPostPageView.tsx`
- `src/components/Blog.tsx`
- `src/components/TrekDetailContent.tsx`

**Entity pages**
- `src/app/treks/[id]/page.tsx`
- `src/app/trips/[id]/page.tsx`
- `src/app/yatra/[id]/page.tsx`

**Homepage**
- `src/app/page.tsx`

**Minor fix (build)**
- `src/components/admin/blog/AdminBlogEditor.tsx` — missing `RegistryEntity` import

---

## Verification

```bash
# With DATABASE_URL set:
npm run db:migrate
npm run db:seed
npm run db:verify
npm run build   # ✅ 176 routes

# Manual checks:
# 1. Publish a post in admin → appears on /blog within revalidate window
# 2. Link post to a trek → appears in trek detail sidebar
# 3. Unset DATABASE_URL → static content still renders
# 4. Admin "View Live" URL matches storefront content (when DB configured)
```

---

## Not in Scope (Phase 5+)

- Public REST API consumption by external clients (`/api/public/posts` exists but storefront uses adapter directly)
- Removing static fallback entirely
- Category/tag archive pages
- Full-text search API (header search uses in-memory post list from layout)
- Destination / safety topic blog placement surfaces

---

## Next Phase

**Phase 5** — Entity registry expansion, destination/safety surfaces, and removing static shim where appropriate.
