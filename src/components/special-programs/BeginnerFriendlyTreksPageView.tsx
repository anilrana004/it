'use client';

import SpecialProgramLandingView from '@/components/special-programs/SpecialProgramLandingView';
import { beginnerLanding } from '@/lib/special-programs/beginner-landing';

export default function BeginnerFriendlyTreksPageView() {
  return <SpecialProgramLandingView content={beginnerLanding} />;
}
