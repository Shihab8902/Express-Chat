const jwt = require("jsonwebtoken");
const { createSessionToken } = require("./createToken");

const refreshToken = (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken) {
        return res.status(401).send("Invalid token!");
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).send("Invalid token!");
        }

        const user = decoded.user;

        //Create new session token
        const token = createSessionToken({ user });
        res.send({ token });
    });

}


module.exports = refreshToken;