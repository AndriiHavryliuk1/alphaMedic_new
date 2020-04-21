const express = require('express');
const fs = require('fs');
const router = express.Router();

const isAuthorized = require('../../../middleware/is-authorized');
const { ROLES } = require('../../../utils/utils');

const multer = require('multer');

const patientsController = require('../../controllers/user/patients');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = './images';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        dir = './images/profiles';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, './images/profiles/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + '-' + file.originalname);
    }
});

// GET users get all patients
router.get('/', isAuthorized([ROLES.DOCTOR]), patientsController.getAllPatients);

// GET patient
router.get('/:id', isAuthorized([ROLES.DOCTOR, ROLES.PATIENT]), patientsController.getPatient);

// POST create user
router.post('/', isAuthorized([ROLES.DOCTOR]), patientsController.createPatient);

// Upload photo
router.post('/:id/profile-photo', isAuthorized([ROLES.DOCTOR, ROLES.PATIENT]), multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {fileSize: 1024 * 1024 * 5}
}).single('profile'), patientsController.uploadProfilePhoto);

// load photo
router.get('/:id/profile-photo', isAuthorized([ROLES.DOCTOR, ROLES.PATIENT]), patientsController.loadProfilePhoto);


module.exports = router;
