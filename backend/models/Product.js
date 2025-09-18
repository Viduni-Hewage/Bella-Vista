const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  isNew: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
}, { timestamps: true,
  suppressReservedKeysWarning: true
 });

module.exports = mongoose.model('Product', productSchema);
