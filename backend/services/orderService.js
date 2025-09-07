const orderRepo = require('../repositories/orderRepo');

class OrderService {
  async createCODOrder(data) {
    data.paymentMethod = 'COD';
    return orderRepo.createOrder(data);
  }

  async createCardOrder(data) {
    data.paymentMethod = 'Card';
    return orderRepo.createOrder(data);
  }

  async getAllOrdersForAdmin() {
    return orderRepo.getAllOrders();
  }

  async getOrderById(orderId) {
    return orderRepo.getOrderById(orderId);
  }

  async updateOrderStatus(orderId, status) {
    const allowedStatuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      throw new Error('Invalid status');
    }
    return orderRepo.updateOrderStatus(orderId, status);
  }
}

module.exports = new OrderService();
