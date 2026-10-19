// =========================================================================
// ARRIVE PLATFORM — BUILD-TIME STATIC PRERENDERER (SSG)
// Generates 100% crawlable HTML pages for Googlebot and instant TTFB
// =========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const BASE_URL = 'https://arrivepanama.com';

// Canonical Data definitions
const VENUES = [
  {
    id: 'venue-furia',
    name: 'Furia Club & Restaurant',
    slug: 'furia-club',
    area: 'Bella Vista',
    address: 'Calle Rogelio Alfaro & Calle 48 Este, PH La Trona, Bella Vista, Ciudad de Panamá',
    dinnerTime: '6:00 PM - 10:30 PM',
    partyTime: '10:30 PM - 04:00 AM',
    tagline: 'Alta gastronomía asiática & nightlife de vanguardia en Bella Vista',
    coverImage: '/images/venues/furia/cover.jpg',
    cuisine: 'Fusión Japonesa & Robata',
    phone: '+507 6223-5453',
    googleMapsUrl: 'https://maps.google.com/?q=Furia+Panama+Calle+Rogelio+Alfaro',
    menuHighlights: [
      { name: 'Shrimp Galaxy Tartare', desc: 'Camarón, aguacate, eneldo, cilantro, mayo yuzu', price: '$10' },
      { name: 'Ceviche Nikkei de la Casa', desc: 'Pesca del día, mango, ají dulce, aguacate, leche de tigre verde', price: '$12' },
      { name: 'Lobster Parmigiano Reggiano', desc: 'Cola de langosta gratinada, soya yuzu y perfume de trufa', price: '$15' },
      { name: 'Hotate Roll', desc: 'Langostino, aguacate, scallops curados, nieve de scallops y togarashi', price: '$13' },
      { name: 'Ribeye Prime 12 oz', desc: 'Ribeye Prime a las brasas con mantequilla de hierbas y papas trufadas', price: '$40' },
      { name: 'La Trona Cocktail', desc: 'Bombay Sapphire, Aperol, jugo de maracuyá y agave', price: '$12' },
      { name: 'The Champagne Box', desc: '3x Moët & Chandon Ice Impérial en cofre VIP iluminado', price: '$500' }
    ],
    faqs: {
      es: [
        { question: '¿Cuál es el código de vestimenta (dress code) en Furia Panamá?', answer: 'El dress code oficial es Nightlife Chic / Elegante. Se admiten camisas de vestir, blazers y vestidos sofisticados. No se permite ropa deportiva ni sandalias playeras.' },
        { question: '¿Cómo funciona la reserva de mesas VIP y el bottle service en Furia?', answer: 'Las mesas VIP están ubicadas alrededor de la cabina central 360° del DJ. El 100% de la reserva es consumible en botellas premium y gastronomía del menú, e incluye atención de anfitrión y desfile Furia Parade.' },
        { question: '¿A qué hora empieza la cena y a qué hora la fiesta en Furia?', answer: 'La cena se sirve de 6:00 PM a 10:30 PM. A partir de las 10:30 PM el espacio se transforma en club nocturno con DJs en vivo hasta las 4:00 AM.' },
        { question: '¿Furia cuenta con servicio de Valet Parking en Bella Vista?', answer: 'Sí, Furia dispone de servicio de Valet Parking privado directamente en la entrada del PH La Trona sobre Calle Rogelio Alfaro, con seguridad 24/7.' }
      ],
      en: [
        { question: 'What is the dress code at Furia Panama?', answer: 'The dress code is Nightlife Chic / Smart Elegant. Sophisticated nightlife attire is recommended. Sportswear and beach sandals are not allowed.' },
        { question: 'How do VIP table reservations work at Furia?', answer: 'VIP tables surround the central 360° DJ booth. 100% of minimum spend goes towards bottles and food, including dedicated bottle hosts and the signature Furia Parade.' }
      ]
    }
  },
  {
    id: 'venue-pianobar',
    name: 'Piano Bar Panamá',
    slug: 'piano-bar',
    area: 'Bella Vista',
    address: 'Calle 49 Este & Av. Federico Boyd, Bella Vista, Ciudad de Panamá',
    dinnerTime: '6:00 PM - 10:30 PM',
    partyTime: '10:30 PM - 03:00 AM',
    tagline: 'Música en vivo, tapas de autor, pizzas & coctelería clásica en Bella Vista',
    coverImage: '/images/venues/pianobar/cover.jpg',
    cuisine: 'Tapas de Autor, Pizzas & Coctelería Clásica',
    phone: '+507 6200-0000',
    googleMapsUrl: 'https://maps.google.com/?q=Piano+Bar+Panama+Bella+Vista',
    menuHighlights: [
      { name: 'Tabla de Ibéricos & Quesos Europeos', desc: 'Fuet ibérico, jamón serrano, Grana Padano, Belprado y Manchego', price: '$28' },
      { name: 'Papas Bravas con Pulpo Rostizado', desc: 'Pulpo a la brasa, milhojas de papa crujiente y salsa brava', price: '$14' },
      { name: 'Pizza Ibérica Trufada', desc: 'Jamón serrano, passata, mozzarella, arúgula y aceite de trufa blanca', price: '$12' },
      { name: 'Ribeye Prime 12 oz', desc: 'Corte Prime a la parrilla, pimientos padrones y chips artesanales', price: '$48' },
      { name: 'Paella Valenciana de Mariscos (Para 2)', desc: 'Langostinos jumbo, calamar, almejas y bisque de mariscos', price: '$30' },
      { name: 'Oaxaca Fire Cocktail', desc: 'Mezcal Montelobos con notas cítricas, picantes y toque ahumado', price: '$12' },
      { name: 'Tequila Don Julio 1942 Añejo', desc: 'Servicio VIP de botella en mesa con mezcladores', price: '$450' }
    ],
    faqs: {
      es: [
        { question: '¿Qué tipo de música y shows en vivo se presentan en Piano Bar Panamá?', answer: 'Piano Bar cuenta con cantantes y pianistas en directo de miércoles a sábado interpretando jazz, soul, baladas clásicas y pop en inglés y español.' },
        { question: '¿Tienen opciones de cena completa o solo tapas?', answer: 'Disponen de una carta gastronómica completa: tapas españolas, montaditos, tablas de embutidos ibéricos y quesos europeos, pizzas al horno de piedra, paellas valencianas y cortes Prime.' },
        { question: '¿Cuál es el código de vestimenta en Piano Bar?', answer: 'Smart Casual a Elegante. Se aconseja camisa de cuello o polo refinado para caballeros y atuendo chic para damas.' },
        { question: '¿Dónde está ubicado Piano Bar en Ciudad de Panamá?', answer: 'Se ubica en Calle 49 Este & Av. Federico Boyd en Bella Vista, con fácil acceso tanto desde Calle 50 como desde Avenida Balboa y Cinta Costera.' }
      ],
      en: [
        { question: 'What kind of live music and shows are featured at Piano Bar Panama?', answer: 'Piano Bar hosts live vocalists and pianists Wednesday through Saturday performing jazz, soul, acoustic hits, and timeless international classics.' },
        { question: 'Do they offer full dinner options or only tapas?', answer: 'They offer an extensive dining menu including Spanish tapas, montaditos, Iberian charcuterie and cheese boards, stone-oven pizzas, seafood paellas, and Prime cuts.' },
        { question: 'What is the dress code at Piano Bar?', answer: 'Smart Casual to Elegant. Collared shirts or stylish polos for men, and sophisticated cocktail attire for women are recommended.' }
      ]
    }
  },
  {
    id: 'venue-terraplen',
    name: 'Terraplén Rooftop',
    slug: 'terraplen-rooftop',
    area: 'Casco Antiguo',
    address: 'Edificio Brand Experience Center PB, Av. Eloy Alfaro, Casco Antiguo',
    dinnerTime: '5:00 PM - 10:00 PM',
    partyTime: '10:00 PM - 04:00 AM',
    tagline: 'Sunsets, vistas panorámicas & nightlife en Casco Viejo',
    coverImage: '/images/venues/terraplen/cover.jpg',
    cuisine: 'Sunset Dinner & Tapas con Vista al Mar',
    phone: '+507 6300-0000',
    googleMapsUrl: 'https://maps.google.com/?q=Terraplen+Rooftop+Panama+Casco+Antiguo',
    menuHighlights: [
      { name: 'Ceviche Mixto al Ají Amarillo', desc: 'Corvina fresca, camarones, cebolla morada, choclo y camote', price: '$16' },
      { name: 'Picanha Angus al Grill (350g)', desc: 'Corte a la parrilla con yuca frita y chimichurri criollo', price: '$28' },
      { name: 'Aperol Spritz Skyline', desc: 'Aperol, Prosecco D.O.C., soda y rodaja de naranja', price: '$13' }
    ],
    faqs: {
      es: [
        { question: '¿Cuál es el mejor horario para disfrutar del sunset en Terraplén Rooftop?', answer: 'El atardecer en Casco Viejo se aprecia en su máximo esplendor entre las 5:00 PM y las 6:30 PM, con vista panorámica de 360° al Océano Pacífico.' },
        { question: '¿Cuál es el dress code en Terraplén Casco Antiguo?', answer: 'Rooftop Glam / Smart Casual. Camisas de lino, calzado náutico o mocasines y vestidos de verano refinados son ideales. No se permite ropa deportiva.' },
        { question: '¿Dónde estacionar para ir a Terraplén en Casco Viejo?', answer: 'Terraplén cuenta con servicio de Valet Parking en la entrada de Avenida Eloy Alfaro (Brand Experience Center) y estacionamientos vigilados en Cinta Costera 3.' }
      ],
      en: [
        { question: 'What is the best time for sunset at Terraplen Rooftop?', answer: 'We recommend arriving between 5:00 PM and 6:30 PM for golden hour, offering 360° vistas of the Pacific Ocean and Panama City skyline.' },
        { question: 'What is the dress code at Terraplen Casco Antiguo?', answer: 'Rooftop Glam / Smart Casual. Linen shirts, stylish footwear, and breezy evening dresses are welcomed. Sportswear is restricted.' }
      ]
    }
  },
  {
    id: 'venue-primavera',
    name: 'Primavera Panamá',
    slug: 'primavera-panama',
    area: 'Costa del Este',
    address: 'MMG Tower, Piso 7, Av. Paseo del Mar, Costa del Este',
    dinnerTime: '4:00 PM - 10:00 PM',
    partyTime: '10:00 PM - 02:00 AM',
    tagline: 'Cocina fusión contemporánea & experiencias en Costa del Este',
    coverImage: '/images/venues/primavera/sunset.jpg',
    cuisine: 'Cocina Fusión Contemporánea & Cocktails',
    phone: '+507 6633-0016',
    googleMapsUrl: 'https://maps.google.com/?q=Primavera+Rooftop+MMG+Tower+Costa+del+Este',
    menuHighlights: [
      { name: 'Aguachile Verde de Camarón', desc: 'Camarón blanqueado y encurtido, aguachile verde, aguacate y tortilla crocante', price: '$19' },
      { name: 'The Primavera Smash Burger', desc: 'Doble smash Angus, queso cheddar y Monterey, tártara y papitas crispy', price: '$17' },
      { name: 'Steak Tartare + Caviar', desc: 'Lomo de res, alioli de pixbae kosho, huevo de codorniz, caviar y mix de chips', price: '$17' },
      { name: 'Futomaki Tres Texturas', desc: 'Bluefin Tuna Akami, Chu-Toro y Ho-Toro, arroz sushi, sésamo y nikiri', price: '$26' }
    ],
    faqs: {
      es: [
        { question: '¿Dónde está ubicado Primavera Panamá?', answer: 'Está ubicado en el Piso 7 de MMG Tower, en la Avenida Paseo del Mar, Costa del Este, Ciudad de Panamá.' },
        { question: '¿Qué tipo de gastronomía ofrece Primavera?', answer: 'Cocina fusión contemporánea que une técnicas asiáticas y mediterráneas, cortes al Robata Grill, tiraditos frescos y coctelería botánica.' },
        { question: '¿Cómo es el estacionamiento en MMG Tower?', answer: 'MMG Tower dispone de modernos estacionamientos techados bajo vigilancia las 24 horas y servicio de Valet Parking en la entrada corporativa.' }
      ],
      en: [
        { question: 'Where is Primavera Rooftop located?', answer: 'Located on the 7th Floor of the landmark MMG Tower on Avenida Paseo del Mar in Costa del Este, Panama City.' },
        { question: 'What is the cuisine style at Primavera?', answer: 'Contemporary fusion cuisine combining Asian and Mediterranean flavors, robata grilled cuts, fresh tiraditos, and botanical signature cocktails.' }
      ]
    }
  },
  {
    id: 'venue-cielo',
    name: 'Cielo Rooftop',
    slug: 'cielo-rooftop',
    area: 'Avenida Balboa',
    address: 'PH The Sands, Piso RT, Ave. Balboa, Ciudad de Panamá',
    dinnerTime: '5:30 PM - 10:00 PM',
    partyTime: '10:00 PM - 03:30 AM',
    tagline: 'Rooftop lounge con vistas al skyline y la bahía',
    coverImage: '/images/venues/cielo/cover.jpg',
    cuisine: 'Dinner & Drinks con Vista a la Bahía',
    phone: '+507 6400-0000',
    googleMapsUrl: 'https://maps.google.com/?q=Cielo+Rooftop+PH+The+Sands+Ave+Balboa+Panama',
    menuHighlights: [
      { name: 'Cielo Burger Angus 7 oz', desc: 'Blend Angus, queso Chela Cheddar, bacon al whisky y maple, con papas trufadas', price: '$18' },
      { name: 'Ceviche de Combinación', desc: 'Corvina, atún, pulpo, camarón, ají dulce, piña y leche de tigre de pimentón', price: '$19' },
      { name: 'Entraña Prime 12 oz', desc: 'Entraña Prime jugosa a la parrilla con chimichurri tatemado y papas wedges', price: '$48' },
      { name: 'Aurora Mule (Signature)', desc: 'Gin Conciere, sirope de jengibre y romero, limón y ginger beer', price: '$13' }
    ],
    faqs: {
      es: [
        { question: '¿Dónde está ubicado Cielo Rooftop en Ciudad de Panamá?', answer: 'Cielo Rooftop está ubicado en el piso RT (Rooftop) del PH The Sands, sobre la Avenida Balboa, con vista panorámica a la bahía y al skyline iluminado de la ciudad.' },
        { question: '¿Cuál es el código de vestimenta en Cielo Rooftop?', answer: 'Rooftop Chic / Casual Elegante. Se aconseja ropa estilizada, camisas o polos refinados y calzado adecuado. No se permite ropa de gimnasio ni calzado playero.' },
        { question: '¿A qué hora empieza la fiesta en Cielo Rooftop?', answer: 'Las tardes comienzan a las 5:30 PM para disfrutar del sunset y cócteles. A partir de las 10:00 PM los DJs residentes elevan la música y la noche se transforma en fiesta hasta las 3:30 AM.' },
        { question: '¿Disponen de estacionamiento y Valet Parking?', answer: 'Sí, PH The Sands cuenta con estacionamientos techados y servicio de Valet Parking en la entrada principal sobre Avenida Balboa.' }
      ],
      en: [
        { question: 'Where is Cielo Rooftop located in Panama City?', answer: 'Cielo Rooftop is on the RT (Rooftop) floor of PH The Sands on Avenida Balboa, featuring panoramic vistas of Panama Bay and the city skyline.' },
        { question: 'What is the dress code at Cielo Rooftop?', answer: 'Rooftop Chic / Smart Casual. Fashionable nightlife attire is recommended. Sportswear and beach flip-flops are prohibited.' },
        { question: 'Is valet parking available at PH The Sands?', answer: 'Yes, secure indoor parking and valet services are accessible at the entrance on Avenida Balboa.' }
      ]
    }
  },
  {
    id: 'venue-la-rosalia',
    name: 'La Rosalía',
    slug: 'la-rosalia',
    area: 'Amador',
    address: 'Downtown Amador, Calzada de Amador, Ciudad de Panamá',
    dinnerTime: '7:00 PM - 10:00 PM',
    partyTime: '10:00 PM - 05:00 AM',
    tagline: 'El epicentro del perreo, after parties y vibra urbana en Downtown Amador',
    coverImage: '/images/venues/furia/tree_lounge.jpg',
    cuisine: 'Coctelería Urbana & Experiencia After Concert',
    phone: '+507 6200-8899',
    googleMapsUrl: 'https://maps.google.com/?q=La+Rosalia+Downtown+Amador+Panama',
    menuHighlights: [
      { name: 'Rosalía Signature Cocktail', desc: 'Ginebra infusionada con frutos rojos y tónica premium', price: '$12' },
      { name: 'Perreo Mule', desc: 'Vodka premium, ginger beer picante y lima', price: '$12' },
      { name: 'Don Julio 70 Cristalino', desc: 'Tequila añejo cristalino 100% agave', price: '$180' }
    ],
    faqs: {
      es: [
        { question: '¿Dónde está ubicado La Rosalía?', answer: 'Se encuentra en Downtown Amador, sobre la Calzada de Amador (Causeway), a minutos del centro de Ciudad de Panamá.' },
        { question: '¿Cuál es el código de vestimenta en La Rosalía?', answer: 'El dress code es Urban Chic / Nightlife Glam. Se permite estilo urbano elegante y calzado moderno.' },
        { question: '¿Cómo funciona la entrada con Pase ARRIVE?', answer: 'Tu Pase ARRIVE incluye acceso preferencial por lista digital y beneficios como open bar hasta las 12:00 AM.' }
      ],
      en: [
        { question: 'Where is La Rosalía located?', answer: 'Located in Downtown Amador on the Amador Causeway, minutes away from downtown Panama City.' },
        { question: 'What is the dress code at La Rosalía?', answer: 'The dress code is Urban Chic / Nightlife Glam. Modern upscale urban attire is welcome.' }
      ]
    }
  }
];

