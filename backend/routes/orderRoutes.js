const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const checkJwt = require('../middleware/authMiddleware');

router.post('/cod', checkJwt, orderController.createCODOrderController);
router.post('/card', checkJwt, orderController.createCardOrderController);

module.exports = router;

