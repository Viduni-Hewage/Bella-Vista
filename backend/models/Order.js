const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['COD', 'Online'], required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  status: { type: String, default: 'Pending' } 
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
