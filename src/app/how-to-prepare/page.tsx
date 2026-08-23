import type { Metadata } from 'next';
import PrepGuidePageView from '@/components/prep/PrepGuidePageView';
import { getPrepGuide } from '@/lib/prep-guides-content';

const guide = getPrepGuide('how-to-prepare');

export const metadata: Metadata = {
  title: guide.metaTitle,
  description: guide.metaDescription,
};

export default function HowToPreparePage() {
  return <PrepGuidePageView guide={guide} />;
}
