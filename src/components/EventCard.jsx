import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wine, MapPin, QrCode } from 'lucide-react';

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

  // Format date accurately for all days of the week
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
  const dayShort = getDayShort(event.dayOfWeek || event.date);
  const dayMatch = (event.date || '').match(/\b(\d{1,2})\b/);
  const dayNum = dayMatch ? dayMatch[1] : (event.date ? (event.date.split(' ')[1] || '16') : '16');
  const dateStr = isEs ? `${dayShort}, ${dayNum} Sep 2026` : `${dayShort}, Sep ${dayNum}, 2026`;

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
            width="320"
            height="320"
          />
          {/* After Party 8AM Alert Badge for La Rosalía */}
          {Boolean(
            normalizeText(cleanVenueName).includes('rosalia') || 
            normalizeText(event.location).includes('rosalia') ||
            event.afterPartyTime
          ) && (
            <div className="afterparty_alert_badge">
              <span className="afterparty_fire">🔥</span>
              <span>AFTER PARTY HASTA LAS 8:00 AM</span>
            </div>
          )}
          {/* Selling Fast Badge: only on Tuesday's event as requested */}
          {Boolean(
            event.dayOfWeek === 'Martes' || 
            (event.date && event.date.toLowerCase().includes('martes')) ||
            event.id?.includes('martes')
          ) && (
            <div className="selling-fast">{isEs ? '🔥 CASI AGOTADO' : '🔥 SELLING FAST'}</div>
          )}
        </div>

        {/* Content Box with Refined Margins */}
        <div className="event_content">
          {/* Header Row: Date on the left, small Venue Link on the right */}
          <div className="event_meta_header">
            <span className="event_date">{dateStr}</span>

            {/* Small Venue Link (Hover for Express Venue Profile, Click for Venue Profile in Platform) */}
            <a 
              href={`/${activeLocale}/venues/${matchedVenue?.slug || 'furia-club'}/`}
              className="venue_inline_link"
              onMouseEnter={() => setShowMapPreview(true)}
              onMouseLeave={() => setShowMapPreview(false)}
              onClick={(e) => {
                e.stopPropagation();
                openVenueDetail(matchedVenue?.id || 'venue-furia');
              }}
              title={isEs ? `Ver perfil, Google Maps y menú de ${cleanVenueName}` : `View profile, Google Maps and menu of ${cleanVenueName}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MapPin size={11} color="#ff3b5c" style={{ flexShrink: 0 }} />
              <span className="venue_inline_text">{cleanVenueName}</span>

              {/* Floating Express Venue Profile on Hover with Google Maps & Photos */}
              {showMapPreview && matchedVenue && (
                <div 
                  className="venue_express_popover"
                  onClick={(e) => {
                    e.stopPropagation();
                    openVenueDetail(matchedVenue.id);
                  }}
                >
                  {/* Top Bar: Badges & Venue Name */}
                  <div className="venue_express_header">
                    <div className="venue_express_badges_row">
                      <span className="venue_express_cat_badge">{matchedVenue.category || 'Nightlife & Dining'}</span>
                      <span className="venue_express_area_badge">
                        <MapPin size={9} /> {matchedVenue.area || 'Panamá'}
                      </span>
                    </div>
                    <h4 className="venue_express_name">{matchedVenue.name}</h4>
                  </div>

                  {/* Real Google Maps Embed with Pin */}
                  <div className="venue_express_map_container">
                    <iframe
                      title={`Ubicación de ${matchedVenue.name} en Google Maps`}
                      src={matchedVenue.googleMapsEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(matchedVenue.googleMapsQuery || (matchedVenue.name + ', ' + (matchedVenue.address || 'Panamá')))}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      className="venue_express_map_iframe"
                      loading="lazy"
                    />
                    <a
                      href={matchedVenue.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(matchedVenue.name + ' Panama')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="venue_express_maps_app_badge"
                      onClick={(e) => e.stopPropagation()}
                      title="Abrir en app de Google Maps"
                    >
                      <MapPin size={10} color="#ff3b5c" />
                      <span>Google Maps ↗</span>
                    </a>
                  </div>

                  {/* Photos Strip (Gallery Thumbnails) */}
                  {matchedVenue.gallery && matchedVenue.gallery.length > 0 && (
                    <div className="venue_express_gallery_strip">
                      <div className="venue_express_gallery_label">
                        <span>{isEs ? 'FOTOS DEL VENUE' : 'VENUE PHOTOS'}</span>
                        <span className="venue_express_gallery_count">{matchedVenue.gallery.length} {isEs ? 'fotos' : 'photos'}</span>
                      </div>
                      <div className="venue_express_thumbs_grid">
                        {matchedVenue.gallery.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="venue_express_thumb_box">
                            <img 
                              src={item.url} 
                              alt={item.title || `${matchedVenue.name} foto`}
                              className="venue_express_thumb_img"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src = matchedVenue.coverImage || '/images/venues/furia/cover.jpg';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Info Express Rows */}
                  <div className="venue_express_info_block">
                    <div className="venue_express_info_item">
                      <span className="venue_express_icon">📍</span>
                      <span className="venue_express_text">{matchedVenue.address || 'Ciudad de Panamá'}</span>
                    </div>
                    {matchedVenue.partyTime && (
                      <div className="venue_express_info_item">
                        <span className="venue_express_icon">⏰</span>
                        <span className="venue_express_text">{isEs ? 'Fiesta:' : 'Party:'} {matchedVenue.partyTime}</span>
                      </div>
                    )}
                    {matchedVenue.dressCode && (
                      <div className="venue_express_info_item">
                        <span className="venue_express_icon">👔</span>
                        <span className="venue_express_text">Dress Code: {matchedVenue.dressCode}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action: Direct to Venue Page */}
                  <div className="venue_express_action_footer">
                    <span className="venue_express_action_text">{isEs ? 'VER PERFIL & RESERVAS' : 'VIEW PROFILE & BOOKINGS'}</span>
                    <span className="venue_express_action_arrow">→</span>
                  </div>
                </div>
              )}
            </a>
          </div>

          {/* Event Title */}
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

          {/* Schedules: Show, Dinner, Party, or After Party */}
          <div className="event_schedule_block">
            {event.showTime && (
              <div className="schedule_line">
                <span className="schedule_label show" style={{ color: '#00f2fe', fontWeight: 800 }}>{isEs ? 'SHOW:' : 'SHOW:'}</span>
                <span className="schedule_time">{event.showTime}</span>
              </div>
            )}
            {event.dinnerTime && (
              <div className="schedule_line">
                <span className="schedule_label">{isEs ? 'CENA:' : 'DINNER:'}</span>
                <span className="schedule_time">{event.dinnerTime}</span>
              </div>
            )}
            <div className="schedule_line">
              <span className="schedule_label party">{isEs ? 'FIESTA:' : 'PARTY:'}</span>
              <span className="schedule_time">{event.partyTime || '10:00 PM - 04:00 AM'}</span>
            </div>
            {event.afterPartyTime && (
              <div className="schedule_line">
                <span className="schedule_label after" style={{ color: '#ffb703', fontWeight: 800 }}>{isEs ? 'AFTER PARTY:' : 'AFTER PARTY:'}</span>
                <span className="schedule_time">{event.afterPartyTime}</span>
              </div>
            )}
          </div>

          {/* Bottom Pinned Section: Lineup + Perk (always at same position) */}
          <div className="event_card_bottom_pinned">
            {/* Lineup */}
            <p className="para_16px lineup">
              {event.artists && event.artists.length > 0
                ? `LINEUP: ${event.artists.map(a => a.shortName || a.name).join(', ')}`
                : '\u00A0'
              }
            </p>

            {/* Weekly Courtesy Benefit Badge (Signature Red) */}
            {event.perkHeadline && (
              <div className="perk_badge_red">
                <span className="perk_icon_wrap">
                  <Wine size={12} color="#ff3b5c" className="perk_icon" />
                </span>
                <span className="perk_text">
                  {event.perkHeadline.replace(/^[\s\p{Extended_Pictographic}\p{Emoji_Component}\u200d\uFE0F\u200E]+/gu, '').trim()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons: Adjusted Sleek Heights */}
      <div className="card_buttons_wrapper">
        <a 
          href={`/${activeLocale}/events/${event.slug || 'event'}/`}
          className="general w-inline-block"
          onClick={(e) => {
            e.preventDefault();
            handleOpenDetail(e);
          }}
          aria-label={isEs ? `Tickets y pase QR para ${event.title}` : `Tickets and QR pass for ${event.title}`}
          style={{ textDecoration: 'none' }}
        >
          <QrCode size={13} color="#ffffff" style={{ flexShrink: 0, opacity: 0.9 }} />
          <span>{isEs ? 'ENTRADAS / QR' : 'TICKETS / QR'}</span>
        </a>

        <button 
          type="button"
          className="red_button bottom w-inline-block"
          onClick={handleBookVip}
          aria-label={isEs ? `Reservar mesa VIP para ${event.title}` : `Book VIP table for ${event.title}`}
        >
          <div className="red_flex">
            <span className="vip_champagne_emoji">🍾</span>
            <span>{isEs ? 'RESERVAR ZONA VIP' : 'BOOK VIP ZONE'}</span>
            <span className="vip_champagne_emoji">🍾</span>
          </div>
          <p className="para_12px">{isEs ? '100% CANJEABLE EN CONSUMO' : '100% REDEEMABLE IN FOOD & DRINKS'}</p>
        </button>
      </div>
    </article>
  );
};

export default EventCard;

