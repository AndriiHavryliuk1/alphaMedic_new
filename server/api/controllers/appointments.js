const mongoose = require('mongoose');

const Appointment = require('../models/appointment');
const User = require('../models/user/user');

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

    const startDate = new Date(req.body.dateStart);
    const endDate = new Date(startDate.getTime() + ((req.body.duration - 1) * 1000));
    { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }
    const existedAppointment = await Appointment.findOne({ $or: [{dateStart: {$gte: startDate, $lte: endDate}}, {dateEnd: {$gte: startDate, $lte: endDate}},     
        { $and: [ { dateStart: { $lt: startDate } }, { dateEnd: { $gt: startDate } } ] }, { $and: [ { dateStart: { $lt: endDate } }, { dateEnd: { $gt: endDate } } ] }
    ]}).exec();
    
    if (existedAppointment) {
        const error = new Error("Date for this appointment already choosen!")
        error.status = 404;
        next(error);
        return;
    }

    const newAppointment = new Appointment({
        _id: mongoose.Types.ObjectId(),
        dateStart: startDate,
        duration: req.body.duration, // sec
        dateEnd: endDate,
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
