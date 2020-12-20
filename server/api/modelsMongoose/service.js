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

serviceSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Service', serviceSchema);