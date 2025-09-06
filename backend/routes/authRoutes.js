const express = require('express');
const { registerUser, getCurrentUser } = require('../controllers/authController');
const checkJwt = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.get('/me', checkJwt, getCurrentUser);

module.exports = router;
