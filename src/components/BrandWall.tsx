'use client';

import React from 'react';
import { BRANDS } from '@/data/autoparts-data';

export const BrandWall: React.FC = () => {
  return (
    <section className="section-brands" id="brands-section">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
          <div>
            <h2 className="section-header-title">Marcas Líderes en la Industria</h2>
            <p className="section-header-subtitle">
              Trabajamos exclusivamente con distribuidores certificados y calidad OEM
            </p>
          </div>
        </div>

        <div className="brands-grid">
          {BRANDS.map(b => (
            <div
              key={b.name}
              className="brand-tile"
              onClick={() => {
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="brand-tile-name">{b.logo}</div>
              <div className="brand-tile-country">{b.country}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
