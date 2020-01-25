const mongoose = require('mongoose');

const diagnosisSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: mongoose.Schema.Types.ObjectId,
    lastModificationUser: { type: String, default: null }
}, { timestamps: true, collection: 'diagnosis' });

module.exports = mongoose.model('Diagnosis', diagnosisSchema);