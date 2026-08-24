import type { Metadata } from 'next';
import BeginnerFriendlyTreksPageView from '@/components/special-programs/BeginnerFriendlyTreksPageView';

export const metadata: Metadata = {
  title: 'Beginner-Friendly Himalayan Treks | First Trek Made Easy | Indian Treks',
  description:
    'Start your first Himalayan trek on well-marked, beginner-friendly trails with gradual climbs, clear guidance, and scenic routes chosen for newcomers.',
};

export default function BeginnerFriendlyTreksPage() {
  return <BeginnerFriendlyTreksPageView />;
}
