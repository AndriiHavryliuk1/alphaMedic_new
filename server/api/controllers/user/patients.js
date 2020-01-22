const mongoose = require('mongoose');
const {ROLES} = require('../../../utils/utils');

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
        res.status(200).json(patients);
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

    const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        fatherName: req.body.fatherName,
        phoneNumbers: req.body.phoneNumbers,
        email: req.body.email,
        password: req.body.password,
        imageURL: req.body.imageURL,
        birthday: req.body.birthday,
        gender: req.body.gender,
        role: req.body.role || ROLES.PATIENT,
        medicalCard: req.body.medicalCard,
        address: req.body.address,
        workPlace: req.body.workPlace
    });

    try {
        const savedUser = await newUser.save().exec();
        res.status(200).json(savedUser);
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
