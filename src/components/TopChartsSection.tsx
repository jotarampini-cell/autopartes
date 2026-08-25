'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/autoparts-data';
import { useCart } from '@/context/CartContext';

interface TopChartsSectionProps {
  onSeeAll: () => void;
}

export const TopChartsSection: React.FC<TopChartsSectionProps> = ({ onSeeAll }) => {
  const { addToCart, setSelectedQuickViewProduct } = useCart();

  // Divide top 9 products into 3 columns of 3
  const col1 = PRODUCTS.slice(0, 3);
  const col2 = PRODUCTS.slice(3, 6);
  const col3 = PRODUCTS.slice(6, 9);

  return (
    <section className="section-top-charts" id="charts-section">
      <div className="container">
        <div className="section-app-header">
          <div>
            <h2 className="section-app-title">Top Repuestos Más Populares</h2>
            <p className="section-app-subtitle">Las piezas más solicitadas y mejor valoradas de la semana</p>
          </div>
          <button className="section-app-link" onClick={onSeeAll}>
            Ver ranking completo <ArrowRight size={14} />
          </button>
        </div>

        <div className="top-charts-grid">
          {/* Col 1: Ranks 1 to 3 */}
          <div className="top-chart-col">
            {col1.map((p, idx) => (
              <div
                key={p.id}
                className="top-chart-item"
                onClick={() => setSelectedQuickViewProduct(p)}
              >
                <div className="top-chart-rank">{idx + 1}</div>
                <img src={p.image} alt={p.name} className="app-squircle-icon" />
                <div className="top-chart-info">
                  <div className="top-chart-name">{p.name}</div>
                  <div className="top-chart-brand">{p.brand} · OEM: {p.oemNumber}</div>
                  <div className="top-chart-price">${p.price.toFixed(2)}</div>
                </div>
                <button
                  className="btn-app-get"
                  onClick={e => {
                    e.stopPropagation();
                    addToCart(p.id);
                  }}
                >
                  AGREGAR
                </button>
              </div>
            ))}
          </div>

          {/* Col 2: Ranks 4 to 6 */}
          <div className="top-chart-col">
            {col2.map((p, idx) => (
              <div
                key={p.id}
                className="top-chart-item"
                onClick={() => setSelectedQuickViewProduct(p)}
              >
                <div className="top-chart-rank">{idx + 4}</div>
                <img src={p.image} alt={p.name} className="app-squircle-icon" />
                <div className="top-chart-info">
                  <div className="top-chart-name">{p.name}</div>
                  <div className="top-chart-brand">{p.brand} · OEM: {p.oemNumber}</div>
                  <div className="top-chart-price">${p.price.toFixed(2)}</div>
                </div>
                <button
                  className="btn-app-get"
                  onClick={e => {
                    e.stopPropagation();
                    addToCart(p.id);
                  }}
                >
                  AGREGAR
                </button>
              </div>
            ))}
          </div>

          {/* Col 3: Ranks 7 to 9 */}
          <div className="top-chart-col">
            {col3.map((p, idx) => (
              <div
                key={p.id}
                className="top-chart-item"
                onClick={() => setSelectedQuickViewProduct(p)}
              >
                <div className="top-chart-rank">{idx + 7}</div>
                <img src={p.image} alt={p.name} className="app-squircle-icon" />
                <div className="top-chart-info">
                  <div className="top-chart-name">{p.name}</div>
                  <div className="top-chart-brand">{p.brand} · OEM: {p.oemNumber}</div>
                  <div className="top-chart-price">${p.price.toFixed(2)}</div>
                </div>
                <button
                  className="btn-app-get"
                  onClick={e => {
                    e.stopPropagation();
                    addToCart(p.id);
                  }}
                >
                  AGREGAR
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
