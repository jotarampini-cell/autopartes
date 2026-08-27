'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { PRODUCTS, Product } from '@/data/autoparts-data';

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, qty?: number) => void;
  updateQuantity: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  selectedQuickViewProduct: Product | null;
  setSelectedQuickViewProduct: (p: Product | null) => void;
  toastMessage: { text: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
  /** Last item added, used for the inline confirmation panel. */
  lastAdded: Product | null;
  dismissLastAdded: () => void;
  recentlyViewed: Product[];
  trackView: (p: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const [lastAdded, setLastAdded] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('haztap_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      const storedViews = localStorage.getItem('haztap_recently_viewed');
      if (storedViews) {
        const ids: string[] = JSON.parse(storedViews);
        setRecentlyViewed(
          ids.map(id => PRODUCTS.find(p => p.id === id)).filter((p): p is Product => !!p)
        );
      }
    } catch {
      // Ignore during SSR
    }
  }, []);

  useEffect(() => () => {
    if (addedTimer.current) clearTimeout(addedTimer.current);
  }, []);

  const trackView = (p: Product) => {
    setRecentlyViewed(prev => {
      const updated = [p, ...prev.filter(item => item.id !== p.id)].slice(0, 8);
      localStorage.setItem('haztap_recently_viewed', JSON.stringify(updated.map(i => i.id)));
      return updated;
    });
  };

  const dismissLastAdded = () => {
    if (addedTimer.current) clearTimeout(addedTimer.current);
    setLastAdded(null);
  };

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (productId: string, qty = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.productId === productId);
      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex].quantity += qty;
      } else {
        updated = [...prev, { productId, quantity: qty }];
      }
      localStorage.setItem('haztap_cart', JSON.stringify(updated));
      return updated;
    });

    // Confirm inline instead of yanking the user into the cart drawer.
    const product = PRODUCTS.find(p => p.id === productId) || null;
    setLastAdded(product);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setLastAdded(null), 5000);
  };

  const updateQuantity = (productId: string, qty: number) => {
    setCart(prev => {
      let updated: CartItem[];
      if (qty <= 0) {
        updated = prev.filter(item => item.productId !== productId);
      } else {
        updated = prev.map(item => (item.productId === productId ? { ...item, quantity: qty } : item));
      }
      localStorage.setItem('haztap_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const updated = prev.filter(item => item.productId !== productId);
      localStorage.setItem('haztap_cart', JSON.stringify(updated));
      return updated;
    });
    showToast('Producto eliminado del carrito', 'info');
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('haztap_cart');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => {
    const p = PRODUCTS.find(prod => prod.id === item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  const freeShippingThreshold = 99.0;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        freeShippingThreshold,
        freeShippingProgress,
        selectedQuickViewProduct,
        setSelectedQuickViewProduct,
        toastMessage,
        showToast,
        lastAdded,
        dismissLastAdded,
        recentlyViewed,
        trackView,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
