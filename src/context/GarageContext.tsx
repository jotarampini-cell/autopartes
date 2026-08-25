'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { VehicleSelection, Product } from '@/data/autoparts-data';

interface GarageContextType {
  activeVehicle: VehicleSelection | null;
  savedVehicles: VehicleSelection[];
  setActiveVehicle: (v: VehicleSelection | null) => void;
  addVehicle: (v: VehicleSelection) => void;
  removeVehicle: (index: number) => void;
  checkFitment: (product: Product) => 'compatible' | 'incompatible' | 'unknown';
  isGarageModalOpen: boolean;
  setIsGarageModalOpen: (open: boolean) => void;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

export function GarageProvider({ children }: { children: React.ReactNode }) {
  const [activeVehicle, setActiveVehicleState] = useState<VehicleSelection | null>(null);
  const [savedVehicles, setSavedVehicles] = useState<VehicleSelection[]>([
    { year: 2022, make: "Toyota", model: "Hilux", engine: "2.8L Turbo Diesel (1GD-FTV)" }
  ]);
  const [isGarageModalOpen, setIsGarageModalOpen] = useState(false);

  useEffect(() => {
    try {
      const storedActive = localStorage.getItem('haztap_active_vehicle');
      if (storedActive) {
        setActiveVehicleState(JSON.parse(storedActive));
      }
      const storedSaved = localStorage.getItem('haztap_saved_vehicles');
      if (storedSaved) {
        setSavedVehicles(JSON.parse(storedSaved));
      }
    } catch {
      // Ignore local storage error during SSR
    }
  }, []);

  const setActiveVehicle = (v: VehicleSelection | null) => {
    setActiveVehicleState(v);
    if (v) {
      localStorage.setItem('haztap_active_vehicle', JSON.stringify(v));
      // Also add to saved vehicles if not present
      setSavedVehicles(prev => {
        const exists = prev.some(item => item.year === v.year && item.make === v.make && item.model === v.model);
        if (!exists) {
          const updated = [...prev, v];
          localStorage.setItem('haztap_saved_vehicles', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    } else {
      localStorage.removeItem('haztap_active_vehicle');
    }
  };

  const addVehicle = (v: VehicleSelection) => {
    setSavedVehicles(prev => {
      const updated = [...prev, v];
      localStorage.setItem('haztap_saved_vehicles', JSON.stringify(updated));
      return updated;
    });
  };

  const removeVehicle = (index: number) => {
    setSavedVehicles(prev => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem('haztap_saved_vehicles', JSON.stringify(updated));
      return updated;
    });
  };

  const checkFitment = (product: Product): 'compatible' | 'incompatible' | 'unknown' => {
    if (!activeVehicle) return 'unknown';
    const match = product.fitment.some(f => {
      return (
        f.make.toLowerCase() === activeVehicle.make.toLowerCase() &&
        f.models.some(
          m =>
            m.toLowerCase().includes(activeVehicle.model.toLowerCase()) ||
            activeVehicle.model.toLowerCase().includes(m.toLowerCase())
        ) &&
        f.years.includes(activeVehicle.year)
      );
    });
    return match ? 'compatible' : 'incompatible';
  };

  return (
    <GarageContext.Provider
      value={{
        activeVehicle,
        savedVehicles,
        setActiveVehicle,
        addVehicle,
        removeVehicle,
        checkFitment,
        isGarageModalOpen,
        setIsGarageModalOpen,
      }}
    >
      {children}
    </GarageContext.Provider>
  );
}

export function useGarage() {
  const context = useContext(GarageContext);
  if (!context) {
    throw new Error('useGarage must be used within a GarageProvider');
  }
  return context;
}
