/* ============================================
   RAPPI MENU - GESTOR DE PRODUCTOS
   Proyecto SENA - Semana 2
   Mariana Gabriela Contreras Romero
   ============================================ */

// ================= CONSTANTES =================

const STORAGE_KEY = "rappi_products";

// ================= STATE =================

let items = [];

// ================= LOCAL STORAGE =================

// Cargar items desde localStorage
function loadItems() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : getDefaultProducts();
}

// Guardar items en localStorage
function saveItems(itemsToSave) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsToSave));
}

// Productos por defecto
function getDefaultProducts() {
  return [
    {
      id: 1,
      name: "Hamburguesa Especial",
      price: 18500,
      category: "Comida Rápida",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: null
    },
    {
      id: 2,
      name: "Pizza Pepperoni",
      price: 32000,
      category: "Comida Rápida",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: null
    },
    {
      id: 3,
      name: "Limonada Natural",
      price: 8500,
      category: "Bebidas",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: null
    },
    {
      id: 4,
      name: "Brownie con Helado",
      price: 15000,
      category: "Postres",
      active: false,
      createdAt: new Date().toISOString(),
      updatedAt: null
    }
  ];
}

// ================= UTILIDADES =================

// Formatear precio en pesos colombianos
const formatPrice = (value) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  }).format(value);
};

// Formatear fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

// Mostrar notificación toast
const showToast = (message, type = "success") => {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  toast.className = `toast ${type}`;
  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
};

// ================= CRUD =================

// Crear nuevo producto
const createItem = (itemData) => {
  const newItem = {
    id: Date.now(),
    name: itemData.name,
    price: itemData.price,
    category: itemData.category,
    active: document.getElementById("disponible").checked,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };

  items.push(newItem);
  saveItems(items);
  render();
  showToast("Producto agregado correctamente");
};

// Actualizar producto existente
const updateItem = (id, itemData) => {
  const index = items.findIndex(item => item.id === id);
  
  if (index !== -1) {
    items[index] = {
      ...items[index],
      name: itemData.name,
      price: itemData.price,
      category: itemData.category,
      active: document.getElementById("disponible").checked,
      updatedAt: new Date().toISOString()
    };
    
    saveItems(items);
    render();
    showToast("Producto actualizado correctamente");
  }
};

// Eliminar producto
const deleteItem = (id) => {
  const item = items.find(i => i.id === id);
  
  if (confirm(`¿Estás segura de eliminar "${item.name}"?`)) {
    items = items.filter(item => item.id !== id);
    saveItems(items);
    render();
    showToast("Producto eliminado correctamente", "warning");
  }
};

// Cambiar estado activo/inactivo
const toggleItemActive = (id) => {
  const index = items.findIndex(item => item.id === id);
  
  if (index !== -1) {
    items[index].active = !items[index].active;
    items[index].updatedAt = new Date().toISOString();
    
    saveItems(items);
    render();
    
    const message = items[index].active ? "Producto activado" : "Producto desactivado";
    showToast(message, items[index].active ? "success" : "warning");
  }
};

// Cargar producto para editar
const editItem = (id) => {
  const item = items.find(i => i.id === id);
  
  if (!item) return;

  // Llenar formulario con datos del producto
  document.getElementById("editId").value = id;
  document.getElementById("name").value = item.name;
  document.getElementById("price").value = item.price;
  document.getElementById("category").value = item.category;
  document.getElementById("disponible").checked = item.active;

  // Cambiar texto del botón
  document.getElementById("formTitle").textContent = "Editar Producto";
  document.getElementById("btnSubmit").innerHTML = "<span>💾 Guardar Cambios</span>";
  document.getElementById("btnCancel").style.display = "block";

  // Scroll al formulario
  document.querySelector(".form-section").scrollIntoView({ behavior: "smooth" });
};

// Cancelar edición
const cancelEdit = () => {
  document.getElementById("editId").value = "";
  document.getElementById("productForm").reset();
  document.getElementById("disponible").checked = true;
  
  document.getElementById("formTitle").textContent = "Agregar Producto";
  document.getElementById("btnSubmit").innerHTML = "<span>➕ Agregar Producto</span>";
  document.getElementById("btnCancel").style.display = "none";
};

// ================= ESTADÍSTICAS =================

const getStats = (itemsList) => {
  const stats = itemsList.reduce(
    (acc, item) => {
      acc.total++;
      item.active ? acc.active++ : acc.inactive++;
      acc.totalValue += item.active ? item.price : 0;
      return acc;
    },
    { total: 0, active: 0, inactive: 0, totalValue: 0 }
  );

  // Calcular precio promedio de productos activos
  stats.avgPrice = stats.active > 0 ? Math.round(stats.totalValue / stats.active) : 0;

  return stats;
};

