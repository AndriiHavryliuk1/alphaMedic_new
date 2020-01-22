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

module.exports = mongoose.model('Department', departmentSchema);