const EVENTS = [
  {
    "id": "evt-furia-midweek-boiler",
    "slug": "furia-midweek-boiler-reggaeton",
    "venueSlug": "furia-club",
    "indexable": true,
    "title": "MIDWEEK BOILER REGGAETON",
    "subtitle": "Boiler Room 360° & Reggaeton Midweek Party",
    "category": "Nightlife & Reggaeton",
    "genre": "Boiler 360° / Reggaeton / Tech-House",
    "musicGenres": [
      "Boiler 360",
      "Reggaeton",
      "Tech-House"
    ],
    "location": "Furia Club",
    "address": "PH La Trona, Calle Rogelio Alfaro",
    "city": "Ciudad de Panamá",
    "dayOfWeek": "Miercoles",
    "date": "Miércoles, 16 Septiembre 2026",
    "eventDate": "2026-09-16T22:00:00",
    "time": "10:00 PM - 03:00 AM",
    "dinnerTime": "5:00 PM - 10:00 PM",
    "partyTime": "10:00 PM - 04:00 AM",
    "price": 0,
    "vipPrice": 20,
    "currency": "$",
    "capacity": 250,
    "spotsLeft": 15,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/furia-midweek-party-boiler-style-miercoles-16-de-septiembre",
    "image": "/images/flyer-furia-midweek-boiler-16.png",
    "imageAlt": "Flyer oficial FURIA Midweek Boiler Style con DJ Oriel en Furia Club Panama",
    "seoTitle": "FURIA Midweek: Boiler Style Miércoles 16 Septiembre • Furia Club | ARRIVE Panamá",
    "seoDescription": "Boiler Room 360° & Reggaeton en Furia Club Panamá con DJ Oriel. Open Gin & Sangría para ellas hasta las 12mn. Entrada libre con Pase Digital Arrive.",
    "artists": [
      {
        "name": "DJ Oriel Alexander",
        "shortName": "DJ Oriel",
        "role": "Residente Furia • Boiler 360° Reggaeton Set",
        "badge": "RESIDENTE",
        "avatar": "/images/djs/dj-oriel.jpg",
        "instagram": "https://www.instagram.com/djorielalexander/",
        "instagramHandle": "@djorielalexander",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20oriel%20alexander",
        "djSetTitle": "Boiler 360° Live Mix",
        "bio": "Liderando la pista central de Furia en formato Boiler 360° con una selección demoledora de reggaeton y beats urbanos."
      }
    ],
    "dressCode": "Nightlife Chic / Streetwear Elegante",
    "ageLimit": "18+",
    "description": "El plan oficial de mitad de semana en Panamá en formato Boiler Style: cabina de DJ en 360° al centro de la pista, la mejor selección de reggaeton y beats urbanos. Open Gin & Sangría de cortesía para ellas de 10:00 PM a 12:00 AM.",
    "perkHeadline": "OPEN GIN & SANGRÍA HASTA 12MN",
    "perkDetails": "Open Gin & Sangría para ellas de 10:00 PM a 12:00 AM. Entrada libre hasta las 12mn.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-BOILER-16",
    "instagramUrl": "https://www.instagram.com/furiaclubpanama/",
    "instagramHandle": "@furiaclubpanama",
    "mapPreview": "/images/furia_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Furia+Club+Panama+PH+La+Trona",
    "venueGallery": [
      {
        "url": "/images/venues/furia/club_lights.jpg",
        "title": "Boiler Room 360° & DJ Booth",
        "category": "Boiler 360°"
      },
      {
        "url": "/images/venues/furia/cover.jpg",
        "title": "Zona de Mesas VIP & Pista Central",
        "category": "VIP Lounge"
      },
      {
        "url": "/images/venues/furia/dining_room.jpg",
        "title": "Bar & Experiencia Dinner Gourmet",
        "category": "Dinner & Bar"
      },
      {
        "url": "/images/venues/furia/tree_lounge.jpg",
        "title": "Atmósfera Club & Sistema de Iluminación",
        "category": "Club Atmosphere"
      }
    ],
    "perksIncluded": [
      "Entrada gratuita con Pase Digital Arrive",
      "Open Gin & Sangría para ellas hasta las 12:00 AM",
      "Ellos entran free hasta las 12:00 AM",
      "Experiencia Boiler Room 360° con DJ al centro"
    ],
    "tableTiers": [
      {
        "name": "Guestlist Arrive (Gratuito)",
        "price": 0,
        "desc": "Entrada libre + Open Gin & Sangría hasta las 12:00 AM."
      },
      {
        "name": "Mesa VIP Boiler (x4)",
        "price": 40,
        "desc": "Mesa alrededor de cabina 360° con atención VIP."
      }
    ]
  },
  {
    "id": "evt-furia-on-campus-arcangel",
    "slug": "furia-on-campus-reloaded-pre-party-arcangel",
    "venueSlug": "furia-club",
    "indexable": true,
    "title": "PRE-PARTY ARCÁNGEL",
    "subtitle": "Reloaded College Night • Pre-Party Oficial Concierto Arcángel",
    "category": "Nightlife & Reggaeton",
    "genre": "Reggaeton / Trap Latino / Urban College",
    "musicGenres": [
      "Reggaeton",
      "Trap Latino",
      "Urban College"
    ],
    "location": "Furia Club",
    "address": "PH La Trona, Calle Rogelio Alfaro",
    "city": "Ciudad de Panamá",
    "dayOfWeek": "Jueves",
    "date": "Jueves, 17 Septiembre 2026",
    "eventDate": "2026-09-17T22:00:00",
    "time": "10:00 PM - 04:00 AM",
    "dinnerTime": "5:00 PM - 10:00 PM",
    "partyTime": "10:00 PM - 04:00 AM",
    "price": 0,
    "vipPrice": 25,
    "currency": "$",
    "capacity": 350,
    "spotsLeft": 20,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/furia-on-campus-reloaded-pre-party-arcangel-jueves-17-de-septiembre",
    "image": "/images/flyer-furia-arcangel-preparty-17.jpg",
    "imageAlt": "Flyer oficial Furia On Campus Reloaded Pre-Party Arcángel Jueves 17 Septiembre",
    "seoTitle": "Furia On Campus: Pre-Party Arcángel Jueves 17 Septiembre • Furia Club | ARRIVE",
    "seoDescription": "Edición especial universitaria Pre-Party Arcángel en Furia Club Panamá. Entrada libre en lista y Open Gin & Sangría para ellas con Pase Arrive.",
    "artists": [
      {
        "name": "DJ Oriel Alexander",
        "shortName": "DJ Oriel",
        "role": "Residente Furia • Urban College Sets",
        "badge": "RESIDENTE",
        "avatar": "/images/djs/dj-oriel.jpg",
        "instagram": "https://www.instagram.com/djorielalexander/",
        "instagramHandle": "@djorielalexander",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20oriel%20alexander",
        "djSetTitle": "Arcángel Special Tribute Mix",
        "bio": "Calentando la noche con los mejores himnos de Arcángel, reggaeton de la mata y trap latino."
      }
    ],
    "dressCode": "College Glam / Urban Streetwear",
    "ageLimit": "18+",
    "description": "La fiesta universitaria más esperada de la semana llega con la edición Reloaded: Pre-Party Oficial de Arcángel en Furia Club. Una noche cargada de perreo, clásicos del reggaeton y trap urbano con Open Gin & Sangría de cortesía para ellas hasta las 12:00 AM.",
    "perkHeadline": "TICKETS CON OPEN BAR SEGÚN PASE",
    "perkDetails": "Entradas vía MiEventos. Fast Pass $10 (Open Frozen 10-11:30PM), Sushi Pass $10 (Sushi 8:30-9:30PM + Open Bar 10-12AM), Campus $20 (Open Margarita 10-12AM).",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-CAMPUS-17",
    "instagramUrl": "https://www.instagram.com/furiaclubpanama/",
    "instagramHandle": "@furiaclubpanama",
    "mapPreview": "/images/furia_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Furia+Club+Panama+PH+La+Trona",
    "venueGallery": [
      {
        "url": "/images/venues/furia/club_lights.jpg",
        "title": "Pista Principal & Luces",
        "category": "Club Lights"
      },
      {
        "url": "/images/venues/furia/cover.jpg",
        "title": "Zona VIP & Mesas",
        "category": "VIP Lounge"
      }
    ],
    "perksIncluded": [
      "Pase digital universitario para reserva o check-in",
      "Open bar según categoría de boleto en MiEventos",
      "Acceso sujeto a aforo y control de taquilla",
      "Ambiente club con visuales oficiales gira Arcángel"
    ],
    "tableTiers": [
      {
        "name": "Pase Lista Libre (Gratuito)",
        "price": 0,
        "desc": "Entrada free + Open Gin & Sangría hasta las 12:00 AM."
      },
      {
        "name": "Mesa VIP On Campus (x4)",
        "price": 40,
        "desc": "Mesa preferencial con botella y atención exclusiva."
      }
    ]
  },
  {
    "id": "evt-terraplen-rooftop-jueves",
    "slug": "terraplen-hiphop-reggaeton-party",
    "venueSlug": "terraplen-rooftop",
    "indexable": true,
    "title": "HIP HOP & REGGAETON PARTY",
    "subtitle": "Music by DJ Joseph • Skyline Party",
    "category": "Nightlife & Ladies Night",
    "genre": "Hip Hop / Reggaeton / Latin Urban",
    "musicGenres": [
      "Hip Hop",
      "Reggaeton",
      "Latin Urban"
    ],
    "location": "Terraplén Rooftop (Terraza Abierta)",
    "address": "Edificio Brand Experience Center PB, Av. Eloy Alfaro",
    "city": "Casco Antiguo, Panamá",
    "dayOfWeek": "Jueves",
    "date": "Jueves, 17 Septiembre 2026",
    "eventDate": "2026-09-17T22:00:00",
    "time": "10:00 PM - 04:00 AM",
    "dinnerTime": "5:00 PM - 10:00 PM",
    "partyTime": "10:00 PM - 04:00 AM",
    "price": 0,
    "vipPrice": 10,
    "currency": "$",
    "capacity": 250,
    "spotsLeft": 12,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/jueves-17-terrapln-rooftop-hip-hop-reggaeton-party-music-by-dj-joseph",
    "image": "/images/flyer-terraplen-hiphop-jueves-17.png",
    "imageAlt": "Flyer oficial Terraplen Rooftop Hip Hop y Reggaeton con DJ Joseph en Casco Antiguo Panama",
    "seoTitle": "Terraplén Rooftop: Hip Hop & Reggaeton Jueves 17 Septiembre • Terraplén | ARRIVE Panamá",
    "seoDescription": "Ladies Night en Terraplén Rooftop Casco Antiguo Panamá con DJ Joseph y DJ Zapateiro. Open Gin & Sangría para ellas hasta las 12mn. Entrada libre con Pase Arrive.",
    "artists": [
      {
        "name": "DJ Joseph",
        "shortName": "DJ Joseph",
        "role": "Headliner DJ • Hip Hop & Latin Urban",
        "badge": "HEADLINER",
        "avatar": "/images/djs/dj-joseph.jpg",
        "instagram": "https://www.instagram.com/josephgutz507/",
        "instagramHandle": "@josephgutz507",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20joseph%20panama",
        "djSetTitle": "Hip Hop Rooftop Set",
        "bio": "Referente de la escena nocturna de Casco Antiguo y Terraplén Rooftop con sets cargados de hip hop, trap y ritmo latino."
      },
      {
        "name": "DJ Zapateiro",
        "shortName": "DJ Zapateiro",
        "role": "DJ Invitado • Crossover & Perreo",
        "badge": "INVITADO",
        "avatar": "/images/djs/dj-zapateiro.jpg",
        "instagram": "https://www.instagram.com/djzapateiro/",
        "instagramHandle": "@djzapateiro",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20miguel%20zapateiro",
        "djSetTitle": "Crossover Party Mix",
        "bio": "Reconocido animador y DJ de crossover en Panamá, encendiendo pistas con la mejor vibra urbana."
      }
    ],
    "dressCode": "Rooftop Glam / Smart Casual",
    "ageLimit": "18+",
    "description": "Los jueves se elevan en Terraplén Rooftop con los mejores hits de Hip Hop y Reggaeton seleccionados en vivo por DJ Joseph. Vista panorámica al mar y skyline de Panamá con Open Gin & Sangría para ellas hasta las 12:00 AM.",
    "perkHeadline": "ELLAS: OPEN GIN & SANGRÍA HASTA 12MN",
    "perkDetails": "Open Gin & Sangría para ellas de 10:00 PM a 12:00 AM en la terraza abierta. Entrada libre con Pase Arrive hasta medianoche.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-TERRAPLEN-17",
    "instagramUrl": "https://www.instagram.com/terraplenpanama/",
    "instagramHandle": "@terraplenpanama",
    "mapPreview": "/images/terraplen_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Terraplen+Rooftop+Panama+Casco+Antiguo",
    "venueGallery": [
      {
        "url": "/images/venues/terraplen/terrace_rooftop.jpg",
        "title": "Terraza Rooftop & Skyline",
        "category": "Skyline View"
      },
      {
        "url": "/images/venues/terraplen/ambiance.jpg",
        "title": "Atmósfera Nocturna Terraplén",
        "category": "Nightlife"
      }
    ],
    "perksIncluded": [
      "Pase Lady’s Night Arrive gratuito con QR",
      "Open Gin & Sangría para ellas de 10:00 PM a 12:00 AM",
      "Ellos entran free hasta las 12:00 AM",
      "Terraza Rooftop al aire libre con vista al Casco"
    ],
    "tableTiers": [
      {
        "name": "Pase Terraplén (Gratuito)",
        "price": 0,
        "desc": "Ingreso libre + Open Gin & Sangría hasta las 12:00 AM."
      },
      {
        "name": "Mesa VIP Rooftop (x4)",
        "price": 35,
        "desc": "Mesa preferencial con vista al skyline y atención de botella."
      }
    ]
  },
  {
    "id": "evt-piano-bar-ladies-night",
    "slug": "piano-bar-piano-ladies-night-jueves",
    "venueSlug": "piano-bar",
    "indexable": true,
    "title": "PIANO LADIES NIGHT",
    "subtitle": "The Piano Man Show (7PM-10PM) • Music by DJ Jose Antonio",
    "category": "Nightlife & Ladies Night",
    "genre": "Reggaeton / Crossover Music / Live Piano",
    "musicGenres": [
      "Reggaeton",
      "Crossover Music",
      "Live Piano"
    ],
    "location": "Piano Bar",
    "address": "Calle 48 Este, Calle Uruguay, Bella Vista",
    "city": "Bella Vista, Panamá",
    "dayOfWeek": "Jueves",
    "date": "Jueves, 17 Septiembre 2026",
    "eventDate": "2026-09-17T21:00:00",
    "time": "07:00 PM - 03:00 AM",
    "dinnerTime": null,
    "showTime": "7:00 PM - 10:00 PM",
    "partyTime": "10:00 PM - 03:00 AM",
    "price": 0,
    "vipPrice": 15,
    "currency": "$",
    "capacity": 200,
    "spotsLeft": 10,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/jueves-17-de-septiembre-piano-ladies-night-en-piano-bar",
    "image": "/images/flyer-piano-bar-ladies-night-17.jpg",
    "imageAlt": "Flyer oficial Piano Bar Piano Ladies Night con The Piano Man Show y DJ Jose Antonio",
    "seoTitle": "Piano Ladies Night Jueves 17 Septiembre • Piano Bar Calle Uruguay | ARRIVE",
    "seoDescription": "Jueves de Ladies Night en Piano Bar Panamá. Open Champagne & Cócteles para ellas hasta las 12mn. Entrada libre con Pase Arrive.",
    "artists": [
      {
        "name": "DJ Jose Antonio",
        "shortName": "DJ Jose Antonio",
        "role": "Headliner DJ • Reggaetón & Crossover",
        "badge": "HEADLINER",
        "avatar": "/images/venues/pianobar/bar.jpg",
        "instagram": "https://www.instagram.com/pianobarpanama/",
        "instagramHandle": "@djjoseantonio",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20jose%20antonio",
        "djSetTitle": "Piano Bar Ladies Night Mix",
        "bio": "Comandando la pista de Piano Bar los jueves con los mejores tracks de reggaetón y crossover."
      },
      {
        "name": "The Piano Man",
        "shortName": "The Piano Man",
        "role": "Live Show & Piano • 7PM - 10PM",
        "badge": "LIVE SHOW",
        "avatar": "/images/venues/pianobar/ambiance.jpg",
        "instagram": "https://www.instagram.com/pianobarpanama/",
        "instagramHandle": "@pianobarpanama",
        "djSetUrl": "https://www.instagram.com/pianobarpanama/",
        "djSetTitle": "The Piano Man Live Session",
        "bio": "Sesión instrumental y vocal de piano en vivo antes de la fiesta nocturna."
      }
    ],
    "dressCode": "Nightlife Chic / Elegant Casual",
    "ageLimit": "18+",
    "description": "La noche icónica de los jueves en Calle Uruguay: Piano Ladies Night en Piano Bar. Disfruta de la mejor coctelería de autor, música en vivo y Open Bar de bienvenida para ellas hasta las 12:00 AM.",
    "perkHeadline": "ELLAS: OPEN GIN & SANGRÍA 9-12MN",
    "perkDetails": "Ellas tienen Open Gin y Sangría de 9:00 PM a 12:00 MN en lista Arrive. The Piano Man Show de 7:00 PM a 10:00 PM y fiesta con DJ Jose Antonio.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-PIANO-17",
    "instagramUrl": "https://www.instagram.com/pianobarpanama/",
    "instagramHandle": "@pianobarpanama",
    "mapPreview": "/images/furia_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Piano+Bar+Calle+Uruguay+Panama",
    "venueGallery": [
      {
        "url": "/images/venues/pianobar/bar.jpg",
        "title": "Barra Principal & Coctelería",
        "category": "Cocktail Bar"
      },
      {
        "url": "/images/venues/pianobar/ambiance.jpg",
        "title": "Salón Climatizado & Piano",
        "category": "Live Lounge"
      }
    ],
    "perksIncluded": [
      "Acceso con Pase Digital Arrive",
      "Entrada libre hasta las 11:00 PM",
      "Consumo regular en barra y cócteles de autor",
      "Sesión de House Music de alta fidelidad"
    ],
    "tableTiers": [
      {
        "name": "Pase Ladies Night (Gratuito)",
        "price": 0,
        "desc": "Entrada preferencial + Open Bar hasta las 12:00 AM."
      },
      {
        "name": "Mesa VIP Piano Lounge (x4)",
        "price": 30,
        "desc": "Mesa reservada en el salón principal."
      }
    ]
  },
  {
    "id": "evt-furia-house-viernes",
    "slug": "furia-house-viernes-18-septiembre",
    "venueSlug": "furia-club",
    "indexable": true,
    "title": "FURIA HOUSE",
    "subtitle": "Saint Laurent Events • Music by Drek (Furia)",
    "category": "Nightlife & Electrónica",
    "genre": "House / Tech-House / Melodic",
    "musicGenres": [
      "House",
      "Tech-House",
      "Electronic"
    ],
    "location": "Furia Club",
    "address": "PH La Trona, Calle Rogelio Alfaro",
    "city": "Ciudad de Panamá",
    "dayOfWeek": "Viernes",
    "date": "Viernes, 18 Septiembre 2026",
    "eventDate": "2026-09-18T22:00:00",
    "time": "05:00 PM - 04:00 AM",
    "dinnerTime": "5:00 PM - 10:30 PM",
    "partyTime": "11:00 PM - 04:00 AM",
    "price": 0,
    "vipPrice": 30,
    "currency": "$",
    "capacity": 350,
    "spotsLeft": 18,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/furia-house-vierne-18-de-septiembre",
    "image": "/images/flyer-furia-house-viernes-18.jpg",
    "imageAlt": "Flyer oficial Furia House Saint Laurent Events Music by Drek Viernes 18 Septiembre",
    "seoTitle": "Furia House: Afro & Tech Viernes 18 Septiembre • Furia Club | ARRIVE",
    "seoDescription": "Viernes de música electrónica de primer nivel en Furia Club: Furia House con los mejores ritmos de Tech House y Afro House en Panamá.",
    "artists": [
      {
        "name": "Drek",
        "shortName": "Drek",
        "role": "Headliner DJ • House & Tech-House",
        "badge": "HEADLINER",
        "avatar": "/images/venues/furia/club_lights.jpg",
        "instagram": "https://www.instagram.com/furiaclubpanama/",
        "instagramHandle": "@drek_music",
        "djSetUrl": "https://soundcloud.com/search?q=drek%20house",
        "djSetTitle": "Furia House Special Set",
        "bio": "Curador de las noches electrónicas en Furia Club con sets envolventes de house y tech-house."
      }
    ],
    "dressCode": "Nightlife Chic / All Black Glam",
    "ageLimit": "18+",
    "description": "Furia se transforma en el templo de la música electrónica de la ciudad con FURIA HOUSE: una selección curada de Tech House, Afro House y grooves melódicos. Open Gin & Sangría de cortesía para ellas de 10:00 PM a 12:00 AM con tu Pase Arrive.",
    "perkHeadline": "LISTA ARRIVE HASTA 11:30 PM",
    "perkDetails": "Acceso en lista Arrive válido hasta las 11:30 PM según aforo. Saint Laurent Events presenta a Drek en cabina de Furia. Consumo regular en barra.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-HOUSE-18",
    "instagramUrl": "https://www.instagram.com/furiaclubpanama/",
    "instagramHandle": "@furiaclubpanama",
    "mapPreview": "/images/furia_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Furia+Club+Panama+PH+La+Trona",
    "venueGallery": [
      {
        "url": "/images/venues/furia/club_lights.jpg",
        "title": "Cabina Principal de DJ",
        "category": "DJ Deck"
      },
      {
        "url": "/images/venues/furia/vip_bottles.jpg",
        "title": "Servicio VIP de Botellas",
        "category": "VIP Service"
      }
    ],
    "perksIncluded": [
      "Pase de lista preferencial Arrive",
      "Ingreso prioritario hasta las 11:30 PM",
      "Consumo regular en barra",
      "Sets de Afro House y Tech en pista 360°"
    ],
    "tableTiers": [
      {
        "name": "Pase General Arrive (Gratuito)",
        "price": 0,
        "desc": "Acceso por lista oficial + Open Bar para ellas."
      },
      {
        "name": "Mesa VIP Furia House (x4)",
        "price": 50,
        "desc": "Mesa en zona dancefloor con atención de mesero personal."
      }
    ]
  },
  {
    "id": "evt-terraplen-viejito-viernes",
    "slug": "terraplen-rooftop-reggaeton-viejito",
    "venueSlug": "terraplen-rooftop",
    "indexable": true,
    "title": "R&B & REGGAETON VIEJITO PARTY",
    "subtitle": "Music by DJ Rock • Noche de Clásicos Urbanos",
    "category": "Nightlife & Reggaeton",
    "genre": "R&B / Reggaeton Viejito / Clásicos Old School",
    "musicGenres": [
      "Reggaeton Viejito",
      "R&B Classics",
      "Old School"
    ],
    "location": "Terraplén Rooftop (Terraza Abierta)",
    "address": "Edificio Brand Experience Center PB, Av. Eloy Alfaro",
    "city": "Casco Antiguo, Panamá",
    "dayOfWeek": "Viernes",
    "date": "Viernes, 18 Septiembre 2026",
    "eventDate": "2026-09-18T22:00:00",
    "time": "10:00 PM - 04:00 AM",
    "dinnerTime": "5:00 PM - 10:00 PM",
    "partyTime": "10:00 PM - 04:00 AM",
    "price": 0,
    "vipPrice": 10,
    "currency": "$",
    "capacity": 280,
    "spotsLeft": 8,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/viernes-16",
    "image": "/images/flyer-terraplen-reggaeton-viejito-18.png",
    "imageAlt": "Flyer oficial Terraplen Rooftop Reggaeton Viejito y RB DJ Rock en Casco Viejo Panama",
    "seoTitle": "Terraplén Rooftop: R&B y Reggaeton Viejito Viernes 18 Septiembre • Terraplén | ARRIVE Panamá",
    "seoDescription": "Noche de clásicos urbanos y perreo viejito en Terraplén Rooftop Casco Antiguo con DJ Rock y DJ Joseph. Open Gin & Sangría para ellas hasta medianoche con Pase Arrive.",
    "artists": [
      {
        "name": "DJ Rock",
        "shortName": "DJ Rock",
        "role": "Headliner DJ • Old School & R&B Classics",
        "badge": "HEADLINER",
        "avatar": "/images/djs/dj-rock.jpg",
        "instagram": "https://www.instagram.com/djrockpanama/",
        "instagramHandle": "@djrockpanama",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20rock%20panama",
        "djSetTitle": "Old School Reggaeton Set",
        "bio": "Maestro de las tandas retro, perreo viejito y R&B clásico en Terraplén Rooftop."
      },
      {
        "name": "DJ Joseph",
        "shortName": "DJ Joseph",
        "role": "DJ Residente • Urban & Latin Beats",
        "badge": "RESIDENTE",
        "avatar": "/images/djs/dj-joseph.jpg",
        "instagram": "https://www.instagram.com/josephgutz507/",
        "instagramHandle": "@josephgutz507",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20joseph%20panama",
        "djSetTitle": "Terraplén Skyline Session",
        "bio": "Residente en Terraplén Rooftop con las mejores mezclas urbanas con vista al skyline de Casco Antiguo."
      }
    ],
    "dressCode": "Urban Luxury / Retro Chic",
    "ageLimit": "18+",
    "description": "Viernes especial en Terraplén Rooftop dedicado a las joyas del R&B y el perreo viejito que marcaron época, con sesión exclusiva de DJ Rock. Disfruta de Open Gin & Sangría de cortesía para ellas de 10:00 PM a 12:00 AM con tu pase Arrive.",
    "perkHeadline": "ELLAS: OPEN GIN & SANGRÍA HASTA 12MN",
    "perkDetails": "Open Gin & Sangría para ellas de 9:00 PM a 12:00 MN en la terraza Rooftop con DJ Rock y DJ Joseph.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-VIEJITO-18",
    "instagramUrl": "https://www.instagram.com/terraplenpanama/",
    "instagramHandle": "@terraplenpanama",
    "mapPreview": "/images/terraplen_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Terraplen+Rooftop+Panama+Casco+Antiguo",
    "venueGallery": [
      {
        "url": "/images/venues/terraplen/terrace_rooftop.jpg",
        "title": "Skyline Nocturno Terraplén",
        "category": "Skyline"
      }
    ],
    "perksIncluded": [
      "Pase Oficial Arrive con QR verificado",
      "Open Gin & Sangría para ellas de 10:00 PM a 12:00 AM",
      "Ellos entran free hasta las 12:00 AM",
      "Acceso preferencial al Rooftop sin fila"
    ],
    "tableTiers": [
      {
        "name": "Entrada General Arrive (Gratuito)",
        "price": 0,
        "desc": "Acceso por lista + Open Gin & Sangría hasta las 12:00 AM."
      },
      {
        "name": "Mesa VIP Rooftop (x4)",
        "price": 45,
        "desc": "Mesa reservada en zona VIP frente a cabina de DJ."
      }
    ]
  },
  {
    "id": "evt-terraplen-piso002-sinfonico",
    "slug": "terraplen-piso 002-reggaeton-sinfonico",
    "venueSlug": "terraplen-rooftop",
    "indexable": true,
    "title": "REGGAETÓN SINFÓNICO",
    "subtitle": "DJ Joseph • DJ Yankee • DJ Miguel Zapateiro • Show Sorpresa",
    "category": "Nightlife & Reggaeton",
    "genre": "Reggaetón Sinfónico / Trap Latino / Underground Club",
    "musicGenres": [
      "Reggaetón Sinfónico",
      "Trap Latino",
      "Underground Beats"
    ],
    "location": "Terraplén Piso 002 (Restaurant / Discoteca Cerrado)",
    "address": "Edificio Brand Experience Center PB, Av. Eloy Alfaro",
    "city": "Casco Antiguo, Panamá",
    "dayOfWeek": "Viernes",
    "date": "Viernes, 18 Septiembre 2026",
    "eventDate": "2026-09-18T23:00:00",
    "time": "11:00 PM - 04:00 AM",
    "dinnerTime": "6:00 PM - 10:00 PM",
    "partyTime": "11:00 PM - 04:00 AM",
    "price": 0,
    "vipPrice": 20,
    "currency": "$",
    "capacity": 220,
    "spotsLeft": 14,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/viernes-18-terrapln-piso 002-reggaeton-sinfnico-music-by-dj-joseph",
    "image": "/images/flyer-terraplen-piso002-sinfonico-18.jpg",
    "imageAlt": "Flyer oficial Terraplen Piso 002 Reggaeton Sinfonico con DJ Joseph, DJ Yankee y DJ Miguel Zapateiro",
    "seoTitle": "Terraplén Piso 002: Reggaetón Sinfónico Viernes 18 Septiembre | ARRIVE",
    "seoDescription": "Baja al underground en Terraplén Piso 002 con Reggaetón Sinfónico en vivo por DJ Joseph en Casco Antiguo Panamá. Pase Arrive con cortesía.",
    "artists": [
      {
        "name": "DJ Joseph",
        "shortName": "DJ Joseph",
        "role": "Residente Piso 002 • Reggaetón Sinfónico",
        "badge": "RESIDENTE",
        "avatar": "/images/djs/dj-joseph.jpg",
        "instagram": "https://www.instagram.com/josephgutz507/",
        "instagramHandle": "@josephgutz507",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20joseph%20panama",
        "djSetTitle": "Reggaetón Sinfónico Set",
        "bio": "Referente del club nocturno liderando la fusión sinfónica de música urbana en Piso 002."
      },
      {
        "name": "DJ Yankee",
        "shortName": "DJ Yankee",
        "role": "DJ Invitado • Perreo & Crossover",
        "badge": "INVITADO",
        "avatar": "/images/venues/terraplen/party.jpg",
        "instagram": "https://www.instagram.com/terraplenpanama/",
        "instagramHandle": "@djyankee",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20yankee%20panama",
        "djSetTitle": "Sinfónico Urban Mix",
        "bio": "Especialista en transiciones demoledoras de reggaeton clásico y perreo intenso."
      },
      {
        "name": "DJ Miguel Zapateiro",
        "shortName": "DJ Zapateiro",
        "role": "DJ Invitado • Dembow & Urban Beats",
        "badge": "INVITADO",
        "avatar": "/images/djs/dj-zapateiro.jpg",
        "instagram": "https://www.instagram.com/djzapateiro/",
        "instagramHandle": "@djzapateiro",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20zapateiro%20panama",
        "djSetTitle": "Piso 002 Explosive Set",
        "bio": "Sonido contundente para hacer temblar la pista de baile cerrada de Casco Antiguo."
      }
    ],
    "dressCode": "Underground Chic / Dark Glam",
    "ageLimit": "18+",
    "description": "Descubre el lado subterráneo de Casco Antiguo en Terraplén Piso 002: una atmósfera tipo boiler room con iluminación carmesí y la sesión conceptual REGGAETÓN SINFÓNICO dirigida por DJ Joseph. Cóctel de bienvenida de cortesía para ellas.",
    "perkHeadline": "ELLAS: OPEN GIN & SANGRÍA 9-12MN",
    "perkDetails": "Open Gin y Sangría para ellas de 9:00 PM a 12:00 MN en Piso 002 discoteca cerrada. Show en vivo sorpresa y sets con DJ Joseph, DJ Yankee y DJ Miguel Zapateiro.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-PISO002-18",
    "instagramUrl": "https://www.instagram.com/terraplenpanama/",
    "instagramHandle": "@terraplenpanama",
    "mapPreview": "/images/terraplen_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Terraplen+Rooftop+Panama+Casco+Antiguo",
    "venueGallery": [
      {
        "url": "/images/venues/terraplen/ambiance.jpg",
        "title": "Ambiente Piso 002",
        "category": "Underground"
      }
    ],
    "perksIncluded": [
      "Acceso al club cerrado Piso 002",
      "Climatización total y acústica de alta potencia",
      "Consumo regular de barra y menú gastronómico",
      "Show musical Reggaetón Sinfónico con DJ Joseph"
    ],
    "tableTiers": [
      {
        "name": "Pase Lista Digital (Gratuito)",
        "price": 0,
        "desc": "Entrada gratis al sótano club hasta las 12:00 AM."
      },
      {
        "name": "Mesa VIP Piso 002 (x4)",
        "price": 35,
        "desc": "Mesa subterránea con servicio de botellas preferencial."
      }
    ]
  },
  {
    "id": "evt-la-rosalia-after-donaty",
    "slug": "la-rosalia-after-party-concierto-donaty",
    "venueSlug": "la-rosalia",
    "indexable": true,
    "title": "LA ROSALÍA FRIDAYS",
    "subtitle": "Music by DJ Raulin ✦ MC Killah • Downtown Amador",
    "category": "Nightlife & After Concert",
    "genre": "Dembow / Reggaeton / Dominican Urban / Party Hits",
    "musicGenres": [
      "Dembow",
      "Reggaeton",
      "Urban Party"
    ],
    "location": "La Rosalía (Downtown Amador)",
    "address": "Downtown Amador, Calzada de Amador",
    "city": "Amador, Ciudad de Panamá",
    "dayOfWeek": "Viernes",
    "date": "Viernes, 18 Septiembre 2026",
    "eventDate": "2026-09-18T22:00:00",
    "time": "10:00 PM - 08:00 AM",
    "dinnerTime": null,
    "partyTime": "10:00 PM - 04:00 AM",
    "price": 0,
    "vipPrice": 25,
    "currency": "$",
    "capacity": 450,
    "spotsLeft": 22,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/la-rosalia-after-party-oficial-concierto-donaty-viernes-18-de-septiembre",
    "image": "/images/flyer-la-rosalia-fridays-18.jpg",
    "imageAlt": "Flyer oficial La Rosalia Fridays con DJ Raulin y MC Killah Viernes 18 Septiembre",
    "seoTitle": "After Party Oficial Concierto Donaty Viernes 18 Septiembre • La Rosalía Amador | ARRIVE",
    "seoDescription": "El after party oficial de Donaty en La Rosalía Downtown Amador. Dembow, perreo y ambiente hasta las 5AM. Entrada con Pase Arrive.",
    "artists": [
      {
        "name": "DJ Raulin",
        "shortName": "DJ Raulin",
        "role": "Headliner DJ • Perreo & Trap Latino",
        "badge": "HEADLINER",
        "avatar": "/images/venues/furia/club_lights.jpg",
        "instagram": "https://www.instagram.com/larosaliapanama/",
        "instagramHandle": "@djraulin",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20raulin",
        "djSetTitle": "La Rosalía Friday Mix",
        "bio": "Encargado de la cabina de La Rosalía Fridays con una sesión intensa de música urbana y perreo."
      },
      {
        "name": "MC Killah",
        "shortName": "MC Killah",
        "role": "Host & Animador Oficial",
        "badge": "HOST",
        "avatar": "/images/venues/furia/dining_room.jpg",
        "instagram": "https://www.instagram.com/larosaliapanama/",
        "instagramHandle": "@mckillah",
        "djSetUrl": "https://soundcloud.com/search?q=mc%20killah",
        "djSetTitle": "Live Hype & Mic",
        "bio": "La voz que enciende la pista de Downtown Amador en las noches de La Rosalía."
      }
    ],
    "dressCode": "Urban Streetwear / Party Glam",
    "ageLimit": "18+",
    "description": "Al terminar el concierto, la verdadera fiesta continúa en Downtown Amador con el AFTER PARTY OFICIAL de DONATY en La Rosalía. La mejor energía caribeña, dembow y reggaeton hasta el amanecer. Disfruta de Open Bar de bienvenida de 10:00 PM a 12:00 AM con tu Pase Arrive.",
    "perkHeadline": "OPEN BAR ELLAS Y ELLOS 10-12MN",
    "perkDetails": "Open Bar para ellas y ellos de 10:00 PM a 12:00 MN de Ron y Vodka. Música por DJ Raulin y MC Killah en tarima. Sesión extendida de After Party de 4:00 AM a 8:00 AM. Self Parking en Amador.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-ROSALIA-18",
    "instagramUrl": "https://www.instagram.com/larosaliapanama/",
    "instagramHandle": "@larosaliapanama",
    "mapPreview": "/images/furia_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=La+Rosalia+Downtown+Amador+Panama",
    "venueGallery": [
      {
        "url": "/images/venues/furia/tree_lounge.jpg",
        "title": "Pista Central La Rosalía",
        "category": "Dancefloor"
      }
    ],
    "perksIncluded": [
      "Acceso oficial a la sesión After Party (4AM - 8AM)",
      "Self Parking en Downtown Amador",
      "Servicio de coctelería de autor y botellas VIP",
      "Sin cena (venue de coctelería y fiesta)"
    ],
    "tableTiers": [
      {
        "name": "Pase General After (Gratuito)",
        "price": 0,
        "desc": "Acceso por lista oficial hasta las 12:00 AM."
      },
      {
        "name": "Mesa VIP After Concert (x4)",
        "price": 50,
        "desc": "Mesa VIP con botella y servicio de anfitrión."
      }
    ],
    "afterPartyTime": "04:00 AM - 08:00 AM"
  },
  {
    "id": "evt-piano-bar-reggaeton-viejito",
    "slug": "piano-bar-reggaeton-del-viejito-party-viernes",
    "venueSlug": "piano-bar",
    "indexable": true,
    "title": "REGGAETON VIEJITO PARTY",
    "subtitle": "Hosted by Abril Anria • Music by Baila Reggaeton",
    "category": "Nightlife & Reggaeton",
    "genre": "Reggaeton Viejito / Clásicos 2000s / Latin Party",
    "musicGenres": [
      "Reggaeton Viejito",
      "Clásicos 2000s",
      "Latin Hits"
    ],
    "location": "Piano Bar",
    "address": "Calle 48 Este, Calle Uruguay, Bella Vista",
    "city": "Bella Vista, Panamá",
    "dayOfWeek": "Viernes",
    "date": "Viernes, 18 Septiembre 2026",
    "eventDate": "2026-09-18T22:00:00",
    "time": "08:00 PM - 03:30 AM",
    "dinnerTime": null,
    "partyTime": "08:00 PM - 03:30 AM",
    "price": 0,
    "vipPrice": 20,
    "currency": "$",
    "capacity": 220,
    "spotsLeft": 12,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/viernes-18-de-septiembre-reggaeton-del-viejito-party-en-piano-bar",
    "image": "/images/flyer-piano-bar-reggaeton-viejito-18.jpg",
    "imageAlt": "Flyer oficial Piano Bar Reggaeton Viejito Party con Abril Anria y Baila Reggaeton",
    "seoTitle": "Piano Bar: Reggaetón del Viejito Party Viernes 18 Septiembre | ARRIVE",
    "seoDescription": "Los grandes éxitos del perreo 2000s en Piano Bar Calle Uruguay. Don Omar, Daddy Yankee, Wisin & Yandel con Open Gin & Sangría con Pase Arrive.",
    "artists": [
      {
        "name": "Abril Anria",
        "shortName": "Abril Anria",
        "role": "Host & Conductora Especial",
        "badge": "HOST",
        "avatar": "/images/venues/pianobar/ambiance.jpg",
        "instagram": "https://www.instagram.com/abrllanria/",
        "instagramHandle": "@abrllanria",
        "djSetUrl": "https://www.instagram.com/abrllanria/",
        "djSetTitle": "Host Oficial Piano Bar",
        "bio": "Personalidad e influencer panameña encargada del hosting de las noches temáticas en Piano Bar."
      },
      {
        "name": "Baila Reggaeton",
        "shortName": "Baila Reggaeton",
        "role": "DJs & Curaduría Old School",
        "badge": "HEADLINER",
        "avatar": "/images/venues/pianobar/cover.jpg",
        "instagram": "https://www.instagram.com/pianobarpanama/",
        "instagramHandle": "@bailareggaeton",
        "djSetUrl": "https://soundcloud.com/search?q=baila%20reggaeton%20viejito",
        "djSetTitle": "Las Que Te Sabes de Memoria",
        "bio": "Selección nostálgica e impecable de los grandes himnos de la época dorada del reggaetón."
      }
    ],
    "dressCode": "Nightlife Chic / Smart Casual",
    "ageLimit": "18+",
    "description": "Los viernes son de pura nostalgia urbana en Piano Bar con la fiesta REGGAETÓN DEL VIEJITO: toda la discografía dorada de los 2000s cantada a coro con cócteles signature y Open Gin & Sangría para ellas hasta las 12:00 AM.",
    "perkHeadline": "ELLAS: OPEN GIN & SANGRÍA 9-12MN",
    "perkDetails": "Open Gin y Sangría para ellas de 9:00 PM a 12:00 MN en lista Arrive. Conducción especial de Abril Anria y sets de reggaetón viejito con Baila Reggaeton.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-PIANO-18",
    "instagramUrl": "https://www.instagram.com/pianobarpanama/",
    "instagramHandle": "@pianobarpanama",
    "mapPreview": "/images/furia_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Piano+Bar+Calle+Uruguay+Panama",
    "venueGallery": [
      {
        "url": "/images/venues/pianobar/bar.jpg",
        "title": "Bar & Coctelería",
        "category": "Bar"
      }
    ],
    "perksIncluded": [
      "Open Gin & Sangría para ellas de 8:00 PM a 12:00 MN",
      "Ellos acceso en lista Arrive con consumo regular",
      "Clásicos de reggaetón viejito en Piano Bar",
      "Ambiente íntimo en PH La Trona"
    ],
    "tableTiers": [
      {
        "name": "Pase Lista Arrive (Gratuito)",
        "price": 0,
        "desc": "Acceso free + Open Bar para ellas hasta medianoche."
      },
      {
        "name": "Mesa VIP Clásica (x4)",
        "price": 40,
        "desc": "Mesa con botella y atención de camarero personal."
      }
    ]
  },
  {
    "id": "evt-furia-mansion-reggaeton-sabado",
    "slug": "furia-mansion-reggaeton-jorge-pascual",
    "venueSlug": "furia-club",
    "indexable": true,
    "title": "MANSION REGGAETON",
    "subtitle": "Sábado 19 Septiembre • Pista Central Furia",
    "category": "Nightlife & Reggaeton",
    "genre": "Reggaeton / Perreo 2000s / Neo Perreo / Urban Hits",
    "musicGenres": [
      "Reggaeton",
      "Perreo 2000s",
      "Neo Perreo"
    ],
    "location": "Furia Club",
    "address": "PH La Trona, Calle Rogelio Alfaro",
    "city": "Ciudad de Panamá",
    "dayOfWeek": "Sabado",
    "date": "Sábado, 19 Septiembre 2026",
    "eventDate": "2026-09-19T22:00:00",
    "time": "05:00 PM - 04:00 AM",
    "dinnerTime": "5:00 PM - 10:30 PM",
    "partyTime": "11:00 PM - 04:00 AM",
    "price": 0,
    "vipPrice": 30,
    "currency": "$",
    "capacity": 400,
    "spotsLeft": 16,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/furia-mansin-reggaeton-hosted-by-jorge-pascual-sbado-19-de-septiembre-",
    "image": "/images/flyer-furia-mansion-sabado-19.jpg",
    "imageAlt": "Flyer oficial Furia Mansion Reggaeton Sabado 19 Septiembre Panama",
    "seoTitle": "Furia Mansión Reggaetón Sábado 19 Septiembre • Hosted by Jorge Pascual | ARRIVE",
    "seoDescription": "El evento estelar del sábado en Panamá: Mansión Reggaetón con Jorge Pascual en Furia Club. Open Bar para ellas y entrada libre con Pase Arrive.",
    "artists": [
      {
        "name": "Jorge Pascual",
        "shortName": "Jorge Pascual",
        "role": "Host Oficial & Entertainment",
        "badge": "HOST OFICIAL",
        "avatar": "/images/venues/furia/club_lights.jpg",
        "instagram": "https://www.instagram.com/jorgepascualoficial/",
        "instagramHandle": "@jorgepascualoficial",
        "djSetUrl": "https://soundcloud.com/search?q=mansion%20reggaeton%20furia",
        "djSetTitle": "Mansión Reggaetón Live Hype",
        "bio": "El anfitrión número uno del perreo en Panamá, animando la noche más candente de Furia Club."
      },
      {
        "name": "DJ Oriel Alexander",
        "shortName": "DJ Oriel",
        "role": "Residente Furia • Main Dancefloor Set",
        "badge": "RESIDENTE",
        "avatar": "/images/djs/dj-oriel.jpg",
        "instagram": "https://www.instagram.com/djorielalexander/",
        "instagramHandle": "@djorielalexander",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20oriel%20alexander",
        "djSetTitle": "Sábado Mansión Mix",
        "bio": "Sets de alta potencia combinando reggaeton moderno con las canciones más cantadas del planeta."
      }
    ],
    "dressCode": "Nightlife Chic / Urban Glam",
    "ageLimit": "18+",
    "description": "El sábado llega a su punto máximo con MANSIÓN REGGAETÓN: la fiesta insignia de Furia Club bajo la animación y hosting de Jorge Pascual. Lleno total, producción audiovisual de concierto y Open Bar de bienvenida para ellas hasta las 12:00 AM con Pase Digital Arrive.",
    "perkHeadline": "LISTA ARRIVE HASTA 11:30 PM",
    "perkDetails": "Sábado estelar de Mansion Reggaeton en Furia Club. Entrada en lista Arrive válida hasta las 11:30 PM sujeta a aforo. Mesas VIP y servicio de botellas.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-MANSION-19",
    "instagramUrl": "https://www.instagram.com/furiaclubpanama/",
    "instagramHandle": "@furiaclubpanama",
    "mapPreview": "/images/furia_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Furia+Club+Panama+PH+La+Trona",
    "venueGallery": [
      {
        "url": "/images/venues/furia/cover.jpg",
        "title": "Main Room Mansión",
        "category": "Dancefloor"
      }
    ],
    "perksIncluded": [
      "Pase de cortesía en lista hasta las 11:30 PM",
      "Hosting oficial en tarima por Jorge Pascual",
      "Consumo regular en barra y servicio de botellas",
      "Ambiente Mansión Reggaetón en pista central"
    ],
    "tableTiers": [
      {
        "name": "Pase Lista Oficial (Gratuito)",
        "price": 0,
        "desc": "Acceso en lista Arrive + Open Bar hasta medianoche."
      },
      {
        "name": "Mesa VIP Mansión (x4)",
        "price": 60,
        "desc": "Mesa en zona privilegiada con vista total a la pista."
      }
    ]
  },
  {
    "id": "evt-terraplen-piso002-red-room",
    "slug": "terraplen-piso 002-red-room-party-k4g",
    "venueSlug": "terraplen-rooftop",
    "indexable": true,
    "title": "RED ROOM PARTY",
    "subtitle": "Reggaeton & Plena by Baila Reggaeton, DJ Irving & K4G",
    "category": "Nightlife & Urban Party",
    "genre": "Perreo Red Room / Dembow / Urban House",
    "musicGenres": [
      "Red Room Perreo",
      "Dembow",
      "Urban House"
    ],
    "location": "Terraplén Piso 002 (Restaurant / Discoteca Cerrado)",
    "address": "Edificio Brand Experience Center PB, Av. Eloy Alfaro",
    "city": "Casco Antiguo, Panamá",
    "dayOfWeek": "Sabado",
    "date": "Sábado, 19 Septiembre 2026",
    "eventDate": "2026-09-19T23:00:00",
    "time": "11:00 PM - 04:00 AM",
    "dinnerTime": "6:00 PM - 10:00 PM",
    "partyTime": "11:00 PM - 04:00 AM",
    "price": 0,
    "vipPrice": 25,
    "currency": "$",
    "capacity": 220,
    "spotsLeft": 9,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/sbado-19-terrapln-piso 002-red-room-party-music-by-dj-irviing-k4g",
    "image": "/images/flyer-terraplen-piso002-red-room-19.jpg",
    "imageAlt": "Flyer oficial Terraplen Piso 002 Red Room Party con Baila Reggaeton, DJ Irving y K4G",
    "seoTitle": "Red Room Party Sábado 19 Septiembre • Terraplén Piso 002 | ARRIVE",
    "seoDescription": "Sesión exclusiva Red Room con DJ Irving y K4G en Terraplén Piso 002. Perreo intenso, luces rojas y ambiente club clandestino en Casco Viejo.",
    "artists": [
      {
        "name": "DJ Irving",
        "shortName": "DJ Irving",
        "role": "Headliner DJ • Reggaetón & Plena",
        "badge": "HEADLINER",
        "avatar": "/images/venues/terraplen/party.jpg",
        "instagram": "https://www.instagram.com/terraplenpanama/",
        "instagramHandle": "@djirving",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20irving%20panama",
        "djSetTitle": "Red Room Live Mix",
        "bio": "Comandando la cabina subterránea de Piso 002 con una sesión explosiva de reggaetón clásico y plena panameña."
      },
      {
        "name": "K4G",
        "shortName": "K4G",
        "role": "Productor Musical & DJ • Plena & Dembow",
        "badge": "HEADLINER",
        "avatar": "/images/venues/terraplen/ambiance.jpg",
        "instagram": "https://www.instagram.com/k4gmusica/",
        "instagramHandle": "@k4gmusica",
        "djSetUrl": "https://soundcloud.com/search?q=k4g%20panama",
        "djSetTitle": "K4G Dembow Session",
        "bio": "Reconocido productor musical y DJ referente de los ritmos urbanos y la plena en Panamá."
      },
      {
        "name": "Baila Reggaeton",
        "shortName": "Baila Reggaeton",
        "role": "Crew & Curaduría de Perreo",
        "badge": "CREW",
        "avatar": "/images/venues/terraplen/cover.jpg",
        "instagram": "https://www.instagram.com/terraplenpanama/",
        "instagramHandle": "@bailareggaeton",
        "djSetUrl": "https://soundcloud.com/search?q=baila%20reggaeton",
        "djSetTitle": "Perreo Puro Set",
        "bio": "El movimiento y curaduría de la noche más caliente en el club cerrado de Casco Antiguo."
      }
    ],
    "dressCode": "Red & Black Glam / Streetwear Sofisticado",
    "ageLimit": "18+",
    "description": "La sesión clandestina más comentada del Casco Viejo: RED ROOM PARTY en Terraplén Piso 002. Iluminación escarlata, atmósfera íntima de club underground y una sesión a cuatro manos de DJ Irving y K4G. Open Gin & Sangría para ellas hasta medianoche.",
    "perkHeadline": "ELLAS: FREE HASTA 11PM + OPEN GIN 9-12MN",
    "perkDetails": "Mujeres entran gratis hasta las 11:00 PM en lista Arrive + Ellas tienen Open Gin y Sangría de 9:00 PM a 12:00 MN en Piso 002 club cerrado. Reggaeton & Plena con Baila Reggaeton, DJ Irving y K4G.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-REDROOM-19",
    "instagramUrl": "https://www.instagram.com/terraplenpanama/",
    "instagramHandle": "@terraplenpanama",
    "mapPreview": "/images/terraplen_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Terraplen+Rooftop+Panama+Casco+Antiguo",
    "venueGallery": [
      {
        "url": "/images/venues/terraplen/party.jpg",
        "title": "Cabina Red Room & Iluminación",
        "category": "Red Room"
      }
    ],
    "perksIncluded": [
      "Acceso a la atmósfera Red Room en Piso 002 cerrado",
      "Presentación exclusiva de DJ Irving & K4G",
      "Sin open bar incluido (consumo regular)",
      "Climatización completa y acústica underground"
    ],
    "tableTiers": [
      {
        "name": "Pase Red Room (Gratuito)",
        "price": 0,
        "desc": "Entrada en lista digital hasta las 12:00 AM."
      },
      {
        "name": "Mesa VIP Red Room (x4)",
        "price": 45,
        "desc": "Mesa exclusiva en el sótano con servicio de botellas."
      }
    ]
  },
  {
    "id": "evt-terraplen-sabado-19",
    "slug": "terraplen-rooftop-sabado-skyline-party",
    "venueSlug": "terraplen-rooftop",
    "indexable": true,
    "title": "BOILER REGGAETON (UFO EDITION)",
    "subtitle": "UFO Edition • Music by DJ Joseph & DJ Zapateiro",
    "category": "Nightlife & Sunset Rooftop",
    "genre": "Latin Urban / Crossover / Sunset Melodic",
    "musicGenres": [
      "Latin Urban",
      "Crossover",
      "Sunset Melodic"
    ],
    "location": "Terraplén Rooftop (Terraza Abierta)",
    "address": "Edificio Brand Experience Center PB, Av. Eloy Alfaro",
    "city": "Casco Antiguo, Panamá",
    "dayOfWeek": "Sabado",
    "date": "Sábado, 19 Septiembre 2026",
    "eventDate": "2026-09-19T18:00:00",
    "time": "06:00 PM - 04:00 AM",
    "dinnerTime": "5:00 PM - 10:00 PM",
    "partyTime": "10:00 PM - 04:00 AM",
    "price": 0,
    "vipPrice": 20,
    "currency": "$",
    "capacity": 300,
    "spotsLeft": 11,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/sbado-19",
    "image": "/images/flyer-terraplen-boiler-reggaeton-19.jpg",
    "imageAlt": "Flyer oficial Terraplen Rooftop Boiler Reggaeton Sabado 19 con DJ Joseph y DJ Zapateiro",
    "seoTitle": "Saturday Sunset & Night Sábado 19 Septiembre • Terraplén Rooftop | ARRIVE",
    "seoDescription": "Sábado de puesta de sol y fiesta en la terraza más codiciada de Casco Antiguo. Vista al mar, DJs en vivo y Open Gin & Sangría para ellas.",
    "artists": [
      {
        "name": "DJ Joseph",
        "shortName": "DJ Joseph",
        "role": "Headliner DJ • Boiler Reggaeton Set",
        "badge": "HEADLINER",
        "avatar": "/images/djs/dj-joseph.jpg",
        "instagram": "https://www.instagram.com/josephgutz507/",
        "instagramHandle": "@josephgutz507",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20joseph%20panama",
        "djSetTitle": "Boiler Rooftop Live",
        "bio": "Comandando la cabina en la terraza de Casco con lo más pesado del perreo y reggaetón."
      },
      {
        "name": "DJ Zapateiro",
        "shortName": "DJ Zapateiro",
        "role": "Invitado Especial • Perreo & Dembow",
        "badge": "INVITADO",
        "avatar": "/images/djs/dj-zapateiro.jpg",
        "instagram": "https://www.instagram.com/djzapateiro/",
        "instagramHandle": "@djzapateiro",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20zapateiro%20panama",
        "djSetTitle": "Perreo Galáctico Set",
        "bio": "Ritmo incesante de reggaetón y crossover para la noche de sábado en Casco Antiguo."
      }
    ],
    "dressCode": "Rooftop Glam / Chic Urbano",
    "ageLimit": "18+",
    "description": "El plan indiscutible del fin de semana en Casco Viejo: desde la puesta de sol con cócteles y brisa marina hasta la noche de fiesta con DJs en vivo bajo las estrellas. Open Gin & Sangría para ellas hasta las 12:00 AM con Pase Arrive.",
    "perkHeadline": "BOILER REGGAETON • LISTA HASTA 11:30PM",
    "perkDetails": "Edición especial Boiler Reggaeton al aire libre en la terraza de Terraplén con DJ Joseph y DJ Zapateiro. Acceso en lista Arrive hasta las 11:30 PM según aforo. Consumo regular.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-TERRAPLEN-19",
    "instagramUrl": "https://www.instagram.com/terraplenpanama/",
    "instagramHandle": "@terraplenpanama",
    "mapPreview": "/images/terraplen_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Terraplen+Rooftop+Panama+Casco+Antiguo",
    "venueGallery": [
      {
        "url": "/images/venues/terraplen/terrace_rooftop.jpg",
        "title": "Terraza Rooftop de Noche",
        "category": "Skyline"
      }
    ],
    "perksIncluded": [
      "Pase de acceso a terraza al aire libre",
      "Entrada en lista Arrive hasta las 11:30 PM",
      "Consumo regular en barra",
      "Vistas panorámicas 360° al skyline"
    ],
    "tableTiers": [
      {
        "name": "Pase Rooftop Sábado (Gratuito)",
        "price": 0,
        "desc": "Entrada gratis en lista + Open Bar hasta las 12:00 AM."
      },
      {
        "name": "Mesa VIP Skyline (x4)",
        "price": 50,
        "desc": "Mesa preferencial con vista al mar y atención dedicada."
      }
    ]
  },
  {
    "id": "evt-la-rosalia-la-connect",
    "slug": "la-rosalia-la-connect-party-sabado",
    "venueSlug": "la-rosalia",
    "indexable": true,
    "title": "LA CONNECT EL PARTY ON STAGE",
    "subtitle": "Yemil • Andiex • Livity Crew • La F1 • Downtown Amador",
    "category": "Nightlife & Urban Party",
    "genre": "Reggaeton / Perreo 360° / Hip Hop",
    "musicGenres": [
      "Reggaeton",
      "Perreo 360°",
      "Hip Hop"
    ],
    "location": "La Rosalía (Downtown Amador)",
    "address": "Downtown Amador, Calzada de Amador",
    "city": "Amador, Ciudad de Panamá",
    "dayOfWeek": "Sabado",
    "date": "Sábado, 19 Septiembre 2026",
    "eventDate": "2026-09-19T22:00:00",
    "time": "10:00 PM - 08:00 AM",
    "dinnerTime": null,
    "partyTime": "10:00 PM - 04:00 AM",
    "price": 0,
    "vipPrice": 20,
    "currency": "$",
    "capacity": 450,
    "spotsLeft": 19,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/la-rosalia-la-connect-party-sabado-19-de-septiembre",
    "image": "/images/flyer-la-rosalia-la-connect-19.jpg",
    "imageAlt": "Flyer oficial La Rosalia La Connect El Party On Stage con Yemil, Andiex, Livity Crew y La F1",
    "seoTitle": "La Rosalía: La Connect Party Sábado 19 Septiembre • Downtown Amador | ARRIVE",
    "seoDescription": "La Connect Party en La Rosalía Amador. La mayor congregación urbana de Panamá con Open Bar para ellas y los mejores DJs de la escena.",
    "artists": [
      {
        "name": "Yemil",
        "shortName": "Yemil",
        "role": "Artista On Stage • Plena & Trap Urbano",
        "badge": "ARTISTA",
        "avatar": "/images/venues/furia/club_lights.jpg",
        "instagram": "https://www.instagram.com/larosaliapanama/",
        "instagramHandle": "@yemil",
        "djSetUrl": "https://soundcloud.com/search?q=yemil",
        "djSetTitle": "Live Performance",
        "bio": "Llegando al escenario principal de La Rosalía en Downtown Amador con sus mayores éxitos urbanos."
      },
      {
        "name": "Andiex",
        "shortName": "Andiex",
        "role": "Artista On Stage • Reggaetón & Urbano",
        "badge": "ARTISTA",
        "avatar": "/images/venues/furia/dining_room.jpg",
        "instagram": "https://www.instagram.com/larosaliapanama/",
        "instagramHandle": "@andiex",
        "djSetUrl": "https://soundcloud.com/search?q=andiex",
        "djSetTitle": "Live Performance",
        "bio": "Presentación en vivo dentro del cartel estelar de La Connect Party."
      },
      {
        "name": "Livity Crew",
        "shortName": "Livity Crew",
        "role": "DJ & Soundsystem Crew",
        "badge": "CREW",
        "avatar": "/images/venues/terraplen/ambiance.jpg",
        "instagram": "https://www.instagram.com/larosaliapanama/",
        "instagramHandle": "@livitycrew",
        "djSetUrl": "https://soundcloud.com/search?q=livity%20crew",
        "djSetTitle": "Dancehall & Perreo Mix",
        "bio": "El colectivo urbano líder en sets de dancehall, plena y perreo en tarima."
      },
      {
        "name": "La F1",
        "shortName": "La F1",
        "role": "Crew & Live Show",
        "badge": "LIVE SHOW",
        "avatar": "/images/venues/furia/cover.jpg",
        "instagram": "https://www.instagram.com/larosaliapanama/",
        "instagramHandle": "@laf1",
        "djSetUrl": "https://soundcloud.com/search?q=la%20f1%20panama",
        "djSetTitle": "On Stage Show",
        "bio": "Show dinámico y energía en la pista de Downtown Amador."
      }
    ],
    "dressCode": "Urban Glam / Streetwear Exclusivo",
    "ageLimit": "18+",
    "description": "Sábado por todo lo alto en la Calzada de Amador con LA CONNECT PARTY: la fiesta que conecta a los mejores exponentes de perreo, reggaeton y música urbana en La Rosalía. Open Bar de cortesía para ellas de 10:00 PM a 12:00 AM con tu Pase Arrive.",
    "perkHeadline": "LA CONNECT • AFTER HASTA 8AM",
    "perkDetails": "La fiesta urbana más esperada de Panamá On Stage en Downtown Amador con Yemil, Andiex, Livity Crew y La F1. After Party oficial hasta las 8:00 AM. Sin cena (solo coctelería y botellas VIP).",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-CONNECT-19",
    "instagramUrl": "https://www.instagram.com/larosaliapanama/",
    "instagramHandle": "@larosaliapanama",
    "mapPreview": "/images/furia_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=La+Rosalia+Downtown+Amador+Panama",
    "venueGallery": [
      {
        "url": "/images/venues/furia/dining_room.jpg",
        "title": "Salón & Pista La Rosalía",
        "category": "Amador Club"
      }
    ],
    "perksIncluded": [
      "Acceso club y After Party oficial (4:00 AM a 8:00 AM)",
      "Self Parking en Downtown Amador",
      "Servicio de coctelería y botellas VIP (sin dinner)",
      "Sets de La Connect Crew DJs"
    ],
    "tableTiers": [
      {
        "name": "Pase General La Connect (Gratuito)",
        "price": 0,
        "desc": "Entrada en lista libre + Open Bar para ellas."
      },
      {
        "name": "Mesa VIP La Connect (x4)",
        "price": 45,
        "desc": "Mesa reservada con botella premium y atención VIP."
      }
    ],
    "afterPartyTime": "04:00 AM - 08:00 AM"
  },
  {
    "id": "evt-piano-bar-the-reggaeton-society",
    "slug": "piano-bar-the-reggaeton-society-sabado",
    "venueSlug": "piano-bar",
    "indexable": true,
    "title": "THE REGGAETON SOCIETY: BBY WOW",
    "subtitle": "BBY WOW Party • Satoshi DJ",
    "category": "Nightlife & Reggaeton VIP",
    "genre": "Reggaeton / Crossover Music",
    "musicGenres": [
      "Reggaeton",
      "Crossover Music",
      "Urban Club"
    ],
    "location": "Piano Bar",
    "address": "Calle 48 Este, Calle Uruguay, Bella Vista",
    "city": "Bella Vista, Panamá",
    "dayOfWeek": "Sabado",
    "date": "Sábado, 19 Septiembre 2026",
    "eventDate": "2026-09-19T22:00:00",
    "time": "08:00 PM - 03:30 AM",
    "dinnerTime": null,
    "partyTime": "08:00 PM - 03:30 AM",
    "price": 0,
    "vipPrice": 20,
    "currency": "$",
    "capacity": 220,
    "spotsLeft": 8,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/sbado-19-de-septiembre-the-reggaeton-society-en-piano-bar",
    "image": "/images/flyer-piano-bar-reggaeton-society-19.jpg",
    "imageAlt": "Flyer oficial Piano Bar The Reggaeton Society BBY WOW Party Satoshi DJ Panama",
    "seoTitle": "The Reggaeton Society Sábado 19 Septiembre • Piano Bar | ARRIVE Panamá",
    "seoDescription": "La experiencia de perreo más sofisticada de Calle Uruguay: The Reggaeton Society en Piano Bar. Open Bar Premium para ellas hasta las 12mn con Pase Arrive.",
    "artists": [
      {
        "name": "Satoshi DJ",
        "shortName": "Satoshi DJ",
        "role": "Headliner DJ • Reggaetón & Crossover Music",
        "badge": "HEADLINER",
        "avatar": "/images/venues/pianobar/bar.jpg",
        "instagram": "https://www.instagram.com/pianobarpanama/",
        "instagramHandle": "@satoshidj",
        "djSetUrl": "https://soundcloud.com/search?q=satoshi%20dj",
        "djSetTitle": "BBY WOW Reggaeton Mix",
        "bio": "Encargado de encender la noche en Piano Bar con los mejores beats de reggaeton, perreo y crossover music."
      }
    ],
    "dressCode": "Nightlife Chic / Elegante",
    "ageLimit": "18+",
    "description": "La velada más exclusiva de la noche del sábado en Bella Vista: THE REGGAETON SOCIETY en Piano Bar. Ambiente refinado, público selecto y los mejores hits del reggaeton mundial. Open Bar Premium para ellas hasta las 12:00 AM con Pase Arrive.",
    "perkHeadline": "ELLAS: OPEN GIN & SANGRÍA 9-12MN",
    "perkDetails": "Ellas tienen Open Gin y Sangría de 9:00 PM a 12:00 MN en lista Arrive. Satoshi DJ en vivo.",
    "perkEndTime": "12:00 AM",
    "perkCode": "ARRIVE-SOCIETY-19",
    "instagramUrl": "https://www.instagram.com/pianobarpanama/",
    "instagramHandle": "@pianobarpanama",
    "mapPreview": "/images/furia_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Piano+Bar+Calle+Uruguay+Panama",
    "venueGallery": [
      {
        "url": "/images/venues/pianobar/cover.jpg",
        "title": "Salón Principal Piano Bar",
        "category": "Lounge"
      }
    ],
    "perksIncluded": [
      "Acceso en lista digital Arrive",
      "Entrada hasta las 11:30 PM",
      "Consumo regular en barra",
      "Coctelería de autor y ambiente íntimo"
    ],
    "tableTiers": [
      {
        "name": "Pase The Society (Gratuito)",
        "price": 0,
        "desc": "Entrada libre + Open Bar para ellas hasta medianoche."
      },
      {
        "name": "Mesa VIP The Society (x4)",
        "price": 50,
        "desc": "Mesa reservada con botella premium y atención de anfitrión."
      }
    ]
  },
  {
    "id": "evt-terraplen-domingo-tardeo",
    "slug": "terraplen-rooftop-tardeo-party-domingo",
    "venueSlug": "terraplen-rooftop",
    "indexable": true,
    "title": "TARDEO PARTY",
    "subtitle": "Reggaeton Viejito, Electronic Music, Hip-Hop, Salsa & Open Format",
    "category": "Nightlife & Sunset Tardeo",
    "genre": "Sunset Deep House / Afro Melodic / Latin Chill",
    "musicGenres": [
      "Sunset Deep House",
      "Afro Melodic",
      "Latin Chill"
    ],
    "location": "Terraplén Rooftop (Terraza Abierta)",
    "address": "Edificio Brand Experience Center PB, Av. Eloy Alfaro",
    "city": "Casco Antiguo, Panamá",
    "dayOfWeek": "Domingo",
    "date": "Domingo, 20 Septiembre 2026",
    "eventDate": "2026-09-20T16:00:00",
    "time": "03:00 PM - 02:00 AM",
    "dinnerTime": "3:00 PM - 10:00 PM",
    "partyTime": "03:00 PM - 02:00 AM",
    "price": 0,
    "vipPrice": 15,
    "currency": "$",
    "capacity": 250,
    "spotsLeft": 15,
    "featured": true,
    "ticketUrl": "https://www.mieventos.com/event-detail/domingo-20-terrapln-rooftop-tardeo-party",
    "image": "/images/flyer-terraplen-tardeo-domingo-20.jpg",
    "imageAlt": "Flyer oficial Terraplen Rooftop Tardeo Party Domingo 20 con DJ Joshua y DJ Joseph",
    "seoTitle": "Domingo Tardeo Party 20 Septiembre • Terraplén Rooftop | ARRIVE",
    "seoDescription": "Cierra la semana con el mejor tardeo de Panamá en Terraplén Rooftop Casco Antiguo. Sunset, cócteles de autor, música house melódica y brisa marina.",
    "artists": [
      {
        "name": "DJ Joshua",
        "shortName": "DJ Joshua",
        "role": "Headliner DJ • Open Format & Sunset Vibes",
        "badge": "HEADLINER",
        "avatar": "/images/venues/terraplen/rooftop.jpg",
        "instagram": "https://www.instagram.com/terraplenpanama/",
        "instagramHandle": "@djjoshua",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20joshua%20panama",
        "djSetTitle": "Sunset Tardeo Session",
        "bio": "Especialista en sets versátiles de tardeo combinando salsa, house, electrónica y reggaetón viejito."
      },
      {
        "name": "DJ Joseph",
        "shortName": "DJ Joseph",
        "role": "Residente Terraplén • Open Format & Hip-Hop",
        "badge": "RESIDENTE",
        "avatar": "/images/djs/dj-joseph.jpg",
        "instagram": "https://www.instagram.com/josephgutz507/",
        "instagramHandle": "@josephgutz507",
        "djSetUrl": "https://soundcloud.com/search?q=dj%20joseph%20panama",
        "djSetTitle": "Tardeo Skyline Mix",
        "bio": "Referente del rooftop y la cabina de Casco Antiguo en sesiones diurnas y nocturnas."
      }
    ],
    "dressCode": "Resort Chic / Casual Elegante",
    "ageLimit": "18+",
    "description": "El plan por excelencia para los domingos: TARDEO PARTY en Terraplén Rooftop. Comienza a las 4:00 PM disfrutando de la caída del sol sobre el océano, gastronomía exquisita y buena música entre amigos. Welcome Cocktail de cortesía de 4:00 PM a 7:00 PM con tu Pase Arrive.",
    "perkHeadline": "ELLAS: OPEN GIN & SANGRÍA 6-9PM",
    "perkDetails": "Ellas tienen Open Gin y Sangría de 6:00 PM a 9:00 PM en la terraza al aire libre. Música desde las 3:00 PM con DJ Joshua & DJ Joseph.",
    "perkEndTime": "07:00 PM",
    "perkCode": "ARRIVE-TARDEO-20",
    "instagramUrl": "https://www.instagram.com/terraplenpanama/",
    "instagramHandle": "@terraplenpanama",
    "mapPreview": "/images/terraplen_map_preview.jpg",
    "googleMapsUrl": "https://maps.google.com/?q=Terraplen+Rooftop+Panama+Casco+Antiguo",
    "venueGallery": [
      {
        "url": "/images/venues/terraplen/rooftop.jpg",
        "title": "Terraza al Atardecer",
        "category": "Sunset"
      }
    ],
    "perksIncluded": [
      "Acceso al Tardeo en terraza abierta",
      "Promoción 2x1 en cócteles seleccionados (4PM - 7PM)",
      "Menú gastronómico sunset disponible",
      "Vistas al atardecer en Casco Antiguo"
    ],
    "tableTiers": [
      {
        "name": "Pase Tardeo Domingo (Gratuito)",
        "price": 0,
        "desc": "Entrada libre + Welcome Cocktail de 4PM a 7PM."
      },
      {
        "name": "Mesa Sunset Tardeo (x4)",
        "price": 35,
        "desc": "Mesa con vista a la bahía para cenar y pasar la tarde."
      }
    ]
  }
];

