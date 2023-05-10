const http = require("http");
const app = require("./home/index");

const server = http.createServer(app);
const port = process.env.PORT || 1000;

server.listen(port, () => {
    console.log("SERVER STARTED SUCCESSFULLY!!! AT " + port + " PORT");
});