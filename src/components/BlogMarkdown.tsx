import Link from 'next/link';
import type { ReactNode } from 'react';
import { cldBlogImage } from '@/lib/cloudinary';
import { safeImage } from '@/lib/safe-image';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

function stripMd(text: string) {
  return text.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const isSafeHref = (href: string) => {
    const lower = href.trim().toLowerCase();
    return (
      href.startsWith('/') ||
      lower.startsWith('http://') ||
      lower.startsWith('https://') ||
      lower.startsWith('mailto:')
    );
  };

  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(<strong key={`b-${key++}`}>{token.slice(2, -2)}</strong>);
    } else {
      const label = match[2];
      const href = match[3];
      if (!isSafeHref(href)) {
        parts.push(label);
      } else {
        const internal = href.startsWith('/');
        parts.push(
          internal ? (
            <Link key={`a-${key++}`} href={href}>
              {label}
            </Link>
          ) : (
            <a key={`a-${key++}`} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ),
        );
      }
    }
    last = match.index + token.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const IMG_RE = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/;
const BOLD_LINE_RE = /^\*\*(.+)\*\*\s*$/;
const CALLOUT_RE = /^\*\*(Important|Tip|Warning|Note):\*\*\s*(.*)$/i;

export type BlogTocItem = { id: string; title: string; level: 2 | 3 };

export function extractBlogToc(content: string): BlogTocItem[] {
  const items: BlogTocItem[] = [];
  const seen = new Set<string>();
  for (const line of content.replace(/\r\n/g, '\n').split('\n')) {
    let level: 2 | 3 | null = null;
    let raw = '';
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      level = 2;
      raw = line.slice(3).trim();
    } else if (line.startsWith('### ')) {
      level = 3;
      raw = line.slice(4).trim();
    } else if (line.startsWith('# ') && !line.startsWith('## ')) {
      level = 2;
      raw = line.slice(2).trim();
    } else {
      continue;
    }
    const title = stripMd(raw);
    let id = slugify(title);
    if (!id) continue;
    if (seen.has(id)) id = `${id}-${seen.size}`;
    seen.add(id);
    items.push({ id, title, level });
  }
  return items;
}

type CalloutKind = 'note' | 'tip' | 'important' | 'warning';
type ImgBlock = { type: 'img'; src: string; alt: string; caption?: string };

type Block =
  | { type: 'p'; text: string }
  | { type: 'boldLead'; text: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'h4'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; kind: CalloutKind; text: string }
  | { type: 'hr' }
  | ImgBlock;

type Section = { id: string; title: string; blocks: Block[] };

function parseCallout(raw: string): { kind: CalloutKind; text: string } {
  const match = raw.match(CALLOUT_RE);
  if (!match) return { kind: 'note', text: raw };
  const label = match[1].toLowerCase();
  const kind: CalloutKind =
    label === 'tip' ? 'tip' : label === 'warning' ? 'warning' : label === 'important' ? 'important' : 'note';
  return { kind, text: match[2].trim() || raw };
}

function parseImageLine(line: string): ImgBlock | null {
  const m = line.trim().match(IMG_RE);
  if (!m) return null;
  return {
    type: 'img',
    alt: m[1] || '',
    src: m[2],
    caption: m[3] || m[1] || undefined,
  };
}

function isTableRow(line: string): boolean {
  const t = line.trim();
  return t.includes('|') && t.split('|').filter(Boolean).length >= 2;
}

function isTableSeparator(line: string): boolean {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line.trim());
}

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isBlockStarter(line: string): boolean {
  const t = line.trim();
  if (!t) return true;
  if (t === '---' || t === '***' || t === '___') return true;
  if (t.startsWith('#')) return true;
  if (t.startsWith('* ') || t.startsWith('- ')) return true;
  if (/^\d+\.\s/.test(t)) return true;
  if (t.startsWith('> ')) return true;
  if (BOLD_LINE_RE.test(t)) return true;
  if (parseImageLine(t)) return true;
  if (isTableRow(t)) return true;
  return false;
}

function parseSections(content: string): {
  intro: Block[];
  sections: Section[];
  breaks: Map<number, ImgBlock>;
} {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const intro: Block[] = [];
  const sections: Section[] = [];
  const breaks = new Map<number, ImgBlock>();
  const seen = new Set<string>();
  let i = 0;
  let pendingBreak: ImgBlock | null = null;

  const state: { current: Section | null } = { current: null };
  const target = () => (state.current ? state.current.blocks : intro);

  const pushHeading = (raw: string) => {
    const title = stripMd(raw);
    let id = slugify(title) || `section-${sections.length + 1}`;
    if (seen.has(id)) id = `${id}-${seen.size}`;
    seen.add(id);
    if (pendingBreak) {
      breaks.set(sections.length, pendingBreak);
      pendingBreak = null;
    }
    state.current = { id, title, blocks: [] };
    sections.push(state.current);
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      target().push({ type: 'hr' });
      i += 1;
      continue;
    }

    const boldLead = trimmed.match(BOLD_LINE_RE);
    if (boldLead) {
      target().push({ type: 'boldLead', text: boldLead[1].trim() });
      i += 1;
      continue;
    }

    const img = parseImageLine(line);
    if (img) {
      const current = state.current;
      if (current && current.blocks.length > 0) {
        let j = i + 1;
        while (j < lines.length && !lines[j].trim()) j += 1;
        const next = lines[j] ?? '';
        if (next.startsWith('## ') && !next.startsWith('### ')) {
          pendingBreak = img;
        } else {
          current.blocks.push(img);
        }
      } else if (current) {
        current.blocks.push(img);
      } else {
        intro.push(img);
      }
      i += 1;
      continue;
    }

    if (line.startsWith('## ') && !line.startsWith('### ')) {
      pushHeading(line.slice(3).trim());
      i += 1;
      continue;
    }

    if (line.startsWith('# ')) {
      pushHeading(line.slice(2).trim());
      i += 1;
      continue;
    }

    if (line.startsWith('#### ')) {
      target().push({ type: 'h4', text: line.slice(5).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      const text = line.slice(4).trim();
      let id = slugify(stripMd(text)) || `sub-${target().length}`;
      if (seen.has(id)) id = `${id}-${seen.size}`;
      seen.add(id);
      target().push({ type: 'h3', text, id });
      i += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        parts.push(lines[i].slice(2));
        i += 1;
      }
      const joined = parts.join(' ');
      const callout = parseCallout(joined);
      target().push({ type: 'callout', kind: callout.kind, text: callout.text });
      continue;
    }

    if (isTableRow(line) && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headers = splitTableRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i]) && !isTableSeparator(lines[i])) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }
      target().push({ type: 'table', headers, rows });
      continue;
    }

    if (line.startsWith('* ') || line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith('* ') || lines[i].startsWith('- '))) {
        items.push(lines[i].slice(2));
        i += 1;
      }
      target().push({ type: 'ul', items });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i += 1;
      }
      target().push({ type: 'ol', items });
      continue;
    }

    const para: string[] = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !isBlockStarter(lines[i])) {
      para.push(lines[i]);
      i += 1;
    }
    target().push({ type: 'p', text: para.join(' ') });
  }

  return { intro, sections, breaks };
}

