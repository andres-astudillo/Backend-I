import { Router } from 'express';
import { productModel } from '../models/product.model';
const router = Router();

//GET /api/products
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || 'asc';
    const query = req.query.query || '';
    
    const products = await productModel.paginate(query, {
      limit: limit,
      page: page,
      sort: { _id: sort },
    });
    products.prevLink = products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null;
    products.nextLink = products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null;
    products.message = 'Productos obtenidos correctamente';
    res.status(200).send({
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
      message: products.message,
    });
  } catch (error) {

    res.status(500).send({
      status: 'error',
      payload: [],
      totalPages: 0,
      prevPage: null,
      nextPage: null,
      page: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevLink: null,
      message: 'Error al obtener los productos. Detalles: ' + error.message,
    });
  }
});

//GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productModel.findById(productId);
    if (!product) {
      res
        .status(404)
        .send({ status: 'error', data: [], message: 'Producto no encontrado' });
    } else {
      res.status(200).send({
        status: 'success',
        data: product,
        message: 'Producto obtenido correctamente',
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 'error',
      data: [],
      message: 'Error al obtener el producto. Detalles: ' + error.message,
    });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (
      !data.title ||
      !data.description ||
      !data.price ||
      !data.code ||
      !data.stock ||
      !data.category
    ) {
      res.status(400).send({
        status: 'error',
        data: [],
        message: 'Faltan datos requeridos',
      });
    } else {
      await productModel.create(data);
      res.status(200).send({
        status: 'success',
        data: data,
        message: 'Producto creado correctamente',
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 'error',
      data: [],
      message: 'Error al crear el producto. Detalles: ' + error.message,
    });
  }
});

//PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const data = req.body;
    const product = await productModel.findByIdAndUpdate(productId, data);
    if (!product) {
      res
        .status(404)
        .send({ status: 'error', data: [], message: 'Producto no encontrado' });
    } else {
      const productUpdated = await productModel.findById(productId);
      res.status(200).send({
        status: 'success',
        data: productUpdated,
        message: 'Producto actualizado correctamente',
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 'error',
      data: [],
      message: 'Error al actualizar el producto. Detalles: ' + error.message,
    });
  }
});

//DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    let productsData = await productModel.find();
    const productIndex = productsData.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      res
        .status(404)
        .send({ status: 'error', data: [], message: 'Producto no encontrado' });
    } else {
      productsData.splice(productIndex, 1);
      await productModel.deleteOne({ _id: productId });
      res.status(200).send({
        status: 'success',
        data: [],
        message: 'Producto eliminado correctamente',
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 'error',
      data: [],
      message: 'Error al eliminar el producto. Detalles: ' + error.message,
    });
  }
});

export default router;