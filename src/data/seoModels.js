// =========================================================================
// ARRIVE PLATFORM — SEO CONTENT MODELS & HELPERS
// Centralized taxonomy, entities enrichment and semantic helpers for Panama
// =========================================================================

export const BASE_CANONICAL_URL = 'https://arrivepanama.com';

/**
 * Converts any string into a clean, lowercased, URL-safe slug
 */
export const toSlug = (text = '') => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/**
 * Hubs and Category Taxonomies with localized titles & descriptions
 */
export const SEO_CATEGORY_HUBS = {
  'panama-nightlife': {
    id: 'panama-nightlife',
    path: '/panama/nightlife/',
    es: {
      title: 'Nightlife en Panamá | Clubs, Rooftops y Fiestas | ARRIVE',
      h1: 'Nightlife en Panamá',
      description: 'Descubre el nightlife de Ciudad de Panamá: discotecas, rooftops, fiestas, eventos exclusivos, listas de invitados y experiencias VIP.',
      intro: 'Ciudad de Panamá tiene una de las escenas nocturnas más dinámicas de Latinoamérica. Desde rooftops en Casco Viejo y cenas que se convierten en fiesta hasta clubs de reggaetón, electrónica, afro y música urbana, cada noche ofrece un plan diferente.\n\nARRIVE reúne los eventos, venues y experiencias que vale la pena conocer, con información actualizada sobre fiestas, horarios, beneficios, guest lists, entradas y reservas VIP.',
      secondaryText: '¿Buscas dónde salir en Panamá esta noche? Explora nuestra selección de clubs, rooftops, restaurantes y eventos en Ciudad de Panamá y encuentra el plan perfecto según el día, el ambiente y el tipo de música.'
    },
    en: {
      title: 'Panama City Nightlife | Clubs, Rooftops and Parties | ARRIVE',
      h1: 'Nightlife in Panama City',
      description: 'Discover Panama City nightlife: clubs, rooftops, parties, exclusive events, guest lists and VIP experiences.',
      intro: 'Panama City has one of the most dynamic nightlife scenes in Latin America. From rooftops in Casco Viejo and dinner parties to reggaeton, electronic, afro and urban music clubs, every night offers something unique.\n\nARRIVE brings together the events, venues and experiences worth exploring with updated guest lists, tickets and VIP table reservations.',
      secondaryText: 'Looking for where to go tonight in Panama City? Explore our curated selection of clubs, rooftops, dining and parties to find the perfect plan.'
    },
    filterCategory: 'all'
  },
  'panama-clubs': {
    id: 'panama-clubs',
    path: '/panama/clubs/',
    es: {
      title: 'Discotecas y Clubs en Panamá | Entradas y Mesas VIP',
      h1: 'Clubs y Discotecas en Panamá',
      description: 'Encuentra las mejores discotecas y clubs de Ciudad de Panamá. Consulta fiestas, música, guest lists, entradas y reservas de mesas VIP.',
      intro: 'Descubre los clubs y discotecas más destacados de Ciudad de Panamá, desde espacios de música urbana y reggaetón hasta conceptos de electrónica, afro house y experiencias híbridas de dinner & party.\n\nConsulta qué está pasando cada noche, descubre los DJs y conceptos de la semana, accede a listas de invitados y encuentra opciones de mesas, botellas y experiencias VIP.\n\nARRIVE te ayuda a decidir dónde salir antes de llegar a la puerta.'
    },
    en: {
      title: 'Nightclubs and Dance Clubs in Panama City | VIP Tables',
      h1: 'Clubs & Nightclubs in Panama City',
      description: 'Find the best nightclubs in Panama City. Explore parties, music styles, guest lists, tickets, and VIP table bookings.',
      intro: 'Discover Panama City’s top nightclubs, from urban and reggaeton clubs to electronic and afro house vibes. Explore guest lists, bottles and VIP table reservations with ARRIVE.'
    },
    filterCategory: 'Nightclub & Restaurant'
  },
  'panama-rooftops': {
    id: 'panama-rooftops',
    path: '/panama/rooftops/',
    es: {
      title: 'Rooftops en Panamá | Terrazas y Vistas en Casco Viejo',
      h1: 'Rooftops en Panamá',
      description: 'Descubre los mejores rooftops de Ciudad de Panamá y Casco Viejo para sunsets, cócteles, cenas, fiestas y reservas de mesas VIP.',
      intro: 'Los rooftops de Ciudad de Panamá combinan vistas al skyline, arquitectura histórica, gastronomía, cócteles y una escena nocturna que comienza desde el atardecer.\n\nCasco Viejo —también conocido como Casco Antiguo— concentra algunos de los rooftops más buscados de la ciudad, ideales para sunset drinks, cenas, celebraciones y fiestas que continúan hasta tarde.\n\nCon ARRIVE puedes descubrir qué rooftop visitar, qué eventos están activos y dónde reservar mesa para cada noche.'
    },
    en: {
      title: 'Panama City Rooftops | Terraces and Ocean Views in Casco Viejo',
      h1: 'Rooftops in Panama City',
      description: 'Discover the best rooftops in Panama City and Casco Viejo for golden hour sunsets, cocktails, dinners, parties and VIP tables.',
      intro: 'Panama City rooftops blend modern skyline views, historic architecture, dining, cocktails, and a nightlife scene starting at golden hour.\n\nCasco Viejo features some of the city’s most sought-after terraces for sunset drinks, celebrations and late-night parties.'
    },
    filterCategory: 'Rooftop Lounge'
  },
  'panama-casco-antiguo': {
    id: 'panama-casco-antiguo',
    path: '/panama/casco-antiguo/',
    es: {
      title: 'Casco Viejo Panamá | Rooftops, Bares y Discotecas',
      h1: 'Nightlife en Casco Viejo, Panamá',
      description: 'Descubre qué hacer de noche en Casco Viejo, Panamá: rooftops, bares, restaurantes, discotecas, música y fiestas seleccionadas por ARRIVE.',
      intro: 'Casco Viejo es uno de los principales destinos de nightlife en Ciudad de Panamá. Sus calles históricas concentran rooftops con vistas a la bahía, restaurantes de autor, cocktail bars, lounges y clubs a pocos minutos unos de otros.\n\nLa noche puede comenzar con una cena o un sunset y continuar entre terrazas, música en vivo y fiestas hasta la madrugada.\n\nExplora con ARRIVE los mejores lugares, eventos y experiencias del Casco Antiguo de Panamá.'
    },
    en: {
      title: 'Casco Viejo Panama | Rooftops, Bars and Clubs',
      h1: 'Nightlife in Casco Viejo, Panama',
      description: 'Discover what to do at night in Casco Viejo, Panama: rooftops, cocktail bars, restaurants, clubs, and parties curated by ARRIVE.',
      intro: 'Casco Viejo is one of the premier nightlife destinations in Panama City. Its colonial streets concentrate rooftops overlooking the bay, signature dining, cocktail bars, lounges and clubs within steps of each other.'
    },
    filterCategory: 'all'
  },
  'casco-viejo-nightlife': {
    id: 'casco-viejo-nightlife',
    path: '/panama/casco-viejo/nightlife/',
    es: {
      title: 'Casco Viejo Panamá | Rooftops, Bares y Discotecas',
      h1: 'Nightlife en Casco Viejo, Panamá',
      description: 'Descubre qué hacer de noche en Casco Viejo, Panamá: rooftops, bares, restaurantes, discotecas, música y fiestas seleccionadas por ARRIVE.',
      intro: 'Casco Viejo es uno de los principales destinos de nightlife en Ciudad de Panamá. Sus calles históricas concentran rooftops con vistas a la bahía, restaurantes de autor, cocktail bars, lounges y clubs a pocos minutos unos de otros.'
    },
    en: {
      title: 'Casco Viejo Panama | Rooftops, Bars and Clubs',
      h1: 'Nightlife in Casco Viejo, Panama',
      description: 'Discover what to do at night in Casco Viejo, Panama: rooftops, cocktail bars, restaurants, clubs, and parties curated by ARRIVE.',
      intro: 'Casco Viejo is one of the premier nightlife destinations in Panama City. Its colonial streets concentrate rooftops overlooking the bay, signature dining, cocktail bars, lounges and clubs.'
    },
    filterCategory: 'all'
  },
  'casco-viejo-rooftops': {
    id: 'casco-viejo-rooftops',
    path: '/panama/casco-viejo/rooftops/',
    es: {
      title: 'Rooftops en Casco Viejo Panamá — Terrazas con Vista al Mar | ARRIVE',
      h1: 'Mejores Rooftops en Casco Viejo Panamá',
      description: 'Las terrazas y rooftops más icónicos de Casco Antiguo: Terraplén Rooftop y Cielo. Vista al skyline moderno, brisa marina y música en vivo.',
      intro: 'Ver el atardecer sobre el Océano Pacífico con una copa en mano y el skyline de Panamá de fondo es el ritual obligatorio en Casco Antiguo.'
    },
    en: {
      title: 'Rooftop Bars in Casco Viejo Panama — Ocean & Skyline Views | ARRIVE',
      h1: 'Best Rooftops in Casco Viejo Panama',
      description: 'Iconic rooftop terraces in Casco Antiguo: Terraplen and Cielo. Panoramic views of modern Panama skyline, ocean breezes and top DJ sets.',
      intro: 'Watching the sunset over the Pacific Ocean with craft cocktails and DJ beats is the quintessential Casco Viejo experience.'
    },
    filterCategory: 'Rooftop Lounge'
  },
  'events-today': {
    id: 'events-today',
    path: '/panama/events/today/',
    es: {
      title: 'Fiestas Hoy en Panamá | Eventos y Nightlife Esta Noche',
      h1: 'Fiestas y Eventos Hoy en Panamá',
      description: 'Descubre qué hacer hoy en Ciudad de Panamá. Fiestas, clubs, rooftops, eventos, listas de invitados y beneficios disponibles esta noche.',
      intro: '¿Buscas qué hacer hoy en Panamá? Aquí encontrarás las fiestas, cenas, rooftops y eventos activos esta noche en Ciudad de Panamá.\n\nConsulta horarios, venue, música, dress code, beneficios disponibles, guest lists y opciones de reserva antes de elegir tu plan.\n\nLa agenda se actualiza constantemente para mostrar únicamente experiencias relevantes para hoy.',
      secondaryText: 'Desde after office y sunsets hasta cenas, reggaetón, afro house y late-night parties, descubre dónde salir hoy en Ciudad de Panamá con ARRIVE.'
    },
    en: {
      title: 'Parties & Events Tonight in Panama City | ARRIVE',
      h1: 'Parties and Events Tonight in Panama City',
      description: 'Discover things to do tonight in Panama City. Clubs, rooftops, dinner parties, guest lists and VIP perks available tonight.',
      intro: 'Looking for what to do tonight in Panama City? Find active parties, rooftop sunsets, and curated nightlife events for tonight.\n\nCheck door times, venue details, music genre, dress codes, guest lists, and reservation options before heading out.',
      secondaryText: 'From golden hour sunsets to late-night clubbing and reggaeton, find where to go tonight with ARRIVE.'
    },
    filterCategory: 'today'
  },
  'events-weekend': {
    id: 'events-weekend',
    path: '/panama/events/weekend/',
    es: {
      title: 'Eventos Este Fin de Semana en Panamá | Fiestas y Clubs',
      h1: 'Eventos del Fin de Semana en Panamá',
      description: 'Descubre fiestas y eventos este fin de semana en Ciudad de Panamá: clubs, rooftops, cenas, guest lists y experiencias VIP de jueves a domingo.',
      intro: 'Planea tu fin de semana en Ciudad de Panamá con una selección de fiestas, rooftops, cenas y experiencias desde el jueves hasta el domingo.\n\nDescubre dónde salir, qué música encontrarás, cuáles son los eventos más importantes de la semana y qué beneficios o accesos están disponibles.\n\nARRIVE reúne los planes que vale la pena conocer para que puedas organizar toda tu noche desde un solo lugar.'
    },
    en: {
      title: 'Weekend Events in Panama City | Parties and Nightclubs',
      h1: 'Weekend Events in Panama City',
      description: 'Discover weekend parties in Panama City: clubs, rooftops, dining, guest lists and VIP table experiences from Thursday to Sunday.',
      intro: 'Plan your weekend in Panama City with a curated selection of parties, rooftops, and nightlife from Thursday through Sunday.\n\nFind where to go, what music is playing, and what perks are active across Panama City.'
    },
    filterCategory: 'weekend'
  },
  'events-this-weekend': {
    id: 'events-this-weekend',
    path: '/panama/events/this-weekend/',
    es: {
      title: 'Eventos Este Fin de Semana en Panamá | Fiestas y Clubs',
      h1: 'Eventos del Fin de Semana en Panamá',
      description: 'Descubre fiestas y eventos este fin de semana en Ciudad de Panamá: clubs, rooftops, cenas, guest lists y experiencias VIP de jueves a domingo.',
      intro: 'Planea tu fin de semana en Ciudad de Panamá con una selección de fiestas, rooftops, cenas y experiencias desde el jueves hasta el domingo.'
    },
    en: {
      title: 'Weekend Events in Panama City | Parties and Nightclubs',
      h1: 'Weekend Events in Panama City',
      description: 'Discover weekend parties in Panama City: clubs, rooftops, dining, guest lists and VIP table experiences from Thursday to Sunday.',
      intro: 'Plan your weekend in Panama City with a curated selection of parties, rooftops, and nightlife from Thursday through Sunday.'
    },
    filterCategory: 'weekend'
  },
  'panama-venues': {
    id: 'panama-venues',
    path: '/panama/venues/',
    es: {
      title: 'Clubs, Rooftops y Restaurantes en Panamá | ARRIVE',
      h1: 'Clubs, Rooftops & Restaurantes en Panamá',
      subtitle: '🍸 CLUBS & DISCOTECAS • 🌆 ROOFTOPS EN CASCO VIEJO • 🍽️ RESTAURANTES & MESAS VIP',
      description: 'Explora clubs, rooftops y restaurantes de Ciudad de Panamá. Fotos, eventos, menús, ubicación y opciones para reservar mesas VIP.',
      intro: 'Descubre los venues más destacados de Ciudad de Panamá y Casco Viejo. Explora clubs, rooftops, restaurantes y espacios de nightlife antes de visitarlos.\n\nConsulta fotografías, ambiente, tipo de música, eventos activos, menús, ubicación y opciones de reserva para encontrar el venue perfecto para cada noche.'
    },
    en: {
      title: 'Clubs, Rooftops and Restaurants in Panama City | ARRIVE',
      h1: 'Clubs, Rooftops & Restaurants in Panama',
      subtitle: '🍸 CLUBS & NIGHTCLUBS • 🌆 CASCO VIEJO ROOFTOPS • 🍽️ DINING & VIP TABLES',
      description: 'Explore nightclubs, rooftops and restaurants in Panama City. Photos, events, menus, addresses and VIP table booking options.',
      intro: 'Discover the most prominent venues in Panama City and Casco Viejo. Explore clubs, rooftops, restaurants and nightlife spots before arriving.'
    },
    filterCategory: 'all'
  },
  'panama-concierge': {
    id: 'panama-concierge',
    path: '/panama/concierge/',
    es: {
      title: 'Concierge VIP Panamá | Yates, Chauffeur & Reservas',
      h1: 'Concierge & VIP Services en Panamá',
      subtitle: '🍽️ RESTAURANTES • 🚗 CHAUFFEUR PRIVADO • 🛥️ YATES • 🏙️ ESTADÍAS PREMIUM',
      description: 'Concierge en Ciudad de Panamá para reservas de restaurantes, transporte privado, alquiler de yates, nightlife y estadías premium.',
      intro: 'Vive Ciudad de Panamá con un servicio de concierge diseñado para organizar experiencias de principio a fin.\n\nARRIVE conecta restaurantes, nightlife, transporte privado, charters de yates y estadías premium para viajeros, grupos y clientes que buscan comodidad, acceso y atención personalizada.\n\nDesde una reserva para cenar hasta la organización completa de un fin de semana en Panamá, nuestro equipo puede ayudarte a coordinar cada parte de la experiencia.'
    },
    en: {
      title: 'Panama VIP Concierge | Yacht Charters, Chauffeurs & Bookings',
      h1: 'Concierge & VIP Services in Panama City',
      subtitle: '🍽️ RESTAURANTS • 🚗 PRIVATE CHAUFFEUR • 🛥️ YACHTS • 🏙️ PREMIUM STAYS',
      description: 'Panama City concierge for restaurant reservations, private chauffeur transport, yacht charters, nightlife and luxury accommodations.',
      intro: 'Experience Panama City with bespoke concierge services designed to organize your itinerary from start to finish.\n\nARRIVE connects top restaurants, nightlife, private chauffeur transport, luxury yacht charters, and premium stays.'
    },
    filterCategory: 'all'
  },
  'panama-parties': {
    id: 'panama-parties',
    path: '/panama/parties/',
    es: {
      title: 'Fiestas en Panamá — Ladies Night, Boiler Style & Perreo | ARRIVE',
      h1: 'Fiestas y Rumbas Oficiales en Panamá',
      description: 'La cartelera semanal de fiestas en Panamá: Ladies Night con Open Gin & Sangría, sesiones Boiler 360° y perreo viejito en Terraplén y Furia.',
      intro: 'Cada noche de la semana ofrece una temática única en Panamá: desde After Parties exclusivas hasta noches de reggaeton retro bajo las estrellas.'
    },
    en: {
      title: 'Parties & Nightlife Events in Panama City | ARRIVE',
      h1: 'Official Parties & Nightlife in Panama',
      description: 'Weekly parties in Panama City: Ladies Night with complimentary Open Gin & Sangria, Boiler 360° sessions and old-school reggaeton nights.',
      intro: 'Discover Panama City’s most exciting weekly parties, curated by Arrive Model Management with free guest list entry and VIP tables.'
    },
    filterCategory: 'all'
  },
  'panama-events': {
    id: 'panama-events',
    path: '/panama/events/',
    es: {
      title: 'Eventos en Panamá — Calendario Oficial de Fiestas y Conciertos | ARRIVE',
      h1: 'Calendario de Eventos en Panamá',
      description: 'Consulta los próximos eventos, fiestas oficiales y shows en Ciudad de Panamá. Pases digitales gratuitos con código QR y reservas VIP directas.',
      intro: 'Tu guía actualizada en tiempo real con los mejores eventos de la semana en Panamá. Accede a pases digitales oficiales sin intermediarios.'
    },
    en: {
      title: 'Panama City Events Calendar — Parties, DJs & Shows | ARRIVE',
      h1: 'Events Calendar in Panama City',
      description: 'Check upcoming nightlife events, DJ sessions and official after-parties in Panama City. Free digital QR passes and instant VIP table bookings.',
      intro: 'Your real-time guide to the hottest nightlife events in Panama City. Claim your digital guest list pass and enjoy complimentary perks.'
    },
    filterCategory: 'all'
  },
  'panama-restaurants': {
    id: 'panama-restaurants',
    path: '/panama/restaurants/',
    es: {
      title: 'Restaurantes en Panamá — Cena Gourmet, Sushi & Tapas en Casco | ARRIVE',
      h1: 'Restaurantes y Cena Gourmet en Panamá',
      description: 'Gastronomía de autor, cocina fusión japonesa, sushi bar y tapas en los restaurantes oficiales de la plataforma Arrive en Casco Antiguo y Bella Vista.',
      intro: 'Comienza tu noche con experiencias culinarias excepcionales: robata grill y wagyu en Furia, tapas frente al mar en Terraplén o cena con piano en directo.'
    },
    en: {
      title: 'Best Restaurants in Panama City — Dinner & Nightlife | ARRIVE',
      h1: 'Restaurants & Dining Experiences in Panama City',
      description: 'Gourmet dining, Japanese fusion, sushi bars and ocean-view tapas at Arrive official partner venues in Casco Viejo and Bella Vista.',
      intro: 'Elevate your evening with exceptional gastronomy before the party starts: robata grills, fresh sushi, and signature mixology.'
    },
    filterCategory: 'all'
  }
};

