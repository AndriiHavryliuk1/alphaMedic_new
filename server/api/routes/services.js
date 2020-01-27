const express = require('express');
const router = express.Router();

const isAuthorized = require('../../middleware/is-authorized');
const { ROLES } = require('../../utils/utils');

const servicesController = require('../controllers/services');

// GET get all services 
router.get('/', isAuthorized([ROLES.DOCTOR]), servicesController.getAllServices);

module.exports = router;