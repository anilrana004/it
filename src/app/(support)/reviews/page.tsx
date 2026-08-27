import type { Metadata } from 'next';
import ReviewsPageView from '@/components/support/ReviewsPageView';

export const metadata: Metadata = {
  title: 'Indian Treks Reviews — Verified Reviews by 50,000+ Travellers',
  description:
    'Read verified reviews from trekkers and yatra pilgrims who travelled with Indian Treks. Popular and recent reviews, ratings, photos, and testimonials from Himalayan adventures.',
};

/** Reviews hub — structure mirrored from Thrillophilia /reviews */
export default function ReviewsPage() {
  return <ReviewsPageView />;
}
