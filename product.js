// ===== READ URL PARAMS =====

const params = new URLSearchParams(window.location.search);

const name  = params.get('name')  || 'Product';
const price = params.get('price') || '0';
const img   = params.get('img')   || '';
const desc  = params.get('desc')  || 'No description available.';

// ===== POPULATE PAGE =====

document.title = name + ' | Dave Tech Services';
document.getElementById('productName').textContent  = name;
document.getElementById('productPrice').textContent = '$' + parseFloat(price).toFixed(2);
document.getElementById('productDesc').textContent  = desc;

const imgEl = document.getElementById('productImg');
if (img) {
  imgEl.src = img;
  imgEl.alt = name;
} else {
  imgEl.src = 'images/placeholder.jpg';
}

// ===== CART HELPERS =====

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cart = getCart();
  const count   = document.getElementById('cartCount');
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
        <img src="${item.img || ''}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${parseFloat(item.price).toFixed(2)}</p>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${i})">✕</button>
      </div>
    `;
  }).join('');

  if (totalEl) totalEl.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartUI();
}

// ===== ADD TO CART =====

document.getElementById('addToCartBtn').addEventListener('click', function () {
  const cart = getCart();
  cart.push({ name, price: parseFloat(price), img });
  saveCart(cart);
  updateCartUI();
  alert(name + ' added to cart 🛒');
});

// ===== CART PANEL TOGGLE =====

const cartToggle = document.getElementById('cartToggle');
const cartPanel  = document.getElementById('cartPanel');
const cartClose  = document.getElementById('cartClose');

if (cartToggle) cartToggle.addEventListener('click', () => cartPanel.classList.toggle('open'));
if (cartClose)  cartClose.addEventListener('click', () => cartPanel.classList.remove('open'));

// ===== INIT =====
updateCartUI();
