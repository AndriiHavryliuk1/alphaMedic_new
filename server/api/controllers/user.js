const mongoose = require('mongoose');
const { ROLES } = require('../../utils/utils');

const User = require('../models/user/user');

exports.getAllUsers = (req, res, next) => {
    return findFnByParamsObject(req, res, next, {});
};

exports.getAllDoctors = (req, res, next) => {
    return findFnByParamsObject(req, res, next, {type: ROLES.DOCTOR});
};

exports.getAllPatients = (req, res, next) => {
    return findFnByParamsObject(req, res, next, {type: ROLES.PATIENT});
};

exports.getUser = (req, res, next) => {
    User.findById(req.params.id).exec().then((data) => {
        res.status(200).json(data); 
    }).catch((error) => {
        next(error);
    });
}

exports.createUser = async (req, res, next) => {

    if (await checkIsDuplicatedEmail(req.body.email)) {
        const error = new Error("Email already used!")
        next(error);
        return;
    }

    const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        imageURL: req.body.imageURL,
        type: req.body.type || ROLES.PATIENT, 
        birthday: req.body.birthday,
        gender: req.body.gender, 
        roles: req.body.roles || [ROLES.PATIENT],
        education: req.body.education,
        medicalHistory: req.body.medicalHistory
    });

    newUser.save().then((data) => {
        res.status(200).json(data);
    }).catch(error => {
        next(error);
    });
};

exports.updateUser = (req, res, next) => {
    User.findById(req.params.id).exec().then((data) => {
        res.status(200).json(data); 
    }).catch((error) => {
        next(error);
    });
}

function findFnByParamsObject(req, res, next, obj) {
    return User.find(obj).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            next(error);
        }) ;
}

async function checkIsDuplicatedEmail(email) {
    const result = await User.find({ email: email, active: true});
    return !!result.length;
}
