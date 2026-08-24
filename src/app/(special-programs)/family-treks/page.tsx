import type { Metadata } from 'next';
import FamilyTreksPageView from '@/components/special-programs/FamilyTreksPageView';

export const metadata: Metadata = {
  title: 'Family Treks in the Himalayas | Kids & Parents Welcome | Indian Treks',
  description:
    'Plan a family-friendly Himalayan trek with manageable trails, scenic meadows, and shared adventure designed for parents and children travelling together.',
};

export default function FamilyTreksPage() {
  return <FamilyTreksPageView />;
}
