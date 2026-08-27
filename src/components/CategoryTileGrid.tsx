'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS, Category, Product } from '@/data/autoparts-data';

interface CategoryTileGridProps {
  onSelectCategory: (catId: string) => void;
}

interface CategoryRailProps {
  category: Category;
  products: Product[];
  onSelectCategory: (catId: string) => void;
}

/** One scrollable row of products for a single category. */
const CategoryRail: React.FC<CategoryRailProps> = ({ category, products, onSelectCategory }) => {
  const railRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update, products.length]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <div className="catrail">
      <div className="catrail-header">
        <h3 className="catrail-title">{category.name}</h3>
        <button className="catrail-link" onClick={() => onSelectCategory(category.id)}>
          Ver todo <ChevronRight size={14} />
        </button>
      </div>

      <div className="catrail-viewport">
        {canLeft && (
          <button
            className="catrail-arrow prev"
            onClick={() => scrollByPage(-1)}
            aria-label={`Anterior en ${category.name}`}
          >
            <ChevronLeft size={18} />
          </button>
        )}

        <div className="catrail-track" ref={railRef}>
          {products.map(p => (
            <button
              key={p.id}
              className="catrail-item"
              onClick={() => onSelectCategory(category.id)}
              title={p.name}
            >
              <span className="catrail-thumb">
                <img src={p.image} alt="" loading="lazy" />
              </span>
              <span className="catrail-name">{p.name}</span>
              <span className="catrail-price">${p.price.toFixed(2)}</span>
            </button>
          ))}
        </div>

        {canRight && (
          <button
            className="catrail-arrow next"
            onClick={() => scrollByPage(1)}
            aria-label={`Siguiente en ${category.name}`}
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Departments rendered as scrollable rows rather than a stacked grid, so
 * each category can be browsed in place instead of only linked into.
 */
export const CategoryTileGrid: React.FC<CategoryTileGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="cattiles">
      <div className="container">
        {CATEGORIES.map(cat => {
          const items = PRODUCTS.filter(p => p.category === cat.id);
          if (items.length === 0) return null;
          return (
            <CategoryRail
              key={cat.id}
              category={cat}
              products={items}
              onSelectCategory={onSelectCategory}
            />
          );
        })}
      </div>
    </section>
  );
};
