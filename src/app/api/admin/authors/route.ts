import { NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { listAuthors } from '@/lib/knowledge/posts';

export async function GET() {
  if (!isDbConfigured()) return dbUnavailableResponse();

  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();

  const authors = await listAuthors();
  return NextResponse.json({ authors });
}