const VENUES_FAQS = {
  es: [
    {
      question: '¿Cómo funciona el pase digital de cortesía en los clubes de Panamá con ARRIVE?',
      answer: 'Los pases digitales de ARRIVE son 100% gratuitos y oficiales. Se descargan directamente en tu teléfono con un código QR individual que presentas en la puerta del venue para ingresar en lista preferencial y disfrutar de beneficios como Open Gin & Sangría de cortesía para ellas hasta medianoche.'
    },
    {
      question: '¿Cuál es el código de vestimenta (dress code) en las discotecas y rooftops de Panamá?',
      answer: 'El código de vestimenta general es Smart Casual o Noche Elegante (Glam). Para hombres se recomienda calzado cerrado, pantalón largo y camisa o polo de corte moderno. Para mujeres, vestidos, faldas o atuendos de fiesta. No se permite la entrada con ropa deportiva, gorras deportivas o sandalias de playa.'
    },
    {
      question: '¿Cómo reservar una mesa VIP o servicio de botellas (Bottle Service) en Casco Antiguo y Bella Vista?',
      answer: 'Las reservas de mesa VIP se gestionan directamente a través de ARRIVE. Al confirmar tu mesa se te asigna un host personal, confirmación oficial instantánea, ubicación preferencial junto a la pista o en terraza panorámica, y carta completa de licores y botellas premium.'
    },
    {
      question: '¿Cuáles son los horarios de los rooftops y discotecas en Ciudad de Panamá?',
      answer: 'Los rooftops gastronómicos abren para cena y puesta de sol (Sunset Dinner) de 5:00 PM a 10:00 PM. A partir de las 10:00 PM y hasta las 4:00 AM la experiencia se transforma en fiesta con DJs residentes e invitados de martes a domingo.'
    },
    {
      question: '¿Qué zonas de Ciudad de Panamá concentran el mejor ambiente nocturno?',
      answer: 'Las dos zonas principales son Casco Antiguo (San Felipe), famoso por sus terrazas coloniales con vista al mar, cócteles de autor y música electrónica/urbana; y Bella Vista / Calle 50, conocida por clubes de vanguardia de gran formato como Furia Club.'
    }
  ],
  en: [
    {
      question: 'How do ARRIVE complimentary digital guest list passes work in Panama City?',
      answer: 'ARRIVE digital passes are 100% free and official. You download an individual QR pass to your phone, present it at the club entrance for priority guest list admission, and access exclusive perks such as complimentary Open Gin & Sangria for ladies until midnight.'
    },
    {
      question: 'What is the dress code for nightclubs and rooftop bars in Panama City?',
      answer: 'The dress code is Smart Casual or Upscale Nightlife (Glam). For men, closed-toe shoes, pants, and a collared shirt or stylish polo are recommended. For women, cocktail dresses or chic party attire. Athletic wear, sports caps, and beach sandals are strictly prohibited.'
    },
    {
      question: 'How can I book a VIP table or bottle service in Casco Viejo and Bella Vista?',
      answer: 'VIP table bookings are managed directly through ARRIVE with instant confirmation, personal host assignment, prime table placement (dance floor booths or skyline terrace), and full access to premium bottle service menus.'
    },
    {
      question: 'What are the operating hours for Panama City nightclubs and rooftops?',
      answer: 'Rooftops welcome guests for sunset dining and cocktails from 5:00 PM to 10:00 PM. From 10:00 PM until 4:00 AM, the atmosphere transitions into vibrant nightlife with resident and international DJs from Tuesday to Sunday.'
    },
    {
      question: 'Which neighborhoods offer the best nightlife in Panama City?',
      answer: 'The top nightlife hubs are historic Casco Viejo (San Felipe), renowned for colonial rooftop lounges with skyline and ocean views; and Bella Vista / Calle 50, celebrated for state-of-the-art high-energy nightclubs like Furia Club.'
    }
  ]
};

