const orderPipeline = require('../pipelines/orderPipeline');

class OrderRepository {
  async createOrder(orderData) {
    return orderPipeline.create(orderData);
  }

  async getAllOrders() {
    return orderPipeline.findAll();
  }

  async getOrderById(orderId) {
    return orderPipeline.findById(orderId);
  }

  async updateOrderStatus(orderId, status) {
    return orderPipeline.updateStatus(orderId, status);
  }
}

module.exports = new OrderRepository();
