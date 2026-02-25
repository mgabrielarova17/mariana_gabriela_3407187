## 📄 **README.md**

```markdown
# Rappi Delivery System - Sistema de Gestión con POO

## 📋 Información
- **Nombre**: Mariana Gabriela Contreras Romero
- **Fecha**: 23/01/2025
- **Dominio Asignado**: Delivery de Comida - Logística y Transporte
- **Proyecto**: Semana 3 - Sistema de Gestión con Programación Orientada a Objetos

## 🎯 Descripción
Sistema completo de gestión para una plataforma de delivery desarrollado con Programación Orientada a Objetos (POO) en JavaScript ES2023. Implementa una arquitectura de clases con herencia, encapsulación mediante campos privados, y patrones de diseño modernos.

El sistema permite gestionar productos (comidas, bebidas, postres), usuarios (clientes, repartidores, administradores) y pedidos con seguimiento de estados.

## 📚 Conceptos POO Aplicados

### Encapsulación
- Campos privados con `#` para proteger datos sensibles
- Getters y setters para controlar acceso a propiedades
- Validación en setters para mantener integridad de datos

### Herencia
- Clase base abstracta `BaseItem` para productos
- Clase base abstracta `Person` para usuarios
- Subclases especializadas con `extends` y `super()`

### Abstracción
- Métodos abstractos que deben implementarse en subclases
- Clases base que no pueden instanciarse directamente

### Polimorfismo
- Método `getInfo()` con comportamiento diferente en cada subclase
- Método `getRole()` específico para cada tipo de usuario

## 🏗️ Arquitectura de Clases

### Jerarquía de Productos
```
BaseItem (abstracta)
├── FoodItem        - Productos de comida con calorías y tiempo de preparación
├── BeverageItem    - Bebidas con volumen y temperatura
└── DessertItem     - Postres con información de azúcar
```

### Jerarquía de Usuarios
```
Person (abstracta)
├── Customer        - Clientes con dirección y puntos de fidelidad
├── Driver          - Repartidores con licencia y vehículo
└── Admin           - Administradores con nivel de acceso
```

### Sistema Principal
```
DeliverySystem      - Clase principal que gestiona todo el sistema
├── Order           - Gestión de pedidos y estados
└── Storage         - Persistencia en localStorage
```

## 🎨 Características del Proyecto

### Modelo de Datos - Productos

```javascript
// Comida
{
  id: String,
  name: String,
  price: Number,
  category: String,
  active: Boolean,
  calories: Number,
  cookingTime: Number,
  dateCreated: Date
}

// Bebida
{
  id: String,
  name: String,
  price: Number,
  category: String,
  active: Boolean,
  volume: Number,
  isCold: Boolean,
  dateCreated: Date
}

// Postre
{
  id: String,
  name: String,
  price: Number,
  category: String,
  active: Boolean,
  sugarFree: Boolean,
  calories: Number,
  dateCreated: Date
}
```

### Modelo de Datos - Usuarios

```javascript
// Cliente
{
  id: String,
  name: String,
  email: String,
  phone: String,
  active: Boolean,
  address: String,
  loyaltyPoints: Number,
  dateCreated: Date
}

// Repartidor
{
  id: String,
  name: String,
  email: String,
  phone: String,
  active: Boolean,
  license: String,
  vehicle: String,
  deliveries: Number,
  rating: Number,
  dateCreated: Date
}

// Administrador
{
  id: String,
  name: String,
  email: String,
  phone: String,
  active: Boolean,
  department: String,
  accessLevel: Number,
  dateCreated: Date
}
```

### Modelo de Datos - Pedidos

```javascript
{
  id: String,
  customerId: String,
  driverId: String,
  items: Array,
  address: String,
  status: String,  // Pendiente, En Camino, Entregado, Cancelado
  subtotal: Number,
  delivery: Number,
  total: Number,
  dateCreated: Date
}
```

## 🚀 Cómo Ejecutar
1. Descargar los archivos (index.html, styles.css, script.js)
2. Abrir index.html en el navegador
3. O usar Live Server en VS Code para mejor experiencia

## 📸 Screenshots
[Agregar capturas de pantalla del proyecto funcionando]

### Vista de Productos
[Aquí colocar captura]

### Vista de Usuarios
[Aquí colocar captura]

### Vista de Pedidos
[Aquí colocar captura]

