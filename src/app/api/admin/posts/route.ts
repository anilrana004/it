import { NextRequest, NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { isPostValidationError } from '@/lib/knowledge/errors';
import { createPost, listAllPosts } from '@/lib/knowledge/posts';
import type { CreatePostInput } from '@/lib/knowledge/types';

export async function GET() {
  if (!isDbConfigured()) return dbUnavailableResponse();

  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();

  const posts = await listAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  if (!isDbConfigured()) return dbUnavailableResponse();

  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();

  try {
    const body = (await req.json()) as CreatePostInput;
    const post = await createPost(body);
    if (!post) return dbUnavailableResponse();

    if (post.status === 'published') {
      const { revalidatePostSurfaces } = await import('@/lib/knowledge/revalidation');
      revalidatePostSurfaces(post);
    }

    return NextResponse.json({ post }, { status: 201 });
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
