import { Router } from 'express';
import ProductManager from '../models/product.model.js';

const router = Router();
const productManager = new ProductManager();

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

export default router;