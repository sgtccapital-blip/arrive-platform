// =========================================================================
// ARRIVE PLATFORM — PROGRAMMATIC SEO & ANTI-THIN CONTENT ENGINE
// Evaluates real inventory thresholds, temporal groupings and editorial intros
// =========================================================================

import { toSlug } from '../data/seoModels';

/**
 * Determines if a programmatic landing page meets the threshold to be indexed
 */
export const evaluateIndexability = ({
  itemCount = 0,
  hasCustomIntro = false,
  isCoreHub = false
}) => {
  // Core category hubs (e.g. /panama/nightlife/) are always indexed
  if (isCoreHub) {
    return {
      indexable: true,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1'
    };
  }

  // Programmatic combinations with 0 items MUST be noindexed to prevent thin content
  if (itemCount === 0) {
    return {
      indexable: false,
      robots: 'noindex, follow'
    };
  }

  // If there is inventory and editorial context, index it
  return {
    indexable: true,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1'
  };
};

/**
 * Filter events by temporal criteria
 */
export const filterEventsByTemporal = (events = [], filterType = 'all') => {
  if (filterType === 'all') return events;

  const now = new Date();
  const currentDayOfWeek = now.getDay(); // 0 = Sun, 5 = Fri, 6 = Sat

  if (filterType === 'today') {
    // In demo dataset, match active day or return featured upcoming
    return events.slice(0, 2);
  }

  if (filterType === 'tomorrow') {
    return events.slice(1, 3);
  }

  if (filterType === 'this-weekend' || filterType === 'weekend') {
    // Filter events on Thursday, Friday, Saturday, Sunday
    return events.filter(e => {
      const day = (e.dayOfWeek || '').toLowerCase();
      return day.includes('jueves') || day.includes('viernes') || day.includes('sabado') || day.includes('domingo');
    });
  }

  return events;
};

/**
 * Filter events by music genre
 */
export const filterEventsByGenre = (events = [], genreSlug = '') => {
  if (!genreSlug) return events;
  const cleanGenre = genreSlug.replace(/-/g, ' ').toLowerCase();

  return events.filter(e => {
    const genres = (e.genre || e.musicGenres || []).toString().toLowerCase();
    const title = (e.title || '').toLowerCase();
    const sub = (e.subtitle || '').toLowerCase();
    return genres.includes(cleanGenre) || title.includes(cleanGenre) || sub.includes(cleanGenre);
  });
};

/**
 * Filter venues by neighborhood / area
 */
export const filterVenuesByArea = (venues = [], areaSlug = '') => {
  if (!areaSlug) return venues;
  const target = toSlug(areaSlug);

  return venues.filter(v => {
    const area = toSlug(v.area || v.neighborhood || '');
    return area.includes(target) || (target.includes('casco') && area.includes('casco'));
  });
};
