import type { Metadata } from 'next';
import LearningProgramLandingView from '@/components/corporate/LearningProgramLandingView';
import { schoolLanding } from '@/lib/corporate/school-landing';

export const metadata: Metadata = {
  title: 'School Programs | Educational Himalayan Outings | Indian Treks',
  description:
    'Safe, curriculum-aligned school trekking and outdoor learning programs in Uttarakhand and Himachal — nature camps, leadership trails, and heritage journeys.',
};

export default function SchoolProgramsPage() {
  return <LearningProgramLandingView content={schoolLanding} />;
}
