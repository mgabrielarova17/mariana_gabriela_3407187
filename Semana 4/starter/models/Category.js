// Clase para estados de pedido y categorías de logística
export class OrderStatus {
  constructor(id, name, icon) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }
}

// Estados disponibles para los pedidos (Logística)
export const ORDER_STATUS_VALUES = [
  new OrderStatus('Pendiente', 'Pendiente', '⏳'),
  new OrderStatus('En Camino', 'En Camino', '🛵'),
  new OrderStatus('Entregado', 'Entregado', '✅'),
  new OrderStatus('Cancelado', 'Cancelado', '❌')
];