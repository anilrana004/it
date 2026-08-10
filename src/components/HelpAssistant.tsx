'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, Send, MessageCircle } from 'lucide-react';
import AssistantIcon from '@/components/AssistantIcon';

type AssistantReply = {
  text: string;
  quickReplies?: string[];
  links?: { label: string; href: string }[];
  handoff?: boolean;
};

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  quickReplies?: string[];
  links?: { label: string; href: string }[];
  handoff?: boolean;
};

const WA = 'https://wa.me/919999999999?text=' + encodeURIComponent('Hi TrekRoot! I need help.');

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function HelpAssistant({ open, onOpenChange }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [booted, setBooted] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open || booted) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/assistant');
        const data = await res.json();
        const reply = data.reply as AssistantReply;
        if (cancelled) return;
        setMessages([{ id: uid(), role: 'assistant', ...reply }]);
        setBooted(true);
      } catch {
        if (cancelled) return;
        setMessages([
          {
            id: uid(),
            role: 'assistant',
            text: "Hi! I'm TrekRoot Help. Ask about treks, prices, or booking.",
            quickReplies: ['Popular treks', 'How to book', 'Talk to a human'],
          },
        ]);
        setBooted(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, booted]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 150);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing, open]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;

    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, quickReplies: undefined })),
      { id: uid(), role: 'user', text },
    ]);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply = (data.reply || { text: 'Try again, or chat on WhatsApp.' }) as AssistantReply;
      await new Promise((r) => setTimeout(r, 400));
      setMessages((prev) => [...prev, { id: uid(), role: 'assistant', ...reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: 'assistant',
          text: 'Connection issue. You can reach us on WhatsApp.',
          handoff: true,
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-label={open ? 'Close help assistant' : 'Open help assistant'}
        className={`pointer-events-auto relative flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95 ${
          open
            ? 'bg-black/70 text-white shadow-md'
            : 'bg-transparent shadow-none'
        }`}
      >
        {open ? (
          <X className="h-4 w-4 text-white" />
        ) : (
          <AssistantIcon className="h-9 w-9 drop-shadow-[0_3px_10px_rgba(120,80,255,0.4)]" id="fab" />
        )}
      </button>

      {open && (
        <div
          className="pointer-events-auto fixed z-[60] flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#efeae2] shadow-[0_18px_48px_rgba(0,0,0,0.28)]
            right-[max(0.75rem,env(safe-area-inset-right))]
            bottom-[calc(7.5rem+env(safe-area-inset-bottom,0px))]
            w-[min(100vw-1.5rem,360px)]
            h-[min(68dvh,520px)]
            lg:bottom-28 lg:right-6"
          role="dialog"
          aria-label="TrekRoot help assistant"
        >
          <div className="flex items-center gap-3 bg-[#111827] px-3 py-2.5 text-white shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent">
              <AssistantIcon className="h-7 w-7" id="hdr" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">TrekRoot Help</p>
              <p className="truncate text-[11px] text-white/60">{typing ? 'typing...' : 'Online'}</p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full p-1.5 hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto overscroll-contain px-3 py-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-3 py-2 text-[13.5px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-[#d9fdd3] text-gray-900'
                      : 'rounded-bl-md bg-white text-gray-900'
                  }`}
                >
                  {m.text}
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1">
                      {m.links.slice(0, 4).map((link) =>
                        link.href.startsWith('http') ? (
                          <a
                            key={link.href + link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-black/5 px-2 py-1.5 text-xs font-semibold text-[#166534]"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            key={link.href + link.label}
                            href={link.href}
                            onClick={() => onOpenChange(false)}
                            className="rounded-lg bg-black/5 px-2 py-1.5 text-xs font-semibold text-[#166534]"
                          >
                            {link.label}
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                  {m.handoff && (
                    <a
                      href={WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white"
                    >
                      <MessageCircle className="h-3.5 w-3.5 fill-white" />
                      Continue on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-white px-3 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:240ms]" />
                  </div>
                </div>
              </div>
            )}

            {!typing &&
              messages.at(-1)?.role === 'assistant' &&
              messages.at(-1)?.quickReplies && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {messages.at(-1)!.quickReplies!.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => void send(chip)}
                      className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 shadow-sm"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 bg-[#f0f2f5] px-2 py-2 shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              maxLength={500}
              className="min-w-0 flex-1 rounded-full border-0 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm outline-none"
              aria-label="Message help assistant"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111827] text-white disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="bg-[#f0f2f5] px-3 pb-2 text-center">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-[#128c7e] hover:underline"
            >
              Can&apos;t solve it? Talk to a human on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