/**
 * Enriches an Event entity with canonical SEO fields
 */
export const enrichEventSeo = (event, locale = 'es') => {
  if (!event) return null;
  const slug = event.slug || toSlug(event.title || event.name);
  const canonical = `${BASE_CANONICAL_URL}/${locale}/events/${slug}/`;
  const cleanVenue = (event.location || '').replace(/\s*-\s*Panamá.*$/i, '').trim();

  const isEs = locale === 'es';
  const seoTitle = event.seoTitle || (
    isEs 
      ? `${event.title} • ${cleanVenue} | ARRIVE Panamá`
      : `${event.title} • ${cleanVenue} | ARRIVE Panama`
  );

  const seoDescription = event.seoDescription || (
    isEs
      ? `${event.description?.slice(0, 150) || 'Evento exclusivo en Panamá con Arrive.'} ${event.perkHeadline ? event.perkHeadline : ''}`.trim()
      : `Official nightlife party at ${cleanVenue}, Panama City. Guest list passes, VIP table reservations and music by ${event.artists?.map(a => a.shortName || a.name).join(', ') || 'top DJs'}.`
  );

  return {
    ...event,
    slug,
    canonical,
    seoTitle,
    seoDescription,
    cleanVenue,
    indexable: event.indexable !== false
  };
};

