const mongoose = require('mongoose');

const teethFormulaHistorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    newChanges: Object,
    oldChanges: Object,
    lastModificationUser: Number
}, { timestamps: true });

teethFormulaHistorySchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('TeethFormulaHistory', teethFormulaHistorySchema);