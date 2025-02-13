const socket = io();

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productTitle = document.getElementById('productTitle').value;
    const productPrice = document.getElementById('productPrice').value;
    socket.emit('newProduct', { title: productTitle, price: productPrice });
    productForm.reset();
});

socket.on('updateProducts', (products) => {
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - $${product.price}`;
        productList.appendChild(li);
    });
});