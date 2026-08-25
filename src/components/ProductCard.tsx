'use client';

import React from 'react';
import { ShoppingBag, Eye, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { Product } from '@/data/autoparts-data';
import { useGarage } from '@/context/GarageContext';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { activeVehicle, checkFitment } = useGarage();
  const { addToCart, setSelectedQuickViewProduct } = useCart();

  const fitStatus = checkFitment(product);

  return (
    <div className="product-card">
      <div className="product-card-top">
        <img src={product.image} alt={product.name} className="product-card-thumb" loading="lazy" />
        {product.badge && <span className="product-badge-overlay">{product.badge}</span>}
        <button
          className="btn-card-quickview"
          onClick={() => setSelectedQuickViewProduct(product)}
        >
          <Eye size={14} /> Vista Rápida
        </button>
      </div>

      <div className="product-card-body">
        {/* Compatibility badge */}
        {activeVehicle ? (
          fitStatus === 'compatible' ? (
            <span className="card-fitment-badge compatible">
              <CheckCircle size={14} /> Compatible con {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
            </span>
          ) : (
            <span className="card-fitment-badge incompatible">
              <AlertTriangle size={14} /> No verificado para tu vehículo
            </span>
          )
        ) : (
          <span className="card-fitment-badge unknown">
            <HelpCircle size={14} /> Selecciona vehículo para verificar
          </span>
        )}

        <div className="product-brand-tag">{product.brand}</div>
        <h4 className="product-card-title" title={product.name}>
          {product.name}
        </h4>
        <div className="product-oem-code">OEM: {product.oemNumber}</div>

        <div className="product-rating-row">
          <span className="rating-stars">★ {product.rating}</span>
          <span className="rating-count">({product.reviewsCount} opiniones)</span>
        </div>

        <div className="product-card-footer">
          <div className="product-pricing">
            <span className="product-price-current">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-price-original">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className="btn-card-add-cart"
            title="Añadir al carrito"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
