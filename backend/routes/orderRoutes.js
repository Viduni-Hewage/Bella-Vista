const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/cod', orderController.createCODOrderController);
router.post('/card', orderController.createCardOrderController);

module.exports = router;
