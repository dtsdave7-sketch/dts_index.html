let products = JSON.parse(localStorage.getItem("products")) || [];

let container = document.getElementById("products");

products.forEach(product => {

container.innerHTML += `

<div class="card">

<div class="product-image">
<img src="${product.image}">
</div>

<h3>${product.name}</h3>

<p>$${product.price}</p>

<a href="product.html?id=${product.id}" class="btn">View</a>

</div>

`;

});