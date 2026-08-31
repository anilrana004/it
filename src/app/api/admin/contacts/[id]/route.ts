import { NextRequest, NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { updateContactStatus } from '@/lib/operations/service';
import type { ContactStatus } from '@/lib/operations/types';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();
  if (!isDbConfigured()) return dbUnavailableResponse();

  const { id } = await params;

  try {
    const body = await req.json();
    const status = body.status as ContactStatus;

    if (!['new', 'read', 'replied'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const contact = await updateContactStatus(id, status);
    if (!contact) return NextResponse.json({ error: 'Contact not found' }, { status: 404 });

    return NextResponse.json({ contact });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
