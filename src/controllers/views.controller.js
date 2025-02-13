import ProductManager from '../models/product.model.js';

const productManager = new ProductManager();

export const renderHome = async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
};

export const renderRealTimeProducts = async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
};