const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const checkJwt = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/adminAuth');
const validateOrder = require('../middleware/validateOrder');
const sanitizeAllInputs = require('../middleware/sanitizeAllInputs');

router.use(sanitizeAllInputs);

router.post('/cod', checkJwt, validateOrder, orderController.createCODOrderController);
router.post('/card', checkJwt, validateOrder, orderController.createCardOrderController);

router.get('/summary', checkJwt, checkAdmin, orderController.getAllOrdersController);
router.patch('/:orderId/status', checkJwt, checkAdmin, orderController.updateOrderStatusController);

module.exports = router;
