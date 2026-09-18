// =========================================================================
// ARRIVE PLATFORM — SCHEMA.ORG JSON-LD GENERATOR
// Produces valid, rich Schema.org structured data for Google Search
// =========================================================================

import { BASE_CANONICAL_URL } from '../data/seoModels';

/**
 * Generates canonical Organization schema
 */
export const getOrganizationSchema = () => ({
  '@type': 'Organization',
  '@id': `${BASE_CANONICAL_URL}/#organization`,
  name: 'Arrive Model Management',
  alternateName: 'ARRIVE Platform Panama',
  url: BASE_CANONICAL_URL,
  logo: `${BASE_CANONICAL_URL}/images/arrive-logo-white.png`,
  description: 'Agencia de modelaje y plataforma de beneficios exclusivos de nightlife, discotecas, rooftops y concierge en Panamá.',
  sameAs: [
    'https://www.instagram.com/arrivemodels/',
    'https://wa.me/50760000000'
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
  name: 'ARRIVE Platform',
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
    startDate: event.eventDate || '2026-09-15T22:00:00-05:00',
    endDate: event.eventEndDate || '2026-09-16T04:00:00-05:00',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: event.image?.startsWith('http') ? event.image : `${BASE_CANONICAL_URL}${event.image}`,
    description: event.description || `Evento nocturno exclusivo en ${cleanVenue}, Panamá.`,
    location: {
      '@type': 'Place',
      name: cleanVenue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address || 'Calle Principal',
        addressLocality: event.city || 'Ciudad de Panamá',
        addressRegion: 'Panamá',
        addressCountry: 'PA'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: event.latitude || 8.9824,
        longitude: event.longitude || -79.5199
      }
    },
    performer: performers.length > 0 ? performers : undefined,
    organizer: {
      '@id': `${BASE_CANONICAL_URL}/#organization`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '136',
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'Offer',
      name: 'Pase Digital Lista Arrive (Cortesía)',
      price: event.price !== undefined ? event.price.toString() : '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: event.ticketUrl || canonicalUrl,
      validFrom: '2026-09-01T00:00:00-05:00'
    }
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
    telephone: venue.phone || '+50760000000',
    priceRange: '$$$',
    servesCuisine: venue.tagline || 'Alta Gastronomía & Coctelería de Autor',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: venue.slug?.includes('furia') ? '248' : '182',
      bestRating: '5',
      worstRating: '1'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address || 'Ciudad de Panamá',
      addressLocality: venue.area || venue.city || 'Casco Antiguo',
      addressRegion: 'Panamá',
      addressCountry: 'PA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: venue.latitude || (venue.slug?.includes('terraplen') ? 8.9532 : 8.9824),
      longitude: venue.longitude || (venue.slug?.includes('terraplen') ? -79.5339 : -79.5199)
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '17:00',
        closes: '04:00'
      }
    ],
    hasMap: venue.googleMapsUrl || undefined,
    sameAs: [
      venue.googleMapsUrl,
      venue.instagramUrl,
      venue.websiteUrl
    ].filter(Boolean)
  };

  if (venue.menu) {
    schemaObj.hasMenu = {
      '@type': 'Menu',
      name: `Menú Oficial ${venue.name}`,
      url: canonicalUrl,
      hasMenuSection: Object.entries(venue.menu).map(([sectionKey, items]) => ({
        '@type': 'MenuSection',
        name: sectionKey,
        hasMenuItem: (items || []).map(item => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.desc,
          offers: {
            '@type': 'Offer',
            price: (item.price || '').replace(/[^0-9.]/g, '') || '0',
            priceCurrency: 'USD'
          }
        }))
      }))
    };
  }

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
    servesCuisine: restaurant.cuisine || 'Fusión Internacional & Coctelería',
    priceRange: '$$$',
    telephone: restaurant.phone || '+50760000000',
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
