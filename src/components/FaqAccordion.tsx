'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/data/autoparts-data';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section-faq" id="faq-section">
      <div className="container">
        <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 className="section-header-title">Preguntas Frecuentes</h2>
            <p className="section-header-subtitle">
              Todo lo que necesitas saber sobre compatibilidad, envíos y garantías
            </p>
          </div>
        </div>

        <div className="faq-container">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggle(idx)}>
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className="faq-icon"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
