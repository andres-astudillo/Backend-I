const CartModel = require('../models/cart.model');

class CartsController {
    constructor() {
        this.cartModel = new CartModel();
    }

    async createCart(req, res) {
        try {
            const newCart = await this.cartModel.createCart();
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el carrito' });
        }
    }

    async getCartById(req, res) {
        try {
            const cart = await this.cartModel.getCartById(req.params.cid);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el carrito' });
        }
    }

    async addProductToCart(req, res) {
        try {
            const updatedCart = await this.cartModel.addProductToCart(req.params.cid, req.params.pid);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar el producto al carrito' });
        }
    }
}

module.exports = CartsController;