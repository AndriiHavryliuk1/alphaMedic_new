const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: Number,
    name: String,
    type: String,
    price: Number,
    lastModificationUser: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);