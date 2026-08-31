'use client';

import SpecialProgramLandingView from '@/components/special-programs/SpecialProgramLandingView';
import type { LandingArticle } from '@/lib/landing-social-content';
import { mergeLandingArticles } from '@/lib/knowledge/landing-articles-utils';
import { beginnerLanding } from '@/lib/special-programs/beginner-landing';

export default function BeginnerFriendlyTreksPageView({
  blogArticles,
}: {
  blogArticles?: LandingArticle[];
}) {
  return (
    <SpecialProgramLandingView content={mergeLandingArticles(beginnerLanding, blogArticles)} />
  );
}
