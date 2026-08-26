'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const NewsletterSignup: React.FC = () => {
  const { showToast } = useCart();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Ingresa un correo electrónico válido.', 'warning');
      return;
    }
    showToast('¡Listo! Te avisaremos de las próximas ofertas.', 'success');
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-inner">
          <div className="newsletter-copy">
            <span className="newsletter-icon">
              <Mail size={20} />
            </span>
            <div>
              <h3 className="newsletter-title">Recibe las ofertas antes que nadie</h3>
              <p className="newsletter-desc">
                Promociones, lanzamientos y guías de mantenimiento en tu correo.
              </p>
            </div>
          </div>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="Correo electrónico"
            />
            <button type="submit" className="newsletter-btn">
              Suscribirme
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
