const Diagnosis = require('../modelsMongoose/diagnosis');

exports.getAllDiagnosis = async (req, res, next) => {
    try {
        const diagnosis = await Diagnosis.find({}).exec();
        res.status(200).json(diagnosis);
    } catch (error) {
        next(error);
    }
};