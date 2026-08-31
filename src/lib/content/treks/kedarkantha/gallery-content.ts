/** Real Kedarkantha trek photos — Cloudinary-hosted, auto-format for browsers (incl. HEIC). */
const CLOUD = 'https://res.cloudinary.com/pg8uhzw0/image/upload';

export function kedarkanthaImage(path: string, w = 1200): string {
  return `${CLOUD}/f_auto,q_auto,c_fill,g_auto,w_${w}/${path}`;
}

const KEDARKANTHA_IMAGE_PATHS = [
  'v1788173419/IMG_5641_hcausq.heic',
  'v1788173431/IMG-20230309-WA0019_k1bkhc.jpg',
  'v1788173456/IMG-20241118-WA0007_eusuvv.jpg',
  'v1788173472/IMG-20241210-WA0035_in52ma.jpg',
  'v1788173487/IMG-20230330-WA0006_yorihf.jpg',
  'v1788173595/IMG-20230401-WA0034_rrfiju.jpg',
  'v1788173618/IMG-20231130-WA0039_2_siimus.jpg',
  'v1788173646/IMG_3372_bi72hc.jpg',
  'v1788173656/IMG_20240131_152245_oswkz7.jpg',
] as const;

/** Full gallery for the trek detail hero grid, lightbox, and mobile slider. */
export const KEDARKANTHA_GALLERY: readonly string[] = KEDARKANTHA_IMAGE_PATHS.map((path) =>
  kedarkanthaImage(path),
);

/** Primary hero — summit celebration at 12,500 ft. */
export const KEDARKANTHA_HERO = KEDARKANTHA_GALLERY[0];

/** Secondary hero panel — Juda Ka Talab winter scene. */
export const KEDARKANTHA_FEATURE = KEDARKANTHA_GALLERY[2];
