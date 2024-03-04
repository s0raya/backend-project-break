const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js')

router.get('/login', authController.loginUserform);
router.post('/login', authController.loginUser);
router.get('/register', authController.createUser);
router.post('/register', authController.saveUser);
router.post('/logout', authController.logout);

module.exports = router;