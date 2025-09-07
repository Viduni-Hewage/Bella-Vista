const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');
const checkJwt = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/adminAuth');

router.get('/', productController.getAllProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);

router.get('/admin/all', checkJwt, checkAdmin, productController.getAllProductsForAdmin);
router.post('/', checkJwt, checkAdmin, validateProduct, productController.createProduct);
router.patch('/:id', checkJwt, checkAdmin, validateProduct, productController.updateProduct);
router.delete('/:id', checkJwt, checkAdmin, productController.deleteProduct);

module.exports = router;
