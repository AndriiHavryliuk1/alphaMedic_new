const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
    User.find().exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            next(error);
        }) ;
};