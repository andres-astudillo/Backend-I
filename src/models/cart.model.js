import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class CartModel {
    constructor() {
        this.cartsFilePath = path.join(__dirname, '../data/carts.json');
    }

    async createCart() {
        const carts = JSON.parse(fs.readFileSync(this.cartsFilePath, 'utf-8'));
        const newCart = { id: Date.now().toString(), products: [] };
        carts.push(newCart);
        fs.writeFileSync(this.cartsFilePath, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getCartById(id) {
        const carts = JSON.parse(fs.readFileSync(this.cartsFilePath, 'utf-8'));
        return carts.find(cart => cart.id === id);
    }

    async addProductToCart(cartId, productId) {
        const carts = JSON.parse(fs.readFileSync(this.cartsFilePath, 'utf-8'));
        const cartIndex = carts.findIndex(cart => cart.id === cartId);
        if (cartIndex !== -1) {
            const productIndex = carts[cartIndex].products.findIndex(product => product.product === productId);
            if (productIndex !== -1) {
                carts[cartIndex].products[productIndex].quantity += 1;
            } else {
                carts[cartIndex].products.push({ product: productId, quantity: 1 });
            }
            fs.writeFileSync(this.cartsFilePath, JSON.stringify(carts, null, 2));
            return carts[cartIndex];
        }
        return null;
    }
}

export default CartModel;