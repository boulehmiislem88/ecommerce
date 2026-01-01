const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
//const authMiddleware = require('../middleware/authmMiddleware')

// REGISTER
router.post('/register', AuthController.register);

// LOGIN
router.post('/login', AuthController.login);

console.log("✅ authRoutes loaded");

//LOGOUT
router.post('/logout', AuthController.logout);



module.exports = router;
