const orderService = require('../services/orderService');

const createCODOrderController = async (req, res) => {
  try {
    const userId = req.auth.sub;

    const { nic, phone, address, totalAmount } = req.body;
    if (!nic || !phone || !address || !totalAmount) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const order = await orderService.createCODOrder({
      userId,
      nic,
      phone,
      address,
      totalAmount,
      paymentMethod: 'COD',
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: order._id,
    });
  } catch (error) {
    console.error('COD order creation error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const createCardOrderController = async (req, res) => {
  try {
    const userId = req.auth.sub;

    const { nic, phone, address, totalAmount, cardDetails } = req.body;
    if (!nic || !phone || !address || !totalAmount || !cardDetails) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!cardDetails.type || !cardDetails.lastFourDigits || !cardDetails.nameOnCard) {
      return res.status(400).json({ success: false, message: 'Complete card details are required' });
    }

    const order = await orderService.createCardOrder({
      userId,
      nic,
      phone,
      address,
      totalAmount,
      paymentMethod: 'Card',
      cardDetails: {
        type: cardDetails.type,
        lastFourDigits: cardDetails.lastFourDigits,
        nameOnCard: cardDetails.nameOnCard,
      }
    });

    res.status(201).json({
      success: true,
      message: 'Card payment processed successfully',
      orderId: order._id,
      order: {
        id: order._id,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,
      }
    });
  } catch (error) {
    console.error('Card order creation error:', error);

    if (error.message.includes('required')) {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(500).json({ success: false, message: 'Payment processing failed' });
  }
};

module.exports = {
  createCODOrderController,
  createCardOrderController,
};
