// Módulo de exportación (lazy load)
import { getOrders } from '../services/manager.js';

export const exportToJSON = () => {
  const orders = getOrders();
  const dataStr = JSON.stringify(orders, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'logistics_orders_export.json';
  a.click();
  
  URL.revokeObjectURL(url);
  return true;
};