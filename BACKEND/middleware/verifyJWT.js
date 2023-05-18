const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    console.log("access tocken ", process.env.ACCESS_TOKEN_SECRET)
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log("authHeader: " + authHeader);
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    // console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403); //invalid token
            }
            // console.log(decoded)
            req.user = decoded.UserInfo.uname;
            next();
        }
    );
}

module.exports = verifyJWT