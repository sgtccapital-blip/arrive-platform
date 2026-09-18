import React from 'react';
import { useApp } from '../context/AppContext';
import { Crown, Ticket } from 'lucide-react';

export const Navbar = ({ 
  onOpenMenu,
  locale = 'es',
  alternateEsUrl = '/es/',
  alternateEnUrl = '/en/',
  onSwitchLocale,
  route,
  navigate
}) => {
  const { 
    isBookVipModalOpen,
    setIsBookVipModalOpen,
    myPasses = [],
    setIsPassesModalOpen
  } = useApp();

  const isVenuesActive = !isBookVipModalOpen && (route?.type === 'venue' || route?.type === 'venues_list');
  const isConciergeActive = !isBookVipModalOpen && (route?.type === 'concierge');
  const isBookVipActive = Boolean(isBookVipModalOpen);
  const isTicketsActive = !isBookVipModalOpen && !isVenuesActive && !isConciergeActive;

  const scrollToEvents = (e) => {
    e.preventDefault();
    const isAlreadyOnHome = route?.type === 'home' || route?.type === 'hub' || route?.type === 'temporal_hub';
    if (isAlreadyOnHome) {
      const el = document.getElementById('events-section') || document.getElementById('all-events');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // If coming from another page, navigate to home and scroll to top cleanly
    if (navigate) {
      navigate(`/${locale}/`);
    } else {
      window.history.pushState(null, '', `/${locale}/`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo(0, 0);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    const isAlreadyOnHome = route?.type === 'home' || route?.type === 'hub' || route?.type === 'temporal_hub';
    if (isAlreadyOnHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (navigate) {
        navigate(`/${locale}/`);
      } else {
        window.history.pushState(null, '', `/${locale}/`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      {/* Brand Logo */}
      <a 
        href={`/${locale}/`} 
        className={`nav_logo w-inline-block ${isTicketsActive ? 'w--current' : ''}`}
        title="ARRIVE • The Exclusive Nightlife Experience"
        onClick={handleLogoClick}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src="/images/arrive-logo-white.png" 
            alt="ARRIVE" 
            className="nav_logo_image"
          />
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#c10230',
            boxShadow: '0 0 10px #c10230',
            display: 'inline-block'
          }}></span>
        </div>
      </a>

      {/* Navbar Quick Links */}
      <div className="navlink_wrapper">
        <a 
          href={`/${locale}/`}
          className={`nav_links underline-trail w-inline-block ${isTicketsActive ? 'w--current active' : ''}`}
          onClick={scrollToEvents}
        >
          <p>{locale === 'es' ? 'EVENTOS' : 'EVENTS'}</p>
        </a>

        <a 
          href={`/${locale}/venues/`}
          className={`nav_links underline-trail w-inline-block ${isVenuesActive ? 'w--current active' : ''}`}
        >
          <p>{locale === 'es' ? 'LOCALES' : 'VENUES'}</p>
        </a>

        <a 
          href={`/${locale}/concierge/`}
          className={`nav_links underline-trail w-inline-block ${isConciergeActive ? 'w--current active' : ''}`}
        >
          <p>{locale === 'es' ? 'SERVICIOS & CONCIERGE' : 'SERVICES & CONCIERGE'}</p>
        </a>

        {/* 4. Book VIP Zone — de última en una burbuja dorada VIP */}
        <a 
          href="#book-vip" 
          className={`nav_vip_gold_bubble ${isBookVipActive ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setIsBookVipModalOpen(true);
          }}
          title={locale === 'es' ? 'Reservar Mesa VIP & Bottle Service' : 'Book VIP Table & Bottle Service'}
        >
          <Crown size={13} className="nav_vip_gold_crown" />
          <span>{locale === 'es' ? 'RESERVAR VIP' : 'BOOK VIP'}</span>
        </a>
      </div>

      {/* Language Switcher & Hamburger Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Quick Passes Button */}
        <button
          type="button"
          onClick={() => setIsPassesModalOpen(true)}
          className="nav_passes_quick_btn"
          title={locale === 'es' ? 'Mis Pases y Códigos QR' : 'My Passes & QR Codes'}
          aria-label={locale === 'es' ? 'Mis Pases' : 'My Passes'}
        >
          <Ticket size={14} color="#ff3b5c" />
          <span className="nav_passes_quick_text">{locale === 'es' ? 'PASES' : 'PASSES'}</span>
          {myPasses.length > 0 && (
            <span className="nav_passes_badge">{myPasses.length}</span>
          )}
        </button>

        <div 
          className="nav_lang_switch" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2px', 
            fontSize: '0.72rem', 
            fontWeight: 800,
            letterSpacing: '0.05em',
            background: 'rgba(255,255,255,0.05)',
            padding: '3px 6px',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
          aria-label="Seleccionar idioma / Select language"
        >
          <a 
            href={alternateEsUrl || '/es/'} 
            className={`lang-link ${locale === 'es' ? 'active' : ''}`}
            onClick={(e) => {
              if (onSwitchLocale) {
                e.preventDefault();
                onSwitchLocale('es');
              }
            }}
            style={{ 
              color: locale === 'es' ? '#ff3b5c' : '#888888',
              textDecoration: 'none',
              padding: '2px 6px',
              borderRadius: '10px',
              background: locale === 'es' ? 'rgba(255,59,92,0.15)' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            ES
          </a>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem' }}>|</span>
          <a 
            href={alternateEnUrl || '/en/'} 
            className={`lang-link ${locale === 'en' ? 'active' : ''}`}
            onClick={(e) => {
              if (onSwitchLocale) {
                e.preventDefault();
                onSwitchLocale('en');
              }
            }}
            style={{ 
              color: locale === 'en' ? '#ff3b5c' : '#888888',
              textDecoration: 'none',
              padding: '2px 6px',
              borderRadius: '10px',
              background: locale === 'en' ? 'rgba(255,59,92,0.15)' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            EN
          </a>
        </div>

        {/* Hamburger Toggle Button */}
        <button 
          type="button"
          className="centered-nav__toggle" 
          aria-label="Abrir menú de navegación"
          onClick={onOpenMenu}
        >
          <div className="centered-nav__toggle-bar"></div>
          <div className="centered-nav__toggle-bar"></div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
