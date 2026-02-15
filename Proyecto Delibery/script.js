/* ============================================
   DELIVERY WEB - GESTOR DE PRODUCTOS
   Proyecto Semana 02
   ============================================ */

const STORAGE_KEY = "delivery_products";

/* ============================================
   STATE
============================================ */

let items = loadItems();

/* ============================================
   LOCAL STORAGE
============================================ */

function loadItems() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/* ============================================
   UTILIDADES
============================================ */

// 👉 Formatear precio en pesos colombianos
function formatPrice(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  }).format(value);
}

/* ============================================
   CRUD
============================================ */

function createItem(itemData) {
  const newItem = {
    id: Date.now(),
    ...itemData,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };

  items = [...items, newItem];
  saveItems(items);
  render();
}

function deleteItem(id) {
  items = items.filter(item => item.id !== id);
  saveItems(items);
  render();
}

function toggleItemActive(id) {
  items = items.map(item =>
    item.id === id
      ? { ...item, active: !item.active, updatedAt: new Date().toISOString() }
      : item
  );

  saveItems(items);
  render();
}

/* ============================================
   STATS
============================================ */

function getStats(items) {
  return items.reduce(
    (acc, item) => {
      acc.total++;
      item.active ? acc.active++ : acc.inactive++;
      return acc;
    },
    { total: 0, active: 0, inactive: 0 }
  );
}

/* ============================================
   RENDER
============================================ */

const listContainer = document.getElementById("productList");
const statsContainer = document.getElementById("stats");

function renderItem(item) {
  return `
    <div class="item ${!item.active ? "inactive" : ""}">
      <div>
        <h3>${item.name}</h3>
        <p><strong>Precio:</strong> ${formatPrice(item.price)}</p>
        <span class="category">${item.category}</span>
      </div>

      <div class="actions">
        <button onclick="toggleItemActive(${item.id})">
          ${item.active ? "Desactivar" : "Activar"}
        </button>

        <button onclick="deleteItem(${item.id})">
          Eliminar
        </button>
      </div>
    </div>
  `;
}

function renderItems(items) {
  if (!items.length) {
    listContainer.innerHTML = "<p>No hay productos aún</p>";
    return;
  }

  listContainer.innerHTML = items.map(renderItem).join("");
}

function renderStats(stats) {
  statsContainer.innerHTML = `
    <div>Total: ${stats.total}</div>
    <div>Activos: ${stats.active}</div>
    <div>Inactivos: ${stats.inactive}</div>
  `;
}

function render() {
  renderItems(items);
  renderStats(getStats(items));
}

/* ============================================
   FORMULARIO
============================================ */

const form = document.getElementById("productForm");

form.addEventListener("submit", e => {
  e.preventDefault();

  // ✅ IDs corregidos según tu HTML
  const name = document.getElementById("nombre").value.trim();
  const price = Number(document.getElementById("precio").value);
  const category = document.getElementById("categoria").value;

  // ✅ Validación precio mínimo
  if (price < 10000) {
    alert("El precio mínimo debe ser 10.000 COP");
    return;
  }

  createItem({
    name,
    price,
    category
  });

  form.reset();
});

/* ============================================
   INIT
============================================ */

render();
