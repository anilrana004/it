import { NextRequest, NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { isPostValidationError } from '@/lib/knowledge/errors';
import { deletePost, getPostById, updatePost } from '@/lib/knowledge/posts';
import { revalidatePostSurfaces } from '@/lib/knowledge/revalidation';
import type { UpdatePostInput } from '@/lib/knowledge/types';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, context: RouteContext) {
  if (!isDbConfigured()) return dbUnavailableResponse();

  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();

  const { id } = await context.params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  return NextResponse.json({ post });
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  if (!isDbConfigured()) return dbUnavailableResponse();

  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();

  const { id } = await context.params;

  try {
    const body = (await req.json()) as Partial<UpdatePostInput>;
    const post = await updatePost({ ...body, id });
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    if (post.status === 'published') {
      revalidatePostSurfaces(post);
    }

    return NextResponse.json({ post });
  } catch (error) {
    if (isPostValidationError(error)) {
      return NextResponse.json(
        { error: error.message, fieldErrors: error.fieldErrors },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  if (!isDbConfigured()) return dbUnavailableResponse();

  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();

  const { id } = await context.params;
  const deleted = await deletePost(id);
  if (!deleted) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  return NextResponse.json({ success: true });
}
