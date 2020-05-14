const mongoose = require('mongoose');

const TeethFormula = require('../modelsMongoose/teethFormula');
const historyService = require('../services/historyService');

exports.getAllTeethFormula = async (req, res, next) => {
    try {
        const teeth = await TeethFormula.find({}).exec();
        res.status(200).json(teeth);
    } catch (error) {
        next(error);
    }
};

exports.getTeethFormulaForCurrentUser = async (req, res, next) => {
    try {
        const teethFormula = await TeethFormula.find({userId: req.userId}).exec();
        res.status(200).json(teethFormula);
    } catch (error) {
        next(error);
    }
};

exports.updateTeethFormulaForCurrentUser = async (req, res, next) => {
    try {
        const teethFormula = await TeethFormula.find({userId: req.userId}).exec();
        for (let prop in req.body.teeth) {
            if (!isToothValid(req.body.teeth[prop])) {
                const error = new Error('Tooth is not valid')
                error.statusCode = 404;
                next(error);
                return;
            }
        }
        teethFormula.teeth = req.body.teeth;
        teethFormula.save().then((data) => {
            historyService.addTeethFormula(data._doc, req, next);
            res.status(200).json(data);
        }).catch(error => {
            next(error);
        });
    } catch (error) {
        next(error);
    }
};

exports.updateToothForCurrentUser = async (req, res, next) => {
    try {
        let teethFormula = await TeethFormula.findOne({userId: req.userId}).exec();
        const tooth = req.body;
        if (!isToothValid(tooth)) {
            const error = new Error('Tooth is not valid')
            error.statusCode = 404;
            next(error);
            return;
        }

        if (!teethFormula) {
            teethFormula = new TeethFormula({
                _id: mongoose.Types.ObjectId(),
                userId: req.userId,
                teeth: {}
            });
        }

        teethFormula.teeth[req.params.toothId] = tooth;
        teethFormula.save().then((data) => {
            historyService.addTeethFormula(data._doc, req, next);
            res.status(200).json(data);
        }).catch(error => {
            next(error);
        });
    } catch (error) {
        next(error);
    }
};

function isToothValid(tooth) {
    return tooth && tooth.toothStates && Array.isArray(tooth.toothStates) 
            && tooth.crownStates && Array.isArray(tooth.crownStates)
            && tooth.rootStates && Array.isArray(tooth.rootStates);
}