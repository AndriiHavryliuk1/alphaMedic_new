module.exports = (requiredRoles) => {
    return (req, res, next) => {
        if (requiredRoles.contains(req.role)) {
            return next()
        }
        const error = new Error('Not authorized.');
        error.statusCode = 401;
        throw error;
    }
};