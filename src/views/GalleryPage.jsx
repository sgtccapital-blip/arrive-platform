import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Camera, 
  Download, 
  Heart, 
  Sparkles, 
  Share2, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Search, 
  CheckSquare, 
  Square, 
  Maximize2, 
  Calendar, 
  MapPin, 
  Flame, 
  Layers, 
  ArrowDownToLine, 
  SlidersHorizontal, 
  Info 
} from 'lucide-react';

const InstagramIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
import { 
  GALLERY_ALBUMS, 
  GALLERY_TAGS, 
  GALLERY_PHOTOS, 
  downloadPhotoFile 
} from '../data/galleryData';
import { useApp } from '../context/AppContext';

export const GalleryPage = ({ locale = 'es', navigate }) => {
  const { showNotification } = useApp();
  const isEs = locale === 'es';

  // State
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('arrive_gallery_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Multi-select state
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState([]);
  const [isDownloadingBatch, setIsDownloadingBatch] = useState(false);

  // Lightbox modal state
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('arrive_gallery_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not save favorites', e);
    }
  }, [favorites]);

  // Toggle favorite
  const toggleFavorite = useCallback((id, e) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(fId => fId !== id) : [...prev, id];
      if (showNotification) {
        showNotification(
          exists 
            ? (isEs ? 'Eliminada de tus favoritas' : 'Removed from favorites')
            : (isEs ? 'Guardada en tus favoritas ❤️' : 'Saved to favorites ❤️'),
          'success'
        );
      }
      return next;
    });
  }, [isEs, showNotification]);

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    return GALLERY_PHOTOS.filter(photo => {
      // Album filter
      if (selectedAlbum !== 'all' && photo.albumId !== selectedAlbum) {
        return false;
      }
      // Tag / Category filter
      if (selectedTag !== 'all') {
        const matchesCategory = photo.category === selectedTag;
        const matchesTag = photo.tags && photo.tags.some(t => t.toLowerCase().includes(selectedTag.toLowerCase()));
        if (!matchesCategory && !matchesTag) return false;
      }
      // Favorites filter
      if (showOnlyFavorites && !favorites.includes(photo.id)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = (photo.title[locale] || photo.title.es || '').toLowerCase().includes(query);
        const venueMatch = (photo.venue || '').toLowerCase().includes(query);
        const tagsMatch = photo.tags && photo.tags.some(t => t.toLowerCase().includes(query));
        if (!titleMatch && !venueMatch && !tagsMatch) return false;
      }
      return true;
    });
  }, [selectedAlbum, selectedTag, showOnlyFavorites, favorites, searchQuery, locale]);

  // Single photo download
  const handleDownload = async (photo, e) => {
    if (e) e.stopPropagation();
    setDownloadingId(photo.id);
    if (showNotification) {
      showNotification(
        isEs ? `Descargando ${photo.filename} en 4K...` : `Downloading ${photo.filename} in 4K...`,
        'success'
      );
    }
    await downloadPhotoFile(photo.image, photo.filename);
    setTimeout(() => {
      setDownloadingId(null);
      if (showNotification) {
        showNotification(
          isEs ? '¡Foto descargada con éxito!' : 'Photo downloaded successfully!',
          'success'
        );
      }
    }, 800);
  };

  // Batch download
  const handleBatchDownload = async () => {
    if (selectedPhotoIds.length === 0) return;
    setIsDownloadingBatch(true);
    const photosToDownload = GALLERY_PHOTOS.filter(p => selectedPhotoIds.includes(p.id));

    if (showNotification) {
      showNotification(
        isEs 
          ? `Iniciando descarga de ${photosToDownload.length} fotos en alta resolución...` 
          : `Starting download of ${photosToDownload.length} high-res photos...`,
        'success'
      );
    }

    for (let i = 0; i < photosToDownload.length; i++) {
      const p = photosToDownload[i];
      await downloadPhotoFile(p.image, p.filename);
      // Small delay between downloads to prevent browser throttling
      await new Promise(res => setTimeout(res, 500));
    }

    setIsDownloadingBatch(false);
    if (showNotification) {
      showNotification(
        isEs 
          ? `¡${photosToDownload.length} fotos descargadas con éxito!` 
          : `All ${photosToDownload.length} photos downloaded successfully!`,
        'success'
      );
    }
    setIsSelectMode(false);
    setSelectedPhotoIds([]);
  };

  // Toggle selection
  const toggleSelectPhoto = (id, e) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedPhotoIds(filteredPhotos.map(p => p.id));
  };

  const deselectAll = () => {
    setSelectedPhotoIds([]);
  };

  // Share photo
  const handleShare = async (photo, e) => {
    if (e) e.stopPropagation();
    const fullUrl = window.location.origin + photo.image;
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title[locale] || photo.title.es,
          text: isEs ? '¡Mira esta foto en ARRIVE Nightlife Panamá!' : 'Check out this photo on ARRIVE Nightlife Panama!',
          url: fullUrl
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Share failed', err);
      }
    }
    // Fallback: copy link
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedId(photo.id);
      if (showNotification) {
        showNotification(
          isEs ? 'Enlace de la foto copiado al portapapeles' : 'Photo link copied to clipboard',
          'success'
        );
      }
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Ignored
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <div className="arrive_gallery_page">
      {/* =========================================================================
          HERO BANNER: Luxury Arrive Aesthetics with Disco Balls & Red Accents
          ========================================================================= */}
      <header className="section_home_hero gallery_hero_section" aria-label="Girls Photo Gallery">
        <div className="py">
          <div className="home_hero_wrapper">
            <div className="heading_flex">
              {/* Discoball Flame Row */}
              <div className="hero_title_row">
                <img 
                  loading="eager" 
                  fetchPriority="high"
                  src="/images/gifs/Discoball.gif" 
                  alt="Disco Ball Arrive Left" 
                  className="heart_title_flame left hero_gif_discoball" 
                  width="60"
                  height="60"
                />
                <h1 className="is-center hero_title_text">
                  {isEs ? 'Galería de Fotos • Arrive Girls' : 'Girls & Nightlife Photo Hub'}
                </h1>
                <img 
                  loading="eager" 
                  fetchPriority="high"
                  src="/images/gifs/Discoball.gif" 
                  alt="Disco Ball Arrive Right" 
                  className="heart_title_flame right hero_gif_discoball" 
                  width="60"
                  height="60"
                />
              </div>

              {/* Subtitle Badges */}
              <div className="hero_subtitle_emojis">
                <span className="hero_sub_badge">
                  <Camera size={14} color="#ff3b5c" /> 
                  {isEs ? 'FOTOS OFICIALES 4K' : '4K OFFICIAL PHOTOS'}
                </span>
                <span className="hero_sub_dot">•</span>
                <span className="hero_sub_badge">
                  <ArrowDownToLine size={14} color="#ff3b5c" /> 
                  {isEs ? 'DESCARGA DIRECTA AL CARRETE' : 'DIRECT HD DOWNLOAD'}
                </span>
                <span className="hero_sub_dot">•</span>
                <span className="hero_sub_badge">
                  <Sparkles size={14} color="#ff3b5c" /> 
                  {isEs ? 'EXCLUSIVO MODELOS & CHICAS' : 'MODELS & GUESTS EXCLUSIVE'}
                </span>
              </div>

              {/* Editorial Intro Text */}
              <p className="gallery_hero_lead">
                {isEs 
                  ? 'Encuentra y descarga todas las fotos de tus noches en Furia, Piano Bar, Terraplén y Cielo en máxima resolución. Sin marcas invasivas, 100% libre de compresión y listas para tus historias y posts de Instagram.'
                  : 'Browse and download all photos from your nights at Furia, Piano Bar, Terraplén, and Cielo in ultra-high resolution. Free of heavy watermarks, uncompressed, and ready for your Instagram stories and feed.'}
              </p>

              {/* Instagram Notice Capsule */}
              <div className="gallery_ig_banner">
                <div className="gallery_ig_left">
                  <span className="gallery_ig_pill">
                    <InstagramIcon size={14} color="#ffffff" /> @arrivemodels
                  </span>
                  <span className="gallery_ig_text">
                    {isEs 
                      ? '¿Subes tu foto a Instagram? ¡Etiqueta a @arrivemodels y te reposteamos en nuestra cuenta oficial!'
                      : 'Posting your photo to IG? Tag @arrivemodels and we will repost you on our official story!'}
                  </span>
                </div>
                <a 
                  href="https://instagram.com/arrivemodels" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gallery_ig_btn"
                >
                  {isEs ? 'Abrir Instagram' : 'Open Instagram'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          CONTROLS TOOLBAR: Albums, Tags, Search & Selection Mode
          ========================================================================= */}
      <section className="gallery_controls_section" aria-label="Filtros de Galería">
        <div className="gallery_container">
          
          {/* Top Row: Search & Actions */}
          <div className="gallery_toolbar_top">
            {/* Search Input */}
            <div className="gallery_search_box">
              <Search size={16} className="gallery_search_icon" />
              <input 
                type="text"
                placeholder={isEs ? 'Buscar por fiesta, discoteca o estilo...' : 'Search by party, club, or style...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="gallery_search_input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')} 
                  className="gallery_search_clear"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="gallery_action_buttons">
              {/* Favorites Toggle */}
              <button 
                type="button"
                className={`gallery_tool_btn ${showOnlyFavorites ? 'active' : ''}`}
                onClick={() => setShowOnlyFavorites(prev => !prev)}
                title={isEs ? 'Ver mis favoritas' : 'View my favorites'}
              >
                <Heart size={15} fill={showOnlyFavorites ? '#ff3b5c' : 'none'} color={showOnlyFavorites ? '#ff3b5c' : 'currentColor'} />
                <span>{isEs ? 'Favoritas' : 'Favorites'} ({favorites.length})</span>
              </button>

              {/* Multi-Select Mode Toggle */}
              <button 
                type="button"
                className={`gallery_tool_btn ${isSelectMode ? 'active' : ''}`}
                onClick={() => {
                  setIsSelectMode(prev => !prev);
                  if (isSelectMode) setSelectedPhotoIds([]);
                }}
              >
                <SlidersHorizontal size={15} />
                <span>{isSelectMode ? (isEs ? 'Cancelar Selección' : 'Cancel') : (isEs ? 'Seleccionar Varias' : 'Select Multiple')}</span>
              </button>
            </div>
          </div>

          {/* Album Selector Carousel/Pills */}
          <div className="gallery_albums_strip" role="tablist" aria-label="Álbumes de eventos">
            {GALLERY_ALBUMS.map(album => {
              const isActive = selectedAlbum === album.id;
              return (
                <button
                  key={album.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`gallery_album_pill ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedAlbum(album.id)}
                >
                  <span className="gallery_album_name">
                    {album.name[locale] || album.name.es}
                  </span>
                  <span className="gallery_album_count">
                    {album.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tags Filter Chips */}
          <div className="gallery_tags_strip" role="group" aria-label="Filtrar por categoría">
            {GALLERY_TAGS.map(tag => {
              const isActive = selectedTag === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  className={`gallery_tag_chip ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag.id)}
                >
                  {tag[locale] || tag.es}
                </button>
              );
            })}
          </div>

          {/* Selection Banner (When multi-select is enabled) */}
          {isSelectMode && (
            <div className="gallery_selection_banner">
              <div className="gallery_selection_info">
                <span className="gallery_selection_count">
                  {selectedPhotoIds.length} {isEs ? 'fotos seleccionadas' : 'photos selected'}
                </span>
                <span className="gallery_selection_sep">•</span>
                <button type="button" onClick={selectAll} className="gallery_selection_link">
                  {isEs ? 'Seleccionar todas' : 'Select all'}
                </button>
                <span className="gallery_selection_sep">|</span>
                <button type="button" onClick={deselectAll} className="gallery_selection_link">
                  {isEs ? 'Deseleccionar' : 'Deselect all'}
                </button>
              </div>

              <button
                type="button"
                className="gallery_batch_download_btn"
                disabled={selectedPhotoIds.length === 0 || isDownloadingBatch}
                onClick={handleBatchDownload}
              >
                <Download size={16} />
                <span>
                  {isDownloadingBatch 
                    ? (isEs ? 'Descargando lote...' : 'Downloading batch...') 
                    : (isEs ? `Descargar (${selectedPhotoIds.length}) Fotos HD` : `Download (${selectedPhotoIds.length}) HD Photos`)}
                </span>
              </button>
            </div>
          )}

          {/* Results Count Bar */}
          <div className="gallery_results_count">
            <span>
              {isEs 
                ? `Mostrando ${filteredPhotos.length} fotos en alta resolución` 
                : `Showing ${filteredPhotos.length} high-resolution photos`}
            </span>
            {(selectedAlbum !== 'all' || selectedTag !== 'all' || searchQuery || showOnlyFavorites) && (
              <button 
                type="button" 
                onClick={() => {
                  setSelectedAlbum('all');
                  setSelectedTag('all');
                  setSearchQuery('');
                  setShowOnlyFavorites(false);
                }}
                className="gallery_reset_filters_btn"
              >
                {isEs ? 'Restablecer filtros' : 'Reset filters'}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PHOTO GRID: Ultra-Aesthetic Masonry Cards with 4K Badges & Direct Actions
          ========================================================================= */}
      <main className="gallery_grid_section">
        <div className="gallery_container">
          {filteredPhotos.length === 0 ? (
            <div className="gallery_empty_state">
              <Camera size={44} color="#666666" style={{ margin: '0 auto 1rem' }} />
              <h3>{isEs ? 'No se encontraron fotos para este filtro' : 'No photos found for this filter'}</h3>
              <p>
                {isEs 
                  ? 'Prueba seleccionando otro álbum o limpiando la búsqueda para ver todas las fotos.' 
                  : 'Try selecting another album or clearing the search to view all photos.'}
              </p>
              <button 
                type="button"
                className="gallery_empty_reset_btn"
                onClick={() => {
                  setSelectedAlbum('all');
                  setSelectedTag('all');
                  setSearchQuery('');
                  setShowOnlyFavorites(false);
                }}
              >
                {isEs ? 'Ver Todas las Fotos' : 'View All Photos'}
              </button>
            </div>
          ) : (
            <div className="gallery_masonry_grid">
              {filteredPhotos.map((photo, index) => {
                const isFav = favorites.includes(photo.id);
                const isSelected = selectedPhotoIds.includes(photo.id);
                const isDownloading = downloadingId === photo.id;
                const isCopied = copiedId === photo.id;

                return (
                  <article 
                    key={photo.id}
                    className={`gallery_card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      if (isSelectMode) {
                        toggleSelectPhoto(photo.id);
                      } else {
                        setActivePhotoIndex(index);
                      }
                    }}
                  >
                    {/* Media Container */}
                    <div className="gallery_card_media">
                      <img 
                        src={photo.image} 
                        alt={photo.title[locale] || photo.title.es}
                        loading="lazy"
                        className="gallery_card_img"
                      />

                      {/* Dark Vignette Overlay */}
                      <div className="gallery_card_overlay">
                        {/* Top Badges Row */}
                        <div className="gallery_card_top_row">
                          <span className="gallery_res_badge">
                            <Sparkles size={11} /> {photo.resolution}
                          </span>

                          <div className="gallery_card_top_actions" onClick={(e) => e.stopPropagation()}>
                            {isSelectMode ? (
                              <button
                                type="button"
                                className={`gallery_card_checkbox ${isSelected ? 'checked' : ''}`}
                                onClick={(e) => toggleSelectPhoto(photo.id, e)}
                                aria-label={isSelected ? 'Deseleccionar foto' : 'Seleccionar foto'}
                              >
                                {isSelected ? <CheckSquare size={20} color="#ff3b5c" /> : <Square size={20} color="#ffffff" />}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className={`gallery_card_fav_btn ${isFav ? 'active' : ''}`}
                                onClick={(e) => toggleFavorite(photo.id, e)}
                                title={isFav ? (isEs ? 'Eliminar de favoritas' : 'Remove from favorites') : (isEs ? 'Guardar en favoritas' : 'Save to favorites')}
                                aria-label="Favorita"
                              >
                                <Heart size={16} fill={isFav ? '#ff3b5c' : 'none'} color={isFav ? '#ff3b5c' : '#ffffff'} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Bottom Info & Quick Action */}
                        <div className="gallery_card_bottom_row">
                          <div className="gallery_card_meta">
                            <div className="gallery_card_venue_tag">
                              <MapPin size={12} />
                              <span>{photo.venue}</span>
                              <span className="gallery_card_dot">•</span>
                              <span>{photo.date}</span>
                            </div>
                            <h3 className="gallery_card_title">
                              {photo.title[locale] || photo.title.es}
                            </h3>
                          </div>

                          {/* Quick Download Button on Hover */}
                          <div className="gallery_card_actions" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              className={`gallery_card_download_btn ${isDownloading ? 'downloading' : ''}`}
                              onClick={(e) => handleDownload(photo, e)}
                              disabled={isDownloading}
                              title={isEs ? 'Descargar en Alta Resolución 4K' : 'Download in High-Res 4K'}
                              aria-label="Descargar foto"
                            >
                              {isDownloading ? (
                                <span className="gallery_spinner" />
                              ) : (
                                <>
                                  <Download size={14} />
                                  <span className="gallery_download_label">4K</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              className="gallery_card_view_btn"
                              onClick={() => setActivePhotoIndex(index)}
                              title={isEs ? 'Ver en pantalla completa' : 'View Fullscreen'}
                              aria-label="Ver pantalla completa"
                            >
                              <Maximize2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* =========================================================================
          COMMUNITY & MODEL TIPS SECTION: How to share & WhatsApp photographer
          ========================================================================= */}
      <section className="gallery_tips_section">
        <div className="gallery_container">
          <div className="gallery_tips_grid">
            {/* Card 1: Maximiza tu calidad */}
            <div className="gallery_tip_card">
              <div className="gallery_tip_icon_wrap">
                <Sparkles size={22} color="#ff3b5c" />
              </div>
              <h4>{isEs ? '100% Calidad Sin Compresión' : '100% Uncompressed Quality'}</h4>
              <p>
                {isEs 
                  ? 'Descarga los archivos originales directo a tu carrete. Evita enviar las fotos por WhatsApp antes de subirlas para no perder resolución en Instagram.'
                  : 'Download original files directly to your camera roll. Avoid sending through messaging apps beforehand to keep maximum sharpness for Instagram.'}
              </p>
            </div>

            {/* Card 2: Etiqueta y Reposteos */}
            <div className="gallery_tip_card">
              <div className="gallery_tip_icon_wrap">
                <InstagramIcon size={22} color="#ff3b5c" />
              </div>
              <h4>{isEs ? 'Etiqueta @arrivemodels' : 'Tag @arrivemodels'}</h4>
              <p>
                {isEs 
                  ? 'Menciona a @arrivemodels y a la discoteca oficial en tus stories y posts para que nuestro equipo te reposteé en nuestra comunidad de más de 45K seguidores.'
                  : 'Mention @arrivemodels and the partner venue in your stories and feed for a chance to be reposted across our community.'}
              </p>
            </div>

            {/* Card 3: ¿Buscas más fotos de la noche? */}
            <div className="gallery_tip_card">
              <div className="gallery_tip_icon_wrap">
                <Camera size={22} color="#ff3b5c" />
              </div>
              <h4>{isEs ? '¿No encuentras tu foto?' : 'Looking for More Photos?'}</h4>
              <p>
                {isEs 
                  ? 'Nuestros fotógrafos toman cientos de capturas cada semana. Escríbenos directamente por WhatsApp con el nombre del club y la fecha para enviarte tu set completo.'
                  : 'Our visual team captures hundreds of shots weekly. Reach out directly on WhatsApp with the club and date to request your full photo set.'}
              </p>
              <a 
                href="https://wa.me/50760000000?text=Hola%20Arrive,%20estoy%20buscando%20mis%20fotos%20de%20la%20noche"
                target="_blank"
                rel="noopener noreferrer"
                className="gallery_tip_whatsapp_btn"
              >
                {isEs ? 'Pedir Fotos a Concierge' : 'Request Photos on WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FULLSCREEN LIGHTBOX MODAL: Ultra-Luxury Blackout Experience
          ========================================================================= */}
      {activePhoto && (
        <div 
          className="gallery_lightbox_backdrop" 
          role="dialog" 
          aria-modal="true" 
          aria-label={activePhoto.title[locale] || activePhoto.title.es}
          onClick={() => {
            setActivePhotoIndex(null);
            setIsZoomed(false);
          }}
        >
          {/* Top Bar */}
          <div className="gallery_lightbox_topbar" onClick={(e) => e.stopPropagation()}>
            <div className="gallery_lightbox_counter">
              <span className="gallery_lightbox_current">{activePhotoIndex + 1}</span>
              <span className="gallery_lightbox_divider">/</span>
              <span className="gallery_lightbox_total">{filteredPhotos.length}</span>
            </div>

            <div className="gallery_lightbox_venue_pill">
              <MapPin size={13} color="#ff3b5c" />
              <span>{activePhoto.venue}</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>{activePhoto.date}</span>
            </div>

            <button
              type="button"
              className="gallery_lightbox_close_btn"
              onClick={() => {
                setActivePhotoIndex(null);
                setIsZoomed(false);
              }}
              aria-label={isEs ? 'Cerrar foto' : 'Close photo'}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            className="gallery_lightbox_arrow prev"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
              setIsZoomed(false);
            }}
            aria-label={isEs ? 'Foto anterior' : 'Previous photo'}
          >
            <ChevronLeft size={28} />
          </button>

          <button
            type="button"
            className="gallery_lightbox_arrow next"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
              setIsZoomed(false);
            }}
            aria-label={isEs ? 'Siguiente foto' : 'Next photo'}
          >
            <ChevronRight size={28} />
          </button>

          {/* Center Image Stage */}
          <div 
            className={`gallery_lightbox_stage ${isZoomed ? 'zoomed' : ''}`}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={() => setIsZoomed(prev => !prev)}
          >
            <img 
              src={activePhoto.image} 
              alt={activePhoto.title[locale] || activePhoto.title.es}
              className="gallery_lightbox_img"
            />
          </div>

          {/* Bottom Luxury Action & Metadata Panel */}
          <div className="gallery_lightbox_bottom_panel" onClick={(e) => e.stopPropagation()}>
            <div className="gallery_lightbox_panel_content">
              {/* Photo Title & Subtitle */}
              <div className="gallery_lightbox_text_meta">
                <div className="gallery_lightbox_badge_row">
                  <span className="gallery_lightbox_res_tag">
                    <Sparkles size={11} /> {activePhoto.resolution}
                  </span>
                  <span className="gallery_lightbox_photographer">
                    📷 {activePhoto.photographer}
                  </span>
                </div>
                <h2 className="gallery_lightbox_title">
                  {activePhoto.title[locale] || activePhoto.title.es}
                </h2>
                <p className="gallery_lightbox_desc">
                  {activePhoto.subtitle[locale] || activePhoto.subtitle.es}
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="gallery_lightbox_actions">
                {/* Favorite */}
                <button
                  type="button"
                  className={`gallery_lightbox_action_btn ${favorites.includes(activePhoto.id) ? 'active' : ''}`}
                  onClick={(e) => toggleFavorite(activePhoto.id, e)}
                  title={isEs ? 'Guardar en favoritas' : 'Save to favorites'}
                >
                  <Heart size={18} fill={favorites.includes(activePhoto.id) ? '#ff3b5c' : 'none'} color={favorites.includes(activePhoto.id) ? '#ff3b5c' : '#ffffff'} />
                  <span>{favorites.includes(activePhoto.id) ? (isEs ? 'Favorita' : 'Favorited') : (isEs ? 'Favorita' : 'Favorite')}</span>
                </button>

                {/* Share / Save to camera roll */}
                <button
                  type="button"
                  className="gallery_lightbox_action_btn"
                  onClick={(e) => handleShare(activePhoto, e)}
                  title={isEs ? 'Compartir o guardar enlace' : 'Share or copy link'}
                >
                  {copiedId === activePhoto.id ? (
                    <>
                      <Check size={18} color="#25D366" />
                      <span>{isEs ? '¡Copiado!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={18} />
                      <span>{isEs ? 'Compartir' : 'Share'}</span>
                    </>
                  )}
                </button>

                {/* Primary Download Button */}
                <button
                  type="button"
                  className={`gallery_lightbox_download_main_btn ${downloadingId === activePhoto.id ? 'downloading' : ''}`}
                  onClick={(e) => handleDownload(activePhoto, e)}
                  disabled={downloadingId === activePhoto.id}
                >
                  {downloadingId === activePhoto.id ? (
                    <>
                      <span className="gallery_spinner" />
                      <span>{isEs ? 'Descargando 4K...' : 'Downloading 4K...'}</span>
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      <span>{isEs ? 'Descargar Foto en 4K' : 'Download Photo in 4K'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
