const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateQuantity
} = require('../controllers/cartController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addToCart);
router.get('/', protect, getCart);
router.delete('/:productId', protect, removeFromCart);
router.delete('/', protect, clearCart);
router.put('/', protect, updateQuantity);

module.exports = router;
