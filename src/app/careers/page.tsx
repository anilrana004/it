import type { Metadata } from 'next';
import CareersPageView from '@/components/careers/CareersPageView';

export const metadata: Metadata = {
  title: 'Careers | Indian Treks — Join Our Himalayan Adventure Team',
  description:
    'Explore careers at Indian Treks. Join our team in Dehradun to help travellers experience unforgettable Himalayan treks, yatras, and adventure travel.',
};

/** Careers UI — structure mirrored from Thrillophilia careers */
export default function CareersPage() {
  return <CareersPageView />;
}
