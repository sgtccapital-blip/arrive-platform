// =========================================================================
// HANGOUT PLATFORM — SCHEMA.ORG JSON-LD GENERATOR
// Produces valid, rich Schema.org structured data for Google Search
// =========================================================================

import { BASE_CANONICAL_URL } from '../data/seoModels';

/**
 * Generates canonical Organization schema
 */
export const getOrganizationSchema = () => ({
  '@type': 'Organization',
  '@id': `${BASE_CANONICAL_URL}/#organization`,
  name: 'Hangout Panamá',
  alternateName: 'HANGOUT Platform Panama',
  url: BASE_CANONICAL_URL,
  logo: `${BASE_CANONICAL_URL}/images/hangout-logo.png`,
  description: 'Agencia de modelaje y plataforma de beneficios exclusivos de nightlife, discotecas, rooftops y concierge en Panamá.',
  sameAs: [
    'https://www.instagram.com/arrivemodels/',

  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ciudad de Panamá',
    addressRegion: 'Panamá',
    addressCountry: 'PA'
  }
});

/**
 * Generates WebSite schema
 */
export const getWebSiteSchema = (locale = 'es') => ({
  '@type': 'WebSite',
  '@id': `${BASE_CANONICAL_URL}/${locale}/#website`,
  url: `${BASE_CANONICAL_URL}/${locale}/`,
  name: 'HANGOUT Platform',
  description: 'Descubre qué hacer hoy en Panamá, discotecas, rooftops, eventos y reservas VIP.',
  publisher: {
    '@id': `${BASE_CANONICAL_URL}/#organization`
  },
  inLanguage: locale === 'es' ? 'es-PA' : 'en-US'
});

/**
 * Generates BreadcrumbList schema
 */
export const getBreadcrumbsSchema = (items = []) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => {
    const rawUrl = item.url || item.path || '/';
    const finalUrl = rawUrl.startsWith('http') 
      ? rawUrl 
      : `${BASE_CANONICAL_URL}${rawUrl.startsWith('/') ? rawUrl : '/' + rawUrl}`;
    return {
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: finalUrl
    };
  })
});

/**
 * Generates Event schema
 */
export const getEventSchema = (event, locale = 'es') => {
  if (!event) return null;
  const canonicalUrl = `${BASE_CANONICAL_URL}/${locale}/events/${event.slug || 'evento'}/`;
  const cleanVenue = (event.location || '').replace(/\s*-\s*Panamá.*$/i, '').trim();

  // Performers mapping
  const performers = (event.artists || []).map(artist => ({
    '@type': 'Person',
    name: artist.name || artist.shortName,
    jobTitle: artist.role || 'DJ / Artista',
    image: artist.avatar?.startsWith('http') ? artist.avatar : `${BASE_CANONICAL_URL}${artist.avatar}`,
    sameAs: artist.instagram || undefined
  }));

  return {
    '@type': 'Event',
    '@id': `${canonicalUrl}#event`,
    name: event.title || event.name,
    url: canonicalUrl,
    startDate: event.eventDate || undefined,
    endDate: event.eventEndDate || undefined,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: event.image?.startsWith('http') ? event.image : `${BASE_CANONICAL_URL}${event.image}`,
    description: event.description || `Evento nocturno exclusivo en ${cleanVenue}, Panamá.`,
    location: {
      '@type': 'Place',
      name: cleanVenue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address || undefined,
        addressLocality: event.city || 'Ciudad de Panamá',
        addressRegion: 'Panamá',
        addressCountry: 'PA'
      },
    },
    performer: performers.length > 0 ? performers : undefined,
    organizer: {
      '@id': `${BASE_CANONICAL_URL}/#organization`
    },
    offers: event.price != null && event.ticketUrl ? { '@type': 'Offer', price: event.price, priceCurrency: 'USD', url: event.ticketUrl } : undefined
  };
};

/**
 * Generates FAQPage schema for rich snippet accordions in Google
 */
export const getFaqSchema = (faqItems = []) => {
  if (!faqItems || faqItems.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
};

/**
 * Generates NightClub / BarOrPub schema for a Venue
 */
export const getVenueSchema = (venue, locale = 'es') => {
  if (!venue) return null;
  const canonicalUrl = `${BASE_CANONICAL_URL}/${locale}/venues/${venue.slug || 'venue'}/`;
  const isRooftop = venue.category?.toLowerCase().includes('rooftop');
  const type = isRooftop ? 'BarOrPub' : 'NightClub';

  const schemaObj = {
    '@type': [type, 'Restaurant'],
    '@id': `${canonicalUrl}#venue`,
    name: venue.name,
    url: canonicalUrl,
    image: venue.coverImage?.startsWith('http') ? venue.coverImage : `${BASE_CANONICAL_URL}${venue.coverImage}`,
    telephone: venue.phone || undefined,
    servesCuisine: venue.cuisine || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address || 'Ciudad de Panamá',
      addressLocality: venue.area || venue.city || 'Casco Antiguo',
      addressRegion: 'Panamá',
      addressCountry: 'PA'
    },
    hasMap: venue.googleMapsUrl || undefined,
    sameAs: [
      venue.googleMapsUrl,
      venue.instagramUrl,
      venue.websiteUrl
    ].filter(Boolean)
  };


  return schemaObj;
};

/**
 * Generates Restaurant schema for dining venues
 */
export const getRestaurantSchema = (restaurant, locale = 'es') => {
  if (!restaurant) return null;
  const canonicalUrl = `${BASE_CANONICAL_URL}/${locale}/restaurants/${restaurant.slug || 'restaurante'}/`;

  return {
    '@type': 'Restaurant',
    '@id': `${canonicalUrl}#restaurant`,
    name: restaurant.name,
    url: canonicalUrl,
    image: restaurant.coverImage?.startsWith('http') ? restaurant.coverImage : `${BASE_CANONICAL_URL}${restaurant.coverImage}`,
    servesCuisine: restaurant.cuisine || undefined,
    telephone: restaurant.phone || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address || 'Ciudad de Panamá',
      addressLocality: restaurant.area || 'Panamá',
      addressRegion: 'Panamá',
      addressCountry: 'PA'
    }
  };
};

/**
 * Constructs the full @graph JSON-LD structure
 */
export const buildPageGraph = ({
  locale = 'es',
  breadcrumbs = [],
  mainEntity = null,
  faqItems = null
}) => {
  const graph = [
    getOrganizationSchema(),
    getWebSiteSchema(locale)
  ];

  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push(getBreadcrumbsSchema(breadcrumbs));
  }

  if (mainEntity) {
    graph.push(mainEntity);
  }

  if (faqItems && faqItems.length > 0) {
    const faqSchema = getFaqSchema(faqItems);
    if (faqSchema) {
      graph.push(faqSchema);
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
};
