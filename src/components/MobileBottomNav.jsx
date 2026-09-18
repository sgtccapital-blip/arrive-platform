import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, MapPin, Crown, Wine, Menu } from 'lucide-react';

export const MobileBottomNav = ({ 
  locale = 'es',
  route,
  navigate,
  onOpenMenu
}) => {
  const { 
    isBookVipModalOpen, 
    setIsBookVipModalOpen 
  } = useApp();

  const isEs = locale === 'es';

  const isVenuesActive = !isBookVipModalOpen && (route?.type === 'venue' || route?.type === 'venues_list');
  const isConciergeActive = !isBookVipModalOpen && (route?.type === 'concierge');
  const isBookVipActive = Boolean(isBookVipModalOpen);
  const isTicketsActive = !isBookVipModalOpen && !isVenuesActive && !isConciergeActive;

  const handleNavClick = (path, e) => {
    if (e) e.preventDefault();
    if (navigate) {
      navigate(path);
    } else {
      window.history.pushState(null, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEventsClick = (e) => {
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
    handleNavClick(`/${locale}/`, e);
  };

  const handleBookVipClick = (e) => {
    e.preventDefault();
    setIsBookVipModalOpen(true);
  };

  return (
    <nav 
      className="mobile_bottom_nav_bar" 
      aria-label="Navegación Móvil Rápida"
      role="navigation"
    >
      <div className="mobile_bottom_nav_content">
        {/* 1. Eventos */}
        <button
          type="button"
          className={`mobile_nav_item ${isTicketsActive ? 'active' : ''}`}
          onClick={handleEventsClick}
          aria-label={isEs ? 'Ver todos los eventos' : 'View all events'}
        >
          <div className="mobile_nav_icon_wrap">
            <Calendar size={19} className="mobile_nav_icon" />
            {isTicketsActive && <span className="mobile_nav_dot" />}
          </div>
          <span className="mobile_nav_label">{isEs ? 'Eventos' : 'Events'}</span>
        </button>

        {/* 2. Locales / Venues */}
        <button
          type="button"
          className={`mobile_nav_item ${isVenuesActive ? 'active' : ''}`}
          onClick={(e) => handleNavClick(`/${locale}/venues/`, e)}
          aria-label={isEs ? 'Ver clubes y rooftops' : 'View clubs and rooftops'}
        >
          <div className="mobile_nav_icon_wrap">
            <MapPin size={19} className="mobile_nav_icon" />
            {isVenuesActive && <span className="mobile_nav_dot" />}
          </div>
          <span className="mobile_nav_label">{isEs ? 'Locales' : 'Venues'}</span>
        </button>

        {/* 3. Botón Central Destacado: Reservar VIP */}
        <button
          type="button"
          className={`mobile_nav_vip_fab ${isBookVipActive ? 'active' : ''}`}
          onClick={handleBookVipClick}
          aria-label={isEs ? 'Reservar Mesa VIP' : 'Book VIP Table'}
        >
          <div className="mobile_nav_vip_fab_inner">
            <Crown size={20} className="mobile_nav_vip_crown" />
            <span className="mobile_nav_vip_text">{isEs ? 'VIP' : 'VIP'}</span>
          </div>
        </button>

        {/* 4. Concierge & Servicios */}
        <button
          type="button"
          className={`mobile_nav_item ${isConciergeActive ? 'active' : ''}`}
          onClick={(e) => handleNavClick(`/${locale}/concierge/`, e)}
          aria-label={isEs ? 'Servicios de Concierge VIP' : 'VIP Concierge Services'}
        >
          <div className="mobile_nav_icon_wrap">
            <Wine size={19} className="mobile_nav_icon" />
            {isConciergeActive && <span className="mobile_nav_dot" />}
          </div>
          <span className="mobile_nav_label">{isEs ? 'Concierge' : 'Concierge'}</span>
        </button>

        {/* 5. Menú Completo (Drawer) */}
        <button
          type="button"
          className="mobile_nav_item"
          onClick={onOpenMenu}
          aria-label={isEs ? 'Abrir menú completo' : 'Open full menu'}
        >
          <div className="mobile_nav_icon_wrap">
            <Menu size={19} className="mobile_nav_icon" />
          </div>
          <span className="mobile_nav_label">{isEs ? 'Menú' : 'Menu'}</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
