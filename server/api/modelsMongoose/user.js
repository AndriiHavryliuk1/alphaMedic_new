const mongoose = require('mongoose');

const { ROLES } = require('../../utils/utils');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    fatherName: { type: String, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    phoneNumbers: { type: Array },
    imageURL: { data: Buffer, contentType: String },
    birthday: { type: Date },
    type: { type: String, default: ROLES.DOCTOR, trim: true },
    gender: { type: String },
    roles: { type: Array, default: [ROLES.DOCTOR] },
    active: { type: Boolean, default: true },
    lastModificationUser: { type: String, default: null },
    medicalCard: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalCard'},
    education: { type: Array },
    workPlace: {type: String},
    address: {type: Object},
    schedule: {type: Object},
    doctor: {type: Object} // used for patients
}, { timestamps: true, collection: 'users'});

// userSchema.pre('save', (next, req, res) => {
//     this.lastModificationUser = "jhgkj";
//     next()

// });

module.exports = mongoose.model('User', userSchema);
