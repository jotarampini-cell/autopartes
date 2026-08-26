'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { BRANDS } from '@/data/autoparts-data';

const monogram = (logo: string) => {
  const clean = logo.replace(/[^A-Za-z&]/g, '');
  if (logo.includes('&')) {
    const [a, b] = logo.split('&');
    return `${a.trim().charAt(0)}${b.trim().charAt(0)}`;
  }
  return clean.slice(0, 2);
};

export const BrandWall: React.FC = () => {
  return (
    <section className="section-brands" id="brands-section">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
          <div>
            <span className="brands-eyebrow">
              <ShieldCheck size={14} /> Calidad certificada
            </span>
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
              <div className="brand-tile-monogram">{monogram(b.logo)}</div>
              <div className="brand-tile-info">
                <div className="brand-tile-name">{b.logo}</div>
                <div className="brand-tile-country">{b.country}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
