import PolicyDocPageView from '@/components/support/PolicyDocPageView';
import { CANCELLATION_META, CANCELLATION_SECTIONS } from '@/lib/content/cancellation-content';

export default function CancellationPageView() {
  return (
    <PolicyDocPageView
      meta={CANCELLATION_META}
      sections={CANCELLATION_SECTIONS}
      idPrefix="cancel-section"
      mailtoSubject="Cancellation enquiry — IndianTreks"
    />
  );
}
