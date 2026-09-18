import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DAYS_OF_WEEK } from '../data/initialData';
import { Calendar, ChevronDown, Check } from 'lucide-react';

export const FilterBar = () => {
  const { 
    selectedCity, 
    setSelectedCity,
    selectedDay,
    setSelectedDay,
    locale 
  } = useApp();

  const isEs = (locale || 'es') === 'es';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Display label for currently selected day
  const getSelectedDayLabel = () => {
    switch (selectedDay) {
      case 'Miercoles':
        return isEs ? 'HOY MIÉRCOLES 16 SEP' : 'TODAY WEDNESDAY SEP 16';
      case 'Jueves':
        return isEs ? 'JUEVES 17 SEP' : 'THURSDAY SEP 17';
      case 'Viernes':
        return isEs ? 'VIERNES 18 SEP' : 'FRIDAY SEP 18';
      case 'Sabado':
        return isEs ? 'SÁBADO 19 SEP' : 'SATURDAY SEP 19';
      case 'Domingo':
        return isEs ? 'DOMINGO 20 SEP' : 'SUNDAY SEP 20';
      case 'all':
      default:
        return isEs ? 'TODOS LOS DÍAS (16 - 20 SEP)' : 'ALL DAYS (SEP 16 - 20)';
    }
  };

  const dayOptions = [
    { id: 'all', label: isEs ? 'TODOS LOS DÍAS' : 'ALL DAYS', dateText: isEs ? 'Semana 16 - 20 Sep' : 'Week of Sep 16 - 20', note: isEs ? 'Cartelera completa' : 'All events' },
    { id: 'Miercoles', label: isEs ? 'MIÉRCOLES 16 SEP' : 'WEDNESDAY SEP 16', dateText: '10:00 PM - 03:00 AM', note: 'Furia: Boiler Style 360°' },
    { id: 'Jueves', label: isEs ? 'JUEVES 17 SEP' : 'THURSDAY SEP 17', dateText: '10:00 PM - 04:00 AM', note: 'Furia • Terraplén • Piano Bar' },
    { id: 'Viernes', label: isEs ? 'VIERNES 18 SEP' : 'FRIDAY SEP 18', dateText: '10:00 PM - 05:00 AM', note: 'Furia • Terraplén • La Rosalía • Piano Bar' },
    { id: 'Sabado', label: isEs ? 'SÁBADO 19 SEP' : 'SATURDAY SEP 19', dateText: '10:00 PM - 05:00 AM', note: 'Mansión Reggaetón • Red Room • La Connect' },
    { id: 'Domingo', label: isEs ? 'DOMINGO 20 SEP' : 'SUNDAY SEP 20', dateText: '04:00 PM - 01:00 AM', note: 'Terraplén: Tardeo Sunset Party' }
  ];

  return (
    <div className="filter_container_row mobile_filter_scroll">
      {/* Venue Buttons (separa por lugar) */}
      <div className="venue_filter_group" role="tablist" aria-label={isEs ? 'Filtrar por sede' : 'Filter by venue'}>
        <button
          type="button"
          className={`btn_venue ${selectedCity === 'all' ? 'active w--current' : ''}`}
          onClick={() => setSelectedCity('all')}
        >
          {isEs ? 'TODOS LOS EVENTOS' : 'ALL EVENTS'}
        </button>

        <button
          type="button"
          className={`btn_venue ${selectedCity === 'furia' ? 'active w--current' : ''}`}
          onClick={() => setSelectedCity('furia')}
        >
          FURIA CLUB
        </button>

        <button
          type="button"
          className={`btn_venue ${selectedCity === 'terraplen' ? 'active w--current' : ''}`}
          onClick={() => setSelectedCity('terraplen')}
        >
          TERRAPLÉN
        </button>

        <button
          type="button"
          className={`btn_venue ${selectedCity === 'piano' || selectedCity === 'piano-bar' ? 'active w--current' : ''}`}
          onClick={() => setSelectedCity('piano')}
        >
          PIANO BAR
        </button>

        <button
          type="button"
          className={`btn_venue ${selectedCity === 'rosalia' || selectedCity === 'la-rosalia' ? 'active w--current' : ''}`}
          onClick={() => setSelectedCity('rosalia')}
        >
          LA ROSALÍA
        </button>
      </div>

      {/* Days of the Week Luxury Dropdown Filter */}
      <div 
        ref={dropdownRef}
        className="day_dropdown_wrapper"
      >
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-label="Filtrar eventos por día de la semana"
          className={`day_dropdown_trigger ${selectedDay !== 'all' ? 'is_active' : ''}`}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={14} color={selectedDay !== 'all' ? '#ffffff' : '#c10230'} style={{ flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              {getSelectedDayLabel()}
            </span>
          </div>

          <ChevronDown 
            size={14} 
            color="rgba(255,255,255,0.7)" 
            style={{ 
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              flexShrink: 0
            }} 
          />
        </button>

        {/* Floating Dropdown Menu */}
        {isDropdownOpen && (
          <>
            <div 
              className="day_dropdown_backdrop" 
              onClick={() => setIsDropdownOpen(false)} 
              aria-hidden="true"
            />
            <div 
              role="listbox"
              className="day_dropdown_menu"
            >
            <div className="day_dropdown_header">
              {isEs ? 'Filtrar por Día de la Semana:' : 'Filter by Day of the Week:'}
            </div>

            {dayOptions.map((opt) => {
              const isSelected = selectedDay === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedDay(opt.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`day_dropdown_item ${isSelected ? 'selected' : ''}`}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase'
                    }}>
                      {opt.label}
                    </span>
                    <span style={{
                      fontSize: '0.65rem',
                      color: isSelected ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)'
                    }}>
                      {opt.note}
                    </span>
                  </div>

                  {isSelected && (
                    <Check size={14} color="#ffffff" style={{ flexShrink: 0, marginLeft: '6px' }} />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default FilterBar;
