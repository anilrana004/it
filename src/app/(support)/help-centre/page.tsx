import type { Metadata } from 'next';
import HelpCentrePageView from '@/components/support/HelpCentrePageView';

export const metadata: Metadata = {
  title: 'Help Centre | Indian Treks — FAQs, Policies & Support',
  description:
    'Indian Treks Help Centre — FAQs, safety, reviews, payment and cancellation policies, and direct booking support for Himalayan treks and yatras.',
};

export default function HelpCentrePage() {
  return <HelpCentrePageView />;
}
