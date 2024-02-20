const express = require("express");
const app = express();
const useRoutes = require("./routes/index");
const cors = require("cors");


//middlewares
app.use(cors());
app.use(express.json());




//Use routes
useRoutes(app);



//Home route
app.get("/", (req, res) => {
    res.json({ message: "The server is up and running...." });
});







module.exports = app;