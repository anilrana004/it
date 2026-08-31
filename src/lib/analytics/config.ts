/**
 * Analytics configuration scaffold — wire IDs via environment when ready.
 * No tracking scripts are injected until IDs are set.
 */

export const ANALYTICS = {
  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? '',
  gscSiteUrl: process.env.NEXT_PUBLIC_GSC_SITE_URL ?? '',
} as const;

export function isAnalyticsConfigured(): boolean {
  return Boolean(ANALYTICS.ga4MeasurementId);
}

/** Placeholder event names for future blog → trek → booking funnel tracking. */
export const ANALYTICS_EVENTS = {
  blogView: 'blog_view',
  blogEntityClick: 'blog_entity_click',
  trekViewFromBlog: 'trek_view_from_blog',
  bookingStart: 'booking_start',
} as const;
