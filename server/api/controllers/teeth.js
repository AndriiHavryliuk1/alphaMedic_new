const Tooth = require('../modelsMongoose/tooth');

exports.getAllTeeth = async (req, res, next) => {
    try {
        const teeth = await Tooth.find({}).exec();
        res.status(200).json(teeth);
    } catch (error) {
        next(error);
    }
};