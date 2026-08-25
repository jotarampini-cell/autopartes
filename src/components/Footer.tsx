'use client';

import React from 'react';
import { Gauge, ShieldCheck, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-col">
            <a href="#" className="brand-logo" style={{ color: '#fff' }}>
              <div className="brand-icon">
                <Gauge size={20} />
              </div>
              Haztap <span className="brand-highlight">AutoPartes</span>
            </a>
            <p className="footer-about-text">
              Plataforma de comercio electrónico especializada en repuestos automotrices, accesorios para vehículos 4x4 y refacciones OEM de alto rendimiento con garantía de ajuste total.
            </p>
            <div className="footer-trust-badges">
              <div className="trust-badge">
                <ShieldCheck size={16} color="#10b981" />
                Pago 100% Seguro SSL
              </div>
              <div className="trust-badge">
                <Truck size={16} color="#00d2ff" />
                Envíos DHL &amp; FedEx
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h5>Categorías Clave</h5>
            <ul className="footer-links">
              <li>
                <a href="#catalog-section">Discos y Pastillas de Freno</a>
              </li>
              <li>
                <a href="#catalog-section">Kits de Distribución y Motor</a>
              </li>
              <li>
                <a href="#catalog-section">Amortiguadores y Espirales</a>
              </li>
              <li>
                <a href="#catalog-section">Alternadores y Baterías</a>
              </li>
              <li>
                <a href="#catalog-section">Sistemas de Escape Deportivo</a>
              </li>
              <li>
                <a href="#catalog-section">Filtros de Aire y Cabina</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Atención al Cliente</h5>
            <ul className="footer-links">
              <li>
                <a href="#faq-section">Garantía Haztap Fit</a>
              </li>
              <li>
                <a href="#faq-section">Tiempos y Costos de Envío</a>
              </li>
              <li>
                <a href="#faq-section">Devoluciones y Reembolsos</a>
              </li>
              <li>
                <a href="#faq-section">Localizador de Talleres Aliados</a>
              </li>
              <li>
                <a href="#faq-section">Facturación Electrónica</a>
              </li>
              <li>
                <a href="#faq-section">Contacto con Especialistas</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Garantías y Calidad</h5>
            <ul className="footer-links">
              <li>
                <a href="#brands-section">Certificaciones OEM</a>
              </li>
              <li>
                <a href="#brands-section">Distribuidores Autorizados</a>
              </li>
              <li>
                <a href="#">Términos del Servicio</a>
              </li>
              <li>
                <a href="#">Aviso de Privacidad</a>
              </li>
              <li>
                <a href="#">Programa para Talleres Mecánicos</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 Haztap AutoPartes Inc. Todos los derechos reservados.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#64748b' }}>
              Privacidad
            </a>
            <a href="#" style={{ color: '#64748b' }}>
              Términos
            </a>
            <a href="#" style={{ color: '#64748b' }}>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
