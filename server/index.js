const app = require("./app");

const port = process.env.PORT || 9000;


//Server listen and database connection
const run = async () => {
    app.listen(port, () => {
        console.log(`The server is running at http://localhost:${port}`)
    });
}

run();


