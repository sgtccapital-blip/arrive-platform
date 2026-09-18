import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Utensils, 
  Car, 
  Compass, 
  ShieldCheck, 
  Send, 
  MessageCircle, 
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Building2,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ServicesModal = () => {
  const { isServicesModalOpen, setIsServicesModalOpen, showToast, venues, openVenueDetail } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('restaurants');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('venue-furia');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'Reserva Dinner en Furia Club & Restaurant',
    date: '',
    time: '08:00 PM',
    people: '2-4 personas',
    specialRequests: ''
  });
  const [isSent, setIsSent] = useState(false);

  if (!isServicesModalOpen) return null;

  const handleClose = () => {
    setIsServicesModalOpen(false);
    setIsSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Por favor ingresa tu nombre y número de contacto.');
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        colors: ['#c10230', '#ffffff', '#ff3b5c', '#000000']
      });
    } catch (err) {
      console.error(err);
    }

    setIsSent(true);
    showToast('¡Solicitud recibida! Nuestro equipo de Concierge se comunicará contigo.', 'success');
  };

  const openWhatsAppConcierge = (msg) => {
    const selectedVenue = (venues || []).find(v => v.id === selectedRestaurantId) || (venues && venues[0]);
    const venueName = selectedVenue ? selectedVenue.name : 'Restaurante Oficial Arrive';
    const venueArea = selectedVenue ? ` (${selectedVenue.area})` : '';

    let defaultMsg = '';
    if (selectedCategory === 'restaurants') {
      defaultMsg = `Hola Arrive Concierge! Deseo reservar mesa para cena en *${venueName}*${venueArea} para el día ${formData.date || 'próximo fin de semana'} a las ${formData.time || '8:00 PM'} para ${formData.people} a nombre de ${formData.name || 'Cliente VIP'}.${formData.specialRequests ? ` Solicitud especial: ${formData.specialRequests}` : ''}`;
    } else {
      defaultMsg = msg || `Hola Arrive Concierge! Me interesa solicitar el servicio de: ${formData.serviceType} a nombre de ${formData.name || 'Cliente VIP'}.${formData.specialRequests ? ` Detalles: ${formData.specialRequests}` : ''}`;
    }
    window.open(`https://wa.me/50760000000?text=${encodeURIComponent(defaultMsg)}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={18} />
        </button>

        <div className="modal-body" style={{ padding: '2.25rem 2rem' }}>
          {!isSent ? (
            <>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Sparkles size={24} color="var(--accent-lime)" />
                <h2 style={{ fontSize: '1.65rem', fontWeight: '900', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  ARRIVE CONCIERGE & VIP SERVICES
                </h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.75rem', lineHeight: '1.5' }}>
                Experiencias de hospitalidad de lujo, reservas exclusivas en los mejores restaurantes y transporte privado en Panamá.
              </p>

              {/* Service Cards Pills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '0.75rem',
                marginBottom: '2rem'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('restaurants');
                    setFormData({ ...formData, serviceType: 'Reserva de Restaurante Top' });
                  }}
                  style={{
                    padding: '1rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: selectedCategory === 'restaurants' ? 'rgba(163, 230, 53, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid ' + (selectedCategory === 'restaurants' ? 'var(--accent-lime)' : 'rgba(255, 255, 255, 0.08)'),
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Utensils size={20} color={selectedCategory === 'restaurants' ? 'var(--accent-lime)' : '#ffffff'} />
                  <div style={{ fontWeight: '800', color: '#fff', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                    Restaurantes
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Mesas prioritarias en Casco
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('transport');
                    setFormData({ ...formData, serviceType: 'Transporte Privado & Chauffeur' });
                  }}
                  style={{
                    padding: '1rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: selectedCategory === 'transport' ? 'rgba(163, 230, 53, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid ' + (selectedCategory === 'transport' ? 'var(--accent-lime)' : 'rgba(255, 255, 255, 0.08)'),
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Car size={20} color={selectedCategory === 'transport' ? 'var(--accent-lime)' : '#ffffff'} />
                  <div style={{ fontWeight: '800', color: '#fff', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                    Transporte VIP
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    SUVs de lujo & chofer
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('yachts');
                    setFormData({ ...formData, serviceType: 'Yates & Experiencias Bahía' });
                  }}
                  style={{
                    padding: '1rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: selectedCategory === 'yachts' ? 'rgba(163, 230, 53, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid ' + (selectedCategory === 'yachts' ? 'var(--accent-lime)' : 'rgba(255, 255, 255, 0.08)'),
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Compass size={20} color={selectedCategory === 'yachts' ? 'var(--accent-lime)' : '#ffffff'} />
                  <div style={{ fontWeight: '800', color: '#fff', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                    Yates & Mar
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Taboga & Sunset cruise
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('villas');
                    setFormData({ ...formData, serviceType: 'Villas & Penthouses Casco' });
                  }}
                  style={{
                    padding: '1rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: selectedCategory === 'villas' ? 'rgba(163, 230, 53, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid ' + (selectedCategory === 'villas' ? 'var(--accent-lime)' : 'rgba(255, 255, 255, 0.08)'),
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Building2 size={20} color={selectedCategory === 'villas' ? 'var(--accent-lime)' : '#ffffff'} />
                  <div style={{ fontWeight: '800', color: '#fff', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                    Penthouses
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Estancias exclusivas
                  </div>
                </button>
              </div>

              {/* Service Feature Highlights */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '2rem'
              }}>
                {selectedCategory === 'restaurants' && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🍽️ Reservas en Restaurantes de la Plataforma</span>
                      </h4>
                      <span style={{ fontSize: '0.68rem', color: 'var(--accent-lime)', fontWeight: '800', padding: '2px 8px', borderRadius: '4px', background: 'rgba(163, 230, 53, 0.1)', border: '1px solid rgba(163, 230, 53, 0.25)' }}>
                        {venues ? venues.length : 5} Venues Oficiales
                      </span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 0.85rem 0' }}>
                      Manejo directo de mesa preferencial y atención de cortesía para la cena en los restaurantes oficiales de la plataforma Arrive en Ciudad de Panamá y Casco Antiguo:
                    </p>

                    {/* Interactive Grid of Platform Restaurant Venues */}
                    <div className="concierge_restaurants_grid">
                      {(venues || []).map((venue) => {
                        const isSelected = selectedRestaurantId === venue.id;
                        return (
                          <div 
                            key={venue.id}
                            className={`concierge_restaurant_card ${isSelected ? 'active' : ''}`}
                            onClick={() => {
                              setSelectedRestaurantId(venue.id);
                              setFormData(prev => ({
                                ...prev,
                                serviceType: `Reserva Dinner en ${venue.name}`
                              }));
                            }}
                          >
                            <div className="concierge_restaurant_img_wrap">
                              <img 
                                src={venue.coverImage} 
                                alt={venue.name} 
                                className="concierge_restaurant_img"
                                onError={(e) => {
                                  e.target.src = '/images/venues/furia/cover.jpg';
                                }}
                              />
                              <span className="concierge_venue_city_badge">{venue.area}</span>
                              {isSelected && (
                                <span className="concierge_venue_selected_badge">
                                  <CheckCircle2 size={10} />
                                  <span>MESA SELECCIONADA</span>
                                </span>
                              )}
                            </div>

                            <div className="concierge_restaurant_info">
                              <div>
                                <h5 className="concierge_venue_name">{venue.name}</h5>
                                <p className="concierge_venue_cuisine">
                                  {venue.tagline || 'Gastronomía de Autor & Coctelería'}
                                </p>
                              </div>

                              <div className="concierge_venue_meta">
                                <span className="concierge_venue_dinner_time">
                                  <Clock size={11} />
                                  <span>Cena: {venue.dinnerTime || '5:00 PM - 10:00 PM'}</span>
                                </span>
                                <button
                                  type="button"
                                  className="concierge_view_menu_btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsServicesModalOpen(false);
                                    openVenueDetail(venue.id);
                                  }}
                                  title="Ver Menú Completo y Fotos en la Plataforma"
                                >
                                  Ver Menú ↗
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedCategory === 'transport' && (
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#fff', marginBottom: '0.35rem' }}>
                      🚗 Chauffeur Privado & Flota Ejecutiva de Lujo
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      Cadillac Escalade, Mercedes-Benz Sprinter VIP y Chevrolet Suburban. Traslados aeropuerto Tocumen, circuito gastronómico en Casco y traslados seguros club-to-hotel con chofer privado bilingüe.
                    </p>
                  </div>
                )}

                {selectedCategory === 'yachts' && (
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#fff', marginBottom: '0.35rem' }}>
                      🛥️ Alquiler de Yates Privados & Catamaranes
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      Experiencias de día completo en Isla Taboga o Islas de Las Perlas. Incluye tripulación completa, combustible, sistema de sonido de alta fidelidad, catering gourmet y bebidas a bordo.
                    </p>
                  </div>
                )}

                {selectedCategory === 'villas' && (
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#fff', marginBottom: '0.35rem' }}>
                      🏛️ Penthouses & Lofts Coloniales en Casco Antiguo
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      Alojamiento exclusivo con piscina privada, terrazas con vista al mar y servicio de conserjería para modelos, fotógrafos e invitados especiales de la agencia.
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Request Form */}
              <form onSubmit={handleSubmit}>
                <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  Solicitar Servicio con Concierge
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nombre Completo *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">WhatsApp (+507) *</label>
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

                {/* If restaurant category is active, show restaurant selector */}
                {selectedCategory === 'restaurants' && (
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Restaurante / Venue Seleccionado *</label>
                    <select
                      className="form-input"
                      value={selectedRestaurantId}
                      onChange={(e) => {
                        const vId = e.target.value;
                        setSelectedRestaurantId(vId);
                        const matched = (venues || []).find(v => v.id === vId);
                        if (matched) {
                          setFormData(prev => ({
                            ...prev,
                            serviceType: `Reserva Dinner en ${matched.name}`
                          }));
                        }
                      }}
                    >
                      {(venues || []).map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} — {v.area} (Cena: {v.dinnerTime || '5:00 PM - 10:00 PM'})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Fecha Deseada</label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hora Estimada</label>
                    <select
                      className="form-input"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    >
                      <option value="06:00 PM">06:00 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                      <option value="07:30 PM">07:30 PM</option>
                      <option value="08:00 PM">08:00 PM</option>
                      <option value="08:30 PM">08:30 PM</option>
                      <option value="09:00 PM">09:00 PM</option>
                      <option value="09:30 PM">09:30 PM</option>
                      <option value="10:00 PM">10:00 PM</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Personas</label>
                    <select
                      className="form-input"
                      value={formData.people}
                      onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                    >
                      <option value="1-2 personas">1 - 2 Personas</option>
                      <option value="3-5 personas">3 - 5 Personas</option>
                      <option value="6-10 personas">6 - 10 Personas</option>
                      <option value="10+ personas">10+ Personas (Grupo)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                  <label className="form-label">Detalles o Preferencias Especiales</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={
                      selectedCategory === 'restaurants'
                        ? 'Ej. Mesa en terraza con vista, solicitud de cumpleaños, sushi bar...'
                        : 'Ej. Transporte desde Hotel W hasta Furia, o recorrido Casco...'
                    }
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center', padding: '1rem', fontSize: '0.9rem' }}
                  >
                    <Send size={15} />
                    <span>ENVIAR SOLICITUD A CONCIERGE</span>
                  </button>

                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => openWhatsAppConcierge()}
                    style={{ justifyContent: 'center', gap: '0.5rem', padding: '1rem 1.25rem' }}
                  >
                    <MessageCircle size={16} color="var(--accent-lime)" />
                    <span>Chat WhatsApp</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Success screen */
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                background: 'rgba(163, 230, 53, 0.1)',
                border: '2px solid var(--accent-lime)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--accent-lime)'
              }}>
                <CheckCircle2 size={32} />
              </div>

              <h3 style={{ fontSize: '1.65rem', fontWeight: '900', color: '#fff', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                ¡Solicitud de Concierge Recibida!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 1.75rem', lineHeight: '1.6' }}>
                Tu solicitud de <strong>{formData.serviceType}</strong> ha sido enviada al equipo VIP de <strong>Arrive Model Management</strong>. Te escribiremos de inmediato vía WhatsApp para coordinar los detalles.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px', margin: '0 auto' }}>
                <button
                  className="btn-primary"
                  onClick={() => openWhatsAppConcierge()}
                  style={{ justifyContent: 'center', gap: '0.5rem' }}
                >
                  <MessageCircle size={16} />
                  <span>Abrir WhatsApp Ahora</span>
                </button>

                <button
                  className="btn-secondary"
                  onClick={handleClose}
                  style={{ justifyContent: 'center' }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
