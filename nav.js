/* ============================================================
   DTS SHARED NAV — nav.js
   Injects nav + cart overlay on every page
   ============================================================ */

(function () {

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function navLink(href, label) {
    const active = currentPage === href ? 'style="color:#1d8cf8;"' : '';
    return `<li><a href="${href}" ${active}>${label}</a></li>`;
  }

  const navHTML = `
  <nav>
   <a href="index.html" class="logo">
    <img src="images/logodtss.png">
</a>
    <ul class="nav-links" id="navLinks">
      ${navLink('index.html', 'Home')}
      ${navLink('store.html', 'Store')}
      ${navLink('news.html', 'News')}
      ${navLink('about.html', 'About')}
    
      <li><a href="admin.html" style="color:#6b7a99;font-size:13px;">Admin</a></li>
    </ul>
    <div class="nav-actions">
      <button class="cart-btn" data-cart-toggle>
        🛒 Cart <span class="cart-badge">0</span>
      </button>
      <button class="burger" id="burger">☰</button>
    </div>
  </nav>

  <!-- Cart Overlay -->
  <div class="cart-overlay" id="cartOverlay"></div>

  <!-- Cart Panel -->
  <div class="cart-panel" id="cartPanel">
    <div class="cart-head">
      <h2>Your Cart</h2>
      <button class="cart-close-btn" id="cartCloseBtn">✕</button>
    </div>
    <div class="cart-items" id="cartItems">
      <div class="cart-empty-msg">
        <div class="empty-icon">🛍️</div>
        <p>Your cart is empty.</p>
      </div>
    </div>
    <div class="cart-foot">
      <div class="cart-total-row">
        <span>Total</span>
        <span>$<span id="cartTotalAmt">0.00</span></span>
      </div>
      <a href="checkout.html" class="btn btn-primary" onclick="document.getElementById('cartPanel').classList.remove('open');document.getElementById('cartOverlay').classList.remove('open')">
        Checkout →
      </a>
      <button class="btn btn-dark btn-sm" onclick="Cart.clear()" style="width:100%;margin-top:8px;justify-content:center;">
        Clear Cart
      </button>
    </div>
  </div>

  <!-- WhatsApp Float -->
  <a href="https://wa.me/50946126417" class="wa-float" target="_blank" title="Chat on WhatsApp">💬</a>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
})();
