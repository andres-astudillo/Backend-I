import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`)); // Ahora __dirname está definido

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Iniciar servidor HTTP
const httpServer = app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

// Configuración de WebSocket
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('newProduct', (product) => {
        io.emit('updateProducts', product);
    });

    socket.on('deleteProduct', (productId) => {
        io.emit('updateProducts', productId);
    });
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Escuchar evento para agregar un producto
    socket.on('newProduct', async (product) => {
        const newProduct = await productManager.addProduct(product); // Agregar el producto
        io.emit('updateProducts', await productManager.getProducts()); // Actualizar la lista
    });

    // Escuchar evento para modificar un producto
    socket.on('updateProduct', async ({ id, title, price }) => {
        await productManager.updateProduct(id, { title, price }); // Modificar el producto
        io.emit('updateProducts', await productManager.getProducts()); // Actualizar la lista
    });

    // Escuchar evento para eliminar un producto
    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id); // Eliminar el producto
        io.emit('updateProducts', await productManager.getProducts()); // Actualizar la lista
    });
});

export { io };