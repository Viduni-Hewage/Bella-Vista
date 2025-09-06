const Order = require('../models/Order');

class OrderPipeline {
  async create(orderData) {
    const order = new Order(orderData);
    return order.save();
  }

  async findAll() {
    return Order.find().sort({ createdAt: -1 }); // latest first
  }

  async findById(orderId) {
    return Order.findById(orderId);
  }

  async updateStatus(orderId, status) {
    return Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // return updated order
    );
  }
}

module.exports = new OrderPipeline();
