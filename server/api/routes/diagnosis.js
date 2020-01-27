const express = require('express');
const router = express.Router();

const isAuthorized = require('../../middleware/is-authorized');
const { ROLES } = require('../../utils/utils');

const diagnosisController = require('../controllers/diagnosis');

// GET get all diagnosis 
router.get('/', isAuthorized([ROLES.DOCTOR]), diagnosisController.getAllDiagnosis);

module.exports = router;