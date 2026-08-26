import TrendingLandingPageView from '@/components/trending/TrendingLandingPageView';
import { newLaunchesLandingConfig } from '@/lib/new-launches-content';

export const metadata = {
  title: 'New Launches | Latest Backpacking Trips | Indian Treks',
  description:
    'Discover Indian Treks newest backpacking launches — Meghalaya circuits, all-girls batches, winter Spiti and fresh Himachal routes with small-group departures.',
};

export default function NewLaunchesPage() {
  return <TrendingLandingPageView config={newLaunchesLandingConfig} />;
}
