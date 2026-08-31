import { NextRequest, NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { searchRegistry } from '@/lib/knowledge/entity-registry';
import type { EntityType } from '@/lib/knowledge/types';

export async function GET(req: NextRequest) {
  if (!isDbConfigured()) return dbUnavailableResponse();

  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();

  const { searchParams } = req.nextUrl;
  const q = searchParams.get('q') ?? '';
  const entityType = searchParams.get('entityType') as EntityType | null;
  const limit = Number(searchParams.get('limit') ?? '20');

  const entities = await searchRegistry(q, {
    entityType: entityType ?? undefined,
    limit: Number.isFinite(limit) ? limit : 20,
  });

  return NextResponse.json({ entities });
}
