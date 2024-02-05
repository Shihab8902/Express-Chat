require("dotenv").config();
const jwt = require("jsonwebtoken");


//Create session token
const createSessionToken = user => {
    return jwt.sign(user, process.env.SESSION_TOKEN_SECRET, { expiresIn: 30 * 60 });
}

//Create refresh token
const createRefreshToken = user => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}



const createToken = (req, res) => {
    try {
        const user = req.body;
        if (user) {
            const refreshToken = createRefreshToken(user);
            const sessionToken = createSessionToken(user);
            res.status(200).json({ sessionToken, refreshToken, expiresAt: 30 * 60 });
        }

        res.send({ message: "No payload found!" });
    }
    catch (error) {
        console.log(error);
    }
}





module.exports = { createToken, createSessionToken };