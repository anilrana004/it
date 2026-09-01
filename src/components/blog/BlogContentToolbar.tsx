'use client';

import { BLOG_CONTENT_SNIPPETS, type BlogSnippetKey } from '@/lib/blog-content-snippets';
import { headingSnippet } from '@/lib/blog/markdown-editor';

const TOOL_GROUPS: Array<{
  label: string;
  tools: Array<{ key: BlogSnippetKey; title: string; icon: string }>;
}> = [
  {
    label: 'Headings',
    tools: [
      { key: 'h2', title: 'Section (##) — adds TOC entry', icon: 'H2' },
      { key: 'h3', title: 'Subheading (###)', icon: 'H3' },
      { key: 'h4', title: 'Detail (####)', icon: 'H4' },
      { key: 'boldLine', title: 'Bold lead line', icon: 'B' },
    ],
  },
  {
    label: 'Lists',
    tools: [
      { key: 'bullet', title: 'Bullet checklist', icon: '•' },
      { key: 'steps', title: 'Numbered steps', icon: '1.' },
      { key: 'table', title: 'Comparison table', icon: '⊞' },
    ],
  },
  {
    label: 'Callouts',
    tools: [
      { key: 'note', title: 'Note', icon: 'N' },
      { key: 'tip', title: 'Tip', icon: 'T' },
      { key: 'important', title: 'Important', icon: '!' },
      { key: 'warning', title: 'Warning', icon: '⚠' },
    ],
  },
  {
    label: 'Layout',
    tools: [
      { key: 'divider', title: 'Section divider', icon: '—' },
      { key: 'image', title: 'Image markdown block', icon: '🖼' },
    ],
  },
];

function snippetForKey(key: BlogSnippetKey, selectedText?: string): string {
  if (key === 'h2') return headingSnippet(2, selectedText?.trim() ?? '');
  if (key === 'h3') return headingSnippet(3, selectedText?.trim() ?? '');
  if (key === 'h4') return headingSnippet(4, selectedText?.trim() ?? '');
  return BLOG_CONTENT_SNIPPETS[key];
}

export default function BlogContentToolbar({
  onInsert,
  getSelectedText,
}: {
  onInsert: (snippet: string, cursorOffset?: number) => void;
  getSelectedText?: () => string;
}) {
  return (
    <div className="mb-2 space-y-2 rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800">Format blocks</p>
      <div className="flex flex-wrap gap-3">
        {TOOL_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-wrap items-center gap-1">
            <span className="mr-1 text-[10px] font-semibold text-gray-500">{group.label}</span>
            {group.tools.map((tool) => (
              <button
                key={tool.key}
                type="button"
                title={tool.title}
                onClick={() => {
                  const selected = getSelectedText?.() ?? '';
                  const snippet = snippetForKey(tool.key, selected);
                  if (tool.key === 'h2' || tool.key === 'h3' || tool.key === 'h4') {
                    const cursorFromEnd = tool.key === 'h2' ? 3 : tool.key === 'h3' ? 4 : 5;
                    onInsert(snippet, cursorFromEnd);
                    return;
                  }
                  onInsert(snippet);
                }}
                className="min-w-[2rem] rounded-lg border border-gray-200 bg-white px-2 py-1 text-[11px] font-bold text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
              >
                {tool.icon}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
