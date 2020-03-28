const mongoose = require('mongoose');

const teethFormulaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    teeth: Object,
}, { timestamps: true });

module.exports = mongoose.model('TeethFormula', teethFormulaSchema);