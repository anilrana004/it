import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-360f71bc8e5da924/', '/api/admin/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
