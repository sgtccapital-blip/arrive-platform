import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Globe, 
  Utensils, 
  Sparkles, 
  Crown, 
  Images, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Wine, 
  Maximize2,
  Music,
  Navigation,
  Users,
  Star,
  Car,
  ShieldCheck
} from 'lucide-react';

const GoogleIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: '4px', verticalAlign: 'middle', flexShrink: 0 }}>
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
  </svg>
);

const InstagramIcon = ({ size = 13, color = 'currentColor', className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    style={{ flexShrink: 0 }}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const getVenueEmoji = (v) => {
  const slug = ((v && (v.slug || v.shortName || v.name)) || '').toLowerCase();
  if (slug.includes('furia')) return '🍸';
  if (slug.includes('piano')) return '🎹';
  if (slug.includes('terraplen')) return '🌆';
  if (slug.includes('primavera')) return '🌿';
  if (slug.includes('cielo')) return '🌌';
  return '✨';
};

export const VenuesModal = () => {
  const { 
    venues, 
    selectedVenue, 
    setSelectedVenue, 
    isVenuesModalOpen, 
    setIsVenuesModalOpen,
    events,
    setSelectedEvent,
    setSelectedVipEvent,
    setIsBookVipModalOpen,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'menu' | 'gallery' | 'events'
  const [activeMenuCat, setActiveMenuCat] = useState('entradas');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // Reset tab when modal opens or venue changes
  useEffect(() => {
    if (selectedVenue) {
      setActiveTab('info');
      // Set default menu category based on venue's menu keys
      if (selectedVenue.menu) {
        const keys = Object.keys(selectedVenue.menu);
        if (keys.length > 0) setActiveMenuCat(keys[0]);
      }
    }
  }, [selectedVenue?.id]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeLightboxIndex === null || !selectedVenue?.gallery) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => 
          prev < selectedVenue.gallery.length - 1 ? prev + 1 : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => 
          prev > 0 ? prev - 1 : selectedVenue.gallery.length - 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, selectedVenue]);

  if (!isVenuesModalOpen || !selectedVenue) return null;

  const handleClose = () => {
    setIsVenuesModalOpen(false);
    setActiveLightboxIndex(null);
  };

  const handleOpenVipForVenue = () => {
    // Create an event representation for VIP modal
    const mockVipEvent = {
      id: `vip-${selectedVenue.id}`,
      title: `Mesa VIP en ${selectedVenue.name}`,
      subtitle: selectedVenue.tagline,
      location: selectedVenue.name,
      address: selectedVenue.address,
      image: selectedVenue.coverImage,
      dateFormatted: 'Este Fin de Semana',
      hourFormatted: selectedVenue.partyTime || '10:00 PM - 04:00 AM'
    };
    setSelectedVipEvent(mockVipEvent);
    setIsVenuesModalOpen(false);
    setIsBookVipModalOpen(true);
  };

  // Intelligent accent-insensitive normalization
  const normalizeText = (str) =>
    (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  // Find upcoming events for this venue with intelligent normalization
  const venueEvents = events.filter((evt) => {
    const normLoc = normalizeText(evt.location);
    const normTitle = normalizeText(evt.title);
    const normShort = normalizeText(selectedVenue.shortName);
    const normFull = normalizeText(selectedVenue.name);
    const normSlug = normalizeText(selectedVenue.slug);

    return (
      (normShort && normLoc.includes(normShort)) ||
      (normSlug && normLoc.includes(normSlug)) ||
      (normShort && normTitle.includes(normShort)) ||
      (normLoc && normFull.includes(normLoc))
    );
  });

  const menuCategories = selectedVenue.menu ? Object.keys(selectedVenue.menu) : [];
  const totalMenuItemsCount = selectedVenue.menu 
    ? Object.values(selectedVenue.menu).reduce((acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0), 0)
    : 0;

  const formatMenuCatName = (key) => {
    switch (key) {
      case 'toShare':
      case 'paraCompartir': return 'Para Compartir';
      case 'entradasCompartir': return 'Entradas & Para Compartir';
      case 'entradasFrias': return 'Entradas Frías';
      case 'crudos': return 'Crudos & Raw Bar';
      case 'rawBar': return 'Raw Bar & Hand Rolls';
      case 'chefsSpecialties':
      case 'especialidadesChef': return 'Especialidades del Chef';
      case 'especialesItamae': return 'Especiales del Itamae & Caviar';
      case 'temakis': return 'Temakis';
      case 'nigirisSashimis': return 'Nigiri & Sashimi';
      case 'rolls':
      case 'sushiRolls': return 'Sushi Rolls & Uramaki';
      case 'kitchen': return 'Cocina & Robata';
      case 'slidersBites': return 'Sliders & Bites';
      case 'carnes': return 'Carnes & Alitas';
      case 'delMar': return 'Especialidades Del Mar';
      case 'pastasRisottos': return 'Pastas & Risotto';
      case 'burgers': return 'Burgers Artesanales';
      case 'salads': return 'Ensaladas Frescas';
      case 'montaditos': return 'Montaditos';
      case 'tablas': return 'Tablas de Ibéricos & Quesos';
      case 'pizzas': return 'Pizzas al Horno';
      case 'entradas': return 'Entradas & Tapas';
      case 'platosFuertes': return 'Platos Fuertes';
      case 'menuInfantil': return 'Menú Infantil';
      case 'sundayLunch': return 'Menú Lunch (Domingos)';
      case 'sides': return 'Acompañamientos & Sides';
      case 'arroces': return 'Arroces & Paellas (Para 2)';
      case 'sopasSalads': return 'Sopas & Ensaladas';
      case 'tapas': return 'Tapas';
      case 'postres': return 'Postres';
      case 'cocteleria': return 'Cócteles de Autor & Clásicos';
      case 'mocktails': return 'Mocktails (Sin Alcohol)';
      case 'mocktailsBebidas': return 'Mocktails, Cervezas & Bebidas';
      case 'champagneEspumantes': return 'Champañas & Espumantes';
      case 'vinos': return 'Vinos & Champagne';
      case 'sangrias': return 'Tardeo & Sangrías';
      case 'furiaOnIce': return 'Furia On Ice & Bottles';
      case 'botellasVip': return 'Botellas VIP & Licores';
      case 'openBar': return 'Paquetes Open Bar';
      case 'licores': return 'Licores & Destilados';
      default: return key;
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-container venues-modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={handleClose} aria-label="Cerrar ventana">
          <X size={18} />
        </button>

        {/* ── TOP VENUE SELECTOR TABS ── */}
        <div className="venues_top_selector">
          <div className="venues_pill_scroll">
            {venues.map((v) => {
              const isActive = v.id === selectedVenue.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  className={`venue_tab_btn ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedVenue(v)}
                >
                  <span className="venue_tab_emoji">{getVenueEmoji(v)}</span>
                  <span className="venue_tab_label">{v.shortName.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── VENUE HERO COVER ── */}
        <div className="venue_hero_banner">
          <img 
            src={selectedVenue.coverImage} 
            alt={selectedVenue.name} 
            className="venue_hero_image"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1600&auto=format&fit=crop&q=80';
            }}
          />
          <div className="venue_hero_gradient"></div>

          <div className="venue_hero_content">
            <div className="venue_hero_badges">
              <span className="venue_badge_category">{selectedVenue.category}</span>
              <span className="venue_badge_area">
                <MapPin size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                {selectedVenue.area}, {selectedVenue.city}
              </span>
              {selectedVenue.googleMapsUrl ? (
                <a 
                  href={selectedVenue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="venue_badge_rating venue_badge_google_reviews"
                  title={`Ver ${selectedVenue.reviewCount} opiniones en Google Maps`}
                >
                  <GoogleIcon size={12} />
                  <Star size={11} fill="#ffb800" color="#ffb800" style={{ marginRight: '2px' }} />
                  <strong>{selectedVenue.rating || '4.8'}</strong>
                  <span className="google_review_text">Google Maps ({selectedVenue.reviewCount} reviews)</span>
                  <ExternalLink size={9} style={{ marginLeft: '3px', opacity: 0.7 }} />
                </a>
              ) : (
                <span className="venue_badge_rating">
                  <GoogleIcon size={12} />
                  <Star size={11} fill="#ffb800" color="#ffb800" style={{ marginRight: '2px' }} />
                  <strong>{selectedVenue.rating || '4.8'}</strong>
                  <span className="google_review_text">Google Maps ({selectedVenue.reviewCount} reviews)</span>
                </span>
              )}
            </div>

            <h1 className="venue_hero_title">{selectedVenue.name}</h1>
            <p className="venue_hero_tagline">{selectedVenue.tagline}</p>

            {/* Hero Fast Links */}
            <div className="venue_hero_actions">
              {selectedVenue.websiteUrl && (
                <a 
                  href={selectedVenue.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="venue_action_chip website"
                >
                  <Globe size={13} />
                  <span>Web Oficial</span>
                  <ExternalLink size={11} />
                </a>
              )}

              {selectedVenue.instagramUrl && (
                <a 
                  href={selectedVenue.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="venue_action_chip instagram"
                >
                  <InstagramIcon size={13} />
                  <span>{selectedVenue.instagramHandle || 'Instagram'}</span>
                  <ExternalLink size={11} />
                </a>
              )}

              {selectedVenue.googleMapsUrl && (
                <a 
                  href={selectedVenue.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="venue_action_chip maps"
                >
                  <Navigation size={13} />
                  <span>Google Maps</span>
                  <ExternalLink size={11} />
                </a>
              )}

              <button 
                type="button" 
                className="venue_action_chip vip"
                onClick={handleOpenVipForVenue}
              >
                <Crown size={13} />
                <span>Reservar VIP</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── SCHEDULES & DETAILS STRIP ── */}
        <div className="venue_schedule_strip">
          <div className="schedule_item dinner">
            <div className="schedule_icon_box">
              <Utensils size={14} color="#ff3b5c" />
            </div>
            <div>
              <span className="schedule_label">DINNER TIME</span>
              <strong className="schedule_time">{selectedVenue.dinnerTime}</strong>
            </div>
          </div>

          <div className="schedule_divider"></div>

          <div className="schedule_item party">
            <div className="schedule_icon_box">
              <Music size={14} color="#a855f7" />
            </div>
            <div>
              <span className="schedule_label">PARTY TIME</span>
              <strong className="schedule_time">{selectedVenue.partyTime}</strong>
            </div>
          </div>

          <div className="schedule_divider"></div>

          <div className="schedule_item dresscode">
            <div className="schedule_icon_box">
              <Sparkles size={14} color="#f59e0b" />
            </div>
            <div>
              <span className="schedule_label">DRESS CODE</span>
              <strong className="schedule_time">{selectedVenue.dressCode}</strong>
            </div>
          </div>
        </div>

        {/* ── INTERNAL NAVIGATION TABS ── */}
        <div className="venue_nav_tabs_bar">
          <button 
            type="button" 
            className={`venue_subtab_btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <Sparkles size={15} />
            <span>INFO & AMBIENTE</span>
          </button>

          <button 
            type="button" 
            className={`venue_subtab_btn ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <Utensils size={15} />
            <span>MENÚ & COCTELERÍA ({totalMenuItemsCount})</span>
          </button>

          <button 
            type="button" 
            className={`venue_subtab_btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <Images size={15} />
            <span>FOTOS ({selectedVenue.gallery?.length || 0})</span>
          </button>

          <button 
            type="button" 
            className={`venue_subtab_btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <Calendar size={15} />
            <span>EVENTOS ({venueEvents.length})</span>
          </button>
        </div>

        {/* ── TAB CONTENTS ── */}
        <div className="venue_modal_body">

          {/* 1. INFO & AMBIENTE — SEO-optimized venue detail section */}
          {activeTab === 'info' && (
            <article className="venue_tab_info_layout" itemScope itemType="https://schema.org/LocalBusiness">
              <meta itemProp="name" content={selectedVenue.name} />
              <meta itemProp="address" content={selectedVenue.address} />
              {selectedVenue.websiteUrl && <meta itemProp="url" content={selectedVenue.websiteUrl} />}

              <div className="venue_info_main">
                {/* ── Quick Stats Grid ── */}
                <div className="venue_stats_strip">
                  <div className="venue_stat_item">
                    <div className="venue_stat_icon"><MapPin size={16} /></div>
                    <div className="venue_stat_content">
                      <span className="venue_stat_label">Zona</span>
                      <strong className="venue_stat_value">{selectedVenue.area}</strong>
                    </div>
                  </div>
                  <div className="venue_stat_item">
                    <div className="venue_stat_icon category"><Sparkles size={16} /></div>
                    <div className="venue_stat_content">
                      <span className="venue_stat_label">Categoría</span>
                      <strong className="venue_stat_value" title={selectedVenue.category}>
                        {selectedVenue.category?.replace('Cocktail Bar', 'Bar')?.replace('Nightclub & Restaurant', 'Club & Dining') || selectedVenue.category}
                      </strong>
                    </div>
                  </div>
                  <div className="venue_stat_item">
                    <div className="venue_stat_icon parking"><Car size={16} /></div>
                    <div className="venue_stat_content">
                      <span className="venue_stat_label">Parking</span>
                      <strong className="venue_stat_value" title={selectedVenue.parking || 'Valet Parking'}>
                        Valet Parking
                      </strong>
                    </div>
                  </div>
                  <div className="venue_stat_item">
                    <div className="venue_stat_icon age"><ShieldCheck size={16} /></div>
                    <div className="venue_stat_content">
                      <span className="venue_stat_label">Admisión</span>
                      <strong className="venue_stat_value" title={selectedVenue.ageLimit || '18+'}>
                        18+
                      </strong>
                    </div>
                  </div>
                </div>

                {/* ── About / Description Section ── */}
                <section className="venue_about_section">
                  <h3 className="venue_section_heading">
                    <span className="venue_heading_accent" />
                    Sobre {selectedVenue.shortName}
                  </h3>
                  <p className="venue_description_text" itemProp="description">
                    {selectedVenue.description}
                  </p>
                </section>

                {/* ── Horarios Inline ── */}
                <section className="venue_hours_section">
                  <h3 className="venue_section_heading">
                    <span className="venue_heading_accent" />
                    Horarios
                  </h3>
                  <div className="venue_hours_cards">
                    <div className="venue_hour_card dinner">
                      <Utensils size={18} className="venue_hour_icon" />
                      <div>
                        <span className="venue_hour_label">Cena & Dining</span>
                        <strong className="venue_hour_time">{selectedVenue.dinnerTime}</strong>
                      </div>
                    </div>
                    <div className="venue_hour_card party">
                      <Music size={18} className="venue_hour_icon" />
                      <div>
                        <span className="venue_hour_label">Fiesta & Club</span>
                        <strong className="venue_hour_time">{selectedVenue.partyTime}</strong>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ── Features / Amenidades ── */}
                <section className="venue_amenities_section">
                  <h3 className="venue_section_heading">
                    <span className="venue_heading_accent" />
                    Experiencia & Amenidades
                  </h3>
                  <div className="venue_features_grid">
                    {selectedVenue.features?.map((feat, idx) => (
                      <div key={idx} className="venue_feature_item">
                        <div className="venue_feature_check">
                          <Check size={13} color="#ffffff" />
                        </div>
                        <span className="venue_feature_text">{feat}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ── VIP Call to Action Banner ── */}
                <div className="venue_vip_callout">
                  <div className="venue_vip_callout_left">
                    <div className="venue_vip_callout_icon">
                      <Crown size={24} color="#ffd700" />
                    </div>
                    <div className="venue_vip_callout_content">
                      <h4>Mesa VIP & Bottle Service</h4>
                      <p>
                        Reserva con Arrive Concierge en {selectedVenue.shortName}. 
                        100% de tu pago consumible en botellas y menú premium.
                      </p>
                      <div className="venue_vip_perks">
                        <span className="venue_vip_perk"><Users size={12} /> 10 entradas incluidas</span>
                        <span className="venue_vip_perk"><Wine size={12} /> Servicio de botellas</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    type="button"
                    className="btn_venue_reserve_vip"
                    onClick={handleOpenVipForVenue}
                  >
                    <Crown size={14} />
                    RESERVAR MESA VIP
                  </button>
                </div>
              </div>

              {/* ── Sidebar: Location, Contact & Map ── */}
              <aside className="venue_info_sidebar">
                {/* Google Maps Interactive Card */}
                <div className="venue_google_map_card">
                  <div className="venue_google_map_header">
                    <div className="venue_google_map_title">
                      <MapPin size={15} color="#ff3b5c" />
                      <span>Google Maps</span>
                    </div>
                    {selectedVenue.googleMapsUrl && (
                      <a
                        href={selectedVenue.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="venue_google_map_badge_link"
                        title={`Abrir ${selectedVenue.name} en Google Maps`}
                      >
                        <span>Abrir App</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                  <div className="venue_google_map_frame_box">
                    <iframe
                      title={`Google Maps - ${selectedVenue.name}`}
                      src={selectedVenue.googleMapsEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(selectedVenue.googleMapsQuery || (selectedVenue.name + ', ' + (selectedVenue.address || 'Panamá')))}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                      className="venue_google_map_iframe"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  {selectedVenue.googleMapsUrl && (
                    <a
                      href={selectedVenue.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="venue_google_map_action_btn"
                      title="Ver cómo llegar en Google Maps"
                    >
                      <Navigation size={13} />
                      <span>CÓMO LLEGAR CON GOOGLE MAPS</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <div className="venue_sidebar_card">
                  <h4 className="venue_sidebar_title">Ubicación & Contacto</h4>
                  
                  <div className="venue_contact_row">
                    <MapPin size={16} color="#c10230" className="flex-shrink-0" />
                    <div>
                      <span className="venue_contact_label">Dirección</span>
                      <p className="venue_contact_value" itemProp="address">{selectedVenue.address}</p>
                    </div>
                  </div>

                  {selectedVenue.parking && (
                    <div className="venue_contact_row">
                      <Car size={16} color="#c10230" className="flex-shrink-0" />
                      <div>
                        <span className="venue_contact_label">Estacionamiento</span>
                        <p className="venue_contact_value">{selectedVenue.parking}</p>
                      </div>
                    </div>
                  )}

                  {selectedVenue.ageLimit && (
                    <div className="venue_contact_row">
                      <ShieldCheck size={16} color="#c10230" className="flex-shrink-0" />
                      <div>
                        <span className="venue_contact_label">Admisión & Edad</span>
                        <p className="venue_contact_value">{selectedVenue.ageLimit}</p>
                      </div>
                    </div>
                  )}

                  {selectedVenue.websiteUrl && (
                    <div className="venue_contact_row">
                      <Globe size={16} color="#c10230" className="flex-shrink-0" />
                      <div>
                        <span className="venue_contact_label">Sitio Web</span>
                        <a 
                          href={selectedVenue.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="venue_contact_link"
                          itemProp="url"
                        >
                          {selectedVenue.websiteUrl.replace('https://', '').replace('www.', '')}
                          <ExternalLink size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedVenue.instagramUrl && (
                    <div className="venue_contact_row">
                      <InstagramIcon size={16} color="#ff3b5c" className="flex-shrink-0" />
                      <div>
                        <span className="venue_contact_label">Instagram Oficial</span>
                        <a 
                          href={selectedVenue.instagramUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="venue_contact_link"
                        >
                          {selectedVenue.instagramHandle}
                          <ExternalLink size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedVenue.googleMapsUrl && (
                    <a 
                      href={selectedVenue.googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn_open_maps"
                    >
                      <Navigation size={14} />
                      <span>ABRIR EN GOOGLE MAPS</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </aside>
            </article>
          )}

          {/* 2. MENÚ & COCTELERÍA */}
          {activeTab === 'menu' && (
            <div className="venue_menu_layout">
              {/* Menu categories pills */}
              <div className="venue_menu_categories_bar">
                {menuCategories.map((catKey) => {
                  const isActive = activeMenuCat === catKey;
                  const count = selectedVenue.menu && selectedVenue.menu[catKey] ? selectedVenue.menu[catKey].length : 0;
                  return (
                    <button
                      key={catKey}
                      type="button"
                      className={`venue_menu_cat_pill ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveMenuCat(catKey)}
                    >
                      <span>{formatMenuCatName(catKey)}</span>
                      <span className="cat_count_badge">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Items listing for active category */}
              <div className="venue_menu_items_grid">
                {selectedVenue.menu && selectedVenue.menu[activeMenuCat] ? (
                  selectedVenue.menu[activeMenuCat].map((item, index) => (
                    <div 
                      key={index} 
                      className={`venue_menu_item_card ${activeMenuCat === 'botellasVip' ? 'is-vip-bottle' : ''}`}
                    >
                      <div className="venue_menu_item_header">
                        <div className="venue_menu_name_row">
                          <h4 className="venue_menu_item_name">{item.name}</h4>
                          {item.tags && item.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className={`venue_dietary_tag tag_${tag.toLowerCase()}`}
                              title={tag === 'GF' ? 'Gluten Free' : tag === 'V' ? 'Vegetariano' : tag === 'KT' ? 'Keto Friendly' : 'Specialty / Seafood'}
                            >
                              {tag === 'GF' ? 'Gluten-Free' : tag === 'V' ? 'Veggie' : tag === 'KT' ? 'Keto' : 'Chef Pick'}
                            </span>
                          ))}
                        </div>
                        <span className="venue_menu_item_price">{item.price}</span>
                      </div>
                      <p className="venue_menu_item_desc">{item.desc}</p>
                    </div>
                  ))
                ) : (
                  <p className="venue_menu_empty">No hay elementos registrados en esta categoría.</p>
                )}
              </div>

              {/* Note below menu */}
              <div className="venue_menu_footer_note">
                <Sparkles size={14} color="#ffd700" />
                <span>
                  Precios sujetos a impuestos y servicio. Carta gastronómica y mixología sujeta a rotación de temporada.
                </span>
              </div>
            </div>
          )}

          {/* 3. GALERÍA DE FOTOS */}
          {activeTab === 'gallery' && (
            <div className="venue_gallery_tab_content">
              <div className="venue_gallery_grid_full">
                {selectedVenue.gallery?.map((imgObj, idx) => (
                  <div 
                    key={idx} 
                    className="venue_full_gallery_card"
                    onClick={() => setActiveLightboxIndex(idx)}
                  >
                    <img 
                      src={imgObj.url} 
                      alt={imgObj.title} 
                      className="venue_full_gallery_thumb"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="venue_gallery_thumb_overlay">
                      <span className="venue_gallery_category_pill">{imgObj.category}</span>
                      <h4 className="venue_gallery_item_title">{imgObj.title}</h4>
                      <div className="venue_gallery_zoom_btn">
                        <Maximize2 size={16} />
                        <span>Ver Foto</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. EVENTOS */}
          {activeTab === 'events' && (
            <div className="venue_events_tab_content">
              {venueEvents.length === 0 ? (
                <div className="venue_no_events_box">
                  <Calendar size={36} color="#888888" style={{ marginBottom: '1rem' }} />
                  <h3>Próximas Fechas por Anunciar</h3>
                  <p>
                    No hay eventos con boletos activos para <strong>{selectedVenue.name}</strong> en este momento. 
                    ¡Mantente atento a las próximas fechas oficiales o reserva tu mesa VIP para este fin de semana!
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                    <button 
                      type="button" 
                      className="btn_action_vip" 
                      onClick={handleOpenVipForVenue}
                    >
                      <Crown size={15} />
                      <span>SOLICITAR MESA VIP</span>
                    </button>
                    {selectedVenue.instagramUrl && (
                      <a 
                        href={selectedVenue.instagramUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="venue_action_chip instagram"
                        style={{ padding: '0.8rem 1.25rem' }}
                      >
                        <InstagramIcon size={15} />
                        <span>Ver en Instagram</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="venue_events_grid">
                  {venueEvents.map((evt) => (
                    <div key={evt.id} className="venue_event_card">
                      <div className="venue_event_thumb_wrap">
                        <img src={evt.image} alt={evt.title} className="venue_event_thumb" />
                        <span className="venue_event_date_badge">{evt.dateFormatted}</span>
                      </div>
                      <div className="venue_event_content">
                        <div className="venue_event_venue_name">{selectedVenue.shortName}</div>
                        <h4 className="venue_event_title">{evt.title}</h4>
                        <p className="venue_event_subtitle">{evt.subtitle}</p>

                        <div className="venue_event_times">
                          <span className="venue_event_time_item">
                            🍽️ Dinner: {evt.dinnerSchedule || selectedVenue.dinnerTime}
                          </span>
                          <span className="venue_event_time_item">
                            🪩 Party: {evt.partySchedule || selectedVenue.partyTime}
                          </span>
                        </div>

                        <div className="venue_event_actions">
                          <button
                            type="button"
                            className="btn_venue_evt_details"
                            onClick={() => {
                              setSelectedEvent(evt);
                              setIsVenuesModalOpen(false);
                            }}
                          >
                            Ver Detalles
                          </button>
                          <a
                            href={evt.ticketLink || 'https://www.mieventos.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn_venue_evt_tickets"
                          >
                            <span>MIEVENTOS</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* ── LIGHTBOX PHOTO PREVIEW MODAL ── */}
        {activeLightboxIndex !== null && selectedVenue.gallery && (
          <div 
            className="lightbox_overlay"
            onClick={() => setActiveLightboxIndex(null)}
          >
            <div className="lightbox_modal" onClick={(e) => e.stopPropagation()}>
              <button 
                className="lightbox_close_btn"
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Cerrar imagen"
              >
                <X size={20} />
              </button>

              <div 
                className="lightbox_image_wrapper"
                onClick={() => {
                  setActiveLightboxIndex((prev) => 
                    prev < selectedVenue.gallery.length - 1 ? prev + 1 : 0
                  );
                }}
                title="Clic para ver la siguiente imagen"
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={selectedVenue.gallery[activeLightboxIndex].url} 
                  alt={selectedVenue.gallery[activeLightboxIndex].title} 
                  className="lightbox_img"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80';
                  }}
                />
              </div>

              <div className="lightbox_footer">
                <div>
                  <span className="lightbox_tag">
                    {selectedVenue.gallery[activeLightboxIndex].category} • {selectedVenue.shortName}
                  </span>
                  <h3 className="lightbox_title">
                    {selectedVenue.gallery[activeLightboxIndex].title}
                  </h3>
                </div>
                <div className="lightbox_controls">
                  <button 
                    className="lightbox_nav_btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxIndex((prev) => 
                        prev > 0 ? prev - 1 : selectedVenue.gallery.length - 1
                      );
                    }}
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="lightbox_counter">
                    {activeLightboxIndex + 1} / {selectedVenue.gallery.length}
                  </span>
                  <button 
                    className="lightbox_nav_btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxIndex((prev) => 
                        prev < selectedVenue.gallery.length - 1 ? prev + 1 : 0
                      );
                    }}
                    aria-label="Siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default VenuesModal;
