import type { Metadata } from 'next';
import CancellationPageView from '@/components/support/CancellationPageView';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | IndianTreks',
  description:
    'IndianTreks cancellation and refund policy — trek vouchers, date changes, free trek policy, force majeure, and refund windows for Himalayan treks.',
};

export default function CancellationPolicyPage() {
  return <CancellationPageView />;
}
