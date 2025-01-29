const express = require('express');
const CartsController = require('../controllers/carts.controller');

const router = express.Router();
const cartsController = new CartsController();

router.post('/', cartsController.createCart.bind(cartsController));
router.get('/:cid', cartsController.getCartById.bind(cartsController));
router.post('/:cid/product/:pid', cartsController.addProductToCart.bind(cartsController));

module.exports = router;