import { VEHICLE_DB, CATEGORIES, LIFESTYLE_SEGMENTS, BRANDS, PRODUCTS, FAQS } from './data.js';

// Application State
const state = {
  activeVehicle: JSON.parse(localStorage.getItem('haztap_active_vehicle')) || null,
  savedVehicles: JSON.parse(localStorage.getItem('haztap_saved_vehicles')) || [
    { year: 2022, make: "Toyota", model: "Hilux", engine: "2.8L Turbo Diesel (1GD-FTV)" }
  ],
  cart: JSON.parse(localStorage.getItem('haztap_cart')) || [
    { productId: "HZ-BRK-001", quantity: 1 },
    { productId: "HZ-FIL-007", quantity: 2 }
  ],
  selectedCategory: 'all',
  selectedBrands: new Set(),
  onlyCompatible: false,
  priceMax: 500,
  sortBy: 'featured',
  searchQuery: ''
};

// Initialize Application on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initVehicleSelector();
  initCategories();
  initLifestyleSegments();
  initBrands();
  initFaqs();
  initSearch();
  initCartDrawer();
  initModals();
  initFilterControls();
  renderCatalog();
  updateGarageUI();
  updateCartBadge();
});

/* ==========================================================================
   Vehicle Selector & Garage Manager
   ========================================================================== */
function initVehicleSelector() {
  const yearSelect = document.getElementById('vehicle-year');
  const makeSelect = document.getElementById('vehicle-make');
  const modelSelect = document.getElementById('vehicle-model');
  const engineSelect = document.getElementById('vehicle-engine');
  const btnApply = document.getElementById('btn-apply-vehicle');
  const btnClear = document.getElementById('btn-clear-vehicle');

  if (!yearSelect) return;

  // Populate Years
  yearSelect.innerHTML = '<option value="">1. Seleccionar Año</option>' +
    VEHICLE_DB.years.map(y => `<option value="${y}">${y}</option>`).join('');

  yearSelect.addEventListener('change', () => {
    const year = yearSelect.value;
    makeSelect.disabled = !year;
    modelSelect.disabled = true;
    engineSelect.disabled = true;
    makeSelect.innerHTML = '<option value="">2. Seleccionar Marca</option>' +
      Object.keys(VEHICLE_DB.makes).map(m => `<option value="${m}">${m}</option>`).join('');
    modelSelect.innerHTML = '<option value="">3. Seleccionar Modelo</option>';
    engineSelect.innerHTML = '<option value="">4. Seleccionar Motor</option>';
  });

  makeSelect.addEventListener('change', () => {
    const make = makeSelect.value;
    modelSelect.disabled = !make;
    engineSelect.disabled = true;
    if (make && VEHICLE_DB.makes[make]) {
      const models = Object.keys(VEHICLE_DB.makes[make].models);
      modelSelect.innerHTML = '<option value="">3. Seleccionar Modelo</option>' +
        models.map(m => `<option value="${m}">${m}</option>`).join('');
    }
    engineSelect.innerHTML = '<option value="">4. Seleccionar Motor</option>';
  });

  modelSelect.addEventListener('change', () => {
    const make = makeSelect.value;
    const model = modelSelect.value;
    engineSelect.disabled = !model;
    if (make && model && VEHICLE_DB.makes[make]?.models[model]) {
      const engines = VEHICLE_DB.makes[make].models[model];
      engineSelect.innerHTML = '<option value="">4. Seleccionar Motor</option>' +
        engines.map(e => `<option value="${e}">${e}</option>`).join('');
    }
  });

  btnApply.addEventListener('click', () => {
    const year = parseInt(yearSelect.value);
    const make = makeSelect.value;
    const model = modelSelect.value;
    const engine = engineSelect.value;

    if (!year || !make || !model) {
      showToast('Por favor selecciona Año, Marca y Modelo para confirmar compatibilidad.', 'warning');
      return;
    }

    state.activeVehicle = { year, make, model, engine: engine || 'Todos los motores' };
    
    // Save to list if not already present
    const exists = state.savedVehicles.some(v => v.year === year && v.make === make && v.model === model);
    if (!exists) {
      state.savedVehicles.push(state.activeVehicle);
      localStorage.setItem('haztap_saved_vehicles', JSON.stringify(state.savedVehicles));
    }

    localStorage.setItem('haztap_active_vehicle', JSON.stringify(state.activeVehicle));
    state.onlyCompatible = true;
    
    const fitmentCheckbox = document.getElementById('filter-compatible-only');
    if (fitmentCheckbox) fitmentCheckbox.checked = true;

    updateGarageUI();
    renderCatalog();
    showToast(`Vehículo activo: ${year} ${make} ${model}`, 'success');
  });

  btnClear.addEventListener('click', () => {
    state.activeVehicle = null;
    localStorage.removeItem('haztap_active_vehicle');
    yearSelect.value = '';
    makeSelect.innerHTML = '<option value="">2. Seleccionar Marca</option>';
    makeSelect.disabled = true;
    modelSelect.innerHTML = '<option value="">3. Seleccionar Modelo</option>';
    modelSelect.disabled = true;
    engineSelect.innerHTML = '<option value="">4. Seleccionar Motor</option>';
    engineSelect.disabled = true;
    
    state.onlyCompatible = false;
    const fitmentCheckbox = document.getElementById('filter-compatible-only');
    if (fitmentCheckbox) fitmentCheckbox.checked = false;

    updateGarageUI();
    renderCatalog();
    showToast('Filtro de vehículo restablecido', 'info');
  });
}

