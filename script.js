/* ============================================
   PROYECTO SEMANA 01 - FICHA DE INFORMACIÓN INTERACTIVA
   Dominio: Aplicaciones de Delivery de Comida - Logística y Transporte
   Empresa: Rappi (Empresa Colombiana Real)
   ============================================ */

// ============================================
// TODO 1: Crear el objeto de datos del dominio
// ============================================

const entityData = {
  // Propiedades básicas de Rappi
  name: 'Rappi',
  description: 'Rappi es una empresa colombiana de tecnología que ofrece servicios de delivery de comida, mercado, farmacia y otros productos. Fundada en 2015, se ha convertido en una de las principales plataformas de entregas a domicilio en Latinoamérica, operando en 9 países con más de 25 millones de usuarios activos.',
  code: 'RAP-001',
  location: 'Bogotá, Colombia',

  // Información de contacto real
  contact: {
    email: 'soporte@rappi.com',
    phone: '+57 1 508 7440',
    whatsapp: '+57 310 495 5050',
    website: 'www.rappi.com.co',
    websiteUrl: 'https://www.rappi.com.co',
    founded: '2015'
  },

  // Array de servicios de Rappi (items)
  items: [
    { name: 'Rappi Prime', level: 95, category: 'Suscripción premium' },
    { name: 'RappiCard', level: 88, category: 'Tarjeta de crédito' },
    { name: 'RappiPay', level: 82, category: 'Pagos digitales' },
    { name: 'RappiBank', level: 75, category: 'Servicios bancarios' },
    { name: 'RappiTurbo', level: 92, category: 'Entrega en 10 min' }
  ],

  // Array de países donde opera Rappi (links)
  links: [
    { platform: '🇨🇴 Colombia', url: 'https://www.rappi.com.co', icon: '🏠' },
    { platform: '🇲🇽 México', url: 'https://www.rappi.com.mx', icon: '🌮' },
    { platform: '🇦🇷 Argentina', url: 'https://www.rappi.com.ar', icon: '🥩' },
    { platform: '🇧🇷 Brasil', url: 'https://www.rappi.com.br', icon: '🍹' },
    { platform: '🇨🇱 Chile', url: 'https://www.rappi.cl', icon: '🏔️' },
    { platform: '🇵🇪 Perú', url: 'https://www.rappi.com.pe', icon: '🏛️' },
    { platform: '🇪🇨 Ecuador', url: 'https://www.rappi.com.ec', icon: '🌺' },
    { platform: '🇺🇾 Uruguay', url: 'https://www.rappi.com.uy', icon: '🌅' }
  ],

  // Estadísticas reales aproximadas de Rappi
  stats: {
    users: 25000000,
    restaurants: 50000,
    countries: 9,
    employees: 7000
  }
};

// ============================================
// TODO 2: Referencias a elementos del DOM
// ============================================

