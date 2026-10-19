import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { EventCard } from './components/EventCard';
import { EventDetailModal } from './components/EventDetailModal';
import { BookVipModal } from './components/BookVipModal';
import { MenuDrawer } from './components/MenuDrawer';
import { CouponModal } from './components/CouponModal';
import { MyPassesModal } from './components/MyPassesModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { Calendar, CheckCircle, Info } from 'lucide-react';

// Full-page views (SEO-first)
import { VenuePage } from './views/VenuePage';
import { VenuesListPage } from './views/VenuesListPage';
import { ConciergePage } from './views/ConciergePage';
import { BlogListPage } from './views/BlogListPage';
import { BlogPostPage } from './views/BlogPostPage';
import { DirectoryPage } from './views/DirectoryPage';
import { InfoPage } from './views/InfoPage';
import { GalleryPage } from './views/GalleryPage';
import { getBlogPostBySlug } from './data/blogData';
import { INFO_PAGES } from './data/infoPagesData';

import { useRouter } from './router/useRouter';
import { updateHeadMetadata } from './seo/HeadManager';
import { 
  SEO_CATEGORY_HUBS, 
  enrichEventSeo, 
  enrichVenueSeo,
  toSlug,
  BASE_CANONICAL_URL 
} from './data/seoModels';
import { getAlternatePath } from './seo/i18n';
import { VENUES_FAQS, CONCIERGE_FAQS } from './data/faqData';

