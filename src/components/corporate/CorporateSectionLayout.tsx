import CorporateHubHeader from '@/components/corporate/CorporateHubHeader';
import '@/components/corporate/corporate-hub.css';

export default function CorporateSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="it-corporate-section">
      <CorporateHubHeader />
      <div className="it-corporate-section__body">{children}</div>
    </div>
  );
}
