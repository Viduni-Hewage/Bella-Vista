const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory
};
