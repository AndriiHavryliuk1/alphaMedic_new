const mongoose = require('mongoose');
const { ROLES } = require('../../../utils/utils');

const User = require('../../modelsMongoose/user');
const Doctor = require('../../models/user/doctor');

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
        res.status(200).json(data.toJSON()); 
    }).catch((error) => {
        next(error);
    });
};

exports.createUser = async (req, res, next) => {

    if (await checkIsDuplicatedEmail(req.body.email)) {
        const error = new Error("Email already used!")
        next(error);
        return;
    }

    const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        imageURL: req.body.imageURL,
        birthday: req.body.birthday,
        gender: req.body.gender, 
        roles: req.body.roles || [ROLES.PATIENT],
        education: req.body.education,
        medicalCard: req.body.medicalCard
    });

    newUser.save().then((data) => {
        res.status(200).json(data.toJSON());
    }).catch(error => {
        next(error);
    });
};

exports.updateUser = (req, res, next) => {
    User.findById(req.params.id).exec().then((data) => {
        res.status(200).json(data.toJSON()); 
    }).catch((error) => {
        next(error);
    });
}

exports.updateDoctor = async (req, res, next) => {
    try {
        const doctor = new Doctor(await User.findById(req.params.id).exec());
        for (let prop in req.body) {
            if (doctor.hasOwnProperty(prop)) {
                doctor[prop] = req.body[prop];
            }
        }

        const user = new User({doctor});
        user.save().exec().then((data) => {
            res.status(200).json(data.toJSON()); 
        }).catch((error) => {
            next(error);
        });
    } catch(e) {
        next(e);
    }
   
}

function findFnByParamsObject(req, res, next, obj) {
    return User.find(obj).exec()
        .then(result => {
            res.status(200).json(result.map(item => item.toJSON()));
        })
        .catch(error => {
            next(error);
        }) ;
}

async function checkIsDuplicatedEmail(email) {
    const result = await User.find({ email: email, active: true});
    return !!result.length;
}
