// =========================================================================
// ARRIVE PLATFORM — ROUTE DEFINITIONS & CANONICAL REGISTRY
// Centralized mapping of all semantic URLs in the platform
// =========================================================================

import { SEO_CATEGORY_HUBS } from '../data/seoModels';

/**
 * Parses a raw URL pathname into structured route parameters
 */
export const parseRoute = (pathname = '/') => {
  // Normalize pathname: ensure leading slash, remove trailing query/hash
  let path = pathname.split('?')[0].split('#')[0];
  if (!path.startsWith('/')) path = '/' + path;
  if (!path.endsWith('/')) path = path + '/';

  // Extract locale
  const segments = path.split('/').filter(Boolean);
  let locale = 'es';
  let cleanSegments = [...segments];

  if (segments[0] === 'en' || segments[0] === 'es') {
    locale = segments[0];
    cleanSegments = segments.slice(1);
  }

  const normalizedPath = `/${cleanSegments.join('/')}${cleanSegments.length ? '/' : ''}`;

  // 1. Root / Home
  if (cleanSegments.length === 0) {
    return {
      type: 'home',
      locale,
      path: `/${locale}/`,
      canonicalPath: `/${locale}/`,
      params: {}
    };
  }

  // 2. Events Singular: /events/:slug/ or /panama/events/:slug/
  if ((cleanSegments[0] === 'events' && cleanSegments[1]) || 
      (cleanSegments[0] === 'panama' && cleanSegments[1] === 'events' && cleanSegments[2] && cleanSegments[2] !== 'today' && cleanSegments[2] !== 'tomorrow' && cleanSegments[2] !== 'weekend' && cleanSegments[2] !== 'this-weekend')) {
    const eventSlug = cleanSegments[0] === 'panama' ? cleanSegments[2] : cleanSegments[1];
    return {
      type: 'event',
      locale,
      path,
      canonicalPath: `/${locale}/panama/events/${eventSlug}/`,
      params: { eventSlug }
    };
  }

  // 3. Venues List Hub: /venues/ or /panama/venues/ (no slug)
  if ((cleanSegments[0] === 'venues' && !cleanSegments[1]) || 
      (cleanSegments[0] === 'panama' && cleanSegments[1] === 'venues' && !cleanSegments[2])) {
    return {
      type: 'venues_list',
      locale,
      path,
      canonicalPath: `/${locale}/panama/venues/`,
      params: {}
    };
  }

  // 4. Venues Singular: /venues/:slug/ or /panama/venues/:slug/
  if ((cleanSegments[0] === 'venues' && cleanSegments[1]) ||
      (cleanSegments[0] === 'panama' && cleanSegments[1] === 'venues' && cleanSegments[2])) {
    const venueSlug = cleanSegments[0] === 'panama' ? cleanSegments[2] : cleanSegments[1];
    return {
      type: 'venue',
      locale,
      path,
      canonicalPath: `/${locale}/venues/${venueSlug}/`,
      params: { venueSlug }
    };
  }

  // 5. Concierge & Services: /concierge/ or /panama/concierge/ or sub-sections
  if (cleanSegments[0] === 'concierge' || (cleanSegments[0] === 'panama' && cleanSegments[1] === 'concierge')) {
    const section = cleanSegments[0] === 'panama' ? cleanSegments[2] : cleanSegments[1];
    return {
      type: 'concierge',
      locale,
      path,
      canonicalPath: `/${locale}/panama/concierge/${section ? section + '/' : ''}`,
      params: { section: section || null }
    };
  }

  // 6. Blog & Nightlife Guide: /blog/ or /blog/:slug/
  if (cleanSegments[0] === 'blog') {
    if (cleanSegments[1]) {
      return {
        type: 'blog_post',
        locale,
        path,
        canonicalPath: `/${locale}/blog/${cleanSegments[1]}/`,
        params: { postSlug: cleanSegments[1] }
      };
    }
    return {
      type: 'blog_list',
      locale,
      path,
      canonicalPath: `/${locale}/blog/`,
      params: {}
    };
  }

  // 6.1 Directory & All Pages Hub / Explore Panama:
  if (
    cleanSegments[0] === 'directory' || 
    cleanSegments[0] === 'directorio' || 
    cleanSegments[0] === 'explore' || 
    cleanSegments[0] === 'explore-panama' || 
    cleanSegments[0] === 'explora' || 
    cleanSegments[0] === 'explora-panama'
  ) {
    return {
      type: 'directory',
      locale,
      path,
      canonicalPath: `/${locale}/explore/`,
      params: {}
    };
  }

  // 6.2 Institutional / Legal / Company Pages:
  const INFO_MAP = {
    'cookies': 'cookies',
    'privacy': 'privacy',
    'privacidad': 'privacy',
    'terms': 'terms-and-conditions',
    'terms-and-conditions': 'terms-and-conditions',
    'terminos': 'terms-and-conditions',
    'terminos-y-condiciones': 'terms-and-conditions',
    'work-with-us': 'work-with-us',
    'trabaja-con-nosotros': 'work-with-us',
    'jobs': 'work-with-us',
    'whistleblowing': 'whistleblowing',
    'canal-etico': 'whistleblowing',
    'contact': 'contact-us',
    'contact-us': 'contact-us',
    'contacto': 'contact-us',
    'locations': 'contact-us',
    'press': 'press',
    'prensa': 'press'
  };

  if (INFO_MAP[cleanSegments[0]]) {
    const infoSlug = INFO_MAP[cleanSegments[0]];
    return {
      type: 'info_page',
      infoSlug,
      locale,
      path,
      canonicalPath: `/${locale}/${infoSlug}/`,
      params: { infoSlug }
    };
  }

  // 4. Restaurants Singular: /restaurants/:slug/
  if (cleanSegments[0] === 'restaurants' && cleanSegments[1]) {
    return {
      type: 'restaurant',
      locale,
      path,
      canonicalPath: `/${locale}/restaurants/${cleanSegments[1]}/`,
      params: { restaurantSlug: cleanSegments[1] }
    };
  }

  // 5. Category Hubs: /panama/:category/ or /panama/casco-viejo/:category/ or /panama/events/today/
  if (cleanSegments[0] === 'panama') {
    // Casco Viejo sub-hub: /panama/casco-viejo/:category/
    if (cleanSegments[1] === 'casco-viejo' && cleanSegments[2]) {
      const hubKey = `casco-viejo-${cleanSegments[2]}`;
      return {
        type: 'hub',
        hubKey,
        locale,
        path,
        canonicalPath: `/${locale}/panama/casco-viejo/${cleanSegments[2]}/`,
        params: { area: 'casco-viejo', category: cleanSegments[2] }
      };
    }

    // Temporal sub-hubs: /panama/events/today/, /tomorrow/, /weekend/, /this-weekend/
    if (cleanSegments[1] === 'events' && cleanSegments[2]) {
      const filter = cleanSegments[2] === 'this-weekend' ? 'weekend' : cleanSegments[2];
      const hubKey = `events-${filter}`;
      return {
        type: 'temporal_hub',
        hubKey,
        locale,
        path,
        canonicalPath: `/${locale}/panama/events/${cleanSegments[2]}/`,
        params: { temporalFilter: cleanSegments[2] }
      };
    }

    // General panama hubs: /panama/:category/
    if (cleanSegments[1]) {
      let cat = cleanSegments[1];
      if (cat === 'casco-viejo') cat = 'casco-antiguo';
      const hubKey = `panama-${cat}`;
      return {
        type: 'hub',
        hubKey,
        locale,
        path,
        canonicalPath: `/${locale}/panama/${cleanSegments[1]}/`,
        params: { category: cleanSegments[1] }
      };
    }
  }

  // Fallback: Default to home with current locale
  return {
    type: 'home',
    locale,
    path: `/${locale}/`,
    canonicalPath: `/${locale}/`,
    params: {}
  };
};

