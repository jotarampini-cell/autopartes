'use client';

import React from 'react';
import { X, CheckCircle, AlertTriangle, PackageCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useGarage } from '@/context/GarageContext';

export const QuickViewModal: React.FC = () => {
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
      className="modal-backdrop"
      onClick={() => setSelectedQuickViewProduct(null)}
    >
      <div
        className="quickview-modal"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={() => setSelectedQuickViewProduct(null)}
          title="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="modal-grid">
          <div className="modal-gallery">
            <img
              src={product.image}
              alt={product.name}
              className="modal-main-img"
            />
          </div>

          <div className="modal-details">
            <span className="modal-brand">{product.brand}</span>
            <h3 className="modal-title">{product.name}</h3>
            <div className="modal-oem-line">Código OEM / Fabricante: {product.oemNumber}</div>

            {/* Fitment indicator in modal */}
            {activeVehicle && (
              fitStatus === 'compatible' ? (
                <div className="card-fitment-badge compatible" style={{ marginBottom: '1rem' }}>
                  <CheckCircle size={16} /> Ajuste 100% Garantizado para {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
                </div>
              ) : (
                <div className="card-fitment-badge incompatible" style={{ marginBottom: '1rem' }}>
                  <AlertTriangle size={16} /> Esta pieza no calza con tu vehículo actual
                </div>
              )
            )}

            <div className="modal-price-box">
              <span className="modal-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="product-price-original" style={{ fontSize: '1rem' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="modal-stock-status">
              <PackageCheck size={16} />
              <span>En Stock ({product.stock} unidades disponibles - Envío Inmediato)</span>
            </div>

            <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {product.shortDesc}
            </p>

            <table className="modal-specs-table">
              <tbody>
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="modal-actions">
              <button className="btn-modal-add-cart" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
