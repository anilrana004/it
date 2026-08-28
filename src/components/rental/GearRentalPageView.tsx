'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { treks, trekDetailPath } from '@/lib/data';
import { whatsappUrl } from '@/lib/contact';
import {
  GEAR_CATALOG,
  GEAR_CATEGORIES,
  GEAR_FAQS,
  GEAR_FALLBACK_IMAGE,
  GEAR_RENT_VS_BUY,
  GEAR_STEPS,
  GEAR_STORES,
  GEAR_STORY_REVIEWS,
  GEAR_TIMELINE,
  cashDepositForTotal,
  cartForTrek,
  cartSubtotal,
  formatGearLines,
  gearSave,
  getGearById,
  getGearBlogArticlesSafe,
  readGearCart,
  removeGearLine,
  subscribeGearCart,
  upsertGearLine,
  type GearCartLine,
  type GearCategory,
  type GearItem,
} from '@/lib/gear-rental';
import GearRentalHero from '@/components/rental/GearRentalHero';
import GearRentalIntro from '@/components/rental/GearRentalIntro';
import GearRentModal from '@/components/rental/GearRentModal';
import StoryReviewsSection from '@/components/reviews/StoryReviewsSection';
import LandingBlogSection from '@/components/landing/LandingBlogSection';
import '../landing/landing-reviews-blog.css';
import './gear-rental.css';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const CATEGORY_ICONS: Record<GearCategory, string> = {
  all: 'fa-layer-group',
  footwear: 'fa-shoe-prints',
  warmth: 'fa-cloud-sun',
  packs: 'fa-backpack',
  accessories: 'fa-compass',
};

