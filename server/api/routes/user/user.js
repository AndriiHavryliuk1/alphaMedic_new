const express = require('express');
const router = express.Router();

const isAuthorized = require('../../../middleware/is-authorized');
const { ROLES } = require('../../../utils/utils');
const usersController = require('../../controllers/user/user');
// const patientsController = require('../controllers/user');

// GET users get all users 
router.get('/', isAuthorized([ROLES.ADMIN]), usersController.getAllUsers);

// POST create user
router.post('/', usersController.createUser);

module.exports = router;