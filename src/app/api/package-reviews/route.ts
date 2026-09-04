import { NextRequest, NextResponse } from 'next/server';
import { isDbConfigured } from '@/lib/db';
import { createContact } from '@/lib/operations/service';

type Body = {
  name?: string;
  email?: string;
  rating?: number;
  text?: string;
  packageId?: string;
  packageTitle?: string;
  packageHref?: string;
  packageKind?: string;
  photoCount?: number;
  hasAvatar?: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    const name = body.name?.trim() ?? '';
    const email = body.email?.trim() ?? '';
    const text = body.text?.trim() ?? '';
    const packageId = body.packageId?.trim() ?? '';
    const packageTitle = body.packageTitle?.trim() ?? '';
    const packageHref = body.packageHref?.trim() ?? '';
    const packageKind = body.packageKind?.trim() ?? 'trek';
    const rating = Number(body.rating) || 0;

    if (!name || !email || !text || !packageId) {
      return NextResponse.json(
        { error: 'Name, email, review text, and package are required.' },
        { status: 400 },
      );
    }
    if (text.length < 40) {
      return NextResponse.json({ error: 'Review text must be at least 40 characters.' }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5.' }, { status: 400 });
    }

    let contactId: string | null = null;
    if (isDbConfigured()) {
      const message = [
        '[Package review submission]',
        `Kind: ${packageKind}`,
        `Package: ${packageTitle} (${packageHref || packageId})`,
        `Rating: ${rating}/5`,
        `Avatar attached in browser: ${body.hasAvatar ? 'yes' : 'no'}`,
        `Memory photos attached in browser: ${body.photoCount ?? 0}`,
        '',
        text,
      ].join('\n');

      const contact = await createContact({ name, email, phone: '', message });
      contactId = contact.id;
    }

    return NextResponse.json({ ok: true, contactId, moderated: false }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Could not save review right now.' }, { status: 500 });
  }
}
