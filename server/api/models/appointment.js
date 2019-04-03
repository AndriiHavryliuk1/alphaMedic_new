const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    duration: { type: Number, required: true }, // sec
    warnings: String,
    doctor: {
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        },
        ref: 'User'
    },
    patient: {
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        }, 
        required: true, 
        ref: 'User'
    },
    lastModificationUser: { type: String, default: null }
}, { timestamps: true });

appointmentSchema.statics.checkIf = function (ids, minutesSinceLast, callback) {
    var recentDate = new Date();
    recentDate.removeMinutes(minutesSinceLast); // It will remove the minutes
    this.find(
        {'location.timestamp': {$lt: recentDate}},
        callback
    );
}


module.exports = mongoose.model('Appointment', appointmentSchema);

/**
 * default: () => {
        new Date(this.dateStart.getTime() + this.duration * 1000) 
    }
 */