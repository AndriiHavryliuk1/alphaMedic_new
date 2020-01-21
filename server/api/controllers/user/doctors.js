const mongoose = require('mongoose');
const {ROLES} = require('../../../utils/utils');
const Schedule = require('../../models/schedule');

const User = require('../../modelsMongoose/user');

/**
 * return list of doctors
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getAllDoctors = async (req, res, next) => {
    try {
        const doctors = await User.find({type: ROLES.DOCTOR}).exec();
        res.status(200).json(doctors);
    } catch (error) {
        next(error);
    }
};

/**
 * return doctor
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getDoctor = async (req, res, next) => {
    try {
        const doctor = await User.findById(req.params.id).exec();
        res.status(200).json(doctor);
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
exports.createDoctor = async (req, res, next) => {

    if (await checkIsDuplicatedEmail(req.body.email)) {
        const error = new Error("Email already used!");
        next(error);
        return;
    }

    const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fatherName: req.body.fatherName,
        phoneNumbers: req.body.phoneNumbers,
        email: req.body.email,
        password: req.body.password,
        imageURL: req.body.imageURL,
        birthday: req.body.birthday,
        gender: req.body.gender,
        role: req.body.role || ROLES.DOCTOR,
        education: req.body.education,
        address: req.body.address,
        schedule: req.body.schedule || new Schedule()
    });

    try {
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);
    } catch (error) {
        return next(error);
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
