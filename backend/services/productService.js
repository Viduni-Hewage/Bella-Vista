const productRepo = require('../repositories/productRepo');

const getAllProducts = async () => {
  return await productRepo.findAll();
};

const getProductById = async (id) => {
  return await productRepo.findById(id);
};

const getProductsByCategory = async (category) => {
  return await productRepo.findByCategory(category);
};

module.exports = { getAllProducts, getProductById, getProductsByCategory };
