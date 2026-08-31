import { boolean, jsonb, pgTable, primaryKey, text } from 'drizzle-orm/pg-core';

export const entityRegistry = pgTable(
  'entity_registry',
  {
    entityType: text('entity_type').notNull(),
    entityId: text('entity_id').notNull(),
    title: text('title').notNull(),
    canonicalUrl: text('canonical_url').notNull(),
    region: text('region'),
    isActive: boolean('is_active').notNull().default(true),
    metadata: jsonb('metadata'),
  },
  (table) => [primaryKey({ columns: [table.entityType, table.entityId] })],
);
