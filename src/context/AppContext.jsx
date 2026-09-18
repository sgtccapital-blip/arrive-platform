import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS } from '../data/initialData';
import { INITIAL_VENUES } from '../data/venuesData';
import { t as translateHelper } from '../data/translations';

const AppContext = createContext();
const DATA_VERSION = "arrive_v20_furia_video_preview";

export const AppProvider = ({ children }) => {
  // Load saved state or fall back to initialData with versioning
  const [events, setEvents] = useState(() => {
    try {
      const version = localStorage.getItem('arrive_data_version');
      if (version !== DATA_VERSION) {
        localStorage.setItem('arrive_data_version', DATA_VERSION);
        localStorage.setItem('arrive_events', JSON.stringify(INITIAL_EVENTS));
        return INITIAL_EVENTS;
      }
      const saved = localStorage.getItem('arrive_events');
      if (saved) {
        const parsed = JSON.parse(saved);
        const filtered = parsed.filter(e => e.id !== 'evt-furia-tini-martes' && e.slug !== 'furia-tini-after-party');
        return filtered.length > 0 ? filtered : INITIAL_EVENTS;
      }
      return INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [myPasses, setMyPasses] = useState(() => {
    try {
      const saved = localStorage.getItem('arrive_my_passes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [claimedBenefits, setClaimedBenefits] = useState(() => {
    try {
      const saved = localStorage.getItem('arrive_claimed_benefits');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Benefits (for admin panel)
  const [benefits, setBenefits] = useState([]);

  // Filters
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Venues state
  const [venues, setVenues] = useState(INITIAL_VENUES);
  const [selectedVenue, setSelectedVenue] = useState(INITIAL_VENUES[0]);

  // Modals state (only BookVIP remains as popup)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedVipEvent, setSelectedVipEvent] = useState(null);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [isPassesModalOpen, setIsPassesModalOpen] = useState(false);
  const [isBookVipModalOpen, setIsBookVipModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Locale state
  const [locale, setLocale] = useState(() => {
    if (typeof window !== 'undefined') {
      const seg = window.location.pathname.split('/').filter(Boolean);
      if (seg[0] === 'en') return 'en';
    }
    return 'es';
  });

  const t = (path) => translateHelper(path, locale);

  // Navigate to venue page (used by components that need to link to venues)
  const openVenueDetail = (venueIdentifier) => {
    let targetVenue = venues[0];
    if (venueIdentifier) {
      const match = venues.find(v => 
        v.id === venueIdentifier || 
        v.slug === venueIdentifier || 
        v.name.toLowerCase().includes(venueIdentifier.toLowerCase()) ||
        v.shortName.toLowerCase().includes(venueIdentifier.toLowerCase())
      );
      if (match) targetVenue = match;
    }
    setSelectedVenue(targetVenue);
    // Navigate to venue page instead of opening modal
    const slug = targetVenue.slug || targetVenue.shortName.toLowerCase().replace(/\s+/g, '-');
    window.history.pushState(null, '', `/${locale}/venues/${slug}/`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem('arrive_events', JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('arrive_my_passes', JSON.stringify(myPasses));
    } catch (e) {
      console.error(e);
    }
  }, [myPasses]);

  useEffect(() => {
    try {
      localStorage.setItem('arrive_claimed_benefits', JSON.stringify(claimedBenefits));
    } catch (e) {
      console.error(e);
    }
  }, [claimedBenefits]);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Action: Book event + auto-claim the perk
  const bookEvent = (event, tier, guestInfo) => {
    const newPass = {
      passId: 'ARR-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      eventId: event.id,
      eventTitle: event.title,
      eventSubtitle: event.subtitle,
      date: event.date,
      time: event.time,
      location: event.location,
      city: event.city,
      tierName: tier.name,
      tierPrice: tier.price,
      currency: event.currency || '$',
      guestName: guestInfo.name,
      guestEmail: guestInfo.email,
      guestPhone: guestInfo.phone || 'N/A',
      guestsCount: guestInfo.guests || 1,
      perkCode: event.perkCode || '',
      perkHeadline: event.perkHeadline || '',
      ticketUrl: event.ticketUrl || '',
      qrCodeData: `https://arrive-platform.app/verify/${event.id}/${guestInfo.email}`,
      createdAt: new Date().toISOString()
    };

    setMyPasses(prev => [newPass, ...prev]);

    // Deduct spot
    setEvents(prev => prev.map(ev => {
      if (ev.id === event.id) {
        return {
          ...ev,
          spotsLeft: Math.max(0, (ev.spotsLeft || 10) - (guestInfo.guests || 1))
        };
      }
      return ev;
    }));

    // Auto-claim the perk
    if (!claimedBenefits.includes(event.id)) {
      setClaimedBenefits(prev => [...prev, event.id]);
    }

    showToast(`¡Pase + Open Bar activado para ${event.title}! 🍸`, 'success');
    return newPass;
  };

  // Action: Cancel pass
  const cancelPass = (passId) => {
    setMyPasses(prev => prev.filter(p => p.passId !== passId));
    showToast('Pase cancelado correctamente.', 'info');
  };

  // Action: Claim benefit standalone
  const claimBenefit = (benefit) => {
    if (!claimedBenefits.includes(benefit.id)) {
      setClaimedBenefits(prev => [...prev, benefit.id]);
    }
    showToast(`¡Cupón activado para ${benefit.partner || benefit.title}! 🎉`, 'success');
  };

  // Action: Reset data
  const resetToDefaults = () => {
    setEvents(INITIAL_EVENTS);
    localStorage.setItem('arrive_events', JSON.stringify(INITIAL_EVENTS));
    showToast('Planes de la Semana 7 - 13 restablecidos.', 'info');
  };

  // Action: Save Event (Admin)
  const saveEvent = (eventData) => {
    if (eventData.id) {
      setEvents(prev => prev.map(ev => ev.id === eventData.id ? eventData : ev));
      showToast('Evento actualizado.', 'success');
    } else {
      const newEvt = {
        ...eventData,
        id: 'evt-' + Date.now(),
        spotsLeft: eventData.capacity || 50
      };
      setEvents(prev => [newEvt, ...prev]);
      showToast('Nuevo evento añadido a la semana.', 'success');
    }
  };

  // Action: Delete Event
  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(ev => ev.id !== eventId));
    showToast('Evento eliminado.', 'info');
  };

  // Action: Save Benefit (Admin)
  const saveBenefit = (benefitData) => {
    if (benefitData.id) {
      setBenefits(prev => prev.map(b => b.id === benefitData.id ? benefitData : b));
      showToast('Beneficio actualizado.', 'success');
    } else {
      const newBen = { ...benefitData, id: 'ben-' + Date.now(), claimedCount: 0 };
      setBenefits(prev => [newBen, ...prev]);
      showToast('Nuevo beneficio añadido.', 'success');
    }
  };

  // Action: Delete Benefit (Admin)
  const deleteBenefit = (benefitId) => {
    setBenefits(prev => prev.filter(b => b.id !== benefitId));
    showToast('Beneficio eliminado.', 'info');
  };

  // Filtered events
  const filteredEvents = events.filter(evt => {
    if (selectedCity !== 'all') {
      const cityClean = selectedCity.replace(/-/g, ' ').toLowerCase();
      const locClean = evt.location.toLowerCase();
      const matchVenue = locClean.includes(cityClean) || 
                         locClean.replace(/[^a-z0-9]/g, '').includes(selectedCity.replace(/[^a-z0-9]/g, '')) ||
                         (selectedCity.includes('terraplen') && locClean.includes('terraplén')) ||
                         (evt.venueSlug && evt.venueSlug.includes(selectedCity)) ||
                         (selectedCity.includes('furia') && evt.venueSlug === 'furia-club') ||
                         (selectedCity.includes('terraplen') && evt.venueSlug === 'terraplen-rooftop') ||
                         (selectedCity.includes('piano') && evt.venueSlug === 'piano-bar') ||
                         (selectedCity.includes('rosalia') && evt.venueSlug === 'la-rosalia') ||
                         evt.city.toLowerCase().includes(cityClean);
      if (!matchVenue) return false;
    }
    if (selectedDay !== 'all') {
      if (evt.dayOfWeek !== selectedDay) return false;
    }
    if (selectedCategory !== 'Todas') {
      const catLower = selectedCategory.toLowerCase();
      const matchCat = evt.category === selectedCategory || 
                       evt.category.toLowerCase().includes(catLower) ||
                       (catLower.includes('club') && (evt.location?.toLowerCase().includes('club') || evt.location?.toLowerCase().includes('furia'))) ||
                       (catLower.includes('rooftop') && (evt.location?.toLowerCase().includes('rooftop') || evt.location?.toLowerCase().includes('terraplén') || evt.location?.toLowerCase().includes('terraplen')));
      if (!matchCat) return false;
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const matchTitle = evt.title.toLowerCase().includes(query);
      const matchSubtitle = evt.subtitle?.toLowerCase().includes(query);
      const matchArtists = evt.artists?.some(a => a.name.toLowerCase().includes(query));
      const matchLocation = evt.location.toLowerCase().includes(query);
      const matchPerk = evt.perkHeadline?.toLowerCase().includes(query);
      if (!matchTitle && !matchSubtitle && !matchArtists && !matchLocation && !matchPerk) return false;
    }
    return true;
  });

  return (
    <AppContext.Provider value={{
      locale,
      setLocale,
      t,
      events,
      benefits,
      myPasses,
      claimedBenefits,
      selectedCity,
      setSelectedCity,
      selectedDay,
      setSelectedDay,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      venues,
      setVenues,
      selectedVenue,
      setSelectedVenue,
      openVenueDetail,
      selectedEvent,
      setSelectedEvent,
      selectedVipEvent,
      setSelectedVipEvent,
      selectedBenefit,
      setSelectedBenefit,
      isPassesModalOpen,
      setIsPassesModalOpen,
      isBookVipModalOpen,
      setIsBookVipModalOpen,
      isAdminModalOpen,
      setIsAdminModalOpen,
      notification,
      showToast,
      bookEvent,
      cancelPass,
      claimBenefit,
      saveEvent,
      deleteEvent,
      saveBenefit,
      deleteBenefit,
      resetToDefaults,
      filteredEvents
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
