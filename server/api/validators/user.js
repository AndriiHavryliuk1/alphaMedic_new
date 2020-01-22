const { body } = require('express-validator/check');

const User = require('../models/user');

exports.addUser = () => {
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
        body('name')
            .trim()
            .not()
            .isEmpty(),
        body('surname')
            .trim()
            .not()
            .isEmpty(),
        body('imageURL')
            .trim()
            .isURL(),
        body('gender')
            .not()
            .isEmpty(),
    ]
};
