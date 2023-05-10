const http = require("http");
const app = require("./home/index");

const server = http.createServer(app);
const port = process.env.PORT || 1000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (res.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, PUT, GET');
        return res.status(200).json({});
        next();
    }
})

server.listen(port, () => {
    console.log("SERVER STARTED SUCCESSFULLY!!! AT " + port + " PORT");
});