const CONCIERGE_FAQS = {
  es: [
    {
      question: '¿Qué servicios VIP gestiona ARRIVE Concierge en Ciudad de Panamá?',
      answer: 'ARRIVE Concierge coordina reservas prioritarias en restaurantes de alta gastronomía, transporte privado ejecutivo con chofer en SUVs de lujo (Cadillac Escalade, Chevrolet Suburban), alquiler privado de yates hacia Isla Taboga y el Archipiélago de Las Perlas, y hospedaje en penthouses exclusivos.'
    },
    {
      question: '¿Cómo funciona la reserva preferencial para cenas en restaurantes oficiales?',
      answer: 'Coordinamos tu mesa en restaurantes asociados oficiales de ARRIVE en Casco Antiguo y Bella Vista con atención VIP de cortesía, mesa reservada en horario pico y confirmación directa por WhatsApp con tu Concierge dedicado.'
    },
    {
      question: '¿Qué incluye el servicio de alquiler de yates en Panamá?',
      answer: 'Los charters de yate incluyen capitán profesional, marinero, combustible, hielo, cooler, sistema de audio bluetooth y paradas en las mejores calas de Isla Taboga o Las Perlas para atardeceres y navegación privada.'
    },
    {
      question: '¿Con cuánta anticipación debo solicitar un chofer privado o SUV ejecutiva?',
      answer: 'Recomendamos solicitar traslados con al menos 2 a 4 horas de anticipación, aunque contamos con disponibilidad inmediata para clientes VIP tanto para traslados desde el Aeropuerto de Tocumen (PTY) como para transporte nocturno entre venues.'
    }
  ],
  en: [
    {
      question: 'What VIP services does ARRIVE Concierge coordinate in Panama City?',
      answer: 'ARRIVE Concierge handles priority dinner reservations at top gourmet restaurants, private executive chauffeur transport in luxury SUVs (Escalade, Suburban), private yacht charters to Taboga Island and Pearl Islands, and exclusive Casco Viejo penthouses.'
    },
    {
      question: 'How does preferential dinner booking work at ARRIVE partner restaurants?',
      answer: 'We secure your table at official ARRIVE partner restaurants in Casco Viejo and Bella Vista with priority seating during peak dinner hours and direct WhatsApp confirmation with your dedicated Concierge.'
    },
    {
      question: 'What is included in private yacht charters in Panama with ARRIVE?',
      answer: 'Private yacht charters include certified captain and crew, fuel, ice, coolers, premium sound systems, and stops at prime swimming spots in Taboga Island or Pearl Islands for private day trips or sunset cruises.'
    },
    {
      question: 'How far in advance should I request private chauffeur service in Panama?',
      answer: 'We recommend requesting chauffeur services 2 to 4 hours in advance, although on-demand executive airport transfers from Tocumen (PTY) and nightlife shuttle service between venues are available for VIP clients.'
    }
  ]
};

