// =========================================================================
// ARRIVE PLATFORM — BUILD-TIME STATIC PRERENDERER (SSG)
// Generates 100% crawlable HTML pages for Googlebot and instant TTFB
// =========================================================================

import fs from 'fs';
import { BLOG_POSTS } from '../src/data/blogData.js';
import { getEditorialPage, editorialHtml, escapeHtml } from '../src/seo/editorial.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_EVENTS } from '../src/data/initialData.js';

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

// Events come straight from the app's data so prerendered pages and the live
// cartelera never drift apart.
const EVENTS = INITIAL_EVENTS
  .filter(e => e.indexable !== false && e.slug)
  .map(e => ({
    ...e,
    venueName: VENUES.find(v => v.slug === e.venueSlug)?.name || e.location,
    artists: (e.artists || []).map(a => a.name).filter(Boolean).join(', ') || 'Por anunciar',
    description: e.seoDescription || e.description || '',
    perkHeadline: e.perkHeadline || ''
  }));

// English meta description for events (event copy in the data is Spanish-only).
const englishEventDescription = (e) => {
  const when = e.eventDate ? new Date(`${e.eventDate}-05:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'America/Panama' }) : e.date;
  const free = e.price === 0 ? ' Free digital pass available on ARRIVE.' : '';
  const genres = (e.musicGenres || []).slice(0, 3).join(', ');
  return `${e.title} at ${e.venueName}, Panama City — ${when}${e.time ? `, ${e.time}` : ''}.${genres ? ` Music: ${genres}.` : ''}${free} Perks, guest list and VIP tables.`;
};

// Archive of every event ever prerendered, so past event URLs keep resolving.
const ARCHIVE_PATH = path.join(ROOT_DIR, 'src/data/eventArchive.json');
const readArchive = () => { try { return JSON.parse(fs.readFileSync(ARCHIVE_PATH, 'utf-8')); } catch { return []; } };
const archive = readArchive();
const currentSlugs = new Set(EVENTS.map(e => e.slug));
EVENTS.forEach(e => {
  const entry = { slug: e.slug, title: e.title, venueSlug: e.venueSlug, venueName: e.venueName, date: e.date, eventDate: e.eventDate, image: e.image };
  const i = archive.findIndex(a => a.slug === e.slug);
  if (i >= 0) archive[i] = entry; else archive.push(entry);
});
const PAST_EVENTS = archive.filter(a => !currentSlugs.has(a.slug) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug));

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



export const prerenderAllPages = async () => {
  if (!fs.existsSync(DIST_DIR)) {
    console.warn('⚠️ No se encontró la carpeta dist/. Ejecuta primero `vite build`.');
    return;
  }

  const baseHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.warn('⚠️ No se encontró dist/index.html');
    return;
  }

  // dist/index.html gets overwritten below by the prerendered home page, so keep a
  // pristine copy of Vite's empty-root template. Re-running this script then still
  // starts from a clean template instead of stacking old content and JSON-LD.
  const templatePath = path.join(DIST_DIR, '.ssg-template.html');
  let baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');
  if (/<div id="root"><\/div>/i.test(baseHtml)) {
    fs.writeFileSync(templatePath, baseHtml, 'utf-8');
  } else if (fs.existsSync(templatePath)) {
    baseHtml = fs.readFileSync(templatePath, 'utf-8');
  } else {
    console.warn('⚠️ dist/index.html ya fue pre-renderizado y no hay plantilla limpia. Corre `vite build` primero.');
    return;
  }
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

    // 4. Events (+ related links so every event page links to the rest of the cartelera)
    EVENTS.forEach(e => {
      const sameVenue = EVENTS.filter(o => o.slug !== e.slug && o.venueSlug === e.venueSlug);
      const otherVenues = EVENTS.filter(o => o.slug !== e.slug && o.venueSlug !== e.venueSlug).slice(0, 6);
      const eventLink = o => ({ title: o.title, url: `/${loc}/events/${o.slug}/`, sub: `${o.date} • ${o.venueName}` });
      pagesToPrerender.push({
        relPath: `${loc}/events/${e.slug}/`,
        title: isEs ? `${e.title} • ${e.venueName} | ARRIVE Panamá` : `${e.title} • ${e.venueName} | ARRIVE Panama`,
        description: isEs ? `${e.description} ${e.perkHeadline}`.trim() : englishEventDescription(e),
        h1: e.title,
        intro: `${e.date} • ${e.location} • Lineup: ${e.artists}`,
        breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: isEs ? 'Eventos' : 'Events', url: `/${loc}/panama/events/` }, { name: e.title, url: `/${loc}/events/${e.slug}/` }],
        items: [
          { title: `Venue: ${e.venueName}`, url: `/${loc}/venues/${e.venueSlug}/`, sub: isEs ? 'Ver perfil del local, fotos y menú' : 'Venue profile, photos and menu' },
          ...sameVenue.map(eventLink),
          ...otherVenues.map(eventLink)
        ],
        image: e.image,
        eventData: e
      });
    });

    // 4.1 Past events: keep their URLs alive (shared links, backlinks) as noindex pages
    // that point to the venue and the current cartelera instead of returning a 404.
    PAST_EVENTS.forEach(e => {
      pagesToPrerender.push({
        relPath: `${loc}/events/${e.slug}/`,
        title: isEs ? `${e.title} (finalizado) • ${e.venueName} | ARRIVE Panamá` : `${e.title} (ended) • ${e.venueName} | ARRIVE Panama`,
        description: isEs ? `Este evento en ${e.venueName} ya finalizó. Mira los próximos eventos y beneficios en ARRIVE.` : `This event at ${e.venueName} has ended. See upcoming events and perks on ARRIVE.`,
        h1: e.title,
        intro: isEs ? `Este evento ya finalizó (${e.date}). Te esperamos en los próximos.` : `This event has ended (${e.date}). See what's next.`,
        breadcrumbs: [{ name: isEs ? 'Inicio' : 'Home', url: `/${loc}/` }, { name: isEs ? 'Eventos' : 'Events', url: `/${loc}/panama/events/` }, { name: e.title, url: `/${loc}/events/${e.slug}/` }],
        items: [
          ...(VENUES.some(v => v.slug === e.venueSlug) ? [{ title: e.venueName, url: `/${loc}/venues/${e.venueSlug}/`, sub: isEs ? 'Próximos eventos en este local' : 'Upcoming events at this venue' }] : []),
          ...EVENTS.slice(0, 8).map(o => ({ title: o.title, url: `/${loc}/events/${o.slug}/`, sub: `${o.date} • ${o.venueName}` }))
        ],
        image: e.image,
        noindex: true
      });
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
        description: pLang.seoDescription,
        h1: pLang.title,
        intro: pLang.excerpt,
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

  // Ensure all canonical hubs have a static response. Thin/overlapping hubs stay noindex.
  const { SEO_CATEGORY_HUBS } = await import('../src/data/seoModels.js');
  for (const loc of ['es', 'en']) {
    for (const hub of Object.values(SEO_CATEGORY_HUBS)) {
      const relPath = loc + hub.path;
      if (!pagesToPrerender.some(p => p.relPath === relPath)) pagesToPrerender.push({relPath, title:hub[loc].title, description:hub[loc].description, h1:hub[loc].h1, intro:hub[loc].description, items:[]});
    }
    pagesToPrerender.push({relPath:`${loc}/explore/`});
  }
  // Generate each file
  let generatedCount = 0;
  pagesToPrerender.forEach(page => {
    const editorial = getEditorialPage('/' + page.relPath);
    if (editorial) Object.assign(page, {title:editorial.title,description:editorial.description,h1:editorial.h1,intro:editorial.post ? editorial.data.excerpt : editorial.description,breadcrumbs:editorial.breadcrumbs.map(b=>({...b,url:b.path})),items:[]});
    const targetDir = path.join(DIST_DIR, page.relPath);
    fs.mkdirSync(targetDir, { recursive: true });

    const canonicalPath = ('/'+page.relPath).replace(/^\/(es|en)\/venues\/$/, '/$1/panama/venues/').replace(/^\/(es|en)\/concierge\/$/, '/$1/panama/concierge/').replace('/panama/events/this-weekend/', '/panama/events/weekend/');
    const canonicalUrl = editorial?.canonicalUrl || BASE_URL + (canonicalPath === '/' ? '/es/' : canonicalPath);
    const altEs = canonicalUrl.replace(/\/(es|en)\//, '/es/');
    const altEn = canonicalUrl.replace(/\/(es|en)\//, '/en/');

    // Build structured fallback HTML inside #root so bots have 100% crawlable content
    const breadcrumbsHtml = (page.breadcrumbs || []).map((b, i) => `<li><a href="${b.url}">${b.name}</a>${i < page.breadcrumbs.length - 1 ? ' &gt; ' : ''}</li>`).join('');
    
    const itemsHtml = (page.items || []).map(item => `
      <article style="margin: 0.75rem 0; padding: 0.85rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;">
        <h3 style="margin: 0 0 0.25rem 0;"><a href="${item.url}" style="color: #ffffff; text-decoration: none;">${item.title}</a></h3>
        <p style="margin: 0; font-size: 0.82rem; color: #888888;">${item.sub || ''}</p>
      </article>
    `).join('');

    let semanticContent = `
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

    if (editorial) semanticContent = `<main class="arrive_prerender_container" style="max-width:900px;margin:0 auto;padding:3rem 1.25rem;color:white;line-height:1.7"><nav><a href="/${editorial.locale}/">ARRIVE</a> / <a href="/${editorial.locale}/explore/">${editorial.copy.exploreTitle}</a></nav><h1>${escapeHtml(editorial.h1)}</h1><p>${escapeHtml(page.intro)}</p>${editorialHtml(editorial)}</main>`;
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

    if (page.eventData) {
      const e = page.eventData;
      const venue = VENUES.find(v => v.slug === e.venueSlug);
      const abs = u => (u && !u.startsWith('http') ? `${BASE_URL}${u}` : u);
      schemaGraph.push({
        '@type': 'Event',
        '@id': `${canonicalUrl}#event`,
        name: e.title,
        description: e.description,
        startDate: e.eventDate ? (/Z$|[+-]\d{2}:\d{2}$/.test(e.eventDate) ? e.eventDate : `${e.eventDate}-05:00`) : undefined,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        image: e.image ? [abs(e.image)] : undefined,
        url: canonicalUrl,
        location: {
          '@type': 'Place',
          name: e.venueName,
          address: {
            '@type': 'PostalAddress',
            streetAddress: venue?.address || e.address,
            addressLocality: 'Ciudad de Panamá',
            addressCountry: 'PA'
          }
        },
        organizer: { '@type': 'Organization', name: 'ARRIVE Panamá', url: BASE_URL },
        ...(e.ticketUrl && e.price != null ? { offers: { '@type': 'Offer', url: e.ticketUrl, price: e.price ?? 0, priceCurrency: 'USD', availability: 'https://schema.org/InStock' } } : {}),
        ...(e.artists && e.artists !== 'Por anunciar' ? { performer: e.artists.split(', ').map(name => ({ '@type': 'Person', name })) } : {})
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
        telephone: undefined,
        servesCuisine: v.cuisine || 'Fusión Japonesa & Robata Internacional',
        address: {
          '@type': 'PostalAddress',
          streetAddress: v.address,
          addressLocality: v.area || 'Ciudad de Panamá',
          addressRegion: 'Panamá',
          addressCountry: 'PA'
        },
        hasMap: v.googleMapsUrl || undefined,
        sameAs: [v.googleMapsUrl].filter(Boolean)
      };

      schemaGraph.push(venueSchemaNode);
    }

    if (editorial) schemaGraph.push(editorial.mainEntity);
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
    // All social metadata must agree with the canonical document, before JavaScript.
    const rawImage = page.image || page.venueData?.coverImage || (editorial?.post ? editorial.data?.coverImage : null);
    const ogImage = rawImage && !/\.svg$/i.test(rawImage) ? (rawImage.startsWith('http') ? rawImage : BASE_URL + rawImage) : `${BASE_URL}/images/arrive-logo-white.png`;
    const noindex = page.noindex || /\/panama\/(?:nightlife|clubs|rooftops|casco-antiguo|casco-viejo|parties|restaurants|events)/.test('/'+page.relPath);
    customizedHtml = customizedHtml.replace(/<meta\s+(?:name|property)="(?:title|keywords|description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>/gi, '');
    customizedHtml = customizedHtml.replace('</head>', `<meta name="description" content="${escapeHtml(page.description)}"/><meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}"/><meta property="og:title" content="${escapeHtml(page.title)}"/><meta property="og:description" content="${escapeHtml(page.description)}"/><meta property="og:url" content="${canonicalUrl}"/><meta property="og:type" content="${editorial?.post ? 'article':'website'}"/><meta property="og:image" content="${ogImage}"/><meta property="og:locale" content="${pageLocale==='es'?'es_PA':'en_US'}"/><meta name="twitter:card" content="${ogImage.endsWith('arrive-logo-white.png') ? 'summary' : 'summary_large_image'}"/><meta name="twitter:image" content="${ogImage}"/><meta name="twitter:title" content="${escapeHtml(page.title)}"/><meta name="twitter:description" content="${escapeHtml(page.description)}"/>\n</head>`);
    customizedHtml = customizedHtml.replace('</head>',  `${hreflangTags}\n${jsonLdTag}\n</head>`);

    fs.writeFileSync(path.join(targetDir, 'index.html'), customizedHtml, 'utf-8');
    generatedCount++;
  });

  fs.writeFileSync(path.join(DIST_DIR, '404.html'), '<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="robots" content="noindex, follow"><title>Página no encontrada | ARRIVE</title></head><body><h1>Página no encontrada / Page not found</h1><a href="/es/explore/">Explorar Panamá</a> · <a href="/en/explore/">Explore Panama</a></body></html>');
  fs.writeFileSync(ARCHIVE_PATH, JSON.stringify(archive, null, 2) + '\n', 'utf-8');
  console.log(`✅ ${generatedCount} páginas pre-renderizadas con éxito en dist/`);
};

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  prerenderAllPages();
}
