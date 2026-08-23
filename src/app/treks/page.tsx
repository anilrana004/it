import { Suspense } from 'react';
import AllTreksExplorer from '@/components/treks/AllTreksExplorer';
import { getAllListingTreks, getTopCategories } from '@/lib/treks-listing';

export const metadata = {
  title: 'Upcoming Treks 2026 | All Himalayan Treks | Indian Treks',
  description:
    'Browse upcoming Himalayan treks by month, difficulty, season, duration and region. Fixed departures across Uttarakhand, Himachal, Kashmir and Nepal with Indian Treks.',
};

function TreksFallback() {
  return (
    <div className="min-h-[50vh] bg-[#f6f8f6] py-16">
      <div className="container mx-auto text-center text-sm text-gray-500">Loading treks…</div>
    </div>
  );
}

export default function TreksPage() {
  const listings = getAllListingTreks();
  const categories = getTopCategories(listings);

  return (
    <Suspense fallback={<TreksFallback />}>
      <AllTreksExplorer treks={listings} categories={categories} year={2026} />
    </Suspense>
  );
}
