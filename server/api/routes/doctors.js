const express = require('express');
const router = express.Router();

const isAuthorized = require('../../middleware/is-authorized');
const { ROLES } = require('../../utils/utils');

const usersController = require('../controllers/user');
// const patientsController = require('../controllers/user');

// GET users get all doctors 
router.get('/', usersController.getAllDoctors);

// GET users get all doctors 
router.post('/', isAuthorized([ROLES.ADMIN]), usersController.createUser);


module.exports = router;