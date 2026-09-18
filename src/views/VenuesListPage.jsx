import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Crown, Utensils, Music, ChevronRight, ExternalLink, Sparkles, Wine, Building } from 'lucide-react';
import { FaqSection } from '../components/FaqSection';
import { VENUES_FAQS } from '../data/faqData';

const getVenueEmoji = (v) => {
  const slug = ((v && (v.slug || v.shortName || v.name)) || '').toLowerCase();
  if (slug.includes('furia')) return '🍸';
  if (slug.includes('piano')) return '🎹';
  if (slug.includes('terraplen')) return '🌆';
  if (slug.includes('primavera')) return '🌿';
  if (slug.includes('cielo')) return '🌌';
  return '✨';
};

export const VenuesListPage = ({ locale = 'es' }) => {
  const { venues } = useApp();

  return (
    <div className="venues_list_page">
      {/* Centered Hero — Matches Buy Tickets Title & Branding Aesthetic */}
      <header className="section_home_hero venues_page_hero_section" aria-label="Venues Hero">
        <div className="py">
          <div className="home_hero_wrapper">
            <div className="heading_flex">
              {/* Title with animated Disco Ball gifs on both sides */}
              <div className="hero_title_row">
                <img 
                  loading="eager" 
                  fetchPriority="high"
                  src="/images/gifs/Discoball.gif" 
                  alt="Disco Ball Arrive Izquierda" 
                  className="heart_title_flame left hero_gif_discoball" 
                  width="60"
                  height="60"
                />
                <h1 className="is-center hero_title_text">
                  {locale === 'es' ? 'Clubs, Rooftops & Restaurantes en Panamá' : 'Clubs, Rooftops & Restaurants in Panama'}
                </h1>
                <img 
                  loading="eager" 
                  fetchPriority="high"
                  src="/images/gifs/Discoball.gif" 
                  alt="Disco Ball Arrive Derecha" 
                  className="heart_title_flame right hero_gif_discoball" 
                  width="60"
                  height="60"
                />
              </div>

              {/* Subtitle with clean SVG Lucide icons - no missing emoji squares */}
              <div className="hero_subtitle_emojis">
                <span className="hero_sub_badge"><Wine size={14} color="#ff3b5c" /> {locale === 'es' ? 'CLUBS & DISCOTECAS' : 'CLUBS & NIGHTCLUBS'}</span>
                <span className="hero_sub_dot">•</span>
                <span className="hero_sub_badge"><Building size={14} color="#ff3b5c" /> {locale === 'es' ? 'ROOFTOPS EN CASCO VIEJO' : 'CASCO VIEJO ROOFTOPS'}</span>
                <span className="hero_sub_dot">•</span>
                <span className="hero_sub_badge"><Utensils size={14} color="#ff3b5c" /> {locale === 'es' ? 'RESTAURANTES & MESAS VIP' : 'RESTAURANTS & VIP TABLES'}</span>
              </div>

              {/* Centered description text — concise, refined & expansive */}
              <p className="hero_page_centered_desc">
                {locale === 'es'
                  ? 'Guía curada de los clubs, discotecas, rooftops y restaurantes más destacados de Ciudad de Panamá y Casco Viejo. Consulta fotos, menús, música y reserva mesas VIP.'
                  : 'Curated guide to premier clubs, rooftops, and signature dining across Panama City and Casco Viejo. Explore photos, menus, DJ lineups, and VIP table bookings.'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Venues Grid */}
      <section className="venues_list_grid_section">
        <div className="venues_list_grid">
          {venues.map((venue) => (
            <a 
              key={venue.id}
              href={`/${locale}/venues/${venue.slug}/`}
              className="venues_list_card"
            >
              <div className="venues_list_card_img_wrap">
                <img 
                  src={venue.coverImage} 
                  alt={`${venue.name} — ${venue.category} en ${venue.area}, Panamá`}
                  className="venues_list_card_img"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="venues_list_card_overlay">
                  <span className="venues_list_card_emoji">{getVenueEmoji(venue)}</span>
                  <span className="venues_list_card_category">{venue.category}</span>
                </div>
              </div>

              <div className="venues_list_card_body">
                <h2 className="venues_list_card_name">{venue.name}</h2>
                <p className="venues_list_card_tagline">{venue.tagline}</p>

                <div className="venues_list_card_meta">
                  <span className="venues_list_card_meta_item">
                    <MapPin size={12} /> {venue.area}
                  </span>
                  <span className="venues_list_card_meta_item">
                    <Utensils size={12} /> {venue.dinnerTime}
                  </span>
                  <span className="venues_list_card_meta_item">
                    <Music size={12} /> {venue.partyTime}
                  </span>
                </div>

                <div className="venues_list_card_cta">
                  <span>{locale === 'es' ? 'Ver Local' : 'View Venue'}</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SEO-First FAQ Section with FAQPage Schema */}
      <FaqSection faqs={VENUES_FAQS[locale] || VENUES_FAQS.es} locale={locale} />
    </div>
  );
};

export default VenuesListPage;
