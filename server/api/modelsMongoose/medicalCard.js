const mongoose = require('mongoose');

const medicalCardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    compromisedTeeth: [{type: { number: Number, name: String}}],
    complaints: String,
    earlierDiseases: String,
    currentDisease: String,
    physicalExamination: String,
    diagnosis: String,
    occlusion: String,
    hygieneCondition: String,
    hygieneTrainingData: String,
    hygieneControlDate: String,
    lastModificationUser: { type: String, default: null }
}, { timestamps: true, collection: 'medicalCards' });

medicalCardSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('MedicalCard', medicalCardSchema);