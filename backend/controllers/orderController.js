const Order = require('../models/Order');
const Cart = require('../models/Cart');

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethod, paymentStatus } = req.body;

    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    const newOrder = new Order({
      userId,
      products: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      totalAmount,
      paymentMethod, 
      paymentStatus: paymentStatus || (paymentMethod === 'COD' ? 'Pending' : 'Paid'),
      status: 'Pending'
    });

    await newOrder.save();

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('products.productId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.productId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById
};
