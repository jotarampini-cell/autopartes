'use client';

import React from 'react';
import { CheckCircle2, X, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const AddedToCartPanel: React.FC = () => {
  const {
    lastAdded,
    dismissLastAdded,
    setIsCartOpen,
    totalItems,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
  } = useCart();

  if (!lastAdded) return null;

  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const qualifies = remaining === 0;

  return (
    <div className="added-panel" role="status" aria-live="polite">
      <button className="added-panel-close" onClick={dismissLastAdded} aria-label="Cerrar">
        <X size={15} />
      </button>

      <div className="added-panel-head">
        <CheckCircle2 size={16} className="added-panel-check" />
        <span>Agregado al carrito</span>
      </div>

      <div className="added-panel-item">
        <img src={lastAdded.image} alt="" className="added-panel-thumb" />
        <div className="added-panel-info">
          <div className="added-panel-name">{lastAdded.name}</div>
          <div className="added-panel-price">${lastAdded.price.toFixed(2)}</div>
        </div>
      </div>

      <div className="added-panel-shipping">
        <div className="added-panel-shipping-text">
          <Truck size={13} />
          {qualifies ? (
            <span>
              <strong>¡Tienes envío gratis!</strong>
            </span>
          ) : (
            <span>
              Te faltan <strong>${remaining.toFixed(2)}</strong> para envío gratis
            </span>
          )}
        </div>
        <div className="added-panel-bar">
          <div
            className="added-panel-bar-fill"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="added-panel-actions">
        <button className="added-panel-continue" onClick={dismissLastAdded}>
          Seguir comprando
        </button>
        <button
          className="added-panel-view"
          onClick={() => {
            dismissLastAdded();
            setIsCartOpen(true);
          }}
        >
          Ver carrito ({totalItems})
        </button>
      </div>
    </div>
  );
};
