# 📦 Proyecto Semana 02 — Gestor de Colección
## 🍔 Delivery Web - Gestor de Productos

---

## 🎯 Descripción del Proyecto

Este proyecto consiste en una aplicación web desarrollada en **JavaScript puro (ES2023)** para gestionar una colección de productos dentro de un sistema tipo **Delivery Web (B2C)**.

La aplicación permite crear, visualizar, editar estados y eliminar productos, aplicando conceptos modernos de JavaScript vistos durante la Semana 02.

El objetivo principal es simular la administración de productos disponibles en una plataforma de pedidos en línea.

---

## 🧠 Dominio Asignado

**Dominio:** Delivery / Comercio electrónico B2C

En este contexto:

| Concepto Genérico | Adaptación Delivery |
|------------------|--------------------|
| Elemento | Producto |
| Categoría | Tipo de comida |
| Estado activo | Disponible / No disponible |
| Prioridad | Nivel del producto |
| Estadísticas | Productos activos e inactivos |

---

## 🧱 Modelo de Datos

Cada producto tiene la siguiente estructura:

```javascript
{
  id: Number,
  name: String,
  price: Number,
  category: String,
  active: Boolean,
  createdAt: String,
  updatedAt: String | null
}
