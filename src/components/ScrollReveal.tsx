'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Delay in ms before the element eases in, for staggering siblings. */
  delay?: number;
}

/**
 * Eases its children in as they scroll into view.
 *
 * The hidden state is opt-in rather than the default: markup renders fully
 * visible, and the "armed" class that hides it is only applied once this
 * effect has run and an observer is watching. If JS never runs, the observer
 * never fires, or the element is far below the fold, the content simply stays
 * visible instead of being stranded at opacity 0.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    // Anything already on screen at mount stays visible and is never hidden.
    // The margin here is generous: sections on this page sit well over a
    // screen apart, and a tight margin means content is still hidden when
    // the user arrives at it.
    const preloadMargin = Math.round(window.innerHeight * 1.5);
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight + preloadMargin && rect.bottom > -preloadMargin) {
      setVisible(true);
      return;
    }

    setArmed(true);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: `${preloadMargin}px 0px ${preloadMargin}px 0px` }
    );

    observer.observe(node);

    // Safety net: if the observer has not fired by now, show the content
    // anyway rather than leaving a blank stretch of page.
    const failsafe = window.setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const cls = ['reveal', armed ? 'reveal-armed' : '', visible ? 'is-visible' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={cls} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
};
