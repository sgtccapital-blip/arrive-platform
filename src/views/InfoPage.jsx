import React, { useEffect } from 'react';
import { INFO_PAGES } from '../data/infoPagesData';
import { 
  ShieldCheck, 
  FileText, 
  Briefcase, 
  AlertTriangle, 
  MapPin, 
  Newspaper, 
  Cookie,
  Mail, 
  MessageCircle, 
  ChevronRight, 
  Download,
  ExternalLink 
} from 'lucide-react';

const ICON_MAP = {
  'cookies': Cookie,
  'privacy': ShieldCheck,
  'terms-and-conditions': FileText,
  'work-with-us': Briefcase,
  'whistleblowing': AlertTriangle,
  'contact-us': MapPin,
  'press': Newspaper
};

export const InfoPage = ({ pageSlug = 'cookies', locale = 'es' }) => {
  const pageData = INFO_PAGES[pageSlug] || INFO_PAGES['privacy'];
  const content = locale === 'es' ? pageData.es : pageData.en;
  const isEs = locale === 'es';
  const IconComponent = ICON_MAP[pageSlug] || FileText;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageSlug]);

  return (
    <main className="arrive_info_page" style={{ minHeight: '80vh', padding: '6rem 1.25rem 4rem', maxWidth: '1000px', margin: '0 auto' }}>
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
            {content.title}
          </li>
        </ol>
      </nav>

      {/* Header Banner */}
      <header className="info_page_header" style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(193,2,48,0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(193,2,48,0.15)', border: '1px solid rgba(193,2,48,0.3)', padding: '5px 12px', borderRadius: '20px', color: '#ff4d6d', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
          <IconComponent size={14} />
          <span>{content.badge}</span>
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', Montserrat, sans-serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.15,
          margin: '0 0 1rem 0',
          letterSpacing: '-0.02em'
        }}>
          {content.title}
        </h1>

        <p style={{ fontSize: '1.05rem', color: '#aaaaaa', maxWidth: '750px', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
          {content.subtitle}
        </p>

        <div style={{ fontSize: '0.78rem', color: '#666666' }}>
          {isEs ? 'Última actualización: ' : 'Last updated: '} {content.lastUpdated}
        </div>
      </header>

      {/* Content Blocks */}
      <section className="info_page_body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
        {content.sections.map((section, idx) => (
          <article 
            key={idx}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '1.5rem 1.75rem'
            }}
          >
            <h2 style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 0.75rem 0',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              {section.heading}
            </h2>
            <p style={{
              fontSize: '0.94rem',
              color: '#cccccc',
              lineHeight: 1.7,
              margin: 0,
              whiteSpace: 'pre-line'
            }}>
              {section.text}
            </p>
          </article>
        ))}
      </section>

      {/* Interactive Action Box per page type */}
      <aside style={{
        background: 'linear-gradient(135deg, rgba(193,2,48,0.12) 0%, rgba(20,20,20,0.85) 100%)',
        border: '1px solid rgba(193,2,48,0.25)',
        borderRadius: '14px',
        padding: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem 0' }}>
            {pageSlug === 'work-with-us' ? (isEs ? '¿Quieres formar parte del equipo?' : 'Interested in joining our team?') :
             pageSlug === 'whistleblowing' ? (isEs ? 'Canal de Denuncias Directo y Seguro' : 'Direct & Secure Ethics Channel') :
             pageSlug === 'press' ? (isEs ? 'Descarga el Press Kit Oficial' : 'Download Official Media Kit') :
             pageSlug === 'contact-us' ? (isEs ? 'Atención Inmediata con Arrive Concierge' : 'Instant VIP Concierge Assistance') :
             (isEs ? '¿Tienes alguna pregunta sobre nuestros términos?' : 'Have any questions regarding our policies?')}
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#bbbbbb', margin: 0 }}>
            {pageSlug === 'work-with-us' ? (isEs ? 'Envía tu perfil o habla directamente con nuestros reclutadores VIP.' : 'Send your portfolio or speak directly with our recruitment team.') :
             pageSlug === 'whistleblowing' ? (isEs ? 'Comunicaciones 100% confidenciales analizadas por compliance independiente.' : '100% confidential reporting handled by independent compliance.') :
             pageSlug === 'press' ? (isEs ? 'Fotografías HD, logos vectoriales y notas de prensa de temporada.' : 'High-definition assets, vector logos and seasonal press releases.') :
             pageSlug === 'contact-us' ? (isEs ? 'Soporte 24/7 para reservas VIP y pases digitales en Panamá.' : '24/7 live assistance for VIP table bookings and digital passes.') :
             (isEs ? 'Nuestro equipo de soporte y asesoría legal está a tu disposición.' : 'Our legal and support teams are available for inquiries.')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {pageSlug === 'whistleblowing' ? (
            <a
              href="mailto:etica@arrivepanama.com?subject=Canal%20Etico%20Arrive"
              className="arrive_cta_button primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#c10230',
                color: '#ffffff',
                padding: '11px 20px',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(193,2,48,0.4)'
              }}
            >
              <Mail size={16} />
              <span>{isEs ? 'Enviar Denuncia Confidencial' : 'Submit Confidential Report'}</span>
            </a>
          ) : pageSlug === 'press' ? (
            <a
              href="mailto:press@arrivepanama.com?subject=Solicitud%20Press%20Kit%20Arrive"
              className="arrive_cta_button primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#c10230',
                color: '#ffffff',
                padding: '11px 20px',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(193,2,48,0.4)'
              }}
            >
              <Download size={16} />
              <span>{isEs ? 'Solicitar Media Kit' : 'Request Media Kit'}</span>
            </a>
          ) : pageSlug === 'work-with-us' ? (
            <a
              href="mailto:careers@arrivepanama.com?subject=Candidatura%20Arrive%202026"
              className="arrive_cta_button primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#c10230',
                color: '#ffffff',
                padding: '11px 20px',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(193,2,48,0.4)'
              }}
            >
              <Briefcase size={16} />
              <span>{isEs ? 'Enviar Currículum' : 'Send Application'}</span>
            </a>
          ) : (
            <a
              href="https://wa.me/50760000000?text=Hola%20Arrive,%20tengo%20una%20consulta%20general"
              target="_blank"
              rel="noopener noreferrer"
              className="arrive_cta_button primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#c10230',
                color: '#ffffff',
                padding: '11px 20px',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(193,2,48,0.4)'
              }}
            >
              <MessageCircle size={16} />
              <span>{isEs ? 'WhatsApp Soporte' : 'WhatsApp Support'}</span>
            </a>
          )}
        </div>
      </aside>
    </main>
  );
};
