const Product = require('../models/Product');
const { applyPipeline } = require('../pipelines/productPipeline');

const findAll = async () => {
  return await Product.find();
};

const findById = async (id) => {
  return await Product.findById(id);
};

const findByCategory = async (category) => {
  // Example: You can apply aggregation pipeline if needed
  const pipeline = applyPipeline(category);
  return await Product.aggregate(pipeline);
};

module.exports = { findAll, findById, findByCategory };
