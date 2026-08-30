import type { Metadata } from 'next';
import AffiliatesPageView from '@/components/support/AffiliatesPageView';

export const metadata: Metadata = {
  title: 'Affiliates & Partners | Indian Treks',
  description:
    'Partner with IndianTreks — B2B travel agents, campus ambassadors, corporate teams, and referral programmes for Himalayan treks, yatras, and ground operations since 2015.',
};

export default function AffiliatesPage() {
  return <AffiliatesPageView />;
}
