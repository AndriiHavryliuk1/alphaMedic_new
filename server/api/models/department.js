const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String },
    departmentHead: {
        type: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            _id: mongoose.Schema.Types.ObjectId
        },
        ref: 'User'
    },
    doctors: { type: Array },
    lastModificationTime: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Department', departmentSchema);