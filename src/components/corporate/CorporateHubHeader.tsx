'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import { CONTACT, telUrl, whatsappUrl } from '@/lib/contact';
import {
  CORPORATE_HUB_LINKS,
  corporateHubActive,
  corporateMailtoUrl,
  isCorporateHubPath,
} from '@/lib/corporate-hub-nav';
import './corporate-hub.css';

/** Dedicated corporate-section header — mirrors Help Centre hub pattern */
export default function CorporateHubHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('it-corporate-mode');
    return () => document.body.classList.remove('it-corporate-mode');
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeight = () => {
      document.documentElement.style.setProperty(
        '--ch-header-height',
        `${el.offsetHeight}px`,
      );
    };

    syncHeight();
    const ro = new ResizeObserver(syncHeight);
    ro.observe(el);
    window.addEventListener('resize', syncHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', syncHeight);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const corpWa = whatsappUrl(
    'Hi Indian Treks! I am interested in your programs (corporate, campus, or school).',
  );

  const onProgramsHub = isCorporateHubPath(pathname);

  return (
    <header ref={headerRef} className="it-corporate-hub" aria-label="Programs">
      <div className="it-corporate-hub__bar">
        <div className="it-corporate-hub__inner">
          <div className="it-corporate-hub__brand-group">
            <Link
              href="/"
              className="it-corporate-hub__logo-link"
              onClick={closeMenu}
              aria-label="Indian Treks — back to home"
            >
              <BrandLogo className="it-corporate-hub__logo" />
            </Link>
            <Link
              href="/corporate"
              className={`it-corporate-hub__brand-tag${onProgramsHub ? ' is-active' : ''}`}
              onClick={closeMenu}
              aria-current={onProgramsHub ? 'page' : undefined}
            >
              Programs
            </Link>
          </div>

          <nav className="it-corporate-hub__nav" aria-label="Programs">
            {CORPORATE_HUB_LINKS.map((item) => {
              const active = corporateHubActive(pathname, item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`it-corporate-hub__link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  title={item.navLabel ? item.label : undefined}
                >
                  {item.navLabel ? (
                    <>
                      <span className="it-corporate-hub__link-text it-corporate-hub__link-text--short">
                        {item.navLabel}
                      </span>
                      <span className="it-corporate-hub__link-text it-corporate-hub__link-text--full">
                        {item.label}
                      </span>
                    </>
                  ) : (
                    item.label
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="it-corporate-hub__actions">
            <Link href="/treks" className="it-corporate-hub__treks" title="Back to treks">
              Treks
            </Link>
            <a
              href={corpWa}
              className="it-corporate-hub__icon-btn it-corporate-hub__icon-btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp corporate team"
              title="WhatsApp us"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden />
            </a>
            <a
              href={corporateMailtoUrl()}
              className="it-corporate-hub__icon-btn it-corporate-hub__icon-btn--desk"
              aria-label="Email corporate team"
              title="Email corporate team"
            >
              <i className="fa-solid fa-envelope" aria-hidden />
            </a>
            <a
              href={telUrl()}
              className="it-corporate-hub__icon-btn"
              aria-label={`Call ${CONTACT.phoneDisplay}`}
              title={CONTACT.phoneDisplay}
            >
              <i className="fa-solid fa-phone" aria-hidden />
            </a>
            <button
              type="button"
              className="it-corporate-hub__menu-btn"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div
        id={menuId}
        className={`it-corporate-hub__drawer${menuOpen ? ' is-open' : ''}`}
        hidden={!menuOpen}
      >
        <div className="it-corporate-hub__drawer-panel">
          <p className="it-corporate-hub__drawer-kicker">Programs &amp; partnerships</p>
          <p className="it-corporate-hub__drawer-lead">Corporate tours, campus, schools &amp; gifting</p>

          <div className="it-corporate-hub__drawer-cta">
            <a
              className="it-corporate-hub__drawer-btn it-corporate-hub__drawer-btn--primary"
              href={corpWa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <i className="fa-brands fa-whatsapp" aria-hidden />
              WhatsApp us
            </a>
            <a
              className="it-corporate-hub__drawer-btn"
              href={corporateMailtoUrl()}
              onClick={closeMenu}
            >
              <i className="fa-solid fa-envelope" aria-hidden />
              Email
            </a>
            <a className="it-corporate-hub__drawer-btn" href={telUrl()} onClick={closeMenu}>
              <i className="fa-solid fa-phone" aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
          </div>

          <nav className="it-corporate-hub__drawer-nav" aria-label="Programs">
            {CORPORATE_HUB_LINKS.map((item) => {
              const active = corporateHubActive(pathname, item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`it-corporate-hub__drawer-link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  <i className={`fa-solid ${item.icon}`} aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/treks" className="it-corporate-hub__drawer-back" onClick={closeMenu}>
            <i className="fa-solid fa-arrow-left" aria-hidden />
            Back to treks
          </Link>
        </div>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="it-corporate-hub__backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  );
}