export const App = () => {
  const { 
    events, 
    venues,
    filteredEvents, 
    notification,
    selectedEvent,
    setSelectedEvent,
    setSelectedCategory,
    setSelectedDay,
    setLocale
  } = useApp();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { currentPath, route, navigate } = useRouter();

  const locale = route.locale || 'es';
  const isEs = locale === 'es';
  const alternateEsUrl = getAlternatePath(currentPath, 'es');
  const alternateEnUrl = getAlternatePath(currentPath, 'en');

  // Synchronize locale state across entire app context
  useEffect(() => {
    if (setLocale) {
      setLocale(locale);
    }
  }, [locale, setLocale]);

  // Active category hub if route matches a category or temporal landing
  const activeHub = (route.type === 'hub' || route.type === 'temporal_hub') 
    ? SEO_CATEGORY_HUBS[route.hubKey] 
    : null;

  // Determine current page type
  const isVenuePage = route.type === 'venue';
  const isVenuesListPage = route.type === 'venues_list';
  const isConciergePage = route.type === 'concierge';
  const isBlogListPage = route.type === 'blog_list';
  const isBlogPostPage = route.type === 'blog_post';
  const isDirectoryPage = route.type === 'directory';
  const isInfoPage = route.type === 'info_page';
  const isGalleryPage = route.type === 'gallery';
  const isHomePage = !isVenuePage && !isVenuesListPage && !isConciergePage && !isBlogListPage && !isBlogPostPage && !isDirectoryPage && !isInfoPage && !isGalleryPage;

  // Synchronize route state with head metadata
  useEffect(() => {
    if (route.type === 'event' && route.params?.eventSlug) {
      const targetSlug = route.params.eventSlug;
      const foundEvent = events.find(e => 
        e.slug === targetSlug || 
        toSlug(e.title || e.name) === targetSlug
      );

      if (foundEvent) {
        if (!selectedEvent || selectedEvent.id !== foundEvent.id) {
          setSelectedEvent(foundEvent);
        }

        const enriched = enrichEventSeo(foundEvent, locale);
        updateHeadMetadata({
          title: enriched.seoTitle,
          description: enriched.seoDescription,
          canonicalUrl: `${BASE_CANONICAL_URL}/${locale}/events/${enriched.slug}/`,
          pathname: `/${locale}/events/${enriched.slug}/`,
          locale,
          ogType: 'article',
          ogImage: `${BASE_CANONICAL_URL}${foundEvent.image || '/images/right-nav.avif'}`,
          breadcrumbs: [
            { name: locale === 'es' ? 'Inicio' : 'Home', path: `/${locale}/` },
            { name: locale === 'es' ? 'Eventos' : 'Events', path: `/${locale}/panama/events/` },
            { name: foundEvent.title, path: `/${locale}/events/${enriched.slug}/` }
          ],
          mainEntity: {
            '@type': 'Event',
            name: foundEvent.title,
            description: enriched.seoDescription,
            startDate: foundEvent.eventDate,
            image: `${BASE_CANONICAL_URL}${foundEvent.image}`,
            location: {
              '@type': 'Place',
              name: foundEvent.location || 'Ciudad de Panamá',
              address: {
                '@type': 'PostalAddress',
                streetAddress: foundEvent.address || 'PH La Trona, Calle Rogelio Alfaro',
                addressLocality: 'Ciudad de Panamá',
                addressCountry: 'PA'
              }
            }
          }
        });
      }
    } else if (isVenuePage && route.params?.venueSlug) {
      const targetSlug = route.params.venueSlug;
      const foundVenue = venues.find(v => 
        v.slug === targetSlug || 
        toSlug(v.shortName || v.name) === targetSlug
      );

      if (foundVenue) {
        const enriched = enrichVenueSeo(foundVenue, locale);
        updateHeadMetadata({
          title: enriched.seoTitle,
          description: enriched.seoDescription,
          canonicalUrl: `${BASE_CANONICAL_URL}/${locale}/venues/${enriched.slug}/`,
          pathname: `/${locale}/venues/${enriched.slug}/`,
          locale,
          ogType: 'restaurant',
          ogImage: `${BASE_CANONICAL_URL}${foundVenue.coverImage || '/images/right-nav.avif'}`,
          breadcrumbs: [
            { name: locale === 'es' ? 'Inicio' : 'Home', path: `/${locale}/` },
            { name: locale === 'es' ? 'Locales' : 'Venues', path: `/${locale}/venues/` },
            { name: foundVenue.name, path: `/${locale}/venues/${enriched.slug}/` }
          ],
          mainEntity: {
            '@type': 'NightClub',
            name: foundVenue.name,
            description: enriched.seoDescription,
            address: {
              '@type': 'PostalAddress',
              streetAddress: foundVenue.address,
              addressLocality: foundVenue.city,
              addressCountry: 'PA'
            }
          }
        });
      }
    } else if (isVenuesListPage) {
      updateHeadMetadata({
        title: isEs
          ? 'Clubs, Rooftops y Restaurantes en Panamá | ARRIVE'
          : 'Clubs, Rooftops and Restaurants in Panama | ARRIVE',
        description: isEs
          ? 'Explora clubs, rooftops y restaurantes de Ciudad de Panamá. Fotos, eventos, menús, ubicación y opciones para reservar mesas VIP.'
          : 'Explore clubs, rooftops, and restaurants in Panama City. Photos, events, menus, addresses, and VIP table booking options.',
        canonicalUrl: `${BASE_CANONICAL_URL}/${locale}/panama/venues/`,
        pathname: `/${locale}/panama/venues/`,
        locale,
        ogType: 'website',
        breadcrumbs: [
          { name: isEs ? 'Inicio' : 'Home', path: `/${locale}/` },
          { name: isEs ? 'Locales' : 'Venues', path: `/${locale}/panama/venues/` }
        ],
        faqItems: VENUES_FAQS[locale] || VENUES_FAQS.es
      });
    } else if (isConciergePage) {
      updateHeadMetadata({
        title: isEs
          ? 'Concierge VIP Panamá | Yates, Chauffeur & Reservas'
          : 'Panama VIP Concierge | Yacht Charters, Chauffeurs & Bookings',
        description: isEs
          ? 'Concierge en Ciudad de Panamá para reservas de restaurantes, transporte privado, alquiler de yates, nightlife y estadías premium.'
          : 'Panama City concierge for restaurant reservations, private chauffeur transport, yacht charters, nightlife and luxury accommodations.',
        canonicalUrl: `${BASE_CANONICAL_URL}/${locale}/panama/concierge/`,
        pathname: `/${locale}/panama/concierge/`,
        locale,
        ogType: 'website',
        breadcrumbs: [
          { name: isEs ? 'Inicio' : 'Home', path: `/${locale}/` },
          { name: 'Concierge & VIP Services', path: `/${locale}/panama/concierge/` }
        ],
        faqItems: CONCIERGE_FAQS[locale] || CONCIERGE_FAQS.es
      });
    } else if (isBlogListPage) {
      updateHeadMetadata({
        title: isEs
          ? 'Blog & Guía VIP de Nightlife en Panamá — ARRIVE'
          : 'Panama VIP Nightlife Blog & Clubbing Guide — ARRIVE',
        description: isEs
          ? 'Artículos editoriales, guías de discotecas en Casco Antiguo, cómo reservar mesa VIP, dress code y tendencias nocturnas en Ciudad de Panamá.'
          : 'Nightlife editorial articles, Casco Viejo club guides, VIP bottle service tips, dress code rules and party trends in Panama City.',
        canonicalUrl: `${BASE_CANONICAL_URL}/${locale}/blog/`,
        pathname: `/${locale}/blog/`,
        locale,
        ogType: 'website',
        breadcrumbs: [
          { name: isEs ? 'Inicio' : 'Home', path: `/${locale}/` },
          { name: 'Blog', path: `/${locale}/blog/` }
        ]
      });
    } else if (isBlogPostPage && route.params?.postSlug) {
      const post = getBlogPostBySlug(route.params.postSlug);
      if (post) {
        const postData = post[locale] || post.es;
        updateHeadMetadata({
          title: postData.seoTitle,
          description: postData.seoDescription,
          canonicalUrl: `${BASE_CANONICAL_URL}/${locale}/blog/${post.slug}/`,
          pathname: `/${locale}/blog/${post.slug}/`,
          locale,
          ogType: 'article',
          ogImage: post.coverImage,
          breadcrumbs: [
            { name: locale === 'es' ? 'Inicio' : 'Home', path: `/${locale}/` },
            { name: 'Blog', path: `/${locale}/blog/` },
            { name: postData.title, path: `/${locale}/blog/${post.slug}/` }
          ],
          mainEntity: {
            '@type': 'BlogPosting',
            headline: postData.title,
            description: postData.excerpt,
            image: post.coverImage,
            datePublished: '2026-09-15T00:00:00-05:00',
            dateModified: '2026-09-15T00:00:00-05:00',
            author: {
              '@type': 'Organization',
              name: 'Arrive Model Management',
              url: BASE_CANONICAL_URL
            },
            publisher: {
              '@type': 'Organization',
              name: 'Arrive Model Management',
              logo: {
                '@type': 'ImageObject',
                url: `${BASE_CANONICAL_URL}/images/arrive-logo-white.png`
              }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${BASE_CANONICAL_URL}/${locale}/blog/${post.slug}/`
            }
          }
        });
      }
    } else if (isDirectoryPage) {
      updateHeadMetadata({
        title: isEs ? 'Directorio de Nightlife & Todas las Páginas | ARRIVE Panamá' : 'Panama Nightlife Directory & Complete Site Index | ARRIVE',
        description: isEs 
          ? 'Explora todas las guías de discotecas, rooftops en Casco Antiguo, eventos por día, venues asociados y recursos de ARRIVE.' 
          : 'Explore all nightlife guides, Casco Viejo rooftops, events by day, partner venues and corporate resources on ARRIVE.',
        canonicalUrl: `${BASE_CANONICAL_URL}/${locale}/directorio/`,
        pathname: `/${locale}/directorio/`,
        locale,
        ogType: 'website',
        breadcrumbs: [
          { name: isEs ? 'Inicio' : 'Home', path: `/${locale}/` },
          { name: isEs ? 'Directorio' : 'Directory', path: `/${locale}/directorio/` }
        ]
      });
    } else if (isInfoPage) {
      const pageSlug = route.infoSlug || route.params?.infoSlug || 'privacy';
      const pageInfo = INFO_PAGES[pageSlug] || INFO_PAGES['privacy'];
      const pageData = pageInfo[locale] || pageInfo.es;
      updateHeadMetadata({
        title: `${pageData.title} | ARRIVE Panamá`,
        description: pageData.subtitle,
        canonicalUrl: `${BASE_CANONICAL_URL}/${locale}/${pageSlug}/`,
        pathname: `/${locale}/${pageSlug}/`,
        locale,
        ogType: 'article',
        breadcrumbs: [
          { name: isEs ? 'Inicio' : 'Home', path: `/${locale}/` },
          { name: pageData.title, path: `/${locale}/${pageSlug}/` }
        ]
      });
    } else if (isGalleryPage) {
      updateHeadMetadata({
        title: isEs
          ? 'Galería de Fotos Exclusiva • Arrive Girls & Nightlife | ARRIVE Panamá'
          : 'Girls & Nightlife Photo Gallery • High-Res Downloads | ARRIVE Panama',
        description: isEs
          ? 'Descarga fotos oficiales en alta resolución 4K de fiestas y eventos en Furia, Piano Bar, Terraplén y Casco Viejo. Galería exclusiva para modelos y chicas Arrive.'
          : 'Download uncompressed 4K official photos from parties at Furia, Piano Bar, Terraplén and Casco Viejo. Exclusive gallery for Arrive models and guests.',
        canonicalUrl: `${BASE_CANONICAL_URL}/${locale}/galeria/`,
        pathname: `/${locale}/galeria/`,
        locale,
        ogType: 'website',
        breadcrumbs: [
          { name: isEs ? 'Inicio' : 'Home', path: `/${locale}/` },
          { name: isEs ? 'Galería de Fotos' : 'Photo Gallery', path: `/${locale}/galeria/` }
        ]
      });
    } else if (activeHub) {
      // Hub landing metadata
      const hubData = activeHub[locale] || activeHub.es;
      updateHeadMetadata({
        title: hubData.title,
        description: hubData.description,
        canonicalUrl: `${BASE_CANONICAL_URL}/${locale}${activeHub.path}`,
        pathname: `/${locale}${activeHub.path}`,
        locale,
        ogType: 'website',
        breadcrumbs: [
          { name: locale === 'es' ? 'Inicio' : 'Home', path: `/${locale}/` },
          { name: 'Panamá', path: `/${locale}/panama/nightlife/` },
          { name: hubData.h1, path: `/${locale}${activeHub.path}` }
        ]
      });

      // Adjust category or day filter to match the hub
      if (activeHub.filterCategory === 'today') {
        setSelectedDay('Martes');
      } else if (activeHub.filterCategory === 'weekend') {
        setSelectedDay('Viernes');
      } else if (activeHub.filterCategory && activeHub.filterCategory !== 'all') {
        setSelectedCategory(activeHub.filterCategory);
      }
    } else {
      // Default Homepage Metadata
      updateHeadMetadata({
        title: isEs 
          ? 'ARRIVE Panamá | Nightlife, Eventos & Experiencias VIP'
          : 'ARRIVE Panama | Nightlife, Events & VIP Experiences',
        description: isEs
          ? 'Descubre el mejor nightlife de Ciudad de Panamá: eventos exclusivos, beneficios para ellas, rooftops, clubs, restaurantes y mesas VIP.'
          : 'Discover the best nightlife in Panama City: exclusive events, ladies perks, rooftops, clubs, restaurants and VIP tables.',
        canonicalUrl: `${BASE_CANONICAL_URL}/${locale}/`,
        pathname: `/${locale}/`,
        locale,
        ogType: 'website',
        breadcrumbs: [
          { name: isEs ? 'Inicio' : 'Home', path: `/${locale}/` }
        ]
      });
    }
  }, [route.type, route.params?.eventSlug, route.params?.venueSlug, route.hubKey, locale, events, venues]);

  // Ensure scroll is cleanly reset to top on every route/page change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [currentPath]);

  const handleSwitchLocale = (newLocale) => {
    if (newLocale === locale) return;
    const targetUrl = getAlternatePath(currentPath, newLocale);
    navigate(targetUrl);
  };

  return (
    <div className="main-wrapper">
      {/* Floating Capsule Header */}
      <Navbar 
        onOpenMenu={() => setIsDrawerOpen(true)}
        locale={locale}
        alternateEsUrl={alternateEsUrl}
        alternateEnUrl={alternateEnUrl}
        onSwitchLocale={handleSwitchLocale}
        route={route}
        currentPath={currentPath}
        navigate={navigate}
      />

      {/* ── PAGE ROUTING ── */}
      {isVenuePage && (
        <VenuePage venueSlug={route.params.venueSlug} locale={locale} />
      )}

      {isVenuesListPage && (
        <VenuesListPage locale={locale} />
      )}

      {isConciergePage && (
        <ConciergePage locale={locale} />
      )}

      {isBlogListPage && (
        <BlogListPage locale={locale} />
      )}

      {isBlogPostPage && (
        <BlogPostPage postSlug={route.params?.postSlug} locale={locale} />
      )}

      {isDirectoryPage && (
        <DirectoryPage locale={locale} navigate={navigate} />
      )}

      {isInfoPage && (
        <InfoPage pageSlug={route.infoSlug || route.params?.infoSlug} locale={locale} />
      )}

      {isGalleryPage && (
        <GalleryPage locale={locale} navigate={navigate} />
      )}

      {isHomePage && (
        <>
          {/* Hero Header with dynamic SEO H1 & breadcrumbs */}
          <HeroBanner hubInfo={activeHub} locale={locale} />

          {/* Events Listing Section */}
          <section className="section_home_events" id="events-section">
            <div className="py">
              <div className="home_events_wrapper">
                
                {/* Unified Centered Filter & Search Bar */}
                <FilterBar />

                {/* Dynamic Events Grid */}
                <main id="all-events" className="div-block-7" role="list">
                  {filteredEvents.length === 0 ? (
                    <div style={{
                      gridColumn: '1 / -1',
                      textAlign: 'center',
                      padding: '4rem 1rem',
                      color: '#888888',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '16px',
                      border: '1px dashed rgba(255,255,255,0.1)'
                    }}>
                      <Calendar size={36} color="#888888" style={{ margin: '0 auto 1rem' }} />
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>
                        {locale === 'es' 
                          ? 'No se encontraron eventos para este filtro'
                          : 'No events found for this filter'}
                      </h3>
                      <p style={{ fontSize: '0.88rem' }}>
                        {locale === 'es'
                          ? 'Prueba seleccionando "ALL EVENTS" o "TODOS LOS DÍAS".'
                          : 'Try selecting "ALL EVENTS" or "ALL DAYS".'}
                      </p>
                    </div>
                  ) : (
                    filteredEvents.map((evt) => (
                      <EventCard key={evt.id} event={evt} />
                    ))
                  )}
                </main>

              </div>
            </div>
          </section>

          {/* Bottom SEO Editorial Section — Elegant and non-intrusive at the bottom of the page */}
          <section className="section_home_seo_bottom" aria-label="Editorial Nightlife Panamá" style={{
            padding: '2.5rem 1.5rem 1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.4) 0%, rgba(5, 5, 5, 0.95) 100%)'
          }}>
            <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{
                fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                fontWeight: '700',
                letterSpacing: '0.04em',
                color: '#ffffff',
                marginBottom: '1rem'
              }}>
                {locale === 'es' ? 'Nightlife, Eventos & Experiencias VIP en Panamá' : 'Panama City Nightlife, Events & VIP Experiences'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem', lineHeight: '1.75', color: '#aaaaaa' }}>
                <p style={{ margin: 0 }}>
                  {locale === 'es'
                    ? 'Descubre una nueva forma de vivir Ciudad de Panamá con ARRIVE. Encuentra las mejores fiestas, clubs, rooftops, restaurantes y experiencias exclusivas de la ciudad, con acceso a eventos semanales, beneficios especiales, listas de invitados y reservas de mesas VIP.'
                    : 'Discover a new way to experience Panama City with ARRIVE. Find the city’s best parties, clubs, rooftops, restaurants, and exclusive experiences, with weekly event access, special perks, guest lists, and VIP table bookings.'}
                </p>
                <p style={{ margin: 0, color: '#888888', fontSize: '0.88rem' }}>
                  {locale === 'es'
                    ? 'Desde Casco Viejo hasta los hotspots más exclusivos de Ciudad de Panamá, ARRIVE conecta nightlife, gastronomía y experiencias premium en un solo lugar.'
                    : 'From Casco Viejo to the most exclusive hotspots in Panama City, ARRIVE connects nightlife, gastronomy, and premium experiences in one place.'}
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Luxury Dark Footer */}
      <Footer locale={locale} navigate={navigate} />

      {/* Floating Mobile Bottom Navigation Bar */}
      <MobileBottomNav 
        locale={locale}
        route={route}
        navigate={navigate}
        onOpenMenu={() => setIsDrawerOpen(true)}
      />

      {/* Modals — Only BookVIP remains as popup */}
      <EventDetailModal />
      <BookVipModal />
      <MyPassesModal />
      <CouponModal />
      <AdminPanel />
      <MenuDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        route={route}
        currentPath={currentPath}
      />

      {/* Global Notification Toast */}
      {notification && (
        <div className={`toast-notification ${notification.type}`}>
          {notification.type === 'success' ? (
            <CheckCircle size={18} color="#ff3b5c" />
          ) : (
            <Info size={18} color="#ffffff" />
          )}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  );
};

export default App;
