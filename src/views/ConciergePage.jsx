import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Utensils, Car, Compass, Building2, 
  Send, MessageCircle, Sparkles, Clock,
  CheckCircle2, ChevronRight, PhoneCall,
  Crown, MapPin, ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FaqSection } from '../components/FaqSection';
import { CONCIERGE_FAQS } from '../data/faqData';

export const ConciergePage = ({ locale = 'es' }) => {
  const { venues, showToast, setIsBookVipModalOpen, setSelectedVipEvent } = useApp();
  const isEs = locale === 'es';

  const [selectedCategory, setSelectedCategory] = useState('restaurants');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('venue-furia');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: isEs ? 'Reserva Dinner en Furia Club & Restaurant' : 'Dinner Reservation at Furia Club & Restaurant',
    date: '',
    time: '08:00 PM',
    people: isEs ? '2-4 personas' : '2-4 guests',
    specialRequests: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(isEs ? 'Por favor ingresa tu nombre y número de contacto.' : 'Please enter your name and contact number.');
      return;
    }
    try {
      confetti({ particleCount: 80, spread: 60, colors: ['#c10230', '#ffffff', '#ff3b5c', '#000000'] });
    } catch (err) { console.error(err); }
    setIsSent(true);
    showToast(isEs ? '¡Solicitud recibida! Nuestro equipo de Concierge se comunicará contigo.' : 'Request received! Our Concierge team will contact you shortly.', 'success');
  };

  const openWhatsAppConcierge = (msg) => {
    const selectedVenue = (venues || []).find(v => v.id === selectedRestaurantId) || (venues && venues[0]);
    const venueName = selectedVenue ? selectedVenue.name : (isEs ? 'Restaurante Oficial Arrive' : 'Official Arrive Restaurant');
    const venueArea = selectedVenue ? ` (${selectedVenue.area})` : '';
    let defaultMsg = '';
    if (selectedCategory === 'restaurants') {
      defaultMsg = isEs
        ? `Hola Arrive Concierge! Deseo reservar mesa para cena en *${venueName}*${venueArea} para el día ${formData.date || 'próximo fin de semana'} a las ${formData.time || '8:00 PM'} para ${formData.people} a nombre de ${formData.name || 'Cliente VIP'}.${formData.specialRequests ? ` Solicitud especial: ${formData.specialRequests}` : ''}`
        : `Hello Arrive Concierge! I would like to book a dinner table at *${venueName}*${venueArea} for ${formData.date || 'this upcoming weekend'} at ${formData.time || '8:00 PM'} for ${formData.people} under ${formData.name || 'VIP Guest'}.${formData.specialRequests ? ` Special requests: ${formData.specialRequests}` : ''}`;
    } else {
      defaultMsg = msg || (isEs
        ? `Hola Arrive Concierge! Me interesa solicitar el servicio de: ${formData.serviceType} a nombre de ${formData.name || 'Cliente VIP'}.${formData.specialRequests ? ` Detalles: ${formData.specialRequests}` : ''}`
        : `Hello Arrive Concierge! I would like to request the service of: ${formData.serviceType} under ${formData.name || 'VIP Guest'}.${formData.specialRequests ? ` Details: ${formData.specialRequests}` : ''}`);
    }
    window.open(`https://wa.me/50760000000?text=${encodeURIComponent(defaultMsg)}`, '_blank');
  };

  const serviceCategories = [
    { key: 'restaurants', icon: Utensils, name: isEs ? 'Restaurantes' : 'Restaurants', desc: isEs ? 'Mesas prioritarias en Casco' : 'Priority tables in Casco' },
    { key: 'transport', icon: Car, name: isEs ? 'Transporte VIP' : 'VIP Transport', desc: isEs ? 'SUVs de lujo & chofer' : 'Luxury SUVs & chauffeur' },
    { key: 'yachts', icon: Compass, name: isEs ? 'Yates & Mar' : 'Yachts & Sea', desc: isEs ? 'Taboga & Sunset cruise' : 'Taboga & Sunset cruise' },
    { key: 'villas', icon: Building2, name: isEs ? 'Penthouses' : 'Penthouses', desc: isEs ? 'Estancias exclusivas' : 'Exclusive stays' }
  ];

  return (
    <div className="concierge_page">
      {/* Centered Hero — Matches Buy Tickets Title & Branding Aesthetic */}
      <header className="section_home_hero concierge_page_hero_section" aria-label="Concierge Hero">
        <div className="py">
          <div className="home_hero_wrapper">
            <div className="heading_flex">
              {/* Title with animated flaming heart gifs on both sides */}
              <div className="hero_title_row">
                <img 
                  loading="eager" 
                  fetchPriority="high"
                  src="/images/heart.gif" 
                  alt="Corazón Arrive Concierge Izquierda" 
                  className="heart_title_flame left" 
                  width="60"
                  height="60"
                />
                <h1 className="is-center hero_title_text">
                  {isEs ? 'Concierge & VIP Services en Panamá' : 'Concierge & VIP Services in Panama'}
                </h1>
                <img 
                  loading="eager" 
                  fetchPriority="high"
                  src="/images/heart.gif" 
                  alt="Corazón Arrive Concierge Derecha" 
                  className="heart_title_flame right" 
                  width="60"
                  height="60"
                />
              </div>

              {/* Subtitle with clean SVG Lucide icons - no OS emoji square glitch */}
              <div className="hero_subtitle_emojis">
                <span className="hero_sub_badge"><Utensils size={14} color="#ff3b5c" /> {isEs ? 'RESTAURANTES' : 'RESTAURANTS'}</span>
                <span className="hero_sub_dot">•</span>
                <span className="hero_sub_badge"><Car size={14} color="#ff3b5c" /> {isEs ? 'CHAUFFEUR PRIVADO' : 'PRIVATE CHAUFFEUR'}</span>
                <span className="hero_sub_dot">•</span>
                <span className="hero_sub_badge"><Compass size={14} color="#ff3b5c" /> {isEs ? 'YATES' : 'YACHTS'}</span>
                <span className="hero_sub_dot">•</span>
                <span className="hero_sub_badge"><Building2 size={14} color="#ff3b5c" /> {isEs ? 'ESTADÍAS PREMIUM' : 'PREMIUM STAYS'}</span>
              </div>

              {/* Centered description text — concise, refined & broad */}
              <p className="hero_page_centered_desc">
                {isEs
                  ? 'Servicio de concierge exclusivo para Ciudad de Panamá: reservas preferenciales en restaurantes de alta gastronomía, transporte privado, alquiler de yates y estadías premium con atención personalizada.'
                  : 'Bespoke Panama City VIP concierge: priority reservations at signature restaurants, private chauffeur transport, luxury yacht charters, and premium stays.'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="concierge_page_body">
        {!isSent ? (
          <>
            {/* Service Category Cards */}
            <section className="concierge_categories_section">
              <div className="concierge_categories_grid">
                {serviceCategories.map(({ key, icon: Icon, name, desc }) => (
                  <button
                    key={key}
                    type="button"
                    className={`concierge_category_card ${selectedCategory === key ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(key);
                      setFormData({ ...formData, serviceType: name });
                    }}
                  >
                    <Icon size={22} className="concierge_cat_icon" />
                    <div className="concierge_cat_name">{name}</div>
                    <div className="concierge_cat_desc">{desc}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Dynamic Content Based on Category — Free on page (No enclosing box) */}
            <section className="concierge_detail_section">
              <div className="concierge_detail_content">
                {selectedCategory === 'restaurants' && (
                  <div>
                    <div className="concierge_detail_header">
                      <h2 className="concierge_detail_title">{isEs ? 'Restaurant Reservations' : 'Restaurant Reservations'}</h2>
                      <span className="concierge_venue_count_badge">
                        {venues ? venues.length : 5} {isEs ? 'Venues Oficiales' : 'Official Venues'}
                      </span>
                    </div>
                    <p className="concierge_detail_desc">
                      {isEs 
                        ? 'Acceso y reservas en restaurantes seleccionados de Ciudad de Panamá y Casco Viejo. Coordinamos cenas, grupos, celebraciones y mesas con atención preferencial según disponibilidad.'
                        : 'Access and reservations at selected restaurants in Panama City and Casco Viejo. We coordinate dinners, groups, celebrations, and tables with priority seating based on availability.'}
                    </p>

                    {/* Restaurant Venue Cards — Direct on Page Grid */}
                    <div className="concierge_restaurants_grid">
                      {(venues || []).map((venue) => {
                        const isSelected = selectedRestaurantId === venue.id;
                        return (
                          <div 
                            key={venue.id}
                            className={`concierge_restaurant_card ${isSelected ? 'active' : ''}`}
                            onClick={() => {
                              setSelectedRestaurantId(venue.id);
                              setFormData(prev => ({ ...prev, serviceType: `${isEs ? 'Reserva Dinner en' : 'Dinner Reservation at'} ${venue.name}` }));
                            }}
                          >
                            <div className="concierge_restaurant_img_wrap">
                              <img src={venue.coverImage} alt={venue.name} className="concierge_restaurant_img"
                                onError={(e) => { e.target.src = '/images/venues/furia/cover.jpg'; }}
                              />
                              <span className="concierge_venue_city_badge">{venue.area}</span>
                              {isSelected && (
                                <span className="concierge_venue_selected_badge">
                                  <CheckCircle2 size={10} /><span>{isEs ? 'MESA SELECCIONADA' : 'SELECTED TABLE'}</span>
                                </span>
                              )}
                            </div>
                            <div className="concierge_restaurant_info">
                              <div>
                                <h5 className="concierge_venue_name">{venue.name}</h5>
                                <p className="concierge_venue_cuisine">{venue.tagline || (isEs ? 'Gastronomía de Autor & Coctelería' : 'Signature Dining & Cocktails')}</p>
                              </div>
                              <div className="concierge_venue_meta">
                                <span className="concierge_venue_dinner_time">
                                  <Clock size={11} /><span>{isEs ? 'Cena:' : 'Dinner:'} {venue.dinnerTime || '5:00 PM - 10:00 PM'}</span>
                                </span>
                                <a href={`/${locale}/venues/${venue.slug}/`} className="concierge_view_menu_btn" onClick={(e) => e.stopPropagation()}>
                                  {isEs ? 'Ver Menú ↗' : 'View Menu ↗'}
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedCategory === 'transport' && (
                  <div className="concierge_service_showcase">
                    <div className="concierge_detail_header">
                      <h2 className="concierge_detail_title">{isEs ? 'Private Chauffeur' : 'Private Chauffeur'}</h2>
                      <span className="concierge_venue_count_badge">{isEs ? 'Servicio VIP' : 'VIP Service'}</span>
                    </div>
                    <p className="concierge_detail_desc">
                      {isEs
                        ? 'Servicio de transporte privado con SUVs y vehículos ejecutivos para traslados entre aeropuerto, hoteles, restaurantes, nightlife y otros destinos de Ciudad de Panamá. Disponible para servicios individuales, grupos e itinerarios personalizados.'
                        : 'Private chauffeur service with SUVs and executive vehicles for airport transfers, hotels, restaurants, nightlife, and other destinations across Panama City. Available for individuals, groups, and customized itineraries.'}
                    </p>
                    <div className="concierge_service_features_row">
                      <div className="concierge_feature_pill">{isEs ? '✈️ Traslados Tocumen Airport' : '✈️ Tocumen Airport Transfers'}</div>
                      <div className="concierge_feature_pill">{isEs ? '🍾 Hoteles, Restaurantes & Nightlife' : '🍾 Hotels, Dining & Nightlife'}</div>
                      <div className="concierge_feature_pill">{isEs ? '🛡️ Chofer Privado & Flota Ejecutiva' : '🛡️ Private Chauffeur & Executive Fleet'}</div>
                      <div className="concierge_feature_pill">💎 SUVs de Lujo &amp; Sprinters</div>
                    </div>
                  </div>
                )}

                {selectedCategory === 'yachts' && (
                  <div className="concierge_service_showcase">
                    <div className="concierge_detail_header">
                      <h2 className="concierge_detail_title">{isEs ? 'Private Yacht Charters' : 'Private Yacht Charters'}</h2>
                      <span className="concierge_venue_count_badge">{isEs ? 'Experiencia Marítima' : 'Maritime Experience'}</span>
                    </div>
                    <p className="concierge_detail_desc">
                      {isEs
                        ? 'Organiza un día privado en el mar con opciones de yates y embarcaciones para grupos. Experiencias disponibles hacia destinos como Isla Taboga y el Archipiélago de Las Perlas, además de sunset cruises y celebraciones privadas.'
                        : 'Organize a private day at sea with yacht and boat charter options for groups. Experiences available to destinations such as Taboga Island and the Pearl Islands archipelago, along with sunset cruises and private celebrations.'}
                    </p>
                    <div className="concierge_service_features_row">
                      <div className="concierge_feature_pill">{isEs ? '🏝️ Isla Taboga & Sunset Cruise' : '🏝️ Taboga Island & Sunset Cruise'}</div>
                      <div className="concierge_feature_pill">{isEs ? '🌊 Archipiélago de Las Perlas' : '🌊 Pearl Islands Archipelago'}</div>
                      <div className="concierge_feature_pill">{isEs ? '🥂 Celebraciones Privadas & Grupos' : '🥂 Private Celebrations & Groups'}</div>
                      <div className="concierge_feature_pill">{isEs ? '🔊 Sonido Marino & Tripulación Pro' : '🔊 Pro Marine Audio & Crew'}</div>
                    </div>
                  </div>
                )}

                {selectedCategory === 'villas' && (
                  <div className="concierge_service_showcase">
                    <div className="concierge_detail_header">
                      <h2 className="concierge_detail_title">{isEs ? 'Premium Stays' : 'Premium Stays'}</h2>
                      <span className="concierge_venue_count_badge">{isEs ? 'Alojamiento Exclusivo' : 'Exclusive Accommodation'}</span>
                    </div>
                    <p className="concierge_detail_desc">
                      {isEs
                        ? 'Opciones de apartamentos, penthouses y propiedades premium en áreas seleccionadas de Ciudad de Panamá como Casco Viejo y Punta Pacífica. Ideal para grupos que buscan combinar alojamiento, nightlife y concierge dentro de una misma experiencia.'
                        : 'Options for apartments, penthouses, and premium properties in selected areas of Panama City such as Casco Viejo and Punta Pacifica. Ideal for groups looking to combine accommodation, nightlife, and concierge within one seamless experience.'}
                    </p>
                    <div className="concierge_service_features_row">
                      <div className="concierge_feature_pill">{isEs ? '🏙️ Casco Viejo & Punta Pacífica' : '🏙️ Casco Viejo & Punta Pacifica'}</div>
                      <div className="concierge_feature_pill">{isEs ? '🌅 Penthouses & Lofts Exclusivos' : '🌅 Exclusive Penthouses & Lofts'}</div>
                      <div className="concierge_feature_pill">{isEs ? '🍸 Nightlife & Concierge Integrado' : '🍸 Integrated Nightlife & Concierge'}</div>
                      <div className="concierge_feature_pill">{isEs ? '🔑 Ideal para Grupos & Viajes VIP' : '🔑 Ideal for Groups & VIP Trips'}</div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Request Form */}
            <section className="concierge_form_section">
              <form onSubmit={handleSubmit} className="concierge_form">
                <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                  <h3 className="concierge_form_title" style={{ marginBottom: '0.35rem' }}>
                    {isEs ? 'Tell us what you want to experience.' : 'Tell us what you want to experience.'}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#aaaaaa', maxWidth: '620px', margin: '0 auto' }}>
                    {isEs 
                      ? 'Cuéntanos fechas, número de personas y el tipo de experiencia que buscas. ARRIVE puede ayudarte a organizar restaurantes, transporte, nightlife, yates y alojamiento alrededor de tu viaje.'
                      : 'Tell us your dates, group size, and what kind of experience you are looking for. ARRIVE can help coordinate restaurants, transport, nightlife, yachts, and accommodation for your trip.'}
                  </p>
                </div>

                <div className="concierge_form_row_2col">
                  <div className="form-group">
                    <label className="form-label">{isEs ? 'Nombre Completo *' : 'Full Name *'}</label>
                    <input type="text" className="form-input" placeholder={isEs ? 'Tu nombre' : 'Your full name'} value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{isEs ? 'WhatsApp (+507) *' : 'WhatsApp (+507) *'}</label>
                    <input type="tel" className="form-input" placeholder="+507 6000-0000" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                </div>

                {selectedCategory === 'restaurants' && (
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">{isEs ? 'Restaurante / Venue Seleccionado *' : 'Selected Restaurant / Venue *'}</label>
                    <select className="form-input" value={selectedRestaurantId}
                      onChange={(e) => {
                        const vId = e.target.value;
                        setSelectedRestaurantId(vId);
                        const matched = (venues || []).find(v => v.id === vId);
                        if (matched) setFormData(prev => ({ ...prev, serviceType: `${isEs ? 'Reserva Dinner en' : 'Dinner Reservation at'} ${matched.name}` }));
                      }}>
                      {(venues || []).map((v) => (
                        <option key={v.id} value={v.id}>{v.name} — {v.area} ({isEs ? 'Cena:' : 'Dinner:'} {v.dinnerTime || '5:00 PM - 10:00 PM'})</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="concierge_form_row_3col">
                  <div className="form-group">
                    <label className="form-label">{isEs ? 'Fecha Deseada' : 'Desired Date'}</label>
                    <input type="date" className="form-input" value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{isEs ? 'Hora Estimada' : 'Estimated Time'}</label>
                    <select className="form-input" value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}>
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
                    <label className="form-label">{isEs ? 'Personas' : 'Guests'}</label>
                    <select className="form-input" value={formData.people}
                      onChange={(e) => setFormData({ ...formData, people: e.target.value })}>
                      <option value={isEs ? '1-2 personas' : '1-2 guests'}>{isEs ? '1 - 2 Personas' : '1 - 2 Guests'}</option>
                      <option value={isEs ? '3-5 personas' : '3-5 guests'}>{isEs ? '3 - 5 Personas' : '3 - 5 Guests'}</option>
                      <option value={isEs ? '6-10 personas' : '6-10 guests'}>{isEs ? '6 - 10 Personas' : '6 - 10 Guests'}</option>
                      <option value={isEs ? '10+ personas' : '10+ guests'}>{isEs ? '10+ Personas (Grupo)' : '10+ Guests (Group)'}</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                  <label className="form-label">{isEs ? 'Detalles o Preferencias Especiales' : 'Special Preferences or Requests'}</label>
                  <input type="text" className="form-input"
                    placeholder={selectedCategory === 'restaurants'
                      ? (isEs ? 'Ej. Mesa en terraza con vista, solicitud de cumpleaños...' : 'e.g. Terrace table with view, birthday celebration...')
                      : (isEs ? 'Ej. Transporte desde Hotel W hasta Furia...' : 'e.g. Transfer from W Hotel to Furia...')}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  />
                </div>

                <div className="concierge_form_actions">
                  <button type="submit" className="btn-primary concierge_submit_btn">
                    <Send size={15} /><span>{isEs ? 'PLAN MY EXPERIENCE' : 'PLAN MY EXPERIENCE'}</span>
                  </button>
                  <button type="button" className="btn-secondary concierge_whatsapp_btn" onClick={() => openWhatsAppConcierge()}>
                    <MessageCircle size={16} color="#ff3b5c" /><span>{isEs ? 'Chat WhatsApp' : 'WhatsApp Chat'}</span>
                  </button>
                </div>
              </form>
            </section>
          </>
        ) : (
          /* Success screen */
          <section className="concierge_success_section">
            <div className="concierge_success_box">
              <div className="concierge_success_icon">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="concierge_success_title">{isEs ? '¡Solicitud de Concierge Recibida!' : 'Concierge Request Received!'}</h2>
              <p className="concierge_success_desc">
                {isEs ? (
                  <>Tu solicitud de <strong>{formData.serviceType}</strong> ha sido enviada al equipo VIP de <strong>Arrive Model Management</strong>. Te escribiremos de inmediato vía WhatsApp para coordinar los detalles.</>
                ) : (
                  <>Your request for <strong>{formData.serviceType}</strong> has been sent to the <strong>Arrive VIP Concierge</strong> team. We will reach out immediately via WhatsApp to coordinate details.</>
                )}
              </p>
              <div className="concierge_success_actions">
                <button className="btn-primary" onClick={() => openWhatsAppConcierge()} style={{ justifyContent: 'center', gap: '0.5rem' }}>
                  <MessageCircle size={16} /><span>{isEs ? 'Abrir WhatsApp Ahora' : 'Open WhatsApp Now'}</span>
                </button>
                <button className="btn-secondary" onClick={() => setIsSent(false)} style={{ justifyContent: 'center' }}>
                  {isEs ? 'Nueva Solicitud' : 'New Request'}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* SEO-First FAQ Section with FAQPage Schema */}
      <FaqSection faqs={CONCIERGE_FAQS[locale] || CONCIERGE_FAQS.es} locale={locale} />
    </div>
  );
};

export default ConciergePage;
