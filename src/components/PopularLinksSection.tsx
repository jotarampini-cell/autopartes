'use client';

import React from 'react';
import { POPULAR_LINK_COLUMNS } from '@/data/autoparts-data';

interface PopularLinksSectionProps {
  onSelectCategory: (catId: string) => void;
}

export const PopularLinksSection: React.FC<PopularLinksSectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="popular-links-section">
      <div className="container">
        <div className="popular-links-grid">
          {POPULAR_LINK_COLUMNS.map(col => (
            <div key={col.title} className="popular-links-col">
              <h3 className="popular-links-title">{col.title}</h3>
              <ul className="popular-links-list">
                {col.links.map(link => (
                  <li key={link.label}>
                    <button
                      className="popular-link"
                      onClick={() =>
                        link.categoryId
                          ? onSelectCategory(link.categoryId)
                          : onSelectCategory('all')
                      }
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
