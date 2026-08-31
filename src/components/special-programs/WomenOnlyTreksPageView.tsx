'use client';

import SpecialProgramLandingView from '@/components/special-programs/SpecialProgramLandingView';
import type { LandingArticle } from '@/lib/landing-social-content';
import { mergeLandingArticles } from '@/lib/knowledge/landing-articles-utils';
import { womenOnlyLanding } from '@/lib/special-programs/women-only-landing';

export default function WomenOnlyTreksPageView({ blogArticles }: { blogArticles?: LandingArticle[] }) {
  return (
    <SpecialProgramLandingView content={mergeLandingArticles(womenOnlyLanding, blogArticles)} />
  );
}
