import { extractBlogToc } from '@/components/BlogMarkdown';

export const PLACEHOLDER_HEADINGS = new Set([
  'section heading',
  'subheading',
  'detail heading',
  'key takeaway headline',
  'describe the photo',
]);

export function isPlaceholderHeading(title: string): boolean {
  return PLACEHOLDER_HEADINGS.has(title.trim().toLowerCase());
}

export function extractEditorToc(content: string) {
  return extractBlogToc(content).filter((item) => !isPlaceholderHeading(item.title));
}

export function insertAtSelection(
  value: string,
  snippet: string,
  start: number,
  end: number,
): { next: string; cursor: number } {
  const next = value.slice(0, start) + snippet + value.slice(end);
  return { next, cursor: start + snippet.length };
}

export function headingSnippet(level: 2 | 3 | 4, title = ''): string {
  const hashes = '#'.repeat(level);
  return `\n\n${hashes} ${title}\n\n`;
}

export function findSectionLineIndex(content: string, title: string): number {
  const target = title.trim().toLowerCase();
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('#')) continue;
    const raw = line.replace(/^#+\s*/, '').replace(/\*\*/g, '').trim().toLowerCase();
    if (raw === target) return i;
  }

  return -1;
}

export function lineStartOffset(content: string, lineIndex: number): number {
  if (lineIndex <= 0) return 0;
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  let offset = 0;
  for (let i = 0; i < lineIndex && i < lines.length; i++) {
    offset += lines[i].length + 1;
  }
  return offset;
}
