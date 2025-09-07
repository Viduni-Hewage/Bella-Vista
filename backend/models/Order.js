const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
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
   deliveryDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const today = new Date();
        const given = new Date(value);

        // must be today or future
        if (given < today.setHours(0, 0, 0, 0)) return false;
        // exclude Sundays
        return given.getDay() !== 0;
      },
      message: "Delivery date must be today or later and not Sunday"
    }
  },
  deliveryTime: { type: String, required: true }, // store as string "10:30 AM"
  deliveryLocation: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  }, createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Order', orderSchema);
