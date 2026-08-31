import { getTrekById, treks, trekDetailPath } from '@/lib/data';
import { getDb, schema } from '@/lib/db';
import { PUBLIC_ROUTES, TREK_ALIAS_TYPES } from '@/lib/knowledge/config';
import type { EntityType } from '@/lib/knowledge/types';
import { and, asc, eq, ilike, or, sql } from 'drizzle-orm';

const { entityRegistry } = schema;

export interface RegistryEntry {
  entityType: EntityType;
  entityId: string;
  title: string;
  canonicalUrl: string;
  region: string | null;
  isActive: boolean;
}

const REGION_DESTINATIONS = [
  { id: 'uttarakhand', title: 'Uttarakhand', state: 'Uttarakhand' },
  { id: 'himachal', title: 'Himachal Pradesh', state: 'Himachal Pradesh' },
  { id: 'nepal', title: 'Nepal', state: 'Nepal' },
  { id: 'kashmir', title: 'Kashmir', state: 'Jammu & Kashmir' },
] as const;

const SAFETY_TOPICS = [
  {
    id: 'altitude-sickness-guide',
    title: 'Altitude Sickness Guide',
    canonicalUrl: '/altitude-sickness-guide',
  },
] as const;

type RegistryRow = {
  entityType: EntityType;
  entityId: string;
  title: string;
  canonicalUrl: string;
  region: string | null;
  isActive: boolean;
  metadata?: Record<string, unknown>;
};

/** Map trip/yatra references to the canonical trek registry row when applicable. */
export function resolveEntityReference(
  entityType: EntityType,
  entityId: string,
): { entityType: EntityType; entityId: string } {
  if (TREK_ALIAS_TYPES.includes(entityType)) {
    const trek = getTrekById(entityId);
    if (trek) return { entityType: 'trek', entityId: trek.id };
  }
  return { entityType, entityId };
}

export function buildTrekRegistryRows(): RegistryRow[] {
  return treks.map((trek) => ({
    entityType: 'trek' as const,
    entityId: trek.id,
    title: trek.title,
    canonicalUrl: trekDetailPath(trek),
    region: trek.region,
    isActive: true,
    metadata: {
      state: trek.state,
      type: trek.type,
      difficulty: trek.difficulty,
    },
  }));
}

export function buildTripRegistryRows(): RegistryRow[] {
  return treks.map((trek) => ({
    entityType: 'trip' as const,
    entityId: trek.id,
    title: trek.title,
    canonicalUrl: PUBLIC_ROUTES.trip(trek.id),
    region: trek.region,
    isActive: true,
    metadata: { sourceTrekId: trek.id },
  }));
}

export function buildYatraRegistryRows(): RegistryRow[] {
  return treks
    .filter((trek) => trek.type === 'yatra')
    .map((trek) => ({
      entityType: 'yatra' as const,
      entityId: trek.id,
      title: trek.title,
      canonicalUrl: PUBLIC_ROUTES.yatra(trek.id),
      region: trek.region,
      isActive: true,
      metadata: { sourceTrekId: trek.id },
    }));
}

export function buildRegionRegistryRows(): RegistryRow[] {
  return REGION_DESTINATIONS.map((region) => ({
    entityType: 'region' as const,
    entityId: region.id,
    title: region.title,
    canonicalUrl: PUBLIC_ROUTES.destination(region.id),
    region: region.id,
    isActive: true,
    metadata: { state: region.state },
  }));
}

export function buildDestinationRegistryRows(): RegistryRow[] {
  return REGION_DESTINATIONS.map((region) => ({
    entityType: 'destination' as const,
    entityId: region.id,
    title: region.title,
    canonicalUrl: PUBLIC_ROUTES.destination(region.id),
    region: region.id,
    isActive: true,
    metadata: { state: region.state },
  }));
}

export function buildSafetyTopicRegistryRows(): RegistryRow[] {
  return SAFETY_TOPICS.map((topic) => ({
    entityType: 'safety_topic' as const,
    entityId: topic.id,
    title: topic.title,
    canonicalUrl: topic.canonicalUrl,
    region: null,
    isActive: true,
  }));
}

