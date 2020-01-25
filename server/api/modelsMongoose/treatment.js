const mongoose = require('mongoose');

const treatmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    procedures: { type: Array },
    cares: Array,
    lastModificationUser: { type: String, default: null }
}, { timestamps: true, collection: 'treatments' });

module.exports = mongoose.model('Treatment', treatmentSchema);