import React from 'react';
import { useApp } from '../context/AppContext';
import { EVENT_CATEGORIES } from '../data/initialData';

export const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  const categories = EVENT_CATEGORIES;

  return (
    <section className="category-filter-section">
      <div className="container">
        <div className="category-chips">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
