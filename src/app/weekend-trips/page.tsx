import TrendingLandingPageView from '@/components/trending/TrendingLandingPageView';
import { weekendTripsLandingConfig } from '@/lib/weekend-trips-content';

export const metadata = {
  title: 'Weekend Trips | Short Himalayan Treks | Indian Treks',
  description:
    'Book 2–3 day weekend treks across Himachal and Uttarakhand — Triund, Nag Tibba, Kheerganga, Beas Kund, Chopta and more with Indian Treks.',
};

export default function WeekendTripsPage() {
  return <TrendingLandingPageView config={weekendTripsLandingConfig} />;
}
