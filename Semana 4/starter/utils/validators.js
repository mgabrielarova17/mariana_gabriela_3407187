// validators.js - Validaciones para pedidos de logística
import { APP_CONFIG } from '../config.js';

export const validateOrder = ({ clientName, address, orderDetails }) => {
  
  if (!clientName || clientName.trim() === '') {
    return { isValid: false, error: 'El nombre del cliente es obligatorio' };
  }
  
  if (!address || address.trim() === '') {
    return { isValid: false, error: 'La dirección de entrega es obligatoria' };
  }

  if (!orderDetails || orderDetails === '[]') {
    return { isValid: false, error: 'Debes seleccionar al menos un producto' };
  }
  
  return { isValid: true, error: null };
};