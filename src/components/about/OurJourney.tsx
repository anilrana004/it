import './our-journey.css';

/**
 * UI/UX mirrored from https://www.abercrombiekent.com/about-us —
 * “Our Journey Began in Africa”: sticky stacked chapters; each panel
 * pins while the next slides over it.
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
      className="it-sticky-journey scroll-mt-24 sm:scroll-mt-28"
      aria-label="Our journey"
    >
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
