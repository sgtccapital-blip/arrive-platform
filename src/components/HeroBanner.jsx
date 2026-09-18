import React from 'react';
import { MapPin } from 'lucide-react';

export const HeroBanner = ({ hubInfo, locale = 'es' }) => {
  const isHub = Boolean(hubInfo);
  const localizedHub = hubInfo ? (hubInfo[locale] || hubInfo.es) : null;

  return (
    <header className="section_home_hero" aria-label="Hero">
      <div className="py">
        <div className="home_hero_wrapper">
          <div className="heading_flex">
            {/* Breadcrumb Navigation for SEO */}
            {isHub && (
              <nav aria-label="Breadcrumb" style={{ marginBottom: '0.75rem' }}>
                <ol style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  fontSize: '0.75rem',
                  color: '#888888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  <li>
                    <a href={`/${locale}/`} style={{ color: '#aaaaaa', textDecoration: 'none' }}>
                      {locale === 'es' ? 'Inicio' : 'Home'}
                    </a>
                  </li>
                  <li>/</li>
                  <li>
                    <a href={`/${locale}/panama/nightlife/`} style={{ color: '#aaaaaa', textDecoration: 'none' }}>
                      Panamá
                    </a>
                  </li>
                  <li>/</li>
                  <li style={{ color: '#ff3b5c', fontWeight: 600 }}>
                    {localizedHub.h1}
                  </li>
                </ol>
              </nav>
            )}

            {/* Title with flaming hearts on both sides */}
            <div className="hero_title_row">
              <img 
                loading="eager" 
                fetchPriority="high"
                src="/images/heart.gif" 
                alt="Corazón Arrive Izquierda" 
                className="heart_title_flame left" 
                width="60"
                height="60"
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 className="is-center hero_title_text" style={{ fontSize: isHub ? 'clamp(1.75rem, 3.5vw, 2.5rem)' : undefined, margin: 0 }}>
                  {isHub ? localizedHub.h1.toUpperCase() : 'THE EXCLUSIVE NIGHTLIFE EXPERIENCE'}
                </h1>
                {/* H1 SEO text visually hidden for pure aesthetic presentation if home, while preserving 100% crawlability */}
                {!isHub && (
                  <span className="sr-only" style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    borderWidth: 0
                  }}>
                    {locale === 'es' ? 'Nightlife, Eventos & Experiencias VIP en Panamá' : 'Nightlife, Events & VIP Experiences in Panama'}
                  </span>
                )}
              </div>
              <img 
                loading="eager" 
                fetchPriority="high"
                src="/images/heart.gif" 
                alt="Corazón Arrive Derecha" 
                className="heart_title_flame right" 
                width="60"
                height="60"
              />
            </div>

            {/* Subtitle / Location */}
            <div className="is-small-text" style={{ marginTop: '0.4rem' }}>
              <MapPin size={13} color="#c10230" style={{ flexShrink: 0 }} />
              <span>PANAMA CITY, PANAMA</span>
            </div>

            {/* Hub Editorial Intro (Only shown on specific category hubs, not clogging Home) */}
            {isHub && (
              <div style={{
                maxWidth: '760px',
                margin: '0.75rem auto 0',
                fontSize: '0.92rem',
                lineHeight: 1.65,
                color: '#cccccc',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{localizedHub.intro}</p>
                {localizedHub.secondaryText && (
                  <p style={{ marginTop: '0.65rem', color: '#aaaaaa', fontSize: '0.86rem' }}>{localizedHub.secondaryText}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroBanner;
