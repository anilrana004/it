'use client';

import { BLOG_CONTENT_SNIPPETS, type BlogSnippetKey } from '@/lib/blog-content-snippets';

const TOOL_GROUPS: Array<{
  label: string;
  tools: Array<{ key: BlogSnippetKey; title: string; icon: string }>;
}> = [
  {
    label: 'Headings',
    tools: [
      { key: 'h2', title: 'Section (##)', icon: 'H2' },
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
      { key: 'image', title: 'Image placeholder', icon: '🖼' },
    ],
  },
];

export default function BlogContentToolbar({ onInsert }: { onInsert: (snippet: string) => void }) {
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
                onClick={() => onInsert(BLOG_CONTENT_SNIPPETS[tool.key])}
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
