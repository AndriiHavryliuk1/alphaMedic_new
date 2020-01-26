const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: Number,
    name: String,
    category: String,
    technicalPrice: Number,
    minPrice: Number,
    maxPrice: Number,
    lastModificationUser: { type: String, default: null }
}, { timestamps: true, collection: 'services' });

module.exports = mongoose.model('Service', serviceSchema);