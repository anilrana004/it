'use client';

import { useEffect, useState } from 'react';
import {
  extractEditorToc,
  findSectionLineIndex,
  isPlaceholderHeading,
  lineStartOffset,
} from '@/lib/blog/markdown-editor';
import '@/components/blog/blog-article.css';

type Props = {
  content: string;
  onJumpToLine: (offset: number) => void;
};

export default function BlogContentSectionOutline({ content, onJumpToLine }: Props) {
  const toc = extractEditorToc(content);
  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);
  const placeholders = findPlaceholders(content);

  useEffect(() => {
    setActiveId((prev) => {
      if (prev && toc.some((item) => item.id === prev)) return prev;
      return toc[0]?.id ?? null;
    });
  }, [toc]);

  if (toc.length === 0) {
    return (
      <div className="admin-blog-jump-nav admin-blog-jump-nav--empty">
        <p className="it-blog__toc-label">Jump to section</p>
        <p className="admin-blog-jump-nav__empty-hint">
          Add <code>## Section title</code> lines in your markdown — headings appear here automatically,
          same as on the live article.
        </p>
      </div>
    );
  }

  return (
    <nav className="admin-blog-jump-nav" aria-label="Jump to section">
      <div className="it-blog__toc-sticky admin-blog-jump-nav__sticky">
        <p className="it-blog__toc-label">Jump to section</p>
        <div className="it-blog__toc-scroll admin-blog-jump-nav__scroll">
          <ol className="it-blog__toc-list">
            {toc.map((item) => (
              <li
                key={item.id}
                className={`it-blog__toc-item it-blog__toc-item--l${item.level}${
                  activeId === item.id ? ' is-active' : ''
                }`}
              >
                <button
                  type="button"
                  className="admin-blog-jump-nav__link"
                  onClick={() => {
                    setActiveId(item.id);
                    const line = findSectionLineIndex(content, item.title);
                    if (line >= 0) onJumpToLine(lineStartOffset(content, line));
                  }}
                  aria-current={activeId === item.id ? 'location' : undefined}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
      {placeholders.length > 0 ? (
        <p className="admin-blog-jump-nav__placeholder-warn">
          Replace placeholder headings: {placeholders.join(', ')}
        </p>
      ) : null}
    </nav>
  );
}

function findPlaceholders(content: string): string[] {
  const found: string[] = [];
  for (const line of content.replace(/\r\n/g, '\n').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('##')) continue;
    const title = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '').trim();
    if (isPlaceholderHeading(title)) found.push(`"${title}"`);
  }
  return found;
}
