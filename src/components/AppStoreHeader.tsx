'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Gauge, Search, Car, ShoppingBag, Sparkles, Layers, Award, Tag, Phone, Truck, MapPin, Menu, X, ChevronDown, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useGarage } from '@/context/GarageContext';
import { PRODUCTS, Product } from '@/data/autoparts-data';

interface AppStoreHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearchChange: (query: string) => void;
}

export const AppStoreHeader: React.FC<AppStoreHeaderProps> = ({
  activeTab,
  onTabChange,
  onSearchChange,
}) => {
  const { totalItems, setIsCartOpen, setSelectedQuickViewProduct } = useCart();
  const { activeVehicle, setIsGarageModalOpen } = useGarage();
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingProducts, setMatchingProducts] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileSearchOpen) {
      mobileSearchInputRef.current?.focus();
    }
  }, [isMobileSearchOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    onSearchChange(q);

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
      <div className="util-strip">
        <div className="container util-strip-inner">
          <div className="util-strip-left">
            <span className="util-strip-item">
              <Phone size={13} /> (800) 555-0199
            </span>
            <span className="util-strip-item">
              <Truck size={13} /> Envío gratis en compras +$99
            </span>
          </div>
          <div className="util-strip-right">
            <a href="#brands-section">Marcas Certificadas</a>
            <a href="#faq-section">Ayuda</a>
            <span className="util-strip-item">
              <MapPin size={13} /> Rastrea tu Pedido
            </span>
          </div>
        </div>
      </div>
      <header className="appstore-header-wrapper">
      <div className="container appstore-header-inner">
        {/* Logo */}
        <a href="#" className="appstore-logo" onClick={() => onTabChange('today')}>
          <div className="appstore-logo-icon">
            <Gauge size={22} />
          </div>
          <div>
            Haztap <span style={{ color: 'var(--apple-blue)' }}>Store</span>
          </div>
        </a>

        {/* Segmented Discovery Tabs */}
        <nav className="appstore-nav-tabs">
          <button
            className={`appstore-tab-btn ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => onTabChange('today')}
          >
            <Sparkles size={14} /> Hoy
          </button>
          <button
            className={`appstore-tab-btn ${activeTab === 'charts' ? 'active' : ''}`}
            onClick={() => onTabChange('charts')}
          >
            <Award size={14} /> Top Repuestos
          </button>
          <button
            className={`appstore-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => onTabChange('catalog')}
          >
            <Layers size={14} /> Catálogo
          </button>
          <button
            className={`appstore-tab-btn ${activeTab === 'brands' ? 'active' : ''}`}
            onClick={() => onTabChange('brands')}
          >
            <Tag size={14} /> Marcas
          </button>
        </nav>

        {/* Mobile Search Toggle */}
        <button
          className="appstore-mobile-search-btn"
          onClick={() => setIsMobileSearchOpen(open => !open)}
          aria-label="Buscar"
        >
          <Search size={20} />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="appstore-mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(open => !open)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Actions (Search, Garage, Cart) */}
        <div className="appstore-actions">
          <div className="appstore-search-pill" ref={searchRef}>
            <Search size={16} color="#86868b" />
            <input
              type="text"
              placeholder="Buscar por OEM o pieza..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => searchQuery.trim().length >= 2 && setIsDropdownOpen(true)}
            />

            {/* Quick Autocomplete Dropdown */}
            {isDropdownOpen && (
              <div className="search-results-dropdown">
                {matchingProducts.length > 0 ? (
                  <>
                    <div className="search-res-header">
                      Sugerencias instantáneas ({matchingProducts.length})
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
                          <div className="search-res-sku">{p.brand} · OEM: {p.oemNumber}</div>
                        </div>
                        <div className="search-res-price">${p.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div style={{ padding: '1.25rem', textAlign: 'center', color: '#86868b', fontSize: '0.8125rem' }}>
                    No se encontraron repuestos para &quot;<strong>{searchQuery}</strong>&quot;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Garage Selector */}
          <button
            className="appstore-garage-pill"
            onClick={() => setIsGarageModalOpen(true)}
            title="Seleccionar Vehículo en Garaje"
          >
            <Car size={16} />
            <span>
              {activeVehicle ? `${activeVehicle.year} ${activeVehicle.make}` : 'Tu Garaje'}
            </span>
          </button>

          {/* Cart Pill */}
          <button
            className="appstore-cart-pill"
            onClick={() => setIsCartOpen(true)}
            title="Abrir Carrito de Repuestos"
          >
            <ShoppingBag size={16} />
            <span>Carrito</span>
            <span className="appstore-cart-counter">{totalItems}</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay Row — expands in place of the vehicle bar */}
      {isMobileSearchOpen && (
        <div className="mobile-search-row">
          <div className="mobile-search-pill">
            <Search size={16} color="#86868b" />
            <input
              ref={mobileSearchInputRef}
              type="text"
              placeholder="Buscar por OEM o pieza..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button
              className="mobile-search-close"
              onClick={() => setIsMobileSearchOpen(false)}
              aria-label="Cerrar búsqueda"
            >
              <X size={16} />
            </button>
          </div>

          {(isDropdownOpen || searchQuery.trim().length >= 2) && (
            <div className="search-results-dropdown mobile-search-results">
              {matchingProducts.length > 0 ? (
                <>
                  <div className="search-res-header">
                    Sugerencias instantáneas ({matchingProducts.length})
                  </div>
                  {matchingProducts.map(p => (
                    <div
                      key={p.id}
                      className="search-res-item"
                      onClick={() => {
                        handleSelectProduct(p);
                        setIsMobileSearchOpen(false);
                      }}
                    >
                      <img src={p.image} alt={p.name} className="search-res-thumb" />
                      <div className="search-res-meta">
                        <div className="search-res-title">{p.name}</div>
                        <div className="search-res-sku">{p.brand} · OEM: {p.oemNumber}</div>
                      </div>
                      <div className="search-res-price">${p.price.toFixed(2)}</div>
                    </div>
                  ))}
                </>
              ) : (
                <div style={{ padding: '1.25rem', textAlign: 'center', color: '#86868b', fontSize: '0.8125rem' }}>
                  No se encontraron repuestos para &quot;<strong>{searchQuery}</strong>&quot;
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Persistent Vehicle Bar (mobile) — keeps fitment context always visible */}
      {!isMobileSearchOpen && (
        <button className="vehicle-bar" onClick={() => setIsGarageModalOpen(true)}>
          {activeVehicle ? (
            <>
              <span className="vehicle-bar-icon active">
                <Car size={13} />
              </span>
              <span className="vehicle-bar-text">
                <strong>{activeVehicle.year} {activeVehicle.make} {activeVehicle.model}</strong>
              </span>
              <ChevronDown size={14} className="vehicle-bar-chevron" />
            </>
          ) : (
            <>
              <span className="vehicle-bar-icon">
                <Plus size={13} />
              </span>
              <span className="vehicle-bar-text">
                <strong>Selecciona tu vehículo</strong> para ver piezas compatibles
              </span>
              <ChevronDown size={14} className="vehicle-bar-chevron" />
            </>
          )}
        </button>
      )}

      {/* Mobile Nav Panel */}
      {isMobileMenuOpen && (
        <nav className="appstore-mobile-nav">
          <button
            className={`appstore-mobile-tab-btn ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => { onTabChange('today'); setIsMobileMenuOpen(false); }}
          >
            <Sparkles size={16} /> Hoy
          </button>
          <button
            className={`appstore-mobile-tab-btn ${activeTab === 'charts' ? 'active' : ''}`}
            onClick={() => { onTabChange('charts'); setIsMobileMenuOpen(false); }}
          >
            <Award size={16} /> Top Repuestos
          </button>
          <button
            className={`appstore-mobile-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => { onTabChange('catalog'); setIsMobileMenuOpen(false); }}
          >
            <Layers size={16} /> Catálogo
          </button>
          <button
            className={`appstore-mobile-tab-btn ${activeTab === 'brands' ? 'active' : ''}`}
            onClick={() => { onTabChange('brands'); setIsMobileMenuOpen(false); }}
          >
            <Tag size={16} /> Marcas
          </button>
        </nav>
      )}
      </header>
    </>
  );
};
