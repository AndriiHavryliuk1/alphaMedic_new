const mongoose = require('mongoose');
const {ROLES} = require('../../../utils/utils');
const Patient = require('../../models/user/Patient');

const User = require('../../modelsMongoose/user');

/**
 * return list of patients
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getAllPatients = async (req, res, next) => {
    try {
        const patients = await User.find({type: ROLES.PATIENT}).exec();
        res.status(200).json(patients.map(pat => new Patient(pat)));
    } catch (error) {
        next(error);
    }
};

/**
 * return patient
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getPatient = async (req, res, next) => {
    try {
        const patient = await User.findById(req.params.id).exec();
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

/**
 * create new patient
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.createPatient = async (req, res, next) => {

    if (req.body.email && await checkIsDuplicatedEmail(req.body.email)) {
        const error = new Error("Email already used!");
        next(error);
        return;
    }

    const currentUser = await User.findOne({_id: req.userId, active: true});

    const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        fatherName: req.body.fatherName,
        phoneNumbers: req.body.phoneNumbers,
        email: " ",
        password: " ",
        doctor: {
            id: currentUser.id,
            name: currentUser.name,
            surname: currentUser.surname
        },
        imageURL: req.body.imageURL,
        birthday: req.body.birthday,
        gender: req.body.gender,
        type: ROLES.PATIENT,
        roles: req.body.roles || [ROLES.PATIENT],
        medicalCard: req.body.medicalCard,
        address: req.body.address,
        workPlace: req.body.workPlace
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(new Patient(savedUser));
    } catch (error) {
        next(error);
    }
};

/**
 * check for duplication
 * @param email
 * @returns {Promise<boolean>}
 */
async function checkIsDuplicatedEmail(email) {
    const result = await User.find({email: email, active: true});
    return !!result.length;
}
