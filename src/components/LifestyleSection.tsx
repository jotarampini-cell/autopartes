'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LIFESTYLE_SEGMENTS } from '@/data/autoparts-data';

export const LifestyleSection: React.FC = () => {
  return (
    <section className="section-lifestyle">
      <div className="container">
        <div className="lifestyle-header">
          <h2>Explora por Tipo de Vehículo &amp; Estilo de Vida</h2>
          <p>
            Soluciones personalizadas para todo terreno, flotas de trabajo, motocicletas de calle y aventura náutica.
          </p>
        </div>

        <div className="lifestyle-grid">
          {LIFESTYLE_SEGMENTS.map(seg => (
            <div key={seg.id} className="lifestyle-card">
              <div className="lifestyle-card-img">
                <img src={seg.image} alt={seg.title} loading="lazy" />
                <span className="lifestyle-badge">{seg.badge}</span>
              </div>
              <div className="lifestyle-card-body">
                <h4>{seg.title}</h4>
                <p>{seg.subtitle}</p>
                <a href="#catalog-section" className="lifestyle-link">
                  {seg.linkText} <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
