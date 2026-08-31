import { NextRequest, NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { isPostValidationError } from '@/lib/knowledge/errors';
import { publishPost } from '@/lib/knowledge/posts';
import { revalidatePostSurfaces } from '@/lib/knowledge/revalidation';

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_req: NextRequest, context: RouteContext) {
  if (!isDbConfigured()) return dbUnavailableResponse();

  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();

  const { id } = await context.params;

  try {
    const post = await publishPost(id);
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    revalidatePostSurfaces(post);
    return NextResponse.json({ post });
  } catch (error) {
    if (isPostValidationError(error)) {
      return NextResponse.json(
        { error: error.message, fieldErrors: error.fieldErrors },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: 'Publish failed' }, { status: 400 });
  }
}
