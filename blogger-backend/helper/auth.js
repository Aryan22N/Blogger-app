const jwt = require("jsonwebtoken");

function verifyToken  (req,res, next) {

    const token = req.headers["token"];
    console.log("Token - ", token);
    if (!token) {
        return res.status(403).send("login to the app to use the feature");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('verification decord', decoded );
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("login to the app to use the feature");
    }
    return next();
}

module.exports =  { verifyToken } 