'use client';

import React from 'react';
import { X, Check, Car } from 'lucide-react';
import { useGarage } from '@/context/GarageContext';
import { useCart } from '@/context/CartContext';
import { VehicleSelection } from '@/data/autoparts-data';

export const GarageModal: React.FC = () => {
  const {
    activeVehicle,
    savedVehicles,
    setActiveVehicle,
    isGarageModalOpen,
    setIsGarageModalOpen,
  } = useGarage();
  const { showToast } = useCart();

  if (!isGarageModalOpen) return null;

  const handleSelect = (v: VehicleSelection) => {
    setActiveVehicle(v);
    setIsGarageModalOpen(false);
    showToast(`Vehículo activo: ${v.year} ${v.make} ${v.model}`, 'success');
  };

  const handleGoToSelector = () => {
    setIsGarageModalOpen(false);
    document.getElementById('fitment-selector-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => setIsGarageModalOpen(false)}
    >
      <div
        className="garage-modal"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={() => setIsGarageModalOpen(false)}
          title="Cerrar"
        >
          <X size={18} />
        </button>

        <h3 className="garage-modal-title">Mi Garaje de Vehículos</h3>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Guarda tus autos y camionetas para filtrar refacciones compatibles con un solo clic.
        </p>

        <div className="saved-vehicles-list">
          {savedVehicles.length === 0 && (
            <div className="garage-empty-state">
              <Car size={40} stroke="#cbd5e1" />
              <p>Aún no tienes vehículos guardados.</p>
              <button className="btn-ios-apply-fitment" onClick={handleGoToSelector}>
                Agregar mi Vehículo
              </button>
            </div>
          )}
          {savedVehicles.map((v, i) => {
            const isActive =
              activeVehicle &&
              activeVehicle.year === v.year &&
              activeVehicle.make === v.make &&
              activeVehicle.model === v.model;

            return (
              <div
                key={i}
                className={`saved-vehicle-card ${isActive ? 'active' : ''}`}
                onClick={() => handleSelect(v)}
              >
                <div className="saved-vehicle-info">
                  <h5>
                    {v.year} {v.make} {v.model}
                  </h5>
                  <p>{v.engine}</p>
                </div>
                <div>
                  {isActive ? (
                    <span className="fitment-guarantee-tag">
                      <Check size={12} /> Activo
                    </span>
                  ) : (
                    <button
                      className="btn-clear-fitment"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      Seleccionar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
