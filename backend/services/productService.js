const productRepo = require('../repositories/productRepo');

const getAllProducts = async () => productRepo.findAll();
const getAllProductsForAdmin = async () => productRepo.findAllForAdmin();
const getProductById = async (id) => productRepo.findById(id);
const getProductsByCategory = async (category) => productRepo.findByCategory(category);
const createProduct = async (data) => productRepo.createProduct(data);
const updateProduct = async (id, data) => productRepo.updateProduct(id, data);
const deleteProduct = async (id) => productRepo.deleteProduct(id);

module.exports = {
  getAllProducts,
  getAllProductsForAdmin,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
};
