import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wine, MapPin, QrCode, Share2 } from 'lucide-react';

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

const formatPerk = (text, isEs) => {
  if (!text) return '';
  let clean = text.replace(/^[\s\p{Extended_Pictographic}\p{Emoji_Component}\u200d\uFE0F\u200E]+/gu, '').trim();
  if (!isEs) {
    clean = clean
      .replace(/OPEN BAR HASTA (\d+)\s*(MN|AM|PM)/gi, 'OPEN BAR UNTIL $1$2')
      .replace(/\(ELLAS & ELLOS\)/gi, '(LADIES & GENTS)')
      .replace(/OPEN GIN & SANGRÍA PARA ELLAS/gi, 'LADIES OPEN GIN & SANGRIA')
      .replace(/TICKETS FREE HASTA LAS (\d+:\d+)\s*(MN|AM|PM)/gi, 'FREE PASS UNTIL $1 $2')
      .replace(/ENTRADA FREE ELLAS Y ELLOS/gi, 'FREE ENTRY FOR LADIES & GENTS')
      .replace(/TODOS GRATIS CON OPEN BAR HASTA (\d+)\s*(AM|PM)/gi, 'FREE ENTRY + OPEN BAR UNTIL $1$2')
      .replace(/TODOS GRATIS HASTA LAS (\d+:\d+)\s*(AM|PM)/gi, 'FREE ENTRY UNTIL $1 $2')
      .replace(/PASE DIGITAL EXCLUSIVO/gi, 'EXCLUSIVE DIGITAL PASS');
  } else {
    clean = clean
      .replace(/TICKETS FREE/gi, 'ENTRADAS GRATIS')
      .replace(/ENTRADA FREE/gi, 'ENTRADA GRATIS');
  }
  return clean;
};

