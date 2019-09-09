module.exports = (requiredRoles) => {
    return (req, res, next) => {
        if (requiredRoles.some(reqRole => res.roles.indexOf(reqRole) > -1)) {
            return next()
        }
        const error = new Error('Not authorized.');
        error.statusCode = 401;
        throw error;
    }
}