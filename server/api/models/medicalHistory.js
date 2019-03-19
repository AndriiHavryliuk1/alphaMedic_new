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
    lastModificationTime: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);