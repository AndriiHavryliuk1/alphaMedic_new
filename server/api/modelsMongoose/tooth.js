const mongoose = require('mongoose');

const toothSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: Number,
    name: String,
    lastModificationUser: { type: String, default: null }
}, { timestamps: true, collection: 'teeth' });

toothSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Tooth', toothSchema);