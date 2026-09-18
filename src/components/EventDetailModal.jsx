import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ExternalLink,
  Crown,
  Images,
  Ticket,
  Wine,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Music,
  ArrowLeft,
  Calendar,
  Sparkles
} from 'lucide-react';

const InstagramIcon = ({ size = 13, color = 'currentColor' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Intelligent accent-insensitive normalization
const normalizeText = (str) =>
  (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export const EventDetailModal = () => {
  const { 
    selectedEvent, 
    setSelectedEvent, 
    setSelectedVipEvent, 
    setIsBookVipModalOpen,
    venues,
    locale 
  } = useApp();

  const isEs = (locale || 'es') === 'es';
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  if (!selectedEvent) return null;

  const handleClose = () => {
    setSelectedEvent(null);
    setActiveLightboxIndex(null);
  };

  const handleOpenVipModal = () => {
    setSelectedVipEvent(selectedEvent);
    setSelectedEvent(null);
    setIsBookVipModalOpen(true);
  };

  // Dynamic intelligent venue resolution from canonical database
  const matchedVenue = (venues || []).find((v) => {
    const normLoc = normalizeText(selectedEvent.location);
    const normTitle = normalizeText(selectedEvent.title);
    const normVName = normalizeText(v.name);
    const normVShort = normalizeText(v.shortName);
    const normVSlug = normalizeText(v.slug);
    
    return (
      (normVShort && normLoc.includes(normVShort)) ||
      (normVSlug && normLoc.includes(normVSlug)) ||
      (normVShort && normTitle.includes(normVShort)) ||
      (normLoc && normVName.includes(normLoc))
    );
  });

  const isTerraplen = normalizeText(selectedEvent.location).includes('terraplen') || 
                      normalizeText(matchedVenue?.shortName).includes('terraplen');

  // Venue Gallery items with fallback
  const gallery = (selectedEvent.venueGallery && selectedEvent.venueGallery.length > 0)
    ? selectedEvent.venueGallery
    : (matchedVenue?.gallery && matchedVenue.gallery.length > 0)
    ? matchedVenue.gallery
    : (isTerraplen ? [
        {
          url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&auto=format&fit=crop&q=80',
          title: 'Terraza Rooftop & Skyline de Panamá',
          category: 'Skyline View'
        },
        {
          url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80',
          title: 'Dinner Sunset al Aire Libre',
          category: 'Sunset Dinner'
        },
        {
          url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
          title: 'Party & Open Air Dancefloor',
          category: 'Nightlife'
        },
        {
          url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
          title: 'DJ Deck & Iluminación Nocturna',
          category: 'Live DJ Set'
        }
      ] : [
        {
          url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&auto=format&fit=crop&q=80',
          title: 'Main Club & Zona VIP',
          category: 'Nightlife / VIP'
        },
        {
          url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
          title: 'Cabina de DJ & Pista 360°',
          category: 'Music & Energy'
        },
        {
          url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200&auto=format&fit=crop&q=80',
          title: 'Dinner Experience & Cócteles de Autor',
          category: 'Dinner & Cocktails'
        },
        {
          url: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=1200&auto=format&fit=crop&q=80',
          title: 'Show de Luces & Visuales',
          category: 'Ambiance'
        }
      ]);

  const cleanVenue = (() => {
    const normLoc = normalizeText(selectedEvent.location);
    const normTitle = normalizeText(selectedEvent.title);
    if (normLoc.includes('002') || normTitle.includes('002') || normLoc.includes('piso') || normTitle.includes('piso')) {
      return 'TERRAPLÉN PISO 002';
    }
    if (normLoc.includes('terraplen') || normTitle.includes('terraplen')) {
      return 'TERRAPLÉN ROOFTOP';
    }
    if (normLoc.includes('rosalia') || normTitle.includes('rosalia') || (matchedVenue && normalizeText(matchedVenue.slug).includes('rosalia'))) {
      return 'LA ROSALÍA';
    }
    if (normLoc.includes('piano') || normTitle.includes('piano') || (matchedVenue && normalizeText(matchedVenue.slug).includes('piano'))) {
      return 'PIANO BAR';
    }
    if (normLoc.includes('furia') || normTitle.includes('furia') || (matchedVenue && normalizeText(matchedVenue.slug).includes('furia'))) {
      return 'FURIA CLUB';
    }
    return matchedVenue ? matchedVenue.name.toUpperCase() : (selectedEvent.location ? selectedEvent.location.replace(/,.*$/, '').toUpperCase() : 'PANAMÁ');
  })();

  return (
    <div className="modal-overlay modal-overlay-event" onClick={handleClose}>
      <div className="modal-container modal-event-fullscreen" onClick={(e) => e.stopPropagation()}>
        {/* Mobile Go Back Button */}
        <button 
          type="button"
          className="modal_mobile_back_btn" 
          onClick={handleClose} 
          aria-label={isEs ? "Ir hacia atrás a eventos" : "Go back to events"}
        >
          <ArrowLeft size={16} />
          <span>{isEs ? 'VOLVER' : 'BACK'}</span>
        </button>

        {/* Close Button */}
        <button className="modal-close-btn" onClick={handleClose} aria-label="Cerrar ventana">
          <X size={18} />
        </button>

        {/* Hero Image */}
        <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
          <img 
            src={selectedEvent.image} 
            alt={selectedEvent.title} 
            className="modal-hero-image"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(10,10,10,0.95) 100%)'
          }}></div>

          <div style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '1.5rem',
            right: '1.5rem'
          }}>
            {/* EYEBROW */}
            <div style={{
              color: '#ff3b5c',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '0.35rem'
            }}>
              {selectedEvent.dayOfWeek?.toUpperCase()} • {cleanVenue} • PANAMA CITY
            </div>
            
            {/* H1 VISIBLE */}
            <h1 className="modal-title" style={{ color: '#ffffff', margin: 0, fontSize: 'clamp(1.2rem, 2.8vw, 1.85rem)' }}>
              {selectedEvent.title}
            </h1>

            {/* AFTER PARTY ALERT FOR LA ROSALIA */}
            {(normalizeText(cleanVenue).includes('rosalia') || selectedEvent.afterPartyTime) && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '0.55rem',
                marginRight: '0.5rem',
                background: 'rgba(255, 158, 0, 0.95)',
                color: '#000000',
                fontSize: '0.72rem',
                fontWeight: '900',
                padding: '4px 12px',
                borderRadius: '6px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                boxShadow: '0 0 15px rgba(255, 158, 0, 0.6)'
              }}>
                <span>🔥 AFTER PARTY HASTA LAS 8:00 AM</span>
              </div>
            )}

            {/* BENEFICIO HIGHLIGHT */}
            {selectedEvent.perkHeadline && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '0.55rem',
                background: 'rgba(193, 2, 48, 0.9)',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '4px 12px',
                borderRadius: '6px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                <Wine size={13} />
                <span>{selectedEvent.perkHeadline.replace(/^[^\w]+/, '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Symmetrical VIP Event Specs (2x2 Matrix) */}
          <div className="event_specs_grid">
            {/* 1. Date */}
            <div className="event_spec_card">
              <div className="event_spec_icon_wrap">
                <Calendar size={15} color="#ff3b5c" />
              </div>
              <div className="event_spec_content">
                <span className="event_spec_label">{isEs ? 'FECHA' : 'DATE'}</span>
                <span className="event_spec_value">{selectedEvent.date || selectedEvent.dayOfWeek}</span>
              </div>
            </div>

            {/* 2. Doors / Time */}
            <div className="event_spec_card">
              <div className="event_spec_icon_wrap">
                <Clock size={15} color="#ff3b5c" />
              </div>
              <div className="event_spec_content">
                <span className="event_spec_label">{isEs ? 'PUERTAS' : 'DOORS OPEN'}</span>
                <span className="event_spec_value highlight_red">
                  {selectedEvent.time ? selectedEvent.time.split('-')[0].trim() : '10:00 PM'}
                </span>
              </div>
            </div>

            {/* 3. Venue & Location */}
            <div className="event_spec_card">
              <div className="event_spec_icon_wrap">
                <MapPin size={15} color="#ff3b5c" />
              </div>
              <div className="event_spec_content">
                <span className="event_spec_label">{isEs ? 'LOCAL' : 'VENUE'}</span>
                <span className="event_spec_value">{cleanVenue}</span>
                {selectedEvent.googleMapsUrl ? (
                  <a
                    href={selectedEvent.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event_spec_link"
                    title={isEs ? `Ver ${cleanVenue} en Google Maps` : `View ${cleanVenue} on Google Maps`}
                  >
                    <span>{isEs ? 'Google Maps ↗' : 'Google Maps ↗'}</span>
                  </a>
                ) : (
                  <span className="event_spec_sub">{selectedEvent.city || 'Ciudad de Panamá'}</span>
                )}
              </div>
            </div>

            {/* 4. Dress Code */}
            <div className="event_spec_card">
              <div className="event_spec_icon_wrap">
                <Sparkles size={15} color="#ff3b5c" />
              </div>
              <div className="event_spec_content">
                <span className="event_spec_label">{isEs ? 'DRESS CODE' : 'DRESS CODE'}</span>
                <span className="event_spec_value">{selectedEvent.dressCode || 'Nightlife Chic'}</span>
                <span className="event_spec_sub">{selectedEvent.ageLimit || '18+ Exclusivo'}</span>
              </div>
            </div>
          </div>

          {/* Symmetrical Music Genres Bar */}
          {selectedEvent.musicGenres && selectedEvent.musicGenres.length > 0 && (
            <div className="event_music_card">
              <div className="event_spec_icon_wrap">
                <Music size={15} color="#ff3b5c" />
              </div>
              <div className="event_music_content">
                <span className="event_spec_label">{isEs ? 'MÚSICA' : 'MUSIC'}</span>
                <div className="event_music_pills">
                  {selectedEvent.musicGenres.map((genre, idx) => (
                    <span key={idx} className="event_genre_badge">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Djs & Invitados Profiles */}
          {selectedEvent.artists && selectedEvent.artists.length > 0 && (
            <div className="event_djs_section">
              <div className="event_djs_header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Headphones size={16} color="#ff3b5c" />
                  <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffffff', fontWeight: '800', margin: 0 }}>
                    {isEs ? 'DJs & Invitados' : 'DJs & Guest Artists'}
                  </h4>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#888888', fontWeight: '600' }}>
                  {isEs ? 'Perfiles Oficiales & Sets' : 'Official Profiles & Sets'}
                </span>
              </div>

              <div className="event_djs_grid">
                {selectedEvent.artists.map((artist, idx) => (
                  <div key={idx} className="dj_profile_card">
                    <div className="dj_profile_top">
                      <div className="dj_avatar_container">
                        <img 
                          src={artist.avatar} 
                          alt={artist.name} 
                          className="dj_avatar_img"
                          onError={(e) => {
                            e.target.src = '/images/carl-cox.jpg';
                          }}
                        />
                        {artist.badge && (
                          <span className={`dj_badge_pill ${artist.badge.toLowerCase()}`}>
                            {artist.badge}
                          </span>
                        )}
                      </div>

                      <div className="dj_main_details">
                        <div className="dj_name_row">
                          <h5 className="dj_name">{artist.name}</h5>
                        </div>
                        <p className="dj_role_text">{artist.role}</p>
                        {artist.bio && (
                          <p className="dj_bio_text">{artist.bio}</p>
                        )}
                      </div>
                    </div>

                    <div className="dj_profile_actions">
                      {artist.instagram && (
                        <a 
                          href={artist.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="dj_link_btn dj_ig_btn"
                          title={`Ver Instagram de ${artist.name}`}
                        >
                          <InstagramIcon size={13} />
                          <span>{artist.instagramHandle || '@' + artist.name.toLowerCase().replace(/\s+/g, '')}</span>
                          <ExternalLink size={10} style={{ opacity: 0.6, marginLeft: 'auto' }} />
                        </a>
                      )}

                      {artist.djSetUrl && (
                        <a 
                          href={artist.djSetUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="dj_link_btn dj_set_btn"
                          title={`Escuchar sesión de ${artist.name}`}
                        >
                          <Music size={13} />
                          <span>{artist.djSetTitle || 'Escuchar DJ Set'}</span>
                          <ExternalLink size={10} style={{ opacity: 0.6, marginLeft: 'auto' }} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {isEs ? 'Detalles de la Experiencia' : 'Experience Details'}
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {selectedEvent.description}
            </p>
          </div>

          {/* Perks & Courtesy Benefits */}
          {selectedEvent.perksIncluded && (
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ff3b5c', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wine size={15} color="#ff3b5c" />
                <span>{isEs ? 'Beneficios & Cortesías de la Noche' : 'Complimentary Night Benefits'}</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {selectedEvent.perksIncluded.map((perk, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={16} color="#c10230" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── VENUE & AMBIANCE GALLERY ── */}
          <div className="venue_gallery_section">
            <div className="venue_gallery_header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Images size={17} color="#ff3b5c" />
                <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffffff', fontWeight: '800', margin: 0 }}>
                  {isEs ? `Galería del Venue & Ambiente • ${cleanVenue}` : `Venue & Atmosphere Gallery • ${cleanVenue}`}
                </h4>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#888888' }}>
                {isEs ? 'Haz clic en una foto para ampliar' : 'Click any photo to expand'}
              </span>
            </div>

            <div className="venue_gallery_grid">
              {gallery.map((item, idx) => (
                <div 
                  key={idx} 
                  className="venue_gallery_card"
                  onClick={() => setActiveLightboxIndex(idx)}
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="venue_gallery_thumb" 
                    loading="lazy"
                  />
                  <div className="venue_gallery_overlay">
                    <span className="venue_gallery_pill">{item.category}</span>
                    <div className="venue_gallery_item_title">
                      <span>{item.title}</span>
                      <Maximize2 size={12} color="#ffffff" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── ACCESS BLOCK & READY TO ARRIVE CTA ── */}
          <div style={{
            marginTop: '1.75rem',
            marginBottom: '1rem',
            padding: '1.25rem',
            background: 'linear-gradient(180deg, rgba(20,20,20,0.85) 0%, rgba(10,10,10,0.95) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <h4 style={{
              fontSize: '1.15rem',
              fontWeight: '900',
              letterSpacing: '0.08em',
              color: '#ffffff',
              margin: '0 0 0.35rem 0',
              textTransform: 'uppercase'
            }}>
              READY TO ARRIVE?
            </h4>
            <p style={{
              fontSize: '0.8rem',
              color: '#aaaaaa',
              margin: '0 0 1.25rem 0',
              letterSpacing: '0.05em'
            }}>
              Guest List • Tickets • VIP Tables
            </p>

            {/* Access Pillars */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '10px',
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}>
              <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ display: 'block', fontSize: '0.78rem', color: '#ff3b5c', textTransform: 'uppercase' }}>Guest List</strong>
                <span style={{ fontSize: '0.72rem', color: '#bbb' }}>Solicita acceso a la lista de invitados antes del evento.</span>
              </div>
              <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ display: 'block', fontSize: '0.78rem', color: '#ffd700', textTransform: 'uppercase' }}>VIP Tables</strong>
                <span style={{ fontSize: '0.72rem', color: '#bbb' }}>Consulta disponibilidad de mesas y paquetes de botellas.</span>
              </div>
              <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ display: 'block', fontSize: '0.78rem', color: '#ffffff', textTransform: 'uppercase' }}>Benefits</strong>
                <span style={{ fontSize: '0.72rem', color: '#bbb' }}>Consulta los beneficios activos para esta edición.</span>
              </div>
            </div>

            {/* Main & Secondary CTA Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={selectedEvent.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  padding: '12px 24px',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>GET ACCESS</span>
                <ExternalLink size={14} />
              </a>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleOpenVipModal}
                style={{
                  padding: '12px 24px',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  letterSpacing: '0.06em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,215,0,0.1)',
                  color: '#ffd700',
                  borderColor: 'rgba(255,215,0,0.3)'
                }}
              >
                <Crown size={15} />
                <span>RESERVE A TABLE</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── LIGHTBOX PHOTO PREVIEW MODAL ── */}
        {activeLightboxIndex !== null && (
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

              <div className="lightbox_image_wrapper">
                <img 
                  src={gallery[activeLightboxIndex].url} 
                  alt={gallery[activeLightboxIndex].title} 
                  className="lightbox_img"
                />
              </div>

              <div className="lightbox_footer">
                <div>
                  <span className="lightbox_tag">{gallery[activeLightboxIndex].category}</span>
                  <h3 className="lightbox_title">{gallery[activeLightboxIndex].title}</h3>
                </div>
                <div className="lightbox_controls">
                  <button 
                    className="lightbox_nav_btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
                    }}
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="lightbox_counter">
                    {activeLightboxIndex + 1} / {gallery.length}
                  </span>
                  <button 
                    className="lightbox_nav_btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
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

export default EventDetailModal;
