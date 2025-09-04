const productService = require('../services/productService');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const getProductsByCategory = async (req, res, next) => {
  try {
    const products = await productService.getProductsByCategory(req.params.category);
    if (products.length === 0) return res.status(404).json({ message: 'No products found' });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProducts, getProductById, getProductsByCategory };

