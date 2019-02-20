const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user');

// GET users get all users 
router.get('/', usersController.getAllUsers);

// POST create user
router.post('/', usersController.createUser);


module.exports = router;