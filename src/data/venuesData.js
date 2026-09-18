// =========================================================================
// ARRIVE PLATFORM — CANONICAL VENUES DATABASE
// Official profiles for Panama's top nightlife & dining destinations
// =========================================================================

export const VIP_TABLE_PRICING = [
  {
    id: 'area-vip',
    name: 'Área VIP',
    badge: 'MÁXIMA EXCLUSIVIDAD',
    price: 600,
    priceFormatted: '$600 USD',
    itbmsPercent: 7,
    itbmsFormatted: '+ 7% ITBMS ($42.00)',
    totalFormatted: '$642.00 USD total',
    consumable: true,
    consumableText: '100% consumibles en botellas y menú',
    entriesIncluded: 10,
    entriesText: 'Incluye 10 entradas de acceso preferencial',
    description: 'Ubicación VIP de primer nivel con atención personalizada de anfitrión Arrive, servicio de botellas preferencial y la mejor vista del local.'
  },
  {
    id: 'main-room',
    name: 'Área Main Room',
    badge: 'PISTA & DJ BOOTH',
    price: 350,
    priceFormatted: '$350 USD',
    itbmsPercent: 7,
    itbmsFormatted: '+ 7% ITBMS ($24.50)',
    totalFormatted: '$374.50 USD total',
    consumable: true,
    consumableText: '100% consumibles en botellas y menú',
    entriesIncluded: 10,
    entriesText: 'Incluye 10 entradas de acceso preferencial',
    description: 'Mesa en el corazón del salón principal frente a la cabina del DJ y pista, 100% canjeable en consumo de botellas y gastronomía.'
  }
];

