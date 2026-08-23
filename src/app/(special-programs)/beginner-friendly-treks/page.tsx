import type { Metadata } from 'next';
import SpecialProgramPageView from '@/components/special-programs/SpecialProgramPageView';
import { getSpecialProgram } from '@/lib/special-programs-content';

const program = getSpecialProgram('beginner')!;

export const metadata: Metadata = {
  title: `${program.title} | Indian Treks`,
  description: program.lead,
};

export default function BeginnerFriendlyTreksPage() {
  return <SpecialProgramPageView program={program} />;
}
