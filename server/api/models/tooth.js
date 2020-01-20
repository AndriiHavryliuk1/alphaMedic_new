const mongoose = require('mongoose');

const toothSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: Number,
    name: String,
    lastModificationUser: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Tooth', toothSchema);