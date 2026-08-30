import type { Metadata } from 'next';
import TermsPageView from '@/components/support/TermsPageView';

export const metadata: Metadata = {
  title: 'Terms & Conditions | IndianTreks',
  description:
    'IndianTreks Terms & Conditions — booking, payment, cancellation, safety, liability, and legal policies for Himalayan treks and travel.',
};

export default function TermsPage() {
  return <TermsPageView />;
}
