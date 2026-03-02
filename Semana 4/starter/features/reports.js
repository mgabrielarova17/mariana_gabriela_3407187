// Módulo de reportes (lazy load) para Logística
import { getOrders } from '../services/manager.js';
import { formatCurrency } from '../utils/formatters.js';

export const generateReport = () => {
  const orders = getOrders();
  
  const { totalOrders, totalRevenue, pendingCount, deliveredCount } = orders.reduce((acc, { cost, status }) => {
    return {
      totalOrders: acc.totalOrders + 1,
      totalRevenue: acc.totalRevenue + (cost || 0),
      pendingCount: acc.pendingCount + (status === 'Pendiente' ? 1 : 0),
      deliveredCount: acc.deliveredCount + (status === 'Entregado' ? 1 : 0)
    };
  }, { totalOrders: 0, totalRevenue: 0, pendingCount: 0, deliveredCount: 0 });

  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return { totalOrders, totalRevenue, avgOrderValue, pendingCount, deliveredCount };
};

export const renderReportUI = (container) => {
  const report = generateReport();
  
  container.innerHTML = `
    <h2>📊 Reporte de Operaciones Logísticas</h2>
    <div class="reports-grid" style="display:flex; gap:15px; flex-wrap:wrap;">
      <div class="stat-badge">📦 Total Pedidos: ${report.totalOrders}</div>
      <div class="stat-badge">⏳ Pendientes: ${report.pendingCount}</div>
      <div class="stat-badge">✅ Entregados: ${report.deliveredCount}</div>
      <div class="stat-badge">💰 Ingresos: ${formatCurrency(report.totalRevenue)}</div>
      <div class="stat-badge">📈 Ticket Promedio: ${formatCurrency(report.avgOrderValue)}</div>
    </div>
  `;
  container.classList.remove('hidden');
};