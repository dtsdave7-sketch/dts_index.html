/* ============================================================
   DTS CART ENGINE — cart.js
   Shared across all pages
   ============================================================ */

const Cart = (() => {

  function get() {
    return JSON.parse(localStorage.getItem('dts_cart')) || [];
  }

  function save(cart) {
    localStorage.setItem('dts_cart', JSON.stringify(cart));
  }

  function add(name, price, img, desc) {
    const cart = get();
    cart.push({ name, price: parseFloat(price), img: img || '', desc: desc || '' });
    save(cart);
    updateUI();
    showToast('🛒 ' + name + ' added to cart!');
  }

  function remove(index) {
    const cart = get();
    cart.splice(index, 1);
    save(cart);
    updateUI();
  }

  function clear() {
    save([]);
    updateUI();
  }

  function total() {
    return get().reduce((s, i) => s + parseFloat(i.price), 0);
  }

  function updateUI() {
    const cart = get();

    // Update all badges
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = cart.length;
    });

    // Render cart items
    const itemsEl = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotalAmt');

    if (!itemsEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = `
        <div class="cart-empty-msg">
          <div class="empty-icon">🛍️</div>
          <p>Your cart is empty.</p>
          <a href="store.html" class="btn btn-outline btn-sm" style="margin-top:16px;">Shop Now</a>
        </div>`;
      if (totalEl) totalEl.textContent = '0.00';
      return;
    }

    itemsEl.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.img || ''}" alt="${item.name}" onerror="this.style.display='none';this.parentElement.innerHTML='📦'">
        </div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${parseFloat(item.price).toFixed(2)}</p>
        </div>
        <button class="cart-item-remove" onclick="Cart.remove(${i})" title="Remove">✕</button>
      </div>
    `).join('');

    if (totalEl) totalEl.textContent = total().toFixed(2);
  }

  function initPanel() {
    const toggleBtns = document.querySelectorAll('[data-cart-toggle]');
    const panel      = document.getElementById('cartPanel');
    const overlay    = document.getElementById('cartOverlay');
    const closeBtn   = document.getElementById('cartCloseBtn');

    function open()  { panel?.classList.add('open'); overlay?.classList.add('open'); }
    function close() { panel?.classList.remove('open'); overlay?.classList.remove('open'); }

    toggleBtns.forEach(btn => btn.addEventListener('click', () => {
      panel?.classList.contains('open') ? close() : open();
    }));
    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);
  }

  return { get, save, add, remove, clear, total, updateUI, initPanel };
})();

// ===== TOAST =====
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.innerHTML = `<span class="toast-icon">✅</span><span>${msg}</span>`;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== REVEAL ON SCROLL =====
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}

// ===== MOBILE NAV =====
function initBurger() {
  const burger = document.getElementById('burger');
  const links  = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Cart.updateUI();
  Cart.initPanel();
  initReveal();
  initBurger();
});
