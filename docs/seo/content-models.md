# ARRIVE Content Models: Especificación Técnica de Entidades

Este documento detalla el esquema de datos enriquecido para todas las entidades del sistema ARRIVE.

---

## 1. Modelo de Evento (`Event`)

```typescript
interface EventModel {
  id: string;                      // 'evt-furia-tini-after-party'
  name: string;                    // 'Furia TINI After Party'
  slug: string;                    // 'furia-tini-after-party'
  title: string;                   // Título editorial para tarjetas
  subtitle: string;                // Subtítulo con fecha y show
  description: string;             // Texto completo descriptivo de la experiencia
  shortDescription: string;        // Resumen para meta descriptions (140-155 caracteres)
  
  // Relaciones
  venueId: string;                 // 'venue-furia'
  venueName: string;               // 'Furia Club & Restaurant'
  venueSlug: string;               // 'furia-club'
  
  // Temporalidad & Fechas ISO 8601
  startDate: string;               // '2026-09-15T22:00:00-05:00'
  endDate: string;                 // '2026-09-16T04:00:00-05:00'
  dinnerTime?: string;             // '5:00 PM - 10:00 PM'
  partyTime: string;               // '10:00 PM - 04:00 AM'
  dayOfWeek: string;               // 'Martes'
  timezone: string;                // 'America/Panama'
  eventStatus: 'EventScheduled' | 'EventPostponed' | 'EventCancelled' | 'EventEnded';

  // Multimedia
  image: string;                   // URL flyer/portada
  imageAlt: string;                // Texto alternativo descriptivo
  gallery?: Array<{ url: string; title: string }>;

  // Clasificación & Géneros
  category: string;                // 'Nightlife & After Party'
  eventType: string;               // 'Concert After Party' | 'Boiler Room' | 'Ladies Night'
  musicGenres: string[];           // ['Reggaeton', 'Urban Pop', 'Latin Hits']

  // Talento / Lineup
  artists: Array<{
    name: string;
    shortName: string;
    role: string;
    badge?: string;                // 'HEADLINER' | 'RESIDENTE' | 'INVITADO'
    avatar: string;
    instagram?: string;
    instagramHandle?: string;
    djSetUrl?: string;
    djSetTitle?: string;
    bio?: string;
  }>;

  // Beneficios de Cortesía & Ticketing
  perkHeadline: string;            // '🍸 OPEN GIN & SANGRÍA HASTA LAS 12MN'
  perkDetails: string;
  perksIncluded: string[];
  price: number;                   // 0 para listas de cortesía
  vipPrice?: number;               // 20
  currency: string;                // 'USD'
  ticketUrl: string;               // Enlace oficial de ticketing externo
  guestListAvailable: boolean;     // true
  vipTablesAvailable: boolean;     // true
  tableTiers?: Array<{ name: string; price: number; desc: string }>;

  // Ubicación & Localidad
  neighborhood: string;            // 'Bella Vista'
  address: string;                 // 'PH La Trona, Calle Rogelio Alfaro'
  city: string;                    // 'Ciudad de Panamá'
  country: string;                 // 'Panamá'
  countryCode: string;             // 'PA'
  latitude: number;                // 8.9824
  longitude: number;               // -79.5199

  // Políticas
  dressCode: string;               // 'Glitter & Pop Chic / Smart Casual'
  ageRestriction: string;          // '18+'

  // SEO Control
  seoTitle: string;                // 'Furia TINI After Party — Open Bar & VIP Tables | ARRIVE'
  seoDescription: string;
  canonical: string;               // 'https://arrivepanama.com/es/events/furia-tini-after-party/'
  indexable: boolean;              // true
  createdAt: string;
  updatedAt: string;
}
```

---

## 2. Modelo de Venue / Local (`Venue`)

```typescript
interface VenueModel {
  id: string;                      // 'venue-furia'
  name: string;                    // 'Furia Club & Restaurant'
  shortName: string;               // 'Furia'
  slug: string;                    // 'furia-club'
  tagline: string;                 // 'Restaurante Fusión Internacional, Mixología & Nightclub Exclusivo'
  category: 'Nightclub & Restaurant' | 'Rooftop Lounge' | 'Piano Bar';
  
  // Ubicación
  neighborhood: string;            // 'Bella Vista'
  area: string;                    // 'Bella Vista'
  address: string;                 // 'PH La Trona, Calle Rogelio Alfaro'
  city: string;                    // 'Ciudad de Panamá'
  country: string;                 // 'Panamá'
  coordinates: {
    latitude: number;
    longitude: number;
  };
  googleMapsUrl: string;
  mapPreview: string;

  // Horarios
  dinnerTime?: string;             // '5:00 PM - 10:00 PM'
  partyTime: string;               // '10:00 PM - 04:00 AM'
  openingHoursSchema: string[];    // ['Tu-Su 17:00-04:00']

  // Identidad & Contenido
  description: string;
  shortDescription: string;
  features: string[];
  musicGenres: string[];
  dressCode: string;
  ageRestriction: string;
  priceRange: string;              // '$$$'

  // Multimedia
  coverImage: string;
  imageAlt: string;
  gallery: Array<{ url: string; title: string; category: string }>;

  // Redes & Contacto
  phone: string;
  websiteUrl: string;
  instagramUrl: string;
  instagramHandle: string;

  // Restaurante & Menú
  menu?: {
    entradas: Array<{ name: string; desc: string; price: string }>;
    platosFuertes: Array<{ name: string; desc: string; price: string }>;
    sushiRolls?: Array<{ name: string; desc: string; price: string }>;
    postres?: Array<{ name: string; desc: string; price: string }>;
    coctelesSignature: Array<{ name: string; desc: string; price: string }>;
    botellasVip: Array<{ name: string; desc: string; price: string }>;
  };

  // SEO
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  indexable: boolean;
}
```

---

## 3. Modelo de Restaurante (`Restaurant`)
Entidad generada a partir de los venues con servicio de cena (Furia, Piano Bar, Terraplén, Primavera, Cielo), optimizada para búsquedas gastronómicas:
- `slug`: `restaurante-{slug}`
- `cuisineType`: Tipo de gastronomía (Fusión Japonesa, Nikkei, Tapas Españolas, Grill de Autor).
- `menuSummary`: Conteo de platillos, platos insignia y rango de precios.
- `reservationOptions`: Opciones de reserva VIP y mesa preferencial vía Concierge.
