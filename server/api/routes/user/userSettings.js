const express = require('express');
const router = express.Router();

const isAuthorized = require('../../../middleware/is-authorized');
const userSettingsController = require('../../controllers/user/userSettings');
// const patientsController = require('../controllers/user');

// GET userSettings
router.get('/', userSettingsController.getUserSettings);

module.exports = router;