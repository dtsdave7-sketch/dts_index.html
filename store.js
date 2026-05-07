// ===== CART LOGIC =====

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cart = getCart();
  const count = document.getElementById('cartCount');
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (count) count.textContent = cart.length;

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    if (totalEl) totalEl.textContent = '0';
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map((item, i) => {
    total += parseFloat(item.price);
    return `
      <div class="cart-item">
        <img src="${item.img || 'images/placeholder.jpg'}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${parseFloat(item.price).toFixed(2)}</p>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${i})" title="Remove">✕</button>
      </div>
    `;
  }).join('');

  if (totalEl) totalEl.textContent = total.toFixed(2);
}

function addToCart(name, price, img) {
  const cart = getCart();
  cart.push({ name, price: parseFloat(price), img });
  saveCart(cart);
  updateCartUI();
  alert(`${name} added to cart 🛒`);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartUI();
}

// ===== CART PANEL TOGGLE =====

const cartToggle = document.getElementById('cartToggle');
const cartPanel  = document.getElementById('cartPanel');
const cartClose  = document.getElementById('cartClose');

if (cartToggle) cartToggle.addEventListener('click', () => cartPanel.classList.toggle('open'));
if (cartClose)  cartClose.addEventListener('click', () => cartPanel.classList.remove('open'));

// ===== LOAD ADMIN-ADDED PRODUCTS =====

const grid = document.getElementById('productsGrid');

if (grid) {
  const adminProducts = JSON.parse(localStorage.getItem('products')) || [];

  adminProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
      </div>
      <h3>${product.name}</h3>
      <p class="card-price">$${parseFloat(product.price).toFixed(2)}</p>
      <a href="product.html?name=${encodeURIComponent(product.name)}&price=${product.price}&img=${encodeURIComponent(product.image)}&desc=${encodeURIComponent(product.desc || '')}"
         class="btn">View</a>
    `;
    grid.appendChild(card);
  });
}

// ===== INIT =====
updateCartUI();
