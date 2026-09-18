import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, Check, QrCode, Sparkles, MapPin, Clock, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CouponModal = () => {
  const { selectedBenefit, setSelectedBenefit, claimBenefit, claimedBenefits, locale } = useApp();
  const [copied, setCopied] = useState(false);
  const isEs = (locale || 'es') === 'es';

  if (!selectedBenefit) return null;

  const isClaimed = claimedBenefits.includes(selectedBenefit.id);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedBenefit.code);
    setCopied(true);
    claimBenefit(selectedBenefit);

    try {
      confetti({
        particleCount: 65,
        spread: 55,
        colors: ['#c10230', '#ffffff', '#ff3b5c', '#000000'],
        origin: { y: 0.7 }
      });
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleClose = () => {
    setSelectedBenefit(null);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={18} />
        </button>

        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <img 
            src={selectedBenefit.image} 
            alt={selectedBenefit.partner} 
            className="modal-hero-image"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(10,10,10,0.95) 100%)'
          }}></div>

          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1.5rem',
            right: '1.5rem'
          }}>
            <span style={{
              background: '#ffffff',
              color: '#000000',
              fontSize: '0.72rem',
              fontWeight: '900',
              padding: '3px 12px',
              borderRadius: '999px',
              textTransform: 'uppercase'
            }}>
              {selectedBenefit.discount}
            </span>
            <h2 className="modal-title" style={{ marginTop: '0.4rem', color: '#ffffff' }}>
              {selectedBenefit.partner}
            </h2>
          </div>
        </div>

        <div className="modal-body">
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', color: '#ffffff' }}>
            {selectedBenefit.title}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {selectedBenefit.description}
          </p>

          {/* Coupon Voucher Box */}
          <div style={{
            background: 'linear-gradient(145deg, #181818, #0c0c0c)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '1.75rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
          }}>
            <span style={{ fontSize: '0.72rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: '800' }}>
              {isEs ? 'CÓDIGO DE BENEFICIO EXCLUSIVO' : 'EXCLUSIVE PERK CODE'}
            </span>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '1.35rem',
                fontWeight: '900',
                letterSpacing: '0.12em',
                background: '#000000',
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px dashed #ffffff',
                color: '#ffffff'
              }}>
                {selectedBenefit.code}
              </div>

              <button 
                onClick={handleCopyCode}
                style={{
                  background: copied ? '#c10230' : '#ffffff',
                  color: copied ? '#ffffff' : '#000000',
                  fontWeight: '800',
                  padding: '0.65rem 1.1rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.82rem'
                }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? (isEs ? '¡Copiado!' : 'Copied!') : (isEs ? 'Copiar' : 'Copy')}</span>
              </button>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {isEs 
                ? 'Muestra este código o tu pase Arrive al mesero o encargado en el establecimiento en Panamá.'
                : 'Present this code or your Arrive digital pass to the staff at the venue in Panama.'}
            </p>
          </div>

          {/* Terms & Info */}
          <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#ffffff', fontSize: '0.78rem', fontWeight: '800' }}>
              <ShieldAlert size={15} />
              <span>{isEs ? 'Términos y Condiciones del Aliado' : 'Partner Terms & Conditions'}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {selectedBenefit.terms}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-secondary" onClick={handleClose}>
              {isEs ? 'Entendido / Cerrar' : 'Got it / Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
