let products = JSON.parse(localStorage.getItem('products')) || [];

const table    = document.getElementById('productTable');
const form     = document.getElementById('productForm');
const formTitle = document.getElementById('formTitle');

// ===== RENDER TABLE =====

function renderProducts() {
  table.innerHTML = '';

  if (products.length === 0) {
    table.innerHTML = '<tr><td colspan="4" style="color:#9ca3af;">No products yet.</td></tr>';
    return;
  }

  products.forEach((product, index) => {
    table.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>$${parseFloat(product.price).toFixed(2)}</td>
        <td>${product.stock}</td>
        <td>
          <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
          <button class="del-btn"  onclick="deleteProduct(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

renderProducts();

// ===== ADD / SAVE PRODUCT =====

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const editIndex = parseInt(document.getElementById('editIndex').value);
  const product = {
    name:  document.getElementById('pName').value.trim(),
    price: parseFloat(document.getElementById('pPrice').value),
    image: document.getElementById('pImage').value.trim(),
    desc:  document.getElementById('pDesc').value.trim(),
    stock: parseInt(document.getElementById('pStock').value),
  };

  if (editIndex >= 0) {
    products[editIndex] = product;
    document.getElementById('editIndex').value = '-1';
    formTitle.textContent = 'Add Product';
    form.querySelector('button[type=submit]').textContent = 'Add Product';
  } else {
    products.push(product);
  }

  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
  this.reset();
});

// ===== EDIT =====

function editProduct(index) {
  const p = products[index];
  document.getElementById('editIndex').value = index;
  document.getElementById('pName').value  = p.name;
  document.getElementById('pPrice').value = p.price;
  document.getElementById('pImage').value = p.image;
  document.getElementById('pDesc').value  = p.desc  || '';
  document.getElementById('pStock').value = p.stock;
  formTitle.textContent = 'Edit Product';
  form.querySelector('button[type=submit]').textContent = 'Save Changes';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== DELETE =====

function deleteProduct(index) {
  if (!confirm('Delete "' + products[index].name + '"?')) return;
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}
