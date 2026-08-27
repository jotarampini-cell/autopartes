'use client';

import React, { useState } from 'react';
import { Plus, ShoppingBag } from 'lucide-react';
import { Product, getFrequentlyBoughtWith } from '@/data/autoparts-data';
import { useCart } from '@/context/CartContext';

interface FrequentlyBoughtTogetherProps {
  product: Product;
}

export const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({ product }) => {
  const { addToCart } = useCart();
  const companions = getFrequentlyBoughtWith(product);

  // Companions start selected, matching the familiar bundle pattern.
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(companions.map(c => c.id))
  );

  if (companions.length === 0) return null;

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const chosen = companions.filter(c => selected.has(c.id));
  const total = product.price + chosen.reduce((sum, c) => sum + c.price, 0);

  const handleAddBundle = () => {
    addToCart(product.id);
    chosen.forEach(c => addToCart(c.id));
  };

  return (
    <div className="fbt">
      <h4 className="appstore-section-label">Comprados juntos frecuentemente</h4>

      <div className="fbt-row">
        <div className="fbt-item fbt-item-base">
          <img src={product.image} alt="" className="fbt-thumb" />
          <span className="fbt-label">Este artículo</span>
          <span className="fbt-price">${product.price.toFixed(2)}</span>
        </div>

        {companions.map(c => (
          <React.Fragment key={c.id}>
            <span className="fbt-plus" aria-hidden="true">
              <Plus size={14} />
            </span>
            <label className={`fbt-item ${selected.has(c.id) ? 'is-selected' : ''}`}>
              <input
                type="checkbox"
                className="fbt-check"
                checked={selected.has(c.id)}
                onChange={() => toggle(c.id)}
              />
              <img src={c.image} alt="" className="fbt-thumb" />
              <span className="fbt-label">{c.name}</span>
              <span className="fbt-price">${c.price.toFixed(2)}</span>
            </label>
          </React.Fragment>
        ))}
      </div>

      <div className="fbt-footer">
        <div className="fbt-total">
          <span className="fbt-total-label">
            Total por {chosen.length + 1} artículo{chosen.length + 1 !== 1 ? 's' : ''}
          </span>
          <span className="fbt-total-value">${total.toFixed(2)}</span>
        </div>
        <button className="fbt-add-btn" onClick={handleAddBundle}>
          <ShoppingBag size={14} /> Agregar todo
        </button>
      </div>
    </div>
  );
};
