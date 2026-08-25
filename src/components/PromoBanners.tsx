'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PromoBannersProps {
  onCategorySelect: (catId: string) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onCategorySelect }) => {
  return (
    <section className="section-feature-showcase">
      <div className="container">
        <div className="banner-tri-grid">
          {/* Banner 1: High Performance Brakes */}
          <div className="feature-banner-card">
            <div className="feature-card-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1613214150384-14921ff659b2?auto=format&fit=crop&w=700&q=80"
                alt="Frenos Brembo"
              />
              <span className="card-tag">Línea Deportiva</span>
            </div>
            <div className="feature-card-content">
              <h4>Sistemas de Frenado Brembo X-Line</h4>
              <p>
                Discos perforados con máxima ventilación térmica y pastillas cerámicas de baja emisión de polvo para control absoluto.
              </p>
              <button
                onClick={() => onCategorySelect('frenos')}
                className="action-link"
              >
                Ver catálogo de frenos <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Banner 2: Suspension */}
          <div className="feature-banner-card">
            <div className="feature-card-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=700&q=80"
                alt="Suspensión KYB y Bilstein"
              />
              <span className="card-tag">Confort y Carga</span>
            </div>
            <div className="feature-card-content">
              <h4>Amortiguadores KYB Gas-A-Just</h4>
              <p>
                Restaura la estabilidad de fábrica o prepárate para carga pesada con amortiguadores monotubo a gas presurizado.
              </p>
              <button
                onClick={() => onCategorySelect('suspension')}
                className="action-link"
              >
                Explorar suspensiones <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Banner 3: Maintenance */}
          <div className="feature-banner-card">
            <div className="feature-card-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=700&q=80"
                alt="Mantenimiento Mayor"
              />
              <span className="card-tag">Kits Completos</span>
            </div>
            <div className="feature-card-content">
              <h4>Kits de Distribución y Encendido</h4>
              <p>
                Correas reforzadas Gates, bombas de agua y bobinas con bujías de Iridio Denso para máxima economía de combustible.
              </p>
              <button
                onClick={() => onCategorySelect('motor')}
                className="action-link"
              >
                Ver kits de servicio <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
