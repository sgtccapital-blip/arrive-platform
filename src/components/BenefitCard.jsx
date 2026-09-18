import React from 'react';
import { useApp } from '../context/AppContext';
import { Gift, Clock, MapPin, Tag, Check } from 'lucide-react';

export const BenefitCard = ({ benefit }) => {
  const { setSelectedBenefit, claimedBenefits, locale = 'es' } = useApp();
  const isClaimed = claimedBenefits.includes(benefit.id);
  const isEs = locale === 'es';

  return (
    <article className="benefit-card">
      <div className="benefit-card-media">
        <img 
          src={benefit.image} 
          alt={benefit.partner} 
          className="benefit-card-image"
          loading="lazy"
        />
        <div className="discount-badge">
          {benefit.discount}
        </div>
      </div>

      <div className="benefit-card-body">
        <div className="benefit-partner">
          {benefit.partner}
        </div>

        <h3 className="benefit-title">{benefit.title}</h3>
        <p className="benefit-desc">{benefit.description}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <Clock size={13} color="#ffffff" />
            <span>{isEs ? 'Vigencia:' : 'Valid until:'} {benefit.validUntil} ({benefit.daysValid})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <MapPin size={13} color="#ffffff" />
            <span>{benefit.location}</span>
          </div>
        </div>

        <div className="benefit-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Tag size={13} />
            <span>{benefit.claimedCount || 0} {isEs ? 'canjeados' : 'claimed'}</span>
          </div>

          <button 
            className="btn-primary"
            onClick={() => setSelectedBenefit(benefit)}
          >
            {isClaimed ? (
              <>
                <Check size={14} />
                <span>{isEs ? 'Ver Cupón' : 'View Voucher'}</span>
              </>
            ) : (
              <>
                <Gift size={14} />
                <span>{isEs ? 'Obtener Beneficio' : 'Claim Perk'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
