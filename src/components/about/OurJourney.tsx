/**
 * UI/UX mirrored from https://www.abercrombiekent.com/about-us — “Our Journey Began in Africa”
 * Sticky stacked chapters: each panel pins; the next slides over it.
 * Same sticky scroll flow on phone and desktop (phone stacks image above copy).
 */

const CHAPTERS = [
  {
    id: '2005',
    year: '2005',
    title: 'Roots in the Himalaya',
    accentWord: 'Himalaya',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1200&fit=crop',
    imageAlt: 'Sunrise over Himalayan peaks',
    paragraphs: [
      'Long before Indian Treks was established, Mr. Vijay Rana had already been working on the ground in trekking and mountaineering since 2005.',
      'With hands-on Himalayan experience across Uttarakhand, Himachal Pradesh, and Ladakh, he prioritized quality of work, safety, and real mountain experience over numbers alone.',
    ],
  },
  {
    id: '2016',
    year: '2016',
    title: 'Indian Treks Is Founded',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=1200&fit=crop',
    imageAlt: 'High-altitude Himalayan trail',
    paragraphs: [
      'Brothers Mr. Vijay Rana and Mr. Vivek Rana founded Indian Treks in Dehradun, Uttarakhand — building a company that delivers authentic, customized, and responsible Himalayan adventures.',
      'Born and raised in a remote Himalayan village, the founders shaped Indian Treks into an organization that is vocal for locals and deeply committed to sustainable tourism.',
    ],
  },
  {
    id: 'routes',
    year: 'Growth',
    title: '200+ Routes & Expeditions',
    image:
      'https://images.unsplash.com/photo-1544735716-392fe403270d?w=900&h=1200&fit=crop',
    imageAlt: 'Temple and mountain landscape on a Himalayan pilgrimage route',
    paragraphs: [
      'Indian Treks expanded into 200+ trekking routes and 12+ high-altitude expeditions, along with camping, rafting, mountaineering, and customized itineraries.',
      'Journeys for individuals, groups, schools, and corporates were built around safety, comfort, and immersive mountain experience.',
    ],
  },
  {
    id: 'scale',
    year: 'Today',
    title: '20,000+ Trekkers Every Year',
    image:
      'https://images.unsplash.com/photo-1454496522488-7a8e5932c6a4?w=900&h=1200&fit=crop',
    imageAlt: 'Trekkers on a snow-dusted Himalayan ridge',
    paragraphs: [
      'Today, Indian Treks organizes 20,000+ trekkers every year — a trusted community for Himalayan treks and adventure travel.',
      'Around 50 specialists, including more than 20 qualified guides and tour leaders, deliver excellent experiences under one roof.',
    ],
  },
  {
    id: 'values',
    year: 'Values',
    title: 'Leave No Trace & Eco-Tourism',
    image:
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&h=1200&fit=crop',
    imageAlt: 'Trekking group with guides on a mountain trail',
    paragraphs: [
      'Indiantreks has taken the Eco-Tourism Pledge. Leave No Trace is a fundamental belief — unspoiled natural settings should remain untouched for future hikers.',
      'We prefer remote rural locations and help residents gain confidence and resources so they feel they have a stake in sustainable tourism.',
    ],
  },
  {
    id: 'trust',
    year: 'Trust',
    title: 'Authorized & Recognized',
    image:
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=900&h=1200&fit=crop',
    imageAlt: 'Dramatic Himalayan valley under open sky',
    paragraphs: [
      'Recognized as an Authorized Adventure Tour Operator by the Ministry of Tourism, Government of India — with UTDB, MSME/Udyam, DGFT, and ISO 9001:2015 registrations.',
      'From permits to ethical trekking practices, we take care of the details so you can focus on the adventure.',
    ],
  },
] as const;

