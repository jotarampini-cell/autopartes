'use client';

import React, { useState } from 'react';
import { Car, Check, CheckCircle2, X } from 'lucide-react';
import { VEHICLE_DB } from '@/data/autoparts-data';
import { useGarage } from '@/context/GarageContext';
import { useCart } from '@/context/CartContext';

export const VehicleFitmentStrip: React.FC = () => {
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
    setActiveVehicle({
      year: parseInt(year),
      make,
      model,
      engine: engine || 'Todos los motores',
    });
    showToast(`Garaje configurado: ${year} ${make} ${model}`, 'success');
  };

  const handleClear = () => {
    setActiveVehicle(null);
    setYear('');
    setMake('');
    setModel('');
    setEngine('');
    showToast('Vehículo removido de tu garaje.', 'info');
  };

  return (
    <section className="fitment-strip">
      <div className="container">
        <div className="fitment-strip-inner">
          <div className="fitment-strip-intro">
            <span className="fitment-strip-icon">
              <Car size={20} />
            </span>
            <div>
              <h2 className="fitment-strip-title">Encuentra piezas para tu vehículo</h2>
              <p className="fitment-strip-desc">
                Selecciona tu auto y filtramos solo lo que calza.
              </p>
            </div>
          </div>

          <div className="fitment-strip-fields">
            <select
              className="fitment-select"
              value={year}
              aria-label="Año"
              onChange={e => {
                setYear(e.target.value);
                setMake('');
                setModel('');
                setEngine('');
              }}
            >
              <option value="">Año</option>
              {VEHICLE_DB.years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <select
              className="fitment-select"
              value={make}
              aria-label="Marca"
              disabled={!year}
              onChange={e => {
                setMake(e.target.value);
                setModel('');
                setEngine('');
              }}
            >
              <option value="">Marca</option>
              {availableMakes.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <select
              className="fitment-select"
              value={model}
              aria-label="Modelo"
              disabled={!make}
              onChange={e => {
                setModel(e.target.value);
                setEngine('');
              }}
            >
              <option value="">Modelo</option>
              {availableModels.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <select
              className="fitment-select"
              value={engine}
              aria-label="Motor"
              disabled={!model}
              onChange={e => setEngine(e.target.value)}
            >
              <option value="">Motor</option>
              {availableEngines.map(eng => (
                <option key={eng} value={eng}>{eng}</option>
              ))}
            </select>

            <button className="fitment-apply-btn" onClick={handleApply}>
              <Check size={16} /> Buscar piezas
            </button>
          </div>
        </div>

        {activeVehicle && (
          <div className="fitment-active-row">
            <span className="fitment-active-badge">
              <CheckCircle2 size={14} />
              Comprando para: <strong>{activeVehicle.year} {activeVehicle.make} {activeVehicle.model}</strong>
            </span>
            <button className="fitment-clear-btn" onClick={handleClear}>
              Cambiar vehículo <X size={13} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
