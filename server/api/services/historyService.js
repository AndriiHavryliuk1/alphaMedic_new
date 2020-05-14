const mongoose = require('mongoose');
const _ = require('lodash');

const TeethFormulaHistory = require('../modelsMongoose/teethFormulaHistory');


exports.addTeethFormula = async (newTeethFormula, req, next) => {
    let lastTeethFormula = await TeethFormulaHistory.findOne().sort({created_at: -1}).exec();
    if (!lastTeethFormula) {
        lastTeethFormula = {teeth: {}};
    }

    if (_.isEqual(lastTeethFormula.teeth, newTeethFormula.teeth)) {
        return;
    }

    const newTeethFormulaHistory = new TeethFormulaHistory({
        _id: mongoose.Types.ObjectId(),
        userId: newTeethFormula.userId,
        newChanges: newTeethFormula.teeth,
        oldChanges: lastTeethFormula.teeth,
        lastModificationUser: req.userId
    });

    try {
        return await newTeethFormulaHistory.save();
    } catch (error) {
        return next(error);
    }
};

