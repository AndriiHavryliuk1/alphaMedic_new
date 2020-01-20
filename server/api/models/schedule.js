const mongoose = require('mongoose');

const treatmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctorId: mongoose.Schema.Types.ObjectId,
    patientId: mongoose.Schema.Types.ObjectId,
    startDate: Date,
    endDate: Date,
    lastModificationUser: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Treatment', treatmentSchema);