'use client';

import React from 'react';
import {
  Disc,
  Cog,
  Activity,
  Wind,
  Zap,
  ThermometerSnowflake,
  Filter,
  Sun,
  Grid3x3,
} from 'lucide-react';
import { CATEGORIES } from '@/data/autoparts-data';

const ICON_MAP: Record<string, React.ElementType> = {
  disc: Disc,
  cog: Cog,
  activity: Activity,
  wind: Wind,
  zap: Zap,
  'thermometer-snowflake': ThermometerSnowflake,
  filter: Filter,
  sun: Sun,
};

interface CategoryShortcutRowProps {
  onSelectCategory: (catId: string) => void;
}

export const CategoryShortcutRow: React.FC<CategoryShortcutRowProps> = ({ onSelectCategory }) => {
  return (
    <section className="shortcut-section">
      <div className="container">
        <div className="shortcut-row">
          {CATEGORIES.map(cat => {
            const Icon = ICON_MAP[cat.icon] || Grid3x3;
            return (
              <button
                key={cat.id}
                className="shortcut-tile"
                onClick={() => onSelectCategory(cat.id)}
              >
                <span className="shortcut-icon">
                  <Icon size={26} />
                </span>
                <span className="shortcut-label shortcut-label-full">{cat.name}</span>
                <span className="shortcut-label shortcut-label-short">
                  {cat.shortName || cat.name}
                </span>
                <span className="shortcut-cta">Ver todo</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
