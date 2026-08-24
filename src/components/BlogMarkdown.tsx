import Link from 'next/link';
import type { ReactNode } from 'react';

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

  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(<strong key={`b-${key++}`}>{token.slice(2, -2)}</strong>);
    } else {
      const label = match[2];
      const href = match[3];
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
    last = match.index + token.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const IMG_RE = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/;

export type BlogTocItem = { id: string; title: string };

export function extractBlogToc(content: string): BlogTocItem[] {
  const items: BlogTocItem[] = [];
  const seen = new Set<string>();
  for (const line of content.replace(/\r\n/g, '\n').split('\n')) {
    if (!line.startsWith('## ') || line.startsWith('### ')) continue;
    const title = stripMd(line.slice(3).trim());
    let id = slugify(title);
    if (!id) continue;
    if (seen.has(id)) id = `${id}-${seen.size}`;
    seen.add(id);
    items.push({ id, title });
  }
  return items;
}

type ImgBlock = { type: 'img'; src: string; alt: string; caption?: string };

type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | ImgBlock;

type Section = { id: string; title: string; blocks: Block[] };

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

  // Holder avoids TS control-flow narrowing bugs with closure reassignment
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

    if (!line.trim()) {
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

    if (line.startsWith('### ')) {
      target().push({ type: 'h3', text: line.slice(4).trim() });
      i += 1;
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

    const para: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('* ') &&
      !lines[i].startsWith('- ') &&
      !parseImageLine(lines[i])
    ) {
      para.push(lines[i]);
      i += 1;
    }
    target().push({ type: 'p', text: para.join(' ') });
  }

  return { intro, sections, breaks };
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
  return (
    <figure className={variant === 'break' ? 'it-blog__figure it-blog__figure--break' : 'it-blog__figure'}>
      <div className="it-blog__figure-frame">
        <img src={src} alt={alt || ''} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
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
        if (block.type === 'h3') return <h3 key={idx}>{inline(block.text)}</h3>;
        if (block.type === 'img') {
          return (
            <Figure key={idx} src={block.src} alt={block.alt} caption={block.caption} variant="inline" />
          );
        }
        return (
          <ul key={idx} className="it-prep__list">
            {block.items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <i className="fa-solid fa-check" aria-hidden />
                <span>{inline(item)}</span>
              </li>
            ))}
          </ul>
        );
      })}
    </>
  );
}

/** Renders markdown as prep-guide style sections with optional images. */
export default function BlogMarkdown({ content }: { content: string }) {
  const { intro, sections, breaks } = parseSections(content);

  return (
    <div className="it-prep__content">
      {intro.length > 0 ? (
        <section className="it-prep__section">
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
            <section id={section.id} className="it-prep__section">
              <h2 className="it-prep__section-title">{section.title}</h2>
              <Blocks blocks={section.blocks} />
            </section>
          </div>
        );
      })}
    </div>
  );
}
