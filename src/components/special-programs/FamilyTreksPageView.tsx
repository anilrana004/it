'use client';

import SpecialProgramLandingView from '@/components/special-programs/SpecialProgramLandingView';
import { familyLanding } from '@/lib/special-programs/family-landing';

export default function FamilyTreksPageView() {
  return <SpecialProgramLandingView content={familyLanding} />;
}
