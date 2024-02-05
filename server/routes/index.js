const authenticationRoutes = require("./authentication/createToken");
const refreshToken = require("./authentication/refreshToken");
const saveUser = require("./user/saveUser");


//Use routes
const useRoutes = app => {
    app.use(authenticationRoutes);
    app.use(refreshToken);
    app.use(saveUser);
}


module.exports = useRoutes;