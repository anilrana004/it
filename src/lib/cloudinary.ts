const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME ||
  'pg8uhzw0';
const UPLOAD_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
const FETCH_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch`;

export type CldCrop = 'fill' | 'fit' | 'scale' | 'pad' | 'thumb';

export interface CldOptions {
  w?: number;
  h?: number;
  crop?: CldCrop;
  quality?: number | 'auto';
  gravity?: 'auto' | 'center' | 'face';
}

export type BlogImageRole = 'featured' | 'inline' | 'break' | 'card' | 'thumb';

const BLOG_PRESETS: Record<BlogImageRole, CldOptions> = {
  featured: { w: 1600, h: 900, crop: 'fill', quality: 'auto', gravity: 'auto' },
  inline: { w: 960, h: 640, crop: 'fill', quality: 'auto', gravity: 'auto' },
  break: { w: 1280, h: 640, crop: 'fill', quality: 'auto', gravity: 'auto' },
  card: { w: 600, h: 400, crop: 'fill', quality: 'auto', gravity: 'auto' },
  thumb: { w: 320, h: 200, crop: 'fill', quality: 'auto', gravity: 'auto' },
};

export function cloudinaryCloudName(): string {
  return CLOUD_NAME;
}

export function isCloudinaryUrl(src: string): boolean {
  return /res\.cloudinary\.com\/[^/]+\/image\//i.test(src.trim());
}

function buildTransformSegment(opts?: CldOptions): string {
  const params: string[] = ['f_auto'];
  if (opts?.quality === 'auto' || opts?.quality === undefined) {
    params.push('q_auto');
  } else {
    params.push(`q_${opts.quality}`);
  }
  if (opts?.w) params.push(`w_${opts.w}`);
  if (opts?.h) params.push(`h_${opts.h}`);
  params.push(`c_${opts?.crop || 'fill'}`);
  params.push(`g_${opts?.gravity || 'auto'}`);
  return params.join(',');
}

/** Remote or site-relative URL via Cloudinary fetch. */
export function cldUrl(src: string, opts?: CldOptions): string {
  if (!src) return '';
  const trimmed = src.trim();
  if (trimmed.startsWith(FETCH_BASE)) return trimmed;
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? '';
    if (site) return `${FETCH_BASE}/${buildTransformSegment(opts)}/${encodeURIComponent(`${site}${trimmed}`)}`;
  }
  if (isCloudinaryUrl(trimmed)) return cldOptimize(trimmed, opts);
  return `${FETCH_BASE}/${buildTransformSegment(opts)}/${encodeURIComponent(trimmed)}`;
}

/** Rebuild an upload/fetch Cloudinary URL with fresh transforms. */
export function cldOptimize(src: string, opts?: CldOptions): string {
  const trimmed = src.trim();
  if (!trimmed) return '';

  if (!isCloudinaryUrl(trimmed)) {
    return cldUrl(trimmed, opts);
  }

  const marker = '/image/upload/';
  const idx = trimmed.indexOf(marker);
  if (idx === -1) return trimmed;

  const prefix = trimmed.slice(0, idx + marker.length);
  const suffix = trimmed.slice(idx + marker.length);
  const segments = suffix.split('/');
  const versionIdx = segments.findIndex((part) => /^v\d+$/.test(part));
  const assetPath = versionIdx >= 0 ? segments.slice(versionIdx).join('/') : suffix;

  return `${prefix}${buildTransformSegment(opts)}/${assetPath}`;
}

/** Blog storefront images — featured hero, inline body, section breaks, cards. */
export function cldBlogImage(
  src: string | undefined | null,
  role: BlogImageRole = 'inline',
): string {
  if (!src?.trim()) return '';
  return cldOptimize(src.trim(), BLOG_PRESETS[role]);
}

/** Markdown snippet for an inline or section-break image. */
export function blogImageMarkdown(url: string, caption = 'Trek photo'): string {
  const safeCaption = caption.replace(/"/g, "'");
  return `\n\n![${safeCaption}](${url} "${safeCaption}")\n\n`;
}
