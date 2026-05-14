/* ============================================================
   DTS SHARED FOOTER — footer.js
   ============================================================ */

(function () {
  const footerHTML = `
  <footer>
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo">D<span>T</span>S</div>
        <p>Dave Tech Services — your trusted source for tech news, digital innovation, and quality gadgets in Haiti.</p>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="store.html">Store</a></li>
          <li><a href="news.html">News</a></li>
          <li><a href="checkout.html">Checkout</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Store</h4>
        <ul>
          <li><a href="store.html#smartphones">Smartphones</a></li>
          <li><a href="store.html#laptops">Laptops</a></li>
          <li><a href="store.html#accessories">Accessories</a></li>
          <li><a href="store.html#gadgets">Gadgets</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <p>📱 WhatsApp</p>
        <p><a href="https://wa.me/50946126417">+509 46 12 64 17</a></p>
        <p style="margin-top:12px;">🇭🇹 Haiti</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Dave Tech Services. All Rights Reserved.</p>
      <p>Designed & Built for DTS</p>
    </div>
  </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
})();
