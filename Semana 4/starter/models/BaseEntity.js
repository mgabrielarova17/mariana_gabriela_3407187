// Clase base para pedidos de logística (DeliveryOrder)
export class DeliveryOrder {
  // Destructuring en parámetros con valores por defecto
  constructor({ 
    clientName, 
    address, 
    orderDetails,
    productsCost, 
    deliveryCost, 
    status = 'Pendiente', 
    driver = 'Sin Asignar' 
  }) {
    this.id = Date.now();
    this.clientName = clientName;
    this.address = address;
    this.orderDetails = orderDetails;
    
    this.productsCost = Number(productsCost) || 0;
    this.deliveryCost = Number(deliveryCost) || 0;
    this.totalCost = this.productsCost + this.deliveryCost;
    
    this.status = status;
    this.driver = driver;
    this.createdAt = new Date().toISOString();
  }

  getData() {
    const { id, clientName, address, orderDetails, productsCost, deliveryCost, totalCost, status, driver, createdAt } = this;
    return { id, clientName, address, orderDetails, productsCost, deliveryCost, totalCost, status, driver, createdAt };
  }
}