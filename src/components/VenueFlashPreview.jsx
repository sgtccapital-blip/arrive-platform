import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Volume2, VolumeX } from 'lucide-react';

export const VenueFlashPreview = ({ venue, locale = 'es', onClose }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [duration, setDuration] = useState(12);
  const videoRef = useRef(null);

  const isEs = locale === 'es';

  // Video teasers cinematográficos por local (usando el video real de Furia)
  const defaultVideos = {
    'venue-furia': '/videos/furia-preview.mp4',
    'venue-terraplen': 'https://assets.mixkit.co/videos/preview/mixkit-young-people-dancing-in-a-nightclub-4344-large.mp4',
    'venue-primavera': 'https://assets.mixkit.co/videos/preview/mixkit-friends-at-a-nightclub-gathering-around-the-bar-4342-large.mp4',
    'venue-cielo': 'https://assets.mixkit.co/videos/preview/mixkit-cocktails-served-at-a-bar-counter-4343-large.mp4',
    'venue-piano': 'https://assets.mixkit.co/videos/preview/mixkit-people-celebrating-at-a-party-with-drinks-4341-large.mp4'
  };

  const videoSrc = venue?.teaserVideoUrl || defaultVideos[venue?.id] || '/videos/furia-preview.mp4';

  const handleClose = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onClose();
    }, 280);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration || duration;
      if (dur > 0) {
        const pct = Math.min((current / dur) * 100, 100);
        setProgress(pct);
      }
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div 
      className={`venue_flash_overlay ${isFadingOut ? 'fade-out' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-label={`Preview de ${venue?.name}`}
    >
      <div className="venue_flash_container" onClick={(e) => e.stopPropagation()}>
        {/* Top Story Progress Bar */}
        <div className="venue_flash_progress_track">
          <div 
            className="venue_flash_progress_bar" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        {/* Top Controls Header */}
        <div className="venue_flash_header">
          <div className="venue_flash_badge">
            <Sparkles size={13} color="#ffd700" />
            <span>{venue?.shortName || venue?.name}</span>
            <span className="venue_flash_tag">PREVIEW</span>
          </div>

          <div className="venue_flash_actions">
            {/* Audio Toggle */}
            <button 
              type="button" 
              className="venue_flash_ctrl_btn"
              onClick={toggleSound}
              title={isMuted ? (isEs ? 'Activar sonido' : 'Unmute') : (isEs ? 'Silenciar' : 'Mute')}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Skip / Close Button */}
            <button 
              type="button" 
              className="venue_flash_close_btn"
              onClick={handleClose}
              aria-label={isEs ? 'Omitir video' : 'Skip video'}
            >
              <span>{isEs ? 'Omitir' : 'Skip'}</span>
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Cinematic Video Player */}
        <div className="venue_flash_video_wrapper">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleClose}
            className="venue_flash_video"
            poster={venue?.coverImage || '/images/venues/furia/cover.jpg'}
          />
          <div className="venue_flash_gradient_bottom" />
        </div>

        {/* Bottom Venue Card Preview */}
        <div className="venue_flash_bottom_info">
          <span className="venue_flash_eyebrow">
            {venue?.category?.toUpperCase() || 'NIGHTLIFE & DINING'} • {venue?.area?.toUpperCase() || 'PANAMÁ'}
          </span>
          <h2 className="venue_flash_title">{venue?.name}</h2>
          <p className="venue_flash_tagline">{venue?.tagline}</p>
        </div>
      </div>
    </div>
  );
};

export default VenueFlashPreview;
