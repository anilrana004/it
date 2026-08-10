import { NextRequest, NextResponse } from 'next/server';
import { getAssistantReply, getWelcome } from '@/lib/assistant';

export async function GET() {
  return NextResponse.json({ reply: getWelcome() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    if (message.length > 500) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }
    const reply = getAssistantReply(message);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
