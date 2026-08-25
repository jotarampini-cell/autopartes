'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Gauge, Search, ArrowRight, Car, ChevronDown, ShoppingCart, HelpCircle, ShieldCheck, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useGarage } from '@/context/GarageContext';
import { PRODUCTS, Product } from '@/data/autoparts-data';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const { totalItems, setIsCartOpen, setSelectedQuickViewProduct } = useCart();
  const { activeVehicle, setIsGarageModalOpen } = useGarage();
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingProducts, setMatchingProducts] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (onSearchChange) onSearchChange(q);

    if (q.trim().length >= 2) {
      const qLower = q.toLowerCase();
      const filtered = PRODUCTS.filter(
        p =>
          p.name.toLowerCase().includes(qLower) ||
          p.brand.toLowerCase().includes(qLower) ||
          p.oemNumber.toLowerCase().includes(qLower) ||
          p.category.toLowerCase().includes(qLower)
      ).slice(0, 5);
      setMatchingProducts(filtered);
      setIsDropdownOpen(true);
    } else {
      setMatchingProducts([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedQuickViewProduct(product);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="top-announcement">
        <div className="container top-announcement-inner">
          <div className="announcement-highlight">
            <span className="badge">Garantía Haztap Fit</span>
            <span>Ajuste 100% garantizado en todas las piezas o te devolvemos tu dinero</span>
          </div>
          <div className="top-links">
            <a href="#faq-section">
              <HelpCircle size={14} /> Centro de Ayuda
            </a>
            <a href="#brands-section">
              <ShieldCheck size={14} /> Marcas Oficiales
            </a>
            <a href="#">
              <Phone size={14} /> Soporte Técnico: +1 (800) 555-HAZTAP
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container">
          <div className="header-main-row">
            {/* Logo */}
            <a href="#" className="brand-logo">
              <div className="brand-icon">
                <Gauge size={24} />
              </div>
              <div>
                Haztap <span className="brand-highlight">AutoPartes</span>
              </div>
            </a>

            {/* Smart Search */}
            <div className="header-search-container" ref={searchContainerRef}>
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon-prefix" />
                <input
                  type="text"
                  placeholder="Buscar por número OEM, pieza (ej. Discos Brembo, Alternador)..."
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onFocus={() => searchQuery.trim().length >= 2 && setIsDropdownOpen(true)}
                  autoComplete="off"
                />
                <button
                  className="search-submit-btn"
                  title="Buscar"
                  onClick={() => onSearchChange && onSearchChange(searchQuery)}
                >
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Autocomplete Dropdown */}
              {isDropdownOpen && (
                <div className="search-results-dropdown">
                  {matchingProducts.length > 0 ? (
                    <>
                      <div className="search-res-header">
                        Resultados coincidentes ({matchingProducts.length})
                      </div>
                      {matchingProducts.map(p => (
                        <div
                          key={p.id}
                          className="search-res-item"
                          onClick={() => handleSelectProduct(p)}
                        >
                          <img src={p.image} alt={p.name} className="search-res-thumb" />
                          <div className="search-res-meta">
                            <div className="search-res-title">{p.name}</div>
                            <div className="search-res-sku">
                              {p.brand} · OEM: {p.oemNumber}
                            </div>
                          </div>
                          <div className="search-res-price">${p.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                      No se encontraron coincidencias exactas para &quot;<strong>{searchQuery}</strong>&quot;.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Garage & Cart Actions */}
            <div className="header-actions">
              <button
                className="garage-trigger-btn"
                onClick={() => setIsGarageModalOpen(true)}
                title="Administrar Mi Garaje"
              >
                <Car size={20} className="garage-car-icon" />
                <div className="garage-info">
                  <span className="garage-label">Mi Garaje</span>
                  <span className="garage-current-vehicle">
                    {activeVehicle ? `${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model}` : 'Selecciona tu Vehículo'}
                  </span>
                </div>
                <ChevronDown size={14} color="#94a3b8" />
              </button>

              <button
                className="header-action-btn"
                onClick={() => setIsCartOpen(true)}
                title="Ver Carrito de Repuestos"
              >
                <ShoppingCart size={22} />
                <span className="cart-counter-badge">{totalItems}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
