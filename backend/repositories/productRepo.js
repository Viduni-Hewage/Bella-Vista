const Product = require('../models/Product');
const { applyPipeline } = require('../pipelines/productPipeline');

const findAll = async () => {
  return Product.find().sort({ createdAt: -1 });
};

const findAllForAdmin = async () => {
  try {
    return await Product.find()
      .sort({ createdAt: -1 })
      .select('_id title description image price category type inStock isNew createdAt updatedAt')
      .lean();
  } catch (error) {
    console.error('Error in findAllForAdmin:', error);
    throw error;
  }
};

const findById = async (id) => {
  return Product.findById(id);
};

const findByCategory = async (category) => {
  const pipeline = applyPipeline(category);
  return Product.aggregate(pipeline);
};

const createProduct = async (data) => {
  const product = new Product(data);
  return product.save();
};

const updateProduct = async (id, data) => {
  return Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
  return Product.findByIdAndDelete(id);
};

module.exports = {
  findAll,
  findAllForAdmin,
  findById,
  findByCategory,
  createProduct,
  updateProduct,
  deleteProduct
};
