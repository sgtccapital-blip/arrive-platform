import React from 'react';
import { useApp } from '../context/AppContext';
import { LOCATIONS_LIST } from '../data/initialData';
import { MapPin } from 'lucide-react';

export const VenueFilter = () => {
  const { selectedCity, setSelectedCity } = useApp();

  return (
    <section className="pacha-location-section">
      <div className="container">
        <div className="pacha-location-bar">
          <span className="pacha-location-label">
            <MapPin size={13} />
            <span>SELECCIONAR LUGAR:</span>
          </span>

          <div className="pacha-location-pills">
            {LOCATIONS_LIST.map((loc) => (
              <button
                key={loc.id}
                className={`pacha-loc-btn ${selectedCity === loc.id ? 'active' : ''}`}
                onClick={() => setSelectedCity(loc.id)}
              >
                <span>{loc.badge || loc.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
