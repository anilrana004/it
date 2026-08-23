import SupportHubHeader from '@/components/support/SupportHubHeader';
import '@/components/support/support-hub.css';

/** Wraps support-section pages with the dedicated header + layout offset */
export default function SupportSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="it-support-section">
      <SupportHubHeader />
      <div className="it-support-section__body">{children}</div>
    </div>
  );
}