const CALLOUT_META: Record<CalloutKind, { label: string; icon: string }> = {
  note: { label: 'Note', icon: 'fa-solid fa-circle-info' },
  tip: { label: 'Pro tip', icon: 'fa-solid fa-lightbulb' },
  important: { label: 'Important', icon: 'fa-solid fa-circle-exclamation' },
  warning: { label: 'Warning', icon: 'fa-solid fa-triangle-exclamation' },
};

function Callout({ kind, text }: { kind: CalloutKind; text: string }) {
  const meta = CALLOUT_META[kind];
  return (
    <aside className={`it-blog__callout it-blog__callout--${kind}`} role="note">
      <p className="it-blog__callout-label">
        <i className={meta.icon} aria-hidden />
        {meta.label}
      </p>
      <div className="it-blog__callout-body">{inline(text)}</div>
    </aside>
  );
}

function Figure({
  src,
  alt,
  caption,
  variant = 'inline',
}: {
  src: string;
  alt: string;
  caption?: string;
  variant?: 'inline' | 'break';
}) {
  const optimized = cldBlogImage(safeImage(src), variant === 'break' ? 'break' : 'inline');

  return (
    <figure className={variant === 'break' ? 'it-blog__figure it-blog__figure--break' : 'it-blog__figure'}>
      <div className="it-blog__figure-frame">
        <img src={optimized} alt={alt || ''} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, idx) => {
        if (block.type === 'p') return <p key={idx}>{inline(block.text)}</p>;
        if (block.type === 'boldLead') {
          return (
            <p key={idx} className="it-blog__bold-lead">
              {inline(`**${block.text}**`)}
            </p>
          );
        }
        if (block.type === 'hr') return <hr key={idx} className="it-blog__divider" />;
        if (block.type === 'h3') {
          return (
            <h3 key={idx} id={block.id} className="it-blog__h3">
              <span className="it-blog__h3-dot" aria-hidden />
              {inline(block.text)}
            </h3>
          );
        }
        if (block.type === 'h4') {
          return (
            <h4 key={idx} className="it-blog__h4">
              {inline(block.text)}
            </h4>
          );
        }
        if (block.type === 'img') {
          return (
            <Figure key={idx} src={block.src} alt={block.alt} caption={block.caption} variant="inline" />
          );
        }
        if (block.type === 'callout') {
          return <Callout key={idx} kind={block.kind} text={block.text} />;
        }
        if (block.type === 'table') {
          return (
            <div key={idx} className="it-blog__table-wrap">
              <table className="it-blog__table">
                <thead>
                  <tr>
                    {block.headers.map((cell, cellIdx) => (
                      <th key={cellIdx}>{inline(cell)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx}>{inline(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (block.type === 'ol') {
          return (
            <ol key={idx} className="it-blog__steps">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <span className="it-blog__step-num">{itemIdx + 1}</span>
                  <span className="it-blog__step-body">{inline(item)}</span>
                </li>
              ))}
            </ol>
          );
        }
        return (
          <ul key={idx} className="it-blog__bullets">
            {block.items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <span className="it-blog__bullet-mark" aria-hidden />
                <span>{inline(item)}</span>
              </li>
            ))}
          </ul>
        );
      })}
    </>
  );
}

/** Renders markdown as structured premium article sections. */
export default function BlogMarkdown({ content }: { content: string }) {
  const { intro, sections, breaks } = parseSections(content);

  return (
    <div className="it-blog__prose it-prep__content">
      {intro.length > 0 ? (
        <section className="it-prep__section it-blog__intro">
          <Blocks blocks={intro} />
        </section>
      ) : null}
      {sections.map((section, idx) => {
        const br = breaks.get(idx);
        return (
          <div key={section.id} className="it-blog__stack">
            {br ? (
              <Figure src={br.src} alt={br.alt} caption={br.caption} variant="break" />
            ) : null}
            <section id={section.id} className="it-prep__section it-blog__section">
              <h2 className="it-prep__section-title it-blog__section-title">
                <span className="it-blog__section-accent" aria-hidden />
                {section.title}
              </h2>
              <Blocks blocks={section.blocks} />
            </section>
          </div>
        );
      })}
    </div>
  );
}
