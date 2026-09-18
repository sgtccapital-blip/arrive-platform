import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Calendar, 
  Gift 
} from 'lucide-react';
import { EVENT_CATEGORIES, BENEFIT_CATEGORIES } from '../data/initialData';

export const AdminPanel = () => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    events, 
    benefits, 
    saveEvent, 
    deleteEvent, 
    saveBenefit, 
    deleteBenefit,
    resetToDefaults 
  } = useApp();

  const [adminTab, setAdminTab] = useState('events'); // 'events' | 'benefits'
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingBenefit, setEditingBenefit] = useState(null);

  const [eventForm, setEventForm] = useState({
    title: '',
    subtitle: '',
    category: 'Moda & Pasarela',
    genre: 'High Fashion / Live DJ',
    city: 'Casco Antiguo, Panamá',
    location: 'La Manzana • Casco Antiguo',
    dayOfWeek: 'Viernes',
    date: 'Viernes, 12 Septiembre',
    time: '20:00 - 03:00',
    price: 40,
    vipPrice: 100,
    currency: '$',
    capacity: 300,
    spotsLeft: 30,
    featured: true,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&auto=format&fit=crop',
    description: 'Evento oficial organizado por Arrive Model Management en Panamá.',
    dressCode: 'Black Tie / Monochrome Chic',
    ageLimit: '18+'
  });

  const [benefitForm, setBenefitForm] = useState({
    title: '',
    partner: '',
    category: 'Restaurantes & Gastronomía',
    discount: '25% OFF',
    validUntil: 'Domingo, 14 Septiembre',
    daysValid: 'Lunes a Jueves',
    code: 'ARRIVE-VIP25',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop',
    description: 'Descuento especial para miembros y talentos Arrive.',
    terms: 'Válido presentando código antes de solicitar la cuenta.',
    location: 'Casco Antiguo / Costa del Este'
  });

  if (!isAdminModalOpen) return null;

  const handleOpenNewEvent = () => {
    setEditingEvent({ isNew: true });
    setEventForm({
      title: '',
      subtitle: '',
      category: 'Moda & Pasarela',
      genre: 'Editorial & Pasarela',
      city: 'Casco Antiguo, Panamá',
      location: 'Casco Sky Lounge',
      dayOfWeek: 'Viernes',
      date: 'Viernes, 12 Septiembre',
      time: '20:00 - 02:00',
      price: 35,
      vipPrice: 90,
      currency: '$',
      capacity: 250,
      spotsLeft: 25,
      featured: false,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&auto=format&fit=crop',
      description: 'Noche exclusiva de moda y talento.',
      dressCode: 'Monochrome Chic',
      ageLimit: '18+'
    });
  };

  const handleEditEvent = (evt) => {
    setEditingEvent(evt);
    setEventForm({ ...evt });
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    saveEvent({
      ...eventForm,
      id: editingEvent.isNew ? undefined : editingEvent.id,
      price: Number(eventForm.price),
      vipPrice: Number(eventForm.vipPrice),
      capacity: Number(eventForm.capacity),
      spotsLeft: Number(eventForm.spotsLeft)
    });
    setEditingEvent(null);
  };

  const handleOpenNewBenefit = () => {
    setEditingBenefit({ isNew: true });
    setBenefitForm({
      title: '',
      partner: '',
      category: 'Restaurantes & Gastronomía',
      discount: '20% OFF',
      validUntil: 'Domingo, 14 Septiembre',
      daysValid: 'Todos los días',
      code: 'ARRIVE-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
      description: 'Beneficio exclusivo para la comunidad Arrive en Panamá.',
      terms: 'Válido presentando código antes de pagar.',
      location: 'Ciudad de Panamá'
    });
  };

  const handleEditBenefit = (ben) => {
    setEditingBenefit(ben);
    setBenefitForm({ ...ben });
  };

  const handleSaveBenefit = (e) => {
    e.preventDefault();
    saveBenefit({
      ...benefitForm,
      id: editingBenefit.isNew ? undefined : editingBenefit.id
    });
    setEditingBenefit(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAdminModalOpen(false)}>
      <div className="modal-container" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setIsAdminModalOpen(false)}>
          <X size={18} />
        </button>

        <div className="modal-body">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#fff' }}>
                Panel de Administración • Arrive Panamá
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Gestiona y publica los eventos de la semana, castings y beneficios comerciales.
              </p>
            </div>

            <button 
              onClick={() => {
                if (window.confirm('¿Deseas restaurar todos los eventos y beneficios oficiales de Panamá?')) {
                  resetToDefaults();
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                background: 'var(--bg-glass)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <RotateCcw size={13} />
              <span>Restablecer Datos</span>
            </button>
          </div>

          {/* Subtabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem' }}>
            <button
              onClick={() => { setAdminTab('events'); setEditingEvent(null); setEditingBenefit(null); }}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: '800',
                fontSize: '0.82rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background: adminTab === 'events' ? '#ffffff' : 'var(--bg-glass)',
                color: adminTab === 'events' ? '#000000' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Calendar size={14} />
              <span>Eventos ({events.length})</span>
            </button>

            <button
              onClick={() => { setAdminTab('benefits'); setEditingEvent(null); setEditingBenefit(null); }}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: '800',
                fontSize: '0.82rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background: adminTab === 'benefits' ? '#ffffff' : 'var(--bg-glass)',
                color: adminTab === 'benefits' ? '#000000' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Gift size={14} />
              <span>Beneficios ({benefits.length})</span>
            </button>
          </div>

          {/* EVENTS TAB */}
          {adminTab === 'events' && (
            <div>
              {!editingEvent ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <button className="btn-primary" onClick={handleOpenNewEvent}>
                      <Plus size={15} />
                      <span>Crear Nuevo Evento</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {events.map((evt) => (
                      <div 
                        key={evt.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.85rem 1.25rem',
                          background: 'var(--bg-glass)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img 
                            src={evt.image} 
                            alt={evt.title} 
                            style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: '800', color: '#fff', fontSize: '0.95rem' }}>{evt.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {evt.dayOfWeek} • {evt.city} • {evt.currency || '$'}{evt.price}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="icon-btn" 
                            style={{ width: '34px', height: '34px' }}
                            title="Editar"
                            onClick={() => handleEditEvent(evt)}
                          >
                            <Edit3 size={14} />
                          </button>
                          <button 
                            className="icon-btn" 
                            style={{ width: '34px', height: '34px', color: '#ef4444' }}
                            title="Eliminar"
                            onClick={() => {
                              if (window.confirm(`¿Eliminar "${evt.title}"?`)) {
                                deleteEvent(evt.id);
                              }
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Edit/Create Event Form */
                <form onSubmit={handleSaveEvent}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.25rem', color: '#fff' }}>
                    {editingEvent.isNew ? 'Nuevo Evento Semanal' : `Editar: ${editingEvent.title}`}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Título del Evento *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={eventForm.title} 
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subtítulo / Concepto</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={eventForm.subtitle} 
                        onChange={(e) => setEventForm({ ...eventForm, subtitle: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Categoría</label>
                      <select 
                        className="form-input"
                        value={eventForm.category}
                        onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      >
                        {EVENT_CATEGORIES.filter(c => c !== 'Todas').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Día de la Semana</label>
                      <select 
                        className="form-input"
                        value={eventForm.dayOfWeek}
                        onChange={(e) => setEventForm({ ...eventForm, dayOfWeek: e.target.value })}
                      >
                        {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'].map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Zona / Ciudad</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={eventForm.city} 
                        onChange={(e) => setEventForm({ ...eventForm, city: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Lugar / Establecimiento</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={eventForm.location} 
                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Fecha y Horario</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={eventForm.time} 
                        onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Precio General ($)</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={eventForm.price} 
                        onChange={(e) => setEventForm({ ...eventForm, price: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Precio VIP ($)</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={eventForm.vipPrice} 
                        onChange={(e) => setEventForm({ ...eventForm, vipPrice: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Cupos Disponibles</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={eventForm.spotsLeft} 
                        onChange={(e) => setEventForm({ ...eventForm, spotsLeft: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">URL de Imagen</label>
                    <input 
                      type="url" 
                      className="form-input" 
                      value={eventForm.image} 
                      onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Descripción</label>
                    <textarea 
                      className="form-input" 
                      rows={3} 
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button type="button" className="btn-secondary" onClick={() => setEditingEvent(null)}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      Guardar Evento
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* BENEFITS TAB */}
          {adminTab === 'benefits' && (
            <div>
              {!editingBenefit ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <button className="btn-primary" onClick={handleOpenNewBenefit}>
                      <Plus size={15} />
                      <span>Crear Nuevo Beneficio</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {benefits.map((ben) => (
                      <div 
                        key={ben.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.85rem 1.25rem',
                          background: 'var(--bg-glass)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img 
                            src={ben.image} 
                            alt={ben.partner} 
                            style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: '800', color: '#fff', fontSize: '0.95rem' }}>{ben.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                              {ben.partner} • {ben.discount} • Código: {ben.code}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="icon-btn" 
                            style={{ width: '34px', height: '34px' }}
                            title="Editar"
                            onClick={() => handleEditBenefit(ben)}
                          >
                            <Edit3 size={14} />
                          </button>
                          <button 
                            className="icon-btn" 
                            style={{ width: '34px', height: '34px', color: '#ef4444' }}
                            title="Eliminar"
                            onClick={() => {
                              if (window.confirm(`¿Eliminar beneficio "${ben.title}"?`)) {
                                deleteBenefit(ben.id);
                              }
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Edit/Create Benefit Form */
                <form onSubmit={handleSaveBenefit}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.25rem', color: '#fff' }}>
                    {editingBenefit.isNew ? 'Nuevo Beneficio en Panamá' : `Editar: ${editingBenefit.partner}`}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Nombre del Aliado / Restaurante *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={benefitForm.partner} 
                        onChange={(e) => setBenefitForm({ ...benefitForm, partner: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Título del Descuento *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={benefitForm.title} 
                        onChange={(e) => setBenefitForm({ ...benefitForm, title: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Categoría</label>
                      <select 
                        className="form-input"
                        value={benefitForm.category}
                        onChange={(e) => setBenefitForm({ ...benefitForm, category: e.target.value })}
                      >
                        {BENEFIT_CATEGORIES.filter(c => c !== 'Todas').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Descuento / Badge</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={benefitForm.discount} 
                        onChange={(e) => setBenefitForm({ ...benefitForm, discount: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Código Cupón</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={benefitForm.code} 
                        onChange={(e) => setBenefitForm({ ...benefitForm, code: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">URL de Imagen</label>
                    <input 
                      type="url" 
                      className="form-input" 
                      value={benefitForm.image} 
                      onChange={(e) => setBenefitForm({ ...benefitForm, image: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Descripción</label>
                    <textarea 
                      className="form-input" 
                      rows={2} 
                      value={benefitForm.description}
                      onChange={(e) => setBenefitForm({ ...benefitForm, description: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Términos y Condiciones</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={benefitForm.terms} 
                      onChange={(e) => setBenefitForm({ ...benefitForm, terms: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button type="button" className="btn-secondary" onClick={() => setEditingBenefit(null)}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      Guardar Beneficio
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
