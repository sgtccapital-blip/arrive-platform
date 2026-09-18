# ARRIVE Structured Data (Schema.org JSON-LD): Guía de Marcado

Este documento detalla las plantillas y reglas de validación para los datos estructurados JSON-LD inyectados en ARRIVE.

---

## 1. Estructura Global `@graph`
Cada página inyecta un único bloque de script JSON-LD que contiene el grafo relacional de entidades:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    { /* Organization */ },
    { /* WebSite */ },
    { /* BreadcrumbList */ },
    { /* Entidad Principal: Event, NightClub o Restaurant */ }
  ]
}
</script>
```

---

## 2. Plantilla: Entidad Evento (`Event`)

```json
{
  "@type": "Event",
  "@id": "https://arrivepanama.com/es/events/furia-tini-after-party/#event",
  "name": "Furia TINI After Party",
  "startDate": "2026-09-15T22:00:00-05:00",
  "endDate": "2026-09-16T04:00:00-05:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Furia Club & Restaurant",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "PH La Trona, Calle Rogelio Alfaro",
      "addressLocality": "Bella Vista",
      "addressRegion": "Panamá",
      "postalCode": "0801",
      "addressCountry": "PA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.9824,
      "longitude": -79.5199
    }
  },
  "image": [
    "https://arrivepanama.com/images/flyer-furia-tini-martes-15.png"
  ],
  "description": "After party oficial del concierto de TINI en Furia Club Panamá. Open Gin & Sangría para ellas y acceso VIP.",
  "performer": [
    {
      "@type": "Person",
      "name": "DJ Oriel Alexander",
      "sameAs": "https://www.instagram.com/djorielalexander/"
    }
  ],
  "organizer": {
    "@type": "Organization",
    "name": "Arrive Model Management",
    "url": "https://arrivepanama.com"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Pase Digital Guest List (Cortesía)",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://arrivepanama.com/es/events/furia-tini-after-party/",
      "validFrom": "2026-09-01T00:00:00-05:00"
    }
  ]
}
```

---

## 3. Plantilla: Entidad Venue (`NightClub` / `BarOrPub`)

```json
{
  "@type": "NightClub",
  "@id": "https://arrivepanama.com/es/venues/terraplen-rooftop/#venue",
  "name": "Terraplén Rooftop",
  "url": "https://arrivepanama.com/es/venues/terraplen-rooftop/",
  "image": "https://arrivepanama.com/images/venues/terraplen/cover.jpg",
  "telephone": "+50760000000",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Edificio Brand Experience Center PB, Av. Eloy Alfaro",
    "addressLocality": "Casco Antiguo",
    "addressRegion": "Panamá",
    "addressCountry": "PA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 8.9532,
    "longitude": -79.5339
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "17:00",
      "closes": "04:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/terraplenpanama/",
    "https://terraplenpanama.com"
  ]
}
```

---

## 4. Plantilla: Migas de Pan (`BreadcrumbList`)

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://arrivepanama.com/es/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Eventos en Panamá",
      "item": "https://arrivepanama.com/es/panama/events/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Furia TINI After Party",
      "item": "https://arrivepanama.com/es/events/furia-tini-after-party/"
    }
  ]
}
```
