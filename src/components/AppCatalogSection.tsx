'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Filter, PackageSearch, X, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, BRANDS, CATEGORIES } from '@/data/autoparts-data';
import { AppProductCard } from './AppProductCard';
import { useGarage } from '@/context/GarageContext';
import { useCart } from '@/context/CartContext';

interface AppCatalogSectionProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
}

export const AppCatalogSection: React.FC<AppCatalogSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
}) => {
  const { activeVehicle, checkFitment } = useGarage();
  const { showToast } = useCart();

  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [onlyCompatible, setOnlyCompatible] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [page, setPage] = useState(1);

  const toggleBrand = (b: string) => {
    setSelectedBrands(prev => {
      const next = new Set(prev);
      if (next.has(b)) next.delete(b);
      else next.add(b);
      return next;
    });
  };

  const handleReset = () => {
    onSelectCategory('all');
    setSelectedBrands(new Set());
    setOnlyCompatible(false);
    setMaxPrice(500);
    setSortBy('featured');
    showToast('Filtros restablecidos', 'info');
  };

  const filtered = useMemo(() => {
    const list = PRODUCTS.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedBrands.size > 0 && !selectedBrands.has(p.brand)) return false;
      if (p.price > maxPrice) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mName = p.name.toLowerCase().includes(q);
        const mBrand = p.brand.toLowerCase().includes(q);
        const mOem = p.oemNumber.toLowerCase().includes(q);
        if (!mName && !mBrand && !mOem) return false;
      }
      if (onlyCompatible && activeVehicle) {
        if (checkFitment(p) !== 'compatible') return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [selectedCategory, selectedBrands, maxPrice, searchQuery, onlyCompatible, activeVehicle, checkFitment, sortBy]);

  // Keep the home page short: show one page of results with the rest a
  // click away, rather than dumping the whole catalog inline.
  const PER_PAGE = 12;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  // Any change to the result set sends the user back to the first page.
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedBrands, maxPrice, searchQuery, onlyCompatible, sortBy]);

  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), pageCount));
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) + selectedBrands.size + (onlyCompatible ? 1 : 0) + (maxPrice < 500 ? 1 : 0);

  const activeFilterChips: { key: string; label: string; onRemove: () => void }[] = [];
  if (selectedCategory !== 'all') {
    const cat = CATEGORIES.find(c => c.id === selectedCategory);
    if (cat) activeFilterChips.push({ key: 'cat', label: cat.name, onRemove: () => onSelectCategory('all') });
  }
  if (onlyCompatible) {
    activeFilterChips.push({ key: 'compat', label: 'Solo compatibles', onRemove: () => setOnlyCompatible(false) });
  }
  selectedBrands.forEach(b => {
    activeFilterChips.push({ key: `brand-${b}`, label: b, onRemove: () => toggleBrand(b) });
  });
  if (maxPrice < 500) {
    activeFilterChips.push({ key: 'price', label: `Hasta $${maxPrice}`, onRemove: () => setMaxPrice(500) });
  }

  const filterPanelContent = (
    <>
      {/* Fitment toggle */}
      <div className="fitment-toggle-box">
        <span className="fitment-toggle-text">Solo compatibles</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={onlyCompatible}
            onChange={e => {
              if (e.target.checked && !activeVehicle) {
                showToast('Configura tu vehículo primero en la parte superior.', 'warning');
                return;
              }
              setOnlyCompatible(e.target.checked);
            }}
          />
          <span className="slider-round"></span>
        </label>
      </div>

      {/* Category selection list */}
      <div className="filter-group">
        <div className="filter-group-title">Categoría</div>
        <div className="filter-options-list">
          <label className="filter-checkbox-label">
            <input
              type="radio"
              name="app-cat"
              checked={selectedCategory === 'all'}
              onChange={() => onSelectCategory('all')}
            />
            <span>Todas las piezas</span>
          </label>
          {CATEGORIES.map(c => (
            <label key={c.id} className="filter-checkbox-label">
              <input
                type="radio"
                name="app-cat"
                checked={selectedCategory === c.id}
                onChange={() => onSelectCategory(c.id)}
              />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price slider */}
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

      {/* Brands list */}
      <div className="filter-group">
        <div className="filter-group-title">Marcas Certificadas</div>
        <div className="filter-options-list">
          {BRANDS.slice(0, 7).map(b => (
            <label key={b.name} className="filter-checkbox-label">
              <input
                type="checkbox"
                checked={selectedBrands.has(b.name)}
                onChange={() => toggleBrand(b.name)}
              />
              <span>{b.name}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section className="section-app-catalog" id="catalog-section">
      <div className="container">
        {/* Header */}
        <div className="section-app-header">
          <div>
            <h2 className="section-app-title">Catálogo Completo de Repuestos</h2>
            <p className="section-app-subtitle">
              {filtered.length > 0
                ? `${(currentPage - 1) * PER_PAGE + 1}-${Math.min(currentPage * PER_PAGE, filtered.length)} de ${filtered.length} repuestos`
                : '0 repuestos'}
              {activeVehicle ? ` para tu ${activeVehicle.make} ${activeVehicle.model}` : ''}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <label htmlFor="app-sort" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#6e6e73' }}>
              Ordenar:
            </label>
            <select
              id="app-sort"
              className="ios-field-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ width: 'auto', padding: '0.4rem 0.8rem' }}
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificados</option>
            </select>
          </div>
        </div>

        {/* Mobile: sticky filter trigger + active filter chips */}
        <div className="mobile-filter-bar">
          <button className="mobile-filter-trigger" onClick={() => setIsFilterSheetOpen(true)}>
            <SlidersHorizontal size={15} />
            Filtrar y Ordenar
            {activeFilterCount > 0 && <span className="mobile-filter-count">{activeFilterCount}</span>}
          </button>
        </div>
        {activeFilterChips.length > 0 && (
          <div className="active-filter-chips">
            {activeFilterChips.map(chip => (
              <button key={chip.key} className="active-filter-chip" onClick={chip.onRemove}>
                {chip.label} <X size={12} />
              </button>
            ))}
            <button className="active-filter-chip active-filter-chip-clear" onClick={handleReset}>
              Limpiar todo
            </button>
          </div>
        )}

        {/* Layout */}
        <div className="app-catalog-layout">
          {/* Desktop Sidebar */}
          <aside className="app-catalog-sidebar">
            <div className="app-sidebar-header">
              <span className="app-sidebar-title">
                <Filter size={16} /> Filtros de Búsqueda
              </span>
              <button className="app-sidebar-reset" onClick={handleReset}>
                Limpiar
              </button>
            </div>
            {filterPanelContent}
          </aside>

          {/* Grid */}
          <main>
            {filtered.length > 0 ? (
              <>
                <div className="app-products-grid">
                  {pageItems.map(p => (
                    <AppProductCard key={p.id} product={p} />
                  ))}
                </div>

                {pageCount > 1 && (
                  <nav className="catalog-pager" aria-label="Paginación del catálogo">
                    <button
                      className="catalog-pager-arrow"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Página anterior"
                    >
                      <ChevronLeft size={16} /> Anterior
                    </button>

                    <div className="catalog-pager-pages">
                      {Array.from({ length: pageCount }).map((_, i) => (
                        <button
                          key={i}
                          className={`catalog-pager-num ${currentPage === i + 1 ? 'is-current' : ''}`}
                          onClick={() => goToPage(i + 1)}
                          aria-current={currentPage === i + 1 ? 'page' : undefined}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      className="catalog-pager-arrow"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === pageCount}
                      aria-label="Página siguiente"
                    >
                      Siguiente <ChevronRight size={16} />
                    </button>
                  </nav>
                )}
              </>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '4rem 1rem',
                  background: '#fff',
                  borderRadius: 'var(--radius-squircle-xl)',
                  border: '1px dashed var(--ios-separator)',
                }}
              >
                <PackageSearch size={48} stroke="#86868b" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  No encontramos repuestos con estos filtros
                </h4>
                <p style={{ color: '#86868b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                  Prueba modificando la marca seleccionada o amplía el rango de precio.
                </p>
                <button
                  className="btn-ios-apply-fitment"
                  style={{ maxWidth: '200px', margin: '0 auto' }}
                  onClick={handleReset}
                >
                  Restablecer Filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      {isFilterSheetOpen && (
        <div className="filter-sheet-backdrop" onClick={() => setIsFilterSheetOpen(false)}>
          <div className="filter-sheet" onClick={e => e.stopPropagation()}>
            <div className="filter-sheet-handle" />
            <div className="filter-sheet-header">
              <span className="app-sidebar-title">
                <Filter size={16} /> Filtros de Búsqueda
              </span>
              <button className="app-sidebar-reset" onClick={handleReset}>
                Limpiar
              </button>
            </div>
            <div className="filter-sheet-body">{filterPanelContent}</div>
            <div className="filter-sheet-footer">
              <button className="btn-ios-apply-fitment" onClick={() => setIsFilterSheetOpen(false)}>
                Ver {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
