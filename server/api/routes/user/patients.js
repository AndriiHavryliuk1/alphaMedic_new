const express = require('express');
const router = express.Router();

const patientsController = require('../../controllers/user/patients');

// GET users get all patients
router.get('/', patientsController.getAllPatients);

// POST create user
router.post('/', patientsController.createPatient);


module.exports = router;
