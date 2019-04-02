const { body } = require('express-validator/check');

const User = require('../models/user');

exports.signupValidator = () => {
    return [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid message.')
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email address already exists!');
                    }
                })
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ main: 6 }),
        body('firstName')
            .trim()
            .not()
            .isEmpty(),
        body('lastName')
            .trim()
            .not()
            .isEmpty()
    ]
};