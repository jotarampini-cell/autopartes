'use client';

import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { CATEGORIES } from '@/data/autoparts-data';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <nav className="nav-categories-bar">
      <div className="container">
        <ul className="nav-categories-list">
          <li className={`nav-cat-item ${selectedCategory === 'all' ? 'active' : ''}`}>
            <button onClick={() => onSelectCategory('all')}>
              <LayoutGrid size={16} /> Todos los Repuestos
            </button>
          </li>
          {CATEGORIES.map(cat => (
            <li
              key={cat.id}
              className={`nav-cat-item ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              <button onClick={() => onSelectCategory(cat.id)}>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
