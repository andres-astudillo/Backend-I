const express = require('express');
const productsRoutes = require('./routes/products.routes');
const cartsRoutes = require('./routes/carts.routes');

const app = express();
app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});