// =========================================================================
// HANGOUT PLATFORM — HEAD & METADATA MANAGER
// Dynamically synchronizes document title, canonical, meta, OG & JSON-LD
// =========================================================================

import { BASE_CANONICAL_URL } from '../data/seoModels';
import { buildPageGraph } from './schemaGenerator';
import { getAlternatePath } from './i18n';

/**
 * Helper to update or create an HTML tag in document.head
 */
const setMetaTag = (selector, attribute, value) => {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement(selector.startsWith('meta') ? 'meta' : (selector.startsWith('link') ? 'link' : 'div'));
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
};

/**
 * Updates full head metadata for current page view
 */
export const updateHeadMetadata = ({
  title,
  description,
  canonicalUrl,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1',
  ogImage = `${BASE_CANONICAL_URL}/images/right-nav.avif`,
  ogType = 'website',
  locale = 'es',
  pathname = '/',
  breadcrumbs = [],
  mainEntity = null,
  faqItems = null,
  // Optional: languages that really exist for this page (e.g. ['es'] for Spanish-only guides)
  alternateLocales = ['es', 'en'],
  // Optional: page-specific schema nodes that replace the generic graph builder
  schemaNodes = null
}) => {
  if (typeof document === 'undefined') return;

  document.documentElement.lang = locale;
  document.querySelectorAll('script[type="application/ld+json"]:not(#arrive-dynamic-jsonld)').forEach(el => el.remove());
  document.querySelectorAll('meta[name="title"], meta[name="keywords"], meta[property="og:image:alt"], meta[property="og:image:width"], meta[property="og:image:height"]').forEach(el => el.remove());
  ogImage = new URL(ogImage, BASE_CANONICAL_URL).href;
  if (/\/panama\/(?:events\/(?:today|tomorrow|weekend|this-weekend)|casco-viejo\/|nightlife|clubs|rooftops|casco-antiguo|parties|restaurants|events\/)/.test(pathname)) robots = 'noindex, follow';
  // 1. Document Title
  if (title) {
    document.title = title;
  }

  // 2. Meta Description
  if (description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;
  }

  // 3. Robots
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    document.head.appendChild(metaRobots);
  }
  metaRobots.content = robots;

  // 4. Canonical Link
  const fullCanonical = canonicalUrl || `${BASE_CANONICAL_URL}${pathname}`;
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.rel = 'canonical';
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.href = fullCanonical;

  // 5. Hreflang Alternates
  const esUrl = `${BASE_CANONICAL_URL}${getAlternatePath(pathname, 'es')}`;
  const enUrl = `${BASE_CANONICAL_URL}${getAlternatePath(pathname, 'en')}`;

  const setHrefLang = (lang, href) => {
    let el = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
    if (!el) {
      el = document.createElement('link');
      el.rel = 'alternate';
      el.hreflang = lang;
      document.head.appendChild(el);
    }
    el.href = href;
  };

  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => {
    if (el.hreflang !== 'x-default' && !alternateLocales.includes(el.hreflang)) el.remove();
  });
  if (alternateLocales.includes('es')) setHrefLang('es', esUrl);
  if (alternateLocales.includes('en')) setHrefLang('en', enUrl);
  setHrefLang('x-default', alternateLocales.includes('es') ? esUrl : enUrl);

  // 6. Open Graph Tags
  const setOg = (property, content) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  setOg('og:title', title || document.title);
  setOg('og:description', description || '');
  setOg('og:url', fullCanonical);
  setOg('og:image', ogImage);
  setOg('og:type', ogType);
  setOg('og:locale', locale === 'es' ? 'es_PA' : 'en_US');
  setOg('og:site_name', 'HANGOUT Platform');

  // 7. Twitter Tags
  const setTwitter = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.name = name;
      document.head.appendChild(el);
    }
    el.content = content;
  };

  setTwitter('twitter:url', fullCanonical);
  setTwitter('twitter:card', 'summary_large_image');
  setTwitter('twitter:title', title || document.title);
  setTwitter('twitter:description', description || '');
  setTwitter('twitter:image', ogImage);

  // 8. Dynamic Schema.org JSON-LD Injection
  const graph = schemaNodes
    ? { '@context': 'https://schema.org', '@graph': schemaNodes }
    : buildPageGraph({
      locale,
      breadcrumbs,
      mainEntity,
      faqItems
    });

  let jsonLdScript = document.getElementById('arrive-dynamic-jsonld');
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'arrive-dynamic-jsonld';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }
  jsonLdScript.textContent = JSON.stringify(graph, null, 2);
};
