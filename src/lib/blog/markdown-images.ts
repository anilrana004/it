const IMAGE_LINE_RE = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/;

export type ContentImage = {
  id: string;
  lineIndex: number;
  raw: string;
  url: string;
  alt: string;
  description: string;
};

export function extractContentImages(content: string): ContentImage[] {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const images: ContentImage[] = [];

  lines.forEach((line, lineIndex) => {
    const m = line.trim().match(IMAGE_LINE_RE);
    if (!m) return;
    const alt = m[1] ?? '';
    const url = m[2] ?? '';
    const description = (m[3] ?? '').trim();
    images.push({
      id: `${lineIndex}-${url}`,
      lineIndex,
      raw: line,
      url,
      alt,
      description,
    });
  });

  return images;
}

export function buildImageMarkdown(url: string, description: string): string {
  const desc = description.trim();
  const alt = desc || 'Trek photo';
  const safeDesc = desc.replace(/"/g, "'");
  if (safeDesc) {
    return `\n\n![${alt}](${url} "${safeDesc}")\n\n`;
  }
  return `\n\n![${alt}](${url})\n\n`;
}

export function updateImageDescription(
  content: string,
  lineIndex: number,
  description: string,
): string {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const line = lines[lineIndex];
  if (!line) return content;

  const m = line.trim().match(IMAGE_LINE_RE);
  if (!m) return content;

  const url = m[2];
  const nextLine = buildImageMarkdown(url, description).trim();
  lines[lineIndex] = nextLine;
  return lines.join('\n');
}