// ================= FILTROS Y ORDENAMIENTO =================

const getFilteredItems = () => {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
  const categoryFilter = document.getElementById("filterCategoria").value;
  const statusFilter = document.getElementById("filterEstado").value;
  const sortBy = document.getElementById("sortBy").value;

  // Filtrar
  let filteredItems = items.filter(item => {
    // Filtro por búsqueda
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    
    // Filtro por categoría
    const matchesCategory = categoryFilter === "Todos" || item.category === categoryFilter;
    
    // Filtro por estado
    const matchesStatus = 
      statusFilter === "Todos" ||
      (statusFilter === "activos" && item.active) ||
      (statusFilter === "inactivos" && !item.active);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Ordenar
  filteredItems.sort((a, b) => {
    switch (sortBy) {
      case "nuevos":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "viejos":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "nombre-asc":
        return a.name.localeCompare(b.name);
      case "nombre-desc":
        return b.name.localeCompare(a.name);
      case "precio-asc":
        return a.price - b.price;
      case "precio-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return filteredItems;
};

// ================= RENDER =================

const listContainer = document.getElementById("itemsList");
const statsContainer = document.getElementById("stats");
const productCount = document.getElementById("productCount");

// Renderizar un solo item
const renderItem = (item) => {
  return `
    <div class="item ${!item.active ? "inactive" : ""}">
      <div class="item-info">
        <h3>
          ${item.name}
          <span class="status-badge ${item.active ? "active" : "inactive"}">
            ${item.active ? "✓ Activo" : "✗ Inactivo"}
          </span>
        </h3>
        <p class="price">${formatPrice(item.price)}</p>
        <span class="category">${item.category}</span>
        <span class="date">Creado: ${formatDate(item.createdAt)}</span>
      </div>

      <div class="actions">
        <button class="btn-toggle" onclick="toggleItemActive(${item.id})">
          ${item.active ? "🔴 Desactivar" : "🟢 Activar"}
        </button>

        <button class="btn-edit" onclick="editItem(${item.id})">
          ✏️ Editar
        </button>

        <button class="btn-delete" onclick="deleteItem(${item.id})">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  `;
};

// Renderizar lista de items
const renderItems = (itemsToRender) => {
  if (!itemsToRender.length) {
    listContainer.innerHTML = `
      <div class="empty-message">
        <div class="icon">🍔</div>
        <p>No se encontraron productos</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = itemsToRender.map(renderItem).join("");
};

// Renderizar estadísticas
const renderStats = (stats) => {
  statsContainer.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${stats.total}</div>
      <div class="stat-label">Total</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.active}</div>
      <div class="stat-label">Activos</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.inactive}</div>
      <div class="stat-label">Inactivos</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${formatPrice(stats.avgPrice)}</div>
      <div class="stat-label">Precio Promedio</div>
    </div>
  `;
};

// Render principal
const render = () => {
  const filteredItems = getFilteredItems();
  renderItems(filteredItems);
  renderStats(getStats(items));
  
  // Actualizar contador
  productCount.textContent = `${filteredItems.length} de ${items.length} productos`;
};

// ================= FORMULARIO =================

const form = document.getElementById("productForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const editId = document.getElementById("editId").value;
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);
  const category = document.getElementById("category").value;

  // Validaciones
  if (!name) {
    showToast("El nombre es obligatorio", "error");
    return;
  }

  if (price < 8000) {
    showToast("El precio mínimo es $8.000 COP", "error");
    return;
  }

  const itemData = { name, price, category };

  if (editId) {
    updateItem(Number(editId), itemData);
    cancelEdit();
  } else {
    createItem(itemData);
    form.reset();
    document.getElementById("disponible").checked = true;
  }
});

// Botón cancelar edición
document.getElementById("btnCancel").addEventListener("click", cancelEdit);

// ================= EVENTOS DE FILTROS =================

document.getElementById("searchInput").addEventListener("input", render);
document.getElementById("filterCategoria").addEventListener("change", render);
document.getElementById("filterEstado").addEventListener("change", render);
document.getElementById("sortBy").addEventListener("change", render);

// ================= INICIALIZACIÓN =================

// Cargar datos al iniciar la aplicación
items = loadItems();
render();

console.log("%c✅ Rappi Menu - Gestor de productos cargado", "color: #FF006E; font-size: 16px; font-weight: bold;");
console.log("%c📦 Productos guardados:", "color: #9D4EDD;", items.length);
console.log("%c👤 Mariana Gabriela Contreras Romero", "color: #00FF88;");