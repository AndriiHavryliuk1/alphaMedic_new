const mongoose = require('mongoose');

const diagnosisSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    complaints: String,
    research: String,
    treatment: String,
    lastModificationUser: { type: String, default: null }
}, { timestamps: true, collection: 'diagnosis' });

diagnosisSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Diagnosis', diagnosisSchema);