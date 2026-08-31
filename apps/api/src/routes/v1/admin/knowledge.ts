import { Hono } from 'hono';
import { isDbConfigured } from '@indiantreks/db';
import { apiError, apiSuccess } from '@indiantreks/shared';
import { isPostValidationError } from '@/lib/knowledge/errors';
import { listCategories } from '@/lib/knowledge/categories';
import { searchRegistry } from '@/lib/knowledge/entity-registry';
import {
  archivePost,
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listAuthors,
  publishPost,
  updatePost,
} from '@/lib/knowledge/posts';
import type { CreatePostInput, EntityType, UpdatePostInput } from '@/lib/knowledge/types';
import { generateEditorialSuggestions } from '@/lib/admin/editorial-suggestions';
import {
  cldBlogTransform,
  isCloudinaryUploadConfigured,
  notifyStorefrontRevalidate,
  uploadToCloudinary,
} from '../../../lib/cloudinary.js';
import type { AdminVariables } from '../../../middleware/auth.js';
import { requireAdmin } from '../../../middleware/auth.js';

function dbGuard() {
  if (!isDbConfigured()) return apiError('DB_UNAVAILABLE', 'Database not configured', 503);
  return null;
}

async function afterPublish(post: Awaited<ReturnType<typeof publishPost>>) {
  if (!post) return;
  await notifyStorefrontRevalidate({
    slug: post.slug,
    section: post.section,
    primaryEntityType: post.primaryEntityType,
    primaryEntityId: post.primaryEntityId,
    entityLinks: post.entityLinks,
  });
}

export const knowledgeRoutes = new Hono<{ Variables: AdminVariables }>();
knowledgeRoutes.use('*', requireAdmin);

knowledgeRoutes.get('/posts', async (c) => {
  const blocked = dbGuard();
  if (blocked) return blocked;
  const posts = await listAllPosts();
  return apiSuccess({ posts });
});

knowledgeRoutes.post('/posts', async (c) => {
  const blocked = dbGuard();
  if (blocked) return blocked;

  try {
    const body = (await c.req.json()) as CreatePostInput;
    const post = await createPost(body);
    if (!post) return apiError('DB_UNAVAILABLE', 'Database not configured', 503);
    if (post.status === 'published') await afterPublish(post);
    return apiSuccess({ post }, 201);
  } catch (error) {
    if (isPostValidationError(error)) {
      return c.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: error.message }, fieldErrors: error.fieldErrors },
        400,
      );
    }
    return apiError('VALIDATION_ERROR', 'Invalid request body', 400);
  }
});

knowledgeRoutes.post('/posts/suggestions', async (c) => {
  try {
    const body = await c.req.json();
    const title = typeof body.title === 'string' ? body.title : '';
    const content = typeof body.content === 'string' ? body.content : '';
    const excerpt = typeof body.excerpt === 'string' ? body.excerpt : '';

    if (!title.trim() && !content.trim()) {
      return apiError('VALIDATION_ERROR', 'Title or content required', 400);
    }

    const tags = Array.isArray(body.tags)
      ? body.tags.filter((t: unknown): t is string => typeof t === 'string')
      : typeof body.tags === 'string'
        ? body.tags.split(',').map((t: string) => t.trim())
        : [];

    const suggestions = generateEditorialSuggestions({
      title,
      excerpt,
      content,
      contentType: typeof body.contentType === 'string' ? body.contentType : 'guide',
      section: typeof body.section === 'string' ? body.section : 'blog',
      tags,
      primaryEntityType: (body.primaryEntityType as EntityType | null) ?? null,
      primaryEntityId: typeof body.primaryEntityId === 'string' ? body.primaryEntityId : null,
      seoTitle: typeof body.seoTitle === 'string' ? body.seoTitle : '',
      seoDescription: typeof body.seoDescription === 'string' ? body.seoDescription : '',
      hasQuickAnswer: Boolean(body.hasQuickAnswer),
      lastFactCheckedAt: typeof body.lastFactCheckedAt === 'string' ? body.lastFactCheckedAt : null,
      contentFreshness: typeof body.contentFreshness === 'string' ? body.contentFreshness : 'evergreen',
    });

    return apiSuccess({
      suggestions,
      disclaimer:
        'Suggestions are assistive only. Review and edit before saving — nothing is auto-published.',
    });
  } catch {
    return apiError('VALIDATION_ERROR', 'Invalid request', 400);
  }
});