export const INITIAL_VENUES = [
  {
    id: 'venue-furia',
    name: 'Furia Club & Restaurant',
    h1Title: 'Furia Club & Restaurant Panamá',
    shortName: 'Furia',
    slug: 'furia-club',
    tagline: 'Alta gastronomía asiática & nightlife de vanguardia en Bella Vista',
    category: 'Nightclub & Restaurant',
    area: 'Bella Vista',
    city: 'Ciudad de Panamá',
    address: 'Calle Rogelio Alfaro & Calle 48 Este, PH La Trona, Bella Vista, Ciudad de Panamá',
    googleMapsUrl: 'https://maps.google.com/?q=Furia+Panama+Calle+Rogelio+Alfaro',
    googleMapsQuery: 'Furia Panama, Calle Rogelio Alfaro, Bella Vista, Panama',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Furia+Panama,+Calle+Rogelio+Alfaro,+Bella+Vista,+Panama&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapPreview: '/images/furia_map_preview.jpg',
    websiteUrl: 'https://www.grupofuriapanama.com',
    instagramUrl: 'https://www.instagram.com/furiapanama/',
    instagramHandle: '@furiapanama',
    phone: '+507 6223-5453',
    email: 'reservas@grupofuriapanama.com',
    dinnerTime: '6:00 PM - 10:30 PM',
    partyTime: '10:30 PM - 04:00 AM',
    schedule: 'Lunes a Sábado desde 06:00 PM',
    dressCode: 'Nightlife Chic / Elegante',
    parking: 'Valet Parking en entrada de PH La Trona + parqueos vigilados',
    ageLimit: '18+ (Cédula o Pasaporte físico obligatorio)',
    rating: '4.8',
    reviewCount: '520',
    coverImage: '/images/venues/furia/cover.jpg',
    teaserVideoUrl: '/videos/furia-preview.mp4',
    seoTitle: 'Furia Panamá | Restaurante, Club & Menú Completo',
    seoDescription: 'Menú completo, fotos y reservas en Furia Panamá: alta cocina nikkei, sushi rolls, robata, coctelería de autor, parades y mesas VIP en Bella Vista.',
    keywords: 'Furia Panamá · Furia Club Panamá · menu Furia Panama · restaurante Calle 50 · club Bella Vista · restaurante nikkei Panamá · sushi Panama · mesas VIP Furia · Furia on ice',
    description: 'Furia es el restaurante, cocktail bar y discoteca de vanguardia en Bella Vista, Ciudad de Panamá. Inspirado en la naturaleza con una escultura central en forma de árbol y un diseño minimalista de lujo, Furia ofrece una experiencia sensorial única donde la alta cocina japonesa-internacional evoluciona orgánicamente hacia la mejor fiesta de la ciudad.\n\nLa noche comienza con una cuidada propuesta de Raw Bar, ceviches nikkei, tiraditos, wagyu al robata y signature sushi rolls, maridados con coctelería de autor premium. Conforme avanza la medianoche, las luces bajan, la música toma el protagonismo con ritmos afro, deep house étnico, reggaetón y open format en una cabina de DJ central de 360°, dando paso a un ambiente electrizante con servicio de botellas VIP y los icónicos Furia Parades.\n\nConsulta en ARRIVE el menú oficial completo de Furia con precios detallados, próximos eventos semanales, beneficios exclusivos en lista de cortesía y reserva tu mesa VIP con atención Concierge dedicada.',
    pdfMenuRestaurant: 'https://grupofuriapanama.com/FURIA_Menu_Restaurante.pdf',
    pdfMenuCocktails: 'https://grupofuriapanama.com/FURIA_Menu_Cocteles.pdf',
    pdfMenuLiquor: 'https://grupofuriapanama.com/MENU_LICOR_IMPRESION_FINAL.pdf',
    vipPricing: VIP_TABLE_PRICING,
    faqs: {
      es: [
        {
          question: '¿Cuál es el código de vestimenta (dress code) en Furia Panamá?',
          answer: 'El dress code oficial es Nightlife Chic / Elegante. Se admiten camisas de vestir, blazers, ropa casual refinada y vestidos sofisticados. No se permite el ingreso con ropa deportiva, sandalias playeras, bermudas ni camisetas sin mangas.'
        },
        {
          question: '¿Cómo funciona la reserva de mesas VIP y el bottle service en Furia?',
          answer: 'Las mesas VIP están distribuidas alrededor de la cabina central 360° del DJ y en la zona lounge elevada. El 100% del valor de tu reserva es canjeable en botellas premium y platos del menú gastronómico, e incluye atención de mesero dedicado y show de bengalas con el Furia Parade.'
        },
        {
          question: '¿A qué hora comienza la cena y a qué hora empieza la fiesta?',
          answer: 'El servicio gastronómico de cena opera de 6:00 PM a 10:30 PM. A partir de las 10:30 PM las luces bajan y Furia evoluciona a club nocturno con DJs en vivo hasta las 4:00 AM.'
        },
        {
          question: '¿Furia cuenta con servicio de Valet Parking en Bella Vista?',
          answer: 'Sí, Furia ofrece servicio de Valet Parking exclusivo directamente en la entrada de PH La Trona sobre Calle Rogelio Alfaro, con personal de seguridad privada 24/7.'
        },
        {
          question: '¿Cuál es la edad mínima para ingresar a Furia Club?',
          answer: 'La edad mínima para las horas de clubbing nocturno es de 18 años. Es indispensable presentar cédula de identidad panameña o pasaporte físico original vigente en puerta.'
        }
      ],
      en: [
        {
          question: 'What is the dress code at Furia Panama?',
          answer: 'The dress code is Nightlife Chic / Smart Elegant. Fashionable nightlife attire, collared shirts, blazers, and chic dresses are recommended. Sportswear, beach sandals, shorts, and athletic tank tops are not permitted.'
        },
        {
          question: 'How do VIP table reservations and bottle service work at Furia?',
          answer: 'VIP tables surround the central 360° DJ booth and elevated lounge. 100% of your reservation spend is credited toward premium liquor bottles and cuisine from the menu. Includes dedicated bottle hosts and the iconic Furia Parade presentation.'
        },
        {
          question: 'What are the dinner and nightclub hours?',
          answer: 'Dinner service runs from 6:00 PM to 10:30 PM with the full sushi and robata menu. At 10:30 PM, the venue transitions into a high-energy nightclub with resident DJs until 4:00 AM.'
        },
        {
          question: 'Is valet parking available at Furia?',
          answer: 'Yes, Furia provides dedicated private Valet Parking right at the main entrance of PH La Trona on Calle Rogelio Alfaro in Bella Vista, guarded by private security.'
        },
        {
          question: 'What is the minimum age requirement?',
          answer: 'Minimum age for clubbing hours is 18+. A valid original government-issued ID or physical passport is strictly required at entry.'
        }
      ]
    },
    features: [
      'Cabina de DJ central en 360° en el corazón de la pista',
      'Cocina Fusión Japonesa & Robata Grill con cortes Prime y Wagyu',
      'Barra de Mixología de Autor con jarabes e infusiones artesanales',
      'Espectacular árbol escultural luminoso de diseño internacional',
      'Servicio de Botellas VIP Lounge & Furia on Ice Parades',
      'Valet parking privado y estricto control de admisión'
    ],
    gallery: [
      {
        url: '/images/venues/furia/cover.jpg',
        title: 'Árbol Escultural Luminoso & Salón Principal',
        category: 'Salón & Dining'
      },
      {
        url: '/images/venues/furia/club_lights.jpg',
        title: 'Main Club & Show de Luces 360°',
        category: 'Club & DJ'
      },
      {
        url: '/images/venues/furia/dining_room.jpg',
        title: 'Salón Principal & Cenas de Autor',
        category: 'Restaurante'
      },
      {
        url: '/images/venues/furia/food.jpg',
        title: 'Cocina Fusión Japonesa & Menú Signature',
        category: 'Gastronomía'
      },
      {
        url: '/images/venues/furia/cocktails.jpg',
        title: 'Barra de Mixología & Cócteles de Autor',
        category: 'Coctelería'
      },
      {
        url: '/images/venues/furia/bottles.jpg',
        title: 'Servicio de Botellas VIP Lounge',
        category: 'VIP Service'
      }
    ],
    menu: {
      toShare: [
        { name: 'Shrimp Galaxy Tartare', desc: 'Camarón, aguacate, eneldo, cebolla morada, cilantro y mayo yuzu.', price: '$10', tags: ['S'] },
        { name: 'Veggie Tartar', desc: 'Cebolla morada, berenjena, pimentón, zucchini, tomate cherry, babaganoush y salsa tzatziki.', price: '$9', tags: ['V'] },
        { name: 'Dragon Popcorn Shrimp', desc: 'Camarones apanados crujientes, salsa dragón especial, masago, cebollín y sésamo tostado.', price: '$13', tags: ['S'] },
        { name: 'KFC (Korean Fried Chicken)', desc: 'Boneless de pollo crujiente bañados en salsa agridulce asiática, cebollín y sésamo.', price: '$10' },
        { name: 'Anticuchos de Res', desc: 'Brochetas de lomo de res marinado en salsa panca, lima amarilla y alioli anticuchera.', price: '$10', tags: ['KT'] },
        { name: 'Spicy Veggie Gyozas', desc: 'Gyozas rellenas de kimchee y garbanzos, crocante de arroz, puntillismo de pimentón dulce y salsa dulce.', price: '$9', tags: ['V'] },
        { name: 'Spicy Tuna & Crispy Rice', desc: 'Dados de arroz crujiente dorado, mousse de atún rojo spicy y punto de mayonesa ponzu.', price: '$12', tags: ['S'] },
        { name: 'Brochetas de Pulpo', desc: 'Tentáculos de pulpo tierno glaseados en salsa de pimienta negra y hoisin, acompañados de alioli anticuchera.', price: '$10', tags: ['KT'] },
        { name: 'Edamame / Spicy Edamame', desc: 'Vainas de edamame tiernas salteadas al wok con sal marina o aderezo picante asiático.', price: '$8', tags: ['V', 'GF'] }
      ],
      crudos: [
        { name: 'Ceviche Nikkei de la Casa', desc: 'Pesca fresca del día, cebolla morada fina, cilantro, cubos de mango, ají dulce, aguacate y leche de tigre verde.', price: '$12', tags: ['KT'] },
        { name: 'Tiradito Passion Fruit & Hamachi', desc: 'Finas láminas de pez limón (Yellow Tail), espejo cítrico de maracuyá y ají amarillo, asian tabbule, semillas de zapallo y jalapeño.', price: '$10', tags: ['GF'] },
        { name: 'Crudo de Atún', desc: 'Cortes seleccionados de atún rojo, hilos crocantes de papa, suprema de naranja, perfume de trufas, miso maracuyá y espejo de soya y ponzu.', price: '$10' },
        { name: 'Carpaccio de Res Trufado', desc: 'Láminas de lomo de res sellado, aceite de trufa blanca, alcaparras crunch, puntos de mayonesa de trufa y sal marina Maldon.', price: '$10' },
        { name: 'Carpaccio de Salmón Ahumado', desc: 'Salmón curado y ahumado artesanalmente, eneldo fresco, gel de maracuyá, mayonesa yuzu y gotas de aceite verde botánico.', price: '$12', tags: ['GF'] },
        { name: 'Tiradito de Pulpo al Olivo', desc: 'Láminas finas de pulpo cocido a baja temperatura, salsa de ají amarillo, aceite de oliva virgen, aguacate tatemado y mayonesa al olivo.', price: '$10', tags: ['KT', 'GF'] },
        { name: 'Tuna Tacos Crujientes', desc: 'Crispy tacos de maíz dorados rellenos de tartar de atún, cebolla, ají dulce, cilantro fresco y alioli de trufa blanca.', price: '$10' },
        { name: 'Tartar de Salmón Poke', desc: 'Salmón fresco en cubos, crocante de arroz inflado, nori tostado, cebolla, ají dulce y salsa poke oriental.', price: '$12' },
        { name: 'Tartare de Res con Tobiko Negro', desc: 'Lomo fino picado a cuchillo, perlas de tobiko negro, cebolla morada, ají dulce, salsa Worcestershire, cilantro, mostaza Dijon y aceite de oliva.', price: '$11' }
      ],
      chefsSpecialties: [
        { name: 'Lobster Parmigiano Reggiano', desc: 'Cola de langosta preparada al estilo termidor con cebollín, gratinada con mantequilla clarificada y Parmigiano Reggiano, espejo de soya yuzu y perfume de trufa blanca.', price: '$15', tags: ['S'] },
        { name: 'Lobster Tagliatelle al Termidor', desc: 'Pasta fresca tagliatelle de sémola artesanal con langosta al termidor, tobiko negro, queso Grana Padano, toque de nuez moscada y mostaza dijon suave.', price: '$20', tags: ['S'] },
        { name: 'Pato Pekín a la Naranja', desc: 'Medio pato Pekín glaseado al horno con piel súper crocante, naranja importada caramelizada, bok choy salteado y reducción demiglace de pato a la naranja.', price: '$45', tags: ['KT'] }
      ],
      temakis: [
        { name: 'Temaki Spicy Tuna', desc: 'Cono de alga nori crocante con atún spicy, perfume de sésamo tostado, cebollín fresco y mayonesa ponzu.', price: '$9', tags: ['GF'] },
        { name: 'Temaki Salmón Trufado', desc: 'Salmón fresco con aceite de trufa blanca, aguacate cremoso, masago dorado y cebollín.', price: '$11', tags: ['GF'] },
        { name: 'Temaki Hamachi Acevichado', desc: 'Yellow tail hamachi con salsa acevichada nikkei, yuzu, trufa, láminas de jalapeño fresco, cebollín y miso dulce.', price: '$10', tags: ['GF'] }
      ],
      nigirisSashimis: [
        { name: 'Nigiri Fyre American Wagyu', desc: 'Bocados de arroz sushi con láminas de Wagyu americano flambeado en mesa con salsa nikkei y sal marina.', price: '$13' },
        { name: 'Nigiri / Sashimi Salmón Fresco', desc: 'Cortes premium de salmón del Atlántico servidos sobre arroz sazonado o corte puro.', price: '$10' },
        { name: 'Nigiri / Sashimi Hamachi (Yellow Tail)', desc: 'Pez limón japonés de textura mantecosa y sabor suave y limpio.', price: '$10' },
        { name: 'Nigiri / Sashimi Atún Rojo', desc: 'Atún fresco de grado sashimi con salsa ponzu cítrica.', price: '$8' },
        { name: 'Nigiri / Sashimi Pulpo', desc: 'Pulpo tierno cocido y glaseado al estilo japonés.', price: '$8' },
        { name: 'Nigiri Salmón Ahumado', desc: 'Salmón ahumado con toque de queso crema y cebollín.', price: '$10' }
      ],
      rolls: [
        { name: 'Hotate Roll', desc: 'Langostino tempura, aguacate, scallops curados, miso de maracuyá, nieve de vieiras y toque de togarashi.', price: '$13', tags: ['S'] },
        { name: 'Angry Octopus Roll', desc: 'Langostino crocante, aguacate, pulpo marinado al grill con ají panca, salsa huancaína cremosa y crujiente de holantao.', price: '$13', tags: ['S'] },
        { name: 'Keto Roll New Style (Sin Arroz)', desc: 'Envuelto en hoja de arroz o pepino con salmón, atún rojo, hamachi, kani, hongos shiitake salteados, aguacate, cebollín y reducción dulce.', price: '$13', tags: ['KT'] },
        { name: 'The Sweet Love Roll', desc: 'Anguila glaseada en coco, salmón ahumado, kani, queso crema philadelphia, cobertura de fresas frescas y gel de frutos rojos silvestres.', price: '$13' },
        { name: 'Spicy Tuna Roll', desc: 'Atún rojo marinado picante, cebollín, perfume de sésamo tostado, jalapeños tempura crujientes y puntos de miso dulce caramelizado.', price: '$12', tags: ['S'] },
        { name: 'Negi Hamachi Roll', desc: 'Yellow tail, ensalada de kani cremoso, masago, cebolla negi, perfume de trufas blancas, papel de soya natural, hilos finos de papa frita y yuzu.', price: '$15' },
        { name: 'Tropical Roll', desc: 'Salmón fresco, queso crema, kani en coco crocante, plátano maduro caramelizado y queso brie gratinado.', price: '$14' },
        { name: 'Fantasy Roll', desc: 'Langostinos tempura, queso crema, cobertura de atún rojo, perfume de trufa negra, mayonesa ponzu y tobiko negro.', price: '$12', tags: ['S'] }
      ],
      kitchen: [
        { name: 'Ribeye Prime 12 oz', desc: 'Corte de Ribeye de res Prime certificado (12 oz) a las brasas, mantequilla aromatizada de hierbas finas y guarnición de papas fritas trufadas.', price: '$40' },
        { name: 'Entraña Prime 10 oz', desc: 'Jugosa entraña Prime (10 oz) a la parrilla con mantequilla clarificada de hierbas aromáticas y escamas de sal Maldon.', price: '$35' },
        { name: 'Burger Furia Gourmet', desc: 'Blend artesanal de carne de res, queso gruyere derretido, hongos salteados, cebolla caramelizada, alioli de vegetales rostizados en pan brioche de papa, con papas trufadas.', price: '$15' },
        { name: 'Cacio e Pepe al Tartufo', desc: 'Pasta linguini artesanal emulsionada en manteca con queso Parmigiano Reggiano, Pecorino Romano curado, pimienta negra recién molida y perfume de trufa blanca.', price: '$16', tags: ['V'] },
        { name: 'Sliders de Res (3 uds)', desc: 'Trío de mini hamburguesas de blend especial de res, cebolla morada caramelizada y alioli de ajo rostizado en suave pan de papa.', price: '$12' },
        { name: 'Raviolis de Hongos & Pulpo', desc: 'Pasta fresca rellena de puré de hongos silvestres, acompañada de pulpo importado a la plancha, crema suave de ajos confitados, albahaca fresca y espejo de passata italiana.', price: '$18' },
        { name: 'Risotto de Pato & Hongos Porcini', desc: 'Arroz arborio cocinado al dente con confit de pato deshilachado, queso Grana Padano, hongos porcini, crimini y oyster, terminado con mantequilla y perfume de trufa blanca.', price: '$18' },
        { name: 'Risotto de Frutos del Mar', desc: 'Langostinos jumbo, calamar, pulpo importado, mejillones y almejas con arroz arborio en bisque concentrado de mariscos, parmesano, vegetales acevichados y puntos de alioli anticuchero.', price: '$20', tags: ['S'] },
        { name: 'Pork Belly Laqueado', desc: 'Panceta de cerdo sellada a baja temperatura con corteza súper crocante, laqueada en salsa hoisin y ciruelas, sobre espuma cremosa de papa trufada y emulsión de pimentón asado.', price: '$20' },
        { name: 'Pesca del Día a la Passata', desc: 'Filete fresco de pesca del día con tomates cherry salteados, edamame, tomates secos, aire ligero de passata, albahaca fresca y esferificaciones de jengibre.', price: '$20', tags: ['KT'] },
        { name: 'Asian Salmon Pesto', desc: 'Salmón del Pacífico sellado a la plancha sobre crema sedosa de edamame, alcachofas marinadas trufadas, espejo de pesto genovés y barniz de salsa teriyaki artesanal.', price: '$22' },
        { name: 'Langostinos Grilled al Curry & Coco', desc: 'Langostinos jumbo a la brasa bañados en suave salsa de curry amarillo, leche de coco y zanahoria, gel de mango, hojas de cilantro fresco y cebolla morada encurtida.', price: '$12', tags: ['KT', 'S'] }
      ],
      postres: [
        { name: 'Chocolate Temptation Fondant', desc: 'Fondant de chocolate amargo belga con centro líquido caliente flambeado al momento con Brandy francés.', price: '$14' },
        { name: 'Furia Imperial Experience', desc: 'Crujiente milhojas artesanal relleno de crema diplomática de pistachos seleccionados y salsa de lulo colombiano.', price: '$14' },
        { name: 'Frozen Japanese Sensation', desc: 'Exclusivo sushi roll helado de crema artesanal con dressing de chocolate amargo 70% cacao y frutas.', price: '$14' },
        { name: 'Tres Leches al Brandy', desc: 'Bizcocho ultra esponjoso embebido en salsa tres leches con sutiles notas de brandy añejo y topping de merengue suizo dorado.', price: '$14' },
        { name: 'Tropicalia en Almíbar', desc: 'Macedonia de frutas exóticas tropicales infusionadas en almíbar de cítricos con crema diplomática de vainilla de Madagascar.', price: '$14' }
      ],
      cocteleria: [
        { name: 'La Trona (Signature)', desc: 'Gin Bombay Sapphire, Aperol, jugo natural de maracuyá y néctar de agave orgánico. Equilibrado, fresco y cítrico.', price: '$12' },
        { name: 'Aurora', desc: 'Bombay Sapphire, licor de flor de saúco St-Germain, zumo de limón fresco y Basil Grape Soda artesanal con final sour aromático.', price: '$12' },
        { name: 'Kava', desc: 'Ron Bacardí Añejo, licor digestivo Amaro Averna, Falernum especiado, limón, melocotón fresco, piña caribeña, orange bitter y agave.', price: '$12' },
        { name: 'Camagüey', desc: 'Ron Bacardí Carta Blanca, zumo fresco de limón, miel de flores silvestres hecha en casa y remate burbujeante de Mionetto Prosecco.', price: '$12' },
        { name: 'Koicha Matcha', desc: 'Vodka Grey Goose, zumo de limón verde, polvo de té verde matcha ceremonial y almíbar artesanal batido.', price: '$12' },
        { name: 'Las Lomas', desc: 'Tequila Patrón Silver, Aperol italiano, licor de naranja Cointreau, almíbar casero de frutos rojos silvestres, lima y toronja rosada.', price: '$12' },
        { name: 'Old Rose Fashion', desc: 'Whisky escocés Dewar’s 12 Años, infusión de almíbar botánico de pétalos de rosa y gotas de bíter de naranja aromático.', price: '$12' },
        { name: 'Sake Tonikku', desc: 'Sake Momokawa Silver Junmai, miel de agave, gotas de limón, láminas de manzana verde, hojas de hierbabuena fresca y rocío de agua de rosas.', price: '$12' },
        { name: 'Mezcalita de Coco & Albahaca', desc: 'Mezcal artesanal Montelobos Espadín, néctar de agave orgánico, almíbar de coco tostado y jugo de limón fresco recién exprimido.', price: '$12' },
        { name: 'Amalfi Sunset', desc: 'Aperol, licor italiano de almendras Disaronno Amaretto, jugo de naranja dulce y jugo de limón fresco.', price: '$12' },
        { name: 'Mandarino Furia', desc: 'Vodka Grey Goose, licor de naranja premium Grand Marnier, nieve de mandarina natural y toque de lima.', price: '$12' }
      ],
      furiaOnIce: [
        { name: 'The Champagne Box (x3 Botellas)', desc: 'Cofre iluminado VIP con 3 botellas de Champagne Moët & Chandon Ice Impérial con copas grabadas y bengalas.', price: '$500' },
        { name: 'Parade 2 — Moët Collection (x3 Botellas)', desc: 'Desfile de botellas con 3 unidades a elección entre Moët & Chandon Impérial Brut, Rosé o Ice Impérial.', price: '$480' },
        { name: 'Parade 3 — Premium Spirit Quartet', desc: 'Desfile completo de 4 botellas premium: 1 Vodka Grey Goose + 1 Ron Bacardí Carta Blanca + 1 Tequila Patrón Silver + 1 Gin Bombay Sapphire.', price: '$420' },
        { name: 'Parade 1 — Prosecco Sparkling (x3 Botellas)', desc: 'Trío festivo de botellas de Martini Prosecco D.O.C. servidas con bengalas en show de luces.', price: '$120' },
        { name: 'Ronda de Maracuyita Shots (12 Unidades)', desc: 'Bandeja iluminada de 12 shots artesanales de maracuyá macerada con destilados de la casa.', price: '$80' },
        { name: 'Tequila Don Julio 1942 Añejo', desc: 'Edición legendaria de tequila añejo con servicio VIP exclusivo en mesa y mezcladores a elección.', price: '$500' },
        { name: 'Tequila Volcán de Mi Tierra X.A', desc: 'Ensamble ultra premium mexicano servido en cubitera LED luminosa.', price: '$525' },
        { name: 'Tequila Clase Azul Plata', desc: 'Icónica licorera de cerámica artesanal con tequila 100% agave Weber azul.', price: '$525' },
        { name: 'Tequila Don Julio 70 Cristalino', desc: 'Tequila añejo cristalino filtrado al carbón, el favorito indiscutible de las noches en Panamá.', price: '$195' },
        { name: 'Tequila Patrón Cristalino / Añejo', desc: 'Servicio de botella con 6 mezcladores a elección y cítricos frescos.', price: '$180' },
        { name: 'Vodka Belvedere Pure Chrome / Summer', desc: 'Vodka polaco de centeno cuádruple destilación en presentación luminosa.', price: '$200' },
        { name: 'Ron Zacapa 23 Solera Gran Reserva', desc: 'Ron guatemalteco añejado en las alturas con servicio de mesa VIP.', price: '$200' }
      ]
    }
  },
  {
    id: 'venue-pianobar',
    name: 'Piano Bar Panamá',
    h1Title: 'Piano Bar Panamá — Live Music, Tapas & Speakeasy',
    shortName: 'Piano Bar',
    slug: 'piano-bar',
    tagline: 'Música en vivo, tapas de autor, pizzas & coctelería clásica en Bella Vista',
    category: 'Live Music & Cocktail Bar',
    area: 'Bella Vista',
    city: 'Ciudad de Panamá',
    address: 'Calle 49 Este & Av. Federico Boyd, Bella Vista, Ciudad de Panamá',
    googleMapsUrl: 'https://maps.google.com/?q=Piano+Bar+Panama+Bella+Vista',
    googleMapsQuery: 'Piano Bar Panama, Calle 49 Este, Bella Vista, Panama',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Piano+Bar+Panama,+Calle+49+Este,+Bella+Vista,+Panama&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapPreview: '/images/terraplen_map_preview.jpg',
    websiteUrl: 'https://pianobarpanama.com',
    instagramUrl: 'https://www.instagram.com/pianobarpanama/',
    instagramHandle: '@pianobarpanama',
    phone: '+507 6200-0000',
    dinnerTime: '6:00 PM - 10:30 PM',
    partyTime: '10:30 PM - 03:00 AM',
    schedule: 'Miércoles a Sábado desde 06:00 PM',
    dressCode: 'Smart Casual / Elegante',
    parking: 'Valet Parking en Calle 49 Este & opciones de parqueo privado',
    ageLimit: '18+ (Ambiente adulto / Speakeasy chic)',
    rating: '4.7',
    reviewCount: '340',
    coverImage: '/images/venues/pianobar/cover.jpg',
    seoTitle: 'Piano Bar Panamá | Menú, Música en Vivo & Reservas',
    seoDescription: 'Menú oficial completo de Piano Bar Panamá: tapas para compartir, montaditos, pizzas al horno, paellas, cócteles de autor, paquetes open bar y música en vivo.',
    keywords: 'Piano Bar Panama · menu Piano Bar · live music Panama · tapas Bella Vista · cocktail bar Panama · speakeasy Panama · reservas Piano Bar',
    description: 'Piano Bar es el speakeasy de música en vivo y alta coctelería más icónico de Bella Vista, Ciudad de Panamá. Con un elegante piano de cola como protagonista, cantantes en directo y una iluminación cálida y seductora, Piano Bar reúne gastronomía de inspiración mediterránea y española con una atmósfera íntima y cosmopolita.\n\nSu carta culinaria ofrece una amplia variedad de tapas para compartir (tartares, croquetas, pulpo rostizado, huevos rotos), montaditos artesanales, tablas de ibéricos y quesos curados europeos, pizzas gourmet al horno de piedra, cortes Prime (Ribeye, Entraña, Solomillo), arroces concolón y paellas valencianas para 2 personas. La experiencia de bar destaca por cócteles de autor, martinis clásicos, sangrías de tardeo, carta de vinos de bodegas prestigiosas y paquetes exclusivos de Open Bar para celebraciones y grupos.\n\nConsulta en ARRIVE el menú oficial verificado de Piano Bar con precios actualizados, eventos de música en vivo y opciones de reserva prioritaria.',
    pdfMenuRestaurant: 'https://pianobarpanama.com/wp-content/uploads/2025/05/PIANO-BAR-Menu-Restaurante.pdf',
    pdfMenuCocktails: 'https://pianobarpanama.com/wp-content/uploads/2025/05/PIANO-BAR-menu-licores-1.pdf',
    pdfMenuLiquor: 'https://pianobarpanama.com/wp-content/uploads/2025/05/PIANO-BAR-Open-Bar.pdf',
    vipPricing: VIP_TABLE_PRICING,
    faqs: {
      es: [
        {
          question: '¿Qué tipo de música y shows en vivo se presentan en Piano Bar Panamá?',
          answer: 'Piano Bar cuenta con cantantes y pianistas en directo de miércoles a sábado interpretando jazz, soul, baladas clásicas y pop en inglés y español. A medida que avanza la noche el repertorio se vuelve más festivo y bailable con coctelería y copas.'
        },
        {
          question: '¿Tienen opciones de cena completa o solo tapas?',
          answer: 'Disponen de una carta gastronómica completa: tapas españolas, montaditos, tablas de embutidos ibéricos y quesos europeos, pizzas al horno de piedra, paellas valencianas para compartir y cortes de carne Prime.'
        },
        {
          question: '¿Cuál es el código de vestimenta en Piano Bar?',
          answer: 'Smart Casual a Elegante. Se aconseja camisa de cuello o polo refinado para caballeros y atuendo chic para damas. No se admiten prendas deportivas ni calzado informal de playa.'
        },
        {
          question: '¿Dónde está ubicado Piano Bar en Ciudad de Panamá?',
          answer: 'Se ubica en Calle 49 Este & Av. Federico Boyd en Bella Vista, con fácil acceso tanto desde Calle 50 como desde Avenida Balboa y la Cinta Costera.'
        },
        {
          question: '¿Ofrecen paquetes de Open Bar o paquetes para celebraciones?',
          answer: 'Sí, cuentan con opciones de Open Bar por horas para cumpleaños, despedidas y eventos corporativos que pueden coordinarse a través de la plataforma ARRIVE.'
        }
      ],
      en: [
        {
          question: 'What kind of live music and shows are featured at Piano Bar Panama?',
          answer: 'Piano Bar hosts live vocalists and pianists Wednesday through Saturday performing jazz, soul, acoustic hits, and timeless international classics, evolving into an energetic singalong and dance vibe as midnight approaches.'
        },
        {
          question: 'Do they offer full dinner options or only tapas?',
          answer: 'They offer an extensive dining menu including Spanish tapas, montaditos, Iberian charcuterie and cheese boards, stone-oven pizzas, seafood paellas for two, and Prime cuts of beef.'
        },
        {
          question: 'What is the dress code at Piano Bar?',
          answer: 'Smart Casual to Elegant. Collared shirts or stylish polos for men, and sophisticated cocktail attire for women are recommended.'
        },
        {
          question: 'Where is Piano Bar located?',
          answer: 'Located at Calle 49 Este & Av. Federico Boyd in Bella Vista, with rapid access from Calle 50, Ave. Balboa, and the Cinta Costera.'
        },
        {
          question: 'Are open bar packages available for groups?',
          answer: 'Yes, hourly open bar packages with classic cocktails and tapas are available for birthdays, private gatherings, and corporate events booked via ARRIVE.'
        }
      ]
    },
    features: [
      'Sesiones de piano acústico de cola y cantantes en vivo cada noche',
      'Carta de tapas españolas, montaditos y charcutería ibérica',
      'Pizzas artesanales directo del horno de piedra',
      'Arroces al concolón y paellas valencianas para compartir',
      'Barra clásica de Martinis, cócteles de autor y sangrías de tardeo',
      'Paquetes especiales de Open Bar por horas para grupos y eventos'
    ],
    gallery: [
      {
        url: '/images/venues/pianobar/cover.jpg',
        title: 'El Gran Piano de Cola & Escenario',
        category: 'Live Music'
      },
      {
        url: '/images/venues/pianobar/ambiance.jpg',
        title: 'Música en Directo & Acústica Cálida',
        category: 'Música'
      },
      {
        url: '/images/venues/pianobar/bar.jpg',
        title: 'Barra Clásica & Martinis de Autor',
        category: 'Bar & Cócteles'
      },
      {
        url: '/images/venues/pianobar/dining.jpg',
        title: 'Mesas Íntimas & Tapas Gourmet',
        category: 'Cenas'
      },
      {
        url: '/images/venues/pianobar/drinks.jpg',
        title: 'Mixología & Licores Seleccionados',
        category: 'Bebidas'
      }
    ],
    menu: {
      toShare: [
        { name: 'Tartar de Res', desc: 'Lomo de res picado fino, huevo de codorniz, cilantro, cebolla morada, ají criollo, alcaparras bebé, salsa Worcestershire, aceite de oliva virgen y alioli de ajo.', price: '$12', tags: ['KT'] },
        { name: 'Tartar de Atún', desc: 'Atún fresco en cubos, bites de aguacate cremoso, cilantro, cebolla morada, ají criollo, pil pil de cilantro y perejil italiano.', price: '$12', tags: ['GF'] },
        { name: 'Camarones al Ajillo', desc: 'Camarones salteados con láminas de ajo dorado, perejil fresco, fumet concentrado de mariscos, mantequilla y pan artesanal de la casa.', price: '$14', tags: ['S'] },
        { name: 'Papas Bravas con Pulpo Rostizado', desc: 'Pulpo importado a la brasa sobre milhojas de papa crujiente, alioli de ajo y hierbas finas, pimentón de la Vera, crema de vegetales verdes y salsa brava artesanal.', price: '$14', tags: ['S'] },
        { name: 'Croquetas de Jamón Serrano (4 uds)', desc: 'Bechamel melosa tradicional con trocitos de jamón serrano curado, servidas con alioli suave de pimentón dulce rostizado.', price: '$10' },
        { name: 'Croquetas de Pulpo & Salsa Nero (4 uds)', desc: 'Croquetas cremosas rellenas de ragú de pulpo importado, terminadas con alioli de yuzu cítrico y emulsión con tinta de calamar.', price: '$12', tags: ['S'] },
        { name: 'Mejillones a la Crema & Azafrán', desc: 'Mejillones importados al vapor en reducción de fumet, pimentón de la Vera, hebras de azafrán español y puntillismo de alioli de perejil.', price: '$15', tags: ['S'] },
        { name: 'Huevos Rotos de la Casa', desc: 'Huevos fritos de campo con yema tierna, chistorra española dorada, papas fritas rústicas, espuma ligera de papa y ajo, y pimentón de la Vera.', price: '$15' },
        { name: 'Tortilla Española con Jamón Serrano', desc: 'Tortilla tradicional de papas confitadas con hierbas aromáticas, cebolla caramelizada, jamón serrano y emulsión de pimentón rostizado.', price: '$12' },
        { name: 'Vegetales Rostizados Estilo Griego', desc: 'Berenjena, pimentón, zucchini y cebolla morada al horno con queso feta desmenuzado, aceitunas kalamatas, tzatziki vegetal y aceite de oliva extra virgen.', price: '$10', tags: ['V', 'GF'] }
      ],
      montaditos: [
        { name: 'Montadito de Jamón Serrano', desc: 'Pan tostado con jamón serrano de reserva, aceitunas negras deshidratadas y queso manchego curado con ciboulette.', price: '$10' },
        { name: 'Montadito de Chistorra a la Cerveza', desc: 'Chistorra glaseada en reducción de cerveza y hierbas, queso macerado y puré de tomates secos ahumados con rodajas finas de jalapeño.', price: '$10' },
        { name: 'Montadito de Salmón Ahumado', desc: 'Salmón ahumado y curado en casa con cremoso de aguacate hass y queso de cabra suave.', price: '$10', tags: ['S'] }
      ],
      tablas: [
        { name: 'Tabla de Ibéricos & Quesos Europeos', desc: 'Fuet ibérico artesanal, jamón serrano de reserva, salami Genoa, queso Grana Padano, Belprado holandés madurado, Manchego D.O. y aceitunas maceradas en hierbas.', price: '$28' },
        { name: 'Tabla de Quesos Curados & Frutas', desc: 'Queso Belprado madurado, Gouda rojo, Manchego español, Grana Padano, Gruyère suizo, uvas frescas, hojas de rúcula y reducción balsámica al Pedro Ximénez.', price: '$22', tags: ['V'] }
      ],
      pizzas: [
        { name: 'Pizza Ibérica Trufada', desc: 'Masa artesanal al horno con jamón serrano, queso mozzarella, passata de tomates San Marzano, arúgula fresca, tomates cherry, aceite de albahaca y aceite de trufa blanca.', price: '$12' },
        { name: 'Pizza Cuatro Cacio e Pepe', desc: 'Mozzarella fondue, queso parmesano madurado, mascarpone cremoso, bocconcini de burrata fresca, pimienta negra molida, aceite de oliva virgen y rúcula.', price: '$14', tags: ['V'] },
        { name: 'Pizza Buffalo Chicken', desc: 'Pollo desmechado en salsa buffalo picante suave, queso mozzarella fundido, lluvia de Grana Padano y toque de aceite de oliva.', price: '$12' },
        { name: 'Pizza Pepperoni con Miel Picante', desc: 'Queso mozzarella, abundante pepperoni artesanal crocante y terminado con drizzle de miel de abeja infusionada con ají picante.', price: '$10' },
        { name: 'Pizza Capressa & Burrata', desc: 'Mozzarella, passata de tomate concassé con finas hierbas, pesto de albahaca, bocconcini de burrata fresca, tomates cherry dulces y hojas de albahaca.', price: '$12', tags: ['V'] },
        { name: 'Pizza Margarita Clásica', desc: 'Masa dorada al horno de piedra con passata de tomate, abundante mozzarella fundida, hojas de albahaca fresca y aceite de oliva virgen extra.', price: '$10', tags: ['V'] }
      ],
      platosFuertes: [
        { name: 'Ribeye Prime 12 oz', desc: 'Corte de Ribeye Prime certificado a la parrilla, pimientos padrones confitados y papas crujientes en chips artesanales.', price: '$48' },
        { name: 'Entraña Prime 8 oz', desc: 'Entraña Prime jugosa a las brasas, papas salteadas al romero fresco, sal marina gruesa y mantequilla clarificada de hierbas aromáticas.', price: '$35' },
        { name: 'Solomillo de Res al Demi-Glace', desc: 'Solomillo tierno de 7 oz sobre puré suave de alubias blancas, cebollitas perla salteadas al vino tinto y reducción concentrada de res.', price: '$25' },
        { name: 'Ossobuco de Cerdo en sus Jugos (22 oz)', desc: 'Generosa pieza de 22 oz braseada a fuego lento durante 8 horas, servida con puré cremoso de papa y reducción profunda de sus jugos.', price: '$48' },
        { name: 'Crujiente Chicharrón de Pork Belly', desc: 'Panceta de cerdo con corteza ultra crocante, papas bebé salteadas con vino blanco y romero, cremoso de aguacate y gajos de limón.', price: '$20' },
        { name: 'Pesca del Día Beurre Blanc', desc: 'Filete fresco de pesca del día con salsa francesa beurre blanc aromatizada con alcaparras y notas de eneldo, con guarnición de tomates confitados.', price: '$22' },
        { name: 'Salmón Mediterráneo', desc: 'Salmón a la plancha con piel dorada sobre arroz basmati salteado al estilo mediterráneo con cebolla morada, garbanzos crocantes y lima amarilla.', price: '$25', tags: ['GF', 'S'] },
        { name: 'Pulpo Gallego a la Brasa', desc: 'Tentáculo de pulpo importado tierno a la brasa con lima grillada, espuma tibia de papa rústica y alioli de pimientos tatemados al carbón.', price: '$24', tags: ['GF', 'S'] },
        { name: 'Cannelloni de Ossobuco Gratinados', desc: 'Tubos de pasta artesanal rellenos de ossobuco de res deshilachado al vino tinto, salsa passata, queso Gruyère gratinado y pimentón dulce.', price: '$23' },
        { name: 'Linguini Cacio e Pepe', desc: 'Pasta linguini emulsionada en manteca con yema de huevo de campo, queso Pecorino Romano curado, Parmigiano Reggiano y pimienta negra fresca machacada.', price: '$18', tags: ['V'] },
        { name: 'Frutti di Mare al Óleo', desc: 'Linguini al dente salteado al óleo de oliva extra virgen y ajo confitado con langostinos jumbo, camarones, calamar, mejillones y almejas blancas.', price: '$23', tags: ['S'] },
        { name: 'Fideuá Roja con Mariscos', desc: 'Fideos finos tostados con langostinos, calamares, camarones y mejillones en sofrito rojo de pimientos, bisque de langostinos, alioli anticuchero y lima amarilla.', price: '$22', tags: ['S'] },
        { name: 'Rhapsody Burger (7 oz)', desc: 'Blend artesanal de carnes seleccionadas (7 oz), queso Grana Padano, lechuga romana crocante, hongos salteados, tomate seco, alioli de ajo en pan brioche suave, con papas francesas.', price: '$15' }
      ],
      arroces: [
        { name: 'Arroz Concolón de Hongos & Filete de Res (Para 2)', desc: 'Filete de res tierno, espárragos verdes, sofrito rojo, arroz arbóreo cocido con capa de concolón crujiente, mix de hongos silvestres, caldo concentrado y aceite de trufa blanca.', price: '$30' },
        { name: 'Paella Valenciana de Mariscos & Lima (Para 2)', desc: 'Arroz en paella tradicional con langostinos jumbo, calamar, camarones, almejas y mejillones en sofrito rojo de pimientos, vino blanco, bisque de mariscos y lima amarilla.', price: '$30', tags: ['S'] },
        { name: 'Paella Nero con Calamar & Pulpo (Para 2)', desc: 'Ragú de pulpo importado, calamares tiernos y pimientos rostizados sobre arroz arbóreo negro con tinta de calamar, fumet de pescado, salsa de ají suave y aceite de cilantro fresco.', price: '$30', tags: ['S'] }
      ],
      sopasSalads: [
        { name: 'Sopa de Cebolla Tradicional', desc: 'Cebollas caramelizadas lentamente en fondo oscuro de res con mantequilla de hierbas, tostada de pan ciabatta y gratinado de queso Gruyère suizo.', price: '$10' },
        { name: 'Crema de Tomates Rostizados', desc: 'Tomates pelati asados con ajo rostizado, albahaca fresca, tostón de pan ciabatta, fondue de mozzarella y tomates cherry secos.', price: '$12', tags: ['V'] },
        { name: 'Caesar Salad del Chef', desc: 'Pechuga de pollo a la plancha, bacon crispy dorado, mezclum de lechugas frescas, aderezo Caesar casero, croutons de masa madre y queso parmesano en lascas.', price: '$14' },
        { name: 'Ensalada de Queso Feta & Peras', desc: 'Mezclum de hojas verdes, queso feta griego, láminas y texturas de pera dulce, almendras tostadas, tomates cherry, cebolla morada y vinagreta de mostaza antigua con miel.', price: '$15', tags: ['V', 'GF'] }
      ],
      cocteleria: [
        { name: 'Oaxaca Fire (Signature)', desc: 'Mezcal artesanal Montelobos con notas cítricas frescas, toque especiado picante y un elegante fondo ahumado.', price: '$12' },
        { name: 'Verano en Estambul', desc: 'Ginebra Tanqueray London Dry, Ron Bacardí Coconut, néctar de maracuyá fresca, zumo de limón y sirope artesanal.', price: '$12' },
        { name: 'Made in Paris', desc: 'Ginebra Tanqueray, licor francés de flor de saúco St-Germain, zumo de limón fresco y sirope simple.', price: '$12' },
        { name: 'Jade Azul', desc: 'Tequila Don Julio Blanco, jugo natural de piña clarificado, crema de coco batida y zumo de limón verde.', price: '$12' },
        { name: 'St-Germain Spritz', desc: 'Licor St-Germain, Prosecco italiano D.O.C. y splash de club soda con rodaja de lima.', price: '$12' },
        { name: 'Cosmo Burbujeante', desc: 'Vodka Ketel One, Triple Sec francés, zumo de limón, frambuesas frescas, vainilla natural y top de vino espumante.', price: '$12' },
        { name: 'Margarita Pasión', desc: 'Tequila Don Julio Blanco, whisky bourbon añejo, pulpa de maracuyá ácida y néctar de agave orgánico.', price: '$12' },
        { name: 'Gin Mule', desc: 'Ginebra Tanqueray London Dry, zumo de limón fresco, sirope y cerveza de jengibre espumosa con menta.', price: '$12' },
        { name: 'Negroni Clásico', desc: 'Gin Tanqueray London Dry, Vermouth Rosso italiano y Campari amargo con piel de naranja flameada.', price: '$12' },
        { name: 'Old Fashioned', desc: 'Whiskey Bulleit Bourbon, terrón de azúcar morena, gotas de bíter de angostura y twist de naranja.', price: '$12' },
        { name: 'Moscow Mule Clásico', desc: 'Vodka Ketel One holandés, zumo de lima, sirope artesanal y Ginger Beer servido en taza de cobre.', price: '$12' },
        { name: 'Carajillo Licor 43', desc: 'Licor 43 español batido con shot concentrado de café espresso recién extraído y hielo.', price: '$12' }
      ],
      sangrias: [
        { name: 'Sangría Rosé (Copa / Jarra)', desc: 'Vino rosado fresco, licor de lychee exótico, jugo natural de fresas, sirope simple, ginger ale, cítricos y frutas de estación maceradas.', price: 'Copa $8 / Jarra $35' },
        { name: 'Sangría Tinta Tradicional (Copa / Jarra)', desc: 'Vino tinto reserva, licor de durazno Peachtree, rodajas de cítricos, sirope simple, splash de ginger ale y frutas maceradas.', price: 'Copa $8 / Jarra $35' }
      ],
      botellasVip: [
        { name: 'Tequila Don Julio 1942 Añejo', desc: 'La joya mexicana del tequila añejo servida en mesa con mezcladores y copas tequileras.', price: '$450' },
        { name: 'Champagne Dom Pérignon Luminous Vintage', desc: 'Prestigioso champagne francés en botella con escudo LED luminiscente.', price: '$500' },
        { name: 'Whisky Johnnie Walker Blue Label', desc: 'El blended scotch escocés más selecto servido con esferas de hielo tallado.', price: '$400' },
        { name: 'Whisky The Macallan 12 Double Cask', desc: 'Single malt escocés añejado en barricas de roble americano y europeo sazonadas con jerez.', price: '$180' },
        { name: 'Tequila Don Julio 70 Cristalino', desc: 'Tequila añejo cristalino filtrado al carbón con suavidad excepcional.', price: '$150' },
        { name: 'Champagne Veuve Clicquot Yellow Label Brut', desc: 'Champagne de Reims con cubitera de hielo y servicio preferencial.', price: '$105' },
        { name: 'Champagne Moët & Chandon Brut / Ice Impérial', desc: 'Icónico champagne servido con copas flauta en mesa reservada.', price: '$170' },
        { name: 'Ron Zacapa 23 Solera Gran Reserva', desc: 'Ron guatemalteco de caña virgen añejado en sistema solera en las nubes.', price: '$120' },
        { name: 'Gin Tanqueray Ten Batch', desc: 'Ginebra destilada en pequeños lotes con cítricos enteros frescos y botánicos finos.', price: '$100' },
        { name: 'Vodka Belvedere / Grey Goose', desc: 'Vodka premium servido con selección de 6 mezcladores y hielo continuo.', price: '$100' }
      ],
      openBar: [
        { name: 'Open Bar Piano (3h / 4h)', desc: 'Vodka Ketel One, Gin Tanqueray, Ron Abuelo/Bacardí, Whiskey Black & White, Seco, Cervezas (Corona, Modelo, Balboa, Atlas), sodas y agua. $45 pp (3h) / $55 pp (4h).', price: 'Desde $45 pp' },
        { name: 'Open Bar Premium (3h / 4h)', desc: 'Vodka Belvedere/Ketel One, Gin Tanqueray Sevilla, Ron Abuelo 7, JW Black Label, Buchanan’s 12, Tequila Don Julio Silver, Prosecco Mionetto, cervezas y mezcladores. $55 pp (3h) / $65 pp (4h).', price: 'Desde $55 pp' },
        { name: 'Open Bar Ultra Premium (Por Hora)', desc: 'Grey Goose, Tanqueray Ten, Ron Zacapa 23, Santa Teresa 1796, JW 18, Buchanan’s 18, Don Julio Reposado, 1800 Cristalino, Vinos Paco & Lola, Santiago Ruiz, Belle Glos, El Enemigo Malbec, Perrier y más.', price: '$40 pp / hora' },
        { name: 'Open Wine & Bubbles (3h / 4h)', desc: 'Vinos blancos (Murviedro Verdejo, Marieta Albariño), tintos (Catena Malbec, Murviedro Crianza), Prosecco Mionetto, sodas, agua y Perrier. $30 pp (3h) / $37 pp (4h).', price: 'Desde $30 pp' }
      ]
    }
  },
  {
    id: 'venue-terraplen',
    name: 'Terraplén',
    h1Title: 'Terraplén • Rooftop & Piso 002',
    shortName: 'Terraplén',
    slug: 'terraplen-rooftop',
    tagline: '2 Espacios: Terraza Rooftop al aire libre & Club cerrado Piso 002',
    category: 'Rooftop & Club Cerrado',
    area: 'Casco Antiguo',
    city: 'Casco Antiguo, Panamá',
    address: 'Edificio Brand Experience Center PB, Av. Eloy Alfaro, Casco Antiguo',
    googleMapsUrl: 'https://maps.google.com/?q=Terraplen+Rooftop+Panama+Casco+Antiguo',
    googleMapsQuery: 'Terraplen Rooftop Panama, Av Eloy Alfaro, Casco Antiguo, Panama',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Terraplen+Rooftop+Panama,+Av+Eloy+Alfaro,+Casco+Antiguo,+Panama&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapPreview: '/images/terraplen_map_preview.jpg',
    websiteUrl: 'https://terraplenpanama.com',
    instagramUrl: 'https://www.instagram.com/terraplenpanama/',
    instagramHandle: '@terraplenpanama',
    phone: '+507 6300-0000',
    dinnerTime: '5:00 PM - 10:00 PM',
    partyTime: '10:00 PM - 04:00 AM',
    dressCode: 'Rooftop Glam / Smart Casual',
    parking: 'Valet Parking en Av. Eloy Alfaro + Parqueos Cinta Costera 3',
    ageLimit: '18+ (Cédula o Pasaporte físico obligatorio)',
    rating: '4.7',
    reviewCount: '246',
    coverImage: '/images/venues/terraplen/cover.jpg',
    seoTitle: 'Terraplén Panamá | Rooftop al Aire Libre & Piso 002 Discoteca Cerrada',
    seoDescription: 'Terraplén cuenta con 2 conceptos únicos en Casco Viejo: Rooftop con sunsets frente al mar y Piso 002, restaurante y discoteca cerrado de alta fidelidad.',
    keywords: 'Terraplén Panamá · Terraplén Rooftop · Terraplén Piso 002 · rooftop Casco Viejo · discoteca Casco Antiguo · nightlife Panamá',
    description: 'Terraplén es un concepto dual exclusivo en el corazón de Casco Viejo con 2 espacios bien diferenciados:\n\n1. **Terraplén Rooftop:** Terraza al aire libre con vista panorámica de 360° al océano y skyline moderno, ideal para atardeceres, cócteles frescos y fiesta bajo las estrellas.\n2. **Piso 002:** Restaurante y discoteca cerrado con aire acondicionado y acústica de club nocturno subterráneo, sede de eventos de música urbana, reggaetón y sets electrónicos.\n\nConsulta los eventos de ambos espacios, horarios y reservas de mesa con ARRIVE.',
    spaces: [
      {
        name: 'Terraplén Rooftop',
        type: 'Terraza al Aire Libre',
        description: 'Vistas panorámicas al océano Pacífico, sunsets, coctelería fresca y ambiente abierto bajo las estrellas.'
      },
      {
        name: 'Piso 002',
        type: 'Restaurant / Discoteca Cerrado',
        description: 'Espacio cerrado con climatización completa, barra gastronómica y atmósfera de club nocturno de alta potencia acústica.'
      }
    ],
    vipPricing: VIP_TABLE_PRICING,
    faqs: {
      es: [
        {
          question: '¿Cuáles son los dos espacios que tiene Terraplén en Casco Antiguo?',
          answer: 'Terraplén cuenta con Terraplén Rooftop (terraza al aire libre con vistas panorámicas 360° para sunsets y fiesta) y Piso 002 (un espacio cerrado y climatizado que funciona como restaurante y discoteca para noches de club).'
        },
        {
          question: '¿Cuál es el mejor horario para disfrutar del sunset en Terraplén Rooftop?',
          answer: 'El atardecer en Casco Viejo se aprecia en su máximo esplendor entre las 5:00 PM y las 6:30 PM en la terraza Rooftop con vista al Pacífico.'
        },
        {
          question: '¿Cuál es el dress code en Terraplén Casco Antiguo?',
          answer: 'Rooftop Glam / Smart Casual. Camisas elegantes, calzado adecuado y vestidos refinados. No se permite ropa deportiva ni chancletas.'
        },
        {
          question: '¿Dónde estacionar para ir a Terraplén en Casco Viejo?',
          answer: 'Terraplén cuenta con servicio de Valet Parking en la entrada de Avenida Eloy Alfaro. Además hay estacionamientos vigilados sobre la Cinta Costera 3 a pocos metros.'
        },
        {
          question: '¿Qué incluye una mesa VIP en Terraplén?',
          answer: 'Incluye ubicación preferencial (en Rooftop o Piso 002 según evento), crédito 100% canjeable en botellas y cocina, pases incluidos para tu grupo y servicio exclusivo de anfitrión.'
        }
      ],
      en: [
        {
          question: 'What are the two spaces at Terraplen Casco Antiguo?',
          answer: 'Terraplen features two distinct environments: Terraplen Rooftop (an open-air terrace with 360° ocean views for sunsets and open sky parties) and Piso 002 (an indoor air-conditioned club and restaurant space for high-energy club nights).'
        },
        {
          question: 'What is the best time for sunset at Terraplen Rooftop?',
          answer: 'We recommend arriving between 5:00 PM and 6:30 PM for golden hour on the open Rooftop terrace.'
        },
        {
          question: 'What is the dress code at Terraplen Casco Antiguo?',
          answer: 'Rooftop Glam / Smart Casual. Linen shirts, stylish footwear, and breezy evening dresses are welcomed. Sportswear and athletic flip-flops are restricted.'
        },
        {
          question: 'Where can I park when visiting Terraplen in Casco Viejo?',
          answer: 'Valet Parking is provided at the entrance on Avenida Eloy Alfaro, plus guarded public parking along Cinta Costera 3.'
        },
        {
          question: 'What does a VIP Table include at Terraplen?',
          answer: 'Includes preferred seating (Rooftop terrace or Piso 002 indoor club), 100% minimum spend credit toward premium bottles and food, complimentary group entries, and dedicated table service.'
        }
      ]
    },
    features: [
      '2 Espacios: Terraza Rooftop al aire libre & Discoteca cerrada Piso 002',
      'Vista 360° panorámica al océano y al skyline en el Rooftop',
      'Piso 002 cerrado con aire acondicionado y acústica de discoteca',
      'Cabina de DJ en vivo con sistema de sonido Funktion-One',
      'Menú gastronómico y coctelería fresca de autor',
      'Servicio de Valet Parking en Avenida Eloy Alfaro'
    ],
    gallery: [
      {
        url: '/images/venues/terraplen/cover.jpg',
        title: 'Terraza Rooftop & Vista al Océano en Casco Antiguo',
        category: 'Rooftop Terrace'
      },
      {
        url: '/images/venues/terraplen/rooftop.jpg',
        title: 'Terraza Rooftop & Sunset al Aire Libre',
        category: 'Sunset'
      },
      {
        url: '/images/venues/terraplen/party.jpg',
        title: 'Party Nocturna Bajo las Estrellas',
        category: 'Nightlife'
      },
      {
        url: '/images/venues/terraplen/ambiance.jpg',
        title: 'Piso 002 Club Cerrado & DJ Deck',
        category: 'Piso 002 Club'
      }
    ],
    menu: {
      entradas: [
        { name: 'Ceviche Mixto al Ají Amarillo', desc: 'Corvina fresca, camarones, cebolla morada, choclo y camote glaseado.', price: '$16' },
        { name: 'Tequeños Artesanales de Queso Llanero', desc: 'Acompañados de salsa tártara de ajo confitado y coulis de guayaba (5 uds).', price: '$12' },
        { name: 'Sliders de Picanha al Carbón', desc: 'Mini hamburguesas con queso provolone ahumado y cebolla caramelizada (3 uds).', price: '$15' },
        { name: 'Nachos Terraplén Supreme', desc: 'Tortillas de maíz con carne desmechada, guacamole, pico de gallo y queso fundido.', price: '$17' }
      ],
      platosFuertes: [
        { name: 'Picanha Angus al Grill (350g)', desc: 'Corte a la parrilla con yuca frita al mojo y chimichurri criollo.', price: '$28' },
        { name: 'Tacos de Birria de Res (3 uds)', desc: 'Tortillas de maíz doradas con carne suave, queso Oaxaca y consomé para dipear.', price: '$17' },
        { name: 'Burger Terraplén Black Angus', desc: '200g de carne angus, bacon crujiente, queso cheddar madurado y papas trufadas.', price: '$18' }
      ],
      cocteleria: [
        { name: 'Sangría Roja de la Casa (Jarra)', desc: 'Vino tinto, frutas de estación maceradas, licor de naranja y toque espumoso.', price: '$28' },
        { name: 'Aperol Spritz Skyline', desc: 'Aperol, Prosecco D.O.C., soda y rodaja de naranja fresca.', price: '$13' },
        { name: 'Gin Tonic Botánico', desc: 'Gin Beefeater / Tanqueray con bayas de enebro, pepino y tónica premium.', price: '$12' },
        { name: 'Mojito de Frutos Rojos', desc: 'Ron blanco, frambuesas frescas, menta fresca, lima y agua con gas.', price: '$13' }
      ],
      botellasVip: [
        { name: 'Tequila Don Julio Blanco', desc: 'Con 4 mezcladores y servicio en mesa.', price: '$160' },
        { name: 'Vodka Belvedere / Grey Goose', desc: 'Servicio con Red Bull y sodas.', price: '$150' },
        { name: 'Ron Zacapa 23 Años', desc: 'Ron guatemalteco ultra premium.', price: '$180' }
      ]
    }
  },
  {
    id: 'venue-primavera',
    name: 'Primavera Panamá',
    h1Title: 'Primavera Panamá',
    shortName: 'Primavera',
    slug: 'primavera-panama',
    tagline: 'Cocina fusión contemporánea & experiencias en Costa del Este',
    category: 'Rooftop & Dining',
    area: 'Costa del Este',
    city: 'Costa del Este, Panamá',
    address: 'MMG Tower, Piso 7, Av. Paseo del Mar, Costa del Este',
    googleMapsUrl: 'https://maps.google.com/?q=Primavera+Rooftop+MMG+Tower+Costa+del+Este',
    googleMapsQuery: 'Primavera Rooftop, MMG Tower, Costa del Este, Panama',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Primavera+Rooftop,+MMG+Tower,+Costa+del+Este,+Panama&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapPreview: '/images/terraplen_map_preview.jpg',
    websiteUrl: 'https://primaverarooftop.com',
    instagramUrl: 'https://www.instagram.com/primaverarooftop/',
    instagramHandle: '@primaverarooftop',
    phone: '+507 6633-0016',
    dinnerTime: '4:00 PM - 10:00 PM',
    partyTime: '10:00 PM - 02:00 AM',
    dressCode: 'Smart Casual / Chic',
    parking: 'Estacionamiento techado 24/7 en MMG Tower + Valet Parking',
    ageLimit: 'Todas las edades en cena / 18+ horario lounge',
    rating: '4.8',
    reviewCount: '190',
    coverImage: '/images/venues/primavera/sunset.jpg',
    seoTitle: 'Primavera Panamá | Rooftop & Restaurante en Costa del Este',
    seoDescription: 'Descubre Primavera Panamá en Costa del Este: cocina fusión contemporánea, cocktails, cenas, eventos y reservas.',
    description: 'Primavera es una propuesta gastronómica en Costa del Este enfocada en cocina fusión contemporánea, cocktails y experiencias sociales.\n\nSu ambiente lo convierte en una opción para comenzar el día, disfrutar una cena o formar parte de experiencias especiales organizadas durante la semana.\n\nConsulta en ARRIVE los eventos, horarios y opciones de reserva disponibles en Primavera Panamá.',
    vipPricing: VIP_TABLE_PRICING,
    faqs: {
      es: [
        {
          question: '¿Dónde está ubicado Primavera Rooftop?',
          answer: 'Está ubicado en el Piso 7 de la emblemática MMG Tower, sobre la Avenida Paseo del Mar en Costa del Este, Ciudad de Panamá.'
        },
        {
          question: '¿Qué tipo de gastronomía sirven en Primavera?',
          answer: 'Ofrecen cocina fusión contemporánea con influencias asiático-mediterráneas, cortes a la parrilla robata, tiraditos frescos y coctelería botánica signature.'
        },
        {
          question: '¿Cómo es el estacionamiento en MMG Tower?',
          answer: 'MMG Tower dispone de modernos estacionamientos techados bajo vigilancia las 24 horas y servicio de Valet Parking en la entrada corporativa.'
        }
      ],
      en: [
        {
          question: 'Where is Primavera Rooftop located?',
          answer: 'Located on the 7th Floor of the landmark MMG Tower on Avenida Paseo del Mar in Costa del Este, Panama City.'
        },
        {
          question: 'What is the cuisine style at Primavera?',
          answer: 'Contemporary fusion cuisine combining Asian and Mediterranean flavors, robata grilled cuts, fresh tiraditos, and botanical signature cocktails.'
        },
        {
          question: 'Is parking available at MMG Tower?',
          answer: 'Yes, MMG Tower provides secure indoor multi-level parking 24/7 as well as on-site valet parking at the main entrance.'
        }
      ]
    },
    features: [
      'Ubicación privilegiada en Piso 7 de MMG Tower con brisa del mar',
      'Cocina Robata Grill y fusión asiática-mediterránea',
      'Amplia terraza jardín y salón interior climatizado',
      'Carta de cócteles botánicos y de autor',
      'Ideal para after-office de alto nivel y cenas de celebración'
    ],
    gallery: [
      {
        url: '/images/venues/primavera/sunset.jpg',
        title: 'Vista Panorámica al Atardecer • Piso 7',
        category: 'Sunset View'
      },
      {
        url: '/images/venues/primavera/interior.jpg',
        title: 'Salón Principal con Telas Ondulantes',
        category: 'Diseño'
      },
      {
        url: '/images/venues/primavera/food.jpg',
        title: 'Cocina Fusión Asiática & Mediterránea',
        category: 'Gastronomía'
      },
      {
        url: '/images/venues/primavera/cocktails.jpg',
        title: 'Coctelería de Autor Costa del Este',
        category: 'Coctelería'
      },
      {
        url: '/images/venues/primavera/ceviche.jpg',
        title: 'Raw Bar & Ceviche del Mar',
        category: 'Platos'
      },
      {
        url: '/images/venues/primavera/sushi.jpg',
        title: 'Nigiri & Roll Especialidad del Chef',
        category: 'Sushi'
      }
    ],
    menu: {
      entradasFrias: [
        {
          name: 'Aguachile Verde de Camarón',
          desc: 'Camarón blanqueado y encurtido, aguachile verde, aguacate, láminas de pepinillo, jalapeño crocante, brotes de cilantro y tortilla de maíz crocante.',
          price: '$19',
          tags: ['S', 'GF']
        },
        {
          name: 'Tiradito Akami + AOVE',
          desc: 'Cortes usuzukuri de Akami Bluefin Tuna, AOVE y escamas de sal Maldon de carbón activo.',
          price: '$15',
          tags: ['S', 'GF']
        },
        {
          name: 'Usuzukuri Kanpachi',
          desc: 'Cortes usuzukuri de kanpachi, espejo de ponzu, lascas de jalapeño y sal Maldon de carbón activo.',
          price: '$15',
          tags: ['S', 'GF']
        },
        {
          name: 'Chuletón Central',
          desc: 'Ribeye estilo carpaccio, tomates deshidratados y ahumados, hongos trufados, shiso crocante, AOVE y sal Maldon de carbón activo.',
          price: '$14',
          tags: ['KT']
        },
        {
          name: 'Steak Tartare + Caviar',
          desc: 'Lomo de res, ají trompito, tallos de cilantro, shallot, alcaparras, mostaza Dijon, Worcestershire, alioli de pixbae kosho, chips de ajo, huevo de codorniz, caviar y mix de chips.',
          price: '$17',
          tags: ['KT']
        }
      ],
      paraCompartir: [
        {
          name: 'Ceviche Natural',
          desc: 'Pesca del día, leche de tigre, cebolla morada, ají trompita, cilantro, chips de plátano, maíz choclo y maíz cancha.',
          price: '$18',
          tags: ['S', 'GF']
        },
        {
          name: 'Ceviche Chombo',
          desc: 'Camarones, crema de ají chombo y trompita, cilantro, chips de plátano, maíz choclo y maíz cancha.',
          price: '$19',
          tags: ['S']
        },
        {
          name: 'Ensalada César',
          desc: 'Lechuga romana, aderezo César hecho en casa, pollo, crocantes de bacon y crutones.',
          price: '$16'
        },
        {
          name: 'Hamachi del Trópico',
          desc: 'Hamachi, salsa de maracuyá y ají amarillo, Asian tabbouleh/chalkas y tierra de semillas de zapallo.',
          price: '$15',
          tags: ['S']
        },
        {
          name: 'Tiradito Octopus',
          desc: 'Pulpo al punto, aguacate, mayonesa kalamata, salsa de ají amarillo, aceite de oliva, yuzu y hojas de cilantro.',
          price: '$22',
          tags: ['S', 'GF']
        }
      ],
      especialidadesChef: [
        {
          name: 'Spicy Pork Dumpling',
          desc: 'Dumpling relleno de cerdo y cebollín, aceite aromatizado, ajo crocante y furikake.',
          price: '$14'
        },
        {
          name: 'Wanton del Dragón',
          desc: 'Wonton de camarón frito, salsa sweet chili de mamón chino, cebollín y sésamo.',
          price: '$15',
          tags: ['S']
        },
        {
          name: 'Siu Mai Imperial de Ribeye',
          desc: 'Ribeye y camarón, ikura, jengibre, cebollín, aceite de sésamo y soya reducida.',
          price: '$15',
          tags: ['S']
        },
        {
          name: 'Conchas a la Parmesana',
          desc: 'Vieiras curadas, mantequilla de ají amarillo, parmesano y limón.',
          price: '$19',
          tags: ['S', 'GF']
        },
        {
          name: 'Hamaguri Fusión',
          desc: 'Almejas blancas, curry japonés, crema de coco, arroz sushi y furikake de arroz inflado con marañón.',
          price: '$16',
          tags: ['S']
        },
        {
          name: 'Sliders Angus',
          desc: 'Pan de papa, carne Angus, mermelada de bacon y cebolla y alioli de vegetales rostizados.',
          price: '$15'
        },
        {
          name: 'Taquitos Ribeye Fusión',
          desc: 'Tortilla, ribeye, hongos oyster y crimini, salsa Gamardale spicy y cebollín.',
          price: '$14'
        },
        {
          name: 'Mongolian Beef',
          desc: 'Lomo de res, arroz, salsa de soya, cebollín y furikake de arroz inflado con marañón.',
          price: '$22'
        }
      ],
      rawBar: [
        {
          name: 'Spicy Tuna Hand Roll',
          desc: 'Cono de alga nori crocante con atún spicy y arroz sazonado.',
          price: '$8',
          tags: ['S']
        },
        {
          name: 'Spicy Salmon Hand Roll',
          desc: 'Cono de alga nori con salmón spicy y cebollín.',
          price: '$8',
          tags: ['S']
        },
        {
          name: 'Hamachi (Hand Roll / Sashimi / Nigiri)',
          desc: 'Pez limón japonés selecto. Hand Roll $8 • Sashimi $15 • Nigiri $11.',
          price: '$8 - $15',
          tags: ['S', 'GF']
        },
        {
          name: 'Akami Bluefin Tuna (Sashimi / Nigiri)',
          desc: 'Atún aleta azul corte limpio. Sashimi $18 • Nigiri $15.',
          price: '$15 - $18',
          tags: ['S', 'GF']
        },
        {
          name: 'Chu-Toro Bluefin (Hand Roll / Sashimi / Nigiri)',
          desc: 'Vientre medio de atún aleta azul. Hand Roll $12 • Sashimi $20 • Nigiri $17.',
          price: '$12 - $20',
          tags: ['S', 'GF']
        },
        {
          name: 'Ho-Toro Bluefin (Hand Roll / Sashimi / Nigiri)',
          desc: 'Vientre superior graso de atún aleta azul. Hand Roll $15 • Sashimi $22 • Nigiri $18.',
          price: '$15 - $22',
          tags: ['S', 'GF']
        },
        {
          name: 'Ora King Salmon (Sashimi / Nigiri)',
          desc: 'Salmón rey de Nueva Zelanda. Sashimi $17 • Nigiri $15.',
          price: '$15 - $17',
          tags: ['S', 'GF']
        },
        {
          name: 'Suzuki Nigiri',
          desc: 'Lubina japonesa sobre arroz sushi sazonado.',
          price: '$8',
          tags: ['S']
        },
        {
          name: 'Hotate Nigiri',
          desc: 'Vieira japonesa dulce con toque cítrico sobre arroz sushi.',
          price: '$19',
          tags: ['S']
        },
        {
          name: 'Gunkan Ikuras',
          desc: 'Bocado envuelto en nori con huevas de salmón salvaje maceradas.',
          price: '$14',
          tags: ['S']
        },
        {
          name: 'Niku Nigiri',
          desc: 'Corte de res ultra tierna flameada con toque nikkei.',
          price: '$16'
        }
      ],
      sushiRolls: [
        {
          name: 'Butter Crab Roll',
          desc: 'Papel de soya, kani, camarón tempura, mantequilla avellana y soya ponzu.',
          price: '$15',
          tags: ['S']
        },
        {
          name: 'Uramaki Spicy Tuna',
          desc: 'Atún spicy, arroz, sésamo y alioli yuzu kosho.',
          price: '$15',
          tags: ['S']
        },
        {
          name: 'Uramaki Spicy Salmon',
          desc: 'Salmón spicy, arroz, cebollín, sésamo y alioli de chiles fermentados.',
          price: '$15',
          tags: ['S']
        },
        {
          name: 'Uramaki Spicy Hamachi',
          desc: 'Hamachi, arroz, sésamo tostado y miso dulce.',
          price: '$19',
          tags: ['S']
        },
        {
          name: 'Futomaki Tres Texturas',
          desc: 'Bluefin Tuna — Akami, Chu-Toro y Ho-Toro — arroz, sésamo y nikiri.',
          price: '$26',
          tags: ['S']
        }
      ],
      especialesItamae: [
        {
          name: 'Nigiri Sampler (18 Uds)',
          desc: 'Ora King, Bluefin Akami, Bluefin Chu-Toro, Bluefin Ho-Toro, Hamachi, Suzuki, Pargo Seda, Hotate y Niku. 18 unidades escogidas por el Itamae.',
          price: '$120',
          tags: ['S']
        },
        {
          name: 'Sashimi Sampler (15 Uds)',
          desc: 'Ora King, Bluefin Tuna Akami, Chu-Toro, Ho-Toro y Hamachi. 15 unidades escogidas por el Itamae.',
          price: '$110',
          tags: ['S', 'GF']
        },
        {
          name: 'Caviar Hackleback Sturgeon',
          desc: 'Caviar Sturgeon de río, servido con blinis tradicionales, crema agria y ciboulette o eneldo.',
          price: '$90',
          tags: ['S']
        },
        {
          name: 'Caviar Classic Russian Ossetra',
          desc: 'Caviar imperial Ossetra de máxima pureza, servido con blinis, crema agria y hierbas.',
          price: '$120',
          tags: ['S']
        }
      ],
      platosFuertes: [
        {
          name: 'The Primavera Smash Burger',
          desc: 'Pan de papa dulce, 180 g de doble smash, queso cheddar y Monterey, tártara, pepinillos encurtidos caseros, furikake de arroz inflado con marañón y papitas crispy.',
          price: '$17'
        },
        {
          name: 'Buta Bara Mostaza Miso',
          desc: 'Pork belly de cocción lenta por 14 horas, glaseado de mostaza y miso, chicharrón, crocante de piel y negi y hongos bunapi.',
          price: '$19'
        },
        {
          name: 'Ebi Katsu Sando',
          desc: 'Pan de papa, camarón con alga nori abrazado en panko, ketchup de banana/hongos y kimchi.',
          price: '$18',
          tags: ['S']
        },
        {
          name: 'House Wok',
          desc: 'Arroz frito, vegetales, carne, pollo, tortilla de huevo, perfume de sésamo y nori flakes.',
          price: '$18'
        },
        {
          name: 'Lomo Saltado',
          desc: 'Lomo de res salteado, cebolla morada, tomate, salsa de soya y ostras, arroz y papas caseras.',
          price: '$20'
        },
        {
          name: 'Miso + Pesca Acompañado',
          desc: 'Pesca del día marinada en miso, sake y mirin, servida con arroz sushi y furikake de arroz con marañón.',
          price: '$25',
          tags: ['S']
        },
        {
          name: 'Ribeye Angus al Grill',
          desc: 'Ribeye Angus servido con mantequilla de especias y fermentos artesanales.',
          price: '$55',
          tags: ['KT']
        },
        {
          name: 'Entraña Prime al Grill',
          desc: 'Entraña Angus servida con mantequilla de especias y polvo de cebollas.',
          price: '$50',
          tags: ['KT']
        }
      ],
      sides: [
        { name: 'Papas Fritas', desc: 'Papas doradas crujientes sazonadas.', price: '$6', tags: ['V'] },
        { name: 'Arroz Sushi + Furikake', desc: 'Arroz sazonado con furikake de arroz inflado y marañón.', price: '$6', tags: ['V'] },
        { name: 'Arroz Jazmín', desc: 'Arroz aromático al vapor.', price: '$6', tags: ['V', 'GF'] },
        { name: 'Papas Criollas', desc: 'Papas criollas salteadas crocantes.', price: '$8', tags: ['V'] },
        { name: 'Ensalada Verde de Temporada', desc: 'Mix de hojas verdes y vinagreta botánica.', price: '$7', tags: ['V', 'GF'] }
      ],
      postres: [
        { name: 'Tarta Vasca con Lotus', desc: 'Tarta de queso clásica estilo vasco con salsa tibia Lotus Biscoff.', price: '$12', tags: ['V'] },
        { name: 'Sticky Toffee Pudding', desc: 'Bizcocho tibio de dátiles bañado en salsa toffee artesanal.', price: '$15', tags: ['V'] },
        { name: 'Crème Brûlée Primavera', desc: 'Base de coco y chocolate blanco servida sobre piel de piña caramelizada.', price: '$15', tags: ['V'] },
        { name: 'Pie de Limón', desc: 'Base de galleta crujiente, crema suave y curd de limón.', price: '$12', tags: ['V'] }
      ],
      sundayLunch: [
        {
          name: 'Dumpling de Pulpo y Macha',
          desc: 'Dumplings rellenos de pulpo, salsa macha y shoyu, base de tofu y queso feta, togarashi y cebollín.',
          price: '$15',
          tags: ['S']
        },
        {
          name: 'Spicy Poke Bowl',
          desc: 'Arroz sushi, King Salmon, edamame, zanahoria, pepinillos caseros, piña asada, cebollín, spicy mayo y furikake de arroz inflado con marañón.',
          price: '$14',
          tags: ['S']
        },
        {
          name: 'Pollo al Curry Koreano',
          desc: 'Fajitas de pollo crocante, vegetales salteados, curry y coco, togarashi, arroz sushi y furikake de arroz inflado con marañón.',
          price: '$17'
        },
        {
          name: 'Yellowfin Teriyaki',
          desc: 'Medallón de atún abrazado en sésamo, vegetales salteados, yema al panko, salsa teriyaki de soya dulce, arroz sushi y furikake.',
          price: '$17',
          tags: ['S']
        }
      ],
      cocteleria: [
        { name: 'Cosmopolitan', desc: 'Vodka, Cointreau, jugo de arándano y lima fresca.', price: '$12' },
        { name: 'Gin Fizz', desc: 'Ginebra botánica, limón, almíbar simple y agua carbonatada.', price: '$12' },
        { name: 'Negroni', desc: 'Gin, Campari bitter y vermouth rosso.', price: '$13' },
        { name: 'Daiquiri', desc: 'Ron blanco, jugo de limón tahití y sirope de caña.', price: '$12' },
        { name: 'Old Fashioned', desc: 'Bourbon whisky, amargo de Angostura, azúcar y piel de naranja.', price: '$12' },
        { name: 'God Father', desc: 'Scotch whisky y amaretto di Saronno.', price: '$14' },
        { name: 'Lychee Martini', desc: 'Vodka, licor de lichi oriental y toque cítrico.', price: '$12' },
        { name: 'Moscow Mule', desc: 'Vodka, cerveza de jengibre especiada y jugo de lima.', price: '$12' },
        { name: 'Carajillo Licor 43', desc: 'Espresso italiano doble batido con Licor 43.', price: '$12' },
        { name: 'Caipirinha', desc: 'Cachaça brasileña, lima machacada y azúcar de caña.', price: '$12' },
        { name: 'Margarita Tradicional', desc: 'Tequila blanco, triple sec, lima y escarcha de sal marina.', price: '$12' },
        { name: 'Sangría Tinta Primavera', desc: 'Vino tinto seleccionado, frutas de temporada maceradas y toque de licor.', price: '$12' },
        { name: 'Pisco Sour', desc: 'Pisco quebranta, jugo de limón, sirope, clara de huevo y gotas de amargo.', price: '$12' },
        { name: 'Whisky Sour', desc: 'Bourbon, jugo de limón, azúcar y clara sedosa.', price: '$14' },
        { name: 'Mojito Cubano', desc: 'Ron blanco, hierbabuena fresca, lima, soda y azúcar morena.', price: '$12' },
        { name: 'Tom Collins', desc: 'Ginebra seca, limón, soda y azúcar.', price: '$12' },
        { name: 'Manhattan', desc: 'Rye whiskey o bourbon, vermouth dulce y amargo de angostura.', price: '$14' },
        { name: 'Long Island Ice Tea', desc: 'Vodka, ron, ginebra, tequila, triple sec, limón y splash de cola.', price: '$13' }
      ],
      mocktailsBebidas: [
        { name: 'Pineapple Express (Mocktail)', desc: 'Piña natural fresca macerada con raspadura de caña y especias aromáticas.', price: '$10' },
        { name: 'Saril & Roses (Mocktail)', desc: 'Infusión artesanal de flor de saril panameño y rosas con raspadura.', price: '$10' },
        { name: 'Limonada de Coco', desc: 'Limonada cremosa clásica con leche de coco caribeña.', price: '$8' },
        { name: 'Limonada Natural', desc: 'Zumo de limón fresco exprimido al momento.', price: '$7' },
        { name: 'Cerveza Corona Extra', desc: 'Cerveza mexicana servida con gajo de lima.', price: '$7' },
        { name: 'Cerveza Modelo Especial', desc: 'Cerveza tipo pilsner mexicana.', price: '$6' },
        { name: 'Cerveza Balboa Clásica', desc: 'Cerveza nacional panameña tradicional.', price: '$5' },
        { name: 'Cerveza Michelob Ultra', desc: 'Cerveza ligera baja en carbohidratos.', price: '$6' },
        { name: 'Agua Evian (330ml / 750ml)', desc: 'Agua mineral natural de los Alpes franceses ($4 / $7).', price: '$4 - $7' },
        { name: 'Agua Perrier con Gas (330ml / 750ml)', desc: 'Agua mineral con gas natural carbónico ($5 / $8).', price: '$5 - $8' },
        { name: 'Fever-Tree (Ginger Beer / Tónica)', desc: 'Mixer botánico premium inglés.', price: '$5' },
        { name: 'Red Bull Energy Drink (Regular / Sugar Free)', desc: 'Bebida energizante servida bien fría.', price: '$6' }
      ],
      vinos: [
        { name: 'Marieta Albariño (Galicia, España)', desc: 'Blanco fresco y afrutado. Copa $7 • Botella $40.', price: '$7 / $40' },
        { name: 'Santa Margherita Pinot Grigio (Italia)', desc: 'Blanco seco elegante de los Alpes italianos. Botella.', price: '$55' },
        { name: 'Matua Sauvignon Blanc (Nueva Zelanda)', desc: 'Blanco vibrante con notas de maracuyá y grosella. Botella.', price: '$48' },
        { name: 'Catena Chardonnay (Mendoza, Argentina)', desc: 'Blanco con crianza sutil, notas de manzana y flores blancas. Botella.', price: '$35' },
        { name: 'Protos Verdejo (Rueda, España)', desc: 'Blanco varietal de alta intensidad aromática. Botella.', price: '$55' },
        { name: 'Paco & Lola Albariño (Rías Baixas)', desc: 'Blanco floral y cítrico de gran frescura. Botella.', price: '$45' },
        { name: 'Murviedro Verdejo (Valencia, España)', desc: 'Blanco joven y refrescante. Copa $7 • Botella $40.', price: '$7 / $40' },
        { name: 'El Enemigo Malbec (Mendoza, Argentina)', desc: 'Tinto estructurado con gran personalidad y mineralidad. Botella.', price: '$55' },
        { name: 'Gran Enemigo Malbec (Gualtallary)', desc: 'Ícono de clase mundial de Alejandro Vigil. Botella.', price: '$125' },
        { name: 'Luigi Bosca Pinot Noir (Argentina)', desc: 'Tinto sedoso con notas de frutos rojos. Copa $8 • Botella $45.', price: '$8 / $45' },
        { name: 'Beringer Bros Red Blend (Bourbon Barrel)', desc: 'Tinto californiano añejado en barricas de bourbon. Botella.', price: '$45' },
        { name: 'Decoy Merlot by Duckhorn (Napa Valley)', desc: 'Tinto redondo con notas de ciruela y chocolate negro. Botella.', price: '$65' },
        { name: 'Belle Glos Pinot Noir (California)', desc: 'Tinto untuoso y opulento con notas de grosella y especias. Botella.', price: '$95' },
        { name: 'Caymus Cabernet Sauvignon (Napa Valley)', desc: 'Célebre cabernet de gran opulencia y taninos aterciopelados. Botella.', price: '$175' },
        { name: 'Murviedro Crianza (España)', desc: 'Tinto suave con paso por roble. Copa $7 • Botella $35.', price: '$7 / $35' },
        { name: 'Gérard Bertrand Côtes des Roses (Francia)', desc: 'Rosado elegante en icónica botella con base de rosa. Copa $7 • Botella $35.', price: '$7 / $35' },
        { name: 'B&G Côtes de Provence Rosé (Francia)', desc: 'Rosado provenzal clásico y delicado. Botella.', price: '$45' },
        { name: 'Chandon Extra Brut / Rosado 750ml', desc: 'Espumante mendocino de método tradicional. Trago $12 • Botella $80 - $90.', price: '$12 / $80+' },
        { name: 'Mionetto Prosecco DOC (Italia)', desc: 'Prosecco fresco de Treviso. Trago $12 • Botella $70.', price: '$12 / $70' },
        { name: 'Moët & Chandon Impérial Brut / Rosé', desc: 'Champagne francés icónico. Botella.', price: '$160 - $180' },
        { name: 'Veuve Clicquot Brut / Rosé', desc: 'Champagne de la etiqueta amarilla histórica. Botella.', price: '$170 - $180' },
        { name: 'Dom Pérignon Vintage / Rosé', desc: 'Prestige Cuvée de Champagne de máxima exclusividad. Botella.', price: '$500 - $550' }
      ],
      botellasVip: [
        { name: 'Tequila Don Julio 1942', desc: 'Añejo ultra premium icónico. Trago $40 • Botella $425.', price: '$40 / $425' },
        { name: 'Tequila Don Julio 70 Cristalino', desc: 'Primer añejo cristalino del mundo. Trago $20 • Botella $200.', price: '$20 / $200' },
        { name: 'Tequila Casa Dragones Blanco', desc: 'Tequila 100% agave azul de pureza excepcional en mesa. Botella.', price: '$275' },
        { name: 'Tequila Casamigos Blanco / Añejo', desc: 'Tequila suave de pequeños lotes. Trago $17-$20 • Botella $175-$225.', price: '$175 - $225' },
        { name: 'Tequila Maestro Dobel Diamante', desc: 'Regla de oro cristalina de Jalisco. Trago $18 • Botella $180.', price: '$18 / $180' },
        { name: 'Tequila Patrón (Silver / Añejo / Cristalino)', desc: 'Destilación tradicional en tahona. Trago $15-$17 • Botella $170-$175.', price: '$170 - $175' },
        { name: 'Johnnie Walker Blue Label', desc: 'Scotch de mezcla legendaria de barricas raras. Trago $50 • Botella $500.', price: '$50 / $500' },
        { name: 'The Macallan 12 Años Double Cask', desc: 'Single malt escocés de barricas de roble jerezano. Trago $25 • Botella $250.', price: '$25 / $250' },
        { name: 'Buchanan\'s 18 Special Reserve', desc: 'Mezcla añeja de gran cuerpo y suavidad. Trago $20 • Botella $240.', price: '$20 / $240' },
        { name: 'Buchanan\'s Deluxe 12', desc: 'Clásico escocés de perfil suave y cítrico. Trago $12 • Botella $150.', price: '$12 / $150' },
        { name: 'Glenfiddich 12 / 15 Años', desc: 'Single malt insignia del valle de Speyside. Trago $16-$20 • Botella $150-$200.', price: '$150 - $200' },
        { name: 'Ron Zacapa Centenario 23', desc: 'Ron de altura guatemalteco envejecido en sistema solera. Trago $14 • Botella $150.', price: '$14 / $150' },
        { name: 'Ron Santa Teresa 1796', desc: 'Ron venezolano solera de maestría única. Trago $12 • Botella $140.', price: '$12 / $140' },
        { name: 'Ron Abuelo 12 Años Dos Maderas', desc: 'Ron panameño reserva especial en barricas de roble blanco. Trago $12 • Botella $120.', price: '$12 / $120' },
        { name: 'Vodka Belvedere / Grey Goose', desc: 'Vodka de centeno polaco y trigo de invierno francés. Trago $12 • Botella $140-$150.', price: '$140 - $150' },
        { name: 'Vodka Tito\'s Handmade / Ketel One', desc: 'Destilados premium para coctelería o mesa. Trago $11-$12 • Botella $130-$135.', price: '$130 - $135' },
        { name: 'Ginebra Hendrick\'s / Tanqueray Ten', desc: 'Destilados botánicos con pepino, rosas y cítricos frescos. Trago $14 • Botella $130-$150.', price: '$130 - $150' },
        { name: 'Mezcal Artesanal (400 Conejos / Montelobos / 7 Misterios)', desc: 'Destilados oaxaqueños de maguey espadín ahumado. Trago $12-$15 • Botella $150-$170.', price: '$150 - $170' },
        { name: 'Coñac Hennessy VS', desc: 'Cognac francés de prestigio internacional. Trago $15 • Botella $150.', price: '$15 / $150' }
      ]
    }
  },
  {
    id: 'venue-cielo',
    name: 'Cielo Rooftop',
    h1Title: 'Cielo Rooftop Panamá',
    shortName: 'Cielo',
    slug: 'cielo-rooftop',
    tagline: 'Rooftop lounge con vistas al skyline y la bahía',
    category: 'Rooftop Lounge',
    area: 'Avenida Balboa',
    city: 'Ciudad de Panamá',
    address: 'PH The Sands, Piso RT, Ave. Balboa, Ciudad de Panamá',
    googleMapsUrl: 'https://maps.google.com/?q=Cielo+Rooftop+PH+The+Sands+Ave+Balboa+Panama',
    googleMapsQuery: 'Cielo Rooftop, PH The Sands, Ave. Balboa, Panama',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Cielo+Rooftop,+PH+The+Sands,+Ave.+Balboa,+Panama&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapPreview: '/images/terraplen_map_preview.jpg',
    websiteUrl: 'https://cielopanama.com',
    instagramUrl: 'https://www.instagram.com/cielopanama/',
    instagramHandle: '@cielopanama',
    phone: '+507 6400-0000',
    dinnerTime: '5:30 PM - 10:00 PM',
    partyTime: '10:00 PM - 03:30 AM',
    dressCode: 'Rooftop Chic / Casual Elegante',
    parking: 'Estacionamientos techados en PH The Sands + Valet Parking en Ave. Balboa',
    ageLimit: '18+ (Cédula o Pasaporte físico obligatorio)',
    rating: '4.6',
    reviewCount: '1,320',
    coverImage: '/images/venues/cielo/cover.jpg',
    seoTitle: 'Cielo Rooftop Panamá | Vistas Skyline, Drinks & Nightlife Ave. Balboa',
    seoDescription: 'Descubre Cielo Rooftop en PH The Sands, Ave. Balboa: las mejores vistas al skyline y la bahía de Panamá, cócteles de autor, sunsets, cenas y reservas de mesas VIP.',
    description: 'Cielo Rooftop se eleva en el piso RT del icónico PH The Sands sobre la Avenida Balboa, ofreciendo la panorámica más imponente del skyline moderno y la Bahía de Panamá.\n\nEs el punto de encuentro predilecto para sunsets con cócteles de autor, gastronomía internacional y noches vibrantes que evolucionan hacia la mejor fiesta de la ciudad.\n\nConsulta en ARRIVE los próximos eventos, beneficios exclusivos y opciones de reserva de mesas VIP en Cielo Rooftop.',
    vipPricing: VIP_TABLE_PRICING,
    faqs: {
      es: [
        {
          question: '¿Dónde está ubicado Cielo Rooftop en Ciudad de Panamá?',
          answer: 'Cielo Rooftop está ubicado en el piso RT (Rooftop) del PH The Sands, sobre la Avenida Balboa, con vista panorámica a la bahía y al skyline iluminado de la ciudad.'
        },
        {
          question: '¿Cuál es el código de vestimenta en Cielo Rooftop?',
          answer: 'Rooftop Chic / Casual Elegante. Se aconseja ropa estilizada, camisas o polos refinados y calzado adecuado. No se permite ropa de gimnasio ni calzado playero.'
        },
        {
          question: '¿A qué hora empieza la fiesta en Cielo Rooftop?',
          answer: 'Las tardes comienzan a las 5:30 PM para disfrutar del sunset y cócteles. A partir de las 10:00 PM los DJs residentes elevan la música y la noche se transforma en fiesta hasta las 3:30 AM.'
        },
        {
          question: '¿Disponen de estacionamiento y Valet Parking?',
          answer: 'Sí, PH The Sands cuenta con estacionamientos techados y servicio de Valet Parking en la entrada principal sobre Avenida Balboa.'
        }
      ],
      en: [
        {
          question: 'Where is Cielo Rooftop located in Panama City?',
          answer: 'Cielo Rooftop is on the RT (Rooftop) floor of PH The Sands on Avenida Balboa, featuring panoramic vistas of Panama Bay and the city skyline.'
        },
        {
          question: 'What is the dress code at Cielo Rooftop?',
          answer: 'Rooftop Chic / Smart Casual. Fashionable nightlife attire is recommended. Sportswear and beach flip-flops are prohibited.'
        },
        {
          question: 'When does the nightlife and party start?',
          answer: 'Sunsets and cocktails start at 5:30 PM. From 10:00 PM onwards, resident DJs turn up the energy for rooftop clubbing until 3:30 AM.'
        },
        {
          question: 'Is valet parking available at PH The Sands?',
          answer: 'Yes, secure indoor parking and valet services are accessible at the entrance on Avenida Balboa.'
        }
      ]
    },
    features: [
      'Punto panorámico con vista directa a la bahía y Casco Antiguo',
      'Coctelería de autor inspirada en destilados latinoamericanos',
      'Tapas de inspiración mediterránea y nikkei',
      'Sesiones de DJ en vivo al atardecer y noche',
      'Zona de mesas VIP con vista despejada al horizonte'
    ],
    gallery: [
      {
        url: '/images/venues/cielo/cover.jpg',
        title: 'Salón Sky Lounge, Sillas de Terciopelo & Mesas de Mármol',
        category: 'Rooftop Dining'
      },
      {
        url: '/images/venues/cielo/skyline.jpg',
        title: 'Skyline al Océano & Luces de Panamá',
        category: 'Skyline'
      },
      {
        url: '/images/venues/cielo/bar.jpg',
        title: 'Barra Central & Coctelería Cosmopolita',
        category: 'Mixología'
      },
      {
        url: '/images/venues/cielo/dj.jpg',
        title: 'Cabina de DJ & Sonido Envolvente',
        category: 'Live DJ'
      },
      {
        url: '/images/venues/cielo/party.jpg',
        title: 'Noche de Fiesta en Casco Antiguo',
        category: 'Nightlife'
      }
    ],
    menu: {
      entradasCompartir: [
        {
          name: 'Tacos de Salmón',
          desc: 'Salmón fresco, cebolla morada, cilantro, ají dulce, yuzu ponzu y alioli de trufa blanca.',
          price: '$15',
          tags: ['S', 'GF']
        },
        {
          name: 'Tartar de Atún',
          desc: 'Atún, cebolla morada, cilantro, ají dulce, tomate, pepino, aguacate, aceite de trufa blanca y salsa poke con kimchee.',
          price: '$16',
          tags: ['S']
        },
        {
          name: 'Ceviche de Pulpo',
          desc: 'Pulpo tierno al punto, cebolla morada, cilantro, ají dulce, tomate, pepino y leche de tigre tradicional.',
          price: '$18',
          tags: ['S', 'GF']
        },
        {
          name: 'Ceviche de Camarón',
          desc: 'Camarón, cebolla morada, cilantro, ají dulce, dados de mango fresco y leche de tigre cítrica.',
          price: '$18',
          tags: ['S', 'GF']
        },
        {
          name: 'Ceviche de Corvina',
          desc: 'Corvina fresca, cebolla morada, cilantro, ají dulce, culantro, rábano, manzana verde y leche de tigre.',
          price: '$16',
          tags: ['S', 'GF']
        },
        {
          name: 'Ceviche de Combinación',
          desc: 'Corvina, atún, pulpo, camarón, cebolla morada, cilantro, ají dulce, piña y leche de tigre de pimentón.',
          price: '$19',
          tags: ['S', 'GF']
        },
        {
          name: 'Popcorn Fish Ceviche',
          desc: 'Corvina apanada crujiente, cebolla morada, cilantro, ají dulce, limón, aceite de oliva, leche de tigre y salsa huancaína.',
          price: '$16',
          tags: ['S']
        },
        {
          name: 'Carpaccio Wellington',
          desc: 'Carne de res seleccionada, mix de hongos, aderezo de mostaza antigua y demi-glace de carne, acompañado de pan de yuca.',
          price: '$16',
          tags: ['KT']
        }
      ],
      slidersBites: [
        {
          name: 'Sliders Burger',
          desc: 'Blend de carne de res Angus, cebolla morada crocante, queso mozzarella ahumado, pan de papa y alioli de ajo en confit.',
          price: '$16'
        },
        {
          name: 'Trío de Sliders Burger',
          desc: 'Tres variedades: Carne Angus con mozzarella ahumado; pechuga de pollo apanada con manchego y alioli rostizado; short ribs ahumados con salsa antiochuera.',
          price: '$18'
        },
        {
          name: 'Empanadas de Pulpo al Coco',
          desc: 'Pulpo, cebolla morada, cilantro, ají dulce, ajo, tomate, leche y aceite de coco, chimichurri verde y antiochuera.',
          price: '$14',
          tags: ['S']
        },
        {
          name: 'Baos de Short Ribs',
          desc: 'Short ribs ahumados desmechados, cebolla morada encurtida, micro cilantro y salsa antiochuera en pan bao al vapor.',
          price: '$16'
        },
        {
          name: 'Orange Popcorn Chicken',
          desc: 'Pechuguitas de pollo apanado crujiente, salsa de naranja importada, miel pura y toque de sambal.',
          price: '$16'
        },
        {
          name: 'Gyozas Fritas de Camarón',
          desc: 'Camarón, cebolla morada, cilantro, ají dulce, ajo, sésamo, alga nori, salsa de soya y sal de ají amarillo.',
          price: '$14',
          tags: ['S']
        },
        {
          name: 'Croquetas de Short Ribs',
          desc: 'Croquetas cremosas de short ribs ahumados, reducción de carne y salsa de ají cuajillo.',
          price: '$12'
        },
        {
          name: 'Chicharrón de Pork Belly',
          desc: 'Pork belly crujiente, rizos de cebollín, limón persa, gel de ají chombo y salsa agridulce de tamarindo.',
          price: '$19'
        }
      ],
      carnes: [
        {
          name: 'Wings al Estilo Koreano (10 Uds)',
          desc: '10 unidades de alitas apanadas crocantes, bañadas en salsa especial koreana y salsa tártara artesanal de la casa.',
          price: '$16'
        },
        {
          name: 'New York Steak 16 oz',
          desc: 'Corte New York 16 oz a la parrilla con mantequilla de ajo y romero, papas wedges y chimichurri de la casa.',
          price: '$45',
          tags: ['KT']
        },
        {
          name: 'Entraña Prime 12 oz',
          desc: 'Entraña Prime 12 oz jugosa, chimichurri tatemado de la casa y sal gruesa, acompañada de papas wedges.',
          price: '$48',
          tags: ['KT']
        }
      ],
      delMar: [
        {
          name: 'Pesca del Día',
          desc: 'Pesca fresca del día, espejo de fumet con naranja y aromáticas, vegetales frescos, tomate cherry, aceite verde y papas wedge.',
          price: '$25',
          tags: ['S']
        },
        {
          name: 'Sellado de Atún',
          desc: 'Medallón de atún sellado a fuego vivo, bouquet de mézclum y salsa de maracuyá miso.',
          price: '$25',
          tags: ['S']
        },
        {
          name: 'Salmón al Miso',
          desc: 'Salmón glaseado al miso con vegetales salteados (mézclum, baby corn y baby carrot).',
          price: '$26',
          tags: ['S']
        }
      ],
      pastasRisottos: [
        {
          name: 'Pasta Boloñesa',
          desc: 'Pasta linguini artesanal con ragú tradicional de carne, salsa de tomate, vegetales aromáticos y queso Grana Padano.',
          price: '$18'
        },
        {
          name: 'Frutos del Mar al Bisque',
          desc: 'Pasta linguini, almejas blancas, mejillones, pulpo importado, camarones, calamar aro, albahaca, vino blanco y bisque de langostinos.',
          price: '$24',
          tags: ['S']
        },
        {
          name: 'Risotto de Langostinos',
          desc: 'Langostinos jumbo, arroz arbóreo, espárragos frescos, sofrito al vino blanco, queso parmesano, ciboulette y bisque.',
          price: '$24',
          tags: ['S']
        }
      ],
      burgers: [
        {
          name: 'Cielo Burger',
          desc: '7 oz de blend de carnes Angus, queso Chela Cheddar añejado, bacon glaseado con whisky, maple y aioli tatemado. Con papas trufadas.',
          price: '$18'
        },
        {
          name: 'Chicken Burger',
          desc: '7 oz de pechuga de pollo apanada, queso manchego, tomate y pan de papa con opción de aioli rostizado o chimichurri. Con papas trufadas.',
          price: '$18'
        }
      ],
      salads: [
        {
          name: 'Ensalada de la Casa',
          desc: 'Champiñones crocantes, mézclum de lechugas, tomate confit, vinagreta de cilantro, reducción balsámica, hilos crocantes de arroz y sésamo.',
          price: '$14',
          tags: ['V']
        },
        {
          name: 'Mozza & Cherry Salad',
          desc: 'Base fondue de mozzarella, bocconcini de burrata, mézclum fresco, tomate cherry, tomate perita, pesto y aceite verde botánico.',
          price: '$14',
          tags: ['V', 'GF']
        }
      ],
      sides: [
        { name: 'White Truffle Fries', desc: 'Papas doradas, queso parmesano, aceite de trufa blanca y polvo de trufa negra.', price: '$8', tags: ['V'] },
        { name: 'Papas Wedge Cajun', desc: 'Home fries sazonadas con auténticas especias Cajun de Louisiana.', price: '$8', tags: ['V'] },
        { name: 'Patacones de la Casa', desc: 'Plátano verde crocante con mix de ajo y sal Maldon.', price: '$8', tags: ['V', 'GF'] },
        { name: 'Mac & Cheese 4 Quesos', desc: 'Pasta gomiti gratinada con Grana Padano, cheddar, queso de cabra y roquefort.', price: '$12', tags: ['V'] },
        { name: 'Espárragos al Ajo', desc: 'Espárragos salteados al ajo con vino blanco y ciboulette fresco.', price: '$12', tags: ['V', 'GF'] },
        { name: 'Puré de Papa Artesanal', desc: 'Puré de papa cremoso con mantequilla fina y sal marina.', price: '$8', tags: ['V'] }
      ],
      menuInfantil: [
        { name: 'Deditos de Pollo', desc: 'Pechuga de pollo apanada crujiente acompañada de papas fritas doradas.', price: '$12' },
        { name: 'Slider Kids (2 Uds)', desc: '2 mini burgers Angus con queso cheddar añejo, salsa mayonesa y ketchup, acompañadas de papas.', price: '$10' }
      ],
      postres: [
        { name: 'Brownie con Helado', desc: 'Brownie clásico de chocolate tibio con sirope Hershey\'s y bola de helado de vainilla.', price: '$12', tags: ['V'] },
        { name: 'Sky Coconut', desc: 'Helado artesanal de pipa, mousselina de coco, mix de frutas tropicales y sirope de frutos rojos.', price: '$15', tags: ['V'] },
        { name: 'Flan de la Casa Popcorn', desc: 'Flan con notas acarameladas de popcorn, crumble de galleta y helado de vainilla.', price: '$15', tags: ['V'] },
        { name: 'Tiramisú de Pistacho', desc: 'Bizcocho de pistacho con helado de café y suave crema chantilly.', price: '$15', tags: ['V'] },
        { name: 'Tres Leches Cielo', desc: 'Bizcocho tres leches artesanal bañado en crema chantilly y fresas frescas.', price: '$15', tags: ['V'] }
      ],
      cocteleria: [
        { name: 'Aurora Mule', desc: 'Gin Conciere, sirope de jengibre y romero, limón y ginger beer.', price: '$13' },
        { name: 'Violet Gin Tonic', desc: 'Gin Conciere infusionado con butterfly pea tea, cordial de limón y tónica premium.', price: '$12' },
        { name: 'Mojito Tangerine', desc: 'Ron Bacardí Carta Blanca, cordial de mandarina y club soda.', price: '$12' },
        { name: 'Dreamy Daiquiri', desc: 'Ron Bacardí 8 años, cordial de fresa natural y crema de coco Cielo.', price: '$14' },
        { name: 'Celestial Colada', desc: 'Ron Bacardí Carta Blanca, crema de coco, jugo de piña fresca y blue curaçao.', price: '$12' },
        { name: 'Carajillo Sweet', desc: 'Espresso Lavazza doble, mezcal artesanal, Licor 43, Frangelico y sirope de vainilla.', price: '$12' },
        { name: 'Fire Whisky Sour', desc: 'Whisky bourbon, sirope de habanero, zumo de lima y gotas de angostura.', price: '$15' },
        { name: 'Stardust Paloma', desc: 'Mezcal, sirope de chile habanero y lima, jugo de mandarina, soda y escarcha de Tajín.', price: '$13' },
        { name: 'Sky Blue Margarita', desc: 'Tequila Buen Amigo, blue curaçao, triple sec, limón y sirope simple.', price: '$12' },
        { name: 'Gates of Heaven', desc: 'Tequila Buen Amigo, triple sec, sirope de habanero lima, zumo de limón y piña.', price: '$14' },
        { name: 'Long Island Spicy', desc: 'Vodka, Gin, Ron, Tequila, triple sec, lima, sirope de habanero y top de cola.', price: '$12' },
        { name: 'Aperol Chenet', desc: 'Espumante JP. Chenet, Aperol, licor de lychee, zumo de limón y sirope.', price: '$16' }
      ],
      sangrias: [
        { name: 'Sangría Rosé', desc: 'Vino rosado, licor de lychee, jugo de fresa, sirope simple, ginger ale, frutas y limón. Copa $11 • Jarrón $30.', price: '$11 / $30' },
        { name: 'Sangría Tinto', desc: 'Vino tinto, licor Peachtree, cítricos frescos, sirope simple, ginger ale y frutas. Copa $10 • Jarrón $30.', price: '$10 / $30' },
        { name: 'Sangría White', desc: 'Vino blanco, licor de manzana verde, limón, club soda y frutas frescas. Copa $10 • Jarrón $30.', price: '$10 / $30' }
      ],
      mocktails: [
        { name: 'Passion Mule (Mocktail)', desc: 'Zumo de maracuyá, sirope de jengibre y romero, y top de soda de jengibre.', price: '$10' },
        { name: 'Cosmopolitan Mocktail', desc: 'Arándano fresco, sirope simple, zumo de limón y sirope de cereza silvestre.', price: '$10' },
        { name: 'Purple Lemonade', desc: 'Sirope de té butterfly pea flower, cordial de limón y top de soda simple.', price: '$10' }
      ],
      champagneEspumantes: [
        { name: 'Moët & Chandon Impérial Brut', desc: 'Champagne francés clásico de elegancia dorada. Botella.', price: '$160' },
        { name: 'Moët & Chandon Rosé Impérial', desc: 'Expresión radiante y seductora de frutos rojos. Botella.', price: '$190' },
        { name: 'Moët & Chandon Ice Impérial', desc: 'Formulado especialmente para servirse sobre cubos de hielo. Botella.', price: '$180' },
        { name: 'Veuve Clicquot Yellow Label Brut', desc: 'Fuerza y finura equilibradas con el pinot noir predominante. Botella.', price: '$150' },
        { name: 'Veuve Clicquot Rosé', desc: 'Champagne rosado con deliciosas notas de bayas silvestres. Botella.', price: '$200' },
        { name: 'Dom Pérignon Vintage', desc: 'El más emblemático prestige cuvée del mundo. Botella.', price: '$500' },
        { name: 'Dom Pérignon Rosé', desc: 'Exclusividad y audacia enológica suprema. Botella.', price: '$550' },
        { name: 'Mionetto Prosecco DOC (Treviso)', desc: 'Espumante italiano aromático y refrescante. Botella.', price: '$70' },
        { name: 'Martini Prosecco DOC', desc: 'Espumante de notas de manzana fresca y flores blancas. Botella.', price: '$80' },
        { name: 'Martini Sparkling Rosé', desc: 'Espumante floral y frutal vibrante. Botella.', price: '$90' }
      ],
      vinos: [
        { name: 'Tarapacá Reserva Merlot (Chile)', desc: 'Tinto chileno suave y frutal. Copa $8 • Botella $55.', price: '$8 / $55' },
        { name: 'Riscal Tinto Tempranillo (Francia)', desc: 'Tinto equilibrado con notas especiadas. Copa $8 • Botella $55.', price: '$8 / $55' },
        { name: 'Luigi Bosca Malbec (Mendoza, Argentina)', desc: 'Malbec maduro de gran elegancia y cuerpo. Copa $8 • Botella $55.', price: '$8 / $55' },
        { name: 'Protos Roble Tempranillo (Ribera del Duero)', desc: 'Tinto español con sutil paso por roble. Copa $8 • Botella $55.', price: '$8 / $55' },
        { name: 'El Enemigo Malbec (Argentina)', desc: 'Célebre malbec de Alejandro Vigil con toque de cabernet franc. Botella.', price: '$65' },
        { name: '19 Crimes Red Wine Blend (Australia)', desc: 'Blend audaz australiano de final suave y especiado. Botella.', price: '$55' },
        { name: 'Navarro Correas Colección Privada 3 Uvas', desc: 'Blend argentino de malbec, cabernet y syrah. Botella.', price: '$55' },
        { name: 'Catena Alta Malbec (Mendoza)', desc: 'Malbec de parcelas de altura de gran complejidad. Botella.', price: '$70' },
        { name: 'Tarapacá Gran Reserva Cabernet Sauvignon', desc: 'Cabernet con estructura firme y taninos maduros. Botella.', price: '$55' },
        { name: 'Cline Sonoma County Pinot Noir (USA)', desc: 'Pinot noir de clima fresco con fruta roja pura. Botella.', price: '$55' },
        { name: 'Protos 27 Tempranillo (España)', desc: 'Homenaje a la primera añada de 1927, vino de alta gama. Botella.', price: '$60' },
        { name: 'Beringer Founders Merlot (California)', desc: 'Merlot redondeado con toques de roble americano. Botella.', price: '$55' },
        { name: 'Tarapacá Reserva Chardonnay (Chile)', desc: 'Blanco cítrico con cuerpo cremoso. Copa $8 • Botella $55.', price: '$8 / $55' },
        { name: 'Principato Pinot Grigio (Italia)', desc: 'Blanco ligero y crujiente de las colinas del norte de Italia. Copa $8 • Botella $55.', price: '$8 / $55' },
        { name: 'Luigi Bosca Sauvignon Blanc (Argentina)', desc: 'Blanco fresco con notas herbáceas y lima. Copa $8 • Botella $55.', price: '$8 / $55' },
        { name: 'Marieta Albariño (Rías Baixas, España)', desc: 'Albariño con acidez vibrante y punto semiseco. Copa $8 • Botella $55.', price: '$8 / $55' },
        { name: 'Martín Códax Albariño (Galicia, España)', desc: 'Albariño insignia de Rías Baixas con notas salinas. Botella.', price: '$55' },
        { name: 'Catena Alta Chardonnay (Mendoza)', desc: 'Chardonnay de altura criado sobre lías en roble francés. Botella.', price: '$60' },
        { name: 'El Enemigo Chardonnay (Gualtallary)', desc: 'Chardonnay velo de flor con mineralidad asombrosa. Botella.', price: '$60' },
        { name: 'Santa Margherita Pinot Grigio (Italia)', desc: 'El pinot grigio de referencia internacional. Botella.', price: '$50' },
        { name: 'B&G Rosé D\'Anjou (Val de Loire, Francia)', desc: 'Rosado delicado y aromático. Copa $8 • Botella $55.', price: '$8 / $55' },
        { name: 'Gérard Bertrand Côte des Roses (Francia)', desc: 'Rosado mediterráneo floral con botella exclusiva fondo de rosa. Botella.', price: '$55' },
        { name: 'M de Minuty Rosé (Côtes de Provence)', desc: 'Rosado provenzal icónico, ligero, fresco y cristalino. Botella.', price: '$55' }
      ]
    }
  },
  {
    id: 'venue-la-rosalia',
    name: 'La Rosalía',
    h1Title: 'La Rosalía • Downtown Amador',
    shortName: 'La Rosalía',
    slug: 'la-rosalia',
    tagline: 'El epicentro del perreo, after parties y vibra urbana en Downtown Amador',
    category: 'Nightclub & After Party',
    area: 'Amador',
    city: 'Amador, Ciudad de Panamá',
    address: 'Downtown Amador, Calzada de Amador, Ciudad de Panamá',
    googleMapsUrl: 'https://maps.google.com/?q=La+Rosalia+Downtown+Amador+Panama',
    googleMapsQuery: 'La Rosalia, Downtown Amador, Panama',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=La+Rosalia+Downtown+Amador+Panama&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapPreview: '/images/venues/furia/tree_lounge.jpg',
    websiteUrl: 'https://mieventos.com',
    instagramUrl: 'https://www.instagram.com/larosaliapanama/',
    instagramHandle: '@larosaliapanama',
    phone: '+507 6200-8899',
    dinnerTime: null,
    partyTime: '10:00 PM - 04:00 AM',
    afterPartyTime: '04:00 AM - 08:00 AM',
    dressCode: 'Urban Chic / Nightlife Glam',
    parking: 'Self Parking (Estacionamiento amplio en Calzada de Amador, sin Valet)',
    ageLimit: '18+ Exclusivo',
    rating: '4.8',
    reviewCount: '215',
    coverImage: '/images/venues/furia/tree_lounge.jpg',
    seoTitle: 'La Rosalía Panamá | Nightclub & After Parties (4AM-8AM) en Downtown Amador',
    seoDescription: 'La Rosalía en Downtown Amador: epicentro urbano, coctelería, botellas VIP y los after parties oficiales de Panamá de 4:00 AM a 8:00 AM.',
    description: 'La Rosalía es el club referente de música urbana y after parties en la emblemática Calzada de Amador. No cuenta con servicio de cena; su propuesta está 100% enfocada en coctelería de autor, tragos y servicio de botellas VIP para sus noches de clubbing y sus reconocidos **After Parties oficiales de 4:00 AM a 8:00 AM**.\n\nCuenta con facilidad de Self Parking en el complejo de Downtown Amador.',
    vipPricing: VIP_TABLE_PRICING,
    faqs: {
      es: [
        {
          question: '¿La Rosalía ofrece servicio de cena?',
          answer: 'No, La Rosalía no cuenta con servicio de restaurante ni cena. Su barra está especializada exclusivamente en coctelería de autor, tragos y servicio de botellas VIP.'
        },
        {
          question: '¿Cuál es el horario de fiesta y de los After Parties?',
          answer: 'Las puertas abren a las 10:00 PM con la sesión principal de club hasta las 4:00 AM, y continúa con su horario exclusivo de After Party de 4:00 AM a 8:00 AM.'
        },
        {
          question: '¿Cuenta con servicio de Valet Parking?',
          answer: 'No hay servicio de Valet Parking. Se cuenta con amplia zona de Self Parking (estacionamiento propio) dentro del complejo de Downtown Amador.'
        },
        {
          question: '¿Dónde está ubicado La Rosalía?',
          answer: 'Se encuentra en Downtown Amador, sobre la Calzada de Amador (Causeway), Ciudad de Panamá.'
        },
        {
          question: '¿Cuál es el código de vestimenta en La Rosalía?',
          answer: 'El dress code es Urban Chic / Nightlife Glam. Estilo urbano sofisticado y prendas de fiesta.'
        }
      ],
      en: [
        {
          question: 'Does La Rosalía offer dinner service?',
          answer: 'No, La Rosalía does not serve dinner or food. The venue specializes exclusively in signature cocktails, mixed drinks, and VIP bottle service.'
        },
        {
          question: 'What are the party and After Party hours?',
          answer: 'Main club doors open at 10:00 PM until 4:00 AM, followed by the official After Party session from 4:00 AM to 8:00 AM.'
        },
        {
          question: 'Is valet parking available?',
          answer: 'There is no Valet service. Dedicated Self Parking is available throughout the Downtown Amador complex.'
        },
        {
          question: 'Where is La Rosalía located?',
          answer: 'Located in Downtown Amador on the Amador Causeway, Panama City.'
        },
        {
          question: 'What is the dress code at La Rosalía?',
          answer: 'The dress code is Urban Chic / Nightlife Glam. High-fashion urban streetwear and nightlife attire.'
        }
      ]
    },
    features: [
      'After Parties oficiales de 4:00 AM a 8:00 AM en Downtown Amador',
      'Sin servicio de cena — 100% enfocado en coctelería, tragos y botellas VIP',
      'Self Parking amplio y cómodo en Calzada de Amador',
      'Sistema de sonido envolvente y visuales de música urbana',
      'Mesas VIP y servicio preferencial de anfitriones',
      'Acceso oficial y reservas con ARRIVE'
    ],
    gallery: [
      {
        url: '/images/venues/furia/tree_lounge.jpg',
        title: 'Pista Central & Experiencia Club',
        category: 'Club Dancefloor'
      },
      {
        url: '/images/venues/furia/club_lights.jpg',
        title: 'Sistema de Iluminación & DJs',
        category: 'Lighting & Sound'
      },
      {
        url: '/images/venues/furia/vip_bottles.jpg',
        title: 'Zona de Mesas VIP & Servicio de Botellas',
        category: 'VIP Lounge'
      },
      {
        url: '/images/venues/terraplen/ambiance.jpg',
        title: 'Atmósfera Nocturna en Amador',
        category: 'Nightlife Ambiance'
      }
    ],
    menu: {
      cocteleria: [
        { name: 'Rosalía Signature Cocktail', desc: 'Ginebra infusionada con frutos rojos, tónica premium y toque cítrico.', price: '$12' },
        { name: 'Perreo Mule', desc: 'Vodka premium, ginger beer picante, zumo de lima y menta fresca.', price: '$12' },
        { name: 'Amador Sunset Trago', desc: 'Ron añejo, maracuyá fresca, sirope de agave y prosecco.', price: '$13' },
        { name: 'Spicy Paloma', desc: 'Tequila blanco, toronja rosada, jugo de lima, sal volcánica y chile tajín.', price: '$12' }
      ],
      tragos: [
        { name: 'Gin & Tonic Premium', desc: 'Tanqueray Ten con tónica Fever Tree y botánicos frescos.', price: '$12' },
        { name: 'Whisky Highball', desc: 'Johnnie Walker Black Label con agua con gas y twist de limón.', price: '$12' },
        { name: 'Vodka Red Bull', desc: 'Grey Goose con Red Bull Energy regular o Sugarfree.', price: '$14' }
      ],
      botellasVip: [
        { name: 'Tequila Don Julio 70 (Botella)', desc: 'Tequila añejo cristalino 100% agave azul con 6 mixers.', price: '$180' },
        { name: 'Tequila Clase Azul Reposado (Botella)', desc: 'Tequila ultra premium en botella de cerámica artesanal.', price: '$350' },
        { name: 'Whisky Johnnie Walker Black Label (Botella)', desc: 'Mezcla escocesa de 12 años servida con mixers y hielo.', price: '$120' },
        { name: 'Whisky Buchanan’s 18 Special Reserve', desc: 'Whisky de 18 años servido con hielo cristalino y mixers.', price: '$190' },
        { name: 'Vodka Grey Goose (Botella)', desc: 'Vodka francés destilado de trigo de invierno con mixers.', price: '$130' },
        { name: 'Champagne Moët & Chandon Brut Impérial', desc: 'Champagne francés clásico para celebraciones VIP.', price: '$160' }
      ]
    }
  }
];

export const getVenueGoogleMapsEmbedUrl = (venue) => {
  if (!venue) return '';
  if (venue.googleMapsEmbedUrl) return venue.googleMapsEmbedUrl;
  const query = venue.googleMapsQuery || `${venue.name || ''}, ${venue.address || 'Panamá'}`;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
};
