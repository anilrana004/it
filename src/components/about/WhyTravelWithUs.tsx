import WhyChooseVideo from '@/components/WhyChooseVideo';

/**
 * UI/UX mirrored from https://roopkundheaven.in/about-us/ — “Why Travel With Us”:
 * centered kicker + accent title + subcopy, 4 feature cards with top accent bar,
 * rounded YouTube autoplay frame with soft brand glow.
 */

const FEATURES = [
  {
    icon: 'fa-solid fa-users',
    title: 'Small Groups',
    desc: 'We think that going on outdoor excursions in small groups is the greatest approach to fully appreciate what the landscape has to offer.',
  },
  {
    icon: 'fa-solid fa-calendar-check',
    title: 'Scheduled Departures',
    desc: 'We use fixed departures to keep costs down and guarantee a departure date regardless of weather or other unforeseen circumstances (Force Majeure).',
  },
  {
    icon: 'fa-solid fa-campground',
    title: 'Comfortable Stay',
    desc: 'Proper, good-quality tents and sleeping bags are provided on a double and triple sharing basis — always neat and clean.',
  },
  {
    icon: 'fa-solid fa-leaf',
    title: 'Leave No Trace',
    desc: 'These unspoiled natural settings should remain untouched for future hikers. Leave No Trace is one of Indiantreks’ fundamental beliefs.',
  },
  {
    icon: 'fa-solid fa-mobile-screen',
    title: 'Disconnect To Connect',
    desc: 'We help people rediscover their personal and spiritual connections to the natural world by putting down phones and modern gadgets.',
  },
  {
    icon: 'fa-solid fa-seedling',
    title: 'Environmental Tourism',
    desc: 'Indiantreks has taken the Eco-Tourism Pledge, demonstrating our commitment to sustainable practices in all of our operations.',
  },
  {
    icon: 'fa-solid fa-handshake',
    title: 'Sustainable Tourism',
    desc: 'We prefer remote rural locations and help residents gain the confidence and resources they need to feel they have a stake.',
  },
  {
    icon: 'fa-solid fa-utensils',
    title: 'Hygienic Food on Trek',
    desc: 'Our team is dedicated to safety and proper hygienic food throughout the trek — washable utensils and a neat, clean serving area every time.',
  },
] as const;

export default function WhyTravelWithUs() {
  return (
    <section className="it-whyus" aria-labelledby="it-whyus-title">
      <style>{`
        .it-whyus {
          --it-primary: #16a34a;
          --it-primary-dark: #15803d;
          --it-primary-soft: #f0fdf4;
          --it-primary-mid: #4ade80;
          --it-border: rgba(22, 163, 74, 0.14);
          --it-text: #141414;
          --it-wrap: 1180px;
          padding: 60px 0;
          background:
            radial-gradient(80% 42% at 50% 100%, rgba(220, 252, 231, 0.9), transparent 72%);
        }

        .it-whyus * { box-sizing: border-box; }

        .it-whyus__wrap {
          width: min(var(--it-wrap), calc(100% - 34px));
          margin: 0 auto;
        }

        .it-whyus__head {
          text-align: center;
          max-width: 820px;
          margin: 0 auto;
        }

        .it-whyus__kicker {
          display: inline-flex;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid var(--it-border);
          color: var(--it-primary);
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 12px;
          background: #fff;
        }

        .it-whyus__title {
          margin: 0 0 10px;
          font-family: var(--font-heading), ui-sans-serif, system-ui, sans-serif;
          font-size: 40px;
          font-weight: 900;
          letter-spacing: -1px;
          line-height: 1.1;
          color: var(--it-text);
        }

        .it-whyus__title span {
          color: var(--it-primary);
        }

        .it-whyus__sub {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          font-weight: 500;
          color: #3f3f3f;
        }

        .it-whyus__grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-top: 24px;
        }

        .it-whyus__card {
          padding: 18px;
          border-radius: 18px;
          border: 1px solid var(--it-border);
          background: #fff;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          transition: 0.25s ease;
          position: relative;
          overflow: hidden; /* clip top accent to card corners */
        }

        .it-whyus__card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--it-primary), var(--it-primary-mid));
          border-radius: 0;
          pointer-events: none;
        }

        .it-whyus__card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 30px rgba(22, 163, 74, 0.12);
        }

        .it-whyus__icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(#fff, var(--it-primary-soft));
          border: 1px solid var(--it-border);
          color: var(--it-primary);
          margin-bottom: 12px;
          font-size: 16px;
        }

        .it-whyus__card h3 {
          margin: 0 0 6px;
          font-size: 15px;
          font-weight: 800;
          color: var(--it-text);
          line-height: 1.3;
        }

        .it-whyus__card p {
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
          font-weight: 500;
          color: #3f3f3f;
        }

        @media (max-width: 1100px) {
          .it-whyus__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .it-whyus__title { font-size: 34px; }
        }

        @media (max-width: 640px) {
          .it-whyus { padding: 36px 0 40px; }
          .it-whyus__wrap { width: min(var(--it-wrap), calc(100% - 24px)); }
          .it-whyus__head { margin-bottom: 22px; }
          .it-whyus__kicker { font-size: 12px; padding: 6px 10px; }
          .it-whyus__title { font-size: 24px; line-height: 1.2; letter-spacing: -0.4px; }
          .it-whyus__sub { font-size: 13px; line-height: 1.65; }
          .it-whyus__grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .it-whyus__card { padding: 14px; border-radius: 14px; }
        }
      `}</style>

      <div className="it-whyus__wrap">
        <div className="it-whyus__head">
          <div className="it-whyus__kicker">Why Choose Indian Treks</div>
          <h2 className="it-whyus__title" id="it-whyus-title">
            Experience the <span>real Himalayas</span> with us
          </h2>
          <p className="it-whyus__sub">
            Your time is valuable, and when you book with Indiantreks, we make it a priority to put
            together an unforgettable adventure for you, drawing on our extensive knowledge of the
            tourism industry. The experience you receive is a reflection of our expertise and years of
            experience working in the tourism business.
          </p>
        </div>

        <div className="it-whyus__grid">
          {FEATURES.map((f) => (
            <article key={f.title} className="it-whyus__card">
              <div className="it-whyus__icon" aria-hidden>
                <i className={f.icon} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>

        <WhyChooseVideo />
      </div>
    </section>
  );
}
