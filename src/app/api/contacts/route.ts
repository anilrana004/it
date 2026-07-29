import { NextRequest, NextResponse } from 'next/server';
import { addContact, getContacts } from '@/lib/admin/store';

export async function GET() {
  return NextResponse.json(getContacts());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }
    const contact = addContact({ name, email, phone, message, status: 'new' });
    return NextResponse.json(contact, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