const userName = document.getElementById('userName');
const userTitle = document.getElementById('userTitle');
const userLocation = document.getElementById('userLocation');
const userBio = document.getElementById('userBio');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const userWhatsapp = document.getElementById('userWhatsapp');
const userWebsite = document.getElementById('userWebsite');
const skillsList = document.getElementById('skillsList');
const socialLinks = document.getElementById('socialLinks');
const statsContainer = document.getElementById('stats');
const themeToggle = document.getElementById('themeToggle');
const toggleSkillsBtn = document.getElementById('toggleSkills');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const copyPhoneBtn = document.getElementById('copyPhoneBtn');
const copyWhatsappBtn = document.getElementById('copyWhatsappBtn');
const copyInfoBtn = document.getElementById('copyInfoBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// TODO 3: Renderizar información básica
// ============================================

const renderBasicInfo = () => {
  // Destructuring para extraer propiedades
  const { name, description, code, location, contact } = entityData;

  // Actualizar elementos del DOM con template literals
  userName.textContent = name;
  userTitle.textContent = `Código: ${code} | Fundada: ${contact.founded}`;
  userLocation.textContent = `📍 Sede Principal: ${location}`;
  userBio.textContent = description;
  userEmail.textContent = contact.email;
  userPhone.textContent = contact.phone;
  userWhatsapp.textContent = contact.whatsapp;
  userWebsite.textContent = contact.website;
  userWebsite.href = contact.websiteUrl;
};

// ============================================
// TODO 4: Renderizar lista de elementos (servicios)
// ============================================

const renderItems = (showAll = false) => {
  // Destructuring para extraer items
  const { items } = entityData;

  // Filtrar items si showAll es false (mostrar solo 4)
  const itemsToShow = showAll ? items : items.slice(0, 4);

  // Generar HTML con map() y template literals
  const itemsHtml = itemsToShow.map(item => {
    const { name, level, category } = item;
    return `
      <div class="skill-item">
        <div class="skill-name">${name}</div>
        <div class="skill-level">
          <span>${category}</span>
          <div class="skill-bar">
            <div class="skill-bar-fill" style="width: ${level}%"></div>
          </div>
        </div>
        <span>${level}% popularidad</span>
      </div>
    `;
  }).join('');

  // Actualizar el contenedor de items
  skillsList.innerHTML = itemsHtml;
};

// ============================================
// TODO 5: Renderizar enlaces/referencias (países)
// ============================================

const renderLinks = () => {
  // Destructuring para extraer links
  const { links } = entityData;

  // Generar HTML con map() y template literals
  const linksHtml = links.map(link => {
    const { platform, url, icon } = link;
    return `
      <a href="${url}" class="social-link" target="_blank" rel="noopener noreferrer">
        <span>${icon}</span>
        ${platform}
      </a>
    `;
  }).join('');

  // Actualizar el contenedor de links
  socialLinks.innerHTML = linksHtml;
};

// ============================================
// TODO 6: Calcular y renderizar estadísticas
// ============================================

const renderStats = () => {
  // Destructuring para extraer estadísticas
  const { stats } = entityData;

  // Función auxiliar para formatear números
  const formatNumber = num => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  // Array de estadísticas con labels en español
  const statsArray = [
    { label: 'Usuarios Activos', value: formatNumber(stats.users) },
    { label: 'Restaurantes', value: formatNumber(stats.restaurants) },
    { label: 'Países', value: stats.countries },
    { label: 'Empleados', value: formatNumber(stats.employees) }
  ];

  // Generar HTML con map() y template literals
  const statsHtml = statsArray.map(stat => `
    <div class="stat-item">
      <span class="stat-value">${stat.value}</span>
      <span class="stat-label">${stat.label}</span>
    </div>
  `).join('');

  // Actualizar el contenedor de estadísticas
  statsContainer.innerHTML = statsHtml;
};

// ============================================
// TODO 7: Funcionalidad de cambio de tema
// ============================================

const toggleTheme = () => {
  // Obtener tema actual
  const currentTheme = document.documentElement.dataset.theme;
  
  // Calcular nuevo tema
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Aplicar nuevo tema con transición suave
  document.documentElement.style.transition = 'all 0.5s ease';
  document.documentElement.dataset.theme = newTheme;

  // Actualizar ícono del botón con animación
  const themeIcon = themeToggle.querySelector('.theme-icon');
  themeIcon.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    themeIcon.style.transform = 'rotate(0deg)';
  }, 150);

  // Guardar preferencia en localStorage
  localStorage.setItem('theme', newTheme);
  
  // Mostrar notificación
  showToast(`Tema ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`);
};

const loadTheme = () => {
  // Cargar tema desde localStorage con nullish coalescing
  const savedTheme = localStorage.getItem('theme') ?? 'dark';
  document.documentElement.dataset.theme = savedTheme;
  
  // Actualizar ícono del botón
  const themeIcon = themeToggle.querySelector('.theme-icon');
  themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// ============================================
// TODO 8: Funcionalidad de copiar información
// ============================================

const copyToClipboard = (text, successMessage) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      showToast(successMessage);
    })
    .catch(() => {
      // Fallback para navegadores antiguos
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(successMessage);
    });
};

const copyEmail = () => {
  const { contact } = entityData;
  copyToClipboard(contact.email, '¡Email copiado al portapapeles!');
};

const copyPhone = () => {
  const { contact } = entityData;
  copyToClipboard(contact.phone, '¡Teléfono copiado al portapapeles!');
};

