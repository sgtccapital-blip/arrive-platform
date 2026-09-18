import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  Wine, 
  Send,
  MessageCircle,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookVipModal = () => {
  const { 
    isBookVipModalOpen, 
    setIsBookVipModalOpen, 
    events, 
    selectedVipEvent, 
    setSelectedVipEvent,
    showToast,
    locale 
  } = useApp();

  const isEs = (locale || 'es') === 'es';
  const [activeEvent, setActiveEvent] = useState(null);
  const [selectedZone, setSelectedZone] = useState('area-vip');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: 10,
    notes: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationRef, setReservationRef] = useState('');

  useEffect(() => {
    if (selectedVipEvent) {
      setActiveEvent(selectedVipEvent);
      if (selectedVipEvent.initialZone) {
        setSelectedZone(selectedVipEvent.initialZone);
      }
    } else if (events.length > 0 && !activeEvent) {
      setActiveEvent(events[0]);
    }
  }, [selectedVipEvent, events]);

  if (!isBookVipModalOpen) return null;

  const currentEvent = activeEvent || events[0];

  const handleClose = () => {
    setIsBookVipModalOpen(false);
    setSelectedVipEvent(null);
    setIsSuccess(false);
  };

  const handleVipSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(isEs ? 'Por favor ingresa tu nombre y número de WhatsApp para tu reserva VIP.' : 'Please enter your name and WhatsApp number for your VIP booking.');
      return;
    }

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        colors: ['#c10230', '#ffffff', '#ff3b5c', '#000000']
      });
    } catch (err) {
      console.error(err);
    }

    const ref = 'VIP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setReservationRef(ref);
    setIsSuccess(true);
    showToast(isEs ? '¡Solicitud VIP enviada! Nuestro concierge te contactará por WhatsApp.' : 'VIP request sent! Our concierge will contact you on WhatsApp.', 'success');
  };

  const openWhatsApp = () => {
    const zoneName = selectedZone === 'area-vip' 
      ? (isEs ? 'ÁREA VIP ($600 consumibles + 7% ITBMS = $642.00 total — Incluye 10 entradas)' : 'VIP AREA ($600 minimum spend + 7% ITBMS = $642.00 total — Includes 10 passes)')
      : (isEs ? 'ÁREA MAIN ROOM ($350 consumibles + 7% ITBMS = $374.50 total — Incluye 10 entradas)' : 'MAIN ROOM AREA ($350 minimum spend + 7% ITBMS = $374.50 total — Includes 10 passes)');
    const text = encodeURIComponent(
      isEs
        ? `Hola Arrive Concierge! Deseo confirmar la reserva de Mesa VIP (${reservationRef || 'VIP'}) en ${zoneName} para el evento "${currentEvent?.title}" el ${currentEvent?.date} a nombre de ${formData.name}.`
        : `Hello Arrive Concierge! I want to confirm the VIP Table reservation (${reservationRef || 'VIP'}) in ${zoneName} for "${currentEvent?.title}" on ${currentEvent?.date} under the name of ${formData.name}.`
    );
    window.open(`https://wa.me/50760000000?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container modal-bottom-sheet" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        {/* Mobile Pull Handle */}
        <div className="modal-sheet-handle" aria-hidden="true" />

        <button className="modal-close-btn" onClick={handleClose}>
          <X size={18} />
        </button>

        <div className="modal-body" style={{ padding: '2.25rem 2rem' }}>
          {!isSuccess ? (
            <>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Crown size={26} color="#c10230" />
                <h2 style={{ fontSize: '1.65rem', fontWeight: '900', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {isEs ? 'RESERVA DE MESA VIP' : 'BOOK VIP TABLE'}
                </h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.75rem', lineHeight: '1.5' }}>
                {isEs 
                  ? <>Reserva de mesas preferenciales y servicio de botellas en los mejores venues de Panamá con anfitriones de <strong>Arrive Model Management</strong>.</>
                  : <>VIP table reservations and bottle service at Panama&apos;s premier venues with <strong>Arrive Model Management</strong> hosts.</>}
              </p>

              {/* Event Selector Tabs */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>
                  {isEs ? 'Selecciona la Fiesta o Local' : 'Select Party or Venue'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                  {events.map((evt) => (
                    <button
                      key={evt.id}
                      type="button"
                      onClick={() => setActiveEvent(evt)}
                      style={{
                        padding: '0.6rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        background: (activeEvent?.id === evt.id) ? '#c10230' : 'rgba(255, 255, 255, 0.04)',
                        color: '#ffffff',
                        border: '1px solid ' + ((activeEvent?.id === evt.id) ? '#c10230' : 'rgba(255, 255, 255, 0.1)'),
                        fontWeight: '800',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div>{evt.dayOfWeek}</div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.85, marginTop: '2px' }}>
                        {evt.location.split(' ')[0]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Event Banner Preview */}
              {currentEvent && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.85rem 1rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.75rem'
                }}>
                  <img
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#ff3b5c', fontSize: '0.72rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {currentEvent.date}
                    </div>
                    <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.95rem' }}>
                      {currentEvent.title}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
                      <MapPin size={11} />
                      <span>{currentEvent.location}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* VIP Table Tiers Selection with Exact User Prices */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>
                  {isEs ? 'Selecciona la Zona de la Mesa VIP' : 'Select VIP Table Zone'}
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {/* Tier 1: Área VIP ($600) */}
                  <div
                    onClick={() => setSelectedZone('area-vip')}
                    style={{
                      padding: '1rem 1.15rem',
                      borderRadius: 'var(--radius-md)',
                      background: selectedZone === 'area-vip' ? 'rgba(193, 2, 48, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid ' + (selectedZone === 'area-vip' ? '#c10230' : 'rgba(255, 255, 255, 0.08)'),
                      boxShadow: selectedZone === 'area-vip' ? '0 0 16px rgba(193, 2, 48, 0.25)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <Crown size={15} color="#ffd700" />
                        <span style={{ color: '#fff', fontWeight: '800', fontSize: '0.95rem' }}>
                          {isEs ? 'Área VIP' : 'VIP Area'}
                        </span>
                        <span style={{
                          background: '#c10230',
                          color: '#fff',
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          {isEs ? 'MÁXIMA EXCLUSIVIDAD' : 'MAX EXCLUSIVITY'}
                        </span>
                      </div>
                      <div style={{ color: '#ffffff', fontSize: '0.78rem', fontWeight: 600 }}>
                        {isEs ? '🎟️ Incluye 10 entradas preferenciales' : '🎟️ Includes 10 VIP passes'}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.74rem', marginTop: '2px' }}>
                        {isEs 
                          ? 'Ubicación VIP preferencial, 100% canjeable en botellas y menú. Anfitrión Arrive dedicado.'
                          : 'Prime VIP table, 100% redeemable in bottles & dining. Dedicated Arrive host.'}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1rem' }}>
                      <div style={{ color: '#ffffff', fontWeight: '900', fontSize: '1.25rem' }}>
                        $600
                      </div>
                      <div style={{ color: '#ff3b5c', fontSize: '0.68rem', fontWeight: 700 }}>
                        + 7% ITBMS ($42.00)
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', marginTop: '2px' }}>
                        {isEs ? '100% Consumible' : '100% Redeemable'}
                      </div>
                    </div>
                  </div>

                  {/* Tier 2: Área Main Room ($350) */}
                  <div
                    onClick={() => setSelectedZone('main-room')}
                    style={{
                      padding: '1rem 1.15rem',
                      borderRadius: 'var(--radius-md)',
                      background: selectedZone === 'main-room' ? 'rgba(193, 2, 48, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid ' + (selectedZone === 'main-room' ? '#c10230' : 'rgba(255, 255, 255, 0.08)'),
                      boxShadow: selectedZone === 'main-room' ? '0 0 16px rgba(193, 2, 48, 0.25)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <Sparkles size={15} color="#ff3b5c" />
                        <span style={{ color: '#fff', fontWeight: '800', fontSize: '0.95rem' }}>
                          {isEs ? 'Área Main Room' : 'Main Room Area'}
                        </span>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          color: '#e2e8f0',
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          {isEs ? 'PISTA & DJ' : 'DANCEFLOOR & DJ'}
                        </span>
                      </div>
                      <div style={{ color: '#ffffff', fontSize: '0.78rem', fontWeight: 600 }}>
                        {isEs ? '🎟️ Incluye 10 entradas preferenciales' : '🎟️ Includes 10 VIP passes'}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.74rem', marginTop: '2px' }}>
                        {isEs 
                          ? 'Mesa en el salón principal frente al DJ y pista, 100% canjeable en botellas y gastronomía.'
                          : 'Table in main room facing DJ booth and dancefloor, 100% redeemable in bottles & food.'}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1rem' }}>
                      <div style={{ color: '#ffffff', fontWeight: '900', fontSize: '1.25rem' }}>
                        $350
                      </div>
                      <div style={{ color: '#ff3b5c', fontSize: '0.68rem', fontWeight: 700 }}>
                        + 7% ITBMS ($24.50)
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', marginTop: '2px' }}>
                        {isEs ? '100% Consumible' : '100% Redeemable'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reservation Form */}
              <form onSubmit={handleVipSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">{isEs ? 'Nombre Completo *' : 'Full Name *'}</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder={isEs ? 'Ej. Rodrigo Valdés' : 'e.g. John Doe'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{isEs ? 'WhatsApp Panamá (+507) *' : 'WhatsApp / Phone *'}</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+507 6000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">{isEs ? 'Correo Electrónico' : 'Email Address'}</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="rodrigo@arrive.club"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{isEs ? 'Número de Invitados' : 'Number of Guests'}</label>
                    <select
                      className="form-input"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    >
                      <option value="4">{isEs ? '4 Personas' : '4 Guests'}</option>
                      <option value="6">{isEs ? '6 Personas' : '6 Guests'}</option>
                      <option value="8">{isEs ? '8 Personas' : '8 Guests'}</option>
                      <option value="10">{isEs ? '10+ Personas (Mesa Grande)' : '10+ Guests (Large Table)'}</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">{isEs ? 'Botellas Preferidas / Peticiones Especiales' : 'Bottle Preferences / Special Requests'}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={isEs ? "Ej. Tequila Don Julio 70, Champagne Moët, Gin Hendrick's..." : "e.g. Don Julio 70, Moët Champagne, Hendrick's Gin..."}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '1.1rem',
                    fontSize: '0.95rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  <Crown size={16} />
                  <span>{isEs ? 'SOLICITAR RESERVA VIP DE MESA' : 'REQUEST VIP TABLE RESERVATION'}</span>
                </button>
              </form>
            </>
          ) : (
            /* Confirmation Screen */
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                background: 'rgba(193, 2, 48, 0.15)',
                border: '2px solid #c10230',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: '#ff3b5c'
              }}>
                <Crown size={32} />
              </div>

              <h3 style={{ fontSize: '1.7rem', fontWeight: '900', color: '#fff', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                {isEs ? '¡Solicitud VIP Registrada!' : 'VIP Request Registered!'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 1.75rem', lineHeight: '1.6' }}>
                {isEs ? (
                  <>Referencia: <strong style={{ color: 'var(--accent-lime)' }}>{reservationRef}</strong>. Nuestro concierge de <strong>Arrive Model Management</strong> se comunicará contigo de inmediato para confirmar tu mesa.</>
                ) : (
                  <>Reference: <strong style={{ color: 'var(--accent-lime)' }}>{reservationRef}</strong>. Our <strong>Arrive Model Management</strong> concierge will contact you immediately to confirm your table.</>
                )}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px', margin: '0 auto' }}>
                <button
                  className="btn-primary"
                  onClick={openWhatsApp}
                  style={{ justifyContent: 'center', gap: '0.5rem' }}
                >
                  <MessageCircle size={16} />
                  <span>{isEs ? 'Chat Directo por WhatsApp' : 'Direct WhatsApp Chat'}</span>
                </button>

                <button
                  className="btn-secondary"
                  onClick={handleClose}
                  style={{ justifyContent: 'center' }}
                >
                  {isEs ? 'Cerrar' : 'Close'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
