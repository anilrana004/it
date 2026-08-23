import type { Metadata } from 'next';
import PrepGuidePageView from '@/components/prep/PrepGuidePageView';
import { getPrepGuide } from '@/lib/prep-guides-content';

const guide = getPrepGuide('altitude-sickness-guide');

export const metadata: Metadata = {
  title: guide.metaTitle,
  description: guide.metaDescription,
};

export default function AltitudeSicknessGuidePage() {
  return <PrepGuidePageView guide={guide} />;
}
