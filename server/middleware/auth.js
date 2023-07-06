const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('Acsess denied. not previliged')
    try {
        const decoded = jwt.verify(token, process.env.SCANNER_jwtPrivateKey)
        req.user = decoded
        next()

    }
    catch (ex) {
        res.status(400).send('Invalid token')
    }
}

// module.exports = auth