// main.js - Punto de entrada para Logistics Delivery System
import { initManager } from './services/index.js';
import { initEvents, refreshUI } from './ui/index.js';

console.log("🚀 Iniciando Logistics Delivery System...");

// Inicializar el manager de datos
initManager();

// Inicializar eventos de la UI (Aquí se cargan los productos)
initEvents();

// Renderizar UI inicial
refreshUI();

console.log("✅ Sistema de Logística cargado correctamente");