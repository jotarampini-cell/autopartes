'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, Star } from 'lucide-react';
import { Product } from '@/data/autoparts-data';
import { useGarage } from '@/context/GarageContext';
import { useCart } from '@/context/CartContext';

interface AppProductCardProps {
  product: Product;
  rank?: number;
}

export const AppProductCard: React.FC<AppProductCardProps> = ({ product, rank }) => {
  const { activeVehicle, checkFitment } = useGarage();
  const { addToCart, setSelectedQuickViewProduct } = useCart();

  const fitStatus = checkFitment(product);

  return (
    <div
      className="app-product-card"
      onClick={() => setSelectedQuickViewProduct(product)}
      style={{ cursor: 'pointer' }}
    >
      <div className="app-card-thumb-wrapper">
        <img src={product.image} alt={product.name} loading="lazy" />
        {rank ? (
          <span className="app-card-rank-pill">#{rank}</span>
        ) : (
          product.badge && <span className="app-card-badge-pill">{product.badge}</span>
        )}
      </div>

      <div className="app-card-body">
        {/* Fitment indicator — only shown once a vehicle is set, so it reads as
            real signal instead of repeating the same prompt on every card. */}
        {activeVehicle && (
          fitStatus === 'compatible' ? (
            <span className="app-fit-pill compatible">
              <CheckCircle2 size={12} /> Compatible con tu {activeVehicle.model}
            </span>
          ) : (
            <span className="app-fit-pill incompatible">
              <AlertTriangle size={12} /> No compatible con tu {activeVehicle.model}
            </span>
          )
        )}

        <div className="app-card-brand">{product.brand}</div>
        <h4 className="app-card-name" title={product.name}>
          {product.name}
        </h4>
        <div className="app-card-oem">OEM: {product.oemNumber}</div>

        <div className="app-card-rating-row">
          <span className="app-card-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                strokeWidth={i < Math.round(product.rating) ? 0 : 1.5}
              />
            ))}
          </span>
          <span className="app-card-rating-value">{product.rating}</span>
          <span className="app-card-rating-count">({product.reviewsCount})</span>
        </div>

        <div className="app-card-footer" onClick={e => e.stopPropagation()}>
          <div className="app-card-price-group">
            <span className="app-card-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="app-card-orig-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className="btn-app-get"
            onClick={() => addToCart(product.id)}
          >
            AGREGAR
          </button>
        </div>
      </div>
    </div>
  );
};
