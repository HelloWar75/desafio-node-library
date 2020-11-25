const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

module.exports = async (req, res, next) => {
    
    let token = null;
    
    try {
        token = req.headers.authorization.split(' ')[1];
    } catch (error) {
        return res.status(500).json({
            error: "Token not be null!"
        });
    }    

    let decodedToken = null;

    try {
        decodedToken = jwt.verify(token, '1y72e81gey781g8414y143');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Token malformed!"
        });
    }
    
    let user = null;

    try {
        user = await userService.findByToken(token);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }

    if( user == null )
        return res.status(401).json({
            error: 'Token not authorized!'
        });

    
    next();
    
}