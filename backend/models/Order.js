const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nic: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['COD', 'Card'], required: true },
  cardDetails: {
    type: {
      type: String,
      required: function() { return this.paymentMethod === 'Card'; }
    },
    lastFourDigits: {
      type: String,
      required: function() { return this.paymentMethod === 'Card'; }
    },
    nameOnCard: {
      type: String,
      required: function() { return this.paymentMethod === 'Card'; }
    }
  },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  }, createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Order', orderSchema);
