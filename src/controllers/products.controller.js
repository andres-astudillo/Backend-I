import ProductModel from '../models/product.model.js';

class ProductsController {
    constructor() {
        this.productModel = new ProductModel();
    }

    async getProducts(req, res) {
        try {
            const products = await this.productModel.getProducts(req.query.limit);
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await this.productModel.getProductById(req.params.pid);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el producto' });
        }
    }

    async addProduct(req, res) {
        try {
            const newProduct = await this.productModel.addProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    }

    async updateProduct(req, res) {
        try {
            const updatedProduct = await this.productModel.updateProduct(req.params.pid, req.body);
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    }

    async deleteProduct(req, res) {
        try {
            await this.productModel.deleteProduct(req.params.pid);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }
}

export default ProductsController;