import type { Metadata } from 'next';
import WomenOnlyTreksPageView from '@/components/special-programs/WomenOnlyTreksPageView';

export const metadata: Metadata = {
  title: 'Women-Only Treks in the Himalayas | Safe & Supportive Groups | Indian Treks',
  description:
    'Join women-only Himalayan treks with supportive groups, clear safety culture, and scenic routes perfect for solo travellers and first-time women trekkers.',
};

export default function WomenOnlyTreksPage() {
  return <WomenOnlyTreksPageView />;
}
