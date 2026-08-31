import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const authors = pgTable('authors', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  role: text('role'),
  expertise: text('expertise').array(),
  socialLinks: text('social_links'), // JSON string; parsed in app layer
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
