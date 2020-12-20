const mongoose = require('mongoose');

const teethFormulaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    teeth: Object,
}, { timestamps: true });

teethFormulaSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('TeethFormula', teethFormulaSchema);