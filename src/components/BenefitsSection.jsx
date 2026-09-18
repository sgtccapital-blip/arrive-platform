import React from 'react';
import { useApp } from '../context/AppContext';
import { BenefitCard } from './BenefitCard';
import { Gift, Sparkles } from 'lucide-react';

export const BenefitsSection = () => {
  const { filteredBenefits, selectedCategory, locale = 'es' } = useApp();
  const isEs = locale === 'es';

  return (
    <section style={{ padding: '2rem 0' }}>
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">{isEs ? 'Beneficios & Descuentos en Panamá' : 'Benefits & Perks in Panama'}</h2>
            <p className="section-subtitle">
              {isEs 
                ? 'Promociones semanales exclusivas en gastronomía, bienestar, moda y estilo de vida'
                : 'Exclusive weekly promotions in dining, wellness, nightlife, and lifestyle'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontSize: '0.85rem', fontWeight: '800' }}>
            <Sparkles size={16} />
            <span>{filteredBenefits.length} {isEs ? 'Alianzas Comerciales' : 'Commercial Partnerships'}</span>
          </div>
        </div>

        {filteredBenefits.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            background: 'var(--bg-glass)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-subtle)'
          }}>
            <Gift size={42} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>
              {isEs ? 'No se encontraron beneficios en esta categoría' : 'No perks found in this category'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {isEs ? 'Prueba seleccionando otra categoría o limpiando la barra de búsqueda.' : 'Try selecting another category or clearing your search filter.'}
            </p>
          </div>
        ) : (
          <div className="benefits-grid">
            {filteredBenefits.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
