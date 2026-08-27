'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  ChevronDown,
  Globe,
  Headphones,
  MapPin,
  Mountain,
  Plane,
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
  internationalHeroTrust,
  internationalSearchWhen,
  internationalSearchWho,
  internationalStats,
  internationalTrips,
} from '@/lib/international-getaways-content';

type Props = {
  onBrowse: () => void;
  onSearch: (payload: { trek: string; when: string; who: string }) => void;
};

const trustIcons = [ShieldCheck, Shield, Headphones, MapPin] as const;
const statIcons = [Mountain, Calendar, Star, Plane] as const;

export default function InternationalHero({ onBrowse, onSearch }: Props) {
  const [trek, setTrek] = useState('');
  const [when, setWhen] = useState<string>(internationalSearchWhen[0]);
  const [who, setWho] = useState<string>(internationalSearchWho[0]);

  const submitSearch = (e?: FormEvent) => {
    e?.preventDefault();
    onSearch({ trek, when, who });
  };

  const trekLabel =
    internationalTrips.find((t) => t.id === trek)?.title ?? 'EBC, ABC or Annapurna Circuit';

  return (
    <section className="it-ig__hero">
      <div className="it-ig__hero-media">
        <Image src={photos.ebc} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="it-ig__hero-overlay" />
      <div className="it-ig__hero-glow" aria-hidden />

      <div className="it-ig__hero-shell">
        <div className="it-ig__hero-top">
          <div className="it-ig__hero-copy">
            <p className="it-ig__hero-badge">
              <Globe className="h-3.5 w-3.5" aria-hidden />
              International Treks · Nepal
            </p>

            <h1 className="it-ig__hero-title">
              <span className="it-ig__hero-title-main">
                International
                <Sparkles className="it-ig__hero-spark" aria-hidden />
              </span>
              <span className="it-ig__hero-title-accent">Getaways</span>
            </h1>

            <p className="it-ig__lead">
              Legendary Himalayan trails beyond the border — Everest Base Camp, Annapurna Base Camp
              and the Annapurna Circuit, planned from India with permits, lodges and trusted leaders.
            </p>

            <div className="it-ig__hero-actions">
              <button type="button" className="it-ig__btn it-ig__btn--primary" onClick={onBrowse}>
                Explore Treks
                <ArrowDown className="h-4 w-4" aria-hidden />
              </button>
              <a
                className="it-ig__btn it-ig__btn--ghost"
                href={whatsappUrl('Hi Indian Treks! I want to know more about international treks in Nepal.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp us
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          <aside className="it-ig__hero-trust" aria-label="Why trek Nepal with Indian Treks">
            {internationalHeroTrust.map((item, index) => {
              const Icon = trustIcons[index] ?? ShieldCheck;
              return (
                <div key={item.title} className="it-ig__hero-trust-item">
                  <span className="it-ig__hero-trust-icon">
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

        <form className="it-ig__hero-search" onSubmit={submitSearch} role="search">
          <label className="it-ig__hero-search-field">
            <span className="it-ig__hero-search-label">
              <Mountain className="h-4 w-4" aria-hidden />
              Which trek?
            </span>
            <span className="it-ig__hero-search-control">
              <select value={trek} onChange={(e) => setTrek(e.target.value)} aria-label="Choose trek">
                <option value="">EBC, ABC or Annapurna Circuit</option>
                {internationalTrips.map((trip) => (
                  <option key={trip.id} value={trip.id}>
                    {trip.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="it-ig__hero-search-chevron" aria-hidden />
            </span>
            <span className="it-ig__hero-search-value">{trekLabel}</span>
          </label>

          <label className="it-ig__hero-search-field">
            <span className="it-ig__hero-search-label">
              <Calendar className="h-4 w-4" aria-hidden />
              When?
            </span>
            <span className="it-ig__hero-search-control">
              <select value={when} onChange={(e) => setWhen(e.target.value)} aria-label="Choose season">
                {internationalSearchWhen.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="it-ig__hero-search-chevron" aria-hidden />
            </span>
            <span className="it-ig__hero-search-value">{when}</span>
          </label>

          <label className="it-ig__hero-search-field">
            <span className="it-ig__hero-search-label">
              <Users className="h-4 w-4" aria-hidden />
              Who&apos;s going?
            </span>
            <span className="it-ig__hero-search-control">
              <select value={who} onChange={(e) => setWho(e.target.value)} aria-label="Choose group type">
                {internationalSearchWho.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="it-ig__hero-search-chevron" aria-hidden />
            </span>
            <span className="it-ig__hero-search-value">{who}</span>
          </label>

          <button type="submit" className="it-ig__hero-search-submit">
            <span className="it-ig__hero-search-submit-icon">
              <Search className="h-5 w-5" aria-hidden />
            </span>
            <span className="it-ig__hero-search-submit-copy">
              <strong>Search Treks</strong>
              <span>Find your Nepal adventure</span>
            </span>
          </button>
        </form>

        <div className="it-ig__hero-stats">
          <p className="it-ig__hero-stats-kicker">Why travel with us?</p>
          <div className="it-ig__hero-stats-grid">
            {internationalStats.map((stat, index) => {
              const Icon = statIcons[index] ?? Mountain;
              return (
                <div key={stat.label} className="it-ig__hero-stat">
                  <span className="it-ig__hero-stat-icon">
                    <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                  </span>
                  <div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                    <em>{stat.sub}</em>
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

export function internationalSearchTripId(trek: string): string | null {
  if (!trek) return null;
  return internationalTrips.some((t) => t.id === trek) ? trek : null;
}
