const authenticationRoutes = require("./authentication/createToken");
const refreshToken = require("./authentication/refreshToken");
const userRoutes = require("./user/userRoutes");


//Use routes
const useRoutes = app => {
    app.use(authenticationRoutes);
    app.use(refreshToken);
    app.use(userRoutes);
}


module.exports = useRoutes;