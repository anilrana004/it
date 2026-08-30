import PolicyDocPageView from '@/components/support/PolicyDocPageView';
import { TERMS_META, TERMS_SECTIONS } from '@/lib/content/terms-content';

export default function TermsPageView() {
  return (
    <PolicyDocPageView
      meta={TERMS_META}
      sections={TERMS_SECTIONS}
      idPrefix="terms-section"
      mailtoSubject="Terms enquiry — IndianTreks"
    />
  );
}
