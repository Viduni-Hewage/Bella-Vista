const Order = require('../models/Order');

class OrderPipeline {
  async create(orderData) {
    const order = new Order(orderData);
    return order.save();
  }

  async findAll() {
    return Order.find().sort({ createdAt: -1 }); 
  }

  async findById(orderId) {
    return Order.findById(orderId);
  }

  async updateStatus(orderId, status) {
    return Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } 
    );
  }
}

module.exports = new OrderPipeline();
