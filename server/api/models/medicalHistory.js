const mongoose = require('mongoose');

const medicalHistorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patient: { type: Object, required: true },
    warningLabels: { type: Array },
    procedures: { type: Object }
});

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);