import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { blogPosts, blogExcerpt } from '../src/lib/blog';
import { travelNewsItems } from '../src/lib/content/travel-news';
import { closeDb, getDb } from '../src/lib/db';
import { seedEntityRegistryFromTreks } from '../src/lib/knowledge/entity-registry';
import {
  computeReadingTimeMin,
  resolvePostIdsBySlugs,
  upsertAuthor,
} from '../src/lib/knowledge/posts';
import type { CreatePostInput, EntityLinkRole, EntityType } from '../src/lib/knowledge/types';
import { eq, sql } from 'drizzle-orm';
import { schema } from '../src/lib/db';

const { posts, postTags, postEntityLinks, categories, postCategories, postRelatedBlogs } = schema;

type SeedLink = {
  entityType: EntityType;
  entityId: string;
  role: EntityLinkRole;
};

type SeedPost = CreatePostInput & {
  entityLinks?: SeedLink[];
  categorySlug?: string;
  relatedSlugs?: string[];
};

const DEFAULT_AUTHOR = {
  slug: 'indian-treks-team',
  name: 'Indian Treks Team',
  role: 'editor',
};

const CATEGORY_SEEDS = [
  { slug: 'treks', name: 'Treks', description: 'Trekking guides and tips' },
  { slug: 'destinations', name: 'Destinations', description: 'Regional travel content' },
  { slug: 'travel-news', name: 'Travel News', description: 'Policy and industry updates' },
];

function travelNewsBody(item: (typeof travelNewsItems)[number]): string {
  return `${item.summary}

This update is part of our Travel News & Facts series — quick reads on policy changes, destination developments, and travel advisories relevant to Himalayan and India travel. For trek planning help, explore our [blog guides](/blog) or [contact our team](/contact).`;
}

function blogSeedPosts(): SeedPost[] {
  return blogPosts.map((post) => {
    const entityLinks: SeedLink[] = [];

    if (post.treks?.length) {
      const [primary, ...related] = post.treks;
      entityLinks.push({ entityType: 'trek', entityId: primary, role: 'primary' });
      for (const trekId of related) {
        entityLinks.push({ entityType: 'trek', entityId: trekId, role: 'related' });
      }
    } else if (post.regions?.[0]) {
      entityLinks.push({
        entityType: 'region',
        entityId: post.regions[0],
        role: 'primary',
      });
    }

    const relatedSlugs: string[] = [];
    if (post.slug === 'valley-of-flowers-guide') {
      relatedSlugs.push('first-himalayan-trek', 'best-places-india-july');
    }
    if (post.slug === 'family-trekking-in-india') {
      relatedSlugs.push('first-himalayan-trek', 'group-travel-himalayas');
    }

    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.description ?? blogExcerpt(post.content, 220),
      content: post.content,
      contentFormat: 'markdown',
      status: 'published',
      contentType: 'guide',
      section: 'blog',
      featuredImageUrl: post.image,
      seoTitle: post.seoTitle ?? post.title,
      seoDescription: post.description ?? blogExcerpt(post.content, 160),
      publishedAt: `${post.publishedAt}T09:00:00.000Z`,
      tags: [
        ...(post.types ?? []),
        ...(post.regions ?? []),
        ...(post.keywords ?? []).slice(0, 8),
      ],
      entityLinks,
      categorySlug: 'treks',
      relatedSlugs,
    };
  });
}

function travelNewsSeedPosts(): SeedPost[] {
  const linkMap: Record<string, SeedLink[]> = {
    'butter-festival-dayara-bugyal': [
      { entityType: 'trek', entityId: 'dayara-bugyal', role: 'primary' },
    ],
    'indian-treks-winter-departures-2026': [
      { entityType: 'trek', entityId: 'kedarkantha', role: 'related' },
      { entityType: 'trek', entityId: 'kuari-pass', role: 'related' },
      { entityType: 'trek', entityId: 'chopta-tungnath', role: 'related' },
    ],
    'char-dham-kedarnath-yatra-2026': [
      { entityType: 'yatra', entityId: 'kedarnath-yatra', role: 'primary' },
    ],
    'maharashtra-adventure-tourism-policy': [
      { entityType: 'region', entityId: 'himachal', role: 'mentions' },
    ],
  };

  return travelNewsItems.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.summary,
    content: travelNewsBody(item),
    contentFormat: 'markdown',
    status: 'published' as const,
    contentType: 'news_update' as const,
    section: 'travel_news' as const,
    featuredImageUrl: item.image,
    seoTitle: item.title,
    seoDescription: item.summary,
    publishedAt: `${item.publishedAt}T09:00:00.000Z`,
    tags: [item.tag.toLowerCase().replace(/\s+/g, '-')],
    entityLinks: linkMap[item.slug] ?? [],
    categorySlug: 'travel-news',
  }));
}

async function upsertCategory(slug: string, name: string, description?: string) {
  const db = getDb();
  if (!db) throw new Error('DATABASE_URL is not configured');

  const [row] = await db
    .insert(categories)
    .values({ slug, name, description })
    .onConflictDoUpdate({
      target: categories.slug,
      set: {
        name: sql`excluded.name`,
        description: sql`excluded.description`,
      },
    })
    .returning({ id: categories.id });

  return row.id;
}

