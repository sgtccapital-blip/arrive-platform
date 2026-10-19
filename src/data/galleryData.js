// =========================================================================
// ARRIVE PLATFORM — GIRLS & NIGHTLIFE PHOTO GALLERY DATA
// High-resolution photography hub for Arrive models and party guests
// =========================================================================

export const GALLERY_ALBUMS = [
  {
    id: 'all',
    name: {
      es: 'Todos los Álbumes',
      en: 'All Albums'
    },
    count: 24,
    badge: 'ALL'
  },
  {
    id: 'furia-weekend',
    name: {
      es: 'Furia Club • VIP Lounge & Arcángel Weekend',
      en: 'Furia Club • VIP Lounge & Arcángel Weekend'
    },
    venue: 'Furia Club',
    venueSlug: 'furia-club',
    date: 'Octubre 2026',
    count: 6,
    cover: '/images/gallery/arrive-models-furia-vip.jpg',
    badge: 'TRENDING'
  },
  {
    id: 'photocall-redcarpet',
    name: {
      es: 'Red Carpet Photocall • Arrive Models',
      en: 'Red Carpet Photocall • Arrive Models'
    },
    venue: 'Arrive Nightlife',
    venueSlug: 'furia-club',
    date: 'Octubre 2026',
    count: 4,
    cover: '/images/gallery/arrive-models-redcarpet-photocall.jpg',
    badge: 'EXCLUSIVO'
  },
  {
    id: 'terraplen-sunset',
    name: {
      es: 'Terraplén • Rooftop Sunset & Boiler Sessions',
      en: 'Terraplén • Rooftop Sunset & Boiler Sessions'
    },
    venue: 'Terraplén Rooftop',
    venueSlug: 'terraplen-rooftop',
    date: 'Octubre 2026',
    count: 5,
    cover: '/images/gallery/arrive-models-rooftop-casco.jpg',
    badge: 'HOTSPOT'
  },
  {
    id: 'piano-bar-ladies',
    name: {
      es: 'Piano Bar • Ladies Night & Reggaetón Society',
      en: 'Piano Bar • Ladies Night & Reggaetón Society'
    },
    venue: 'Piano Bar',
    venueSlug: 'piano-bar',
    date: 'Octubre 2026',
    count: 5,
    cover: '/images/gallery/champagne-vip-toast.jpg',
    badge: 'LADIES NIGHT'
  },
  {
    id: 'cielo-skyline',
    name: {
      es: 'Cielo Casco • Skyline Terrace & Late Beats',
      en: 'Cielo Casco • Skyline Terrace & Late Beats'
    },
    venue: 'Cielo Rooftop',
    venueSlug: 'cielo-rooftop',
    date: 'Septiembre 2026',
    count: 4,
    cover: '/images/gallery/rooftop-cocktail-night.jpg',
    badge: 'ROOFTOP'
  }
];

export const GALLERY_TAGS = [
  { id: 'all', es: 'Todas las Fotos', en: 'All Photos' },
  { id: 'models', es: 'Chicas & Modelos', en: 'Girls & Models' },
  { id: 'vip', es: 'Mesas VIP & Moët', en: 'VIP Tables & Bottles' },
  { id: 'photocall', es: 'Photocall & Red Carpet', en: 'Photocall & Red Carpet' },
  { id: 'rooftop', es: 'Rooftops & Atardecer', en: 'Rooftops & Sunset' },
  { id: 'dancefloor', es: 'Fiesta & Dancefloor', en: 'Party & Dancefloor' }
];

