import type { Metadata } from 'next';
import SpecialProgramsHubPageView from '@/components/special-programs/SpecialProgramsHubPageView';

export const metadata: Metadata = {
  title: 'Special Programs | Indian Treks — Women, Family, Senior & Beginner Treks',
  description:
    'Curated Himalayan trek collections for women-only groups, senior citizens, families, and beginner-friendly first treks with Indian Treks.',
};

export default function SpecialProgramsHubPage() {
  return <SpecialProgramsHubPageView />;
}
