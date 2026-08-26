import type { Metadata } from 'next';
import LearningProgramLandingView from '@/components/corporate/LearningProgramLandingView';
import { campusLanding } from '@/lib/corporate/campus-landing';

export const metadata: Metadata = {
  title: 'Campus Ambassador Program | Lead · Earn · Trek | Indian Treks',
  description:
    'Become an Indian Treks Campus Ambassador — build your college travel community, earn trek credits, and grow leadership skills with mentorship.',
};

export default function CampusAmbassadorPage() {
  return <LearningProgramLandingView content={campusLanding} />;
}
