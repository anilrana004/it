import { date, integer, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts';

export const sources = pgTable('sources', {
  id: uuid('id').primaryKey().defaultRandom(),
  sourceTitle: text('source_title').notNull(),
  sourceUrl: text('source_url'),
  sourceType: text('source_type').notNull(),
  accessedAt: date('accessed_at'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const postSources = pgTable(
  'post_sources',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    sourceId: uuid('source_id')
      .notNull()
      .references(() => sources.id, { onDelete: 'cascade' }),
    claim: text('claim'),
    verifiedAt: date('verified_at'),
  },
  (table) => [primaryKey({ columns: [table.postId, table.sourceId] })],
);

export const postFaqs = pgTable('post_faqs', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  sortOrder: integer('sort_order').notNull().default(0),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
});

export const topicClusters = pgTable('topic_clusters', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  pillarPostId: uuid('pillar_post_id').references(() => posts.id, { onDelete: 'set null' }),
  primaryEntityType: text('primary_entity_type').notNull(),
  primaryEntityId: text('primary_entity_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const clusterMembers = pgTable(
  'cluster_members',
  {
    clusterId: uuid('cluster_id')
      .notNull()
      .references(() => topicClusters.id, { onDelete: 'cascade' }),
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    clusterRole: text('cluster_role').notNull().default('supporting'),
  },
  (table) => [primaryKey({ columns: [table.clusterId, table.postId] })],
);
