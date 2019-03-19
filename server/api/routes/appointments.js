const express = require('express');
const router = express.Router();

const upoointmentsController = require('../controllers/appointments');

// GET appointments get all appointments 
router.get('/', upoointmentsController.getAppointments);

// GET appointment by id
router.get('/:id', upoointmentsController.getAppointments);

// POST create appointments
router.post('/', upoointmentsController.registerNewAppointment);


module.exports = router;