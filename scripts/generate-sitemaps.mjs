// =========================================================================
// ARRIVE PLATFORM — AUTOMATED SITEMAP GENERATOR
// Produces sitemap-index.xml and modular XML sitemaps for Google Search
// =========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_EVENTS } from '../src/data/initialData.js';
import { INITIAL_VENUES } from '../src/data/venuesData.js';
import { BLOG_POSTS } from '../src/data/blogData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const BASE_URL = 'https://arrivepanama.com';
const TODAY_ISO = new Date().toISOString().split('T')[0];

// Static core routes
const CORE_HUBS = [
  '',
  'panama/nightlife/',
  'panama/clubs/',
  'panama/rooftops/',
  'panama/casco-antiguo/',
  'panama/venues/',
  'venues/',
  'panama/concierge/',
  'concierge/',
  'panama/parties/',
  'panama/events/',
  'panama/restaurants/',
  'blog/',
  'panama/casco-viejo/nightlife/',
  'panama/casco-viejo/clubs/',
  'panama/casco-viejo/rooftops/',
  'panama/casco-viejo/restaurants/',
  'panama/events/today/',
  'panama/events/tomorrow/',
  'panama/events/weekend/',
  'panama/events/this-weekend/',
  'explore/',
  'directorio/',
  'cookies/',
  'privacy/',
  'terms-and-conditions/',
  'work-with-us/',
  'whistleblowing/',
  'contact-us/',
  'press/'
];

// Slugs for canonical venues
const VENUE_SLUGS = INITIAL_VENUES.map(v => v.slug).filter(Boolean);

// Slugs for canonical events
// Read from the app's data so the sitemap always matches the live cartelera.
// Slugs with spaces or other unsafe characters are skipped (they'd be broken URLs).
const EVENT_SLUGS = INITIAL_EVENTS
  .filter(e => e.indexable !== false && /^[a-z0-9-]+$/.test(e.slug || ''))
  .map(e => e.slug);

// Slugs for restaurant dining
const RESTAURANT_SLUGS = [
  'furia-club',
  'piano-bar',
  'terraplen-rooftop',
  'primavera-panama',
  'cielo-rooftop'
].filter(slug => VENUE_SLUGS.includes(slug));

// Slugs for blog articles
const BLOG_SLUGS = BLOG_POSTS.map(p => p.slug);

const buildUrlXml = ({ path, priority = '0.8', changefreq = 'weekly' }) => {
  const esUrl = `${BASE_URL}/es/${path}`;
  const enUrl = `${BASE_URL}/en/${path}`;

  return `  <url>
    <loc>${esUrl}</loc>
    <lastmod>${TODAY_ISO}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>
  </url>
  <url>
    <loc>${enUrl}</loc>
    <lastmod>${TODAY_ISO}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>
  </url>`;
};

const wrapUrlset = (urlsXml) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXml}
</urlset>
`;

export const generateAllSitemaps = () => {
  console.log('🗺️  Generando sitemaps XML modulares para ARRIVE...');

  // 1. Pages Sitemap
  const pagesXml = CORE_HUBS.map(hubPath => buildUrlXml({
    path: hubPath ? `${hubPath}` : '',
    priority: hubPath === '' ? '1.0' : '0.9',
    changefreq: 'daily'
  })).join('\n');
  const sitemapPages = wrapUrlset(pagesXml);

  // 2. Events Sitemap
  const eventsXml = EVENT_SLUGS.map(slug => buildUrlXml({
    path: `events/${slug}/`,
    priority: '0.8',
    changefreq: 'weekly'
  })).join('\n');
  const sitemapEvents = wrapUrlset(eventsXml);

  // 3. Venues Sitemap
  const venuesXml = VENUE_SLUGS.map(slug => buildUrlXml({
    path: `venues/${slug}/`,
    priority: '0.8',
    changefreq: 'weekly'
  })).join('\n');
  const sitemapVenues = wrapUrlset(venuesXml);

  // 4. Restaurants Sitemap
  const restaurantsXml = RESTAURANT_SLUGS.map(slug => buildUrlXml({
    path: `restaurants/${slug}/`,
    priority: '0.8',
    changefreq: 'weekly'
  })).join('\n');
  const sitemapRestaurants = wrapUrlset(restaurantsXml);

  // 5. Blog Sitemap
  const blogXml = BLOG_SLUGS.map(slug => buildUrlXml({
    path: `blog/${slug}/`,
    priority: '0.8',
    changefreq: 'weekly'
  })).join('\n');
  const sitemapBlog = wrapUrlset(blogXml);

  // 6. Sitemap Index
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${TODAY_ISO}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-events.xml</loc>
    <lastmod>${TODAY_ISO}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-venues.xml</loc>
    <lastmod>${TODAY_ISO}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-restaurants.xml</loc>
    <lastmod>${TODAY_ISO}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>${TODAY_ISO}</lastmod>
  </sitemap>
</sitemapindex>
`;

  // Write files to public/
  const filesToWrite = [
    { name: 'sitemap.xml', content: sitemapIndex },
    { name: 'sitemap-pages.xml', content: sitemapPages },
    { name: 'sitemap-events.xml', content: sitemapEvents },
    { name: 'sitemap-venues.xml', content: sitemapVenues },
    { name: 'sitemap-restaurants.xml', content: sitemapRestaurants },
    { name: 'sitemap-blog.xml', content: sitemapBlog }
  ];

  filesToWrite.forEach(({ name, content }) => {
    fs.writeFileSync(path.join(PUBLIC_DIR, name), content, 'utf-8');
    if (fs.existsSync(DIST_DIR)) {
      fs.writeFileSync(path.join(DIST_DIR, name), content, 'utf-8');
    }
  });

  console.log('✅ Sitemaps generados exitosamente en public/ y dist/');
};

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllSitemaps();
}
