import { getDb, schema } from '@/lib/db';
import type { KnowledgeCategory } from '@/lib/knowledge/types';
import { asc, eq } from 'drizzle-orm';

const { categories } = schema;

export async function listCategories(): Promise<KnowledgeCategory[]> {
  const db = getDb();
  if (!db) return [];

  const rows = await db
    .select()
    .from(categories)
    .orderBy(asc(categories.sortOrder), asc(categories.name));

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
  }));
}

export async function getCategoryBySlug(slug: string): Promise<KnowledgeCategory | null> {
  const db = getDb();
  if (!db) return null;

  const [row] = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  if (!row) return null;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
  };
}

export async function getCategoryById(id: string): Promise<KnowledgeCategory | null> {
  const db = getDb();
  if (!db) return null;

  const [row] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  if (!row) return null;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
  };
}
