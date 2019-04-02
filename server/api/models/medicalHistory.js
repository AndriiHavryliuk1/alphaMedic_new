const mongoose = require('mongoose');

const medicalHistorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patient: {
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            firstName: String,
            lastName: String,
        },
        required: true,
        ref: 'User'
    },
    warningLabels: { type: Array },
    procedures: { type: Array },
    lastModificationUser: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);