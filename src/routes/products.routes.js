import express from 'express';
import ProductsController from '../controllers/products.controller.js';

const router = express.Router();
const productsController = new ProductsController();

router.get('/', productsController.getProducts.bind(productsController));
router.get('/:pid', productsController.getProductById.bind(productsController));
router.post('/', productsController.addProduct.bind(productsController));
router.put('/:pid', productsController.updateProduct.bind(productsController));
router.delete('/:pid', productsController.deleteProduct.bind(productsController));

export default router;