'use client';

import React, { useState, useEffect } from 'react';
import {
  X, Star, ShieldCheck, Truck, CheckCircle2, AlertTriangle,
  RotateCcw, Lock, ChevronRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useGarage } from '@/context/GarageContext';
import { getRatingBreakdown, getHighlights } from '@/data/autoparts-data';
import { FrequentlyBoughtTogether } from './FrequentlyBoughtTogether';

/** Stock at or below this is called out as limited. */
const LOW_STOCK = 10;

const StarRow: React.FC<{ rating: number; size?: number }> = ({ rating, size = 14 }) => (
  <span className="pdp-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        fill={i < Math.round(rating) ? 'currentColor' : 'none'}
        strokeWidth={i < Math.round(rating) ? 0 : 1.5}
      />
    ))}
  </span>
);

export const ProductDetailSheet: React.FC = () => {
  const { selectedQuickViewProduct, setSelectedQuickViewProduct, addToCart, setIsCartOpen } = useCart();
  const { activeVehicle, checkFitment } = useGarage();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = selectedQuickViewProduct;

  // Reset per-product UI state whenever a different product opens.
  useEffect(() => {
    setQty(1);
    setActiveImage(0);
  }, [product?.id]);

  // Close on Escape, matching the backdrop click.
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedQuickViewProduct(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, setSelectedQuickViewProduct]);

  if (!product) return null;

  const fitStatus = checkFitment(product);
  const breakdown = getRatingBreakdown(product);
  const highlights = getHighlights(product);
  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  // The catalog carries a single photo per part, so the gallery shows real
  // crops of it rather than filtered copies pretending to be other angles.
  // Each variant needs an explicit height, otherwise the crop is ignored
  // and the CDN returns the identical file.
  const baseImg = product.image.split('?')[0];
  const gallery = [
    `${baseImg}?auto=format&fit=crop&w=800&h=800&q=80&crop=entropy`,
    `${baseImg}?auto=format&fit=crop&w=800&h=800&q=80&crop=top`,
    `${baseImg}?auto=format&fit=crop&w=800&h=800&q=80&crop=bottom`,
  ];

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const deliveryLabel = deliveryDate.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const handleAdd = () => {
    addToCart(product.id, qty);
    setSelectedQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(product.id, qty);
    setSelectedQuickViewProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="pdp-backdrop" onClick={() => setSelectedQuickViewProduct(null)}>
      <div
        className="pdp-modal"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        <button
          className="pdp-close"
          onClick={() => setSelectedQuickViewProduct(null)}
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="pdp-body">
          {/* ---- Gallery ---- */}
          <div className="pdp-gallery">
            <div className="pdp-thumbs">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  className={`pdp-thumb ${i === activeImage ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveImage(i)}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Imagen ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
            <div className="pdp-main-image">
              <img src={gallery[activeImage]} alt={product.name} />
              {discountPct > 0 && <span className="pdp-deal-flag">-{discountPct}%</span>}
            </div>
          </div>

          {/* ---- Center column ---- */}
          <div className="pdp-info">
            <span className="pdp-brand">{product.brand}</span>
            <h2 className="pdp-title">{product.name}</h2>

            <a className="pdp-rating-link" href="#pdp-reviews">
              <StarRow rating={product.rating} />
              <strong>{product.rating}</strong>
              <span>{product.reviewsCount} calificaciones</span>
            </a>

            <div className="pdp-oem">OEM: {product.oemNumber}</div>

            <div className="pdp-price-block">
              {discountPct > 0 && <span className="pdp-price-off">-{discountPct}%</span>}
              <span className="pdp-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="pdp-price-was">
                  Antes: <s>${product.originalPrice.toFixed(2)}</s>
                </span>
              )}
            </div>
            {savings > 0 && (
              <div className="pdp-savings">Ahorras ${savings.toFixed(2)}</div>
            )}

            {/* Fitment verdict, only once a vehicle is set */}
            {activeVehicle && (
              fitStatus === 'compatible' ? (
                <div className="pdp-fit ok">
                  <CheckCircle2 size={17} />
                  <span>
                    Compatible con tu <strong>{activeVehicle.year} {activeVehicle.make} {activeVehicle.model}</strong>
                  </span>
                </div>
              ) : (
                <div className="pdp-fit bad">
                  <AlertTriangle size={17} />
                  <span>No compatible con tu {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}</span>
                </div>
              )
            )}

            <h3 className="pdp-section-label">Acerca de este artículo</h3>
            <ul className="pdp-highlights">
              {highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            <h3 className="pdp-section-label">Especificaciones técnicas</h3>
            <table className="pdp-spec-table">
              <tbody>
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <tr key={key}>
                    <th scope="row">{key}</th>
                    <td>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---- Buy box ---- */}
          <aside className="pdp-buybox">
            <div className="pdp-buybox-price">${product.price.toFixed(2)}</div>

            <div className="pdp-delivery">
              <Truck size={15} />
              <span>
                Entrega <strong>{deliveryLabel}</strong> en pedidos superiores a $99
              </span>
            </div>

            <div className={`pdp-stock ${product.stock <= LOW_STOCK ? 'low' : ''}`}>
              {product.stock > 0
                ? product.stock <= LOW_STOCK
                  ? `¡Solo quedan ${product.stock}!`
                  : 'En stock'
                : 'Agotado'}
            </div>

            <label className="pdp-qty">
              <span>Cantidad:</span>
              <select value={qty} onChange={e => setQty(Number(e.target.value))}>
                {Array.from({ length: Math.min(10, Math.max(1, product.stock)) }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </label>

            <button className="pdp-add-btn" onClick={handleAdd} disabled={product.stock === 0}>
              Agregar al carrito
            </button>
            <button className="pdp-buy-btn" onClick={handleBuyNow} disabled={product.stock === 0}>
              Comprar ahora
            </button>

            <ul className="pdp-assurances">
              <li><Lock size={13} /> Transacción segura</li>
              <li><RotateCcw size={13} /> Devolución gratis en 30 días</li>
              <li><ShieldCheck size={13} /> Garantía de ajuste Haztap</li>
            </ul>
          </aside>
        </div>

        {/* ---- Bundle ---- */}
        <div className="pdp-lower">
          <FrequentlyBoughtTogether product={product} />

          {/* ---- Reviews ---- */}
          <div className="pdp-reviews" id="pdp-reviews">
            <h3 className="pdp-section-label">Opiniones de clientes</h3>
            <div className="pdp-reviews-grid">
              <div className="pdp-reviews-summary">
                <div className="pdp-reviews-score">
                  <StarRow rating={product.rating} size={18} />
                  <div className="pdp-reviews-avg">{product.rating} de 5</div>
                  <div className="pdp-reviews-count">{product.reviewsCount} calificaciones globales</div>
                </div>

                <div className="pdp-bars">
                  {breakdown.map(b => (
                    <div className="pdp-bar-row" key={b.stars}>
                      <span className="pdp-bar-label">{b.stars} estrellas</span>
                      <span className="pdp-bar-track">
                        <span className="pdp-bar-fill" style={{ width: `${b.pct}%` }} />
                      </span>
                      <span className="pdp-bar-pct">{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pdp-reviews-note">
                <p>
                  Las opiniones provienen de compradores verificados que adquirieron esta
                  refacción en Haztap.
                </p>
                <button className="pdp-reviews-cta" onClick={() => setSelectedQuickViewProduct(null)}>
                  Seguir explorando el catálogo <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
