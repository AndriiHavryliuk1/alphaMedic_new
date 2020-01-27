const express = require('express');
const router = express.Router();

const isAuthorized = require('../../middleware/is-authorized');
const { ROLES } = require('../../utils/utils');

const teethController = require('../controllers/teeth');

// GET get all teeth 
router.get('/', isAuthorized([ROLES.DOCTOR]), teethController.getAllTeeth);

module.exports = router;