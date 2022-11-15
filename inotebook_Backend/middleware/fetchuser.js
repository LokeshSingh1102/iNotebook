// Middleware to Get the user from the jwt token

const jwt = require('jsonwebtoken')

const JWT_SECRET = "lokesh"; // it should not be in the code either in some config file or in .env.local 

fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object 
    let token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "please authenticate using valid token" })
    }

    try {
        let data = jwt.verify(token, JWT_SECRET);
        console.log(data)
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: "please authenticate using valid token" })
    }
}

module.exports = fetchuser;