//variables de entorno
require("dotenv").config();

require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/route");
const morgan = require("morgan");
const path = require("path");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

//static files (hace publica la carpeta uploads)
app.use(express.static(path.join(__dirname, "uploads")));

//middlewares
const log = require("./middlewares/log_middleware");

// ruta padre
app.use("/rentacar", apiRouter, log.logRegister);

//start server
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV == "production") {
    const cert = fs.readFileSync("./cert4.pem");
    const key = fs.readFileSync("./privkey4.pem");
    const c = [process.env.ORIGEN, process.env.LOCAL];
    app.use(cors(c));
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