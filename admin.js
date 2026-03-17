let products = JSON.parse(localStorage.getItem("products")) || [];

const table = document.getElementById("productTable");

const imageFile = document.getElementById("imageFile");

const preview = document.getElementById("preview");

let imageData = "";

/* IMAGE PREVIEW */

imageFile.addEventListener("change", function(){

const file = this.files[0];

const reader = new FileReader();

reader.onload = function(e){

imageData = e.target.result;

preview.src = imageData;

preview.style.display = "block";

}

reader.readAsDataURL(file);

});


/* RENDER PRODUCTS */

function renderProducts(){

table.innerHTML="";

products.forEach((product,index)=>{

table.innerHTML += `

<tr>

<td>${product.name}</td>

<td>$${product.price}</td>

<td>${product.stock}</td>

<td>
<button onclick="editProduct(${index})">Edit</button>
<button onclick="deleteProduct(${index})">Delete</button>
</td>

</tr>

`;

});

}

renderProducts();


/* ADD PRODUCT */

document.getElementById("productForm").addEventListener("submit",function(e){

e.preventDefault();

const name = document.getElementById("name").value;

const price = document.getElementById("price").value;

const stock = document.getElementById("stock").value;

products.push({
name:name,
price:price,
image:imageData,
stock:stock
});

localStorage.setItem("products", JSON.stringify(products));

renderProducts();

this.reset();

preview.style.display="none";

});


/* DELETE */

function deleteProduct(index){

products.splice(index,1);

localStorage.setItem("products", JSON.stringify(products));

renderProducts();

}


/* EDIT */

function editProduct(index){

const product = products[index];

document.getElementById("name").value = product.name;

document.getElementById("price").value = product.price;

document.getElementById("stock").value = product.stock;

imageData = product.image;

preview.src = imageData;

preview.style.display = "block";

deleteProduct(index);

}
