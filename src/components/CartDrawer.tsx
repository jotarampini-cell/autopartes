'use client';

import React from 'react';
import { ShoppingBag, X, Lock, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/autoparts-data';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
    showToast,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    showToast('¡Simulación de pago iniciada! Redirigiendo a pasarela segura...', 'success');
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)} />
      <aside className="cart-drawer">
        <div className="drawer-header">
          <h3>
            <ShoppingBag size={20} color="var(--brand-primary)" />
            Tu Carrito de Repuestos
          </h3>
          <button
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            title="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="shipping-progress-box">
          <div className="shipping-progress-text">
            <span>
              {subtotal >= freeShippingThreshold ? (
                <span style={{ color: 'var(--brand-emerald)' }}>
                  ✓ ¡Felicidades! Tienes Envío Gratis asegurado
                </span>
              ) : (
                `Añade $${(freeShippingThreshold - subtotal).toFixed(2)} más para Envío Gratis`
              )}
            </span>
          </div>
          <div className="shipping-bar-track">
            <div
              className="shipping-bar-fill"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="cart-items-scroll">
          {cart.length > 0 ? (
            cart.map(item => {
              const product = PRODUCTS.find(p => p.id === item.productId);
              if (!product) return null;
              const itemTotal = product.price * item.quantity;

              return (
                <div key={item.productId} className="cart-item-row">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cart-item-thumb"
                  />
                  <div className="cart-item-info">
                    <h5 className="cart-item-name">{product.name}</h5>
                    <span className="cart-item-sku">
                      {product.brand} · {product.oemNumber}
                    </span>
                    <div className="cart-item-controls">
                      <div className="qty-stepper">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(product.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="cart-item-price">${itemTotal.toFixed(2)}</span>
                        <span
                          className="cart-item-remove"
                          onClick={() => removeFromCart(product.id)}
                          title="Eliminar del carrito"
                        >
                          ×
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="cart-empty-state">
              <ShoppingCart size={48} stroke="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
              <p>Tu carrito de compras está vacío</p>
              <button
                className="btn-search-fitment"
                onClick={() => setIsCartOpen(false)}
                style={{ margin: '0 auto' }}
              >
                Explorar Catálogo
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-subtotal-row">
              <span>Subtotal Estimado:</span>
              <span style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</span>
            </div>
            <div className="drawer-total-row">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="btn-drawer-checkout" onClick={handleCheckout}>
              <Lock size={18} />
              Continuar al Pago Seguro
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
