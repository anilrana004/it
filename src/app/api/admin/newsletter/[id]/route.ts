import { NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { removeSubscriber } from '@/lib/operations/service';

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();
  if (!isDbConfigured()) return dbUnavailableResponse();

  const { id } = await params;
  const ok = await removeSubscriber(id);

  if (!ok) return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
