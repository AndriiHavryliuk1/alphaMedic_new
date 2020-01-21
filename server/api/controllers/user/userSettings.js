const User = require('../../modelsMongoose/user');

exports.getUserSettings = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).exec();
        res.status(200).json({
            user: user,
            token: req.get('Authorization').split(' ')[1]
        }); 
    } catch(err) {
        next(err);
    }
};
