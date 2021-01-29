const express = require('express');
const router = express.Router();

const externalAPI = require('../controllers/externalAPI');
// const patientsController = require('../controllers/user');

// GET users get all doctors 
router.get('/countries', externalAPI.getAllCountries);

router.get('/count', externalAPI.getAllCountrieCallsCount);

router.get('/something', externalAPI.getSomething);

module.exports = router;