/**
 * Enriches a Venue entity with canonical SEO fields
 */
export const enrichVenueSeo = (venue, locale = 'es') => {
  if (!venue) return null;
  const slug = venue.slug || toSlug(venue.shortName || venue.name);
  const canonical = `${BASE_CANONICAL_URL}/${locale}/venues/${slug}/`;

  const isEs = locale === 'es';
  const seoTitle = venue.seoTitle || (
    isEs
      ? `${venue.name} — ${venue.area || 'Panamá'} | Eventos, Menú & VIP`
      : `${venue.name} — ${venue.area || 'Panama City'} | Events, Menu & VIP`
  );

  const seoDescription = venue.seoDescription || (
    isEs
      ? `${venue.tagline || venue.description?.slice(0, 140)} Ubicado en ${venue.address || venue.city}. Reserva tu mesa y conoce su menú y eventos.`
      : `Official profile for ${venue.name} in ${venue.area || 'Panama City'}. Dinner hours, nightlife DJ parties, food & cocktail menu and VIP table reservations.`
  );

  return {
    ...venue,
    slug,
    canonical,
    seoTitle,
    seoDescription,
    indexable: venue.indexable !== false
  };
};

/**
 * Generates official Restaurant profiles from platform venues with dinner service
 */
export const getPlatformRestaurants = (venues = [], locale = 'es') => {
  return venues
    .filter(v => v.menu && (v.dinnerTime || v.category?.toLowerCase().includes('restaurant')))
    .map(venue => {
      const slug = toSlug(venue.shortName || venue.name);
      const isEs = locale === 'es';
      return {
        id: `restaurant-${venue.id}`,
        venueId: venue.id,
        name: venue.name,
        shortName: venue.shortName,
        slug,
        canonical: `${BASE_CANONICAL_URL}/${locale}/restaurants/${slug}/`,
        area: venue.area,
        city: venue.city,
        address: venue.address,
        coverImage: venue.coverImage,
        dinnerTime: venue.dinnerTime || '5:00 PM - 10:00 PM',
        tagline: venue.tagline,
        menu: venue.menu,
        phone: venue.phone,
        googleMapsUrl: venue.googleMapsUrl,
        cuisine: venue.slug?.includes('furia') ? 'Fusión Japonesa & Robata' : (venue.slug?.includes('primavera') ? 'Fusión Nikkei & Ceviches' : 'Tapas de Autor & Coctelería'),
        seoTitle: isEs
          ? `Restaurante ${venue.name} — Cena Gourmet & Coctelería en ${venue.area} | ARRIVE`
          : `${venue.name} Restaurant — Gourmet Dinner & Mixology in ${venue.area} | ARRIVE`,
        seoDescription: isEs
          ? `Reserva tu mesa en el restaurante de ${venue.name} en ${venue.area}. Horario de cena: ${venue.dinnerTime || '5:00 PM - 10:00 PM'}. Revisa el menú y cócteles de autor.`
          : `Book your dinner table at ${venue.name} in ${venue.area}, Panama. Dinner service ${venue.dinnerTime || '5:00 PM - 10:00 PM'}. Explore menu and signature drinks.`
      };
    });
};
