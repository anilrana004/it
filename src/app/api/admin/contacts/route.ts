import { NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { listContacts } from '@/lib/operations/service';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();
  if (!isDbConfigured()) return dbUnavailableResponse();

  const contacts = await listContacts();
  return NextResponse.json({ contacts });
}
