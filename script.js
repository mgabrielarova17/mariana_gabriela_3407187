// ============================================
// Food Delivery App - Logistics & Transport
// Proyecto Semana 01
// ============================================

const entityData = {
  name: 'FoodExpress',
  description:
    'FoodExpress es una aplicación de delivery de comida enfocada en logística urbana eficiente y transporte rápido.',
  identifier: 'DEL-LOG-001',

  contact: {
    email: 'support@foodexpress.com',
    phone: '+57 300 456 7890',
    location: 'Bogotá, Colombia'
  },

  items: [
    { name: 'Motorcycle Delivery', level: 90, category: 'Transport' },
    { name: 'Bicycle Delivery', level: 75, category: 'Eco' },
    { name: 'Car Delivery', level: 65, category: 'Bulk Orders' },
    { name: 'Express Service', level: 85, category: 'Service' },
    { name: 'Scheduled Delivery', level: 70, category: 'Service' }
  ],

  links: [
    { platform: 'Website', url: 'https://foodexpress.com', icon: '🌐' },
    { platform: 'Instagram', url: 'https://instagram.com/foodexpress', icon: '📸' },
    { platform: 'WhatsApp', url: 'https://wa.me/573004567890', icon: '💬' }
  ],

  stats: {
    totalOrders: 12450,
    activeDrivers: 320,
    averageTime: 28,
    satisfaction: 4.7
  }
};

// DOM references
const userName = document.getElementById('userName');
const userTitle = document.getElementById('userTitle');
const userLocation = document.getElementById('userLocation');
const userBio = document.getElementById('userBio');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');

const skillsList = document.getElementById('skillsList');
const socialLinks = document.getElementById('socialLinks');
const statsContainer = document.getElementById('stats');

const themeToggle = document.getElementById('themeToggle');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const toggleSkillsBtn = document.getElementById('toggleSkills');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Render basic info
const renderBasicInfo = () => {
  const {
    name,
    description,
    contact: { email, phone, location }
  } = entityData;

  userName.textContent = name;
  userTitle.textContent = 'Food Delivery App - Logistics & Transport';
  userLocation.textContent = `📍 ${location}`;
  userBio.textContent = description;
  userEmail.textContent = email;
  userPhone.textContent = phone;
};

// Render items
const renderItems = (showAll = false) => {
  const { items } = entityData;
  const itemsToShow = showAll ? items : items.slice(0, 4);

  skillsList.innerHTML = itemsToShow
    .map(
      ({ name, level }) => `
      <div class="skill-item">
        <div class="skill-name">${name}</div>
        <div class="skill-level">
          <span>${level}%</span>
          <div class="skill-bar">
            <div class="skill-bar-fill" style="width:${level}%"></div>
          </div>
        </div>
      </div>
    `
    )
    .join('');
};

// Render links
const renderLinks = () => {
  const { links } = entityData;

  socialLinks.innerHTML = links
    .map(
      ({ platform, url, icon }) => `
      <a href="${url}" target="_blank" class="social-link">
        ${icon} ${platform}
      </a>
    `
    )
    .join('');
};

// Render stats
const renderStats = () => {
  const { stats } = entityData;

  const statsArray = [
    { label: 'Pedidos Totales', value: stats.totalOrders },
    { label: 'Repartidores Activos', value: stats.activeDrivers },
    { label: 'Tiempo Promedio (min)', value: stats.averageTime },
    { label: 'Satisfacción', value: stats.satisfaction }
  ];

  statsContainer.innerHTML = statsArray
    .map(
      ({ label, value }) => `
      <div class="stat-item">
        <span class="stat-value">${value}</span>
        <span class="stat-label">${label}</span>
      </div>
    `
    )
    .join('');
};

// Theme
const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme ?? 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  themeToggle.querySelector('.theme-icon').textContent =
    newTheme === 'dark' ? '☀️' : '🌙';

  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.querySelector('.theme-icon').textContent =
    savedTheme === 'dark' ? '☀️' : '🌙';
};

// Copy info
const copyInfo = () => {
  const { name, description, contact } = entityData;

  const infoText = `
${name}
${description}
Email: ${contact.email}
Phone: ${contact.phone}
  `.trim();

  navigator.clipboard.writeText(infoText);
  showToast('¡Información copiada correctamente!');
};

// Toast
const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
};

// Toggle items
let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  toggleSkillsBtn.textContent = showingAllItems
    ? 'Show Less'
    : 'Show More';
};

// Events
themeToggle.addEventListener('click', toggleTheme);
copyEmailBtn.addEventListener('click', copyInfo);
toggleSkillsBtn.addEventListener('click', handleToggleItems);

// Init
const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log('✅ App initialized successfully');
};

init();