export function buildAllRegistryRows(): RegistryRow[] {
  return [
    ...buildTrekRegistryRows(),
    ...buildTripRegistryRows(),
    ...buildYatraRegistryRows(),
    ...buildRegionRegistryRows(),
    ...buildDestinationRegistryRows(),
    ...buildSafetyTopicRegistryRows(),
  ];
}

async function upsertRegistryRows(rows: RegistryRow[]): Promise<number> {
  const db = getDb();
  if (!db) throw new Error('DATABASE_URL is not configured');
  if (rows.length === 0) return 0;

  await db
    .insert(entityRegistry)
    .values(rows)
    .onConflictDoUpdate({
      target: [entityRegistry.entityType, entityRegistry.entityId],
      set: {
        title: sql`excluded.title`,
        canonicalUrl: sql`excluded.canonical_url`,
        region: sql`excluded.region`,
        isActive: sql`excluded.is_active`,
        metadata: sql`excluded.metadata`,
      },
    });

  return rows.length;
}

export async function seedEntityRegistryFromTreks(): Promise<number> {
  return upsertRegistryRows(buildAllRegistryRows());
}

export async function entityExists(
  entityType: EntityType,
  entityId: string,
): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  const resolved = resolveEntityReference(entityType, entityId);

  const [row] = await db
    .select()
    .from(entityRegistry)
    .where(
      and(
        eq(entityRegistry.entityType, resolved.entityType),
        eq(entityRegistry.entityId, resolved.entityId),
        eq(entityRegistry.isActive, true),
      ),
    )
    .limit(1);

  if (row) return true;

  if (resolved.entityType !== entityType) {
    const [aliasRow] = await db
      .select()
      .from(entityRegistry)
      .where(
        and(
          eq(entityRegistry.entityType, entityType),
          eq(entityRegistry.entityId, entityId),
          eq(entityRegistry.isActive, true),
        ),
      )
      .limit(1);
    return Boolean(aliasRow);
  }

  return false;
}

export async function getRegistryEntry(
  entityType: EntityType,
  entityId: string,
): Promise<RegistryEntry | null> {
  const db = getDb();
  if (!db) return null;

  const resolved = resolveEntityReference(entityType, entityId);

  const [row] = await db
    .select()
    .from(entityRegistry)
    .where(
      and(
        eq(entityRegistry.entityType, resolved.entityType),
        eq(entityRegistry.entityId, resolved.entityId),
      ),
    )
    .limit(1);

  if (!row) return null;

  return {
    entityType: row.entityType as EntityType,
    entityId: row.entityId,
    title: row.title,
    canonicalUrl: row.canonicalUrl,
    region: row.region,
    isActive: row.isActive,
  };
}

export async function listRegistryByType(entityType: EntityType): Promise<RegistryEntry[]> {
  const db = getDb();
  if (!db) return [];

  const rows = await db
    .select()
    .from(entityRegistry)
    .where(and(eq(entityRegistry.entityType, entityType), eq(entityRegistry.isActive, true)))
    .orderBy(asc(entityRegistry.title));

  return rows.map((row) => ({
    entityType: row.entityType as EntityType,
    entityId: row.entityId,
    title: row.title,
    canonicalUrl: row.canonicalUrl,
    region: row.region,
    isActive: row.isActive,
  }));
}

export async function searchRegistry(
  query: string,
  options: { entityType?: EntityType; limit?: number } = {},
): Promise<RegistryEntry[]> {
  const db = getDb();
  if (!db) return [];

  const term = query.trim();
  if (!term) return listRegistryByType(options.entityType ?? 'trek');

  const pattern = `%${term}%`;
  const conditions = [
    eq(entityRegistry.isActive, true),
    or(
      ilike(entityRegistry.title, pattern),
      ilike(entityRegistry.entityId, pattern),
    ),
  ];

  if (options.entityType) {
    conditions.push(eq(entityRegistry.entityType, options.entityType));
  }

  let queryBuilder = db
    .select()
    .from(entityRegistry)
    .where(and(...conditions))
    .orderBy(asc(entityRegistry.title));

  if (options.limit) {
    queryBuilder = queryBuilder.limit(options.limit) as typeof queryBuilder;
  }

  const rows = await queryBuilder;

  return rows.map((row) => ({
    entityType: row.entityType as EntityType,
    entityId: row.entityId,
    title: row.title,
    canonicalUrl: row.canonicalUrl,
    region: row.region,
    isActive: row.isActive,
  }));
}