function GearRentalCard({
  item,
  added,
  onRent,
}: {
  item: GearItem;
  added?: GearCartLine;
  onRent: () => void;
}) {
  const [imgSrc, setImgSrc] = useState(item.img);

  useEffect(() => {
    setImgSrc(item.img);
  }, [item.img]);

  return (
    <article
      className={`it-rental__card${added ? ' is-added' : ''}`}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('button, a')) return;
        onRent();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onRent();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Rent ${item.name}`}
    >
      <div className="it-rental__card-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          onError={() => setImgSrc(GEAR_FALLBACK_IMAGE)}
        />
        {added ? <span className="it-rental__badge">In booking</span> : null}
        <span className="it-rental__card-save">Save {inr(gearSave(item))}</span>
      </div>
      <div className="it-rental__card-body">
        <div className="it-rental__card-top">
          <h3>{item.name}</h3>
          <p>{item.tagline}</p>
        </div>
        <ul className="it-rental__card-specs" aria-label={`${item.name} details`}>
          <li>
            <i className="fa-solid fa-users" aria-hidden />
            <span>{item.rentedLastMonth.toLocaleString('en-IN')} rented last season</span>
          </li>
          {item.sizes?.length ? (
            <li>
              <i className="fa-solid fa-ruler-horizontal" aria-hidden />
              <span>{item.sizes.length} sizes available</span>
            </li>
          ) : null}
        </ul>
        <div className="it-rental__card-foot">
          <div className="it-rental__card-price">
            <strong>{inr(item.price)}</strong>
            <small>/trek</small>
          </div>
          <button
            type="button"
            className="it-rental__card-btn"
            onClick={(e) => {
              e.stopPropagation();
              onRent();
            }}
          >
            {added ? 'Edit size' : 'Rent'}
          </button>
        </div>
      </div>
    </article>
  );
}

type Props = {
  initialTrekId?: string;
};

export default function GearRentalPageView({ initialTrekId }: Props) {
  const router = useRouter();
  const blogArticles = useMemo(() => getGearBlogArticlesSafe(), []);
  const [category, setCategory] = useState<GearCategory>('all');
  const [trekId, setTrekId] = useState(initialTrekId ?? '');
  const [lines, setLines] = useState<GearCartLine[]>([]);
  const [picking, setPicking] = useState<GearItem | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [compare, setCompare] = useState<'rent' | 'buy'>('rent');

  const selectedTrek = treks.find((t) => t.id === trekId);

  useEffect(() => {
    if (initialTrekId && treks.some((t) => t.id === initialTrekId)) {
      setTrekId(initialTrekId);
    }
  }, [initialTrekId]);

  useEffect(() => {
    const refresh = () => setLines(readGearCart());
    refresh();
    return subscribeGearCart(refresh);
  }, []);

  const trekLines = useMemo(() => (trekId ? cartForTrek(trekId, lines) : []), [lines, trekId]);
  const rentalTotal = cartSubtotal(trekLines);
  const deposit = cashDepositForTotal(rentalTotal);

  const products = useMemo(
    () => (category === 'all' ? GEAR_CATALOG : GEAR_CATALOG.filter((item) => item.category === category)),
    [category],
  );

  const trekGroups = useMemo(() => {
    const trips = treks.filter((t) => t.type !== 'yatra');
    const yatras = treks.filter((t) => t.type === 'yatra');
    return [
      { label: 'Treks & trips', items: trips },
      { label: 'Sacred yatras', items: yatras },
    ];
  }, []);

  const rentTotal = GEAR_RENT_VS_BUY.reduce((sum, row) => sum + row.rent, 0);
  const buyTotal = GEAR_RENT_VS_BUY.reduce((sum, row) => sum + row.buy, 0);
  const activeCategory = GEAR_CATEGORIES.find((chip) => chip.id === category);

  const openPicker = (item: GearItem) => setPicking(item);
  const existing = picking ? trekLines.find((line) => line.gearId === picking.id) : undefined;

  const continueBooking = () => {
    if (!selectedTrek) return;
    router.push(`${trekDetailPath(selectedTrek)}#rent-gear`);
  };

  const enquire = () => {
    const bits = [
      'Hi Indian Treks! I want to rent gear.',
      selectedTrek ? `Trip: ${selectedTrek.title}` : '',
      trekLines.length ? `Gear: ${formatGearLines(trekLines)}` : 'Please help me pick sizes.',
      rentalTotal ? `Rental total: ${inr(rentalTotal)}` : '',
    ].filter(Boolean);
    window.open(whatsappUrl(bits.join('\n')), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="it-rental">
      <GearRentalHero />
      <GearRentalIntro />

      <section id="rent-or-buy" className="it-rental__compare">
        <div className="it-rental__shell">
          <div className="it-rental__section-head">
            <p>Should you rent or buy?</p>
            <h2>A full kit for a 6-day Himalayan trek</h2>
          </div>

          <div className="it-rental__compare-summary" aria-label="Rent versus buy savings">
            <div className="it-rental__compare-summary-card it-rental__compare-summary-card--rent">
              <span>Rent the full kit</span>
              <strong>{inr(rentTotal)}</strong>
              <small>6-day trek · GST extra</small>
            </div>
            <div className="it-rental__compare-summary-mid">
              <span className="it-rental__compare-summary-badge">You save</span>
              <strong>{inr(buyTotal - rentTotal)}</strong>
              <span>{Math.round((1 - rentTotal / buyTotal) * 100)}% less than buying</span>
            </div>
            <div className="it-rental__compare-summary-card it-rental__compare-summary-card--buy">
              <span>Buy the same kit</span>
              <strong>{inr(buyTotal)}</strong>
              <small>Typical India retail</small>
            </div>
          </div>

          <div className="it-rental__compare-toggle" role="tablist" aria-label="Rent or buy">
            <button
              type="button"
              role="tab"
              aria-selected={compare === 'rent'}
              className={compare === 'rent' ? 'is-on' : ''}
              onClick={() => setCompare('rent')}
            >
              Rent
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={compare === 'buy'}
              className={compare === 'buy' ? 'is-on' : ''}
              onClick={() => setCompare('buy')}
            >
              Buy
            </button>
          </div>

          <div className={`it-rental__compare-grid is-${compare}`}>
            <div
              className={`it-rental__compare-card it-rental__compare-card--rent${
                compare === 'rent' ? ' is-focus' : ''
              }`}
            >
              <div className="it-rental__compare-card-head">
                <h3>Cost of renting</h3>
                <span className="it-rental__compare-chip it-rental__compare-chip--rent">Recommended</span>
              </div>
              <ul>
                {GEAR_RENT_VS_BUY.map((row) => (
                  <li key={row.id}>
                    <span>{getGearById(row.id)?.name ?? row.id}</span>
                    <strong>{inr(row.rent)}</strong>
                  </li>
                ))}
              </ul>
              <p className="it-rental__compare-note">Charges shown for a typical 6-day trek. GST extra.</p>
              <div className="it-rental__compare-total">
                <span>Total renting</span>
                <b>{inr(rentTotal)}</b>
              </div>
            </div>
            <div className="it-rental__compare-vs" aria-hidden>
              <span>VS</span>
            </div>
            <div
              className={`it-rental__compare-card it-rental__compare-card--buy${
                compare === 'buy' ? ' is-focus' : ''
              }`}
            >
              <div className="it-rental__compare-card-head">
                <h3>Cost of buying</h3>
                <span className="it-rental__compare-chip">One-time purchase</span>
              </div>
              <ul>
                {GEAR_RENT_VS_BUY.map((row) => (
                  <li key={row.id}>
                    <span>{getGearById(row.id)?.name ?? row.id}</span>
                    <strong>{inr(row.buy)}</strong>
                  </li>
                ))}
              </ul>
              <p className="it-rental__compare-note">Typical India retail for comparable kit.</p>
              <div className="it-rental__compare-total">
                <span>Total buying</span>
                <b>{inr(buyTotal)}</b>
              </div>
            </div>
          </div>

          <p className="it-rental__compare-save">
            Save {inr(buyTotal - rentTotal)} by renting — roughly the fee for another Himalayan trek.
          </p>
          <a href="#rental-store" className="it-rental__compare-cta">
            Browse rental store
            <i className="fa-solid fa-arrow-right" aria-hidden />
          </a>
        </div>
      </section>

      <section id="how-renting-works" className="it-rental__steps">
        <div className="it-rental__shell">
          <div className="it-rental__section-head">
            <p>How renting works</p>
            <h2>Book online. Collect at base. Travel light.</h2>
          </div>
          <ol>
            {GEAR_STEPS.map((step) => (
              <li key={step.n}>
                <span>{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="rental-store" className="it-rental__store">
        <div className="it-rental__shell">
          <div className="it-rental__section-head it-rental__section-head--store">
            <p className="it-rental__store-kicker">
              <span className="it-rental__store-kicker-label">
                <i className="fa-solid fa-bag-shopping" aria-hidden />
                Shop from here
                <span className="it-rental__live-pill" aria-label="Live store">
                  Live
                </span>
              </span>
            </p>
            <h2>What we have in store</h2>
            <span className="it-rental__store-kicker-note">
              Pick sizes, add to your booking, collect at base camp on day 1
            </span>
          </div>

          <div className="it-rental__store-toolbar">
            <div className="it-rental__trekbar" id="rental-trek">
              <div className="it-rental__trekbar-head">
                <label htmlFor="gear-trek-select">
                  <i className="fa-solid fa-route" aria-hidden />
                  Renting for
                </label>
                {selectedTrek && trekLines.length > 0 ? (
                  <span className="it-rental__trekbar-pill">
                    {trekLines.reduce((n, l) => n + l.qty, 0)} in cart · {inr(rentalTotal)}
                  </span>
                ) : null}
              </div>
              <select
                id="gear-trek-select"
                value={trekId}
                onChange={(e) => setTrekId(e.target.value)}
              >
                <option value="">Select trek, yatra, or trip</option>
                {trekGroups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.items.map((trek) => (
                      <option key={trek.id} value={trek.id}>
                        {trek.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {selectedTrek ? (
                <p className="it-rental__trek-hint">
                  Pickup on day 1 of <strong>{selectedTrek.title}</strong>.{' '}
                  <Link href={`${trekDetailPath(selectedTrek)}#rent-gear`}>Open trip page</Link>
                </p>
              ) : (
                <p className="it-rental__trek-hint">
                  Gear is reserved against an Indian Treks departure — pick your trek first, or choose
                  in the rent modal.
                </p>
              )}
            </div>

            {!trekId ? (
              <aside className="it-rental__store-tip" aria-label="How to rent">
                <strong>3 quick steps</strong>
                <ol>
                  <li>Select your departure</li>
                  <li>Pick gear and lock your size</li>
                  <li>Collect at base camp on day 1</li>
                </ol>
              </aside>
            ) : null}
          </div>

          <div className="it-rental__store-filters">
            <div className="it-rental__store-filter-head">
              <p>
                <strong>{products.length}</strong> items
                {activeCategory ? ` · ${activeCategory.label}` : ''}
              </p>
            </div>
            <div className="it-rental__chips" role="tablist" aria-label="Gear categories">
              {GEAR_CATEGORIES.map((chip) => (
                <button
                  type="button"
                  key={chip.id}
                  role="tab"
                  aria-selected={category === chip.id}
                  className={category === chip.id ? 'is-on' : ''}
                  onClick={() => setCategory(chip.id)}
                >
                  <i className={`fa-solid ${CATEGORY_ICONS[chip.id]}`} aria-hidden />
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          <div className="it-rental__grid">
            {products.map((item) => (
              <GearRentalCard
                key={item.id}
                item={item}
                added={trekLines.find((line) => line.gearId === item.id)}
                onRent={() => openPicker(item)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="pickup-points" className="it-rental__bases">
        <div className="it-rental__shell">
          <div className="it-rental__section-head">
            <p>Pickup points</p>
            <h2>Collect your kit at the base-camp store</h2>
          </div>
          <ul>
            {GEAR_STORES.map((store) => (
              <li key={store.name}>
                <strong>{store.name}</strong>
                <span>{store.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="gear-reviews" className="it-rental__reviews-wrap">
        <div className="it-rental__shell">
          <StoryReviewsSection
            className="it-rental__reviews"
            kicker="Trekker reviews"
            title="What people say about renting with us"
            intro="Real notes from trekkers who travelled light, picked up at base camp, and skipped buying gear for a single trip."
            items={GEAR_STORY_REVIEWS.map((review) => ({
              id: review.id,
              name: review.name,
              subtitle: review.subtitle,
              short: review.short,
              full: review.full,
              trekLink: review.trekLink,
            }))}
            allReviewsHref="/reviews"
          />
        </div>
      </section>

      <section className="it-rental__timeline">
        <div className="it-rental__shell">
          <div className="it-rental__section-head">
            <p>Our story</p>
            <h2>From first base camp to 18,000+ rentals</h2>
          </div>
          <ol className="it-rental__timeline-list">
            {GEAR_TIMELINE.map((item) => (
              <li key={item.year}>
                <span>{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="rental-policies" className="it-rental__faqs">
        <div className="it-rental__shell">
          <div className="it-rental__section-head">
            <p>Got questions?</p>
            <h2>Policies &amp; FAQs</h2>
          </div>
          <div className="it-rental__faq-list">
            {GEAR_FAQS.map((faq, i) => (
              <div key={faq.q} className={openFaq === i ? 'is-open' : ''}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <i className="fa-solid fa-chevron-down" aria-hidden />
                </button>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gear-blog" className="it-rental__blog-wrap">
        <div className="it-rental__shell">
          <LandingBlogSection
            className="it-rental__blog"
            kicker="Trail guides"
            title="Packing tips & trek prep reads"
            items={blogArticles}
          />
        </div>
      </section>

      <section className="it-rental__cta-band">
        <div className="it-rental__shell">
          <div className="it-rental__cta">
            <div>
              <h2>Ready to travel light?</h2>
              <p>
                Pick your departure, add rental gear, and collect sanitised kit at base camp. Our team
                can help with sizes on WhatsApp.
              </p>
            </div>
            <div className="it-rental__cta-actions">
              <a href="#rental-store" className="it-rental__btn it-rental__btn--solid">
                <i className="fa-solid fa-bag-shopping" aria-hidden />
                Browse rental store
              </a>
              <Link href="/treks" className="it-rental__btn it-rental__btn--outline-dark">
                <i className="fa-solid fa-compass" aria-hidden />
                Explore treks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {trekLines.length > 0 && selectedTrek ? (
        <div className="it-rental__dock" role="status" aria-live="polite">
          <div className="it-rental__shell it-rental__dock-inner">
            <div>
              <strong>
                {trekLines.reduce((n, line) => n + line.qty, 0)} items · {inr(rentalTotal)}
              </strong>
              <span>
                {selectedTrek.title} · cash deposit {inr(deposit)} at base
              </span>
            </div>
            <div className="it-rental__dock-actions">
              <button type="button" className="it-rental__btn it-rental__btn--ghost" onClick={enquire}>
                WhatsApp
              </button>
              <button type="button" className="it-rental__btn it-rental__btn--solid" onClick={continueBooking}>
                Continue on trip page
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <GearRentModal
        item={picking}
        trekId={trekId}
        trekGroups={trekGroups}
        trekTitle={selectedTrek?.title}
        initial={existing}
        onClose={() => setPicking(null)}
        onTrekChange={setTrekId}
        onConfirm={({ qty, size }) => {
          if (!trekId || !picking) return;
          upsertGearLine({ gearId: picking.id, trekId, qty, size });
          setPicking(null);
        }}
        onRemove={
          existing && trekId && picking
            ? () => {
                removeGearLine(picking.id, trekId);
                setPicking(null);
              }
            : undefined
        }
      />
    </div>
  );
}
