const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const checkJwt = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/adminAuth');

router.post('/cod', checkJwt, orderController.createCODOrderController);
router.post('/card', checkJwt, orderController.createCardOrderController);

router.get('/summary', checkJwt, checkAdmin, orderController.getAllOrdersController);
router.patch('/:orderId/status', checkJwt, checkAdmin, orderController.updateOrderStatusController);

module.exports = router;
