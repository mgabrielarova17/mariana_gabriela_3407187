/* ============================================
   RAPPI DELIVERY SYSTEM - POO
   Versión corregida y funcional
   ============================================ */

// ============================================
// CLASES POO
// ============================================

class BaseItem {
  #id; #name; #active; #category; #dateCreated;
  
  constructor(name, category, id = null) {
    this.#id = id || (Date.now() + Math.floor(Math.random() * 10000));
    this.#name = name;
    this.#active = true;
    this.#category = category;
    this.#dateCreated = new Date().toISOString();
  }
  
  get id() { return this.#id; }
  get name() { return this.#name; }
  get isActive() { return this.#active; }
  get category() { return this.#category; }
  get dateCreated() { return this.#dateCreated; }
  
  activate() { this.#active = true; }
  deactivate() { this.#active = false; }
  getType() { return this.constructor.name; }
  
  getBaseData() {
    return {
      id: this.#id,
      name: this.#name,
      active: this.#active,
      category: this.#category,
      dateCreated: this.#dateCreated,
      type: this.getType()
    };
  }
}

class FoodItem extends BaseItem {
  #price;
  constructor(name, category, price, id = null) {
    super(name, category, id);
    this.#price = price;
  }
  get price() { return this.#price; }
  getData() { return { ...this.getBaseData(), price: this.#price }; }
}

class BeverageItem extends BaseItem {
  #price;
  constructor(name, category, price, id = null) {
    super(name, category, id);
    this.#price = price;
  }
  get price() { return this.#price; }
  getData() { return { ...this.getBaseData(), price: this.#price }; }
}

class DessertItem extends BaseItem {
  #price;
  constructor(name, category, price, id = null) {
    super(name, category, id);
    this.#price = price;
  }
  get price() { return this.#price; }
  getData() { return { ...this.getBaseData(), price: this.#price }; }
}

class Person {
  #id; #name; #email; #phone; #active; #dateCreated;
  
  constructor(name, email, phone, id = null) {
    this.#id = id || (Date.now() + Math.floor(Math.random() * 10000));
    this.#name = name;
    this.#email = email;
    this.#phone = phone;
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }
  
  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get phone() { return this.#phone; }
  get isActive() { return this.#active; }
  get dateCreated() { return this.#dateCreated; }
  
  activate() { this.#active = true; }
  deactivate() { this.#active = false; }
  getType() { return this.constructor.name; }
  
  getBaseData() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      phone: this.#phone,
      active: this.#active,
      dateCreated: this.#dateCreated,
      type: this.getType()
    };
  }
}

class Customer extends Person {
  constructor(name, email, phone, id = null) { super(name, email, phone, id); }
  getRole() { return 'Cliente'; }
  getData() { return { ...this.getBaseData() }; }
}

class Driver extends Person {
  constructor(name, email, phone, id = null) { super(name, email, phone, id); }
  getRole() { return 'Repartidor'; }
  getData() { return { ...this.getBaseData() }; }
}

class Admin extends Person {
  constructor(name, email, phone, id = null) { super(name, email, phone, id); }
  getRole() { return 'Admin'; }
  getData() { return { ...this.getBaseData() }; }
}

class Order {
  #id; #customerId; #driverId; #items; #address; #status; #total; #dateCreated;
  
  static STATUS = ['Pendiente', 'En Camino', 'Entregado', 'Cancelado'];
  
  constructor(customerId, driverId, items, address, id = null, status = null) {
    this.#id = id || ('ORD-' + Date.now().toString(36).toUpperCase());
    this.#customerId = customerId;
    this.#driverId = driverId;
    this.#items = items;
    this.#address = address;
    this.#status = status || 'Pendiente';
    this.#total = items.reduce((s, i) => s + (i.price * (i.qty || 1)), 0) + 5000;
    this.#dateCreated = new Date().toISOString();
  }
  
  get id() { return this.#id; }
  get status() { return this.#status; }
  get total() { return this.#total; }
  get items() { return this.#items; }
  
  nextStatus() {
    const idx = Order.STATUS.indexOf(this.#status);
    if (idx >= 0 && idx < 2) this.#status = Order.STATUS[idx + 1];
  }
  
  cancel() { this.#status = 'Cancelado'; }
  
  getData() {
    return {
      id: this.#id,
      customerId: this.#customerId,
      driverId: this.#driverId,
      items: this.#items,
      address: this.#address,
      status: this.#status,
      total: this.#total,
      dateCreated: this.#dateCreated
    };
  }
}

// ============================================
// SISTEMA
// ============================================

const system = {
  items: [],
  users: [],
  orders: [],
  
  save() {
    localStorage.setItem('rappi_items_v2', JSON.stringify(this.items.map(i => i.getData())));
    localStorage.setItem('rappi_users_v2', JSON.stringify(this.users.map(u => u.getData())));
    localStorage.setItem('rappi_orders_v2', JSON.stringify(this.orders.map(o => o.getData())));
  },
  
  load() {
    try {
      // Items
      const itemsData = JSON.parse(localStorage.getItem('rappi_items_v2') || '[]');
      this.items = itemsData.map(d => {
        let item;
        if (d.type === 'FoodItem') item = new FoodItem(d.name, d.category, d.price, d.id);
        else if (d.type === 'BeverageItem') item = new BeverageItem(d.name, d.category, d.price, d.id);
        else item = new DessertItem(d.name, d.category, d.price, d.id);
        if (d.active === false) item.deactivate();
        return item;
      }).filter(Boolean);
      
      // Users
      const usersData = JSON.parse(localStorage.getItem('rappi_users_v2') || '[]');
      this.users = usersData.map(d => {
        let user;
        if (d.type === 'Customer') user = new Customer(d.name, d.email, d.phone, d.id);
        else if (d.type === 'Driver') user = new Driver(d.name, d.email, d.phone, d.id);
        else user = new Admin(d.name, d.email, d.phone, d.id);
        if (d.active === false) user.deactivate();
        return user;
      }).filter(Boolean);
      
      // Orders
      const ordersData = JSON.parse(localStorage.getItem('rappi_orders_v2') || '[]');
      this.orders = ordersData.map(d => new Order(d.customerId, d.driverId, d.items, d.address, d.id, d.status));
      
    } catch (e) {
      console.error('Error:', e);
    }
  }
};

// ============================================
// UTILIDADES
// ============================================

const $ = id => document.getElementById(id);
const fmt = n => '$' + n.toLocaleString('es-CO');
const toast = (msg, err = false) => {
  const t = $('toast');
  $('toastMsg').textContent = msg;
  t.className = 'toast show' + (err ? ' error' : '');
  setTimeout(() => t.classList.remove('show'), 2500);
};

// ============================================
// ESTADO
// ============================================

let editingItemId = null;
let editingUserId = null;

// ============================================
// RENDER
// ============================================

function updateStats() {
  $('totalItems').textContent = system.items.length;
  $('totalUsers').textContent = system.users.length;
  $('totalOrders').textContent = system.orders.length;
}

function renderItems() {
  const search = $('searchItems').value.toLowerCase();
  const typeF = $('filterItemType').value;
  const statusF = $('filterItemStatus').value;
  
  let list = system.items;
  if (search) list = list.filter(i => i.name.toLowerCase().includes(search));
  if (typeF !== 'Todos') list = list.filter(i => i.getType() === typeF);
  if (statusF !== 'Todos') list = list.filter(i => statusF === 'active' ? i.isActive : !i.isActive);
  
  $('itemCount').textContent = list.length;
  $('itemsList').innerHTML = list.length ? list.map(i => {
    const d = i.getData();
    return `
      <div class="item-card ${i.isActive ? '' : 'inactive'}">
        <h3>${i.name}</h3>
        <div class="item-price">${fmt(d.price)}</div>
        <span class="item-category">${i.category}</span>
        <span class="status-badge ${i.isActive ? 'active' : 'inactive'}">${i.isActive ? 'Activo' : 'Inactivo'}</span>
        <div class="item-actions">
          <button class="btn-action btn-toggle" onclick="toggleItem('${i.id}')">${i.isActive ? 'Desactivar' : 'Activar'}</button>
          <button class="btn-action btn-edit" onclick="editItem('${i.id}')">Editar</button>
          <button class="btn-action btn-delete" onclick="deleteItem('${i.id}')">X</button>
        </div>
      </div>
    `;
  }).join('') : '<p style="color:#888;text-align:center;padding:30px;">No hay productos</p>';
  updateStats();
}

function renderUsers() {
  const search = $('searchUsers').value.toLowerCase();
  const roleF = $('filterUserRole').value;
  
  let list = system.users;
  if (search) list = list.filter(u => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search));
  if (roleF !== 'Todos') list = list.filter(u => u.getType() === roleF);
  
  $('userCount').textContent = list.length;
  $('usersList').innerHTML = list.length ? list.map(u => `
    <div class="item-card ${u.isActive ? '' : 'inactive'}">
      <h3>${u.name}</h3>
      <div style="font-size:13px;color:#888;">📧 ${u.email}</div>
      <div style="font-size:13px;color:#888;">📱 ${u.phone}</div>
      <span class="status-badge ${u.isActive ? 'active' : 'inactive'}">${u.isActive ? 'Activo' : 'Inactivo'}</span>
      <div class="item-actions">
        <button class="btn-action btn-toggle" onclick="toggleUser('${u.id}')">${u.isActive ? 'Desactivar' : 'Activar'}</button>
        <button class="btn-action btn-edit" onclick="editUser('${u.id}')">Editar</button>
        <button class="btn-action btn-delete" onclick="deleteUser('${u.id}')">X</button>
      </div>
    </div>
  `).join('') : '<p style="color:#888;text-align:center;padding:30px;">No hay usuarios</p>';
  updateStats();
  updateOrderSelectors();
}

function renderOrders() {
  const statusF = $('filterOrderStatus').value;
  let list = system.orders;
  if (statusF !== 'Todos') list = list.filter(o => o.status === statusF);
  
  $('orderCount').textContent = list.length;
  $('ordersList').innerHTML = list.length ? list.map(o => {
    const d = o.getData();
    const c = system.users.find(u => u.id == d.customerId);
    const dr = system.users.find(u => u.id == d.driverId);
    return `
      <div class="order-card">
        <div class="order-header">
          <span class="order-id">${d.id}</span>
          <span class="order-status ${d.status.replace(' ','')}">${d.status}</span>
        </div>
        <div class="order-info">
          <div><span>Cliente</span>${c ? c.name : 'N/A'}</div>
          <div><span>Repartidor</span>${dr ? dr.name : 'N/A'}</div>
          <div><span>Dirección</span>${d.address}</div>
        </div>
        <div class="order-total">Total: ${fmt(d.total)}</div>
        <div class="item-actions">
          ${d.status === 'Pendiente' ? `<button class="btn-action btn-toggle" onclick="nextStatus('${d.id}')">En Camino</button>` : ''}
          ${d.status === 'En Camino' ? `<button class="btn-action btn-toggle" onclick="nextStatus('${d.id}')">Entregado</button>` : ''}
          ${d.status !== 'Entregado' && d.status !== 'Cancelado' ? `<button class="btn-action btn-delete" onclick="cancelOrder('${d.id}')">Cancelar</button>` : ''}
        </div>
      </div>
    `;
  }).join('') : '<p style="color:#888;text-align:center;padding:30px;">No hay pedidos</p>';
  updateStats();
}

function updateOrderSelectors() {
  $('orderCustomer').innerHTML = '<option value="">Seleccionar...</option>' +
    system.users.filter(u => u.getType() === 'Customer' && u.isActive).map(u => 
      `<option value="${u.id}">${u.name}</option>`).join('');
      
  $('orderDriver').innerHTML = '<option value="">Seleccionar...</option>' +
    system.users.filter(u => u.getType() === 'Driver' && u.isActive).map(u => 
      `<option value="${u.id}">${u.name}</option>`).join('');
      
  $('orderItemsList').innerHTML = system.items.filter(i => i.isActive).map(i => {
    const d = i.getData();
    return `
      <div class="order-item-option" data-id="${i.id}" data-name="${i.name}" data-price="${d.price}">
        <input type="checkbox" id="chk-${i.id}">
        <label for="chk-${i.id}">${i.name} - ${fmt(d.price)}</label>
      </div>
    `;
  }).join('');
}

function updateOrderTotal() {
  const checked = [...document.querySelectorAll('#orderItemsList input:checked')];
  const sub = checked.reduce((s, el) => s + Number(el.closest('.order-item-option').dataset.price), 0);
  $('orderSubtotal').textContent = fmt(sub);
  $('orderTotal').textContent = fmt(sub + 5000);
}

// ============================================
// ACCIONES ITEMS
// ============================================

 $('itemForm').onsubmit = e => {
  e.preventDefault();
  
  const name = $('itemName').value.trim();
  const type = $('itemType').value;
  const price = Number($('itemPrice').value);
  const cat = $('itemCategory').value;
  const active = $('itemActive').checked;
  
  if (!name) return toast('Escribe un nombre', true);
  if (price < 8000) return toast('Mínimo $8.000', true);
  
  let item;
  if (type === 'FoodItem') item = new FoodItem(name, cat, price);
  else if (type === 'BeverageItem') item = new BeverageItem(name, cat, price);
  else item = new DessertItem(name, cat, price);
  
  if (!active) item.deactivate();
  
  if (editingItemId) system.items = system.items.filter(i => i.id != editingItemId);
  
  system.items.push(item);
  system.save();
  toast('Guardado correctamente');
  
  $('itemForm').reset();
  $('itemActive').checked = true;
  $('btnCancelItem').style.display = 'none';
  editingItemId = null;
  renderItems();
};

function editItem(id) {
  const it = system.items.find(i => i.id == id);
  if (!it) return;
  editingItemId = id;
  $('itemName').value = it.name;
  $('itemType').value = it.getType();
  $('itemPrice').value = it.price;
  $('itemCategory').value = it.category;
  $('itemActive').checked = it.isActive;
  $('btnCancelItem').style.display = 'inline-block';
}

function toggleItem(id) {
  const it = system.items.find(i => i.id == id);
  if (it) {
    it.isActive ? it.deactivate() : it.activate();
    system.save();
    toast(it.isActive ? 'Activado' : 'Desactivado');
    renderItems();
  }
}

function deleteItem(id) {
  if (confirm('¿Eliminar?')) {
    system.items = system.items.filter(i => i.id != id);
    system.save();
    toast('Eliminado');
    renderItems();
  }
}

 $('btnCancelItem').onclick = () => {
  editingItemId = null;
  $('itemForm').reset();
  $('btnCancelItem').style.display = 'none';
};

// ============================================
// ACCIONES USERS
// ============================================

 $('userForm').onsubmit = e => {
  e.preventDefault();
  
  const name = $('userName').value.trim();
  const email = $('userEmail').value.trim();
  const phone = $('userPhone').value.trim();
  const role = $('userRole').value;
  const active = $('userActive').checked;
  
  if (!name) return toast('Escribe un nombre', true);
  if (!email) return toast('Escribe un email', true);
  
  let user;
  if (role === 'Customer') user = new Customer(name, email, phone);
  else if (role === 'Driver') user = new Driver(name, email, phone);
  else user = new Admin(name, email, phone);
  
  if (!active) user.deactivate();
  
  if (editingUserId) system.users = system.users.filter(u => u.id != editingUserId);
  
  system.users.push(user);
  system.save();
  toast('Usuario guardado');
  
  $('userForm').reset();
  $('userActive').checked = true;
  $('btnCancelUser').style.display = 'none';
  editingUserId = null;
  renderUsers();
};

function editUser(id) {
  const u = system.users.find(x => x.id == id);
  if (!u) return;
  editingUserId = id;
  $('userName').value = u.name;
  $('userEmail').value = u.email;
  $('userPhone').value = u.phone;
  $('userRole').value = u.getType();
  $('userActive').checked = u.isActive;
  $('btnCancelUser').style.display = 'inline-block';
}

function toggleUser(id) {
  const u = system.users.find(x => x.id == id);
  if (u) {
    u.isActive ? u.deactivate() : u.activate();
    system.save();
    toast(u.isActive ? 'Activado' : 'Desactivado');
    renderUsers();
  }
}

function deleteUser(id) {
  if (confirm('¿Eliminar?')) {
    system.users = system.users.filter(u => u.id != id);
    system.save();
    toast('Eliminado');
    renderUsers();
  }
}

 $('btnCancelUser').onclick = () => {
  editingUserId = null;
  $('userForm').reset();
  $('btnCancelUser').style.display = 'none';
};

// ============================================
// ACCIONES ORDERS
// ============================================

 $('orderItemsList').onclick = e => {
  const opt = e.target.closest('.order-item-option');
  if (!opt) return;
  const chk = opt.querySelector('input');
  if (e.target.tagName !== 'INPUT') chk.checked = !chk.checked;
  opt.classList.toggle('selected', chk.checked);
  updateOrderTotal();
};

 $('orderForm').onsubmit = e => {
  e.preventDefault();
  
  const cust = $('orderCustomer').value;
  const drv = $('orderDriver').value;
  const addr = $('orderAddress').value.trim();
  
  if (!cust) return toast('Selecciona cliente', true);
  if (!drv) return toast('Selecciona repartidor', true);
  if (!addr) return toast('Escribe dirección', true);
  
  const checked = [...document.querySelectorAll('#orderItemsList input:checked')];
  if (!checked.length) return toast('Selecciona productos', true);
  
  const items = checked.map(el => {
    const opt = el.closest('.order-item-option');
    return {
      id: opt.dataset.id,
      name: opt.dataset.name,
      price: Number(opt.dataset.price),
      qty: 1
    };
  });
  
  const order = new Order(cust, drv, items, addr);
  system.orders.push(order);
  system.save();
  toast('Pedido creado');
  
  $('orderForm').reset();
  document.querySelectorAll('#orderItemsList input').forEach(i => i.checked = false);
  document.querySelectorAll('.order-item-option').forEach(o => o.classList.remove('selected'));
  updateOrderTotal();
  renderOrders();
};

function nextStatus(id) {
  const o = system.orders.find(x => x.id === id);
  if (o) {
    o.nextStatus();
    system.save();
    toast('Estado actualizado');
    renderOrders();
  }
}

function cancelOrder(id) {
  if (confirm('¿Cancelar?')) {
    const o = system.orders.find(x => x.id === id);
    if (o) {
      o.cancel();
      system.save();
      toast('Cancelado');
      renderOrders();
    }
  }
}

// ============================================
// TABS
// ============================================

document.querySelectorAll('.tab').forEach(t => {
  t.onclick = () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    $(t.dataset.tab + '-tab').classList.add('active');
  };
});

// ============================================
// FILTROS
// ============================================

 $('searchItems').oninput = renderItems;
 $('filterItemType').onchange = renderItems;
 $('filterItemStatus').onchange = renderItems;
 $('searchUsers').oninput = renderUsers;
 $('filterUserRole').onchange = renderUsers;
 $('filterOrderStatus').onchange = renderOrders;

// ============================================
// INICIALIZACIÓN
// ============================================

// Exponer funciones globales
window.editItem = editItem;
window.toggleItem = toggleItem;
window.deleteItem = deleteItem;
window.editUser = editUser;
window.toggleUser = toggleUser;
window.deleteUser = deleteUser;
window.nextStatus = nextStatus;
window.cancelOrder = cancelOrder;

// Cargar y renderizar
system.load();
renderItems();
renderUsers();
renderOrders();
updateOrderSelectors();

console.log('✅ Sistema listo');