const authenticationRoutes = require("./authentication/createToken");
const refreshToken = require("./authentication/refreshToken");
const userRoutes = require("./user/userRoutes");
const contactRoutes = require("./contacts/contacts");
const conversationRoutes = require("./conversations/conversationRoutes");


//Use routes
const useRoutes = app => {
    app.use(authenticationRoutes);
    app.use(refreshToken);
    app.use(userRoutes);
    app.use(contactRoutes);
    app.use(conversationRoutes);

}


module.exports = useRoutes;