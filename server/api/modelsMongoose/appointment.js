const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    duration: { type: Number, required: true }, // sec
    doctor: {
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            fullName: { type: String },
        },
        required: true
    },
    patient: {
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            fullName: { type: String },
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
}, { timestamps: true, collection: 'appointments' });


module.exports = mongoose.model('Appointment', appointmentSchema);
