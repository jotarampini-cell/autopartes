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

interface QuickCategoriesBarProps {
  onSelectCategory: (catId: string) => void;
}

export const QuickCategoriesBar: React.FC<QuickCategoriesBarProps> = ({ onSelectCategory }) => {
  return (
    <section className="quickcats-section">
      <div className="container">
        <div className="quickcats-row">
          {CATEGORIES.map(cat => {
            const Icon = ICON_MAP[cat.icon] || Grid3x3;
            return (
              <button
                key={cat.id}
                className="quickcat-item"
                onClick={() => onSelectCategory(cat.id)}
              >
                <span className="quickcat-icon">
                  <Icon size={22} />
                </span>
                <span className="quickcat-label">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
