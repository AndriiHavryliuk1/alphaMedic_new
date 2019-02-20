const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String },
    departmentHead: { type: Object },
    doctors: { type: Array }
});

module.exports = mongoose.model('Department', departmentSchema);