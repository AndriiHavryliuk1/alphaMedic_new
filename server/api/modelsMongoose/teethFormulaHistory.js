const mongoose = require('mongoose');

const teethFormulaHistorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    newChanges: Object,
    oldChanges: Object,
    lastModificationUser: Number
}, { timestamps: true });

module.exports = mongoose.model('TeethFormulaHistory', teethFormulaHistorySchema);