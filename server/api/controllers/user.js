const mongoose = require('mongoose');

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
        birthday: req.body.birthday,
        gender: req.body.gender, 
        roles: req.body.roles,
        lastModificationTime: new Date()
    });

    newUser.save().then((data) => {
        res.status(200).json(data);
    }).catch(error => {
        next(error);
    });
};

async function checkIsDuplicatedEmail(email) {
    const result = await User.find({ email: email, active: true});
    return !!result.length;
}