const copyWhatsapp = () => {
  const { contact } = entityData;
  copyToClipboard(contact.whatsapp, '¡WhatsApp copiado al portapapeles!');
};

const copyInfo = () => {
  // Destructuring para extraer datos
  const { name, description, code, location, contact, stats, items, links } = entityData;

  // Construir texto con template literals
  const infoText = `
====================================
 ${name} (${code})
====================================
 ${description}

SEDE PRINCIPAL: ${location}
FUNDACIÓN: ${contact.founded}

CONTACTO:
- Email: ${contact.email}
- Teléfono: ${contact.phone}
- WhatsApp: ${contact.whatsapp}
- Sitio Web: ${contact.website}

ESTADÍSTICAS:
- Usuarios activos: ${stats.users.toLocaleString()}
- Restaurantes afiliados: ${stats.restaurants.toLocaleString()}
- Países de operación: ${stats.countries}
- Empleados: ${stats.employees.toLocaleString()}

SERVICIOS:
 ${items.map(s => `- ${s.name}: ${s.level}% popularidad (${s.category})`).join('\n')}

PAÍSES DE OPERACIÓN:
 ${links.map(p => `- ${p.platform}`).join('\n')}
  `.trim();

  copyToClipboard(infoText, '¡Información completa copiada!');
};

// Función auxiliar para mostrar notificaciones toast
const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// TODO 9: Funcionalidad de mostrar/ocultar items
// ============================================

let showingAllItems = false;

const handleToggleItems = () => {
  // Cambiar estado
  showingAllItems = !showingAllItems;
  
  // Renderizar items con el nuevo estado
  renderItems(showingAllItems);
  
  // Actualizar texto del botón con animación
  const btnText = toggleSkillsBtn.querySelector('.btn-text');
  const btnIcon = toggleSkillsBtn.querySelector('.btn-icon');
  
  btnText.textContent = showingAllItems ? 'Mostrar menos' : 'Mostrar más';
  btnIcon.style.transform = showingAllItems ? 'rotate(180deg)' : 'rotate(0deg)';
};

// ============================================
// TODO 10: Event Listeners
// ============================================

themeToggle.addEventListener('click', toggleTheme);
toggleSkillsBtn.addEventListener('click', handleToggleItems);
copyEmailBtn.addEventListener('click', copyEmail);
copyPhoneBtn.addEventListener('click', copyPhone);
copyWhatsappBtn.addEventListener('click', copyWhatsapp);
copyInfoBtn.addEventListener('click', copyInfo);

// ============================================
// TODO 11: Inicializar la aplicación
// ============================================

const init = () => {
  // Cargar tema guardado
  loadTheme();

  // Renderizar todos los componentes
  renderBasicInfo();
  renderItems(false);
  renderLinks();
  renderStats();

  // Mensaje de confirmación en consola
  console.log('%c✅ Rappi - Ficha de información cargada correctamente', 'color: #FF006E; font-size: 16px; font-weight: bold;');
  console.log('%c📦 Dominio: Delivery de Comida - Logística y Transporte', 'color: #9D4EDD;');
  console.log('%c🏢 Empresa real colombiana de delivery', 'color: #00FF88;');
};

// Ejecutar init cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// ============================================
// CHECKLIST DE VERIFICACIÓN
// ============================================
// ✓ La información de tu dominio se muestra correctamente
// ✓ Los items muestran niveles/porcentajes con barras animadas
// ✓ Los enlaces/referencias funcionan (países de operación)
// ✓ Las estadísticas se muestran correctamente
// ✓ El cambio de tema funciona con animación (claro/oscuro)
// ✓ Los botones de copiar funcionan y muestran notificación
// ✓ El botón de mostrar más/menos funciona con animación
// ✓ Todo usa sintaxis ES2023 (sin var, sin funciones tradicionales)
// ✓ Template literals para toda interpolación de strings
// ✓ Arrow functions en todo el código
// ✓ Destructuring usado donde corresponde
// ✓ Comentarios en español
// ✓ Nomenclatura técnica en inglés
// ✓ Logo Rappi con color original (#FF441F)
// ✓ Colores neón morado/rosado en botones e interfaz
// ✓ Contacto completo: email, teléfono, WhatsApp, web
// ✓ Efectos neón en todos los botones