export const EventCard = ({ event }) => {
  const { setSelectedEvent, setSelectedVipEvent, setIsBookVipModalOpen, venues, openVenueDetail, locale } = useApp();
  const [showMapPreview, setShowMapPreview] = useState(false);
  const activeLocale = locale || 'es';
  const isEs = activeLocale === 'es';

  // Dynamic intelligent venue resolution from canonical database
  const matchedVenue = (venues || []).find((v) => {
    const normLoc = normalizeText(event.location);
    const normTitle = normalizeText(event.title);
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

  const cleanVenueName = (() => {
    const normLoc = normalizeText(event.location);
    const normTitle = normalizeText(event.title);
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
    return matchedVenue ? matchedVenue.name.toUpperCase() : (event.location ? event.location.replace(/,.*$/, '').toUpperCase() : 'PANAMÁ');
  })();

  const mapImage = matchedVenue?.mapPreview || event.mapPreview || (normalizeText(event.location).includes('terraplen') ? '/images/terraplen_map_preview.jpg' : '/images/furia_map_preview.jpg');
  const igHandle = matchedVenue?.instagramHandle || event.instagramHandle || (normalizeText(event.location).includes('terraplen') ? '@terraplenpanama' : '@furiaclubpanama');
  const igUrl = matchedVenue?.instagramUrl || event.instagramUrl || (normalizeText(event.location).includes('terraplen') ? 'https://www.instagram.com/terraplenpanama/' : 'https://www.instagram.com/furiaclubpanama/');
  const venueAddress = matchedVenue?.address || event.address || 'Panamá';

  const handleBookVip = (e) => {
    e.stopPropagation();
    setSelectedVipEvent(event);
    setIsBookVipModalOpen(true);
  };

  const handleOpenDetail = (e) => {
    e.stopPropagation();
    setSelectedEvent(event);
  };

  // Open venue's Instagram in new tab
  const handleOpenInstagram = (e) => {
    e.stopPropagation();
    window.open(igUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/${activeLocale}/events/${event.slug || 'event'}/`;
    const shareData = {
      title: `${event.title} • ${cleanVenueName}`,
      text: `${event.title} en ${cleanVenueName} | Beneficios y entradas en HANGOUT:`,
      url: shareUrl
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert(isEs ? '¡Enlace copiado al portapapeles!' : 'Link copied to clipboard!');
    }
  };

  // Format date accurately for all days of the week & dynamic month
  const getDayShort = (day) => {
    const d = normalizeText(day);
    if (d.includes('mar')) return isEs ? 'Mar' : 'Tue';
    if (d.includes('mie')) return isEs ? 'Mié' : 'Wed';
    if (d.includes('jue')) return isEs ? 'Jue' : 'Thu';
    if (d.includes('vie')) return isEs ? 'Vie' : 'Fri';
    if (d.includes('sab')) return isEs ? 'Sáb' : 'Sat';
    if (d.includes('dom')) return isEs ? 'Dom' : 'Sun';
    return isEs ? 'Vie' : 'Fri';
  };

  const getMonthShort = (str) => {
    const s = normalizeText(str);
    if (s.includes('nov')) return isEs ? 'Nov' : 'Nov';
    if (s.includes('dic')) return isEs ? 'Dic' : 'Dec';
    if (s.includes('ene')) return isEs ? 'Ene' : 'Jan';
    if (s.includes('feb')) return isEs ? 'Feb' : 'Feb';
    if (s.includes('mar')) return isEs ? 'Mar' : 'Mar';
    if (s.includes('abr')) return isEs ? 'Abr' : 'Apr';
    if (s.includes('may')) return isEs ? 'May' : 'May';
    if (s.includes('jun')) return isEs ? 'Jun' : 'Jun';
    if (s.includes('jul')) return isEs ? 'Jul' : 'Jul';
    if (s.includes('ago')) return isEs ? 'Ago' : 'Aug';
    if (s.includes('sep')) return isEs ? 'Sep' : 'Sep';
    if (s.includes('oct')) return isEs ? 'Oct' : 'Oct';
    return isEs ? 'Nov' : 'Nov';
  };

  const dayShort = getDayShort(event.dayOfWeek || event.date);
  const dayMatch = (event.date || '').match(/\b(\d{1,2})\b/);
  const dayNum = dayMatch ? dayMatch[1] : (event.date ? (event.date.split(' ')[1] || '25') : '25');
  const monthShort = getMonthShort(event.date || event.eventDate || 'Nov');
  const dateStr = isEs ? `${dayShort}, ${dayNum} ${monthShort} 2026` : `${dayShort}, ${monthShort} ${dayNum}, 2026`;

  return (
    <article 
      className="event_item w-dyn-item" 
      role="listitem"
      onClick={handleOpenDetail}
    >
      <div className="event">
        {/* Poster Image */}
        <div className="event_image_wrapper">
          <img 
            src={event.image} 
            alt={event.imageAlt || `${event.title} en ${cleanVenueName}, Ciudad de Panamá`} 
            className="event_image"
            loading="lazy"
            decoding="async"
            width="320"
            height="320"
          />
          {/* After Party Alert Badge for La Rosalía */}
          {Boolean(
            normalizeText(cleanVenueName).includes('rosalia') || 
            normalizeText(event.location).includes('rosalia') ||
            event.afterPartyTime
          ) && (
            <div className="afterparty_alert_badge">
              <span className="afterparty_fire">🔥</span>
              <span>{isEs ? 'AFTER PARTY HASTA LAS 8:00 AM' : 'AFTER PARTY UNTIL 8:00 AM'}</span>
            </div>
          )}
          {/* Selling Fast Badge */}
          {Boolean(
            event.spotsLeft && event.spotsLeft <= 10 && event.spotsLeft > 0
          ) && (
            <div className="selling-fast">{isEs ? `🔥 ÚLTIMOS ${event.spotsLeft} CUPOS` : `🔥 ONLY ${event.spotsLeft} SPOTS`}</div>
          )}
        </div>

        {/* Clean Pacha-Style Content Hierarchy */}
        <div className="event_content">
          {/* 1. Date (clean minimalist grey, like Pacha Icons) */}
          <p className="para_16px light_grey event_card_date">{dateStr}</p>

          {/* 2. Main Title */}
          <div className="heading_date_wrapper">
            <h2 className="para_24px is_caps name">
              <a 
                href={`/${activeLocale}/events/${event.slug || 'event'}/`}
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenDetail(e);
                }}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {event.title}
              </a>
            </h2>
          </div>

          {/* 3. Lineup */}
          {event.artists && event.artists.length > 0 && (
            <p className="para_16px lineup">
              LINEUP : {event.artists.map(a => a.shortName || a.name).join(', ')}
            </p>
          )}

          {/* 4. Bottom Pinned: Courtesy Perk Badge (Clean signature) */}
          {event.perkHeadline && (
            <div className="event_card_bottom_pinned">
              <div className="perk_badge_red">
                <span className="perk_icon_wrap">
                  <Wine size={12} color="#FF2A2A" className="perk_icon" />
                </span>
                <span className="perk_text">
                  {formatPerk(event.perkHeadline, isEs)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Location Tag (Pacha Icons style: clean full-width uppercase venue bar) */}
      <div className="location_tag">
        <a 
          href={`/${activeLocale}/venues/${matchedVenue?.slug || 'furia-club'}/`}
          onClick={(e) => {
            e.stopPropagation();
            openVenueDetail(matchedVenue?.id || 'venue-furia');
          }}
          className="location_tag_link"
        >
          <MapPin size={11} color="#FF0000" style={{ flexShrink: 0 }} />
          <span>{cleanVenueName}, {isEs ? 'PANAMÁ' : 'PANAMA'}</span>
        </a>
      </div>

      {/* 6. Action Buttons */}
      <div className="card_buttons_wrapper">
        <div style={{ display: 'flex', gap: '0.45rem', width: '100%' }}>
          <a 
            href={`/${activeLocale}/events/${event.slug || 'event'}/`}
            className="general w-inline-block"
            onClick={(e) => {
              e.preventDefault();
              handleOpenDetail(e);
            }}
            aria-label={isEs ? `Tickets y pase QR para ${event.title}` : `Tickets and QR pass for ${event.title}`}
            style={{ textDecoration: 'none', flex: 1 }}
          >
            <QrCode size={13} color="#ffffff" style={{ flexShrink: 0, opacity: 0.9 }} />
            <span>{isEs ? 'ENTRADAS / QR' : 'TICKETS / QR'}</span>
          </a>

          <button
            type="button"
            className="general general_icon w-inline-block"
            onClick={handleShare}
            aria-label={isEs ? 'Compartir evento' : 'Share event'}
            title={isEs ? 'Compartir evento' : 'Share event'}
          >
            <Share2 size={14} color="#ffffff" />
          </button>
        </div>

        <button 
          type="button"
          className="red_button bottom w-inline-block"
          onClick={handleBookVip}
          aria-label={isEs ? `Reserva VIP para ${event.title}` : `VIP Reservation for ${event.title}`}
        >
          <div className="red_flex">
            <span className="vip_champagne_emoji">🍾</span>
            <span>{isEs ? 'RESERVA VIP' : 'VIP RESERVATION'}</span>
            <span className="vip_champagne_emoji">🍾</span>
          </div>
          <p className="para_12px">{isEs ? '100% CANJEABLE EN CONSUMO' : '100% REDEEMABLE IN FOOD & DRINKS'}</p>
        </button>
      </div>
    </article>
  );
};

export default EventCard;

