import TrendingLandingPageView from '@/components/trending/TrendingLandingPageView';
import { upcomingTripsLandingConfig } from '@/lib/upcoming-trips-content';

export const metadata = {
  title: 'Upcoming Trips | August, September & October Departures | Indian Treks',
  description:
    'Book fixed group departures for August, September and October — Himalayan treks, yatras and Nepal adventures with confirmed batch dates from Indian Treks.',
};

export default function UpcomingTripsPage() {
  return <TrendingLandingPageView config={upcomingTripsLandingConfig} />;
}
