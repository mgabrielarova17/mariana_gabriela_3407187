// manager.js - Lógica CRUD para Pedidos de Logística
import { DeliveryOrder } from '../models/index.js';
import { saveToStorage, loadFromStorage } from './storage.js';
import { APP_CONFIG } from '../config.js';
import { validateOrder } from '../utils/index.js';

let orders = [];

export const initManager = () => {
  console.log("📂 initManager: Cargando pedidos del storage...");
  orders = loadFromStorage(APP_CONFIG.storageKey);
  console.log(`📂 initManager: ${orders.length} pedidos cargados.`);
  return orders;
};

export const createOrder = (orderData) => {
  console.log("🔧 createOrder: Creando pedido...", orderData);

  const { isValid, error } = validateOrder(orderData);
  
  if (!isValid) {
    throw new Error(error);
  }

  const newOrder = new DeliveryOrder(orderData);
  
  orders.push(newOrder);
  saveToStorage(APP_CONFIG.storageKey, orders);
  
  return newOrder;
};

export const getOrders = () => [...orders];

// 🔥 CORRECCIÓN: Usamos 'id == id' (doble igual) para comparar texto con número
export const deleteOrder = (id) => {
  console.log("🗑️ Intentando eliminar ID:", id);
  // Filtramos dejando solo los que NO coinciden con el ID
  orders = orders.filter(order => order.id != id);
  saveToStorage(APP_CONFIG.storageKey, orders);
  console.log("✅ Pedido eliminado correctamente");
};

// 🔥 CORRECCIÓN: Usamos '==' para encontrar el pedido
export const getOrderById = (id) => orders.find(order => order.id == id);

export const updateOrder = (id, updates) => {
  const index = orders.findIndex(order => order.id == id); // Corregido aquí también
  if (index !== -1) {
    const { productsCost, deliveryCost } = updates;
    if (productsCost !== undefined || deliveryCost !== undefined) {
      updates.totalCost = (Number(productsCost) || orders[index].productsCost) + 
                          (Number(deliveryCost) || orders[index].deliveryCost);
    }
    
    orders[index] = { ...orders[index], ...updates };
    saveToStorage(APP_CONFIG.storageKey, orders);
    return orders[index];
  }
  return null;
};

export const filterOrders = ({ searchTerm = '', status = 'Todas', driver = 'Todos' }) => {
  return orders.filter(order => {
    const { clientName, address, status: orderStatus, driver: orderDriver } = order;
    
    const matchesSearch = 
      clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = status === 'Todas' || orderStatus === status;
    const matchesDriver = driver === 'Todos' || orderDriver === driver;
    
    return matchesSearch && matchesStatus && matchesDriver;
  });
};

export const getBasicStats = () => {
  const total = orders.length;
  const pending = orders.filter(o => o.status === 'Pendiente').length;
  const inTransit = orders.filter(o => o.status === 'En Camino').length;
  
  const { totalRevenue } = orders.reduce((acc, { totalCost }) => {
    return { totalRevenue: acc.totalRevenue + totalCost };
  }, { totalRevenue: 0 });

  return { total, pending, inTransit, totalRevenue };
};