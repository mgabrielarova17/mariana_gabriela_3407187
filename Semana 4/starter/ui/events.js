// events.js - Manejadores de eventos para Logística
import { createOrder, deleteOrder, getOrderById, updateOrder, filterOrders, getBasicStats } from '../services/index.js';
import { renderOrders, renderStats, showToast } from './render.js';
import { MENU_PRODUCTS } from '../config.js'; 
import { formatCurrency } from '../utils/formatters.js';

let editingId = null;

// Función para dibujar los productos
const renderProductSelector = () => {
  const container = document.getElementById('productSelector');
  if (!container) return;

  container.innerHTML = MENU_PRODUCTS.map(({ id, name, price, emoji }) => `
    <div class="product-item-row" id="row-${id}">
      <label class="product-info">
        <input 
          type="checkbox" 
          class="prod-checkbox" 
          id="check-${id}" 
          data-id="${id}" 
          data-price="${price}" 
          data-name="${name}"
        >
        <span class="prod-name">${emoji} ${name}</span>
        <span class="prod-price">${formatCurrency(price)}</span>
      </label>
      
      <div class="qty-wrapper" id="qty-wrap-${id}">
        <input type="number" class="qty-input-small" id="qty-${id}" min="1" value="1">
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.prod-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const id = this.dataset.id;
      const row = document.getElementById(`row-${id}`);
      const qtyWrapper = document.getElementById(`qty-wrap-${id}`);
      const qtyInput = document.getElementById(`qty-${id}`);

      if (this.checked) {
        row.classList.add('selected');
        qtyWrapper.classList.add('active');
        qtyInput.value = 1;
      } else {
        row.classList.remove('selected');
        qtyWrapper.classList.remove('active');
        qtyInput.value = 0;
      }
      updateOrderSummary();
    });
  });

  container.querySelectorAll('.qty-input-small').forEach(input => {
    input.addEventListener('input', updateOrderSummary);
  });
};

// Función para calcular el resumen
const updateOrderSummary = () => {
  const checkboxes = document.querySelectorAll('.prod-checkbox');
  let productsCost = 0;
  const itemsList = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const { id, name, price } = checkbox.dataset;
      const quantity = parseInt(document.getElementById(`qty-${id}`).value) || 0;
      
      if (quantity > 0) {
        const subtotal = quantity * parseFloat(price);
        productsCost += subtotal;
        itemsList.push({ name, quantity, subtotal });
      }
    }
  });

  const summaryList = document.getElementById('orderSummaryList');
  if (itemsList.length === 0) {
    summaryList.innerHTML = '<p class="placeholder-text">Selecciona productos arriba</p>';
  } else {
    summaryList.innerHTML = itemsList.map(({ name, quantity, subtotal }) => `
      <div class="summary-item">
        <span>${quantity}x ${name}</span>
        <span>${formatCurrency(subtotal)}</span>
      </div>
    `).join('');
  }

  const deliveryCost = parseFloat(document.getElementById('itemDeliveryCost').value) || 0;
  const total = productsCost + deliveryCost;

  document.getElementById('displayProductsCost').textContent = formatCurrency(productsCost);
  document.getElementById('displayTotalCost').textContent = formatCurrency(total);
  
  document.getElementById('itemProductsCost').value = productsCost;
  document.getElementById('itemOrderDetails').value = JSON.stringify(itemsList);
};

export const initEvents = () => {
  console.log("⚡ initEvents ejecutándose...");
  renderProductSelector();

  const form = document.getElementById('itemForm');
  if(!form) return;

  document.getElementById('itemDeliveryCost').addEventListener('input', updateOrderSummary);

  form.onsubmit = (e) => {
    e.preventDefault();
    
    const clientName = document.getElementById('itemName').value.trim();
    const address = document.getElementById('itemAddress').value.trim();
    const orderDetails = document.getElementById('itemOrderDetails').value;
    const productsCost = document.getElementById('itemProductsCost').value;
    const deliveryCost = document.getElementById('itemDeliveryCost').value;
    const driver = document.getElementById('itemDriver').value;
    const status = document.getElementById('itemCategory').value;

    try {
      if (orderDetails === '[]') throw new Error("Selecciona productos");
      
      if (editingId) {
        updateOrder(editingId, { clientName, address, orderDetails, productsCost, deliveryCost, driver, status });
        showToast('✅ Actualizado');
        editingId = null;
        document.getElementById('btnCancel').style.display = 'none';
      } else {
        createOrder({ clientName, address, orderDetails, productsCost, deliveryCost, driver, status });
        showToast('✅ Guardado');
      }
      
      form.reset();
      renderProductSelector();
      updateOrderSummary();
      refreshUI();
      
    } catch (err) {
      showToast("❌ " + err.message, true);
    }
  };

  // Filtros
  document.getElementById('searchInput').oninput = refreshUI;
  document.getElementById('filterCategory').onchange = refreshUI;
  document.getElementById('filterDriver').onchange = refreshUI;
  
  // Cancelar
  document.getElementById('btnCancel').onclick = () => {
    editingId = null; 
    form.reset(); 
    renderProductSelector();
    updateOrderSummary();
    document.getElementById('btnCancel').style.display = 'none';
  };

  // 🔥 FUNCIÓN ELIMINAR GLOBAL
  window.deleteOrder = (id) => {
    console.log("🗑️ Clic en eliminar ID:", id);
    if(confirm('¿Seguro quieres eliminar este pedido?')){
      deleteOrder(id); // Llamamos a la función del manager
      refreshUI();
      showToast('🗑️ Pedido eliminado');
    }
  };

  // 🔥 FUNCIÓN EDITAR GLOBAL
  window.editOrder = (id) => {
    const order = getOrderById(id);
    if(order){
      editingId = id;
      document.getElementById('itemName').value = order.clientName;
      document.getElementById('itemAddress').value = order.address;
      document.getElementById('itemDeliveryCost').value = order.deliveryCost;
      document.getElementById('itemDriver').value = order.driver;
      document.getElementById('itemCategory').value = order.status;
      
      renderProductSelector();
      try {
        JSON.parse(order.orderDetails).forEach(({name, quantity}) => {
          const check = document.querySelector(`.prod-checkbox[data-name="${name}"]`);
          if(check){
            check.checked = true;
            const id = check.dataset.id;
            document.getElementById(`row-${id}`).classList.add('selected');
            document.getElementById(`qty-wrap-${id}`).classList.add('active');
            document.getElementById(`qty-${id}`).value = quantity;
          }
        });
      } catch(e) {}
      updateOrderSummary();
      document.getElementById('btnCancel').style.display = 'inline-block';
      window.scrollTo({top:0, behavior:'smooth'});
    }
  };

  // Dynamic imports
  document.getElementById('btnReports').onclick = async () => {
    const { renderReportUI } = await import('../features/reports.js');
    renderReportUI(document.getElementById('reportsContainer'));
  };
  document.getElementById('btnExport').onclick = async () => {
    const { exportToJSON } = await import('../features/export.js');
    exportToJSON();
    showToast('📥 Exportado');
  };
};

export const refreshUI = () => {
  const searchTerm = document.getElementById('searchInput').value;
  const status = document.getElementById('filterCategory').value;
  const driver = document.getElementById('filterDriver').value;
  const filtered = filterOrders({ searchTerm, status, driver });
  renderOrders(filtered, document.getElementById('itemsList'));
  const stats = getBasicStats();
  renderStats(stats);
};