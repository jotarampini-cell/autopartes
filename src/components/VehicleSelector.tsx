'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, Check, Search, CheckCircle, Truck, ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';
import { VEHICLE_DB } from '@/data/autoparts-data';
import { useGarage } from '@/context/GarageContext';
import { useCart } from '@/context/CartContext';

interface VehicleSelectorProps {
  onVehicleApplied?: () => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({ onVehicleApplied }) => {
  const { activeVehicle, setActiveVehicle } = useGarage();
  const { showToast } = useCart();

  const [year, setYear] = useState<string>(activeVehicle ? activeVehicle.year.toString() : '');
  const [make, setMake] = useState<string>(activeVehicle ? activeVehicle.make : '');
  const [model, setModel] = useState<string>(activeVehicle ? activeVehicle.model : '');
  const [engine, setEngine] = useState<string>(activeVehicle ? activeVehicle.engine : '');

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
    setMake('');
    setModel('');
    setEngine('');
  };

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMake(e.target.value);
    setModel('');
    setEngine('');
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
    setEngine('');
  };

  const handleApply = () => {
    if (!year || !make || !model) {
      showToast('Por favor selecciona Año, Marca y Modelo para confirmar compatibilidad.', 'warning');
      return;
    }

    const newVehicle = {
      year: parseInt(year),
      make,
      model,
      engine: engine || 'Todos los motores',
    };

    setActiveVehicle(newVehicle);
    showToast(`Vehículo activo: ${year} ${make} ${model}`, 'success');
    if (onVehicleApplied) onVehicleApplied();
  };

  const handleClear = () => {
    setActiveVehicle(null);
    setYear('');
    setMake('');
    setModel('');
    setEngine('');
    showToast('Filtro de vehículo restablecido', 'info');
  };

  // Available models & engines
  const availableMakes = year ? Object.keys(VEHICLE_DB.makes) : [];
  const makeData = make && VEHICLE_DB.makes[make as keyof typeof VEHICLE_DB.makes];
  const availableModels = makeData ? Object.keys(makeData.models) : [];
  const availableEngines = makeData && model && makeData.models[model as keyof typeof makeData.models]
    ? makeData.models[model as keyof typeof makeData.models]
    : [];

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Hero Left Info */}
          <div className="hero-info">
            <div className="hero-badge-pill">
              <Sparkles size={14} />
              Catálogo Inteligente de Precisión
            </div>
            <h1 className="hero-title">
              Encuentra la pieza exacta para <span>tu vehículo</span>
            </h1>
            <p className="hero-description">
              Más de 50,000 refacciones OEM y Aftermarket de alto rendimiento con entrega rápida y asesoría técnica especializada. Ingresa tu modelo y compra con confianza.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.875rem' }}>
                <Truck size={18} color="#00d2ff" />
                Envío Gratis &gt; $99
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.875rem' }}>
                <ShieldCheck size={18} color="#10b981" />
                Garantía Directa
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.875rem' }}>
                <RotateCcw size={18} color="#f59e0b" />
                30 Días de Devolución
              </div>
            </div>
          </div>

          {/* Vehicle Selector Box */}
          <div className="vehicle-selector-box">
            <div className="vehicle-selector-header">
              <h3>
                <SlidersHorizontal size={20} color="var(--brand-primary)" />
                Selector de Compatibilidad
              </h3>
              <span className="fitment-guarantee-tag">
                <Check size={12} /> Haztap Fit
              </span>
            </div>

            <div className="selector-fields-grid">
              <div className="selector-field">
                <label htmlFor="vehicle-year">Año</label>
                <select id="vehicle-year" value={year} onChange={handleYearChange}>
                  <option value="">1. Seleccionar Año</option>
                  {VEHICLE_DB.years.map(y => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="selector-field">
                <label htmlFor="vehicle-make">Marca</label>
                <select id="vehicle-make" value={make} onChange={handleMakeChange} disabled={!year}>
                  <option value="">2. Seleccionar Marca</option>
                  {availableMakes.map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="selector-field">
                <label htmlFor="vehicle-model">Modelo</label>
                <select id="vehicle-model" value={model} onChange={handleModelChange} disabled={!make}>
                  <option value="">3. Seleccionar Modelo</option>
                  {availableModels.map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="selector-field">
                <label htmlFor="vehicle-engine">Motor / Submodelo</label>
                <select
                  id="vehicle-engine"
                  value={engine}
                  onChange={e => setEngine(e.target.value)}
                  disabled={!model}
                >
                  <option value="">4. Seleccionar Motor</option>
                  {availableEngines.map(e => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="selector-actions">
              <button className="btn-search-fitment" onClick={handleApply}>
                <Search size={16} />
                Filtrar Repuestos Compatibles
              </button>
              <button className="btn-clear-fitment" onClick={handleClear} title="Limpiar selección">
                Limpiar
              </button>
            </div>

            {/* Active Vehicle Banner Feedback */}
            {activeVehicle && (
              <div className="active-vehicle-notification">
                <div>
                  <strong>Vehículo Seleccionado:</strong> {activeVehicle.year} {activeVehicle.make} {activeVehicle.model} ({activeVehicle.engine})
                </div>
                <CheckCircle size={18} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
