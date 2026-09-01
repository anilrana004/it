import { photos } from '@/lib/media';
import { normalizeCloudinaryCloud } from '@/lib/cloudinary';

/** Broken Cloudinary fetch URLs that end with `/` and have no remote source. */
export function isBrokenCldFetch(url: string | undefined | null): boolean {
  if (!url) return true;
  return /res\.cloudinary\.com\/[^/]+\/image\/fetch\/[^?\s]*\/?\s*$/i.test(url.trim());
}

const byId: Record<string, string> = {
  'valley-of-flowers': photos.vof,
  kedarkantha: photos.kedarkantha,
  'hampta-pass': photos.hampta,
  'annapurna-base-camp': photos.nepal,
  'kedarnath-yatra': photos.yatra,
  'everest-base-camp': photos.ebc,
  'mcleodganj-trek': photos.triund,
  'chopta-tungnath': photos.chopta,
  'badrinath-yatra': photos.yatra,
  'dayara-bugyal': photos.uttarakhand,
  'har-ki-dun': photos.uttarakhand,
  'kuari-pass': photos.uttarakhand,
  'nag-tibba': photos.uttarakhand,
  'gaumukh-tapovan': photos.snow,
  'bali-pass': photos.himachal,
  'rupin-pass': photos.himachal,
  'sar-pass': photos.himachal,
  'beas-kund': photos.himachal,
  'yulla-kanda': photos.himachal,
  'buran-ghati': photos.himachal,
  'bhrigu-lake': photos.himachal,
  kheerganga: photos.himachal,
  'do-dham': photos.yatra,
  'char-dham': photos.yatra,
  'panch-kedar': photos.kedarnath,
  'nepal-backpacking': photos.nepal,
  'kathmandu-tour': photos.nepal,
  'pokhara-tour': photos.nepal,
  'chitwan-safari': photos.nepal,
};

export function trekPhoto(id: string, fallback: string = photos.uttarakhand): string {
  return byId[id] || fallback;
}

/** Prefer a working src; fall back when Cloudinary fetch is empty/broken. */
export function safeImage(src: string | undefined, fallback: string = photos.uttarakhand): string {
  if (!src || isBrokenCldFetch(src)) return fallback;
  return normalizeCloudinaryCloud(src);
}
