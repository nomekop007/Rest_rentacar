//variables de entorno
require("dotenv").config();

require("./database/db");
const log = require("./middlewares/log.middleware");
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/route");
const morgan = require("morgan");
const path = require("path");
const https = require("https");
const fs = require("fs");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

const PORT = process.env.PORT || 3000;
const LIST = process.env.LIST_CORS;
app.use(cors(LIST));
app.use(compression());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//static files (hace publica la carpeta uploads)
//app.use(express.static(path.join(__dirname, "uploads")));


// ruta padre
app.use("/rentacar", apiRouter, log.logRegister);

//start server

if (process.env.NODE_ENV == "production") {
    const cert = fs.readFileSync("./cert4.pem");
    const key = fs.readFileSync("./privkey4.pem");
    const server = https
        .createServer({ cert: cert, key: key }, app)
        .listen(PORT, () => {
            const { port } = server.address();
            console.log("Servidor arrancado! https production Puerto ", port);
        });
} else {
    const server = app.listen(PORT, () => {
        const { port } = server.address();
        console.log("Servidor arrancado! http development Puerto ", port);
    });
}


module.exports = app;