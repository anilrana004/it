import type { Metadata } from 'next';
import SeniorCitizenTreksPageView from '@/components/special-programs/SeniorCitizenTreksPageView';

export const metadata: Metadata = {
  title: 'Senior Citizen Treks | Indian Treks',
  description:
    'Senior citizen treks by Indian Treks with gentler pacing, senior-friendly route choices, extra support, and curated Himalayan departures for older travellers.',
};

export default function SeniorCitizenTreksPage() {
  return <SeniorCitizenTreksPageView />;
}