## 🎯 Autoevaluación
| Criterio | Porcentaje |
|----------|------------|
| Clases y Herencia | 100% |
| Encapsulación | 100% |
| Características Modernas | 100% |
| **Total Estimado** | **100%** |

## 📦 Estructura del Proyecto
```
contreras-romero-semana3/
├── index.html          # Estructura HTML semántica
├── styles.css          # Estilos con diseño moderno
├── script.js           # Lógica POO con ES2023
└── README.md           # Este archivo
```

## 🔧 Tecnologías Utilizadas
- **HTML5**: Estructura semántica con formularios dinámicos
- **CSS3**: Variables CSS, flexbox, grid, animaciones
- **JavaScript ES2023**: Clases, campos privados (#), bloques estáticos
- **LocalStorage**: Persistencia de datos

## ✅ Checklist de Requisitos

### Clases y Herencia (40 puntos)
- [x] Clase base abstracta `BaseItem` correcta (10pts)
- [x] 3 clases derivadas: FoodItem, BeverageItem, DessertItem (10pts)
- [x] Uso correcto de `extends` y `super()` (10pts)
- [x] Métodos sobreescritos correctamente (10pts)

### Encapsulación (30 puntos)
- [x] Campos privados `#` implementados correctamente (10pts)
- [x] Getters para todas las propiedades privadas (10pts)
- [x] Validación en setters (precio mínimo, email válido) (10pts)

### Características Modernas (30 puntos)
- [x] Bloques estáticos `static { }` para configuración (10pts)
- [x] Métodos y propiedades estáticas (10pts)
- [x] Integración con DOM funcional (10pts)

## 📝 Detalles de Implementación

### Campos Privados
```javascript
class BaseItem {
  #id;
  #name;
  #active;
  #category;
  #dateCreated;
  
  constructor(name, category) {
    this.#id = Date.now() + Math.random().toString(36).substr(2, 9);
    this.#name = name;
    this.#active = true;
    this.#category = category;
    this.#dateCreated = new Date().toISOString();
  }
  
  get id() { return this.#id; }
  get name() { return this.#name; }
  get isActive() { return this.#active; }
}
```

### Herencia con super()
```javascript
class FoodItem extends BaseItem {
  #price;
  #calories;
  
  constructor(name, category, price, calories) {
    super(name, category);  // Llamar al constructor padre
    this.#price = price;
    this.#calories = calories;
  }
}
```

### Bloque Estático
```javascript
class Order {
  static STATUS = ['Pendiente', 'En Camino', 'Entregado', 'Cancelado'];
  
  // Configuración estática
  static {
    console.log('Order class initialized');
  }
}
```

### Métodos Abstractos
```javascript
class BaseItem {
  // Método que debe implementarse en subclases
  getInfo() {
    throw new Error('Método getInfo() debe ser implementado');
  }
  
  getType() {
    return this.constructor.name;
  }
}
```

## 🎯 Funcionalidades CRUD

### Productos
| Operación | Implementación |
|-----------|----------------|
| Crear | Formulario con validación de precio mínimo ($8.000 COP) |
| Leer | Lista con filtros por tipo y estado |
| Actualizar | Edición inline con formulario |
| Eliminar | Confirmación antes de eliminar |
| Activar/Desactivar | Toggle de estado |

### Usuarios
| Operación | Implementación |
|-----------|----------------|
| Crear | Formulario por rol |
| Leer | Lista con filtros por rol |
| Actualizar | Edición inline |
| Eliminar | Confirmación antes de eliminar |
| Activar/Desactivar | Toggle de estado |

### Pedidos
| Operación | Implementación |
|-----------|----------------|
| Crear | Selector de cliente, repartidor y productos |
| Leer | Lista con filtro por estado |
| Actualizar Estado | Flujo: Pendiente → En Camino → Entregado |
| Cancelar | Cancelación con confirmación |

## 🏢 Sobre el Dominio

**Delivery de Comida - Logística y Transporte**

Sistema de gestión para plataforma de delivery que permite:
- Administrar catálogo de productos alimenticios
- Gestionar usuarios con diferentes roles
- Crear y dar seguimiento a pedidos
- Controlar disponibilidad de productos
- Filtrar y buscar información

## 👤 Autor
- **Aprendiz**: Mariana Gabriela Contreras Romero
- **Programa**: SENA - Análisis y Desarrollo de Software
- **Semana**: 3
- **Fecha de entrega**: 23/01/2025

---

*Proyecto desarrollado como entregable de la Semana 3 del programa de formación SENA*