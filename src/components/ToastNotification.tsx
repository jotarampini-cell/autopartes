'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast-container">
      <div className={`toast toast-${toastMessage.type}`}>
        {toastMessage.type === 'success' && <CheckCircle2 size={18} />}
        {toastMessage.type === 'warning' && <AlertTriangle size={18} />}
        {toastMessage.type === 'info' && <Info size={18} />}
        <span>{toastMessage.text}</span>
      </div>
    </div>
  );
};
