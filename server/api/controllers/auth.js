const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const { SECRET_TOKEN_KEY } = require('../../config/configuration');
const Patient = require('../models/user/Patient')

const User  = require('../modelsMongoose/user');

exports.getUser = (req, res, next) => {
    User.findById(req.params.id).exec().then((data) => {
        res.status(200).json(data); 
    }).catch((error) => {
        next(error);
    });
}

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }

    const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        gender: req.body.gender
    });

    newUser.save().then((data) => {
        try {
            const patient = new Patient(data);
            if (req.body.returnSecuredToken) {
                patient.token = generateToken(patient);
            }
            return res.status(200).json(patient);
        } catch(error) {
            User.findByIdAndDelete({_id: data._id}).exec();
            next(error);
        }
    }).catch(error => {
        next(error);
    });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email}).then((user) => {
        if (!user || password !== user.password) {
            const error = !user ? new Error('User with this email could not be found!') : new Error('Wrong password!');
            error.statusCode = 401;
            throw error; 
        }

        const token = generateToken(user);

        res.status(200).json({ token: token, user: user._doc });

    }).catch(error => {
        next(error);
    });

};

function generateToken(user) {
    return jwt.sign({
        email: user.email,
        userId: user._id.toString(),
        role: user.role
    }, SECRET_TOKEN_KEY, { expiresIn: '5h' });
}