/**
 * Returns list of all canonical routes to prerender and generate in sitemaps
 */
export const getAllCanonicalRoutes = (events = [], venues = []) => {
  const routes = [];
  const locales = ['es', 'en'];

  locales.forEach(loc => {
    // 1. Home
    routes.push({ path: `/${loc}/`, priority: 1.0, changefreq: 'daily' });

    // 2. Main Hubs
    Object.values(SEO_CATEGORY_HUBS).forEach(hub => {
      routes.push({ path: `/${loc}${hub.path}`, priority: 0.9, changefreq: 'daily' });
    });

    // 3. Venues
    venues.forEach(v => {
      const slug = v.slug || toSlug(v.shortName || v.name);
      routes.push({ path: `/${loc}/venues/${slug}/`, priority: 0.8, changefreq: 'weekly', entity: v, entityType: 'venue' });
    });

    // 4. Events
    events.forEach(e => {
      const slug = e.slug || toSlug(e.title || e.name);
      routes.push({ path: `/${loc}/events/${slug}/`, priority: 0.7, changefreq: 'weekly', entity: e, entityType: 'event' });
    });

    // 5. Restaurants
    venues.filter(v => v.menu).forEach(v => {
      const slug = v.slug || toSlug(v.shortName || v.name);
      routes.push({ path: `/${loc}/restaurants/${slug}/`, priority: 0.8, changefreq: 'weekly', entity: v, entityType: 'restaurant' });
    });

    // 6. Blog & Guides
    routes.push({ path: `/${loc}/blog/`, priority: 0.85, changefreq: 'weekly' });
    routes.push({ path: `/${loc}/blog/guia-nightlife-casco-antiguo-panama/`, priority: 0.8, changefreq: 'monthly' });
    routes.push({ path: `/${loc}/blog/como-reservar-mesa-vip-bottle-service-panama/`, priority: 0.8, changefreq: 'monthly' });
    routes.push({ path: `/${loc}/blog/mejores-rooftops-vista-al-mar-panama/`, priority: 0.8, changefreq: 'monthly' });
    routes.push({ path: `/${loc}/blog/dress-code-discotecas-clubs-panama/`, priority: 0.8, changefreq: 'monthly' });

    // 7. Directory & Legal Pages
    routes.push({ path: `/${loc}/explore/`, priority: 0.85, changefreq: 'weekly' });
    routes.push({ path: `/${loc}/directorio/`, priority: 0.85, changefreq: 'weekly' });
    routes.push({ path: `/${loc}/cookies/`, priority: 0.5, changefreq: 'yearly' });
    routes.push({ path: `/${loc}/privacy/`, priority: 0.5, changefreq: 'yearly' });
    routes.push({ path: `/${loc}/terms-and-conditions/`, priority: 0.5, changefreq: 'yearly' });
    routes.push({ path: `/${loc}/work-with-us/`, priority: 0.7, changefreq: 'monthly' });
    routes.push({ path: `/${loc}/whistleblowing/`, priority: 0.5, changefreq: 'yearly' });
    routes.push({ path: `/${loc}/contact-us/`, priority: 0.75, changefreq: 'monthly' });
    routes.push({ path: `/${loc}/press/`, priority: 0.6, changefreq: 'monthly' });
  });

  return routes;
};
