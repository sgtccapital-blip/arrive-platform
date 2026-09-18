// =========================================================================
// ARRIVE PLATFORM — INTERNATIONALIZATION (i18n) ENGINE
// Multi-lingual support (ES / EN) for local residents and international tourists
// =========================================================================

export const SUPPORTED_LOCALES = ['es', 'en'];
export const DEFAULT_LOCALE = 'es';

/**
 * UI Translations dictionary
 */
export const TRANSLATIONS = {
  es: {
    nav: {
      allEvents: 'ALL EVENTS',
      venues: 'VENUES & PERFILES',
      bookVip: 'BOOK VIP ZONE',
      services: 'SERVICES & CONCIERGE',
      vipSquad: 'ARRIVE VIP SQUAD',
      switchLang: 'EN',
      searchPlaceholder: 'Buscar evento, club o artista...'
    },
    hero: {
      tagline: 'CIUDAD DE PANAMÁ',
      title: 'ARRIVE NIGHTLIFE',
      subtitle: 'Acceso exclusivo, pases de cortesía y mesas VIP en los mejores clubes y rooftops de Panamá.'
    },
    filter: {
      allCities: 'TODAS LAS ZONAS',
      casco: 'CASCO ANTIGUO',
      bellaVista: 'BELLA VISTA',
      costaDelEste: 'COSTA DEL ESTE',
      today: 'HOY',
      weekend: 'FIN DE SEMANA',
      allDays: 'TODOS LOS DÍAS'
    },
    event: {
      tickets: 'TICKETS / QR',
      bookVip: 'BOOK VIP',
      dinner: 'DINNER',
      party: 'PARTY',
      lineup: 'LINEUP',
      dressCode: 'Código de Vestimenta',
      ageLimit: 'Edad Mínima',
      perks: 'Beneficios & Cortesías de la Noche',
      djsSection: 'Djs & Invitados',
      djsSubtitle: 'Perfiles Oficiales & Sets',
      listenSet: 'Escuchar DJ Set',
      viewInstagram: 'Ver Instagram',
      endedNotice: 'Este evento ya ha finalizado. Consulta los próximos eventos programados.'
    },
    venue: {
      infoTab: 'INFO & AMBIENTE',
      menuTab: 'MENÚ & COCTELERÍA',
      photosTab: 'FOTOS',
      eventsTab: 'EVENTOS',
      selectToBook: 'SELECCIONAR PARA RESERVA',
      viewMenu: 'Ver Menú & Fotos ↗',
      address: 'Dirección',
      hours: 'Horarios',
      cuisine: 'Cocina de Autor'
    },
    concierge: {
      title: 'ARRIVE CONCIERGE & VIP SERVICES',
      subtitle: 'Reservas prioritarias en restaurantes, transporte privado y yates en Panamá.',
      requestService: 'ENVIAR SOLICITUD A CONCIERGE',
      chatWhatsapp: 'Chat WhatsApp'
    }
  },
  en: {
    nav: {
      allEvents: 'ALL EVENTS',
      venues: 'VENUES & PROFILES',
      bookVip: 'BOOK VIP ZONE',
      services: 'SERVICES & CONCIERGE',
      vipSquad: 'ARRIVE VIP SQUAD',
      switchLang: 'ES',
      searchPlaceholder: 'Search event, club or DJ...'
    },
    hero: {
      tagline: 'PANAMA CITY',
      title: 'ARRIVE NIGHTLIFE',
      subtitle: 'Exclusive guest lists, complimentary passes and VIP tables at top clubs and rooftops in Panama.'
    },
    filter: {
      allCities: 'ALL DISTRICTS',
      casco: 'CASCO VIEJO (OLD TOWN)',
      bellaVista: 'BELLA VISTA',
      costaDelEste: 'COSTA DEL ESTE',
      today: 'TONIGHT',
      weekend: 'THIS WEEKEND',
      allDays: 'ALL DAYS'
    },
    event: {
      tickets: 'GUEST LIST / QR',
      bookVip: 'BOOK VIP',
      dinner: 'DINNER',
      party: 'PARTY',
      lineup: 'LINEUP',
      dressCode: 'Dress Code',
      ageLimit: 'Age Limit',
      perks: 'Complimentary Benefits & Perks',
      djsSection: 'Djs & Guests',
      djsSubtitle: 'Official Profiles & Live Sets',
      listenSet: 'Listen to DJ Set',
      viewInstagram: 'View Instagram',
      endedNotice: 'This event has ended. Check upcoming parties and events below.'
    },
    venue: {
      infoTab: 'INFO & VIBE',
      menuTab: 'FOOD & COCKTAILS',
      photosTab: 'PHOTOS',
      eventsTab: 'UPCOMING EVENTS',
      selectToBook: 'SELECT FOR RESERVATION',
      viewMenu: 'View Menu & Photos ↗',
      address: 'Address',
      hours: 'Hours',
      cuisine: 'Signature Cuisine'
    },
    concierge: {
      title: 'ARRIVE CONCIERGE & VIP HOSPITALITY',
      subtitle: 'Priority restaurant reservations, private chauffeur and yacht charters in Panama.',
      requestService: 'SUBMIT CONCIERGE REQUEST',
      chatWhatsapp: 'WhatsApp Chat'
    }
  }
};

/**
 * Extracts the current locale from a pathname (default 'es')
 */
export const getLocaleFromPath = (pathname = '/') => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'en') return 'en';
  return 'es';
};

/**
 * Generates the alternate URL for language switcher
 */
export const getAlternatePath = (currentPath = '/', targetLocale = 'en') => {
  let cleanPath = currentPath;
  if (cleanPath.startsWith('/es/')) {
    cleanPath = cleanPath.slice(3);
  } else if (cleanPath.startsWith('/en/')) {
    cleanPath = cleanPath.slice(3);
  } else if (cleanPath === '/es' || cleanPath === '/en') {
    cleanPath = '/';
  }

  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  if (!cleanPath.endsWith('/')) {
    cleanPath += '/';
  }

  return `/${targetLocale}${cleanPath === '//' ? '/' : cleanPath}`;
};
