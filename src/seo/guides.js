// =========================================================================
// HANGOUT — Editorial guides (/es/guias/) page model
// Single source for the React views, HeadManager metadata and the static
// prerender, so visible content and structured data always match.
// =========================================================================
import { GUIDES, GUIDE_CATEGORIES } from '../data/guidesData.js';

export const SITE_URL = 'https://hangoutpanama.com';
export const GUIDES_BASE = '/es/guias/';
export const GUIDES_LOCALE = 'es';

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const guideUrl = (g) => `${GUIDES_BASE}${g.slug}/`;
export const categoryUrl = (c) => `${GUIDES_BASE}${c.slug}/`;
export const getGuideById = (id) => GUIDES.find((g) => g.id === id);
export const getGuideBySlug = (slug) => GUIDES.find((g) => g.slug === slug);
export const getCategoryBySlug = (slug) => GUIDE_CATEGORIES.find((c) => c.slug === slug);
export const getCategoryByName = (name) => GUIDE_CATEGORIES.find((c) => c.name === name);
export const guidesInCategory = (c) => GUIDES.filter((g) => g.category === c.name);

/** Related guides: explicit editorial links first, then same category to reach 4. */
export const relatedGuides = (g, max = 4) => {
  const explicit = g.relatedIds.map(getGuideById).filter(Boolean);
  const fill = GUIDES.filter((o) => o.id !== g.id && o.category === g.category && !explicit.includes(o));
  return [...explicit, ...fill].slice(0, Math.max(max, explicit.length));
};

/** Inline markdown used by the source: **bold** only. Returns HTML-safe string. */
export const inlineHtml = (text) => esc(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
export const plainText = (text) => String(text).replace(/\*\*(.+?)\*\*/g, '$1');

// ── Event matching (live data, never invented) ──────────────────────────
const isLadies = (e) => /mujer|ellas|ladies|chicas/i.test(`${e.perkHeadline || ''} ${e.description || ''} ${(e.perksIncluded || []).join(' ')}`);
const weekendWindow = (now = new Date()) => {
  const d = new Date(now);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const toFri = (5 - day + 7) % 7;
  const start = new Date(d); start.setHours(0, 0, 0, 0);
  if (day !== 5 && day !== 6 && day !== 0) start.setDate(start.getDate() + toFri);
  if (day === 6) start.setDate(start.getDate() - 1);
  if (day === 0) start.setDate(start.getDate() - 2);
  const end = new Date(start); end.setDate(end.getDate() + 3); end.setHours(6, 0, 0, 0);
  return [start, end];
};

export const matchGuideEvents = (guide, events = [], now = new Date()) => {
  const rule = guide?.events;
  if (!rule) return [];
  const upcoming = events
    .filter((e) => e.slug && e.indexable !== false)
    .filter((e) => !e.eventDate || new Date(`${e.eventDate}-05:00`).getTime() + 8 * 3600e3 > now.getTime())
    .sort((a, b) => String(a.eventDate).localeCompare(String(b.eventDate)));
  let list = upcoming;
  if (rule.mode === 'venues') list = upcoming.filter((e) => rule.venues.includes(e.venueSlug));
  if (rule.mode === 'ladies') list = upcoming.filter(isLadies);
  if (rule.mode === 'vip') list = upcoming.filter((e) => e.vipPrice != null);
  if (rule.mode === 'genre') list = upcoming.filter((e) => rule.genres.some((g) => `${(e.musicGenres || []).join(' ')} ${e.genre || ''}`.toLowerCase().includes(g)));
  if (rule.mode === 'weekend') {
    const [start, end] = weekendWindow(now);
    list = upcoming.filter((e) => { const t = new Date(`${e.eventDate}-05:00`); return t >= start && t < end; });
  }
  return list.slice(0, 6);
};

// ── CTAs (only products that exist on the platform) ─────────────────────
export const CTA_LIBRARY = {
  agenda: { href: '/es/', label: 'Ver la agenda de HangOut', sub: 'Eventos y beneficios publicados esta semana' },
  vip: { action: 'vip', label: 'Reservar mesa VIP', sub: 'Solicita disponibilidad en los locales aliados' },
  venues: { href: '/es/panama/venues/', label: 'Explorar locales', sub: 'Clubs, rooftops y restaurantes en HangOut' },
  concierge: { href: '/es/panama/concierge/', label: 'Hablar con Concierge', sub: 'Te ayudamos a organizar tu plan' },
};

// ── Page models ──────────────────────────────────────────────────────────
const crumbs = (items) => [{ name: 'Inicio', path: '/es/' }, { name: 'Guías', path: GUIDES_BASE }, ...items];

const breadcrumbNode = (list) => ({
  '@type': 'BreadcrumbList',
  itemListElement: list.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: SITE_URL + b.path })),
});

