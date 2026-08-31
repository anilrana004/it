import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();
import { blogPosts } from '../src/lib/blog';
import { travelNewsItems } from '../src/lib/content/travel-news';
import { treks } from '../src/lib/data';
import { closeDb, getDb, schema } from '../src/lib/db';
import {
  buildAllRegistryRows,
  entityExists,
  seedEntityRegistryFromTreks,
} from '../src/lib/knowledge/entity-registry';
import { getPublishedPosts, getPublishedPostsPaginated, getPostsByEntity } from '../src/lib/knowledge/posts';
import { sql } from 'drizzle-orm';

const { entityRegistry, posts, authors, categories } = schema;

type CheckResult = {
  name: string;
  ok: boolean;
  detail: string;
};

async function tableExists(tableName: string): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  const [row] = await db.execute<{ exists: boolean }>(sql`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = ${tableName}
    ) AS exists
  `);

  return Boolean(row?.exists);
}

async function main() {
  const results: CheckResult[] = [];

  if (!getDb()) {
    console.error('FAIL: DATABASE_URL is not configured.');
    process.exit(1);
  }

  results.push({
    name: 'database_connection',
    ok: true,
    detail: 'DATABASE_URL is set and connection pool initialized',
  });

  for (const table of [
    'authors',
    'categories',
    'posts',
    'post_entity_links',
    'post_tags',
    'entity_registry',
    'sources',
    'post_sources',
    'post_faqs',
    'topic_clusters',
    'cluster_members',
    'bookings',
    'contacts',
    'gift_cards',
    'newsletter_subscribers',
    'site_users',
  ]) {
    const exists = await tableExists(table);
    results.push({
      name: `table_${table}`,
      ok: exists,
      detail: exists ? 'present' : 'missing — run npm run db:migrate',
    });
  }

  const registryRows = buildAllRegistryRows();
  results.push({
    name: 'registry_row_plan',
    ok: registryRows.length > 0,
    detail: `${registryRows.length} planned registry rows (${treks.length} treks/trips/yatra + regions + safety)`,
  });

  const db = getDb()!;
  const [registryCount] = await db.select({ count: sql<number>`count(*)::int` }).from(entityRegistry);
  const [postCount] = await db.select({ count: sql<number>`count(*)::int` }).from(posts);
  const [authorCount] = await db.select({ count: sql<number>`count(*)::int` }).from(authors);
  const [categoryCount] = await db.select({ count: sql<number>`count(*)::int` }).from(categories);

  results.push({
    name: 'entity_registry_seeded',
    ok: (registryCount?.count ?? 0) >= treks.length,
    detail: `${registryCount?.count ?? 0} rows in entity_registry`,
  });

  results.push({
    name: 'posts_seeded',
    ok: (postCount?.count ?? 0) >= blogPosts.length + travelNewsItems.length,
    detail: `${postCount?.count ?? 0} posts (expected >= ${blogPosts.length + travelNewsItems.length})`,
  });

  results.push({
    name: 'authors_present',
    ok: (authorCount?.count ?? 0) >= 1,
    detail: `${authorCount?.count ?? 0} authors`,
  });

  results.push({
    name: 'categories_present',
    ok: (categoryCount?.count ?? 0) >= 3,
    detail: `${categoryCount?.count ?? 0} categories`,
  });

  const kedarkanthaOk = await entityExists('trek', 'kedarkantha');
  results.push({
    name: 'canonical_trek_id',
    ok: kedarkanthaOk,
    detail: kedarkanthaOk ? 'trek/kedarkantha resolves' : 'trek/kedarkantha missing from registry',
  });

  const regionOk = await entityExists('region', 'uttarakhand');
  results.push({
    name: 'region_entity',
    ok: regionOk,
    detail: regionOk ? 'region/uttarakhand present' : 'region/uttarakhand missing — run npm run db:seed',
  });

  const safetyOk = await entityExists('safety_topic', 'altitude-sickness-guide');
  results.push({
    name: 'safety_topic_entity',
    ok: safetyOk,
    detail: safetyOk
      ? 'safety_topic/altitude-sickness-guide present'
      : 'missing — run npm run db:seed',
  });

  const published = await getPublishedPosts({ limit: 5 });
  results.push({
    name: 'published_posts_query',
    ok: published.length > 0,
    detail: `${published.length} published posts returned by getPublishedPosts()`,
  });

  const paginated = await getPublishedPostsPaginated({ section: 'blog', limit: 5, offset: 0 });
  results.push({
    name: 'paginated_posts_query',
    ok: paginated.total >= blogPosts.length,
    detail: `paginated total=${paginated.total}, page=${paginated.posts.length}`,
  });

  const kedarkanthaPosts = await getPostsByEntity({
    entityType: 'trek',
    entityId: 'kedarkantha',
    section: 'blog',
    limit: 10,
  });
  results.push({
    name: 'entity_placement_kedarkantha',
    ok: kedarkanthaPosts.length >= 1,
    detail: `${kedarkanthaPosts.length} published posts linked to trek/kedarkantha`,
  });

  const failed = results.filter((r) => !r.ok);
  console.log('\nFoundation verification\n');
  for (const result of results) {
    console.log(`${result.ok ? 'OK  ' : 'FAIL'} ${result.name}: ${result.detail}`);
  }

  if (failed.length > 0) {
    console.log(`\n${failed.length} check(s) failed.`);
    if (failed.some((f) => f.name.startsWith('table_'))) {
      console.log('Hint: npm run db:migrate && npm run db:seed');
    } else if (failed.some((f) => f.name.includes('seeded') || f.name.includes('entity'))) {
      console.log('Hint: npm run db:seed');
    }
    process.exit(1);
  }

  console.log('\nAll foundation checks passed.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await closeDb();
  });
