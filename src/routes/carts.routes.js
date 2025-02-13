import express from 'express';
import CartsController from '../controllers/carts.controller.js';

const router = express.Router();
const cartsController = new CartsController();

router.post('/', cartsController.createCart.bind(cartsController));
router.get('/:cid', cartsController.getCartById.bind(cartsController));
router.post('/:cid/product/:pid', cartsController.addProductToCart.bind(cartsController));

export default router;