const jwt = require("jsonwebtoken");

module.exports = function (req, res,next) {
    try{
        let token = req.header('x-token')
        if(!token){
            return res.sendStatus(400).send('Token not found')
        }
        let decode = jwt.verify(token, 'jwtSecret')
        req.user = decode.user
        next();
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal server error");
    }
}