const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const checkJwt = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/adminAuth');

router.get('/admin/dashboard', checkJwt, checkAdmin, statisticsController.getDashboardStats);
router.get('/admin/sales-chart', checkJwt, checkAdmin, statisticsController.getSalesChart);
router.get('/admin/product-stats', checkJwt, checkAdmin, statisticsController.getProductStats);
router.get('/admin/order-stats', checkJwt, checkAdmin, statisticsController.getOrderStats);

module.exports = router;