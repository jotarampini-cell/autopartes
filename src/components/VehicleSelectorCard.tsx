'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, Check, CheckCircle2 } from 'lucide-react';
import { VEHICLE_DB } from '@/data/autoparts-data';
import { useGarage } from '@/context/GarageContext';
import { useCart } from '@/context/CartContext';

export const VehicleSelectorCard: React.FC = () => {
  const { activeVehicle, setActiveVehicle } = useGarage();
  const { showToast } = useCart();

  const [year, setYear] = useState<string>(activeVehicle ? activeVehicle.year.toString() : '');
  const [make, setMake] = useState<string>(activeVehicle ? activeVehicle.make : '');
  const [model, setModel] = useState<string>(activeVehicle ? activeVehicle.model : '');
  const [engine, setEngine] = useState<string>(activeVehicle ? activeVehicle.engine : '');

  const availableMakes = year ? Object.keys(VEHICLE_DB.makes) : [];
  const makeData = make && VEHICLE_DB.makes[make as keyof typeof VEHICLE_DB.makes];
  const availableModels = makeData ? Object.keys(makeData.models) : [];
  const availableEngines =
    makeData && model && makeData.models[model as keyof typeof makeData.models]
      ? makeData.models[model as keyof typeof makeData.models]
      : [];

  const handleApply = () => {
    if (!year || !make || !model) {
      showToast('Selecciona Año, Marca y Modelo para confirmar compatibilidad.', 'warning');
      return;
    }
    const newVehicle = {
      year: parseInt(year),
      make,
      model,
      engine: engine || 'Todos los motores',
    };
    setActiveVehicle(newVehicle);
    showToast(`Garaje configurado: ${year} ${make} ${model}`, 'success');
  };

  return (
    <div className="today-fitment-card" id="fitment-selector-card">
      <div className="fitment-card-top">
        <div>
          <h3 className="fitment-card-title">Configura tu Garaje</h3>
          <p className="fitment-card-desc">Filtra piezas 100% compatibles con tu auto</p>
        </div>
        <div className="fitment-card-icon-badge">
          <SlidersHorizontal size={22} />
        </div>
      </div>

      <div className="ios-form-fields">
        <select
          className="ios-field-select"
          value={year}
          onChange={e => {
            setYear(e.target.value);
            setMake('');
            setModel('');
            setEngine('');
          }}
        >
          <option value="">1. Año</option>
          {VEHICLE_DB.years.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          className="ios-field-select"
          value={make}
          onChange={e => {
            setMake(e.target.value);
            setModel('');
            setEngine('');
          }}
          disabled={!year}
        >
          <option value="">2. Marca</option>
          {availableMakes.map(m => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          className="ios-field-select"
          value={model}
          onChange={e => {
            setModel(e.target.value);
            setEngine('');
          }}
          disabled={!make}
        >
          <option value="">3. Modelo</option>
          {availableModels.map(m => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          className="ios-field-select"
          value={engine}
          onChange={e => setEngine(e.target.value)}
          disabled={!model}
        >
          <option value="">4. Motor / Versión</option>
          {availableEngines.map(eng => (
            <option key={eng} value={eng}>
              {eng}
            </option>
          ))}
        </select>
      </div>

      <button className="btn-ios-apply-fitment" onClick={handleApply}>
        <Check size={16} /> Aplicar a mi Catálogo
      </button>

      {activeVehicle && (
        <div
          style={{
            background: 'var(--apple-green-light)',
            color: '#065f46',
            padding: '0.65rem 0.85rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Activo: {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}</span>
          <CheckCircle2 size={16} />
        </div>
      )}
    </div>
  );
};
