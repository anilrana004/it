import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { generateEditorialSuggestions } from '@/lib/admin/editorial-suggestions';
import type { EntityType } from '@/lib/knowledge/types';

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();

  try {
    const body = await req.json();
    const title = typeof body.title === 'string' ? body.title : '';
    const content = typeof body.content === 'string' ? body.content : '';
    const excerpt = typeof body.excerpt === 'string' ? body.excerpt : '';

    if (!title.trim() && !content.trim()) {
      return NextResponse.json({ error: 'Title or content required' }, { status: 400 });
    }

    if (content.length > 200_000) {
      return NextResponse.json({ error: 'Content too large' }, { status: 400 });
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

    return NextResponse.json({
      suggestions,
      disclaimer:
        'Suggestions are assistive only. Review and edit before saving — nothing is auto-published.',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
