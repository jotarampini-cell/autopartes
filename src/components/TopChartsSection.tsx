'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/autoparts-data';
import { AppProductCard } from './AppProductCard';

interface TopChartsSectionProps {
  onSeeAll: () => void;
}

export const TopChartsSection: React.FC<TopChartsSectionProps> = ({ onSeeAll }) => {
  const topProducts = PRODUCTS.slice(0, 9);

  return (
    <section className="section-top-charts" id="charts-section">
      <div className="container">
        <div className="section-app-header">
          <div>
            <h2 className="section-app-title">Más Vendidos</h2>
          </div>
          <button className="section-app-link" onClick={onSeeAll}>
            Ver todo <ArrowRight size={14} />
          </button>
        </div>

        <div className="top-charts-rail">
          {topProducts.map((p, idx) => (
            <div key={p.id} className="top-charts-rail-item">
              <AppProductCard product={p} rank={idx + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
