# New Phase 6 — Content Authority + Sources + Freshness + Topic Intelligence (Complete)

**Date:** August 31, 2026  
**Status:** ✅ Complete  
**Build:** `npm run build` passes (178 routes)

---

## Objective

Turn the blog system from a publishing database into a trustworthy travel knowledge layer — with author/reviewer attribution, cited sources, AEO blocks, content health tracking, topic gap hints, and cannibalization warnings. No fabricated facts, sources, or auto-generated content.

---

## What Changed

### 1. Database migration (`0002_content_authority.sql`)

| Table | Purpose |
|-------|---------|
| `sources` | Reusable source records (title, URL, type, accessed date) |
| `post_sources` | Post ↔ source links with claim + verified date |
| `post_faqs` | Visible FAQ blocks per post |
| `topic_clusters` | Entity-scoped cluster scaffold |
| `cluster_members` | Pillar/supporting post membership |

Existing `post_quick_answers` from Phase 2 is now read/written by the authority layer.

**Apply migration:**
```bash
npm run db:migrate
```

### 2. Knowledge layer

| Module | Purpose |
|--------|---------|
| `src/lib/knowledge/authority.ts` | Load/save quick answers, sources, FAQs |
| `src/lib/knowledge/content-health.ts` | Effective health computation, badge helpers |
| `src/lib/knowledge/topic-intelligence.ts` | Topic gap analysis, cannibalization hints |

**Extended `KnowledgePost` with:**
- `healthStatus`, `lastFactCheckedAt`, `expertReviewed`, `contentFreshness`
- `reviewer`, `quickAnswer`, `sources[]`, `faqs[]`

**Content health states:** `healthy` | `needs_review` | `outdated` | `archived`

Auto-outdated rule: non-evergreen content without fact-check within 180 days → `outdated`.

### 3. Admin editorial workflow

**Extended blog editor:**
- Content health fields (status, freshness, last fact-checked, reviewer, expert reviewed)
- Quick answer + key facts (AEO)
- Sources with type, URL, claim, verification date
- FAQ question/answer blocks

**Content insights panel (read-only):**
- **Cannibalization hints** — title/slug similarity vs other posts (suggest review/merge, never auto-merge)
- **Topic cluster gaps** — standard trek topics (cost, difficulty, weather, etc.) vs existing entity posts

**Post list:**
- Health column with color badges
- Filter by health status

### 4. Storefront

**`BlogAuthorityPanel`** on blog articles when DB content exists:
- Quick answer + key facts
- Author bio + reviewer line
- Expandable FAQs
- Sources with verification dates
- “Facts last checked” footnote

**FAQ JSON-LD** (`FAQPage`) emitted only when visible FAQs exist on the article.

Static fallback posts (no DB) show no authority panel — unchanged behavior.

---

## Source Types Supported

- `official_government`
- `tourism_board`
- `forest_department`
- `academic`
- `weather`
- `first_hand_internal`
- `other`

---

## Topic Intelligence (Read-Only)

For trek/trip/yatra primary entities, the admin editor suggests gaps across:

Cost · Difficulty · Best time · Weather · Packing · Itinerary · Safety · How to reach · Beginner guide

Coverage is detected from post titles, tags, and content — **gaps are suggestions only**, not auto-created articles.

---

## Cannibalization Policy

Similarity uses token overlap (Jaccard) on slug + title. Same-primary-entity posts get a boost. Threshold: 55%+. Suggestions: `review` or `merge`. **Never automatic merge or redirect.**

---

## Files Created

- `drizzle/migrations/0002_content_authority.sql`
- `src/lib/db/schema/authority.ts`
- `src/lib/knowledge/authority.ts`
- `src/lib/knowledge/content-health.ts`
- `src/lib/knowledge/topic-intelligence.ts`
- `src/components/admin/blog/AdminAuthorityFields.tsx`
- `src/components/admin/blog/AdminContentInsights.tsx`
- `src/components/blog/BlogAuthorityPanel.tsx`
- `docs/phase-6-content-authority-complete.md`

## Files Modified

- `src/lib/knowledge/types.ts`
- `src/lib/knowledge/posts.ts`
- `src/lib/knowledge/adapter.ts`
- `src/lib/knowledge/index.ts`
- `src/lib/admin/blog-api.ts`
- `src/lib/blog.ts`
- `src/lib/seo/json-ld.ts`
- `src/components/admin/blog/AdminBlogEditor.tsx`
- `src/app/admin-360f71bc8e5da924/blog/page.tsx`
- `src/components/BlogPostPageView.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/components/blog/blog-page.css`
- `src/lib/db/schema/index.ts`

---

## Verification

```bash
npm run db:migrate
npm run build   # ✅

# Manual:
# 1. Edit a post in admin — add quick answer, source, FAQ
# 2. Set last fact-checked date, assign reviewer
# 3. Publish → verify BlogAuthorityPanel on storefront
# 4. Check FAQ JSON-LD in page source when FAQs exist
# 5. Create similar-title posts → cannibalization hint in editor
# 6. Link post to trek → topic gap list in editor
```

---

## Not in Scope (Phase 7)

- AI editorial assistant
- Analytics / Search Console integration
- Automatic content rewrite or merge
- Author profile pages
- `post_author_experience` first-hand field notes table
- Full topic cluster admin CRUD UI
- Scale testing at 1,000+ posts

---

## STOP — New Phase 6 Complete

Approve **New Phase 7** (AI + Analytics + Performance + Security + Final Hardening) for production readiness.
