'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDays,
  HeartPulse,
  Mountain,
  Route,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Users,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import TrekInfoCard from '@/components/treks/TrekInfoCard';
import WhyChooseVideo from '@/components/WhyChooseVideo';
import { CONTACT, telUrl, whatsappUrl } from '@/lib/contact';
import { photos } from '@/lib/media';
import { getSpecialProgram, treksForProgram } from '@/lib/special-programs-content';
import { toListingTrek } from '@/lib/treks-listing';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './senior-citizen-treks.css';

const program = getSpecialProgram('senior-citizen')!;

const reviews = [
  {
    id: 'sanat',
    name: 'Sanat Kumar Bardhan',
    batch: "Seniors' group · Chhattisgarh Jungle Trek",
    short:
      'Spending nights in tents amidst the jungle, by the lake and river, was very exciting and felt like being in the lap of nature.',
    full:
      'Indian Treks organised an exciting, carefully paced senior trek through dense forests, river walks, and scenic campsites. Spending nights in tents amidst the jungle, by the lake and river, felt like being in the lap of nature. The group included retired professionals from different cities, and every trekker thoroughly enjoyed the companionship as much as the trail.',
  },
  {
    id: 'praveen',
    name: 'Praveen Kulkarni',
    batch: "Seniors' group · Chhattisgarh Jungle Trek",
    short: 'Happy to meet so many wonderful new friends. Hope to see you again in the mountains.',
    full:
      'Thank you, Indian Treks, for arranging a fantastic trek. This was certainly one of the best trails I have ever done. The campsite locations were amazing, the day trails had a perfect mix of beauty and challenge, and the food was excellent. Happy to meet so many wonderful new friends. Hope to see you again in the mountains.',
  },
  {
    id: 'meera',
    name: 'Meera Iyer',
    batch: "Seniors' group · Chopta Tungnath",
    short:
      'I never felt rushed. The pace, rest points, and group energy made the Himalayas feel welcoming again.',
    full:
      'I had been hesitant about joining a regular trek because of pace. On this senior-friendly departure, I never felt rushed. The rest points, leader attention, and group energy made the Himalayas feel welcoming again. I came back lighter, more confident, and already asking about the next trail.',
  },
  {
    id: 'ramesh',
    name: 'Ramesh Patel',
    batch: "Seniors' group · Dayara Bugyal",
    short:
      'The meadows, conversations, and support on trail made this feel less like a trek and more like rediscovering playfulness.',
    full:
      'The meadows, conversations, and support on trail made this feel less like a trek and more like rediscovering playfulness. The team checked on us regularly, the walking days were thoughtfully planned, and the evenings were filled with stories. I would recommend this to any active senior looking for a meaningful Himalayan experience.',
  },
  {
    id: 'anita',
    name: 'Anita Deshpande',
    batch: "Seniors' group · Nag Tibba",
    short:
      'What stayed with me was the companionship. We laughed, walked, paused, and encouraged each other all the way.',
    full:
      'What stayed with me was the companionship. We laughed, walked, paused, and encouraged each other all the way. The itinerary was comfortable without feeling watered down, and the leaders made sure everyone felt looked after. It was exactly the kind of journey I had been hoping for.',
  },
  {
    id: 'suresh',
    name: 'Suresh Nair',
    batch: "Seniors' group · Kuari Pass",
    short:
      'Grand views, careful pacing, and a team that understood senior travellers made this trek memorable.',
    full:
      'Grand views, careful pacing, and a team that understood senior travellers made this trek memorable. I appreciated the health check-ins, the thoughtful meal planning, and the way the group stayed together without pressure. I returned feeling years younger and already planning my next mountain journey.',
  },
];

const eligibility = [
  {
    label: 'Age',
    body:
      'You should be 58 or above. If you are above 65, speak with our team first — we will assess fitness and recommend the right departure.',
  },
  {
    label: 'Lifestyle',
    body: 'You should lead an active lifestyle and exercise regularly before the trek.',
  },
  {
    label: 'Preparation',
    body: 'By departure day, you should be able to walk 5 km in about 60 minutes comfortably.',
  },
  {
    label: 'Medical clearance',
    body:
      'Share any important medical history with us, and get a doctor’s clearance before you confirm your seat.',
  },
];

const differences = [
  {
    title: 'Route and pace adjustments',
    body:
      'Itineraries favour comfortable walking distances, pre-planned breaks, and camps placed within reach — so the trail feels steady, not rushed.',
    icon: TimerReset,
  },
  {
    title: 'Higher support ratio',
    body:
      'Extra field attention means closer supervision, clearer trail coordination, and more personal care throughout the journey.',
    icon: Users,
  },
  {
    title: 'Comfort-first facilities',
    body:
      'Where possible, we plan for easier camp access, offloading options, cleaner stays, and trail snacks that reduce fatigue across the day.',
    icon: Sparkles,
  },
  {
    title: 'Health checks and emotional ease',
    body:
      'Leaders watch energy, hydration, and comfort closely — so seniors feel looked after, confident, and free to enjoy the mountains.',
    icon: HeartPulse,
  },
];

