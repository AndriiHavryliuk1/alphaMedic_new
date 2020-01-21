const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    duration: { type: Number, required: true }, // sec
    doctor: {
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        },
        required: true
    },
    patient: {
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        }, 
        required: true
    },
    workplace: String,
    generalDiagnosis: String,
    notes: String,
    provisionalDiagnosis: [{
        tooth: String, 
        service: String, 
        diagnosis: String
    }],
    lastModificationUser: { type: String, default: null }
}, { timestamps: true });


module.exports = mongoose.model('Appointment', appointmentSchema);