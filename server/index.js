const app = require("./app");
const connectDB = require("./db/connectDB");

const port = process.env.PORT || 9000;


//Server listen and database connection
const run = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`The server is running at http://localhost:${port}`)
    });
}

run();


