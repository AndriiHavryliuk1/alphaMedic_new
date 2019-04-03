const jwt = require('jsonwebtoken');
const { SECRET_TOKEN_KEY } = require('../config/configuration');

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split('')[0];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, SECRET_TOKEN_KEY)
    } catch (error) {
        throw error;
    }

    if(!decodedToken) {
        const error= new Error('Not authenticated.')
    }
}