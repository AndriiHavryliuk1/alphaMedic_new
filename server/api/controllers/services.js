const Service = require('../modelsMongoose/service');

exports.getAllServices = async (req, res, next) => {
    try {
        const teeth = await Service.find({}).exec();
        res.status(200).json(teeth);
    } catch (error) {
        next(error);
    }
};