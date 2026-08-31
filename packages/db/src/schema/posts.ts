import {
  boolean,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { authors } from './authors';

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  contentFormat: text('content_format').notNull().default('markdown'),

  status: text('status').notNull(),
  contentType: text('content_type').notNull(),
  section: text('section').notNull().default('blog'),

  authorId: uuid('author_id').references(() => authors.id),
  reviewerId: uuid('reviewer_id').references(() => authors.id),

  featuredImageUrl: text('featured_image_url'),
  readingTimeMin: integer('reading_time_min'),

  primaryEntityType: text('primary_entity_type'),
  primaryEntityId: text('primary_entity_id'),

  searchIntent: text('search_intent'),
  experienceLevel: text('experience_level'),
  sourceType: text('source_type'),
  expertReviewed: boolean('expert_reviewed').notNull().default(false),
  contentFreshness: text('content_freshness').notNull().default('evergreen'),

  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  lastFactCheckedAt: timestamp('last_fact_checked_at', { withTimezone: true }),

  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  canonicalUrl: text('canonical_url'),
  ogTitle: text('og_title'),
  ogDescription: text('og_description'),
  ogImageUrl: text('og_image_url'),
  robots: text('robots').notNull().default('index,follow'),

  editorialPriority: integer('editorial_priority').notNull().default(0),
  healthStatus: text('health_status').notNull().default('healthy'),
  archivedAt: timestamp('archived_at', { withTimezone: true }),
});

export const postEntityLinks = pgTable('post_entity_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  role: text('role').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const postTags = pgTable(
  'post_tags',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    tag: text('tag').notNull(),
  },
  (table) => [primaryKey({ columns: [table.postId, table.tag] })],
);

/** AEO scaffold — populated in Phase 6+. */
export const postQuickAnswers = pgTable('post_quick_answers', {
  postId: uuid('post_id')
    .primaryKey()
    .references(() => posts.id, { onDelete: 'cascade' }),
  quickAnswer: text('quick_answer'),
  keyFacts: jsonb('key_facts'),
  bestTime: text('best_time'),
  duration: text('duration'),
  difficulty: text('difficulty'),
  altitude: text('altitude'),
  location: text('location'),
  startingPoint: text('starting_point'),
  estimatedCost: text('estimated_cost'),
  whoItIsFor: text('who_it_is_for'),
  safetyNote: text('safety_note'),
  display: boolean('display').notNull().default(true),
});
