'use client';

import SpecialProgramLandingView from '@/components/special-programs/SpecialProgramLandingView';
import type { LandingArticle } from '@/lib/landing-social-content';
import { mergeLandingArticles } from '@/lib/knowledge/landing-articles-utils';
import { familyLanding } from '@/lib/special-programs/family-landing';

export default function FamilyTreksPageView({ blogArticles }: { blogArticles?: LandingArticle[] }) {
  return (
    <SpecialProgramLandingView content={mergeLandingArticles(familyLanding, blogArticles)} />
  );
}
