const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Add a register route for creating users
router.post('/register', register);
router.post('/login', login);

module.exports = router;