async function upsertSeedPost(authorId: string, seed: SeedPost) {
  const db = getDb();
  if (!db) throw new Error('DATABASE_URL is not configured');

  const publishedAt = seed.publishedAt ? new Date(seed.publishedAt) : new Date();
  const primaryLink = seed.entityLinks?.find((link) => link.role === 'primary');

  const [row] = await db
    .insert(posts)
    .values({
      slug: seed.slug,
      title: seed.title,
      excerpt: seed.excerpt ?? null,
      content: seed.content,
      contentFormat: seed.contentFormat ?? 'markdown',
      status: seed.status ?? 'published',
      contentType: seed.contentType,
      section: seed.section ?? 'blog',
      authorId,
      featuredImageUrl: seed.featuredImageUrl ?? null,
      readingTimeMin: computeReadingTimeMin(seed.content),
      primaryEntityType: primaryLink?.entityType ?? seed.primaryEntityType ?? null,
      primaryEntityId: primaryLink?.entityId ?? seed.primaryEntityId ?? null,
      seoTitle: seed.seoTitle ?? seed.title,
      seoDescription: seed.seoDescription ?? seed.excerpt ?? null,
      publishedAt,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: posts.slug,
      set: {
        title: sql`excluded.title`,
        excerpt: sql`excluded.excerpt`,
        content: sql`excluded.content`,
        contentFormat: sql`excluded.content_format`,
        status: sql`excluded.status`,
        contentType: sql`excluded.content_type`,
        section: sql`excluded.section`,
        authorId: sql`excluded.author_id`,
        featuredImageUrl: sql`excluded.featured_image_url`,
        readingTimeMin: sql`excluded.reading_time_min`,
        primaryEntityType: sql`excluded.primary_entity_type`,
        primaryEntityId: sql`excluded.primary_entity_id`,
        seoTitle: sql`excluded.seo_title`,
        seoDescription: sql`excluded.seo_description`,
        publishedAt: sql`excluded.published_at`,
        updatedAt: sql`now()`,
      },
    })
    .returning({ id: posts.id });

  await db.delete(postTags).where(eq(postTags.postId, row.id));
  await db.delete(postEntityLinks).where(eq(postEntityLinks.postId, row.id));
  await db.delete(postCategories).where(eq(postCategories.postId, row.id));
  await db.delete(postRelatedBlogs).where(eq(postRelatedBlogs.postId, row.id));

  const tags = [...new Set((seed.tags ?? []).map((tag) => tag.trim().toLowerCase()).filter(Boolean))];
  if (tags.length > 0) {
    await db.insert(postTags).values(tags.map((tag) => ({ postId: row.id, tag })));
  }

  if (seed.entityLinks?.length) {
    await db.insert(postEntityLinks).values(
      seed.entityLinks.map((link, index) => ({
        postId: row.id,
        entityType: link.entityType,
        entityId: link.entityId,
        role: link.role,
        sortOrder: index,
      })),
    );
  }

  if (seed.categorySlug) {
    const categoryId = await upsertCategory(
      seed.categorySlug,
      CATEGORY_SEEDS.find((c) => c.slug === seed.categorySlug)?.name ?? seed.categorySlug,
      CATEGORY_SEEDS.find((c) => c.slug === seed.categorySlug)?.description,
    );
    await db.insert(postCategories).values({ postId: row.id, categoryId });
  }

  return { id: row.id, relatedSlugs: seed.relatedSlugs ?? [] };
}

async function main() {
  if (!getDb()) {
    console.error('DATABASE_URL is not configured.');
    process.exit(1);
  }

  for (const category of CATEGORY_SEEDS) {
    await upsertCategory(category.slug, category.name, category.description);
  }

  const registryCount = await seedEntityRegistryFromTreks();
  const authorId = await upsertAuthor(DEFAULT_AUTHOR);

  const seeds = [...blogSeedPosts(), ...travelNewsSeedPosts()];
  const relatedMap: Array<{ postId: string; relatedSlugs: string[] }> = [];

  for (const seed of seeds) {
    const result = await upsertSeedPost(authorId, seed);
    if (result.relatedSlugs.length > 0) {
      relatedMap.push({ postId: result.id, relatedSlugs: result.relatedSlugs });
    }
  }

  for (const entry of relatedMap) {
    const relatedIds = await resolvePostIdsBySlugs(entry.relatedSlugs);
    if (relatedIds.length === 0) continue;

    const db = getDb();
    if (!db) continue;

    await db.delete(postRelatedBlogs).where(eq(postRelatedBlogs.postId, entry.postId));
    await db.insert(postRelatedBlogs).values(
      relatedIds.map((relatedPostId, index) => ({
        postId: entry.postId,
        relatedPostId,
        sortOrder: index,
      })),
    );
  }

  console.log(
    `Seeded ${registryCount} registry entities, ${seeds.length} posts, ${relatedMap.length} related-link sets, 1 author.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await closeDb();
  });
