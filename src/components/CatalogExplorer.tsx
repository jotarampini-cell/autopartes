'use client';

import React, { useState, useMemo } from 'react';
import { Filter, PackageSearch } from 'lucide-react';
import { PRODUCTS, BRANDS } from '@/data/autoparts-data';
import { ProductCard } from './ProductCard';
import { useGarage } from '@/context/GarageContext';
import { useCart } from '@/context/CartContext';

interface CatalogExplorerProps {
  selectedCategory: string;
  onResetCategory: () => void;
  searchQuery: string;
}

export const CatalogExplorer: React.FC<CatalogExplorerProps> = ({
  selectedCategory,
  onResetCategory,
  searchQuery,
}) => {
  const { activeVehicle, checkFitment } = useGarage();
  const { showToast } = useCart();

  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [onlyCompatible, setOnlyCompatible] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState('featured');

  const toggleBrand = (brandName: string) => {
    setSelectedBrands(prev => {
      const next = new Set(prev);
      if (next.has(brandName)) {
        next.delete(brandName);
      } else {
        next.add(brandName);
      }
      return next;
    });
  };

  const handleFitmentToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && !activeVehicle) {
      showToast('Primero selecciona tu vehículo en el selector de arriba.', 'warning');
      return;
    }
    setOnlyCompatible(e.target.checked);
  };

  const handleResetFilters = () => {
    onResetCategory();
    setSelectedBrands(new Set());
    setOnlyCompatible(false);
    setMaxPrice(500);
    setSortBy('featured');
    showToast('Filtros restablecidos', 'info');
  };

  const filteredProducts = useMemo(() => {
    const list = PRODUCTS.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrands.size > 0 && !selectedBrands.has(p.brand)) {
        return false;
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchOem = p.oemNumber.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchOem) return false;
      }
      // Compatibility filter
      if (onlyCompatible && activeVehicle) {
        if (checkFitment(p) !== 'compatible') return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, selectedBrands, maxPrice, searchQuery, onlyCompatible, activeVehicle, checkFitment, sortBy]);

  return (
    <section className="section-catalog" id="catalog-section">
      <div className="container">
        <div className="catalog-layout">
          {/* Sidebar Filter */}
          <aside className="catalog-sidebar">
            <div className="filter-header">
              <h4>
                <Filter size={18} /> Filtros
              </h4>
              <button className="filter-reset-btn" onClick={handleResetFilters}>
                Limpiar Todo
              </button>
            </div>

            {/* Fitment toggle */}
            <div className="fitment-toggle-box">
              <span className="fitment-toggle-text">Solo compatibles con mi vehículo</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={onlyCompatible}
                  onChange={handleFitmentToggle}
                />
                <span className="slider-round"></span>
              </label>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <div className="filter-group-title">Precio Máximo ($USD)</div>
              <div className="price-range-inputs">
                <div className="price-input-box">
                  <span>$</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={e => setMaxPrice(parseFloat(e.target.value) || 500)}
                    min={10}
                    max={1000}
                    step={10}
                  />
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="filter-group">
              <div className="filter-group-title">Marca de Fabricante</div>
              <div className="filter-options-list">
                {BRANDS.slice(0, 8).map(b => {
                  const count = PRODUCTS.filter(p => p.brand === b.name).length;
                  return (
                    <label key={b.name} className="filter-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedBrands.has(b.name)}
                        onChange={() => toggleBrand(b.name)}
                      />
                      <span>{b.name}</span>
                      <span className="filter-count">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Catalog View */}
          <main className="catalog-content">
            {/* Toolbar */}
            <div className="catalog-toolbar">
              <div className="catalog-results-count">
                Mostrando <strong>{filteredProducts.length}</strong> de {PRODUCTS.length} repuestos
              </div>
              <div className="catalog-sort-select">
                <label htmlFor="catalog-sort-select-input">Ordenar por:</label>
                <select
                  id="catalog-sort-select-input"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="featured">Relevancia / Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor Calificados</option>
                </select>
              </div>
            </div>

            {/* Grid or Empty */}
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '4rem 1rem',
                  background: '#fff',
                  borderRadius: '16px',
                  border: '1px dashed #cbd5e1',
                }}
              >
                <PackageSearch size={48} stroke="#94a3b8" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  No encontramos piezas con estos filtros
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                  Prueba modificando la marca seleccionada o amplía el rango de precio.
                </p>
                <button
                  className="btn-search-fitment"
                  style={{ maxWidth: '220px', margin: '0 auto' }}
                  onClick={handleResetFilters}
                >
                  Restablecer Filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};
