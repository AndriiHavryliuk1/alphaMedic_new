const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateTime: { type: Date, required: true },
    duration: { type: Number }, // sec
    doctor: { type: Object },
    patient: { type: Object, required: true }
});

module.exports = mongoose.model('Department', departmentSchema);