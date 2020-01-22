const mongoose = require('mongoose');

const { ROLES } = require('../../utils/utils');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumbers: { type: Array },
    imageURL: { data: Buffer, contentType: String },
    birthday: { type: Date },
    type: { type: String, default: ROLES.PATIENT },
    gender: { type: String },
    role: { type: String, default: ROLES.PATIENT },
    active: { type: Boolean, default: true },
    lastModificationUser: { type: String, default: null },
    medicalCard: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalCard'},
    education: { type: Array },
    workPlace: {type: String},
    address: {type: Object},
    schedule: {type: Object}
}, { timestamps: true, collection: 'users'});


module.exports = mongoose.model('User', userSchema);
