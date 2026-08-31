import { integer, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts';

/** Editorial related-blog links (post → post). */
export const postRelatedBlogs = pgTable(
  'post_related_blogs',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    relatedPostId: uuid('related_post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.postId, table.relatedPostId] })],
);
