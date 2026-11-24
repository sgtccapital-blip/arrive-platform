import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  MapPin,
  ExternalLink,
  Crown,
  Ticket,
  Wine,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Music,
  Shirt,
  Share2,
  Clock,
  ListChecks
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
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

// "Sáb, 28 Nov 2026" from eventDate; falls back to the free-text date field.
const formatEventDate = (evt, isEs) => {
  const d = evt.eventDate ? new Date(evt.eventDate) : null;
  if (!d || Number.isNaN(d.getTime())) return evt.date || evt.dayOfWeek || '';
  const fmt = new Intl.DateTimeFormat(isEs ? 'es-PA' : 'en-US', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
  }).format(d);
  return fmt.replace(/\./g, '').replace(/^\w/, (c) => c.toUpperCase());
};

// dj-oriel.jpg was used as a stand-in photo for many other DJs in the data.
// Show initials instead of someone else's face until the real photo is added.
const isPlaceholderAvatar = (artist) =>
  /\/dj-oriel\.jpg$/i.test(artist.avatar || '') && !/oriel/i.test(artist.name || '');

const initials = (name) =>
  (name || '?').replace(/^dj\s+/i, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export const EventDetailModal = () => {
  const {
    selectedEvent,
    setSelectedEvent,
    setSelectedVipEvent,
    setIsBookVipModalOpen,
    venues,
    events,
    locale,
    showToast
  } = useApp();

  const isEs = (locale || 'es') === 'es';
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [brokenAvatars, setBrokenAvatars] = useState({});
  const [heroCtasVisible, setHeroCtasVisible] = useState(true);
  const pageRef = useRef(null);
  const heroCtasRef = useRef(null);

  // Show the sticky action bar only once the hero CTAs scroll out of view
  useEffect(() => {
    const target = heroCtasRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setHeroCtasVisible(entry.isIntersecting),
      { root: pageRef.current, threshold: 0 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [selectedEvent?.id]);

  if (!selectedEvent) return null;

  const handleClose = () => {
    setSelectedEvent(null);
    setActiveLightboxIndex(null);
    setDragOffset(0);
    setTouchStartY(null);
  };

  // Swipe down from the very top to close (mobile)
  const handleTouchStart = (e) => {
    if (!pageRef.current || pageRef.current.scrollTop <= 5) {
      setTouchStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (touchStartY === null) return;
    const diff = e.touches[0].clientY - touchStartY;
    if (diff > 0) setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (dragOffset > 110) handleClose();
    else setDragOffset(0);
    setTouchStartY(null);
  };

  const handleOpenVipModal = () => {
    setSelectedVipEvent(selectedEvent);
    setSelectedEvent(null);
    setIsBookVipModalOpen(true);
  };

  // Dynamic intelligent venue resolution from canonical database
  const matchedVenue = (venues || []).find((v) => {
    if (selectedEvent.venueSlug && v.slug === selectedEvent.venueSlug) return true;
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
        { url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&auto=format&fit=crop&q=80', title: 'Terraza Rooftop & Skyline de Panamá', category: 'Skyline View' },
        { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80', title: 'Dinner Sunset al Aire Libre', category: 'Sunset Dinner' },
        { url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80', title: 'Party & Open Air Dancefloor', category: 'Nightlife' },
        { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80', title: 'DJ Deck & Iluminación Nocturna', category: 'Live DJ Set' }
      ] : [
        { url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&auto=format&fit=crop&q=80', title: 'Main Club & Zona VIP', category: 'Nightlife / VIP' },
        { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80', title: 'Cabina de DJ & Pista 360°', category: 'Music & Energy' },
        { url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200&auto=format&fit=crop&q=80', title: 'Dinner Experience & Cócteles de Autor', category: 'Dinner & Cocktails' },
        { url: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=1200&auto=format&fit=crop&q=80', title: 'Show de Luces & Visuales', category: 'Ambiance' }
      ]);

  const cleanVenue = (() => {
    const normLoc = normalizeText(selectedEvent.location);
    const normTitle = normalizeText(selectedEvent.title);
    if (normLoc.includes('002') || normTitle.includes('002') || normLoc.includes('piso') || normTitle.includes('piso')) {
      return 'TERRAPLÉN PISO 002';
    }
    if (normLoc.includes('terraplen') || normTitle.includes('terraplen')) return 'TERRAPLÉN ROOFTOP';
    if (normLoc.includes('rosalia') || normTitle.includes('rosalia') || (matchedVenue && normalizeText(matchedVenue.slug).includes('rosalia'))) return 'LA ROSALÍA';
    if (normLoc.includes('piano') || normTitle.includes('piano') || (matchedVenue && normalizeText(matchedVenue.slug).includes('piano'))) return 'PIANO BAR';
    if (normLoc.includes('furia') || normTitle.includes('furia') || (matchedVenue && normalizeText(matchedVenue.slug).includes('furia'))) return 'FURIA CLUB';
    return matchedVenue ? matchedVenue.name.toUpperCase() : (selectedEvent.location ? selectedEvent.location.replace(/,.*$/, '').toUpperCase() : 'PANAMÁ');
  })();

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/${locale || 'es'}/events/${selectedEvent.slug || 'event'}/`;
    const shareData = {
      title: `${selectedEvent.title} • ${cleanVenue}`,
      text: isEs
        ? `${selectedEvent.title} en ${cleanVenue} | Beneficios y entradas en HANGOUT:`
        : `${selectedEvent.title} at ${cleanVenue} | Perks and tickets on HANGOUT:`,
      url: shareUrl
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast?.(isEs ? '¡Enlace copiado!' : 'Link copied!', 'info');
      } catch { /* clipboard blocked */ }
    }
  };

  const ev = selectedEvent;
  const dateLabel = formatEventDate(ev, isEs);
  const timeLabel = ev.time || ev.partyTime || '';
  const genres = (ev.musicGenres && ev.musicGenres.length > 0) ? ev.musicGenres : (ev.genre ? [ev.genre] : []);
  const isAfterParty = normalizeText(cleanVenue).includes('rosalia') || ev.afterPartyTime;
  const currency = ev.currency || '$';
  const ticketPriceLabel = ev.price > 0
    ? `${isEs ? 'DESDE' : 'FROM'} ${currency}${ev.price}`
    : (isEs ? 'PASE GRATIS' : 'FREE PASS');
  const perks = [
    ...(ev.perkHeadline ? [{ text: ev.perkHeadline.replace(/^[^\w¡¿]+/, ''), highlight: true }] : []),
    ...((ev.perksIncluded || []).map((p) => ({ text: p })))
  ];

  const TicketCta = ({ className = '' }) => (
    ev.ticketUrl ? (
      <a
        href={ev.ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`evd_cta evd_cta_outline ${className}`}
      >
        <Ticket size={15} />
        <span>{isEs ? 'ENTRADAS' : 'TICKETS'}</span>
        <strong>{ticketPriceLabel}</strong>
      </a>
    ) : null
  );

  const VipCta = ({ className = '' }) => (
    <button type="button" className={`evd_cta evd_cta_red ${className}`} onClick={handleOpenVipModal}>
      <span className="evd_cta_main">
        <Crown size={14} style={{ flexShrink: 0 }} />
        <span>{isEs ? 'RESERVA VIP' : 'VIP RESERVATION'}</span>
        {ev.vipPrice > 0 && <strong>{isEs ? 'DESDE' : 'FROM'} {currency}{ev.vipPrice}</strong>}
      </span>
      <span className="evd_cta_sub">{isEs ? '100% CANJEABLE EN CONSUMO' : 'FULLY REDEEMABLE'}</span>
    </button>
  );

  // More events: same venue first, then the rest of the cartelera (internal links for SEO + discovery)
  const relatedEvents = (() => {
    const others = (events || []).filter((o) => o.id !== ev.id && o.slug);
    const sameVenue = others.filter((o) => o.venueSlug && o.venueSlug === ev.venueSlug);
    const rest = others.filter((o) => !sameVenue.includes(o));
    return [...sameVenue, ...rest].slice(0, 6);
  })();

  const openRelated = (e, o) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    window.history.pushState(null, '', `/${locale || 'es'}/events/${o.slug}/`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setSelectedEvent(o);
    pageRef.current?.scrollTo({ top: 0 });
  };

  return (
    <div className="evd_overlay" onClick={handleClose}>
      <div
        ref={pageRef}
        className="evd_page"
        role="dialog"
        aria-modal="true"
        aria-label={ev.title}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : 'none',
          transition: dragOffset === 0 ? 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
        }}
      >
        {/* Swipe Handle Indicator for Mobile */}
        <div className="evd_handle" aria-hidden="true" />

        {/* ── TOP BAR: back pill + share + close ── */}
        <div className="evd_topbar">
          <button type="button" className="evd_back" onClick={handleClose} aria-label={isEs ? 'Volver a todos los eventos' : 'Back to all events'}>
            <ChevronLeft size={16} />
            <span>{isEs ? 'TODOS LOS EVENTOS' : 'ALL EVENTS'}</span>
          </button>
          <div className="evd_topbar_actions">
            <button type="button" className="evd_icon_btn" onClick={handleShare} aria-label={isEs ? 'Compartir evento' : 'Share event'} title={isEs ? 'Compartir evento' : 'Share event'}>
              <Share2 size={16} />
            </button>
            <button type="button" className="evd_icon_btn" onClick={handleClose} aria-label={isEs ? 'Cerrar' : 'Close'}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── LAYOUT: square flyer (fixed left on desktop) + scrolling content ── */}
        <div className="evd_layout">
          <div className="evd_flyer_col">
            <div className="evd_flyer">
              <img src={ev.image} alt={ev.imageAlt || ev.title} fetchpriority="high" />
            </div>
          </div>

          <div className="evd_main">
          <section className="evd_hero">

          <div className="evd_info_col">
            <div className="evd_eyebrow">
              {ev.dayOfWeek?.toUpperCase()} • {cleanVenue} • {isEs ? 'CIUDAD DE PANAMÁ' : 'PANAMA CITY'}
            </div>
            <h1 className="evd_title">{ev.title}</h1>
            <p className="evd_datetime">
              {dateLabel}{timeLabel && <> <span className="evd_sep">|</span> {timeLabel}</>}
            </p>

            {/* Meta row: genre • dress code • venue • age */}
            <ul className="evd_meta">
              {genres.length > 0 && (
                <li><Music size={15} /><span>{genres.join(' / ')}</span></li>
              )}
              <li><Shirt size={15} /><span>{ev.dressCode || 'Nightlife Chic'}</span></li>
              <li>
                <MapPin size={15} />
                {ev.googleMapsUrl ? (
                  <a href={ev.googleMapsUrl} target="_blank" rel="noopener noreferrer" title={isEs ? `Ver ${cleanVenue} en Google Maps` : `View ${cleanVenue} on Google Maps`}>
                    {cleanVenue}, {ev.city || 'Panamá'} ↗
                  </a>
                ) : (
                  <span>{cleanVenue}, {ev.city || 'Ciudad de Panamá'}</span>
                )}
              </li>
              <li className="evd_age">{ev.ageLimit || '18+'}</li>
            </ul>

            {/* Highlight badges: perk + after party */}
            {(ev.perkHeadline || isAfterParty) && (
              <div className="evd_badges">
                {ev.perkHeadline && (
                  <span className="evd_badge evd_badge_red">
                    <Wine size={13} />
                    <span>{ev.perkHeadline.replace(/^[^\w¡¿]+/, '')}</span>
                  </span>
                )}
                {isAfterParty && (
                  <span className="evd_badge evd_badge_amber">🔥 {isEs ? 'AFTER PARTY HASTA LAS 8:00 AM' : 'AFTER PARTY UNTIL 8:00 AM'}</span>
                )}
              </div>
            )}

            <div className="evd_ctas" ref={heroCtasRef}>
              <TicketCta />
              <VipCta />
            </div>

            {ev.description && <p className="evd_description">{ev.description}</p>}
          </div>
        </section>

        {/* ── HANGOUT BENEFITS (our edge: what you get by entering with Hangout) ── */}
        {perks.length > 0 && (
          <section className="evd_section">
            <h2 className="evd_h2">{isEs ? 'BENEFICIOS' : 'BENEFITS'}</h2>
            <p className="evd_h2_sub">
              {isEs ? 'CORTESÍAS DE LA NOCHE CON TU PASE HANGOUT' : 'COMPLIMENTARY PERKS WITH YOUR HANGOUT PASS'}
            </p>
            <ul className="evd_perks">
              {perks.map((perk, idx) => (
                <li key={idx} className={perk.highlight ? 'is_highlight' : ''}>
                  {perk.highlight ? <Wine size={16} /> : <CheckCircle2 size={16} />}
                  <span>{perk.text}</span>
                </li>
              ))}
            </ul>
            {(ev.perkDetails || ev.perkEndTime) && (
              <p className="evd_perk_note">
                <Clock size={13} />
                <span>{ev.perkDetails || `${isEs ? 'Válido hasta las' : 'Valid until'} ${ev.perkEndTime}`}</span>
              </p>
            )}
          </section>
        )}

        {/* ── VIP ZONE ── */}
        <section className="evd_section">
          <h2 className="evd_h2">{isEs ? 'ZONA VIP' : 'VIP ZONE'}</h2>
          <p className="evd_h2_sub">
            {isEs ? 'MESAS Y BOTELLAS • 100% CANJEABLE EN CONSUMO' : 'TABLES & BOTTLES • FULLY REDEEMABLE'}
          </p>
          {matchedVenue?.coverImage && (
            <div className="evd_vip_image">
              <img loading="lazy" decoding="async" src={matchedVenue.coverImage} alt={isEs ? `Zona VIP en ${cleanVenue}` : `VIP zone at ${cleanVenue}`} />
            </div>
          )}
          <VipCta className="evd_cta_block" />
        </section>

        {/* ── LINEUP ── */}
        {ev.artists && ev.artists.length > 0 && (
          <section className="evd_section">
            <h2 className="evd_h2">LINEUP</h2>
            <ul className="evd_lineup">
              {ev.artists.map((artist, idx) => {
                const hasRealIg = artist.instagram && !/instagram\.com\/?$/.test(artist.instagram);
                const showImg = artist.avatar && !brokenAvatars[idx] && !isPlaceholderAvatar(artist);
                return (
                  <li key={idx} className="evd_artist">
                    <div className="evd_avatar">
                      {showImg ? (
                        <img
                          loading="lazy"
                          decoding="async"
                          src={artist.avatar}
                          alt={artist.name}
                          onError={() => setBrokenAvatars((b) => ({ ...b, [idx]: true }))}
                        />
                      ) : (
                        <span className="evd_avatar_initials">{initials(artist.name)}</span>
                      )}
                      {artist.badge && (
                        <span className={`dj_badge_pill ${artist.badge.toLowerCase()}`}>{artist.badge}</span>
                      )}
                    </div>
                    <span className="evd_artist_name">{artist.name}</span>
                    {artist.role && <span className="evd_artist_role">{artist.role}</span>}
                    {artist.bio && <span className="evd_artist_bio">{artist.bio}</span>}
                    <div className="evd_artist_links">
                      {hasRealIg && (
                        <a href={artist.instagram} target="_blank" rel="noopener noreferrer" title={`Instagram de ${artist.name}`}>
                          <InstagramIcon size={13} />
                          <span>{artist.instagramHandle || 'Instagram'}</span>
                        </a>
                      )}
                      {artist.djSetUrl && (
                        <a href={artist.djSetUrl} target="_blank" rel="noopener noreferrer" title={`Escuchar sesión de ${artist.name}`}>
                          <Music size={13} />
                          <span>{artist.djSetTitle || 'DJ Set'}</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* ── GALLERY (venue & ambiance) ── */}
        <section className="evd_section">
          <h2 className="evd_h2">{isEs ? 'GALERÍA' : 'GALLERY'}</h2>
          <p className="evd_h2_sub">{cleanVenue}</p>
          <div className="evd_gallery">
            {gallery.map((item, idx) => (
              <button type="button" key={idx} className="evd_gallery_item" onClick={() => setActiveLightboxIndex(idx)} aria-label={item.title}>
                <img src={item.url} alt={item.title} loading="lazy" decoding="async" />
                <span className="evd_gallery_caption">
                  <span className="evd_gallery_tag">{item.category}</span>
                  <span className="evd_gallery_title">{item.title}<Maximize2 size={11} /></span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── MORE EVENTS ── */}
        {relatedEvents.length > 0 && (
          <section className="evd_section">
            <h2 className="evd_h2">{isEs ? 'MÁS EVENTOS' : 'MORE EVENTS'}</h2>
            <p className="evd_h2_sub">{isEs ? `ESTA SEMANA EN ${cleanVenue?.toUpperCase()} Y MÁS` : `THIS WEEK AT ${cleanVenue?.toUpperCase()} AND MORE`}</p>
            <ul className="evd_related">
              {relatedEvents.map((o) => (
                <li key={o.id}>
                  <a href={`/${locale || 'es'}/events/${o.slug}/`} onClick={(e) => openRelated(e, o)} className="evd_related_card">
                    <img src={o.image} alt={o.imageAlt || o.title} loading="lazy" decoding="async" />
                    <span className="evd_related_text">
                      <span className="evd_related_date">{formatEventDate(o, isEs)}</span>
                      <strong>{o.title}</strong>
                      <span className="evd_related_venue">{o.location}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── READY TO HANGOUT ── */}
        <section className="evd_section evd_ready">
          <h2 className="evd_h2">{isEs ? '¿LISTO PARA VIVIR LA NOCHE?' : 'READY TO HANGOUT?'}</h2>
          <p className="evd_h2_sub">{isEs ? 'Lista de Invitados • Entradas • Mesas VIP' : 'Guest List • Tickets • VIP Tables'}</p>
          <div className="evd_pillars">
            <div>
              <strong className="is_red"><ListChecks size={14} /> {isEs ? 'Lista de Invitados' : 'Guest List'}</strong>
              <span>{isEs ? 'Solicita acceso a la lista de invitados antes del evento.' : 'Request guest list access before the event.'}</span>
            </div>
            <div>
              <strong className="is_gold"><Crown size={14} /> {isEs ? 'Mesas VIP' : 'VIP Tables'}</strong>
              <span>{isEs ? 'Consulta disponibilidad de mesas y paquetes de botellas.' : 'Check table availability and bottle packages.'}</span>
            </div>
            <div>
              <strong><Wine size={14} /> {isEs ? 'Beneficios' : 'Benefits'}</strong>
              <span>{isEs ? 'Consulta los beneficios activos para esta edición.' : 'See the active perks for this edition.'}</span>
            </div>
          </div>
          <div className="evd_ctas evd_ctas_center">
            <TicketCta />
            <VipCta />
          </div>
        </section>
          </div>
        </div>

        {/* ── Sticky mobile action bar ── */}
        <div className={`evd_sticky_bar ${heroCtasVisible ? 'is_hidden' : ''}`} aria-hidden={heroCtasVisible}>
          {ev.ticketUrl && (
            <a href={ev.ticketUrl} target="_blank" rel="noopener noreferrer" className="evd_sticky_ticket" aria-label={isEs ? 'Entradas' : 'Tickets'}>
              <Ticket size={16} />
              <span>{ticketPriceLabel}</span>
            </a>
          )}
          <button type="button" className="evd_sticky_vip" onClick={handleOpenVipModal}>
            <Crown size={15} />
            <span>{isEs ? 'RESERVA VIP' : 'VIP RESERVATION'}</span>
          </button>
        </div>

        {/* ── LIGHTBOX PHOTO PREVIEW MODAL ── */}
        {activeLightboxIndex !== null && (
          <div className="lightbox_overlay" onClick={() => setActiveLightboxIndex(null)}>
            <div className="lightbox_modal" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox_close_btn" onClick={() => setActiveLightboxIndex(null)} aria-label="Cerrar imagen">
                <X size={20} />
              </button>
              <div className="lightbox_image_wrapper">
                <img src={gallery[activeLightboxIndex].url} alt={gallery[activeLightboxIndex].title} className="lightbox_img" />
              </div>
              <div className="lightbox_footer">
                <div>
                  <span className="lightbox_tag">{gallery[activeLightboxIndex].category}</span>
                  <h3 className="lightbox_title">{gallery[activeLightboxIndex].title}</h3>
                </div>
                <div className="lightbox_controls">
                  <button
                    className="lightbox_nav_btn"
                    onClick={(e) => { e.stopPropagation(); setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1)); }}
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="lightbox_counter">{activeLightboxIndex + 1} / {gallery.length}</span>
                  <button
                    className="lightbox_nav_btn"
                    onClick={(e) => { e.stopPropagation(); setActiveLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0)); }}
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
