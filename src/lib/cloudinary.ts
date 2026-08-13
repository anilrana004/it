const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'pg8uhzw0';
const FETCH_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch`;

export interface CldOptions {
  w?: number;
  h?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'pad' | 'thumb';
  quality?: number;
}

export function cldUrl(src: string, opts?: CldOptions): string {
  if (!src) return '';
  if (src.startsWith(FETCH_BASE) || src.startsWith('/')) return src;

  const params: string[] = ['f_auto'];
  if (opts?.quality !== undefined) {
    params.push(`q_${opts.quality}`);
  } else {
    params.push('q_auto');
  }
  if (opts?.w) params.push(`w_${opts.w}`);
  if (opts?.h) params.push(`h_${opts.h}`);
  params.push(`c_${opts?.crop || 'fill'}`);
  params.push('g_auto');

  return `${FETCH_BASE}/${params.join(',')}/${encodeURIComponent(src)}`;
}
