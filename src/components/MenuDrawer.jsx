import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Settings, MessageCircle, Crown, Camera } from 'lucide-react';

// Admin entry is hidden from the public menu. Visit any page with ?admin=1 once
// to enable it on this browser (?admin=0 disables). Not real auth: the admin
// panel only edits this browser's local copy of the data.
const isAdminEnabled = () => {
  try {
    const flag = new URLSearchParams(window.location.search).get('admin');
    if (flag === '1') localStorage.setItem('arrive_admin', '1');
    if (flag === '0') localStorage.removeItem('arrive_admin');
    return import.meta.env.DEV || localStorage.getItem('arrive_admin') === '1';
  } catch {
    return import.meta.env.DEV;
  }
};

export const MenuDrawer = ({ isOpen, onClose, route }) => {
  const { 
    isBookVipModalOpen,
    setIsBookVipModalOpen, 
    setIsAdminModalOpen,
    venues,
    setSelectedCity 
  } = useApp();

  const isVenuesActive = !isBookVipModalOpen && (route?.type === 'venues_list' || route?.type === 'venue');
  const isConciergeActive = !isBookVipModalOpen && (route?.type === 'concierge');
  const isGalleryActive = !isBookVipModalOpen && (route?.type === 'gallery');
  const isBlogActive = !isBookVipModalOpen && (route?.type === 'blog_list' || route?.type === 'blog_post');
  const isDirectoryActive = !isBookVipModalOpen && (route?.type === 'directory');
  const isBookVipActive = Boolean(isBookVipModalOpen);
  const isTicketsActive = !isBookVipModalOpen && !isVenuesActive && !isConciergeActive && !isBlogActive && !isDirectoryActive && !isGalleryActive && route?.type !== 'info_page';

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activeLocale = route?.locale || 'es';
  const isEs = activeLocale === 'es';

  if (!isOpen) return null;

  return (
    <div className="nav_bg is-open" role="dialog" aria-modal="true" aria-label={isEs ? 'Menú Principal' : 'Main Menu'}>
      {/* Floating Close Button */}
      <button 
        type="button"
        className="menu_drawer_close_btn"
        onClick={onClose}
        aria-label={isEs ? 'Cerrar menú' : 'Close menu'}
      >
        <X size={20} />
      </button>

      <div className="nav_open">
        {/* Left Column: Centered, Ordered, Luxury Typography */}
        <div className="nav_left centered_menu_left">
          {/* Top Brand Header */}
          <div className="menu_top_header">
            <span>{isEs ? 'CIUDAD DE PANAMÁ' : 'PANAMA CITY'}</span>
            <span className="menu_dot_separator">•</span>
            <img loading="lazy" decoding="async" 
              src="/images/hangout-logo-sm.png" 
              alt="HANGOUT NIGHTLIFE" 
              style={{ height: '46px', width: 'auto', display: 'inline-block', verticalAlign: 'middle' }}
            />
          </div>

          {/* Centered Main Navigation Links */}
          <div className="menu_centered_nav_links">
            {/* 1. All Events */}
            <div className="menu_item_row">
              <a 
                href={`/${activeLocale}/`} 
                className={`menu_main_link ${isTicketsActive ? 'active w--current' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCity('all');
                  onClose();
                  // Navigate to home and scroll to top
                  window.history.pushState(null, '', `/${activeLocale}/`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo(0, 0);
                }}
              >
                {isEs ? 'TODOS LOS EVENTOS' : 'ALL EVENTS'}
              </a>
            </div>

            {/* 2. Venues — links to page */}
            <div className="menu_item_row">
              <a 
                href={`/${activeLocale}/venues/`} 
                className={`menu_main_link ${isVenuesActive ? 'active w--current' : ''}`}
                onClick={() => onClose()}
              >
                {isEs ? 'LOCALES' : 'VENUES'}
              </a>
            </div>

            {/* 3. Services & Concierge — links to page */}
            <div className="menu_item_row">
              <a 
                href={`/${activeLocale}/concierge/`} 
                className={`menu_main_link ${isConciergeActive ? 'active w--current' : ''}`}
                onClick={() => onClose()}
              >
                {isEs ? 'SERVICIOS & CONCIERGE' : 'SERVICES & CONCIERGE'}
              </a>
              <span className="menu_sublink_desc">
                {isEs ? 'Yates, Restaurantes & Chauffeur Privado' : 'Yachts, Restaurants & Private Chauffeur'}
              </span>
            </div>

            {/* 3.1 Descargar Fotos Chicas & Modelos */}
            <div className="menu_item_row">
              <a 
                href={`/${activeLocale}/galeria/`} 
                className={`menu_main_link ${isGalleryActive ? 'active w--current' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  window.history.pushState(null, '', `/${activeLocale}/galeria/`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo(0, 0);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Camera size={19} color="#FF2A2A" />
                  <span>{isEs ? 'DESCARGAR FOTOS' : 'DOWNLOAD PHOTOS'}</span>
                  <span className="nav_gallery_badge" style={{ fontSize: '0.62rem', padding: '2px 6px' }}>4K VIP</span>
                </div>
              </a>
              <span className="menu_sublink_desc">
                {isEs ? 'Galería oficial de fiestas para chicas & modelos Hangout' : 'Official party photo hub for Hangout models & guests'}
              </span>
            </div>

            {/* 3.1 Editorial guides (Spanish) */}
            <div className="menu_item_row">
              <a 
                href="/es/guias/" 
                className="menu_main_link"
                onClick={() => onClose()}
              >
                {isEs ? 'GUÍAS DE PANAMÁ' : 'PANAMA GUIDES (ES)'}
              </a>
              <span className="menu_sublink_desc">
                {isEs ? 'Qué hacer, nightlife, islas y aventura' : 'Things to do, nightlife, islands and adventure'}
              </span>
            </div>

            {/* 3.2 Blog & VIP Guide */}
            <div className="menu_item_row">
              <a 
                href={`/${activeLocale}/blog/`} 
                className={`menu_main_link ${isBlogActive ? 'active w--current' : ''}`}
                onClick={() => onClose()}
              >
                {isEs ? 'BLOG & GUÍA VIP' : 'BLOG & VIP GUIDE'}
              </a>
              <span className="menu_sublink_desc">
                {isEs ? 'Artículos, Nightlife Panama & Tips VIP' : 'Articles, Panama Nightlife & VIP Tips'}
              </span>
            </div>

            {/* 3.2 Explore Panama / Directorio */}
            <div className="menu_item_row">
              <a 
                href={`/${activeLocale}/explore/`} 
                className={`menu_main_link ${isDirectoryActive ? 'active w--current' : ''}`}
                onClick={() => onClose()}
              >
                {isEs ? 'EXPLORAR PANAMÁ' : 'EXPLORE PANAMA'}
              </a>
              <span className="menu_sublink_desc">
                {isEs ? 'Directorio Completo de Rooftops, Clubs & Guías' : 'Complete Directory of Rooftops, Clubs & Guides'}
              </span>
            </div>

            {/* 4. Book VIP Zone — de última en una burbuja dorada VIP */}
            <div className="menu_item_row" style={{ marginTop: '0.65rem' }}>
              <a 
                href="#book-vip" 
                className={`menu_main_link menu_vip_gold_bubble ${isBookVipActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  setIsBookVipModalOpen(true);
                }}
              >
                <Crown size={18} color="#ffd700" />
                <span>{isEs ? 'RESERVA VIP' : 'VIP RESERVATION'}</span>
              </a>
              <span className="menu_sublink_desc gold" style={{ color: 'rgba(255, 215, 0, 0.75)' }}>
                {isEs ? 'Mesas Exclusivas & Bottle Service VIP' : 'Exclusive Tables & VIP Bottle Service'}
              </span>
            </div>

            {/* 5. WhatsApp VIP 24/7 */}
            <div className="menu_item_row">
              <a 
                href="https://wa.me/50760000000?text=Hola%20Hangout%20Concierge,%20deseo%20asistencia%20VIP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="menu_main_link whatsapp_link"
              >
                <MessageCircle size={18} />
                <span>WHATSAPP VIP 24/7</span>
              </a>
            </div>
          </div>

          {/* Hangout Nightlife Brand Card */}
          <div className="menu_nightlife_card">
            <img 
              src="/images/right-nav.avif" 
              loading="lazy" 
              alt="Hangout Nightlife" 
              className="menu_nightlife_card_img" 
            />
            <div className="menu_nightlife_card_overlay">
              <h4 className="menu_nightlife_card_title">Hangout Nightlife</h4>
              <p className="menu_nightlife_card_text">
                {isEs 
                  ? 'Acceso libre, Open Bar y beneficios exclusivos para la comunidad de Hangout Panamá cada semana en los mejores clubs de Panamá.'
                  : 'Free entry, complimentary open bar, and exclusive perks for the Hangout Panamá community every week at premier Panama venues.'}
              </p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="menu_bottom_footer">
            <p className="para_14px">Hangout Panamá © 2026</p>
            {isAdminEnabled() && (<button
              type="button"
              className="menu_admin_trigger"
              onClick={() => {
                onClose();
                setIsAdminModalOpen(true);
              }}
              title="Panel Admin"
            >
              <Settings size={14} />
            </button>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