export default function OurJourney() {
  return (
    <section
      id="our-journey"
      className="it-sticky-journey relative z-0 scroll-mt-24 sm:scroll-mt-28"
      aria-label="Our journey"
    >
      <style>{`
        .it-sticky-journey {
          --it-journey-bg: #f4f7f4;
          --it-journey-text: #141414;
          --it-journey-muted: #3f3f3f;
          /* Mobile: pin to viewport top so stack works while header auto-hides */
          --it-journey-header: 0px;
          background: var(--it-journey-bg);
          overflow: visible;
          width: 100%;
          max-width: 100vw;
        }

        @media (min-width: 1024px) {
          .it-sticky-journey {
            --it-journey-header: 4rem; /* desktop fixed header h-16 */
          }
        }

        .it-sticky-journey__panel {
          position: -webkit-sticky;
          position: sticky;
          top: var(--it-journey-header);
          z-index: 1;
          display: flex;
          align-items: stretch;
          justify-content: center;
          height: 100vh;
          height: 100svh;
          height: 100dvh;
          isolation: isolate;
          background: var(--it-journey-bg);
        }

        @media (min-width: 1024px) {
          .it-sticky-journey__panel {
            height: calc(100vh - var(--it-journey-header));
            height: calc(100dvh - var(--it-journey-header));
          }
        }

        .it-sticky-journey__panel:nth-child(1) { z-index: 1; }
        .it-sticky-journey__panel:nth-child(2) { z-index: 2; }
        .it-sticky-journey__panel:nth-child(3) { z-index: 3; }
        .it-sticky-journey__panel:nth-child(4) { z-index: 4; }
        .it-sticky-journey__panel:nth-child(5) { z-index: 5; }
        .it-sticky-journey__panel:nth-child(6) { z-index: 6; }

        .it-sticky-journey__grid {
          display: grid;
          width: 100%;
          height: 100%;
          min-height: 0;
          grid-template-rows: minmax(0, 1fr) minmax(0, 1.05fr);
          background: var(--it-journey-bg);
        }

        @media (min-width: 640px) {
          .it-sticky-journey__grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: minmax(0, 1fr);
          }
        }

        .it-sticky-journey__media {
          position: relative;
          min-height: 0;
          height: 100%;
          overflow: hidden;
        }

        @media (max-width: 1023px) {
          .it-sticky-journey__media::after {
            content: '';
            position: absolute;
            inset: 0 0 auto;
            height: calc(3.5rem + env(safe-area-inset-top, 0px));
            background: linear-gradient(to bottom, rgba(0,0,0,0.28), transparent);
            pointer-events: none;
            z-index: 1;
          }
        }

        .it-sticky-journey__media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .it-sticky-journey__copy {
          display: flex;
          min-height: 0;
          height: 100%;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          background: var(--it-journey-bg);
          padding: 0.75rem 1rem calc(4.75rem + env(safe-area-inset-bottom, 0px));
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .it-sticky-journey__copy {
            align-items: center;
            padding: 0 12%;
          }
        }

        @media (min-width: 1024px) {
          .it-sticky-journey__copy {
            padding-left: 20%;
            padding-right: 20%;
          }
        }

        .it-sticky-journey__inner {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          max-width: 34rem;
          width: 100%;
          min-height: 0;
        }

        @media (min-width: 640px) {
          .it-sticky-journey__inner { gap: 1.25rem; }
        }

        .it-sticky-journey__title {
          margin: 0;
          font-family: var(--font-heading), ui-sans-serif, system-ui, sans-serif;
          font-size: clamp(1.2rem, 4.2vw, 1.85rem);
          font-weight: 700;
          line-height: 1.22;
          letter-spacing: -0.02em;
          color: var(--it-journey-text);
        }

        .it-sticky-journey__title span { color: #16a34a; }

        .it-sticky-journey__year {
          margin: 0;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #16a34a;
        }

        .it-sticky-journey__body {
          margin: 0;
          font-size: 0.8125rem;
          line-height: 1.55;
          color: var(--it-journey-muted);
        }

        @media (min-width: 640px) {
          .it-sticky-journey__year {
            font-size: 0.75rem;
            letter-spacing: 0.16em;
          }
          .it-sticky-journey__body {
            font-size: 1rem;
            line-height: 1.75;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .it-sticky-journey__panel {
            position: relative;
            top: auto;
            height: auto;
            min-height: 100svh;
          }
        }
      `}</style>

      {CHAPTERS.map((chapter) => (
        <div key={chapter.id} className="it-sticky-journey__panel">
          <div className="it-sticky-journey__grid">
            <div className="it-sticky-journey__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={chapter.image} alt={chapter.imageAlt} />
            </div>
            <div className="it-sticky-journey__copy">
              <div className="it-sticky-journey__inner">
                <p className="it-sticky-journey__year">{chapter.year}</p>
                <h2 className="it-sticky-journey__title">
                  {'accentWord' in chapter && chapter.accentWord ? (
                    <>
                      Roots in the <span>{chapter.accentWord}</span>
                    </>
                  ) : (
                    chapter.title
                  )}
                </h2>
                {chapter.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="it-sticky-journey__body">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
