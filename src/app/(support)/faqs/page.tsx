import type { Metadata } from 'next';
import FaqsPageView from '@/components/faqs/FaqsPageView';

export const metadata: Metadata = {
  title: 'FAQs | Indian Treks — Booking, Safety, Gear & Yatra Help',
  description:
    'Answers to common questions about Himalayan treks, cancellations, safety, gear, logistics, corporate trips, and pilgrimage yatras with Indian Treks.',
};

export default function FaqsPage() {
  return <FaqsPageView />;
}
