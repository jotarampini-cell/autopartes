'use client';

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { BRANDS, Brand } from '@/data/autoparts-data';

const monogram = (logo: string) => {
  const clean = logo.replace(/[^A-Za-z&]/g, '');
  if (logo.includes('&')) {
    const [a, b] = logo.split('&');
    return `${a.trim().charAt(0)}${b.trim().charAt(0)}`;
  }
  return clean.slice(0, 2);
};

/**
 * Shows the brand's official logo when a file is supplied, and falls back to
 * a monogram tile otherwise — including when the file 404s, so a missing or
 * misnamed asset never leaves a broken image on the wall.
 */
const BrandMark: React.FC<{ brand: Brand }> = ({ brand }) => {
  const [failed, setFailed] = useState(false);

  if (brand.logoSrc && !failed) {
    return (
      <div className="brand-tile-logo">
        <img
          src={brand.logoSrc}
          alt={brand.logo}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return <div className="brand-tile-monogram">{monogram(brand.logo)}</div>;
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
              <BrandMark brand={b} />
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
