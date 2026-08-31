# New Phase 5 — SEO + AEO + GEO + Structured Data (Complete)

**Date:** August 31, 2026  
**Status:** ✅ Complete  
**Build:** `npm run build` passes (178 routes — includes `/sitemap.xml` and `/robots.txt`)

---

## Objective

Build a technically strong search and discovery foundation for the Travel Knowledge Platform — metadata, crawlability, structured data, breadcrumbs, and geographic entity linking — without fake reviews, ratings, or FAQ schema.

---

## What Changed

### 1. Site configuration (`src/lib/site.ts`)

- `SITE_URL` from `NEXT_PUBLIC_SITE_URL` (defaults to `https://www.indiantreks.in`)
- Organization constants with real Cloudinary wordmark
- `absoluteUrl()` helper for canonical and JSON-LD URLs

### 2. SEO utilities

| File | Purpose |
|------|---------|
| `src/lib/seo/metadata.ts` | `buildPageMetadata()` — title, description, canonical, robots, Open Graph, Twitter |
| `src/lib/seo/json-ld.ts` | Organization, WebSite, BreadcrumbList, BlogPosting/NewsArticle builders |
| `src/lib/seo/regions.ts` | Display labels for region entity IDs (GEO linking) |

### 3. Crawlability

| Route | Behavior |
|-------|----------|
| `/sitemap.xml` | Static pages, all blog slugs, travel news slugs, trek detail URLs |
| `/robots.txt` | Allow `/`, disallow `/admin-360f71bc8e5da924/` and `/api/admin/` |

### 4. Root layout SEO

- `metadataBase` set to production origin
- Default Open Graph + Twitter card metadata
- Global `Organization` + `WebSite` JSON-LD on every page

### 5. Blog article SEO

**`/blog/[slug]`**
- Rich `generateMetadata` (canonical, robots, OG image, article times, tags)
- `BlogPosting` + `BreadcrumbList` JSON-LD
- Visible breadcrumbs (Home → Blog → Article)
- `BlogEntityLinks` — contextual links to linked treks and regions
- Hero image uses post title as `alt` text

**`/blog/news/[slug]`**
- Same metadata pattern with `NewsArticle` schema
- Four-level breadcrumbs (Home → Blog → Travel News → Article)

**`/blog` and `/blog/news`**
- Metadata via `buildPageMetadata`
- Entity-filtered index: `/blog?entity=trek:kedarkantha` or `/blog?entity=region:uttarakhand`

### 6. GEO internal linking

`BlogEntityLinks` on article pages links to:
- **Treks** → canonical trek detail URL
- **Regions** → filtered blog index (`/blog?entity=region:{id}`)

No artificial location doorway pages were created.

### 7. Data layer extensions

- `BlogPost` type extended with `canonicalUrl`, `updatedAt`, `robots`, `categories`
- `KnowledgePost` includes `robots` from DB
- Adapter maps SEO fields from published posts
- `fetchPublishedBlogPostsByEntity()` for entity-filtered blog index

### 8. Components

| Component | Role |
|-----------|------|
| `src/components/seo/JsonLd.tsx` | Renders `application/ld+json` scripts |
| `src/components/seo/Breadcrumbs.tsx` | Accessible visible breadcrumb nav |
| `src/components/blog/BlogEntityLinks.tsx` | GEO entity link block on articles |

---

## Structured Data Policy (Phase 5)

**Included (visible content supports it):**
- Organization
- WebSite
- BlogPosting (blog articles)
- NewsArticle (travel news)
- BreadcrumbList
- Person (author name only — no fabricated profiles)

**Explicitly excluded:**
- AggregateRating / Review schema
- FAQPage (no visible FAQ blocks on blog yet — Phase 6)
- Fake author credentials or first-hand experience claims

---

## Environment

Add to `.env.local` for production canonical URLs:

```bash
NEXT_PUBLIC_SITE_URL=https://www.indiantreks.in
```

Documented in `.env.example`.

---

## Verification Checklist

```bash
npm run build   # ✅ 178 routes

# Manual checks:
# 1. View page source on /blog/[slug] — BlogPosting + BreadcrumbList JSON-LD present
# 2. /robots.txt disallows admin paths
# 3. /sitemap.xml lists blog posts and treks
# 4. OG tags present in <head> for blog articles
# 5. Entity links appear when post has trek/region relationships
# 6. /blog?entity=region:uttarakhand filters posts (static or DB)
```

---

## Files Created

- `src/lib/site.ts`
- `src/lib/seo/metadata.ts`
- `src/lib/seo/json-ld.ts`
- `src/lib/seo/regions.ts`
- `src/components/seo/JsonLd.tsx`
- `src/components/seo/Breadcrumbs.tsx`
- `src/components/blog/BlogEntityLinks.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `docs/phase-5-seo-complete.md`

## Files Modified

- `src/app/layout.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/blog/news/page.tsx`
- `src/app/blog/news/[slug]/page.tsx`
- `src/components/BlogPostPageView.tsx`
- `src/components/blog/BlogPageView.tsx`
- `src/components/blog/blog-page.css`
- `src/lib/blog.ts`
- `src/lib/knowledge/types.ts`
- `src/lib/knowledge/posts.ts`
- `src/lib/knowledge/adapter.ts`
- `.env.example`

---

## Not in Scope (Phase 6+)

- Quick Answer / Key Facts / FAQ blocks (AEO content — Phase 6)
- Author bio pages and reviewer schema
- Destination hub pages (`/destinations/[id]`)
- Trek page `generateMetadata` overhaul
- Full-text search API
- Removing static content fallback entirely

---

## STOP — New Phase 5 Complete

Approve **New Phase 6** (Content Authority + Sources + Freshness + Topic Intelligence) to add author/source systems, content health, and topic clusters.
