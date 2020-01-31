const express = require('express');
const router = express.Router();

const isAuthorized = require('../../../middleware/is-authorized');
const { ROLES } = require('../../../utils/utils');

const patientsController = require('../../controllers/user/patients');

// GET users get all patients
router.get('/', isAuthorized([ROLES.DOCTOR]), patientsController.getAllPatients);

// GET patient
router.get('/:id', isAuthorized([ROLES.DOCTOR, ROLES.PATIENT]), patientsController.getPatient);

// POST create user
router.post('/', isAuthorized([ROLES.DOCTOR]), patientsController.createPatient);


module.exports = router;
