'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/data/autoparts-data';

interface PopularCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="section-categories">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-header-title">Categorías Populares</h2>
            <p className="section-header-subtitle">
              Encuentra refacciones específicas ordenadas por sistemas automotrices
            </p>
          </div>
          <a href="#catalog-section" className="section-view-all">
            Ver todas las categorías <ChevronRight size={16} />
          </a>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              className={`category-tile ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                onSelectCategory(cat.id);
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <img src={cat.image} alt={cat.name} className="category-tile-thumb" loading="lazy" />
              <div className="category-tile-info">
                <h5>{cat.name}</h5>
                <span>{cat.itemCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
