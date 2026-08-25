'use client';

import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headset } from 'lucide-react';

const ITEMS = [
  {
    icon: Truck,
    title: 'Envío en 24-48h',
    desc: 'A todo el país con rastreo en tiempo real',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía Haztap Fit',
    desc: 'Ajuste 100% garantizado o te devolvemos el envío',
  },
  {
    icon: RotateCcw,
    title: 'Devoluciones Gratis',
    desc: '30 días para cambios sin preguntas',
  },
  {
    icon: Headset,
    title: 'Soporte Experto',
    desc: 'Mecánicos certificados listos para ayudarte',
  },
];

export const TrustBar: React.FC = () => {
  return (
    <section className="trustbar-section">
      <div className="container">
        <div className="trustbar-grid">
          {ITEMS.map(item => (
            <div key={item.title} className="trustbar-item">
              <span className="trustbar-icon">
                <item.icon size={20} />
              </span>
              <div>
                <div className="trustbar-title">{item.title}</div>
                <div className="trustbar-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
