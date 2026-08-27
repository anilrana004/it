'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  Calendar,
  ChevronDown,
  Headphones,
  Leaf,
  MapPin,
  MessageCircle,
  Mountain,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { photos } from '@/lib/media';
import { whatsappUrl } from '@/lib/contact';
import {
  domesticDestinations,
  domesticHeroTrust,
  domesticSearchWhen,
  domesticSearchWho,
  domesticStats,
  type DomesticDestinationId,
} from '@/lib/domestic-tours-content';

type Props = {
  onBrowse: () => void;
  onSearch: (payload: { where: string; when: string; who: string }) => void;
};

const trustIcons = [MapPin, ShieldCheck, Headphones, Leaf] as const;
const statIcons = [Mountain, Briefcase, Star, Shield] as const;

export default function DomesticHero({ onBrowse, onSearch }: Props) {
  const [where, setWhere] = useState('');
  const [when, setWhen] = useState<string>(domesticSearchWhen[0]);
  const [who, setWho] = useState<string>(domesticSearchWho[0]);

  const submitSearch = (e?: FormEvent) => {
    e?.preventDefault();
    onSearch({ where, when, who });
  };

  const whereLabel =
    domesticDestinations.find((d) => d.id === where)?.name ?? 'Destinations, regions or treks';

  return (
    <section className="it-dt__hero">
      <div className="it-dt__hero-media">
        <Image src={photos.snow} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="it-dt__hero-overlay" />
      <div className="it-dt__hero-glow" aria-hidden />

      <div className="it-dt__hero-shell">
        <div className="it-dt__hero-top">
          <div className="it-dt__hero-copy">
            <p className="it-dt__hero-badge">
              <Mountain className="h-3.5 w-3.5" aria-hidden />
              India Customised Tour Packages
            </p>

            <h1 className="it-dt__hero-title">
              <span className="it-dt__hero-title-main">
                India,
                <Sparkles className="it-dt__hero-spark" aria-hidden />
              </span>
              <span className="it-dt__hero-title-accent">Your Way</span>
            </h1>

            <p className="it-dt__lead">
              Handpicked stays, seamless travel, and itineraries crafted around you. Explore India&apos;s
              mountains, valleys, deserts of the high Himalaya and hidden gems at your own pace — with
              every detail taken care of.
            </p>

            <div className="it-dt__hero-actions">
              <a
                className="it-dt__btn it-dt__btn--primary"
                href={whatsappUrl('Hi Indian Treks! I want to plan a customised domestic India trip.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Plan Your Trip
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <button type="button" className="it-dt__btn it-dt__btn--ghost" onClick={onBrowse}>
                Browse Packages
                <ArrowDown className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          <aside className="it-dt__hero-trust" aria-label="Why book with Indian Treks">
            {domesticHeroTrust.map((item, index) => {
              const Icon = trustIcons[index] ?? MapPin;
              return (
                <div key={item.title} className="it-dt__hero-trust-item">
                  <span className="it-dt__hero-trust-icon">
                    <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.sub}</span>
                  </div>
                </div>
              );
            })}
          </aside>
        </div>

        <form className="it-dt__hero-search" onSubmit={submitSearch} role="search">
          <label className="it-dt__hero-search-field">
            <span className="it-dt__hero-search-label">
              <MapPin className="h-4 w-4" aria-hidden />
              Where to?
            </span>
            <span className="it-dt__hero-search-control">
              <select
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                aria-label="Choose destination"
              >
                <option value="">Destinations, regions or treks</option>
                {domesticDestinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="it-dt__hero-search-chevron" aria-hidden />
            </span>
            <span className="it-dt__hero-search-value">{whereLabel}</span>
          </label>

          <label className="it-dt__hero-search-field">
            <span className="it-dt__hero-search-label">
              <Calendar className="h-4 w-4" aria-hidden />
              When?
            </span>
            <span className="it-dt__hero-search-control">
              <select
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                aria-label="Choose travel dates"
              >
                {domesticSearchWhen.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="it-dt__hero-search-chevron" aria-hidden />
            </span>
            <span className="it-dt__hero-search-value">{when}</span>
          </label>

          <label className="it-dt__hero-search-field">
            <span className="it-dt__hero-search-label">
              <Users className="h-4 w-4" aria-hidden />
              Who&apos;s going?
            </span>
            <span className="it-dt__hero-search-control">
              <select value={who} onChange={(e) => setWho(e.target.value)} aria-label="Choose group type">
                {domesticSearchWho.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="it-dt__hero-search-chevron" aria-hidden />
            </span>
            <span className="it-dt__hero-search-value">{who}</span>
          </label>

          <button type="submit" className="it-dt__hero-search-submit">
            <span className="it-dt__hero-search-submit-icon">
              <Search className="h-5 w-5" aria-hidden />
            </span>
            <span className="it-dt__hero-search-submit-copy">
              <strong>Search Trips</strong>
              <span>Find your perfect adventure</span>
            </span>
          </button>
        </form>

        <div className="it-dt__hero-stats">
          <p className="it-dt__hero-stats-kicker">Why travel with us?</p>
          <div className="it-dt__hero-stats-grid">
            {domesticStats.map((stat, index) => {
              const Icon = statIcons[index] ?? Mountain;
              return (
                <div key={stat.label} className="it-dt__hero-stat">
                  <span className="it-dt__hero-stat-icon">
                    <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                  </span>
                  <div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                    {'sub' in stat ? <em>{stat.sub}</em> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export type DomesticHeroSearch = {
  where: string;
  when: string;
  who: string;
};

export function domesticSearchDestinationId(where: string): DomesticDestinationId | null {
  if (!where) return null;
  return domesticDestinations.some((d) => d.id === where)
    ? (where as DomesticDestinationId)
    : null;
}