knowledgeRoutes.get('/posts/:id', async (c) => {
  const blocked = dbGuard();
  if (blocked) return blocked;

  const post = await getPostById(c.req.param('id'));
  if (!post) return apiError('NOT_FOUND', 'Post not found', 404);
  return apiSuccess({ post });
});

knowledgeRoutes.patch('/posts/:id', async (c) => {
  const blocked = dbGuard();
  if (blocked) return blocked;

  try {
    const body = (await c.req.json()) as Partial<UpdatePostInput>;
    const post = await updatePost({ ...body, id: c.req.param('id') });
    if (!post) return apiError('NOT_FOUND', 'Post not found', 404);
    if (post.status === 'published') await afterPublish(post);
    return apiSuccess({ post });
  } catch (error) {
    if (isPostValidationError(error)) {
      return c.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: error.message }, fieldErrors: error.fieldErrors },
        400,
      );
    }
    return apiError('VALIDATION_ERROR', 'Invalid request body', 400);
  }
});

knowledgeRoutes.delete('/posts/:id', async (c) => {
  const blocked = dbGuard();
  if (blocked) return blocked;

  const deleted = await deletePost(c.req.param('id'));
  if (!deleted) return apiError('NOT_FOUND', 'Post not found', 404);
  return apiSuccess({ success: true });
});

knowledgeRoutes.post('/posts/:id/publish', async (c) => {
  const blocked = dbGuard();
  if (blocked) return blocked;

  try {
    const post = await publishPost(c.req.param('id'));
    if (!post) return apiError('NOT_FOUND', 'Post not found', 404);
    await afterPublish(post);
    return apiSuccess({ post });
  } catch (error) {
    if (isPostValidationError(error)) {
      return c.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: error.message }, fieldErrors: error.fieldErrors },
        400,
      );
    }
    return apiError('VALIDATION_ERROR', 'Publish failed', 400);
  }
});

knowledgeRoutes.post('/posts/:id/archive', async (c) => {
  const blocked = dbGuard();
  if (blocked) return blocked;

  const post = await archivePost(c.req.param('id'));
  if (!post) return apiError('NOT_FOUND', 'Post not found', 404);
  return apiSuccess({ post });
});

knowledgeRoutes.get('/categories', async (c) => {
  const blocked = dbGuard();
  if (blocked) return blocked;
  return apiSuccess({ categories: await listCategories() });
});

knowledgeRoutes.get('/authors', async (c) => {
  const blocked = dbGuard();
  if (blocked) return blocked;
  return apiSuccess({ authors: await listAuthors() });
});

knowledgeRoutes.get('/entities/search', async (c) => {
  const blocked = dbGuard();
  if (blocked) return blocked;

  const q = c.req.query('q') ?? '';
  const entityType = c.req.query('entityType') as EntityType | undefined;
  const limit = Number(c.req.query('limit') ?? '20');

  const entities = await searchRegistry(q, {
    entityType,
    limit: Number.isFinite(limit) ? limit : 20,
  });

  return apiSuccess({ entities });
});

knowledgeRoutes.post('/media/upload', async (c) => {
  if (!isCloudinaryUploadConfigured()) {
    return apiError(
      'INTERNAL_ERROR',
      'Cloudinary upload is not configured. Add CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET.',
      503,
    );
  }

  try {
    const formData = await c.req.formData();
    const file = formData.get('file');
    const folder = String(formData.get('folder') || 'indiantreks/blog');

    if (!(file instanceof File) || file.size === 0) {
      return apiError('VALIDATION_ERROR', 'A valid image file is required.', 400);
    }

    if (!file.type.startsWith('image/')) {
      return apiError('VALIDATION_ERROR', 'Only image uploads are supported.', 400);
    }

    if (file.size > 8 * 1024 * 1024) {
      return apiError('VALIDATION_ERROR', 'Image must be 8 MB or smaller.', 400);
    }

    const uploaded = await uploadToCloudinary(file, folder);
    const name = file.name.replace(/\.[^.]+$/, '').replace(/-/g, ' ');

    return apiSuccess({
      url: uploaded.secureUrl,
      publicId: uploaded.publicId,
      width: uploaded.width,
      height: uploaded.height,
      featuredUrl: cldBlogTransform(uploaded.secureUrl, 1200),
      inlineUrl: cldBlogTransform(uploaded.secureUrl, 800),
      markdown: `![${name}](${uploaded.secureUrl} "${name}")`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return apiError('INTERNAL_ERROR', message, 500);
  }
});
