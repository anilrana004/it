import Link from 'next/link';
import { CONTACT } from '@/lib/contact';

const FAKE_SITES = ['indiantreks-booking.com', 'indiantreks-payment.com'] as const;

export default function FraudAlertPageView() {
  return (
    <div className="it-support-page it-fraud">
      <div className="it-support-page__wrap">
        <header className="it-support-page__hero it-fraud__hero">
          <p className="it-support-page__eyebrow it-fraud__eyebrow">Stay alert</p>
          <h1 className="it-support-page__title">Beware of Fraudulent Activities</h1>
          <p className="it-support-page__lead">
            Recognize and prevent scams. Indian Treks never asks you to pay on lookalike websites,
            personal UPI IDs, or unofficial social accounts.
          </p>
        </header>

        <article className="it-support-page__card it-fraud__block">
          <p>
            <strong>Fake Websites:</strong> Scammers are creating dummy websites like{' '}
            {FAKE_SITES[0]} or {FAKE_SITES[1]}, that look similar to Indian Treks&apos; official
            website ({CONTACT.officialSite}), to steal your personal and payment information.
          </p>
        </article>

        <article className="it-support-page__card it-fraud__block">
          <p>
            <strong>Fake Accounts:</strong> Fake social media profiles are being created on Telegram
            channels to promote false offers and deals.
          </p>
        </article>

        <article className="it-support-page__card it-fraud__block">
          <p>
            <strong>Unauthorized Commission Programs:</strong> Fraudsters are offering commission
            programs that do not exist.
          </p>
        </article>

        <article className="it-support-page__card it-fraud__report">
          <h2>Encountered A Fraud?</h2>
          <p>
            Indian Treks is not liable if you encounter any such frauds. Please contact your bank
            and the relevant authorities immediately. You can also drop us a mail at{' '}
            <a href={`mailto:${CONTACT.fraudEmail}`}>{CONTACT.fraudEmail}</a> so we can track these
            activities and keep our customers informed.
          </p>
        </article>

        <header className="it-fraud__section-head">
          <h2>What You Can Do to Stay Safe</h2>
        </header>

        <article className="it-support-page__card it-fraud__block">
          <p>
            <strong>Authorized Payment Methods Only:</strong> Please make payments exclusively
            through these official channels: either via the payment link on our website,{' '}
            {CONTACT.officialSite}, or by bank transfer to official Indian Treks accounts whose
            details are shared only by our team. Payments made to any other account or via UPI
            transfer to any unknown account or number are not authorized by us and could expose you
            to potential fraud.
          </p>
        </article>

        <article className="it-support-page__card it-fraud__block">
          <p>
            <strong>Verify the Website:</strong> Always check that you are on the correct website{' '}
            {CONTACT.officialSite}, before entering any personal or payment information and please
            ensure that any payment you make is through our official website.
          </p>
        </article>

        <article className="it-support-page__card it-fraud__block">
          <p>
            <strong>Avoid Suspicious Websites:</strong> Avoid clicking on suspicious websites or
            entering information on unfamiliar websites.
          </p>
        </article>

        <article className="it-support-page__card it-fraud__block">
          <p>
            <strong>Double-Check the Authenticity of the Offers:</strong> If you receive offers or
            discounts that seem unusually generous, double-check their authenticity on our official
            website. Scammers often lure with deals that are too good to be true.
          </p>
        </article>

        <article className="it-support-page__card it-fraud__block">
          <p>
            <strong>Report Suspicious Activity:</strong> If you are contacted by someone promoting
            schemes or asking for money for signups, report it to us immediately at{' '}
            <a href={`mailto:${CONTACT.fraudEmail}`}>{CONTACT.fraudEmail}</a>
          </p>
        </article>

        <article className="it-support-page__card it-fraud__block">
          <p>
            <strong>Update Passwords Regularly:</strong> Regularly update your bank account password
            and avoid using the same password across multiple sites. Enable two-factor
            authentication where possible for added security.
          </p>
        </article>

        <article className="it-support-page__card it-fraud__block">
          <p>
            <strong>Monitor Your Accounts:</strong> Regularly monitor your bank and card statements
            for any unauthorized transactions.
          </p>
        </article>

        <div className="it-support-page__cta">
          <Link href="/payment-policy">
            <i className="fa-solid fa-credit-card" aria-hidden />
            See official payment policy
          </Link>
        </div>
      </div>
    </div>
  );
}
