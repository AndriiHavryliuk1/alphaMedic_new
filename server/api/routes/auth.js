const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const authValidator = require('../validators/auth');

// POST create user
router.post('/signup', authValidator.signupValidator(), authController.signup);

// POST login
router.post('/login', authController.login);

module.exports = router;