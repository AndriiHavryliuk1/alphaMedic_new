const mongoose = require('mongoose');

const treatmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    procedures: { type: Array },
    cares: Array,
    lastModificationUser: { type: String, default: null }
}, { timestamps: true, collection: 'treatments' });

treatmentSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Treatment', treatmentSchema);