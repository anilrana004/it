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
    if (message.length > 800) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }

    const history = Array.isArray(body?.history)
      ? body.history
          .filter(
            (h: unknown): h is { role: 'user' | 'assistant'; text: string } =>
              !!h &&
              typeof h === 'object' &&
              ((h as { role: string }).role === 'user' ||
                (h as { role: string }).role === 'assistant') &&
              typeof (h as { text: unknown }).text === 'string',
          )
          .slice(-8)
          .map((h: { role: 'user' | 'assistant'; text: string }) => ({
            role: h.role,
            text: h.text.slice(0, 800),
          }))
      : undefined;

    const reply = getAssistantReply(message, history);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