function updateGarageUI() {
  const currentVehicleEl = document.getElementById('header-active-vehicle');
  const activeVehicleBanner = document.getElementById('active-vehicle-banner');
  const activeVehicleName = document.getElementById('active-vehicle-name');

  if (state.activeVehicle) {
    const str = `${state.activeVehicle.year} ${state.activeVehicle.make} ${state.activeVehicle.model}`;
    if (currentVehicleEl) currentVehicleEl.textContent = str;
    if (activeVehicleName) activeVehicleName.textContent = `${str} (${state.activeVehicle.engine})`;
    if (activeVehicleBanner) activeVehicleBanner.style.display = 'flex';
  } else {
    if (currentVehicleEl) currentVehicleEl.textContent = 'Selecciona tu Vehículo';
    if (activeVehicleBanner) activeVehicleBanner.style.display = 'none';
  }
}

/* ==========================================================================
   Categories & Lifestyle Rendering
   ========================================================================== */
function initCategories() {
  const navList = document.getElementById('nav-categories-list');
  const popularGrid = document.getElementById('popular-categories-grid');

  if (navList) {
    navList.innerHTML = `
      <li class="nav-cat-item ${state.selectedCategory === 'all' ? 'active' : ''}">
        <button data-category="all">
          <i data-lucide="layout-grid" style="width:16px;height:16px;"></i> Todos los Repuestos
        </button>
      </li>
      ${CATEGORIES.map(cat => `
        <li class="nav-cat-item ${state.selectedCategory === cat.id ? 'active' : ''}">
          <button data-category="${cat.id}">
            ${cat.name}
          </button>
        </li>
      `).join('')}
    `;

    navList.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedCategory = btn.dataset.category;
        navList.querySelectorAll('.nav-cat-item').forEach(item => item.classList.remove('active'));
        btn.parentElement.classList.add('active');
        renderCatalog();
      });
    });
  }

  if (popularGrid) {
    popularGrid.innerHTML = CATEGORIES.map(cat => `
      <div class="category-tile" data-category="${cat.id}">
        <img src="${cat.image}" alt="${cat.name}" class="category-tile-thumb" loading="lazy" />
        <div class="category-tile-info">
          <h5>${cat.name}</h5>
          <span>${cat.itemCount}</span>
        </div>
      </div>
    `).join('');

    popularGrid.querySelectorAll('.category-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        state.selectedCategory = tile.dataset.category;
        if (navList) {
          navList.querySelectorAll('.nav-cat-item').forEach(item => {
            const btn = item.querySelector('button');
            item.classList.toggle('active', btn.dataset.category === state.selectedCategory);
          });
        }
        renderCatalog();
        document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}

function initLifestyleSegments() {
  const grid = document.getElementById('lifestyle-grid');
  if (!grid) return;

  grid.innerHTML = LIFESTYLE_SEGMENTS.map(seg => `
    <div class="lifestyle-card">
      <div class="lifestyle-card-img">
        <img src="${seg.image}" alt="${seg.title}" loading="lazy" />
        <span class="lifestyle-badge">${seg.badge}</span>
      </div>
      <div class="lifestyle-card-body">
        <h4>${seg.title}</h4>
        <p>${seg.subtitle}</p>
        <a href="#catalog-section" class="lifestyle-link">
          ${seg.linkText} <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>
        </a>
      </div>
    </div>
  `).join('');
}

function initBrands() {
  const grid = document.getElementById('brands-grid');
  const filterBrandList = document.getElementById('filter-brand-options');

  if (grid) {
    grid.innerHTML = BRANDS.map(b => `
      <div class="brand-tile" data-brand="${b.name}">
        <div class="brand-tile-name">${b.logo}</div>
        <div class="brand-tile-country">${b.country}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.brand-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const brand = tile.dataset.brand;
        state.selectedBrands.clear();
        state.selectedBrands.add(brand);
        updateBrandFilterCheckboxes();
        renderCatalog();
        document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  if (filterBrandList) {
    filterBrandList.innerHTML = BRANDS.slice(0, 8).map(b => {
      const count = PRODUCTS.filter(p => p.brand === b.name).length;
      return `
        <label class="filter-checkbox-label">
          <input type="checkbox" value="${b.name}" ${state.selectedBrands.has(b.name) ? 'checked' : ''} />
          <span>${b.name}</span>
          <span class="filter-count">(${count})</span>
        </label>
      `;
    }).join('');

    filterBrandList.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        if (input.checked) {
          state.selectedBrands.add(input.value);
        } else {
          state.selectedBrands.delete(input.value);
        }
        renderCatalog();
      });
    });
  }
}

function updateBrandFilterCheckboxes() {
  const filterBrandList = document.getElementById('filter-brand-options');
  if (!filterBrandList) return;
  filterBrandList.querySelectorAll('input').forEach(input => {
    input.checked = state.selectedBrands.has(input.value);
  });
}

function initFaqs() {
  const container = document.getElementById('faq-container');
  if (!container) return;

  container.innerHTML = FAQS.map((faq, index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}">
      <button class="faq-question">
        <span>${faq.q}</span>
        <i data-lucide="chevron-down" class="faq-icon" style="width:20px;height:20px;"></i>
      </button>
      <div class="faq-answer">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      parent.classList.toggle('active');
    });
  });
}

/* ==========================================================================
   Filter & Catalog Rendering Engine
   ========================================================================== */
function initFilterControls() {
  const sortSelect = document.getElementById('catalog-sort');
  const priceInput = document.getElementById('filter-price-max');
  const fitmentToggle = document.getElementById('filter-compatible-only');
  const btnReset = document.getElementById('btn-reset-filters');

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      state.sortBy = sortSelect.value;
      renderCatalog();
    });
  }

  if (priceInput) {
    priceInput.addEventListener('input', (e) => {
      state.priceMax = parseFloat(e.target.value) || 500;
      renderCatalog();
    });
  }

  if (fitmentToggle) {
    fitmentToggle.addEventListener('change', () => {
      if (fitmentToggle.checked && !state.activeVehicle) {
        showToast('Primero selecciona tu vehículo en el buscador de arriba.', 'warning');
        fitmentToggle.checked = false;
        return;
      }
      state.onlyCompatible = fitmentToggle.checked;
      renderCatalog();
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      state.selectedCategory = 'all';
      state.selectedBrands.clear();
      state.onlyCompatible = false;
      state.priceMax = 500;
      state.searchQuery = '';
      if (priceInput) priceInput.value = '500';
      if (fitmentToggle) fitmentToggle.checked = false;
      updateBrandFilterCheckboxes();
      initCategories();
      renderCatalog();
    });
  }
}

function checkFitment(product, vehicle) {
  if (!vehicle) return 'unknown';
  const match = product.fitment.some(f => {
    return f.make.toLowerCase() === vehicle.make.toLowerCase() &&
      f.models.some(m => m.toLowerCase().includes(vehicle.model.toLowerCase()) || vehicle.model.toLowerCase().includes(m.toLowerCase())) &&
      f.years.includes(vehicle.year);
  });
  return match ? 'compatible' : 'incompatible';
}

function renderCatalog() {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('catalog-count');
  if (!grid) return;

  // Filtering
  let filtered = PRODUCTS.filter(product => {
    // Category Filter
    if (state.selectedCategory !== 'all' && product.category !== state.selectedCategory) {
      return false;
    }
    // Brand Filter
    if (state.selectedBrands.size > 0 && !state.selectedBrands.has(product.brand)) {
      return false;
    }
    // Price Filter
    if (product.price > state.priceMax) {
      return false;
    }
    // Search Query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchOem = product.oemNumber.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchOem) return false;
    }
    // Compatibility Filter
    if (state.onlyCompatible && state.activeVehicle) {
      const fit = checkFitment(product, state.activeVehicle);
      if (fit !== 'compatible') return false;
    }
    return true;
  });

  // Sorting
  if (state.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (countEl) {
    countEl.innerHTML = `Mostrando <strong>${filtered.length}</strong> de ${PRODUCTS.length} repuestos`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #fff; border-radius: 16px; border: 1px dashed #cbd5e1;">
        <i data-lucide="package-search" style="width:48px;height:48px;stroke:#94a3b8;margin:0 auto 1rem;"></i>
        <h4 style="font-size:1.25rem;font-weight:700;margin-bottom:0.5rem;">No encontramos piezas con estos filtros</h4>
        <p style="color:#64748b;font-size:0.9375rem;margin-bottom:1.5rem;">Prueba modificando la marca seleccionada o amplía el rango de precio.</p>
        <button id="btn-empty-reset" class="btn-search-fitment" style="max-width:220px;margin:0 auto;">Restablecer Filtros</button>
      </div>
    `;
    document.getElementById('btn-empty-reset')?.addEventListener('click', () => {
      document.getElementById('btn-reset-filters')?.click();
    });
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const fitStatus = checkFitment(product, state.activeVehicle);
    let fitBadgeHtml = '';

    if (state.activeVehicle) {
      if (fitStatus === 'compatible') {
        fitBadgeHtml = `<span class="card-fitment-badge compatible"><i data-lucide="check-circle" style="width:14px;height:14px;"></i> Compatible con ${state.activeVehicle.year} ${state.activeVehicle.make} ${state.activeVehicle.model}</span>`;
      } else {
        fitBadgeHtml = `<span class="card-fitment-badge incompatible"><i data-lucide="alert-triangle" style="width:14px;height:14px;"></i> No verificado para tu vehículo</span>`;
      }
    } else {
      fitBadgeHtml = `<span class="card-fitment-badge unknown"><i data-lucide="help-circle" style="width:14px;height:14px;"></i> Selecciona vehículo para verificar</span>`;
    }

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-card-top">
          <img src="${product.image}" alt="${product.name}" class="product-card-thumb" loading="lazy" />
          ${product.badge ? `<span class="product-badge-overlay">${product.badge}</span>` : ''}
          <button class="btn-card-quickview" data-id="${product.id}">
            <i data-lucide="eye" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i> Vista Rápida
          </button>
        </div>
        <div class="product-card-body">
          ${fitBadgeHtml}
          <div class="product-brand-tag">${product.brand}</div>
          <h4 class="product-card-title" title="${product.name}">${product.name}</h4>
          <div class="product-oem-code">OEM: ${product.oemNumber}</div>
          
          <div class="product-rating-row">
            <span class="rating-stars">★ ${product.rating}</span>
            <span class="rating-count">(${product.reviewsCount} opiniones)</span>
          </div>

          <div class="product-card-footer">
            <div class="product-pricing">
              <span class="product-price-current">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="product-price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <button class="btn-card-add-cart" data-id="${product.id}" title="Añadir al carrito">
              <i data-lucide="shopping-bag" style="width:18px;height:18px;"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach card event listeners
  grid.querySelectorAll('.btn-card-quickview').forEach(btn => {
    btn.addEventListener('click', () => openQuickView(btn.dataset.id));
  });

  grid.querySelectorAll('.btn-card-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(btn.dataset.id);
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

/* ==========================================================================
   Live Search System
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('main-search-input');
  const dropdown = document.getElementById('search-dropdown');

  if (!searchInput || !dropdown) return;

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    state.searchQuery = q;

    if (q.length < 2) {
      dropdown.classList.remove('active');
      dropdown.innerHTML = '';
      renderCatalog();
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.oemNumber.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 5);

    if (matches.length > 0) {
      dropdown.innerHTML = `
        <div class="search-res-header">Resultados coincidentes (${matches.length})</div>
        ${matches.map(p => `
          <div class="search-res-item" data-id="${p.id}">
            <img src="${p.image}" alt="${p.name}" class="search-res-thumb" />
            <div class="search-res-meta">
              <div class="search-res-title">${p.name}</div>
              <div class="search-res-sku">${p.brand} · OEM: ${p.oemNumber}</div>
            </div>
            <div class="search-res-price">$${p.price.toFixed(2)}</div>
          </div>
        `).join('')}
      `;
      dropdown.classList.add('active');

      dropdown.querySelectorAll('.search-res-item').forEach(item => {
        item.addEventListener('click', () => {
          openQuickView(item.dataset.id);
          dropdown.classList.remove('active');
        });
      });
    } else {
      dropdown.innerHTML = `
        <div style="padding:1.5rem;text-align:center;color:#64748b;font-size:0.875rem;">
          No se encontraron coincidencias exactas para "<strong>${q}</strong>".
        </div>
      `;
      dropdown.classList.add('active');
    }

    renderCatalog();
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

/* ==========================================================================
   Shopping Cart Drawer
   ========================================================================== */
function initCartDrawer() {
  const trigger = document.getElementById('cart-drawer-trigger');
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  const closeBtn = document.getElementById('cart-close-btn');

  if (trigger && drawer && backdrop) {
    trigger.addEventListener('click', () => {
      openCart();
    });

    closeBtn?.addEventListener('click', () => closeCart());
    backdrop.addEventListener('click', () => closeCart());
  }

  document.getElementById('btn-checkout')?.addEventListener('click', () => {
    showToast('¡Simulación de pago iniciada! Redirigiendo a pasarela segura...', 'success');
  });
}

function openCart() {
  renderCartDrawer();
  document.getElementById('cart-drawer')?.classList.add('active');
  document.getElementById('cart-backdrop')?.classList.add('active');
}

function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('active');
  document.getElementById('cart-backdrop')?.classList.remove('active');
}

function addToCart(productId, qty = 1) {
  const existing = state.cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    state.cart.push({ productId, quantity: qty });
  }

  localStorage.setItem('haztap_cart', JSON.stringify(state.cart));
  updateCartBadge();
  openCart();
  showToast('Repuesto añadido al carrito con éxito', 'success');
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge-count');
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) badge.textContent = totalItems;
}

function renderCartDrawer() {
  const scrollContainer = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  const shippingFill = document.getElementById('shipping-progress-fill');
  const shippingText = document.getElementById('shipping-progress-status');

  if (!scrollContainer) return;

  if (state.cart.length === 0) {
    scrollContainer.innerHTML = `
      <div class="cart-empty-state">
        <i data-lucide="shopping-cart" style="width:48px;height:48px;"></i>
        <p>Tu carrito de compras está vacío</p>
        <button class="btn-search-fitment" onclick="document.getElementById('cart-close-btn').click();">
          Explorar Catálogo
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$0.00';
    if (shippingFill) shippingFill.style.width = '0%';
    if (shippingText) shippingText.textContent = 'Añade $99.00 más para Envío Gratis';
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  let subtotal = 0;

  scrollContainer.innerHTML = state.cart.map(cartItem => {
    const product = PRODUCTS.find(p => p.id === cartItem.productId);
    if (!product) return '';

    const itemTotal = product.price * cartItem.quantity;
    subtotal += itemTotal;

    return `
      <div class="cart-item-row" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="cart-item-thumb" />
        <div class="cart-item-info">
          <h5 class="cart-item-name">${product.name}</h5>
          <span class="cart-item-sku">${product.brand} · ${product.oemNumber}</span>
          <div class="cart-item-controls">
            <div class="qty-stepper">
              <button class="qty-btn" data-action="dec" data-id="${product.id}">-</button>
              <span class="qty-val">${cartItem.quantity}</span>
              <button class="qty-btn" data-action="inc" data-id="${product.id}">+</button>
            </div>
            <div style="display:flex;align-items:center;">
              <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
              <span class="cart-item-remove" data-id="${product.id}" title="Eliminar">&times;</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Calculate Free Shipping Threshold ($99)
  const freeThreshold = 99.00;
  const progress = Math.min(100, (subtotal / freeThreshold) * 100);
  if (shippingFill) shippingFill.style.width = `${progress}%`;
  
  if (shippingText) {
    if (subtotal >= freeThreshold) {
      shippingText.innerHTML = `<span style="color:var(--brand-emerald);">✓ ¡Felicidades! Tienes Envío Gratis asegurado</span>`;
    } else {
      const remaining = (freeThreshold - subtotal).toFixed(2);
      shippingText.textContent = `Añade $${remaining} más para Envío Gratis`;
    }
  }

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;

  // Attach controls
  scrollContainer.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const item = state.cart.find(c => c.productId === id);
      if (!item) return;

      if (action === 'inc') {
        item.quantity++;
      } else if (action === 'dec') {
        item.quantity--;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(c => c.productId !== id);
        }
      }
      localStorage.setItem('haztap_cart', JSON.stringify(state.cart));
      updateCartBadge();
      renderCartDrawer();
    });
  });

  scrollContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      state.cart = state.cart.filter(c => c.productId !== id);
      localStorage.setItem('haztap_cart', JSON.stringify(state.cart));
      updateCartBadge();
      renderCartDrawer();
      showToast('Producto eliminado del carrito', 'info');
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

