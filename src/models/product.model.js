const fs = require('fs');
const path = require('path');

class ProductModel {
    constructor() {
        this.productsFilePath = path.join(__dirname, '../data/products.json');
    }

    async getProducts(limit) {
        const products = JSON.parse(fs.readFileSync(this.productsFilePath, 'utf-8'));
        return limit ? products.slice(0, limit) : products;
    }

    async getProductById(id) {
        const products = JSON.parse(fs.readFileSync(this.productsFilePath, 'utf-8'));
        return products.find(product => product.id === id);
    }

    async addProduct(product) {
        const products = JSON.parse(fs.readFileSync(this.productsFilePath, 'utf-8'));
        const newProduct = { id: Date.now().toString(), ...product, status: true };
        products.push(newProduct);
        fs.writeFileSync(this.productsFilePath, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const products = JSON.parse(fs.readFileSync(this.productsFilePath, 'utf-8'));
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...updatedFields };
            fs.writeFileSync(this.productsFilePath, JSON.stringify(products, null, 2));
            return products[productIndex];
        }
        return null;
    }

    async deleteProduct(id) {
        const products = JSON.parse(fs.readFileSync(this.productsFilePath, 'utf-8'));
        const filteredProducts = products.filter(product => product.id !== id);
        fs.writeFileSync(this.productsFilePath, JSON.stringify(filteredProducts, null, 2));
    }
}

module.exports = ProductModel;