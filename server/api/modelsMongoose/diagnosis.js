const mongoose = require('mongoose');

const diagnosisSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    complaints: String,
    research: String,
    treatment: String,
    lastModificationUser: { type: String, default: null }
}, { timestamps: true, collection: 'diagnosis' });

module.exports = mongoose.model('Diagnosis', diagnosisSchema);