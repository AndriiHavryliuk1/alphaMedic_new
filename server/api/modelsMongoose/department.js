const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String },
    departmentHead: {
        type: {
            name: { type: String, required: true },
            surname: { type: String, required: true },
            _id: mongoose.Schema.Types.ObjectId
        },
        ref: 'User'
    },
    doctors: { type: Array },
    lastModificationUser: { type: String, default: null }
}, { timestamps: true });

departmentSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Department', departmentSchema);
