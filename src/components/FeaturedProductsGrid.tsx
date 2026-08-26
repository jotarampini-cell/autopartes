'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/autoparts-data';
import { AppProductCard } from './AppProductCard';

interface FeaturedProductsGridProps {
  onSeeAll: () => void;
}

export const FeaturedProductsGrid: React.FC<FeaturedProductsGridProps> = ({ onSeeAll }) => {
  const featured = PRODUCTS.slice(0, 8);

  return (
    <section className="featured-section" id="charts-section">
      <div className="container">
        <div className="featured-header">
          <h2 className="featured-title">Los más vendidos</h2>
          <button className="featured-link" onClick={onSeeAll}>
            Ver todo el catálogo <ArrowRight size={14} />
          </button>
        </div>

        <div className="featured-grid">
          {featured.map(p => (
            <AppProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};
