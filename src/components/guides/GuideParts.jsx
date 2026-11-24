import React from 'react';
import { ArrowRight, Clock, CalendarDays, Crown, MapPin, Sparkles, Ticket, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CTA_LIBRARY, GUIDES_BASE, categoryUrl, guideUrl, plainText } from '../../seo/guides';
import { GUIDE_CATEGORIES } from '../../data/guidesData';

/** Renders "**bold**" segments from the editorial source as <strong>. */
export const RichText = ({ text }) => {
  const parts = String(text).split(/(\*\*.+?\*\*)/g);
  return parts.map((p, i) => (/^\*\*.+\*\*$/.test(p) ? <strong key={i}>{p.slice(2, -2)}</strong> : <React.Fragment key={i}>{p}</React.Fragment>));
};

export const GuideBlocks = ({ blocks }) => blocks.map((b, i) => {
  if (b.type === 'list') {
    const Tag = b.ordered ? 'ol' : 'ul';
    return (
      <Tag
        key={i}
        className={b.ordered ? 'gd_list gd_list_numbered' : 'gd_list'}
        start={b.ordered && b.start > 1 ? b.start : undefined}
        style={b.ordered ? { counterReset: `gd ${(b.start || 1) - 1}` } : undefined}
      >
        {b.items.map((item, j) => <li key={j}><RichText text={item} /></li>)}
      </Tag>
    );
  }
  return <p key={i}><RichText text={b.text} /></p>;
});

export const GuideImage = ({ image, eager = false, className = '', sizes = '(max-width: 900px) 100vw, 640px' }) => {
  if (!image) return <div className={`gd_img_placeholder ${className}`} aria-hidden="true" />;
  return (
    <img
      className={className}
      src={image.srcSmall}
      srcSet={`${image.srcSmall} 800w, ${image.src} ${image.width}w`}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
    />
  );
};

export const PhotoCredit = ({ image }) => image ? (
  <p className="gd_credit">
    Foto: <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer">{image.author}</a>
    {' · '}
    <a href={image.licenseUrl || image.sourceUrl} target="_blank" rel="license noopener noreferrer">{image.license}</a>
    {' · Wikimedia Commons'}
  </p>
) : null;

export const GuideCard = ({ guide, variant = 'default' }) => (
  <article className={`gd_card gd_card_${variant}`}>
    <a href={guideUrl(guide)} className="gd_card_link">
      <div className="gd_card_media">
        <GuideImage image={guide.image} sizes={variant === 'feature' ? '(max-width: 900px) 100vw, 720px' : '(max-width: 600px) 100vw, 380px'} />
        <span className="gd_card_cat">{guide.category}</span>
      </div>
      <div className="gd_card_body">
        <h3>{guide.title}</h3>
        {variant === 'feature' && <p>{plainText(guide.seoDescription)}</p>}
        <span className="gd_card_meta"><Clock size={13} /> {guide.readMinutes} min <ArrowRight size={14} className="gd_card_arrow" /></span>
      </div>
    </a>
  </article>
);

export const CategoryChips = ({ active }) => (
  <nav className="gd_chips" aria-label="Categorías de guías">
    <a href={GUIDES_BASE} className={!active ? 'is_active' : ''} aria-current={!active ? 'page' : undefined}>Todas</a>
    {GUIDE_CATEGORIES.map((c) => (
      <a key={c.slug} href={categoryUrl(c)} className={active === c.slug ? 'is_active' : ''} aria-current={active === c.slug ? 'page' : undefined}>{c.name}</a>
    ))}
  </nav>
);

export const Breadcrumbs = ({ items }) => (
  <nav aria-label="Ruta de navegación" className="gd_crumbs">
    <ol>
      {items.map((b, i) => (
        <li key={b.path}>{i < items.length - 1 ? <a href={b.path}>{b.name}</a> : <span aria-current="page">{b.name}</span>}</li>
      ))}
    </ol>
  </nav>
);

const CTA_ICONS = { agenda: Ticket, vip: Crown, venues: MapPin, concierge: Sparkles };

export const GuideCtas = ({ keys }) => {
  const { setIsBookVipModalOpen, setSelectedVipEvent } = useApp();
  return (
    <div className="gd_ctas">
      {keys.map((k) => {
        const cta = CTA_LIBRARY[k];
        const Icon = CTA_ICONS[k];
        const inner = (
          <>
            <Icon size={20} />
            <span><strong>{cta.label}</strong><small>{cta.sub}</small></span>
            <ArrowRight size={16} className="gd_cta_arrow" />
          </>
        );
        return cta.action === 'vip'
          ? <button key={k} type="button" className="gd_cta is_primary" onClick={() => { setSelectedVipEvent?.(null); setIsBookVipModalOpen(true); }}>{inner}</button>
          : <a key={k} href={cta.href} className="gd_cta">{inner}</a>;
      })}
    </div>
  );
};

const formatDate = (e) => {
  const d = e.eventDate ? new Date(`${e.eventDate}-05:00`) : null;
  if (!d || Number.isNaN(d.getTime())) return e.date || '';
  return new Intl.DateTimeFormat('es-PA', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'America/Panama' }).format(d).replace(/\./g, '');
};

export const GuideEvents = ({ events }) => (
  <section className="gd_events" aria-labelledby="gd-events-title">
    <div className="gd_events_head">
      <CalendarDays size={18} />
      <h2 id="gd-events-title">En la agenda de HangOut</h2>
    </div>
    {events.length > 0 ? (
      <ul className="gd_events_list">
        {events.map((e) => (
          <li key={e.id}>
            <a href={`/es/events/${e.slug}/`}>
              <img src={e.image} alt={e.imageAlt || e.title} loading="lazy" decoding="async" width="64" height="64" />
              <span>
                <small>{formatDate(e)} · {e.location}</small>
                <strong>{e.title}</strong>
                {e.perkHeadline && <em>{e.perkHeadline}</em>}
              </span>
            </a>
          </li>
        ))}
      </ul>
    ) : (
      <p className="gd_events_empty">Ahora mismo no hay eventos publicados en HangOut que coincidan con esta guía. Eso no significa que no existan: consulta la agenda completa y la programación de cada local.</p>
    )}
    <a href="/es/" className="gd_events_all">Ver la agenda completa <ArrowRight size={14} /></a>
  </section>
);

export const SourcesList = ({ sources }) => (
  <ul className="gd_sources">
    {sources.map((s) => (
      <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name} <ExternalLink size={12} /></a></li>
    ))}
  </ul>
);
