const { body } = require('express-validator/check');

const User = require('../models/user/user');

exports.signupValidator = () => {
    return [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email message.')
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
            .isLength({ min: 6 })
            .isAlphanumeric(),
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

exports.loginValidator = () => {
    return [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email message.')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 6 })
            .isAlphanumeric()
    ]
};