const safetyPillars = [
  {
    title: 'People',
    body:
      'Our trek leaders and mountain staff are trained for trail safety, altitude awareness, and calm emergency response — with extra attention to group pacing.',
    icon: Users,
  },
  {
    title: 'Processes',
    body:
      'Screening, briefings, daily check-ins, hydration reminders, and route contingency plans help us reduce risk before and during the trek.',
    icon: ShieldCheck,
  },
  {
    title: 'Equipment',
    body:
      'Each group is backed by medical essentials, communication coordination, and route-appropriate support gear for confident field response.',
    icon: Mountain,
  },
];

const gallery = [
  { src: photos.chopta, alt: 'Senior trekkers walking through an open Himalayan ridge' },
  { src: photos.vof, alt: 'Wildflower meadow on a senior-friendly mountain trek' },
  { src: photos.uttarakhand, alt: 'Wide mountain views from a scenic seniors trail' },
  { src: photos.triund, alt: 'Rest stop and open skies during a gentle Himalayan climb' },
];

const categories = [
  { label: 'Treks by Month', href: '/treks', icon: CalendarDays },
  { label: 'Treks by Difficulty', href: '/treks', icon: Mountain },
  { label: 'Treks by Experience', href: '/treks', icon: Sparkles },
  { label: 'Treks by Season', href: '/treks', icon: Route },
  { label: 'Treks by Duration', href: '/treks', icon: TimerReset },
  { label: 'Treks by Region', href: '/treks', icon: Users },
];

const parentArticles = [
  {
    title: 'What Happens When Families Trek Together?',
    excerpt:
      'The deeper benefits of family trekking — uninterrupted time, confidence, nature, teamwork, and memories that last longer than the mountain view.',
    href: '/blog/family-trekking-in-india',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop',
    read: '18 min read',
  },
  {
    title: 'How to prepare your parents for a Himalayan trek',
    excerpt:
      'Fitness, pacing expectations, packing basics, and the conversations that make senior departures feel calm and confident.',
    href: '/how-to-prepare',
    image: photos.chopta,
    read: '8 min read',
  },
  {
    title: 'A gentle fitness plan for senior travellers',
    excerpt:
      'A practical walk-and-strength routine so parents can arrive trail-ready without overtraining before departure.',
    href: '/fitness-training-plan',
    image: photos.triund,
    read: '7 min read',
  },
  {
    title: 'Altitude awareness for older trekkers',
    excerpt:
      'What families should know about altitude, recovery, and when to slow down — so the mountains stay enjoyable.',
    href: '/altitude-sickness-guide',
    image: photos.uttarakhand,
    read: '6 min read',
  },
];

