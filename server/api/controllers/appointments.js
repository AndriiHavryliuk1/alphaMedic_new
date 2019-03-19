const mongoose = require('mongoose');

const Appointment = require('../models/appointment');
const User = require('../models/user');

exports.getAppointments = (req, res, next) => {
    findBy().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        next(error);
    });


    function findBy() {
        if (req.query.patientId) {
            return Appointment.find({ patient: { _id: req.query.patientId } }).exec();
        } else if (req.query.doctorId) {
            return Appointment.find({ doctor: { _id: req.query.doctorId } }).exec();
        } else if (req.params.id) {
            return Appointment.findId(id).exec();
        } else {
            return Appointment.find().exec();
        }
    }
};

exports.registerNewAppointment = async (req, res, next) => {

    if (await validateNewAppointment(req.body, next)) {
        const error = new Error("Invalid data!")
        error.status = 404;
        next(error);
        return;
    }

    const startDate = new Date(req.body.dateStart)

    const newAppointment = new Appointment({
        _id: mongoose.Types.ObjectId(),
        dateStart: startDate,
        duration: req.body.duration, // sec
        dateEnd: new Date(startDate.getTime() + (req.body.duration * 1000)),
        doctor: req.body.doctor,
        patient: req.body.patient
    });

    newAppointment.save().then((data) => {
        res.status(200).json(data);
    }).catch(error => {
        next(error);
    });
};

async function validateNewAppointment(appointment, next) {
    try {
        if (!checkUser("patient") || !checkUser("doctor")) {
            return false;
        }

        const result = await User.findOne({ _id: appointment.patient._id, active: true });

        return !!result.length;

    } catch (error) {
        next(error);
    }


    function checkUser(type) {
        return !appointment[type] || appointment[type]._id || appointment[type].firstName || appointment[type].lastName;
    }

}
