import TrendingLandingPageView from '@/components/trending/TrendingLandingPageView';
import { bestSellersLandingConfig } from '@/lib/best-sellers-content';

export const metadata = {
  title: 'Best Sellers | Most Booked Group Trips | Indian Treks',
  description:
    'Explore Indian Treks best-selling group trips — top Himalayan treks, sacred yatras and international adventures with the highest ratings and repeat bookings.',
};

export default function BestSellersPage() {
  return <TrendingLandingPageView config={bestSellersLandingConfig} />;
}