const ORG = { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'HangOut Panamá', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/hangout-logo.png` } };
const publisher = { '@id': ORG['@id'] };

export const HUB_COPY = {
  title: 'Guías de Panamá: qué hacer, nightlife, islas y aventura | HangOut Panamá',
  h1: 'Guías HangOut de Panamá',
  description: 'Guías prácticas para descubrir Panamá: qué hacer en la ciudad, vida nocturna, playas e islas, aventura y consejos de viaje, con fuentes oficiales.',
  intro: 'Planes urbanos, nightlife, islas, montaña y consejos prácticos. Cada guía enlaza a sus fuentes oficiales y a la agenda publicada en HangOut.',
  note: 'Investigación documental, no reseñas de primera mano. Confirma precios, horarios y disponibilidad con cada operador antes de reservar.',
};

export const getGuidesPage = (pathname) => {
  const m = String(pathname).match(/^\/es\/guias\/(?:([a-z0-9-]+)\/)?$/);
  if (!m) return null;
  const slug = m[1];

  if (!slug) {
    const path = GUIDES_BASE;
    return {
      kind: 'hub', path, canonicalUrl: SITE_URL + path, title: HUB_COPY.title, description: HUB_COPY.description, h1: HUB_COPY.h1,
      breadcrumbs: crumbs([]).slice(0, 2), ogType: 'website', image: GUIDES[0].image,
      schema: [
        ORG,
        breadcrumbNode(crumbs([]).slice(0, 2)),
        { '@type': 'CollectionPage', '@id': SITE_URL + path, url: SITE_URL + path, name: HUB_COPY.h1, description: HUB_COPY.description, inLanguage: 'es',
          mainEntity: { '@type': 'ItemList', itemListElement: GUIDES.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.title, url: SITE_URL + guideUrl(g) })) } },
      ],
    };
  }

  const category = getCategoryBySlug(slug);
  if (category) {
    const path = categoryUrl(category);
    const list = guidesInCategory(category);
    const bc = crumbs([{ name: category.name, path }]);
    return {
      kind: 'category', category, guides: list, path, canonicalUrl: SITE_URL + path,
      title: `${category.name} en Panamá: guías y planes | HangOut Panamá`,
      description: category.description, h1: `Guías de ${category.name.toLowerCase() === 'guías' ? 'viaje práctico' : category.name.toLowerCase()} en Panamá`,
      breadcrumbs: bc, ogType: 'website', image: list[0]?.image,
      schema: [
        ORG,
        breadcrumbNode(bc),
        { '@type': 'CollectionPage', '@id': SITE_URL + path, url: SITE_URL + path, name: category.name, description: category.description, inLanguage: 'es',
          mainEntity: { '@type': 'ItemList', itemListElement: list.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.title, url: SITE_URL + guideUrl(g) })) } },
      ],
    };
  }

  const guide = getGuideBySlug(slug);
  if (!guide) return null;
  const path = guideUrl(guide);
  const cat = getCategoryByName(guide.category);
  const bc = crumbs([{ name: cat.name, path: categoryUrl(cat) }, { name: guide.title, path }]);
  const img = guide.image;
  return {
    kind: 'article', guide, category: cat, path, canonicalUrl: SITE_URL + path,
    title: guide.seoTitle, description: guide.seoDescription, h1: guide.title,
    breadcrumbs: bc, ogType: 'article', image: img, related: relatedGuides(guide),
    schema: [
      ORG,
      breadcrumbNode(bc),
      {
        '@type': 'Article', '@id': `${SITE_URL}${path}#article`, headline: guide.title, description: guide.seoDescription,
        inLanguage: 'es', datePublished: guide.datePublished, dateModified: guide.dateModified, articleSection: guide.category,
        wordCount: guide.words, keywords: guide.keyword,
        ...(img ? { image: { '@type': 'ImageObject', url: SITE_URL + img.src, width: img.width, height: img.height, creditText: img.author, license: img.licenseUrl || undefined, acquireLicensePage: img.sourceUrl } } : {}),
        author: { '@type': 'Organization', name: 'Equipo editorial HangOut', url: SITE_URL + GUIDES_BASE },
        publisher, mainEntityOfPage: { '@type': 'WebPage', '@id': SITE_URL + path },
        citation: guide.sources.map((s) => s.url),
      },
      ...(guide.faqs.length ? [{ '@type': 'FAQPage', '@id': `${SITE_URL}${path}#faq`, mainEntity: guide.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }] : []),
    ],
  };
};

// ── Static HTML for crawlers (same content the React view renders) ──────
const imgTag = (img, eager = false, cls = '') => img
  ? `<img src="${img.srcSmall}" srcset="${img.srcSmall} 800w, ${img.src} ${img.width}w" sizes="(max-width: 900px) 100vw, 1100px" width="${img.width}" height="${img.height}" alt="${esc(img.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}>`
  : '';
const credit = (img) => img ? `<p class="gd_credit">Foto: <a href="${img.sourceUrl}" rel="noopener">${esc(img.author)}</a> · <a href="${img.licenseUrl || img.sourceUrl}" rel="license noopener">${esc(img.license)}</a> · Wikimedia Commons</p>` : '';
const card = (g) => `<article class="gd_card"><a href="${guideUrl(g)}">${imgTag(g.image)}<span>${esc(g.category)}</span><h3>${esc(g.title)}</h3></a></article>`;
const blocksHtml = (blocks) => blocks.map((b) => b.type === 'list'
  ? `<${b.ordered ? 'ol' : 'ul'}${b.ordered && b.start > 1 ? ` start="${b.start}"` : ''}>${b.items.map((i) => `<li>${inlineHtml(i)}</li>`).join('')}</${b.ordered ? 'ol' : 'ul'}>`
  : `<p>${inlineHtml(b.text)}</p>`).join('');
