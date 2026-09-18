import React from 'react';
import { useApp } from '../context/AppContext';
import { DAYS_OF_WEEK } from '../data/initialData';
import { Calendar as CalendarIcon } from 'lucide-react';

export const WeeklyCalendar = () => {
  const { selectedDay, setSelectedDay, events } = useApp();

  // Helper to count events per day
  const getEventCountForDay = (dayId) => {
    if (dayId === 'all') return events.length;
    return events.filter(e => e.dayOfWeek === dayId).length;
  };

  return (
    <section className="calendar-bar-section">
      <div className="container">
        <div className="calendar-scroll-wrapper">
          {DAYS_OF_WEEK.map((day) => {
            const count = getEventCountForDay(day.id);
            const isSelected = selectedDay === day.id;

            return (
              <button
                key={day.id}
                className={`day-tab ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedDay(day.id)}
              >
                <span className="day-tab-short">{day.short}</span>
                <span className="day-tab-num">{day.dayNum || 'ALL'}</span>
                <span className="day-tab-count">
                  {count} {count === 1 ? 'evento' : 'eventos'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
