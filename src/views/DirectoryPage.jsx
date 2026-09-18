import React, { useState, useMemo, useEffect } from 'react';
import { 
  Compass, 
  Search, 
  MapPin, 
  Sparkles, 
  Calendar, 
  GlassWater, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight, 
  ArrowUpRight 
} from 'lucide-react';

export const DirectoryPage = ({ locale = 'es', navigate }) => {
  const isEs = locale === 'es';
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sections = useMemo(() => [
    {
      id: 'nightlife-categories',
      title: isEs ? 'Categorías de Nightlife & Fiesta' : 'Nightlife & Party Categories',
      desc: isEs ? 'Guías temáticas de ocio nocturno en Ciudad de Panamá.' : 'Themed nightlife guides for Panama City.',
      icon: Compass,
      links: [
        { title: isEs ? 'Nightlife Panamá' : 'Panama Nightlife', url: `/${locale}/panama/nightlife/`, sub: isEs ? 'Discotecas, fiestas y rooftops' : 'Clubs, parties and rooftops' },
        { title: isEs ? 'Clubs & Discotecas' : 'Clubs & Nightclubs', url: `/${locale}/panama/clubs/`, sub: isEs ? 'Fiesta hasta las 4:00 AM' : 'High energy parties till 4:00 AM' },
        { title: isEs ? 'Rooftops & Terrazas' : 'Rooftops & Lounges', url: `/${locale}/panama/rooftops/`, sub: isEs ? 'Vistas panorámicas y sunset' : 'Panoramic skyline & sunset' },
        { title: isEs ? 'Fiestas & Eventos VIP' : 'Parties & VIP Events', url: `/${locale}/panama/parties/`, sub: isEs ? 'Cartelera exclusiva' : 'Exclusive party line-up' },
        { title: isEs ? 'Eventos en Panamá' : 'Panama Events', url: `/${locale}/panama/events/`, sub: isEs ? 'Entradas y pases con QR' : 'Tickets and QR passes' },
        { title: isEs ? 'Restaurantes Gourmet' : 'Gourmet Restaurants', url: `/${locale}/panama/restaurants/`, sub: isEs ? 'Sunset dinner y cocina de autor' : 'Sunset dinner and culinary art' },
        { title: isEs ? 'Concierge & Servicios VIP' : 'VIP Concierge & Services', url: `/${locale}/panama/concierge/`, sub: isEs ? 'Yates, transporte y reservas' : 'Yachts, transport and bookings' }
      ]
    },
    {
      id: 'casco-antiguo',
      title: isEs ? 'Casco Antiguo (San Felipe)' : 'Casco Viejo (Historic District)',
      desc: isEs ? 'El distrito histórico más exclusivo y vibrante de Centroamérica.' : 'The most vibrant historic nightlife district in Central America.',
      icon: MapPin,
      links: [
        { title: isEs ? 'Casco Antiguo Nightlife' : 'Casco Viejo Nightlife', url: `/${locale}/panama/casco-viejo/nightlife/`, sub: isEs ? 'Guía completa de bares y terrazas' : 'Complete bar and rooftop guide' },
        { title: isEs ? 'Clubs en Casco Viejo' : 'Clubs in Casco Viejo', url: `/${locale}/panama/casco-viejo/clubs/`, sub: isEs ? 'Música electrónica, urbana y crossover' : 'Electronic, urban and crossover' },
        { title: isEs ? 'Rooftops en Casco Viejo' : 'Rooftops in Casco Viejo', url: `/${locale}/panama/casco-viejo/rooftops/`, sub: isEs ? 'Vistas a la bahía y Casco histórico' : 'Ocean views and historic skyline' },
        { title: isEs ? 'Restaurantes en Casco Antiguo' : 'Casco Viejo Restaurants', url: `/${locale}/panama/casco-viejo/restaurants/`, sub: isEs ? 'Cena antes de la fiesta' : 'Pre-party dinner experiences' }
      ]
    },
    {
      id: 'calendar',
      title: isEs ? 'Agenda de Fiestas por Día' : 'Party Calendar by Day',
      desc: isEs ? 'Planifica tu noche hoy, mañana o este fin de semana.' : 'Plan your night out today, tomorrow, or this weekend.',
      icon: Calendar,
      links: [
        { title: isEs ? 'Eventos Hoy en Panamá' : 'Events Tonight in Panama', url: `/${locale}/panama/events/today/`, sub: isEs ? 'Qué hacer esta noche' : 'Where to go tonight' },
        { title: isEs ? 'Eventos Mañana' : 'Events Tomorrow', url: `/${locale}/panama/events/tomorrow/`, sub: isEs ? 'Pases de cortesía anticipados' : 'Early complimentary passes' },
        { title: isEs ? 'Eventos Este Fin de Semana' : 'This Weekend Events', url: `/${locale}/panama/events/this-weekend/`, sub: isEs ? 'Jueves, viernes y sábado' : 'Thursday, Friday & Saturday' }
      ]
    },
    {
      id: 'official-venues',
      title: isEs ? 'Venues Oficiales ARRIVE' : 'Official ARRIVE Venues',
      desc: isEs ? 'Nuestros clubs, rooftops y restaurantes asociados en Panamá.' : 'Our partner nightclubs, rooftops, and restaurants in Panama.',
      icon: Sparkles,
      links: [
        { title: 'Furia Club & Restaurant', url: `/${locale}/venues/furia-club/`, sub: 'Bella Vista • Clubbing 360°' },
        { title: 'Terraplén Rooftop', url: `/${locale}/venues/terraplen-rooftop/`, sub: 'Casco Antiguo • Vista a la bahía' },
        { title: 'Primavera Rooftop', url: `/${locale}/venues/primavera-rooftop/`, sub: 'Costa del Este • Sunset Piso 7' },
        { title: 'Cielo Rooftop', url: `/${locale}/venues/cielo-rooftop/`, sub: 'Ave. Balboa • Vista panorámica' },
        { title: 'Piano Bar Panamá', url: `/${locale}/venues/piano-bar/`, sub: 'Bella Vista • Tapas & Piano en vivo' },
        { title: isEs ? 'Directorio de Venues' : 'Venues Directory', url: `/${locale}/venues/`, sub: isEs ? 'Ver todos los perfiles' : 'View all venue profiles' },
        { title: isEs ? 'Servicios & Concierge' : 'Services & Concierge', url: `/${locale}/concierge/`, sub: isEs ? 'Yates y Chauffeur Privado' : 'Yachts & Private Chauffeur' }
      ]
    },
    {
      id: 'blog-editorial',
      title: isEs ? 'Blog & Guías Editoriales VIP' : 'Blog & Editorial VIP Guides',
      desc: isEs ? 'Artículos de expertos, dress code y consejos de nightlife.' : 'Expert articles, dress code rules, and nightlife tips.',
      icon: BookOpen,
      links: [
        { title: isEs ? 'Guía Nightlife Casco Antiguo' : 'Casco Viejo Nightlife Guide', url: `/${locale}/blog/guia-nightlife-casco-antiguo-panama/`, sub: isEs ? 'Rooftops y clubs secretos' : 'Rooftops and hidden clubs' },
        { title: isEs ? 'Cómo Reservar Mesa VIP' : 'How to Book VIP Tables', url: `/${locale}/blog/como-reservar-mesa-vip-bottle-service-panama/`, sub: isEs ? 'Bottle service y consumos mínimos' : 'Bottle service & minimum spends' },
        { title: isEs ? 'Mejores Rooftops Vista al Mar' : 'Best Ocean-View Rooftops', url: `/${locale}/blog/mejores-rooftops-vista-al-mar-panama/`, sub: isEs ? 'Top 5 terrazas costeras' : 'Top 5 coastal terraces' },
        { title: isEs ? 'Dress Code en Discotecas de Panamá' : 'Panama Nightclub Dress Code', url: `/${locale}/blog/dress-code-discotecas-clubs-panama/`, sub: isEs ? 'Qué vestir y calzado permitido' : 'What to wear and footwear rules' },
        { title: isEs ? 'Ver Todo el Blog' : 'Browse All Blog Posts', url: `/${locale}/blog/`, sub: isEs ? 'Artículos y actualizaciones' : 'Articles and updates' }
      ]
    },
    {
      id: 'corporate-legal',
      title: isEs ? 'Institucional, Legal & Contacto' : 'Corporate, Legal & Contact',
      desc: isEs ? 'Transparencia, empleo, canal ético y políticas de ARRIVE.' : 'Transparency, careers, ethics channel and ARRIVE policies.',
      icon: ShieldCheck,
      links: [
        { title: isEs ? 'Política de Cookies' : 'Cookie Policy', url: `/${locale}/cookies/`, sub: isEs ? 'Preferencias y analítica' : 'Preferences and analytics' },
        { title: isEs ? 'Política de Privacidad' : 'Privacy Policy', url: `/${locale}/privacy/`, sub: isEs ? 'Protección de datos personales' : 'Personal data protection' },
        { title: isEs ? 'Términos & Condiciones' : 'Terms & Conditions', url: `/${locale}/terms-and-conditions/`, sub: isEs ? 'Uso de pases y reservas VIP' : 'Digital passes and VIP booking terms' },
        { title: isEs ? 'Trabaja con Nosotros' : 'Work With Us', url: `/${locale}/work-with-us/`, sub: isEs ? 'Empleo, PR y modelaje' : 'Careers, PR and modeling' },
        { title: isEs ? 'Canal Ético (Whistleblowing)' : 'Whistleblowing Channel', url: `/${locale}/whistleblowing/`, sub: isEs ? 'Canal de denuncias confidencial' : 'Confidential reporting channel' },
        { title: isEs ? 'Ubicaciones & Contacto' : 'Locations & Contact Us', url: `/${locale}/contact-us/`, sub: isEs ? 'Oficinas y atención VIP 24/7' : 'Offices and 24/7 VIP assistance' },
        { title: isEs ? 'Prensa & Media Kit' : 'Press & Media Kit', url: `/${locale}/press/`, sub: isEs ? 'Recursos de marca y notas de prensa' : 'Brand assets and press releases' }
      ]
    }
  ], [locale, isEs]);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.map(sec => {
      const matchingLinks = sec.links.filter(l => 
        l.title.toLowerCase().includes(q) || 
        l.sub.toLowerCase().includes(q)
      );
      if (matchingLinks.length > 0 || sec.title.toLowerCase().includes(q)) {
        return {
          ...sec,
          links: matchingLinks.length > 0 ? matchingLinks : sec.links
        };
      }
      return null;
    }).filter(Boolean);
  }, [sections, searchQuery]);

  return (
    <main className="arrive_directory_page" style={{ minHeight: '85vh', padding: '6rem 1.25rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" style={{ marginBottom: '1.5rem' }}>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#888' }}>
          <li>
            <a href={`/${locale}/`} style={{ color: '#aaa', textDecoration: 'none' }}>
              {isEs ? 'Inicio' : 'Home'}
            </a>
          </li>
          <li><ChevronRight size={13} /></li>
          <li style={{ color: '#ff3b5c', fontWeight: 600 }}>
            {isEs ? 'Directorio & Guía Completa de Páginas' : 'Directory & Complete Pages Guide'}
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header style={{
        background: 'radial-gradient(ellipse at top, rgba(193,2,48,0.15) 0%, rgba(10,10,10,0.9) 80%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '3rem 2rem',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(193,2,48,0.2)', border: '1px solid rgba(193,2,48,0.3)', padding: '5px 14px', borderRadius: '20px', color: '#ff4d6d', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
          <Compass size={14} />
          <span>{isEs ? 'Mapa del Sitio & Directorio VIP' : 'Site Index & VIP Directory'}</span>
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', Montserrat, sans-serif",
          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1.15,
          margin: '0 0 1rem 0',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase'
        }}>
          {isEs ? 'Directorio Oficial ARRIVE Panamá' : 'Official ARRIVE Panama Directory'}
        </h1>

        <p style={{ fontSize: '1.08rem', color: '#cccccc', maxWidth: '780px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
          {isEs 
            ? 'Explora todas las páginas, hubs temáticos de Casco Antiguo y Bella Vista, eventos por fecha, perfiles de venues y recursos corporativos de la plataforma.' 
            : 'Explore every hub, Casco Viejo nightlife category, party by day, venue profiles, editorial articles, and corporate resources on ARRIVE.'}
        </p>

        {/* Live Search Bar */}
        <div style={{ maxWidth: '540px', margin: '0 auto', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEs ? 'Buscar páginas, clubs, rooftops o categorías...' : 'Search pages, clubs, rooftops or categories...'}
            style={{
              width: '100%',
              padding: '14px 16px 14px 46px',
              borderRadius: '28px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border 0.2s ease',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </header>

      {/* Grid of Directory Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {filteredSections.map(sec => {
          const SecIcon = sec.icon;
          return (
            <div 
              key={sec.id}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(193,2,48,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff4d6d'
                }}>
                  <SecIcon size={18} />
                </div>
                <h2 style={{
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0,
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  {sec.title}
                </h2>
              </div>

              <p style={{ fontSize: '0.84rem', color: '#888888', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
                {sec.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                {sec.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      textDecoration: 'none',
                      color: '#ffffff',
                      transition: 'all 0.2s ease'
                    }}
                    className="directory_link_row"
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{link.title}</div>
                      <div style={{ fontSize: '0.74rem', color: '#777777', marginTop: '2px' }}>{link.sub}</div>
                    </div>
                    <ArrowUpRight size={15} style={{ color: '#ff3b5c', flexShrink: 0, opacity: 0.8 }} />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
