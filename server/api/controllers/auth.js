const { validatonResult } = require('express-validator/check');

const User  = require('../models/user');

exports.getUser = (req, res, next) => {
    User.findById(req.params.id).exec().then((data) => {
        res.status(200).json(data); 
    }).catch((error) => {
        next(error);
    });
}

exports.signup = async (req, res, next) => {
    const errors = validatonResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        imageURL: req.body.imageURL,
        birthday: req.body.birthday,
        gender: req.body.gender, 
        roles: req.body.roles
    });

    newUser.save().then((data) => {
        res.status(200).json(data);
    }).catch(error => {
        next(error);
    });
};