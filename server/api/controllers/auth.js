const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const { SECRET_TOKEN_KEY } = require('../../config/configuration');
const Patient = require('../models/user/Patient');

const doctorsController = require('./user/doctors');

const User  = require('../modelsMongoose/user');

exports.getUser = (req, res, next) => {
    User.findById(req.params.id).exec().then((data) => {
        res.status(200).json(data); 
    }).catch((error) => {
        next(error);
    });
};

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }

    // for now registration only for doctors
    return doctorsController.createDoctor(req, res, next);
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
