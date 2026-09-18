import React, { useState, useEffect } from 'react';

export const CountdownTimer = ({ targetDate, compact = false }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target - now;

      if (diff <= 0) {
        setIsLive(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsLive(false);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (isLive) {
    return (
      <div className={`countdown-live ${compact ? 'countdown-compact' : ''}`}>
        <span className="live-dot"></span>
        <span className="live-text">EN VIVO AHORA</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="countdown-compact">
        <span className="countdown-label">COMIENZA EN</span>
        <span className="countdown-value">
          {timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}
          {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <div className="countdown-display">
      <span className="countdown-label-full">OPEN BAR COMIENZA EN</span>
      <div className="countdown-blocks">
        {timeLeft.days > 0 && (
          <div className="countdown-block">
            <span className="countdown-num">{timeLeft.days}</span>
            <span className="countdown-unit">DÍAS</span>
          </div>
        )}
        <div className="countdown-block">
          <span className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-unit">HRS</span>
        </div>
        <div className="countdown-block">
          <span className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-unit">MIN</span>
        </div>
        <div className="countdown-block">
          <span className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-unit">SEG</span>
        </div>
      </div>
    </div>
  );
};
