import { NextRequest, NextResponse } from 'next/server';
import { revalidatePublishedPostSurfaces } from '@/lib/knowledge/revalidation';
import type { EntityLink, PostSection } from '@/lib/knowledge/types';

type RevalidatePayload = {
  slug?: string;
  section?: string;
  primaryEntityType?: string | null;
  primaryEntityId?: string | null;
  entityLinks?: EntityLink[];
};

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: 'Revalidation not configured' }, { status: 503 });
  }

  const auth = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');
  if (!auth || auth !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: RevalidatePayload;
  try {
    body = (await req.json()) as RevalidatePayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const slug = typeof body.slug === 'string' ? body.slug.trim() : '';
  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }

  const section = (typeof body.section === 'string' ? body.section : 'blog') as PostSection;

  revalidatePublishedPostSurfaces({
    slug,
    section,
    primaryEntityType: body.primaryEntityType ?? null,
    primaryEntityId: body.primaryEntityId ?? null,
    entityLinks: Array.isArray(body.entityLinks) ? body.entityLinks : undefined,
  });

  return NextResponse.json({ revalidated: true, slug, section });
}