export default function SeniorCitizenTreksPageView() {
  const list = treksForProgram(program).slice(0, 6).map(toListingTrek);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 4);

  return (
    <div className="it-senior">
      <section className="it-senior__hero">
        <div className="it-senior__hero-media">
          <Image src={program.heroImage} alt={program.title} fill sizes="100vw" priority />
        </div>
        <div className="it-senior__hero-overlay" />

        <div className="it-senior__hero-inner">
          <div className="it-senior__hero-copy">
            <p className="it-senior__eyebrow">Special programmes</p>
            <h1>
              Special Treks <em>for Seniors</em>
            </h1>
            <p className="it-senior__tagline">Reconnect with your inner child</p>
            <p className="it-senior__lead">
              Thoughtfully paced Himalayan journeys for travellers 58+, built around comfort,
              companionship, and the quiet joy of trekking with your peers.
            </p>
            <div className="it-senior__hero-actions">
              <a
                className="it-senior__btn it-senior__btn--primary"
                href={whatsappUrl('Hi Indian Treks! I want details for Senior Citizen Treks.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp us
              </a>
              <a className="it-senior__btn it-senior__btn--ghost" href={telUrl()}>
                Call {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>

          <aside className="it-senior__hero-card">
            <p className="it-senior__hero-card-kicker">Built differently</p>
            <h2>Why seniors choose these departures</h2>
            <p>
              Regular groups can feel too fast. These journeys bring age peers together on routes
              chosen for comfort, confidence, and shared stories — so the mountains feel joyful
              again.
            </p>
            <ul>
              <li>Gentle pacing and carefully shortlisted trails</li>
              <li>Higher on-trail attention and support</li>
              <li>Companionship that makes the journey feel light</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="it-senior__section">
        <div className="it-senior__container it-senior__story">
          <div className="it-senior__story-copy">
            <p className="it-senior__section-kicker">Why special treks for seniors</p>
            <h2>Come back feeling lighter, freer, and years younger</h2>
            <p>
              Over the years, we have seen seniors return from the mountains feeling lighter, more
              playful, and far more confident. Yet many still hesitate to join regular groups —
              worried about keeping pace with younger trekkers.
            </p>
            <p>
              That is why we curate special treks for seniors. Here, everyone belongs to a similar
              age group, moving at a comfortable pace on thoughtfully chosen routes. Among peers,
              seniors feel free, confident, and at ease.
            </p>
            <p>
              And when they trek together, something magical happens — they laugh, share stories,
              and rediscover their inner child. As one senior trekker put it, “I don’t get to bond
              like this every day.”
            </p>
          </div>
          <div className="it-senior__story-media">
            <WhyChooseVideo className="it-whyvid--flush" />
          </div>
        </div>
      </section>

      <section className="it-senior__section it-senior__section--wash">
        <div className="it-senior__container">
          <div className="it-senior__heading it-senior__heading--center">
            <p className="it-senior__section-kicker">Trekker reviews</p>
            <h2>Stories from the trail</h2>
            <p>Real notes from senior travellers who found pace, friendship, and joy in the mountains.</p>
          </div>

          <div className="it-senior__reviews-shell">
            <Swiper
              className="it-senior__reviews-swiper"
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                760: { slidesPerView: 1.15 },
                980: { slidesPerView: 2 },
              }}
            >
              {visibleReviews.map((review) => {
                const open = expandedId === review.id;
                return (
                  <SwiperSlide key={review.id}>
                    <article className={`it-senior__review${open ? ' is-open' : ''}`}>
                      <div className="it-senior__review-meta">
                        <strong>{review.name}</strong>
                        <span>{review.batch}</span>
                      </div>
                      <div className="it-senior__stars" aria-hidden>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>
                      <p className="it-senior__review-quote">
                        “{open ? review.full : review.short}”
                      </p>
                      <button
                        type="button"
                        className="it-senior__review-toggle"
                        onClick={() => setExpandedId(open ? null : review.id)}
                      >
                        {open ? 'Read less' : 'Read more'}
                      </button>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="it-senior__reviews-actions">
              <button
                type="button"
                className="it-senior__reviews-more"
                onClick={() => {
                  setShowAllReviews((v) => !v);
                  setExpandedId(null);
                }}
              >
                {showAllReviews ? 'See less reviews' : 'See more reviews'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="it-senior__section">
        <div className="it-senior__container it-senior__split">
          <div>
            <p className="it-senior__section-kicker">Whom are these treks meant for?</p>
            <h2>A few requirements keep the journey safe and joyful</h2>
            <p className="it-senior__intro">
              These are not extreme expeditions — but they are still Himalayan journeys. Clearing
              these basics helps us place you on the right trail.
            </p>
          </div>
          <div className="it-senior__panel">
            <ul className="it-senior__eligibility">
              {eligibility.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong>
                  <span>{item.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="it-senior__promo-wrap">
        <div className="it-senior__container">
          <div className="it-senior__promo">
            <span>
              Looking for a comfort-first Himalayan plan designed for senior travellers?
            </span>
            <Link href="/contact">Talk to our team →</Link>
          </div>
        </div>
      </div>

      <section className="it-senior__section it-senior__section--soft">
        <div className="it-senior__container">
          <div className="it-senior__heading">
            <p className="it-senior__section-kicker">Available treks</p>
            <h2>Departures designed with seniors in mind</h2>
            <p>
              Shortlisted for measured pace, scenic reward, and a more manageable overall experience —
              with extra attention to support and comfort.
            </p>
          </div>
          <div className="it-senior__note">
            With a higher support approach and comfort-focused planning, some senior-oriented
            departures may carry a modest additional service fee compared with regular batches.
          </div>
          <div className="it-senior__grid">
            {list.map((trek) => (
              <TrekInfoCard key={trek.id} trek={trek} fill />
            ))}
          </div>
        </div>
      </section>

      <section className="it-senior__section">
        <div className="it-senior__container">
          <div className="it-senior__heading it-senior__heading--narrow">
            <p className="it-senior__section-kicker">How senior treks are different</p>
            <h2>Not regular treks, repackaged</h2>
            <p>
              After 30, muscle mass declines steadily. These journeys are redesigned around pace,
              terrain, and care — so seniors can trek comfortably and joyfully.
            </p>
          </div>
          <div className="it-senior__features">
            {differences.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="it-senior__feature">
                  <div className="it-senior__feature-icon">
                    <Icon size={20} strokeWidth={2.1} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="it-senior__section it-senior__section--wash">
        <div className="it-senior__container">
          <div className="it-senior__heading it-senior__heading--narrow">
            <p className="it-senior__section-kicker">Safety</p>
            <h2>How we keep seniors safe on trail</h2>
            <p>
              Safety is non-negotiable. Our approach rests on three pillars — people, processes, and
              equipment — so support stays proactive, not reactive.
            </p>
          </div>
          <div className="it-senior__pillars">
            {safetyPillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="it-senior__pillar">
                  <div className="it-senior__pillar-head">
                    <span className="it-senior__pillar-num" aria-hidden>
                      {index + 1}
                    </span>
                    <span className="it-senior__pillar-icon">
                      <Icon size={18} strokeWidth={2.15} />
                    </span>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="it-senior__section">
        <div className="it-senior__container">
          <div className="it-senior__heading it-senior__heading--center">
            <p className="it-senior__section-kicker">Photo gallery</p>
            <h2>Moments from the mountains</h2>
          </div>
          <div className="it-senior__gallery">
            {gallery.map((image) => (
              <figure key={image.alt} className="it-senior__gallery-item">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 100vw, 25vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="it-senior__section it-senior__section--soft">
        <div className="it-senior__container">
          <div className="it-senior__heading">
            <p className="it-senior__section-kicker">Treks by categories</p>
            <h2>Explore the wider catalogue</h2>
            <p>Compare senior-friendly options with the rest of our Himalayan collection.</p>
          </div>
          <div className="it-senior__categories">
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href} className="it-senior__category-card">
                  <span className="it-senior__category-ico" aria-hidden>
                    <Icon size={18} strokeWidth={2.1} />
                  </span>
                  <span className="it-senior__category-label">{item.label}</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="it-senior__section">
        <div className="it-senior__container">
          <div className="it-senior__blog-head">
            <div>
              <p className="it-senior__section-kicker">Articles</p>
              <h2>Must read for parents</h2>
            </div>
            <Link href="/blog" className="it-senior__blog-all">
              View all <i className="fa-solid fa-arrow-right" aria-hidden />
            </Link>
          </div>

          {/* Mobile: blog-style horizontal cards */}
          <div className="it-senior__blog-mobile">
            {parentArticles.map((article) => (
              <Link key={article.href} href={article.href} className="it-senior__blog-mcard">
                <span className="it-senior__blog-mcard-media">
                  <Image src={article.image} alt="" fill sizes="120px" />
                </span>
                <span className="it-senior__blog-mcard-body">
                  <span className="it-senior__blog-meta">
                    <span>{article.read}</span>
                  </span>
                  <strong>{article.title}</strong>
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop: featured + grid like homepage Blog */}
          <div className="it-senior__blog-desk">
            {parentArticles[0] ? (
              <Link href={parentArticles[0].href} className="it-senior__blog-feature">
                <span className="it-senior__blog-feature-media">
                  <Image src={parentArticles[0].image} alt="" fill sizes="(max-width: 1100px) 100vw, 50vw" />
                </span>
                <span className="it-senior__blog-feature-body">
                  <span className="it-senior__blog-meta">{parentArticles[0].read}</span>
                  <strong>{parentArticles[0].title}</strong>
                  <span className="it-senior__blog-excerpt">{parentArticles[0].excerpt}</span>
                </span>
              </Link>
            ) : null}
            {parentArticles.slice(1).map((article) => (
              <Link key={article.href} href={article.href} className="it-senior__blog-card">
                <span className="it-senior__blog-card-media">
                  <Image src={article.image} alt="" fill sizes="25vw" />
                </span>
                <span className="it-senior__blog-card-body">
                  <span className="it-senior__blog-meta">{article.read}</span>
                  <strong>{article.title}</strong>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="it-senior__section">
        <div className="it-senior__container">
          <div className="it-senior__cta">
            <div>
              <p className="it-senior__section-kicker">Still choosing?</p>
              <h2>Tell us your age, fitness, and preferred dates</h2>
              <p>
                We will shortlist the most suitable senior-friendly trek or yatra from our current
                departures — with clear guidance on pace and support.
              </p>
            </div>
            <div className="it-senior__cta-actions">
              <a
                className="it-senior__btn it-senior__btn--primary"
                href={whatsappUrl(
                  'Hi Indian Treks! Please help me choose a Senior Citizen Trek departure.',
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get trek advice
              </a>
              <Link className="it-senior__btn it-senior__btn--ghost" href="/contact">
                Contact page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
