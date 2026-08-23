'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import { CONTACT, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';
import {
  SPECIAL_PROGRAMS_HUB_LINKS,
  isSpecialProgramsHubPath,
  specialProgramsHubActive,
} from '@/lib/special-programs-hub-nav';
import './special-programs-hub.css';

export default function SpecialProgramsHubHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('it-special-mode');
    return () => document.body.classList.remove('it-special-mode');
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
        '--sp-header-height',
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

  const spWa = whatsappUrl('Hi Indian Treks! I am interested in your Special Programs treks.');

  const onSpecialHub = isSpecialProgramsHubPath(pathname);

  return (
    <header ref={headerRef} className="it-special-hub" aria-label="Special Programs">
      <div className="it-special-hub__bar">
        <div className="it-special-hub__inner">
          <div className="it-special-hub__brand-group">
            <Link
              href="/"
              className="it-special-hub__logo-link"
              onClick={closeMenu}
              aria-label="Indian Treks — back to home"
            >
              <BrandLogo className="it-special-hub__logo" />
            </Link>
            <Link
              href="/special-programs"
              className={`it-special-hub__brand-tag${onSpecialHub ? ' is-active' : ''}`}
              onClick={closeMenu}
              aria-current={onSpecialHub ? 'page' : undefined}
            >
              Special Programs
            </Link>
          </div>

          <nav className="it-special-hub__nav" aria-label="Special program sections">
            {SPECIAL_PROGRAMS_HUB_LINKS.map((item) => {
              const active = specialProgramsHubActive(pathname, item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`it-special-hub__link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  title={item.navLabel ? item.label : undefined}
                >
                  {item.navLabel ? (
                    <>
                      <span className="it-special-hub__link-text it-special-hub__link-text--short">
                        {item.navLabel}
                      </span>
                      <span className="it-special-hub__link-text it-special-hub__link-text--full">
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

          <div className="it-special-hub__actions">
            <Link href="/treks" className="it-special-hub__treks" title="Back to treks">
              Treks
            </Link>
            <a
              href={spWa}
              className="it-special-hub__icon-btn it-special-hub__icon-btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp us"
              title="WhatsApp us"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden />
            </a>
            <a
              href={mailtoUrl('Special Programs enquiry — Indian Treks')}
              className="it-special-hub__icon-btn it-special-hub__icon-btn--desk"
              aria-label="Email us"
              title="Email us"
            >
              <i className="fa-solid fa-envelope" aria-hidden />
            </a>
            <a
              href={telUrl()}
              className="it-special-hub__icon-btn"
              aria-label={`Call ${CONTACT.phoneDisplay}`}
              title={CONTACT.phoneDisplay}
            >
              <i className="fa-solid fa-phone" aria-hidden />
            </a>
            <button
              type="button"
              className="it-special-hub__menu-btn"
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
        className={`it-special-hub__drawer${menuOpen ? ' is-open' : ''}`}
        hidden={!menuOpen}
      >
        <div className="it-special-hub__drawer-panel">
          <p className="it-special-hub__drawer-kicker">Curated trek collections</p>
          <p className="it-special-hub__drawer-lead">Women-only, senior, family &amp; beginner trails</p>

          <div className="it-special-hub__drawer-cta">
            <a
              className="it-special-hub__drawer-btn it-special-hub__drawer-btn--primary"
              href={spWa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <i className="fa-brands fa-whatsapp" aria-hidden />
              WhatsApp us
            </a>
            <a
              className="it-special-hub__drawer-btn"
              href={mailtoUrl('Special Programs enquiry — Indian Treks')}
              onClick={closeMenu}
            >
              <i className="fa-solid fa-envelope" aria-hidden />
              Email
            </a>
            <a className="it-special-hub__drawer-btn" href={telUrl()} onClick={closeMenu}>
              <i className="fa-solid fa-phone" aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
          </div>

          <nav className="it-special-hub__drawer-nav" aria-label="Special program sections">
            {SPECIAL_PROGRAMS_HUB_LINKS.map((item) => {
              const active = specialProgramsHubActive(pathname, item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`it-special-hub__drawer-link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  <i className={`fa-solid ${item.icon}`} aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/treks" className="it-special-hub__drawer-back" onClick={closeMenu}>
            <i className="fa-solid fa-arrow-left" aria-hidden />
            Back to treks
          </Link>
        </div>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="it-special-hub__backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  );
}
