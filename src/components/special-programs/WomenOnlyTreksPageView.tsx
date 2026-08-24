'use client';

import SpecialProgramLandingView from '@/components/special-programs/SpecialProgramLandingView';
import { womenOnlyLanding } from '@/lib/special-programs/women-only-landing';

export default function WomenOnlyTreksPageView() {
  return <SpecialProgramLandingView content={womenOnlyLanding} />;
}
