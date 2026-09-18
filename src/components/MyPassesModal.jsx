import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Ticket, 
  QrCode, 
  Trash2, 
  Download, 
  Gift, 
  Check,
  ExternalLink
} from 'lucide-react';

export const MyPassesModal = () => {
  const { 
    isPassesModalOpen, 
    setIsPassesModalOpen, 
    myPasses, 
    cancelPass,
    claimedBenefits,
    benefits,
    setSelectedBenefit,
    locale 
  } = useApp();

  const isEs = (locale || 'es') === 'es';
  const [activeTabWallet, setActiveTabWallet] = useState('tickets'); // 'tickets' | 'coupons'

  if (!isPassesModalOpen) return null;

  const claimedList = benefits.filter(b => claimedBenefits.includes(b.id));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={() => setIsPassesModalOpen(false)}>
      <div className="modal-container modal-bottom-sheet" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        {/* Mobile Pull Handle */}
        <div className="modal-sheet-handle" aria-hidden="true" />

        {/* Close Button */}
        <button className="modal-close-btn" onClick={() => setIsPassesModalOpen(false)}>
          <X size={18} />
        </button>

        <div className="modal-body" style={{ padding: '2rem 1.75rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Ticket size={26} color="#ffffff" />
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#fff' }}>
              {isEs ? 'Billetera Digital Arrive' : 'Arrive Digital Wallet'}
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            {isEs 
              ? <>Pases de acceso digital oficiales de <strong>Arrive Model Management</strong> y promociones activas en Panamá.</>
              : <>Official digital passes from <strong>Arrive Model Management</strong> and active nightlife perks in Panama.</>}
          </p>

          {/* Wallet Subtabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <button
              onClick={() => setActiveTabWallet('tickets')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: '800',
                background: activeTabWallet === 'tickets' ? '#ffffff' : 'var(--bg-glass)',
                color: activeTabWallet === 'tickets' ? '#000000' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              <Ticket size={14} />
              <span>{isEs ? `Pases de Eventos (${myPasses.length})` : `Event Passes (${myPasses.length})`}</span>
            </button>

            <button
              onClick={() => setActiveTabWallet('coupons')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: '800',
                background: activeTabWallet === 'coupons' ? '#ffffff' : 'var(--bg-glass)',
                color: activeTabWallet === 'coupons' ? '#000000' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              <Gift size={14} />
              <span>{isEs ? `Cupones Guardados (${claimedList.length})` : `Saved Coupons (${claimedList.length})`}</span>
            </button>
          </div>

          {/* Tickets View */}
          {activeTabWallet === 'tickets' && (
            <div>
              {myPasses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)' }}>
                  <Ticket size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.35rem' }}>
                    {isEs ? 'Aún no tienes pases reservados' : 'No booked passes yet'}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    {isEs 
                      ? 'Explora las fiestas, eventos y discotecas de esta semana en Panamá.'
                      : 'Explore top parties, events and clubs this week in Panama.'}
                  </p>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setIsPassesModalOpen(false);
                      document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {isEs ? 'Ver Eventos de la Semana' : 'Browse Available Events'}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {myPasses.map((pass) => (
                    <div key={pass.passId} className="ticket-pass">
                      <div className="ticket-header">
                        <div>
                          <span style={{ fontSize: '0.65rem', color: '#ffffff', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                            ARRIVE MODEL MANAGEMENT • {isEs ? 'PASE OFICIAL' : 'OFFICIAL PASS'}
                          </span>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff', marginTop: '2px' }}>
                            {pass.eventTitle}
                          </h3>
                        </div>
                        <span className="ticket-id">{pass.passId}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                        <div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase' }}>{isEs ? 'TITULAR' : 'HOLDER'}</div>
                          <div style={{ fontWeight: '700', color: '#fff' }}>{pass.guestName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{pass.guestEmail}</div>
                        </div>

                        <div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase' }}>{isEs ? 'TIPO DE PASE' : 'PASS TYPE'}</div>
                          <div style={{ fontWeight: '700', color: '#ffffff' }}>{pass.tierName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{pass.guestsCount} {isEs ? 'persona(s)' : 'guest(s)'}</div>
                        </div>

                        <div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase' }}>{isEs ? 'FECHA & HORA' : 'DATE & TIME'}</div>
                          <div style={{ fontWeight: '600', color: '#fff', fontSize: '0.85rem' }}>{pass.date}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{pass.time}</div>
                        </div>

                        <div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase' }}>{isEs ? 'LUGAR / PANAMÁ' : 'LOCATION / PANAMA'}</div>
                          <div style={{ fontWeight: '600', color: '#fff', fontSize: '0.85rem' }}>{pass.location}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{pass.city}</div>
                        </div>
                      </div>

                      {/* QR Barcode */}
                      <div className="ticket-qr-section">
                        <div className="qr-placeholder-box">
                          <QrCode size={110} color="#000" />
                          <span style={{ fontSize: '0.62rem', color: '#111', fontWeight: '900', marginTop: '6px', letterSpacing: '0.08em' }}>
                            {pass.passId} • {isEs ? 'ENTRADA VÁLIDA PANAMÁ' : 'VALID ENTRY PANAMA'}
                          </span>
                        </div>
                      </div>

                      {/* Pass Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                        <button 
                          style={{ color: '#ef4444', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                          onClick={() => {
                            if (window.confirm(isEs ? '¿Deseas cancelar esta reserva?' : 'Do you want to cancel this booking?')) {
                              cancelPass(pass.passId);
                            }
                          }}
                        >
                          <Trash2 size={13} />
                          <span>{isEs ? 'Cancelar Reserva' : 'Cancel Reservation'}</span>
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {pass.ticketUrl && (
                            <a 
                              href={pass.ticketUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ 
                                color: 'var(--accent-lime)', 
                                fontSize: '0.78rem', 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '0.3rem', 
                                background: 'rgba(193, 2, 48, 0.12)',
                                border: '1px solid rgba(193, 2, 48, 0.3)',
                                padding: '5px 10px', 
                                borderRadius: 'var(--radius-sm)',
                                textDecoration: 'none'
                              }}
                            >
                              <ExternalLink size={12} />
                              <span>MiEventos</span>
                            </a>
                          )}

                          <button 
                            style={{ color: '#fff', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'var(--bg-glass)', padding: '5px 12px', borderRadius: 'var(--radius-sm)' }}
                            onClick={handlePrint}
                          >
                            <Download size={13} />
                            <span>{isEs ? 'Imprimir PDF' : 'Print PDF'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Coupons View */}
          {activeTabWallet === 'coupons' && (
            <div>
              {claimedList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)' }}>
                  <Gift size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.35rem' }}>No tienes cupones guardados</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Revisa los beneficios en restaurantes, spas y boutiques de Panamá.
                  </p>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setIsPassesModalOpen(false);
                      document.getElementById('benefits-banner')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Ver Catálogo de Beneficios
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {claimedList.map(ben => (
                    <div 
                      key={ben.id} 
                      style={{
                        background: 'var(--bg-glass)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#ffffff' }}>{ben.partner}</span>
                          <span style={{ fontSize: '0.75rem', background: '#ffffff', color: '#000', fontWeight: '900', padding: '2px 8px', borderRadius: '4px' }}>{ben.discount}</span>
                        </div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>{ben.title}</h4>
                        <div style={{ fontFamily: 'monospace', fontSize: '1rem', background: '#000000', padding: '6px 10px', borderRadius: '4px', textAlign: 'center', color: '#fff', marginBottom: '0.75rem', border: '1px dashed #ffffff' }}>
                          {ben.code}
                        </div>
                      </div>

                      <button 
                        className="btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '6px 10px', justifyContent: 'center' }}
                        onClick={() => {
                          setIsPassesModalOpen(false);
                          setSelectedBenefit(ben);
                        }}
                      >
                        Ver Detalles del Beneficio
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
