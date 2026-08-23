import SpecialProgramsHubHeader from '@/components/special-programs/SpecialProgramsHubHeader';
import '@/components/special-programs/special-programs-hub.css';

export default function SpecialProgramsSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="it-special-section">
      <SpecialProgramsHubHeader />
      <div className="it-special-section__body">{children}</div>
    </div>
  );
}
