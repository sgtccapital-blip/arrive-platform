import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { WEEKLY_PERKS } from '../data/initialData';
import { Sparkles, ArrowRight, Users, Zap } from 'lucide-react';

export const BenefitsBanner = () => {
  const { setSelectedEvent, events, locale = 'es' } = useApp();
  const scrollRef = useRef(null);
  const isEs = locale === 'es';

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    let paused = false;

    const scroll = () => {
      if (paused) return;
      scrollAmount += 0.5;
      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0;
      }
      container.scrollLeft = scrollAmount;
    };

    const interval = setInterval(scroll, 30);

    const handleMouseEnter = () => { paused = true; };
    const handleMouseLeave = () => { paused = false; };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(interval);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleActivate = (perk) => {
    const linkedEvent = events.find(e => e.id === perk.eventId);
    if (linkedEvent) {
      setSelectedEvent(linkedEvent);
    }
  };

  return (
    <section className="benefits-banner-section">
      <div className="container">
        <div className="benefits-banner-header">
          <div className="benefits-banner-tag">
            <Zap size={13} />
            <span>{isEs ? 'BENEFICIOS EXCLUSIVOS DE LA SEMANA' : 'EXCLUSIVE PERKS OF THE WEEK'}</span>
          </div>
          <p className="benefits-banner-subtitle">
            {isEs ? (
              <>Open Bar gratis en <strong>3 noches</strong> — Solo con tu pase Arrive</>
            ) : (
              <>Free Open Bar across <strong>3 nights</strong> — Only with your Arrive pass</>
            )}
          </p>
        </div>
      </div>

      <div className="benefits-ribbon" ref={scrollRef}>
        <div className="benefits-ribbon-track">
          {/* Duplicate perks for seamless scroll */}
          {[...WEEKLY_PERKS, ...WEEKLY_PERKS].map((perk, index) => (
            <div key={`${perk.id}-${index}`} className="perk-ticket" onClick={() => handleActivate(perk)}>
              <div className="perk-ticket-shine"></div>

              <div className="perk-ticket-badge">{perk.badge}</div>

              <div className="perk-ticket-content">
                <div className="perk-ticket-day">{perk.day}</div>
                <div className="perk-ticket-emoji">{perk.emoji}</div>
                <h3 className="perk-ticket-title">{perk.headline}</h3>
                <p className="perk-ticket-venue">@ {perk.venue}</p>
                <p className="perk-ticket-until">{perk.until}</p>

                <div className="perk-ticket-activated">
                  <Users size={11} />
                  <span>{perk.activatedCount}+ {isEs ? 'activados' : 'claimed'}</span>
                </div>
              </div>

              <button className="perk-ticket-cta">
                <span>{isEs ? 'Activar Pase' : 'Claim Pass'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
