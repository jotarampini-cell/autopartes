'use client';

import React from 'react';
import { CATEGORIES, PRODUCTS } from '@/data/autoparts-data';

interface CategoryTileGridProps {
  onSelectCategory: (catId: string) => void;
}

/**
 * Card-per-category grid with a 4-up product preview inside each card.
 * Mirrors the dense "pick a department" block sites use above the fold.
 */
export const CategoryTileGrid: React.FC<CategoryTileGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="cattiles">
      <div className="container">
        <div className="cattiles-grid">
          {CATEGORIES.map(cat => {
            const preview = PRODUCTS.filter(p => p.category === cat.id).slice(0, 4);
            if (preview.length === 0) return null;

            return (
              <div key={cat.id} className="cattile">
                <h3 className="cattile-title">{cat.name}</h3>

                <div className="cattile-preview">
                  {preview.map(p => (
                    <button
                      key={p.id}
                      className="cattile-cell"
                      onClick={() => onSelectCategory(cat.id)}
                      title={p.name}
                    >
                      <img src={p.image} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>

                <button className="cattile-link" onClick={() => onSelectCategory(cat.id)}>
                  Ver todo en {cat.shortName || cat.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
