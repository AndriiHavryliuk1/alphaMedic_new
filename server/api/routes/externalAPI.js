const express = require('express');
const router = express.Router();

const externalAPI = require('../controllers/externalAPI');
// const patientsController = require('../controllers/user');

// GET users get all doctors 
router.get('/countries', externalAPI.getAllCountries);

module.exports = router;