/* ==========================================================================
   Quick View Modal & Garage Manager Modal
   ========================================================================== */
function initModals() {
  const quickModalBackdrop = document.getElementById('quickview-backdrop');
  const closeQuickBtn = document.getElementById('quickview-close-btn');

  const garageModalBackdrop = document.getElementById('garage-modal-backdrop');
  const garageTrigger = document.getElementById('header-garage-trigger');
  const closeGarageBtn = document.getElementById('garage-modal-close-btn');

  quickModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === quickModalBackdrop) {
      quickModalBackdrop.classList.remove('active');
    }
  });

  closeQuickBtn?.addEventListener('click', () => {
    quickModalBackdrop?.classList.remove('active');
  });

  garageTrigger?.addEventListener('click', () => {
    renderGarageModal();
    garageModalBackdrop?.classList.add('active');
  });

  garageModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === garageModalBackdrop) {
      garageModalBackdrop.classList.remove('active');
    }
  });

  closeGarageBtn?.addEventListener('click', () => {
    garageModalBackdrop?.classList.remove('active');
  });
}

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  const backdrop = document.getElementById('quickview-backdrop');
  const content = document.getElementById('quickview-dynamic-content');

  if (!product || !backdrop || !content) return;

  const fitStatus = checkFitment(product, state.activeVehicle);
  let fitHtml = '';

  if (state.activeVehicle) {
    if (fitStatus === 'compatible') {
      fitHtml = `<div class="card-fitment-badge compatible" style="margin-bottom:1rem;"><i data-lucide="check-circle" style="width:16px;height:16px;"></i> Ajuste 100% Garantizado para ${state.activeVehicle.year} ${state.activeVehicle.make} ${state.activeVehicle.model}</div>`;
    } else {
      fitHtml = `<div class="card-fitment-badge incompatible" style="margin-bottom:1rem;"><i data-lucide="alert-triangle" style="width:16px;height:16px;"></i> Esta pieza no calza con tu vehículo actual</div>`;
    }
  }

  const specsRows = Object.entries(product.specs || {}).map(([k, v]) => `
    <tr>
      <td>${k}</td>
      <td>${v}</td>
    </tr>
  `).join('');

  content.innerHTML = `
    <div class="modal-grid">
      <div class="modal-gallery">
        <img src="${product.image}" alt="${product.name}" class="modal-main-img" />
      </div>
      <div class="modal-details">
        <span class="modal-brand">${product.brand}</span>
        <h3 class="modal-title">${product.name}</h3>
        <div class="modal-oem-line">Código OEM / Fabricante: ${product.oemNumber}</div>
        ${fitHtml}
        
        <div class="modal-price-box">
          <span class="modal-price">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="product-price-original" style="font-size:1rem;">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>

        <div class="modal-stock-status">
          <i data-lucide="package-check" style="width:16px;height:16px;"></i>
          <span>En Stock (${product.stock} unidades disponibles - Envío Inmediato)</span>
        </div>

        <p style="color:#475569;font-size:0.875rem;line-height:1.5;margin-bottom:1.25rem;">
          ${product.shortDesc}
        </p>

        <table class="modal-specs-table">
          ${specsRows}
        </table>

        <div class="modal-actions">
          <button class="btn-modal-add-cart" id="modal-btn-add" data-id="${product.id}">
            <i data-lucide="shopping-bag" style="width:18px;height:18px;"></i>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modal-btn-add')?.addEventListener('click', () => {
    addToCart(product.id);
    backdrop.classList.remove('active');
  });

  backdrop.classList.add('active');
  if (window.lucide) window.lucide.createIcons();
}

function renderGarageModal() {
  const container = document.getElementById('saved-vehicles-container');
  if (!container) return;

  container.innerHTML = state.savedVehicles.map(v => {
    const isActive = state.activeVehicle && 
      state.activeVehicle.year === v.year && 
      state.activeVehicle.make === v.make && 
      state.activeVehicle.model === v.model;

    return `
      <div class="saved-vehicle-card ${isActive ? 'active' : ''}" data-vehicle='${JSON.stringify(v)}'>
        <div class="saved-vehicle-info">
          <h5>${v.year} ${v.make} ${v.model}</h5>
          <p>${v.engine}</p>
        </div>
        <div>
          ${isActive 
            ? '<span class="fitment-guarantee-tag">Activo</span>' 
            : '<button class="btn-clear-fitment btn-select-vehicle" style="padding:0.35rem 0.75rem;font-size:0.75rem;">Seleccionar</button>'}
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.saved-vehicle-card').forEach(card => {
    card.addEventListener('click', () => {
      const v = JSON.parse(card.dataset.vehicle);
      state.activeVehicle = v;
      localStorage.setItem('haztap_active_vehicle', JSON.stringify(state.activeVehicle));
      state.onlyCompatible = true;
      const fitmentCheckbox = document.getElementById('filter-compatible-only');
      if (fitmentCheckbox) fitmentCheckbox.checked = true;

      updateGarageUI();
      renderCatalog();
      document.getElementById('garage-modal-backdrop')?.classList.remove('active');
      showToast(`Vehículo activo: ${v.year} ${v.make} ${v.model}`, 'success');
    });
  });
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle-2' : type === 'warning' ? 'alert-triangle' : 'info'}" style="width:18px;height:18px;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
