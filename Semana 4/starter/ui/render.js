// render.js
import { formatCurrency } from '../utils/index.js';

export const renderOrders = (orders, container) => {
  if (!orders.length) {
    container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:40px;">No hay pedidos registrados</p>';
    return;
  }

  container.innerHTML = orders.map(({ id, clientName, address, orderDetails, productsCost, deliveryCost, totalCost, status, driver }) => {
    
    // Parsear productos
    let productsHTML = '';
    try {
      const items = JSON.parse(orderDetails);
      productsHTML = items.map(({ name, quantity }) => `
        <span class="item-tag">${quantity}x ${name}</span>
      `).join('');
    } catch(e) {
      productsHTML = `<span class="item-tag">Sin detalles</span>`;
    }

    return `
    <div class="item-card">
      <h3>👤 ${clientName}</h3>
      <div class="item-address">📍 ${address}</div>
      
      <!-- Productos -->
      <div class="item-products-list">
        ${productsHTML}
      </div>
      
      <!-- Precios -->
      <div class="item-price-breakdown">
        <small>Productos: ${formatCurrency(productsCost)} + Domicilio: ${formatCurrency(deliveryCost)}</small>
      </div>
      
      <div class="item-price">${formatCurrency(totalCost)}</div>
      
      <!-- Datos -->
      <span class="item-driver">🏍️ ${driver}</span>
      <span class="item-status ${status.replace(' ', '-')}">${status}</span>
      
      <!-- 🔥 ACCIONES: Editar y Eliminar -->
      <div class="item-actions">
        <button class="btn-action btn-edit" onclick="window.editOrder('${id}')">✏️ Editar</button>
        <button class="btn-action btn-delete" onclick="window.deleteOrder('${id}')">🗑️ Eliminar</button>
      </div>
    </div>
  `}).join('');
};

export const renderStats = ({ total, pending, inTransit, totalRevenue }) => {
  const container = document.getElementById('quickStats');
  if(!container) return;
  container.innerHTML = `
    <div class="stat-badge">📦 Total: ${total}</div>
    <div class="stat-badge">⏳ Pendientes: ${pending}</div>
    <div class="stat-badge">🛵 En Camino: ${inTransit}</div>
    <div class="stat-badge">💰 Ingresos: ${formatCurrency(totalRevenue)}</div>
  `;
};

export const showToast = (msg, isError = false) => {
  const toast = document.getElementById('toast');
  if(!toast) return;
  toast.textContent = msg;
  toast.className = isError ? 'toast show error' : 'toast show';
  setTimeout(() => toast.classList.remove('show'), 2500);
};