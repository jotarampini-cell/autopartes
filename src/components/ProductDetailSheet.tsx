'use client';

import React from 'react';
import { X, Star, ShieldCheck, Truck, Wrench, CheckCircle2, AlertTriangle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useGarage } from '@/context/GarageContext';
import { FrequentlyBoughtTogether } from './FrequentlyBoughtTogether';

export const ProductDetailSheet: React.FC = () => {
  const { selectedQuickViewProduct, setSelectedQuickViewProduct, addToCart } = useCart();
  const { activeVehicle, checkFitment } = useGarage();

  if (!selectedQuickViewProduct) return null;

  const product = selectedQuickViewProduct;
  const fitStatus = checkFitment(product);

  const handleAddToCart = () => {
    addToCart(product.id);
    setSelectedQuickViewProduct(null);
  };

  return (
    <div
      className="appstore-sheet-backdrop"
      onClick={() => setSelectedQuickViewProduct(null)}
    >
      <div
        className="appstore-detail-modal"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={() => setSelectedQuickViewProduct(null)}
          title="Cerrar"
        >
          <X size={18} />
        </button>

        {/* App Store Header Hero */}
        <div className="appstore-modal-header-hero">
          <img
            src={product.image}
            alt={product.name}
            className="appstore-modal-app-icon"
          />
          <div className="appstore-modal-meta">
            <span className="appstore-modal-brand">{product.brand}</span>
            <h2 className="appstore-modal-title">{product.name}</h2>
            <div className="appstore-modal-subtitle">
              OEM: {product.oemNumber} · {product.category.toUpperCase()}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="appstore-get-btn" onClick={handleAddToCart}>
                <ShoppingBag size={14} /> AGREGAR · ${product.price.toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        {/* App Store Quick Stat Bar */}
        <div className="appstore-stat-bar">
          <div className="appstore-stat-item">
            <span className="appstore-stat-val">
              {product.rating} <Star size={14} fill="var(--apple-orange)" stroke="var(--apple-orange)" />
            </span>
            <span className="appstore-stat-label">{product.reviewsCount} Valoraciones</span>
          </div>

          <div className="appstore-stat-item">
            <span className="appstore-stat-val" style={{ color: 'var(--apple-blue)' }}>
              #1
            </span>
            <span className="appstore-stat-label">En su Categoría</span>
          </div>

          <div className="appstore-stat-item">
            <span className="appstore-stat-val" style={{ color: 'var(--apple-green)' }}>
              <ShieldCheck size={18} />
            </span>
            <span className="appstore-stat-label">Garantía OEM</span>
          </div>

          <div className="appstore-stat-item">
            <span className="appstore-stat-val" style={{ color: 'var(--apple-cyan)' }}>
              <Truck size={18} />
            </span>
            <span className="appstore-stat-label">Envío 24-48h</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="appstore-modal-body">
          {/* Fitment Alert Banner */}
          {activeVehicle && (
            fitStatus === 'compatible' ? (
              <div
                style={{
                  background: 'var(--apple-green-light)',
                  color: '#065f46',
                  padding: '0.85rem 1.25rem',
                  borderRadius: 'var(--radius-squircle-md)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}
              >
                <CheckCircle2 size={18} />
                <span>
                  Ajuste 100% Garantizado para tu {activeVehicle.year} {activeVehicle.make} {activeVehicle.model} ({activeVehicle.engine})
                </span>
              </div>
            ) : (
              <div
                style={{
                  background: '#fff1f0',
                  color: 'var(--apple-red)',
                  padding: '0.85rem 1.25rem',
                  borderRadius: 'var(--radius-squircle-md)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}
              >
                <AlertTriangle size={18} />
                <span>Esta pieza no calza con tu vehículo actual. Consulta con soporte.</span>
              </div>
            )
          )}

          <h4 className="appstore-section-label">Descripción &amp; Novedades</h4>
          <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            {product.shortDesc}
          </p>

          <h4 className="appstore-section-label">Especificaciones Técnicas</h4>
          <div className="appstore-spec-grid">
            {Object.entries(product.specs || {}).map(([key, val]) => (
              <div key={key} className="appstore-spec-pill">
                <strong>{key}</strong>
                <span>{val}</span>
              </div>
            ))}
          </div>

          <FrequentlyBoughtTogether product={product} />

          <div
            style={{
              marginTop: '2rem',
              padding: '1.25rem',
              background: '#fbfbfd',
              borderRadius: 'var(--radius-squircle-md)',
              border: '1px solid var(--ios-separator)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Wrench size={24} color="var(--apple-blue)" />
            <div style={{ fontSize: '0.8125rem', color: '#6e6e73' }}>
              <strong>Instalación Certificada:</strong> Recomendamos la instalación en talleres asociados a Haztap o mecánicos certificados para validar la garantía oficial del fabricante.
            </div>
          </div>
        </div>

        {/* Sticky Footer Action */}
        <div className="appstore-modal-sticky-footer-wrap">
          <div className="fitment-guarantee-line">
            <ShieldCheck size={13} /> Garantía de compatibilidad: cambio o devolución gratis si no encaja
          </div>
          <div className="appstore-modal-sticky-footer">
            <div>
              <div style={{ fontSize: '0.75rem', color: '#86868b' }}>Precio con IVA incluido</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ios-label-primary)' }}>
                ${product.price.toFixed(2)}
              </div>
            </div>
            <button className="appstore-get-btn" onClick={handleAddToCart} style={{ padding: '0.75rem 2rem' }}>
              AGREGAR AL CARRITO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
