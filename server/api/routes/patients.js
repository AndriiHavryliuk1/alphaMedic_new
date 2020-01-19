const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user/user');
const isAuthorized = require('../../middleware/is-authorized');
const { ROLES } = require('../../utils/utils');
// const patientsController = require('../controllers/user');

// GET users get all patients 
router.get('/', isAuthorized([ROLES.DOCTOR, ROLES.ADMIN]), usersController.getAllPatients);

// POST create patient
router.post('/', isAuthorized([ROLES.DOCTOR, ROLES.ADMIN]), usersController.createUser);


module.exports = router;