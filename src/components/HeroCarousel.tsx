'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PROMO_SLIDES } from '@/data/autoparts-data';

interface HeroCarouselProps {
  onSelectCategory: (catId: string) => void;
}

const AUTOPLAY_MS = 6000;

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onSelectCategory }) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = PROMO_SLIDES.length;

  const goTo = useCallback((i: number) => setIndex((i + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, isPaused, next]);

  // Touch swipe: horizontal drags past the threshold change slides.
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    const startY = touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    setIsPaused(false);
    if (startX === null || startY === null) return;

    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    // Ignore mostly-vertical drags so page scrolling still works.
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) next();
    else prev();
  };

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Promociones destacadas"
    >
      <div className="container">
        <div
          className="hero-carousel-frame"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {PROMO_SLIDES.map((s, i) => (
            <div
              key={s.id}
              className={`hero-slide ${i === index ? 'active' : ''}`}
              aria-hidden={i !== index}
            >
              <img src={s.image} alt="" className="hero-slide-img" loading={i === 0 ? 'eager' : 'lazy'} />
              <div className="hero-slide-scrim" />
              <div className="hero-slide-content">
                <span className="hero-slide-eyebrow">{s.eyebrow}</span>
                <h2 className="hero-slide-headline">{s.headline}</h2>
                <p className="hero-slide-subhead">{s.subhead}</p>
                <button
                  className="hero-slide-cta"
                  onClick={() => onSelectCategory(s.categoryId)}
                  tabIndex={i === index ? 0 : -1}
                >
                  {s.ctaText}
                </button>
              </div>
            </div>
          ))}

          <button className="hero-nav prev" onClick={prev} aria-label="Anterior">
            <ChevronLeft size={22} />
          </button>
          <button className="hero-nav next" onClick={next} aria-label="Siguiente">
            <ChevronRight size={22} />
          </button>

          <div className="hero-dots">
            {PROMO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                className={`hero-dot ${i === index ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Ir a promoción ${i + 1} de ${count}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