export const GALLERY_PHOTOS = [
  {
    id: 'photo-01',
    albumId: 'furia-weekend',
    category: 'models',
    tags: ['Chicas', 'VIP', 'Furia', 'Moët & Chandon'],
    title: {
      es: 'Brindis VIP Arrive Models en Furia Club',
      en: 'Arrive Models VIP Toast at Furia Club'
    },
    subtitle: {
      es: 'Mesa Presidencial VIP • Noche Arcángel Weekend',
      en: 'Presidential VIP Table • Arcángel Weekend Night'
    },
    venue: 'Furia Club',
    venueSlug: 'furia-club',
    date: '04 Oct 2026',
    image: '/images/gallery/arrive-models-furia-vip.jpg',
    filename: 'ARRIVE-GIRLS-Furia-VIP-01.jpg',
    resolution: '4K Ultra HD',
    aspect: 'portrait',
    featured: true,
    likes: 184,
    photographer: 'ARRIVE Visual Team',
    instagramTag: '@arrivemodels @furiapanama'
  },
  {
    id: 'photo-02',
    albumId: 'photocall-redcarpet',
    category: 'photocall',
    tags: ['Photocall', 'Red Carpet', 'Modelos', 'Arrive VIP'],
    title: {
      es: 'Arrive Models Red Carpet & Official Photocall',
      en: 'Arrive Models Red Carpet & Official Photocall'
    },
    subtitle: {
      es: 'Entrada Exclusiva Nightclub Panama',
      en: 'Nightclub Exclusive VIP Entrance'
    },
    venue: 'Arrive Nightlife',
    venueSlug: 'furia-club',
    date: '04 Oct 2026',
    image: '/images/gallery/arrive-models-redcarpet-photocall.jpg',
    filename: 'ARRIVE-GIRLS-Photocall-RedCarpet-02.jpg',
    resolution: '4K Ultra HD',
    aspect: 'portrait',
    featured: true,
    likes: 215,
    photographer: 'ARRIVE Visual Team',
    instagramTag: '@arrivemodels'
  },
  {
    id: 'photo-03',
    albumId: 'terraplen-sunset',
    category: 'rooftop',
    tags: ['Rooftop', 'Sunset', 'Casco Viejo', 'Chicas'],
    title: {
      es: 'Golden Hour Cocktail Session en Terraplén Rooftop',
      en: 'Golden Hour Cocktail Session at Terraplén Rooftop'
    },
    subtitle: {
      es: 'Terraza Casco Viejo con vista panorámica a la bahía',
      en: 'Casco Viejo rooftop overlooking Panama City skyline'
    },
    venue: 'Terraplén Rooftop',
    venueSlug: 'terraplen-rooftop',
    date: '03 Oct 2026',
    image: '/images/gallery/arrive-models-rooftop-casco.jpg',
    filename: 'ARRIVE-GIRLS-Terraplen-Sunset-03.jpg',
    resolution: '4K Ultra HD',
    aspect: 'portrait',
    featured: true,
    likes: 198,
    photographer: 'ARRIVE Visual Team',
    instagramTag: '@arrivemodels @terraplenpanama'
  },
  {
    id: 'photo-04',
    albumId: 'furia-weekend',
    category: 'vip',
    tags: ['VIP', 'Bottles', 'Dom Pérignon', 'Furia'],
    title: {
      es: 'Bottle Service & Sparklers Parade',
      en: 'Bottle Service & Sparklers Parade'
    },
    subtitle: {
      es: 'Desfile de botellas premium en Zona Diamante Furia',
      en: 'Premium bottle show at Diamond VIP Zone Furia'
    },
    venue: 'Furia Club',
    venueSlug: 'furia-club',
    date: '04 Oct 2026',
    image: '/images/gallery/vip-bottle-parade.jpg',
    filename: 'ARRIVE-VIP-Bottle-Parade-04.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 122,
    photographer: 'Furia Resident Photographer',
    instagramTag: '@furiapanama'
  },
  {
    id: 'photo-05',
    albumId: 'piano-bar-ladies',
    category: 'models',
    tags: ['Ladies Night', 'Piano Bar', 'Cocktails', 'Chicas'],
    title: {
      es: 'Ladies Night Cheers en Piano Bar Bella Vista',
      en: 'Ladies Night Cheers at Piano Bar Bella Vista'
    },
    subtitle: {
      es: 'Open Bar para Chicas Arrive & Coctelería de autor',
      en: 'Open Bar for Arrive Girls & signature mixology'
    },
    venue: 'Piano Bar',
    venueSlug: 'piano-bar',
    date: '02 Oct 2026',
    image: '/images/gallery/girls-cheers-cocktails.jpg',
    filename: 'ARRIVE-GIRLS-PianoBar-LadiesCheers-05.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: true,
    likes: 167,
    photographer: 'Piano Bar Visuals',
    instagramTag: '@pianobarpanama @arrivemodels'
  },
  {
    id: 'photo-06',
    albumId: 'terraplen-sunset',
    category: 'dancefloor',
    tags: ['Confetti', 'Dancefloor', 'Casco Viejo', 'Fiesta'],
    title: {
      es: 'Confetti Explosion & Late Beats Casco',
      en: 'Confetti Explosion & Late Beats Casco'
    },
    subtitle: {
      es: 'Clímax musical en la pista central de Terraplén',
      en: 'Peak musical energy on the main dancefloor'
    },
    venue: 'Terraplén Rooftop',
    venueSlug: 'terraplen-rooftop',
    date: '03 Oct 2026',
    image: '/images/gallery/casco-party-confetti.jpg',
    filename: 'ARRIVE-Party-Terraplen-Confetti-06.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 143,
    photographer: 'ARRIVE Visual Team',
    instagramTag: '@terraplenpanama'
  },
  {
    id: 'photo-07',
    albumId: 'piano-bar-ladies',
    category: 'vip',
    tags: ['Champagne', 'Moët', 'VIP', 'Cheers'],
    title: {
      es: 'Champagne Toast VIP Suite',
      en: 'Champagne Toast VIP Suite'
    },
    subtitle: {
      es: 'Copas de Moët & Chandon Rosé para el grupo de modelos',
      en: 'Moët & Chandon Rosé toast for Arrive models group'
    },
    venue: 'Piano Bar',
    venueSlug: 'piano-bar',
    date: '02 Oct 2026',
    image: '/images/gallery/champagne-vip-toast.jpg',
    filename: 'ARRIVE-VIP-Champagne-Toast-07.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 156,
    photographer: 'Piano Bar Visuals',
    instagramTag: '@pianobarpanama'
  },
  {
    id: 'photo-08',
    albumId: 'furia-weekend',
    category: 'models',
    tags: ['Fashion', 'Outfits', 'Chicas', 'Nightlife'],
    title: {
      es: 'Haute Nightlife Fashion • Models Glam',
      en: 'Haute Nightlife Fashion • Models Glam'
    },
    subtitle: {
      es: 'Looks deslumbrantes en el salón principal de Furia',
      en: 'Stunning evening fits in the main hall of Furia'
    },
    venue: 'Furia Club',
    venueSlug: 'furia-club',
    date: '04 Oct 2026',
    image: '/images/gallery/models-fashion-party.jpg',
    filename: 'ARRIVE-GIRLS-Fashion-Glam-08.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'portrait',
    featured: true,
    likes: 189,
    photographer: 'ARRIVE Visual Team',
    instagramTag: '@arrivemodels'
  },
  {
    id: 'photo-09',
    albumId: 'cielo-skyline',
    category: 'rooftop',
    tags: ['Cielo', 'Skyline', 'Casco', 'Cocktails'],
    title: {
      es: 'Rooftop Lights & Panama Skyline Night',
      en: 'Rooftop Lights & Panama Skyline Night'
    },
    subtitle: {
      es: 'Vistas panorámicas bajo la luna de Casco Antiguo',
      en: 'Panoramic views under the moonlight of Casco Antiguo'
    },
    venue: 'Cielo Rooftop',
    venueSlug: 'cielo-rooftop',
    date: '28 Sep 2026',
    image: '/images/gallery/rooftop-cocktail-night.jpg',
    filename: 'ARRIVE-Cielo-Skyline-Night-09.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 135,
    photographer: 'Cielo Resident Crew',
    instagramTag: '@cielorooftop'
  },
  {
    id: 'photo-10',
    albumId: 'furia-weekend',
    category: 'dancefloor',
    tags: ['Neon', 'Club Lights', 'Furia', 'Party'],
    title: {
      es: 'Club Lights & Laser Atmosphere',
      en: 'Club Lights & Laser Atmosphere'
    },
    subtitle: {
      es: 'Show de iluminación inmersivo y visuales LED',
      en: 'Immersive lighting show and LED visuals'
    },
    venue: 'Furia Club',
    venueSlug: 'furia-club',
    date: '04 Oct 2026',
    image: '/images/venues/furia/club_lights.jpg',
    filename: 'ARRIVE-Furia-ClubLights-10.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 110,
    photographer: 'Furia Visuals',
    instagramTag: '@furiapanama'
  },
  {
    id: 'photo-11',
    albumId: 'photocall-redcarpet',
    category: 'models',
    tags: ['Chicas', 'Modelos', 'Lights', 'Smile'],
    title: {
      es: 'Portrait Session bajo las Luces Neón',
      en: 'Portrait Session under Neon Glow'
    },
    subtitle: {
      es: 'Retratos editoriales con iluminación de pasarela',
      en: 'Editorial portraits with runway lighting'
    },
    venue: 'Arrive Nightlife',
    venueSlug: 'furia-club',
    date: '04 Oct 2026',
    image: '/images/gallery/models-club-lights.jpg',
    filename: 'ARRIVE-GIRLS-Neon-Portrait-11.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 172,
    photographer: 'ARRIVE Visual Team',
    instagramTag: '@arrivemodels'
  },
  {
    id: 'photo-12',
    albumId: 'terraplen-sunset',
    category: 'rooftop',
    tags: ['Sunset', 'Casco', 'Golden Hour', 'Terraplén'],
    title: {
      es: 'Casco Golden Hour & Sunset Vibes',
      en: 'Casco Golden Hour & Sunset Vibes'
    },
    subtitle: {
      es: 'Comienzo del tardeo con la caída del sol en Casco',
      en: 'Beginning of sunset sessions in historic Casco'
    },
    venue: 'Terraplén Rooftop',
    venueSlug: 'terraplen-rooftop',
    date: '03 Oct 2026',
    image: '/images/gallery/casco-golden-hour.jpg',
    filename: 'ARRIVE-Terraplen-GoldenHour-12.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 147,
    photographer: 'Terraplén Visuals',
    instagramTag: '@terraplenpanama'
  },
  {
    id: 'photo-13',
    albumId: 'furia-weekend',
    category: 'dancefloor',
    tags: ['DJ Booth', 'Energy', 'Arcángel', 'Furia'],
    title: {
      es: 'DJ Booth Climax & Peak Energy',
      en: 'DJ Booth Climax & Peak Energy'
    },
    subtitle: {
      es: 'El set estelar de la noche con la sala llena',
      en: 'Star DJ set of the night with packed house'
    },
    venue: 'Furia Club',
    venueSlug: 'furia-club',
    date: '04 Oct 2026',
    image: '/images/gallery/nightlife-dj-energy.jpg',
    filename: 'ARRIVE-DJ-Booth-Energy-13.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 129,
    photographer: 'ARRIVE Visual Team',
    instagramTag: '@arrivemodels @furiapanama'
  },
  {
    id: 'photo-14',
    albumId: 'cielo-skyline',
    category: 'dancefloor',
    tags: ['Party', 'Cielo Rooftop', 'Beats', 'Casco'],
    title: {
      es: 'Cielo Rooftop Night Sessions',
      en: 'Cielo Rooftop Night Sessions'
    },
    subtitle: {
      es: 'Pista abierta bajo las estrellas de Casco Antiguo',
      en: 'Open dancefloor beneath the stars of Casco Antiguo'
    },
    venue: 'Cielo Rooftop',
    venueSlug: 'cielo-rooftop',
    date: '28 Sep 2026',
    image: '/images/venues/cielo/party.jpg',
    filename: 'ARRIVE-Cielo-Party-14.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 114,
    photographer: 'Cielo Resident Crew',
    instagramTag: '@cielorooftop'
  },
  {
    id: 'photo-15',
    albumId: 'piano-bar-ladies',
    category: 'vip',
    tags: ['Piano Bar', 'Ambiance', 'Cocktails', 'Night'],
    title: {
      es: 'Piano Bar Velvet Lounge & Cocktails',
      en: 'Piano Bar Velvet Lounge & Cocktails'
    },
    subtitle: {
      es: 'Ambiente exclusivo en el lounge aterciopelado',
      en: 'Exclusive mood in the velvet lounge room'
    },
    venue: 'Piano Bar',
    venueSlug: 'piano-bar',
    date: '02 Oct 2026',
    image: '/images/venues/pianobar/ambiance.jpg',
    filename: 'ARRIVE-PianoBar-Ambiance-15.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 138,
    photographer: 'Piano Bar Visuals',
    instagramTag: '@pianobarpanama'
  },
  {
    id: 'photo-16',
    albumId: 'furia-weekend',
    category: 'vip',
    tags: ['Sparklers', 'Dancefloor', 'VIP', 'Furia'],
    title: {
      es: 'VIP Sparklers Celebration on Dancefloor',
      en: 'VIP Sparklers Celebration on Dancefloor'
    },
    subtitle: {
      es: 'Luces de bengala iluminando el reservado central',
      en: 'Sparklers lighting up the center VIP booth'
    },
    venue: 'Furia Club',
    venueSlug: 'furia-club',
    date: '04 Oct 2026',
    image: '/images/gallery/vip-dancefloor-sparklers.jpg',
    filename: 'ARRIVE-VIP-Sparklers-16.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 161,
    photographer: 'Furia Visuals',
    instagramTag: '@furiapanama'
  },
  {
    id: 'photo-17',
    albumId: 'terraplen-sunset',
    category: 'dancefloor',
    tags: ['Terraplén', 'Ambiance', 'Casco', 'Beats'],
    title: {
      es: 'Terraplén Open-Air Terrace Energy',
      en: 'Terraplén Open-Air Terrace Energy'
    },
    subtitle: {
      es: 'Bailando al aire libre con la brisa marina del Casco',
      en: 'Dancing open-air with the marine breeze of Casco'
    },
    venue: 'Terraplén Rooftop',
    venueSlug: 'terraplen-rooftop',
    date: '03 Oct 2026',
    image: '/images/venues/terraplen/ambiance.jpg',
    filename: 'ARRIVE-Terraplen-Ambiance-17.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 125,
    photographer: 'Terraplén Crew',
    instagramTag: '@terraplenpanama'
  },
  {
    id: 'photo-18',
    albumId: 'photocall-redcarpet',
    category: 'photocall',
    tags: ['Lasers', 'Party', 'Festival', 'Show'],
    title: {
      es: 'Laser Show & Midnight Celebration',
      en: 'Laser Show & Midnight Celebration'
    },
    subtitle: {
      es: 'Efectos visuales sincronizados a medianoche',
      en: 'Synchronized visual lighting at midnight'
    },
    venue: 'Arrive Nightlife',
    venueSlug: 'furia-club',
    date: '04 Oct 2026',
    image: '/images/gallery/laser-lights-party.jpg',
    filename: 'ARRIVE-Laser-Show-18.jpg',
    resolution: 'Full HD 1080p',
    aspect: 'landscape',
    featured: false,
    likes: 119,
    photographer: 'ARRIVE Visual Team',
    instagramTag: '@arrivemodels'
  }
];

/**
 * Downloads a single image directly with clean high-res filename
 */
export const downloadPhotoFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'ARRIVE-Photo-HD.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    return true;
  } catch (err) {
    console.error('Download error, falling back to direct anchor:', err);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'ARRIVE-Photo-HD.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false;
  }
};