const crumbsHtml = (bc) => `<nav aria-label="Ruta de navegación" class="gd_crumbs"><ol>${bc.map((b, i) => i < bc.length - 1 ? `<li><a href="${b.path}">${esc(b.name)}</a></li>` : `<li aria-current="page">${esc(b.name)}</li>`).join('')}</ol></nav>`;
const categoriesNav = () => `<nav aria-label="Categorías de guías" class="gd_cats"><ul>${GUIDE_CATEGORIES.map((c) => `<li><a href="${categoryUrl(c)}">${esc(c.name)}</a></li>`).join('')}</ul></nav>`;

export const guidesHtml = (page, events = []) => {
  if (page.kind === 'hub') {
    return `<main class="gd_page">${crumbsHtml(page.breadcrumbs)}<header><h1>${esc(page.h1)}</h1><p>${esc(HUB_COPY.intro)}</p></header>${categoriesNav()}${GUIDE_CATEGORIES.map((c) => `<section><h2><a href="${categoryUrl(c)}">${esc(c.name)}</a></h2><p>${esc(c.description)}</p>${guidesInCategory(c).map(card).join('')}</section>`).join('')}<p>${esc(HUB_COPY.note)}</p></main>`;
  }
  if (page.kind === 'category') {
    return `<main class="gd_page">${crumbsHtml(page.breadcrumbs)}<header><h1>${esc(page.h1)}</h1><p>${esc(page.description)}</p></header>${categoriesNav()}<section>${page.guides.map(card).join('')}</section><p><a href="${GUIDES_BASE}">Todas las guías</a></p></main>`;
  }
  const g = page.guide;
  const matched = matchGuideEvents(g, events);
  const evHtml = g.events ? `<section><h2>En la agenda de HangOut</h2>${matched.length ? `<ul>${matched.map((e) => `<li><a href="/es/events/${e.slug}/">${esc(e.title)}</a> — ${esc(e.date || '')} · ${esc(e.location || '')}</li>`).join('')}</ul>` : '<p>Ahora mismo no hay eventos publicados que coincidan con esta guía. La ausencia de un evento en HangOut no significa que no exista: consulta la agenda completa.</p>'}<p><a href="/es/">Ver la agenda completa</a></p></section>` : '';
  return `<main class="gd_page"><article>${crumbsHtml(page.breadcrumbs)}<header><p><a href="${categoryUrl(page.category)}">${esc(g.category)}</a> · ${g.readMinutes} min de lectura</p><h1>${esc(g.title)}</h1><p>Publicado <time datetime="${g.datePublished}">${g.datePublished}</time> · Revisión editorial <time datetime="${g.dateModified}">${g.dateModified}</time></p>${imgTag(g.image, true)}${credit(g.image)}</header>${blocksHtml(g.intro)}<nav aria-label="En esta guía"><ul>${g.sections.map((s) => `<li><a href="#${s.id}">${esc(s.heading)}</a></li>`).join('')}</ul></nav>${g.sections.map((s) => `<section id="${s.id}"><h2>${esc(s.heading)}</h2>${blocksHtml(s.blocks)}</section>`).join('')}${evHtml}<section><h2>Preguntas frecuentes</h2>${g.faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('')}</section><section><h2>Sigue explorando con HangOut</h2><p>${esc(g.closing)}</p>${page.related.map(card).join('')}</section><section><h2>Fuentes y consultas oficiales</h2><ul>${g.sources.map((s) => `<li><a href="${s.url}" rel="noopener">${esc(s.name)}</a></li>`).join('')}</ul><p>${esc(HUB_COPY.note)}</p></section>${categoriesNav()}</article></main>`;
};

// Spanish blog posts superseded by a guide on the same topic (301 in vercel.json too).
export const BLOG_TO_GUIDE_REDIRECTS = {
  'guia-nightlife-casco-antiguo-panama': 'vida-nocturna-casco-antiguo',
  'mejores-rooftops-vista-al-mar-panama': 'mejores-rooftops-panama',
  'como-reservar-mesa-vip-bottle-service-panama': 'experiencias-vip-reservas-mesas-panama',
};

/** Href for a blog post, pointing straight to the guide when the Spanish post was superseded. */
export const blogHref = (locale, slug) => (locale === 'es' && BLOG_TO_GUIDE_REDIRECTS[slug] ? `/es/guias/${BLOG_TO_GUIDE_REDIRECTS[slug]}/` : `/${locale}/blog/${slug}/`);

export const getAllGuidePaths = () => [GUIDES_BASE, ...GUIDE_CATEGORIES.map(categoryUrl), ...GUIDES.map(guideUrl)];
