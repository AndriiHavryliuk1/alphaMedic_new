const mongoose = require('mongoose');

const { ROLES } = require('../../../utils/utils');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imageURL: { data: Buffer, contentType: String },
    birthday: { type: Date },
    type: { type: String, default: ROLES.PATIENT },
    gender: { type: String },
    roles: { type: Array, default: [ROLES.PATIENT] },
    active: { type: Boolean, default: true },
    lastModificationUser: { type: String, default: null },
    medicalHistory: { type: Array },
    education: { type: Array },
    schedule: {
        type: {
            timeStart: Date,
            timeEnd: Date
        }
    },
    department: {
        type: {
            name: String,
            _id: mongoose.Schema.Types.ObjectId
        },
        ref: 'Department'
    }
}, { timestamps: true, collection: 'users'});


module.exports = mongoose.model('User', userSchema);