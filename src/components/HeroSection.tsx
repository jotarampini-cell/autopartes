import React from 'react';

export const HeroSection: React.FC<{ onExplore?: () => void }> = ({ onExplore }) => {
  return (
    <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <img
        src="/assets/hero_image.jpg"
        alt="Taller de autopartes"
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        loading="eager"
      />
      <div
        className="hero-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Encuentra la pieza perfecta para tu auto
        </h1>
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          Más de un millón de repuestos, precios competitivos y garantía de ajuste.
        </p>
        {onExplore && (
          <button
            className="btn-hero-cta"
            onClick={onExplore}
            style={{
              background: '#ff6600',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Explorar Catálogo
          </button>
        )}
      </div>
    </section>
  );
};
