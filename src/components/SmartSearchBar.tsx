import React, { useState } from 'react';
import { CATEGORIES } from '@/data';

export const SmartSearchBar: React.FC<{ onSearch?: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  // Simple VIN detection (17 alphanumeric characters)
  const isVIN = query.length === 17 && /^[A-HJ-NPR-Z0-9]+$/i.test(query);

  return (
    <div className="smart-search-bar" style={{ maxWidth: '800px', margin: '2rem auto', position: 'relative' }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={isVIN ? 'Buscar por VIN...' : 'Buscar por pieza, marca, modelo...'}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      {query && (
        <div
          className="search-suggestions"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1px solid #e2e8f0',
            zIndex: 10,
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          <p style={{ padding: '0.5rem', margin: 0, color: '#555' }}>
            {isVIN ? 'Buscar por VIN no implementado (stub)' : 'Sugerencias de búsqueda no implementadas'}
          </p>
        </div>
      )}
    </div>
  );
};
