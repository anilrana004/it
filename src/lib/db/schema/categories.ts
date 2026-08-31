import { integer, pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  parentId: uuid('parent_id'),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const postCategories = pgTable(
  'post_categories',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.postId, table.categoryId] })],
);
