import React, { useEffect, useState } from 'react';
import { Clock, CalendarCheck, Share2, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { matchGuideEvents, categoryUrl, HUB_COPY } from '../../seo/guides';
import {
  Breadcrumbs, GuideBlocks, GuideImage, PhotoCredit, GuideEvents, GuideCtas, GuideCard, SourcesList, CategoryChips, RichText,
} from './GuideParts';

const formatLongDate = (iso) => new Intl.DateTimeFormat('es-PA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

/**
 * Reusable editorial article: hero, table of contents, body, live events,
 * CTAs, FAQ, related guides and sources. Used for every /es/guias/:slug/.
 */
export const GuideArticle = ({ page }) => {
  const { events, showToast } = useApp();
  const g = page.guide;
  const [activeId, setActiveId] = useState(g.sections[0]?.id);
  const [progress, setProgress] = useState(0);
  const liveEvents = g.events ? matchGuideEvents(g, events) : [];

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [g.id]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActiveId(visible.target.id);
    }, { rootMargin: '-20% 0px -70% 0px' });
    g.sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [g.id]);

  const share = async () => {
    const url = `https://hangoutpanama.com${page.path}`;
    try {
      if (navigator.share) await navigator.share({ title: g.title, url });
      else { await navigator.clipboard.writeText(url); showToast?.('Enlace copiado'); }
    } catch { /* user cancelled */ }
  };

  return (
    <article className="gd_article">
      <div className="gd_progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <header className="gd_hero">
        <div className="gd_hero_media">
          <GuideImage image={g.image} eager sizes="100vw" />
          <div className="gd_hero_shade" aria-hidden="true" />
        </div>
        <div className="gd_hero_inner">
          <Breadcrumbs items={page.breadcrumbs} />
          <a className="gd_kicker" href={categoryUrl(page.category)}>{g.category}</a>
          <h1 className="gd_title">{g.title}</h1>
          <div className="gd_meta">
            <span><Clock size={14} /> {g.readMinutes} min de lectura</span>
            <span><CalendarCheck size={14} /> Revisado el <time dateTime={g.dateModified}>{formatLongDate(g.dateModified)}</time></span>
            <button type="button" className="gd_share" onClick={share} aria-label="Compartir guía"><Share2 size={15} /> Compartir</button>
          </div>
        </div>
      </header>
      <div className="gd_wrap"><PhotoCredit image={g.image} /></div>

      <div className="gd_wrap gd_layout">
        <aside className="gd_toc" aria-label="En esta guía">
          <p className="gd_toc_title">En esta guía</p>
          <ol>
            {g.sections.map((s) => (
              <li key={s.id}><a href={`#${s.id}`} className={activeId === s.id ? 'is_active' : ''}>{s.heading}</a></li>
            ))}
            <li><a href="#preguntas-frecuentes">Preguntas frecuentes</a></li>
            <li><a href="#fuentes">Fuentes</a></li>
          </ol>
        </aside>

        <div className="gd_body">
          <div className="gd_lead"><GuideBlocks blocks={g.intro} /></div>

          {g.sections.map((s, i) => (
            <React.Fragment key={s.id}>
              <section id={s.id} className="gd_section">
                <h2>{s.heading}</h2>
                <GuideBlocks blocks={s.blocks} />
              </section>
              {i === 0 && g.events && <GuideEvents events={liveEvents} />}
            </React.Fragment>
          ))}

          <GuideCtas keys={g.ctas} />

          <section id="preguntas-frecuentes" className="gd_section gd_faq">
            <h2>Preguntas frecuentes</h2>
            {g.faqs.map((f) => (
              <details key={f.question}>
                <summary>{f.question}<ChevronDown size={18} /></summary>
                <p><RichText text={f.answer} /></p>
              </details>
            ))}
          </section>

          <section className="gd_section">
            <h2>Sigue explorando con HangOut</h2>
            <p>{g.closing}</p>
          </section>

          <section id="fuentes" className="gd_section gd_sources_box">
            <h2>Fuentes y consultas oficiales</h2>
            <SourcesList sources={g.sources} />
            <p className="gd_disclaimer">{HUB_COPY.note}</p>
          </section>
        </div>
      </div>

      <section className="gd_wrap gd_related" aria-labelledby="gd-related-title">
        <h2 id="gd-related-title">Guías relacionadas</h2>
        <div className="gd_grid">
          {page.related.map((r) => <GuideCard key={r.id} guide={r} />)}
        </div>
        <CategoryChips active={page.category.slug} />
      </section>
    </article>
  );
};

export default GuideArticle;
