const mongoose = require('mongoose');

const Appointment = require('../models/appointment');

exports.getAllAppointmentsByDoctor = (req, res, next) => {
    Appointment.find({ doctor: {_id: req.params.id}}).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            next(error);
        }) ;
};

exports.getAllAppointmentsByPatient = (req, res, next) => {
    Appointment.find({ patient: {_id: req.params.id}}).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            next(error);
        }) ;
};

exports.getAllAppointments = (req, res, next) => {
    Appointment.find().exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            next(error);
        }) ;
};

exports.getUser = (req, res, next) => {
    User.findById(req.params.id).exec().then((data) => {
        res.status(200).json(data); 
    }).catch((error) => {
        next(error);
    });
}

exports.registerNewAppointment = async (req, res, next) => {

    if (await validateNewAppointment(req.body)) {
        const error = new Error("Invalid data!")
        error.status = 404;
        next(error);
        return;
    }

    const newAppointment = new User({
        _id: mongoose.Types.ObjectId(),
        dateTime: req.body.dateTime,
        duration: req.body.duration, // sec
        doctor: req.body.doctor,
        patient: req.body.patient
    });

    newUser.save().then((data) => {
        res.status(200).json(data);
    }).catch(error => {
        next(error);
    });
};

async function validateNewAppointment(appointment) {
    if (!checkUser("patient") || !checkUser("doctor")) {
        return false;
    }

    const result = await User.find({ email: email, active: true});
    return !!result.length;

    function checkUser(type) {
        return !appointment[type] || appointment[type].id  || appointment[type].name || appointment[type].surname;  
    }
}
