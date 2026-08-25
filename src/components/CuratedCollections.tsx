'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/autoparts-data';

interface CuratedCollectionsProps {
  onSelectCategory: (catId: string) => void;
}

export const CuratedCollections: React.FC<CuratedCollectionsProps> = ({ onSelectCategory }) => {
  return (
    <section className="section-curated">
      <div className="container">
        <div className="section-app-header">
          <div>
            <h2 className="section-app-title">Comprar por Categoría</h2>
          </div>
          <button
            className="section-app-link"
            onClick={() => onSelectCategory('all')}
          >
            Ver todo <ArrowRight size={14} />
          </button>
        </div>

        <div className="curated-cards-grid">
          {CATEGORIES.slice(0, 4).map(cat => (
            <div
              key={cat.id}
              className="curated-card"
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="curated-card-media">
                <img src={cat.image} alt={cat.name} loading="lazy" />
                <span className="curated-card-tag">{cat.itemCount}</span>
              </div>
              <div className="curated-card-body">
                <h4 className="curated-card-title">{cat.name}</h4>
                <p className="curated-card-count">{cat.description}</p>
                <div className="curated-card-action">
                  Explorar sistema <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
