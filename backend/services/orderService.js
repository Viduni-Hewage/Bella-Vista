const Order = require('../models/Order');

const createCODOrder = async (orderData) => {
  const { userId, nic, phone, address, totalAmount, paymentMethod } = orderData;

  if (!userId || !nic || !phone || !address || !totalAmount) {
    throw new Error('All required fields must be provided');
  }

  const order = await Order.create({
    userId,
    nic,
    phone,
    address,
    totalAmount,
    paymentMethod,
    status: 'pending',
    createdAt: new Date(),
  });

  return order;
};

const createCardOrder = async (orderData) => {
  const { userId, nic, phone, address, totalAmount, paymentMethod, cardDetails } = orderData;

  if (!userId || !nic || !phone || !address || !totalAmount || !cardDetails) {
    throw new Error('All required fields must be provided');
  }

  if (!cardDetails.type || !cardDetails.lastFourDigits || !cardDetails.nameOnCard) {
    throw new Error('Complete card details are required');
  }

  const order = await Order.create({
    userId,
    nic,
    phone,
    address,
    totalAmount,
    paymentMethod,
    cardDetails: {
      type: cardDetails.type,
      lastFourDigits: cardDetails.lastFourDigits,
      nameOnCard: cardDetails.nameOnCard,
    },
    status: 'paid',
    createdAt: new Date(),
  });

  return order;
};

module.exports = {
  createCODOrder,
  createCardOrder,
};