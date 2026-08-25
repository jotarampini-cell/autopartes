'use client';

import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { VehicleSelectorCard } from './VehicleSelectorCard';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/autoparts-data';

interface TodayHeroStoryProps {
  onExploreCatalog: () => void;
}

export const TodayHeroStory: React.FC<TodayHeroStoryProps> = ({ onExploreCatalog }) => {
  const { setSelectedQuickViewProduct } = useCart();
  const featuredProduct = PRODUCTS.find(p => p.id === 'HZ-BRK-001') || PRODUCTS[0];

  return (
    <section className="today-section">
      <div className="container">
        {/* Editorial Date Label & Headline */}
        <div className="today-header-row">
          <div>
            <div className="today-date-label">OFERTAS DE LA SEMANA</div>
            <h1 className="today-main-title">Repuestos Que Rinden</h1>
          </div>
        </div>

        <div className="today-cards-grid">
          {/* Big App Store Story Card */}
          <div
            className="today-hero-card"
            onClick={() => setSelectedQuickViewProduct(featuredProduct)}
          >
            <img
              src="https://images.unsplash.com/photo-1613214150384-14921ff659b2?auto=format&fit=crop&w=1200&q=85"
              alt="Brembo X-Line"
              className="today-card-bg-img"
            />
            <div className="today-card-scrim"></div>

            <div className="today-card-content">
              <span className="today-card-tag">OFERTA DESTACADA</span>
              <h2 className="today-card-headline">
                Discos Brembo X-Line
              </h2>
              <p className="today-card-subhead">
                Frenado de precisión con disipación térmica superior.
              </p>

              <div className="today-action-bar" onClick={e => e.stopPropagation()}>
                <div className="today-action-price">
                  <span className="today-action-price-now">$189.99</span>
                  <span className="today-action-price-was">$229.99</span>
                </div>
                <button
                  className="appstore-get-btn"
                  onClick={() => setSelectedQuickViewProduct(featuredProduct)}
                >
                  VER DETALLE <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Side Stack */}
          <div className="today-side-stack">
            {/* Interactive Fitment Card */}
            <VehicleSelectorCard />

            {/* Editor's Choice Mini Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #24272f 0%, #14161a 100%)',
                borderRadius: 'var(--radius-squircle-lg)',
                padding: '1.5rem',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-ios-card)',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
              }}
              onClick={onExploreCatalog}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    color: 'var(--apple-cyan)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    marginBottom: '0.4rem',
                  }}
                >
                  <ShieldCheck size={14} /> GARANTÍA HAZTAP FIT
                </span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem', lineHeight: 1.05 }}>
                  Ajuste 100% Garantizado
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#a7abb3', lineHeight: 1.4 }}>
                  Si ingresas tu modelo y la refacción no calza, cubrimos el envío de retorno y la pieza exacta sin costo.
                </p>
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                <span
                  style={{
                    color: 'var(--apple-cyan)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  Explorar todo el catálogo <Sparkles size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
