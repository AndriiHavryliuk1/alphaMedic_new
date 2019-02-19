const mongoose = require('mongoose');

const  { ROLES } = require('../utils')

const user = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imageURL: { data: Buffer, contentType: String },
    role_id: { type: mongoose.Schema.Types.ObjectId },
    birthday: { type: Date },
    roles: { type: Array, default: [ROLES.PATIENT] },
    active: { type: Boolean, default: true }
})