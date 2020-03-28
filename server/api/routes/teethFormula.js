const express = require('express');
const router = express.Router();

const isAuthorized = require('../../middleware/is-authorized');
const { ROLES } = require('../../utils/utils');
const isAuth = require('../../middleware/is-auth');

const teethFormulaController = require('../controllers/teethFormula');

// GET teeth formula
router.get('/', isAuth, isAuthorized([ROLES.DOCTOR]), teethFormulaController.getTeethFormulaForCurrentUser);

// UPDATE teeth formula
router.put('/', isAuth, isAuthorized([ROLES.DOCTOR]), teethFormulaController.updateTeethFormulaForCurrentUser);

// UPDATE teeth formula
router.put('/:toothId', isAuth, isAuthorized([ROLES.DOCTOR]), teethFormulaController.updateToothForCurrentUser);

module.exports = router;