const BLOG_POSTS = [
  {
    slug: 'guia-nightlife-casco-antiguo-panama',
    category: 'Nightlife Guide',
    es: {
      title: 'Guía Definitiva del Nightlife en Casco Antiguo: Terrazas, Rooftops y Clubs Secretos',
      seoTitle: 'Guía Nightlife Casco Antiguo Panamá — Bares, Rooftops & Clubs | ARRIVE',
      description: 'Explora la vida nocturna de Casco Antiguo en Panamá: terrazas frente al mar, discotecas secretas, dress code y cómo entrar en lista VIP con Arrive.',
      intro: 'El Casco Antiguo de Ciudad de Panamá es el epicentro nocturno más vibrante de Centroamérica. Terrazas con vistas panorámicas, rooftops históricos y clubs exclusivos.'
    },
    en: {
      title: 'Ultimate Guide to Casco Viejo Nightlife: Rooftops, Speakeasies & Clubs',
      seoTitle: 'Casco Viejo Nightlife Guide — Bars, Rooftops & Clubs | ARRIVE',
      description: 'Explore Casco Viejo nightlife in Panama City: ocean-view rooftops, hidden clubs, dress code rules, and VIP guestlist access with Arrive.',
      intro: 'Casco Viejo in Panama City is the premier nightlife hub of Central America. Historic rooftop bars, speakeasies and high-energy nightclubs.'
    }
  },
  {
    slug: 'como-reservar-mesa-vip-bottle-service-panama',
    category: 'VIP Concierge',
    es: {
      title: 'Cómo Reservar Mesa VIP y Bottle Service en Discotecas de Panamá',
      seoTitle: 'Reserva de Mesas VIP & Bottle Service Panamá — Guía Completa | ARRIVE',
      description: 'Aprende los consumos mínimos, zonas preferenciales, protocolo de propinas y beneficios de reservar mesas VIP en Furia Club y rooftops de Panamá.',
      intro: 'Asegurar una mesa VIP con bottle service en los mejores clubes de Panamá garantiza una noche sin filas con atención preferencial y vista privilegiada.'
    },
    en: {
      title: 'How to Book VIP Tables & Bottle Service at Panama City Nightclubs',
      seoTitle: 'VIP Table Booking & Bottle Service Panama City Guide | ARRIVE',
      description: 'Complete guide to minimum spends, VIP booth tiers, tipping protocol, and reserving bottle service at Furia Club and Panama rooftops.',
      intro: 'Booking a VIP table with bottle service in Panama City guarantees skip-the-line entry, dedicated waitress service and prime booth locations.'
    }
  },
  {
    slug: 'mejores-rooftops-vista-al-mar-panama',
    category: 'Rooftops & Views',
    es: {
      title: 'Los 5 Mejores Rooftops con Vista al Mar en Ciudad de Panamá',
      seoTitle: 'Mejores Rooftops con Vista al Mar en Panamá — Terrazas VIP | ARRIVE',
      description: 'Descubre los rooftops más espectaculares de Casco Antiguo y Ciudad de Panamá con vistas a la bahía, atardeceres dorados y coctelería premium.',
      intro: 'Ciudad de Panamá cuenta con uno de los skylines costeros más impactantes de Latinoamérica. Los mejores rooftops combinan vista al mar y gran ambiente.'
    },
    en: {
      title: 'Top 5 Ocean-View Rooftop Bars in Panama City',
      seoTitle: 'Top Ocean-View Rooftop Bars in Panama City | ARRIVE',
      description: 'Discover the most breathtaking rooftop lounges in Casco Viejo and Panama City with skyline vistas, golden hour sunsets and craft cocktails.',
      intro: 'Panama City features one of Latin America most impressive coastal skylines. Discover the top rooftop terraces for sunsets and nightlife.'
    }
  },
  {
    slug: 'dress-code-discotecas-clubs-panama',
    category: 'Nightlife Tips',
    es: {
      title: 'Código de Vestimenta (Dress Code) para Discotecas y Rooftops en Panamá',
      seoTitle: 'Dress Code Discotecas Panamá — Qué Vestir en Clubs & Rooftops | ARRIVE',
      description: 'Evita problemas en la puerta: guía definitiva sobre el dress code upscale casual, calzado permitido y qué evitar en clubs exclusivos de Panamá.',
      intro: 'Las políticas de entrada en discotecas y rooftops exclusivos de Panamá exigen un atuendo upscale casual. Conoce qué ropa y calzado están permitidos.'
    },
    en: {
      title: 'Dress Code Guide for Panama City Nightclubs & Rooftop Lounges',
      seoTitle: 'Panama City Nightclub Dress Code — What to Wear | ARRIVE',
      description: 'Avoid door rejections: essential upscale casual dress code guidelines, accepted footwear and tips for top clubs and rooftops in Panama.',
      intro: 'Upscale nightlife venues in Panama City enforce door policies. Discover exactly what to wear to gain seamless entry to the best venues.'
    }
  }
];

