'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, Send, MessageCircle, Phone, Mail, Headphones } from 'lucide-react';
import AssistantIcon from '@/components/AssistantIcon';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';

type AssistantChannel = {
  type: 'whatsapp' | 'email' | 'phone';
  label: string;
  href: string;
};

type AssistantReply = {
  text: string;
  quickReplies?: string[];
  links?: { label: string; href: string }[];
  handoff?: boolean;
  channels?: AssistantChannel[];
};

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  quickReplies?: string[];
  links?: { label: string; href: string }[];
  handoff?: boolean;
  channels?: AssistantChannel[];
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Render *bold* segments from assistant text */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*\n]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return (
            <strong key={i} className="font-semibold text-gray-950">
              {part.slice(1, -1)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function ChannelButtons({
  channels,
  compact,
}: {
  channels: AssistantChannel[];
  compact?: boolean;
}) {
  const icon = (type: AssistantChannel['type']) => {
    if (type === 'whatsapp') return <MessageCircle className="h-3.5 w-3.5 shrink-0" />;
    if (type === 'phone') return <Phone className="h-3.5 w-3.5 shrink-0" />;
    return <Mail className="h-3.5 w-3.5 shrink-0" />;
  };

  const style = (type: AssistantChannel['type']) => {
    if (type === 'whatsapp') return 'bg-[#25D366] text-white hover:bg-[#20bd5a]';
    if (type === 'phone') return 'bg-[#16a34a] text-white hover:bg-[#15803d]';
    return 'bg-white text-gray-800 border border-black/10 hover:bg-gray-50';
  };

  return (
    <div className={`flex flex-wrap gap-1.5 ${compact ? 'mt-0' : 'mt-2.5'}`}>
      {channels.map((c) => (
        <a
          key={c.type + c.href}
          href={c.href}
          target={c.type === 'phone' || c.type === 'email' ? undefined : '_blank'}
          rel={c.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold transition ${style(c.type)}`}
        >
          {icon(c.type)}
          {c.label}
        </a>
      ))}
    </div>
  );
}

const DEFAULT_CHANNELS: AssistantChannel[] = [
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    href: whatsappUrl(`Hi ${CONTACT.brand}! I need help from the AI assistant.`),
  },
  { type: 'phone', label: 'Call', href: telUrl() },
  {
    type: 'email',
    label: 'Email',
    href: mailtoUrl(`${CONTACT.brand} help`, 'Hi, I need assistance with:\n'),
  },
];

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
  const panelRef = useRef<HTMLDivElement>(null);

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
            text: `Hi! I'm ${CONTACT.brand} AI Help. Ask about treks, prices, or booking — or reach support anytime.`,
            quickReplies: ['Popular treks', 'How to book', 'Talk to support'],
            handoff: true,
            channels: DEFAULT_CHANNELS,
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
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing, open]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;

    const nextUser: ChatMessage = { id: uid(), role: 'user', text };
    const cleared = messages.map((m) => ({ ...m, quickReplies: undefined }));
    setMessages([...cleared, nextUser]);
    setInput('');
    setTyping(true);

    const history = [...cleared, nextUser]
      .slice(-8)
      .map((m) => ({ role: m.role, text: m.text }));

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      const reply = (data.reply || {
        text: 'Something went wrong. Please use WhatsApp, call, or email.',
        handoff: true,
        channels: DEFAULT_CHANNELS,
      }) as AssistantReply;
      await new Promise((r) => setTimeout(r, 280));
      setMessages((prev) => [...prev, { id: uid(), role: 'assistant', ...reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: 'assistant',
          text: `Connection issue. Reach us on WhatsApp, call ${CONTACT.phoneDisplay}, or email ${CONTACT.email}.`,
          handoff: true,
          channels: DEFAULT_CHANNELS,
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
        aria-label={open ? 'Close help assistant' : 'Open AI help assistant'}
        aria-expanded={open}
        className={`pointer-events-auto relative flex h-11 w-11 items-center justify-center rounded-full transition active:scale-95 ${
          open
            ? 'hidden lg:flex bg-[#14532d] text-white shadow-md ring-2 ring-white/30'
            : 'bg-transparent shadow-none'
        }`}
      >
        {open ? (
          <X className="h-4 w-4 text-white" />
        ) : (
          <AssistantIcon className="h-9 w-9 drop-shadow-[0_3px_10px_rgba(22,163,74,0.35)]" id="fab" />
        )}
      </button>

      {open && (
        <>
          {/* Mobile backdrop — tap to close */}
          <button
            type="button"
            aria-label="Close assistant backdrop"
            className="pointer-events-auto fixed inset-0 z-[55] bg-black/35 backdrop-blur-[2px] lg:hidden"
            onClick={() => onOpenChange(false)}
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${CONTACT.brand} AI help assistant`}
            className="pointer-events-auto fixed z-[60] flex flex-col overflow-hidden bg-[#f4f7f5] shadow-[0_20px_60px_rgba(0,0,0,0.28)]
              /* Mobile: nearly full sheet above bottom nav */
              inset-x-0 bottom-0
              h-[min(86dvh,640px)]
              rounded-t-2xl border border-black/8
              /* Desktop: floating panel */
              lg:inset-auto lg:bottom-28 lg:right-6
              lg:h-[min(72dvh,580px)] lg:w-[400px]
              lg:rounded-2xl lg:border-black/10"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 bg-gradient-to-r from-[#14532d] to-[#166534] px-3.5 py-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                <AssistantIcon className="h-7 w-7" id="hdr" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold tracking-tight">{CONTACT.brand} AI</p>
                <p className="flex items-center gap-1.5 truncate text-[11px] text-emerald-100/90">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${typing ? 'animate-pulse bg-amber-300' : 'bg-emerald-300'}`}
                  />
                  {typing ? 'Typing…' : 'Online · trek expert'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-full p-2 hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Always-visible helpline strip */}
            <div className="flex shrink-0 items-center gap-2 border-b border-emerald-900/10 bg-white/80 px-3 py-2">
              <Headphones className="h-3.5 w-3.5 shrink-0 text-[#16a34a]" />
              <p className="min-w-0 flex-1 truncate text-[10.5px] font-medium text-gray-600">
                Support: {CONTACT.phoneDisplay}
              </p>
              <ChannelButtons channels={DEFAULT_CHANNELS} compact />
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain px-3 py-3"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'rounded-br-md bg-[#dcfce7] text-gray-900'
                        : 'rounded-bl-md border border-black/[0.04] bg-white text-gray-900'
                    }`}
                  >
                    {m.role === 'assistant' ? <RichText text={m.text} /> : m.text}

                    {m.links && m.links.length > 0 && (
                      <div className="mt-2.5 flex flex-col gap-1">
                        {m.links.slice(0, 5).map((link) =>
                          link.href.startsWith('http') || link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? (
                            <a
                              key={link.href + link.label}
                              href={link.href}
                              target={link.href.startsWith('http') ? '_blank' : undefined}
                              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="rounded-xl bg-emerald-50 px-2.5 py-2 text-xs font-semibold text-[#166534] ring-1 ring-emerald-100 transition hover:bg-emerald-100/80"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              key={link.href + link.label}
                              href={link.href}
                              onClick={() => onOpenChange(false)}
                              className="rounded-xl bg-emerald-50 px-2.5 py-2 text-xs font-semibold text-[#166534] ring-1 ring-emerald-100 transition hover:bg-emerald-100/80"
                            >
                              {link.label}
                            </Link>
                          ),
                        )}
                      </div>
                    )}

                    {m.handoff && (
                      <div className="mt-2.5 rounded-xl bg-[#f0fdf4] p-2.5 ring-1 ring-emerald-100">
                        <p className="mb-1.5 text-[11px] font-semibold text-[#166534]">
                          Continue with a human
                        </p>
                        <ChannelButtons channels={m.channels?.length ? m.channels : DEFAULT_CHANNELS} compact />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-black/[0.04] bg-white px-3.5 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500/70" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500/70 [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500/70 [animation-delay:240ms]" />
                    </div>
                  </div>
                </div>
              )}

              {!typing &&
                messages.at(-1)?.role === 'assistant' &&
                messages.at(-1)?.quickReplies && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {messages.at(-1)!.quickReplies!.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => void send(chip)}
                        className="rounded-full border border-emerald-200/80 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
            </div>

            {/* Composer */}
            <form
              onSubmit={onSubmit}
              className="flex shrink-0 items-center gap-2 border-t border-black/5 bg-white px-2.5 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))]"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about treks, prices, booking…"
                maxLength={800}
                className="min-w-0 flex-1 rounded-full border border-black/8 bg-[#f8faf9] px-4 py-2.5 text-sm text-gray-900 outline-none ring-emerald-500/0 transition focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                aria-label="Message AI help assistant"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-sm transition hover:bg-[#15803d] disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
