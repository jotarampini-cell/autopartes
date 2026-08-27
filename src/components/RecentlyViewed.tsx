'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const RecentlyViewed: React.FC = () => {
  const { recentlyViewed, setSelectedQuickViewProduct, trackView } = useCart();

  // Nothing meaningful to show until the shopper has browsed a little.
  if (recentlyViewed.length < 2) return null;

  return (
    <section className="recent-section">
      <div className="container">
        <div className="recent-header">
          <h2 className="recent-title">
            <Clock size={16} /> Vistos recientemente
          </h2>
        </div>

        <div className="recent-rail">
          {recentlyViewed.map(p => (
            <button
              key={p.id}
              className="recent-item"
              onClick={() => {
                trackView(p);
                setSelectedQuickViewProduct(p);
              }}
            >
              <div className="recent-thumb">
                <img src={p.image} alt="" loading="lazy" />
              </div>
              <div className="recent-name">{p.name}</div>
              <div className="recent-price">${p.price.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
