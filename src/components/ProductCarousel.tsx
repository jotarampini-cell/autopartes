'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/data/autoparts-data';
import { AppProductCard } from './AppProductCard';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  /** Optional "see all" handler shown next to the title. */
  onSeeAll?: () => void;
  seeAllLabel?: string;
  /** Show numbered rank badges, for best-seller style rows. */
  ranked?: boolean;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
  onSeeAll,
  seeAllLabel = 'Ver todo',
  ranked = false,
}) => {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows, products.length]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <section className="pcarousel">
      <div className="container">
        <div className="pcarousel-header">
          <h2 className="pcarousel-title">{title}</h2>
          {onSeeAll && (
            <button className="pcarousel-seeall" onClick={onSeeAll}>
              {seeAllLabel} <ChevronRight size={14} />
            </button>
          )}
        </div>

        <div className="pcarousel-viewport">
          {canScrollLeft && (
            <button
              className="pcarousel-arrow prev"
              onClick={() => scrollByPage(-1)}
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="pcarousel-rail" ref={railRef}>
            {products.map((p, i) => (
              <div className="pcarousel-item" key={p.id}>
                <AppProductCard product={p} rank={ranked ? i + 1 : undefined} />
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button
              className="pcarousel-arrow next"
              onClick={() => scrollByPage(1)}
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