export const prerenderAllPages = () => {
  if (!fs.existsSync(DIST_DIR)) {
    console.warn('⚠️ No se encontró la carpeta dist/. Ejecuta primero `vite build`.');
    return;
  }

  const baseHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.warn('⚠️ No se encontró dist/index.html');
    return;
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');
  console.log('⚡ Iniciando Prerenderizado Estático SEO (SSG)...');

  const pagesToPrerender = [];
  // 0. Root Home (defaults to canonical ES with hreflang alternate links)
  pagesToPrerender.push({
    relPath: '',
    title: 'ARRIVE | The Exclusive Nightlife Experience • Panamá',
    description: 'Descubre los eventos y beneficios más exclusivos de Panamá en Furia Club, Terraplén Rooftop y Casco Antiguo. Pases digitales con Open Gin de cortesía y mesas VIP.',
    h1: 'ARRIVE — Nightlife, Eventos & Rooftops en Panamá',
    intro: 'Plataforma oficial de eventos exclusivos, listas de cortesía y reservas VIP en los clubes y terrazas más cotizados de Ciudad de Panamá.',
    breadcrumbs: [{ name: 'Inicio', url: '/es/' }],
    items: EVENTS.map(e => ({ title: e.title, url: `/es/events/${e.slug}/`, sub: `${e.date} • ${e.venueName}` }))
  });

  const locales = ['es', 'en'];
  locales.forEach(loc => {
    const isEs = loc === 'es';

    // 1. Home
    pagesToPrerender.push({
      relPath: `${loc}/`,
      title: isEs ? 'ARRIVE Panamá | Nightlife, Eventos & Experiencias VIP' : 'ARRIVE Panama | Nightlife, Events & VIP Experiences',
      description: isEs 
        ? 'Descubre el mejor nightlife de Ciudad de Panamá: eventos exclusivos, beneficios para ellas, rooftops, clubs, restaurantes y mesas VIP.'
        : 'Discover Panama City top nightlife: exclusive events, ladies perks, rooftops, clubs, restaurants and VIP tables.',
      h1: isEs ? 'Nightlife, Eventos & Experiencias VIP en Panamá' : 'Nightlife, Events & VIP Experiences in Panama',
      intro: isEs 
        ? 'Descubre una nueva forma de vivir Ciudad de Panamá con ARRIVE. Encuentra las mejores fiestas, clubs, rooftops, restaurantes y experiencias exclusivas de la ciudad, con acceso a eventos semanales, beneficios especiales, listas de invitados y reservas de mesas VIP.\n\nDesde Casco Viejo hasta los hotspots más exclusivos de Ciudad de Panamá, ARRIVE conecta nightlife, gastronomía y experiencias premium en un solo lugar.'
        : 'Discover a new way to experience Panama City with ARRIVE. Find the city’s best parties, clubs, rooftops, restaurants, and exclusive experiences, with weekly event access, special perks, guest lists, and VIP table bookings.',
      breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }],
      items: EVENTS.map(e => ({ title: e.title, url: `/${loc}/events/${e.slug}/`, sub: `${e.date} • ${e.venueName}` }))
    });

    // 2. Hubs
    pagesToPrerender.push({
      relPath: `${loc}/panama/nightlife/`,
      title: isEs ? 'Nightlife en Panamá | Clubs, Rooftops y Fiestas | ARRIVE' : 'Panama City Nightlife | Clubs, Rooftops and Parties | ARRIVE',
      description: isEs ? 'Descubre el nightlife de Ciudad de Panamá: discotecas, rooftops, fiestas, eventos exclusivos, listas de invitados y experiencias VIP.' : 'Discover Panama City nightlife: clubs, rooftops, parties, exclusive events, guest lists and VIP experiences.',
      h1: isEs ? 'Nightlife en Panamá' : 'Nightlife in Panama City',
      intro: isEs ? 'Ciudad de Panamá tiene una de las escenas nocturnas más dinámicas de Latinoamérica. Desde rooftops en Casco Viejo y cenas que se convierten en fiesta hasta clubs de reggaetón, electrónica, afro y música urbana, cada noche ofrece un plan diferente.\n\nARRIVE reúne los eventos, venues y experiencias que vale la pena conocer, con información actualizada sobre fiestas, horarios, beneficios, guest lists, entradas y reservas VIP.' : 'Panama City has one of the most dynamic nightlife scenes in Latin America.',
      breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: 'Nightlife', url: `/${loc}/panama/nightlife/` }],
      items: EVENTS.map(e => ({ title: e.title, url: `/${loc}/events/${e.slug}/`, sub: e.venueName }))
    });

    pagesToPrerender.push({
      relPath: `${loc}/panama/rooftops/`,
      title: isEs ? 'Rooftops en Panamá | Terrazas y Vistas en Casco Viejo' : 'Panama City Rooftops | Terraces and Ocean Views in Casco Viejo',
      description: isEs ? 'Descubre los mejores rooftops de Ciudad de Panamá y Casco Viejo para sunsets, cócteles, cenas, fiestas y reservas de mesas VIP.' : 'Discover the best rooftops in Panama City and Casco Viejo for golden hour sunsets, cocktails, dinners, parties and VIP tables.',
      h1: isEs ? 'Rooftops en Panamá' : 'Rooftops in Panama City',
      intro: isEs ? 'Los rooftops de Ciudad de Panamá combinan vistas al skyline, arquitectura histórica, gastronomía, cócteles y una escena nocturna que comienza desde el atardecer.\n\nCasco Viejo —también conocido como Casco Antiguo— concentra algunos de los rooftops más buscados de la ciudad, ideales para sunset drinks, cenas, celebraciones y fiestas que continúan hasta tarde.' : 'Panama City rooftops blend modern skyline views, historic architecture, dining, cocktails, and a nightlife scene starting at golden hour.',
      breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: 'Rooftops', url: `/${loc}/panama/rooftops/` }],
      items: VENUES.filter(v => v.slug.includes('terraplen') || v.slug.includes('primavera') || v.slug.includes('cielo')).map(v => ({ title: v.name, url: `/${loc}/venues/${v.slug}/`, sub: v.area }))
    });

    pagesToPrerender.push({
      relPath: `${loc}/panama/clubs/`,
      title: isEs ? 'Discotecas y Clubs en Panamá | Entradas y Mesas VIP' : 'Nightclubs and Dance Clubs in Panama City | VIP Tables',
      description: isEs ? 'Encuentra las mejores discotecas y clubs de Ciudad de Panamá. Consulta fiestas, música, guest lists, entradas y reservas de mesas VIP.' : 'Find the best nightclubs in Panama City. Explore parties, music styles, guest lists, tickets, and VIP table bookings.',
      h1: isEs ? 'Clubs y Discotecas en Panamá' : 'Clubs & Nightclubs in Panama City',
      intro: isEs ? 'Descubre los clubs y discotecas más destacados de Ciudad de Panamá, desde espacios de música urbana y reggaetón hasta conceptos de electrónica, afro house y experiencias híbridas de dinner & party.' : 'Discover Panama City’s top nightclubs, from urban and reggaeton clubs to electronic and afro house vibes.',
      breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: 'Clubs', url: `/${loc}/panama/clubs/` }],
      items: VENUES.map(v => ({ title: v.name, url: `/${loc}/venues/${v.slug}/`, sub: v.tagline }))
    });

    pagesToPrerender.push({
      relPath: `${loc}/panama/casco-antiguo/`,
      title: isEs ? 'Casco Viejo Panamá | Rooftops, Bares y Discotecas' : 'Casco Viejo Panama | Rooftops, Bars and Clubs',
      description: isEs ? 'Descubre qué hacer de noche en Casco Viejo, Panamá: rooftops, bares, restaurantes, discotecas, música y fiestas seleccionadas por ARRIVE.' : 'Discover what to do at night in Casco Viejo, Panama: rooftops, cocktail bars, restaurants, clubs, and parties curated by ARRIVE.',
      h1: isEs ? 'Nightlife en Casco Viejo, Panamá' : 'Nightlife in Casco Viejo, Panama',
      intro: isEs ? 'Casco Viejo es uno de los principales destinos de nightlife en Ciudad de Panamá. Sus calles históricas concentran rooftops con vistas a la bahía, restaurantes de autor, cocktail bars, lounges y clubs a pocos minutos unos de otros.' : 'Casco Viejo is one of the premier nightlife destinations in Panama City.',
      breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: 'Casco Antiguo', url: `/${loc}/panama/casco-antiguo/` }],
      items: VENUES.filter(v => v.area.includes('Casco')).map(v => ({ title: v.name, url: `/${loc}/venues/${v.slug}/`, sub: v.tagline }))
    });

    pagesToPrerender.push({
      relPath: `${loc}/panama/events/today/`,
      title: isEs ? 'Fiestas Hoy en Panamá | Eventos y Nightlife Esta Noche' : 'Parties & Events Tonight in Panama City | ARRIVE',
      description: isEs ? 'Descubre qué hacer hoy en Ciudad de Panamá. Fiestas, clubs, rooftops, eventos, listas de invitados y beneficios disponibles esta noche.' : 'Discover things to do tonight in Panama City. Clubs, rooftops, dinner parties, guest lists and VIP perks available tonight.',
      h1: isEs ? 'Fiestas y Eventos Hoy en Panamá' : 'Parties and Events Tonight in Panama City',
      intro: isEs ? '¿Buscas qué hacer hoy en Panamá? Aquí encontrarás las fiestas, cenas, rooftops y eventos activos esta noche en Ciudad de Panamá.' : 'Looking for what to do tonight in Panama City?',
      breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: isEs ? 'Eventos Hoy' : 'Events Tonight', url: `/${loc}/panama/events/today/` }],
      items: EVENTS.slice(0, 2).map(e => ({ title: e.title, url: `/${loc}/events/${e.slug}/`, sub: e.date }))
    });

    pagesToPrerender.push({
      relPath: `${loc}/panama/events/weekend/`,
      title: isEs ? 'Eventos Este Fin de Semana en Panamá | Fiestas y Clubs' : 'Weekend Events in Panama City | Parties and Nightclubs',
      description: isEs ? 'Descubre fiestas y eventos este fin de semana en Ciudad de Panamá: clubs, rooftops, cenas, guest lists y experiencias VIP de jueves a domingo.' : 'Discover weekend parties in Panama City: clubs, rooftops, dining, guest lists and VIP table experiences from Thursday to Sunday.',
      h1: isEs ? 'Eventos del Fin de Semana en Panamá' : 'Weekend Events in Panama City',
      intro: isEs ? 'Planea tu fin de semana en Ciudad de Panamá con una selección de fiestas, rooftops, cenas y experiencias desde el jueves hasta el domingo.' : 'Plan your weekend in Panama City with a curated selection of parties, rooftops, and nightlife from Thursday through Sunday.',
      breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: isEs ? 'Fin de Semana' : 'Weekend Events', url: `/${loc}/panama/events/weekend/` }],
      items: EVENTS.map(e => ({ title: e.title, url: `/${loc}/events/${e.slug}/`, sub: e.date }))
    });

    // 2.1 Venues List Landing (/panama/venues/ and /venues/ alias)
    ['panama/venues/', 'venues/'].forEach(venuesPath => {
      pagesToPrerender.push({
        relPath: `${loc}/${venuesPath}`,
        title: isEs ? 'Clubs, Rooftops y Restaurantes en Panamá | ARRIVE' : 'Clubs, Rooftops and Restaurants in Panama | ARRIVE',
        description: isEs ? 'Explora clubs, rooftops y restaurantes de Ciudad de Panamá. Fotos, eventos, menús, ubicación y opciones para reservar mesas VIP.' : 'Explore clubs, rooftops, and restaurants in Panama City. Photos, events, menus, addresses, and VIP table booking options.',
        h1: isEs ? 'Clubs, Rooftops & Restaurantes en Panamá' : 'Top Clubs, Rooftops & Restaurants in Panama',
        intro: isEs ? 'Descubre los venues más destacados de Ciudad de Panamá y Casco Viejo. Explora clubs, rooftops, restaurantes y espacios de nightlife antes de visitarlos.' : 'Discover the most prominent venues in Panama City and Casco Viejo.',
        breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: 'Venues', url: `/${loc}/panama/venues/` }],
        items: VENUES.map(v => ({ title: v.name, url: `/${loc}/venues/${v.slug}/`, sub: `${v.area} • ${v.tagline}` })),
        faqs: isEs ? VENUES_FAQS.es : VENUES_FAQS.en
      });
    });

    // 2.2 Concierge & VIP Services Landing (/panama/concierge/ and /concierge/ alias)
    ['panama/concierge/', 'concierge/'].forEach(conciergePath => {
      pagesToPrerender.push({
        relPath: `${loc}/${conciergePath}`,
        title: isEs ? 'Concierge VIP Panamá | Yates, Chauffeur & Reservas' : 'Panama VIP Concierge | Yacht Charters, Chauffeurs & Bookings',
        description: isEs ? 'Concierge en Ciudad de Panamá para reservas de restaurantes, transporte privado, alquiler de yates, nightlife y estadías premium.' : 'Panama City concierge for restaurant reservations, private chauffeur transport, yacht charters, nightlife and luxury accommodations.',
        h1: isEs ? 'Concierge & VIP Services en Panamá' : 'Concierge & VIP Services in Panama City',
        intro: isEs ? 'Vive Ciudad de Panamá con un servicio de concierge diseñado para organizar experiencias de principio a fin. ARRIVE conecta restaurantes, nightlife, transporte privado, charters de yates y estadías premium para viajeros, grupos y clientes que buscan comodidad, acceso y atención personalizada.' : 'Experience Panama City with bespoke concierge services designed to organize your itinerary from start to finish.',
        breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: 'Concierge & Services', url: `/${loc}/panama/concierge/` }],
        items: [
          { title: isEs ? 'Restaurant Reservations' : 'Restaurant Reservations', url: `/${loc}/panama/concierge/`, sub: 'Acceso y reservas en restaurantes seleccionados de Ciudad de Panamá y Casco Viejo.' },
          { title: isEs ? 'Private Chauffeur' : 'Private Chauffeur', url: `/${loc}/panama/concierge/`, sub: 'Servicio de transporte privado con SUVs y vehículos ejecutivos.' },
          { title: isEs ? 'Private Yacht Charters' : 'Private Yacht Charters', url: `/${loc}/panama/concierge/`, sub: 'Yates y embarcaciones privadas a Taboga y Las Perlas.' },
          { title: isEs ? 'Premium Stays' : 'Premium Stays', url: `/${loc}/panama/concierge/`, sub: 'Apartamentos, penthouses y propiedades premium en Casco Viejo y Punta Pacífica.' }
        ],
        faqs: isEs ? CONCIERGE_FAQS.es : CONCIERGE_FAQS.en
      });
    });

    // 3. Venues
    VENUES.forEach(v => {
      const venueEvents = EVENTS.filter(e => e.venueSlug === v.slug).map(e => ({ title: `📅 ${e.title}`, url: `/${loc}/events/${e.slug}/`, sub: e.date }));
      const menuItems = (v.menuHighlights || []).map(m => ({ title: `🍽️ ${m.name} (${m.price})`, url: `/${loc}/venues/${v.slug}/`, sub: m.desc }));

      pagesToPrerender.push({
        relPath: `${loc}/venues/${v.slug}/`,
        title: isEs ? `${v.name} — ${v.area} Panamá | Menú, Eventos & VIP` : `${v.name} — ${v.area} Panama City | Menu, Events & VIP`,
        description: isEs 
          ? `Menú oficial y reservas en ${v.name}: ${v.tagline}. Horarios: Cena ${v.dinnerTime}, Fiesta ${v.partyTime}. Dirección: ${v.address}.` 
          : `Official menu and VIP booking at ${v.name}: ${v.tagline}. Dinner ${v.dinnerTime}, Party ${v.partyTime}. Address: ${v.address}.`,
        h1: v.name,
        intro: `${v.tagline} • Ubicado en ${v.address}.`,
        breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: 'Venues', url: `/${loc}/panama/venues/` }, { name: v.name, url: `/${loc}/venues/${v.slug}/` }],
        items: [...venueEvents, ...menuItems],
        venueData: v,
        faqs: v.faqs?.[loc] || v.faqs?.es || []
      });
    });

    // 4. Events
    EVENTS.forEach(e => {
      pagesToPrerender.push({
        relPath: `${loc}/events/${e.slug}/`,
        title: isEs ? `${e.title} • ${e.venueName} | ARRIVE Panamá` : `${e.title} • ${e.venueName} | ARRIVE Panama`,
        description: `${e.description} ${e.perkHeadline}`,
        h1: e.title,
        intro: `${e.date} • ${e.location} • Lineup: ${e.artists}`,
        breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: isEs ? 'Eventos' : 'Events', url: `/${loc}/panama/events/` }, { name: e.title, url: `/${loc}/events/${e.slug}/` }],
        items: [{ title: `Venue: ${e.venueName}`, url: `/${loc}/venues/${e.venueSlug}/`, sub: 'Ver perfil del local, fotos y menú' }]
      });
      if (e.altSlug) {
        pagesToPrerender.push({
          relPath: `${loc}/events/${e.altSlug}/`,
          title: isEs ? `${e.title} • ${e.venueName} | ARRIVE Panamá` : `${e.title} • ${e.venueName} | ARRIVE Panama`,
          description: `${e.description} ${e.perkHeadline}`,
          h1: e.title,
          intro: `${e.date} • ${e.location} • Lineup: ${e.artists}`,
          breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: isEs ? 'Eventos' : 'Events', url: `/${loc}/panama/events/` }, { name: e.title, url: `/${loc}/events/${e.altSlug}/` }],
          items: [{ title: `Venue: ${e.venueName}`, url: `/${loc}/venues/${e.venueSlug}/`, sub: 'Ver perfil del local, fotos y menú' }]
        });
      }
    });

    // 5. Restaurants
    VENUES.forEach(v => {
      pagesToPrerender.push({
        relPath: `${loc}/restaurants/${v.slug}/`,
        title: isEs ? `Restaurante ${v.name} — Cena Gourmet & Coctelería en ${v.area} | ARRIVE` : `${v.name} Restaurant — Gourmet Dinner in ${v.area} | ARRIVE`,
        description: isEs ? `Reserva mesa en ${v.name} en ${v.area}. Servicio de cena: ${v.dinnerTime}. ${v.cuisine}.` : `Book dinner table at ${v.name} in ${v.area}, Panama. Dinner service ${v.dinnerTime}.`,
        h1: `Restaurante ${v.name} (${v.area})`,
        intro: `Gastronomía de autor: ${v.cuisine}. Horario de cena: ${v.dinnerTime}.`,
        breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: isEs ? 'Restaurantes' : 'Restaurants', url: `/${loc}/panama/restaurants/` }, { name: v.name, url: `/${loc}/restaurants/${v.slug}/` }],
        items: [{ title: `Ver Eventos de Noche en ${v.name}`, url: `/${loc}/venues/${v.slug}/`, sub: `Fiesta desde las ${v.partyTime}` }]
      });
    });

    // 6. Blog Index Landing
    pagesToPrerender.push({
      relPath: `${loc}/blog/`,
      title: isEs ? 'Blog & Guía VIP de Nightlife en Panamá — ARRIVE' : 'Panama City Nightlife Blog & VIP Guide — ARRIVE',
      description: isEs 
        ? 'Artículos, guías y consejos exclusivos sobre el nightlife, discotecas, rooftops y reservas VIP en Ciudad de Panamá y Casco Antiguo.' 
        : 'Exclusive articles, guides and insider tips on Panama City nightlife, nightclubs, ocean-view rooftops and VIP table reservations.',
      h1: isEs ? 'Blog & Guía VIP del Nightlife en Panamá' : 'Panama City Nightlife Blog & VIP Guide',
      intro: isEs 
        ? 'Consejos de expertos para disfrutar de las mejores fiestas, reservas de mesas VIP, rooftops panorámicos y etiqueta nocturna en Panamá.' 
        : 'Expert insider guides to make the most out of Panama City premier parties, VIP bottle service, rooftop terraces and dress codes.',
      breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: 'Blog', url: `/${loc}/blog/` }],
      items: BLOG_POSTS.map(p => ({
        title: isEs ? p.es.title : p.en.title,
        url: `/${loc}/blog/${p.slug}/`,
        sub: `${p.category} • ${isEs ? 'Leer artículo' : 'Read article'}`
      }))
    });

    // 7. Individual Blog Posts
    BLOG_POSTS.forEach(p => {
      const pLang = isEs ? p.es : p.en;
      pagesToPrerender.push({
        relPath: `${loc}/blog/${p.slug}/`,
        title: pLang.seoTitle,
        description: pLang.description,
        h1: pLang.title,
        intro: pLang.intro,
        breadcrumbs: [
          { name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` },
          { name: 'Blog', url: `/${loc}/blog/` },
          { name: pLang.title, url: `/${loc}/blog/${p.slug}/` }
        ],
        items: [
          { title: isEs ? 'Reservar Mesa VIP & Bottle Service' : 'Book VIP Table & Bottle Service', url: `/${loc}/#book-vip`, sub: 'Atención personalizada vía Arrive Concierge' },
          { title: isEs ? 'Ver Todos los Eventos Activos' : 'Browse All Active Events', url: `/${loc}/`, sub: 'Pases digitales de cortesía' },
          { title: isEs ? 'Explorar Venues Oficiales' : 'Explore Official Venues', url: `/${loc}/venues/`, sub: 'Furia, Terraplén, Primavera, Piano Bar, Cielo' }
        ]
      });
    });

    // 7.1 Gallery & Girls High-Res Photos
    pagesToPrerender.push({
      relPath: `${loc}/galeria/`,
      title: isEs 
        ? 'Galería de Fotos Exclusiva • Arrive Girls & Nightlife | ARRIVE Panamá' 
        : 'Girls & Nightlife Photo Gallery • High-Res Downloads | ARRIVE Panama',
      description: isEs 
        ? 'Descarga fotos oficiales en alta resolución 4K de fiestas y eventos en Furia, Piano Bar, Terraplén y Casco Viejo. Galería exclusiva para modelos y chicas Arrive.' 
        : 'Download uncompressed 4K official photos from parties at Furia, Piano Bar, Terraplén and Casco Viejo. Exclusive gallery for Arrive models and guests.',
      h1: isEs ? 'Galería de Fotos • Arrive Girls' : 'Girls & Nightlife Photo Hub',
      intro: isEs 
        ? 'Encuentra y descarga todas las fotos de tus noches en Furia, Piano Bar, Terraplén y Cielo en máxima resolución. Sin marcas invasivas, 100% libre de compresión y listas para tus historias y posts de Instagram.' 
        : 'Browse and download all photos from your nights at Furia, Piano Bar, Terraplén, and Cielo in ultra-high resolution. Free of heavy watermarks, uncompressed, and ready for your Instagram stories and feed.',
      breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: isEs ? 'Galería de Fotos' : 'Photo Gallery', url: `/${loc}/galeria/` }],
      items: [
        { title: isEs ? 'Furia Club • VIP Lounge & Arcángel Weekend' : 'Furia Club • VIP Lounge & Arcángel Weekend', url: `/${loc}/galeria/`, sub: '6 Fotos 4K' },
        { title: isEs ? 'Red Carpet Photocall • Arrive Models' : 'Red Carpet Photocall • Arrive Models', url: `/${loc}/galeria/`, sub: '4 Fotos 4K' },
        { title: isEs ? 'Terraplén • Rooftop Sunset & Boiler Sessions' : 'Terraplén • Rooftop Sunset & Boiler Sessions', url: `/${loc}/galeria/`, sub: '5 Fotos 4K' },
        { title: isEs ? 'Piano Bar • Ladies Night & Reggaetón Society' : 'Piano Bar • Ladies Night & Reggaetón Society', url: `/${loc}/galeria/`, sub: '5 Fotos 4K' }
      ]
    });

    // 8. Directory / Site Index
    pagesToPrerender.push({
      relPath: `${loc}/directorio/`,
      title: isEs ? 'Directorio de Nightlife & Todas las Páginas | ARRIVE Panamá' : 'Panama Nightlife Directory & Complete Site Index | ARRIVE',
      description: isEs 
        ? 'Explora todas las guías de discotecas, rooftops en Casco Antiguo, eventos por día, venues asociados y recursos de ARRIVE.' 
        : 'Explore all nightlife guides, Casco Viejo rooftops, events by day, partner venues and corporate resources on ARRIVE.',
      h1: isEs ? 'Directorio Oficial ARRIVE Panamá' : 'Official ARRIVE Panama Directory',
      intro: isEs 
        ? 'Explora todas las páginas, hubs temáticos de Casco Antiguo y Bella Vista, eventos por fecha, perfiles de venues y recursos corporativos de la plataforma.' 
        : 'Explore every hub, Casco Viejo nightlife category, party by day, venue profiles, editorial articles, and corporate resources on ARRIVE.',
      breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: isEs ? 'Directorio' : 'Directory', url: `/${loc}/directorio/` }],
      items: [
        { title: isEs ? 'Nightlife Panamá' : 'Panama Nightlife', url: `/${loc}/panama/nightlife/`, sub: 'Discotecas, fiestas y rooftops' },
        { title: isEs ? 'Clubs en Casco Viejo' : 'Clubs in Casco Viejo', url: `/${loc}/panama/casco-viejo/clubs/`, sub: 'Casco Antiguo San Felipe' },
        { title: isEs ? 'Eventos Hoy' : 'Events Tonight', url: `/${loc}/panama/events/today/`, sub: 'Cartelera activa' },
        { title: isEs ? 'Venues Oficiales' : 'Official Venues', url: `/${loc}/venues/`, sub: 'Furia, Terraplén, Primavera, Cielo, Piano Bar' },
        { title: isEs ? 'Blog & Consejos VIP' : 'Blog & VIP Tips', url: `/${loc}/blog/`, sub: 'Artículos editoriales' }
      ]
    });

    // 9. Institutional & Legal Pages
    const legalPages = [
      {
        slug: 'cookies',
        title: isEs ? 'Política de Cookies | ARRIVE Panamá' : 'Cookie Policy | ARRIVE Panama',
        desc: isEs ? 'Información sobre cookies, preferencias y analítica en ARRIVE Platform.' : 'Information on cookies, preferences, and analytics on ARRIVE Platform.',
        h1: isEs ? 'Política de Cookies' : 'Cookie Policy',
        intro: isEs ? 'Información clara sobre el uso de cookies y preferencias de navegación.' : 'Clear information on how cookies are used on ARRIVE Platform.'
      },
      {
        slug: 'privacy',
        title: isEs ? 'Política de Privacidad | ARRIVE Panamá' : 'Privacy Policy | ARRIVE Panama',
        desc: isEs ? 'Compromiso de protección de datos personales conforme a la Ley 81 de Panamá.' : 'Data protection and confidentiality policy under Panama Law 81.',
        h1: isEs ? 'Política de Privacidad' : 'Privacy Policy',
        intro: isEs ? 'Protección de datos personales y confidencialidad en Ciudad de Panamá.' : 'Commitment to data security and privacy under Panama laws.'
      },
      {
        slug: 'terms-and-conditions',
        title: isEs ? 'Términos & Condiciones | ARRIVE Panamá' : 'Terms & Conditions | ARRIVE Panama',
        desc: isEs ? 'Condiciones de uso de la plataforma ARRIVE, pases digitales y normativas de admisión.' : 'Platform usage rules, digital pass terms and admission policies.',
        h1: isEs ? 'Términos & Condiciones' : 'Terms & Conditions',
        intro: isEs ? 'Condiciones de uso de pases digitales de cortesía y reservas VIP.' : 'Terms of use for complimentary passes and VIP table service.'
      },
      {
        slug: 'work-with-us',
        title: isEs ? 'Trabaja con Nosotros | ARRIVE Model Management' : 'Work With Us | ARRIVE Model Management',
        desc: isEs ? 'Únete al equipo líder en hospitalidad de lujo, modelaje y producción de eventos en Panamá.' : 'Join the premier team in nightlife, modeling, and VIP events in Panama City.',
        h1: isEs ? 'Trabaja con Nosotros' : 'Work With Us',
        intro: isEs ? 'Oportunidades de carrera en modelaje, VIP hosts y producción de eventos.' : 'Career opportunities in modeling, VIP hosts, and nightlife event production.'
      },
      {
        slug: 'whistleblowing',
        title: isEs ? 'Canal Ético & Denuncias | ARRIVE Platform' : 'Whistleblowing Channel | ARRIVE Platform',
        desc: isEs ? 'Canal confidencial para comunicar irregularidades o conductas contrarias a las políticas de ARRIVE.' : 'Confidential and secure ethics reporting channel for ARRIVE Platform.',
        h1: isEs ? 'Canal Ético & Denuncias (Whistleblowing)' : 'Whistleblowing Channel',
        intro: isEs ? 'Garantía de confidencialidad absoluta y política de tolerancia cero.' : 'Confidential and secure reporting channel with zero tolerance policy.'
      },
      {
        slug: 'contact-us',
        title: isEs ? 'Ubicaciones & Contacto | ARRIVE Panamá' : 'Locations & Contact Us | ARRIVE Panama',
        desc: isEs ? 'Oficinas corporativas, red de venues y atención Concierge 24/7 en Ciudad de Panamá.' : 'Corporate offices, venue network and 24/7 VIP Concierge support in Panama City.',
        h1: isEs ? 'Ubicaciones & Contacto' : 'Locations & Contact Us',
        intro: isEs ? 'Atención administrativa, patrocinios y soporte Arrive Concierge VIP 24/7.' : 'Offices, brand partnerships, and 24/7 VIP Concierge assistance.'
      },
      {
        slug: 'press',
        title: isEs ? 'Prensa & Kit de Medios | ARRIVE Platform' : 'Press & Media Kit | ARRIVE Platform',
        desc: isEs ? 'Kit de prensa oficial, recursos de marca, fotos en alta definición y comunicados.' : 'Official brand assets, high-definition imagery, and press releases.',
        h1: isEs ? 'Prensa & Comunicados' : 'Press & Media Kit',
        intro: isEs ? 'Recursos visuales, notas de prensa y acreditaciones de medios.' : 'Visual assets, press statements, and media accreditations.'
      }
    ];

    legalPages.forEach(lp => {
      pagesToPrerender.push({
        relPath: `${loc}/${lp.slug}/`,
        title: lp.title,
        description: lp.desc,
        h1: lp.h1,
        intro: lp.intro,
        breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: lp.h1, url: `/${loc}/${lp.slug}/` }],
        items: [
          { title: isEs ? 'Directorio de Páginas' : 'Site Directory', url: `/${loc}/directorio/`, sub: 'Índice general' },
          { title: isEs ? 'Inicio ARRIVE' : 'ARRIVE Home', url: `/${loc}/`, sub: 'Eventos y pases' },
          { title: isEs ? 'Contacto Concierge VIP' : 'Contact VIP Concierge', url: `/${loc}/contact-us/`, sub: 'Atención 24/7' }
        ]
      });
    });
  });

  // Generate each file
  let generatedCount = 0;
  pagesToPrerender.forEach(page => {
    const targetDir = path.join(DIST_DIR, page.relPath);
    fs.mkdirSync(targetDir, { recursive: true });

    const canonicalUrl = `${BASE_URL}/${page.relPath}`;
    const altEs = `${BASE_URL}/es/${page.relPath.slice(3)}`;
    const altEn = `${BASE_URL}/en/${page.relPath.slice(3)}`;

    // Build structured fallback HTML inside #root so bots have 100% crawlable content
    const breadcrumbsHtml = (page.breadcrumbs || []).map((b, i) => `<li><a href="${b.url}">${b.name}</a>${i < page.breadcrumbs.length - 1 ? ' &gt; ' : ''}</li>`).join('');
    
    const itemsHtml = (page.items || []).map(item => `
      <article style="margin: 0.75rem 0; padding: 0.85rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;">
        <h3 style="margin: 0 0 0.25rem 0;"><a href="${item.url}" style="color: #ffffff; text-decoration: none;">${item.title}</a></h3>
        <p style="margin: 0; font-size: 0.82rem; color: #888888;">${item.sub || ''}</p>
      </article>
    `).join('');

    const semanticContent = `
      <div class="arrive_prerender_container" style="max-width: 900px; margin: 0 auto; padding: 2rem 1.25rem; font-family: Montserrat, sans-serif; color: #ffffff;">
        <nav aria-label="Breadcrumbs" style="margin-bottom: 1.25rem;">
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 6px; font-size: 0.78rem; color: #888888;">
            ${breadcrumbsHtml}
          </ul>
        </nav>
        <header style="margin-bottom: 2rem;">
          <h1 style="font-size: 2rem; font-weight: 900; margin: 0 0 0.5rem 0; text-transform: uppercase; letter-spacing: 0.04em;">${page.h1}</h1>
          <p style="font-size: 0.95rem; color: #cccccc; line-height: 1.6; margin: 0;">${page.intro}</p>
        </header>
        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.15rem; font-weight: 800; text-transform: uppercase; color: #ff3b5c; margin-bottom: 1rem;">Explorar en ARRIVE</h2>
          <div>${itemsHtml}</div>
        </section>
        ${(page.faqs && page.faqs.length > 0) ? `
        <section style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
          <h2 style="font-size: 1.15rem; font-weight: 800; text-transform: uppercase; color: #ff3b5c; margin-bottom: 1rem;">Preguntas Frecuentes (FAQ)</h2>
          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${page.faqs.map(f => `
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 0.9rem 1.1rem;">
                <h3 style="font-size: 0.95rem; font-weight: 700; margin: 0 0 0.4rem 0; color: #ffffff;">${f.question}</h3>
                <p style="margin: 0; font-size: 0.86rem; color: #aaaaaa; line-height: 1.6;">${f.answer}</p>
              </div>
            `).join('')}
          </div>
        </section>
        ` : ''}
        <footer style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.75rem; color: #666666;">
          <p>ARRIVE Model Management © 2026 • Ciudad de Panamá & Casco Antiguo</p>
          <div style="display: flex; gap: 12px; margin-top: 6px;">
            <a href="/es/panama/nightlife/" style="color: #888;">Nightlife Panamá</a>
            <a href="/es/panama/rooftops/" style="color: #888;">Rooftops Panamá</a>
            <a href="/es/panama/clubs/" style="color: #888;">Clubs Panamá</a>
            <a href="/es/panama/events/today/" style="color: #888;">Eventos Hoy</a>
          </div>
        </footer>
      </div>
    `;

    // Build Page Schema.org JSON-LD graph
    const schemaGraph = [
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Arrive Model Management',
        url: BASE_URL,
        logo: `${BASE_URL}/images/arrive-logo-white.png`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ciudad de Panamá',
          addressCountry: 'PA'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/${page.relPath.slice(0, 2) || 'es'}/#website`,
        url: `${BASE_URL}/${page.relPath.slice(0, 2) || 'es'}/`,
        name: 'ARRIVE Platform',
        inLanguage: page.relPath.startsWith('en') ? 'en-US' : 'es-PA'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: (page.breadcrumbs || []).map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.url.startsWith('http') ? b.url : `${BASE_URL}${b.url}`
        }))
      }
    ];

    if (page.faqs && page.faqs.length > 0) {
      schemaGraph.push({
        '@type': 'FAQPage',
        mainEntity: page.faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      });
    }

    if (page.venueData) {
      const v = page.venueData;
      const isRooftop = v.tagline?.toLowerCase().includes('rooftop');
      const venueSchemaNode = {
        '@type': [isRooftop ? 'BarOrPub' : 'NightClub', 'Restaurant'],
        '@id': `${canonicalUrl}#venue`,
        name: v.name,
        url: canonicalUrl,
        image: v.coverImage?.startsWith('http') ? v.coverImage : `${BASE_URL}${v.coverImage}`,
        telephone: v.phone || '+507 6223-5453',
        priceRange: '$$$',
        servesCuisine: v.cuisine || 'Fusión Japonesa & Robata Internacional',
        address: {
          '@type': 'PostalAddress',
          streetAddress: v.address,
          addressLocality: v.area || 'Ciudad de Panamá',
          addressRegion: 'Panamá',
          addressCountry: 'PA'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: v.slug?.includes('cielo') ? '4.6' : v.slug?.includes('terraplen') || v.slug?.includes('piano') ? '4.7' : '4.8',
          reviewCount: v.slug?.includes('cielo') ? '1320' : v.slug?.includes('furia') ? '520' : v.slug?.includes('piano') ? '340' : v.slug?.includes('terraplen') ? '246' : '190',
          bestRating: '5',
          worstRating: '1'
        },
        hasMap: v.googleMapsUrl || undefined,
        sameAs: [v.googleMapsUrl].filter(Boolean)
      };

      if (v.menuHighlights && v.menuHighlights.length > 0) {
        venueSchemaNode.hasMenu = {
          '@type': 'Menu',
          name: `Menú Oficial ${v.name}`,
          url: canonicalUrl,
          hasMenuItem: v.menuHighlights.map(item => ({
            '@type': 'MenuItem',
            name: item.name,
            description: item.desc,
            offers: {
              '@type': 'Offer',
              price: (item.price || '').replace(/[^0-9.]/g, '') || '0',
              priceCurrency: 'USD'
            }
          }))
        };
      }
      schemaGraph.push(venueSchemaNode);
    }

    const jsonLdTag = `
    <script type="application/ld+json" id="arrive-ssg-jsonld">
    ${JSON.stringify({ '@context': 'https://schema.org', '@graph': schemaGraph }, null, 2)}
    </script>
    `;

    // Replace <title>, <meta name="description">, canonical, hreflang, and root div
    const pageLocale = page.locale || (page.relPath.startsWith('en/') ? 'en' : 'es');
    let customizedHtml = baseHtml
      .replace(/<html lang=".*?"/i, `<html lang="${pageLocale}"`)
      .replace(/<title>.*?<\/title>/i, `<title>${page.title}</title>`)
      .replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${page.description.replace(/"/g, '&quot;')}" />`)
      .replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`)
      .replace(/<div id="root"><\/div>/i, `<div id="root">${semanticContent}</div>`);

    // Add hreflang links and JSON-LD before </head>
    const hreflangTags = `
    <link rel="alternate" hreflang="es" href="${altEs}" />
    <link rel="alternate" hreflang="en" href="${altEn}" />
    <link rel="alternate" hreflang="x-default" href="${altEs}" />
    `;
    customizedHtml = customizedHtml.replace('</head>', `${hreflangTags}\n${jsonLdTag}\n</head>`);

    fs.writeFileSync(path.join(targetDir, 'index.html'), customizedHtml, 'utf-8');
    generatedCount++;
  });

  console.log(`✅ ${generatedCount} páginas pre-renderizadas con éxito en dist/`);
};

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  prerenderAllPages();
}
