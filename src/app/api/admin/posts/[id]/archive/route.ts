import { NextRequest, NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { archivePost } from '@/lib/knowledge/posts';

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_req: NextRequest, context: RouteContext) {
  if (!isDbConfigured()) return dbUnavailableResponse();

  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();

  const { id } = await context.params;
  const post = await archivePost(id);
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  return NextResponse.json({ post });
}
