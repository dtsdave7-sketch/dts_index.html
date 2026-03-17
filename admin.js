let products = JSON.parse(localStorage.getItem("products")) || [];

const table = document.getElementById("productTable");

function renderProducts(){

table.innerHTML = "";

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

document.getElementById("productForm").addEventListener("submit",function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const price = document.getElementById("price").value;
const image = document.getElementById("image").value;
const stock = document.getElementById("stock").value;

products.push({name,price,image,stock});

localStorage.setItem("products", JSON.stringify(products));

renderProducts();

this.reset();

});


function deleteProduct(index){

products.splice(index,1);

localStorage.setItem("products", JSON.stringify(products));

renderProducts();

}


function editProduct(index){

const product = products[index];

document.getElementById("name").value = product.name;
document.getElementById("price").value = product.price;
document.getElementById("image").value = product.image;
document.getElementById("stock").value = product.stock;

deleteProduct(index);

}
