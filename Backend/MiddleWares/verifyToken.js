const jwtToken = require('jsonwebtoken')
require('dotenv').config()
function verifyToken(req, res, next) {
    //get bearer token
    const bearerToken = req.headers.authorization;
    const SECRET_KEY = process.env.SECRET_KEY
    //console.log(bearerToken)
    if (!bearerToken) {
        return res.send({ message: "Unauthorized Access.. Please login to get Access!!!" });
    }
    const token = bearerToken.split(' ')[1]
    try {
        jwtToken.verify(token, SECRET_KEY)
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = verifyToken;