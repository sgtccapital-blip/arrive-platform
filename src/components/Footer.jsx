import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowUpRight, 
  Crown
} from 'lucide-react';

export const Footer = ({ locale = 'es', navigate }) => {
  const { 
    setIsBookVipModalOpen 
  } = useApp();

  const isEs = locale === 'es';

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (navigate) {
      navigate(path);
    } else {
      window.history.pushState(null, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const partnerVenues = [
    {
      name: 'FURIA CLUB',
      sub: 'CLUB & RESTAURANT',
      slug: 'furia-club',
      symbol: 'FURIA'
    },
    {
      name: 'TERRAPLÉN',
      sub: 'ROOFTOP CASCO',
      slug: 'terraplen-rooftop',
      symbol: 'TERRAPLÉN'
    },
    {
      name: 'PRIMAVERA',
      sub: 'COSTA DEL ESTE',
      slug: 'primavera-panama',
      symbol: 'PRIMAVERA'
    },
    {
      name: 'CIELO',
      sub: 'ROOFTOP CASCO VIEJO',
      slug: 'cielo-rooftop',
      symbol: 'CIELO'
    },
    {
      name: 'PIANO BAR',
      sub: 'BELLA VISTA',
      slug: 'piano-bar',
      symbol: 'PIANO BAR'
    }
  ];

  return (
    <footer className="arrive_hybrid_footer" role="contentinfo" aria-label="Pie de página ARRIVE">
      <div className="arrive_footer_inner">
        {/* =========================================================================
            TOP SECTION: PACHA ICONS INSPIRED LUXURY HERO ROW
            ========================================================================= */}
        <div className="arrive_footer_hero_row">
          
          {/* Left Column: Brand Lockup, Family Headline, Capsule Pill & Logo Strip */}
          <div className="arrive_footer_left_col">
            {/* Minimal Brand Mark */}
            <div className="arrive_footer_brand_lockup">
              <a 
                href={`/${locale}/`} 
                className="arrive_footer_logo_link" 
                title="ARRIVE Home"
                onClick={(e) => handleLinkClick(e, `/${locale}/`)}
              >
                <img 
                  src="/images/arrive-logo-white.png" 
                  alt="ARRIVE" 
                  className="arrive_footer_logo_img"
                />
                <span className="arrive_footer_red_dot"></span>
              </a>
              <span className="arrive_footer_brand_sub">
                MODEL MANAGEMENT • PANAMA
              </span>
            </div>

            {/* Impactful Headline (Matches Reference: BECOME A PART OF THE FAMILY) */}
            <h2 className="arrive_footer_statement">
              {isEs ? (
                <>FORMA PARTE<br />DE LA FAMILIA</>
              ) : (
                <>BECOME A PART<br />OF THE FAMILY</>
              )}
            </h2>

            {/* Pill Button (Matches Reference: PACHA GROUP WEBSITE -> ARRIVE MODEL MANAGEMENT) */}
            <div className="arrive_footer_pill_wrapper">
              <a 
                href={`/${locale}/work-with-us/`} 
                className="arrive_footer_pill_btn"
                title="Arrive Model Management"
                onClick={(e) => handleLinkClick(e, `/${locale}/work-with-us/`)}
              >
                <span>ARRIVE MODEL MANAGEMENT</span>
                <ArrowUpRight size={14} className="arrive_pill_arrow" />
              </a>
            </div>

            {/* Partner Venues Monochrome Logo Strip (Matches Reference in ONE single row) */}
            <div className="arrive_footer_partner_strip_wrapper">
              <div className="arrive_footer_partner_strip" aria-label={isEs ? 'Venues Asociados Oficiales' : 'Official Partner Venues'}>
                {partnerVenues.map((venue, idx) => (
                  <a 
                    key={idx}
                    href={`/${locale}/venues/${venue.slug}/`} 
                    className="arrive_footer_partner_logo"
                    title={`Ver ${venue.name}`}
                    onClick={(e) => handleLinkClick(e, `/${locale}/venues/${venue.slug}/`)}
                  >
                    <span className="partner_logo_text">{venue.symbol}</span>
                    <span className="partner_logo_sub">{venue.sub}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Navigation Links & Vector Social Media Icons */}
          <div className="arrive_footer_right_col">
            <nav className="arrive_footer_primary_nav" aria-label={isEs ? 'Navegación Principal del Footer' : 'Footer Primary Navigation'}>
              <a 
                href={`/${locale}/`} 
                className="arrive_footer_nav_link"
                onClick={(e) => handleLinkClick(e, `/${locale}/`)}
              >
                {isEs ? 'EVENTOS' : 'EVENTS'}
              </a>
              <a 
                href="#book-vip" 
                className="arrive_footer_nav_link arrive_footer_vip_link"
                onClick={(e) => {
                  e.preventDefault();
                  setIsBookVipModalOpen(true);
                }}
              >
                <span>{isEs ? 'RESERVAR ZONA VIP' : 'BOOK VIP ZONE'}</span>
              </a>
              <a 
                href={`/${locale}/venues/`} 
                className="arrive_footer_nav_link"
                onClick={(e) => handleLinkClick(e, `/${locale}/venues/`)}
              >
                {isEs ? 'LOCALES' : 'VENUES'}
              </a>
              <a 
                href={`/${locale}/concierge/`} 
                className="arrive_footer_nav_link"
                onClick={(e) => handleLinkClick(e, `/${locale}/concierge/`)}
              >
                {isEs ? 'SERVICIOS & CONCIERGE' : 'SERVICES & CONCIERGE'}
              </a>
              <a 
                href={`/${locale}/blog/`} 
                className="arrive_footer_nav_link arrive_footer_blog_link"
                onClick={(e) => handleLinkClick(e, `/${locale}/blog/`)}
              >
                <span>{isEs ? 'BLOG & GUÍA VIP' : 'BLOG & VIP GUIDE'}</span>
                <span className="arrive_footer_new_badge">NEW</span>
              </a>
              <a 
                href={`/${locale}/explore/`} 
                className="arrive_footer_nav_link arrive_footer_explore_link"
                onClick={(e) => handleLinkClick(e, `/${locale}/explore/`)}
              >
                <span>{isEs ? 'EXPLORAR PANAMÁ' : 'EXPLORE PANAMA'}</span>
                <span className="arrive_footer_dir_dot">•</span>
              </a>
            </nav>

            {/* Social Media Icons (Matches Reference Exactly) */}
            <div className="arrive_footer_socials">
              <a 
                href="https://instagram.com/arrivemodels" 
                target="_blank" 
                rel="noopener noreferrer"
                className="arrive_social_icon_btn"
                title="Instagram @arrivemodels"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a 
                href="https://tiktok.com/@arrivemodels" 
                target="_blank" 
                rel="noopener noreferrer"
                className="arrive_social_icon_btn"
                title="TikTok @arrivemodels"
                aria-label="TikTok"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.96-4.52V8.04a8.28 8.28 0 0 0 4.81 1.54v-3.4a4.86 4.86 0 0 1-1-.49z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="arrive_social_icon_btn"
                title="YouTube"
                aria-label="YouTube"
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/50760000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="arrive_social_icon_btn arrive_whatsapp_btn"
                title="WhatsApp VIP Concierge"
                aria-label="WhatsApp VIP"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM BAR: EXACT PACHA REPLICA WITH CLICKABLE LEGAL LINKS
            ========================================================================= */}
        <div className="arrive_footer_bottom_bar">
          <div className="arrive_footer_legal_links">
            <span className="arrive_bottom_co_mark">⊚</span>
            <a href={`/${locale}/cookies/`} onClick={(e) => handleLinkClick(e, `/${locale}/cookies/`)}>Cookies</a>
            <a href={`/${locale}/privacy/`} onClick={(e) => handleLinkClick(e, `/${locale}/privacy/`)}>{isEs ? 'Privacidad' : 'Privacy'}</a>
            <a href={`/${locale}/terms-and-conditions/`} onClick={(e) => handleLinkClick(e, `/${locale}/terms-and-conditions/`)}>{isEs ? 'Términos y Condiciones' : 'Terms & Conditions'}</a>
            <a href={`/${locale}/work-with-us/`} onClick={(e) => handleLinkClick(e, `/${locale}/work-with-us/`)}>{isEs ? 'Trabaja con Nosotros' : 'Work with us'}</a>
            <a href={`/${locale}/whistleblowing/`} onClick={(e) => handleLinkClick(e, `/${locale}/whistleblowing/`)}>{isEs ? 'Canal de Denuncias' : 'Whistleblowing Channel'}</a>
            <a href={`/${locale}/contact-us/`} onClick={(e) => handleLinkClick(e, `/${locale}/contact-us/`)}>{isEs ? 'Ubicaciones y Contacto' : 'Locations & Contact Us'}</a>
            <a href={`/${locale}/press/`} onClick={(e) => handleLinkClick(e, `/${locale}/press/`)}>{isEs ? 'Prensa' : 'Press'}</a>
          </div>

          <div className="arrive_footer_copyright">
            © 2026 Arrive Model Management • {isEs ? 'Todos los derechos reservados' : 'All rights reserved'}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
