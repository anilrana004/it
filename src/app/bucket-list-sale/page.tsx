import TrendingLandingPageView from '@/components/trending/TrendingLandingPageView';
import { bucketListSaleLandingConfig } from '@/lib/bucket-list-sale-content';

export const metadata = {
  title: 'Bucket List Sale | Up to 40% Off Treks & Yatras | Indian Treks',
  description:
    'Limited-period Bucket List Sale on Himalayan treks, sacred yatras, weekend escapes and Nepal adventures — up to 40% off with Indian Treks.',
};

export default function BucketListSalePage() {
  return <TrendingLandingPageView config={bucketListSaleLandingConfig} />;
}
