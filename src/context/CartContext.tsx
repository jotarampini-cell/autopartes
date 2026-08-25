'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    { productId: "HZ-BRK-001", quantity: 1 },
    { productId: "HZ-FIL-007", quantity: 2 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('haztap_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch {
      // Ignore during SSR
    }
  }, []);

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
    setIsCartOpen(true);
    showToast('Repuesto añadido al carrito con éxito', 'success');
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
